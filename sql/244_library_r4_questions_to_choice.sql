-- 244_library_r4_questions_to_choice.sql
-- أسئلةُ كتب R4 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241–243 على المستوى الرابع، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦) وبإذنه أن يُطبَّق كلُّ مستوىً مباشرة.
--   كتبُ المستوى 8 (M4، لم تُنشر)، وأسئلتُها المحوَّلة 29 وخياراتُها الجديدة 87. وأسئلةُ الاختيار السبعة القائمة تبقى.
--   وبعضُ القائم يصرّح بما كان سؤالُ الضغط يسأل عنه (مثل: لماذا قال توم «Not now»؟)، فسُئل تحت الهدف نفسه عن شيءٍ آخر.
--   وP2.PRONOUN: السؤالُ يقتبس الجملةَ التي فيها الضمير، والخياراتُ تسمّي ما يعود إليه.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R04.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13761, "quiz": 687, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Dad say to Tom?", "why": "الجواب مكتوب في النص بكلماته: «\"Thank you,\" said Dad.»", "opts": [{"t": "\"Dust can stop a clock.\"", "dx": "MIX", "key": false}, {"t": "\"It was my dad's clock.\"", "dx": "MIX", "key": false}, {"t": "\"Thank you.\"", "dx": null, "key": true}]},
{"q": 13762, "quiz": 687, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"It was full of dust.\" What was full of dust?", "why": "الضمير It يعود إلى ما في الجملة قبله: «Tom had a look in the back of the clock.»", "opts": [{"t": "The small brush.", "dx": "MIX", "key": false}, {"t": "The back of the clock.", "dx": null, "key": true}, {"t": "The tall stand.", "dx": "MIX", "key": false}]},
{"q": 13763, "quiz": 687, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Look at the words \"He did not say a word.\" How did Dad feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك الأب حين توقفت الساعة: «Dad sat by the stand for a long time. He did not say a word.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very sick.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}]},
{"q": 13764, "quiz": 687, "was": "sentence", "obj": "P3.PROBLEM", "body": "The clock had a problem. What did Tom do about it?", "why": "المشكلة غبار أوقف الساعة «Dust can stop a clock.»، وحلّها: «Tom got a small brush. He went bit by bit with the brush.»", "opts": [{"t": "He got a clock from the shop.", "dx": null, "key": false}, {"t": "He set the stand by the bed.", "dx": "MIX", "key": false}, {"t": "He got a small brush for the dust.", "dx": null, "key": true}]},
{"q": 13756, "quiz": 686, "was": "sentence", "obj": "P1.LITERAL", "body": "What did the man say?", "why": "الجواب مكتوب في النص بكلماته: «\"I do not have ten bags,\" said the man.»", "opts": [{"t": "\"I do not have a plan.\"", "dx": "MIX", "key": false}, {"t": "\"I do not have a truck.\"", "dx": null, "key": false}, {"t": "\"I do not have ten bags.\"", "dx": null, "key": true}]},
{"q": 13757, "quiz": 686, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"He made a plan with a list of ten bags.\" Who is \"he\"?", "why": "الضمير He يعود إلى من في الجملة قبله: «Then Dan got a pen.»", "opts": [{"t": "The man", "dx": "MIX", "key": false}, {"t": "Dan", "dx": null, "key": true}, {"t": "Sam", "dx": "MIX", "key": false}]},
{"q": 13758, "quiz": 686, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Look at the words \"Sam sat and did not say a word.\" How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Sam sat and did not say a word.»", "opts": [{"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very sick.", "dx": "JUMP", "key": false}]},
{"q": 13759, "quiz": 686, "was": "sentence", "obj": "P3.PROBLEM", "body": "What was the problem at the start of the story?", "why": "المشكلة أن حقيبة بقيت ولم تُحمَّل: «A bag was still by the desk.»", "opts": [{"t": "The shop had no bags.", "dx": null, "key": false}, {"t": "The truck did not run.", "dx": null, "key": false}, {"t": "A bag was still at the shop.", "dx": null, "key": true}]},
{"q": 13760, "quiz": 686, "was": "judge", "obj": "P4.REASON", "body": "Sam got the bags in fast. Was that good?", "why": "الحكم الذي يسنده النص: «Sam did not have a plan. He got the bags in fast.» فنقصت حقيبة.", "opts": [{"t": "No. Sam did not have a plan.", "dx": null, "key": true}, {"t": "Yes. Sam had a good plan.", "dx": "REV", "key": false}, {"t": "Yes. The truck went fast.", "dx": "JUMP", "key": false}]},
{"q": 13771, "quiz": 689, "was": "sentence", "obj": "P1.LITERAL", "body": "Where did the man put up the red flag?", "why": "الجواب مكتوب في النص بكلماته: «A man put up a red flag on the sand.»", "opts": [{"t": "On the boat.", "dx": "MIX", "key": false}, {"t": "On the hill.", "dx": null, "key": false}, {"t": "On the sand.", "dx": null, "key": true}]},
{"q": 13772, "quiz": 689, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"Then he sat with his dad on the sand.\" Who is \"he\"?", "why": "الضمير he يعود إلى من في الجملة قبله: «Ben saw the red flag.»", "opts": [{"t": "The man in the boat", "dx": "MIX", "key": false}, {"t": "Ben", "dx": null, "key": true}, {"t": "Tom", "dx": "MIX", "key": false}]},
{"q": 13773, "quiz": 689, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Ben sat down and hit the sand with his hand. How did Ben feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Ben sat down and hit the sand with his hand.»", "opts": [{"t": "He was sick.", "dx": "JUMP", "key": false}, {"t": "He was angry.", "dx": null, "key": true}, {"t": "He was glad.", "dx": "REV", "key": false}]},
{"q": 13746, "quiz": 684, "was": "sentence", "obj": "P1.LITERAL", "body": "What can a duck get to eat?", "why": "الجواب مكتوب في النص بكلماته: «It can get small fish to eat.»", "opts": [{"t": "Green grass.", "dx": "MIX", "key": false}, {"t": "Black ants.", "dx": null, "key": false}, {"t": "Small fish.", "dx": null, "key": true}]},
{"q": 13747, "quiz": 684, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"It has two big feet.\" What has two big feet?", "why": "الضمير It يعود إلى ما في الجملة قبله: «A duck can swim well.»", "opts": [{"t": "A fish.", "dx": "MIX", "key": false}, {"t": "A cat.", "dx": "MIX", "key": false}, {"t": "A duck.", "dx": null, "key": true}]},
{"q": 13748, "quiz": 684, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"It sat by the river and did not jump in.\" What sat by the river?", "why": "الضمير It يعود إلى ما في الجملة قبله: «A cat can not swim well.»", "opts": [{"t": "The duck.", "dx": "MIX", "key": false}, {"t": "A little duck.", "dx": "MIX", "key": false}, {"t": "The cat.", "dx": null, "key": true}]},
{"q": 13741, "quiz": 683, "was": "sentence", "obj": "P1.LITERAL", "body": "What did the frog get to eat?", "why": "الجواب مكتوب في النص بكلماته: «Then the frog got an ant to eat.»", "opts": [{"t": "A bird.", "dx": "MIX", "key": false}, {"t": "An ant.", "dx": null, "key": true}, {"t": "A fish.", "dx": null, "key": false}]},
{"q": 13742, "quiz": 683, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"It went away.\" What went away?", "why": "الضمير It يعود إلى ما في الجملة قبله: «The bird did not see the frog in the green grass.»", "opts": [{"t": "The hot sun.", "dx": "MIX", "key": false}, {"t": "The green frog.", "dx": "MIX", "key": false}, {"t": "The big bird.", "dx": null, "key": true}]},
{"q": 13743, "quiz": 683, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"A bird can not see them there.\" Who are \"them\"?", "why": "الضمير them يعود إلى ما في الجملة قبله: «Frogs can sit still in tall grass.»", "opts": [{"t": "Birds.", "dx": "MIX", "key": false}, {"t": "Men.", "dx": "MIX", "key": false}, {"t": "Frogs.", "dx": null, "key": true}]},
{"q": 13766, "quiz": 688, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Dan say?", "why": "الجواب مكتوب في النص بكلماته: «Then Dan got up and said, \"We can do this.\"»", "opts": [{"t": "\"It was a long trip.\"", "dx": "MIX", "key": false}, {"t": "\"We can go back.\"", "dx": null, "key": false}, {"t": "\"We can do this.\"", "dx": null, "key": true}]},
{"q": 13767, "quiz": 688, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"The tent went down on them.\" Who are \"them\"?", "why": "الضمير them يعود إلى صاحبَي الخيمة في أول القصة: «Dan and Sam went on a long trip…»", "opts": [{"t": "The sand hills.", "dx": "MIX", "key": false}, {"t": "Dan and Sam.", "dx": null, "key": true}, {"t": "The big stones.", "dx": "MIX", "key": false}]},
{"q": 13768, "quiz": 688, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Sam sat in the sand in the dark. How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Sam sat in the sand in the dark. He did not say a word.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very hot.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}]},
{"q": 13769, "quiz": 688, "was": "sentence", "obj": "P3.PROBLEM", "body": "What was the problem at the camp at night?", "why": "المشكلة تأتي من وسط القصة: «At night the wind was strong. The tent went down on them.»", "opts": [{"t": "Dan and Sam had no tent.", "dx": "REV", "key": false}, {"t": "The tent went down in the wind.", "dx": null, "key": true}, {"t": "The camp had no sand.", "dx": null, "key": false}]},
{"q": 13751, "quiz": 685, "was": "sentence", "obj": "P1.LITERAL", "body": "Where was the shop?", "why": "الجواب مكتوب في النص بكلماته: «The shop was at the top of a long hill.»", "opts": [{"t": "At the end of a long beach.", "dx": null, "key": false}, {"t": "By a big river.", "dx": null, "key": false}, {"t": "At the top of a long hill.", "dx": null, "key": true}]},
{"q": 13752, "quiz": 685, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"He ran it a little.\" Who is \"he\"?", "why": "الضمير He يعود إلى من في الجملة قبله: «Dan sat in the truck.»", "opts": [{"t": "The man at the shop", "dx": "MIX", "key": false}, {"t": "Dan", "dx": null, "key": true}, {"t": "Tom", "dx": "MIX", "key": false}]},
{"q": 13753, "quiz": 685, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Tom got up and sat down, and then got up and sat down. How did Tom feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «He got up and sat down, and then got up and sat down.» ثم سأل «Can we go now?»", "opts": [{"t": "He was very sick.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": "JUMP", "key": false}, {"t": "He wanted to go now.", "dx": null, "key": true}]},
{"q": 13754, "quiz": 685, "was": "sentence", "obj": "P3.PROBLEM", "body": "The truck had a problem. What did Dan do about it?", "why": "المشكلة «The truck did not stop well.»، وحلّها: «A man at the shop got to work on the truck.»", "opts": [{"t": "He got a man to work on the truck.", "dx": null, "key": true}, {"t": "He ran the truck up the hill fast.", "dx": "REV", "key": false}, {"t": "He put the bags in the shop.", "dx": null, "key": false}]},
{"q": 13736, "quiz": 682, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Sam have in the cold glass at the start?", "why": "الجواب مكتوب في النص بكلماته: «Sam had a cold glass of milk.»", "opts": [{"t": "Milk.", "dx": null, "key": true}, {"t": "A hot drink.", "dx": "MIX", "key": false}, {"t": "A cloth.", "dx": "MIX", "key": false}]},
{"q": 13737, "quiz": 682, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"It got on his pants.\" What got on his pants?", "why": "الضمير It يعود إلى ما في الجملة قبله: «The hot drink ran on the desk.»", "opts": [{"t": "The hot drink.", "dx": null, "key": true}, {"t": "The cold milk.", "dx": "MIX", "key": false}, {"t": "The cloth.", "dx": "MIX", "key": false}]},
{"q": 13738, "quiz": 682, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"Then she got a glass from the shelf.\" Who is \"she\"?", "why": "الضمير she يعود إلى من في الجملة قبله: «His mom got a cloth for the desk.»", "opts": [{"t": "Sam's mom.", "dx": null, "key": true}, {"t": "Sam.", "dx": "MIX", "key": false}, {"t": "Sam's dad.", "dx": null, "key": false}]}
]$spec$::jsonb;
  e jsonb; o jsonb; r record;
  v_q bigint; v_obj bigint; v_id bigint; v_key bigint; v_dx jsonb; i int; n int;
  n_done int := 0; n_skip int := 0; n_trial int := 0;
begin

  /* ── الحرّاس: كلُّ سؤالٍ في اختباره، من مكتبة المادّة ٧، وبلا إجابة ── */
  for r in select (x->>'q')::bigint q, (x->>'quiz')::bigint quiz from jsonb_array_elements(spec) x loop
    if not exists (select 1 from questions qq join items it on it.quiz_id = qq.quiz_id join lessons l on l.id = it.lesson_id
                    join courses c on c.id = l.course_id
                    where qq.id = r.q and qq.quiz_id = r.quiz and c.subject_id = 7 and qq.retired_at is null) then
      raise exception 'السؤال % ليس في الاختبار % من مكتبة المادّة ٧', r.q, r.quiz;
    end if;
  end loop;
  select count(*) into n from answers a where a.question_id in (select (x->>'q')::bigint from jsonb_array_elements(spec) x);
  if n > 0 then raise exception 'على الأسئلة % إجابة — لا يُحوَّل سؤالٌ أجاب عنه أحد', n; end if;

  /* ── التحويل ── */
  for e in select * from jsonb_array_elements(spec) loop
    v_q := (e->>'q')::bigint;
    select kind, body into r from questions where id = v_q;
    if r.kind = 'mcq' and r.body = e->>'body' then n_skip := n_skip + 1; continue; end if;
    if r.kind <> e->>'was' then raise exception 'السؤال % نمطُه % لا %', v_q, r.kind, e->>'was'; end if;
    select id into strict v_obj from objectives where subject_id = 7 and code = e->>'obj';

    update question_keys set correct_id = null, correct_ids = null where question_id = v_q;
    delete from options where question_id = v_q;

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
    get diagnostics n = row_count;
    if n <> 1 then raise exception 'السؤال % بلا سطر مفتاح', v_q; end if;
    n_done := n_done + 1;
  end loop;

  if n_done + n_skip <> 29 then raise exception 'حُوِّل % وتُخطّي % والمنتظر 29', n_done, n_skip; end if;
  raise notice '244: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('244', 'أسئلةُ كتب R4 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
