-- ══════════════════════════════════════════════════════════
-- 236 · تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الثالثة: تغييرُ جنس شخصيّةٍ في ستّة كتب (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر · `content-policy.md` §٨ · G5b وG5c):** صداقةُ فتًى وفتاةٍ في وقت الفراغ تستبعد النصّ (§٥٫٣)،
--      لكنْ في القصّة المفردة — حيث لا أثرَ لجنس الشخصيّة في الحبكة — **تُغيَّر الشخصيّةُ ولا يُحذف الكتاب**.
--   ② **الكتبُ الستّة وما يتغيّر:**
--      2444 A Stitch in Time: Shrisha ← Shreyas (فتًى) · 2158 Alien at School: Jennifer ← Jason ·
--      2455 The Astronomical Mystery Solvers: Emily وOlivia وRuth ← Ethan وOliver وRyan ·
--      2488 There's a Hole in my Galaxy: الأخُ Reyhaan ← الأختُ Rehana · 2296 Gyalmo: المستكشفةُ Koyna ← Kabir (رجل) ·
--      2637 A Helping Hand: الزميلةُ الجديدة ← زميلٌ جديد.
--   ③ **الاسمُ أوّلاً ثمّ الضمائر:** يُستبدل الاسمُ في كلّ موضع، ثمّ كلُّ جملةٍ ضميرُها يعود على تلك الشخصيّة — بنصّها لا بقاعدة،
--      فـ«she» في 2444 التي تفحص المكواة هي Anupama Aunty وتبقى، و«she» في 2296 أكثرُها للنمرة Gyalmo وتبقى.
--   ④ **وفي 2637 اكتشافٌ:** الرسائلُ لا تذكر جنسَ كاتبها، وأسئلةُ الاختبار سمّته «she». فمع جعل الزميل فتًى يصير الكاتبُ «he» في الأسئلة،
--      ليكون الاثنان فتيين. نصُّ الرسائل لا يتغيّر فيه إلّا جملةٌ واحدة.
--   ⑤ **الآليّةُ آليّةُ `234`:** كلُّ زوجٍ بعدده المقيس على القاعدة الحيّة في كلّ جدول، وعددٌ مخالف ⇐ لا يُعدَّل شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** الزوجُ المطبَّق لا يُوجد نصُّه القديم، فيُتخطّى.
-- ══════════════════════════════════════════════════════════

do $$
declare
  spec constant jsonb := $spec$[
{"l":2444,"f":"Shrisha","r":"Shreyas","n":{"items":1,"passages":1,"questions":1,"options":1,"keys":1,"cards":0}},
{"l":2444,"f":"“Let’s go cycling,” she says.","r":"“Let’s go cycling,” he says.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2444,"f":"She’s peering into the iron.","r":"He’s peering into the iron.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2158,"f":"Jennifer","r":"Jason","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2158,"f":"snapping a twig beneath her sneaker","r":"snapping a twig beneath his sneaker","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2158,"f":"stepped forward, her eyes wide with wonder","r":"stepped forward, his eyes wide with wonder","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2455,"f":"Emily","r":"Ethan","n":{"items":1,"passages":1,"questions":0,"options":3,"keys":1,"cards":0}},
{"l":2455,"f":"Olivia","r":"Oliver","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":2}},
{"l":2455,"f":"Ruth","r":"Ryan","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2488,"f":"Her brother Reyhaan tags along.","r":"Her sister Rehana tags along.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2488,"f":"Reyhaan","r":"Rehana","n":{"items":1,"passages":1,"questions":1,"options":5,"keys":1,"cards":2}},
{"l":2488,"f":"He and Maya realise","r":"She and Maya realise","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"There’s a girl in my class and she has a fake hand","r":"There’s a boy in my class and he has a fake hand","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"Does the narrator say the new girl does everything differently","r":"Does the narrator say the new boy does everything differently","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"blaming the new girl for her own trouble with classmates","r":"blaming the new boy for his own trouble with classmates","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"has stopped being the main thing she thinks about","r":"has stopped being the main thing he thinks about","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"the narrator's feelings toward the new girl change","r":"the narrator's feelings toward the new boy change","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2637,"f":"she is honest about her early anger and her later apology","r":"he is honest about his early anger and his later apology","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2637,"f":"what the new girl herself feels or thinks","r":"what the new boy himself feels or thinks","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":2637,"f":"sends every letter to the new girl and never changes her mind about her","r":"sends every letter to the new boy and never changes his mind about him","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2296,"f":"Koyna","r":"Kabir","n":{"items":1,"passages":1,"questions":2,"options":2,"keys":0,"cards":1}},
{"l":2296,"f":"Peering through her binoculars, Kabir was sure she was looking","r":"Peering through his binoculars, Kabir was sure he was looking","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2296,"f":"“That’s a rock!” her friend Lobzang","r":"“That’s a rock!” his friend Lobzang","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2296,"f":"Kabir and her friend spotted","r":"Kabir and his friend spotted","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2296,"f":"Shivering in the cold, she carefully scanned the cliffs, binoculars pressed to her eyes.","r":"Shivering in the cold, he carefully scanned the cliffs, binoculars pressed to his eyes.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2296,"f":"With a jolt, she thought she saw the swish of a tail.","r":"With a jolt, he thought he saw the swish of a tail.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2296,"f":"Even though she waited and waited for hours, she saw nothing but snow and rocks.","r":"Even though he waited and waited for hours, he saw nothing but snow and rocks.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":2296,"f":"She went away, half frozen,","r":"He went away, half frozen,","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}}
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

insert into public.sql_log (n, title, applied_at)
values ('236', 'تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الثالثة: تغييرُ جنس شخصيّةٍ في ستّة كتب', now())
on conflict (n) do update set applied_at = now();
