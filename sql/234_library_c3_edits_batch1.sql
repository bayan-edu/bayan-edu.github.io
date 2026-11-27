-- ══════════════════════════════════════════════════════════
-- 234 · تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الأولى: ٢٥ كتاباً في M3، جملةٌ أو كلمة (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **طلبُ المالك (٢٦ نوفمبر):** «نفذ التعديلات» — ما اعتُمد في مراجعة الكتب على السياسة القيميّة
--      (`content-policy.md` · أحكامُ §٨ في اليوم نفسه). والتعديلُ هنا استبدالُ عبارةٍ بعبارة، لا إعادةُ كتابة.
--   ② **أين يسكن النصّ:** الجملةُ الواحدة مكرَّرةٌ في خمسة مواضع — نصُّ الكتاب (`items.body`) · مقطعُ الاختبار (`passages.body`) ·
--      خياراتُ أسئلة «أشِر إلى الجملة» (`options.body`) · شرحُ المفتاح (`question_keys.explanation`) · مثالُ البطاقة (`cards.note`).
--      فيُستبدل في كلّها معاً، وإلّا خالف الخيارُ نصَّه.
--      🔑 **ومقطعُ الاختبار ليس نسخةً من نصّ الكتاب دائماً:** في بعض الكتب نُظِّف `items.body` من قبل وبقي `passages.body` على أصله
--      (2554: «heading toward 102» في الكتاب و«her 102nd birthday» في المقطع). فبعضُ الأزواج تصيب المقطعَ وحده.
--   ③ **الحارس:** لكلّ زوجٍ عددُ الصفوف التي تحويه في كلّ جدول، **مقيساً على القاعدة الحيّة قبل الكتابة**.
--      صفرٌ في الجداول كلِّها ⇐ عُدِّل من قبل، يُتخطّى. عددٌ مخالف ⇐ استثناء، ولا يُعدَّل شيء. ولا يُعدَّل كتابٌ فيه إجابةُ طالب.
--   ④ **ما لم يدخل هذه الدفعة** من تعديلات M3: 1865 (سؤالُه يسأل عن الجملة المحذوفة) · 2230 و2349 و2536 (التعديلُ فيها خيطٌ لا جملة).
--   ⑤ **وبطاقةٌ واحدةٌ تُحذف:** 18792 «protesters» — كلمتُها خرجت من نصّ 2550 بالتعديل، ولا كتابَ آخر لها.
--   ⑥ **قابلٌ لإعادة التشغيل:** الزوجُ المطبَّق لا يُوجد نصُّه القديم، فيُتخطّى.
-- ══════════════════════════════════════════════════════════

do $$
declare
  spec constant jsonb := $spec$[
{"l":2285,"f":"The book is about a pet dog.","r":"The book is about a pet cat.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":1734,"f":"a hundred homes, a church, and a store","r":"a hundred homes and a store","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":1,"cards":0}},
{"l":1744,"f":"only the top of a church was visible","r":"only the top of a tall building was visible","n":{"items":1,"passages":1,"questions":0,"options":3,"keys":0,"cards":0}},
{"l":1760,"f":"taken from the back of a hog's neck","r":"taken from the back of an animal's neck","n":{"items":1,"passages":1,"questions":0,"options":3,"keys":0,"cards":0}},
{"l":1760,"f":"Boar bristles were used until 1938","r":"Animal bristles were used until 1938","n":{"items":1,"passages":1,"questions":0,"options":4,"keys":1,"cards":0}},
{"l":1793,"f":"white-tailed deer and wild hogs but will also eat","r":"white-tailed deer but will also eat","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":1911,"f":"harvesting of agaves for the production of liquor,","r":"harvesting of agaves,","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":1,"cards":2}},
{"l":1965,"f":"used electricity for magic tricks by creating","r":"used electricity for amusing tricks by creating","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":1982,"f":"she sees a ghost in a long white coat","r":"she dreams of a giant mosquito in a long white coat","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2000,"f":"like Pokemon Go or Harry Potter: Wizarding World use AR","r":"like Pokemon Go use AR","n":{"items":1,"passages":1,"questions":0,"options":4,"keys":0,"cards":0}},
{"l":2097,"f":"I will wear this beautiful new dress to parties.","r":"I will wear this beautiful new dress to the market.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2097,"f":"Then all the best young men will ask me to marry them.","r":"Then everyone will say how well I have done.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2097,"f":"But I will refuse all the men and just enjoy the parties.","r":"But I will just hold my head high and walk on.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2335,"f":"so the robot could beat the drum, move, and look","r":"so the robot could move and look","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2335,"f":"“Pop singers come and go, but the laws of physics never change,” he jokes.","r":"“The laws of physics never change,” he says.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2395,"f":"Meats such as ham, sausage, and lunch meats contain","r":"Meats such as sausage and lunch meats contain","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2400,"f":"and your dog – and other people’s dogs – can tell the difference","r":"and a dog can tell the difference","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2400,"f":"Pets come to associate the scent of their owners with home and safety,","r":"Working dogs come to associate the scent of their handlers with safety,","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2400,"f":"dogs can tell how their owners are feeling","r":"dogs can tell how their handlers are feeling","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2400,"f":"and that’s how your dog knows it’s you when you come home after school","r":"and that’s how a guard dog knows its handler from a stranger","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2448,"f":"one long-ago Holi","r":"one long-ago day","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2464,"f":"We like to play hockey, sing in the shower and read scary stories!","r":"We like to play hockey, tell jokes and read scary stories!","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2548,"f":"browse the internet, listen to music, watch movies,","r":"browse the internet, watch movies,","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2548,"f":"was almost completely deaf, but she learnt to play the piano.","r":"was almost completely deaf.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2550,"f":"in response to the continuing cries of protesters and demonstrators,","r":"in response to continuing public concern,","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":1}},
{"l":2554,"f":"some credit a daily cocktail,","r":"some credit a daily nap,","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2554,"f":"credit chocolate or a daily cocktail","r":"credit chocolate or a daily nap","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2554,"f":"heading toward her 102nd birthday","r":"almost 102 years old","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2554,"f":"will live to celebrate their 100th birthdays","r":"will live to be 100","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":2554,"f":"when you think of planning a 100th-birthday party?","r":"when you think of someone reaching the age of 100?","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2569,"f":"It was like being inside a magician’s box after he has stabbed it with a dozen swords.","r":"It was like being inside a box pierced from every side by a dozen giant spears.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2661,"f":"from a town’s inn to its local pub","r":"from a town’s inn to its local shop","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2665,"f":"They make pig-like grunts when attacking.","r":"They make loud grunts when attacking.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2665,"f":"pandikokku, which translates to 'pig-rat'.","r":"pandikokku.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2676,"f":"During the Mysuru Dasara celebrations,","r":"During an official ceremony in Mysuru,","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2683,"f":"As she sang, her hands flew","r":"As she worked, her hands flew","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2683,"f":"Yippee!” danced Ganith.","r":"Yippee!” cheered Ganith.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2685,"f":"as in an opera, play, or rock concert","r":"as in a play","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2685,"f":"a star in his high school musical productions","r":"a star on his high school stage","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2685,"f":"Actress and singer Cher","r":"Actress Cher","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":1}},
{"l":2685,"f":"Music smart: Good at patterns, tempos, rhythms, and sounds. You are probably good at singing or playing a musical instrument. ","r":"","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2685,"f":"in sports, dancing, martial arts, etc.","r":"in sports, martial arts, etc.","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2139,"f":"American Folk Tales Davy Crockett The True Story of Pocahontas Great Expectations Rip Van Winkle and The Legend The Happy Prince and The Selfish The American West The Adventures of Tom Sawyer The Wonderful Wizard of Oz The Secret of the Stones The Wind in the WillowS The Black Arrow Around the World in Eighty Days Little Women Beuty and the Beast Halloween Horror Black Beauty 9 787561 765975 \\>","r":"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}}
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

-- بطاقةُ «protesters»: خرجت كلمتُها من نصّ 2550 — تُحذف إن لم يكن لها كتابٌ آخر ولم يراجعها طالب
do $$
declare v_n int := 0;
begin
  if exists (select 1 from cards where id = 18792 and front like 'protesters%')
     and not exists (select 1 from card_lessons where card_id = 18792 and lesson_id <> 2550)
     and not exists (select 1 from card_reviews where card_id = 18792)
     and not exists (select 1 from questions where card_id = 18792)
     and not exists (select 1 from items where lesson_id = 2550 and body ~* 'protester') then
    delete from cards where id = 18792;
    get diagnostics v_n = row_count;
  end if;
  perform set_config('c3.extra', 'card ' || v_n, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('234', 'تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الأولى: ٢٥ كتاباً في M3، جملةٌ أو كلمة', now())
on conflict (n) do update set applied_at = now();
