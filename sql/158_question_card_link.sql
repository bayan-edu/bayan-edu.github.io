-- ══════════════════════════════════════════════════════════════════════
--  بيان — 158_question_card_link.sql  ·  السؤالُ يُحيل إلى بطاقته
-- ══════════════════════════════════════════════════════════════════════
--
--  🔑 ما يُغلقه هذا الملفّ: مدخلُ التشخيص في `due_cards` مبنيٌّ منذ
--  الملفّ `100` — «أخفق في سؤالٍ مربوطٍ ببطاقة ⇒ تتصدّر طابورَه ومعها
--  سببُ تقديمها». والعمودُ `questions.card_id` موجودٌ وله فهرس،
--  **وصفرُ ربطٍ من ٢٤٥٢ سؤالاً حيّ.** ميزةٌ كاملةٌ تنتظر بيداً تصلها.
--
--  ⏱️ ولماذا بعد `157` لا قبله: قائمةُ «مصطلحاتِ درس هذا الاختبار»
--     تقرأ من حيث تسكن العلاقة. وقبل `card_lessons` كان الدرسُ على
--     المجموعة، فالقائمةُ تُبنى على شيءٍ ذاهب.
--
--  ┌─────────── ثوابتُ هذا الملفّ ───────────┐
--  │                                                                  │
--  │  ①  🔴 **ولا يُربط إلا ما كان خطؤه نقصَ معرفة.** المشتّتُ الذي   │
--  │     يُخلط فيه مصطلحٌ بمصطلح يُربط. أمّا «طبّق القانونَ مقلوباً»  │
--  │     فعلاجُه مثالٌ محلول — **وبطاقةٌ هناك تُعلّم الطالبَ جملةً    │
--  │     يردّدها بلا فهم**، وتكذب على dx_code بأن تُظهر علاجاً وقع    │
--  │     وهو لم يقع. والحارسُ هنا **في الشاشة لا في القاعدة**:        │
--  │     قرارٌ تربويٌّ لا يُقاس بـSQL، ويُكتب حيث يقع الفعل.           │
--  │                                                                  │
--  │  ②  السؤالُ يُربط ببطاقةٍ **واحدة** (العمود واحد)، والبطاقةُ     │
--  │     بأسئلةٍ كثيرة. وسؤالٌ يحتاج بطاقتين يقيس شيئين.               │
--  │                                                                  │
--  │  ③  والاقتراحُ يُحسب **في القاعدة لا في المتصفّح**: `card_key`   │
--  │     تُسقط التشكيلَ وصورَ الألف، ونسخةٌ ثانيةٌ منها في JavaScript │
--  │     تفترق عن أصلها يومَ يُعدَّل أحدُهما (ثابت ⑨).                │
--  │                                                                  │
--  │  ④  🔒 و`quiz_for_edit` **لا تُمسّ**. إضافةُ حقلٍ إليها تعني     │
--  │     إعادةَ كتابة دالّةٍ لها سابقةٌ موجعة (٥ سبتمبر: استُبدلت     │
--  │     بنسخةٍ أقدم فسقط نمطُ gap والإعدادات). ونداءٌ شقيقٌ صغير     │
--  │     أرخصُ من ذلك وأصدق.                                          │
--  │                                                                  │
--  │  ⑤  ولا كتابةَ إلا بدالّة (ثابت ⑥).                             │
--  │                                                                  │
--  └──────────────────────────────────────────────────────────────────┘
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ─── ① الربط ─────────────────────────────────────────────────────────
--
--  📌 مولودة. ولا تُفتح `save_question` (عشرون معاملاً): فتحُ دالّةٍ
--     بهذا الحجم لإضافة معاملٍ مخاطرةٌ تفوق نفعها — وهي سابقةُ
--     `question_count` نفسُها: «يُصلَح حين تُمسّ لسببٍ آخر».
--
--  🔑 و`p_card` فارغٌ **يفكّ الربط**: فعلان في دالّة لأنّ المقابل
--     لهما زرٌّ واحدٌ يُبدّل حاله — لا زرّان.

