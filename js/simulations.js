/* ══════════════════════════════════════════════════════════
   بيان — simulations.js
   الوحدة الوحيدة المسؤولة عن عرض عنصرٍ بنمط «محاكاة» وتتبّع إنجازه.
   لا تعرف شيئاً عن المادة أو المقرَّر — تأخذ عنصر درسٍ وتُعيد سلوكه،
   تماماً كما media.js هي الوحدة الوحيدة التي تعرف أين تسكن الوسائط.

   ثلاث حاجات تعليمية تُملي التصميم — بنفس منطق مشغّل الصوت في student.js:
     ① تُضمَّن في مكانها لا في تبويب — السياق جزءٌ من الفهم
     ② عزلٌ كامل: sandbox="allow-scripts" بلا allow-same-origin ⇒
        أصلٌ معزول (opaque origin)، لا وصول لجلسة الطالب ولا localStorage
        حتى لو كان ملف المحاكي على نفس نطاق بيان
     ③ الإنجاز لا يُسجَّل عند الفتح — «فتحَ» ليست «تعلّم» (كما في onended).
        بل عند رسالةٍ صريحة من داخل المحاكي نفسه:

          window.parent.postMessage({ bayanSim:'done' }, '*')

        هذا هو العقد الوحيد المطلوب من أي محاكٍ يُبنى لاحقاً. بلا هذا
        السطر، يبقى العنصر "▶ مفتوح" ولا يصير "✅ منجَز" أبداً — سلوكٌ
        آمن لا كاذب، لا عطلٌ يُصلَح. متى تُطلَق الرسالة بالضبط —
        بعد نقرةٍ؟ بعد استكشافٍ حقيقي؟ — قرارٌ تربويّ يخصّ كل محاكٍ
        على حدة، لا شيء هنا يفرضه.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { toast } from './ui.js';

/* عنصرٌ بنمط محاكاة وله رابط ⇒ يُضمَّن، لا يُفتح في تبويب.
   بخلاف الصوت لا حاجة لفحص الصيغة — كل رابط simulation يُضمَّن. */
export const isSim = i => i.kind === 'simulation' && !!i.url;

let curSim = null;   // { id, win } — المحاكاة المفتوحة الآن؛ تُطابَق بها الرسالة الواردة

window.addEventListener('message', e => {
  if(!curSim || e.source !== curSim.win) return;   // ⚠️ المطابقة بالمصدر لا بالأصل:
                                                    // الإطار المعزول أصله فارغٌ دائماً
  if(!e.data || e.data.bayanSim !== 'done') return;
  finishSim(curSim.id);
});

async function finishSim(itemId){
  const item = (S.lesson?.items || []).find(v => v.id === itemId);
  if(item?.status === 'completed') return;

  const note = document.querySelector(`#slot-${itemId} .sim-note`);
  const { error } = await api.markItemCompleted(itemId);
  if(error){ if(note) note.textContent = "لم يُسجَّل — تحقّق من الاتصال"; return; }

  if(item) item.status = 'completed';
  const s = document.querySelector(`[data-s="${itemId}"]`);
  if(s) s.textContent = '✅';
  if(note) note.textContent = "أُنجزت المحاكاة ✅";
}

/* تُستدعى من student.js عند النقر على عنصر محاكاة.
   نقرةٌ تفتح، نقرةٌ ثانية تطوي — كمشغّل الصوت تماماً. */
export function openSim(i){
  const slot = document.getElementById("slot-"+i.id);
  if(!slot) return;

  if(slot.firstChild){
    slot.innerHTML = "";
    if(curSim?.id === i.id) curSim = null;   // تُبطل مطابقة أي رسالةٍ متأخّرة
    return;
  }

  if(!i.url){ toast("تعذّر الوصول إلى المحاكاة"); return; }

  api.markItemOpened(i.id);

  slot.innerHTML = `
    <div class="sim">
      <div class="sim-bar">
        <span class="sim-note"></span>
        <button class="sim-b" data-a="full">⛶ ملء الشاشة</button>
      </div>
      <iframe class="sim-f" sandbox="allow-scripts"></iframe>
    </div>`;

  const box   = slot.querySelector(".sim");
  const frame = slot.querySelector(".sim-f");

  /* ⚠️ الرابط يُسنَد خاصيةً لا يُدرَج في HTML — كالصوت في student.js
     ولنفس السبب: علامة اقتباسٍ في رابطٍ قديم تكسر الوسم. */
  frame.src = i.url;
  curSim = { id: i.id, win: frame.contentWindow };

  slot.querySelector('[data-a="full"]').onclick = e => {
    const on = box.classList.toggle("full");
    e.target.textContent = on ? "✕ إغلاق" : "⛶ ملء الشاشة";
  };
}
