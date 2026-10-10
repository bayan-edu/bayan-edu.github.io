-- ══════════════════════════════════════════════════════════════════════
--  بيان — 157_card_lessons.sql  ·  الدرسُ صفةُ البطاقة لا صفةُ المجموعة
-- ══════════════════════════════════════════════════════════════════════
--
--  🔴 العطل المُصلَح — **نقضُ ثابتٍ مُعلَن، لا ميزةٌ ناقصة.**
--  الملفّ 98 · ثابت ② يقول: «الطالب لا يملك بطاقةً — بل يشترك فيها.
--  مَن أضاف كلمةً موجودةً، اشترك فيها ولم يكرّرها». وهو مطبَّقٌ في
--  مسار الطالب (add_my_card تبحث في المادة كلِّها قبل أن تُنشئ)،
--  **ومُهمَلٌ في مسار التأليف**: التفرّد `unique(deck_id, front_key)`
--  على **المجموعة** لا المادة. فالمصطلح في مجموعتَي درسين = صفّان
--  مستقلّان، باشتراكين وجدولتين منفصلتين، وإخفاقُ الطالب في أحدهما
--  لا يمسّ الآخر.
--
--  ⏱️ ولماذا اليوم: ٢٣ بطاقةً · طالبٌ واحد · **وصفرُ تصادمٍ** عند
--     الدمج (مقيس قبل الكتابة). وبعد فصلٍ دراسيّ يصير دمجُ المكرَّر
--     دمجَ **سجلَّي مراجعة** — أيّهما يُبقى؟ الأقدمُ يُفقد التقدّم،
--     والأحدثُ يكذب الاستقرار. **لا حلَّ صحيحاً له، فيُمنع قبل أن يقع.**
--
--  ┌─────────── ثوابتُ هذا الملفّ — تُقرأ ولا تُستنتج ───────────┐
--  │                                                              │
--  │  ①  البطاقة تُدخَل مرّةً وتظهر في عدّة دروس. ⇒ جدولُ وصلٍ    │
--  │     `card_lessons`، ولا عمودَ درسٍ على البطاقة.              │
--  │                                                              │
--  │  ②  والمجموعةُ الرسميّة **واحدةٌ لكلّ (مادة · صفّ)**. وبها    │
--  │     يصير `unique(deck_id, front_key)` **القائمُ منذ 98**     │
--  │     حارسَ التفرّد على مستوى المادة — بلا عمودٍ منزَّل ولا     │
--  │     مُشغِّل ولا تكرارِ منطق (ثابت ⑨: ما يُشتقّ لا يُخزَّن).   │
--  │     🔑 وهذا إتمامٌ لا نقض: تعليقُ `decks.lesson_id` يقول منذ  │
--  │        98 «أوّلُ ظهور · فارغ = مجموعةٌ على مستوى المادة       │
--  │        والصفّ» — فالبنيةُ كانت تنتظر هذا.                    │
--  │                                                              │
--  │  ③  🔴 والرؤيةُ تنتقل إلى **البطاقة**. ولولا ذلك لسقط شرطُ    │
--  │     الدرس صامتاً: `can_see_deck` اليوم تُحكّم الدرسَ حين      │
--  │     يحمله الصفّ، فتفريغُ `decks.lesson_id` يُبقي **شرطَ      │
--  │     الصفّ وحده** ⇒ بطاقاتُ درسٍ مقفلٍ تُرى. توسيعُ رؤيةٍ      │
--  │     لا يشتكي منه أحد. ⇒ `can_see_card` هي بوّابةُ `cards`.   │
--  │     وهي **أدقُّ** من اليوم لا تعويضٌ عنه: كان الدرسُ واحداً   │
--  │     لكلّ المجموعة، وصار لكلّ بطاقةٍ دروسُها.                  │
--  │                                                              │
--  │  ④  و`due_cards` تُعدَّل **في هذا الملفّ لا بعده**: مدخلُ     │
--  │     «درسٌ فُتح» يشترط `d.lesson_id is not null`، فتفريغُ      │
--  │     العمود يُعطّل البابَ كلَّه. شرطُ بقاءٍ لا تحسين.           │
--  │                                                              │
--  │  ⑤  ولا كتابةَ إلا بدالّة (ثابت ⑥). سياساتُ الجدول الجديد    │
--  │     `select` وحدها، ومنحُه `select` وحده.                    │
--  │                                                              │
--  └──────────────────────────────────────────────────────────────┘
--
--  ما ليس فيه عمداً:
--      • ربطُ السؤال بالبطاقة (`questions.card_id` قائمٌ وصفرُ ربط)
--        — يُبنى **فوق** هذا الملفّ لا تحته، لأنّ قائمة «بطاقاتِ درس
--        هذا الاختبار» تقرأ من حيث تسكن العلاقة.
--      • إسقاطُ `decks.lesson_id` — يُفرَّغ ويُعلَن متقاعداً هنا،
--        ويُسقَط في ملفٍّ لاحق بإذنٍ صريح (AGENTS §٦).
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ─── ⓪ الحارس — يقف قبل أن يُكسَر شيء ────────────────────────────────
--
--  🔑 الدمجُ ينقل بطاقاتِ المجموعات المكرَّرة إلى الباقية، و**وجهان
--     متطابقان** يصطدمان بـ`unique(deck_id, front_key)` فتسقط الهجرة
--     في منتصفها. ومقيسٌ قبل الكتابة: صفر. لكنّ الملفّ يُعاد تشغيله
--     يوماً على قاعدةٍ أخرى — **فيُقاس عند التشغيل لا عند الكتابة.**
--
--  وينتهي برسالةٍ تقول ماذا يفعل القارئ، لا برمز قيدٍ لا يعنيه.

