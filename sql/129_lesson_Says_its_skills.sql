-- ═══════════════════════════════════════════════════════════════════════
--  129 · الدرسُ يقول ما مهاراتُه — فتجد الأتمتةُ من أين تبدأ
-- ═══════════════════════════════════════════════════════════════════════
--
--  لماذا هذا الملفّ:
--
--  فتح ١٢٨ بابَ كتابة الأهداف، فصار للمادة معجمُ مهاراتٍ يُكتب. لكنّ المعجم
--  وحده **قائمةٌ عائمة**: لا أحد يعرف أيَّ مهارةٍ يخصُّ هذا الدرسَ بعينه.
--  وذلك يوقف طرفين معاً:
--
--  ① **الأتمتة.** حين تُكتب أسئلةُ درسٍ آلياً، أولُ سؤالٍ يُسأل: «ما المهارات
--     المستهدَفة هنا؟» ولا جواب. فإمّا أن تُخمّن الآلةُ من العنوان — وذاك
--     تأليفٌ بلا معيار — أو تعرض على المؤلّف مئةَ هدفٍ في المادة فيبحث فيها
--     بيده عن كلِّ سؤال. والبحثُ في مئةٍ عند كلِّ سؤالٍ يُترك، فيبقى
--     `questions.objective_id` فارغاً كما هو اليوم في **٤٠٥ أسئلةٍ حيّة**.
--
--  ② **دمجُ أكواد التشخيص ٣٦ ← ١٥.** الكود بعد الدمج يقول «كيف فكّر» ويُسقط
--     البعدَ المادّيّ («في أيِّ شيء»). وذلك البعد يُستعاد من الهدف — إن كان
--     ثمّة هدف. فهذا الجدول شرطٌ لتلك الهجرة، لا ترفٌ يسبقها.
--
--  ⇒ فالمطلوب حلقةٌ واحدة: **درسٌ ⟷ أهدافُه**. ثلاثةُ أعمدة، لا أكثر.
--
--  وقراران لا يُقرآن من الشيفرة:
--
--  ① **بنودٌ فقط، لا عناوينَ عريضة.**
--     ١٢٨ أجّل هذا الحارس في `save_question` لأنها ليست موضعَه — وهذا موضعُه.
--     الدرسُ الذي يستهدف «الماضي البسيط عموماً» لا يُنتج علاجاً، والعنوانُ
--     العريض يُشتقّ للتقرير من بنوده، فلا حاجةَ لتعليقه. **والحارس هنا يكفي
--     الأتمتة**: إن اختارت من قائمة الدرس فهي تختار بنداً بالضرورة.
--
--  ② **حذفُ الدرس يجرف الحلقة، وحذفُ الهدف يصرخ.**
--     الحلقةُ بلا درسِها لا معنى لها ⇒ `cascade`. أمّا هدفٌ معلَّقٌ على دروس
--     فحذفُه خسارةُ معنًى ⇒ يُمنع حتى تُفكَّ حلقاتُه بيد. والصامت أخطر من
--     الصاخب — كما في ١٢٨ حرفاً بحرف.
--
--  🔑 والمسطرة نفسُها تحكم القائمة:
--     **الدرسُ الذي يستهدف كلَّ شيءٍ لا يستهدف شيئاً.** فإن تجاوزت أهدافُه
--     اثني عشر، رُدَّ تنبيهٌ يُرى — ولا يُمنع، لأن المنع في العدد حكمٌ بلا دليل.
--
-- ═══════════════════════════════════════════════════════════════════════

begin;

-- ─── ① الجدول · منشأة ──────────────────────────────────────────────────

create table if not exists public.lesson_objectives (
  lesson_id    bigint  not null references public.lessons(id)    on delete cascade,
  objective_id bigint  not null references public.objectives(id) on delete restrict,
  position     integer not null default 0,
  primary key (lesson_id, objective_id)
);

-- الترتيبُ يُقرأ كثيراً ⇒ فهرسٌ عليه. ولا فرادةَ على (درس · موضع): إعادةُ
-- الترتيب تمرّ بمواضعَ متكرّرةٍ لحظةً، ولا يُكسر حفظٌ صحيحٌ لسببٍ عابر.
create index if not exists lesson_objectives_lesson_idx
  on public.lesson_objectives (lesson_id, position);

create index if not exists lesson_objectives_objective_idx
  on public.lesson_objectives (objective_id);

-- ─── ② السياسة بالصفّ ──────────────────────────────────────────────────
--
--  الحلقةُ تُقرأ إن قُرئ درسُها — بحرف سياسة `lessons` نفسِها، صريحةً لا
--  متوكّلةً على استنتاج. ولا سياسةَ كتابةٍ إطلاقاً: البابُ الوحيد هو الدالّة.

alter table public.lesson_objectives enable row level security;

