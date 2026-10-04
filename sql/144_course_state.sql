-- ══════════════════════════════════════════════════════════════════════
--  ١٤٤ · حالةُ المقرّر — قارئٌ واحدٌ يُغني عن ملفّ الحالة
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: ما كان في `bayan-content/state/courses.json` لمقرّرٍ واحد،
--  يُقرأ من القاعدة مباشرةً بنداءٍ واحد: `select course_state(8);`
--
--  🔑 **ولماذا دالّةٌ وقد كان ملفٌّ يكفي؟** لسببين، كلاهما ظهر بالتجربة:
--
--  ① **الملفُّ يَبلى ولا يُنبِئ.** في رأس `tools/state.sql` سطرٌ مكتوب:
--     «أعِد توليده بعد كل استيراد» — وهي خطوةٌ بيدِ إنسان، والخطوةُ التي
--     بيدِ إنسانٍ تُنسى. فإن نُسيت، ألّف المعلّمُ على مفاتيحَ قديمةٍ
--     وأرقامٍ زائلة، **ولا شيءَ في الملفّ يقول إنّه بالٍ**. والقاعدةُ لا
--     تبلى. ⇒ فحيث كان الملفُّ نسخةً، صار النداءُ أصلاً.
--
--  ② **الملفُّ مئةُ كيلوبايت لسبعة مقرّرات.** ومهمّةُ المعلّم في السحابة
--     تقرأ بموصول Drive، والموصولُ يُنزِّل الملفَّ كلَّه إلى سياقها —
--     فتُقرأ ستُّ كتلٍ لا تَعنيها لتُقرأ كتلةٌ واحدةٌ تَعنيها. والدالّةُ
--     تردّ كتلتَه وحدَها.
--
--  وثلاثةُ قرارات تُقرأ ولا تُستنتج:
--
--  ① **منقولٌ لا مُؤلَّف.** كلُّ استعلامٍ هنا منسوخٌ حرفاً من
--     `tools/state.sql` — وفي رأسِه: «واستعلامٌ يُعاد تأليفُه يُعاد
--     خطؤه». فقد كُتب بيدٍ مرّتين في ٢ أكتوبر، وفي الأولى قرأ
--     `lessons.unit` (عموداً مهجوراً) فظهرت الوحداتُ فارغة. ⇒ فلا
--     تُحسِّن شيئاً هنا، ولو بدا لك أحسن. و`coalesce(…, le.unit)` باقٍ
--     للعمود المتقاعد (`135`) تحوّطاً، وهو فارغٌ دائماً الآن.
--
--  ② **`objectives_index` أهدافُ المادة كلِّها لا أهدافُ هذا المقرّر** —
--     فالهدف يسكن المادةَ ويعبر الصفوف (`138`)، ومعلّمُ الصفّ الثاني
--     لا يستطيع إعادةَ استعمال كودٍ لا يراه، فيكتبه من جديدٍ باسمٍ آخر،
--     فينقطع أثرُ الطالب الطوليّ.
--
--  ③ **`can_author` لا `authenticated` وحدَها** — فمن يقرأ هذا يُؤلّف به،
--     وحارسُ التأليف `can_author`. والملفُّ كان مفتوحاً لكلّ من بلغه؛
--     والدالّةُ تُعيد الحقَّ إلى موضعه.
--
--  ولا يُستغنى عن `tools/state.sql`: هو يُولّد الملفَّ للمقرّرات كلِّها،
--  وهذه تردّ مقرّراً واحداً لمن يعمل عليه.
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

    -- فروعُ المادة
    'strands', coalesce((select jsonb_agg(jsonb_build_object(
        'code', st.code, 'name', st.name,
        'parent', (select p.code from strands p where p.id = st.parent_id))
        order by st.sort_order, st.id)
      from strands st where st.subject_id = c.subject_id), '[]'::jsonb),

    -- أهدافُ المادة كلِّها (القرار ②)
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
        'objectives', (select count(*) from lesson_objectives lo
                        where lo.lesson_id = le.id),
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
  'حالةُ مقرّرٍ واحدٍ للتأليف: وحداتُه ودروسُه بمفاتيحها وأرقامها، '
  'وفروعُ مادته وأهدافُها كلُّها — كما يبنيها tools/state.sql حرفاً، '
  'لكن من القاعدة لا من ملفٍّ يَبلى. وحارسُها can_author (144).';

insert into sql_log (n, title, applied_at)
values ('144', 'حالةُ المقرّر — قارئٌ واحدٌ يُغني عن ملفّ الحالة', now())
on conflict (n) do nothing;
