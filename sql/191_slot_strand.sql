-- ══════════════════════════════════════════════════════════════════════
--  ١٩١ · فرعُ الخانة من عنوان هدفها — البندُ يرث فرعَ عنوانه، فيراه عدّادُ النموذج
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٩ أكتوبر): «نفّذ العلاج» — وقد كُشف العطلُ وهو يُسأل أين يُبنى النموذج.
--
--  🔴 **العطل:** عدّادُ الأوزان في «تركيب النموذج» يعدّ السطورَ بفروعها، وفرعُ الخانة يُقرأ من هدف سؤالها
--     نفسِه (`ob.strand_id`). **والفرعُ في المنصّة للعنوان العريض لا للبند** — حكمُ `save_objective` بنصّه:
--     «الفرعُ يُنسَب إلى العنوان العريض لا إلى البند — والبندُ يرثه». والسؤالُ يُوسَم بالبند، فهو المربوطُ
--     بالدرس ⇒ كلُّ خانةٍ بلا فرع، ولا يقابل العدّادُ شيئاً من أوزان الهيئة، ومنتقي الفرع في الشاشة فارغ.
--     قِيس في القدرات (٢٩ أكتوبر): ٢٧ عنواناً كلُّها بفرع · ١٤٣ بنداً كلُّها بلا فرع، وعنوانُ كلٍّ منها بفرع ·
--     والمربوطُ بالدروس البنودُ الـ١٤٣ وحدها.
--
--  وأربعةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **العلاجُ في القارئ لا في البيانات:** البياناتُ على حكم المنصّة، والقارئُ هو الذي نسيه. ونسخُ فرع العنوان
--     إلى بنوده يخالف حارسَ `save_objective` نفسَه، ويترك نسختين تفترقان يومَ ينتقل عنوانٌ إلى فرعٍ آخر.
--  ② **فرعُ الهدف، وإلّا فرعُ عنوانه — مستوًى واحد:** الأهدافُ عنوانٌ وبنودُه ولا أعمق (قِيس على المنصّة كلِّها:
--     لا هدفَ تحت بند، ولا بندَ يحمل فرعاً). فالسطرُ دقيقٌ لا تقريب، وشجرةٌ أعمقُ يوماً تقتضي مشياً إلى الجذر.
--  ③ **قارئان لا غير:** `bank_slots` (خاناتُ البنك في شاشة التركيب) و`quiz_for_edit` (سطورُ النموذج المحفوظة).
--     قِيست الدوالُّ السبعُ التي تذكر الأهدافَ والفرع: الباقيةُ تقرأ فرعَ الدرس أو مصدره (`authoring_gaps` ·
--     `course_state`)، أو هي الشجرةُ وبصمتُها (`objectives_tree` تعرض العنوانَ بفرعه وبنودَه تحته · `objectives_fp`)،
--     أو كاتبُها وحارسُه (`save_objective`).
--  ④ **ترقيعٌ بالمرسى في الحيّة** (نسقُ 185): أربعةُ مراسٍ في الدالّتين، كلٌّ مرّةً واحدة — سطرا الفرع وتعليقاهما —
--     قِيست على الحيّة (٢٩ أكتوبر) ولا `\r` فيهما. و`create or replace` يُبقي المنحَ كما هو (`authenticated` وحده).
--
--  📐 وما ليس هنا عمداً:
--  · استيرادُ البنك — ملفٌّ بعده إن أُذن.
--  · لا بنكَ ولا نموذجَ في القاعدة اليوم (قِيس) ⇒ لا مخرجَ حيٌّ يتغيّر بهذا الملفّ. والتجربةُ الجافّة تبني بنكاً
--    ونموذجاً في معاملتها، ثمّ تنقضهما.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ تمهيد ═══════════════════

-- المُرقِّع: أثلاثُ [مرسى، بديل، عدد] على الحيّة — والعددُ ما قِيس أو لا شيء (نسقُ 185 بحرفه).
create or replace function pg_temp.patch191(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; k int; n int;
        crlf boolean := position(E'\r' in pg_get_functiondef(p_fn)) > 0;
begin
  if coalesce(array_length(p_patches, 1), 0) % 3 <> 0 then
    raise exception '191 · %: المراسي أثلاثٌ [مرسى، بديل، عدد]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 3 loop
    a := p_patches[i];
    b := p_patches[i + 1];
    k := p_patches[i + 2]::int;
    if crlf then a := replace(a, E'\n', E'\r\n'); b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> k then
      raise exception '191 · %: وُجد المرسى «%» % مرّةً لا % — لا يُرقَّع على الظنّ', p_fn, a, n, k;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;


-- ═══════════════════ معدَّلة ═══════════════════

-- ① bank_slots — خاناتُ البنك في شاشة التركيب (رأس الملفّ ③)
do $$
begin
  if position('-- 191 ·' in pg_get_functiondef('public.bank_slots(bigint)'::regprocedure)) > 0 then
    raise notice '191: فرعُ العنوان قائمٌ في bank_slots من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch191('public.bank_slots(bigint)', array[
    $a$والفرعُ من هدف السؤال،$a$,
    $b$والفرعُ من هدف السؤال أو من عنوانه (191)،$b$, '1',

    $a$'strand_id', ob.strand_id,$a$,
    $b$'strand_id', coalesce(ob.strand_id, (select h.strand_id from objectives h where h.id = ob.parent_id)),   -- 191 · البندُ يرث فرعَ عنوانه$b$, '1']);
end $$;

-- ② quiz_for_edit — سطورُ النموذج المحفوظة (رأس الملفّ ③)
do $$
begin
  if position('-- 191 ·' in pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure)) > 0 then
    raise notice '191: فرعُ العنوان قائمٌ في quiz_for_edit من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch191('public.quiz_for_edit(bigint)', array[
    $a$وفرعِها من هدفها$a$,
    $b$وفرعِها من هدفها أو عنوانه (191)$b$, '1',

    $a$'strand_id', (select ob.strand_id from objectives ob where ob.id = sv.objective_id),$a$,
    $b$'strand_id', (select coalesce(ob.strand_id, h.strand_id) from objectives ob
                                left join objectives h on h.id = ob.parent_id
                               where ob.id = sv.objective_id),   -- 191 · البندُ يرث فرعَ عنوانه$b$, '1']);
end $$;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('191', 'فرعُ الخانة من عنوان هدفها — البندُ يرث فرعَ عنوانه، فيراه عدّادُ النموذج', now())
on conflict (n) do update set applied_at = now();
