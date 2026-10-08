-- ═══════════════════════════════════════════════════════════════════════
-- 152 · لوحةُ الإدارة — الطبقةُ السفلى
--
-- بَنى `151` الإغلاق، وهذا يبني البديل. **ولا يُغلق بابٌ إلا ويُفتح بجانبه
-- بابٌ محروس** — وإلا عاد من أُغلق عليه يبحث عن نافذة.
--
-- ═══ ما كشفته قراءةُ الصلاحيات — وهو سببُ كلِّ دالّةٍ هنا ═══
--
-- 🔑 **والصلاحيةُ في بيان أربعُ طبقاتٍ لا طبقة**، قُرئت من الحيّ:
--
--      ① الدور      profiles.role                 ← admin_decide وحدها
--      ② التنسيق    curators                      ← grant_curator · بلا فم
--      ③ المادّة    teacher_subjects              ← بيد المعلّم وحده
--      ④ التحقّق    profiles.author_verified_at   ← المصادِق (120)
--
--    و`can_author = can_curate ∨ (معلّمٌ ∧ متحقَّقٌ ∧ في مادّته)`.
--    **فالتأليفُ يسقط بسقوط أيٍّ من الثلاث، والشاشةُ تقول جملةً واحدة.**
--
-- 🔴 **①  المدير بلا شاشةِ إدارةٍ واحدة.** وجهاتُه الخمس في `DEST` كلُّها
--    وجهاتُ معلّم، وشاشةُ الطلبات تقاعدت في `b90`. ⇒ **السلطةُ قائمةٌ
--    ولا مقعدَ لها.**
--
-- 🔴 **②  بابان موصَدان بلا شكوى — وقيسا:** معلّمان من خمسة بصفر مادّة
--    (`teacher_subjects`) ⇒ `can_author = false` لهما. والشاشةُ تقول «لا
--    تملك التأليف في هذه المادة» **فيُقرأ منعاً مقصوداً لا قفلاً مؤقّتاً**
--    — وهي بحرفها العلّةُ التي جاء `115` يُنهيها، عادت من بابٍ آخر: فتح
--    `115` البابَ للمعلّم **في مادّةٍ يُعلنها هو**، ومن لم يُعلن بقي خارجاً
--    ولا أحدَ يراه. ⇒ `admin_set_teacher_subjects` تجعل الإعلانَ ممكناً
--    من فوق حين يسهو صاحبُه.
--
-- 🔴 **③  ولا سجلَّ تدقيقٍ إطلاقاً.** `curators.added_by` عمودٌ وحيد، ولا
--    أثرَ لتغييرِ دورٍ قطّ. **ولوحةٌ تمنح الصلاحيات بلا سجلٍّ تُنشئ سلطةً
--    بلا ذاكرة** — وهي أخطرُ من غياب اللوحة، لأنّ الغيابَ يُرى.
--
-- ═══ قراراتٌ لا تُقرأ من الشيفرة ═══
--
-- 🔑 **`admin_log` بلا منحٍ لأحد — وهذا حرزُها لا سهوُها.** تُنادى من
--    جوف دوالَّ `security definer` يملكها `postgres`، و`current_user`
--    داخلها `postgres` ⇒ **تمرّ بلا منح**. ولو مُنحت لـ`authenticated`
--    لاستطاع مديرٌ أن يُلفّق سطرَ تدقيقٍ بيده. **والسجلُّ الذي يُكتب بيد
--    من يُراقَب ليس سجلّاً.**
--
-- 🔑 **و`admin_audit` بلا مفاتيحَ خارجية عمداً**، ويحمل الاسمَ والبريدَ
--    نصّاً لا مرجعاً. **سجلٌّ يُمحى بمحو صاحبه ليس سجلّاً** — ولو رُبط
--    بـ`profiles` لَمَا بقي من حذفِ حسابٍ أثرٌ يُقرأ. (ونظيرُه في المنصّة
--    قائم: `practice_responses.dx_code` بلا مفتاحٍ لأنّ نصَّه في اللقطة.)
--
-- 🔑 **والخفضُ دون المعلّم يسحب التنسيق — ويُعلنه ولا يُخفيه.** `can_curate`
--    **لا تسأل عن الدور أصلاً**: صفٌّ في `curators` يكفي. فطالبٌ خُفض
--    وبقي صفُّه **يُنشئ الدروسَ وينشرها**. ⇒ السحبُ يقع، ويُكتب في
--    `before_state`، وتردّه الدالّةُ لتقوله الشاشة. **منحٌ يُسحب لا محتوًى
--    يُحذف** — ولا يخالف «ما رآه الطالب يُحفظ».
--
-- ⛔ **وما لم يُبنَ عمداً — ولكلٍّ سببُه:**
--    · **منحُ `author_verified_at`** — شهادتُه من المصادِق لا من بشر
--      (`120`: «الواجهة لا تُؤتمن على حراسة نفسها»). واللوحةُ **تعرضه
--      ولا تكتبه**. والخمسةُ كلُّهم متحقّقون اليوم ⇒ **ولا تُبنى دالّةٌ
--      بلا قارئ** (سابقة `list_quizzes`).
--    · **حذفُ الحسابات** — قرارٌ مستقلٌّ يستحقّ ملفَّه وتجربتَه الجافّة.
--
-- 🟡 **وطبقةُ الحراسة الثانية التي وعد بها `151`:** جسدُ `make_admin` و
--    `make_teacher` ما زال بلا حارس، ومنحُهما مسحوب. **ولم تُستبدل هنا
--    أيضاً** — لا تُجمع جراحةُ جسدِ دالّةٍ حيّة مع بناءِ طبقةٍ جديدة في
--    ملفٍّ واحد (حادثة ٥ سبتمبر). ⇒ ملفٌّ يخصّها، ومعه `58`.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ①  منشأ — سجلُّ التدقيق
-- ═══════════════════════════════════════════════════════════════════════

