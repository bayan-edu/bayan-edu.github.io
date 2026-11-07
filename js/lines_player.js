/* ══════════════════════════════════════════════════════════
   بيان — lines_player.js  سطورُ المقطع في مشغّل الطالب (b218 · 197 · 198 · مختبر الصوتيّات، الخطوة ١)

   مشغّلُ المقطع (`toggleAudio` في student.js) بُني على ثلاث حاجات: الإعادةُ المضبوطة — «جوهر تمرين الاستماع» — وخفضُ
   السرعة، وألّا يغادر الطالبُ الصفحة. والسطورُ تجعل الإعادةَ أدقّ: «⟲ السطر» يعيد الجملةَ التي فاتته لا عشرَ ثوانٍ
   تبدأ من وسط كلمة. وهذا الملفُّ يُحمَّل بعد المشغّل، فلا يؤخّره، وتعذُّرُه يتركه كما كان.

   🎯 **والنصُّ بخيار المعلّم لا بالافتراض** (198 · حكمُ المالك: «كشف النص … خيار يحدده المعلم في الاعدادات وليس افتراضيا»):
      لا يُكشف (الافتراض) · بعد الاستماع كاملاً · متاح. **والحكمُ في القاعدة:** `item_lines` لا تُرسل نصَّ سطرٍ لم يُؤذن به،
      فلا يُخفى هنا ما وصل. وأسماءُ القائلين وإعادةُ السطور للجميع — فهي البنيةُ لا النصّ.
      وحين يُتاح النصُّ يبقى مطويّاً حتى «كشف النص»: الاستماعُ أوّلاً، والقراءةُ تأكيدٌ لا بديل. والطيُّ يُخفيه عن قارئ الشاشة
      كذلك (`display: none`). و«بعد الاستماع كاملاً» يُسأل عنها ثانيةً عند `ended`: علامةُ الإتمام يكتبها المشغّل يومها.
   🔑 **ولا يُسجَّل استماعٌ بسطر:** السطرُ الأخير يقف قبيل آخر الملفّ، فلا يطلق `ended` — و«فتحَ» ليست «سمعَ».
   🎨 **وصفُّ السطور باتّجاه لغة النصّ:** الإنجليزيُّ من اليسار — زرُّ السطر فقائلُه فكلامُه — وكان في الصفّ العربيّ يقع الكلامُ
      في الطرف الآخر بعيداً عن قائله، فتقفز العين (رُئي في لقطة ١٤١٢). والرأسُ عربيٌّ كما هو.
   🆕 b222 · **و«التدرّب بصوتك»** (`lines_practice.js` · مختبر الصوتيّات ٥): سطراً سطراً وتبادلُ الأدوار، والتسجيلُ على الجهاز.
      في الدرس وحده (`item`) لا في مراجعة الاختبار، وحيث يسجّل المتصفّح (`canRecord`)، ولسطرٍ موقَّتٍ واحدٍ على الأقلّ. ويُحمَّل
      عند أوّل ضغطة. 🔑 **واللوحةُ موضعٌ ثابت بين الرأس والسطور:** الرسمُ يعيد الرأسَ والسطورَ وحدهما (بعد الاستماع كاملاً
      مثلاً)، فلا يُمحى تدرّبٌ قائم. وما دام التدرّبُ قائماً (`data-busy`) فالمقطعُ له: لا «⟲ السطر» ولا ▶ ولا تلوينَ هنا.
   ══════════════════════════════════════════════════════════ */
import * as realApi from './api.js';
import { esc, AR } from './ui.js';
import * as L from './audio_lines.js';
import { canRecord } from './recorder.js';

const HINT = { open: 'الاستماع أولاً، والنص بعده', wait: 'يُكشف النص بعد الاستماع كاملاً', now: 'اكتمل الاستماع، والنص متاح الآن' };

/* box حاوية المشغّل (.aud) · au عنصرُ الصوت · item المصدر ({ id, url }) ⇒ { el, lines } أو null بلا سطور
   🆕 b220 · أو `data` جاهزةٌ بصيغة `item_lines` مكانَ المصدر: نصُّ الاستماع في مراجعة الاختبار (`attempt_lines` · 200 ②) —
   فلا يُسأل عنها ثانيةً، والنصُّ مطويٌّ حتى «كشف النص» كما في الدرس: الاستماعُ أوّلاً */