do $$
declare v_clash int; v_list text;
begin
  with keep as (
    select subject_id, coalesce(level_id, 0) as lv, min(id) as keep_id
      from decks where owner_id is null
     group by subject_id, coalesce(level_id, 0))
  select count(*), string_agg(distinct t.front_key, ' · ')
    into v_clash, v_list
    from (select c.front_key, k.keep_id
            from cards c
            join decks d on d.id = c.deck_id
            join keep  k on k.subject_id = d.subject_id
                        and k.lv = coalesce(d.level_id, 0)
           where d.owner_id is null
           group by c.front_key, k.keep_id
          having count(*) > 1) t;

  if v_clash > 0 then
    raise exception
      'لا يمكن الدمج: % وجهاً مكرَّراً في مجموعتين من المادة والصفّ نفسِهما (%). وحّدها بيدٍ أوّلاً — فالدمجُ الآليّ يختار نسخةً ويُهمل جدولةَ الأخرى.',
      v_clash, left(v_list, 300);
  end if;
end $$;


-- ─── ① جدولُ الوصل ────────────────────────────────────────────────────
--
--  ولا عمودَ `position`: ترتيبُ البطاقة في مجموعتها واحدٌ لا يتغيّر
--  بتغيّر الدرس الذي تُعرض فيه. وعمودٌ لا يُقرأ يبلى صامتاً.

create table if not exists public.card_lessons (
  card_id    bigint not null references public.cards(id)   on delete cascade,
  lesson_id  bigint not null references public.lessons(id) on delete cascade,
  created_by uuid            references public.profiles(id),
  created_at timestamptz not null default now(),
  primary key (card_id, lesson_id)
);

comment on table public.card_lessons is
  'أين تظهر البطاقة. البطاقة تُدخَل مرّةً وتُوصَل بعدّة دروس — وهذا موضعُ العلاقة الوحيد. '
  'و decks.lesson_id متقاعدٌ ولا يُقرأ (الملفّ 157).';

--  المفتاح الأساس يخدم «دروسُ هذه البطاقة»، وهذا يخدم عكسَها:
--  «بطاقاتُ هذا الدرس» — وهي قراءةُ `due_cards` وقائمةِ الربط.
create index if not exists idx_card_lessons_lesson
  on public.card_lessons (lesson_id);


-- ─── ② التعبئة الرجعيّة — قبل أن يُفرَّغ المصدر ──────────────────────

insert into public.card_lessons (card_id, lesson_id)
select c.id, d.lesson_id
  from public.cards c
  join public.decks d on d.id = c.deck_id
 where d.lesson_id is not null
on conflict do nothing;


-- ─── ③ دمجُ المجموعات الرسميّة — واحدةٌ لكلّ (مادة · صفّ) ────────────
--
--  🔒 ومجموعاتُ الطلاب لا تُمسّ: قيدُ `decks_owner_one` يحرسها منذ 98،
--     والبطاقةُ التي كتبها طالبٌ بنفسه ملكُه — تُترك حيث هي.

with keep as (
  select subject_id, coalesce(level_id, 0) as lv, min(id) as keep_id
    from public.decks where owner_id is null
   group by subject_id, coalesce(level_id, 0))
