-- 247_library_r7_questions_to_choice.sql
-- أسئلةُ كتب R7 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241–246 على المستوى السابع، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦) وبإذنه أن يُطبَّق كلُّ مستوىً مباشرة.
--   كتبُ المستوى 8 (M4، لم تُنشر)، وأسئلتُها المحوَّلة 30 وخياراتُها الجديدة 90. وأسئلةُ الاختيار الستّة القائمة تبقى.
--   وحيث يصرّح سؤالٌ باقٍ (أو سطرٌ في ترتيبٍ باقٍ) بما كان سؤالُ الضغط يسأل عنه، سُئل تحت الهدف نفسه عن شيءٍ آخر.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R07.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13866, "quiz": 708, "was": "sentence", "obj": "P1.PARAPHRASE", "body": "How does the owl find a mouse in a dark spot?", "why": "السؤال يعيد صياغة النص: «It hears the mouse with its ears, not its eyes.»", "opts": [{"t": "It feels the mouse.", "dx": null, "key": false}, {"t": "It sees the mouse.", "dx": "REV", "key": false}, {"t": "It hears the mouse.", "dx": null, "key": true}]},
{"q": 13867, "quiz": 708, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "How can an owl fly close to a mouse and stay so quiet?", "why": "السبب في الجملة قبلها بلا أداة ربط: «The ends of its wings are soft, like a brush. It can fly close to a mouse and make no noise.»", "opts": [{"t": "Its wings are very small.", "dx": "JUMP", "key": false}, {"t": "The ends of its wings are soft.", "dx": null, "key": true}, {"t": "It flies very fast at night.", "dx": "JUMP", "key": false}]},
{"q": 13868, "quiz": 708, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "Why does a man on a farm put a big box on a tree for an owl?", "why": "السبب يُجمع من جملتين قبلها: «Rats and mice eat the food on the farm. One bird can eat many mice in a week.»", "opts": [{"t": "The owl eats the rats and mice on the farm.", "dx": null, "key": true}, {"t": "The owl can not fly in the dark.", "dx": "REV", "key": false}, {"t": "The box keeps the food on the farm dry.", "dx": "JUMP", "key": false}]},
{"q": 13869, "quiz": 708, "was": "sentence", "obj": "P3.MAIN_SHORT", "body": "What is the first half of this book all about?", "why": "الفكرة الرئيسة للنصف الأول: «This night bird can get a mouse in a dark spot with no light.» وما بعدها يشرح كيف.", "opts": [{"t": "How an owl gets a mouse in the dark.", "dx": null, "key": true}, {"t": "How a man puts a box on a tree.", "dx": "PART", "key": false}, {"t": "How mice eat the food on a farm.", "dx": "PART", "key": false}]},
{"q": 13870, "quiz": 708, "was": "judge", "obj": "P4.WORD_CHOICE", "body": "In the book, the owl's face is \"like a big dish.\" Is that a good way to tell about it?", "why": "التشبيه يوافق ما يفعله الوجه في النص: «The dish takes in a small noise and brings it to the ears.»", "opts": [{"t": "No. The owl's face is soft, like a brush.", "dx": "MIX", "key": false}, {"t": "Yes. The face takes in a small noise, like a dish.", "dx": null, "key": true}, {"t": "No. The owl eats its food from a dish.", "dx": "LITR", "key": false}]},
{"q": 13876, "quiz": 710, "was": "sentence", "obj": "P1.PARAPHRASE", "body": "In the hot months, what did the sheep eat?", "why": "السؤال يعيد صياغة النص: «His dad fed the sheep from big bags in the back of the truck.»", "opts": [{"t": "Small yellow flowers.", "dx": "MIX", "key": false}, {"t": "Food from big bags in the truck.", "dx": null, "key": true}, {"t": "Seeds from the red sand.", "dx": "MIX", "key": false}]},
{"q": 13877, "quiz": 710, "was": "sentence", "obj": "P2.SPEAKER", "body": "Who said, \"But I saw just sand!\"?", "why": "الكلام بلا اسم قائله، ويُعرف من تناوب الحوار: سأل زيد «Where did all this grass come from?» فأجاب أبوه، ثم ردّ زيد.", "opts": [{"t": "Zaid's little brother", "dx": "MIX", "key": false}, {"t": "Zaid's dad", "dx": "MIX", "key": false}, {"t": "Zaid", "dx": null, "key": true}]},
{"q": 13878, "quiz": 710, "was": "sentence", "obj": "P2.FEELING_TWO", "body": "Zaid kicked the sand. Then he sat in the truck with his phone for a long time. How did he feel?", "why": "الشعور لم يُسمَّ، ودليله سلوكان: «Zaid kicked the sand with his foot.» و«Then he sat in the truck with his phone for a long time.»", "opts": [{"t": "He was glad to see the desert.", "dx": "REV", "key": false}, {"t": "He was afraid of the sheep.", "dx": "JUMP", "key": false}, {"t": "He did not like the trip.", "dx": null, "key": true}]},
{"q": 13879, "quiz": 710, "was": "sentence", "obj": "P3.CHANGE", "body": "How was the desert different ten days after the rain?", "why": "التغيّر وما غيّره: المطر، ثم «The red sand was green. Thin grass and small yellow flowers were all over the hills.»", "opts": [{"t": "It was red and dry, with no grass.", "dx": "REV", "key": false}, {"t": "It was green, with grass and flowers.", "dx": null, "key": true}, {"t": "It was dark and wet, with no sheep.", "dx": "MIX", "key": false}]},
{"q": 13871, "quiz": 709, "was": "sentence", "obj": "P1.PARAPHRASE", "body": "Where is a good place to go when you hear the noise?", "why": "السؤال يعيد صياغة النص: «Go into a home or a car with a hard top.»", "opts": [{"t": "Up to the top of a hill.", "dx": null, "key": false}, {"t": "Under a tall tree.", "dx": "REV", "key": false}, {"t": "Into a home or a car.", "dx": null, "key": true}]},
{"q": 13872, "quiz": 709, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "The light and the noise start at the same time. Why does the light get to us first?", "why": "السبب في جملتين بلا أداة ربط: «Light is very, very fast.» و«Noise is slow.»", "opts": [{"t": "The light is big, and the noise is small.", "dx": "JUMP", "key": false}, {"t": "Our eyes are close, and our ears are not.", "dx": "JUMP", "key": false}, {"t": "Light is very fast, and noise is slow.", "dx": null, "key": true}]},
{"q": 13873, "quiz": 709, "was": "sentence", "obj": "P3.CHANGE", "body": "First you get to thirty, and later you get to ten. What does that show about the dark cloud?", "why": "التغيّر من ثلاثين إلى عشرة يعني اقتراب السحابة: «Think of a dark cloud that is coming to your town.» ثم «Now the dark cloud is right over you.»", "opts": [{"t": "It is going away from you.", "dx": "REV", "key": false}, {"t": "It is coming to you.", "dx": null, "key": true}, {"t": "It is getting small.", "dx": "JUMP", "key": false}]},
{"q": 13875, "quiz": 709, "was": "judge", "obj": "P4.WORD_CHOICE", "body": "In the book, light is \"like a fast car\" and noise is \"like a slow man.\" Does that help explain the idea?", "why": "التشبيه يوافق الفكرة: الضوء يصل أولاً «It gets to our eyes right away.» والصوت بعده «It takes five seconds to go one mile.»", "opts": [{"t": "Yes. A fast car gets there first, like the light.", "dx": null, "key": true}, {"t": "No. There are no cars up in a cloud.", "dx": "LITR", "key": false}, {"t": "No. Noise is faster than light in the sky.", "dx": "REV", "key": false}]},
{"q": 13861, "quiz": 707, "was": "sentence", "obj": "P1.PARAPHRASE", "body": "Where did Karl von Frisch keep the bees he watched?", "why": "السؤال يعيد صياغة النص: «He watched bees in glass homes for many years.»", "opts": [{"t": "In a dark box.", "dx": "MIX", "key": false}, {"t": "In glass homes.", "dx": null, "key": true}, {"t": "In a big field.", "dx": "MIX", "key": false}]},
{"q": 13862, "quiz": 707, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "The other bees stay close to the first bee to feel it. Why?", "why": "السبب في الجملة قبلها بلا أداة ربط: «It is dark in the bee home. The other bees stay close to the first bee to feel it.»", "opts": [{"t": "The line is too short.", "dx": "JUMP", "key": false}, {"t": "It is dark in the bee home.", "dx": null, "key": true}, {"t": "The first bee walks too fast.", "dx": "MIX", "key": false}]},
{"q": 13863, "quiz": 707, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "Why does the bee walk each line for a long time today?", "why": "السبب في الجملة قبلها بلا أداة ربط: «The field today is a long way from home. The bee walks each line for a long time.»", "opts": [{"t": "The bee is old and slow.", "dx": "JUMP", "key": false}, {"t": "The field is close to home.", "dx": "REV", "key": false}, {"t": "The field is a long way from home.", "dx": null, "key": true}]},
{"q": 13864, "quiz": 707, "was": "sentence", "obj": "P3.MAIN_SHORT", "body": "What is this book all about?", "why": "الفكرة الرئيسة يعلنها السؤال والجواب في أول النص: «How can the other bees find the same field? The first bee shows them the way.»", "opts": [{"t": "How flowers make sweet water for the bees.", "dx": "PART", "key": false}, {"t": "How a man made glass homes for his bees.", "dx": "PART", "key": false}, {"t": "How a bee shows other bees the way to flowers.", "dx": null, "key": true}]},
{"q": 13856, "quiz": 706, "was": "sentence", "obj": "P1.TWO_FACTS", "body": "What two things can a camel live with very little of?", "why": "الجواب يجمع معلومتين من جملتين: «It can go for a week or more with no water.» و«It can go for months with very little food.»", "opts": [{"t": "Sand and sun.", "dx": "MIX", "key": false}, {"t": "Fat and grass.", "dx": "MIX", "key": false}, {"t": "Water and food.", "dx": null, "key": true}]},
{"q": 13857, "quiz": 706, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "Why is the camel's hump big and tall again in a week or two?", "why": "السبب في الجملة قبلها بلا أداة ربط: «Then the camel gets to a place with good grass to eat. In a week or two, the hump is big and tall again.»", "opts": [{"t": "The camel drinks a lot of water.", "dx": "MIX", "key": false}, {"t": "The camel eats good grass.", "dx": null, "key": true}, {"t": "The camel sits on the cold sand.", "dx": "MIX", "key": false}]},
{"q": 13858, "quiz": 706, "was": "sentence", "obj": "P3.MAIN_SHORT", "body": "What is this book all about?", "why": "الفكرة الرئيسة يعلنها أول سطر: «A camel's body is made for life in the hot, dry desert.»", "opts": [{"t": "How a camel sits on the sand at night.", "dx": "PART", "key": false}, {"t": "How a camel's body is made for the desert.", "dx": null, "key": true}, {"t": "How people go on long trips in the desert.", "dx": "PART", "key": false}]},
{"q": 13886, "quiz": 712, "was": "sentence", "obj": "P1.TWO_FACTS", "body": "What two things were in the dry river bed at the start?", "why": "الجواب يجمع معلومتين من جملة واحدة: «There was no water in it, just sand and stones.»", "opts": [{"t": "Water and stones.", "dx": "REV", "key": false}, {"t": "Sand and trees.", "dx": "MIX", "key": false}, {"t": "Sand and stones.", "dx": null, "key": true}]},
{"q": 13887, "quiz": 712, "was": "sentence", "obj": "P2.SPEAKER", "body": "Who said, \"But there is no rain here!\"?", "why": "الكلام بلا اسم قائله، ويُعرف من تناوب الحوار: سأل سام «Why did we stop?» فأجاب بن، ثم ردّ سام.", "opts": [{"t": "Ben", "dx": "MIX", "key": false}, {"t": "Sam", "dx": null, "key": true}, {"t": "A man in a small car", "dx": "MIX", "key": false}]},
{"q": 13888, "quiz": 712, "was": "sentence", "obj": "P2.FEELING_TWO", "body": "Sam sat back hard in his seat. He looked at his clock again and again. How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوكان: «Sam sat back hard in his seat.» و«He looked at his clock again and again.»", "opts": [{"t": "He was afraid of the mountain.", "dx": "JUMP", "key": false}, {"t": "He was angry and wanted to go.", "dx": null, "key": true}, {"t": "He was glad to stop and look.", "dx": "REV", "key": false}]},
{"q": 13891, "quiz": 713, "was": "sentence", "obj": "P1.PARAPHRASE", "body": "How big was each baby turtle?", "why": "السؤال يعيد صياغة النص: «Each one was no bigger than Yousef's hand.»", "opts": [{"t": "Bigger than a man's head.", "dx": null, "key": false}, {"t": "Bigger than a phone.", "dx": null, "key": false}, {"t": "No bigger than a hand.", "dx": null, "key": true}]},
{"q": 13892, "quiz": 713, "was": "sentence", "obj": "P2.SPEAKER", "body": "Who said, \"I just want one picture.\"?", "why": "الكلام بلا اسم قائله، ويُعرف من تناوب الحوار: ذهب سالم إلى الرجل وقال «Put off the light» فردّ الرجل.", "opts": [{"t": "Yousef, on the sand", "dx": "MIX", "key": false}, {"t": "The man with the light", "dx": null, "key": true}, {"t": "Salim, by the sea", "dx": "MIX", "key": false}]},
{"q": 13893, "quiz": 713, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "Why did Salim say, \"No phones and no lights on the beach\"?", "why": "السبب لا تصله أداة ربط بالأمر، ويأتي لاحقاً في النص: «They go to the light.»", "opts": [{"t": "The moon gives no light.", "dx": "REV", "key": false}, {"t": "Phones make a big noise.", "dx": "JUMP", "key": false}, {"t": "Baby turtles go to the light.", "dx": null, "key": true}]},
{"q": 13894, "quiz": 713, "was": "sentence", "obj": "P3.GOAL", "body": "At the start, what did Yousef want to do on the beach?", "why": "رغبة يوسف في أول القصة: «He wanted a picture of them for his class.» وقد تركها في آخرها: «Yousef left his phone in his pocket.»", "opts": [{"t": "Take a turtle home.", "dx": "JUMP", "key": false}, {"t": "Take a picture for his class.", "dx": null, "key": true}, {"t": "Sit on the bus with his dad.", "dx": "MIX", "key": false}]},
{"q": 13881, "quiz": 711, "was": "sentence", "obj": "P1.TWO_FACTS", "body": "How many trees of each kind were on the farm?", "why": "الجواب يجمع عددين من جملة واحدة: «The farm had sixty trees of the first kind and just one of the other kind.»", "opts": [{"t": "Sixty trees that give dates, and one tree that gives no dates.", "dx": null, "key": true}, {"t": "Sixty trees that give dates, and sixty trees that give no dates.", "dx": "PART", "key": false}, {"t": "One tree that gives dates, and sixty trees that give no dates.", "dx": "REV", "key": false}]},
{"q": 13882, "quiz": 711, "was": "sentence", "obj": "P2.FEELING_TWO", "body": "Look at the words \"His hands were wet. He did not look down.\" How did Hamad feel?", "why": "الشعور لم يُسمَّ، ودليله سلوكان عند صعود الشجرة: «His hands were wet.» و«He did not look down.»", "opts": [{"t": "He was angry.", "dx": "JUMP", "key": false}, {"t": "He was afraid.", "dx": null, "key": true}, {"t": "He was glad.", "dx": "REV", "key": false}]},
{"q": 13883, "quiz": 711, "was": "sentence", "obj": "P2.UNSIGNALLED", "body": "Why was there nothing in Abu Saleh's bag that spring?", "why": "السبب في الجملة قبلها بلا أداة ربط: «His old tree of the second kind fell in a storm in the winter. There was nothing in his bag.»", "opts": [{"t": "He was too old for the tall trees.", "dx": "MIX", "key": false}, {"t": "Grandpa got all his white flowers.", "dx": "REV", "key": false}, {"t": "His tree with the white flowers fell in a storm.", "dx": null, "key": true}]}
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

  if n_done + n_skip <> 30 then raise exception 'حُوِّل % وتُخطّي % والمنتظر 30', n_done, n_skip; end if;
  raise notice '247: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('247', 'أسئلةُ كتب R7 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
