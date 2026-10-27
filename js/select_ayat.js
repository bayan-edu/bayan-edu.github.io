/* ══════════════════════════════════════════════════════════
   بيان — select_ayat.js  📖  سورُ الآيات: محدِّدٌ لا محرِّر

   لوحةٌ تحت مربّع النصّ في المحرّر، لا تظهر إلا لنصٍّ فيه آيات: سطرٌ لكلّ كتلة ﴿…﴾ بأرقام
   آياتها وأوّل كلماتها، ويُسأل المعلّمُ عن سورتها وحدها. **ولا تمسّ النصّ:** تحدّد ما تُتلى به
   الآيةُ في كتاب الطالب (الحصري · b198)، والنصُّ يُكتب في المربّع كما كان.
   🔑 والسورةُ لا تُستخرج من النصّ (188 · الرأس): آيةٌ تُتلى من غير سورتها أسوأُ من الصمت.
      فتُملأ بهذا الترتيب، والأوّلُ أولى:
        ① ما اختاره المعلّمُ في هذه الجلسة — والفارغُ اختيارٌ أيضاً، فلا يعود اقتراحٌ أزاله
        ② المحفوظةُ للكتلة، إن لم تتغيّر أرقامُ آياتها
        ③ السورةُ المسمّاة في العنوان أو الوصف (`surahsNamed`) — إن سُمّيت واحدةٌ وحدها ووسعت الكتلة
        ④ وإلا فارغةٌ حتى يختار: لا تخمين.
   🔑 والسورةُ معلّقةٌ بأرقام آيات كتلتها لا بموضعها (`keyOf`): يعدّل المعلّمُ النصَّ فتتبدّل الكتل
      وتبقى كلُّ سورةٍ مع آياتها. وكتلتان بمدىً واحد يفرّقهما ترتيبُهما بينهما (#0 · #1).
   📐 والحفظُ كلٌّ أو لا شيء (`result`): السورُ مصفوفةٌ بترتيب الكتل لا ثقبَ فيها (188 ①)، فكتلةٌ
      ناقصةٌ تُبقي النصَّ كلَّه صامتاً — ويمسح المحرّرُ القديمةَ حينئذٍ ويقول ذلك (`save` في
      editor_items.js): سورةٌ قديمةٌ تصادف كتلةً جديدةً بأرقامها تُتلى من غير سورتها.
      **وحفظُ النصّ لا يُمنع بسبب السور أبداً.**
   🎨 واللوحةُ محايدة: سؤالٌ وخبرٌ لا «انتبه». والملاحظةُ وحدها تتلوّن بمعناها (screens.css · `.ay`).
   ══════════════════════════════════════════════════════════ */
import { quranBlocks } from './book.js';
import { SURAHS, surahName, ayatOf, surahsNamed } from './quran.js';
import { AR } from './ui.js';

const WAIT = 400;                       // تتبع اللوحةُ الكتابةَ بعد توقّفٍ قصير، لا مع كلّ حرف
const FROM = ['العنوان', 'الوصف'];      // من أين اقتُرحت — بترتيب `names`

/* الاسمُ أوّلاً فرقمُها بين قوسين: «الأنعام (٦)» — فيقفز المعلّمُ إلى السورة بكتابة أوّل اسمها في القائمة،
   والنقطةُ بجوار الرقم («٦ · الأنعام») كانت تُقرأ صفراً هندياً: «٦٠» */
const OPTS = '<option value="">اختيار السورة</option>'
  + SURAHS.map(([name], i) => `<option value="${i + 1}">${name} (${AR(i + 1)})</option>`).join('');

/* «الآيات ١٥١–١٥٢» — وكتلتان بمدىً واحد يفرّقهما عدّادُ `seen` */
const keyOf = (seen, a, z) => { const r = `${a}-${z}`; seen[r] = (seen[r] ?? -1) + 1; return `${r}#${seen[r]}`; };
const label = b => b.first == null ? 'آيات بلا أرقام'
  : b.first === b.last ? `الآية ${AR(b.first)}` : `الآيات ${AR(b.first)}–${AR(b.last)}`;
/* أوّلُ الكتلة كما كُتبت بتشكيلها — والكلمةُ ما فيه حرف: «ۖ» و«۝١٥١» علاماتٌ لا كلمات */
const lead = t => {
  const w = String(t).replace(/[﴿﴾]/g, '').split(/\s+/).filter(x => /\p{L}/u.test(x));
  return w.slice(0, 4).join(' ') + (w.length > 4 ? '…' : '');
};

/* inp مربّعُ النصّ · saved السورُ المحفوظة (items.quran_refs) · names [حقلُ العنوان، حقلُ الوصف]
   ⇒ { el, result } — والموضعُ لمن نادى: يضع `el` حيث يشاء */
