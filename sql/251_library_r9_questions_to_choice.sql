-- 251_library_r9_questions_to_choice.sql
-- أسئلةُ كتب R9 الثمانية (M4) في مكتبة بيان — «الضغط على الجملة» يصير اختياراً من متعدّد
--
-- لماذا: تتمّةُ 241–250 على المستوى التاسع — كتبُه الثمانية المؤلَّفة في M4 (وكتبُ M3 المستوردة في ملفٍّ يليه).
--   بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦) وبإذنه أن يُطبَّق كلُّ مستوىً مباشرة. الكتب 8 (لم تُنشر): 28 سؤالَ ضغطٍ يصير
--   اختياراً من متعدّد (112 خياراً). وأسئلةُ الاختيار الثمانية والترتيب الأربعة القائمة تبقى.
--   وحيث يصرّح سؤالٌ باقٍ بما كان سؤالُ الضغط يسأل عنه، سُئل تحت الهدف نفسه عن شيءٍ آخر.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   mcq: خياراتٌ ومفتاحٌ واحد وأكوادُ تشخيص. matching: البنودُ خياراتٌ بمفاتيح a… والمقابلاتُ في bank والأزواجُ في accept.pairs، ودرجتُه بعدد بنوده.
--   relabel: سؤالٌ باقٍ يُصحَّح هدفُه وحده. ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ يتحوّل.
--   وإعادةُ التشغيل آمنة: ما تحوّل بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R09.py ← gen_sql2.py

