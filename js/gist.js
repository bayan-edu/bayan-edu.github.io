/* ══════════════════════════════════════════════════════════
   بيان — gist.js  سؤالُ الفكرة العامة فوق مشغّل المقطع الصوتيّ (b234 · 202)

   حكمُ المالك (٨ نوفمبر): سؤالٌ واحدٌ بأربعة خيارات يوجّه **الاستماعَ الأوّل** — «الاختيار أثناء الاستماع لا مشكلة،
   والتغذية الراجعة بعد الضغط على تسليم، ولا يُفعَّل تسليم إلا بعد انتهاء المقطع» · «ظهور السؤال عند فتح المقطع مرة ثانية
   مع إجابته في المرة الأولى لا يضيف جديداً … غالباً الزيارة الثانية للتدرّب على النطق» · والتوجيه: «Listen and choose the
   correct answer» و«استمع واختر الإجابة الصحيحة أو استمعي واختاري».

   🔑 **لا يُسجَّل شيء في القاعدة** — والمفتاحُ يصل المتصفّحَ عن علم (رأسُ 202 ④). والتسليمُ يتذكّره المتصفّح وحده
      (`bayan.gist.<المصدر>`)، فلا تُعرض البطاقةُ بعده على هذا الجهاز. وجهازٌ آخر يعرضها: حدٌّ معلن، لا عطل.
   🔑 **والبطاقةُ كلُّها بلغة المقطع** (`lang` من `item_gist`): التوجيهُ والسؤالُ والزرُّ والتغذية — والعربيُّ خطابٌ يُفصل
      بـ`G()` بثلاث صيغ (bayan-language-identity §٤).
   🔑 **وزرُّ التسليم يقول متى يُفعَّل بلا سطر شرح:** شريطٌ في خلفيّته يمتلئ مع التشغيل، ويُفعَّل عند `ended` إن اختير جواب.
      فلا تعليمةَ تُكتب — وهو ما طلبه المالك للمشغّل نفسِه (b233: «لا داعي لهذه التعليمات»).
   🎨 الاختيارُ بلون «اخترتَ» (`accent`) قبل التسليم، وبعده الحكمُ بعائلتيه (`ok` · `danger`) — ونصُّ الوسم هو الحامل.
   📌 ولا تشخيص: هو توجيهٌ لا قياس، فلا كودَ ولا هدف. ومكانُ السؤال المقيس محرّكُ الاختبار.
   ══════════════════════════════════════════════════════════ */
import * as realApi from './api.js';
import { esc, G, icon } from './ui.js';
import { S } from './state.js';

const DONE = id => 'bayan.gist.' + id;
const seen = id => { try { return localStorage.getItem(DONE(id)) === '1'; } catch { return false; } };
const mark = id => { try { localStorage.setItem(DONE(id), '1'); } catch {} };

/* نصوصُ البطاقة بلغة المقطع — والعربيُّ بصيغة القارئ (`g`) */
const TXT = {
  en: g => ({ cue: 'Listen and choose the correct answer', go: 'Submit', key: 'Correct answer', mine: 'Your choice',
              right: 'Good listening!', wrong: 'The main idea is the marked answer. You can listen again.' }),
  ar: g => ({ cue: G(g, 'استمع واختر الإجابة الصحيحة', 'استمعي واختاري الإجابة الصحيحة', 'الاستماع ثم اختيار الإجابة الصحيحة'),
              go: 'تسليم', key: 'الإجابة الصحيحة', mine: 'اختيارك',
              right: G(g, 'أحسنتَ الاستماع', 'أحسنتِ الاستماع', 'استماع موفّق'),
              wrong: 'الفكرة العامة في الإجابة المعلَّمة، ويمكنك الاستماع مرة أخرى.' })
};
const LET = { en: ['A', 'B', 'C', 'D'], ar: ['أ', 'ب', 'ج', 'د'] };

