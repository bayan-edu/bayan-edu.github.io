-- 246_library_r6_questions_to_choice.sql
-- أسئلةُ كتب R6 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241–245 على المستوى السادس، بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦) وبإذنه أن يُطبَّق كلُّ مستوىً مباشرة.
--   كتبُ المستوى 8 (M4، لم تُنشر)، وأسئلتُها المحوَّلة 31 وخياراتُها الجديدة 93. وأسئلةُ الاختيار الأربعة القائمة تبقى.
--   وحيث يصرّح سؤالٌ باقٍ (أو سطرٌ في ترتيبٍ باقٍ) بما كان سؤالُ الضغط يسأل عنه، سُئل عن شيءٍ آخر — ومنه 13847 صار P2.CONSEQUENCE.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R06.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13836, "quiz": 702, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where did Dad go to cut the power to the shop?", "why": "الجواب يُوجد بالرجوع إلى النص: «Dad went to the big gray box on the wall at the back. He cut the power to the shop.»", "opts": [{"t": "To the small box by the light.", "dx": "MIX", "key": false}, {"t": "To the man at the shop.", "dx": "MIX", "key": false}, {"t": "To the big gray box on the wall.", "dx": null, "key": true}]},
{"q": 13837, "quiz": 702, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Dad cut the power. Then he set the pen on the lines again. What did Dad say then?", "why": "الرابط Then يصل قطع الكهرباء بانطفاء ضوء القلم، ونتيجته بكلام الأب: «Now we can start.»", "opts": [{"t": "\"Now we can start.\"", "dx": null, "key": true}, {"t": "\"It is off at the wall.\"", "dx": "MIX", "key": false}, {"t": "\"Stop, Zak!\"", "dx": "MIX", "key": false}]},
{"q": 13838, "quiz": 702, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Zak got down from the box and sat on it for a long time. How did Zak feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Zak got down from the box and sat on it for a long time.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very angry.", "dx": "JUMP", "key": false}, {"t": "He was very afraid.", "dx": null, "key": true}]},
{"q": 13839, "quiz": 702, "was": "sentence", "obj": "P3.CHANGE", "body": "One week later, Zak had a job at a home. What did he do first?", "why": "التغيّر بين أول القصة وآخرها: مدّ يده أولاً، ثم «He went to the big box first. Then he got out his test pen.»", "opts": [{"t": "He went to the big box.", "dx": null, "key": true}, {"t": "He put his hand on the lines.", "dx": "REV", "key": false}, {"t": "He got up on a box.", "dx": "MIX", "key": false}]},
{"q": 13831, "quiz": 701, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "What can drop from the top of a tall building?", "why": "الجواب يُوجد بالرجوع إلى النص: «Up at the top, a man can drop a tool. A stone can drop from the top too.»", "opts": [{"t": "A tool or a stone.", "dx": null, "key": true}, {"t": "A band or a hat.", "dx": "MIX", "key": false}, {"t": "A box or a bag.", "dx": null, "key": false}]},
{"q": 13832, "quiz": 701, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Why does the hard top sit a little up from a man's head?", "why": "الرابط So يصل الجملتين بالنتيجة: «The band sits on his head. The hat sits up on the band. So the hard top sits a little up from his head.»", "opts": [{"t": "The top of the hat is thick.", "dx": "MIX", "key": false}, {"t": "The hat sits up on a band.", "dx": null, "key": true}, {"t": "The hat is too small for him.", "dx": "JUMP", "key": false}]},
{"q": 13833, "quiz": 701, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "A small stone came down on the young man's hat. What happened to his head?", "why": "النتيجة في النص: «The hat had a crack in it, but his head was fine.»", "opts": [{"t": "It was fine.", "dx": null, "key": true}, {"t": "It got very hot.", "dx": "MIX", "key": false}, {"t": "It got a crack.", "dx": "MIX", "key": false}]},
{"q": 13851, "quiz": 705, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where did the bees have their homes on the farm?", "why": "الجواب يُوجد بالرجوع إلى النص: «The bees had their homes in big white boxes.»", "opts": [{"t": "In big white boxes.", "dx": null, "key": true}, {"t": "In tall trees.", "dx": null, "key": false}, {"t": "In the smoke box.", "dx": "MIX", "key": false}]},
{"q": 13852, "quiz": 705, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Why do the bees stay still when there is smoke?", "why": "الرابط so يصل السبب بالنتيجة: «Bees make a smell when they want to sting. Smoke hides that smell, so the bees stay still.»", "opts": [{"t": "The smoke hides a smell.", "dx": null, "key": true}, {"t": "The smoke is very hot.", "dx": "JUMP", "key": false}, {"t": "The bees like the smoke.", "dx": null, "key": false}]},
{"q": 13853, "quiz": 705, "was": "sentence", "obj": "P3.GOAL", "body": "At the start, what did Ben want to see on the farm?", "why": "رغبة بن في أول القصة: «Ben wanted to see the bees at work.» وقد رآها في آخرها مع أبيه.", "opts": [{"t": "The bees at work.", "dx": null, "key": true}, {"t": "His dad in town.", "dx": "MIX", "key": false}, {"t": "A fire in the smoke box.", "dx": "MIX", "key": false}]},
{"q": 13855, "quiz": 705, "was": "judge", "obj": "P4.ALTERNATIVE", "body": "Ben took the top from the box fast on his own. Was that a good idea?", "why": "الحكم الذي يسنده النص: طريقة بن آذته، وطريقة أبيه — الدخان أولاً ثم رفع الغطاء بتأنٍّ — أبقت النحل ساكناً.", "opts": [{"t": "Yes. The bees sat still in the box.", "dx": "REV", "key": false}, {"t": "No. The good way is smoke first, and with care.", "dx": null, "key": true}, {"t": "Yes. Dad was there to help him.", "dx": "REV", "key": false}]},
{"q": 13841, "quiz": 703, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "When did Ned and Tim go out to sea?", "why": "الجواب يُوجد بالرجوع إلى النص: «They went out to sea when the sun came up.»", "opts": [{"t": "When the fish shop was open.", "dx": "MIX", "key": false}, {"t": "When the sun came up.", "dx": null, "key": true}, {"t": "When the sea was a long way out.", "dx": "MIX", "key": false}]},
{"q": 13842, "quiz": 703, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Ned sat on the sand with his head in his hands. How did Ned feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: «Ned sat on the sand with his head in his hands.»", "opts": [{"t": "He was very glad.", "dx": "REV", "key": false}, {"t": "He was very sad.", "dx": null, "key": true}, {"t": "He was very sick.", "dx": "JUMP", "key": false}]},
{"q": 13843, "quiz": 703, "was": "sentence", "obj": "P3.GOAL", "body": "What did Ned want to do that night?", "why": "رغبة ند بكلمات النص: «Ned wanted to go out for fish that night.» وقد خرج حين عاد البحر.", "opts": [{"t": "Go out for fish.", "dx": null, "key": true}, {"t": "Go home to eat.", "dx": "MIX", "key": false}, {"t": "Sit by the boat with Tim.", "dx": "MIX", "key": false}]},
{"q": 13845, "quiz": 703, "was": "judge", "obj": "P4.ALTERNATIVE", "body": "Ned left the boat on the sand close to the shop. Was that a good idea?", "why": "الحكم الذي يسنده النص: «When he came back, the sea was a long way out. The boat sat on the sand, and it did not move.»", "opts": [{"t": "Yes. The boat went out fast that night.", "dx": "REV", "key": false}, {"t": "Yes. The fish shop was close to the boat.", "dx": "TASK", "key": false}, {"t": "No. The sea went out, and the boat did not move.", "dx": null, "key": true}]},
{"q": 13826, "quiz": 700, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "What do the sides of the big glasses stop?", "why": "الجواب يُوجد بالرجوع إلى النص: «The sides stop pieces that come at the eye from the side.»", "opts": [{"t": "Pieces that come from the side.", "dx": null, "key": true}, {"t": "Boards that drop from the saw.", "dx": "MIX", "key": false}, {"t": "Light that comes from the sun.", "dx": null, "key": false}]},
{"q": 13827, "quiz": 700, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Why did Ken leave his glasses in his bag that day?", "why": "الرابط so يصل السبب بالنتيجة: «It was a small job, so he left his glasses in his bag.»", "opts": [{"t": "A man in the shop had his bag.", "dx": "MIX", "key": false}, {"t": "His glasses were at home.", "dx": null, "key": false}, {"t": "It was a small job.", "dx": null, "key": true}]},
{"q": 13828, "quiz": 700, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "A piece of wood came up at Ken. What did it do to him?", "why": "النتيجة في النص: «It cut his face just under his eye.» وعينه سليمة: «his eye was fine.»", "opts": [{"t": "It cut his hand.", "dx": "MIX", "key": false}, {"t": "It cut his eye.", "dx": "REV", "key": false}, {"t": "It cut his face.", "dx": null, "key": true}]},
{"q": 13829, "quiz": 700, "was": "sentence", "obj": "P3.CHANGE", "body": "What does Ken do for every job now?", "why": "التغيّر بين أول القصة وآخرها: «Now Ken puts on his glasses for every job, big and small.»", "opts": [{"t": "He gets a cloth for his face.", "dx": "MIX", "key": false}, {"t": "He cuts just one board.", "dx": "MIX", "key": false}, {"t": "He puts on his glasses.", "dx": null, "key": true}]},
{"q": 13830, "quiz": 700, "was": "judge", "obj": "P4.ALTERNATIVE", "body": "Ken left his glasses in his bag for one board. Was that a good idea?", "why": "الحكم الذي يسنده النص: قطعة الخشب طارت في عمل صغير، ولهذا «Now Ken puts on his glasses for every job, big and small.»", "opts": [{"t": "Yes. His face was fine after the job.", "dx": "REV", "key": false}, {"t": "Yes. A small job can not hurt a man.", "dx": "REV", "key": false}, {"t": "No. Wood can fly up in a small job too.", "dx": null, "key": true}]},
{"q": 13821, "quiz": 699, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where is Mom's dress shop?", "why": "الجواب يُوجد بالرجوع إلى النص: «Mom has a dress shop in a small town.»", "opts": [{"t": "In a small town.", "dx": null, "key": true}, {"t": "By the sea.", "dx": null, "key": false}, {"t": "On a big farm.", "dx": null, "key": false}]},
{"q": 13822, "quiz": 699, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Why does Mom put new cotton into hot water first?", "why": "الرابط because يصرّح بالسبب: «First, she puts it into hot water, because new cotton can get small.»", "opts": [{"t": "New cotton can get small.", "dx": null, "key": true}, {"t": "New cotton is not clean.", "dx": "JUMP", "key": false}, {"t": "Cotton is good on hot days.", "dx": "MIX", "key": false}]},
{"q": 13823, "quiz": 699, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "The woman put her new dress into hot water at home. What happened to the dress?", "why": "النتيجة في الجملة التالية: «Then the dress was too short for her.»", "opts": [{"t": "It was too long for her.", "dx": "REV", "key": false}, {"t": "It kept the same size.", "dx": "REV", "key": false}, {"t": "It was too short for her.", "dx": null, "key": true}]},
{"q": 13824, "quiz": 699, "was": "sentence", "obj": "P3.CHANGE", "body": "What does Meg do with new cloth at the end?", "why": "التغيّر بين أول القصة وآخرها: «Now Meg puts new cloth into hot water first, too.»", "opts": [{"t": "She cuts it on the day it comes.", "dx": "REV", "key": false}, {"t": "She puts it into hot water first.", "dx": null, "key": true}, {"t": "She takes it back to the town.", "dx": "MIX", "key": false}]},
{"q": 13825, "quiz": 699, "was": "judge", "obj": "P4.ALTERNATIVE", "body": "Meg cut the new cloth on the day it came. Was that a good idea?", "why": "الحكم الذي يسنده النص: طريقة الأم — الماء الساخن ثم الشمس قبل القص — تُبقي الثوب على مقاسه، وطريقة ميغ قصّرته.", "opts": [{"t": "Yes. The woman wanted the dress that day.", "dx": "JUMP", "key": false}, {"t": "Yes. The dress kept the same size.", "dx": "REV", "key": false}, {"t": "No. Hot water and sun come first for new cotton.", "dx": null, "key": true}]},
{"q": 13846, "quiz": 704, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "What did Sam and his uncle make the floor from?", "why": "الجواب يُوجد بالرجوع إلى النص: «They made it from cement, sand, stones and water.»", "opts": [{"t": "Cement, sand, trees and water.", "dx": null, "key": false}, {"t": "Cement, cloths, stones and water.", "dx": "MIX", "key": false}, {"t": "Cement, sand, stones and water.", "dx": null, "key": true}]},
{"q": 13847, "quiz": 704, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "A man by them left his new floor in the hot sun. What happened in three days?", "why": "النتيجة في الجملة التالية: «In three days, his floor had long cracks.»", "opts": [{"t": "His floor was still wet.", "dx": "REV", "key": false}, {"t": "His floor had long cracks.", "dx": null, "key": true}, {"t": "His floor was hard and strong.", "dx": "REV", "key": false}]},
{"q": 13848, "quiz": 704, "was": "sentence", "obj": "P2.FEELING_ONE", "body": "Sam sat under a tree and kicked the sand. How did Sam feel?", "why": "الشعور لم يُسمَّ، ودليله سلوك واحد: أراد العودة إلى البيت فـ«Sam sat under a tree and kicked the sand.»", "opts": [{"t": "He was afraid.", "dx": "JUMP", "key": false}, {"t": "He was glad.", "dx": "REV", "key": false}, {"t": "He was angry.", "dx": null, "key": true}]},
{"q": 13816, "quiz": 698, "was": "sentence", "obj": "P1.LOOK_BACK", "body": "Where does the water from the small hole go?", "why": "الجواب يُوجد بالرجوع إلى النص: «It goes down into the sand by the tree.»", "opts": [{"t": "Over all the sand on the farm.", "dx": "MIX", "key": false}, {"t": "Down into the sand by the tree.", "dx": null, "key": true}, {"t": "Up to the top of the tree.", "dx": null, "key": false}]},
{"q": 13817, "quiz": 698, "was": "sentence", "obj": "P2.CONNECTIVE", "body": "Why can a date farm with lines use just a little water?", "why": "الرابط So يصل السبب بالنتيجة: الماء يبلغ الشجرة والشمس لا تأخذ منه إلا قليلاً، «So a date farm with lines can use just a little water.»", "opts": [{"t": "The lines on it are long and black.", "dx": "TASK", "key": false}, {"t": "The water gets down to the trees.", "dx": null, "key": true}, {"t": "The trees on it do not drink.", "dx": "REV", "key": false}]},
{"q": 13818, "quiz": 698, "was": "sentence", "obj": "P2.CONSEQUENCE", "body": "Sand gets into a hole and stops it. What happens to the tree by that hole?", "why": "النتيجة في الجملة التالية: «Then the tree by that hole gets no water.»", "opts": [{"t": "It gets a new line.", "dx": "MIX", "key": false}, {"t": "It gets no water.", "dx": null, "key": true}, {"t": "It gets all the water.", "dx": "REV", "key": false}]}
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
  raise notice '246: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('246', 'أسئلةُ كتب R6 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
