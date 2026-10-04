-- ══════════════════════════════════════════════════════════════════════
--  ١٤٥ · أكوادُ أهداف الدرس في `course_state` — للمرحلة ③
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: إضافةُ حقلٍ واحدٍ لكلّ درس: `objective_codes`.
--
--  🔑 **ولماذا؟** المرحلةُ ③ (اختبارُ الدرس) تشترط أن يُربط كلُّ سؤالٍ
--  بالهدف الذي يقيسه. وكانت `144` تردّ لكلّ درسٍ **عددَ** أهدافه ولا تردّ
--  أكوادها، و`objectives_index` تردّ أهدافَ المادة كلَّها بلا توزيعٍ على
--  الدروس. ⇒ فالمعلّمُ يعرف أنّ للدرس تسعةَ أهداف ولا يعرف **أيَّها**.
--
--  والبديلُ المرفوض: أن يقرأها من ملفّ التسليم `index/<المقرّر>.json`.
--  فذاك الملفُّ **لقطةُ ما سُلّم**، والمشرفُ يحرّر الأهدافَ بعده في شاشة
--  «أهداف المادة» (`143`) — فتفترق اللقطةُ عن الحقيقة بلا إشعار. وقد
--  قلناها في `144`: **الملفُّ يَبلى ولا يُنبِئ، والقاعدةُ لا تبلى.**
--
--  وقرارٌ واحدٌ يُقرأ ولا يُستنتج:
--
--  ① **إضافةٌ لا استبدال.** حقلُ `objectives` (العدد) باقٍ كما هو — فهو
--     الذي يُشتقّ منه طورُ المقرّر في `tools/make_requests.py`. وتغييرُ
--     شكلِ حقلٍ قائمٍ يكسر قارئاً لا تراه.
-- ══════════════════════════════════════════════════════════════════════

create or replace function public.course_state(p_course bigint)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare v_subject bigint; v jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject
    from courses c where c.id = p_course and c.active;

  if v_subject is null then
    return jsonb_build_object('ok', false,
      'error', 'المقرّر غير موجود أو معطَّل');
  end if;

  if not can_author(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  select jsonb_build_object(
    'ok', true,
    'generated_at', to_char(now() at time zone 'Asia/Riyadh',
                            'YYYY-MM-DD"T"HH24:MI:SS+03:00'),
    'db_migration', (select max(sql_log_sort(n))::text from sql_log),

    'course_id', c.id,
    'subject', sb.name, 'subject_code', sb.code,
    'level', lv.name, 'title', c.title,

    'strands', coalesce((select jsonb_agg(jsonb_build_object(
        'code', st.code, 'name', st.name,
        'parent', (select p.code from strands p where p.id = st.parent_id))
        order by st.sort_order, st.id)
      from strands st where st.subject_id = c.subject_id), '[]'::jsonb),

    'objectives_index', coalesce((select jsonb_agg(jsonb_build_object(
        'code', ob.code, 'name', ob.name,
        'parent', (select p.code from objectives p where p.id = ob.parent_id),
        'lessons', (select count(*) from lesson_objectives lo
                     where lo.objective_id = ob.id))
        order by coalesce((select p.code from objectives p
                            where p.id = ob.parent_id), ob.code),
                 ob.parent_id nulls first, ob.code)
      from objectives ob where ob.subject_id = c.subject_id), '[]'::jsonb),

    'units', coalesce((select jsonb_agg(jsonb_build_object(
        'id', un.id, 'title', un.title, 'position', un.position)
        order by un.position, un.id)
      from units un where un.course_id = c.id), '[]'::jsonb),

    'lessons', coalesce((select jsonb_agg(jsonb_build_object(
        'id', le.id, 'order', le.position,
        'unit', coalesce((select un.title from units un
                           where un.id = le.unit_id), le.unit),
        'title', le.title, 'key', le.author_key,
        'strand', (select st.code from strands st where st.id = le.strand_id),
        'published', le.published,
        -- العددُ باقٍ (القرار ①) · والأكوادُ زيادةُ ١٤٥
        'objectives', (select count(*) from lesson_objectives lo
                        where lo.lesson_id = le.id),
        'objective_codes', coalesce((select jsonb_agg(ob.code order by ob.code)
                            from lesson_objectives lo
                            join objectives ob on ob.id = lo.objective_id
                           where lo.lesson_id = le.id), '[]'::jsonb),
        'questions', (select count(*) from questions q where q.quiz_id in
                       (select i.quiz_id from items i
                         where i.lesson_id = le.id and i.quiz_id is not null)))
        order by le.position, le.id)
      from lessons le
     where le.course_id = c.id and le.archived_at is null), '[]'::jsonb)
  ) into v
  from courses c
  join subjects sb on sb.id = c.subject_id
  left join levels lv on lv.id = c.level_id
  where c.id = p_course;

  return v;
end
$function$;

revoke all on function public.course_state(bigint) from public, anon;
grant execute on function public.course_state(bigint) to authenticated;

comment on function public.course_state(bigint) is
  'حالةُ مقرّرٍ واحدٍ للتأليف: وحداتُه ودروسُه بمفاتيحها وأرقامها وأكواد '
  'أهدافها، وفروعُ مادته وأهدافُها كلُّها — كما يبنيها tools/state.sql حرفاً، '
  'لكن من القاعدة لا من ملفٍّ يَبلى. وحارسُها can_author (144 · 145).';

insert into sql_log (n, title, applied_at)
values ('145', 'أكوادُ أهداف الدرس في course_state — للمرحلة ③', now())
on conflict (n) do nothing;
