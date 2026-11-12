-- ══════════════════════════════════════════════════════════
-- 207 · العمرُ والطبقة — تاريخُ الميلاد لصاحبه وحده، والطبقةُ تُحفظ مع المستوى
--       (المرحلة ٦ من `spec-reading-library.md` · ق٦ · ق١٣ · ق١٤ · ق١٥ · ١٢ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **تاريخُ الميلاد في جدولٍ وحده لا عمودٍ في `profiles`** (ق٦ ①): ملفُّ الطالب يقرؤه معلّموه والمشرف،
--      والتاريخُ لا يحتاجه غيرُ صاحبه. فالجدولُ مقفلٌ كلُّه (RLS بلا سياسة ومنحٌ مسحوب)، ويُقرأ ويُكتب بدالّتين
--      لصاحبه. **والمعلّمُ يرى الطبقةَ لا التاريخ** — الطبقةُ في `student_levels` التي يقرؤها أصلاً.
--   ② **ويعبر من التسجيل في البيانات الوصفية ويُختم عند أوّل دخول** — كما تعبر الموافقةُ والصيغة (`api.sealGram`).
--      **ولم يُمسّ `handle_new_user`:** يعبره كلُّ تسجيل، وخطأٌ فيه يُغلق البابَ على الجميع (رأس `123`). والواجهةُ
--      تمحو نسختَه من بيانات الحساب بعد الختم (`auth.updateUser`) — فلا يبقى في موضعين.
--   ③ **حدودُ الطبقات في موضعٍ واحد** (`scale_tiers` · ق١٤): الاسمُ والأعمارُ والسقف. يقرؤه حسابُ الطبقة، و`author_tree`
--      لشاشة التأليف — **فتسقط نسختُها الثانية في `editor.js` (`TIER_AGES` · b239).** والسلّمُ «ذو طبقات» إن كان له فيه سطر.
--      والسقوفُ تقديرٌ أوّل (ق١٤) يُعدَّل بالنتائج — فإعادةُ الملفّ لا تطمس تعديلها (`on conflict do nothing`).
--   ④ **الطبقةُ تُحسب لحظةَ الدخول إلى مستوى وتُحفظ معه** (ق١٣ — يُعدِّل ق٦ ⑥ «تُحسب ولا تُخزَّن»):
--      `set_my_level` تكتبها، وهي ما تمرّ به الترقيةُ والتسكين معاً. **ويومَ الميلاد لا يتغيّر شيء** — فلا يضيع عدّادُ
--      ترقيةٍ في منتصف مستوى، ولا تتبدّل الرفوفُ فجأة.
--      📌 **إلا تصحيحَ التاريخ:** ليس كِبَراً بل خطأً يُصلَح — فتُعاد الطبقةُ على المستوى نفسِه (`set_my_birthdate`).
--   ⑤ **والممرّ** (ق١٤ · ق١٥) في `entry_tier`: طبقةُ العمر إن بلغ سقفُها المستوى · وإلّا الطبقةُ التي فوقها بدرجة ·
--      وإلّا لا طبقة ⇒ **لا ترقيةَ بعد، وينتظر عمرَه** (`promotion_state` تقول ذلك بحالٍ لها لا بـ`ready` كاذبة).
--   ⑥ **و`courses_of` تحجب مقرّراتِ الطبقات الأخرى** عن الطالب — سطرٌ في شرطه، والمعلّمُ والمشرف يريانها كلَّها.
--   ⑦ **والعبورُ يُعلَّم في سجلّ الترقيات** (ق١٥ ③): الطبقتان قبلُ وبعد، و`crossed` حين دخل طبقةً فوق طبقة عمره.
--      ⚠️ **وإبلاغُ المعلّم لم يُبنَ:** لا آليّةَ تنبيهٍ عامّة في المنصّة (`messages` حوارُ الطالب ومعلّمه وحده) —
--         فيُبنى مع شاشة المعلّم في المرحلة ٧ (٧ج)، والسجلُّ يحفظ ما يُبلَّغ به.
--   ⑧ **وعدّادُ الطلاب على بطاقات التأليف بالطبقة** (`author_tree`) — كان يعدّ طلابَ المستوى كلَّهم في البطاقات الأربع.
--
-- **قُرئت الحيّاتُ قبله (١٢ نوفمبر):** `set_my_level` · `reading_tier` · `promotion_state` · `promote_level` · `courses_of` ·
--   `author_tree` · `course_promotion` · `my_course_in` · `lesson_done(_at)` · `handle_new_user` (ومحفِّزُه بعد الإدراج) ·
--   `accept_policy` · `student_levels` (أعمدتُه وقيوده وسياستُه) · `level_promotions`. **والمستبدَلةُ كاملةً محروسةٌ ببصمتها:**
--   تغيّرت منذ قُرئت ⇒ استثناءٌ لا استبدال. **والمرقَّعةُ بعدّ نصّها.**
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة: الجداول ═══════════

-- ① حدودُ الطبقات — والسقفُ رتبةُ مستوًى في السلّم نفسِه
create table if not exists public.scale_tiers (
  scale_id     bigint  not null references public.scales(id) on delete cascade,
  code         text    not null check (code in ('M1','M2','M3','M4')),
  name         text    not null,
  age_from     integer not null check (age_from between 3 and 30),
  age_to       integer check (age_to is null or age_to >= age_from),   -- للعرض وحده: الحسابُ بالبداية، والأخيرةُ مفتوحة
  ceiling_rank integer not null check (ceiling_rank >= 1),
  position     integer not null,
  primary key (scale_id, code),
  unique (scale_id, position));
alter table public.scale_tiers enable row level security;
revoke all on public.scale_tiers from anon, authenticated;
comment on table public.scale_tiers is
  'طبقاتُ النضج لسلّمٍ ذي طبقات (مكتبة بيان): الاسم · بدايةُ العمر · السقف (ق١٤). يُقرأ بالدوالّ وحدها. (207)';

insert into public.scale_tiers (scale_id, code, name, age_from, age_to, ceiling_rank, position)
select sc.id, x.code, x.name, x.age_from, x.age_to, x.ceiling, x.pos
  from public.scales sc,
       (values ('M1', 'البراعم',   5,  7, 11, 1),
               ('M2', 'الأشبال',   8, 10, 16, 2),
               ('M3', 'اليافعون', 11, 13, 23, 3),
               ('M4', 'الشباب',   14, 18, 24, 4)) as x(code, name, age_from, age_to, ceiling, pos)
 where sc.code = 'reading'
on conflict (scale_id, code) do nothing;

-- ② تاريخُ الميلاد — لصاحبه وحده، ويذهب مع حسابه
create table if not exists public.student_birthdates (
  user_id    uuid        primary key references public.profiles(id) on delete cascade,
  birth_date date        not null check (birth_date >= date '1900-01-01'),
  updated_at timestamptz not null default now());
alter table public.student_birthdates enable row level security;
revoke all on public.student_birthdates from anon, authenticated;
comment on table public.student_birthdates is
  'تاريخُ ميلاد الطالب — لا يقرؤه غيرُ صاحبه (my_birthdate) ولا يكتبه غيرُه (set_my_birthdate). والمعلّمُ يرى الطبقةَ لا التاريخ. (207)';

-- ═══════════ معدَّلة: الأعمدة ═══════════

-- ③ الطبقةُ مع مستوى الطالب (ق١٣)
alter table public.student_levels add column if not exists tier text;
alter table public.student_levels drop constraint if exists student_levels_tier_chk;
alter table public.student_levels add constraint student_levels_tier_chk check (tier is null or tier in ('M1','M2','M3','M4'));
comment on column public.student_levels.tier is
  'طبقةُ الطالب في سلّمٍ ذي طبقات — تُكتب لحظةَ الدخول إلى المستوى (التسكين · الترقية) ولا تتبع العمرَ بينهما (ق١٣). (207)';

-- ④ العبورُ في سجلّ الترقيات (ق١٥ ③)
alter table public.level_promotions add column if not exists from_tier text;
alter table public.level_promotions add column if not exists to_tier   text;
alter table public.level_promotions add column if not exists crossed   boolean not null default false;

-- ═══════════ منشأة: الدوالّ ═══════════

-- العمرُ بالسنين — بتاريخ الرياض، فميلادٌ يقع اليومَ هناك يقع اليومَ هنا
create or replace function public.age_of(p_user uuid)
returns integer language sql stable security definer set search_path = public as $$
  select extract(year from age((now() at time zone 'Asia/Riyadh')::date, b.birth_date))::int
    from student_birthdates b where b.user_id = p_user
$$;

-- طبقةُ العمر: أكبرُ بدايةٍ لا تتجاوز العمر — ومن كان أصغرَ من أوّلها فهي الأولى
create or replace function public.age_tier(p_scale bigint, p_user uuid)
returns text language sql stable security definer set search_path = public as $$
  select t.code
    from scale_tiers t, (select age_of(p_user) as a) x
   where t.scale_id = p_scale and x.a is not null
   order by (t.age_from <= x.a) desc, case when t.age_from <= x.a then -t.age_from else t.age_from end
   limit 1
$$;

-- الطبقةُ لحظةَ الدخول إلى مستوى (ق١٣ · ق١٤ · ق١٥) — وفراغُها: سلّمٌ بلا طبقات · أو بلا تاريخ · أو فوق ما يُبلَغ الآن
create or replace function public.entry_tier(p_scale bigint, p_level bigint, p_user uuid)
returns text language plpgsql stable security definer set search_path = public as $$
declare v_rank int; v_age scale_tiers; v_up scale_tiers;
begin
  select t.* into v_age from scale_tiers t where t.scale_id = p_scale and t.code = age_tier(p_scale, p_user);
  if v_age.code is null then return null; end if;
  select lv.rank into v_rank from levels lv where lv.id = p_level and lv.scale_id = p_scale;
  if v_rank is null then return null; end if;
  if v_rank <= v_age.ceiling_rank then return v_age.code; end if;                -- ق١٤: داخل ممرّ عمره
  select t.* into v_up from scale_tiers t
   where t.scale_id = p_scale and t.position > v_age.position order by t.position limit 1;
  if v_up.code is not null and v_rank <= v_up.ceiling_rank then return v_up.code; end if;   -- ق١٥: درجةٌ واحدةٌ فوق العمر
  return null;                                                                    -- ق١٥ ②: فوق سقفها أيضاً — ينتظر عمرَه
end $$;

-- الطبقةُ المحفوظة
create or replace function public.my_tier(p_scale bigint, p_user uuid)
returns text language sql stable security definer set search_path = public as $$
  select sl.tier from student_levels sl where sl.user_id = p_user and sl.scale_id = p_scale
$$;

-- تاريخُ ميلادي — لصاحبه وحده
create or replace function public.my_birthdate()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('ok', auth.uid() is not null,
           'birth_date', (select b.birth_date from student_birthdates b where b.user_id = auth.uid()))
$$;

-- كتابتُه بحارسها — و`p_if_empty` لختم التسجيل: لا يطمس ما صحّحه صاحبُه بعده (كـ`sealGram`)
create or replace function public.set_my_birthdate(p_date date, p_if_empty boolean default false)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_today date := (now() at time zone 'Asia/Riyadh')::date; v_age int; v_old date; v_row record; v_tier text;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول'); end if;
  if (select role from profiles where id = auth.uid()) is distinct from 'student' then
    return jsonb_build_object('ok', false, 'error', 'تاريخ الميلاد يُطلب من الطلاب وحدهم');
  end if;
  if p_date is null then return jsonb_build_object('ok', false, 'error', 'تاريخ الميلاد مطلوب'); end if;
  if p_date > v_today then
    return jsonb_build_object('ok', false, 'error', 'تاريخ الميلاد لا يكون في المستقبل');
  end if;
  v_age := extract(year from age(v_today, p_date))::int;
  if v_age < 4 or v_age > 100 then
    return jsonb_build_object('ok', false, 'error', 'تاريخ الميلاد خارج المدى المقبول');
  end if;

  select b.birth_date into v_old from student_birthdates b where b.user_id = auth.uid();
  if v_old is not null and p_if_empty then
    return jsonb_build_object('ok', true, 'birth_date', v_old, 'kept', true);
  end if;

  insert into student_birthdates (user_id, birth_date) values (auth.uid(), p_date)
  on conflict (user_id) do update set birth_date = excluded.birth_date, updated_at = now()
   where student_birthdates.birth_date is distinct from excluded.birth_date;

  -- تصحيحُ التاريخ ليس كِبَراً (④ في الرأس): الطبقةُ تُعاد على المستوى نفسِه — وإن لم يُبلَغ الآن بقيت كما هي
  for v_row in select sl.scale_id, sl.level_id, sl.tier from student_levels sl
                where sl.user_id = auth.uid()
                  and exists (select 1 from scale_tiers t where t.scale_id = sl.scale_id) loop
    v_tier := entry_tier(v_row.scale_id, v_row.level_id, auth.uid());
    if v_tier is not null and v_tier is distinct from v_row.tier then
      update student_levels set tier = v_tier where user_id = auth.uid() and scale_id = v_row.scale_id;
    end if;
  end loop;

  return jsonb_build_object('ok', true, 'birth_date', p_date);
end $$;

-- ═══════════ معدَّلة: الدوالّ — مستبدَلةٌ كاملةً بحارس البصمة ═══════════

do $$
declare v text;
begin
  v := pg_get_functiondef('public.set_my_level(bigint,bigint,text)'::regprocedure);
  if md5(v) <> '19c93dd6cb63f2e8abf7c7434902f769' and position('207 ·' in v) = 0 then
    raise exception 'set_my_level تغيّرت منذ قُرئت — تُقرأ ثانيةً قبل الاستبدال';
  end if;
  v := pg_get_functiondef('public.reading_tier(uuid)'::regprocedure);
  if md5(v) <> 'dab89e191fab54a419f2dbb08a2c1730' and position('207 ·' in v) = 0 then
    raise exception 'reading_tier تغيّرت منذ قُرئت — تُقرأ ثانيةً قبل الاستبدال';
  end if;
  v := pg_get_functiondef('public.promotion_state(bigint,uuid)'::regprocedure);
  if md5(v) <> '66d99551d1b21593991ca0c9628c230b' and position('207 ·' in v) = 0 then
    raise exception 'promotion_state تغيّرت منذ قُرئت — تُقرأ ثانيةً قبل الاستبدال';
  end if;
  v := pg_get_functiondef('public.promote_level(bigint)'::regprocedure);
  if md5(v) <> 'd2d94f89f712315c0f5202ba766a9559' and position('207 ·' in v) = 0 then
    raise exception 'promote_level تغيّرت منذ قُرئت — تُقرأ ثانيةً قبل الاستبدال';
  end if;
end $$;

-- ④ كتابةُ المستوى تكتب الطبقة (ق١٣) — وما عداها كما قُرئت بحرفها
create or replace function public.set_my_level(p_scale bigint, p_level bigint, p_source text default 'self'::text)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_kind text; v_tier text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select kind into v_kind from scales where id = p_scale;
  if v_kind is null then
    return jsonb_build_object('ok', false, 'error', 'السلّم غير موجود');
  end if;

  if v_kind = 'academic' then
    return jsonb_build_object('ok', false,
      'error', 'الصفُّ الدراسيّ لا يُكتب باختبار — يُغيَّر من الملفّ الشخصيّ (set_my_grade)');
  end if;

  if not exists (select 1 from levels where id = p_level and scale_id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'هذا المستوى لا ينتمي إلى هذا السلّم');
  end if;

  -- 207 · سلّمٌ ذو طبقات: الطبقةُ تُحسب لحظةَ الدخول إلى المستوى وتُحفظ معه (ق١٣) بقيد الممرّ (ق١٤ · ق١٥).
  --       وبلا طبقةٍ صالحة لا يُكتب المستوى — مستوًى بلا طبقةٍ رفوفُه فارغة
  if exists (select 1 from scale_tiers where scale_id = p_scale) then
    v_tier := entry_tier(p_scale, p_level, auth.uid());
    if v_tier is null then
      return jsonb_build_object('ok', false, 'error',
        case when age_of(auth.uid()) is null then 'يلزم تاريخ ميلادك أولاً — من ملفك الشخصي'
             else 'هذا المستوى أعلى مما يناسب عمرك الآن' end);
    end if;
  end if;

  insert into student_levels (user_id, scale_id, level_id, source, tier)
  values (auth.uid(), p_scale, p_level, coalesce(p_source,'self'), v_tier)
  on conflict (user_id, scale_id) do update
    set level_id = excluded.level_id, source = excluded.source, tier = excluded.tier, set_at = now();

  return jsonb_build_object('ok', true,
    'level', (select name from levels where id = p_level), 'tier', v_tier);
end $function$;

-- الطبقةُ في المكتبة — المحفوظةُ لا المحسوبة (ق١٣)
create or replace function public.reading_tier(p_user uuid default auth.uid())
returns text language sql stable security definer set search_path to 'public' as $function$
  select my_tier((select id from scales where code = 'reading'), p_user)   -- 207 · كانت مَفصلاً يردّ 'M4' (205)
$function$;

-- حالُ الترقية — وتزيد الطبقة: طبقةُ المقرَّر وسقفُها · طبقةُ الطالب في المستوى التالي · والانتظار (ق١٣–ق١٥)
create or replace function public.promotion_state(p_course bigint, p_user uuid default auth.uid())
returns jsonb language plpgsql stable security definer set search_path to 'public' as $function$
declare
  v_course record;
  v_next   record;
  v_total  int;
  v_done   int;
  v_mins   jsonb;
  v_minok  boolean;
  v_met    boolean;
  v_tier   scale_tiers;     -- 207 · طبقةُ المقرَّر (فارغةٌ لغير المكتبة)
  v_up     scale_tiers;     -- والتي فوقها — لمقرَّر السقف وما فوقه
  v_ntier  text;            -- طبقةُ هذا الطالب في المستوى التالي
  v_hold   text;            -- birth · age
  v_wait   int;             -- العمرُ الذي يُفتح فيه المستوى التالي
begin
  select c.id, c.subject_id, c.level_id, c.tier, lv.scale_id, lv.rank, lv.name
    into v_course
    from courses c join levels lv on lv.id = c.level_id
   where c.id = p_course;
  if v_course.id is null then return null; end if;

  select n.id, n.name, n.rank into v_next
    from levels n
   where n.scale_id = v_course.scale_id and n.rank > v_course.rank
   order by n.rank
   limit 1;

  select r.min_books into v_total
    from promotion_rules r where r.course_id = p_course and r.strand_id is null;

  -- الكتب: منشورةٌ غيرُ مؤرشفة في المقرَّر (بيتُها أو مستعارة)، ومعها رفُّها وأصلُه وإنجازُ الطالب
  with books as (
    select l.id, l.strand_id, s.parent_id, lesson_done(l.id, p_user) as done
      from course_lessons() m
      join lessons l on l.id = m.lesson_id
      left join strands s on s.id = l.strand_id
     where m.course_id = p_course and l.published and l.archived_at is null
  ), mins as (
    select r.strand_id, r.min_books, st.name,
           (select count(*) from books b
             where b.done and (b.strand_id = r.strand_id or b.parent_id = r.strand_id))::int as done
      from promotion_rules r
      join strands st on st.id = r.strand_id
     where r.course_id = p_course and r.strand_id is not null
  )
  select (select count(*) from books where done)::int,
         coalesce((select jsonb_agg(jsonb_build_object('strand_id', strand_id, 'name', name,
                                                       'min', min_books, 'done', done) order by name) from mins), '[]'::jsonb),
         coalesce((select bool_and(done >= min_books) from mins), true)
    into v_done, v_mins, v_minok;

  v_met := v_total is not null and v_next.id is not null and v_done >= v_total and v_minok;

  -- 207 · الطبقة (ق١٣ · ق١٤ · ق١٥)
  if v_course.tier is not null then
    select t.* into v_tier from scale_tiers t where t.scale_id = v_course.scale_id and t.code = v_course.tier;
    if v_tier.code is not null and v_course.rank >= v_tier.ceiling_rank then
      select t.* into v_up from scale_tiers t
       where t.scale_id = v_course.scale_id and t.position > v_tier.position order by t.position limit 1;
    end if;
    if v_tier.code is not null and v_next.id is not null then
      v_ntier := entry_tier(v_course.scale_id, v_next.id, p_user);
      if v_ntier is null then
        if age_of(p_user) is null then
          v_hold := 'birth';
        else
          v_hold := 'age';
          -- أوّلُ طبقةٍ يبلغ سقفُها المستوى التالي، والتي قبلها تبدأ بالعمر الذي يُفتح فيه (درجةٌ فوق العمر)
          select pre.age_from into v_wait
            from scale_tiers t join scale_tiers pre on pre.scale_id = t.scale_id and pre.position < t.position
           where t.scale_id = v_course.scale_id and t.ceiling_rank >= v_next.rank
           order by t.position, pre.position desc
           limit 1;
        end if;
      end if;
    end if;
  end if;

  return jsonb_build_object(
    'course_id', p_course,
    'level', jsonb_build_object('id', v_course.level_id, 'name', v_course.name, 'rank', v_course.rank),
    'next',  case when v_next.id is null then null
                  else jsonb_build_object('id', v_next.id, 'name', v_next.name)
                       || case when v_tier.code is null then '{}'::jsonb
                               else jsonb_build_object('tier', v_ntier,
                                      'tier_name', (select t.name from scale_tiers t
                                                     where t.scale_id = v_course.scale_id and t.code = v_ntier)) end end,
    'tier',  case when v_tier.code is null then null
                  else jsonb_build_object('code', v_tier.code, 'name', v_tier.name, 'ceiling', v_tier.ceiling_rank) end,
    'up_tier', v_up.name,
    'rule',  case when v_total is null then null
                  else jsonb_build_object('total', v_total, 'mins', v_mins) end,
    'done',  v_done,
    'met',   v_met,
    'hold',  v_hold,
    'wait_age', v_wait,
    'ready', v_met and v_hold is null);
end $function$;

-- الترقية — تكتب الطبقةَ الجديدة (`set_my_level`) وتُعلِّم العبور في السجلّ (ق١٥ ③)
create or replace function public.promote_level(p_subject bigint)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare
  v_course bigint;
  v_state  jsonb;
  v_scale  bigint;
  v_res    jsonb;
  v_from   text;
  v_to     text;
  v_cross  boolean;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if (select progression from subjects where id = p_subject) is distinct from 'level' then
    return jsonb_build_object('ok', false, 'error', 'هذه المادة لا ترقية فيها');
  end if;
  v_course := my_course_in(p_subject);
  if v_course is null then
    return jsonb_build_object('ok', false, 'error', 'لا مستوى لك في هذه المادة بعد');
  end if;
  v_state := promotion_state(v_course);
  if not coalesce((v_state->>'ready')::boolean, false) then
    -- 207 · والانتظارُ بسببه: تاريخٌ غائب أو عمرٌ لم يبلغ (ق١٥ ②)
    return jsonb_build_object('ok', false, 'error',
      case v_state->>'hold'
        when 'birth' then 'يلزم تاريخ ميلادك أولاً — من ملفك الشخصي'
        when 'age'   then 'المستوى التالي يُفتح حين تكبر قليلاً'
        else 'شرط الترقية لم يكتمل بعد' end);
  end if;

  select lv.scale_id into v_scale from levels lv where lv.id = (v_state->'level'->>'id')::bigint;
  v_res := set_my_level(v_scale, (v_state->'next'->>'id')::bigint, 'promotion');
  if not coalesce((v_res->>'ok')::boolean, false) then return v_res; end if;

  -- 207 · العبور: دخل طبقةً فوق طبقة عمره ولم يكن فيها (ق١٥ ③)
  v_from  := v_state->'tier'->>'code';
  v_to    := v_res->>'tier';
  v_cross := v_to is not null and v_to is distinct from v_from
             and (select t.position from scale_tiers t where t.scale_id = v_scale and t.code = v_to)
               > (select t.position from scale_tiers t where t.scale_id = v_scale and t.code = age_tier(v_scale, auth.uid()));

  insert into level_promotions (user_id, subject_id, course_id, from_level, to_level, rule, from_tier, to_tier, crossed)
  values (auth.uid(), p_subject, v_course, (v_state->'level'->>'id')::bigint, (v_state->'next'->>'id')::bigint,
          jsonb_build_object('rule', v_state->'rule', 'done', v_state->'done'),
          v_from, v_to, coalesce(v_cross, false));

  return jsonb_build_object('ok', true, 'level', v_state->'next'->>'name');
end $function$;

-- ═══════════ معدَّلة: الدوالّ — رُقعٌ بعدّ نصّها ═══════════

-- ⑥ `courses_of`: مقرّراتُ الطبقات الأخرى محجوبةٌ عن الطالب — والمعلّمُ يتخطّى الشرطَ كلَّه من قبل
do $$
declare v text; p text := 'can_view_level(c.level_id, p_user))'; n int;
begin
  v := pg_get_functiondef('public.courses_of(uuid,bigint)'::regprocedure);
  if position('my_tier(s.scale_id, p_user)' in v) > 0 then raise notice 'courses_of تحجب الطبقات من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'courses_of: وُجد النصّ % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', n; end if;
  execute replace(v, p, p || ' and (c.tier is null or c.tier = my_tier(s.scale_id, p_user))');   -- 207 · ق١٣
end $$;

-- ⑧ `author_tree`: الطبقاتُ لشاشة التأليف · وعدّادُ الطلاب بالطبقة
do $$
declare v text; p1 text := 'and (c.level_id is null or sl.level_id = c.level_id))';
        p2 text := '''courses'', coalesce((select jsonb_agg('; n int;
begin
  v := pg_get_functiondef('public.author_tree()'::regprocedure);
  if position('scale_tiers' in v) > 0 then raise notice 'author_tree تحمل الطبقات من قبل'; return; end if;
  n := (length(v) - length(replace(v, p1, ''))) / length(p1);
  if n <> 1 then raise exception 'author_tree (العدّاد): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p2, ''))) / length(p2);
  if n <> 1 then raise exception 'author_tree (المقرّرات): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  v := replace(v, p1, 'and (c.level_id is null or sl.level_id = c.level_id) and (c.tier is null or sl.tier = c.tier))');
  v := replace(v, p2, '''tiers'', coalesce((select jsonb_agg(jsonb_build_object('
       || '''scale_id'', st.scale_id, ''code'', st.code, ''name'', st.name, ''age_from'', st.age_from, '
       || '''age_to'', st.age_to, ''ceiling'', st.ceiling_rank) order by st.scale_id, st.position) '
       || 'from scale_tiers st), ''[]''::jsonb),   -- 207 · حدودُ الطبقات (ق١٤)' || chr(10) || '    ' || p2);
  execute v;
end $$;

-- `course_promotion`: الطبقةُ وسقفُها للمصمّم · وتنبيهان: مقرَّرُ السقف (ق١٥ ①) ومقرَّرٌ فوقه لا يبلغه طالب (ق١٤)
do $$
declare v text; n int;
        p1 text := '''level'', v_state->''level'', ''next'', v_state->''next'',';
        p2 text := 'return jsonb_build_object(''ok'', true, ''applicable'', true, ''course_id'', p_course,';
begin
  v := pg_get_functiondef('public.course_promotion(bigint)'::regprocedure);
  if position('above_ceiling' in v) > 0 then raise notice 'course_promotion تعرف السقف من قبل'; return; end if;
  n := (length(v) - length(replace(v, p1, ''))) / length(p1);
  if n <> 1 then raise exception 'course_promotion (الردّ): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p2, ''))) / length(p2);
  if n <> 1 then raise exception 'course_promotion (الختام): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  v := replace(v, p1, p1 || ' ''tier'', v_state->''tier'', ''up_tier'', v_state->''up_tier'',');
  v := replace(v, p2,
       '-- 207 · مقرَّرُ السقف (ق١٥ ①) ومقرَّرٌ فوقه لا يبلغه طالب (ق١٤) — تنبيهان لا منع' || chr(10)
    || '  if (v_state->''tier''->>''ceiling'') is not null then' || chr(10)
    || '    if (v_state->''level''->>''rank'')::int = (v_state->''tier''->>''ceiling'')::int and v_next is not null then' || chr(10)
    || '      v_probs := v_probs || jsonb_build_array(jsonb_build_object(''code'', ''ceiling'', ''tier'', v_state->''tier''->>''name'',' || chr(10)
    || '                   ''up'', v_state->>''up_tier'', ''next'', v_next->>''name'', ''total'', v_total, ''have'', v_pub));' || chr(10)
    || '    elsif (v_state->''level''->>''rank'')::int > (v_state->''tier''->>''ceiling'')::int then' || chr(10)
    || '      v_probs := v_probs || jsonb_build_array(jsonb_build_object(''code'', ''above_ceiling'', ''tier'', v_state->''tier''->>''name''));' || chr(10)
    || '    end if;' || chr(10)
    || '  end if;' || chr(10) || chr(10)
    || '  ' || p2);
  execute v;
end $$;

-- ═══════════ المنح ═══════════

revoke all on function public.age_of(uuid)                         from public, anon, authenticated;
revoke all on function public.age_tier(bigint, uuid)               from public, anon, authenticated;
revoke all on function public.entry_tier(bigint, bigint, uuid)     from public, anon, authenticated;
revoke all on function public.my_tier(bigint, uuid)                from public, anon, authenticated;
revoke all on function public.my_birthdate()                       from public, anon;
revoke all on function public.set_my_birthdate(date, boolean)      from public, anon;
grant execute on function public.my_birthdate()                    to authenticated;
grant execute on function public.set_my_birthdate(date, boolean)   to authenticated;

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('207', 'العمرُ والطبقة — تاريخُ الميلاد لصاحبه وحده، والطبقةُ تُحفظ مع المستوى', now())
on conflict (n) do update set applied_at = now();