create sequence if not exists public.admin_audit_id_seq;

create table if not exists public.admin_audit (
  id           bigint      primary key default nextval('public.admin_audit_id_seq'),
  actor_id     uuid,                       -- 🔒 بلا مفتاحٍ خارجيّ: انظر الرأس
  actor_name   text,
  action       text        not null,
  target_id    uuid,
  target_name  text,
  target_email text,
  before_state jsonb,
  after_state  jsonb,
  note         text,
  at           timestamptz not null default now()
);

alter table public.admin_audit drop constraint if exists admin_audit_action_ck;
alter table public.admin_audit add  constraint admin_audit_action_ck
  check (action in ('role','curator','subjects','request'));

create index if not exists admin_audit_at_ix on public.admin_audit (at desc);

alter table public.admin_audit enable row level security;

-- القراءةُ للمدير وحده · ولا سياسةَ كتابةٍ البتّة ⇒ لا يُكتب إلا بدالّة
drop policy if exists admin_audit_read on public.admin_audit;
create policy admin_audit_read on public.admin_audit
  for select to authenticated using (is_admin());

grant select on public.admin_audit to authenticated;

/* 🔴 **ولا يكفي `grant select` — لا بدّ من سحبِ ما لم يُمنح بيد.** Supabase
   يضع امتيازاتٍ افتراضية على كلّ جدولٍ جديد في `public` **تشمل الكتابة**
   لـ`anon` و`authenticated`. قيس بعد الإنشاء: `insert`/`update`/`delete`
   كلُّها ✅ بلا سطرٍ واحدٍ يمنحها. وRLS كان يحجبها (لا سياسةَ كتابة)،
   **لكنّها طبقةٌ واحدة حيث ينبغي طبقتان** — وسياسةٌ تُضاف يوماً بسهوٍ
   تفتح ما ظنّه كاتبُها مغلقاً. */
revoke insert, update, delete, truncate on public.admin_audit from anon, authenticated;

comment on table public.admin_audit is
  'سجلُّ تدقيقِ الصلاحيات (152). بلا مفاتيحَ خارجية عمداً، ويحمل الاسمَ '
  'والبريدَ نصّاً: سجلٌّ يُمحى بمحو صاحبه ليس سجلّاً. ولا يُكتب إلا من '
  'جوف دوالّ admin_* — ولا سياسةَ كتابةٍ عليه.';


/* الكاتبُ الداخليّ — بلا منحٍ لأحد. حرزُها في الرأس. */
create or replace function public.admin_log(
  p_action text, p_target uuid, p_before jsonb, p_after jsonb, p_note text default null)
returns void language plpgsql security definer set search_path to 'public', 'auth' as $function$
begin
  insert into admin_audit (actor_id, actor_name, action, target_id,
                           target_name, target_email, before_state, after_state, note)
  values (auth.uid(),
          (select full_name from profiles where id = auth.uid()),
          p_action, p_target,
          (select full_name from profiles where id = p_target),
          (select u.email::text from auth.users u where u.id = p_target),
          p_before, p_after, nullif(btrim(coalesce(p_note,'')), ''));
end $function$;

