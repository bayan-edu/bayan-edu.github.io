-- ══════════════════════════════════════════════════════════════════════
--  ١٨٤ · الوحدةُ العابرة — تُؤلَّف في بيتها مرّة، ويستعيرها مقرَّرٌ آخر بسطر
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٦ أكتوبر): الخطوةُ ٢ من `spec-content-layers.md` (§٣ · §٨) على النسق الذي عُرض.
--  وتُغلق ثقبين من §١: ② (`required_quizzes` تحسب «المطلوب» بصفّ الملفّ الشخصيّ) و④
--  (`can_access_lesson` لا تعرف المقرَّر).
--
--  🔑 **ولماذا سطرٌ لا نسخة:** الوحدةُ تُحرَّر في بيتها وحده — ونسختان من درسٍ واحد تتفارقان، ويتفرّق
--     تقدّمُ الطالب عليهما. والتقدّمُ على المصدر والاختبار لا على المقرَّر، فيتبع الدرسَ حيث ظهر.
--
--  وتسعةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **العضويّةُ في موضعٍ واحد:** `course_lessons()` العلاقةُ نفسُها — دروسُ المقرَّر من وحداته ومن كلّ
--     وحدةٍ استعارها — و`lesson_member()` سؤالُها: «أهذا الدرس من مقرَّراتي، في بيته أو مستعاراً؟».
--     والأولى SQL بلا `security definer` **عمداً**: تُطوى في نداءاتها فيبلغ الشرطُ فهارسَ الجدولين،
--     ودالّةٌ مغلقةٌ تُحسب لكلّ درسٍ أبطأ. وأبوابُها مغلقة: لا تُنادى إلا من دالّة.
--  ② **حارسُ السطر** — الشروطُ الأربعة في §٣ وخامسٌ: المادّةُ نفسها · الصفُّ نفسه (`is not distinct from`)
--     · لا تُستعار إلى بيتها · لا درسَ فيها يتطلّب درساً خارجها (وإلّا قُفل في المستعير أبداً) · ولا
--     وحدةَ بعنوانها في المقرَّر (وحدتان بعنوانٍ واحد في شجرة الطالب). في دالّةٍ واحدة (`unit_link_problem`)
--     تقرؤها `link_unit` لرسالتها، والمشغّلُ لكلّ كاتب.
--  ③ 🔑 **والحارسُ يبقى بعد الاستعارة — زيادةٌ على حرف §٣ تُعرض:** مشغّلٌ على `lessons` يردّ متطلَّباً يخرج
--     من وحدةٍ مستعارة (من الجهتين)، **ويردّ حفظَ درسٍ عابرٍ من المقرَّر المستعير** — وهو الخطرُ الذي سمّته
--     §٣ («ينقله من بيته»). ومشغّلٌ على `courses` يردّ تغييرَ صفّ المقرَّر أو مادّته وله استعارة. وكلاهما
--     لا يعمل إلا حيث استعارة: لا شيءَ يتغيّر اليوم. وحذفُ وحدةٍ مستعارة يردّه القيدُ (`restrict`).
--  ④ **ودرسٌ يبلغه الطالبُ من مقرَّرين من مقرَّراته** (بيتٌ ومستعيرٌ ظاهران له معاً) يُعرض مرّةً ويُعدّ مرّة،
--     وبيتُه أولى (`distinct on` · `count(distinct)`).
--  ⑤ **الثقب ④:** `can_access_lesson` + العضويّة ⇐ ويتبعها البحثُ والبطاقاتُ والاختبارُ والقراءة (تسعُ دوالّ
--     وسياستا صفّ تناديها)، بكلفة ١٫٧٥ م.ث للفحص (⑧). قِيس (٢٦ أكتوبر): لا طالبَ حقيقيّاً له تقدّمٌ في درسٍ
--     خارج مقرَّراته — إلا الحسابَ التجريبيّ في درسين مصريّين يحجبهما الصفُّ أصلاً.
--  ⑥ 🔴 **الثقب ②:** `required_quizzes` بالطالب لا بالصفّ ⇒ توقيعٌ جديد (`p_user`)، **والقديمُ يُسقط في المعاملة
--     نفسها** بعد ترقيع مناديه الوحيد (`student_performance`) — **إسقاطٌ يحتاج إذناً.** وحارسُها حارسُ
--     `lesson_progress` (صاحبُه أو من يُعلّمه)، ومع `p_subject` الفارغ موادُّ الملفّ وحدها كأختها.
--     وقِيس: لا أثرَ له اليوم (المقرَّراتُ الأربعة بلا صفّ بلا درسٍ منشور) — ويقع مع أوّل درسٍ في القدرات.
--  ⑦ **ترقيعٌ في الحيّة لا نسخٌ لها** (مهارةُ الانضباط · §٣): عشرُ دوالّ بخمسةٍ وعشرين مرسى، قِيس كلٌّ بعدده
--     في الحيّة (٢٦ أكتوبر)، ومعها `required_quizzes` بتوقيعها الجديد. سبعٌ منها في §٣، وأربعٌ يقتضيها القياسُ
--     أو الواجهةُ أو التوقيع: `courses_of` (⑧) و`author_tree` و`author_lessons` (شجرةُ التأليف بشارتيها)
--     و`student_performance`.
--  ⑧ 🔴 **و`courses_of` تأخذ مقرَّراً اختياريّاً (`p_course`) — كشفه القياس (٢٦ أكتوبر):** سؤالُ العضويّة يناديها
--     مع كلّ فحصٍ لدرس، فتحسب مقرَّراتِ الطالب كلَّها كلَّ مرّة: ١٤٫٣ م.ث، فيها ٣٧ نداءً لـ`can_view_level`
--     و٤٣ لـ`my_level_id`. **ومع المقرَّر يُحسب شرطُها له وحده:** ٣٤ فحصاً ٤٨٥ ⇐ ٦٠ م.ث، والعضويّةُ ومقرَّراتُ
--     خمسة مستخدمين كما هي. والجسدُ واحدٌ لا نسختان: سطرٌ في `where` يُرقَّع على الحيّة، ومنادوها بوسيطٍ
--     واحد كما هم. **والتوقيعُ القديم يُسقط قبل أن يُنادى — إسقاطٌ يحتاج إذناً:** التوقيعان معاً يلتبس بهما
--     كلُّ نداءٍ بوسيطٍ واحد.
--     وجُرِّب طيُّها أوّلاً (`security invoker` بلا `search_path`) فلم يُغنِ: المخطِّطُ يحسب شرطَها للمقرَّرات
--     كلِّها ثمّ يصل بالدرس.
--  ⑨ **و`list_lessons` تبني الدرسَ مرّةً لا أربعاً — أثرٌ قِيس فيُعلن:** كان استعلامُها الداخليّ يُطوى في
--     `jsonb_agg(x order by …)`، فيُحسب `x` بنداءاته كلِّها مرّةً للتجميع وثلاثاً لمفاتيح الترتيب: ١٣٦ نداءً
--     لـ`can_access_lesson` و٩٢٤ لـ`can_see_deck` لسبعة عشر درساً. و`distinct on` الذي يقتضيه ④ يمنع الطيّ:
--     ٣٤ و٢٣١. ⇐ وهذا أصلُ بطئها القائم (٨٧٠ م.ث)، **فلا يُحذف `distinct on` ولو بدا زائداً.**
--     ⚠️ والنمطُ نفسُه في `list_subjects` (ثلاثاً) ودوالَّ غيرِها — خارج هذا الملفّ.
--
--  📐 وما ليس هنا عمداً:
--  · `save_lesson` و`save_unit` لا تُمسّان (§٣): الوحدةُ العابرة تُحرَّر في بيتها، والمشغّلُ يحرس.
--    ⚠️ وحدٌّ معلن: إعادةُ تسمية وحدةٍ بعنوان وحدةٍ مستعارة في مقرَّرها لا تُردّ — تُردّ الاستعارةُ وحدها.
--  · البنوكُ والنماذج (الخطوة ٣) · صفوفُ القدرات (الخطوة ٤) · شاشةُ التأليف (بعد الإذن).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ تمهيد — courses_of قبل كلّ ما يناديها ═══════════════════

