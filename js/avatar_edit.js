/* ══════════════════════════════════════════════════════════
   بيان — avatar_edit.js  ·  شاشةُ تخصيص العلامة

   المحاورُ الأربعة (§② من خطّة الأفاتار): اللون × الإطار × شكل القرص
   × الحرف. وهي **مستقلّة تُجمع ولا تُضرَب** — ولذلك يُعرَض كلُّ محورٍ
   وحده، ولا يحتاج خيارٌ فيه فحصاً مع خيارٍ في غيره.

   🔴 **والمعاينةُ حجمان لا حجمٌ واحد — وهذا لبُّ الشاشة.** القرارُ
      يُتَّخذ عند ١٤٠px ويُعاش عند ٣٢ في الدرج. وشاشةٌ تعرض الكبيرَ
      وحده **تُغري باختيارٍ ينهار حيث يُستعمل**. فيُعرض الاثنان معاً.

   🟡 **ونظامُ الزخارف خارجَ هذه الشاشة اليوم:** جدولُ `avatar_motifs`
      قائمٌ بتسع زخارف (١٢٥)، **ورسومُها لم تُنجز** — و`renderMark` لا
      تعرف غيرَ الحرف. **عائقُ محتوى لا تقنية**، ومكانُه لسانٌ ثانٍ
      في هذه الشاشة يوم تُرسم. ولا يُعرض لسانٌ فارغ.

   🔒 وهذه الوحدةُ تلمس القاعدة (كـ`student.js`) — بخلاف `ui.js`.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, nav, scrollTop } from './ui.js';
import { renderMark, avatarLetter, avatarColor, FRAMES, SHAPES, AV_N,
         whenReady } from './avatar.js';

const FRAME_AR = { star:'نجمة', oct:'مثمّن', ring:'عِقد', none:'بلا إطار' };
const SHAPE_AR = { circle:'دائرة', squircle:'مربّع مستدير' };

/* مسوّدةٌ محلّية — لا تُكتب حتى يُحفظ. والمعاينةُ تقرأ منها. */
let D = null;

const isLetter = c => /[ء-يA-Za-z]/.test(c || '');

/** الملفُّ كما سيصير لو حُفظت المسوّدة — تقرؤه المعاينةُ وحدها */
const preview = () => ({ ...S.prof, ...D });

function axis(title, note, name, items){
  return `
    <div class="av-ax">
      <div class="grp">${esc(title)}${note ? `<span class="av-note">${esc(note)}</span>` : ''}</div>
      <div class="av-opts" data-ax="${name}">${items}</div>
    </div>`;
}

function render(){
  const p = preview();
  const letterNow = D.avatar_letter || avatarLetter(S.prof?.full_name);
  const derived   = avatarLetter(S.prof?.full_name);

  const colors = Array.from({length:AV_N}, (_,i) => {
    const c = 'av-' + (i+1);
    const on = (D.avatar_color || avatarColor(S.prof?.id)) === c;
    return `<button type="button" class="av-sw" data-v="${c}" aria-pressed="${on}"
              style="--sw:var(--${c})" aria-label="لون ${i+1}"></button>`;
  }).join('');

  const frames = FRAMES.map(f => {
    const on = (D.avatar_frame || 'star') === f;
    return `<button type="button" class="av-opt" data-v="${f}" aria-pressed="${on}">
        ${renderMark({ ...p, avatar_frame:f }, 46)}<span>${FRAME_AR[f]}</span></button>`;
  }).join('');

  const shapes = SHAPES.map(s => {
    const on = (D.avatar_shape || 'circle') === s;
    return `<button type="button" class="av-opt" data-v="${s}" aria-pressed="${on}">
        ${renderMark({ ...p, avatar_shape:s }, 46)}<span>${SHAPE_AR[s]}</span></button>`;
  }).join('');

  app.innerHTML = `
    <div class="crumb" id="bk">← رجوع</div>

    ${/* 🔴 الحجمان معاً — القرارُ عند الكبير والعيشُ عند الصغير */''}
    <div class="card av-prev">
      <div class="av-prev-big">${renderMark(p, 140)}</div>
      <div class="av-prev-side">
        <div class="av-prev-sm">${renderMark(p, 32)}</div>
        <div class="line">هكذا تظهر في الدرج والشريط — وهو حجمُها الذي تُعاش فيه.</div>
      </div>
    </div>

    ${axis('اللون', '', 'color', colors)}
    ${axis('الإطار', '', 'frame', frames)}
    ${axis('شكل القرص', '', 'shape', shapes)}

    <div class="av-ax">
      <div class="grp">الحرف<span class="av-note">يُشتقّ من اسمك، ويُغيَّر إن شئت</span></div>
      <div class="av-letter">
        <input type="text" id="avL" maxlength="2" dir="auto" value="${esc(letterNow)}"
               inputmode="text" aria-label="حرف العلامة">
        ${D.avatar_letter
          ? `<button type="button" class="btn ghost" id="avLrst">إرجاعُه إلى «${esc(derived)}»</button>`
          : `<span class="line">مشتقٌّ من «${esc(S.prof?.full_name || '')}»</span>`}
      </div>
    </div>

    <div class="nav" style="margin-top:20px">
      <button class="btn primary" id="avSave">حفظ</button>
      <button class="btn ghost" id="avReset">إرجاعُ الكلّ إلى المشتقّ</button>
    </div>`;

  wire();
}

