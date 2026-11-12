/* ══════════════════════════════════════════════════════════
   بيان — editor_promotion.js · لوحةُ «شرط الترقية» في شاشة دروس المقرَّر  (b238 · المرحلة ٥ · sql/205)

   🔑 **الشرطُ يُكتب حيث تُبنى الكتب** — نصُّ المالك: «الترقية تكون حسب العدد الذي يدخله المصمم أثناء بناء المكتبة،
      وقد يتم تطوير العدد بناءً على النتائج». فاللوحةُ في شاشة دروس المقرَّر نفسِها (`openCourse` · editor.js)، فوق
      الدروس، وبجوار العدد خبرُ المنشور منها — المصمّمُ يرى ما يطلبه وما بين يدي الطالب معاً.
   🔑 **ولكلّ مادّةٍ تدرّجُها بالمستوى** (المكتبةُ وIELTS): القاعدةُ تقول «لا ينطبق» لغيرها فلا تُرسم اللوحة —
      ولا يعرف هذا الملفّ اسمَ مادّة.
   🔑 **«ويُطوَّر بالنتائج»:** العددُ يُعدَّل في أيّ وقت، وكلُّ تعديلٍ يُكتب في السجلّ بما قبله وما بعده **ومعه سببُه**
      (حقلٌ اختياريّ) — فمن قرأ النتائجَ بعد شهرٍ يعرف أيَّ شرطٍ أنتجها ولماذا تغيّر.
   🔑 **والحارسُ ينبّه ولا يمنع** (`problems` من القاعدة رموزاً، والنصُّ هنا بأرقامنا): مقرَّرٌ بلا شرط · أعلى مستوى ·
      عددٌ فوق المنشور · حدٌّ فوق منشور رفّه · ومجموعُ الحدود فوق العدد. الحفظُ لا يُردّ بها: المصمّمُ يبني قبل أن ينشر.
   📌 وتُحمَّل عند الطلب (`import()` في openCourse) ولفريق الإشراف وحده (`course.curate`) — كاتبُ الشرط حارسُه
      `can_curate` كإنشاء الدرس.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { esc, AR, toast } from './ui.js';

/* نصُّ تنبيهات الحارس — سجلُّ المؤلّف (الهويّةُ اللغويّة §١): جملةٌ تقول الكلفة، بلا أمر */
const PROBLEM = {
  no_rule:           () => 'بلا شرط لا ينتقل طالب من هذا المقرر إلى المستوى التالي.',
  top:               () => 'هذا أعلى مستوى في السلم، فلا مستوى بعده يُنتقل إليه.',
  total_unreachable: p  => `العدد ${AR(p.need)} والمنشور من الكتب ${AR(p.have)}، فلا يبلغه أحد قبل نشر غيرها.`,
  min_unreachable:   p  => `الحد في «${esc(p.name)}» ${AR(p.need)} والمنشور فيه ${AR(p.have)}.`,
  mins_exceed:       p  => `مجموع حدود الرفوف ${AR(p.sum)} أكبر من العدد ${AR(p.total)}.`,
};

/**
 * يرسم اللوحة في `slot` أو يرفعه إن لم تنطبق. لا يرمي: فشلُها لا يحجب دروسَ المقرَّر تحتها.
 */