export async function attachLines(box, au, item, { api = realApi, data = null } = {}){
  if(!box || !au || (!item?.id && !data)) return null;
  let d = data ? (data.ok && data.lines?.length ? data : null) : await fetchLines(api, item.id);
  if(!d || !box.isConnected) return null;

  const el = document.createElement('div');
  el.className = 'al-pl';
  el.innerHTML = '<div class="al-plh"></div><div class="al-pr" hidden></div><ol class="al-pls"></ol>';
  box.appendChild(el);
  const head = el.querySelector('.al-plh'), prac = el.querySelector('.al-pr'), list = el.querySelector('.al-pls');

  let lines = [], stopAt = null, last = -1, shown = false, P = null;
  const busy = () => el.hasAttribute('data-busy');
  function draw(hint){
    lines = L.fromRows(d.lines);
    const hasText = d.text === true, timed = lines.some(l => l.start != null);
    el.toggleAttribute('data-show', hasText && shown);
    head.innerHTML = `<b class="al-plt">سطور المقطع</b>
        <span class="al-hint">${hint || (hasText ? HINT.open : d.reveal === 'after' ? HINT.wait : '')}</span>
        ${timed ? '<button type="button" class="aud-b" data-a="line">⟲ السطر</button>' : ''}
        ${hasText ? `<button type="button" class="aud-b" data-a="txt" aria-pressed="${shown}">${shown ? 'إخفاء النص' : 'كشف النص'}</button>` : ''}
        ${timed && item?.id && canRecord() ? `<button type="button" class="aud-b" data-a="prac" aria-pressed="${!prac.hidden}">التدرّب بصوتك</button>` : ''}`;
    list.dir = d.lang === 'ar' ? 'rtl' : 'ltr';
    list.innerHTML = lines.map((l, k) => `<li class="al-pli" data-k="${k}">${
        l.start != null ? `<button type="button" class="al-plb" data-a="play" aria-label="سماع السطر ${AR(k + 1)}">▶</button>`
                        : '<span class="al-plb off" aria-hidden="true"></span>'}${
        l.speaker ? `<b class="al-who" dir="auto">${esc(l.speaker)}</b>` : ''}${
        l.text != null ? `<span class="al-t" dir="auto">${esc(l.text)}</span>` : ''}<span class="al-gap" aria-hidden="true">…</span></li>`).join('');
    paint();
    P?.redraw();
  }

  const paint = () => {
    if(busy()) return;
    const k = L.lineAt(lines, au.currentTime * 1000);
    el.querySelectorAll('.al-pli').forEach(r => r.classList.toggle('on', +r.dataset.k === k));
  };
  const watch = () => {
    if(stopAt == null) return;
    if(au.currentTime * 1000 >= stopAt - 30){ au.pause(); stopAt = null; return; }
    requestAnimationFrame(watch);
  };
  function playLine(k){
    const dur = Number.isFinite(au.duration) ? au.duration * 1000 : Infinity;
    const sp = L.span(lines, k, dur);
    if(!sp) return;
    last = k; stopAt = null;
    au.currentTime = sp.start / 1000;
    au.play().then(() => { stopAt = sp.end ?? (Number.isFinite(dur) ? dur - 60 : null); watch(); }).catch(() => {});
  }
  au.addEventListener('timeupdate', () => {
    if(stopAt != null && au.currentTime * 1000 >= stopAt){ au.pause(); stopAt = null; }
    paint();
  });
  au.addEventListener('seeked', paint);

  /* «بعد الاستماع كاملاً»: علامةُ الإتمام يكتبها المشغّل عند `ended` بنداءٍ لا ينتظره هذا الملفّ — فيُسأل مرّتين */
  au.addEventListener('ended', () => {
    if(d.text || d.reveal !== 'after' || !item?.id) return;
    const ask = async () => {
      const nd = await fetchLines(api, item.id);
      if(nd?.text){ d = nd; draw(HINT.now); return true; }
      return false;
    };
    setTimeout(async () => { if(!(await ask())) setTimeout(ask, 3000); }, 1200);
  });

  el.addEventListener('click', async e => {
    const b = e.target.closest('button[data-a]');
    if(!b) return;
    if(b.dataset.a === 'txt'){
      shown = !shown;
      el.toggleAttribute('data-show', shown);
      b.setAttribute('aria-pressed', String(shown));
      b.textContent = shown ? 'إخفاء النص' : 'كشف النص';
      return;
    }
    if(b.dataset.a === 'prac') return togglePractice(b);
    if(busy()) return;
    if(b.dataset.a === 'line'){
      const k = L.lineAt(lines, au.currentTime * 1000);
      playLine(k >= 0 ? k : last >= 0 ? last : lines.findIndex(l => l.start != null));
      return;
    }
    if(b.dataset.a === 'play') playLine(+b.closest('.al-pli').dataset.k);
  });

  /* 🆕 b222 · اللوحةُ تُحمَّل عند أوّل ضغطة، والإخفاءُ يوقف ما يجري فيها */
  async function togglePractice(b){
    const on = prac.hidden;
    b.setAttribute('aria-pressed', String(on));
    if(!on){ P?.hide(); prac.hidden = true; return; }
    prac.hidden = false;
    if(!P){
      prac.innerHTML = '<p class="al-pr-note">…</p>';
      const m = await import('./lines_practice.js').catch(err => { console.warn('[practice]', err); return null; });
      if(!m || !el.isConnected){ prac.hidden = true; b.setAttribute('aria-pressed', 'false'); return; }
      P = m.mountPractice(prac, { el, au, lines: () => lines, text: () => d.text === true, halt: () => { stopAt = null; } });
    }
    P.show();
  }

  draw();
  return { el, lines };
}

/* ⇒ ما أعادته `item_lines` إن كان له سطور، وإلّا null — والخطأُ صامتٌ هنا عمداً: المشغّلُ يبقى كما كان */
async function fetchLines(api, id){
  const { data, error } = await api.itemLines(id);
  return !error && data?.ok && data.script && data.lines?.length ? data : null;
}
