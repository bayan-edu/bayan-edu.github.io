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
      سيفشل. والحراسة في الخادم — الدالّة الطرفيّة r2-sign لـR2 (منذ b161)،
      وسياسة storage لـSupabase — فما يجري في المتصفح يُتجاوَز.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { audioKey, imageKey, AUDIO_MAX_MB, IMG_MAX_MB } from './media.js';


/* 🆕 b135 · والنوعُ سطرٌ في جدول — لا ملفٌّ ثانٍ ولا دالّةٌ موازية.
   وهي سابقةُ `b133` و`b134` نفسُها: ما افترق بيانٌ، وما اشترك منطقٌ.
   ⇒ وزيادةُ نوعٍ ثالثٍ يوماً (وثيقة · فيديو) سطرٌ هنا لا أكثر. */
const KIND = {
  audio: { label: '⬆ رفع ملفّ صوتيّ', accept: 'audio/*', key: audioKey, max: AUDIO_MAX_MB },
  image: { label: '⬆ رفع صورة',       accept: 'image/*', key: imageKey, max: IMG_MAX_MB   },
};


/* رسائل Supabase إنجليزية وعامّة — نترجمها إلى ما يفعله المؤلّف.
   ⚠️ المطابقة بالنصّ هشّة: قد تتغيّر صياغة المزوّد فتسقط الترجمة.
      ولهذا الفرع الأخير يعرض الأصل بدل أن يبتلعه — رسالةٌ إنجليزية
      خيرٌ من رسالةٍ عربية خاطئة. */
function upMsg(e, maxMb){
  /* 🆕 b161 · الرمزُ أوّلاً حين يُعرف (الدالّةُ الطرفيّة وR2 يُرجعانه) — فلا
     تتّكئ الترجمةُ على صياغة مزوّد. والنصُّ بعده لـSupabase كما كان. */
  if(e?.status === 403) return "لا صلاحية رفع لهذا الحساب — والمراجعة للمدير";
  if(e?.status === 413) return `الملف أكبر من حدّ المخزن (${maxMb} م.ب)`;
  if(e?.status === 412) return "يوجد ملف بالاسم نفسه — تُعاد المحاولة (يُولَّد اسم جديد)";
  const m = (e?.message || "").toLowerCase();
  if(m.includes("already exists"))
    return "يوجد ملف بالاسم نفسه — تُعاد المحاولة (يُولَّد اسم جديد)";
  if(m.includes("row-level security") || m.includes("unauthorized") || m.includes("403"))
    return "لا صلاحية رفع لهذا الحساب — والمراجعة للمدير";
  if(m.includes("payload") || m.includes("too large") || m.includes("413"))
    return `الملف أكبر من حدّ المخزن (${maxMb} م.ب)`;
  if(m.includes("mime") || m.includes("content type"))
    return "نوع الملف غير مقبول في هذا المخزن";
  return "تعذّر الرفع — " + (e?.message || "سبب غير معروف");
}

function say(el, txt, bad){
  el.textContent = txt;
  el.className   = "mf-note" + (bad ? " bad" : "");
}


/* 🆕 b165 · صورةٌ أكبرُ من الحدّ **تُصغَّر في المتصفّح قبل الرفع — لا تُرفض.**
   صورُ الهاتف ٣–٦ م.ب والحدُّ ٢، ورفضُها يترك المعلّمَ يبحث عن أداة ضغطٍ
   خارج المنصّة. ⇒ أطولُ ضلعٍ ١٦٠٠px (يملأ شاشةَ التكبير) بصيغة WebP —
   تحفظ الشفافية — أو JPEG على أرضٍ بيضاء في متصفّحٍ لا يرمّز WebP.
   🔑 وما كان دون الحدّ يُرفع كما هو: جودةُ صورة المعلّم لا تُمسّ بلا حاجة.
   ⚠️ والحارسُ بعدُ في الخادم — `r2-sign` يوقّع الصيغةَ من الامتداد والحجمَ
      (WebP مقبولة · ٢ م.ب) — فهذه راحةٌ لا حراسة. */