export function selectAyat(inp, { saved = null, names = [] } = {}){
  const picked = new Map();             // ① — key ⇒ السورة، و٠ «لا سورة» اختارها المعلّم
  const savedBy = new Map();            // ②
  { const seen = {}; (Array.isArray(saved) ? saved : []).forEach(r => savedBy.set(keyOf(seen, r.from, r.to), r.surah)); }

  const el = document.createElement('section');
  el.className = 'ay';
  el.hidden = true;
  el.setAttribute('aria-label', 'سور الآيات');
  el.innerHTML = `<b class="ay-h">سور الآيات</b>
    <p class="ay-say">تُتلى الآيات في كتاب الطالب بصوت الشيخ الحصري حين تُعرف سورها كلها، وإلا بقيت صامتة.</p>
    <div class="ay-rows"></div>`;
  const list = el.querySelector('.ay-rows');

  /* ③ — سورةٌ واحدةٌ سُمّيت في الحقلين معاً، وإلا فلا اقتراح */
  const suggest = () => {
    const found = names.map(f => surahsNamed(f?.value));
    if(found.includes(null)) return null;
    const all = new Set(found.flat());
    if(all.size !== 1) return null;
    const surah = [...all][0];
    return { surah, src: FROM[found.findIndex(a => a.includes(surah))] };
  };

  /* الكتلُ كما في المربّع الآن، ولكلٍّ سورتُها ومصدرُها */
  const read = () => {
    const sug = suggest(), seen = {};
    return quranBlocks(inp.value).map(b => {
      const ok = Number.isInteger(b.first) && Number.isInteger(b.last) && b.first >= 1 && b.first <= b.last;
      const key = ok ? keyOf(seen, b.first, b.last) : null;
      let surah = 0, src = null;
      if(ok){
        if(picked.has(key))       [surah, src] = [picked.get(key), null];
        else if(savedBy.has(key)) [surah, src] = [savedBy.get(key), null];
        else if(sug && b.last <= ayatOf(sug.surah)) [surah, src] = [sug.surah, sug.src];
      }
      return { ...b, ok, key, surah, src };
    });
  };

  const noteOf = r => !r.ok
      ? [r.first == null ? 'تبقى آيات النص كلها صامتة حتى تُكتب أرقامها «۝»'
                         : 'تبقى آيات النص كلها صامتة حتى تُرتَّب أرقامها', 'warn']
    : r.surah && r.last > ayatOf(r.surah)
      ? [`${surahName(r.surah)} آياتها ${AR(ayatOf(r.surah))}، ولا آية فيها برقم ${AR(r.last)}`, 'bad']
    : r.surah && r.src ? [`اقتُرحت من ${r.src}`, ''] : ['', ''];

  let rows = [], sig = null, timer = 0;
  /* تُبنى السطورُ حين تتبدّل الكتل وحدها، ويُحدَّث ما فيها كلَّ مرّة — فلا تُستبدل قائمةٌ تحت يد المعلّم */
  const refresh = () => {
    clearTimeout(timer);
    rows = read();
    el.hidden = !rows.length;
    const s = rows.map(r => r.key ?? `x${r.first}-${r.last}`).join('|');
    if(s !== sig){
      sig = s;
      list.innerHTML = rows.map(r => `<div class="ay-row">
          <span class="ay-at">${label(r)}</span><span class="ay-q"></span>
          ${r.ok ? `<select class="ay-s" data-key="${r.key}" aria-label="سورة ${label(r)}">${OPTS}</select>` : ''}
          <span class="ay-note" aria-live="polite"></span>
        </div>`).join('');
    }
    [...list.children].forEach((row, i) => {
      const r = rows[i], [say, tone] = noteOf(r);
      row.querySelector('.ay-q').textContent = `«${lead(r.text)}»`;
      const sel = row.querySelector('.ay-s');
      if(sel) sel.value = r.surah ? String(r.surah) : '';
      const note = row.querySelector('.ay-note');
      note.textContent = say;
      note.className = 'ay-note' + (tone ? ' ' + tone : '');
    });
  };
  const later = () => { clearTimeout(timer); timer = setTimeout(refresh, WAIT); };

  inp.addEventListener('input', later);
  names.forEach(f => f?.addEventListener('input', later));
  list.addEventListener('change', e => {
    const sel = e.target.closest('.ay-s');
    if(!sel) return;
    picked.set(sel.dataset.key, +sel.value || 0);
    refresh();
  });
  refresh();

  return {
    el,
    /* ما في المربّع الآن لا ما رسمه آخرُ توقّف ⇒ { count, refs, why }
       refs مصفوفةُ الحفظ (188) أو null · why: null تامّة · 'num' كتلةٌ بلا أرقام أو بأرقامٍ لا تترتّب ·
       'pick' كتلةٌ بلا سورة أو بسورةٍ لا تسعها */
    result(){
      refresh();
      const count = rows.length;
      if(!count) return { count, refs: null, why: null };
      if(rows.some(r => !r.ok)) return { count, refs: null, why: 'num' };
      if(rows.some(r => !r.surah || r.last > ayatOf(r.surah))) return { count, refs: null, why: 'pick' };
      return { count, refs: rows.map(r => ({ surah: r.surah, from: r.first, to: r.last })), why: null };
    }
  };
}
