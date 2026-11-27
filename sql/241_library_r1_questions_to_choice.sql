-- 241_library_r1_questions_to_choice.sql
-- أسئلةُ كتب R1 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: قرارُ المالك (٢٦–٢٧ نوفمبر ٢٠٢٦) بعد إعادة التسكين (240) — «الضغط على الجملة» و«حكمٌ ودليلُه» مربكان، وأشدُّ ما يكون
--   ذلك على الشاشات الصغيرة. فيصير كلُّ سؤالٍ منهما اختياراً من متعدّد حتى في المستويات الأولى، والحكمُ سؤالاً واحداً خياراتُه
--   حكمٌ مع سببه. والترتيبُ يبقى. والعمل يمضي مستوىً مستوىً من R1، وهذا أوّلُها: كتبُه 8 (LX-R01-N-M4-001…008)، وأسئلتُها
--   المحوَّلة 32 وخياراتُها الجديدة 96.
--   وسؤالا «انظر إلى الصورة» (P3.MATCH) يصيران «عمّن هذا الكتاب؟» (P3.WHO_ABOUT): الهدفُ يطلب صورةً وشاشةُ الاختبار لا تعرضها.
--   وكان سؤالُ الحكم يقبل الحكمين، كلٌّ بسطره. والاختيارُ مفتاحُه واحد: الحكمُ الذي يسنده النصّ، ولا يُعرض الآخر إلا بسببٍ ينقضه النصّ.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ منها.
--   وإعادةُ التشغيل آمنة: سؤالٌ صار mcq بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R01.py ← gen_sql.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13636, "quiz": 662, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did the man say?", "why": "الجواب مكتوب في النص بكلماته: «\"For you,\" said the man.»", "opts": [{"t": "\"Two caps!\"", "dx": "MIX", "key": false}, {"t": "\"My bag.\"", "dx": null, "key": false}, {"t": "\"For you.\"", "dx": null, "key": true}]},
{"q": 13637, "quiz": 662, "was": "sentence", "obj": "P2.ADJACENT", "body": "The man set a cap in my bag. What did I have then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «The man set a cap in my bag.» ثم «Two caps!»", "opts": [{"t": "Two caps.", "dx": null, "key": true}, {"t": "Two bags.", "dx": "MIX", "key": false}, {"t": "A cap.", "dx": "PART", "key": false}]},
{"q": 13638, "quiz": 662, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الكتاب كله عن اثنين: الراوي «I» والرجل «the man».", "opts": [{"t": "Ten men.", "dx": null, "key": false}, {"t": "Dad and I.", "dx": null, "key": false}, {"t": "A man and I.", "dx": null, "key": true}]},
{"q": 13640, "quiz": 662, "was": "judge", "obj": "P4.POINT", "body": "I set down the cap. Is that good?", "why": "الحكم الذي يسنده النص: وضعتُ القبعة فعادت إلى صاحبها «I set down the cap. The man got it.»", "opts": [{"t": "No. I got the man's bag.", "dx": "MIX", "key": false}, {"t": "Yes. The man got the cap.", "dx": null, "key": true}, {"t": "Yes. The man set down the cap.", "dx": "MIX", "key": false}]},
{"q": 13621, "quiz": 659, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What is the name of the cop?", "why": "الجواب مكتوب في النص بكلماته: «Sam is a cop.»", "opts": [{"t": "Tom", "dx": null, "key": false}, {"t": "Sam", "dx": null, "key": true}, {"t": "Dan", "dx": null, "key": false}]},
{"q": 13622, "quiz": 659, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did a man say?", "why": "الجواب مكتوب في النص بكلماته: «\"Not my bag!\" said a man.»", "opts": [{"t": "\"It is a cop dog.\"", "dx": "MIX", "key": false}, {"t": "\"Sam can see the bag.\"", "dx": "MIX", "key": false}, {"t": "\"Not my bag!\"", "dx": null, "key": true}]},
{"q": 13623, "quiz": 659, "was": "sentence", "obj": "P2.ADJACENT", "body": "The dog sat at a bag. What can Sam see?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «The dog sat at a red bag.» ثم «Sam can see the bag.» — فالحقيبة التي يراها هي الحمراء.", "opts": [{"t": "The red bag.", "dx": null, "key": true}, {"t": "The men.", "dx": "MIX", "key": false}, {"t": "The cop dog.", "dx": "MIX", "key": false}]},
{"q": 13625, "quiz": 659, "was": "judge", "obj": "P4.POINT", "body": "Look at the man at the end. Is he a good man?", "why": "الحكم الذي يسنده النص: كلب الشرطة جلس عند حقيبة «The dog sat at a red bag.»، والرجل ينكر أنها حقيبته «\"Not my bag!\" said a man.»", "opts": [{"t": "Yes. The dog did not sit at a bag.", "dx": "REV", "key": false}, {"t": "No. The dog sat at the man's bag.", "dx": null, "key": true}, {"t": "Yes. The dog sat at Sam's bag.", "dx": "MIX", "key": false}]},
{"q": 13616, "quiz": 658, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did the big man say?", "why": "الجواب مكتوب في النص بكلماته: «\"A fan can help,\" said the big man.»", "opts": [{"t": "\"A cup!\"", "dx": "MIX", "key": false}, {"t": "\"It is hot.\"", "dx": "MIX", "key": false}, {"t": "\"A fan can help.\"", "dx": null, "key": true}]},
{"q": 13617, "quiz": 658, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "A man is down. What did a man say then?", "why": "الجواب مكتوب في النص بكلماته: «\"A cup!\" said a man.»", "opts": [{"t": "\"A cup!\"", "dx": null, "key": true}, {"t": "\"A fan!\"", "dx": "MIX", "key": false}, {"t": "\"A stone!\"", "dx": null, "key": false}]},
{"q": 13618, "quiz": 658, "was": "sentence", "obj": "P2.ADJACENT", "body": "It is hot. What did the big man get?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «It is hot.» ثم «The big man got a fan.»", "opts": [{"t": "A stone.", "dx": "MIX", "key": false}, {"t": "A cup.", "dx": "MIX", "key": false}, {"t": "A fan.", "dx": null, "key": true}]},
{"q": 13620, "quiz": 658, "was": "judge", "obj": "P4.POINT", "body": "Is the big man a good man?", "why": "الحكم الذي يسنده النص: الجو حار والرجال يعملون، فجاء الرجل الكبير بما يعين «The big man got a fan. \"A fan can help,\"».", "opts": [{"t": "No. The big man did not help.", "dx": "REV", "key": false}, {"t": "Yes. The big man cut the stone.", "dx": "MIX", "key": false}, {"t": "Yes. The big man got help for the men.", "dx": null, "key": true}]},
{"q": 13651, "quiz": 665, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did the man say?", "why": "الجواب مكتوب في النص بكلماته: «\"Get my cup,\" said the man.»", "opts": [{"t": "\"Sit down.\"", "dx": null, "key": false}, {"t": "\"Get my bag.\"", "dx": "MIX", "key": false}, {"t": "\"Get my cup.\"", "dx": null, "key": true}]},
{"q": 13652, "quiz": 665, "was": "sentence", "obj": "P2.ADJACENT", "body": "A cup sat and sat. What did I do then?", "why": "الجواب يأتي من جمع الجمل المتجاورة: «A cup sat and sat. It did not go away.» ثم «I got the cup.»", "opts": [{"t": "I sat and sat.", "dx": "MIX", "key": false}, {"t": "I got the cup.", "dx": null, "key": true}, {"t": "I got a big cup.", "dx": "MIX", "key": false}]},
{"q": 13653, "quiz": 665, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الكتاب كله عن اثنين: الراوي «I» والرجل «the man».", "opts": [{"t": "Dad and I.", "dx": null, "key": false}, {"t": "Ten men.", "dx": null, "key": false}, {"t": "A man and I.", "dx": null, "key": true}]},
{"q": 13655, "quiz": 665, "was": "judge", "obj": "P4.POINT", "body": "Is the man a good man?", "why": "الحكم الذي يسنده النص: رفعتُ الكوب المتروك، فوضع الرجل كوباً آخر وأمرني بحمله «The man set down a cup. \"Get my cup,\"».", "opts": [{"t": "Yes. The man got the big bag.", "dx": "MIX", "key": false}, {"t": "No. The man set down a cup.", "dx": null, "key": true}, {"t": "Yes. The man did not sit.", "dx": "REV", "key": false}]},
{"q": 13626, "quiz": 660, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did Dad say first?", "why": "الجواب مكتوب في النص بكلماته: «\"Get a cup,\" said Dad.» — وهو أول ما قاله الأب.", "opts": [{"t": "\"Get a cup.\"", "dx": null, "key": true}, {"t": "\"It is my job.\"", "dx": "MIX", "key": false}, {"t": "\"Sit and get a cup.\"", "dx": "MIX", "key": false}]},
{"q": 13627, "quiz": 660, "was": "sentence", "obj": "P2.ADJACENT", "body": "Dad had a cup. What did I do in the sun?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «I did not.» ثم «I cut and cut in the sun.»", "opts": [{"t": "I cut and cut.", "dx": null, "key": true}, {"t": "I had a cup.", "dx": "MIX", "key": false}, {"t": "I sat and sat.", "dx": "MIX", "key": false}]},
{"q": 13628, "quiz": 660, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الجواب يأتي من النص كله، ويعلنه أول سطر: «Dad and I cut palms.»", "opts": [{"t": "Ten men.", "dx": null, "key": false}, {"t": "Dad and I.", "dx": null, "key": true}, {"t": "A man and a dog.", "dx": null, "key": false}]},
{"q": 13630, "quiz": 660, "was": "judge", "obj": "P4.POINT", "body": "Look at the son. Is he a good son?", "why": "الحكم الذي يسنده النص: الابن يعمل عمله «It is my job.» ولا يتركه «I cut and cut in the sun.»، ثم يطيع أباه «I got a cup.»", "opts": [{"t": "Yes. I did my job.", "dx": null, "key": true}, {"t": "No. Dad did not get a cup.", "dx": "REV", "key": false}, {"t": "No. I did not cut palms.", "dx": "REV", "key": false}]},
{"q": 13641, "quiz": 663, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "Dan can see a man's sum. What is the name of the man?", "why": "الجواب مكتوب في النص بكلماته: «Dan can see Ben's sum.»", "opts": [{"t": "Ben", "dx": null, "key": true}, {"t": "Tom", "dx": null, "key": false}, {"t": "Sam", "dx": null, "key": false}]},
{"q": 13642, "quiz": 663, "was": "sentence", "obj": "P2.ADJACENT", "body": "Ben got the sum. What did Ben do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Ben got the sum.» ثم «Ben got up.»", "opts": [{"t": "Ben sat and sat.", "dx": null, "key": false}, {"t": "Ben set down the pen.", "dx": "MIX", "key": false}, {"t": "Ben got up.", "dx": null, "key": true}]},
{"q": 13643, "quiz": 663, "was": "sentence", "obj": "P2.ADJACENT", "body": "Dan can see the sum. What did Dan do then?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «Dan can see Ben's sum.» ثم «Dan set down the pen.»", "opts": [{"t": "Dan got the sum.", "dx": "REV", "key": false}, {"t": "Dan got up.", "dx": "MIX", "key": false}, {"t": "Dan set down the pen.", "dx": null, "key": true}]},
{"q": 13645, "quiz": 663, "was": "judge", "obj": "P4.POINT", "body": "Is Dan a good man?", "why": "الحكم الذي يسنده النص: كان دان يرى حلّ زميله فلم يأخذه «Dan set down the pen. Dan did not get the sum.»", "opts": [{"t": "No. Dan got the man's sum.", "dx": "REV", "key": false}, {"t": "Yes. Dan did not get the man's sum.", "dx": null, "key": true}, {"t": "No. Dan got up.", "dx": "MIX", "key": false}]},
{"q": 13631, "quiz": 661, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did Dad say at the end?", "why": "الجواب مكتوب في النص بكلماته: «\"Here!\" said Dad.» — وهو آخر ما قاله الأب.", "opts": [{"t": "\"Here!\"", "dx": null, "key": true}, {"t": "\"I can find the bus.\"", "dx": "MIX", "key": false}, {"t": "\"I can help.\"", "dx": "MIX", "key": false}]},
{"q": 13632, "quiz": 661, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الجواب يأتي من النص كله، ويعلنه أول سطر: «Tom's dad had a big map.»", "opts": [{"t": "Tom and Dad.", "dx": null, "key": true}, {"t": "A cop and a dog.", "dx": null, "key": false}, {"t": "Ten men.", "dx": null, "key": false}]},
{"q": 13633, "quiz": 661, "was": "sentence", "obj": "P2.ADJACENT", "body": "Dad had the map. What did Dad do?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «\"I can find the bus,\" said Dad.» ثم «Dad sat and sat.»", "opts": [{"t": "Dad got up.", "dx": "MIX", "key": false}, {"t": "Dad sat and sat.", "dx": null, "key": true}, {"t": "Dad set down the map.", "dx": "MIX", "key": false}]},
{"q": 13635, "quiz": 661, "was": "judge", "obj": "P4.POINT", "body": "Is Tom a good son?", "why": "الحكم الذي يسنده النص: عرض توم العون «\"I can help,\" said Tom.»، ثم صبر وترك أباه يجد الطريق «Tom sat and sat. Tom did not get the map.»", "opts": [{"t": "No. Tom did not sit.", "dx": "REV", "key": false}, {"t": "Yes. Tom did not get the map from Dad.", "dx": null, "key": true}, {"t": "No. Tom got the map from Dad.", "dx": "REV", "key": false}]},
{"q": 13646, "quiz": 664, "was": "sentence", "obj": "P1.PRINT_ONLY", "body": "What did the men say?", "why": "الجواب مكتوب في النص بكلماته: «\"Run!\" said the men.»", "opts": [{"t": "\"Run!\"", "dx": null, "key": true}, {"t": "\"Get up!\"", "dx": "MIX", "key": false}, {"t": "\"Sit down!\"", "dx": "MIX", "key": false}]},
{"q": 13647, "quiz": 664, "was": "sentence", "obj": "P2.ADJACENT", "body": "The men run. What did the man in yellow do?", "why": "الجواب يأتي من جمع جملتين متجاورتين: «The man in yellow did not run.» ثم «The man in yellow sat down.»", "opts": [{"t": "The man in yellow sat down.", "dx": null, "key": true}, {"t": "The man in yellow got up.", "dx": "MIX", "key": false}, {"t": "The man in yellow ran with the men.", "dx": "REV", "key": false}]},
{"q": 13648, "quiz": 664, "was": "sentence", "obj": "P3.WHO_ABOUT", "body": "Who is this book about?", "why": "الجواب يأتي من النص كله، ويعلنه أول سطر: «Ten men run.»", "opts": [{"t": "Dad and I.", "dx": null, "key": false}, {"t": "A cop and a dog.", "dx": null, "key": false}, {"t": "Ten men.", "dx": null, "key": true}]},
{"q": 13650, "quiz": 664, "was": "judge", "obj": "P4.POINT", "body": "The men run on. Is that good?", "why": "الحكم الذي يسنده النص: سقط رجل «A man in blue is down.» ومضى الرجال يجرون «The men run.»", "opts": [{"t": "Yes. The man in yellow ran with them.", "dx": "REV", "key": false}, {"t": "No. A man in blue is down.", "dx": null, "key": true}, {"t": "Yes. The man in blue ran with them.", "dx": "REV", "key": false}]}
]$spec$::jsonb;
  e jsonb; o jsonb; r record;
  v_q bigint; v_obj bigint; v_id bigint; v_key bigint; v_dx jsonb; i int; n int;
  n_done int := 0; n_skip int := 0; n_trial int := 0;
begin
  /* محاولةٌ تجريبيّة واحدة على هذا الاختبار (658) من حساب مدير — وإجاباتُها تشير إلى الخيارات التي تُستبدل، فتُحذف معها
     (answers تتبع attempts بـ ON DELETE CASCADE). ولا يُحذف إلا ما كان لمدير: محاولةُ طالبٍ تُوقف الملفّ في الحارس بعدها. */
  delete from attempts t where t.id = 1382 and t.quiz_id = 658
     and exists (select 1 from profiles p where p.id = t.user_id and p.role = 'admin');
  get diagnostics n = row_count; n_trial := n_trial + n;

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

  if n_done + n_skip <> 32 then raise exception 'حُوِّل % وتُخطّي % والمنتظر 32', n_done, n_skip; end if;
  raise notice '241: حُوِّل % سؤالاً · تُخطّي % · حُذفت % محاولة تجريبيّة', n_done, n_skip, n_trial;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('241', 'أسئلةُ كتب R1 الثمانية في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