function wire(){
  document.getElementById('bk').onclick = () => nav('subjects') || history.back();

  app.querySelectorAll('.av-opts').forEach(box => {
    const ax = box.dataset.ax;
    box.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
      D['avatar_' + ax] = b.dataset.v;
      render();
    });
  });

  const inp = document.getElementById('avL');
  inp.oninput = () => {
    const ch = [...inp.value].find(isLetter);
    /* 🔑 لا يُرفض ما كُتب بل يُلتقط أوّلُ حرفٍ منه — من لصق اسمَه كاملاً
       يجد حرفَه، ومن كتب رمزاً لا يرى شاشةً تصيح به. */
    if(!ch) return;
    D.avatar_letter = ch;
    render();
    const el = document.getElementById('avL');
    el.focus(); el.setSelectionRange(el.value.length, el.value.length);
  };

  const rst = document.getElementById('avLrst');
  if(rst) rst.onclick = () => { D.avatar_letter = null; render(); };

  document.getElementById('avReset').onclick = () => {
    D = { avatar_kind:null, avatar_motif:null, avatar_frame:null,
          avatar_color:null, avatar_shape:null, avatar_letter:null };
    render();
  };

  document.getElementById('avSave').onclick = async e => {
    const b = e.currentTarget; b.disabled = true; b.textContent = '…';
    const { data, error } = await api.setMyAvatar(S.user.id, D);
    b.disabled = false; b.textContent = 'حفظ';
    if(error){ toast('تعذّر الحفظ — ' + error.message); return; }
    /* 🔴 **وصفرُ صفوفٍ ليس نجاحاً.** سياسةُ RLS تحجب فتُعيد صفراً **بلا
       خطأ**، فتقول الشاشةُ «حُفظت» ولم يُحفظ شيء — وهو عينُ العطل الذي
       كلّف `106` (تعليمُ الملاحظة مقروءةً). ⇒ يُقرأ عددُ ما تغيّر. */
    if(!data?.length){ toast('لم يقع الحفظ — لم يمسَّ صفَّك شيء'); return; }
    /* 🔑 والملفُّ الحيُّ يتبع المحفوظ فوراً: العلامةُ في الشريط والدرج
       تُرسم من `S.prof`، ولو لم يُحدَّث لبقيت القديمةَ حتى إعادة تحميل
       — **فيظنّ صاحبُها أنّ الحفظ لم يقع.** */
    Object.assign(S.prof, D);
    toast('حُفظت صورتك');
    nav('subjects');
    render();
  };
}

export async function openAvatarEdit(){
  nav('subjects');
  head('صورتي', 'أربعةُ محاور — والمعاينةُ حيّةٌ قبل الحفظ');
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  await whenReady();                 // الخطُّ قبل أوّل قياس (١٢٥)
  const p = S.prof || {};
  D = { avatar_kind:p.avatar_kind ?? null, avatar_motif:p.avatar_motif ?? null,
        avatar_frame:p.avatar_frame ?? null, avatar_color:p.avatar_color ?? null,
        avatar_shape:p.avatar_shape ?? null, avatar_letter:p.avatar_letter ?? null };
  render();
  scrollTop();
}