drop policy if exists p_lesson_objectives_read on public.lesson_objectives;

create policy p_lesson_objectives_read
  on public.lesson_objectives
  for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.lessons l
       where l.id = lesson_objectives.lesson_id
         and (is_teacher() or (l.published and l.archived_at is null))
    )
  );

-- ─── ③ الصلاحية بالعمود ────────────────────────────────────────────────
--
--  المنحُ الافتراضيُّ في سوبابيز يُعطي الجدولَ الجديدَ كلَّ شيء. فيُسحب ما
--  لا يمرّ من الباب. والدالّة `security definer` فلا يمسُّها السحب.

revoke insert, update, delete, truncate on public.lesson_objectives
  from anon, authenticated;

grant select on public.lesson_objectives to authenticated;

-- ─── ④ الدالّة · منشأة ─────────────────────────────────────────────────
--
--  «استبدالٌ كامل» لا «إضافةٌ وحذف»: المحرّرُ يرسل القائمة كما استقرّت،
--  والترتيبُ هو ترتيبُ المصفوفة. فلا حالةَ وسطى تُنسى.

create or replace function public.set_lesson_objectives(
  p_lesson     bigint,
  p_objectives bigint[] default '{}'::bigint[]   -- مصفوفةٌ فارغة ⇒ إفراغُ القائمة
) returns jsonb
  language plpgsql
  security definer
  set search_path to 'public'
as $function$
declare
  v_subject bigint;
  v_list    bigint[];
  v_bad     text;
  v_orphan  text;
  v_n       int;
  v_warn    text;
begin
  -- ① الهوية
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  -- ② الدرس
  if p_lesson is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس مطلوب');
  end if;

  select l.subject_id into v_subject from lessons l where l.id = p_lesson;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;

  -- ③ الصلاحية — في مادة الدرس
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'لا تملك حقّ التأليف في مادة هذا الدرس');
  end if;

  v_list := coalesce(p_objectives, '{}'::bigint[]);
  v_n    := coalesce(array_length(v_list, 1), 0);

  -- ④ لا تكرار — التكرارُ في القائمة خطأُ إرسالٍ لا نيّةَ مؤلّف
  if v_n > (select count(distinct x) from unnest(v_list) x) then
    return jsonb_build_object('ok', false,
      'error', 'هدفٌ مكرَّرٌ في القائمة');
  end if;

  if v_n > 0 then
    -- ⑤ موجودٌ، ومن مادة الدرس
    select string_agg(x::text, '، ') into v_bad
      from unnest(v_list) x
     where not exists (
       select 1 from objectives o
        where o.id = x and o.subject_id is not distinct from v_subject);
    if v_bad is not null then
      return jsonb_build_object('ok', false,
        'error', 'هدفٌ غير موجودٍ أو من مادةٍ أخرى: ' || v_bad);
    end if;

    -- ⑥ بندٌ لا عنوانٌ عريض — الحارس الذي أجّله ١٢٨ يجد موضعَه
    select string_agg(o.code, '، ') into v_bad
      from objectives o
     where o.id = any(v_list)
       and exists (select 1 from objectives k where k.parent_id = o.id);
    if v_bad is not null then
      return jsonb_build_object('ok', false,
        'error', 'عنوانٌ عريضٌ لا يُعلَّق على درس — علّق بنودَه: ' || v_bad);
    end if;
  end if;

  -- ⑦ الكتابة — استبدالٌ كامل
  delete from lesson_objectives where lesson_id = p_lesson;

  if v_n > 0 then
    insert into lesson_objectives (lesson_id, objective_id, position)
    select p_lesson, x.id, x.ord
      from unnest(v_list) with ordinality as x(id, ord);
  end if;

  -- ⑧ الفجوةُ تُرى والصمتُ لا يُرى
  select string_agg(o.code, '، ') into v_orphan
    from objectives o
   where o.id = any(v_list) and o.remedial_item_id is null;

  if v_orphan is not null then
    v_warn := 'أهدافٌ بلا علاج: ' || v_orphan
           || ' — التشخيص سيقول أين أخطأ، ولا يقول إلى أين يذهب';
  elsif v_n > 12 then
    v_warn := 'الدرسُ يستهدف ' || v_n
           || ' هدفاً — والذي يستهدف كلَّ شيءٍ لا يستهدف شيئاً';
  end if;

  return jsonb_build_object(
    'ok',     true,
    'lesson', p_lesson,
    'عددها',  v_n,
    'warn',   v_warn);
end
$function$;

-- ─── ⑤ المنح — صريحٌ لينجو يوم يُحكَم EXECUTE ──────────────────────────

revoke all on function
  public.set_lesson_objectives(bigint, bigint[]) from public;

grant execute on function
  public.set_lesson_objectives(bigint, bigint[]) to authenticated;

