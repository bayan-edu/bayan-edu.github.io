-- ══════════════════════════════════════════════════════════════════════
--  ١٨٠ · بوّابةُ «نصوص القراءة» — نصُّ الكتاب يصل من مشروع المادة ملفّاً
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٤ أكتوبر): «النصوصُ ستأتي من مشاريع المواد ملفّاتٍ جاهزة»
--  ⇒ بوّابةٌ خامسة في شاشة الاستيراد، على مسار أخواتها (`import_quiz` ·
--  `import_cards` · `import_lesson_map` · `import_objectives`): لصقٌ ثمّ
--  جافّةٌ تعرض الخطّة ثمّ اعتماد، **والدفعةُ تمرّ كلُّها أو لا يبقى منها شيء.**
--  والعقدُ كلُّه هنا — والشاشةُ لا تعرف من القانون حرفاً (رأسُ editor_import.js).
--
--  🔑 **وسبعةُ قراراتٍ اعتمدها المالك مع الخطّة:**
--  ① **إعادةُ الملفّ تصحيحٌ لا تكرار:** النصُّ يُعرف **بعنوانه في درسه** —
--     المصدرُ لا مفتاحَ له، والعنوانُ هو ما يقرؤه المؤلّفُ والطالب. فعنوانٌ
--     قائمٌ يُحدَّث متنُه، وجديدٌ يُنشأ، ونصٌّ قائمٌ ليس في الملفّ يبقى كما هو.
--     والملفُّ نفسُه يُعاد فيُقال «بلا تغيير» ولا يُكتب حرف.
--  ② **والجديدُ قبل أوّل اختبارٍ في الدرس، وإلّا في آخره:** القراءةُ تسبق
--     الاختبار. وقِيس: الدرس ٩ اليوم صوتٌ ثمّ اختبارٌ ثمّ نصّ (أُضيف بيدٍ إلى
--     الآخر) — والبوّابةُ لا تُكرّر ذلك.
--  ③ **والصورةُ في المتن بمفتاح مخزنٍ وحده** (`r2:…` · `مخزن/مسار`) — مسطرةُ
--     `import_cards` (161 · 170) بعينها، وأصلُها `KEY_RX` في js/api.js. والروابطُ
--     الخارجيّة تُرفع إلى المخزن أوّلاً: قائمةُ المضيفين البيضاء (`SAFE` في
--     js/ui.js) لا تعرفها القاعدة، ونسخُها إليها نسختان تفترقان.
--     **والفيديو رابطُ YouTube أو Google Drive** بقواعد `videoOf` (js/ui.js ·
--     b170) — نسخةٌ مُعلنةٌ لا مخترعة، ومن غيّر إحداهما غيّر الأخرى.
--  ④ **واللغةُ اختياريّة**: تُحسب من غالب الحروف إن غابت — حكمُ `sniffDir` في
--     js/book.js (والتعادلُ للعربية). وإن خالف الوسمُ الحروفَ فتحذير: قِيس في
--     `passages` ستّةُ نصوصٍ إنجليزيّة موسومة `ar` (b152).
--  ⑤ زرُّ المعاينة في الخطّة — في الواجهة (المرحلة ②)، ولا شيءَ له هنا.
--  ⑥ تطبيقُ هذا الملفّ بإذن المالك الصريح بعد عرضه.
--  ⑦ وأوّلُ اعتمادٍ حقيقيّ على درسٍ مسوّدةٍ يحدّده المالك.
--
--  🔒 **والحارسُ `can_curate` لا `can_author`:** النصُّ الرسميّ للدرس فعلُ إشراف —
--     مذهبُ `import_cards` و`save_item` الحيّة (المعتمدُ ⇐ `can_curate`).
--  🔑 **والكتابةُ بـ`save_item` نفسِها** — فقواعدُ المصدر في موضعٍ واحد (النمطُ
--     يحتاج متناً · الفرعُ نهائيٌّ من مادّة الدرس · الرسميُّ ظاهرٌ للصفّ بلا مؤلّف).
--     ⚠️ و`save_item` في التحديث **تكتب ما يُمرَّر** (المدّةَ والوصفَ والفرع) ⇒
--        يُمرَّر القائمُ لما غاب من الملفّ، وإلّا مُحي بصمت.
--  🔴 **ومقابلةُ ما خُطّط بما كُتب** — درسُ `import_cards` (161): `save_item`
--     تردّ `ok:false` نصّاً لا استثناءً، فخطأٌ لا يُقرأ يمرّ «تمّ» وما كُتب شيء.
--     ⇒ كلُّ ردٍّ يُقرأ، وأيُّ فرقٍ يردّ الدفعةَ كلَّها.
--
--  📐 **وحدودُ الدفعة أخطاءٌ تردّها، وأحكامُ الجودة تحذيراتٌ تُعرض ولا تمنع**
--     (ثابت ⑥ في `import_cards`): نصٌّ يبدو منسوخاً من PDF، أو وسمُ لغةٍ يخالف
--     حروفه، أو نصٌّ آخر في الدرس ليس في الملفّ — القرارُ فيها للمشرف.
--
--  ⛔ ولا يُحذف شيء، ولا يُمسّ غيرُ مصادر «النصّ» الرسميّة في دروس المقرَّر —
--     إلّا مواضعُ ما بعد الاختبار في درسٍ يُدرج فيه نصٌّ جديد (تُزاح خانةً).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ منشأةٌ لا معدَّلة ═══════════════════

