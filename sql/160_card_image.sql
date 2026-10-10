-- ══════════════════════════════════════════════════════════════════════
--  بيان — 160_card_image.sql  ·  أساسُ صورة البطاقة
-- ══════════════════════════════════════════════════════════════════════
--
--  🔑 ما يُغلقه: `cards.image` عمودٌ قائمٌ منذ `101`، و`save_card` و
--  `save_cards` تكتبانه، **ولا مخزنَ له ولا جرّةَ في المنصّة.** فالمؤلّفُ
--  يلصق رابطاً خارجياً أو لا شيء — ومحرّرُ البطاقة يقول ذلك بحرفه:
--  «الصورة: رابط خارجيّ اليوم». وقِيس على الحيّ: **٠ من ٢٦ بطاقة لها
--  صورة.** فحقلٌ بلا مخزنٍ ولا عارضٍ هو `questions.card_id` ثانيةً:
--  **بنيةٌ تامّةٌ لا شيءَ يدخلها.**
--
--  وهذا الملفّ أساسُها في القاعدة وحدَها: مخزنٌ يملكه المشروع · وعمودٌ
--  لصورةِ الوجه · وكاتبان يعرفانها. **والجرّةُ والزرُّ في الواجهة بعده
--  (`b134`)، والاستيرادُ بعدهما (`161`).**
--
--  ┌─────────── ثوابتُ هذا الملفّ ───────────┐
--  │                                                                  │
--  │  ①  🔑 **والمخزنُ مُسمًّى سلفاً لا مخترَعاً الآن:** تعليقُ         │
--  │     `js/media.js` يقول منذ كُتب «فمخزنٌ جديد (**img** · docs) لا   │
--  │     يحتاج تعديلاً هنا»، و`publicUrl` و`uploadMedia` تشتقّان       │
--  │     المخزنَ من المفتاح (`^([a-z0-9-]+)/(.+)$`). ⇒ **صفرُ تعديلٍ   │
--  │     في طبقة الوسائط**، والاسمُ يطابق ما انتظرته.                  │
--  │                                                                  │
--  │  ②  📐 **والسياساتُ أربعٌ على نسق `audio` حرفاً** لا نسخةٌ        │
--  │     مخترَعة: قراءةٌ لـ`public`، وكتابةٌ وتحديثٌ وحذفٌ لـ          │
--  │     `authenticated` بشرط `can_upload_media()` — وهي `is_admin()`  │
--  │     اليوم، وتعليقُها يقول «يوم يُفتح التأليف: or is_teacher()».   │
--  │     **فحدُّ الرفع يتوسّع من موضعٍ واحد**، لا من سياسةٍ لكلّ مخزن.  │
--  │                                                                  │
--  │  ③  🔴 **وSVG مُقصاةٌ بقرارٍ يُكتب لا بسهو:** ملفٌّ نصّيٌّ يُسلَّم   │
--  │     بنوعه من مخزنٍ **عامّ**، وحمولتُه تُكتب كما تُكتب الصفحة.      │
--  │     والرسمُ الهندسيُّ يُصدَّر PNG أو WebP بلا خسارةِ معنى.         │
--  │                                                                  │
--  │  ④  🔴 **والوجهُ يبقى نصّاً أبداً.** `front_key` عمودٌ مولَّدٌ      │
--  │     مخزَّنٌ من `front` وحدَه، وهو هويّةُ البطاقة في `cards_deck_key`│
--  │     وبه تُوصَل الدروسُ والفروع في `import_cards`. **فصورةُ الوجه   │
--  │     زيادةٌ لا بديل**، ولا تدخل المفتاحَ ولا تُغيّره.               │
--  │                                                                  │
--  │  ⑤  🔴 **وزيادةُ معاملٍ تُنشئ دالّةً ثانيةً ولا تستبدل الأولى.**   │
--  │     قِيس في مخزنٍ مؤقّتٍ قبل كتابة هذا السطر: نسختان إحداهما      │
--  │     بمعاملٍ زائدٍ ذي قيمةٍ افتراضية ⇒ النداءُ بالأسماء يسقط بـ     │
--  │     `function … is not unique` (SQLSTATE `42725`). ⇒ **فإسقاطُ    │
--  │     التوقيع الثُّمانيّ شرطُ عملٍ لا تنظيف.**                       │
--  │     🔑 **ولا نافذةَ عطلٍ فيه:** التُّساعيّةُ بقيمةٍ افتراضيّة        │
--  │     تستقبل نداءَ الثمانية كما هو، والإنشاءُ والإسقاطُ في معاملةٍ   │
--  │     واحدة ⇒ **الواجهةُ القائمة تعمل قبل أن تُحدَّث.**              │
--  │                                                                  │
--  │  ⑥  🔑 **ومنحٌ صريحٌ للتوقيع الجديد — فالمنحُ لا يُورَث عن أخ.**   │
--  │     وقِيس منحُ الثُّمانيّة: `authenticated · postgres ·            │
--  │     `service_role` ⇒ يُعاد مثلُه. وبلا هذا يسقط الحفظُ بصمتٍ      │
--  │     بعد إحكام `EXECUTE` في `154`.                                │
--  │                                                                  │
--  └──────────────────────────────────────────────────────────────────┘
--
--  ⛔ **وفيه `drop` على دالّةٍ حيّة — فلا يُشغَّل إلا بإذنٍ صريحٍ في
--     الجلسة.** وهو `drop` واحدٌ بعينه: التوقيعُ الثُّمانيّ من
--     `save_card` (القسم ③-ب). أمّا `drop policy if exists` فهو نمطُ
--     إعادةِ التشغيل المقرَّر في `AGENTS §٥`، وعلى سياساتٍ **يُنشئها
--     هذا الملفّ نفسُه** — فلا يُخلَط البابان.
--
--  🧪 **وتجربةٌ جافّةٌ في الذيل** تُشغَّل بعد الاعتماد، وتنقض نفسها.
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ─── ① المخزن `img` ─────────────────────────────────────────────────
--  عامٌّ كأخيه `audio`: الحمايةُ في الكتابة لا في القراءة، والصورةُ
--  التعليميّةُ تُعرض لكلّ طالبٍ يفتح بطاقتَها فلا سرَّ فيها.
--  والحدُّ ٢ م.ب: **الطالبُ على شبكةٍ ضعيفة يدفع ثمنَ كلِّ بايت** —
--  وهي الحجّةُ نفسُها التي كتبت `preload="metadata"` في مقطع السؤال.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('img', 'img', true, 2097152,
        array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
   set public             = excluded.public,
       file_size_limit    = excluded.file_size_limit,
       allowed_mime_types = excluded.allowed_mime_types;


-- ─── ② سياساتُه الأربع (ثابت ②) ─────────────────────────────────────

drop policy if exists img_read   on storage.objects;
drop policy if exists img_write  on storage.objects;
drop policy if exists img_update on storage.objects;
drop policy if exists img_delete on storage.objects;

create policy img_read   on storage.objects for select
  to public        using (bucket_id = 'img');

create policy img_write  on storage.objects for insert
  to authenticated with check (bucket_id = 'img' and can_upload_media());

create policy img_update on storage.objects for update
  to authenticated using      (bucket_id = 'img' and can_upload_media())
                   with check (bucket_id = 'img' and can_upload_media());

create policy img_delete on storage.objects for delete
  to authenticated using      (bucket_id = 'img' and can_upload_media());


-- ─── ③ عمودُ صورة الوجه (ثابت ④) ────────────────────────────────────

alter table public.cards add column if not exists front_image text;

comment on column public.cards.front_image is
  'صورةُ الوجه (160): مفتاحُ مخزنٍ img/… أو رابطٌ خارجيّ. '
  'زيادةٌ على نصّ الوجه لا بديلٌ عنه — فـfront_key هويّةُ البطاقة '
  'وهو مولَّدٌ من front وحدَه. وcards.image تبقى صورةَ المعنى.';

comment on column public.cards.image is
  'صورةُ المعنى (101): تُعرض بعد الكشف. وصورةُ الوجه في front_image (160).';


-- ══════════════════════════════════════════════════════════════════════
--  ④ معدَّلةٌ لا منشأة — وكلُّ واحدةٍ قُرئت حيّةً بـpg_get_functiondef
--    قبل استبدالها، وفحصُ القسم ⑥ يُثبت أنّ الفرقَ حقلٌ واحدٌ لا أكثر.
-- ══════════════════════════════════════════════════════════════════════

-- ─── ④-أ `save_cards` — توقيعُها لا يتغيّر (الحمولةُ jsonb) ──────────
--  🔑 ولهذا لا إسقاطَ لها ولا منحَ جديد: حقلٌ في ثلاثة مواضع فقط
--     (`src` · أعمدةُ `insert` · `on conflict do update`).
--  📌 و`position` لا تُحدَّث — كما كانت: إعادةُ اللصق تصحيحٌ للمعاني،
--     ولا يجوز أن تُعيد ترتيبَ ما رتّبه المؤلّف.

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
           --  🆕 160 · صورةُ الوجه — الحقلُ الوحيدُ الزائد في هذه الدالّة
           nullif(btrim(coalesce(e->>'front_image','')),'')         as front_image,
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
    insert into cards (deck_id, front, back, note, audio, image, front_image,
                       lang, position, created_by)
    select p_deck, front, back, note, audio, image, front_image,
           lang, rn, auth.uid() from good
    on conflict (deck_id, front_key) do update
       set back        = excluded.back,
           note        = excluded.note,
           audio       = excluded.audio,
           image       = excluded.image,
           front_image = excluded.front_image,
           lang        = excluded.lang
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


-- ─── ④-ب `save_card` — التوقيعُ يتّسع، فيُسقَط القديم (ثابت ⑤) ───────
--  ⛔ وهنا الـ`drop` الوحيدُ الذي يحتاج إذناً. والترتيبُ مقصود:
--     تُولد التُّساعيّةُ أوّلاً، ثمّ تُسقَط الثُّمانيّة، والاثنتان في
--     معاملةٍ واحدة — فلا لحظةَ تكون فيها القاعدةُ بلا كاتبٍ للبطاقة،
--     ولا لحظةَ يكون فيها النداءُ غامضاً.

create or replace function public.save_card(
  p_id          bigint,
  p_deck        bigint default null,
  p_front       text   default null,
  p_back        text   default null,
  p_note        text   default null,
  p_audio       text   default null,
  p_image       text   default null,
  p_lang        text   default 'ar',
  p_front_image text   default null)         -- 🆕 160
returns bigint language plpgsql security definer set search_path to 'public' as $$
declare v_subject bigint; v_mine bool; v_deck bigint; v_id bigint;
begin
  if nullif(btrim(coalesce(p_front,'')),'') is null
    or nullif(btrim(coalesce(p_back,'')),'') is null then
    raise exception 'الوجه والمعنى لازمان';
  end if;

  if p_id is not null then
    -- تحريرٌ: الهُويّة id — فتغييرُ الصياغة لا يُنشئ صفّاً آخر أبداً
    select c.deck_id into v_deck from cards c where c.id = p_id;
    if v_deck is null then raise exception 'بطاقةٌ غير موجودة'; end if;

    select d.subject_id, coalesce(d.owner_id = auth.uid(), false)
      into v_subject, v_mine from decks d where d.id = v_deck;
    if not v_mine and not can_curate(v_subject) then
      raise exception 'لا صلاحيةَ لك على هذه البطاقة';
    end if;

    update cards
       set front = btrim(p_front), back = btrim(p_back),
           note        = nullif(btrim(coalesce(p_note ,'')),''),
           audio       = nullif(btrim(coalesce(p_audio,'')),''),
           image       = nullif(btrim(coalesce(p_image,'')),''),
           front_image = nullif(btrim(coalesce(p_front_image,'')),''),
           lang        = coalesce(nullif(btrim(p_lang),''), 'ar')
     where id = p_id;

    return p_id;
  end if;

  -- إنشاءٌ: لا هُويّة بعد ⇒ يتبع صلاحية المجموعة الهدف
  if p_deck is null then raise exception 'لا مجموعة'; end if;
  select d.subject_id, coalesce(d.owner_id = auth.uid(), false)
    into v_subject, v_mine from decks d where d.id = p_deck;
  if v_subject is null then raise exception 'مجموعةٌ غير موجودة'; end if;
  if not v_mine and not can_curate(v_subject) then
    raise exception 'لا صلاحيةَ لك على هذه المجموعة';
  end if;

  insert into cards (deck_id, front, back, note, audio, image, front_image,
                     lang, created_by)
  values (p_deck, btrim(p_front), btrim(p_back),
          nullif(btrim(coalesce(p_note ,'')),''),
          nullif(btrim(coalesce(p_audio,'')),''),
          nullif(btrim(coalesce(p_image,'')),''),
          nullif(btrim(coalesce(p_front_image,'')),''),
          coalesce(nullif(btrim(p_lang),''), 'ar'), auth.uid())
  returning id into v_id;

  return v_id;

exception
  -- 🔑 رسالةٌ تُفهَم بدل رمز قيدٍ لا يعنيه: التعارض الحقيقيّ الوحيد
  --    الباقي هو أن يُعدَّل الوجه ليطابق بطاقةً أخرى قائمة في المجموعة
  when unique_violation then
    raise exception 'توجد بطاقةٌ بنفس الوجه في هذه المجموعة';
end $$;

--  ⛔ الإسقاطُ — يحتاج إذناً، وهو شرطُ عملٍ لا تنظيف (ثابت ⑤)
drop function if exists public.save_card(
  bigint, bigint, text, text, text, text, text, text);

--  🔑 ومنحٌ صريحٌ للتوقيع الجديد — لا يُورَث عن أخٍ سقط (ثابت ⑥)
grant execute on function public.save_card(
  bigint, bigint, text, text, text, text, text, text, text)
  to authenticated, service_role;

comment on function public.save_card(
  bigint, bigint, text, text, text, text, text, text, text) is
  'كاتبُ البطاقة الواحدة. وُسّع في 160 بـp_front_image، وأُسقط توقيعُه '
  'الثُّمانيّ في المعاملة نفسِها — فنسختان بمعاملٍ فارقٍ تُنتجان '
  '«function is not unique» على كلّ نداءٍ بالأسماء.';


-- ─── ⑤ سطرُ السجلّ ──────────────────────────────────────────────────
insert into public.sql_log (n, title, applied_at, applied_by, note)
values ('160', 'أساسُ صورة البطاقة — مخزنٌ يملكه المشروع، وصورةٌ للوجه، وكاتبان يعرفانها',
        now(), current_user,
        'مخزنٌ img وأربعُ سياساتٍ على نسق audio · وعمود front_image · '
        'وكاتبان معدَّلان: save_cards بلا تغيير توقيع، وsave_card اتّسع '
        'فأُسقط ثُمانيُّها. ولا جرّةَ في الواجهة بعد — b134.')
on conflict (n) do update set applied_at = now();


-- ─── ⑥ الفحص — سطرٌ لكلّ حالةٍ بما يخصّها (القاعدة ④) ────────────────

select '① المخزنُ قائمٌ بحدّه وصيغه' as فحص,
       b.public::text as "عامّ؟",
       (b.file_size_limit = 2097152)::text as "الحدُّ ٢ م.ب؟",
       array_to_string(b.allowed_mime_types, ' · ') as الصيغ,
       (not ('image/svg+xml' = any(b.allowed_mime_types)))::text as "SVG مُقصاة؟"
from storage.buckets b where b.id = 'img';

select '② سياساتُه أربعٌ وحارسُها حارسُ audio' as فحص,
       count(*) filter (where p.policyname like 'img_%')::text as "عددُ img",
       (count(*) filter (where p.policyname like 'img_%'
                           and p.policyname <> 'img_read'
                           and coalesce(p.qual,'') || coalesce(p.with_check,'')
                               like '%can_upload_media()%') = 3)::text
         as "الثلاثُ الكاتبة محروسة؟",
       (count(*) filter (where p.policyname = 'img_read'
                           and p.roles::text like '%public%') = 1)::text
         as "القراءةُ عامّة؟"
from pg_policies p where p.schemaname = 'storage' and p.tablename = 'objects';

select '③ العمودُ قائم، وfront_key لم يُمسّ' as فحص,
       (select count(*) from information_schema.columns
         where table_schema='public' and table_name='cards'
           and column_name='front_image')::text as "front_image؟",
       (select pg_get_expr(d.adbin, d.adrelid)
          from pg_attrdef d
          join pg_attribute a on a.attrelid = d.adrelid and a.attnum = d.adnum
         where d.adrelid = 'public.cards'::regclass and a.attname = 'front_key')
         as "تعبيرُ front_key";

select '④ save_card واحدةٌ لا اثنتان، وممنوحة' as فحص,
       count(*)::text as "عددُ التواقيع",
       string_agg(p.pronargs::text, ' · ' order by p.pronargs) as "عددُ المعاملات",
       bool_and(has_function_privilege('authenticated', p.oid, 'execute'))::text
         as "authenticated؟"
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'save_card';

select '⑤ الكاتبان يعرفان الحقلَ الجديد' as فحص,
       p.proname,
       (select count(*) from regexp_matches(pg_get_functiondef(p.oid),
                                            'front_image', 'g'))::text as "مرّاتُ ذكره"
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname in ('save_card','save_cards')
order by p.proname;

select '⑥ ولا دالّةَ أخرى مُسّت' as فحص,
       string_agg(p.proname || '=' || length(pg_get_functiondef(p.oid))::text, ' · '
                  order by p.proname) as أطوال
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('import_cards','link_cards_lesson','link_cards_strand',
                    'save_deck','card_key','can_upload_media','due_cards');

select '⑦ سطرُ السجلّ' as فحص, l.n, l.title, l.applied_at from sql_log l where l.n = '160';

commit;

-- ══════════════════════════════════════════════════════════════════════
--  ⑧ تجربةٌ جافّةٌ بهويّة مدير — تُشغَّل بعد الاعتماد، وتنقض نفسها
--     فلا تُبقي بطاقةً ولا تُغيّر صفّاً.
--
--  do $probe$
--  declare v_uid text; v_id bigint; r record;
--  begin
--    select p.id::text into v_uid from profiles p where p.role = 'admin' limit 1;
--    perform set_config('request.jwt.claims',
--            json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
--
--    -- ① النداءُ بالأسماء الثمانية — كما تناديه الواجهةُ القائمة اليوم
--    v_id := save_card(p_id => null, p_deck => 5,
--                      p_front => 'قياسُ ١٦٠ — وجهٌ بصورة',
--                      p_back  => 'ومعنًى بصورته',
--                      p_note  => null, p_audio => null,
--                      p_image => 'img/u1-ab12cd.webp', p_lang => 'ar');
--
--    -- ② ثمّ بالتُّساعيّ — وصورةُ الوجه تُكتب
--    perform save_card(p_id => v_id, p_deck => 5,
--                      p_front => 'قياسُ ١٦٠ — وجهٌ بصورة',
--                      p_back  => 'ومعنًى بصورته',
--                      p_note  => null, p_audio => null,
--                      p_image => 'img/u1-ab12cd.webp', p_lang => 'ar',
--                      p_front_image => 'img/u1-ef34gh.png');
--
--    select c.front_image, c.image, c.front_key into r
--      from cards c where c.id = v_id;
--
--    raise exception E'\n① نداءُ الثمانية مرّ ⇒ المعرّف %\n② صورةُ الوجه %\n   وصورةُ المعنى %\n③ وfront_key لم تتغيّر بالصورة: %',
--          v_id, r.front_image, r.image, r.front_key;
--  end $probe$;
--
--  والمتوقَّع: نداءُ الثمانية يمرّ بلا غموض (فالثُّمانيّةُ أُسقطت) ·
--  وfront_image تحمل مفتاحَ `img/…` · وfront_key نصُّ الوجه مطبَّعاً
--  لا أثرَ للصورة فيه (ثابت ④). ولا يبقى من التجربة صفّ.
-- ══════════════════════════════════════════════════════════════════════
