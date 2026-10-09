-- ══════════════════════════════════════════════════════════════════════
--  ١٥٦ · ملخّصُ الدرس — بابٌ يعرضه، وحقلٌ لا يُمحى بالنسيان، وما مُحي يعود
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: إغلاقُ طريقِ محوٍ صامتٍ كلّف ١٥ سطراً من ملخّصات الدروس.
--
--  🔴 **السلسلةُ أربعُ حلقات، وكلُّ حلقةٍ منها سليمةٌ وحدها:**
--
--    ① `author_lessons` تردّ للمحرّر كلَّ حقول الدرس **إلّا `summary`.**
--    ② فنموذجُ الدرس (`js/editor.js`) يقرأ `lesson?.summary` وهو
--       `undefined` ⇒ **صندوقُ الملخّص يُفتح فارغاً دائماً.**
--    ③ فعند الحفظ يُرسَل `v("su") || null` ⇒ `null`.
--    ④ و`save_lesson` تكتب `summary = p_summary` **بلا `coalesce`.**
--
--  ⇒ **حفظٌ لتأشير «منشور» يمحو سطراً لم يره الحافظ** — بلا رسالةٍ ولا
--    سجلٍّ ولا شكوى. وهو الخطأُ الصامت الذي يُصدَّق (الثابت ⑤).
--
--  🔑 **والقياسُ وحده أدان، ولم يكن ظنّاً:** يوم ٩ أكتوبر كانت المسودّات
--  **١٩١ درساً · واحدٌ بلا ملخّص (١٪)**، والمنشورة **٢٤ · منها ١٧ (٧١٪)**.
--  **ولا فرقَ بين الحالين إلّا أنّ النشرَ يمرّ بالنموذج.** والدروسُ السبعةُ
--  المنشورةُ الناجية نُشرت من شاشة الاختبار عبر `publish_lesson` — **وهي لا
--  تمسّ الحقل.** فالبابان افترقا فافترق المصير.
--
--  وقراران يُقرآن ولا يُستنتجان:
--
--  ① **العلاجُ في الطبقتين لا في واحدة.** الباب (`author_lessons`) يُصلَح
--     لأنّ غيابَ الحقل عن المشرف **عطلُ عرضٍ في ذاته** قبل أن يكون سببَ
--     محو. والحقل (`save_lesson`) يُحصَّن لأنّ بابَ اليوم واحد، **وبابَ غدٍ
--     لا يُعرَف** — وقد نسيه بابٌ واحدٌ فكلّفنا خمسةَ عشرَ سطراً.
--
--  ② **ومعنى `null` يُحسم: «لم يُرسَل» لا «امحُ».** والمحوُ المتعمَّد
--     يُطلب بسلسلةٍ فارغة. وهو اصطلاحُ `137` نفسُه في الاستيراد
--     (`coalesce(r.summary, v_cur.summary)`) — **ولا اصطلاحان في قاعدةٍ
--     واحدة.** ⚠️ ولذلك **تُطبَّق القاعدةُ قبل الواجهة**: الواجهةُ القديمة
--     ترسل `null` فتبقى آمنةً طوال الفجوة، ولو نُشرت الواجهةُ أوّلاً
--     لأرسلت `''` إلى دالّةٍ لم تتعلّم معناها بعدُ **فعاد المحوُ من بابٍ آخر.**
--
--  🔑 **وما مُحي لم يضع:** `import_log.payload` يحفظ حمولةَ كلّ استيراد،
--  وفيها `lessons[].summary`. ⇒ **القاعدةُ تُصلح نفسَها من سجلّها**، ولا
--  يُطلب ملفٌّ من أحد.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ ① معدَّلة لا منشأة · author_lessons ═══════════
--  الفرقُ عن الحيّة سطرٌ واحد: `'summary', l.summary`. وما عداه منقولٌ
--  حرفاً عن `pg_get_functiondef` — لا عن `00_schema.sql` (الثابت ①).

