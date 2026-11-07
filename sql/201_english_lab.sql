-- ══════════════════════════════════════════════════════════
-- 201 · مادّةُ English Lab — مستوياتُها عناوينُ لا أبواب، وهي مفتوحةٌ لكلّ طالب
--       (مختبر الصوتيّات، الخطوة ٧ · قرارُ المالك ق٤، ٧ نوفمبر ٢٠٢٦: «Levels, open to all»)
--
-- لماذا:
--   ① الخطّة: «سطرُ المادّة (family: english · progression: free · والظهورُ بحسب ق٤)، ومقرّرُها ووحداتُها». والقرار:
--      مستوياتُ الإطار الأوروبيّ المرجعيّ (A1–C2) محوراً، والمادّةُ لكلّ طالب (`placement = 'open'`).
--   ② قِيس قبل الكتابة: **المستوى في المنصّة بابٌ لا عنوان.** `can_view_level` يحجب ما فوق مستوى الطالب، ومن لا مستوى
--      له في السلّم (`my_rank = −1`) لا يرى منه شيئاً — ولا مستوى في CEFR إلا باختبار تسكين (`placement = 'test'` ·
--      Reading Comprehension · ولا طالبَ له مستوًى فيه اليوم). فمقرّراتٌ بمستوياتها بلا هذا الملفّ تُري كلَّ طالبٍ مادّةً
--      فارغة، ودروسُها تُقفَل كلُّها («يفتح عند وصولك إلى: …»).
--   ③ **وسقط بديلُ «مقرَّرٍ واحدٍ ودروسٍ موسومةٍ بمستوياتها»:** `save_lesson` و`import_lesson_map` يكتبان مستوى الدرس من
--      مقرَّره في كلّ حفظ (`level_id = v_level`) — فدرسٌ يُحفظ في مقرَّرٍ بلا مستوى يفقد مستواه، ولا عنوانَ مستوًى عند الطالب.
--      ⇒ **ستّةُ مقرّراتٍ بمستوياتها** كـReading Comprehension (المادّة `7`): الدرسُ يرث مستواه من مقرَّره، والمحرّرُ والخريطةُ
--      والاستيرادُ تعمل كما هي، و`list_lessons` ترتّبها بالمستوى وتكتب عنوانَه (`levels.name`) — بلا سطرٍ في الواجهة.
--   ④ **والقاعدةُ في موضعين لا ثالث لهما: المادّةُ المفتوحةُ مستوياتُها عناوينُ يختار منها الطالب، لا أبوابٌ يفتحها اختبار:**
--      `courses_of` — مقرّراتُها بمستوياتها كلُّها ظاهرةٌ وحاضرة (`is_current`)؛ و`can_access_lesson` — لا يحجب درسَها
--      بالمستوى. وكلُّ ما سواهما يسألهما (`lesson_member` · `my_courses` · `list_lessons` · `list_subjects` · `p_items_read` …).
--      والمادّةُ المفتوحةُ الوحيدةُ قبله (`9`) مقرَّرُها بلا مستوى ⇒ لا يتغيّر لها شيء (قِيس: عددُ ما يبلغه كلُّ طالبٍ واحد).
--   ⑤ **ولا درسَ بلا هويّة:** الزائرُ (`p_user` فارغ) لا يبلغ درساً — وكان كذلك لكلّ درسٍ قائم (قِيس: صفرٌ قبل وبعد)،
--      وEnglish Lab أوّلُ مادّةٍ مفتوحةٍ بلا مدى صفوف ⇒ يُكتب الحارسُ صريحاً قبل أن يصير أوّلَ ثقب. (ومحتواها لا يبلغ الزائرَ
--      أصلاً: `p_items_read` تشترط هويّة، و`list_lessons` و`courses_of` لا تُمنحان له.)
--   ⑥ **وما يبقى بيد المالك لا هنا:** من يؤلّف (التنسيقُ `curators` من لوحة الإدارة — ولا منسّقَ اليوم، فالمديرُ وحده)
--      · وصورةُ بطاقة المادّة بأسلوب b160. و`icon` حرفان (`EN`) لا إيموجي: يُرسم في البطاقة حتى تأتي الصورة، ونصُّ
--      الطالب بلا إيموجي (الهويّة اللغويّة §١١). والمادّةُ `active` لأنّ شجرةَ المؤلّف لا تعرض غيرها (`author_tree`) ⇒
--      بطاقتُها عند الطالب «قيد الإعداد» حتى يُنشر درس، كبطاقة «كيف أذاكر؟» اليوم.
--   ⑦ **وحدٌّ يُكتب:** مجموعاتُ البطاقات بمستوى (`decks.level_id`) يحرسها `can_see_deck` بالمستوى كما هو — ولا مجموعةَ لهذه
--      المادّة. وبطاقاتُ الدرس (`card_lessons`) تتبع الدرسَ فتتبع هذا الحكم.
--   ⑧ **ويُعاد تشغيلُه بلا أثرٍ ثانٍ:** المادّةُ بكودها، والمقرّراتُ بمستوياتها، و`courses_of` بنصّين يُطابَق كلٌّ مرّةً واحدة
--      (وصفرٌ بعد التطبيق ⇒ يُتخطّى)، و`can_access_lesson` لا تُستبدل إلا وبصمتُها ما قُرئ أو ما يكتبه هذا الملفّ.
-- ══════════════════════════════════════════════════════════

