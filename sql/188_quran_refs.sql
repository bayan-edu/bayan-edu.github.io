-- ══════════════════════════════════════════════════════════════════════
--  ١٨٨ · سورةُ كلّ كتلةٍ قرآنيّةٍ في النصّ — تُحفظ مع المصدر ولا تُخمَّن
-- ══════════════════════════════════════════════════════════════════════
--
--  الخطوةُ الثانية من أربعٍ لتلاوة الآيات في الكتاب المقلَّب (قرارُ المالك · ٢٦–٢٧ أكتوبر): الآيةُ تُسمع
--  بتلاوةٍ مسجَّلة لا بصوتٍ مولَّد — الحصري مرتّلاً، روايةُ حفص. والتلاوةُ في R2 منذ ٢٧ أكتوبر:
--  `quran/husary/SSSAAA.mp3` — ٦٢٣٩ ملفّاً (٦٢٣٦ آية ومعها الاستعاذةُ والبسملة)، طابقت بصماتِ المصدر كلُّها.
--
--  والملفُّ يُعرف بالسورة والآية. **والآيةُ رقمُها في النصّ (`۝١٥١`)، والسورةُ لا:** عقدُ التأليف يكتبها في
--  العنوان أو الوصف نصّاً حرّاً (§⑭ «المتن»)، ولا شيءَ بعد «﴾» (الإحالةُ تقطع اتّصالَ الآيات).
--  ⇒ **يحفظها المحرّرُ لكلّ كتلة ﴿…﴾ بترتيبها في النصّ**، ولا تُستخرج من العنوان: آيةٌ تُتلى من غير
--  سورتها أسوأُ من الصمت.
--
--  وأحكام:
--  ① **ومع السورة أوّلُ آيات الكتلة وآخرُها** — `[{"surah":6,"from":151,"to":153}, …]` — فالكتابُ يطابقها
--     بالنصّ عند العرض: كتلةٌ تغيّر مداها بعد الحفظ تصمت ولا تُتلى خطأً. والنصُّ يُكتب من غير هذا الباب:
--     `import_texts` تعيد كتابةَ نصٍّ قائم بـ`save_item` (قِيس)، ولا يُعرف ما يُكتب غداً.
--  ② **دالّةٌ مستقلّة لا وسيطٌ في `save_item`.** توسيعُها يولد توقيعاً ثانياً ويقتضي `drop` الأوّل (PostgREST
--     لا يختار بين اثنين)، والحذفُ على الحيّة بإذن. ⇒ `save_item_quran` يناديها المحرّرُ بعد `save_item`،
--     بحارسها نفسِه حرفاً: `can_author`، ثمّ المؤلّفُ أو المشرفُ على المعتمد. وإن فشلت بعد نجاح الأولى
--     فالنصُّ محفوظٌ والسورُ قديمة ⇒ صمتٌ لا خطأ (①).
--  ③ **عمودٌ باسمه `quran_refs` لا `audio` عامّ.** السورةُ حقيقةٌ عن النصّ — تصلح يوماً إحالةً تحت الآية —
--     والصوتُ المولَّد إن جاء مشتقٌّ يُعاد توليدُه ويُعتمد. وعمودٌ يجمعهما تكتب إعادةُ التوليد فيه فوق السور.
--  ④ **عددُ آيات كلّ سورة مستخرَجٌ من ملفّات التلاوة نفسِها:** أكبرُ رقم آيةٍ لكلّ سورة في قائمة بصمات المصدر
--     (`everyayah.com/data/Husary_64kbps/000_checksum.md5`) — ١١٤ سورة · ٦٢٣٦ آية · ولا ثقبَ في سورة (قِيس
--     ٢٧ أكتوبر). ⇒ **ما يقبله الحارسُ له ملفٌّ في R2.** ونسخةٌ منه في الواجهة تُقاس على هذا السطر ولا تُكتب
--     من الذاكرة.
--  ⑤ **والحارسُ قيدٌ على الجدول لا شرطٌ في الدالّة وحدها**، فيُمسك كلَّ كاتبٍ اليومَ وغداً. والقيدُ يستدعيه في
--     كلّ كتابةٍ على `items` بهويّة الكاتب ⇒ يُمنح `authenticated` (والكتّابُ الثلاثةُ اليوم `definer` — قِيس:
--     `save_item` · `import_texts` · `reorder_items`).
--
--  📐 وما ليس هنا عمداً: قراءةُ الطالب — `itemText` (`js/api.js`) تقرأ الجدولَ بمنحه، والمنحُ على الجدول كلِّه
--     (قِيس) ⇒ العمودُ الجديد يُقرأ بلا منحٍ جديد، والسياسةُ `p_items_read` تحرس الصفّ كما كانت · وسورُ النصّ
--     المستورَد: يصمت حتى يحفظها المعلّم · وأيُّ مساسٍ بـ`save_item` (بصمتُها تُفحص في الختام).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الثابتُ والحارس — منشأتان ═══════════════════