export async function mountPromotion(course, slot){
  const load = () => api.coursePromotion(course.id).then(r => r, e => ({ error: e }));
  let { data, error } = await load();
  if(!slot.isConnected) return;
  /* لا ينطبق (مادّةٌ غيرُ مدرَّجة · مقرَّرٌ بلا مستوى) أو لا صلاحية ⇒ لا لوحة. والخطأُ يُقال للمصمّم سطراً لا يحجب */
  if(error){ slot.innerHTML = `<div class="warnbox">تعذر تحميل شرط الترقية: ${esc(error.message || '')}</div>`; return; }
  if(!data?.ok || !data.applicable){ slot.remove(); return; }
  paint(data);

  function paint(d){
    const rule = d.rule;
    const mins = new Map((rule?.mins || []).map(m => [String(m.strand_id), m.min]));
    const pub  = d.counts?.published ?? 0, all = d.counts?.all ?? 0;
    const strands = d.strands || [];

    slot.innerHTML = `
      <section class="card ed-promo" aria-labelledby="edpT">
        <div class="ed-promo-h">
          <b id="edpT">شرط الترقية</b>
          ${d.next ? `<span class="chip">إلى <bdi>${esc(d.next.name)}</bdi></span>`
                   : '<span class="chip">أعلى مستوى</span>'}
        </div>
        <p class="ed-promo-d">عدد الكتب التي ينجزها الطالب في هذا المقرر لينتقل إلى المستوى التالي.
          العدد قابل للتعديل في أي وقت، وكل تعديل محفوظ في السجل مع سببه.</p>

        <div class="ed-promo-row">
          <label class="ed-promo-n"><span>عدد الكتب</span>
            <input type="number" id="edpTotal" min="1" max="99" inputmode="numeric" value="${rule ? rule.total : ''}"></label>
          <span class="ed-promo-pub">في المقرر ${AR(all)}، المنشور منها ${AR(pub)}</span>
        </div>

        ${strands.length ? `<details class="ed-promo-mins"${mins.size ? ' open' : ''}>
          <summary>حد أدنى من رف أو أصل — اختياري</summary>
          <div class="ed-promo-grid">${strands.map(s => `
            <label class="ed-promo-s${s.leaf ? '' : ' par'}">
              <span><bdi>${esc(s.name)}</bdi>${s.leaf ? '' : ' <i>كل رفوفه</i>'}</span>
              <input type="number" min="1" max="99" inputmode="numeric" data-s="${s.id}"
                     value="${mins.get(String(s.id)) ?? ''}" aria-label="${esc('الحد الأدنى من ' + s.name)}">
              <em>المنشور ${AR(s.published)}</em>
            </label>`).join('')}
          </div>
        </details>` : ''}

        ${(d.problems || []).map(p => `<div class="warnbox">${(PROBLEM[p.code] || (() => esc(p.code)))(p)}</div>`).join('')}

        <div class="ed-promo-row">
          <input type="text" id="edpNote" maxlength="200" placeholder="سبب التعديل — اختياري، ويُحفظ في السجل">
        </div>
        <div class="nav ed-promo-btns">
          <button type="button" class="btn primary" id="edpSave">حفظ الشرط</button>
          ${rule ? '<button type="button" class="btn ghost" id="edpClear">إلغاء الشرط</button>' : ''}
        </div>
      </section>`;

    const save = async (total, mins, note) => {
      const btns = slot.querySelectorAll('button');
      btns.forEach(b => b.disabled = true);
      const { data: r, error: e } = await api.savePromotionRule(course.id, total, mins, note).then(x => x, x => ({ error: x }));
      btns.forEach(b => b.disabled = false);
      if(e || !r?.ok){ toast(e?.message || r?.error || 'تعذر الحفظ'); return; }
      toast(total == null ? 'أُلغي شرط الترقية' : 'حُفظ شرط الترقية');
      ({ data, error } = await load());
      if(slot.isConnected && data?.ok && data.applicable) paint(data);
    };

    slot.querySelector('#edpSave').onclick = () => {
      const raw = slot.querySelector('#edpTotal').value.trim();
      const total = Number(raw);
      if(!raw || !Number.isInteger(total) || total < 1 || total > 99){
        toast('عدد الكتب من ١ إلى ٩٩'); slot.querySelector('#edpTotal').focus(); return;
      }
      const list = [...slot.querySelectorAll('[data-s]')]
        .map(i => ({ strand_id: Number(i.dataset.s), min: Number(i.value) || 0 }))
        .filter(m => m.min > 0);
      save(total, list, slot.querySelector('#edpNote').value.trim());
    };
    const clr = slot.querySelector('#edpClear');
    if(clr) clr.onclick = () => {
      if(!confirm('إلغاء شرط الترقية لهذا المقرر؟ لن ينتقل منه طالب حتى يُكتب شرط جديد.')) return;
      save(null, [], slot.querySelector('#edpNote').value.trim());
    };
  }
}