-- المُرقِّع (رأس الملفّ ⑦): أثلاثُ [مرسى، بديل، عدد] على الحيّة — والعددُ ما قِيس أو لا شيء.
-- والجسدُ الذي أسطرُه `\r\n` يأخذ المرسى والبديلَ بها.
create or replace function pg_temp.patch184(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; k int; n int;
        crlf boolean := position(E'\r' in pg_get_functiondef(p_fn)) > 0;
begin
  if coalesce(array_length(p_patches, 1), 0) % 3 <> 0 then
    raise exception '184 · %: المراسي أثلاثٌ [مرسى، بديل، عدد]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 3 loop
    a := p_patches[i];
    b := p_patches[i + 1];
    k := p_patches[i + 2]::int;
    if crlf then a := replace(a, E'\n', E'\r\n'); b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> k then
      raise exception '184 · %: وُجد المرسى «%» % مرّةً لا % — لا يُرقَّع على الظنّ', p_fn, a, n, k;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;

-- ⓪ courses_of بمقرَّرٍ اختياريّ (رأس الملفّ ⑧): نصُّها الحيّ يُرقَّع إلى توقيعٍ جديد — والجسدُ واحد
do $$
begin
  if to_regprocedure('public.courses_of(uuid,bigint)') is not null then
    raise notice '184: courses_of بمقرَّرٍ اختياريّ قائمةٌ من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.courses_of(uuid)', array[
    $a$CREATE OR REPLACE FUNCTION public.courses_of(p_user uuid)$a$,
    $b$CREATE OR REPLACE FUNCTION public.courses_of(p_user uuid, p_course bigint DEFAULT NULL::bigint)$b$, '1',

    $a$where c.active and s.active$a$,
    $b$where c.active and s.active
    and (p_course is null or c.id = p_course)   -- 184 · مقرَّرٌ بعينه: شرطُه له وحده لا للمقرَّرات كلِّها$b$, '1']);