update public.cards c
   set deck_id = k.keep_id
  from public.decks d
  join keep k on k.subject_id = d.subject_id and k.lv = coalesce(d.level_id, 0)
 where c.deck_id = d.id and d.owner_id is null and d.id <> k.keep_id;

--  وما فرغ يُحذف: وجودُه يمنع القيدَ أدناه، ولا محتوى فيه بعد النقل.
with keep as (
  select subject_id, coalesce(level_id, 0) as lv, min(id) as keep_id
    from public.decks where owner_id is null
   group by subject_id, coalesce(level_id, 0))
delete from public.decks d
 using keep k
 where k.subject_id = d.subject_id and k.lv = coalesce(d.level_id, 0)
   and d.owner_id is null and d.id <> k.keep_id;

--  🔑 والقيدُ هو الحارس. وبه يصير `cards_deck_key` القائمُ منذ 98
--     تفرّداً على مستوى المادة والصفّ — بلا عمودٍ جديد.
create unique index if not exists decks_official_one
  on public.decks (subject_id, coalesce(level_id, 0))
  where owner_id is null;


-- ─── ④ تقاعدُ decks.lesson_id ────────────────────────────────────────
--
--  ⚠️ يُفرَّغ **بعد** التعبئة الرجعيّة (②) لا قبلها.
--  ولا يُسقَط هنا: `save_deck` تحمله في توقيعها، وإسقاطُ عمودٍ على
--  قاعدةٍ حيّة يحتاج إذناً صريحاً (AGENTS §٦). يُسقَط في ملفٍّ لاحق.

update public.decks set lesson_id = null where lesson_id is not null;

comment on column public.decks.lesson_id is
  '⛔ متقاعد — لا يُقرأ في أيّ موضع. الدرسُ صار على البطاقة في card_lessons (الملفّ 157). '
  'السبب: المجموعةُ صارت واحدةً لكلّ (مادة · صفّ) ليحرس cards_deck_key التفرّدَ على مستوى المادة، '
  'ولا يصحّ لها درسٌ واحد. ⇒ يُسقَط العمودُ في ملفٍّ لاحق بإذنٍ صريح، ومعه p_lesson من save_deck.';


-- ─── ⑤ البوّابة — تنتقل إلى البطاقة ──────────────────────────────────
--
--  📌 مولودةٌ لا معدَّلة.
--
--  والمنطق كمنطق `can_see_deck` حرفاً، والفرقُ موضعُ الدرس:
--      لها دروسٌ  ⇒ يكفي **درسٌ واحدٌ متاح** (فظهورُها في درسٍ مفتوح
--                   يُتيحها، ولو كانت أيضاً في درسٍ لم يُبلَغ بعد)
--      بلا دروس   ⇒ شرطُ الصفّ، كمجموعةٍ بلا درسٍ اليوم

create or replace function public.can_see_card(p_card bigint)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1
      from cards c
      join decks d on d.id = c.deck_id
     where c.id = p_card
       and (
            d.owner_id = auth.uid()                       -- بطاقةٌ في مجموعتي
         or can_curate(d.subject_id)                      -- المؤلّف يرى مسوّدته
         or (d.owner_id is null and case
               when exists (select 1 from card_lessons cl where cl.card_id = c.id)
                    then exists (select 1 from card_lessons cl
                                  where cl.card_id = c.id
                                    and can_access_lesson(cl.lesson_id))
               else d.level_id is null or can_view_level(d.level_id)
             end)
       ));
$$;

comment on function public.can_see_card(bigint) is
  'بوّابةُ البطاقة. تُنادى من سياسة cards ومن القرّاء، فلا يفترق الحُكمان. '
  'ومعاملٌ واحدٌ لا اثنان: can_curate تسأل auth.uid() داخلها (نفسُ حجّة can_see_deck).';

grant execute on function public.can_see_card(bigint) to authenticated;


drop policy if exists p_cards_read on public.cards;
create policy p_cards_read on public.cards for select to authenticated
  using (public.can_see_card(id));


alter table public.card_lessons enable row level security;

drop policy if exists p_card_lessons_read on public.card_lessons;
create policy p_card_lessons_read on public.card_lessons for select to authenticated
  using (public.can_see_card(card_id));

--  🔴 والمنحُ صريحٌ (عطل STATE ⑦): ما يبقى على صلاحيات Supabase
--     الافتراضية يُعطي authenticated الجدولَ كلَّه. ولا منحَ كتابةٍ —
--     الكتابةُ في دوالّ security definer أدناه.
revoke all on public.card_lessons from public, anon;
grant  select on public.card_lessons to authenticated;