/* box حاويةُ المشغّل (.aud) · au عنصرُ الصوت · item المصدر ({ id }) ⇒ البطاقة أو null
   تُوضع في صدر الحاوية قبل المشغّل: تُقرأ قبل أن يُضغط تشغيل */
export async function attachGist(box, au, item, { api = realApi } = {}){
  if(!box || !au || !item?.id || seen(item.id)) return null;
  const r = await api.itemGist(item.id).then(x => x, () => null);
  const g = r?.data?.ok ? r.data.gist : null;
  if(!g || !box.isConnected) return null;

  const lang = r.data.lang === 'en' ? 'en' : 'ar', T = TXT[lang](S.prof?.gram_gender), L = LET[lang];
  const name = 'gs' + item.id;
  const el = document.createElement('section');
  el.className = 'gs';
  el.dir = lang === 'en' ? 'ltr' : 'rtl';
  el.lang = lang;
  el.setAttribute('aria-labelledby', name + 'q');
  el.innerHTML = `
    <p class="gs-cue">${icon('audio')}<span>${esc(T.cue)}</span></p>
    <h3 class="gs-q" id="${name}q">${esc(g.q)}</h3>
    <div class="gs-opts" role="radiogroup" aria-labelledby="${name}q">
      ${g.choices.map((c, i) => `<label class="gs-o" data-i="${i}">
        <input type="radio" name="${name}" value="${i}">
        <span class="gs-l" aria-hidden="true">${L[i]}</span>
        <span class="gs-t">${esc(c)}</span>
        <span class="gs-tag"></span>
        <span class="gs-why"></span>
      </label>`).join('')}
    </div>
    <div class="gs-foot">
      <button type="button" class="gs-go" disabled><span class="gs-fill" aria-hidden="true"></span><span class="gs-gt">${esc(T.go)}</span></button>
      <p class="gs-say" aria-live="polite"></p>
    </div>`;
  box.prepend(el);

  const go = el.querySelector('.gs-go'), fill = el.querySelector('.gs-fill'), say = el.querySelector('.gs-say');
  let heard = false, done = false;
  const pick = () => el.querySelector(`input[name="${name}"]:checked`);
  const sync = () => { go.disabled = done || !heard || !pick(); };

  /* الشريطُ مع التشغيل — ونسبةٌ لا عرض: `scaleX` لا يُعيد التخطيط في كلّ إطار */
  const prog = () => {
    if(heard || done) return;
    const d = au.duration;
    if(Number.isFinite(d) && d > 0) fill.style.transform = `scaleX(${Math.min(1, au.currentTime / d)})`;
  };
  au.addEventListener('timeupdate', prog);
  au.addEventListener('ended', () => {
    heard = true;
    fill.style.transform = 'scaleX(1)';
    el.classList.add('heard');
    sync();
  });
  el.querySelectorAll('input').forEach(x => x.onchange = () => {
    el.querySelectorAll('.gs-o').forEach(o => o.classList.toggle('on', o.querySelector('input').checked));
    sync();
  });

  go.onclick = () => {
    const p = pick();
    if(!p || !heard || done) return;
    done = true;
    const mine = +p.value;
    el.classList.add('done');
    el.querySelectorAll('.gs-o').forEach((o, i) => {
      o.querySelector('input').disabled = true;
      o.classList.toggle('ok', i === g.key);
      o.classList.toggle('no', i === mine && i !== g.key);
      o.querySelector('.gs-tag').textContent = i === g.key ? '✔ ' + T.key : i === mine ? T.mine : '';
      const w = (g.why?.[i] || '').trim();
      o.querySelector('.gs-why').textContent = (i === g.key || i === mine) ? w : '';
    });
    say.textContent = mine === g.key ? T.right : T.wrong;
    say.className = 'gs-say ' + (mine === g.key ? 'ok' : 'no');
    go.hidden = true;
    mark(item.id);
  };
  return el;
}