create or replace function public.quran_ayat(p_surah int)
returns int language sql immutable parallel safe set search_path to 'public'
as $fn$
  select (array[
      7,286,200,176,120,165,206, 75,129,109,123,111, 43, 52, 99,128,111,110, 98,135,   --   1–20
    112, 78,118, 64, 77,227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83,182, 88, 75, 85,   --  21–40
     54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13,   --  41–60
     14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42,   --  61–80
     29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11,  8,  8, 19,  5,  8,  8, 11,   --  81–100
     11,  8,  3,  9,  5,  4,  7,  3,  6,  3,  5,  4,  5,  6                            -- 101–114
  ]::int[])[p_surah]
$fn$;

comment on function public.quran_ayat(int) is
  'عددُ آيات السورة (حفص) — من ملفّات التلاوة في R2 نفسِها (188 ④). والسورةُ خارج ١–١١٤ ⇒ null.';

/* لا يقبل إلا مصفوفةً غيرَ فارغة، كلُّ عنصرٍ فيها {surah, from, to} أعدادٌ صحيحةٌ لا غيرُها،
   والسورةُ ١–١١٤، و١ ≤ from ≤ to ≤ عددُ آياتها. والفارغةُ تُردّ: «لا كتلة» تُحفظ null لا [] (③ أدناه).
   ⚠️ والفحوصُ متتابعةٌ بـif لا مجموعةٌ بـand: ترتيبُ تقييم and لا يُضمن، و`jsonb_object_keys` على غير
      كائنٍ ترفع خطأً بدل أن تردّ false. */
create or replace function public.quran_refs_ok(p jsonb)
returns boolean language plpgsql immutable parallel safe set search_path to 'public'
as $fn$
declare e jsonb; s int; a int; z int;
begin
  if p is null then return true; end if;
  if jsonb_typeof(p) <> 'array' or jsonb_array_length(p) = 0 then return false; end if;
  for e in select x from jsonb_array_elements(p) x loop
    if jsonb_typeof(e) <> 'object' then return false; end if;
    if (select count(*) from jsonb_object_keys(e)) <> 3
       or not (e ? 'surah' and e ? 'from' and e ? 'to') then return false; end if;
    if jsonb_typeof(e->'surah') <> 'number' or jsonb_typeof(e->'from') <> 'number'
       or jsonb_typeof(e->'to') <> 'number' then return false; end if;
    /* عددٌ صحيحٌ موجب: «6.0» و«-1» تبقى نصّاً لا يطابق — و«1e2» يحفظها jsonb ‏100 فتُقبل، وهي كذلك (قِيس) */
    if not (e->>'surah' ~ '^[0-9]{1,3}$' and e->>'from' ~ '^[0-9]{1,3}$'
            and e->>'to' ~ '^[0-9]{1,3}$') then return false; end if;
    s := (e->>'surah')::int; a := (e->>'from')::int; z := (e->>'to')::int;
    if s < 1 or s > 114 or a < 1 or a > z or z > quran_ayat(s) then return false; end if;
  end loop;
  return true;