-- ─── ⑥ can_see_deck — معدَّلة لا منشأة ───────────────────────────────
--
--  📌 أصلُها الملفّ 98. وفرعُ الدرس يسقط منها: المجموعةُ صارت حاويةً
--     على مستوى المادة والصفّ، والدرسُ على بطاقاتها. والحاويةُ تُرى
--     بشرط الصفّ، وما فيها يُحرَس بطاقةً بطاقة.

create or replace function public.can_see_deck(p_deck bigint)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from decks d
     where d.id = p_deck
       and (
            d.owner_id = auth.uid()                      -- مجموعتي
         or can_curate(d.subject_id)                     -- المؤلّف يرى مسوّدته
         or (d.owner_id is null
             and (d.level_id is null or can_view_level(d.level_id)))
       ));
$$;

comment on function public.can_see_deck(bigint) is
  'بوّابةُ المجموعة — الحاوية وحدها. وما فيها يُحرَس ببوّابة can_see_card (الملفّ 157).';


-- ─── ⑦ الكتابة — ربطُ البطاقة بدروسها ────────────────────────────────
--
--  🔑 ودالّتان لا واحدة، لأنّ الفعلين مختلفان:
--      set_card_lessons   — دروسُ بطاقةٍ واحدة، تُستبدل كاملةً (تحرير)
--      link_cards_lesson  — درسٌ واحد يُوضع على دفعةٍ أو يُرفع (لصق)
--     ودالّةٌ واحدةٌ تخدمهما تحتاج معاملَ وضعٍ يُقرأ خطأً عند النداء.

create or replace function public.set_card_lessons(p_card bigint, p_lessons bigint[])
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_subject bigint; v_mine bool; v_bad int;
begin
  select d.subject_id, coalesce(d.owner_id = auth.uid(), false)
    into v_subject, v_mine
    from cards c join decks d on d.id = c.deck_id where c.id = p_card;
  if v_subject is null then raise exception 'بطاقةٌ غير موجودة'; end if;
  if not v_mine and not can_curate(v_subject) then
    raise exception 'لا صلاحيةَ لك على هذه البطاقة';
  end if;

  --  🔑 والدرسُ من مادّة البطاقة: وصلٌ عابرٌ للمواد يُدخلها طابورَ
  --     مادّةٍ أخرى فيُكسر «لا يُخلط بين المواد» (98 · ثابت ④).
  select count(*) into v_bad
    from unnest(coalesce(p_lessons, '{}')) x(lid)
    left join lessons l on l.id = x.lid
   where l.id is null or l.subject_id <> v_subject;
  if v_bad > 0 then
    raise exception 'درسٌ غير موجود أو من مادّةٍ أخرى';
  end if;

  delete from card_lessons cl
   where cl.card_id = p_card
     and not (cl.lesson_id = any(coalesce(p_lessons, '{}')));

  insert into card_lessons (card_id, lesson_id, created_by)
  select p_card, x.lid, auth.uid()
    from unnest(coalesce(p_lessons, '{}')) x(lid)
  on conflict do nothing;

  return jsonb_build_object('card_id', p_card,
    'lessons', (select coalesce(jsonb_agg(cl.lesson_id order by cl.lesson_id), '[]'::jsonb)
                  from card_lessons cl where cl.card_id = p_card));
end $$;

grant execute on function public.set_card_lessons(bigint, bigint[]) to authenticated;


create or replace function public.link_cards_lesson(
  p_cards  bigint[],
  p_lesson bigint,
  p_on     boolean default true)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_subject bigint; v_n int; v_seen int;
begin
  select l.subject_id into v_subject from lessons l where l.id = p_lesson;
  if v_subject is null then raise exception 'درسٌ غير موجود'; end if;
  if not can_curate(v_subject) then
    raise exception 'لا صلاحيةَ لك على هذه المادة';
  end if;

  --  الصلاحيةُ تُفحص لكلّ بطاقةٍ داخل الفعل نفسِه لا في فرعٍ سابق:
  --  معرّفٌ من مادّةٍ أخرى يسقط صامتاً ولا يُعطّل الباقي (نمط 103).
  with ok as (
    select c.id from cards c
      join decks d on d.id = c.deck_id
     where c.id = any(coalesce(p_cards, '{}')) and d.subject_id = v_subject
  ), act as (
    insert into card_lessons (card_id, lesson_id, created_by)
    select o.id, p_lesson, auth.uid() from ok o where p_on
    on conflict do nothing
    returning 1
  ), del as (
    delete from card_lessons cl
     using ok o
     where not p_on and cl.card_id = o.id and cl.lesson_id = p_lesson
    returning 1
  )
  select (select count(*) from act) + (select count(*) from del),
         (select count(*) from ok)
    into v_n, v_seen;

  return jsonb_build_object(
    'changed', v_n,                                             -- ما تغيّر فعلاً
    'already', v_seen - v_n,                                    -- ما كان على حاله
    'skipped', coalesce(array_length(p_cards, 1), 0) - v_seen); -- خارج المادة
