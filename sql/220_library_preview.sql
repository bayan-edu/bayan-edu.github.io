-- ══════════════════════════════════════════════════════════
-- 220 · معاينةُ المكتبة للمعلّم والمؤلّف — رفوفُ مستوًى وطبقةٍ كما يراها طالبُها، ومعها المسودّات
--       (١٩ نوفمبر ٢٠٢٦ · للمكتبتين: `sk_read` و`sk_read_ar`)
--
-- لماذا:
--   ① **بلاغُ المالك (١٩ نوفمبر):** «صفحة المكتبة (الأرفف والأغلفة وترتيبها) لا تظهر للمعلم أو المصمم كما تظهر للطالب».
--      والسببُ ثلاثة، كلُّها في القاعدة لا في الرسم (`paintLibrary` واحدةٌ للجميع):
--      • `courses_of` تجعل كلَّ مقرَّرٍ «حاضراً» (`is_current`) للمعلّم والمدير ⇒ `list_lessons` تُرجع له المكتبةَ كلَّها:
--        أربعةً وعشرين مستوًى × أربع طبقات على رفوفٍ واحدة — والطالبُ يرى مستواه في طبقته وحدهما.
--      • و`list_lessons` لا تُرسل الطبقة (`courses.tier`) أصلاً ⇒ لا تُفصل في المتصفّح ولو أُريد.
--      • والمسودّاتُ لا تُرى على رفٍّ أبداً (`l.published`) ⇒ المؤلّفُ لا يرى أغلفتَه وترتيبَها إلا بعد أن يراها الطالب.
--   ② **ولماذا دالّةٌ جديدة لا رقعةٌ في `list_lessons`:** تلك دالّةُ الطالب في كلّ مادّة، وحالُ الطالب فيها (`done` · `best` ·
--      `status` · `locked`) تُحسب لصاحب الجلسة. والمعاينةُ تسأل سؤالاً آخر: «ماذا يرى طالبٌ في هذا المستوى وهذه الطبقة؟»
--      — بمستوًى وطبقةٍ يختارهما الناظر لا بمستواه. ورقعةٌ تُدخل وسيطين في دالّةٍ يقرؤها كلُّ طالب ثمنُها أكبر من فائدتها.
--   ③ **والشكلُ شكلُ `list_lessons` بحرفه** (الحقولُ والترتيب: المستوى ⇐ الوحدة ⇐ الموضع · و`distinct on` وبيتُ الدرس أولى)
--      ⇒ `paintLibrary` ترسم الناتجَ بلا تغيير. **وحالُ الطالب فارغةٌ عمداً:** لا قفلَ ولا إنجازَ ولا نتيجة — المعاينةُ لطالبٍ
--      جديدٍ في المستوى، لا لحال الناظر. **والبنودُ بحارس الطالب نفسِه** (`item_quiz_ready`): كتابٌ لم يجهز اختبارُه يُرى
--      بلا اختبار — كما سيراه الطالب لو نُشر الآن، فالمعاينةُ لا تُجمّل ما لم يكتمل.
--      🆕 وحقلٌ واحدٌ زائد: `draft` — ليوسم المتصفّحُ المسودّةَ على غلافها.
--   ④ **ومن يرى ماذا:**
--      • المعلّمُ والمدير (`is_teacher()`) ⇐ المنشورُ وحده.
--      • ومن يؤلّف المادّة (`can_author` ⇐ المشرفُ والمديرُ والمعلّمُ الموثَّقُ في المادّة) ⇐ ومعه المسودّات.
--      فالمسودّةُ لا تبلغ إلا من يملك تحريرَها أصلاً، وغيرُه لا يُقال له إنّها موجودة (`drafts` صفرٌ لا رقمٌ مخفيّ).
--      والطالبُ ⇐ يُردّ: رفوفُه من `list_lessons` بحاله هو.
--   ⑤ **والمقرَّرُ بشرط الطالب في المستوى والطبقة وحدهما** (`courses_of`: `level_id` فارغٌ أو مساوٍ · `tier` فارغٌ أو مساوٍ).
--      ⚠️ ولا يُحاكى هنا حدُّ الصفوف ولا المسارُ ولا الشُّعبةُ ولا الاختياريّ — مقرَّراتُ المكتبتين لا تحمل شيئاً منها (قِيس ١٩ نوفمبر).
--      فإن حملتها مكتبةٌ يوماً فالمعاينةُ تُظهر أكثرَ ممّا يرى طالبٌ بعينه، وهذا السطرُ يقول لماذا.
--   ⑥ **والقائمتان في الردّ نفسِه** (`levels` · `tiers` · و`counts` لكلّ مستوًى وطبقة) ⇒ نداءٌ واحدٌ يرسم المحدِّدَين والرفوف.
--      وبلا اختيارٍ يُفتح **أوّلُ مستوًى وطبقةٍ فيهما كتب** — لا فراغٌ في أوّل زيارة.
--
-- **قُرئت الحيّةُ قبله (١٩ نوفمبر):** `list_lessons` · `courses_of` · `my_courses` · `course_lessons` · `is_teacher` · `can_author` ·
--   `can_curate` · `strand_json` · `my_tier` · `list_strands` — ولا دالّةَ بالاسم قبله، ولا ملفَّ ‎220‎ على `origin/main`.
-- 🧪 **الجافّة (١٩ نوفمبر · رُدّت كلُّها، وقِيس بعدها ألّا دالّةَ ولا سطرَ في `sql_log`):** المديرُ ⇐ R1 · الشباب أوّلاً (٨ كتب) و٢١ موضعاً
--   فيه كتب · R22 · الشباب ⇐ ٣٩ مسودّة · R22 · البراعم ⇐ لا كتب · المكتبةُ العربيّة ⇐ لا كتب في موضع · المعلّمُ المكلَّف بالمادّة ⇐ والمسودّات ·
--   معلّمٌ غيرُه ⇐ المنشورُ وحده (موضعٌ واحد) · الطالبُ ⇐ يُردّ · وبلا جلسة ⇐ يُردّ. **ومعرّفاتُ الكتب الثمانية ومفاتيحُها كما يراها طالبُ
--   R1 · الشباب في `list_lessons` بحرفها**، ومعها `draft` وحده. والمنحُ: `anon` لا · `authenticated` نعم.
-- ✅ **طُبّق ١٩ نوفمبر بإذن المالك** — والبصمةُ بعده: `library_preview` ⇐ `56a496e4`.
-- ══════════════════════════════════════════════════════════