end $fn$;

comment on function public.quran_refs_ok(jsonb) is
  'حارسُ items.quran_refs (188): null، أو مصفوفةٌ من {surah, from, to} داخل عدد آيات السورة.';


-- ═══════════════════ ② العمودُ وقيدُه — منشأ ═══════════════════

alter table public.items add column if not exists quran_refs jsonb;

alter table public.items drop constraint if exists items_quran_refs_ok;
alter table public.items add constraint items_quran_refs_ok check (public.quran_refs_ok(quran_refs));

comment on column public.items.quran_refs is
  'سورةُ كلّ كتلة ﴿…﴾ في body بترتيبها، ومعها أوّلُ آياتها وآخرُها: [{"surah":6,"from":151,"to":153}]. '
  'يكتبها save_item_quran وحدها (188). والكتابُ يطابقها بالنصّ، فما لا يطابق يصمت ولا يُتلى.';


-- ═══════════════════ ③ بابُ الكتابة — منشأة ═══════════════════

/* حارسُها حارسُ `save_item` في التحديث حرفاً (② في الرأس): can_author على مادّة الدرس، ثمّ المعتمدُ
   (created_by null) للمشرف والإضافيُّ لصاحبه. والنصوصُ وحدها: needs = 'body'.
   و[] تُحفظ null — نصٌّ حُذفت آياتُه كلُّها لا يحمل سوراً. */