end $$;

grant execute on function public.link_cards_lesson(bigint[], bigint, boolean) to authenticated;


-- ─── ⑧ save_cards — معدَّلة لا منشأة ─────────────────────────────────
--
--  📌 أصلُها 98، وبدّلها 101. والتغييرُ هنا **في الرادّ وحده**:
--     تُعيد `ids` لما لمسته، فتستطيع الشاشةُ أن تربطها بدرسٍ في
--     ندائها التالي.
--
--  🔑 والتوقيع لا يُمسّ عمداً. ولو أُضيف `p_lesson` بقيمةٍ افتراضية
--     لصار للدالّة شكلان يقبلان نداءً بمعاملين ⇒ PostgreSQL يردّه
--     «function is not unique»، وتسقط الشاشةُ القديمة في الفجوة بين
--     نشر القاعدة ونشر الواجهة. **والقاعدةُ قبل الواجهة** (درس 156).
--     ⇒ الربطُ نداءٌ ثانٍ بـlink_cards_lesson، والقديمُ يبقى عاملاً.

create or replace function public.save_cards(p_deck bigint, p_rows jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_subject bigint; v_mine bool; v_before int; v_after int;
        v_touched int; v_ids bigint[];
begin
  select d.subject_id, coalesce(d.owner_id = auth.uid(), false)
    into v_subject, v_mine
    from decks d where d.id = p_deck;
  if v_subject is null then raise exception 'مجموعةٌ غير موجودة'; end if;
  if not v_mine and not can_curate(v_subject) then
    raise exception 'لا صلاحيةَ لك على هذه المجموعة';
  end if;

  select count(*) into v_before from cards where deck_id = p_deck;

  with src as (
    select btrim(e->>'front')                                       as front,
           btrim(e->>'back')                                        as back,
           nullif(btrim(coalesce(e->>'note' ,'')),'')               as note,
           nullif(btrim(coalesce(e->>'audio','')),'')               as audio,
           nullif(btrim(coalesce(e->>'image','')),'')               as image,
           coalesce(nullif(btrim(coalesce(e->>'lang','')),''),'ar') as lang,
           (row_number() over ())::int                              as rn
      from jsonb_array_elements(coalesce(p_rows,'[]'::jsonb)) e
  ), good as (
    --  أوّلُ ظهورٍ يفوز: صفّان بنفس المفتاح في اللصقة الواحدة يُسقطان
    --  on conflict بخطأ «cannot affect row a second time».
    select distinct on (public.card_key(front)) *
      from src
     where public.card_key(front) is not null
       and nullif(back,'') is not null
     order by public.card_key(front), rn
  ), ins as (
    insert into cards (deck_id, front, back, note, audio, image, lang, position, created_by)
    select p_deck, front, back, note, audio, image, lang, rn, auth.uid() from good
    on conflict (deck_id, front_key) do update
       set back  = excluded.back,
           note  = excluded.note,
           audio = excluded.audio,
           image = excluded.image,
           lang  = excluded.lang
    --  🔑 و position لا تُحدَّث: إعادةُ اللصق تصحيحٌ للمعاني، ولا يجوز
    --     أن تُعيد ترتيب ما رتّبه المؤلّف.
    returning id
  )
  select count(*)::int, coalesce(array_agg(id), '{}') into v_touched, v_ids from ins;

  select count(*) into v_after from cards where deck_id = p_deck;

  return jsonb_build_object(
    'added',   v_after - v_before,
    'updated', v_touched - (v_after - v_before),
    'skipped', jsonb_array_length(coalesce(p_rows,'[]'::jsonb)) - v_touched,
    --  🆕 157 · ما لمسته الدالّة — تُربَط به الدروسُ في نداءٍ تالٍ
    'ids',     to_jsonb(v_ids));
end $$;

grant execute on function public.save_cards(bigint, jsonb) to authenticated;


-- ─── ⑨ save_deck — معدَّلة لا منشأة ──────────────────────────────────
--
--  📌 أصلُها 98. وثلاثةٌ تغيّرت:
--     ① p_lesson صار **يصيح ولا يُهمَل**. ومعاملٌ يُقبل ولا يُكتب
--        أخطرُ من معاملٍ يُرفض: الشاشةُ تُظهر «حُفظت» والدرسُ ضاع.
--     ② وتعارضُ القيد الجديد يُترجَم إلى جملةٍ تُفهم.
--     ③ والمادةُ والصفُّ لا يُؤخذان من درسٍ بعد — فالدرسُ ذهب.

create or replace function public.save_deck(
  p_id       bigint,
  p_title    text,
  p_subject  bigint default null,
  p_level    bigint default null,
  p_lesson   bigint default null,
  p_position int    default 0)
returns bigint language plpgsql security definer set search_path to 'public' as $$
declare v_id bigint;
begin
  if nullif(btrim(coalesce(p_title,'')),'') is null then
    raise exception 'لا عنوان للمجموعة';
  end if;

  if p_lesson is not null then
    raise exception 'الدرسُ صار على البطاقة لا على المجموعة — اربطه من البطاقات (الملفّ 157)';
  end if;

  if p_subject is null then raise exception 'لا مادّةَ للمجموعة'; end if;
  if not can_curate(p_subject) then
    raise exception 'لا صلاحيةَ لك على هذه المادة';
  end if;

  if p_id is null then
    insert into decks (subject_id, level_id, title, position, created_by)
    values (p_subject, p_level, btrim(p_title), coalesce(p_position,0), auth.uid())
    returning id into v_id;
  else
    update decks
       set subject_id = p_subject, level_id = p_level,
           title = btrim(p_title), position = coalesce(p_position,0)
     where id = p_id and owner_id is null          -- 🔒 لا يُحرَّر ما يملكه طالب
    returning id into v_id;
    if v_id is null then raise exception 'مجموعةٌ غير موجودة أو ليست رسميّة'; end if;
  end if;

  return v_id;

exception
  when unique_violation then
    raise exception 'لهذه المادة والصفّ مجموعةٌ رسميّةٌ واحدةٌ سلفاً — أضف بطاقاتك إليها';
end $$;

grant execute on function public.save_deck(bigint,text,bigint,bigint,bigint,int) to authenticated;


-- ─── ⑩ القراءة — معدَّلة لا منشأة ────────────────────────────────────

--  ٍ١٠-١ محرّرُ البطاقات: ومعه دروسُ كلِّ بطاقة، فالشاشةُ تعرضها وتحرّرها.
--  📌 أصلُها 98، وبدّلها 101.

create or replace function public.deck_cards(p_deck bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v jsonb;
begin
  if not can_see_deck(p_deck) then raise exception 'لا صلاحية'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', c.id, 'front', c.front, 'back', c.back,
           'note', c.note, 'audio', c.audio, 'image', c.image, 'lang', c.lang,
           'position', c.position,
           'lessons', (select coalesce(jsonb_agg(jsonb_build_object(
                                 'id', l.id, 'title', l.title) order by l.position, l.id), '[]'::jsonb)
                         from card_lessons cl join lessons l on l.id = cl.lesson_id
                        where cl.card_id = c.id)
         ) order by c.position, c.id), '[]'::jsonb)
    into v from cards c where c.deck_id = p_deck;
  return v;