const SHRINK_EDGE = 1600, SHRINK_Q = 0.85;
async function shrinkImage(f, maxMb){
  if(f.size <= maxMb * 1048576) return f;
  try{
    const bmp = await createImageBitmap(f);
    const k = Math.min(1, SHRINK_EDGE / Math.max(bmp.width, bmp.height));
    const cv = document.createElement("canvas");
    cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
    const g = cv.getContext("2d");
    const enc = (type) => new Promise(r => cv.toBlob(r, type, SHRINK_Q));
    g.drawImage(bmp, 0, 0, cv.width, cv.height);
    let blob = await enc("image/webp"), ext = "webp";
    if(!blob || blob.type !== "image/webp"){            // يُرجع PNG بصمت إن لم يعرف WebP
      g.globalCompositeOperation = "destination-over";
      g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height);
      blob = await enc("image/jpeg"); ext = "jpg";
    }
    bmp.close?.();
    if(!blob || blob.size >= f.size) return f;
    return new File([blob], f.name.replace(/\.[^.]+$/, "") + "." + ext, { type: blob.type });
  }catch(e){
    console.warn("[upload] تعذّر تصغير الصورة:", e);
    return f;
  }
}


/* 🆕 b170 · سطرُ وسيطٍ في نصّ — يشترك فيه زرّا الصورة (هنا) والفيديو (editor_items).
   سطرٌ وحده: يُفصل عمّا قبله وما بعده بسطرٍ جديد إن لم يكن، ويقف المؤشّرُ قبل «]»
   فيُكتب التعليقُ في الحال. والحدثان يُطلقهما المنادي (المحرّرُ يحفظ بأحدهما). */
export function insertLine(inp, line){
  const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a;
  const pre  = a > 0 && inp.value[a - 1] !== "\n" ? "\n" : "";
  const post = inp.value[b] === "\n" ? "" : "\n";
  inp.setRangeText(pre + line + post, a, b, "end");
  const at = a + pre.length + line.length - 1;
  inp.focus(); inp.setSelectionRange(at, at);
}


/**
 * يُركّب زرّ رفعٍ بجوار حقلٍ قائم.
 *
 * @param {string} inputId  معرّف حقل النصّ (ur · qa · pfMedia)
 * @param {string} scope    وسمٌ للقراءة: 'l12' درس · 'q5' اختبار · 'c5' مجموعة
 * @param {string} kind     'audio' (الافتراض) أو 'image' — سطرُه في KIND
 * @param {object} [o]
 * @param {(key:string, field:HTMLElement)=>string} [o.insert]
 *        🆕 b165 · يُدرِج ما يعيده حيث المؤشّر بدل أن يستبدل الحقل —
 *        لصورةٍ داخل نصّ (`[صورة: المفتاح | ]`). والمؤشّرُ يقف قبل «]»
 *        فيُكتب التعليقُ في الحال.
 * @param {string} [o.label] اسمُ الزرّ إن خالف اسمَ النوع
 *
 * تُنادى بعد كل رسم. آمنةٌ عند التكرار: حقلٌ رُكّب عليه يُتجاهل،
 * وحقلٌ غير موجود (لم يُفتح بعد) يُتجاهل بلا خطأ — فلا يلزم
 * المنادي أن يعرف حالة الشاشة.
 */
export function attachUpload(inputId, scope, kind = 'audio', o = {}){
  const K = KIND[kind] || KIND.audio;
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
    `<button type="button" class="mf-up">${o.label || K.label}</button>
     <span class="mf-note"></span>
     <input type="file" accept="${K.accept}" hidden>`;
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

    let file = f;
    if(kind === 'image' && f.size > K.max * 1048576){
      btn.disabled = true;
      say(note, "جار تصغير الصورة…");
      file = await shrinkImage(f, K.max);
      btn.disabled = false;
    }

    const { key, error } = K.key(scope, file);
    if(error) return say(note, error, true);

    btn.disabled = true;
    say(note, `جار رفع ${f.name}…`);

    const { error: up } = await api.uploadMedia(key, file);
    btn.disabled = false;

    if(up){
      console.warn("[upload] فشل:", key, up);
      return say(note, upMsg(up, K.max), true);
    }

    if(o.insert) insertLine(inp, o.insert(key, inp));
    else inp.value = key;
    /* الحدثان معاً: المحرّرات تربط أحدهما لا كليهما، والإسناد
       البرمجيّ لا يُطلق شيئاً من نفسه. فبدونهما يمتلئ الحقل
       ولا يُحفظ — وهو أسوأ عطلٍ ممكن هنا: يبدو ناجحاً. */
    inp.dispatchEvent(new Event("input",  { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));

    say(note, o.insert ? "أُدرجت الصورة ✔ — ويُكتب تعليقُها قبل «]»، ثمّ الحفظ"
                       : "تمّ الرفع ✔ — ويبقى الحفظ لتثبيته");
  };
}
