-- 250_library_r8_m3_questions_to_choice.sql
-- أسئلةُ كتابَي R8 المستوردَين (M3) في مكتبة بيان — اختيارٌ من متعدّد ومزاوجةٌ واحدة بدل «الضغط على الجملة»
--
-- لماذا: تتمّةُ 248 على المستوى الثامن — كتاباه المستوردان الباقيان في M3 (الثالث حُذف في 249). بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦).
--   الكتابان 2 (لم يُنشرا): 9 أسئلة ضغطٍ تصير اختياراً من متعدّد (36 خياراً)، وسؤالٌ واحد يصير **مزاوجة** (1) —
--   معاني أربع كلمات في «The Mad Teacher»، وهي الصيغة التي رآها المالك على عرض الهاتف واعتمدها يومَ ٢٧ نوفمبر.
--   وأوسمةُ الكتب المستوردة أُخذت من مستواها القديم لا ممّا يسأله السؤال، فوُسم كلُّ سؤالٍ بهدفٍ من مدى R8 يوافق ما يسأله.
--   وسؤالا الاختيار القائمان سليمان فيبقيان، ويُصحَّح وسمُهما وحده (2): 21998 يسأل عن دافع ⇒ P2.MOTIVE · 20546 يحكم بالعاقبة ⇒ P4.CONSEQUENCE.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   mcq: خياراتٌ ومفتاحٌ واحد وأكوادُ تشخيص. matching: البنودُ خياراتٌ بمفاتيح a… والمقابلاتُ في bank والأزواجُ في accept.pairs، ودرجتُه بعدد بنوده.
--   relabel: سؤالٌ باقٍ يُصحَّح هدفُه وحده. ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ يتحوّل.
--   وإعادةُ التشغيل آمنة: ما تحوّل بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R08M3.py ← gen_sql2.py