-- ─── ⑥ ختمُ الملفّ ─────────────────────────────────────────────────────

insert into public.sql_log (n, title, applied_at)
values ('129', 'الدرسُ يقول ما مهاراتُه — فتجد الأتمتةُ من أين تبدأ', now())
on conflict (n) do update set applied_at = now();

commit;


/* ══════════════════════════════════════════════════════════════════════
   الفحص — يُنسخ وحده ويُشغَّل وحده. لا يعمل بلصق الملفّ.

   وكلُّ بندٍ يقول **المنتظَر** بجوار المقيس.

   بدّل ‹uuid› بمعرّف مؤلّفٍ محقَّقٍ في مادة الدرس، و‹درس› بمعرّف درسٍ فيها،
   و‹بند١›/‹بند٢› بمعرّفَي هدفين **من مادة الدرس نفسِها** بلا بنودٍ تحتهما،
   و‹عنوان› بمعرّف هدفٍ تحته بنود.
   ══════════════════════════════════════════════════════════════════════

begin;

-- ① البنية وصلت
select 'الجدول' as البند, 'موجود' as المنتظر,
       case when to_regclass('public.lesson_objectives') is not null
            then 'موجود' else '🔴 مفقود' end as المقيس
union all
select 'RLS مفعَّل', 'مفعَّل',
       case when (select relrowsecurity from pg_class
                   where oid='public.lesson_objectives'::regclass)
            then 'مفعَّل' else '🔴 مطفأ' end
union all
select 'سياسة القراءة', 'موجودة',
       case when exists (select 1 from pg_policies
                          where schemaname='public' and tablename='lesson_objectives'
                            and policyname='p_lesson_objectives_read')
            then 'موجودة' else '🔴 مفقودة' end
union all
select 'الكتابة المباشرة لـ authenticated', 'ممنوعة',
       case when has_table_privilege('authenticated','public.lesson_objectives','insert')
            then '🔴 مسموحة' else 'ممنوعة' end
union all
select 'تنفيذ الدالّة لـ authenticated', 'ممنوح',
       case when has_function_privilege('authenticated',
              'public.set_lesson_objectives(bigint,bigint[])','execute')
            then 'ممنوح' else '🔴 غير ممنوح' end;

-- ② بلا هوية ⇒ يُرفض        · المنتظر: ok=false «يلزم تسجيل الدخول»
select set_lesson_objectives(‹درس›, array[‹بند١›]::bigint[]) as بلا_هوية;

-- ③ درسٌ غير موجود ⇒ يُرفض  · المنتظر: ok=false «الدرس غير موجود»
select set_lesson_objectives(-1, '{}'::bigint[]) as درس_وهميّ
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ④ هدفٌ من مادةٍ أخرى ⇒ يُرفض · المنتظر: ok=false «غير موجودٍ أو من مادةٍ أخرى»
select set_lesson_objectives(‹درس›, array[-99]::bigint[]) as مادة_أخرى
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ⑤ عنوانٌ عريض ⇒ يُرفض     · المنتظر: ok=false «عنوانٌ عريضٌ لا يُعلَّق على درس»
select set_lesson_objectives(‹درس›, array[‹عنوان›]::bigint[]) as عنوان_عريض
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ⑥ تكرارٌ في القائمة ⇒ يُرفض · المنتظر: ok=false «هدفٌ مكرَّر»
select set_lesson_objectives(‹درس›, array[‹بند١›,‹بند١›]::bigint[]) as مكرَّر
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ⑦ بندان صحيحان ⇒ يُقبل     · المنتظر: ok=true، عددها=٢، والمواضع ١ ثمّ ٢
select set_lesson_objectives(‹درس›, array[‹بند١›,‹بند٢›]::bigint[]) as حفظ
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

select objective_id, position from lesson_objectives
 where lesson_id = ‹درس› order by position;

-- ⑧ الاستبدال كامل ⇒ يبقى واحد · المنتظر: العدد ١ لا ٣
select set_lesson_objectives(‹درس›, array[‹بند٢›]::bigint[]) as استبدال,
       (select count(*) from lesson_objectives where lesson_id = ‹درس›) as العدد
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ⑨ الإفراغ ⇒ صفر            · المنتظر: العدد ٠
select set_lesson_objectives(‹درس›, '{}'::bigint[]) as إفراغ,
       (select count(*) from lesson_objectives where lesson_id = ‹درس›) as العدد
  from (select set_config('request.jwt.claims',
        json_build_object('sub','‹uuid›')::text, true)) _;

-- ⑩ حذفُ هدفٍ معلَّقٍ يصرخ    · المنتظر: خطأُ قيدٍ مرجعيّ، لا حذفٌ صامت
--    (يُجرَّب وحده إن أردت — ويُلغى بالـ rollback في آخر الكتلة)

rollback;

   ══════════════════════════════════════════════════════════════════════ */
