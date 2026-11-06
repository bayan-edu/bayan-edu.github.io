/* ══════════════════════════════════════════════════════════
   بيان — lines_panel.js  سطورُ المقطع الصوتيّ: لوحةٌ في نموذج «مقطع صوتي» (b218 · 197 · مختبر الصوتيّات، الخطوة ١)

   حكمُ المالك (٦ نوفمبر): «لماذا الحوار مصدر جديد وهو نوع من المقطع الصوتي، وهل يمكن ان يكون مختبر المعلم بالكامل داخل
   شاشة المقطع الصوتي؟» — فالمختبرُ لوحةٌ هنا لا شاشة، كلوحة صوت النصّ في نموذج النصّ (`attachLines` في editor_items.js).
   وهذه خطوتُه الأولى: نصُّ الملفّ سطراً سطراً بأسماء قائليه، وموضعُ كلّ سطرٍ بنقرةٍ وهو يُسمع.

   🔑 **السطورُ لملفٍّ حُفظ** (197 ①): تُكتب بمفتاح `items.url` المحفوظ لا بما في الحقل — رفعُ ملفٍّ آخر يُطوي اللوحةَ
      حتى يُحفظ المصدر، فلا تُكتب سطورُ ملفٍّ لملفٍّ غيره.
   🔑 **والحفظُ زرُّها لا زرُّ النموذج:** السطورُ في جدولها، والنموذجُ يحفظ المصدر ويرجع إلى قائمة المصادر. فاللوحةُ تقول
      «لم تُحفظ» ما دام فيها ما لم يُرسل، وتُقسّم النصَّ قبل الحفظ إن تغيّر ولم يُقسَّم.
   🔑 **والنقرةُ تُقدَّم بردّ الفعل** (`LEAD_MS`)، و«هنا» تضع الموضعَ الحاضر بعينه — والتقديمُ والتأخيرُ بعُشر ثانية، ويُسمع
      السطرُ بعدهما فتحكم الأذن. والمنطقُ كلُّه في `audio_lines.js` (يُقاس في node)، وهنا الرسمُ والنداء.
   🔑 **وكشفُ النصّ للطالب خيارُ المعلّم** (198 · حكمُ المالك: «خيار يحدده المعلم … وليس افتراضيا»): لا يُكشف · بعد الاستماع
      كاملاً · متاح — والأوّلُ الافتراض، ويُختار بعد حفظ السطور. والحكمُ في القاعدة (`item_lines`) لا في هذه القائمة.
   🎨 هيئةُ لوحة صوت النصّ (`.vp`)، والسطرُ الجاري بلون «المضغوط» نفسِه — لا لونَ جديد.
   🆕 b220 · **وفي النصّ الصوتيّ بمحرّر الاختبار** (`passage` · 200 · مختبر الصوتيّات، الخطوة ٣): اللوحةُ نفسُها بنداءَي النصّ
      (`passage_lines` · `save_passage_lines`) — ولا «كشف النص» فيها: نصُّ الاستماع في الاختبار خيارُ الاختبار لا الملفّ («نص
      الاستماع» في إعداداته). **والملفُّ المشترك يُقال** (`track_uses`): السطورُ تتبع الملفّ، فما يُكتب هنا يُقرأ حيث استُعمل —
      ودرسٌ يكشف نصَّه يُطلع الطالبَ عليه قبل الاختبار. تنبيهٌ لا منع: القرارُ للمعلّم.
   ══════════════════════════════════════════════════════════ */
import * as realApi from './api.js';
import { esc, AR, N } from './ui.js';
import { mediaUrl, isManaged } from './media.js';
import * as L from './audio_lines.js';

const STEP = 100;                                   // التقديمُ والتأخيرُ بعُشر ثانية
const clock = ms => L.clockMs(ms, AR, '٫');
const lineN = n => N(n, 'سطر', 'سطران', 'سطور', 'سطراً');
/* النصُّ كما يُقسَّم — فيُقارَن مربّعُ النصّ بالسطور بلا فرقٍ في المسافات وفواصل الأسطر */
const norm = s => L.scriptText(L.parseScript(s));

/* field حقلُ الرابط · item المصدرُ المحفوظ ({ id, url }) أو null · passage النصُّ الصوتيّ المحفوظ في الاختبار ({ id, media, lang })
   مكانَ item · api النداءاتُ (للقياس بنداءاتٍ مصنوعة) ⇒ { el } */
