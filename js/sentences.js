/* ═══════════════════════════════════════════════════════════════════
   🆕 b244 · جملُ النصّ — قاعدةُ تقسيمٍ واحدة، ومعها صيغُ الاستيراد المختصرة لأنماط ق١٦

   🔑 **لماذا وحدةٌ مستقلّة:** التقسيمُ كان في `editor_quiz.js` يخدم المحرّرَ وحده. ثمّ جاء الاستيراد بمسارَيه —
      صندوقُ الاختبار (`parseImport`) وبوّابةُ المقرّر (`editor_import.js` ⇐ `import_quiz` · `import_bank`) —
      وكلاهما يحتاج القاعدةَ نفسَها. **ونسختان من مسطرةٍ واحدة تفترقان** (رأسُ editor_import.js) ⇒ مصدرٌ واحد
      يستورده الثلاثة. وهي خالصةٌ بلا DOM ولا شبكة، فيستوردها محوّلٌ في `tools/` كما هي.

   🔑 **ولماذا تُوسَّع الصيغُ هنا لا في القاعدة:** مشروعُ القراءة يكتب الدليلَ **نصَّ جملة**
      (`"evidence": ["Many people put too much water…"]`) لا قائمةَ جملٍ مقسّمة. والقاعدةُ لا تعرف قاعدةَ التقسيم —
      ونسخةٌ منها في SQL مسطرةٌ ثانية. ⇒ تُوسَّع الصيغةُ المختصرة هنا إلى الصيغة الكاملة، **والقاعدةُ تبقى الحَكَم**:
      `save_question` تشترط أن تكون الجملُ النصَّ نفسَه بلا حذفٍ ولا زيادة، وتفحص المفاتيحَ والأكوادَ والشرح.
      فما يُرَدّ هنا خطأُ **مطابقة** وحده (جملةٌ لم تُوجد) — وما سواه للقاعدة. والصيغةُ الكاملة (`options`) تمرّ كما هي.
   ═══════════════════════════════════════════════════════════════════ */

/* ── 🆕 b241 · التقسيم (208 · ق١٦) — منقولٌ بحرفه من editor_quiz.js ──
   🔑 **بالنقطة والاستفهام والتعجّب** (ومعها «؟» و«…») **إلا ثلاثة**، قِيست على نصوص المشروع:
        حوارٌ يكمل بحرفٍ صغير («"Where?" he asked.») · اختصارٌ معروف (Mr. · Dr. · e.g. · a.m.) ·
        ورقمٌ عشريّ (3.5 — لا مسافةَ بعد النقطة فلا تُعدّ حدّاً أصلاً).
      وما فات القاعدةَ يصحّحه المؤلّف — والقاعدةُ تُخطئ نادراً لا أبداً. */