end $$;

--  ⛔ الإسقاطُ — شرطُ عملٍ لا تنظيف، ويحتاج إذناً (رأس الملفّ ⑧): التوقيعان معاً يلتبس بهما كلُّ نداءٍ
--     بوسيطٍ واحد، فيسقط القديمُ قبل أن يُنشأ ما يناديها أدناه
drop function if exists public.courses_of(uuid);


-- ═══════════════════ منشأة ═══════════════════

-- ① الاستعارةُ سطر — والمفتاح (مقرَّر · وحدة)
create table if not exists public.unit_links (
  course_id bigint  not null references public.courses(id) on delete cascade,
  unit_id   bigint  not null references public.units(id)   on delete restrict,
  position  integer not null default 0,
  primary key (course_id, unit_id)
);
create index if not exists unit_links_unit on public.unit_links (unit_id);

comment on table public.unit_links is
  'استعارةُ وحدةٍ في مقرَّرٍ غيرِ بيتها: تظهر فيه بموضعها هنا، وتُحرَّر في بيتها وحده. وحذفُ الوحدة يُردّ ما بقيت الاستعارة (184)';
comment on column public.unit_links.position is
  'موضعُ الوحدة المستعارة بين وحدات المقرَّر المستعير — لا موضعُها في بيتها (184)';

-- ② العضويّة — العلاقةُ في موضعٍ واحد (رأس الملفّ ①)، وسؤالُها بشرط مقرَّرات الدرس وحدها (⑧)
create or replace function public.course_lessons()
returns table(course_id bigint, lesson_id bigint, unit_pos integer, borrowed boolean)
language sql stable
as $function$
  select l.course_id, l.id, coalesce(u.position, 0), false
    from public.lessons l
    left join public.units u on u.id = l.unit_id
   where l.course_id is not null
  union all
  select ul.course_id, l.id, ul.position, true
    from public.unit_links ul
    join public.lessons l on l.unit_id = ul.unit_id
$function$;

create or replace function public.lesson_member(p_lesson bigint, p_user uuid)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select exists (select 1 from course_lessons() cl
                  where cl.lesson_id = p_lesson
                    and exists (select 1 from courses_of(p_user, cl.course_id)));
$function$;

-- ③ حارسُ الاستعارة — رسالتُه أو لا شيء (رأس الملفّ ②)
create or replace function public.unit_link_problem(p_course bigint, p_unit bigint)
returns text language plpgsql stable security definer set search_path to 'public'
as $function$
declare v_home bigint; v_title text; b record; h record;
begin
  select u.course_id, u.title into v_home, v_title from units u where u.id = p_unit;
  if v_home is null then return 'الوحدة غير موجودة'; end if;
  select c.subject_id, c.level_id into b from courses c where c.id = p_course;
  if not found then return 'المقرَّر غير موجود'; end if;
  select c.subject_id, c.level_id into h from courses c where c.id = v_home;

  if v_home = p_course then
    return 'الوحدة في مقرَّرها — لا تُستعار إليه';
  end if;
  if b.subject_id <> h.subject_id then
    return 'الاستعارة داخل المادّة نفسها';
  end if;
  if b.level_id is distinct from h.level_id then
    return 'الاستعارة بين مقرَّرين في الصفّ نفسه';
  end if;
  if exists (select 1 from lessons l join lessons r on r.id = l.requires_id
              where l.unit_id = p_unit and r.unit_id is distinct from p_unit) then
    return 'في الوحدة درس يتطلّب درساً خارجها — فيُقفل في المقرَّر المستعير';
  end if;
  if exists (select 1 from units u
              where u.course_id = p_course and norm_ar(u.title) = norm_ar(v_title))
     or exists (select 1 from unit_links ul join units u on u.id = ul.unit_id
                 where ul.course_id = p_course and ul.unit_id <> p_unit
                   and norm_ar(u.title) = norm_ar(v_title)) then
    return 'في المقرَّر وحدة بهذا العنوان';
  end if;
  return null;