-- سلّمُ CEFR واحدٌ بعينه، و`can_access_lesson` كما قُرئت أو كما يكتبها هذا الملفّ — وإلّا لا يُكتب شيء
do $$
declare m text;
begin
  if (select count(*) from public.scales where name ~ 'CEFR') <> 1 then
    raise exception 'سلّم CEFR ليس واحداً بعينه — لم يُكتب شيء';
  end if;
  select md5(prosrc) into m from pg_proc where oid = 'public.can_access_lesson(bigint,uuid)'::regprocedure;
  if m not in ('1c62e6ed654844c8a081e299c8b7ae4f', 'f1e37aa5bd8c1d5d418aa205032bde87') then
    raise exception 'can_access_lesson تغيّرت منذ قُرئت (md5 %) — تُقرأ ثانيةً قبل الاستبدال', m;
  end if;
end $$;

-- ═══════════ منشأة ═══════════

-- ① المادّة
insert into public.subjects (code, name, scale_id, family, placement, progression, active, icon, description, sort_order)
select 'sk_lab', 'English Lab', s.id, 'english', 'open', 'free', true, 'EN',
       'تدريبات الاستماع والنطق بالإنجليزية — حوارات بمستويات الإطار الأوروبي المرجعي، والمستوى باختيارك', 13
  from public.scales s where s.name ~ 'CEFR'
on conflict (code) do nothing;

-- ② مقرّراتُها: واحدٌ لكلّ مستوًى في سلّمها، بلا مدى صفوف ولا شُعبة ولا مسار — والعنوانُ كعناوين المادّة ٧
insert into public.courses (subject_id, level_id, path_id, title, elective_group, position, active, stream_id, min_rank, max_rank)
select s.id, lv.id, null, 'English Lab — ' || lv.name, null, lv.rank, true, null, null, null
  from public.subjects s
  join public.levels lv on lv.scale_id = s.scale_id
 where s.code = 'sk_lab'
   and not exists (select 1 from public.courses c where c.subject_id = s.id and c.level_id = lv.id);

-- ═══════════ معدَّلة ═══════════

-- ③ courses_of — قُرئت الحيّةُ قبلها (`pg_get_functiondef` · ٧ نوفمبر · md5(prosrc) `ab8aae47…`). سطران بنصّهما، كلٌّ مرّةً واحدة
do $$
declare
  v text := pg_get_functiondef('public.courses_of(uuid,bigint)'::regprocedure);
  a text := 'or c.level_id is null or c.level_id = my_level_id(s.scale_id, p_user))';
  a2 text := 'or c.level_id is null or c.level_id = my_level_id(s.scale_id, p_user)'
          || E'\n          or s.placement = ''open'')   -- 201 · المادّةُ المفتوحة مستوياتُها كلُّها حاضرة: يختار الطالبُ مستواه (English Lab · ق٤)';
  b text := 'and (c.level_id is null or can_view_level(c.level_id, p_user))';
  b2 text := 'and (c.level_id is null or s.placement = ''open'' or can_view_level(c.level_id, p_user))   -- 201 · والمستوى فيها عنوانٌ لا باب';
  na int := (length(v) - length(replace(v, a, ''))) / length(a);
  nb int := (length(v) - length(replace(v, b, ''))) / length(b);
begin
  if na = 0 and nb = 0 and v like '%201 · المادّةُ المفتوحة%' then raise notice 'courses_of عُدّلت من قبل'; return; end if;
  if na <> 1 or nb <> 1 then
    raise exception 'courses_of: النصّان وُجدا % و% مرّةً لا مرّةً واحدة — لم يُكتب شيء', na, nb;
  end if;
  execute replace(replace(v, a, a2), b, b2);
end $$;

-- ④ can_access_lesson — قُرئت الحيّةُ قبلها (md5(prosrc) `1c62e6ed…`، ويحرسها الفحصُ أعلاه). وما تغيّر ثلاثةُ أسطر:
--    حارسُ الهويّة (⑤) · `subject_id` في القراءة · واستثناءُ المادّة المفتوحة من باب المستوى (④).
--    ومنحُها يبقى كما كان: `fn_auto_lock` لا يسحب من دالّةٍ مُعادةٍ منحَها (186).
create or replace function public.can_access_lesson(p_lesson bigint, p_user uuid default auth.uid())
 returns boolean
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare r record;
begin
  -- 194 · دورُ p_user لا دورُ السائل: معلّمٌ يسأل عن طالبٍ يرى ما يراه الطالب
  if exists (select 1 from profiles where id = p_user and role in ('teacher','admin')) then return true; end if;
  -- 201 · ولا درسَ بلا هويّة
  if p_user is null then return false; end if;
  select level_id, requires_id, published, archived_at, subject_id into r from lessons where id = p_lesson;
  if r is null or not r.published or r.archived_at is not null then return false; end if;
  if not lesson_member(p_lesson, p_user) then return false; end if;   -- 184 · الثقب ④: من مقرَّراته، في بيته أو مستعاراً
  -- 201 · والمستوى في المادّة المفتوحة عنوانٌ يختاره الطالب، لا بابٌ يفتحه اختبار (English Lab · ق٤)
  if not can_view_level(r.level_id, p_user)
     and not exists (select 1 from subjects s where s.id = r.subject_id and s.placement = 'open') then
    return false;
  end if;
  if r.requires_id is null then return true; end if;
  return lesson_done(r.requires_id, p_user);
end $function$;

-- ═══════════ الختام ═══════════
insert into public.sql_log (n, title, applied_at)
values ('201', 'مادّةُ English Lab — مستوياتُها عناوينُ لا أبواب، وهي مفتوحةٌ لكلّ طالب', now())
on conflict (n) do update set applied_at = now();