do $$
declare
  spec jsonb := $spec$[
{"q": 21993, "quiz": 1981, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "Bob presses the blue button. What is the teacher like now?", "why": "الجواب يعيد صياغة النص: «He is calm, very calm.» ثم «He speaks very slowly.»", "opts": [{"t": "He is mad again.", "dx": "REV", "key": false}, {"t": "He is clever.", "dx": "MIX", "key": false}, {"t": "He is quiet and slow.", "dx": null, "key": true}, {"t": "He does not speak.", "dx": "MIX", "key": false}]},
{"q": 21994, "quiz": 1981, "obj": "P3.CONNECT_EVENTS", "kind": "mcq", "was": "sentence", "body": "Laura gets on a chair. Then Bob gets on the chair. Why?", "why": "الحدثان متصلان بسبب: «But she is too short, and the teacher is tall.» ثم «Come on Bob! You're tall! Stand on the chair!»", "opts": [{"t": "Bob is tired and wants to sit down.", "dx": "GAP", "key": false}, {"t": "Laura is afraid and goes out.", "dx": "GAP", "key": false}, {"t": "The teacher says, \"Stand on the chair, Bob!\"", "dx": "MIX", "key": false}, {"t": "Laura is too short, but Bob is tall.", "dx": null, "key": true}]},
{"q": 21995, "quiz": 1981, "obj": "P2.WORD_CONTEXT", "kind": "matching", "was": "sentence", "body": "What does each word mean in the story?", "why": "المعنى من السياق القريب: boring «He speaks and speaks. We sleep.» · strange «But today Mr Robson is strange. We are surprised.» · mad «Read the window! Sit down on the door!» · silent «Now the teacher stops in mid-sentence.»", "prompts": [{"k": "a", "t": "boring"}, {"k": "b", "t": "strange"}, {"k": "c", "t": "mad"}, {"k": "d", "t": "silent"}], "bank": [{"k": "1", "t": "not like other days; a surprise"}, {"k": "2", "t": "saying things that mean nothing"}, {"k": "3", "t": "not fun to listen to"}, {"k": "4", "t": "saying nothing at all"}], "pairs": {"a": "3", "b": "1", "c": "2", "d": "4"}},
{"q": 21996, "quiz": 1981, "obj": "P3.MAIN_SHORT", "kind": "mcq", "was": "sentence", "body": "What is this story about?", "why": "الفكرة الرئيسة تجمع الفصول الخمسة: معلّم غريب، ثم «The teacher is not mad. He is a robot!»", "opts": [{"t": "A boy breaks a robot at school.", "dx": "MIX", "key": false}, {"t": "A teacher is angry with his class.", "dx": "GAP", "key": false}, {"t": "Children do not want to open their books.", "dx": "PART", "key": false}, {"t": "A strange teacher is really a robot.", "dx": null, "key": true}]},
{"q": 21997, "quiz": 1981, "obj": "P4.CONSEQUENCE", "kind": "mcq", "was": "sentence", "body": "At the end, Bob presses the purple button. Is that good for a class that wants to learn?", "why": "يُحكم على الاختيار بعاقبته في النص: الزر البنفسجي «Purple is Raving Mad!»، وأوامر المعلّم المجنون بلا معنى «Read the window! Sit down on the door!»", "opts": [{"t": "No. The purple button stops the teacher.", "dx": "MIX", "key": false}, {"t": "Yes. The calm teacher shouts too much.", "dx": "REV", "key": false}, {"t": "No. The children learn nothing from a mad teacher.", "dx": null, "key": true}, {"t": "Yes. Purple is the clever button.", "dx": "MIX", "key": false}]},
{"q": 21998, "quiz": 1981, "obj": "P2.MOTIVE", "kind": "relabel"},
{"q": 20541, "quiz": 1739, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "Where does the light of an anglerfish come from?", "why": "السؤال يعيد صياغة النص: «Anglerfish make their light from the glowing bacteria inside them.»", "opts": [{"t": "From the movement of waves and boats.", "dx": "MIX", "key": false}, {"t": "From special organs called photophores.", "dx": "MIX", "key": false}, {"t": "From glowing bacteria inside the fish.", "dx": null, "key": true}, {"t": "From the moon and the stars in the sky.", "dx": "JUMP", "key": false}]},
{"q": 20542, "quiz": 1739, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "The moon was under a rock in the sea. Why?", "why": "السبب يأتي من كلام القمر في فقرة لاحقة بلا أداة ربط بحبسها: «But my light faded and I got lost in the dark.»", "opts": [{"t": "The squid put a rock on top of her.", "dx": "REV", "key": false}, {"t": "The anglerfish took her there with its teeth.", "dx": "MIX", "key": false}, {"t": "Her light faded, and she lost her way.", "dx": null, "key": true}, {"t": "She wanted to hide from Maisha and Uchli.", "dx": "JUMP", "key": false}]},
{"q": 20543, "quiz": 1739, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What does \"bioluminescence\" mean in this book?", "why": "المعنى من السياق القريب: «When a plant or animal makes light, that is called bioluminescence.»", "opts": [{"t": "Light that comes from the moon.", "dx": "MIX", "key": false}, {"t": "Movement of waves in the water.", "dx": "MIX", "key": false}, {"t": "A fish that has sharp teeth.", "dx": "MIX", "key": false}, {"t": "Light that a plant or animal makes.", "dx": null, "key": true}]},
{"q": 20544, "quiz": 1739, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "What new thing does Maisha know at the end of her trip?", "why": "التغيّر بين أول القصة وآخرها: «Now she knows there is also light in the sea!»", "opts": [{"t": "The moon is a kind of fish.", "dx": "JUMP", "key": false}, {"t": "Fish can not swim in the dark.", "dx": "REV", "key": false}, {"t": "The sea is dark all the time.", "dx": "REV", "key": false}, {"t": "There is light in the sea, too.", "dx": null, "key": true}]},
{"q": 20545, "quiz": 1739, "obj": "P4.CRAFT_MOVE", "kind": "mcq", "was": "sentence", "body": "In the book, the sea with the plankton is \"like a sky of stars.\" What does that help you see?", "why": "التشبيه حيلة فنية أثرها أن يرى القارئ أضواء صغيرة كثيرة في الظلمة: «Tiny animals glow in the sea. It is like a sky of stars.»", "opts": [{"t": "A fish with very sharp teeth.", "dx": "MIX", "key": false}, {"t": "Big waves on top of the sea.", "dx": "JUMP", "key": false}, {"t": "The moon up in the night sky.", "dx": "LITR", "key": false}, {"t": "Many tiny lights in the dark water.", "dx": null, "key": true}]},
{"q": 20546, "quiz": 1739, "obj": "P4.CONSEQUENCE", "kind": "relabel"}
]$spec$::jsonb;
  e jsonb; o jsonb; r record;
  v_q bigint; v_obj bigint; v_id bigint; v_key bigint; v_dx jsonb; i int; n int;
  n_done int := 0; n_skip int := 0;
