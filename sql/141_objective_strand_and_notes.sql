-- ══════════════════════════════════════════════════════════════════════
--  ١٤١ · العنوانُ يحمل فرعَه، والبندُ يحمل دليلَه وعلاجَه
-- ══════════════════════════════════════════════════════════════════════
--
--  التحذيران اللذان كان `138` يُطلقهما في كلّ استيراد:
--    ① «فرعُ العنوان لا عمودَ له في القاعدة — حُفظ في سجلّ الاستيراد»
--    ② «دليلُ القياس والعلاجُ الموصوف محفوظان في import_log ولا عمودَ لهما»
--  وكانا صادقَين: الملفّ يحمل الثلاثة، والقاعدةُ تستقبل اثنين وتُهمل ثلاثة.
--  وفهرسُ الإنجليزية (٦٩ بنداً · ١٥ عنواناً) جاء بها كاملةً، فصار إهمالُها
--  إهمالَ عملٍ مؤلَّف.
--
--  🔑 **وأثقلُهما الأوّل، وليس تزييناً:** فرعُ السؤال يُشتقّ اليوم من مكوّنه
--  ثمّ درسه (`v_question_strand`). ودرسُ الإنجليزية **لا يُوسَم بفرعٍ قصداً**
--  — يجمع قراءةً ومفرداتٍ وتركيباً، ووسمُه بواحدٍ يشقّ ما وُحِّد. فستّةٌ
--  وعشرون درساً إنجليزيّاً بلا فرع ⇒ **أسئلتُها بلا محورٍ يحمل التشخيص،
--  والأثرُ الطوليُّ معطَّلٌ في المادة كلّها.** والعنوانُ العريض هو الذي يعرف
--  فرعَه (`READ.STRAT ⊂ READ`)، فمنه يُشتقّ.
--
--  خمسةُ قراراتٍ تُقرأ ولا تُستنتج:
--
--  ① **الفرعُ على العنوان وحدَه** — قيدٌ في الجدول: `strand_id` لا يُكتب إلا
--     حيث `parent_id is null`. والبندُ يرث فرعَ عنوانه ولا يحمل فرعاً لنفسه،
--     وإلا صار للمهارة الواحدة محوران فانشقّ أثرُها.
--
--  ② **وورقةٌ لا حاوية** — كقانون وسم الدروس حرفاً: «يُوسَم أصغرُ ما لا
--     ينقسم». والنسبةُ إلى حاوٍ تُفسد التقارير بلا شكوى.
--
--  ③ **`remedy_note` لا `remedy`** — وبجواره `remedial_item_id` القائم.
--     وهما شيئان لا يُخلطان: **النصُّ وصفُ المؤلّف لما ينبغي أن يكون،
--     والمعرّفُ عنصرُ تعليمٍ قائمٌ يُفتح للطالب.** فالأوّل مُدخَلُ من يبني
--     الثاني. ولو سُمّيا باسمٍ واحد لاستوى عند القارئ «موصوفٌ» و«موجود».
--
--  ④ **`v_question_strand` تكسب ثالثاً في آخر الترتيب:** المكوّن ثمّ الدرس
--     **ثمّ هدفُ السؤال**. والترتيبُ مقصود: ما يعمل اليوم لا يتغيّر بحرف،
--     ولا تُصيب الإضافةُ إلا سؤالاً لا محورَ له أصلاً.
--
--  ⑤ **والفرعُ على العنوان تحذيرٌ لا رفض** إن غاب — كغيابه عن الدرس. فمادةٌ
--     بلا فروعٍ (التاريخ) تُسلّم عناوينَها بلا فرعٍ ولا تُلزَم.
-- ══════════════════════════════════════════════════════════════════════

-- ═══ ① الأعمدة ═══

alter table objectives add column if not exists strand_id   bigint
  references strands(id) on delete set null;
alter table objectives add column if not exists evidence    text;
alter table objectives add column if not exists remedy_note text;

alter table objectives drop constraint if exists objectives_strand_head_only_chk;
alter table objectives add  constraint objectives_strand_head_only_chk
  check (strand_id is null or parent_id is null);

create index if not exists objectives_strand_idx on objectives(strand_id);

comment on column objectives.strand_id is
  'فرعُ المادة — للعنوان العريض وحده (القيد objectives_strand_head_only_chk). '
  'والبندُ يرثه من عنوانه. ومنه يُشتقّ محورُ السؤال حين لا يُوسَم مكوّنُه ولا درسُه.';