end $function$;

-- ④ المشغّلات — الحارسُ لكلّ كاتب، ويبقى بعد الاستعارة (رأس الملفّ ③)
create or replace function public.unit_links_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare v text := unit_link_problem(new.course_id, new.unit_id);
begin
  if v is not null then raise exception '%', v using errcode = 'check_violation'; end if;
  return new;
end $function$;

create or replace function public.lessons_link_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  /* درسٌ في وحدةٍ مستعارة يبقى في مقرَّرها: حفظُه من المستعير كان ينقله إليه (§٣) */
  if new.unit_id is not null
     and exists (select 1 from unit_links ul where ul.unit_id = new.unit_id)
     and new.course_id is distinct from (select u.course_id from units u where u.id = new.unit_id) then
    raise exception 'الوحدة مستعارة — ودرسها يُحرَّر في مقرَّرها' using errcode = 'check_violation';
  end if;
  /* والشرطُ الرابع بعد الاستعارة، من الجهتين: الدرسُ نفسُه، ومن يتطلّبه */
  if exists (select 1 from lessons d
               join lessons r on r.id = d.requires_id
              where (d.id = new.id or d.requires_id = new.id)
                and r.unit_id is distinct from d.unit_id
                and exists (select 1 from unit_links ul where ul.unit_id = d.unit_id)) then
    raise exception 'الوحدة مستعارة في مقرَّر آخر — فلا يتطلّب درس فيها درساً خارجها'
      using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace function public.courses_link_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare v text; r record;
begin
  for r in select ul.course_id, ul.unit_id from unit_links ul
            where ul.course_id = new.id
               or ul.unit_id in (select u.id from units u where u.course_id = new.id) loop
    v := unit_link_problem(r.course_id, r.unit_id);
    if v is not null then
      raise exception 'للمقرَّر استعارة قائمة: %', v using errcode = 'check_violation';
    end if;
  end loop;
  return new;
end $function$;

create or replace trigger unit_links_guard
  before insert or update on public.unit_links
  for each row execute function public.unit_links_guard();
create or replace trigger lessons_link_guard
  after insert or update of unit_id, requires_id, course_id on public.lessons
  for each row execute function public.lessons_link_guard();
create or replace trigger courses_link_guard
  after update of level_id, subject_id on public.courses
  for each row when (old.level_id is distinct from new.level_id
                     or old.subject_id is distinct from new.subject_id)
  execute function public.courses_link_guard();

-- ⑤ الاستعارةُ وإزالتُها — لفريق الإشراف، كإنشاء الوحدات (`save_unit`)
create or replace function public.link_unit(
  p_course bigint, p_unit bigint, p_position integer default null, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* 🔑 والسطرُ القائم يُحدَّث موضعُه بالدالّة نفسها — فالترتيبُ نداءٌ واحد لا بابٌ ثانٍ */
declare v_subject bigint; v_err text; v_before jsonb; v_pos integer;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select c.subject_id into v_subject from courses c where c.id = p_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'استعارة الوحدات لفريق الإشراف');
  end if;
  v_err := unit_link_problem(p_course, p_unit);
  if v_err is not null then
    return jsonb_build_object('ok', false, 'error', v_err);
  end if;

  select to_jsonb(ul) into v_before from unit_links ul
   where ul.course_id = p_course and ul.unit_id = p_unit;
  v_pos := coalesce(p_position, (v_before->>'position')::int,
             greatest(coalesce((select max(u.position)  from units u       where u.course_id  = p_course), 0),
                      coalesce((select max(ul.position) from unit_links ul where ul.course_id = p_course), 0)) + 1);

  insert into unit_links (course_id, unit_id, position)
  values (p_course, p_unit, v_pos)
  on conflict (course_id, unit_id) do update set position = excluded.position;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','unit_links', 'course_id', p_course, 'unit_id', p_unit, 'position', v_pos), p_note);
  return jsonb_build_object('ok', true, 'course_id', p_course, 'unit_id', p_unit, 'position', v_pos);
