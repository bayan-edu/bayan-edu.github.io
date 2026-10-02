-- ══════════════════════════════════════════════════════════════════════
--  ١٣٩ · منتقي الهدف — قائمةُ أهدافِ درسِ الاختبار
-- ══════════════════════════════════════════════════════════════════════
--
--  العلّة: السلسلةُ العاملةُ في التشخيص هي **سؤال ← هدفُه ← علاجُه ← الطالب**،
--  و`submit_attempt` تقرأ `q.objective_id` لتُخرج للطالب عنوانَ عنصر العلاج.
--  وذاك العمودُ فارغٌ في كلّ أسئلة المنصّة (٤٠٥ من ٤٠٥): يُرسله `api.js`،
--  ويقرؤه `editor_quiz.js`، **ولا شيءَ في الواجهة يضع فيه قيمة.**
--  فالتشخيصُ مبنيٌّ ومعطَّل، وعائقُه منتقٍ لا يزيد على قائمة.
--
--  وهنا تظهر وظيفةُ `lesson_objectives` (الملفّ `138`) حقّاً: **ليس العرض،
--  بل حصرُ الخيار.** فمعلّمٌ يواجه مئتَيْ هدفٍ في المادة يختار أقربَها لفظاً؛
--  ومعلّمٌ يرى اثني عشر — أهدافَ هذا الدرس — يختار أصوبَها. والوسمُ الخطأ
--  أسوأ من غيابه: يُرسل الطالبَ إلى علاجٍ ليس علاجَه.
--
--  ثلاثةُ قراراتٍ تُقرأ ولا تُستنتج:
--
--  ① **النطاقُ دروسُ الاختبار، لا المادةُ كلُّها.** والوصلُ عبر المكوّنات:
--     `items.quiz_id ⇒ items.lesson_id ⇒ lesson_objectives`. فاختبارٌ يخدم
--     درسين تُجمع أهدافُهما.
--
--  ② **واختبارٌ لا درسَ له (أداةٌ أو محطّةٌ قائمةٌ بذاتها) يرجع إلى المادة**،
--     و`scope` يقول ذلك صريحاً فتُنبّه الواجهةُ عليه. والبديلُ أن يبقى بلا
--     منتقٍ أبداً — وذاك يُفرغ التشخيصَ لا يحميه.
--
--  ③ **البنودُ وحدَها تُعرض.** العنوانُ العريض لا يُعلَّق على سؤال كما لا
--     يُعلَّق على درس — `set_lesson_objectives` ترفضه، فلا يُعرض هنا أصلاً.
--
--  والمفاتيحُ لاتينيّةٌ لأنّ قارئَها جافاسكربت — كما `quiz_for_edit`. ونصوصُ
--  الحالات (لا أهدافَ بعد · نطاقُ المادة) تكتبها الواجهةُ بلغتها، فالدالّةُ
--  تُرجع وقائعَ لا جُملاً.
-- ══════════════════════════════════════════════════════════════════════

create or replace function public.objectives_for_quiz(p_quiz bigint)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_subject bigint; v_scale bigint;
  v_lessons bigint[]; v_scope text := 'lesson';
  v_obj jsonb; v_les jsonb;
begin
  if not can_edit_quiz(p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  select q.subject_id into v_subject from quizzes q where q.id = p_quiz;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;

  select s.scale_id into v_scale from subjects s where s.id = v_subject;

  -- ① دروسُ هذا الاختبار — عبر مكوّناته
  select array_agg(distinct i.lesson_id) into v_lessons
    from items i join lessons l on l.id = i.lesson_id
   where i.quiz_id = p_quiz and i.lesson_id is not null and l.archived_at is null;

  select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'title', l.title)
                            order by l.position, l.id), '[]'::jsonb)
    into v_les from lessons l where l.id = any(coalesce(v_lessons, '{}'::bigint[]));

  -- ② بلا درسٍ أو بلا أهدافٍ على دروسه ⇒ نطاقُ المادة، ويُقال صريحاً
  if v_lessons is null
     or not exists (select 1 from lesson_objectives lo
                     where lo.lesson_id = any(v_lessons)) then
    v_scope := 'subject';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id',           o.id,
           'code',         o.code,
           'name',         o.name,
           'heading',      h.code,
           'heading_name', h.name,
           'remedy',       o.remedial_item_id is not null,
           'used',         (select count(*) from questions x
                             where x.quiz_id = p_quiz and x.objective_id = o.id
                               and x.retired_at is null),
           'lessons',      (select count(*) from lesson_objectives lo
                             where lo.objective_id = o.id)
         ) order by h.code, o.code), '[]'::jsonb)
    into v_obj
    from objectives o
    join objectives h on h.id = o.parent_id        -- ③ البنودُ وحدَها
   where o.subject_id = v_subject
     and o.scale_id is not distinct from v_scale
     and (v_scope = 'subject'
          or o.id in (select lo.objective_id from lesson_objectives lo
                       where lo.lesson_id = any(v_lessons)));

  return jsonb_build_object(
    'ok',         true,
    'quiz',       p_quiz,
    'subject_id', v_subject,
    'scope',      v_scope,
    'lessons',    v_les,
    'objectives', v_obj);
end
$function$;

revoke all on function public.objectives_for_quiz(bigint) from public, anon;
grant execute on function public.objectives_for_quiz(bigint) to authenticated;

comment on function public.objectives_for_quiz(bigint) is
  'قائمةُ البنود التي يصلح وسمُ سؤالٍ بها في هذا الاختبار: أهدافُ دروسه عبر '
  'المكوّنات، وإن لم يكن له درسٌ أو لا أهدافَ على دروسه رجعت إلى المادة '
  'و`scope = subject`. البنودُ وحدَها — لا عنوانَ عريضاً. مفاتيحُها لاتينيّة '
  'لأنّ قارئَها جافاسكربت.';

insert into sql_log (n, title, applied_at)
values ('139', 'منتقي الهدف — حصرُ الخيار في أهداف درس الاختبار', now())
on conflict (n) do nothing;