create or replace function public.save_item_quran(p_id bigint, p_refs jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_subject bigint; v_needs text; v_refs jsonb; v_id bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select l.subject_id, k.needs into v_subject, v_needs
    from items i
    join lessons l on l.id = i.lesson_id
    left join item_kinds k on k.code = i.kind
   where i.id = p_id;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود');
  end if;

  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  if v_needs is distinct from 'body' then
    return jsonb_build_object('ok', false, 'error', 'هذا المصدر ليس نصّاً، والسور تُحفظ للنصوص وحدها');
  end if;

  v_refs := case when p_refs is null or p_refs = '[]'::jsonb then null else p_refs end;
  if not quran_refs_ok(v_refs) then
    return jsonb_build_object('ok', false,
      'error', 'رقم سورة أو آية غير صحيح: السورة من ١ إلى ١١٤، والآية ضمن عدد آيات سورتها');
  end if;

  update items set quran_refs = v_refs
   where id = p_id
     and (created_by is null and can_curate(v_subject) or created_by = auth.uid())
  returning id into v_id;
  if v_id is null then
    return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود أو ليس من تأليفك');
  end if;

  return jsonb_build_object('ok', true, 'id', v_id);
end $fn$;

comment on function public.save_item_quran(bigint, jsonb) is
  'تحفظ سورَ الكتل القرآنيّة في نصّ (items.quran_refs) — يناديها المحرّرُ بعد save_item، بحارسها (188).';


-- ═══════════════════ ④ قراءةُ المحرّر — معدَّلة لا منشأة ═══════════════════

/* `lesson_items` تبني عنصرَ المحرّر بمفاتيحَ مسمّاةٍ لا بالصفّ كلِّه، فالعمودُ لا يبلغها وحده — والمحرّرُ
   يحتاجه ليملأ السورَ عند الفتح، والمعاينةُ لتُسمِع الآية. ⇒ مفتاحٌ واحدٌ بعد `body`، **بالمرسى لا بنسخ
   الدالّة** (§٣ من الانضباط): المرسى قِيس على الحيّة مرّةً واحدة، والبصمةُ بصمتُها يوم قُرئت (٢٧ أكتوبر). */
do $do$
declare v text; n int;
begin
  v := pg_get_functiondef('public.lesson_items(bigint)'::regprocedure);
  n := (select count(*) from regexp_matches(v, $p$'body', i\.body, 'quiz_id'$p$, 'g'));
  if n = 0 then
    if v ~ $p$'quran_refs', i\.quran_refs$p$ then raise notice '188: lesson_items تحمل quran_refs من قبل'; return; end if;
    raise exception '188: مرسى lesson_items غائب ولا quran_refs فيها — تُقرأ الدالّةُ قبل الترقيع';
  end if;
  if n <> 1 then raise exception '188: مرسى lesson_items وُجد % مرّة لا مرّةً واحدة', n; end if;
  if md5(v) <> '36b1ef65a1bd334e0176bd249f4cce27' then
    raise exception '188: lesson_items تغيّرت منذ قُرئت (٢٧ أكتوبر) — تُقرأ ثانيةً قبل الترقيع';
  end if;
  execute regexp_replace(v, $p$'body', i\.body, 'quiz_id'$p$,
                            $r$'body', i.body, 'quran_refs', i.quran_refs, 'quiz_id'$r$);
end $do$;


-- ═══════════════════ ⑤ المنح ═══════════════════

/* الثلاثُ جديدة ⇒ `fn_auto_lock` يسحب عنها PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً.
   والحارسان يُمنحان `authenticated` لأنّ القيدَ يستدعيهما بهويّة الكاتب (⑤ في الرأس). */
revoke all on function public.quran_ayat(int), public.quran_refs_ok(jsonb),
                       public.save_item_quran(bigint, jsonb) from public, anon;
grant execute on function public.quran_ayat(int), public.quran_refs_ok(jsonb),
                          public.save_item_quran(bigint, jsonb) to authenticated, service_role;


-- ═══════════════════ ⑥ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if (select data_type from information_schema.columns
       where table_schema = 'public' and table_name = 'items' and column_name = 'quran_refs') is distinct from 'jsonb' then
    raise exception '188: العمودُ quran_refs غائب أو بغير jsonb';
  end if;
  if not exists (select 1 from pg_constraint
                  where conrelid = 'public.items'::regclass and conname = 'items_quran_refs_ok') then
    raise exception '188: القيدُ items_quran_refs_ok غائب';
  end if;
  if (select sum(public.quran_ayat(s)) from generate_series(1, 114) s) <> 6236 then
    raise exception '188: مجموعُ الآيات ليس ٦٢٣٦';
  end if;
  if not (has_function_privilege('authenticated', 'public.save_item_quran(bigint, jsonb)', 'execute')
          and has_function_privilege('authenticated', 'public.quran_refs_ok(jsonb)', 'execute')
          and has_function_privilege('authenticated', 'public.quran_ayat(int)', 'execute')) then
    raise exception '188: منحُ authenticated ناقص';
  end if;
  if has_function_privilege('anon', 'public.save_item_quran(bigint, jsonb)', 'execute') then
    raise exception '188: save_item_quran يبلغها الزائر';
  end if;
  if pg_get_functiondef('public.lesson_items(bigint)'::regprocedure) !~ $p$'quran_refs', i\.quran_refs$p$ then
    raise exception '188: lesson_items لم تُرقَّع';
  end if;
  /* ② في الرأس: save_item لا تُمسّ — بصمتُها يوم قُرئت (٢٧ أكتوبر) */
  if md5(pg_get_functiondef('public.save_item(bigint,bigint,text,text,text,text,text,bigint,integer,integer,text,boolean,boolean,boolean,text,bigint)'::regprocedure))
     <> 'd8c47a6ea701e1d91ad83929c0452fde' then
    raise exception '188: بصمةُ save_item تغيّرت';
  end if;
end $chk$;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('188', 'سورةُ كلّ كتلةٍ قرآنيّةٍ في النصّ — تُحفظ مع المصدر ولا تُخمَّن', now())
on conflict (n) do update set applied_at = now();