create or replace function public.author_lessons(p_course bigint)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', l.id, 'title', l.title, 'published', l.published,
      'summary', l.summary,                                                -- 🆕 156
      'position', l.position, 'pass_mark', l.pass_mark,
      'unit_id', l.unit_id, 'unit', u.title,
      'requires_id', l.requires_id,
      'strand', strand_json(l.strand_id),
      'official_items', (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by is null),
      'extras',         (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by is not null),
      'my_extras',      (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by = auth.uid()),
      'has_quiz',       exists (select 1 from items i
                                 where i.lesson_id = l.id and i.is_graded),
      'quiz_id',        (select i.quiz_id from items i
                          where i.lesson_id = l.id and i.is_graded limit 1)
    ) order by coalesce(u.position, 0), l.position), '[]'::jsonb)
  from lessons l
  left join units u on u.id = l.unit_id
  join courses c on c.id = l.course_id
  where l.course_id = p_course
    and l.archived_at is null
    and (can_author(c.subject_id) or can_curate(c.subject_id));
$function$;

grant execute on function public.author_lessons(bigint) to authenticated;


-- ═══════════ ② معدَّلة لا منشأة · save_lesson ═══════════
--  الفرقُ عن الحيّة موضعان، وكلاهما في `summary` وحده:
--    · الإنشاء: `p_summary` ⇐ `nullif(trim(p_summary), '')`
--    · التحديث: يُكتب فقط إن أُرسل — و`null` يعني «اتركه».
--  وما عداهما منقولٌ حرفاً، وفيه الحرّاسُ كما هم: الدخول · التنسيق ·
--  العنوان · الوحدة · الفرع النهائيّ · تفرّدُ العنوان · ألّا يشترطَ نفسَه.

create or replace function public.save_lesson(
  p_id bigint default null, p_course bigint default null,
  p_title text default null, p_unit_id bigint default null,
  p_summary text default null, p_position integer default 0,
  p_requires bigint default null, p_pass_mark integer default 65,
  p_published boolean default false, p_strand bigint default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_course bigint; v_subject bigint; v_level bigint; v_id bigint; v_dup text;
        v_strand bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_course := coalesce(p_course, (select course_id from lessons where id = p_id));
  select c.subject_id, c.level_id into v_subject, v_level from courses c where c.id = v_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'إنشاء الدروس لفريق الإشراف · يمكنك إضافة مصدر إلى درس قائم');
  end if;
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان الدرس مطلوب');
  end if;

  if p_unit_id is not null
     and not exists (select 1 from units u where u.id = p_unit_id and u.course_id = v_course) then
    return jsonb_build_object('ok', false, 'error', 'الوحدة لا تنتمي إلى هذا المقرَّر');
  end if;

  -- الفرع — يُحسم الفعّال ثم يُحرَس (القرار ① في `b122`/`80`)
  v_strand := coalesce(p_strand, (select strand_id from lessons where id = p_id));
  if v_strand is not null then
    if not exists (select 1 from strands s
                    where s.id = v_strand and s.subject_id = v_subject) then
      return jsonb_build_object('ok', false, 'error', 'الفرع لا يتبع مادة هذا المقرَّر');
    end if;
    if exists (select 1 from strands c where c.parent_id = v_strand) then
      return jsonb_build_object('ok', false,
        'error', 'يُختار فرعٌ نهائيّ: «جبر» لا «بحتة»');
    end if;
  end if;

  -- 🔑 عنوان فريد داخل المقرَّر — يمنع «درساً واحداً بعناوين شتّى»
  select l.title into v_dup from lessons l
   where l.course_id = v_course and l.archived_at is null
     and norm_ar(l.title) = norm_ar(p_title)
     and (p_id is null or l.id <> p_id)
   limit 1;
  if v_dup is not null then
    return jsonb_build_object('ok', false, 'error', 'يوجد درس بهذا العنوان في المقرَّر: ' || v_dup);
  end if;

  if p_requires is not null and p_requires = p_id then
    return jsonb_build_object('ok', false, 'error', 'الدرس لا يشترط نفسه');
  end if;

  if p_id is null then
    -- code مؤقّت فريد ثم يُستبدل بـ l<id> — المعرّف لا يُعرف قبل الإدراج
    insert into lessons (course_id, unit_id, subject_id, level_id, code, title, summary,
                         position, requires_id, pass_mark, published, created_by, visibility,
                         strand_id)
    values (v_course, p_unit_id, v_subject, v_level,
            'tmp_' || gen_random_uuid()::text,
            trim(p_title), nullif(trim(p_summary), ''),                    -- 🆕 156
            coalesce(p_position,0), p_requires, coalesce(p_pass_mark,65),
            coalesce(p_published,false), auth.uid(), 'class',
            v_strand)
    returning id into v_id;

    update lessons set code = 'l' || v_id where id = v_id;
  else
    update lessons set
      course_id = v_course, unit_id = p_unit_id,
      subject_id = v_subject, level_id = v_level,
      title = trim(p_title),
      -- 🆕 156 · `null` = «لم يُرسَل» فيبقى · `''` = «امحُ» فيُفرَّغ.
      --   وبابٌ ينسى الحقلَ لا يمحوه بعد اليوم — وتلك علّةُ هذا الملفّ.
      summary = case when p_summary is null then summary
                     else nullif(trim(p_summary), '') end,
      position = coalesce(p_position, position), requires_id = p_requires,
      pass_mark = coalesce(p_pass_mark, pass_mark),
      published = coalesce(p_published, published),
      strand_id = v_strand
     where id = p_id
    returning id into v_id;
    if v_id is null then
      return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
    end if;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id, 'course', v_course,
                            'code', (select code from lessons where id = v_id));
