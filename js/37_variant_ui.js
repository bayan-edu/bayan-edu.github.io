/* ══════════════════════════════════════════════════════════
   بيان · 37 — واجهة النسخ المكافئة
   رقعتان: api.js (سطران) · editor_quiz.js (أربعة مواضع)
   ⚠️ يلزم تشغيل 34 و34b و36 قبلها.
   ══════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────
   ① api.js — بعد setSection مباشرة
   ───────────────────────────────────────────────────────── */

// الخانة حاوية ثالثة — لكنها مجموعة لا مدى: النسخ لا تتجاور بالضرورة
export const setVariant   = ids => db.rpc('set_variant',   { p_ids: ids });
export const clearVariant = ids => db.rpc('clear_variant', { p_ids: ids });


/* ─────────────────────────────────────────────────────────
   ② editor_quiz.js — أضِف هذا القسم بعد passageBar
   ───────────────────────────────────────────────────────── */

/* ═══════════ الخانة — النسخ المكافئة ═══════════
   ⚠️ الخانة ليست مدى كالقسم والنصّ: النسخ قد تتباعد في الترتيب،
      فلا تُستعمل range() هنا بل بحثٌ بالمفتاح في كل الأسئلة.

   والبصمة تُحسب في الواجهة لا في القاعدة: quiz_for_edit تُرجع
   خيارات كل الأسئلة بأكوادها أصلاً — فالمقارنة بلا نداء. */

/* بصمة الفخاخ — نظير array_agg(distinct dx order by dx) في القاعدة */
const fp = q => [...new Set((q.options || [])
    .filter(o => !o.correct).map(o => o.dx).filter(Boolean))].sort();

const partners = q => !q.variant_key ? []
  : Z.questions.filter(x => x.variant_key === q.variant_key && x.id !== q.id);

const dxName = code => ((S.tree?.dx) || []).find(d => d.code === code)?.name || code;

function variantBar(q, locked){
  if(!q.variant_key){
    return (locked || !q.id) ? '' :
      `<button class="eq-bar add" id="mkvar">⇄ اصنع بديلاً مكافئاً —
        يقيس المهارة نفسها بمحتوى آخر</button>`;
  }

  const ps   = partners(q);
  const mine = fp(q).join(' · ');
  const bad  = ps.filter(p => fp(p).join(' · ') !== mine);

  const traps = p => (p.options || []).filter(o => !o.correct && o.dx)
    .map(o => `<span class="chip">${esc(dxName(o.dx))}</span>`).join('');

  return `<div class="eq-bar sec">
    <div class="eq-brow">
      <span class="eq-bt">⇄ خانة ${esc(q.variant_key)}</span>
      <span class="eq-bs">${AR(ps.length + 1)} نسخ في الخانة</span>
      ${locked ? '' : `<button class="it-b" id="rmvar">✕ فكّ</button>`}
    </div>

    ${ps.map(p => `<div class="eq-brow" style="margin-top:8px">
        <span class="eq-bs">سؤال ${AR(p.position)}</span>
        <span class="eq-bt" dir="auto" style="flex:1;min-width:0">
          ${esc((p.body || '').slice(0, 60))}</span>
        <span style="display:flex;gap:5px;flex-wrap:wrap">${traps(p)}</span>
      </div>`).join('')}

    ${bad.length ? `<div class="warnbox" style="margin-top:10px">
        ⚠️ الفخاخ غير متطابقة — النسخة لا تقيس ما يقيسه شريكها.<br>
        هنا: <b>${esc(mine || '—')}</b> · الشريك: <b>${esc(fp(bad[0]).join(' · ') || '—')}</b><br>
        صحّح <b>الخيار</b> لا الكود — الكود يصف المشتّت ولا يصنعه.
      </div>` : `<div class="eq-bs" style="margin-top:8px">✅ الفخاخ متطابقة</div>`}
  </div>`;
}

/* التكرار حركة · والاقتران إعلان — وهذا الزرّ إعلانُ الكاتب صراحةً */
async function makeVariant(q){
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;

  const d = await api.duplicateQuestion(q.id);
  if(d.error || !d.data?.ok){ toast(d.error?.message || d.data?.error); return; }
  const nid = d.data.id;

  const v = await api.setVariant([q.id, nid]);
  if(v.error || !v.data?.ok) toast(v.error?.message || v.data?.error || "تعذّر الاقتران");
  else toast(`أُنشئ بديل في خانة ${v.data.key} — بدّل المحتوى وأبقِ الفخاخ`);

  // إعادة تحميل مباشرة: نحتاج الانتقال إلى البديل بعدها
  const { data: z } = await api.quizForEdit(Z.id);
  if(z?.ok){
    Z = z; dirty = false;
    const i = Z.questions.findIndex(x => String(x.id) === String(nid));
    if(i >= 0) cur = i;
    render();
  }
}

async function unVariant(q){
  const { data, error } = await api.clearVariant([q.id]);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("فُكّت الخانة");
  reload();
}


/* ─────────────────────────────────────────────────────────
   ③ editor_quiz.js — داخل qCard، بعد سطر passageBar
   ───────────────────────────────────────────────────────── */

//     ${sectionBar(q, locked)}
//     ${passageBar(q, locked)}
       ${variantBar(q, locked)}          // ◀ أضِف هذا السطر


/* ─────────────────────────────────────────────────────────
   ④ editor_quiz.js — داخل wire()، مع بقية bind
   ───────────────────────────────────────────────────────── */

//  bind("rmpg",  () => applyPassage(null));
    bind("mkvar", () => makeVariant(q));   // ◀ سطران جديدان
    bind("rmvar", () => unVariant(q));


/* ─────────────────────────────────────────────────────────
   ⑤ editor_quiz.js — داخل render()، في عنصر الشريط الجانبي
   ───────────────────────────────────────────────────────── */

// قبل:
//   <span class="eq-k">${x.kind==='essay'?'✍️':'◉'}</span>
// بعد:
     <span class="eq-k">${x.variant_key?'⇄':''}${x.kind==='essay'?'✍️':'◉'}</span>