do $$
declare
  spec jsonb := $spec$[
{"q": 13956, "quiz": 726, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "How long did the brothers work on the stone wall?", "why": "في النص أزمنة عدّة تتنافس، والمطلوب مدّة البناء: «The stone wall took three long weeks.»", "opts": [{"t": "Three days.", "dx": "MIX", "key": false}, {"t": "Two days.", "dx": "MIX", "key": false}, {"t": "Many years.", "dx": "MIX", "key": false}, {"t": "Three weeks.", "dx": null, "key": true}]},
{"q": 13957, "quiz": 726, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "Why did Mark put many small stones behind the big front stones?", "why": "الدافع من سلوكه في الفقرة نفسها: «They filled every open place, so rain water can run through the wall.»", "opts": [{"t": "So rain water can run through the wall.", "dx": null, "key": true}, {"t": "So the wall can be ready in two days.", "dx": "MIX", "key": false}, {"t": "So the wall can look like gray blocks.", "dx": "JUMP", "key": false}, {"t": "So Tom can carry them up the hill.", "dx": "JUMP", "key": false}]},
{"q": 13958, "quiz": 726, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "At the end, Tom pushes on a big stone with his hand. Why?", "why": "السبب بلا أداة ربط: توم يفعل ما فعله أخوه من قبل «He pushed each stone hard with his hand» ليرى ثبات الجدار بعد المطر.", "opts": [{"t": "He wants to take the stone to the river.", "dx": "JUMP", "key": false}, {"t": "He is angry about the three long weeks.", "dx": "JUMP", "key": false}, {"t": "He wants to put a gray block in its place.", "dx": "MIX", "key": false}, {"t": "He wants to see if the stone stays still.", "dx": null, "key": true}]},
{"q": 13959, "quiz": 726, "obj": "P3.COMPARE_CHAR", "kind": "mcq", "was": "sentence", "body": "How were Tom and Mark different when they made the wall?", "why": "المقارنة في صفة واحدة — طريقة العمل: «Tom worked very fast all morning.» و«Mark worked with great care on his side.»", "opts": [{"t": "Tom worked in the rain, but Mark worked in the sun.", "dx": "JUMP", "key": false}, {"t": "Tom carried stones, but Mark carried gray blocks.", "dx": "MIX", "key": false}, {"t": "Mark worked very fast, but Tom worked with great care.", "dx": "REV", "key": false}, {"t": "Tom worked very fast, but Mark worked with great care.", "dx": null, "key": true}]},
{"q": 13936, "quiz": 722, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "Some desert camps are far from a river. What do people there put on the hot pieces?", "why": "السؤال يعيد صياغة النص: «People there turn dry sand into the hot pieces with a branch again and again.»", "opts": [{"t": "A bucket of cold tea.", "dx": "MIX", "key": false}, {"t": "Dry sand, again and again.", "dx": null, "key": true}, {"t": "Green grass from the hills.", "dx": "JUMP", "key": false}, {"t": "A circle of big stones.", "dx": "MIX", "key": false}]},
{"q": 13937, "quiz": 722, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What are \"coals\" in this book?", "why": "المعنى من السياق القريب: «Coals are small black pieces of wood that stay red and very hot inside.»", "opts": [{"t": "Pieces of dry grass that catch fire.", "dx": "MIX", "key": false}, {"t": "Small black pieces of wood that stay hot inside.", "dx": null, "key": true}, {"t": "Buckets of cold water from the river.", "dx": "MIX", "key": false}, {"t": "Big stones in a circle around a fire.", "dx": "MIX", "key": false}]},
{"q": 13938, "quiz": 722, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "Dan puts cold water on the sand. There is a big noise, and white smoke goes up. Why?", "why": "السبب بلا أداة ربط: الرمل يخفي جمراً حاراً «Sand on top can hide hot pieces for many hours.» فيصدر الصوت والدخان حين يلمسه الماء.", "opts": [{"t": "The water in the bucket is very hot.", "dx": "REV", "key": false}, {"t": "The wind blows the sand into the fire.", "dx": "MIX", "key": false}, {"t": "The sand is cold from the night.", "dx": "JUMP", "key": false}, {"t": "The pieces under the sand are still very hot.", "dx": null, "key": true}]},
{"q": 13971, "quiz": 729, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "Where did the two boys want to eat their food?", "why": "السؤال يعيد صياغة النص: «They wanted to eat lunch under the trees by the cold river water.»", "opts": [{"t": "Under a big stone by the sand way.", "dx": "MIX", "key": false}, {"t": "On a good street in the town.", "dx": "MIX", "key": false}, {"t": "At the bottom of the long hill.", "dx": "MIX", "key": false}, {"t": "Under the trees by the river.", "dx": null, "key": true}]},
{"q": 13972, "quiz": 729, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "What did Omar have in the small bag under his bike seat?", "why": "في النص حقيبتان تتنافسان (حقيبة الطعام وحقيبة العدّة): «In the bag, he had a new tube and a hand pump for air.»", "opts": [{"t": "A new tube and a hand pump.", "dx": null, "key": true}, {"t": "Two small stones from the hill.", "dx": "MIX", "key": false}, {"t": "A new wheel and a seat.", "dx": "MIX", "key": false}, {"t": "Bread and dates for lunch.", "dx": "MIX", "key": false}]},
{"q": 13973, "quiz": 729, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "The friends wanted to eat by the river. Why did they eat by the sand way?", "why": "السبب بلا أداة ربط: «The sun was high and hot over the hills now. The two boys were very hungry after the work.»", "opts": [{"t": "Ali wanted to go back to the town for lunch.", "dx": "JUMP", "key": false}, {"t": "The river in the hills had no trees by it.", "dx": "JUMP", "key": false}, {"t": "The work on the wheel was long, and they were very hungry.", "dx": null, "key": true}, {"t": "The bread and dates were too heavy for the hill.", "dx": "JUMP", "key": false}]},
{"q": 13974, "quiz": 729, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "How is Ali different at the end of the day?", "why": "التغيّر بين أول القصة وآخرها: ابتسم علي ومضى أولاً، ثم «he pushed both of his wheels hard with his hand.»", "opts": [{"t": "He smiles, and his back wheel is not hard.", "dx": "REV", "key": false}, {"t": "He puts his new red bike in the river.", "dx": "JUMP", "key": false}, {"t": "He pushes his wheels with his hand, like Omar.", "dx": null, "key": true}, {"t": "He goes very fast down every stone hill.", "dx": "REV", "key": false}]},
{"q": 13946, "quiz": 724, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "How does the small desert dog get cool in the hot day?", "why": "في النص ثلاثة حيوانات تتنافس طرائقها، والمطلوب الكلب الصغير: «In the hot day, its big ears cool its warm body.»", "opts": [{"t": "It drinks cold water from a river.", "dx": "REV", "key": false}, {"t": "Its big ears cool its body.", "dx": null, "key": true}, {"t": "It goes down under the top sand.", "dx": "MIX", "key": false}, {"t": "It closes its hole with sand.", "dx": "MIX", "key": false}]},
{"q": 13947, "quiz": 724, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "How does the jerboa get the water it wants?", "why": "السبب يُجمع من جملتين بلا أداة ربط: «The jerboa almost never drinks water with its mouth. It gets all the water it wants from the green grass and small desert food at night.»", "opts": [{"t": "From the cool sand down in its hole.", "dx": "JUMP", "key": false}, {"t": "From the rivers in the dry desert.", "dx": "REV", "key": false}, {"t": "From the rain that comes every week.", "dx": "REV", "key": false}, {"t": "From the grass and food it eats at night.", "dx": null, "key": true}]},
{"q": 13948, "quiz": 724, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "The eyes of the sand snake stay at the top of the sand. Why?", "why": "الدافع من سلوكين في الفقرة نفسها: «Only its two eyes stay up at the top. It waits there in the cool sand when a small mouse comes near.»", "opts": [{"t": "It wants to look at the red sun.", "dx": "JUMP", "key": false}, {"t": "Its eyes are too hot under the sand.", "dx": "REV", "key": false}, {"t": "It waits there for a small mouse.", "dx": null, "key": true}, {"t": "It wants to find a hole in the ground.", "dx": "MIX", "key": false}]},
{"q": 13949, "quiz": 724, "obj": "P3.COMPARE_CHAR", "kind": "mcq", "was": "sentence", "body": "How is the sand snake different from the jerboa?", "why": "المقارنة في صفة واحدة — المأوى من الحر: الجربوع في جحره «it closes the door of its hole with sand» والأفعى «does not make a hole in the ground».", "opts": [{"t": "The jerboa makes a hole, but the snake goes under the top sand.", "dx": null, "key": true}, {"t": "The snake makes a hole, but the jerboa goes under the top sand.", "dx": "REV", "key": false}, {"t": "The snake comes out at night, but the jerboa comes out in the day.", "dx": "REV", "key": false}, {"t": "The jerboa has big ears, but the snake has two long legs.", "dx": "MIX", "key": false}]},
{"q": 13961, "quiz": 727, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "Where are the blue lights at the airport?", "why": "في النص أربعة ألوان تتنافس، والمطلوب الأزرق: «Blue lights are by the small ways to the runway.»", "opts": [{"t": "By the small ways to the runway.", "dx": null, "key": true}, {"t": "At the far end of the runway.", "dx": "MIX", "key": false}, {"t": "At the start of the runway.", "dx": "MIX", "key": false}, {"t": "Along both sides of the runway.", "dx": "MIX", "key": false}]},
{"q": 13962, "quiz": 727, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "Why does Dan turn on the red light and the green light on the plane?", "why": "الدافع من كلامه في الفقرة نفسها: «At night, men in other planes see these lights. Then they know which way our plane is going.»", "opts": [{"t": "So men in other planes can see his plane and its way.", "dx": null, "key": true}, {"t": "So the men from the hospital can find the boxes.", "dx": "MIX", "key": false}, {"t": "So the plane can go up from the blue lights.", "dx": "MIX", "key": false}, {"t": "So Tariq can read the map of the mountain town.", "dx": "JUMP", "key": false}]},
{"q": 13963, "quiz": 727, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "How is Tariq different at the end of the trip?", "why": "التغيّر بين أول القصة وآخرها: سأل أولاً «What are the small clocks in the plane for?»، ثم «Tariq sat in his seat and looked at the instruments.»", "opts": [{"t": "He sits and looks at the instruments.", "dx": null, "key": true}, {"t": "He asks what the small clocks are for.", "dx": "REV", "key": false}, {"t": "He looks down at the streets of the city.", "dx": "REV", "key": false}, {"t": "He takes the medicine to the hospital.", "dx": "MIX", "key": false}]},
{"q": 13951, "quiz": 725, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "After seven days, one bowl is still cold. Where does the worker put it?", "why": "في الفقرة مصيران يتنافسان (الرفّ وصندوق الفرن)، والمطلوب الوعاء البارد: «She puts it back on the shelf for two more days.»", "opts": [{"t": "Out in the hot sun.", "dx": "MIX", "key": false}, {"t": "On the small table that turns.", "dx": "MIX", "key": false}, {"t": "In a box for the kiln.", "dx": "MIX", "key": false}, {"t": "Back on the shelf for two more days.", "dx": null, "key": true}]},
{"q": 13952, "quiz": 725, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "Why do workers put new dishes in a cool room for many days?", "why": "الدافع من جملتين في الفقرة نفسها: «In the hot sun, one side can get dry before the other side. Then the bowl can break.»", "opts": [{"t": "In the sun, the bowl gets full of water again.", "dx": "REV", "key": false}, {"t": "In the cool room, a hot fire changes the brown ground.", "dx": "MIX", "key": false}, {"t": "In the sun, one side gets dry first, and the bowl can break.", "dx": null, "key": true}, {"t": "In the cool room, the bowl rings like a bell.", "dx": "MIX", "key": false}]},
{"q": 13953, "quiz": 725, "obj": "P3.MAIN_SHORT", "kind": "mcq", "was": "sentence", "body": "What is this book about?", "why": "الفكرة الرئيسة تجمع النص كله: من «Many dishes start as brown ground from a river.» إلى الفرن الذي يجعلها «hard like stone».", "opts": [{"t": "How old dishes get soft again in water.", "dx": "REV", "key": false}, {"t": "How brown ground from a river becomes a hard dish.", "dx": null, "key": true}, {"t": "How a worker turns a small table fast.", "dx": "PART", "key": false}, {"t": "How people cook bread in a kitchen fire.", "dx": "PART", "key": false}]},
{"q": 13966, "quiz": 728, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "How much money were the five pieces of blue cloth?", "why": "في النص أرقام عدّة تتنافس، والمطلوب ثمن القطع الخمس: «the five pieces were fifteen dollars for the mother.»", "opts": [{"t": "Five dollars.", "dx": "MIX", "key": false}, {"t": "Ten dollars.", "dx": "MIX", "key": false}, {"t": "Fifteen dollars.", "dx": null, "key": true}, {"t": "Three dollars.", "dx": "PART", "key": false}]},
{"q": 13967, "quiz": 728, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "Cotton can \"shrink\" in water. What does \"shrink\" mean here?", "why": "المعنى من السياق القريب: «It gets a little shorter and smaller after you wash it.»", "opts": [{"t": "Get hard like a ruler.", "dx": "JUMP", "key": false}, {"t": "Get shorter and smaller.", "dx": null, "key": true}, {"t": "Get longer and bigger.", "dx": "REV", "key": false}, {"t": "Get clean and white.", "dx": "JUMP", "key": false}]},
{"q": 13968, "quiz": 728, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "The money box has too much money in it. How does Sara see this?", "why": "السبب يُجمع من سلوكها بلا أداة ربط: «Sara opened the box and looked at all the paper money inside it. Then she read every line in the small black book.»", "opts": [{"t": "Her aunt Salma looks in the box before her.", "dx": "JUMP", "key": false}, {"t": "A man at the bread shop comes to the cloth shop.", "dx": "MIX", "key": false}, {"t": "The mother comes back and asks for her money.", "dx": "REV", "key": false}, {"t": "She looks at the money and reads the black book.", "dx": null, "key": true}]},
{"q": 13941, "quiz": 723, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "Where do the heavy brown pieces go down to the bottom?", "why": "في النص أربع خطوات تتنافس مواضعها، والمطلوب موضع الرسوب: «Second, the water sits very still in a second big pool… the heavy brown pieces go down to the bottom of the pool.»", "opts": [{"t": "In the second big pool.", "dx": null, "key": true}, {"t": "In the bed of sand and stones.", "dx": "MIX", "key": false}, {"t": "In the first open pool.", "dx": "MIX", "key": false}, {"t": "In the lines under the streets.", "dx": "MIX", "key": false}]},
{"q": 13942, "quiz": 723, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What are \"germs\" in this book?", "why": "المعنى من السياق القريب: «Germs are very small things in the water. They are alive. Your eyes can not see them, and they can hurt people.»", "opts": [{"t": "A medicine that keeps the water clean.", "dx": "MIX", "key": false}, {"t": "Very small things in water that can hurt people.", "dx": null, "key": true}, {"t": "A white powder for the first pool.", "dx": "MIX", "key": false}, {"t": "Small pieces of brown sand from the river.", "dx": "MIX", "key": false}]},
{"q": 13943, "quiz": 723, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "Why do workers send clean water through the sand bed from the bottom?", "why": "الدافع من جمل الفقرة نفسها: «the sand bed is full of brown sand from the river… The dirty water comes out at the top and runs away. Then the clean sand is ready to work again.»", "opts": [{"t": "To take the brown sand out of the sand bed.", "dx": null, "key": true}, {"t": "To put a little chlorine in the sand bed.", "dx": "MIX", "key": false}, {"t": "To get the water to every home in the town.", "dx": "MIX", "key": false}, {"t": "To put white powder in the open pool.", "dx": "MIX", "key": false}]},
{"q": 13944, "quiz": 723, "obj": "P3.MAIN_SHORT", "kind": "mcq", "was": "sentence", "body": "What is this book about?", "why": "الفكرة الرئيسة يعلنها أول النص: «At a water house, workers clean the river water in four steps. Then big lines take the clean water to every home in the town.»", "opts": [{"t": "How workers clean river water for a town in four steps.", "dx": null, "key": true}, {"t": "How a girl fills her glass in her kitchen.", "dx": "PART", "key": false}, {"t": "How very small germs can hurt people in a town.", "dx": "PART", "key": false}, {"t": "How a long river gets brown sand and leaves in it.", "dx": "PART", "key": false}]}
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

  if n_done + n_skip <> 28 then raise exception 'عُدِّل % وتُخطّي % والمنتظر 28', n_done, n_skip; end if;
  raise notice '251: عُدِّل % سؤالاً · تُخطّي %', n_done, n_skip;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('251', 'أسئلةُ كتب R9 الثمانية (M4) في مكتبة بيان — «الضغط على الجملة» يصير اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