end $function$;

grant execute on function public.save_lesson(
  bigint, bigint, text, bigint, text, integer, bigint, integer, boolean, bigint)
  to authenticated;


-- ═══════════ ③ استرجاعٌ لمرّةٍ واحدة — من سجلّ الاستيراد ═══════════
--  🔑 المصدرُ `import_log.payload` لا ملفٌّ خارجَ القاعدة: **الملفُّ يَبلى
--     ولا يُنبِئ، والقاعدةُ لا تبلى** (قيلت في `144` وتصحّ هنا).
--
--  ⚠️ **والقائمةُ صريحةٌ عمداً** — خمسةَ عشرَ معرّفاً رُصدت يوم ٩ أكتوبر.
--     ولم يُكتفَ بـ`summary is null`: بعد ② يصير المحوُ المتعمَّد ممكناً،
--     **ومحوٌ مقصودٌ لا يُفرَّق عن محوٍ بالنسيان بعد وقوعه** — فإعادةُ
--     تشغيلٍ بشرطٍ عامٍّ تُحيي ما أماته المشرفُ قاصداً. والقائمةُ تحبس
--     الأثرَ في المرصود.
--  🟡 **والمسترجَعُ نسخةُ الاستيراد:** إن كان ملخّصٌ هُذّب بيدٍ بعد
--     الاستيراد ثمّ مُحي، عاد الأصلُ لا التهذيب. ولا سجلَّ يفرّق.
--
--  وما بقي بلا استرجاع — `148` (العلوم) و`11`/`12` (IELTS) — **لم يمرّ
--  بالاستيراد قطّ** (صفرُ ظهورٍ في `lesson_map`)، فلعلّه وُلد بلا ملخّص.
--  **ولا دليلَ يحسم، فلا يُحسب في الخسارة ولا يُنفى.**

with gone as (
  select l.id, l.course_id, l.title
    from lessons l
   where l.archived_at is null
     and l.summary is null
     and l.id = any (array[22,23,24,25,26,27,28,  -- العربية
                            9,52,53,               -- English
                            96,                    -- الرياضيات
                            163,                   -- التاريخ
                            198,                   -- الفلسفة
                            1,2]::bigint[])        -- العلوم
), src as (
  select il.course_id, il.at,
         nullif(trim(e.value->>'title'),   '') as title,
         nullif(trim(e.value->>'summary'), '') as summary,
         case when e.value->>'existing_id' ~ '^[0-9]{1,18}$'
              then (e.value->>'existing_id')::bigint end as ex
    from import_log il
    cross join lateral jsonb_array_elements(il.payload->'lessons') e
   where il.kind = 'lesson_map'
     and not il.dry_run
     and jsonb_typeof(il.payload->'lessons') = 'array'
     and nullif(trim(e.value->>'summary'), '') is not null
), hit as (
  -- أحدثُ حمولةٍ تذكر الدرس — بمعرّفه إن حمله الاستيراد، وإلّا بعنوانه
  -- بعد التطبيع (`norm_ar`)، وهو التطبيعُ الذي يحرس تفرّدَ العنوان أصلاً.
  select distinct on (g.id) g.id, s.summary
    from gone g
    join src s
      on s.course_id = g.course_id
     and (s.ex = g.id or norm_ar(s.title) = norm_ar(g.title))
   order by g.id, s.at desc
)
update lessons l
   set summary = h.summary
  from hit h
 where l.id = h.id
   and l.summary is null;