export function linesPanel({ field = null, item = null, passage = null, api = realApi } = {}){
  const P = !!passage;
  const src = P ? { id: passage.id, key: passage.media, lang: passage.lang,
                    load: () => api.passageLines(passage.id), save: s => api.savePassageLines(passage.id, s) }
                : { id: item?.id, key: item?.url, lang: item?.lang,
                    load: () => api.itemLines(item.id), save: s => api.saveItemLines(item.id, s) };
  const el = document.createElement('section');
  el.className = 'vp al';
  el.setAttribute('aria-label', 'سطور المقطع');
  el.innerHTML = `<div class="vp-top"><b class="vp-h">سطور المقطع</b><span class="vp-sum"></span></div>
    <p class="vp-say">${P
      ? 'يُكتب نص المقطع سطراً سطراً، ويُضبط موضع كل سطر وهو يُسمع. لا يرى الطالب منه شيئاً أثناء المحاولة، ونصه بعد التسليم بحسب «نص الاستماع» في إعدادات الاختبار.'
      : 'يُكتب نص المقطع سطراً سطراً، ويُضبط موضع كل سطر وهو يُسمع. يرى الطالب أسماء المتحدثين، أما النص فبحسب «كشف النص للطالب».'}</p>
    <p class="vp-note al-uses" hidden></p>
    <p class="vp-note" aria-live="polite"></p>
    <div class="al-body" hidden>
      <label class="vp-fixl" for="alTx">النص سطراً سطراً، واسم المتحدث قبل نقطتين: Tom: Hello</label>
      <textarea class="vp-fix al-tx" id="alTx" dir="auto" rows="5" spellcheck="false"></textarea>
      <div class="vp-acts"><button type="button" class="mf-up" data-act="split">تقسيم السطور</button></div>
      <audio class="al-au" controls preload="metadata"></audio>
      <p class="vp-say al-how">يُشغَّل المقطع ويُضغط الزر عند بداية كل سطر، ومفتاح المسافة يكفي ما دام الزر محدداً.</p>
      <div class="vp-acts"><button type="button" class="mf-up al-mk" data-act="mark"></button></div>
      <ol class="al-rows"></ol>
      <div class="vp-acts">
        <button type="button" class="mf-up" data-act="save">حفظ السطور</button>
        <button type="button" class="mf-up" data-act="clear">حذف السطور</button>
      </div>
      ${P ? '' : `<div class="vp-acts al-rv">
        <label class="vp-fixl" for="alRv">كشف النص للطالب</label>
        <select class="vp-v" id="alRv">${Object.entries(L.REVEAL).map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select>
      </div>`}
    </div>`;
  const $ = s => el.querySelector(s);
  const sum = $('.vp-sum'), note = $('.vp-note:not(.al-uses)'), usesEl = $('.al-uses'), body = $('.al-body'), tx = $('.al-tx'),
        au = $('.al-au'), list = $('.al-rows'), mk = $('.al-mk'), rv = $('#alRv');
  const btn = a => el.querySelector(`button[data-act="${a}"]`);
  const tell = (text = '', tone = '') => { note.textContent = text; note.className = 'vp-note' + (tone ? ' ' + tone : ''); };

  const key = String(src.key || '').trim();
  if(!src.id){ tell(P ? 'تُكتب السطور بعد حفظ النص المشترك.' : 'تُكتب السطور بعد حفظ المقطع.'); return { el }; }
  if(!isManaged(key)){ tell('السطور لملفٍّ مرفوع إلى المنصة، وهذا رابطٌ خارجي.'); return { el }; }

  /* `reveal` خيارُ الكشف المحفوظ (198) — ويُختار بعد أن تُحفظ السطور: لا نصَّ يُكشف قبل أن يوجد.
     و`uses` أين يُستعمل الملفُّ أيضاً (200 ④) — يُقرأ مرّةً بعد السطور، وتعذُّرُه يُسكت التنبيهَ وحده */
  let lines = [], saved = '[]', loaded = false, busy = false, stopAt = null, reveal = 'never', uses = null;
  const snap = () => JSON.stringify(L.payload(lines));
  const dirty = () => snap() !== saved;
  const moved = () => !!field && field.value.trim() !== key;

  /* ── الرسم ── */
  const rowHtml = (l, j) => {
    const no = AR(j + 1), off = l.start == null ? ' disabled' : '';
    return `<li class="al-row" data-k="${j}">
      <span class="al-n">${no}</span>
      ${l.speaker ? `<b class="al-who" dir="auto">${esc(l.speaker)}</b>` : ''}
      <span class="al-t" dir="auto">${esc(l.text)}</span>
      <span class="al-at">${l.start == null ? 'بلا موضع' : clock(l.start)}</span>
      <span class="al-ctl">
        <button type="button" class="vp-tn" data-act="minus" aria-label="تقديم السطر ${no}"${off}>−</button>
        <button type="button" class="vp-tn" data-act="plus" aria-label="تأخير السطر ${no}"${off}>+</button>
        <button type="button" class="vp-tn" data-act="play" aria-label="سماع السطر ${no}"${off}>▶</button>
        <button type="button" class="vp-tn" data-act="here" aria-label="بداية السطر ${no} عند الموضع الحالي">هنا</button>
        ${l.start == null ? '' : `<button type="button" class="vp-tn" data-act="unmark" aria-label="إلغاء موضع السطر ${no}">✕</button>`}
      </span></li>`;
  };
  function paintCur(){
    const k = L.lineAt(lines, au.currentTime * 1000);
    list.querySelectorAll('.al-row').forEach(r => r.classList.toggle('on', +r.dataset.k === k));
  }
  function draw(){
    const t = L.tally(lines), k = L.firstUntimed(lines);
    sum.textContent = !t.lines ? 'بلا سطور'
      : [lineN(t.lines), `وُقّت منها ${AR(t.timed)}`, ...(dirty() ? ['لم تُحفظ'] : [])].join(' · ');
    mk.disabled = busy || !t.lines || k < 0;
    mk.textContent = !t.lines ? 'بداية السطر' : k < 0 ? 'وُقّتت السطور كلها' : `بداية السطر ${AR(k + 1)}`;
    btn('save').disabled = busy || !dirty();
    btn('split').disabled = busy;
    btn('clear').hidden = !t.lines && saved === '[]';
    btn('clear').disabled = busy;
    if(rv){
      rv.value = reveal;
      rv.disabled = busy || saved === '[]';
      rv.title = saved === '[]' ? 'يُختار بعد حفظ السطور' : '';
    }
    list.innerHTML = lines.map(rowHtml).join('');
    paintCur();
    drawUses();
  }

  /* ── الملفُّ المشترك (200 ④): في الاختبار يُقال الدرسُ الذي يكشف النصّ، وفي الدرس يُقال الاختبارُ الذي يطّلع عليه الطالبُ قبله ── */
  function drawUses(){
    /* والعنوانُ الإنجليزيّ في جملةٍ عربيّة يُعزل (`bdi`): بلا عزلٍ تنقلب علامتا التنصيص حوله */
    const names = xs => [...new Set(xs)].map(x => `«<bdi>${esc(x)}</bdi>»`).join('، ');
    const there = !uses ? [] : P ? uses.items.map(x => x.lesson) : uses.passages.map(x => x.quiz);
    let t = '', warn = false;
    if(there.length){
      const n = new Set(there).size;
      t = `يُستعمل هذا الملف أيضاً في ${P ? (n > 1 ? 'الدروس' : 'درس') : (n > 1 ? 'الاختبارات' : 'اختبار')} ${names(there)}، وسطوره واحدة في الموضعين.`;
      const rev = P ? uses.reveal : reveal;
      if(rev && rev !== 'never'){
        warn = true;
        t += P ? ` ونصه يُكشف للطالب هناك (${esc(L.REVEAL[rev] || rev)})، فقد يقرؤه قبل الاختبار.`
               : ' وكشف نصه هنا يُطلع الطالب عليه قبل الاختبار.';
      }
    }
    usesEl.innerHTML = t;
    usesEl.hidden = !t;
    usesEl.className = 'vp-note al-uses' + (warn ? ' warn' : '');
  }

  /* ── السماع ── السطرُ وحده من بدايته إلى حدّه، ويقف قبيل آخر الملفّ إن كان الأخير */
  const watch = () => {
    if(stopAt == null) return;
    if(au.currentTime * 1000 >= stopAt - 30){ au.pause(); stopAt = null; return; }
    requestAnimationFrame(watch);
  };
  function playLine(k){
    const dur = Number.isFinite(au.duration) ? au.duration * 1000 : Infinity;
    const sp = L.span(lines, k, dur);
    if(!sp) return;
    stopAt = null;
    au.currentTime = sp.start / 1000;
    au.play().then(() => { stopAt = sp.end ?? (Number.isFinite(dur) ? dur - 60 : null); watch(); })
             .catch(() => tell('تعذّر تشغيل الملف.', 'bad'));
  }
  au.addEventListener('timeupdate', () => {
    if(stopAt != null && au.currentTime * 1000 >= stopAt){ au.pause(); stopAt = null; }
    paintCur();
  });
  au.addEventListener('seeked', paintCur);

  /* ── التقسيم والحفظ ── */
  function split(){
    lines = L.relink(lines, L.parseScript(tx.value));
    tx.value = L.scriptText(lines);
    const t = L.tally(lines);
    tell(t.lines ? `${lineN(t.lines)}، وُقّت منها ${AR(t.timed)}.` : 'لا سطور في النص.', t.lines ? '' : 'warn');
    draw();
  }
  async function save(){
    if(norm(tx.value) !== L.scriptText(lines)) split();
    const why = L.problem(lines);
    if(why){ tell(why, 'bad'); return; }
    const sent = L.payload(lines);
    busy = true; draw(); tell(sent.length ? 'تُحفظ السطور…' : 'تُحذف السطور…');
    const { data, error } = await src.save(sent);
    busy = false;
    if(error || !data?.ok){ tell(error?.message || data?.error || 'لم تُحفظ السطور.', 'bad'); draw(); return; }
    saved = JSON.stringify(sent);
    if(!sent.length) reveal = 'never';                 // نصٌّ مُحي ⇒ يولد التالي على الافتراض (198 ①)
    tell(sent.length ? 'حُفظت السطور ✔' : 'حُذفت السطور.');
    draw();
  }
  /* خيارُ الكشف يُحفظ ساعةَ اختياره — وتعذُّرُه يُرجع القائمةَ إلى المحفوظ ويقول السبب. وفي الاختبار لا قائمة (200 ①) */
  rv?.addEventListener('change', async () => {
    const want = rv.value;
    busy = true; draw(); rv.value = want;
    const { data, error } = await api.setAudioReveal(item.id, want);
    busy = false;
    if(error || !data?.ok){ tell(error?.message || data?.error || 'لم يُحفظ خيار الكشف.', 'bad'); draw(); return; }
    reveal = data.reveal;
    tell(`حُفظ: ${L.REVEAL[reveal]} ✔`);
    draw();
  });
  async function clear(){
    if(!confirm('حذف سطور هذا المقطع كلها؟')) return;
    lines = []; tx.value = '';
    await save();
  }

  el.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]');
    if(!b || b.disabled) return;
    const act = b.dataset.act, row = b.closest('.al-row'), k = row ? +row.dataset.k : -1;
    const ms = Math.round(au.currentTime * 1000);
    if(act === 'split') return split();
    if(act === 'save') return save();
    if(act === 'clear') return clear();
    if(act === 'mark'){
      const j = L.firstUntimed(lines);
      if(j >= 0){ lines = L.mark(lines, j, ms); draw(); mk.focus(); }
      return;
    }
    if(k < 0) return;
    if(act === 'play') return playLine(k);
    if(act === 'minus') lines = L.nudge(lines, k, -STEP);
    else if(act === 'plus') lines = L.nudge(lines, k, STEP);
    else if(act === 'here') lines = L.mark(lines, k, ms, 0);
    else if(act === 'unmark') lines = L.unmark(lines, k);
    draw();
    el.querySelector(`.al-row[data-k="${k}"] button[data-act="${act}"]`)?.focus();
    /* بعد التقديم والتأخير يُسمع السطرُ — فالأذنُ تحكم لا الرقم */
    if(act === 'minus' || act === 'plus') playLine(k);
  });

  /* رفعُ ملفٍّ آخر أو لصقُ مفتاحٍ يطلق `input` من الحقل (`attachUpload`) — فتُطوى اللوحةُ حتى يُحفظ المصدر */
  field?.addEventListener('input', () => {
    if(!loaded) return;
    const m = moved();
    body.hidden = m;
    if(m){ au.pause(); tell('تغيّر ملف المقطع، فتُكتب سطوره بعد حفظه.', 'warn'); }
    else tell('');
  });

  au.src = mediaUrl(key) || '';
  au.addEventListener('error', () => { if(!moved()) tell('تعذّر تشغيل الملف.', 'bad'); });

  (async () => {
    tell('تُقرأ السطور…');
    const { data, error } = await src.load();
    if(error || !data?.ok){ tell('تعذّر جلب السطور: ' + (error?.message || data?.error || ''), 'bad'); return; }
    lines = L.fromRows(data.lines);
    reveal = data.reveal || 'never';
    /* صفُّ السطور باتّجاه لغة النصّ (كمشغّل الطالب): الإنجليزيُّ من اليسار، فيقع «−» قبل «+» كما يجري شريطُ المشغّل */
    list.dir = (data?.lang || src.lang || 'en') === 'ar' ? 'rtl' : 'ltr';
    saved = snap();
    tx.value = L.scriptText(lines);
    loaded = true;
    body.hidden = moved();
    tell(moved() ? 'تغيّر ملف المقطع، فتُكتب سطوره بعد حفظه.'
         : lines.length ? '' : 'لا سطور بعد. يُلصق نص المقطع ثم «تقسيم السطور».', moved() ? 'warn' : '');
    draw();
    const u = await api.trackUses(key).then(x => x, () => null);
    if(u && !u.error && u.data?.ok){ uses = u.data; drawUses(); }
  })();

  return { el };
}