end $function$;

create or replace function public.unlink_unit(p_course bigint, p_unit bigint, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* السطرُ وحده لا الوحدة: الوحدةُ في بيتها كما كانت، والتقدّمُ على مصادرها باقٍ */
declare v_subject bigint; v_before jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select c.subject_id into v_subject from courses c where c.id = p_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'استعارة الوحدات لفريق الإشراف');
  end if;
  select to_jsonb(ul) into v_before from unit_links ul
   where ul.course_id = p_course and ul.unit_id = p_unit;
  if v_before is null then
    return jsonb_build_object('ok', false, 'error', 'لا استعارة لهذه الوحدة في المقرَّر');
  end if;

  delete from unit_links where course_id = p_course and unit_id = p_unit;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','unit_links', 'course_id', p_course, 'unit_id', p_unit, 'removed', true), p_note);
  return jsonb_build_object('ok', true, 'course_id', p_course, 'unit_id', p_unit);
end $function$;

-- ⑥ «المطلوب» بالطالب لا بالصفّ — توقيعٌ جديد (رأس الملفّ ⑥)
create or replace function public.required_quizzes(
  p_user uuid, p_subject bigint default null, p_strand bigint default null)
returns table(quiz_id bigint, lesson_id bigint, subject_id bigint, pos integer)
language sql stable security definer set search_path to 'public'
as $function$
  select distinct on (i.quiz_id)
         i.quiz_id, i.lesson_id, l.subject_id, l.position as pos
    from courses_of(p_user) m
    join course_lessons() cl on cl.course_id = m.course_id
    join lessons  l on l.id = cl.lesson_id
    join items    i on i.lesson_id = l.id
    join subjects s on s.id = m.subject_id
   where (p_user = auth.uid() or teaches(p_user))
     and m.is_current
     and i.required and i.quiz_id is not null
     and l.published and l.archived_at is null
     and case when p_subject is null then s.placement = 'profile'
              else m.subject_id = p_subject end
     and (p_strand is null or coalesce(i.strand_id, l.strand_id) = p_strand)
   order by i.quiz_id, i.id;   -- اختبارٌ في عنصرين يُنسب لأوّلهما (83)
$function$;


-- ═══════════════════ معدَّلةٌ لا منشأة ═══════════════════
--     (والمُرقِّعُ و courses_of في التمهيد أعلاه)

-- ⑦ can_access_lesson — الثقب ④
do $$
begin
  if position('lesson_member' in pg_get_functiondef('public.can_access_lesson(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '184: العضويّةُ قائمةٌ في can_access_lesson من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.can_access_lesson(bigint,uuid)', array[
    $a$if not can_view_level(r.level_id, p_user) then return false; end if;$a$,
    $b$if not lesson_member(p_lesson, p_user) then return false; end if;   -- 184 · الثقب ④: من مقرَّراته، في بيته أو مستعاراً
  if not can_view_level(r.level_id, p_user) then return false; end if;$b$, '1']);
end $$;

