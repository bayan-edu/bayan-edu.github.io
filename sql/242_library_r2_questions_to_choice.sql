-- 242_library_r2_questions_to_choice.sql
-- أسئلةُ كتب R2 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241 على المستوى الثاني، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦): «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران
--   اختياراً من متعدّد، والترتيبُ يبقى. كتبُ المستوى 8 (LX-R02-N-M4-001…008، لم تُنشر بعد)، وأسئلتُها المحوَّلة 30
--   وخياراتُها الجديدة 90. وسؤالا الاختيار القائمان (13665 · 13690) يوافقان هدفيهما فيبقيان.
--   P1.SLOT (الكلمةُ المتغيّرة في نصٍّ منمَّط) يسأل اختياراً عن الكلمة نفسها. وحيث كان في الكتاب سؤالان منه صار ثانيهما
--   P2.ADJACENT فلا يتكرّران. وسؤالا «انظر إلى الصورة» (P3.MATCH) يصيران «عمّن هذا الكتاب؟» كما في 241.
--   وP4.EXTEND («قل سطراً آخر على نمط الكتاب») يصير اختياراً بين أسطرٍ مرشَّحة: واحدٌ يحفظ قاعدةَ الكتاب.
--   وسؤالُ الحكم مفتاحُه واحد كما في 241: الحكمُ الذي يسنده النصّ، ولا يُعرض الآخر إلا بسببٍ ينقضه النصّ.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R02.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13661, "quiz": 667, "was": "sentence", "obj": "P1.SLOT", "body": "The sun is hot. The sun is big. What is the sun then?", "why": "النمط «The sun is …» تتغير فيه كلمة واحدة: up · hot · big، ثم «The sun is a star.»", "opts": [{"t": "A star.", "dx": null, "key": true}, {"t": "A son.", "dx": "MIX", "key": false}, {"t": "The sand.", "dx": "MIX", "key": false}]},
{"q": 13662, "quiz": 667, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "The book tells about the sun. What does my son do then?", "why": "هنا ينكسر النمط: بعد «The sun is a star.» تأتي «My son looks at it.» — والضمير it يعود إلى الشمس.", "opts": [{"t": "He looks at the sand.", "dx": "MIX", "key": false}, {"t": "He sits in a tent.", "dx": null, "key": false}, {"t": "He looks at the sun.", "dx": null, "key": true}]},
{"q": 13663, "quiz": 667, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الجواب يأتي من النص كله، ويعلنه أول سطر: «My son and I sit on the sand.»", "opts": [{"t": "Dad and Mom.", "dx": null, "key": false}, {"t": "My son and I.", "dx": null, "key": true}, {"t": "Ten men.", "dx": null, "key": false}]},
{"q": 13686, "quiz": 672, "was": "sentence", "obj": "P1.SLOT", "body": "The old man has a big bag. What is big, too?", "why": "النمط «He has a big …» تتغير فيه كلمة واحدة: bag ثم «He has a big box.»", "opts": [{"t": "His leg.", "dx": "MIX", "key": false}, {"t": "His box.", "dx": null, "key": true}, {"t": "His shop.", "dx": null, "key": false}]},
{"q": 13687, "quiz": 672, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "He has a bad leg. What did I do then?", "why": "هنا ينكسر النمط: بعد «I got his bag.» و«I got his box.» لا تأتي «I got his leg» بل «His hand is in my hand.»", "opts": [{"t": "I got his leg.", "dx": "ECHO", "key": false}, {"t": "I ran to the shop.", "dx": "MIX", "key": false}, {"t": "I got his hand in my hand.", "dx": null, "key": true}]},
{"q": 13688, "quiz": 672, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الكتاب كله عن اثنين: الراوي «I» والرجل العجوز «The man is old.»", "opts": [{"t": "Ten men.", "dx": null, "key": false}, {"t": "Dad and Mom.", "dx": null, "key": false}, {"t": "An old man and I.", "dx": null, "key": true}]},
{"q": 13671, "quiz": 669, "was": "sentence", "obj": "P1.SLOT", "body": "The sand is on the tent and on the bus. What is the sand on then?", "why": "النمط «The sand is on the …» تتغير فيه كلمة واحدة: tent · bus، ثم «The sand is on the men.»", "opts": [{"t": "The men.", "dx": null, "key": true}, {"t": "The shop.", "dx": null, "key": false}, {"t": "The wind.", "dx": "MIX", "key": false}]},
{"q": 13672, "quiz": 669, "was": "sentence", "obj": "P2.ADJACENT", "body": "The men sit on the bus. What about the wind?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «The men sit on the bus.» ثم «The wind can not get in.»", "opts": [{"t": "The wind is on the bus.", "dx": "REV", "key": false}, {"t": "The wind has no sand.", "dx": "REV", "key": false}, {"t": "The wind can not get in.", "dx": null, "key": true}]},
{"q": 13673, "quiz": 669, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الكتاب كله عن رجال في ريح تحمل الرمل: «The sand is on the men.» ثم «The men sit on the bus.»", "opts": [{"t": "Men in the wind.", "dx": null, "key": true}, {"t": "Dad and Mom.", "dx": null, "key": false}, {"t": "My son and I.", "dx": null, "key": false}]},
{"q": 13675, "quiz": 669, "was": "judge", "obj": "P4.EXTEND", "body": "Look at the lines with sand in the book. Find one more line like them.", "why": "قاعدة الكتاب «The sand is on the …» وتتغير الكلمة الأخيرة وحدها، فالسطر الذي يحفظها: «The sand is on the bag.»", "opts": [{"t": "The sand is on the bag.", "dx": null, "key": true}, {"t": "The wind is a star.", "dx": "MIX", "key": false}, {"t": "The men sit in the tent.", "dx": "TASK", "key": false}]},
{"q": 13681, "quiz": 671, "was": "sentence", "obj": "P1.SLOT", "body": "Who do I have gifts for?", "why": "النمط «I have a gift for …» تتغير فيه كلمة واحدة: Dad · Mom · Pam.", "opts": [{"t": "Dad, Mom and Sam.", "dx": null, "key": false}, {"t": "Dad, Pam and Tom.", "dx": null, "key": false}, {"t": "Dad, Mom and Pam.", "dx": null, "key": true}]},
{"q": 13682, "quiz": 671, "was": "sentence", "obj": "P2.ADJACENT", "body": "\"A gift for you,\" said Dad. What is the gift?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «\"A gift for you,\" said Dad.» ثم «It is a cap!»", "opts": [{"t": "A cap.", "dx": null, "key": true}, {"t": "A job.", "dx": "MIX", "key": false}, {"t": "A pen.", "dx": null, "key": false}]},
{"q": 13683, "quiz": 671, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "After the gift for Pam, what is different?", "why": "هنا ينكسر النمط: بعد ثلاث جمل «I have a gift for …» تأتي «There is no gift for me.»", "opts": [{"t": "Pam has a gift for Dad.", "dx": "MIX", "key": false}, {"t": "There is no gift for me.", "dx": null, "key": true}, {"t": "I have a gift for Sam.", "dx": "ECHO", "key": false}]},
{"q": 13685, "quiz": 671, "was": "judge", "obj": "P4.EXTEND", "body": "Look at the lines with a gift in the book. Find one more line like them.", "why": "قاعدة الكتاب «I have a gift for …» وتتغير الكلمة الأخيرة وحدها، فالسطر الذي يحفظها: «I have a gift for my brother.»", "opts": [{"t": "My brother has a job.", "dx": "TASK", "key": false}, {"t": "I have a gift for my brother.", "dx": null, "key": true}, {"t": "It is a big cap!", "dx": "TASK", "key": false}]},
{"q": 13666, "quiz": 668, "was": "sentence", "obj": "P1.SLOT", "body": "The ant has a big leaf. What does the ant have then?", "why": "النمط «The ant has a … leaf» تتغير فيه الصفة وحدها: a leaf · a big leaf، ثم «The ant has a big, big leaf!»", "opts": [{"t": "A big, big bag.", "dx": "MIX", "key": false}, {"t": "A big, big leaf.", "dx": null, "key": true}, {"t": "A little leaf.", "dx": "REV", "key": false}]},
{"q": 13667, "quiz": 668, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "The ant is little. What did Tom say then?", "why": "هنا ينكسر النمط: بعد جمل النملة وورقتها يأتي كلام توم «\"Can a man do that?\" said Tom.»", "opts": [{"t": "\"The ant has a big bag.\"", "dx": "MIX", "key": false}, {"t": "\"Can an ant do that?\"", "dx": "REV", "key": false}, {"t": "\"Can a man do that?\"", "dx": null, "key": true}]},
{"q": 13668, "quiz": 668, "was": "sentence", "obj": "P2.ADJACENT", "body": "Tom has a big bag. What did Tom do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Tom has a big bag.» ثم «Tom sat down!»", "opts": [{"t": "Tom ran with the bag.", "dx": null, "key": false}, {"t": "Tom sat down.", "dx": null, "key": true}, {"t": "Tom got a big leaf.", "dx": "MIX", "key": false}]},
{"q": 13670, "quiz": 668, "was": "judge", "obj": "P4.FIT", "body": "The name of the book is The Ant. Is that a good name for it?", "why": "الاسم يناسب الكتاب لأن أكثر جمله عن النملة: «The ant has a leaf. The ant has a big leaf. The ant has a big, big leaf!»", "opts": [{"t": "No. The book is about a dog.", "dx": "GAP", "key": false}, {"t": "Yes. Most of the book tells about the ant.", "dx": null, "key": true}, {"t": "Yes. Tom is the name of the ant.", "dx": "MIX", "key": false}]},
{"q": 13656, "quiz": 666, "was": "sentence", "obj": "P1.SLOT", "body": "Who has a hat?", "why": "النمط «… has a hat» يتغير فيه الاسم وحده: «Sam has a hat.» ثم «Dan has a hat.»", "opts": [{"t": "Sam and Dan.", "dx": null, "key": true}, {"t": "Sam and Tom.", "dx": null, "key": false}, {"t": "Dan and Tom.", "dx": null, "key": false}]},
{"q": 13657, "quiz": 666, "was": "sentence", "obj": "P2.ADJACENT", "body": "Sam can see Ben in the sun. What did Sam say?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Ben is not well.» ثم «\"Get in the tent,\" said Sam.»", "opts": [{"t": "\"Get a hat.\"", "dx": null, "key": false}, {"t": "\"Get back to it.\"", "dx": "MIX", "key": false}, {"t": "\"Get in the tent.\"", "dx": null, "key": true}]},
{"q": 13658, "quiz": 666, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "Look at the words \"Ben has no hat.\" What happens to Ben then?", "why": "هنا ينكسر النمط: بعد «Sam has a hat.» و«Dan has a hat.» تأتي «Ben has no hat.»، وبعدها «Ben is not well.»", "opts": [{"t": "Ben gets a hat.", "dx": "ECHO", "key": false}, {"t": "Ben is not well.", "dx": null, "key": true}, {"t": "Ben works in the tent.", "dx": "MIX", "key": false}]},
{"q": 13660, "quiz": 666, "was": "judge", "obj": "P4.POINT", "body": "Look at Sam. Did he do the right thing?", "why": "الحكم الذي يسنده النص: رأى سام زميله مريضاً فأعانه «Sam got a cup for Ben.»", "opts": [{"t": "Yes. Sam got a cup for Ben.", "dx": null, "key": true}, {"t": "No. Sam took Ben's hat.", "dx": "GAP", "key": false}, {"t": "No. Sam sat in the tent.", "dx": "MIX", "key": false}]},
{"q": 13691, "quiz": 673, "was": "sentence", "obj": "P1.SLOT", "body": "Sam got the box. What did Sam get then?", "why": "النمط «Sam got the …» تتغير فيه كلمة واحدة: box ثم «Sam got the bag.»", "opts": [{"t": "The bag.", "dx": null, "key": true}, {"t": "The hat.", "dx": null, "key": false}, {"t": "The cup.", "dx": null, "key": false}]},
{"q": 13692, "quiz": 673, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "A kid is down. What did Sam do then?", "why": "هنا ينكسر النمط: بعد «Sam got the box.» و«Sam got the bag.» تأتي «Sam ran to the kid.»", "opts": [{"t": "Sam ran to the kid.", "dx": null, "key": true}, {"t": "Sam got the kid's bag.", "dx": "ECHO", "key": false}, {"t": "Sam sat down.", "dx": "MIX", "key": false}]},
{"q": 13693, "quiz": 673, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الجواب يأتي من النص كله: سام هو من يُختبر ويحمل ويجري إلى الطفل «Sam got the box. Sam got the bag. Sam ran to the kid.»", "opts": [{"t": "Sam and his son.", "dx": null, "key": false}, {"t": "Sam and his dad.", "dx": null, "key": false}, {"t": "Sam and a kid.", "dx": null, "key": true}]},
{"q": 13695, "quiz": 673, "was": "judge", "obj": "P4.POINT", "body": "Look at Sam and the kid. Did Sam do a good thing?", "why": "الحكم الذي يسنده النص: ترك سام الاختبار لأن طفلاً سقط «A kid is down.»، فقال الرجل «You got the job.»", "opts": [{"t": "No. Sam did not get the box.", "dx": "REV", "key": false}, {"t": "No. Sam did not get the job.", "dx": "REV", "key": false}, {"t": "Yes. A kid is down.", "dx": null, "key": true}]},
{"q": 13676, "quiz": 670, "was": "sentence", "obj": "P1.SLOT", "body": "Ten red pens go in a box. What pens go in a box then?", "why": "النمط «Ten … pens in this box» يتغير فيه اللون وحده: red ثم «Ten blue pens in this box.»", "opts": [{"t": "Ten big pens.", "dx": null, "key": false}, {"t": "Ten red caps.", "dx": null, "key": false}, {"t": "Ten blue pens.", "dx": null, "key": true}]},
{"q": 13677, "quiz": 670, "was": "sentence", "obj": "P2.PATTERN_BREAK", "body": "One box is different. What is in it?", "why": "هنا ينكسر النمط: بعد صندوقين في كل منهما عشرة تأتي «I set six pens in this box.»", "opts": [{"t": "Six boxes.", "dx": "MIX", "key": false}, {"t": "Six pens.", "dx": null, "key": true}, {"t": "Ten pens.", "dx": "ECHO", "key": false}]},
{"q": 13678, "quiz": 670, "was": "sentence", "obj": "P2.ADJACENT", "body": "A man got the box. How many pens are in it?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Ten pens in this box now.» ثم «A man got the box.»", "opts": [{"t": "Ten.", "dx": null, "key": true}, {"t": "Two.", "dx": null, "key": false}, {"t": "Six.", "dx": "MIX", "key": false}]},
{"q": 13680, "quiz": 670, "was": "judge", "obj": "P4.POINT", "body": "Look at the son. Is he good at the job?", "why": "الحكم الذي يسنده النص: أخطأ الابن فنبّهه أبوه «\"Ten pens in a box,\" said Dad.» فأصلح خطأه «Ten pens in this box now.»", "opts": [{"t": "Yes. I did what Dad said.", "dx": null, "key": true}, {"t": "No. I set no pens in the box.", "dx": "REV", "key": false}, {"t": "No. I did not work with Dad.", "dx": "REV", "key": false}]}
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
  raise notice '242: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('242', 'أسئلةُ كتب R2 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