const SNT_END  = /[.!?؟…]+["'”’»)\]]*(?=\s|$)/g;
const SNT_ABBR = /(?:^|[\s("'])(?:Mr|Mrs|Ms|Dr|St|Jr|Sr|Prof|vs|etc|No|e\.g|i\.e|a\.m|p\.m|U\.S|U\.K)\.$/i;

export function splitSentences(text){
  const s = String(text || ''), out = [];
  let start = 0, m;
  SNT_END.lastIndex = 0;
  while((m = SNT_END.exec(s))){
    const end = m.index + m[0].length;
    if(SNT_ABBR.test(s.slice(start, m.index + 1))) continue;           // اختصار ⇒ الجملةُ ماضية
    const next = s.slice(end).match(/^\s*(\S)/);
    if(next && /[a-z]/.test(next[1])) continue;                         // حوارٌ يكمل بحرفٍ صغير
    const piece = s.slice(start, end).trim();
    if(piece) out.push(piece);
    start = end;
  }
  const rest = s.slice(start).trim();
  if(rest) out.push(rest);
  return out;
}

/* ═══ الصيغُ المختصرة — كلٌّ يُوسَّع إلى ما يحفظه `save_question` بحرفه ═══

   اختيارُ الجملة:   { kind: "sentence", passage: "p1", body, answer: "نصُّ الجملة" | ["…", "…"],
                       dx: { "نصُّ جملةٍ خاطئة": "SKIM" }, explanation }
   حكمٌ ودليلُه:     { kind: "judge", passage: "p1", body, mode: "two" | "point",
                       judgments: [ { body: "No", evidence: ["نصُّ جملة", …] },      ← مقبول (له دليل)
                                    { body: "Yes", dx: "ECHO" } ],                    ← مرفوض (بلا دليل)
                       dx: { "نصُّ جملةٍ لا تدلّ": "SKIM" }, explanation }
   الترتيب:          { kind: "ordering", body, items: ["الأوّل", "الثاني", …], explanation }

   📌 **الجملةُ تُكتب بحرفها كما في النصّ** — والمسافاتُ لا تُحسب. وجملةٌ لم تُوجد تُقال بموضعها، ومعها الجملةُ التي
      تحويها إن كانت جزءاً منها: المؤلّفُ ينسخ الجملةَ كاملة، والدليلُ في هذه المنصّة جملةٌ لا عبارة.
   📌 و`mode` لحكمٍ ودليله يُفترض `two` (٠–٢ · من R9) كقالب المحرّر — و`point` لـR6–R8 تُكتب صراحةً. */

const norm = s => String(s ?? '').replace(/\s+/g, ' ').trim();
const SHORT = { sentence: ['answer', 'dx'], judge: ['judgments', 'mode', 'dx'], ordering: ['items'] };
const cut = t => { const s = norm(t); return s.length > 60 ? s.slice(0, 59) + '…' : s; };

export function expandKinds(payload){
  const errors = [];
  const pref = p => (p?.ref ?? p?.id ?? null);
  const bodies = new Map((Array.isArray(payload?.passages) ? payload.passages : [])
    .filter(p => pref(p) != null).map(p => [String(pref(p)), String(p.body || '')]));
  const qs = Array.isArray(payload?.questions) ? payload.questions : null;
  if(!qs) return { payload, errors };

  const questions = qs.map((q, i) => {
    const n = i + 1, kind = q?.kind;
    const keys = SHORT[kind];
    if(!keys || !q || !(keys[0] in q)) return q;          // الحقلُ الأوّل يُعلن المختصرة: answer · judgments · items
    if(Array.isArray(q.options) && q.options.length){
      errors.push(`س${n}: صيغتان معاً — options كاملةً أو ${keys[0]} مختصرةً، لا الاثنتان`);
      return q;
    }
    const out = { ...q };
    keys.forEach(k => delete out[k]);

    if(kind === 'ordering'){
      if(!Array.isArray(q.items)){ errors.push(`س${n}: items قائمةُ البنود بترتيبها الصحيح`); return q; }
      out.options = q.items.map(t => ({ body: typeof t === 'string' ? t : String(t?.body ?? '') }));
      return out;
    }

    /* الجملتان: نصٌّ مشتركٌ بمتنٍ يُقسَّم، ثمّ كلُّ جملةٍ مذكورةٍ تُطابَق بحرفها */
    const ref = q.passage != null ? String(q.passage) : '';
    const body = bodies.get(ref);
    if(!ref || body == null || !body.trim()){
      errors.push(`س${n}: ${kind === 'judge' ? 'الحكم ودليله' : 'اختيار الجملة'} يحتاج نصاً مشتركاً بمتن (passage) — جملُه تُقسَّم منه`);
      return q;
    }
    const sents = splitSentences(body), N = sents.map(norm);
    const at = (t, what) => {
      const k = N.indexOf(norm(t));
      if(k >= 0) return k;
      const inside = norm(t) ? N.findIndex(s => s.includes(norm(t))) : -1;
      errors.push(`س${n}: ${what} «${cut(t)}» ليست من جمل النص «${ref}»` + (inside >= 0
        ? ` — هي جزء من الجملة «${cut(sents[inside])}»، والجملة تُكتب كاملة`
        : ' — تُنسخ من النص بحرفها'));
      return -1;
    };
    const dxOf = {};
    if(q.dx != null && (typeof q.dx !== 'object' || Array.isArray(q.dx)))
      errors.push(`س${n}: dx هنا كائن: { "نصُّ الجملة": "الكود" }`);
    else Object.entries(q.dx || {}).forEach(([t, code]) => { const k = at(t, 'جملةُ الكود'); if(k >= 0) dxOf[k] = code; });

    if(kind === 'sentence'){
      const ans = new Set([].concat(q.answer ?? []).map(t => at(t, 'الجملة الصحيحة')).filter(k => k >= 0));
      out.options = sents.map((t, k) => ({ body: t, correct: ans.has(k), ...(dxOf[k] ? { dx: dxOf[k] } : {}) }));
      return out;
    }

    /* حكمٌ ودليلُه: الأحكامُ J… بترتيبها في الملفّ، والجملُ S… بترتيب النصّ — والمقبولُ ما له دليل */
    if(!Array.isArray(q.judgments)){ errors.push(`س${n}: judgments قائمةُ الأحكام`); return q; }
    const map = {};
    const js = q.judgments.map((j, z) => {
      const k = 'J' + (z + 1);
      const ev = [].concat(j?.evidence ?? []).map(t => at(t, `دليلُ الحكم ${z + 1}`)).filter(x => x >= 0);
      if(ev.length) map[k] = [...new Set(ev)].map(x => 'S' + (x + 1));
      return { k, body: typeof j === 'string' ? j : String(j?.body ?? j?.text ?? ''), ...(j?.dx ? { dx: j.dx } : {}) };
    });
    out.options = [...js, ...sents.map((t, k) => ({ k: 'S' + (k + 1), body: t, ...(dxOf[k] ? { dx: dxOf[k] } : {}) }))];
    out.accept  = { mode: q.mode === 'point' ? 'point' : 'two', map };
    if(q.mode != null && q.mode !== 'two' && q.mode !== 'point')
      errors.push(`س${n}: mode إمّا "two" (٠–٢) أو "point" (٠/١)`);
    return out;
  });
  return { payload: { ...payload, questions }, errors };
}
