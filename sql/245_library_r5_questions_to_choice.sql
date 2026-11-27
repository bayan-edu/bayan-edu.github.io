-- 245_library_r5_questions_to_choice.sql
-- أسئلةُ كتب R5 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241–244 على المستوى الخامس، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦) وبإذنه أن يُطبَّق كلُّ مستوىً مباشرة.
--   كتبُ المستوى 8 (M4، لم تُنشر)، وأسئلتُها المحوَّلة 29 وخياراتُها الجديدة 87. وأسئلةُ الاختيار التسعة القائمة تبقى.
--   وحيث يصرّح سؤالٌ باقٍ (أو سطرٌ في سؤال ترتيبٍ باقٍ) بما كان سؤالُ الضغط يسأل عنه، سُئل تحت الهدف نفسه عن شيءٍ آخر.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R05.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13806, "quiz": 696, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "What did Jim set on the desk when he went to bed?", "why": "الجواب يُوجد بالرجوع إلى النص: «Jim set his red pen on the desk.»", "opts": [{"t": "His brown bag.", "dx": null, "key": false}, {"t": "His red pen.", "dx": null, "key": true}, {"t": "His math test.", "dx": "MIX", "key": false}]},
{"q": 13807, "quiz": 696, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "At ten at night, Jim's brain was tired. What shows it?", "why": "أثر التعب في النص: «He did one long sum three times.»", "opts": [{"t": "He did ten sums well.", "dx": "MIX", "key": false}, {"t": "He did one long sum three times.", "dx": null, "key": true}, {"t": "He got up fast and ran to the bus.", "dx": "MIX", "key": false}]},
{"q": 13808, "quiz": 696, "was": "sentence", "obj": "P3.GOAL", "body": "At ten at night, what did Jim want to do?", "why": "رغبة جيم بكلماته: «I want to do all the sums.»", "opts": [{"t": "A big test on the bus.", "dx": "MIX", "key": false}, {"t": "All the sums.", "dx": null, "key": true}, {"t": "A long sleep in his bed.", "dx": "REV", "key": false}]},
{"q": 13781, "quiz": 691, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "At home, where did Dad set the milk and meat?", "why": "الجواب يُوجد بالرجوع إلى النص: «He set the milk and meat in the cold box.»", "opts": [{"t": "In the can by the wall.", "dx": "MIX", "key": false}, {"t": "In the black car.", "dx": "MIX", "key": false}, {"t": "In the cold box.", "dx": null, "key": true}]},
{"q": 13782, "quiz": 691, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "One small box of milk sat in the hot car all day. What happened to the milk?", "why": "نتيجة الحرّ في النص: «The box was hot. The milk in it had a bad smell.»", "opts": [{"t": "It got very cold.", "dx": "REV", "key": false}, {"t": "It went into the cold bag.", "dx": "MIX", "key": false}, {"t": "It had a bad smell.", "dx": null, "key": true}]},
{"q": 13783, "quiz": 691, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"In a hot car, they can get bad in one hour.\" What are \"they\"?", "why": "الضمير they يعود إلى ما في الجملة قبله: «Milk and meat can get bad fast in a hot spot.»", "opts": [{"t": "A man and a kid.", "dx": "MIX", "key": false}, {"t": "Fish and cups.", "dx": "MIX", "key": false}, {"t": "Milk and meat.", "dx": null, "key": true}]},
{"q": 13784, "quiz": 691, "was": "sentence", "obj": "P3.CHANGE", "body": "The week after, what did Dan do at home?", "why": "التغيّر بين أول القصة وآخرها: بقيت علبة في السيارة أولاً، ثم «At home, he got all the bags from the car.»", "opts": [{"t": "He got all the bags from the car.", "dx": null, "key": true}, {"t": "He got a block of ice from the car.", "dx": "MIX", "key": false}, {"t": "He set the fish by the wall.", "dx": "MIX", "key": false}]},
{"q": 13796, "quiz": 694, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "At the end, what did Mom set on Meg's hand?", "why": "الجواب يُوجد بالرجوع إلى النص: «Mom set a clean cloth on the hand.»", "opts": [{"t": "A black clock.", "dx": "MIX", "key": false}, {"t": "A white cup.", "dx": "MIX", "key": false}, {"t": "A clean cloth.", "dx": null, "key": true}]},
{"q": 13797, "quiz": 694, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Look at the words \"Tim sat down on the box and did not look up.\" How did Tim feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد بعد أن آذى أخته: «Tim sat down on the box and did not look up.»", "opts": [{"t": "He was very angry.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very glad.", "dx": "REV", "key": false}]},
{"q": 13798, "quiz": 694, "was": "sentence", "obj": "P3.CHANGE", "body": "At the end, how was Meg's hand?", "why": "التغيّر بين أول القصة وآخرها: «Her hand got red fast.» ثم «At the end, the hand was pink, not red.»", "opts": [{"t": "It was white.", "dx": null, "key": false}, {"t": "It was red and hot.", "dx": "REV", "key": false}, {"t": "It was pink.", "dx": null, "key": true}]},
{"q": 13791, "quiz": 693, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where did Tom sit with his phone all day?", "why": "الجواب يُوجد بالرجوع إلى النص: «Tom sat on his bed with his phone all day.»", "opts": [{"t": "On the grass.", "dx": "MIX", "key": false}, {"t": "On his bed.", "dx": null, "key": true}, {"t": "On a big box.", "dx": "MIX", "key": false}]},
{"q": 13792, "quiz": 693, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Tom ran up a little. Then he sat down on the grass. How did Tom feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Then he sat down on the grass. He did not say a word.»", "opts": [{"t": "He was very angry.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very glad.", "dx": "REV", "key": false}]},
{"q": 13793, "quiz": 693, "was": "sentence", "obj": "P3.GOAL", "body": "What did Tom want to do on the hill?", "why": "رغبة توم بكلماته: «\"I can get to the top,\" he said.» وقد بلغها في آخر الشهر.", "opts": [{"t": "Play with his phone.", "dx": "MIX", "key": false}, {"t": "Get to the top.", "dx": null, "key": true}, {"t": "Sit on the grass.", "dx": "MIX", "key": false}]},
{"q": 13794, "quiz": 693, "was": "sentence", "obj": "P3.CHANGE", "body": "At the end of the month, Tom ran up the hill. What was new this time?", "why": "التغيّر بين أول القصة وآخرها: جلس في المرة الأولى، ثم «He did not stop there.»", "opts": [{"t": "His dad sat on the grass.", "dx": "MIX", "key": false}, {"t": "He did not stop.", "dx": null, "key": true}, {"t": "He ran with his phone.", "dx": "MIX", "key": false}]},
{"q": 13811, "quiz": 697, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where was Gran's black bag?", "why": "الجواب يُوجد بالرجوع إلى النص: «Her black bag was on the mat by the desk.»", "opts": [{"t": "On the mat by the desk.", "dx": null, "key": true}, {"t": "In the long hall.", "dx": "MIX", "key": false}, {"t": "On her big bed.", "dx": "MIX", "key": false}]},
{"q": 13812, "quiz": 697, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Sam's hand went up fast to his mouth. How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Sam's hand went up fast to his mouth.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very angry.", "dx": "JUMP", "key": false}, {"t": "He was very afraid.", "dx": null, "key": true}]},
{"q": 13813, "quiz": 697, "was": "sentence", "obj": "P3.PROBLEM", "body": "What was the problem in the story?", "why": "المشكلة: طفل في الثالثة فتح علبة الدواء «Ben had the box open in his hand.»", "opts": [{"t": "A little kid had Gran's pills.", "dx": null, "key": true}, {"t": "Sam had no dates for Ben.", "dx": "REV", "key": false}, {"t": "Gran had no pills in her bag.", "dx": "REV", "key": false}]},
{"q": 13814, "quiz": 697, "was": "sentence", "obj": "P3.CHANGE", "body": "At the start, Gran's pills were in her bag. Where were they at the end?", "why": "التغيّر بين أول القصة وآخرها: «Gran set all her pills on that tall shelf too.»", "opts": [{"t": "On a tall shelf.", "dx": null, "key": true}, {"t": "In a white dish.", "dx": "MIX", "key": false}, {"t": "On the mat.", "dx": "MIX", "key": false}]},
{"q": 13786, "quiz": 692, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "At the end, what did Jack have with his lunch?", "why": "الجواب يُوجد بالرجوع إلى النص: «Then Jack had milk and a cup of water with lunch.»", "opts": [{"t": "Milk and water.", "dx": null, "key": true}, {"t": "Big buns.", "dx": "MIX", "key": false}, {"t": "Red pop.", "dx": "MIX", "key": false}]},
{"q": 13787, "quiz": 692, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "Look at the words \"He did not brush well at bed.\" What happened to his back tooth?", "why": "نتيجة السكر وترك التنظيف: «One day a back tooth had a bad spot. … It had a black hole in it.»", "opts": [{"t": "It got white.", "dx": null, "key": false}, {"t": "It got a black hole.", "dx": null, "key": true}, {"t": "It got strong.", "dx": "REV", "key": false}]},
{"q": 13788, "quiz": 692, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"Then it can make black holes in it.\" What can make black holes?", "why": "الضمير it الأول يعود إلى ما في الجملة قبله: «Sugar can sit on a tooth all day.»", "opts": [{"t": "Sugar.", "dx": null, "key": true}, {"t": "A small brush.", "dx": "MIX", "key": false}, {"t": "Water.", "dx": "MIX", "key": false}]},
{"q": 13776, "quiz": 690, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where can the little bad things go from a hand?", "why": "الجواب يُوجد بالرجوع إلى النص: «They can go from a hand to our food.»", "opts": [{"t": "To the shop.", "dx": "MIX", "key": false}, {"t": "To our food.", "dx": null, "key": true}, {"t": "To a clean cloth.", "dx": "MIX", "key": false}]},
{"q": 13777, "quiz": 690, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "Look at the words \"He did not wash his hands.\" What happened then?", "why": "النتيجة في الجملة التالية: «His little brother Sam got sick from him.»", "opts": [{"t": "His cold went away.", "dx": null, "key": false}, {"t": "His little brother got sick.", "dx": null, "key": true}, {"t": "He got soap at the shop.", "dx": "MIX", "key": false}]},
{"q": 13778, "quiz": 690, "was": "sentence", "obj": "P2.PRONOUN", "body": "Look at the words \"We can not see them.\" What are \"them\"?", "why": "الضمير them يعود إلى ما في الجملة قبله: «Hands can have little bad things on them.»", "opts": [{"t": "Our ten fingers.", "dx": "MIX", "key": false}, {"t": "Cups of water.", "dx": "MIX", "key": false}, {"t": "Little bad things on hands.", "dx": null, "key": true}]},
{"q": 13801, "quiz": 695, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where did Mom get the clean white cloth from?", "why": "الجواب يُوجد بالرجوع إلى النص: «Mom got a clean white cloth from the tall shelf.»", "opts": [{"t": "From the brown box.", "dx": "MIX", "key": false}, {"t": "From the tall shelf.", "dx": null, "key": true}, {"t": "From the bag of potatoes.", "dx": "MIX", "key": false}]},
{"q": 13802, "quiz": 695, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Look at the words \"Sam sat on a brown box and did not look at it.\" How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد بعد الجرح: «Sam sat on a brown box and did not look at it.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very afraid.", "dx": null, "key": true}, {"t": "He was very angry.", "dx": "JUMP", "key": false}]},
{"q": 13803, "quiz": 695, "was": "sentence", "obj": "P3.CHANGE", "body": "How did Sam cut potatoes at six?", "why": "التغيّر بين أول القصة وآخرها: «He did not cut fast then. He kept his ten fingers back from the knife.»", "opts": [{"t": "With his fingers back from the knife.", "dx": null, "key": true}, {"t": "Fast, with no look at his hand.", "dx": "REV", "key": false}, {"t": "With a small knife and a cloth.", "dx": "MIX", "key": false}]},
{"q": 13804, "quiz": 695, "was": "sentence", "obj": "P3.PROBLEM", "body": "What stopped the red drops on Sam's hand?", "why": "المشكلة جرح ينزف، وحلّها: «Sam kept the white cloth on his hand for a long time. Soon the red drops did not run.»", "opts": [{"t": "The old dish cloth.", "dx": "REV", "key": false}, {"t": "The white cloth on the spot.", "dx": null, "key": true}, {"t": "A bag of ice.", "dx": null, "key": false}]},
{"q": 13805, "quiz": 695, "was": "judge", "obj": "P4.ALTERNATIVE", "body": "Sam got the old dish cloth by the cup. Was that a good idea?", "why": "الحكم الذي يسنده النص: «\"Not that old cloth,\" said Mom. \"It is not clean.\"» فجاءت بقماشة نظيفة.", "opts": [{"t": "No. The old cloth was not clean.", "dx": null, "key": true}, {"t": "Yes. Mom got it for him.", "dx": "MIX", "key": false}, {"t": "Yes. The old dish cloth was clean.", "dx": "REV", "key": false}]}
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
  raise notice '245: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('245', 'أسئلةُ كتب R5 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