end $$;

grant execute on function public.deck_cards(bigint) to authenticated;


--  ١٠-٢ قائمةُ المجموعات: درسُ المجموعة ذهب، ومكانُه عددُ الدروس المغطّاة.
--  📌 أصلُها 98.

create or replace function public.subject_decks(p_subject bigint)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(x order by (x->>'mine')::bool desc,
                                       (x->>'position')::int,
                                       x->>'title'), '[]'::jsonb)
    from (
      select jsonb_build_object(
               'id', d.id, 'title', d.title, 'position', d.position,
               'level_id', d.level_id,
               'mine', d.owner_id is not null,
               'cards', (select count(*) from cards c where c.deck_id = d.id),
               --  كم درساً تغطّيه بطاقاتُ هذه المجموعة — يُقرأ ولا يُكتب
               'lessons', (select count(distinct cl.lesson_id)
                             from card_lessons cl
                             join cards c on c.id = cl.card_id
                            where c.deck_id = d.id)
             ) as x
        from decks d
       where d.subject_id = p_subject
         and can_see_deck(d.id)
    ) t;
$$;

grant execute on function public.subject_decks(bigint) to authenticated;


-- ─── ⑪ due_cards — معدَّلة لا منشأة · وشرطُ بقاءٍ لا تحسين ───────────
--
--  📌 أصلُها 100، وبدّلها 101. وتغييران:
--     ① مدخلُ «درسٌ فُتح» يقرأ من card_lessons. ولولاه لتعطّل البابُ
--        كلُّه بتفريغ decks.lesson_id (الثابت ④ في الرأس).
--     ② 🐛 وعطلٌ قديم يُرفع معه (الثابت: ما يُمسّ لسببٍ آخر يُصلَح):
--        الجديدُ كان يُرتَّب `order by id` **لا بـposition** الذي
--        رتّبه المؤلّف. يتطابقان ما دام اللصقُ واحداً، **ويفترقان عند
--        أوّل إضافةٍ لاحقة** — فبطاقةٌ أُريد موضعُها الثالث تصل أخيرة.

