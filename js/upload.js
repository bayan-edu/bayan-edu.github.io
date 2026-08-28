/* ══════════════════════════════════════════════════════════
   بيان — upload.js
   أداة الرفع المشتركة. زرٌّ **يلتصق بحقلٍ قائم** ولا يستبدله.

   📐 لماذا الالتصاق لا الاستبدال؟
      الحقول الثلاثة (المصدر · صوت السؤال · وسيط الفقرة) لكلٍّ
      منها منطق حفظٍ ومحرّرٌ مختلف. فلو أعدنا بناءها، خاطرنا
      بثلاثة نماذج لأجل زرّ. والالتصاق يترك كل شيء كما هو:
      اللصق اليدوي يعمل، والحفظ يعمل، والزرّ يملأ الحقل فحسب.

   🔒 نقطة الاختناق الوحيدة للرفع. الفحص:
        grep -rn "\.upload(" js/ --exclude=api.js
      لا مخرجات = لا رفع يلتفّ حول هذه الطبقة.

   ⚠️ الفحص هنا **راحةٌ لا حراسة**: يمنع المؤلّف من انتظار رفعٍ
      سيفشل. والحراسة في سياسة storage — ما يجري في المتصفح يُتجاوَز.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { audioKey, AUDIO_MAX_MB } from './media.js';


/* رسائل Supabase إنجليزية وعامّة — نترجمها إلى ما يفعله المؤلّف.
   ⚠️ المطابقة بالنصّ هشّة: قد تتغيّر صياغة المزوّد فتسقط الترجمة.
      ولهذا الفرع الأخير يعرض الأصل بدل أن يبتلعه — رسالةٌ إنجليزية
      خيرٌ من رسالةٍ عربية خاطئة. */
function upMsg(e){
  const m = (e?.message || "").toLowerCase();
  if(m.includes("already exists"))
    return "يوجد ملفٌ بالاسم نفسه — أعد المحاولة (يُولَّد اسمٌ جديد)";
  if(m.includes("row-level security") || m.includes("unauthorized") || m.includes("403"))
    return "لا تملك صلاحية الرفع — راجع المدير";
  if(m.includes("payload") || m.includes("too large") || m.includes("413"))
    return `الملف أكبر من حدّ المخزن (${AUDIO_MAX_MB} م.ب)`;
  if(m.includes("mime") || m.includes("content type"))
    return "نوع الملف غير مقبول في هذا المخزن";
  return "تعذّر الرفع — " + (e?.message || "سببٌ غير معروف");
}

function say(el, txt, bad){
  el.textContent = txt;
  el.className   = "mf-note" + (bad ? " bad" : "");
}


/**
 * يُركّب زرّ رفعٍ بجوار حقلٍ قائم.
 *
 * @param {string} inputId  معرّف حقل النصّ (ur · qa · pfMedia)
 * @param {string} scope    وسمٌ للقراءة: 'l12' درس · 'q5' اختبار
 *
 * تُنادى بعد كل رسم. آمنةٌ عند التكرار: حقلٌ رُكّب عليه يُتجاهل،
 * وحقلٌ غير موجود (لم يُفتح بعد) يُتجاهل بلا خطأ — فلا يلزم
 * المنادي أن يعرف حالة الشاشة.
 */
export function attachUpload(inputId, scope){
  const inp = document.getElementById(inputId);
  if(!inp || inp.dataset.up) return;
  /* حقلٌ مخفيّ (نوع الوسيط لم يُختر بعد) — لا زرَّ بلا حقلٍ يملؤه.
     ⚠️ قبل رفع العَلَم لا بعده: لو وُسم ثم خرجنا، لصار الحقل
        «مُركَّباً» وهو ليس كذلك — فلا يُركَّب أبداً. */
  if(inp.hidden) return;
  inp.dataset.up = "1";

  const wrap = document.createElement("div");
  wrap.className = "mf";
  wrap.innerHTML =
    `<button type="button" class="mf-up">⬆ ارفع ملفاً صوتياً</button>
     <span class="mf-note"></span>
     <input type="file" accept="audio/*" hidden>`;
  inp.insertAdjacentElement("afterend", wrap);

  const btn  = wrap.querySelector(".mf-up");
  const note = wrap.querySelector(".mf-note");
  const pick = wrap.querySelector("input[type=file]");

  btn.onclick = () => pick.click();

  pick.onchange = async () => {
    const f = pick.files[0];
    /* تفريغ الحقل فوراً: بدونه، اختيار **الملف نفسه** مرةً ثانية
       لا يُطلق change — لأن القيمة لم تتغيّر. عطلٌ يظهر عند
       إعادة المحاولة وحدها، وهو أخبث ما في حقول الملفات. */
    pick.value = "";
    if(!f) return;

    const { key, error } = audioKey(scope, f);
    if(error) return say(note, error, true);

    btn.disabled = true;
    say(note, `جارٍ رفع ${f.name}…`);

    const { error: up } = await api.uploadMedia(key, f);
    btn.disabled = false;

    if(up){
      console.warn("[upload] فشل:", key, up);
      return say(note, upMsg(up), true);
    }

    inp.value = key;
    /* الحدثان معاً: المحرّرات تربط أحدهما لا كليهما، والإسناد
       البرمجيّ لا يُطلق شيئاً من نفسه. فبدونهما يمتلئ الحقل
       ولا يُحفظ — وهو أسوأ عطلٍ ممكن هنا: يبدو ناجحاً. */
    inp.dispatchEvent(new Event("input",  { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));

    say(note, "تمّ الرفع ✅ — احفظ لتثبيته");
  };
}
