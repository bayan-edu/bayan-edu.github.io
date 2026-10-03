-- ══════════════════════════════════════════════════════════════════════
--  ١٤٣ · فهرسُ أهداف المادة — قراءةٌ واحدةٌ لشاشة المحرّر
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: شاشةُ «أهداف المادة» في المحرّر — تُعرض وتُحرَّر ويُضاف إليها.
--  وهي أختُ شاشة «فروع المادة»: نداءٌ واحدٌ يبني الشجرةَ كلَّها، ثمّ
--  `save_objective` تكتب. ولا كاتبَ ثانٍ.
--
--  🔑 **والمراجعةُ ليست قراءةَ أسماء.** فالأسماءُ تبدو حسنةً كلُّها، وإنّما
--  تُراجَع الأهدافُ بأربعة عيوبٍ لا تُرى إلا بالأرقام إلى جانب كلّ بند:
--    ① بندٌ لا سؤالَ يقيسه     ⇒ التشخيصُ لا ينطق عنه أبداً
--    ② بندٌ بلا علاجٍ موصول    ⇒ يقول «أين أخطأ» ولا يقول «إلى أين»
--    ③ بندان علاجُهما واحد     ⇒ أثرُ الطالب ينشقّ وعلاجُه يتكرّر
--    ④ عنوانٌ تحته بندٌ واحد    ⇒ تقسيمٌ لا يصف مهارة
--  ⇒ فكلُّ بندٍ يحمل هنا: كم درساً يستهدفه · كم سؤالاً يقيسه · وهل له
--    علاجٌ موصولٌ أم وصفٌ فقط. **وبهذه الأعداد يصير الفهرسُ آلةَ فحصٍ
--    لا وثيقةً تُقرأ.** والثالثُ يُرى بوضع العلاجَين الموصوفَين متجاورَين،
--    ولذلك يُرجَع `remedy_note` كاملاً لا مختصراً.
--
--  وقراران يُقرآن ولا يُستنتجان:
--
--  ① **الفروعُ تُرجَع معها** — لأنّ العنوان يُنسَب إلى ورقةٍ منها، ولا يُبنى
--     حقلُ اختيارٍ بنداءٍ ثانٍ. و`leaf` محسوبةٌ هنا لا في الواجهة: القاعدةُ
--     تعرف من له أبناء، والواجهةُ تخمّن.
--
--  ② **`can_author` لا `can_curate`** — الشاشةُ تكتب بـ`save_objective`،
--     وحارسُها `can_author`. فمن يقرأ هنا يستطيع أن يكتب، ولا تُفتح شاشةُ
--     تحريرٍ لمن سيُردّ عند الحفظ.
-- ══════════════════════════════════════════════════════════════════════

create or replace function public.objectives_tree(p_subject bigint)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare v_scale bigint; v jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  if not exists (select 1 from subjects s where s.id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  if not can_author(p_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  select s.scale_id into v_scale from subjects s where s.id = p_subject;

  select jsonb_build_object(
    'ok', true,
    'subject_id', p_subject,
    'scale', v_scale,

    -- ① فروعُ المادة، و`leaf` محسوبة
    'strands', coalesce((select jsonb_agg(jsonb_build_object(
        'id', st.id, 'code', st.code, 'name', st.name,
        'leaf', not exists (select 1 from strands c where c.parent_id = st.id))
        order by st.sort_order, st.id)
      from strands st where st.subject_id = p_subject), '[]'::jsonb),

    'headings', coalesce((select jsonb_agg(jsonb_build_object(
        'id', h.id, 'code', h.code, 'name', h.name,
        'strand_id',   h.strand_id,
        'strand_code', (select st.code from strands st where st.id = h.strand_id),
        'strand_name', (select st.name from strands st where st.id = h.strand_id),
        'items', coalesce((select jsonb_agg(jsonb_build_object(
            'id', o.id, 'code', o.code, 'name', o.name,
            'evidence', o.evidence, 'remedy_note', o.remedy_note,
            'remedy_item_id', o.remedial_item_id,
            'remedy_item_title', (select it.title from items it
                                   where it.id = o.remedial_item_id),
            'lessons',   (select count(*) from lesson_objectives lo
                           where lo.objective_id = o.id),
            'questions', (select count(*) from questions q
                           where q.objective_id = o.id and q.retired_at is null))
            order by o.code)
          from objectives o where o.parent_id = h.id), '[]'::jsonb))
        order by (select st.sort_order from strands st where st.id = h.strand_id)
                 nulls last, h.code)
      from objectives h
     where h.subject_id = p_subject
       and h.scale_id is not distinct from v_scale
       and h.parent_id is null), '[]'::jsonb),

    -- بنودٌ بلا عنوان: لا ينبغي أن توجد، وإن وُجدت فلا تُخفى
    'orphans', coalesce((select jsonb_agg(jsonb_build_object(
        'id', o.id, 'code', o.code, 'name', o.name) order by o.code)
      from objectives o
     where o.subject_id = p_subject and o.scale_id is not distinct from v_scale
       and o.parent_id is null
       and not exists (select 1 from objectives k where k.parent_id = o.id)
       and o.strand_id is null), '[]'::jsonb)
  ) into v;

  return v;
end
$function$;

revoke all on function public.objectives_tree(bigint) from public, anon;
grant execute on function public.objectives_tree(bigint) to authenticated;

comment on function public.objectives_tree(bigint) is
  'فهرسُ أهداف المادة لشاشة المحرّر: العناوينُ بفروعها، وتحت كلٍّ بنودُه '
  'بدليلها وعلاجها الموصوف والموصول، ومعها عددُ الدروس والأسئلة لكلّ بند — '
  'وبهذه الأعداد يُفحص الفهرس. ومعها فروعُ المادة لحقل اختيار العنوان (143).';

insert into sql_log (n, title, applied_at)
values ('143', 'فهرسُ أهداف المادة — قراءةٌ واحدةٌ بأعدادها', now())
on conflict (n) do nothing;