create or replace function public.link_question_card(
  p_question bigint,
  p_card     bigint default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_subject bigint; v_card_subject bigint; v_front text;
begin
  select z.subject_id into v_subject
    from questions q join quizzes z on z.id = q.quiz_id
   where q.id = p_question;
  if v_subject is null then raise exception 'سؤالٌ غير موجود'; end if;
  if not can_curate(v_subject) then
    raise exception 'لا صلاحيةَ لك على هذه المادة';
  end if;

  if p_card is not null then
    --  ⚠️ والبطاقةُ من مادّة السؤال: وصلٌ عابرٌ للمواد يُدخلها طابورَ
    --     مادّةٍ أخرى فيُكسر «لا يُخلط بين المواد» (98 · ثابت ④).
    select d.subject_id, c.front into v_card_subject, v_front
      from cards c join decks d on d.id = c.deck_id where c.id = p_card;
    if v_card_subject is null then raise exception 'بطاقةٌ غير موجودة'; end if;
    if v_card_subject <> v_subject then
      raise exception 'البطاقة من مادّةٍ أخرى';
    end if;
  end if;

  update questions set card_id = p_card where id = p_question;

  return jsonb_build_object(
    'question_id', p_question,
    'card_id',     p_card,
    'front',       v_front);        -- فارغٌ عند الفكّ — والشاشةُ تقرؤه
end $$;

comment on function public.link_question_card(bigint, bigint) is
  'يربط السؤالَ ببطاقة، وفارغاً يفكّ الربط. وبه يعمل مدخلُ التشخيص في due_cards (الملفّ 100). '
  'ولا تُفتح save_question لأجل معاملٍ واحد.';

grant execute on function public.link_question_card(bigint, bigint) to authenticated;


-- ─── ② حالةُ الربط في اختبارٍ كامل ───────────────────────────────────
--
--  نداءٌ واحدٌ مع فتح المحرّر، فيعرف كلُّ زرٍّ حالَه بلا نداءٍ لكلّ سؤال.
--  📌 مولودة — و`quiz_for_edit` تبقى كما هي (الثابت ④).

create or replace function public.quiz_card_links(p_quiz bigint)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'question_id', q.id, 'card_id', c.id, 'front', c.front)), '[]'::jsonb)
    from questions q
    join cards c on c.id = q.card_id
   where q.quiz_id = p_quiz
     and can_edit_quiz(p_quiz);
$$;

grant execute on function public.quiz_card_links(bigint) to authenticated;


-- ─── ③ المرشَّحات — بطاقاتُ درس هذا الاختبار ─────────────────────────
--
--  🔑 ولا تُعرض بطاقاتُ المادة كلِّها: الاختبارُ في درسٍ واحد (مقيس:
--     أكثرُ اختبارٍ انتشاراً في درسٍ واحد)، وقائمةٌ بمئاتِ المصطلحات
--     تُحوّل الربطَ من تأكيدٍ إلى بحث — **فيُترك.**
--
--  🔑 والاقتراحُ هو ما يجعل الميزة تطير: يُطابَق وجهُ البطاقة بنصّ
--     السؤال وخياراته بـ`card_key`، فتتصدّر المرشَّحةُ موسومةً
--     «ظهرت في السؤال». ⇒ عملُ المؤلّف **تأكيدٌ لا بحث**.
--
--  ⚠️ وثلاثةُ محارفَ حدٌّ أدنى للمطابقة: وجهٌ من حرفين يقع داخل كلّ
--     نصٍّ تقريباً، فيُوسَم كلُّ شيءٍ «ظهر» ويبطل معنى الوسم.
--
--  🔴 **وما بين قوسين يُسقَط قبل المطابقة** — وهذا ما كشفته التجربةُ
--     الجافّة: وجهُ البطاقة `crossroads (n)` والسؤالُ يقول
--     `crossroads`، فالمطابقةُ تردّ **صفراً من عشر** بطاقاتٍ كلُّها
--     من درس السؤال. وبإسقاطه **تقع اثنتان** هما مصطلحا السؤال
--     بعينهما. ⇒ **صفرٌ كان سيُقرأ «لا مرشَّح» وهو عطلٌ في المطابِق.**
--     📌 وهي القاعدةُ نفسُها التي يتبعها النطقُ في `ui.js · sayable`:
--        نوعُ الكلمة يُسقَط من **المعالجة** ويبقى في **المعروض**.
--     ⚠️ وإن لم يبقَ شيءٌ بعد الإسقاط فالأصلُ أولى من الصمت.
--
--  📌 و«ظهرت» تقول ما قيس لا ما حُكم به: السلسلةُ وردت، وليس أنّ هذه
--     هي البطاقةُ الصحيحة. والمؤلّفُ هو الذي يقرّر.

