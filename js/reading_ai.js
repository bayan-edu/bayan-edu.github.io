/* ══════════════════════════════════════════════════════════
   بيان — reading_ai.js · التحليلُ الآليّ للقراءة الجهريّة في شاشة المعلّم
   (b174 · sql/177)

   أدواتٌ نقيّة: لا DOM ولا شبكة ولا `ui.js` — فتُقاس في node كما تُشحن
   (`node tools/reading_ai.test.mjs`). والرسمُ في `teacher.js`.

   🎯 **مسودةٌ للمعلّم لا حكمٌ على الطالب.** التحليلُ يُعرض بجوار الصوت، والمعلّمُ
      يُدرجه في ملاحظته فيُقِرّ أو يُعدّل — والطالبُ لا يرى إلّا ما أرسله المعلّم.
      فقِيس على أصوات الطلّاب قبل أن يصل أحدَهم حكمٌ لم يراجعه إنسان.
   ══════════════════════════════════════════════════════════ */

/* سطرُ الصورة والفيديو — نسخةُ `FIG` في `book.js` حرفاً، ونسختُه الثالثة في
   `supabase/functions/reading-analyze/core.js`. غيّرتَها هناك؟ غيّرها هنا. */
export const FIG = /^\[\s*(صورة|image|فيديو|video)\s*[:：]\s*([^|\]\n]+?)\s*(?:\|\s*([^\]\n]*?))?\s*\]$/i;

/** فقراتُ النصّ كما يقرؤها الطالب — بلا سطر الوسيط.
    🔴 عطلُ `b169`: كانت شاشةُ المعلّم تقسم النصَّ خاماً، فظهر `[image: r2:… | سؤال]`
       حرفيّاً فوق نصّ ٤٣١. */
export function paragraphs(body){
  return String(body || '').replace(/\r\n?/g, '\n')
    .split('\n').filter(l => !FIG.test(l.trim())).join('\n')
    .split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
}

/* الكلمةُ كما تُعرض: بلا علامة وقفٍ ملتصقةٍ بطرفيها («learning.» ⇒ «learning») */
const bare = w => String(w ?? '').replace(/^[«"“'(\[]+|[.,!?;:،؛؟"”»')\]]+$/g, '').trim();

/** صفوفُ اللوحة: النوعُ وما في النصّ وما سُمع، وموضعُ الحذف والزيادة.
    الصفُّ يصف ما حدث ولا يحكم على الطالب. */
export function issueRows(issues){
  return (Array.isArray(issues) ? issues : []).map(o => {
    if(o?.op === 'sub') return { kind: 'sub', expected: bare(o.ref), heard: bare(o.hyp), next: '' };
    if(o?.op === 'del') return { kind: 'del', expected: bare(o.ref), heard: '', next: bare(o.next) };
    if(o?.op === 'ins') return { kind: 'ins', expected: '', heard: bare(o.hyp), next: bare(o.next) };
    return null;
  }).filter(r => r && (r.expected || r.heard));
}

const IND = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);

/** مسودةُ الملاحظة — يقرؤها الطالبُ إن أقرّها المعلّم.
    🗣️ خطابٌ مباشر بصيغةٍ تصحّ للطالب والطالبة بلا `G()`: الماضي المخاطب بلا
       تشكيل («قرأت» · «أضفت») والمصدر («إعادة قراءة»). ولا «أخطأت» — بل ما وقع
       وأين، فالطالبُ يعرف ما يصحّح.
    📏 لا تتجاوز حدَّ الملاحظة (١٠٠٠ حرف · `recordings_note_len`)، وتسمّي أوّلَ
       `max` موضعاً، وما بقي يُعدّ ولا يُسرد. */
export function noteDraft(a, max = 8){
  const rows = issueRows(a?.issues);
  const ref = Number(a?.ref_words) || 0, ok = Number(a?.correct) || 0;
  const head = ref ? `قرأت ${IND(ok)} كلمة من ${IND(ref)} كما هي في النص.` : '';
  if(!rows.length) return [head, 'لم تسقط كلمة ولم تتبدل.'].filter(Boolean).join('\n');

  const where = r => r.next ? ` قبل ${r.next}` : '';
  const lines = rows.slice(0, max).map(r =>
      r.kind === 'sub' ? `- قرأت ${r.heard} بدل ${r.expected}`
    : r.kind === 'del' ? `- سقطت كلمة ${r.expected}${where(r)}`
    :                    `- أضفت ${r.heard}${where(r)}`);
  const rest = rows.length - lines.length + (Number(a?.more) || 0);
  if(rest === 1) lines.push('- وموضع آخر');
  else if(rest > 1) lines.push(`- ومواضع أخرى عددها ${IND(rest)}`);

  return [head, 'مواضع تحتاج انتباهاً:', ...lines,
          'والتدريب: إعادة قراءة الجمل التي فيها هذه الكلمات.']
    .filter(Boolean).join('\n').slice(0, 1000);
}

/** يُدرَج في الملاحظة: يملأ الفارغة، ويُلحق بما كتبه المعلّم ولا يمحوه */
export function mergeNote(current, draft){
  const c = String(current || '').trim();
  return (c ? c + '\n\n' + draft : draft).slice(0, 1000);
}
