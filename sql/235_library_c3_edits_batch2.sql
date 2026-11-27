-- ══════════════════════════════════════════════════════════
-- 235 · تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الثانية: ٣٧ كتاباً في M4 وكتابٌ في M3، جملةٌ أو كلمة (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **طلبُ المالك (٢٦ نوفمبر):** «نفذ التعديلات» — تتمّةُ `234` بآليّته نفسها: استبدالُ عبارةٍ بعبارة في نصّ الكتاب ومقطع الاختبار
--      والخيارات وشرح المفتاح ومثال البطاقة معاً، وكلُّ زوجٍ بعدده المقيس على القاعدة الحيّة.
--   ② **أحكامُ المالك التي تنفّذها** (`content-policy.md` §٨): G1 السحر · G2 الموسيقى مثالاً · G4 أصلُ الاسم من إله · G6 دورُ عبادة غيرنا ·
--      وما في §٥ من أعيادٍ وخمرٍ وكلابٍ منزليّة وغرام.
--   ③ **وسؤالٌ واحدٌ يُعاد بناؤه:** 20133 في African Wormwood (1865) كان يسأل «من سُمّيت النبتةُ باسمه» وجوابُه الجملةُ المحذوفة.
--      فصار يسأل عن معنى «afra»، وجوابُه الجملةُ التي تليها (الخيار 672219)، ويُحذف خيارُ الجملة المحذوفة (672218). ولا إجابةَ لطالب.
--   ④ **وبطاقةٌ واحدةٌ تُحذف:** 13644 «hunting» — كلمتُها خرجت من نصّ 1865 بالتعديل، إن لم يكن لها كتابٌ آخر.
--   ⑤ **ما لا تمسّه:** كلامُ شخصٍ حقيقيّ لا يُوضع على لسانه ما لم يقله — يُحذف منه أو يُحوَّل إلى كلامٍ منقول (1304).
--   ⑥ **قابلٌ لإعادة التشغيل:** الزوجُ المطبَّق لا يُوجد نصُّه القديم، فيُتخطّى.
-- ══════════════════════════════════════════════════════════

do $$
declare
  spec constant jsonb := $spec$[
{"l":922,"f":"Every other solar system planet was named for a Greek or Roman deity, but for at least a thousand years, some","r":"For at least a thousand years, some","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":1}},
{"l":922,"f":"How Earth got its name from a Greek or Roman god.","r":"How Earth got its name from a famous scientist.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":951,"f":"(If we could, Halloween would never be the same!)","r":"(If we could, dressing up would never be the same!)","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":952,"f":"One example is Christmas lights.","r":"One example is a string of decorative lights.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":952,"f":"With some Christmas lights,","r":"With some strings of lights,","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":959,"f":"There is even an annual national Wattle Day that is celebrated on September 1st.","r":"Green and gold, the colors of the golden wattle, are even Australia’s national colors.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":1,"cards":0}},
{"l":959,"f":"Yes, it says Australia even has a national Wattle Day every September 1st.","r":"Yes, it says the colors of the golden wattle are even Australia’s national colors.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1016,"f":"when you hit a drum, or pluck the strings of a guitar.","r":"when you clap your hands, or knock on a door.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1057,"f":"thousands of people visit the Pathibhara Devi temple in eastern Nepal, an important religious site. This site also","r":"thousands of people travel through the forested hills of eastern Nepal. This area also","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1058,"f":"like running or dancing","r":"like running or swimming","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":1058,"f":"like dancing or running,","r":"like swimming or running,","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":1239,"f":"“Is that a magic cauldron?”","r":"“Is that a giant cooking pot?”","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1240,"f":"seasons, summer holidays, and even special days like birthdays.","r":"seasons, and summer holidays.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1243,"f":"His hands drum a tune.","r":"His fingers tap his knee.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1246,"f":"to St. Mary's Church which was near seashore","r":"to an old building which was near seashore","n":{"items":1,"passages":1,"questions":0,"options":3,"keys":0,"cards":0}},
{"l":1246,"f":"choose St. Mary's Church for the rocket launch","r":"choose the old building for the rocket launch","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":1246,"f":"The specialty of that church was","r":"The specialty of that building was","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":1,"cards":0}},
{"l":1246,"f":"Tavin reached the church along","r":"Tavin reached the building along","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1246,"f":"He saw the prayer hall converted","r":"He saw the main hall converted","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1246,"f":"the rockets which he fired during Diwali","r":"the toy rockets which he had fired for fun","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1246,"f":"were praying to God.","r":"were watching with hope.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":1}},
{"l":1263,"f":"and sang Vande Mataram.","r":"and cheered together.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":1283,"f":"pets of all kinds: dogs, cats,","r":"pets of all kinds: cats,","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1297,"f":"Zoos first started in the 1960s after a pop song came out.","r":"Zoos first started in the 1960s after a famous film came out.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1304,"f":"\"I celebrate Earth Day every day,\" Nirvanna Madho, 10, told WR News.","r":"Nirvanna Madho, 10, told WR News that she tries to help the Earth every day.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1310,"f":"your yard, school, church, business,","r":"your yard, school, business,","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":1314,"f":"and every birthday, he asked his parents for LEGOs as his birthday present.","r":"and whenever he could, he asked his parents for more LEGOs.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1317,"f":"when your music-streaming service makes a recommendation","r":"when your video-streaming service makes a recommendation","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1317,"f":"What songs would they play on the sound system?","r":"What news would they play on the radio?","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1322,"f":"the pines and spruces that are commonly used as Christmas trees.","r":"the pines and spruces.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1327,"f":"described as a 19-year-old model and pop singer.","r":"described as a 19-year-old model.","n":{"items":1,"passages":1,"questions":0,"options":3,"keys":0,"cards":0}},
{"l":1327,"f":"a talent agency signed a virtual singer.","r":"a talent agency signed a virtual performer.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1330,"f":"resembles an elongated pagoda.","r":"resembles the tall, tiered towers that can be seen in many parts of Asia.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1330,"f":"This architectural style was originally built to honor the Buddha. As Buddhism spread throughout Asia during the Han Dynasty, this architectural style became more widespread. Although some of these pagodas are not Buddhist houses of worship anymore, they are still important historical structures that can be seen in many parts of Asia. ","r":"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1335,"f":"Whether you are strumming an electric guitar, playing a game","r":"Whether you are making a call, playing a game","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1338,"f":"up close at a concert featuring your favorite band…","r":"up close at a match featuring your favorite team…","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1341,"f":"This Halloween she is speaking at a school","r":"This autumn she is speaking at a school","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1348,"f":"He is drunk and ","r":"He is careless and ","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1425,"f":"He was playing the piano.","r":"He was reading at his desk.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1425,"f":"The sea, Professor, and music make me feel very peaceful.","r":"The sea, Professor, makes me feel very peaceful.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1425,"f":"I heard music coming from Captain Nemo's library.","r":"I heard a voice coming from Captain Nemo's library.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1425,"f":"I listened to him playing the piano, and I thought","r":"I listened, and I thought","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1438,"f":"Rivers even support musical talent.","r":"Rivers are even full of strange sounds.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1446,"f":"In 2010 the people of Houston elected Annise Parker to be mayor.","r":"In 2010 Annise Parker became mayor of Houston.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1455,"f":"After fighting with her boyfriend one cold January morning, she stormed out on him.","r":"After arguing with a friend one cold January morning, she stormed out.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1455,"f":"than they were when he was legally drunk.","r":"than they were when he was driving with full attention.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1475,"f":"A love of magic as a kid","r":"A love of clever tricks as a kid","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1556,"f":"science, and grammar, but he proved especially gifted at music. Louis became an accomplished pianist and organist. He even got a paid job as an organist, playing in a small church near the institute.","r":"science, and grammar.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1575,"f":"Rebecka chooses to steer clear of school dances because flashing lights can trigger a migraine.","r":"Rebecka chooses to steer clear of places with flashing lights because they can trigger a migraine.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1591,"f":"such as language, math, and music.","r":"such as language and math.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1591,"f":"Listen to music you enjoy. It relaxes the nerves. Now experts say it also may increase your math abilities. Researchers recently found that second-graders who received piano lessons did better on a math test than kids who didn't get music lessons. ","r":"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1597,"f":"to bake a chocolate cake for a birthday party.","r":"to bake a chocolate cake for a family party.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1597,"f":"The birthday party begins","r":"The party begins","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1597,"f":"dress her up like a clown for Halloween?","r":"dress her up like a clown for a family party?","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1605,"f":" Vote in elections once 18 years of age.","r":"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":811,"f":"Sergei Bobunets, lead singer of a Russian rock band, had just stepped outside","r":"Sergei Bobunets, who lives in the city, had just stepped outside","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":811,"f":"The singer's words prove","r":"The witness's words prove","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":831,"f":"took her to a concert where people sang songs in different European languages, and she was impressed that he could translate all the songs for her.","r":"took her to an event where people spoke in different European languages, and she was impressed that he could translate everything for her.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1865,"f":"It is named after Artemis, the Greek goddess of hunting. ","r":"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":1297,"f":"“Something tells me it’s all happening at the zoo ” was the opening line of the 1960s pop song “At the Zoo.” In fact, a great deal","r":"A great deal","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}}
]$spec$::jsonb;
  e jsonb; l bigint; f text; r text; qz bigint[];
  c int[]; x int[];
  v_applied int := 0; v_skipped int := 0; v_rows int := 0;
begin
  -- لا يُعدَّل سؤالٌ أجاب عنه طالب
  if exists (select 1 from answers a join questions q on q.id = a.question_id join items i on i.quiz_id = q.quiz_id
              where i.lesson_id in (select (s->>'l')::bigint from jsonb_array_elements(spec) s)) then
    raise exception 'في هذه الكتب إجاباتٌ مسجَّلة — لا يُعدَّل شيء';
  end if;

  for e in select * from jsonb_array_elements(spec) loop
    l := (e->>'l')::bigint; f := e->>'f'; r := e->>'r';
    x := array[(e#>>'{n,items}')::int, (e#>>'{n,passages}')::int, (e#>>'{n,questions}')::int,
               (e#>>'{n,options}')::int, (e#>>'{n,keys}')::int, (e#>>'{n,cards}')::int];
    select coalesce(array_agg(distinct quiz_id), '{}') into qz from items where lesson_id = l and quiz_id is not null;
    c := array[
      (select count(*) from items     where lesson_id = l and position(f in body) > 0),
      (select count(*) from passages  where quiz_id = any(qz) and position(f in body) > 0),
      (select count(*) from questions where quiz_id = any(qz) and position(f in body) > 0),
      (select count(*) from options   where question_id in (select id from questions where quiz_id = any(qz)) and position(f in body) > 0),
      (select count(*) from question_keys where question_id in (select id from questions where quiz_id = any(qz)) and position(f in explanation) > 0),
      (select count(*) from cards     where id in (select card_id from card_lessons where lesson_id = l) and position(f in note) > 0)]::int[];
    if c = array[0,0,0,0,0,0] then
      v_skipped := v_skipped + 1; continue;           -- عُدِّل من قبل
    end if;
    if c <> x then
      raise exception 'الكتاب % · «%»: وُجد % لا % — لا يُعدَّل شيء', l, left(f, 50), c, x;
    end if;
    update items     set body = replace(body, f, r) where lesson_id = l and position(f in body) > 0;
    update passages  set body = replace(body, f, r) where quiz_id = any(qz) and position(f in body) > 0;
    update questions set body = replace(body, f, r) where quiz_id = any(qz) and position(f in body) > 0;
    update options   set body = replace(body, f, r) where question_id in (select id from questions where quiz_id = any(qz)) and position(f in body) > 0;
    update question_keys set explanation = replace(explanation, f, r) where question_id in (select id from questions where quiz_id = any(qz)) and position(f in explanation) > 0;
    update cards     set note = replace(note, f, r) where id in (select card_id from card_lessons where lesson_id = l) and position(f in note) > 0;
    v_applied := v_applied + 1;
    v_rows := v_rows + c[1] + c[2] + c[3] + c[4] + c[5] + c[6];
  end loop;
  perform set_config('c3.edits', v_applied || ' applied · ' || v_skipped || ' skipped · ' || v_rows || ' rows', true);
end $$;

-- السؤال 20133 (African Wormwood): كان جوابُه الجملةَ المحذوفة — يُعاد بناؤه على الجملة التي تليها
do $$
declare v_q int := 0; v_c int := 0;
begin
  if exists (select 1 from options where id = 672218 and question_id = 20133) then
    if exists (select 1 from answers where question_id = 20133)
       or not exists (select 1 from options where id = 672219 and question_id = 20133 and body like '“Afra” means%')
       or not exists (select 1 from question_keys where question_id = 20133 and correct_id = 672218) then
      raise exception 'السؤال 20133 ليس على ما قيس — لا يُعدَّل شيء';
    end if;
    update questions set body = 'Find the sentence that tells what the word “afra” means.' where id = 20133;
    update question_keys set correct_id = 672219,
           explanation = 'الجواب مكتوب في النص بكلماته: «“Afra” means “from Africa” in Latin.»'
     where question_id = 20133;
    delete from options where id = 672218;
    v_q := 1;
  end if;
  -- بطاقةُ «hunting»: خرجت كلمتُها من نصّ 1865
  if exists (select 1 from cards where id = 13644 and front like 'hunting%')
     and not exists (select 1 from card_lessons where card_id = 13644 and lesson_id <> 1865)
     and not exists (select 1 from card_reviews where card_id = 13644)
     and not exists (select 1 from questions where card_id = 13644)
     and not exists (select 1 from items where lesson_id = 1865 and body ~* 'hunting') then
    delete from cards where id = 13644;
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.extra', 'question ' || v_q || ' · card ' || v_c, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('235', 'تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الثانية: ٣٧ كتاباً في M4 وكتابٌ في M3، جملةٌ أو كلمة', now())
on conflict (n) do update set applied_at = now();