-- ⑧ list_lessons — المستعارةُ بموضعها في المستعير، والدرسُ مرّة
do $$
begin
  if position('course_lessons()' in pg_get_functiondef('public.list_lessons(bigint)'::regprocedure)) > 0 then
    raise notice '184: العضويّةُ قائمةٌ في list_lessons من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.list_lessons(bigint)', array[
    $a$select jsonb_build_object($a$,
    $b$select distinct on (l.id) jsonb_build_object($b$, '1',

    $a$'unit_pos', coalesce(u.position, 0),$a$,
    $b$'unit_pos', mem.unit_pos,                                            -- 184 · وللمستعارة موضعُها هنا$b$, '1',

    $a$join my_courses() mc on mc.course_id = l.course_id$a$,
    $b$join course_lessons() mem on mem.lesson_id = l.id                 -- 184 · في بيته أو مستعاراً
    join my_courses() mc on mc.course_id = mem.course_id$b$, '1',

    $a$join courses c     on c.id = l.course_id$a$,
    $b$join courses c     on c.id = mc.course_id$b$, '1',

    $a$where mc.subject_id = p_subject and l.published and l.archived_at is null$a$,
    $b$where mc.subject_id = p_subject and l.published and l.archived_at is null
    order by l.id, mem.borrowed, mem.course_id   -- 184 · درسٌ يبلغه من مقرَّرين يُعرض مرّة وبيتُه أولى، و distinct on يمنع الطيَّ فيُبنى مرّةً لا أربعاً (⑨)$b$, '1']);
end $$;

-- ⑨ list_subjects — الأعدادُ بالعضويّة، والدرسُ يُعدّ مرّة
do $$
begin
  if position('course_lessons()' in pg_get_functiondef('public.list_subjects()'::regprocedure)) > 0 then
    raise notice '184: العضويّةُ قائمةٌ في list_subjects من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.list_subjects()', array[
    $a$'lessons_total', (select count(*) from lessons ls$a$,
    $b$'lessons_total', (select count(distinct ls.id) from lessons ls$b$, '1',

    $a$'lessons_done',  (select count(*) from lessons ls$a$,
    $b$'lessons_done',  (select count(distinct ls.id) from lessons ls$b$, '1',

    $a$'lessons_review', (select count(*) from lessons ls$a$,
    $b$'lessons_review', (select count(distinct ls.id) from lessons ls$b$, '1',

    $a$join my_courses() m on m.course_id = ls.course_id$a$,
    $b$join course_lessons() mem on mem.lesson_id = ls.id join my_courses() m on m.course_id = mem.course_id$b$, '3']);
end $$;

-- ⑩ lesson_progress — بالعضويّة، والدرسُ مرّة (ويتبعها `student_performance`)
do $$
begin
  if position('course_lessons()' in pg_get_functiondef('public.lesson_progress(uuid,bigint,bigint)'::regprocedure)) > 0 then
    raise notice '184: العضويّةُ قائمةٌ في lesson_progress من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.lesson_progress(uuid,bigint,bigint)', array[
    $a$select l.id, m.subject_id,$a$,
    $b$select distinct on (l.id) l.id, m.subject_id,$b$, '1',

    $a$join lessons  l on l.course_id = m.course_id$a$,
    $b$join course_lessons() mem on mem.course_id = m.course_id      -- 184 · في بيته أو مستعاراً
    join lessons  l on l.id = mem.lesson_id$b$, '1']);
end $$;

-- ⑪ student_performance — «المطلوب» للطالب لا لصفّه (الثقب ②)، ويسقط الصفُّ الذي لم يعد يُقرأ
do $$
begin
  if position('(select uid from me), p_subject' in pg_get_functiondef('public.student_performance(uuid,bigint,bigint)'::regprocedure)) > 0 then
    raise notice '184: student_performance تمرّر الطالبَ من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.student_performance(uuid,bigint,bigint)', array[
    $a$from required_quizzes((select level_id from lvl), p_subject, p_strand) rq$a$,
    $b$from required_quizzes((select uid from me), p_subject, p_strand) rq   -- 184 · دروسُ مقرَّراته لا دروسُ صفّه$b$, '1',

    E'lvl as (\n  select p.level_id from profiles p cross join me where p.id = me.uid\n),\n',
    '', '1']);
end $$;

-- ⑫ course_state — المستعارةُ في `units` بعلامتها واسمِ بيتها: تُؤلَّف هناك لا هنا
do $$
begin
  if position('unit_links' in pg_get_functiondef('public.course_state(bigint)'::regprocedure)) > 0 then
    raise notice '184: المستعارةُ قائمةٌ في course_state من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.course_state(bigint)', array[
    $a$from units un where un.course_id = c.id), '[]'::jsonb),$a$,
    $b$from units un where un.course_id = c.id), '[]'::jsonb)
      -- 184 · والمستعارةُ بعلامتها واسمِ بيتها — تُؤلَّف هناك لا هنا
      || coalesce((select jsonb_agg(jsonb_build_object(
           'id', bu.id, 'title', bu.title, 'position', ul.position, 'borrowed', true,
           'home', jsonb_build_object('course_id', hc.id, 'title', hc.title))
           order by ul.position, bu.id)
         from unit_links ul
         join units bu   on bu.id = ul.unit_id
         join courses hc on hc.id = bu.course_id
        where ul.course_id = c.id), '[]'::jsonb),$b$, '1']);
end $$;

