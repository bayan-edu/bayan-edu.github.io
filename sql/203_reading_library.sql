-- ══════════════════════════════════════════════════════════
-- 203 · مكتبةُ بيان — الكتابُ درسٌ في مقرَّرِ مستواه وطبقته، والرفُّ فرع، والمستوى من سلّم R1–R24
--       (المرحلة ١ من `spec-reading-library.md` · قراراتُ المالك ق١–ق٣ وق٦، ١٢ نوفمبر ٢٠٢٦ — وتوجيهُه في اليوم نفسِه:
--        «النظامُ الذي يُبنى الآن يتّسع للمستويات الأربعة والعشرين في الطبقات العمريّة الأربع»)
--
-- لماذا:
--   ① **المكتبةُ واجهةُ عرضٍ لدروس المادّة ٧ (`sk_read`)، لا نظامٌ جديد.** الكتابُ درسٌ: نصُّه مصدرٌ من نوع `text` يقرؤه
--      `createBook`، وأسئلتُه اختبارٌ محتسَب، ومفرداتُه بطاقاتُ الدرس، وإتقانُه `lesson_done` عند `pass_mark`. فالخطّةُ
--      المرفقة التي أرادت أعمدةً على `passages` بنت على الجدول الخطأ: `passages.quiz_id` إلزاميّ — نصوصُ اختباراتٍ لا كتب.
--   ② **سلّمٌ جديد `R1–R24` لا CEFR** (ق٢): ستُّ درجاتٍ لثلاثَ عشرةَ سنةً تجعل الخطأَ في التسكين سنتين من المادّة لا فصلاً،
--      وإطارُ مشروع القراءة (`D:\LMS\Reading project` · level-framework §2) يجعل `R` سلّمَ العمل وCEFR لغةَ التقرير.
--      ⇒ واسمُ كلّ مستوًى يحمل مقابلَه («R14 · A2»)، والمقابلةُ منقولةٌ من الإطار §3 بحرفها. و`R24` «C1 (entry)» لا «C1» (D12).
--      🔁 **وصُحّحت في اليوم نفسِه بعد التطبيق (`204`):** كُتبت أوّلاً «قبل A1» و«مدخل C1» ترجمةً لا حرفاً — فاسمٌ أوّلُه
--         لاتينيٌّ وفيه عربيّ يُقلَب في بروازٍ `dir="auto"`. وهذا الملفُّ يكتب اليوم ما يكتبه `204`، فإعادتُه لا تُرجع القديم.
--      والسلّمُ `proficiency`: لا يُسجَّل فيه إلا باختبار (`set_my_level` من `placement_submit` وحدها) — ولا يظهر في التسجيل.
--   ③ **مقرَّرٌ لكلّ خانة: مستوًى × طبقة** — والدرسُ يرث مستواه من مقرَّره في كلّ حفظ (`save_lesson` · `import_lesson_map`)، فهذا هو
--      الطريقُ الوحيد ليحمل الكتابُ مستواه (حجّةُ `201` ③ بعينها). والمقرّراتُ الستّة القديمة (`A1`–`C2`) **تُعطَّل ولا
--      تُحذف**: لا درسَ فيها ولا وحدة، ومعطَّلُها يغيب عن `courses_of` كلِّها.
--   ④ **وعلى المقرَّر طبقتُه العمريّة (`tier` · M1–M4)** (ق٦): «النضج يتبع العمر ولا ينزل عنه» — فكتابٌ لابن السادسة عشرة
--      لا يبلغ ابنَ العاشرة. **وتُبنى الطبقاتُ الأربع كلُّها الآن: ٢٤ × ٤ = ٩٦ مقرَّراً** (توجيهُ المالك في الرأس)، والإطارُ
--      يجيز كلَّ خانة (§5: «عالي R مع M1 مشروعٌ وإن ندر»). ومقرَّرٌ فارغٌ لا يُرى فيه شيء: لا كتابَ يُنشر إلا معتمَداً (ق٨).
--      والطبقةُ هنا **وسمٌ لا باب**: `courses_of` لا تقرؤه بعد — يُقرأ في المرحلة ٦ مع تاريخ الميلاد ودالّة الطبقة.
--      ⇒ ولا يتغيّر بهذا الملفّ ما يراه أحد: مستوى السلّم الجديد لا يكتبه إلا `set_my_level`، ولا يناديها له إلا التسكين
--         (المرحلة ٧ — بعد السادسة). فلا طالبَ يبلغ هذه المقرّراتِ قبل أن يكون للطبقة باب (قِيس ١٢ نوفمبر: كاتبُ
--         `student_levels` دالّةٌ واحدة).
--      ⚠️ **وفهرسُ التفرّد `courses_uniq_grades` يُوسَّع بالطبقة** — وكان بلاها، فيردّ مقرَّراً ثانياً للمستوى نفسِه بطبقةٍ
--         أخرى. وتوسيعُه حذفٌ ثمّ إنشاءٌ في المعاملة نفسِها، **وكلُّ مقرَّرٍ قائمٍ طبقتُه فارغة ⇒ مسطرتُه عليه كما كانت.**
--         وقُرئت قبله كلُّ دالّةٍ تمسّ المقرّرات (١٢ نوفمبر): لا واحدةَ تطلب مقرَّراً بمادّته ومستواه — كلُّها بالمعرّف —
--         ولا `on conflict` يسمّي هذا الفهرس.
--      📌 و`save_course` (شاشةُ المحتوى) لا تكتب الطبقة: مقرَّرٌ يُنشأ منها طبقتُه فارغة، وتعديلُه يُبقي ما كان.
--   ⑤ **والرفُّ فرع** (ق٣): ثلاثةُ أرففٍ تحت أصلَين — «قصص ومغامرات» و«سِيَر وتاريخ» تحت السرديّ (`N`)، و«علوم واستكشاف»
--      تحت المعلوماتيّ (`I`). والأصلُ يحمل جنسَ النصّ الذي يطلبه الإطار (`N/I` على كلّ نصّ · §3.5)، وعليه يُكتب شرطُ
--      الترقية لاحقاً («منها ٢ معلوماتيّ» · ق٥). والدرسُ يُسند إلى رفٍّ نهائيّ لا إلى أصل (`save_lesson` تحرس ذلك).
--   ⑥ **والغلافُ وحده جديدٌ على الدرس** (`lessons.cover`): صورةٌ في R2 (المخزن `bayan-media` · مجلّد `img/`) بالمفتاح
--      الذي يبنيه `imageKey` (`r2:img/<نطاق>-<عشوائيّ>.<امتداد>`) — فملفّاتُ المكتبة كلُّها في R2 (توجيهُ المالك ١٢ نوفمبر):
--      الصوتُ بيتُه هناك من قبل (`audio/` رفعاً · `voice/` توليداً) فلا عمودَ له هنا، والنصُّ ملفُّه المعتمد هناك ونسختُه
--      المعروضة في القاعدة (ق١٢ · تُبنى في المرحلة ٢).
--      وكاتبُ الغلاف `set_lesson_cover` بحارس `save_lesson` نفسِه (`can_curate`)، وقارئُه `list_lessons` بمفتاحٍ جديد. **ولا غلافَ يُكتب بعد:** الكتبُ نفسُها لم تُكتب (عائقُ محتوى).
--      📌 و`author_lessons` (شاشةُ المؤلّف) لا تحمله بعد — تُضاف حين تُبنى لوحةُ الغلاف في المحرّر.
--   ⑦ **والمادّةُ تبقى ظاهرةً لكلّ طالبٍ كما هي اليوم** (ق٦ ①): `list_subjects` تُظهر مادّةَ التسكين ما لم يكن فيها مقرَّرٌ
--      بمدى صفوف — والمقرّراتُ الجديدة بلا مدى. **ولا طالبَ له مستوًى في السلّم الجديد** ⇒ مقرّراتُها محجوبةٌ عن الطلاب
--      كلِّهم (`can_view_level`)، والدخولُ إلى المادّة يطلب التسكين كما كان — وأداتُه لم تُبنَ (المرحلة ٧).
--   ⑧ **ويُعاد تشغيلُه بلا أثرٍ ثانٍ:** السلّمُ بكوده، والمستوياتُ بكودها، والمقرّراتُ بمستواها وطبقتها، والأرففُ بكودها،
--      والعمودان بـ`if not exists`، والفهرسُ يُوسَّع إن لم يكن موسَّعاً، و`list_lessons` تُرقَّع بنصٍّ يُطابَق مرّةً واحدة — وبعد الترقيع صفرٌ وعلامةُ `203` ⇒ يُتخطّى.
-- ══════════════════════════════════════════════════════════