create or replace function public.import_texts(
  p_course bigint, p_payload jsonb, p_dry_run boolean default true)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_subject bigint;
  v_rows jsonb; v_n int;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_plan jsonb; v_out jsonb; v_res jsonb;
  v_added int := 0; v_updated int := 0; v_same int := 0;
  v_stage text := 'التحقّق';
  v_pos int; v_q int; r record; e record;
  --  مسطرةُ الصورة: `KEY_RX` في js/api.js مع وسم `r2:` (import_cards · 170)
  c_key   constant text := '^(r2:)?[a-z0-9][a-z0-9-]*/.+$';
  --  ومسطرةُ الفيديو: `videoOf` في js/ui.js (b170) — معرّفُ YouTube أحدَ عشرَ
  --  حرفاً، ومعرّفُ Drive عشرةٌ فأكثر
  c_yt    constant text := '^https?://((www\.|m\.)?(youtube\.com|youtube-nocookie\.com)/'
                         || '(watch\?([^#]*&)?v=[a-z0-9_-]{11}([&#].*)?|(shorts|embed|live|v)/[a-z0-9_-]{11}([/?#].*)?)'
                         || '|youtu\.be/[a-z0-9_-]{11}([/?#].*)?)$';
  c_drive constant text := '^https?://drive\.google\.com/(file/d/[a-z0-9_-]{10,}([/?#].*)?'
                         || '|[^?#]*\?([^#]*&)?id=[a-z0-9_-]{10,}([&#].*)?)$';
  --  سطرُ الوسيط: `FIG` في js/book.js — سطرٌ وحده
  c_fig   constant text := '^[ \t]*\[[ \t]*(صورة|image|فيديو|video)[ \t]*[:：][ \t]*([^|\]\n]+)(\|[^\]\n]*)?\][ \t]*$';
  --  وما ليس حرفاً لاتينيّاً · وما ليس حرفاً عربيّاً — نطاقا `LAT_CH` و`AR_CH` في js/book.js.
  --  📐 بـ`chr()` لا بمحارف الهروب: أداةُ الكتابة فكّت الهروبَ محارفَ حرفيّةً مرّةً (منها
  --     U+FEFF الخفيّ)، فالملفُّ ASCII في هذين ليطابق ما يبلغ القاعدةَ حرفاً.
  c_nolat constant text := '[^A-Za-z' || chr(192) || '-' || chr(591) || ']';
  c_noara constant text := '[^' || chr(1536) || '-' || chr(1791) || chr(1872) || '-' || chr(1919)
                         || chr(64336) || '-' || chr(65023) || chr(65136) || '-' || chr(65279) || ']';
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject
    from courses c where c.id = p_course and c.active;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود أو معطَّل');
  end if;

  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'استيرادُ نصوص القراءة لفريق الإشراف على المادة');
  end if;

  --  دفعتان على المقرَّر نفسِه لا تتسابقان على المواضع
  perform pg_advisory_xact_lock(hashtext('import_texts'), p_course::int);

  -- ══════════════ شكلُ الدفعة — والغائبُ يُردّ ناطقاً ══════════════
  --  🔴 درسُ 161: `jsonb_typeof` تردّ NULL للمفتاح الغائب، فشرطٌ واحدٌ يمرّ
  --     عليه. ⇒ الغائبُ اسمٌ يُقال لا NULL يُبتلع.
  if coalesce(jsonb_typeof(p_payload->'texts'), 'غائب') <> 'array' then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'المقرَّر', p_course,
      'أخطاء', to_jsonb(array['لا قائمةَ texts في الدفعة — والمنتظر { "texts": [ … ] }. '
        || 'وما وُجد: ' || coalesce(jsonb_typeof(p_payload->'texts'), 'المفتاح غائب')]));
  end if;
  if jsonb_array_length(p_payload->'texts') = 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'المقرَّر', p_course,
      'أخطاء', to_jsonb(array['قائمةُ texts فارغة — ولا دفعةَ بلا نصّ']));
  end if;

  -- ══════════════ قراءةُ الدفعة وتطبيعُها مرّةً واحدة ══════════════
  --  🔑 تُطبَّع هنا ثمّ تُقرأ في الفحص والخطّة والكتابة من موضعٍ واحد (import_cards).
  select jsonb_agg(jsonb_build_object(
           'rn', b.rn, 'lesson', b.lesson, 'title', b.title, 'body', b.body,
           'description', b.description, 'strand', b.strand, 'minutes', b.minutes,
           'lang_given', b.lang_given, 'lat', b.lat, 'ara', b.ara,
           'lang', coalesce(b.lang_given, case when b.lat > b.ara then 'en' else 'ar' end),
           'lid', b.lid, 'sid', b.sid,
           'iid', (select min(i.id) from items i
                    where i.lesson_id = b.lid and i.kind = 'text' and i.created_by is null
                      and lower(btrim(i.title)) = lower(b.title)),
           'dups', (select count(*) from items i
                     where i.lesson_id = b.lid and i.kind = 'text' and i.created_by is null
                       and lower(btrim(i.title)) = lower(b.title)),
           --  🔴 `btrim` بلا محارف تقلّم المسافةَ وحدها — قِيس: سطرا وسيطٍ في طرفَي النصّ تركا
           --     سطرين جديدين، فعُدّت كلمتان فارغتان (٨ لا ٦). ⇒ تُقلَّم الأسطرُ معها.
           'words', coalesce(array_length(regexp_split_to_array(
                      btrim(regexp_replace(b.body, c_fig, '', 'gin'), E' \t\n'), '\s+'), 1), 0),
           'paras', (select count(*) from regexp_split_to_table(b.body, E'\n[ \t]*\n+') ch
                      where btrim(ch) <> '' and btrim(ch) !~* c_fig))
         order by b.rn)
    into v_rows
    from (
      select s.rn, s.lesson, s.title, s.body, s.description, s.strand, s.minutes, s.lang_given,
             length(regexp_replace(s.body, c_nolat, '', 'g')) as lat,
             length(regexp_replace(s.body, c_noara, '', 'g')) as ara,
             (select l.id from lessons l
               where l.course_id = p_course and l.author_key = s.lesson
                 and l.archived_at is null) as lid,
             (select st.id from strands st
               where st.subject_id = v_subject and st.name = s.strand) as sid
        from (
          --  والتقليمُ للمسافة والسطر معاً: عنوانٌ يختمه سطرٌ جديدٌ في الملفّ لا يطابق
          --  عنوانَه القائم، فيُنشأ نصٌّ ثانٍ بدل أن يُحدَّث الأوّل
          select t.ord as rn,
                 btrim(coalesce(t.e->>'lesson', ''), E' \t\r\n') as lesson,
                 btrim(coalesce(t.e->>'title', ''), E' \t\r\n') as title,
                 btrim(regexp_replace(coalesce(t.e->>'body', ''), E'\r\n?', E'\n', 'g'), E' \t\n') as body,
                 nullif(btrim(coalesce(t.e->>'description', ''), E' \t\r\n'), '') as description,
                 nullif(btrim(coalesce(t.e->>'strand', ''), E' \t\r\n'), '') as strand,
                 t.e->'minutes' as minutes,
                 nullif(lower(btrim(coalesce(t.e->>'lang', ''), E' \t\r\n')), '') as lang_given
            from jsonb_array_elements(p_payload->'texts') with ordinality as t(e, ord)
        ) s
    ) b;

  v_n := jsonb_array_length(v_rows);

  -- ══════════════════ حرّاسٌ تردّ الدفعة ══════════════════

  --  ① الدرسُ بمفتاحه في هذا المقرَّر
  select array_agg('نصّ ' || (x->>'rn') || ': بلا مفتاح درس (lesson)')
    into v_tmp from jsonb_array_elements(v_rows) x where (x->>'lesson') = '';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg(distinct 'مفتاحُ درسٍ ليس في هذا المقرَّر: «' || (x->>'lesson') || '»')
    into v_tmp from jsonb_array_elements(v_rows) x
   where (x->>'lesson') <> '' and (x->>'lid') is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ② العنوانُ والمتن — وحدّاهما
  select array_agg('نصّ ' || (x->>'rn') || ': بلا عنوان')
    into v_tmp from jsonb_array_elements(v_rows) x where (x->>'title') = '';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('نصّ ' || (x->>'rn') || ': العنوانُ أطولُ من ٢٠٠ حرف')
    into v_tmp from jsonb_array_elements(v_rows) x where length(x->>'title') > 200;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('نصّ ' || (x->>'rn') || ' «' || left(x->>'title', 40) || '»: بلا متن')
    into v_tmp from jsonb_array_elements(v_rows) x where (x->>'body') = '';
  v_err := v_err || coalesce(v_tmp, '{}');

  --  📐 ثلاثون ألفَ حرفٍ سقفٌ لا يبلغه نصُّ درس (نصوصُ القراءة اليوم ٠٫٥–٣ آلاف) —
  --     وما جاوزه وحدةٌ أو كتابٌ لُصق كاملاً، والكتابُ يقيس صفحاته في المتصفّح.
  select array_agg('نصّ ' || (x->>'rn') || ' «' || left(x->>'title', 40)
                   || '»: المتنُ أطولُ من ٣٠٬٠٠٠ حرف — يُقسَم نصوصاً على دروسها')
    into v_tmp from jsonb_array_elements(v_rows) x where length(x->>'body') > 30000;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ③ لغةٌ لا تعرفها المنصّة
  select array_agg('نصّ ' || (x->>'rn') || ': لغةٌ غير معروفة «' || (x->>'lang_given') || '»')
    into v_tmp from jsonb_array_elements(v_rows) x
   where (x->>'lang_given') is not null and (x->>'lang_given') not in ('ar', 'en');
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ④ عنوانٌ مكرَّرٌ للدرس نفسِه في الدفعة — فأيُّهما يُكتب؟
  select array_agg('عنوانٌ مكرَّرٌ في درس «' || d.lesson || '»: ' || d.title)
    into v_tmp
    from (select x->>'lesson' as lesson, min(x->>'title') as title
            from jsonb_array_elements(v_rows) x
           where (x->>'title') <> ''
           group by x->>'lesson', lower(x->>'title') having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑤ ونصّان قائمان بالعنوان نفسِه في الدرس — فأيُّهما يُحدَّث؟
  select array_agg('في درس «' || (x->>'lesson') || '» نصّان قائمان بعنوان «'
                   || (x->>'title') || '» — يُفرَّق بينهما في المحرّر أوّلاً')
    into v_tmp from jsonb_array_elements(v_rows) x where (x->>'dups')::int > 1;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑥ الفرعُ من فروع المادة، ونهائيّ — ولا يُخترع فرع
  select array_agg(distinct 'فرعٌ ليس في هذه المادة: «' || (x->>'strand') || '»')
    into v_tmp from jsonb_array_elements(v_rows) x
   where (x->>'strand') is not null and (x->>'sid') is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg(distinct 'الفرعُ «' || (x->>'strand') || '» له فروع — يُختار فرعٌ نهائيّ')
    into v_tmp from jsonb_array_elements(v_rows) x
   where (x->>'sid') is not null
     and exists (select 1 from strands c where c.parent_id = (x->>'sid')::bigint);
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑦ المدّةُ دقائقُ صحيحةٌ موجبة
  select array_agg('نصّ ' || (x->>'rn') || ': المدّةُ (minutes) عددٌ صحيحٌ من ١ إلى ١٨٠')
    into v_tmp from jsonb_array_elements(v_rows) x
   where (x->'minutes') is not null and jsonb_typeof(x->'minutes') <> 'null'
     and (jsonb_typeof(x->'minutes') <> 'number'
          or (x->>'minutes')::numeric <> trunc((x->>'minutes')::numeric)
          or (x->>'minutes')::numeric not between 1 and 180);
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑧ سطرُ الوسيط — القرار ③: الصورةُ مفتاحُ مخزن، والفيديو YouTube أو Drive.
  --     وما سواهما يُحجب عند الطالب صامتاً (`srcOf` · `videoOf`)، فيُردّ هنا ناطقاً.
  select array_agg('نصّ ' || (x->>'rn') || ' «' || left(x->>'title', 30) || '»: ' || m.why
                   || ' — «' || left(m.src, 80) || '»')
    into v_tmp
    from jsonb_array_elements(v_rows) x
    cross join lateral (
      select lower(f[1]) as kind, btrim(f[2]) as src
        from regexp_matches(x->>'body', c_fig, 'gin') f) fl
    cross join lateral (
      select fl.src,
             case when fl.kind in ('صورة', 'image')
                       and (fl.src ~ '["''<>]' or fl.src !~ c_key)
                  then 'صورةٌ ليس مصدرُها مفتاحَ مخزن (r2:… أو مخزن/مسار) — والرابطُ الخارجيّ يُرفع إلى المخزن أوّلاً'
                  when fl.kind in ('فيديو', 'video')
                       and not (fl.src ~* c_yt or fl.src ~* c_drive)
                  then 'فيديو ليس رابطَ YouTube أو Google Drive صالحاً'
             end as why) m
   where m.why is not null;
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then
    v_out := jsonb_build_object('ok', false, 'مرفوضة', true,
      'المقرَّر', p_course, 'المادة', v_subject, 'العدد', v_n,
      'أخطاء', to_jsonb(v_err),
      'بيانٌ', 'الدفعةُ تُردّ جملةً — ولا تُصلَح هنا بل عند مؤلّفها');
    insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
    values ('texts', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());
    return v_out;
  end if;

  -- ══════════════ تحذيراتٌ تُعرَض ولا تمنع ══════════════

  --  وسمُ اللغة يخالف الحروف — الكتابُ يقرأ الاتجاهَ من الحروف، لكنّ النطقَ والبحثَ
  --  وتحليلَ القراءة الجهريّة تقرأ الوسم
  select array_agg('«' || left(x->>'title', 40) || '»: موسومٌ ' || (x->>'lang_given')
                   || ' وأغلبُ حروفه ' || case when (x->>'lang_given') = 'ar' then 'لاتينيّة' else 'عربيّة' end)
    into v_tmp from jsonb_array_elements(v_rows) x
   where ((x->>'lang_given') = 'ar' and (x->>'lat')::int > (x->>'ara')::int)
      or ((x->>'lang_given') = 'en' and (x->>'ara')::int > (x->>'lat')::int);
  v_warn := v_warn || coalesce(v_tmp, '{}');

  --  أسطرٌ مكسورةٌ داخل الفقرات — بصمةُ PDF (`tidyPaste` في js/book.js يقترح دمجها
  --  في المحرّر، وهنا يُقال فقط: الشعرُ يشبهها ولا يفرّقه إلا مؤلّفُه)
  --  والعدّان بين قوسين لا معدودَ لهما — قِيس: «3 من 3 سطراً» خطأُ عددٍ ومعدود (الهويّة اللغويّة §١١)
  select array_agg('«' || left(x->>'title', 40) || '»: أسطرٌ تنكسر داخل فقراتها (' || w.open || ' من ' || w.trans
                   || ') — كأنّه منسوخٌ من PDF، فيظهر للطالب مكسوراً')
    into v_tmp
    from jsonb_array_elements(v_rows) x
    cross join lateral (
      select count(*) as trans,
             count(*) filter (where z.cur !~ '[.!?؟؛…:"”»)\]]$') as open
        from (select btrim(t.l) as cur, lead(btrim(t.l)) over (order by t.n) as nxt
                from regexp_split_to_table(x->>'body', E'\n') with ordinality as t(l, n)) z
       where z.cur <> '' and coalesce(z.nxt, '') <> ''
         and z.cur !~* c_fig and z.nxt !~* c_fig) w
   where w.trans >= 3 and w.open * 2 >= w.trans;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  --  نصٌّ رسميٌّ آخر في الدرس ليس في الملفّ — يبقى (القرار ①)، ويُقال
  select array_agg(distinct 'درس «' || l.author_key || '»: فيه نصٌّ آخر «' || i.title
                   || '» ليس في الملفّ — يبقى كما هو')
    into v_tmp
    from items i join lessons l on l.id = i.lesson_id
   where i.kind = 'text' and i.created_by is null
     and i.lesson_id in (select (x->>'lid')::bigint from jsonb_array_elements(v_rows) x)
     and not exists (select 1 from jsonb_array_elements(v_rows) x
                      where (x->>'lid')::bigint = i.lesson_id
                        and lower(x->>'title') = lower(btrim(i.title)));
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- ══════════════ الخطّةُ — قبل أن يُكتب حرف ══════════════
  --  «بلا تغيير» ما طابق القائمَ في متنه ولغته ووصفه ومدّته وفرعه — فلا يُكتب
  select jsonb_agg(x || jsonb_build_object('same',
           (x->>'iid') is not null and exists (
             select 1 from items i where i.id = (x->>'iid')::bigint
                and i.title = (x->>'title') and coalesce(i.body, '') = (x->>'body')
                and i.lang = (x->>'lang')
                and coalesce(i.description, '') = coalesce(x->>'description', i.description, '')
                and coalesce(i.duration_min, -1) = coalesce((x->>'minutes')::numeric::int, i.duration_min, -1)
                and coalesce(i.strand_id, -1) = coalesce((x->>'sid')::bigint, i.strand_id, -1)))
         order by (x->>'rn')::int)
    into v_rows from jsonb_array_elements(v_rows) x;

  select jsonb_build_object(
    'سيُنشأ', coalesce(jsonb_agg(p.e order by p.rn) filter (where p.k = 'new'), '[]'::jsonb),
    'سيُحدَّث', coalesce(jsonb_agg(p.e order by p.rn) filter (where p.k = 'upd'), '[]'::jsonb),
    'بلا تغيير', coalesce(jsonb_agg(p.e order by p.rn) filter (where p.k = 'same'), '[]'::jsonb))
    into v_plan
    from (select (x->>'rn')::int as rn,
                 case when (x->>'iid') is null then 'new'
                      when (x->>'same')::boolean then 'same' else 'upd' end as k,
                 jsonb_build_object(
                   'الدرس', x->>'lesson',
                   'عنوانُ الدرس', (select l.title from lessons l where l.id = (x->>'lid')::bigint),
                   'النصّ', x->>'title', 'اللغة', x->>'lang',
                   'كلمات', (x->>'words')::int, 'فقرات', (x->>'paras')::int,
                   'الموضع', case when (x->>'iid') is not null then 'موضعُه القائم'
                                  when exists (select 1 from items q
                                                where q.lesson_id = (x->>'lid')::bigint and q.kind = 'quiz')
                                       then 'قبل اختبار الدرس'
                                  else 'في آخر الدرس' end) as e
            from jsonb_array_elements(v_rows) x) p;

  -- ══════════════ التنفيذ — ذرّيٌّ، والجافّةُ تنقضه ══════════════
  begin
    v_stage := 'كتابةُ النصوص';
    for r in select x as j from jsonb_array_elements(v_rows) x order by (x->>'rn')::int loop

      if (r.j->>'iid') is null then
        --  القرار ②: قبل أوّل اختبارٍ في الدرس — وما بعده يُزاح خانة. وتُقرأ القيمةُ
        --  في كلّ نصّ: نصّان جديدان في درسٍ واحد يقعان بترتيب الملفّ قبل الاختبار.
        select min(q.position) into v_q
          from items q where q.lesson_id = (r.j->>'lid')::bigint and q.kind = 'quiz';
        if v_q is not null then
          update items set position = position + 1
           where lesson_id = (r.j->>'lid')::bigint and position >= v_q;
          v_pos := v_q;
        else
          select coalesce(max(i.position), 0) + 1 into v_pos
            from items i where i.lesson_id = (r.j->>'lid')::bigint;
        end if;

        v_res := save_item(null, (r.j->>'lid')::bigint, 'text', r.j->>'title',
                   r.j->>'description', null, r.j->>'body', null, v_pos,
                   (r.j->>'minutes')::numeric::int, r.j->>'lang', true, false, false, 'class',
                   (r.j->>'sid')::bigint);
        if not coalesce((v_res->>'ok')::boolean, false) then
          raise exception 'نصّ % «%»: %', r.j->>'rn', r.j->>'title', coalesce(v_res->>'error', 'لم يُحفظ');
        end if;
        v_added := v_added + 1;

      elsif (r.j->>'same')::boolean then
        v_same := v_same + 1;

      else
        --  ما غاب من الملفّ يبقى قائماً: `save_item` تكتب ما يُمرَّر لها
        select i.* into e from items i where i.id = (r.j->>'iid')::bigint;
        v_res := save_item(e.id, e.lesson_id, 'text', r.j->>'title',
                   coalesce(r.j->>'description', e.description), null, r.j->>'body', null,
                   e.position, coalesce((r.j->>'minutes')::numeric::int, e.duration_min), r.j->>'lang',
                   true, e.is_graded, e.required, 'class',
                   coalesce((r.j->>'sid')::bigint, e.strand_id));
        if not coalesce((v_res->>'ok')::boolean, false) then
          raise exception 'نصّ % «%»: %', r.j->>'rn', r.j->>'title', coalesce(v_res->>'error', 'لم يُحفظ');
        end if;
        v_updated := v_updated + 1;
      end if;
    end loop;

    --  🔴 ومقابلةُ ما خُطّط بما كُتب (161)
    if v_added + v_updated + v_same <> v_n then
      raise exception 'خُطّط لـ% نصّاً، ووقع % — إنشاءٌ % وتحديثٌ % وبلا تغيير %',
                      v_n, v_added + v_updated + v_same, v_added, v_updated, v_same;
    end if;

    --  🧪 الجافّةُ: مرّ المسارُ كلُّه بحرّاسه الأحياء، ولا يبقى منه أثر —
    --  والرمزُ رمزُ أخواتها (159): جافّةُ البوّابات واحدة
    if p_dry_run then
      raise exception using errcode = 'BY159', message = 'الجافّة تمّت';
    end if;

  exception
    when sqlstate 'BY159' then
      null;                                  -- نُقضت الكتابة، وبقي الحكم
    when others then
      v_out := jsonb_build_object(
        'ok', false, 'تجريبيّة', p_dry_run,
        'توقّف عند', v_stage, 'السبب', sqlerrm,
        'بيانٌ', 'لم يبقَ من الدفعة شيء — تُصحَّح وتُعاد كاملةً',
        'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn));
      insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
      values ('texts', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());
      return v_out;
  end;

  v_out := jsonb_build_object(
    'ok', true, 'تجريبيّة', p_dry_run,
    'المقرَّر', p_course, 'المادة', v_subject, 'العدد', v_n,
    'أُنشئ',     case when p_dry_run then null else v_added end,
    'حُدِّث',     case when p_dry_run then null else v_updated end,
    'بلا تغيير', case when p_dry_run then null else v_same end,
    'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn),
    'بيانٌ', case when p_dry_run
                  then 'جافّة: مرّ المسارُ كلُّه بحرّاسه ولم يبقَ أثر'
                  else 'اعتُمدت. ولم يُحذف شيء — والنصُّ القائمُ خارج الملفّ بقي كما هو' end);

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('texts', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());

  return v_out;
end $function$;

--  🔒 كأخواتها: للمسجَّل وحده، والحارسُ داخلها (`can_curate`)
revoke all on function public.import_texts(bigint, jsonb, boolean) from public, anon;
grant execute on function public.import_texts(bigint, jsonb, boolean) to authenticated, service_role;

insert into public.sql_log (n, title, applied_at)
values ('180', 'بوّابةُ «نصوص القراءة» — نصُّ الكتاب يصل من مشروع المادة ملفّاً', now())
on conflict (n) do update set applied_at = now();