create or replace function public.due_cards(
  p_subject bigint,
  p_limit   int default 30,
  p_new     int default 6)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_uid uuid := auth.uid(); v jsonb;
begin
  if v_uid is null then raise exception 'لا جلسة'; end if;

  with mine as (
    select d.id from decks d
     where d.subject_id = p_subject and can_see_deck(d.id)
  ),
  pool as (
    select c.id, c.front, c.back, c.note, c.audio, c.image, c.lang, c.position,
           r.state, r.due, r.reps, r.my_note,
           case
             when r.card_id is null and exists (
                    select 1 from answers a
                      join attempts t on t.id = a.attempt_id
                      join questions q on q.id = a.question_id
                     where t.user_id = v_uid and q.card_id = c.id
                       and a.is_correct is not true)              then 1  -- ① تشخيص
             when r.card_id is not null and r.due <= now()        then 2  -- ② مستحقّ
             when r.card_id is null and exists (                          -- ③ درسٌ فُتح
                    select 1 from card_lessons cl
                      join items i on i.lesson_id = cl.lesson_id
                      join item_progress p on p.item_id = i.id
                     where cl.card_id = c.id and p.user_id = v_uid)
                                                                  then 3
             else 9
           end as rank
      from cards c
      join mine m on m.id = c.deck_id
      left join card_reviews r on r.card_id = c.id and r.user_id = v_uid
     where can_see_card(c.id)      -- 🔒 الدرسُ على البطاقة، فالحارسُ معها
  ),
  fresh as (
    --  🐛 position أوّلاً: ترتيبُ المؤلّف هو الذي يصل الطالب
    select * from pool where rank = 3 order by position, id limit greatest(0, p_new)
  ),
  q as (
    select * from pool where rank in (1,2)
    union all
    select * from fresh
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', x.id, 'front', x.front, 'back', x.back, 'note', x.note,
           'audio', x.audio, 'image', x.image, 'lang', x.lang,
           'state',   coalesce(x.state,'new'),
           'reps',    coalesce(x.reps,0),
           'my_note', x.my_note,
           'entry',   case x.rank when 1 then 'dx' when 2 then 'due' else 'new' end,
           'dx_note', (select d.student_note
                         from answers a
                         join attempts t  on t.id = a.attempt_id
                         join questions qq on qq.id = a.question_id
                         join dx_codes d  on d.code = a.dx_code
                        where t.user_id = v_uid and qq.card_id = x.id
                          and a.is_correct is not true
                        order by a.id desc limit 1)
         ) order by x.rank, x.due nulls last, x.position, x.id), '[]'::jsonb)
    into v
    from (select * from q
           order by rank, due nulls last, position, id
           limit greatest(1, p_limit)) x;

  return jsonb_build_object(
    'subject', p_subject,
    'cards',   v,
    'count',   jsonb_array_length(v));
end $$;

grant execute on function public.due_cards(bigint, int, int) to authenticated;


-- ─── ⑫ السجلّ ─────────────────────────────────────────────────────────

insert into public.sql_log (n, title, applied_at)
values ('157', 'الدرسُ صفةُ البطاقة: card_lessons ومجموعةٌ رسميّةٌ واحدةٌ لكلّ مادة وصفّ', now())
on conflict (n) do update set applied_at = now();

commit;