revoke execute on function public.admin_log(text, uuid, jsonb, jsonb, text)
  from public, anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ②  منشأة — النظرةُ الأولى
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_overview()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $function$
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;
  return jsonb_build_object(
    'students',  (select count(*) from profiles where role = 'student'),
    'teachers',  (select count(*) from profiles where role = 'teacher'),
    'admins',    (select count(*) from profiles where role = 'admin'),
    'pending',   (select count(*) from profiles where role = 'pending_teacher'),
    'curators',  (select count(*) from curators),
    'requests',  (select count(*) from teacher_requests where status = 'pending'),
    'subjects',  (select count(*) from subjects where active),
    'quizzes',   (select count(*) from quizzes where published),
    'questions', (select count(*) from questions where retired_at is null),
    'attempts',  (select count(*) from attempts));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ③  منشأة — الحسابات، وبجانب كلِّ حسابٍ طبقاتُه الأربع
--     🔑 والـ`can_author` تُحسب هنا لا في الواجهة: **المعنى بالدالّة**،
--        وحسابُه في JS يُنشئ نسخةً ثانيةً من القانون تنحرف.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_users(p_q text default null, p_role text default null)
returns jsonb language plpgsql stable security definer set search_path to 'public', 'auth' as $function$
declare v jsonb;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  select coalesce(jsonb_agg(x order by x->>'name'), '[]'::jsonb) into v from (
    select jsonb_build_object(
      'id',        p.id,
      'name',      p.full_name,
      'email',     u.email::text,
      'role',      p.role,
      'gram',      p.gram_gender,
      'klass',     p.klass,
      'school',    p.school,
      'verified',  p.author_verified_at is not null,
      'created',   p.created_at,
      'subjects',  (select coalesce(jsonb_agg(jsonb_build_object(
                             'id', s.id, 'name', s.name,
                             'capacity', t.capacity, 'accepting', t.accepting)
                           order by s.name), '[]'::jsonb)
                      from teacher_subjects t join subjects s on s.id = t.subject_id
                     where t.teacher_id = p.id),
      /* نطاقُ التنسيق: صفٌّ بلا مادّة = كلُّ المواد */
      'curator',   (select coalesce(jsonb_agg(jsonb_build_object(
                             'subject_id', c.subject_id,
                             'name', coalesce(s2.name, 'كل المواد'))
                           order by coalesce(s2.name, '')), '[]'::jsonb)
                      from curators c left join subjects s2 on s2.id = c.subject_id
                     where c.user_id = p.id),
      /* الخلاصةُ الصادقة: أيؤلّف أم لا، وبأيّ طريق */
      'can_author', p.role = 'admin'
                 or exists (select 1 from curators c where c.user_id = p.id)
                 or (p.role = 'teacher'
                     and p.author_verified_at is not null
                     and exists (select 1 from teacher_subjects t where t.teacher_id = p.id)),
      'attempts',  (select count(*) from attempts a where a.user_id = p.id)
    ) as x
    from profiles p
    left join auth.users u on u.id = p.id
    where (p_role is null or p.role = p_role)
      and (p_q is null or btrim(p_q) = ''
           or p.full_name ilike '%' || btrim(p_q) || '%'
           or u.email::text ilike '%' || btrim(p_q) || '%')
  ) z;

  return v;
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ④  منشأة — تغييرُ الدور
--     🔒 وحارسان لا حارس: صلاحيةُ المدير · **وألّا يبقى بلا مدير**.
--        ولا يُفرَد «لا يخفض نفسه»: آخرُ مديرٍ يخفض نفسَه هو عينُ الحالة،
--        وشرطٌ واحدٌ أصدقُ من شرطين يتداخلان (القاعدة ④).
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_set_role(
  p_user uuid, p_role text, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_old text; v_name text; v_dropped jsonb;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة');
  end if;

  if p_role not in ('student','pending_teacher','teacher','admin') then
    return jsonb_build_object('ok', false, 'error', 'دورٌ غير معروف: ' || coalesce(p_role,'—'));
  end if;

  select role, full_name into v_old, v_name from profiles where id = p_user;
  if v_old is null then
    return jsonb_build_object('ok', false, 'error', 'لا حساب بهذا المعرّف');
  end if;

  if v_old = p_role then
    return jsonb_build_object('ok', false, 'error', v_name || ' على هذا الدور أصلاً');
  end if;

  -- 🔒 الحارسُ الذي يمنع قفلَ الباب من الداخل
  if v_old = 'admin' and p_role <> 'admin'
     and (select count(*) from profiles where role = 'admin') <= 1 then
    return jsonb_build_object('ok', false,
      'error', 'هذا آخرُ مدير — لا تُخفض رتبتُه قبل أن يُرفَع غيرُه. وإلا بقيت المنصّة بلا إدارة.');
  end if;

  update profiles set role = p_role where id = p_user;

  /* التنسيقُ يسقط بسقوط الدور — ويُعلَن (انظر الرأس) */
  v_dropped := '[]'::jsonb;
  if p_role in ('student','pending_teacher') then
    select coalesce(jsonb_agg(coalesce(s.name, 'كل المواد') order by coalesce(s.name,'')), '[]'::jsonb)
      into v_dropped
      from curators c left join subjects s on s.id = c.subject_id
     where c.user_id = p_user;
    delete from curators where user_id = p_user;
  end if;

  perform admin_log('role', p_user,
    jsonb_build_object('role', v_old, 'curator', v_dropped),
    jsonb_build_object('role', p_role), p_note);

  return jsonb_build_object('ok', true, 'name', v_name,
    'from', v_old, 'to', p_role, 'curator_dropped', v_dropped);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤  معدَّلتان لا منشأتان — grant_curator · revoke_curator
--     قُرئتا حيّتين بـ`pg_get_functiondef` قبل الاستبدال (⓪·ب ①)، والفرقُ
--     سطرُ تدقيقٍ يُضاف وردٌّ يُثرى. وما عداه محفوظٌ بحرفه: التوقيعُ
--     والحارسُ والرسائلُ و`on conflict`.
--     🔑 **ولماذا تُمسّان أصلاً:** لو بقيتا بلا تدقيق لبقي للمنصّة بابان
--        للمنح، أحدُهما يُسجَّل والآخرُ لا. **وسجلٌّ له طريقٌ يلتفّ حوله
--        ليس سجلّاً.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.grant_curator(p_email text, p_subject bigint default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_uid uuid; v_name text; v_scope text; v_new boolean;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'المدير وحده يمنح صلاحية التنسيق');
  end if;
  select u.id into v_uid from auth.users u where lower(u.email) = lower(btrim(p_email));
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'لا حساب بهذا البريد');
  end if;
  if p_subject is not null and not exists (select 1 from subjects where id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  insert into curators (user_id, subject_id, added_by)
  values (v_uid, p_subject, auth.uid())
  on conflict (user_id, coalesce(subject_id, 0)) do nothing;

  get diagnostics v_new = row_count;          -- 0 ⇒ كان ممنوحاً، فلا سطرَ تدقيق
  select full_name into v_name from profiles where id = v_uid;
  v_scope := coalesce((select name from subjects where id = p_subject), 'كل المواد');

  if v_new then
    perform admin_log('curator', v_uid, null,
      jsonb_build_object('granted', v_scope, 'subject_id', p_subject), null);
  end if;

  return jsonb_build_object('ok', true, 'name', v_name, 'scope', v_scope, 'changed', v_new);
end $function$;


create or replace function public.revoke_curator(p_email text, p_subject bigint default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_uid uuid; v_scope text; v_hit boolean;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'المدير وحده يسحب صلاحية التنسيق');
  end if;
  select u.id into v_uid from auth.users u where lower(u.email) = lower(btrim(p_email));

  delete from curators
   where user_id = v_uid and coalesce(subject_id, 0) = coalesce(p_subject, 0);

  get diagnostics v_hit = row_count;
  v_scope := coalesce((select name from subjects where id = p_subject), 'كل المواد');

  if v_hit then
    perform admin_log('curator', v_uid,
      jsonb_build_object('revoked', v_scope, 'subject_id', p_subject), null, null);
  end if;

  return jsonb_build_object('ok', true, 'scope', v_scope, 'changed', v_hit);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑥  منشأة — التنسيق بالمعرّف لا بالبريد
--     🔑 اللوحةُ تملك `uuid` ولا تعرف البريد ضرورةً. ونداءٌ يُطالَب ببريدٍ
--        يُجبر الشاشةَ على حملِه، فيصير البريدُ مفتاحاً وهو ليس بمفتاح.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_set_curator(
  p_user uuid, p_subject bigint, p_on boolean, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_name text; v_scope text; v_hit boolean;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة');
  end if;

  select full_name into v_name from profiles where id = p_user;
  if v_name is null then
    return jsonb_build_object('ok', false, 'error', 'لا حساب بهذا المعرّف');
  end if;
  if p_subject is not null and not exists (select 1 from subjects where id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  v_scope := coalesce((select name from subjects where id = p_subject), 'كل المواد');

  if p_on then
    insert into curators (user_id, subject_id, added_by)
    values (p_user, p_subject, auth.uid())
    on conflict (user_id, coalesce(subject_id, 0)) do nothing;
    get diagnostics v_hit = row_count;
    if v_hit then
      perform admin_log('curator', p_user, null,
        jsonb_build_object('granted', v_scope, 'subject_id', p_subject), p_note);
    end if;
  else
    delete from curators
     where user_id = p_user and coalesce(subject_id, 0) = coalesce(p_subject, 0);
    get diagnostics v_hit = row_count;
    if v_hit then
      perform admin_log('curator', p_user,
        jsonb_build_object('revoked', v_scope, 'subject_id', p_subject), null, p_note);
    end if;
  end if;

  return jsonb_build_object('ok', true, 'name', v_name, 'scope', v_scope,
    'on', p_on, 'changed', v_hit);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑦  منشأة — من يُنسّق اليوم
--     📌 وما كان لها وجودٌ قطّ: يُمنح التنسيقُ ويُسحب، ولا سبيلَ لرؤية من
--        يملكه. **صلاحيةٌ لا تُرى لا تُراجَع.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_curators()
returns jsonb language plpgsql stable security definer set search_path to 'public', 'auth' as $function$
declare v jsonb;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'user_id', c.user_id, 'name', p.full_name, 'email', u.email::text,
           'role', p.role, 'subject_id', c.subject_id,
           'scope', coalesce(s.name, 'كل المواد'),
           'added_at', c.added_at,
           'added_by', (select full_name from profiles where id = c.added_by))
         order by p.full_name, coalesce(s.name, '')), '[]'::jsonb) into v
    from curators c
    join profiles p on p.id = c.user_id
    left join auth.users u on u.id = c.user_id
    left join subjects s on s.id = c.subject_id;

  return v;
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑧  منشأة — موادُّ المعلّم من فوق
--     🔑 **تُبقي `capacity` و`accepting` لما بقي.** فلو مسحت وأعادت
--        الإدراجَ لعادت كلُّ سعةٍ إلى ٤٠ وكلُّ بابٍ مغلقٍ مفتوحاً —
--        **إصلاحٌ يكسر ما لم يُطلب منه.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_set_teacher_subjects(
  p_teacher uuid, p_subjects bigint[], p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_role text; v_name text; v_before jsonb; v_after jsonb; v_ids bigint[];
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة');
  end if;

  select role, full_name into v_role, v_name from profiles where id = p_teacher;
  if v_role is null then
    return jsonb_build_object('ok', false, 'error', 'لا حساب بهذا المعرّف');
  end if;
  if v_role not in ('teacher','admin') then
    return jsonb_build_object('ok', false,
      'error', v_name || ' ليس معلّماً — يُرفَع دورُه أوّلاً ثمّ تُسنَد المواد');
  end if;

  v_ids := coalesce(p_subjects, '{}'::bigint[]);

  if exists (select 1 from unnest(v_ids) x
              where not exists (select 1 from subjects s where s.id = x)) then
    return jsonb_build_object('ok', false, 'error', 'في القائمة مادّةٌ غير موجودة');
  end if;

  select coalesce(jsonb_agg(s.name order by s.name), '[]'::jsonb) into v_before
    from teacher_subjects t join subjects s on s.id = t.subject_id
   where t.teacher_id = p_teacher;

  delete from teacher_subjects
   where teacher_id = p_teacher and not (subject_id = any(v_ids));

  insert into teacher_subjects (teacher_id, subject_id)
  select p_teacher, x from unnest(v_ids) x
  on conflict (teacher_id, subject_id) do nothing;   -- ⇐ السعةُ والقبولُ يبقيان

  select coalesce(jsonb_agg(s.name order by s.name), '[]'::jsonb) into v_after
    from teacher_subjects t join subjects s on s.id = t.subject_id
   where t.teacher_id = p_teacher;

  if v_before <> v_after then
    perform admin_log('subjects', p_teacher,
      jsonb_build_object('subjects', v_before),
      jsonb_build_object('subjects', v_after), p_note);
  end if;

  return jsonb_build_object('ok', true, 'name', v_name,
    'before', v_before, 'after', v_after, 'changed', v_before <> v_after);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑨  منشأة — قراءةُ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_audit_list(p_limit integer default 60)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $function$
declare v jsonb;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  select coalesce(jsonb_agg(to_jsonb(z) order by z.at desc), '[]'::jsonb) into v
    from (select id, actor_name, action, target_name, target_email,
                 before_state, after_state, note, at
            from admin_audit
           order by at desc
           limit greatest(1, least(coalesce(p_limit, 60), 500))) z;

  return v;
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑩  منشأة — نبضُ المنصّة
--     🔑 **لكلّ فحصٍ سطرُه وحكمُه** (القاعدة ④). وفحصٌ واحدٌ على ثمانية
--        أشياء يُنتج «فشلاً» لا يعني شيئاً، **ويُدرِّب الناظرَ على تجاهل
--        الإنذار — وذاك أسوأ من غياب الفحص.**
--     ⚠️ و`open_definer` **مرشَّحٌ للمراجعة لا حكمٌ بثغرة**: يُصاد بنمطٍ
--        نصّيّ على جسد الدالّة، فدالّةٌ تحرس بطريقٍ آخر تظهر فيه ظلماً.
--        **وسُمّي بما هو** — فاسمٌ يَعِد بأكثر ممّا يُعطي يُفقد الثقةَ
--        في اللوحة كلِّها.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.admin_health()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $function$
declare v jsonb;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  with c as (
    select 'teacher_no_subject' as key, 'معلّمون بلا مادّةٍ معلنة' as label,
           'لا يملكون التأليف، والشاشةُ تقول لهم «لا تملك» فيُقرأ منعاً' as why,
           (select count(*) from profiles p where p.role = 'teacher'
             and not exists (select 1 from teacher_subjects t where t.teacher_id = p.id)) as n,
           (select coalesce(string_agg(p.full_name, ' · '), '') from profiles p
             where p.role = 'teacher'
               and not exists (select 1 from teacher_subjects t where t.teacher_id = p.id)) as detail
    union all
    select 'author_unverified', 'معلّمون بلا تحقّق',
           'التحقّقُ شرطُ التأليف (120) — ويُمنح من المصادِق لا من اللوحة',
           (select count(*) from profiles where role = 'teacher' and author_verified_at is null),
           (select coalesce(string_agg(full_name, ' · '), '') from profiles
             where role = 'teacher' and author_verified_at is null)
    union all
    select 'dx_missing', 'خيارات خاطئة بلا كود تشخيص',
           'ميزةُ المنصّة: الطالبُ يُقال له أيُّ خطإٍ وقع فيه لا أنّه أخطأ',
           (select count(*) from options o
              join questions q on q.id = o.question_id
              join question_keys k on k.question_id = q.id
             where q.retired_at is null
               and o.id <> coalesce(k.correct_id, -1)
               and not (o.id = any(coalesce(k.correct_ids, '{}'::bigint[])))
               and not (k.dx_map ? o.id::text)), ''
    union all
    select 'dx_orphan', 'أكواد تشخيصٍ معلَّقة في dx_map',
           '🔴 يقع طالبٌ في الخيار فيرفض المفتاحُ الأجنبيُّ كتابةَ الإجابة ⇒ تسقط المحاولةُ كلُّها',
           (select count(*) from question_keys k, jsonb_each_text(k.dx_map) e
             where not exists (select 1 from dx_codes d where d.code = e.value)),
           (select coalesce(string_agg(distinct e.value, ' · '), '')
              from question_keys k, jsonb_each_text(k.dx_map) e
             where not exists (select 1 from dx_codes d where d.code = e.value))
    union all
    select 'rls_off', 'جداول بلا RLS',
           'مكشوفةٌ لكلّ من يحمل المفتاح العام',
           (select count(*) from pg_class t join pg_namespace ns on ns.oid = t.relnamespace
             where ns.nspname = 'public' and t.relkind = 'r' and not t.relrowsecurity),
           (select coalesce(string_agg(t.relname, ' · '), '')
              from pg_class t join pg_namespace ns on ns.oid = t.relnamespace
             where ns.nspname = 'public' and t.relkind = 'r' and not t.relrowsecurity)
    union all
    select 'rls_no_policy', 'جداول بـRLS بلا سياسةٍ واحدة',
           'اتّجاهٌ آمن لكنّه صامت: لا يقرؤها أحدٌ إلا عبر دالّة',
           (select count(*) from pg_class t join pg_namespace ns on ns.oid = t.relnamespace
             where ns.nspname = 'public' and t.relkind = 'r' and t.relrowsecurity
               and not exists (select 1 from pg_policies pp
                                where pp.schemaname = 'public' and pp.tablename = t.relname)),
           (select coalesce(string_agg(t.relname, ' · '), '')
              from pg_class t join pg_namespace ns on ns.oid = t.relnamespace
             where ns.nspname = 'public' and t.relkind = 'r' and t.relrowsecurity
               and not exists (select 1 from pg_policies pp
                                where pp.schemaname = 'public' and pp.tablename = t.relname))
    union all
    select 'open_definer', 'دوالُّ تُعدِّل · مفتوحةٌ للزائر · بلا حارسٍ ظاهر',
           'مرشَّحاتٌ للمراجعة لا أحكامٌ بثغرة — تُصاد بالنمط، ودَينُ 58 خلفها',
           (select count(*) from pg_proc pr join pg_namespace ns on ns.oid = pr.pronamespace
             where ns.nspname = 'public' and pr.prokind = 'f' and pr.prosecdef
               and pr.provolatile = 'v'
               and has_function_privilege('anon', pr.oid, 'execute')
               and pg_get_functiondef(pr.oid) !~* 'is_admin\(\)|is_teacher\(\)|can_curate|can_author|can_edit|auth\.uid\(\) is null'),
           (select coalesce(string_agg(pr.proname, ' · ' order by pr.proname), '')
              from pg_proc pr join pg_namespace ns on ns.oid = pr.pronamespace
             where ns.nspname = 'public' and pr.prokind = 'f' and pr.prosecdef
               and pr.provolatile = 'v'
               and has_function_privilege('anon', pr.oid, 'execute')
               and pg_get_functiondef(pr.oid) !~* 'is_admin\(\)|is_teacher\(\)|can_curate|can_author|can_edit|auth\.uid\(\) is null')
    union all
    select 'requests_pending', 'طلبات انضمامٍ تنتظر بتّاً',
           'ولا تصل اللوحةَ وحدها: شاشةُ الطلبات تقاعدت في b90',
           (select count(*) from teacher_requests where status = 'pending'), ''
  )
  select jsonb_agg(jsonb_build_object(
           'key', key, 'label', label, 'why', why, 'n', n,
           'detail', nullif(detail, ''),
           'status', case when n = 0 then 'ok'
                          when key in ('dx_orphan','rls_off') then 'bad'
                          else 'warn' end)
         /* 🔑 والترتيبُ بالخطورة لا بالأبجدية — وصيدُه فحصُ متصفّح:
            كان `case when n=0 then 2 else 1 end, key` فسبق `dx_missing`
            (تحذيرٌ) `dx_orphan` (عطلٌ يُسقط محاولةَ طالبٍ كاملة) لأنّ
            الميمَ قبل الواو. **ومن ينظر مرّةً يرى الأوّلَ وحده.** */
         order by case when n = 0                              then 3
                       when key in ('dx_orphan','rls_off')     then 1
                       else                                         2 end,
                  n desc, key) into v
    from c;

  return coalesce(v, '[]'::jsonb);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑪  المنح — صريحةٌ لكلّ دالّة. والقسم ⑧ في المخطّط يسحب الافتراضيّ
--     يوماً، فما لا يحمل منحاً صريحاً يسقط بلا شكوى.
--     📌 و`admin_log` ليست هنا عمداً — حرزُها في الرأس.
-- ═══════════════════════════════════════════════════════════════════════

/* 🔴 **والسحبُ قبل المنح — وإلا كان المنحُ زينةً.** Postgres يمنح
   `EXECUTE` إلى `PUBLIC` تلقائياً على كلّ دالّةٍ جديدة. فدالّةٌ «مُنحت
   للمسجَّل» يناديها الزائرُ أيضاً، ويردّه حارسُها وحده. **وهذا دَينُ `58`
   بعينه في صورةٍ مصغَّرة** — وقيس هنا: الستُّ المنشأة كلُّها كانت مفتوحةً
   لـ`anon` لحظةَ إنشائها. */
revoke execute on function public.admin_overview()                                 from public, anon;
revoke execute on function public.admin_users(text, text)                          from public, anon;
revoke execute on function public.admin_set_role(uuid, text, text)                 from public, anon;
revoke execute on function public.admin_set_curator(uuid, bigint, boolean, text)   from public, anon;
revoke execute on function public.admin_curators()                                 from public, anon;
revoke execute on function public.admin_set_teacher_subjects(uuid, bigint[], text) from public, anon;
revoke execute on function public.admin_audit_list(integer)                        from public, anon;
revoke execute on function public.admin_health()                                   from public, anon;

grant execute on function public.admin_overview()                                   to authenticated;
grant execute on function public.admin_users(text, text)                            to authenticated;
grant execute on function public.admin_set_role(uuid, text, text)                   to authenticated;
grant execute on function public.admin_set_curator(uuid, bigint, boolean, text)     to authenticated;
grant execute on function public.admin_curators()                                   to authenticated;
grant execute on function public.admin_set_teacher_subjects(uuid, bigint[], text)   to authenticated;
grant execute on function public.admin_audit_list(integer)                          to authenticated;
grant execute on function public.admin_health()                                     to authenticated;

-- والمعدَّلتان: منحُهما قائمٌ ويُعاد تأكيدُه (create or replace يُبقيه، والتصريح أصدق)
grant execute on function public.grant_curator(text, bigint)                        to authenticated;
grant execute on function public.revoke_curator(text, bigint)                       to authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑫  الفحص — يُشغَّل بعد التطبيق · سطرٌ لكلّ حالة
-- ═══════════════════════════════════════════════════════════════════════
/*
select 'admin_audit · موجودٌ وRLS عليه' as الفحص,
       case when (select relrowsecurity from pg_class where oid='public.admin_audit'::regclass)
            then '✅' else '🔴' end as الحكم
union all
select 'admin_audit · سياسةُ قراءةٍ واحدة ولا سياسةَ كتابة',
       (select count(*)::text || ' سياسة · ' ||
               coalesce(string_agg(cmd, ','), '—') from pg_policies
         where schemaname='public' and tablename='admin_audit')
union all
select 'admin_log · محجوبةٌ عن المسجَّل',
       case when has_function_privilege('authenticated','public.admin_log(text,uuid,jsonb,jsonb,text)','execute')
            then '🔴 ممنوحة — تُلفَّق بها أسطر' else '✅ محجوبة' end
union all
select 'الثمانُ الجديدة · ممنوحةٌ للمسجَّل',
       (select count(*)::text || ' / 8' from pg_proc p join pg_namespace n on n.oid=p.pronamespace
         where n.nspname='public'
           and p.proname in ('admin_overview','admin_users','admin_set_role','admin_set_curator',
                             'admin_curators','admin_set_teacher_subjects','admin_audit_list','admin_health')
           and has_function_privilege('authenticated', p.oid, 'execute'))
union all
select 'المعدَّلتان · الحارسُ باقٍ فيهما',
       case when pg_get_functiondef('public.grant_curator(text,bigint)'::regprocedure) ~ 'is_admin\(\)'
             and pg_get_functiondef('public.revoke_curator(text,bigint)'::regprocedure) ~ 'is_admin\(\)'
            then '✅ باقٍ' else '🔴 سقط' end
union all
select 'admin_health · تُجيب', (select jsonb_array_length(admin_health())::text || ' فحصاً');
*/

/* ═══ فحصُ التصريف — يكشف خطأً في المتن بلا أن يمسّ صفّاً ═══
   🔑 و`check_function_bodies = off` تؤجّل فحصَ المتن إلى أوّل نداء
      (وهي لازمةٌ هنا: الدوالّ تتنادى). ⇒ **الإنشاءُ ينجح والمتنُ معطوب**،
      ولا يظهر إلا عند مديرٍ يضغط زرّاً. وهذه تُصرِّفها الآن:
      المعرّفُ أصفارٌ ⇒ يُردّ عند «لا حساب بهذا المعرّف» قبل أيّ كتابة،
      **وقد صُرِّف الجسدُ كلُّه قبل أن يُردّ.**

select  set_config('request.jwt.claims',
          json_build_object('sub', (select id::text from profiles where role='admin' limit 1))::text, true) as _,
        admin_set_role('00000000-0000-0000-0000-000000000000'::uuid, 'student')             as تصريف_الدور,
        admin_set_curator('00000000-0000-0000-0000-000000000000'::uuid, null, true)          as تصريف_التنسيق,
        admin_set_teacher_subjects('00000000-0000-0000-0000-000000000000'::uuid, '{}'::bigint[]) as تصريف_المواد;

   الثلاثُ تُرجع {"ok": false, "error": "لا حساب بهذا المعرّف"} ⇒ ✅ صُرِّفت.
   وأيُّ خطإٍ نحويٍّ في المتن يظهر هنا رسالةً صريحة.                      */


-- ═══════════════════════════════════════════════════════════════════════
-- ⑬  السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('152', 'لوحةُ الإدارة — الطبقةُ السفلى: سجلُّ تدقيقٍ وثماني دوالّ', now())
on conflict (n) do update set applied_at = now();