-- ⑬ import_lesson_map — درسٌ تحت عنوان وحدةٍ مستعارة يُردّ: كان يُنشئ وحدةً ثانيةً بالاسم نفسه
do $$
begin
  if position('unit_links' in pg_get_functiondef('public.import_lesson_map(bigint,jsonb,boolean,boolean)'::regprocedure)) > 0 then
    raise notice '184: حارسُ المستعارة قائمٌ في import_lesson_map من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.import_lesson_map(bigint,jsonb,boolean,boolean)', array[
    $a$if array_length(v_err, 1) > 0 then$a$,
    $b$-- 🆕 184 · الوحدةُ المستعارة تُؤلَّف في بيتها — ودرسٌ تحت عنوانها هنا كان يُنشئ وحدةً ثانيةً بالاسم نفسه
  select array_agg('سطر ' || m.seq || ': الوحدة «' || m.unit || '» عابرة — تُؤلَّف في بيتها: ' || hc.title)
    into v_tmp from _map m
    join unit_links ul on ul.course_id = p_course
    join units bu      on bu.id = ul.unit_id
    join courses hc    on hc.id = bu.course_id
   where m.unit is not null and norm_ar(bu.title) = norm_ar(m.unit);
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then$b$, '1']);
end $$;

-- ⑭ author_tree — وحداتُ المقرَّر بشارتيها: «تظهر أيضاً في» للبيت، و«عابرة» للمستعير
do $$
begin
  if position('unit_links' in pg_get_functiondef('public.author_tree()'::regprocedure)) > 0 then
    raise notice '184: الاستعارةُ قائمةٌ في author_tree من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.author_tree()', array[
    $a$'id', u.id, 'title', u.title, 'position', u.position)$a$,
    $b$'id', u.id, 'title', u.title, 'position', u.position)
                    -- 184 · ومن يستعيرها: «تظهر أيضاً في: …»
                    || coalesce((select jsonb_build_object('shared', jsonb_agg(jsonb_build_object(
                                   'course_id', bc.id, 'title', bc.title) order by bc.id))
                                   from unit_links ul join courses bc on bc.id = ul.course_id
                                  where ul.unit_id = u.id having count(*) > 0), '{}'::jsonb)$b$, '1',

    $a$order by u.position) from units u where u.course_id = c.id), '[]'::jsonb))$a$,
    $b$order by u.position) from units u where u.course_id = c.id), '[]'::jsonb)
        -- 184 · والمستعارةُ فيه بعلامتها وبيتِها — تُقرأ هنا وتُحرَّر هناك
        || coalesce((select jsonb_agg(jsonb_build_object(
               'id', bu.id, 'title', bu.title, 'position', ul.position, 'borrowed', true,
               'home', jsonb_build_object('course_id', hc.id, 'title', hc.title))
               order by ul.position)
             from unit_links ul
             join units bu   on bu.id = ul.unit_id
             join courses hc on hc.id = bu.course_id
            where ul.course_id = c.id), '[]'::jsonb))$b$, '1']);
end $$;

-- ⑮ author_lessons — دروسُ المقرَّر في بيتها ومستعارةً، بعلامتها وموضعِ وحدتها فيه
do $$
begin
  if position('course_lessons()' in pg_get_functiondef('public.author_lessons(bigint)'::regprocedure)) > 0 then
    raise notice '184: العضويّةُ قائمةٌ في author_lessons من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch184('public.author_lessons(bigint)', array[
    $a$'unit_id', l.unit_id, 'unit', u.title,$a$,
    $b$'unit_id', l.unit_id, 'unit', u.title, 'borrowed', mem.borrowed,   -- 184 · للقراءة في المستعير$b$, '1',

    $a$) order by coalesce(u.position, 0), l.position), '[]'::jsonb)$a$,
    $b$) order by mem.unit_pos, l.position), '[]'::jsonb)$b$, '1',

    $a$from lessons l$a$,
    $b$from course_lessons() mem
  join lessons l on l.id = mem.lesson_id$b$, '1',

    $a$join courses c on c.id = l.course_id$a$,
    $b$join courses c on c.id = mem.course_id$b$, '1',

    $a$where l.course_id = p_course$a$,
    $b$where mem.course_id = p_course$b$, '1']);
end $$;

--  ⛔ الإسقاطُ — شرطُ عملٍ لا تنظيف، ويحتاج إذناً (رأس الملفّ ⑥): مُناديه الوحيد رُقّع أعلاه
drop function if exists public.required_quizzes(bigint, bigint, bigint);


-- ═══════════════════ الصلاحيات — ثلاثُ طبقات ═══════════════════