-- ══════════════════════════════════════════════════════════════════════
--  ⑬ الفحص — جملةٌ واحدة (محرّر Supabase يعرض ناتج الأخيرة وحدها)
--     وكلُّ بندٍ يقيس شيئاً واحداً بما يخصّه (AGENTS §٣ ④)
-- ══════════════════════════════════════════════════════════════════════
/*
select '① الجدول والفهرس' as البند,
       (select count(*)::text from information_schema.tables
         where table_schema='public' and table_name='card_lessons') || ' جدول · ' ||
       (select count(*)::text from pg_indexes
         where schemaname='public' and tablename='card_lessons') as المقيس,
       '1 جدول · 2' as المنتظر
union all
select '② التعبئة الرجعيّة وصلت',
       (select count(*)::text from card_lessons), 'أكبر من صفر'
union all
select '③ ولا بطاقةَ فقدت درسَها في النقل',
       (select count(*)::text from card_lessons cl
         left join cards c on c.id = cl.card_id where c.id is null),
       '0 — لا وصلَ ييتم'
union all
select '④ مجموعةٌ رسميّةٌ واحدة لكلّ (مادة · صفّ)',
       (select coalesce(max(n)::text,'0') from (
          select count(*) as n from decks where owner_id is null
           group by subject_id, coalesce(level_id,0)) t), '1'
union all
select '⑤ والقيد يحرسها',
       (select count(*)::text from pg_indexes
         where schemaname='public' and indexname='decks_official_one'), '1'
union all
select '⑥ decks.lesson_id فُرّغ وأُعلن تقاعده',
       (select count(*)::text from decks where lesson_id is not null) || ' ممتلئ · ' ||
       case when col_description('public.decks'::regclass,
              (select ordinal_position from information_schema.columns
                where table_schema='public' and table_name='decks'
                  and column_name='lesson_id')::int) like '⛔%'
            then 'معلَن' else '🔴 لم يُعلَن' end,
       '0 ممتلئ · معلَن'
union all
select '⑦ سياسةُ cards تنادي can_see_card لا can_see_deck',
       (select case when qual like '%can_see_card%' then '✅ البطاقة'
                    else '🔴 ما زالت على المجموعة' end
          from pg_policies where schemaname='public' and tablename='cards'
           and policyname='p_cards_read'), '✅ البطاقة'
union all
select '⑧ والجدولُ الجديد محروس',
       (select count(*)::text from pg_policies
         where schemaname='public' and tablename='card_lessons') || ' سياسة · ' ||
       (select case when relrowsecurity then 'RLS' else '🔴 بلا RLS' end
          from pg_class where oid = 'public.card_lessons'::regclass), '1 سياسة · RLS'
union all
select '⑨ الدوالّ الستّ ومنحُها',
       (select count(*)::text from pg_proc
         where pronamespace='public'::regnamespace
           and proname in ('can_see_card','set_card_lessons','link_cards_lesson',
                           'save_cards','save_deck','deck_cards','subject_decks','due_cards'))
       || ' موجودة · ' ||
       (select count(*)::text from information_schema.role_routine_grants
         where specific_schema='public' and grantee='authenticated'
           and routine_name in ('can_see_card','set_card_lessons','link_cards_lesson',
                                'save_cards','save_deck','deck_cards','subject_decks','due_cards'))
       || ' ممنوحة', '8 موجودة · 8 ممنوحة'
union all
select '⑩ ولا منحَ كتابةٍ على card_lessons',
       (select coalesce(string_agg(distinct privilege_type, ' · '), 'لا منح')
          from information_schema.role_table_grants
         where table_schema='public' and table_name='card_lessons'
           and grantee in ('authenticated','anon','public')), 'SELECT وحده';
*/


-- ══════════════════════════════════════════════════════════════════════
--  ⑭ فحصُ الرؤية — بحساب طالبٍ حقيقيّ (AGENTS §٧)
--
--  🔑 واختر طالباً **يبلغ مستواه الهدف**، وإلّا حجبه حارسٌ آخر فبدت
--     الفتحة أصغر ممّا هي.
--  ⚠️ وإجرائيّاً في كتلة، لا بـcross join lateral: ترتيبُ set_config
--     إزاء دالّةٍ stable لا يضمنه المخطِّط (درس 156).
-- ══════════════════════════════════════════════════════════════════════
/*
do $$
declare v_uid uuid; v_seen int; v_all int; v_due jsonb;
begin
  select id into v_uid from profiles where role='student' order by created_at limit 1;
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);

  select count(*) into v_all  from cards;
  select count(*) into v_seen from cards c where can_see_card(c.id);
  v_due := due_cards((select subject_id from decks where id =
             (select deck_id from cards order by id limit 1)));

  raise notice 'يرى % من % بطاقة · والطابور % بطاقة',
    v_seen, v_all, v_due->>'count';
end $$;
*/