-- المادّةُ واحدةٌ بعينها، و`list_lessons` كما قُرئت (١٢ نوفمبر · نصُّ المرسى مرّةً واحدة) أو كما يكتبها هذا الملفّ — وإلّا لا يُكتب شيء
do $$
declare v text := pg_get_functiondef('public.list_lessons(bigint)'::regprocedure);
        a text := '''pass_mark'', l.pass_mark,';
        na int;
begin
  if (select count(*) from public.subjects where code = 'sk_read') <> 1 then
    raise exception 'المادّة sk_read ليست واحدةً بعينها — لم يُكتب شيء';
  end if;
  na := (length(v) - length(replace(v, a, ''))) / length(a);
  if na <> 1 then
    raise exception 'list_lessons: المرسى وُجد % مرّةً لا مرّةً واحدة — تُقرأ ثانيةً قبل الترقيع، ولم يُكتب شيء', na;
  end if;
end $$;

-- ═══════════ منشأة ═══════════

-- ① السلّم
insert into public.scales (code, name, kind, sort_order)
values ('reading', 'مستويات القراءة — R1–R24', 'proficiency', 53)
on conflict (code) do nothing;

-- ② مستوياتُه الأربعة والعشرون — والمقابلةُ من إطار المشروع §3: R1–R5 Pre-A1 · R6–R11 A1 · R12–R16 A2 · R17–R20 B1 · R21–R23 B2 · R24 C1 (entry)
--    (🔁 بحرف `204` — والتعليلُ في الرأس ②)
insert into public.levels (scale_id, code, name, rank)
select s.id, 'R' || g, 'R' || g || ' · ' || case when g <=  5 then 'Pre-A1'
                                                 when g <= 11 then 'A1'
                                                 when g <= 16 then 'A2'
                                                 when g <= 20 then 'B1'
                                                 when g <= 23 then 'B2'
                                                 else 'C1 (entry)' end,
       g
  from public.scales s, generate_series(1, 24) g
 where s.code = 'reading'
on conflict (scale_id, code) do update set name = excluded.name;

-- ③ طبقةُ المقرَّر العمريّة — وسمٌ اليوم، وبابٌ في المرحلة ٦ (④ في الرأس)
alter table public.courses add column if not exists tier text;
alter table public.courses drop constraint if exists courses_tier_chk;
alter table public.courses add constraint courses_tier_chk check (tier is null or tier in ('M1','M2','M3','M4'));
comment on column public.courses.tier is
  'طبقةُ النضج العمريّة لكتب المقرَّر (M1 ٥–٧ · M2 ٨–١٠ · M3 ١١–١٣ · M4 ١٤–١٨) — إطارُ مشروع القراءة §5. فارغةٌ لكلّ مقرَّرٍ غيرِ مكتبة بيان. (203)';

-- ③-ب فهرسُ التفرّد يحمل الطبقة (④ في الرأس) — بأعمدته كما قُرئت (١٢ نوفمبر) وبعدها الطبقة. يُوسَّع مرّةً، وإعادةُ التشغيل تمضي
do $$
begin
  if not exists (select 1 from pg_indexes
                  where schemaname = 'public' and indexname = 'courses_uniq_grades' and indexdef like '%tier%') then
    drop index if exists public.courses_uniq_grades;
    create unique index courses_uniq_grades on public.courses
      (subject_id, coalesce(level_id, 0::bigint), coalesce(path_id, 0::bigint), coalesce(stream_id, 0::bigint),
       coalesce(min_rank::integer, 0), coalesce(max_rank::integer, 0), coalesce(tier, ''));
  end if;
end $$;

-- ④ مقرَّرٌ لكلّ خانة: ٢٤ مستوًى × ٤ طبقات — العنوانُ «المادّة — اسمُ الطبقة»، والترتيبُ بالمستوى ثمّ الطبقة
--    📌 كان «المادّة — المستوى · الطبقة (أعمارُها)»، وسمّى المالكُ الطبقات في اليوم نفسِه (`206`) ⇒ يكتب الجديدَ هنا
insert into public.courses (subject_id, level_id, title, position, active, tier)
select su.id, lv.id, 'مكتبة بيان — ' || t.name,
       lv.rank * 10 + t.n, true, t.code
  from public.subjects su
  join public.scales sc on sc.code = 'reading'
  join public.levels lv on lv.scale_id = sc.id
 cross join (values (1, 'M1', 'البراعم'), (2, 'M2', 'الأشبال'), (3, 'M3', 'اليافعون'), (4, 'M4', 'الشباب')) as t(n, code, name)
 where su.code = 'sk_read'
   and not exists (select 1 from public.courses c
                    where c.subject_id = su.id and c.level_id = lv.id and c.tier = t.code);

-- ⑤ الأرفف: أصلان ثمّ ثلاثةُ أرففٍ نهائيّة — والترتيبُ ترتيبُ المشهد: قصص · علوم · سِيَر
insert into public.strands (subject_id, parent_id, code, name, sort_order)
select su.id, null, x.code, x.name, x.ord
  from public.subjects su,
       (values ('N', 'نصوص سردية', 1), ('I', 'نصوص معلوماتية', 2)) as x(code, name, ord)
 where su.code = 'sk_read'
on conflict (subject_id, code) do nothing;

insert into public.strands (subject_id, parent_id, code, name, sort_order)
select su.id, p.id, x.code, x.name, x.ord
  from public.subjects su,
       (values ('N_STORY', 'N', 'قصص ومغامرات', 1),
               ('I_SCI',   'I', 'علوم واستكشاف', 2),
               ('N_LIFE',  'N', 'سِيَر وتاريخ', 3)) as x(code, parent, name, ord)
  join public.strands p on p.code = x.parent
 where su.code = 'sk_read' and p.subject_id = su.id
on conflict (subject_id, code) do nothing;

-- ⑥ غلافُ الكتاب
alter table public.lessons add column if not exists cover text;
alter table public.lessons drop constraint if exists lessons_cover_fmt;
alter table public.lessons add constraint lessons_cover_fmt
  check (cover is null or (cover ~ '^r2:img/[a-z0-9][a-z0-9._-]*\.(png|jpg|jpeg|webp)$' and char_length(cover) <= 300));
comment on column public.lessons.cover is
  'غلافُ الدرس حين يُعرض كتاباً في مكتبة بيان: مفتاحٌ في مخزن الصور كما يبنيه imageKey (r2:img/…). يكتبه set_lesson_cover. (203)';

-- ⑦ كاتبُ الغلاف — بحارس إنشاء الدرس نفسِه (`save_lesson` · `can_curate`)
create or replace function public.set_lesson_cover(p_lesson bigint, p_cover text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_subject bigint;
        v_cover   text := nullif(btrim(coalesce(p_cover, '')), '');     -- الفارغُ يمحو الغلاف
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select subject_id into v_subject from lessons where id = p_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'غلاف الكتاب لفريق الإشراف');
  end if;
  -- القيدُ يحرس الشكلَ أيضاً — وهنا ليقول للمؤلّف ما المطلوب بدل خطأ القيد الخام
  if v_cover is not null
     and (v_cover !~ '^r2:img/[a-z0-9][a-z0-9._-]*\.(png|jpg|jpeg|webp)$' or char_length(v_cover) > 300) then
    return jsonb_build_object('ok', false,
      'error', 'الغلاف صورة في مخزن الصور: r2:img/… بامتداد png أو jpg أو webp');
  end if;
  update lessons set cover = v_cover where id = p_lesson;
  return jsonb_build_object('ok', true, 'id', p_lesson, 'cover', v_cover);
end $function$;

revoke all on function public.set_lesson_cover(bigint, text) from public, anon;
grant execute on function public.set_lesson_cover(bigint, text) to authenticated, service_role;

-- ═══════════ معدَّلة ═══════════

-- ⑧ المادّة: الاسمُ (ق١) والسلّمُ الجديد (ق٢) — والوصفُ لأنّ القديم يَعِد بالإطار الأوروبيّ
update public.subjects su
   set name        = 'مكتبة بيان',
       scale_id    = sc.id,
       description = 'قصص وكتب بالإنجليزية على قدر مستواك وعمرك'
  from public.scales sc
 where su.code = 'sk_read' and sc.code = 'reading'
   and (su.name, su.scale_id, su.description) is distinct from ('مكتبة بيان', sc.id, 'قصص وكتب بالإنجليزية على قدر مستواك وعمرك');

-- ⑨ مقرّراتُها القديمة على CEFR تُعطَّل ولا تُحذف (③ في الرأس)
update public.courses c
   set active = false
  from public.subjects su, public.levels lv, public.scales sc
 where su.code = 'sk_read' and c.subject_id = su.id
   and lv.id = c.level_id and sc.id = lv.scale_id and sc.code = 'cefr'
   and c.active;

-- ⑩ list_lessons — قُرئت الحيّةُ قبلها (١٢ نوفمبر · md5(def) b4059d2f…). سطرٌ بعد `pass_mark` بنصّه، مرّةً واحدة
do $$
declare
  v  text := pg_get_functiondef('public.list_lessons(bigint)'::regprocedure);
  a  text := '''pass_mark'', l.pass_mark,';
  a2 text := '''pass_mark'', l.pass_mark,'
          || E'\n      ''cover'', l.cover,                                     -- 203 · غلافُ الكتاب في مكتبة بيان';
  na int := (length(v) - length(replace(v, a, ''))) / length(a);
begin
  if v like '%203 · غلافُ الكتاب%' then raise notice 'list_lessons عُدّلت من قبل'; return; end if;
  if na <> 1 then
    raise exception 'list_lessons: المرسى وُجد % مرّةً لا مرّةً واحدة — لم يُكتب شيء', na;
  end if;
  execute replace(v, a, a2);
end $$;

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('203', 'مكتبةُ بيان — الكتابُ درسٌ في مقرَّرِ مستواه وطبقته، والرفُّ فرع، والمستوى من سلّم R1–R24', now())
on conflict (n) do update set applied_at = now();