begin
  /* ── الحرّاس: كلُّ سؤالٍ في اختباره، من مكتبة المادّة ٧، وما يتحوّل بلا إجابة ── */
  for r in select (x->>'q')::bigint q, (x->>'quiz')::bigint quiz from jsonb_array_elements(spec) x loop
    if not exists (select 1 from questions qq join items it on it.quiz_id = qq.quiz_id join lessons l on l.id = it.lesson_id
                    join courses c on c.id = l.course_id
                    where qq.id = r.q and qq.quiz_id = r.quiz and c.subject_id = 7 and qq.retired_at is null) then
      raise exception 'السؤال % ليس في الاختبار % من مكتبة المادّة ٧', r.q, r.quiz;
    end if;
  end loop;
  select count(*) into n from answers a
   where a.question_id in (select (x->>'q')::bigint from jsonb_array_elements(spec) x where x->>'kind' <> 'relabel');
  if n > 0 then raise exception 'على الأسئلة % إجابة — لا يُحوَّل سؤالٌ أجاب عنه أحد', n; end if;

  for e in select * from jsonb_array_elements(spec) loop
    v_q := (e->>'q')::bigint;
    select kind, body, objective_id into r from questions where id = v_q;
    select id into strict v_obj from objectives where subject_id = 7 and code = e->>'obj';

    if e->>'kind' = 'relabel' then
      if r.objective_id is distinct from v_obj then update questions set objective_id = v_obj where id = v_q; n_done := n_done + 1;
      else n_skip := n_skip + 1; end if;
      continue;
    end if;

    if r.kind = e->>'kind' and r.body = e->>'body' then n_skip := n_skip + 1; continue; end if;
    if r.kind <> e->>'was' then raise exception 'السؤال % نمطُه % لا %', v_q, r.kind, e->>'was'; end if;

    update question_keys set correct_id = null, correct_ids = null where question_id = v_q;
    delete from options where question_id = v_q;

    if e->>'kind' = 'mcq' then
      v_key := null; v_dx := '{}'::jsonb; i := 0;
      for o in select * from jsonb_array_elements(e->'opts') loop
        i := i + 1;
        insert into options (question_id, position, body) values (v_q, i, o->>'t') returning id into v_id;
        if (o->>'key')::boolean then v_key := v_id;
        elsif o->>'dx' is not null then v_dx := v_dx || jsonb_build_object(v_id::text, o->>'dx'); end if;
      end loop;
      if v_key is null then raise exception 'السؤال % بلا مفتاح', v_q; end if;
      update questions set kind = 'mcq', body = e->>'body', objective_id = v_obj where id = v_q;
      update question_keys set correct_id = v_key, correct_ids = null, accept = null, bank = null, wrong_map = null,
             dx_map = v_dx, explanation = e->>'why' where question_id = v_q;
    else   -- matching
      i := 0;
      for o in select * from jsonb_array_elements(e->'prompts') loop
        i := i + 1;
        insert into options (question_id, position, body, item_key) values (v_q, i, o->>'t', o->>'k');
      end loop;
      update questions set kind = 'matching', body = e->>'body', objective_id = v_obj, points = i where id = v_q;
      update question_keys set correct_id = null, correct_ids = null, wrong_map = null, dx_map = '{}'::jsonb,
             bank = e->'bank', accept = jsonb_build_object('pairs', e->'pairs'), explanation = e->>'why' where question_id = v_q;
    end if;
    get diagnostics n = row_count;
    if n <> 1 then raise exception 'السؤال % بلا سطر مفتاح', v_q; end if;
    n_done := n_done + 1;
  end loop;

  if n_done + n_skip <> 12 then raise exception 'عُدِّل % وتُخطّي % والمنتظر 12', n_done, n_skip; end if;
  raise notice '250: عُدِّل % سؤالاً · تُخطّي %', n_done, n_skip;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('250', 'أسئلةُ كتابَي R8 المستوردَين (M3) في مكتبة بيان — اختيارٌ من متعدّد ومزاوجةٌ واحدة بدل «الضغط على الجملة»', now())
on conflict (n) do update set applied_at = now();