begin;

-- ═══════════ منشأة: library_preview ═══════════
create or replace function public.library_preview(p_subject bigint, p_level bigint default null, p_tier text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_scale  bigint;
  v_drafts boolean;
  v_level  bigint := p_level;
  v_tier   text   := nullif(btrim(p_tier), '');
  v_counts jsonb;
  v_books  jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if not is_teacher() then
    return jsonb_build_object('ok', false, 'error', 'معاينة المكتبة للمعلمين');
  end if;

  select s.scale_id into v_scale from subjects s where s.id = p_subject and s.active;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  v_drafts := can_author(p_subject);                                      -- ④

  -- ⑥ عددُ الكتب لكلّ مستوًى وطبقة — والمسودّاتُ لمن يؤلّف وحده
  select coalesce(jsonb_agg(jsonb_build_object(
           'level_id', level_id, 'tier', tier, 'published', pub, 'drafts', dr)
           order by rank, tpos), '[]'::jsonb)
    into v_counts
  from (
    select c.level_id, c.tier, coalesce(lv.rank, 0) rank, coalesce(st.position, 0) tpos,
           count(distinct l.id) filter (where l.published) pub,
           case when v_drafts then count(distinct l.id) filter (where not l.published) else 0 end dr
      from courses c
      join course_lessons() mem on mem.course_id = c.id
      join lessons l on l.id = mem.lesson_id and l.archived_at is null
      left join levels lv on lv.id = c.level_id
      left join scale_tiers st on st.scale_id = v_scale and st.code = c.tier
     where c.subject_id = p_subject and c.active
     group by c.level_id, c.tier, lv.rank, st.position
  ) k
  where pub > 0 or dr > 0;

  -- ⑥ بلا اختيار ⇒ أوّلُ مستوًى وطبقةٍ فيهما كتب، وإلّا أوّلُ مستوًى وأوّلُ طبقة
  if v_level is null and v_tier is null and jsonb_array_length(v_counts) > 0 then
    v_level := (v_counts->0->>'level_id')::bigint;
    v_tier  := v_counts->0->>'tier';
  end if;
  if v_level is null then
    select lv.id into v_level from levels lv where lv.scale_id = v_scale order by lv.rank limit 1;
  end if;
  if v_tier is null then
    select st.code into v_tier from scale_tiers st where st.scale_id = v_scale order by st.position limit 1;
  end if;

  -- ③ الكتبُ بشكل `list_lessons` بحرفه — وحالُ الطالب فارغة، و`draft` زائد
  select jsonb_agg(x order by (x->>'level_rank')::int,
                              (x->>'unit_pos')::int, (x->>'position')::int) into v_books from (
    select distinct on (l.id) jsonb_build_object(
      'id', l.id, 'code', l.code, 'title', l.title,
      'unit', coalesce(u.title, l.unit),
      'unit_pos', mem.unit_pos,
      'summary', l.summary, 'position', l.position,
      'level', lv.name, 'level_id', lv.id,
      'level_rank', coalesce(lv.rank, 0),
      'own_level', true,
      'course', c.title,
      'pass_mark', l.pass_mark,
      'cover', l.cover,
      'cards', (select count(*) from card_lessons cl
                    join cards cd on cd.id = cl.card_id
                   where cl.lesson_id = l.id and can_see_deck(cd.deck_id)),
      'strand', strand_json(l.strand_id),
      'locked', false, 'reason', null,
      'done', false, 'best', null,
      'draft', not l.published,
      'items', coalesce((
        select jsonb_agg(jsonb_build_object(
          'id', i.id, 'kind', i.kind, 'title', i.title,
          'description', i.description, 'url', i.url,
          'quiz_id', i.quiz_id, 'is_graded', i.is_graded,
          'required', i.required, 'duration', i.duration_min, 'lang', i.lang,
          'strand', strand_json(coalesce(i.strand_id, l.strand_id)),
          'status', null
        ) order by i.position)
        from items i
        where i.lesson_id = l.id and i.created_by is null
          and item_quiz_ready(i.quiz_id)
        ), '[]'::jsonb),
      'extras', '[]'::jsonb
    ) as x
    from courses c
    join course_lessons() mem on mem.course_id = c.id
    join lessons l on l.id = mem.lesson_id
    left join levels lv on lv.id = l.level_id
    left join units  u  on u.id = l.unit_id
    where c.subject_id = p_subject and c.active                               -- ⑤
      and (c.level_id is null or c.level_id = v_level)
      and (c.tier is null or c.tier = v_tier)
      and l.archived_at is null
      and (l.published or v_drafts)                                           -- ④
    order by l.id, mem.borrowed, mem.course_id
  ) t;

  return jsonb_build_object(
    'ok', true,
    'drafts_shown', v_drafts,
    'level', (select jsonb_build_object('id', lv.id, 'name', lv.name) from levels lv where lv.id = v_level),
    'tier',  (select jsonb_build_object('code', st.code, 'name', st.name)
                from scale_tiers st where st.scale_id = v_scale and st.code = v_tier),
    'levels', coalesce((select jsonb_agg(jsonb_build_object('id', lv.id, 'name', lv.name, 'rank', lv.rank) order by lv.rank)
                          from levels lv where lv.scale_id = v_scale), '[]'::jsonb),
    'tiers',  coalesce((select jsonb_agg(jsonb_build_object('code', st.code, 'name', st.name) order by st.position)
                          from scale_tiers st where st.scale_id = v_scale), '[]'::jsonb),
    'counts', v_counts,
    'lessons', coalesce(v_books, '[]'::jsonb));
end $$;

revoke execute on function public.library_preview(bigint, bigint, text) from public, anon;
grant  execute on function public.library_preview(bigint, bigint, text) to authenticated;

insert into public.sql_log (n, title, applied_at)
values ('220', 'معاينةُ المكتبة للمعلّم والمؤلّف — رفوفُ مستوًى وطبقةٍ كما يراها طالبُها، ومعها المسودّات', now())
on conflict (n) do update set applied_at = now();

commit;