-- ① المنح: الأبوابُ الداخليّة مغلقة، والفعلان والمطلوبُ للمسجَّل
revoke all on function public.course_lessons()                       from public, anon, authenticated;
revoke all on function public.lesson_member(bigint, uuid)            from public, anon, authenticated;
revoke all on function public.unit_link_problem(bigint, bigint)      from public, anon, authenticated;
revoke all on function public.unit_links_guard()                     from public, anon, authenticated;
revoke all on function public.lessons_link_guard()                   from public, anon, authenticated;
revoke all on function public.courses_link_guard()                   from public, anon, authenticated;
--    و`courses_of` مغلقةٌ كما كانت: توقيعُها الجديد يولد بمنح الافتراض
revoke all on function public.courses_of(uuid, bigint)               from public, anon, authenticated;
revoke all on function public.link_unit(bigint, bigint, integer, text) from public, anon;
revoke all on function public.unlink_unit(bigint, bigint, text)      from public, anon;
revoke all on function public.required_quizzes(uuid, bigint, bigint) from public, anon;
grant execute on function public.link_unit(bigint, bigint, integer, text) to authenticated;
grant execute on function public.unlink_unit(bigint, bigint, text)      to authenticated;
--    و`student_performance` بصلاحيات مستدعيها — فتحتاج `required_quizzes` منحَ المسجَّل كسابقتها
grant execute on function public.required_quizzes(uuid, bigint, bigint) to authenticated;

--    والجدول: قراءةٌ وحدها — والكتابةُ بالدالّتين (الثابت ⑦)
alter table public.unit_links enable row level security;
revoke all on public.unit_links from anon, authenticated;
grant select on public.unit_links to authenticated;

-- ② الصفّ: كالوحدات نفسها (`p_units_read`) — بنيةُ المقرَّر يقرؤها المسجَّل
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'unit_links'
                                         and policyname = 'p_unit_links_read') then
    alter policy p_unit_links_read on public.unit_links to authenticated
      using (auth.uid() is not null);
  else
    create policy p_unit_links_read on public.unit_links for select to authenticated
      using (auth.uid() is not null);
  end if;
end $pol$;

-- ③ المعنى: في الدوالّ أعلاه — وتعليقُها هنا
comment on function public.courses_of(uuid, bigint) is
  'مقرّراتُ مستخدمٍ بعينه — و my_courses() ظلُّها للمستخدم الحاليّ (179). وذو الشُّعبة لمن اختارها وحده، ومن لم يختر لا يراه (183). مغلقة: تتخطّى RLS. ومع p_course يُحسب شرطُها لذلك المقرَّر وحده: سؤالُ العضويّة (lesson_member) لا يحسب مقرَّراتِ الطالب كلَّها لكلّ درس (184).';
comment on function public.course_lessons() is
  'العضويّةُ في موضعٍ واحد: دروسُ كلّ مقرَّرٍ من وحداته ومن كلّ وحدةٍ استعارها، بموضع الوحدة فيه. SQL بلا security definer لتُطوى في مناديها — ومغلقة (184)';
comment on function public.lesson_member(bigint, uuid) is
  'أهذا الدرس من مقرَّرات الطالب، في بيته أو مستعاراً؟ — سؤالُ can_access_lesson (184 · الثقب ④)';
comment on function public.unit_link_problem(bigint, bigint) is
  'حارسُ الاستعارة: رسالةُ الشرط المخالف أو لا شيء — المادّة · الصفّ · لا إلى بيتها · لا متطلَّبَ خارجها · لا عنوانَ مكرَّر (184)';
comment on function public.link_unit(bigint, bigint, integer, text) is
  'استعارةُ وحدةٍ في مقرَّر، أو نقلُ موضعها فيه — لمن يشرف على المادّة (184)';
comment on function public.unlink_unit(bigint, bigint, text) is
  'إزالةُ الاستعارة: السطرُ وحده، والوحدةُ في بيتها كما كانت (184)';
comment on function public.required_quizzes(uuid, bigint, bigint) is
  'الاختباراتُ المطلوبة للطالب: دروسُ مقرَّراته الحاضرة في بيتها أو مستعارة، لا دروسُ صفّه (184 · الثقب ②). وحلّت محلّ توقيعها بالصفّ وأُسقط في المعاملة نفسها.';


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('184', 'الوحدةُ العابرة — تُؤلَّف في بيتها مرّة، ويستعيرها مقرَّرٌ آخر بسطر', now())
on conflict (n) do update set applied_at = now();