-- ═══════════ ④ فحصٌ لكلّ حالةٍ بما يخصّها ═══════════
--  🔑 **ولا فحصٌ واحدٌ على أربعة:** «فشلٌ» لا يقول أيُّها سقط يُدرِّب
--     الناظرَ على تجاهل الإنذار — وذاك أسوأ من غياب الفحص (الثابت ④).
--
--  أ · البابُ يعرض الحقل:
--
--  select (author_lessons(4) -> 0) ? 'summary' as يحمل_المفتاح;
--
--  ب–د · الحقلُ يُصان. ⚠️ و`save_lesson` تردّ «يلزم تسجيل الدخول» في
--     محرّر القاعدة — فالدورُ `postgres` بلا `auth.uid()`. ⇒ تُلبَس هويّةُ
--     مشرفٍ، و`set_config` **داخل `from`** لا في جملةٍ سابقة (القاعدة ٧):
--
--  begin;
--    set local role authenticated;
--    select set_config('request.jwt.claims',
--             json_build_object('sub','‹uuid مشرف›')::text, true);
--    select save_lesson(p_id => ‹درس›, p_course => 4, p_title => '‹عنوانه›',
--                       p_summary => null);          -- ب · لا يمحو
--    select save_lesson(…, p_summary => '');         -- ج · يمحو عمداً
--    select save_lesson(…, p_summary => 'نصّ');      -- د · يكتب
--    select id, summary from lessons where id = ‹درس›;
--  rollback;
--
--  هـ · الاسترجاع — يُقاس قبل ③ وبعده:
--
--  select count(*) filter (where summary is null) as بلا_ملخص,
--         count(*)                                as الكل
--    from lessons where archived_at is null;


-- ═══════════ ⑤ السجلّ ═══════════

insert into public.sql_log (n, title, applied_at)
values ('156', 'ملخّصُ الدرس — بابٌ يعرضه، وحقلٌ لا يُمحى بالنسيان، وما مُحي يعود', now())
on conflict (n) do update set applied_at = now();


-- ══════════════════════════════════════════════════════════════════════
--  ⑥ · الختام الخمسة (AGENTS §٨) — ما وقع هنا وما يقع خارجه
-- ══════════════════════════════════════════════════════════════════════
--
--  ①  سطر sql_log ................. ✅ القسم ⑤
--  ②  قرارٌ لا يُقرأ من الشيفرة .... ✅ معنى `null` في الرأس وعند موضعه،
--                                    وعلّةُ القائمة الصريحة في ③
--  ③  STATE.md ٠·د ............... ⬜ خارج الملفّ — يُحدَّث مع التطبيق
--  ④  BUILD في js/ui.js .......... ✅ `b124` — **بعد هذا الملفّ لا قبله:**
--                                    `editor.js` يُرسل `v("su")` بدل
--                                    `v("su") || null` ليصحّ المحوُ
--                                    المتعمَّد. والترتيبُ ليس ذوقاً —
--                                    علّتُه في القرار ② بالرأس.
--  ⑤  00_schema.sql يُعاد استخراجه  🟡 دالّتان تغيّرتا ولا بنية — يُعاد
--                                    عند أوّل تغييرٍ بنيويّ، ولا يُفرَد له
--                                    استخراجٌ هنا.
--
--  🟡 **ودَينٌ معلَن لم يُعالَج:** ثلاثةُ دروسٍ بلا ملخّصٍ ولا سجلَّ لها
--     (`148` · `11` · `12`). **محتوًى لا تقنية** — تُكتب ملخّصاتُها من
--     المحرّر، وقد صار يعرض الحقلَ بـ①.
-- ══════════════════════════════════════════════════════════════════════