comment on column objectives.evidence is
  'دليلُ القياس: وصفُ السؤال الذي يقيس هذا البند. يُقرأ ولا يُنفَّذ — حارسُ '
  'الدقّة: بندٌ لا يُوصَف له سؤالٌ بندٌ فضفاض.';
comment on column objectives.remedy_note is
  '⚠️ ليس `remedial_item_id`. هذا **وصفُ المؤلّف للعلاج** كما ينبغي أن يكون، '
  'وذاك **عنصرُ تعليمٍ قائمٌ** يُفتح للطالب. والأوّل مُدخَلُ من يبني الثاني.';

-- ═══ ② الكاتبُ الوحيد يقبل الثلاثة ═══
-- التوقيعُ يتغيّر ⇒ يُسقَط القديم أوّلاً، وإلا بقي حِملان يتنازعان النداء.

drop function if exists public.save_objective(bigint, bigint, text, text, bigint, bigint, bigint);

create or replace function public.save_objective(
  p_id          bigint default null,
  p_subject     bigint default null,
  p_code        text   default null,
  p_name        text   default null,
  p_parent      bigint default null,
  p_remedial    bigint default null,
  p_scale       bigint default null,
  p_strand      bigint default null,
  p_evidence    text   default null,
  p_remedy_note text   default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_scale  bigint; v_id bigint; v_kids int := 0; v_warn text;
  v_p_scale bigint; v_p_subject bigint; v_p_parent bigint;
  v_s_subject bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  if p_subject is null then
    return jsonb_build_object('ok', false,
      'error', 'المادة مطلوبة — الهدف مهارةٌ في مادة');
  end if;

  select coalesce(p_scale, s.scale_id) into v_scale
    from subjects s where s.id = p_subject;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;
  if v_scale is null then
    return jsonb_build_object('ok', false,
      'error', 'هذه المادة لا سلّمَ لها — مرّر السلّم صراحةً في p_scale');
  end if;

  if not can_author(p_subject) then
    return jsonb_build_object('ok', false,
      'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  if coalesce(trim(p_name), '') = '' then
    return jsonb_build_object('ok', false,
      'error', 'اسم الهدف مطلوب — جملةٌ تقول ماذا يستطيع الطالب أن يفعل');
  end if;
  if coalesce(trim(p_code), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'كود الهدف مطلوب');
  end if;
  if trim(p_code) !~ '^[A-Za-z0-9_.-]{2,40}$' then
    return jsonb_build_object('ok', false,
      'error', 'الكود: لاتينيّةٌ وأرقامٌ و _ . - من محرفين إلى أربعين');
  end if;

  if p_id is not null then
    v_id := p_id;
    if not exists (select 1 from objectives where id = v_id) then
      return jsonb_build_object('ok', false, 'error', 'الهدف غير موجود');
    end if;
  else
    select o.id into v_id from objectives o
     where o.scale_id   = v_scale
       and o.subject_id = p_subject
       and o.code       = trim(p_code);
  end if;

  if v_id is not null then
    select count(*) into v_kids from objectives where parent_id = v_id;
  end if;

  if p_parent is not null then
    if p_parent = v_id then
      return jsonb_build_object('ok', false, 'error', 'الهدف لا يكون تحت نفسه');
    end if;

    select o.scale_id, o.subject_id, o.parent_id
      into v_p_scale, v_p_subject, v_p_parent
      from objectives o where o.id = p_parent;
    if not found then
      return jsonb_build_object('ok', false, 'error', 'العنوان العريض غير موجود');
    end if;

    if v_p_subject is distinct from p_subject or v_p_scale is distinct from v_scale then
      return jsonb_build_object('ok', false,
        'error', 'العنوان العريض من مادةٍ أخرى أو سلّمٍ آخر');
    end if;

    if v_p_parent is not null then
      return jsonb_build_object('ok', false,
        'error', 'طبقتان لا أكثر — عنوانٌ عريض وبنودٌ تحته');
    end if;

    if v_kids > 0 then
      return jsonb_build_object('ok', false,
        'error', 'هذا عنوانٌ تحته ' || v_kids || ' بنداً — لا يُنقل تحت عنوانٍ آخر');
    end if;
  end if;

  if p_remedial is not null then
    if v_kids > 0 then
      return jsonb_build_object('ok', false,
        'error', 'هذا عنوانٌ عريض تحته بنود — العلاج للبند، وعلاجُ العنوان لا يُقرأ أبداً');
    end if;
    if not exists (select 1 from items where id = p_remedial) then
      return jsonb_build_object('ok', false, 'error', 'عنصر العلاج غير موجود');
    end if;
  end if;

  -- 🆕 ① الفرعُ للعنوان وحدَه، ومن هذه المادة، وورقةٌ لا حاوية
  if p_strand is not null then
    if p_parent is not null then
      return jsonb_build_object('ok', false,
        'error', 'الفرعُ يُنسَب إلى العنوان العريض لا إلى البند — والبندُ يرثه');
    end if;

    select s.subject_id into v_s_subject from strands s where s.id = p_strand;
    if not found then
      return jsonb_build_object('ok', false, 'error', 'الفرع غير موجود');
    end if;
    if v_s_subject is distinct from p_subject then
      return jsonb_build_object('ok', false, 'error', 'الفرع من مادةٍ أخرى');
    end if;
    if exists (select 1 from strands c where c.parent_id = p_strand) then
      return jsonb_build_object('ok', false,
        'error', 'الفرع حاوٍ تحته فروع — يُنسَب العنوان إلى ورقةٍ لا تنقسم');
    end if;
  end if;

  if v_id is null then
    insert into objectives (scale_id, subject_id, code, name, parent_id,
                            remedial_item_id, strand_id, evidence, remedy_note)
    values (v_scale, p_subject, trim(p_code), trim(p_name), p_parent,
            p_remedial, p_strand, nullif(trim(p_evidence), ''),
            nullif(trim(p_remedy_note), ''))
    returning id into v_id;
  else
    update objectives set
      scale_id         = v_scale,
      subject_id       = p_subject,
      code             = trim(p_code),
      name             = trim(p_name),
      parent_id        = p_parent,
      remedial_item_id = p_remedial,
      strand_id        = p_strand,
      -- والنصّان لا يُمحيان بتمريرٍ فارغ: ما كُتب يبقى حتى يُكتب غيرُه
      evidence         = coalesce(nullif(trim(p_evidence), ''), evidence),
      remedy_note      = coalesce(nullif(trim(p_remedy_note), ''), remedy_note)
     where id = v_id;
  end if;

  if p_parent is not null and p_remedial is null then
    v_warn := 'بندٌ بلا علاج — التشخيص سيقول أين أخطأ، ولا يقول إلى أين يذهب';
  end if;

  return jsonb_build_object(
    'ok',   true,
    'id',   v_id,
    'نوعه', case when p_parent is null then 'عنوان عريض' else 'بند' end,
    'warn', v_warn);
end
$function$;

revoke all on function public.save_objective(bigint,bigint,text,text,bigint,bigint,bigint,bigint,text,text)
  from public, anon;
grant execute on function public.save_objective(bigint,bigint,text,text,bigint,bigint,bigint,bigint,text,text)
  to authenticated;

-- ═══ ③ محورُ السؤال يكسب ثالثاً — في آخر الترتيب ═══

create or replace view public.v_question_strand as
select distinct on (q.id)
       q.id      as question_id,
       q.quiz_id,
       l.id      as lesson_id,
       coalesce(i.strand_id, l.strand_id, h.strand_id) as strand_id
  from questions q
  join items   i on i.quiz_id = q.quiz_id
  join lessons l on l.id = i.lesson_id
  left join objectives o on o.id = q.objective_id
  left join objectives h on h.id = coalesce(o.parent_id, o.id)
 order by q.id, i.id;

comment on view public.v_question_strand is
  'محورُ السؤال: فرعُ مكوّنه، فإن لم يكن ففرعُ درسه، فإن لم يكن ففرعُ العنوان '
  'العريض لهدفه (141). والثالثُ آخرُ الترتيب قصداً: ما كان يعمل لا يتغيّر، '
  'ولا يُصيب إلا سؤالاً لا محورَ له — ودروسُ الإنجليزية لا تُوسَم قصداً.';

insert into sql_log (n, title, applied_at)
values ('141', 'العنوانُ يحمل فرعَه والبندُ دليلَه وعلاجَه — ومحورُ السؤال يكسب ثالثاً', now())
on conflict (n) do nothing;