create or replace function public.question_cards(p_question bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_quiz bigint; v_lesson bigint; v_hay text; v_cur bigint; v jsonb;
begin
  select q.quiz_id, q.card_id into v_quiz, v_cur
    from questions q where q.id = p_question;
  if v_quiz is null then raise exception 'سؤالٌ غير موجود'; end if;
  if not can_edit_quiz(v_quiz) then raise exception 'لا صلاحية'; end if;

  --  درسُ الاختبار — من عنصرِ الدرس الذي يحمله
  select i.lesson_id into v_lesson
    from items i where i.kind = 'quiz' and i.quiz_id = v_quiz
   order by i.id limit 1;

  --  النصُّ الذي يُبحث فيه: متنُ السؤال وخياراتُه معاً، مطبَّعاً مرّةً
  select card_key(q.body || ' ' || coalesce(
           (select string_agg(o.body, ' ') from options o where o.question_id = q.id), ''))
    into v_hay
    from questions q where q.id = p_question;

  select coalesce(jsonb_agg(x order by (x->>'match')::bool desc,
                                       (x->>'position')::int, (x->>'id')::bigint), '[]'::jsonb)
    into v
    from (
      select jsonb_build_object(
               'id', c.id, 'front', c.front, 'back', c.back,
               'position', c.position,
               'current', c.id = v_cur,
               'match', length(t2.term) >= 3
                        and position(t2.term in coalesce(v_hay,'')) > 0,
               --  أسئلةٌ أخرى في هذا الاختبار تحيل إليها — خبرٌ لا منع:
               --  البطاقةُ تخدم أسئلةً كثيرة، والمؤلّفُ يحبّ أن يعرف.
               'used', (select count(*) from questions q2
                         where q2.quiz_id = v_quiz and q2.card_id = c.id
                           and q2.id <> p_question)
             ) as x
        from card_lessons cl
        join cards c on c.id = cl.card_id
        --  مصطلحُ المطابقة: ما بين قوسين يُسقَط، والأصلُ إن لم يبقَ شيء
        cross join lateral (select coalesce(
               nullif(card_key(regexp_replace(c.front, '\s*[([][^)\]]*[)\]]', '', 'g')), ''),
               card_key(c.front), '') as term) t2
       where cl.lesson_id = v_lesson
    ) t;

  return jsonb_build_object(
    'lesson_id', v_lesson,
    'lesson',    (select l.title from lessons l where l.id = v_lesson),
    'card_id',   v_cur,
    'cards',     v);
end $$;

comment on function public.question_cards(bigint) is
  'مرشَّحاتُ الربط: بطاقاتُ درس هذا الاختبار، والمطابِقُ بـcard_key يتصدّر موسوماً. '
  'و«ظهرت» تقول إنّ السلسلة وردت، لا إنّ هذه هي البطاقة الصحيحة — والقرارُ للمؤلّف.';

grant execute on function public.question_cards(bigint) to authenticated;


-- ─── ④ السجلّ ─────────────────────────────────────────────────────────

insert into public.sql_log (n, title, applied_at)
values ('158', 'السؤالُ يُحيل إلى بطاقته — ويعمل مدخلُ التشخيص في due_cards', now())
on conflict (n) do update set applied_at = now();

commit;


-- ══════════════════════════════════════════════════════════════════════
--  ⑤ الفحص — جملةٌ واحدة، وكلُّ بندٍ يقيس شيئاً واحداً (AGENTS §٣ ④)
-- ══════════════════════════════════════════════════════════════════════
/*
select '① الدوالّ الثلاث' as البند,
       (select count(*)::text from pg_proc where pronamespace='public'::regnamespace
         and proname in ('link_question_card','quiz_card_links','question_cards')) as المقيس,
       '3' as المنتظر
union all
select '② ومنحُها',
       (select count(*)::text from information_schema.role_routine_grants
         where specific_schema='public' and grantee='authenticated'
           and routine_name in ('link_question_card','quiz_card_links','question_cards')), '3'
union all
select '③ quiz_for_edit لم تُمسّ',
       (select to_char(max(applied_at),'YYYY-MM-DD') from sql_log where n in ('22','60')), 'قديم'
union all
select '④ والعمودُ وفهرسُه كما كانا',
       (select count(*)::text from pg_indexes where schemaname='public'
         and tablename='questions' and indexdef ilike '%card_id%'), '1';
*/


-- ══════════════════════════════════════════════════════════════════════
--  ⑥ تجربةٌ حيّة — بهويّة مؤلّف، وبلا كتابة
--
--  🔑 تُجرَّب على سؤالٍ من اختبارٍ **في درسٍ له بطاقات**، وإلّا عادت
--     القائمةُ فارغةً فبدا الفحصُ ناجحاً وهو لم يُجرَّب.
-- ══════════════════════════════════════════════════════════════════════
/*
begin;
select set_config('request.jwt.claims',
  json_build_object('sub', (select id from profiles where role in ('admin','teacher')
                             order by (role='admin') desc, created_at limit 1),
                    'role','authenticated')::text, true);

with q as (
  select qq.id
    from questions qq
    join items i on i.quiz_id = qq.quiz_id and i.kind = 'quiz'
   where exists (select 1 from card_lessons cl where cl.lesson_id = i.lesson_id)
     and qq.retired_at is null
   order by qq.id limit 1)
select '① اختُبر على سؤال' as البند, (select id::text from q) as المقيس, 'رقمُ سؤال' as المنتظر
union all
select '② ودرسُه',
       (select question_cards((select id from q))->>'lesson'), 'عنوانُ درس'
union all
select '③ وكم مرشَّحاً',
       (select jsonb_array_length(question_cards((select id from q))->'cards')::text),
       'أكبر من صفر — وإلّا فالفحصُ لا يشهد'
union all
select '④ وكم منها موسومٌ «ظهرت»',
       (select count(*)::text from jsonb_array_elements(
          question_cards((select id from q))->'cards') e where (e->>'match')::bool),
       'صفرٌ مقبول — والوسمُ يُرى بعينه'
union all
select '⑤ وأوّلُ ثلاثةٍ بترتيبها',
       (select string_agg((e->>'front') || case when (e->>'match')::bool then ' ✓' else '' end,
                 ' · ' order by ord)
          from jsonb_array_elements(question_cards((select id from q))->'cards')
               with ordinality t(e, ord) where ord <= 3),
       'الموسومُ أوّلاً';
rollback;
*/
