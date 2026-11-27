-- 243_library_r3_questions_to_choice.sql
-- أسئلةُ كتب R3 التسعة في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241 و242 على المستوى الثالث، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦)، وبإذنه يومَ ٢٧ نوفمبر أن يمضي العملُ
--   مستوىً مستوىً ويُطبَّق مباشرة. كتبُ المستوى 9 (ثمانيةٌ في M4 وواحدٌ في M3، لم تُنشر)، وأسئلتُها المحوَّلة 31
--   وخياراتُها الجديدة 93. وأسئلةُ الاختيار الستّة القائمة توافق أهدافَها فتبقى، وكُتب الجديدُ بحيث لا يكشفه نصُّ سؤالٍ باقٍ.
--   وP2.FEELING_ONE: السؤالُ يذكر السلوكَ الذي في النصّ، والخياراتُ تسمّي الشعور.
--   وسؤالُ الحكم في كتاب M3 (25298) كان وسمُه P4.POINT ومداه ينتهي عند R2، وهو حكمٌ بسببه ⇒ P4.REASON.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R03.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 25294, "quiz": 2534, "was": "sentence", "obj": "P1.LITERAL", "body": "What did the man get in the shop?", "why": "الجواب مكتوب في النص بكلماته: «A man got milk and a pen.»", "opts": [{"t": "Milk and a map.", "dx": null, "key": false}, {"t": "A bag and a pen.", "dx": "MIX", "key": false}, {"t": "Milk and a pen.", "dx": null, "key": true}]},
{"q": 25295, "quiz": 2534, "was": "sentence", "obj": "P1.LITERAL", "body": "Where was the bag?", "why": "الجواب مكتوب في النص بكلماته: «The boy saw a bag on the shelf.»", "opts": [{"t": "On the shelf.", "dx": null, "key": true}, {"t": "On the bus.", "dx": "MIX", "key": false}, {"t": "In the man's hand.", "dx": null, "key": false}]},
{"q": 25296, "quiz": 2534, "was": "sentence", "obj": "P2.ADJACENT", "body": "Why did the boy run behind the bus?", "why": "النص لا يقول السبب صراحةً؛ الجواب يأتي من جمع جملتين: «The boy saw a bag on the shelf.» و«It was the man's bag!»", "opts": [{"t": "He wanted the man's money.", "dx": "REV", "key": false}, {"t": "He had the man's bag.", "dx": null, "key": true}, {"t": "He wanted to get on the bus.", "dx": "JUMP", "key": false}]},
{"q": 25298, "quiz": 2534, "was": "judge", "obj": "P4.REASON", "body": "The man said, \"Take this money.\" The boy said, \"No.\" Was that good?", "why": "الحكم الذي يسنده النص: الولد جرى ليعيد الحقيبة إلى صاحبها «It was the man's bag!»، ولما عُرض عليه المال قال «No» وعاد إلى عمله.", "opts": [{"t": "No. The bag was the boy's bag.", "dx": "REV", "key": false}, {"t": "No. The boy took the money and ran.", "dx": "REV", "key": false}, {"t": "Yes. The boy ran to help the man.", "dx": null, "key": true}]},
{"q": 13716, "quiz": 678, "was": "sentence", "obj": "P1.LITERAL", "body": "What did the man get at the desk?", "why": "الجواب مكتوب في النص بكلماته: «A man got a map at the desk.»", "opts": [{"t": "A map.", "dx": null, "key": true}, {"t": "A pen.", "dx": null, "key": false}, {"t": "A cup.", "dx": null, "key": false}]},
{"q": 13717, "quiz": 678, "was": "sentence", "obj": "P2.ADJACENT", "body": "The man's bag was on the desk. What did Sam do with the bag first?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «His bag was on the desk.» ثم «Sam ran out with the bag.»", "opts": [{"t": "He ran out with it.", "dx": null, "key": true}, {"t": "He hid it in the desk.", "dx": "MIX", "key": false}, {"t": "He got on the bus with it.", "dx": "MIX", "key": false}]},
{"q": 13718, "quiz": 678, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "At six, the man ran in with his hands on his head. How did he feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «He had his hands on his head.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very sick.", "dx": "JUMP", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}]},
{"q": 13701, "quiz": 675, "was": "sentence", "obj": "P1.LITERAL", "body": "Where did Kim see the kid?", "why": "الجواب مكتوب في النص بكلماته: «Kim saw a kid by the milk.»", "opts": [{"t": "By the milk.", "dx": null, "key": true}, {"t": "At the desk.", "dx": "MIX", "key": false}, {"t": "On the bus.", "dx": null, "key": false}]},
{"q": 13702, "quiz": 675, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "The kid had his hands on his face. How did he feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «He had his hands on his face.»", "opts": [{"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very sick.", "dx": "JUMP", "key": false}, {"t": "He was very glad.", "dx": "REV", "key": false}]},
{"q": 13703, "quiz": 675, "was": "sentence", "obj": "P3.PROBLEM", "body": "In the story about Kim, what was the problem for the kid?", "why": "في قصة Kim مشكلة الطفل أنه لا يجد أباه: «I can not find my dad». أما «He can not find his mom.» ففي الإرشادات التي تسبق القصة لا في القصة.", "opts": [{"t": "He can not find his dad.", "dx": null, "key": true}, {"t": "He can not find the milk.", "dx": "ECHO", "key": false}, {"t": "He can not find his mom.", "dx": "MIX", "key": false}]},
{"q": 13711, "quiz": 677, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Ben say to the old man?", "why": "الجواب مكتوب في النص بكلماته: «\"Sit here,\" said Ben.»", "opts": [{"t": "\"Get off the bus.\"", "dx": null, "key": false}, {"t": "\"Sit here.\"", "dx": null, "key": true}, {"t": "\"Thank you, son.\"", "dx": "MIX", "key": false}]},
{"q": 13712, "quiz": 677, "was": "sentence", "obj": "P2.ADJACENT", "body": "Ben saw the old man's leg. What did Ben do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Ben saw the bad leg.» ثم «Ben got up fast.»", "opts": [{"t": "He got up fast.", "dx": null, "key": true}, {"t": "He sat at the back.", "dx": "MIX", "key": false}, {"t": "He got off the bus.", "dx": "MIX", "key": false}]},
{"q": 13713, "quiz": 677, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "The old man set his hand on Ben's hand. How did the old man feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «He set his hand on Ben's hand.» ثم شكره.", "opts": [{"t": "He was glad.", "dx": null, "key": true}, {"t": "He was sick.", "dx": "JUMP", "key": false}, {"t": "He was sad.", "dx": "REV", "key": false}]},
{"q": 13714, "quiz": 677, "was": "sentence", "obj": "P3.PROBLEM", "body": "What was the problem when the old man got on the bus?", "why": "المشكلة تجمع أول القصة بوسطها: «The bus was full.» والرجل ساقه مصابة فلا مقعد له.", "opts": [{"t": "The bus was full.", "dx": null, "key": true}, {"t": "The man had a big bag.", "dx": "MIX", "key": false}, {"t": "The bus did not stop.", "dx": null, "key": false}]},
{"q": 13706, "quiz": 676, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Meg say on the call?", "why": "الجواب مكتوب في النص بكلماته: «\"A man is sick at Hill Shop,\" said Meg.»", "opts": [{"t": "\"Where are you?\"", "dx": "MIX", "key": false}, {"t": "\"A man is sick at Hill Shop.\"", "dx": null, "key": true}, {"t": "\"Do not stop the call.\"", "dx": "MIX", "key": false}]},
{"q": 13707, "quiz": 676, "was": "sentence", "obj": "P2.ADJACENT", "body": "A sick man sat down at the shop. What did Meg's dad do?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «He did not get up.» ثم «Meg's dad sat with the man.»", "opts": [{"t": "He sat with the man.", "dx": null, "key": true}, {"t": "He came fast with men to help.", "dx": "MIX", "key": false}, {"t": "He went to the bus.", "dx": null, "key": false}]},
{"q": 13708, "quiz": 676, "was": "sentence", "obj": "P3.GOAL", "body": "Why did Meg make a call to 911?", "why": "الجواب يأتي من النص كله: رجل مريض جلس ولم ينهض «He did not get up.»، فاتصلت ميغ وجاء العون «Men came fast to help.»", "opts": [{"t": "She wanted to find her dad.", "dx": "JUMP", "key": false}, {"t": "She wanted to tell about a fire.", "dx": "MIX", "key": false}, {"t": "She wanted help for the sick man.", "dx": null, "key": true}]},
{"q": 13696, "quiz": 674, "was": "sentence", "obj": "P1.LITERAL", "body": "What does the man at the spot have?", "why": "الجواب مكتوب في النص بكلماته: «A man there has a list.»", "opts": [{"t": "A bell.", "dx": "MIX", "key": false}, {"t": "A map.", "dx": null, "key": false}, {"t": "A list.", "dx": null, "key": true}]},
{"q": 13697, "quiz": 674, "was": "sentence", "obj": "P2.ADJACENT", "body": "The bell can ring for a fire. What do the men in the shop do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «The bell can ring for a fire.» ثم «Then all the men in the shop get out.»", "opts": [{"t": "They all get out.", "dx": null, "key": true}, {"t": "They all run to the desk.", "dx": "REV", "key": false}, {"t": "They ring the bell.", "dx": "ECHO", "key": false}]},
{"q": 13698, "quiz": 674, "was": "sentence", "obj": "P3.GOAL", "body": "The bell rang at the shop. What did Tim want to do?", "why": "الجواب يأتي من النص كله: تيم فعل ما تقوله الإرشادات «Go to one spot.» ← «Tim went to the spot with the men.»", "opts": [{"t": "Find a fire in the shop.", "dx": "JUMP", "key": false}, {"t": "Ring the red bell.", "dx": "ECHO", "key": false}, {"t": "Get out and go to the spot.", "dx": null, "key": true}]},
{"q": 13731, "quiz": 681, "was": "sentence", "obj": "P1.LITERAL", "body": "What broke in Ken's shop?", "why": "الجواب مكتوب في النص بكلماته: «A big dish in the shop broke.»", "opts": [{"t": "A big bell.", "dx": null, "key": false}, {"t": "A big dish.", "dx": null, "key": true}, {"t": "A big desk.", "dx": null, "key": false}]},
{"q": 13732, "quiz": 681, "was": "sentence", "obj": "P2.ADJACENT", "body": "The ball went in Ken's shop. What did Jack do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «A big dish in the shop broke.» ثم «Jack ran off fast.»", "opts": [{"t": "He got the ball.", "dx": "MIX", "key": false}, {"t": "He went in the shop to Ken.", "dx": "MIX", "key": false}, {"t": "He ran off fast.", "dx": null, "key": true}]},
{"q": 13733, "quiz": 681, "was": "sentence", "obj": "P3.PROBLEM", "body": "Ben went in the shop to Ken. What did Ben do for Ken?", "why": "المشكلة كسرٌ في متجر كين، وحلّها عمل بن: «\"I can do jobs in the shop,\" said Ben.» ثم «Ben did jobs at the shop for ten days.»", "opts": [{"t": "He got a ball for Ken.", "dx": "MIX", "key": false}, {"t": "He ran off with Jack.", "dx": "REV", "key": false}, {"t": "He did jobs in the shop.", "dx": null, "key": true}]},
{"q": 13735, "quiz": 681, "was": "judge", "obj": "P4.REASON", "body": "Ben went in the shop to Ken. Was that good?", "why": "الحكم الذي يسنده النص: الكرة كرة بن والركلة ركلته «It was my ball,» فذهب إلى صاحب المتجر ولم يهرب كما هرب جاك.", "opts": [{"t": "Yes. It was Ben's kick.", "dx": null, "key": true}, {"t": "No. It was Ken's ball.", "dx": "MIX", "key": false}, {"t": "No. It was Jack's kick.", "dx": "MIX", "key": false}]},
{"q": 13721, "quiz": 679, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Sam say when he came with his math?", "why": "الجواب مكتوب في النص بكلماته: «\"I can help,\" said Sam.»", "opts": [{"t": "\"I want to do the test.\"", "dx": "MIX", "key": false}, {"t": "\"Get well, Dan.\"", "dx": null, "key": false}, {"t": "\"I can help.\"", "dx": null, "key": true}]},
{"q": 13722, "quiz": 679, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Look at the words \"He did not look at it.\" How did Dan feel then?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: كتاب الرياضيات على سريره و«He did not look at it.»", "opts": [{"t": "He did not have his math.", "dx": "REV", "key": false}, {"t": "He was glad about the test.", "dx": "REV", "key": false}, {"t": "He was too sick for math.", "dx": null, "key": true}]},
{"q": 13723, "quiz": 679, "was": "sentence", "obj": "P3.GOAL", "body": "At the start of the story, Dan was sick. What did he want to do?", "why": "في أول القصة كان دان مريضاً، ومع ذلك أراد أن يدخل الاختبار: «\"I want to do the test,\" said Dan».", "opts": [{"t": "The math test.", "dx": null, "key": true}, {"t": "A job with Sam.", "dx": "MIX", "key": false}, {"t": "A job at the shop.", "dx": "MIX", "key": false}]},
{"q": 13725, "quiz": 679, "was": "judge", "obj": "P4.REASON", "body": "Was Sam a good friend to Dan?", "why": "الحكم الذي يسنده النص: لسام عمل في متجر أبيه، ومع ذلك «Sam came back to Dan, and back, and back.»", "opts": [{"t": "Yes. Sam came back and back to help Dan.", "dx": null, "key": true}, {"t": "No. Sam did not do the math with Dan.", "dx": "REV", "key": false}, {"t": "No. Sam did the test for Dan.", "dx": "REV", "key": false}]},
{"q": 13726, "quiz": 680, "was": "sentence", "obj": "P1.LITERAL", "body": "What did Ken come with?", "why": "الجواب مكتوب في النص بكلماته: «Then Ken came with big bags.»", "opts": [{"t": "A big dish.", "dx": null, "key": false}, {"t": "A red bell.", "dx": null, "key": false}, {"t": "Big bags.", "dx": null, "key": true}]},
{"q": 13727, "quiz": 680, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Dad ran in and ran out of the shop. How did Dad feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Dad ran in and ran out.» بعد قوله «It can get in.»", "opts": [{"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very sick.", "dx": "JUMP", "key": false}, {"t": "He was very glad.", "dx": "REV", "key": false}]},
{"q": 13728, "quiz": 680, "was": "sentence", "obj": "P3.PROBLEM", "body": "What was the problem at Dan's shop?", "why": "المشكلة تأتي من أول القصة: «Rain ran down the hill.» ثم «It got up to Dan's shop.»", "opts": [{"t": "The shop was full of men.", "dx": null, "key": false}, {"t": "The rain got up to the shop.", "dx": null, "key": true}, {"t": "Ken did not come to help.", "dx": "REV", "key": false}]}
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

  if n_done + n_skip <> 31 then raise exception 'حُوِّل % وتُخطّي % والمنتظر 31', n_done, n_skip; end if;
  raise notice '243: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('243', 'أسئلةُ كتب R3 التسعة في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
