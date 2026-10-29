-- ══════════════════════════════════════════════════════════════════════
--  ١٩٢ · استيرادُ بنك الأسئلة — دفعةٌ تُضاف إلى بنكٍ بعنوانه، وهدفُ كلِّ سؤالٍ يعطيه فرعَه
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٩ أكتوبر): «اكتب 192: استيراد بنك الأسئلة بالتصميم المقترح، مع تجربة جافّة منقوضة، ثمّ توقّف لإذني».
--  والتصميمُ جوابُ سؤاله في اليوم نفسه: «هل يمكن بناء استيراد لبنك الأسئلة؟».
--
--  🔑 **ولماذا دالّةٌ أختٌ لا فرعٌ في `import_quiz`:** تلك تُنشئ اختباراً مرّةً واحدة في درسٍ بمفتاحه وتردّ ما بعده،
--     والبنكُ للمادّة ويكبر بدفعات — فالرأسان مختلفان والحكمان مختلفان. **والأسئلةُ واحدة:** تُمرَّر إلى `save_question`
--     كما يمرّرها `import_quiz` حرفاً، فما يحرسه هناك (النمطُ والخياراتُ والصوابُ وأكوادُ التشخيص والشرح) يحرسه هنا بلا نسخة.
--
--  وتسعةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **الرأسُ `bank` — عنوانُ البنك في المادّة:** قائمٌ ⇒ تُضاف إليه الدفعة، وغائبٌ ⇒ يُنشأ بـ`create_bank` نفسِها، والجافّةُ
--     تقول أيَّهما. وعنوانٌ يحمله بنكان ⇒ تُردّ. **وملفُّ اختبارٍ لا يُستورد بنكاً:** `lesson_key` أو `quiz` في الرأس ⇒ تُردّ.
--  ② **الأسئلةُ والنصوصُ بصيغة `import_quiz` حرفاً** (`kind` · `body` · `options` بـ`correct` و`dx` · `explanation` ·
--     `objective` · `section` · `difficulty` · `passage` · `variant` …)، **وزيادةٌ واحدة: `group` على النصّ** — النصوصُ
--     البديلةُ لنصٍّ واحد (`set_passage_group`)، تُختار منها حارةٌ واحدة في كلّ محاولة.
--  ③ **الدفعةُ تُضاف ولا تستبدل:** مواضعُها بعد آخر سؤالٍ ونصٍّ في البنك. **والملفُّ نفسُه مرّةً ثانية «لا جديد»** بلا كتابة:
--     البصمةُ `quiz_payload_fp` ومعها العنوانُ والمجموعات (`b1`) — فتلك لا تراهما.
--  ④ **الهدفُ إلزاميّ، ومن فهرس المادّة لا من درس:** في البنك الهدفُ هو ما يعطي السؤالَ فرعَه (`191`)، وبالفرع يزنه
--     النموذج — فسؤالٌ بلا هدفٍ خانةٌ لا يعدّها العدّاد. والخطّةُ تعرض الدفعةَ بفروعها.
--  ⑤ **الصيغُ تُقرن داخل الملفّ وحده** (`variant`): مفتاحُه محلّيٌّ لا يبلغ القاعدة، والخانةُ تأخذ اسمَها من `set_variant`.
--     وإضافةُ صيغةٍ إلى خانةٍ قائمةٍ من قبل بابُها المحرّر. وخانةٌ بأنماطٍ مختلفة ⇒ تُردّ قبل أن يُكتب شيء.
--  ⑥ **لفريق الإشراف:** `can_curate` — حكمُ `create_bank` وشاشةِ البنوك بعينه (`can_edit_quiz` للبنك الرسميّ).
--  ⑦ **تحذيراتٌ تُرى ولا تمنع:** خانةٌ بصيغةٍ واحدة · سؤالٌ بلا صعوبة (⇐ «متوسط») · نصٌّ مطابقٌ لسؤالٍ حيٍّ في البنك أو لآخرَ
--     في الدفعة — بلا نصٍّ مشترك، فالسؤالُ العامّ على نصّين ليس تكراراً · مجموعةٌ قائمةٌ في البنك تنضمّ إليها الدفعة ·
--     مجموعةٌ بنصٍّ واحد · هدفٌ لا فرعَ له ولا لعنوانه (في مادّةٍ لها فروع).
--  ⑧ **الجافّةُ تمرّ بالمسار كلِّه بحرّاسه الأحياء ثمّ يُنقض** (نسقُ `import_quiz`)، والسجلُّ `import_log` بنوعه `bank`.
--     والبابُ `p_course` كأخواته الخمس: شاشةُ الاستيراد للمقرَّر، والمقرَّرُ يسمّي المادّة.
--  ⑨ **والدالّةُ الميّتة `import_bank(p_subject text, p_data jsonb)` تُحذف بحارسها — بقرار المالك (٢٩ أكتوبر).**
--     «بابٌ ميّت» في STATE.md منذ صار الاستيرادُ كلُّه في المتصفّح، وكانت تشارك هذه اسمَها فيفرّق بينهما PostgREST بأسماء
--     المعاملات — وبحذفها يبقى للاسم معنًى واحد. قِيس (٢٩ أكتوبر): لا يملكها `authenticated` ولا `anon`، ولا شيءَ يعتمد عليها
--     (`pg_depend` · العروض · المشغّلات)، ولا دالّةَ تناديها في أيّ مخطَّط، ولا الشيفرة. **والحارسُ ثلاثة:** بصمتُها المقيسة
--     (`cab7ea46…`) فلا يُحذف ما تغيّر بعد القياس · ولا منحَ للمستخدمين · ولا مُنادٍ. وغيابُها يُخبر ويمضي (الملفّ يُعاد).
--
--  📐 وما ليس هنا عمداً:
--  · الواجهة — نوعٌ سادسٌ في جدول بوّابات `editor_import.js` وزرٌّ في «بنوك المادة»، بعد الإذن والتطبيق.
--  · تعديلُ سؤالٍ قائمٍ في البنك أو حذفُه — بابُه المحرّر (والمُجابُ عنه يتقاعد ويولد وريثُه في خانته).
--  · `save_question` تحرس بـ`can_author` لا `can_curate` — فرقٌ قائمٌ في المنصّة كلِّها، يُقرَّر وحده ولا يمسّه هذا الملفّ.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ محذوفة (رأس الملفّ ⑨) ═══════════════════

do $$
declare v_fn regprocedure := to_regprocedure('public.import_bank(text,jsonb)');
begin
  if v_fn is null then
    raise notice '192: import_bank(text, jsonb) محذوفةٌ من قبل — لا تغيير'; return;
  end if;
  if md5(pg_get_functiondef(v_fn)) <> 'cab7ea468a5ee09afd0b702b94f59635' then
    raise exception '192: import_bank(text, jsonb) تغيّرت بعد القياس — لا تُحذف على الظنّ';
  end if;
  if has_function_privilege('authenticated', v_fn::oid, 'execute')
     or has_function_privilege('anon', v_fn::oid, 'execute') then
    raise exception '192: import_bank(text, jsonb) يملكها المستخدمون — فهي بابٌ حيٌّ لا ميّت';
  end if;
  if exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
              where p.prokind in ('f', 'p') and p.oid <> v_fn::oid and p.proname <> 'import_bank'
                and n.nspname not in ('pg_catalog', 'information_schema')
                and pg_get_functiondef(p.oid) ~ 'import_bank\s*\(') then
    raise exception '192: دالّةٌ تنادي import_bank — لا تُحذف';
  end if;
  drop function public.import_bank(text, jsonb);   -- بلا cascade: ما يعتمد عليها يردّ الحذفَ ولا يسقط معه
end $$;


-- ═══════════════════ منشأة ═══════════════════

create or replace function public.import_bank(p_course bigint, p_payload jsonb, p_dry_run boolean default true)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_subject bigint; v_scale bigint; v_title text; v_bank bigint; v_exist bigint; v_banks int;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_nq int; v_np int; v_n int; v_fp text; v_qbase int := 0; v_pbase int := 0;
  v_plan jsonb; v_out jsonb; v_res jsonb;
  v_pass jsonb := '{}'::jsonb;    -- ref ← id
  v_grps jsonb := '{}'::jsonb;    -- group ← [ids]
  v_vars jsonb := '{}'::jsonb;    -- variant ← [ids]
  v_done int := 0; v_paired int := 0; v_grouped int := 0;
  v_stage text := 'التحقّق';
  v_oid bigint; v_pid bigint; v_qid bigint; v_ids bigint[]; v_key text; r record;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject from courses c where c.id = p_course and c.active;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود أو معطَّل');
  end if;
  -- ⑥ البنكُ لفريق الإشراف — حكمُ create_bank بعينه
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'بنوك المادّة لفريق الإشراف');
  end if;
  select s.scale_id into v_scale from subjects s where s.id = v_subject;

  -- دفعةٌ واحدةٌ للمادّة في كلّ مرّة: البنكُ للمادّة، ودفعتان معاً تتنازعان المواضع
  perform pg_advisory_xact_lock(hashtext('import_bank'), v_subject::int);

  -- ══════════════════ الرأس ══════════════════
  --  🔑 الأنواعُ قبل البصمة: `quiz_payload_fp` تفكّ القائمتين، وقائمةٌ ليست قائمةً تُسقطها بخطأٍ لا يُقرأ

  v_title := nullif(btrim(coalesce(p_payload->>'bank', '')), '');
  if v_title is null then
    v_err := v_err || array['عنوان البنك مطلوب في bank — والبنك يُعرف بعنوانه في المادة'];
  end if;
  if p_payload ? 'lesson_key' or p_payload ? 'key' or p_payload ? 'quiz' then
    v_err := v_err || array['هذا ملفّ اختبار درس (فيه lesson_key أو quiz) — والبنك يُعرف بعنوانه وحده (bank)، وللاختبار بابه'];
  end if;
  if (case when jsonb_typeof(p_payload->'questions') = 'array'
           then jsonb_array_length(p_payload->'questions') else 0 end) = 0 then
    v_err := v_err || array['الدفعة بلا أسئلة — والبنك يكبر بالأسئلة'];
  end if;
  if p_payload ? 'passages' and jsonb_typeof(p_payload->'passages') is distinct from 'array' then
    v_err := v_err || array['النصوص المشتركة تُرسل قائمةً أو لا تُرسل'];
  end if;

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'bank', v_title, 'أخطاء', to_jsonb(v_err));
  end if;

  v_fp := md5(concat_ws(E'\n', 'bank:b1', v_title, quiz_payload_fp(p_payload),
            (select string_agg(e.ord || ':' || coalesce(btrim(e.value->>'group'), ''), ',' order by e.ord)
               from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) with ordinality as e(value, ord))));

  -- ① البنكُ بعنوانه في المادّة
  select count(*), min(z.id) into v_banks, v_bank
    from quizzes z
   where z.subject_id = v_subject and z.role = 'bank' and btrim(z.title) = v_title;
  if v_banks > 1 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'bank', v_title, 'content_fp', v_fp,
      'أخطاء', to_jsonb(array['العنوان «' || v_title || '» لأكثر من بنك في المادة'
                             || ' — يُغيَّر عنوان أحدها في شاشة البنوك أوّلاً']));
  end if;
  v_exist := v_bank;

  -- ③ الملفُّ نفسُه إلى البنك نفسِه ⇒ لا كتابةَ ولا شكوى ولا سطرَ سجلّ
  if v_bank is not null and exists (
       select 1 from import_log g
        where g.kind = 'bank' and g.subject_id = v_subject and g.dry_run = false
          and coalesce((g.result->>'ok')::boolean, false)
          and g.result->>'bank_id' = v_bank::text
          and g.result->>'content_fp' = v_fp) then
    return jsonb_build_object('ok', true, 'لا جديد', true, 'bank', v_title, 'bank_id', v_bank,
      'content_fp', v_fp, 'بيانٌ', 'هذه الدفعة بعينها استُوردت إلى هذا البنك — فلا شيء يُكتب');
  end if;

  v_nq := jsonb_array_length(p_payload->'questions');
  v_np := jsonb_array_length(coalesce(p_payload->'passages', '[]'::jsonb));

  -- ══════════════════ تحقّقٌ لا يملكه حارسٌ آخر ══════════════════
  --  وما يملكه `save_question` لا يُكرَّر هنا — يجري في الجافّة نفسِها (②).

  --  النصوص: مُعرِّفٌ لكلّ نصّ (ref أو id — اسمان لمعنًى واحد، كما في import_quiz) بلا تكرار، وكلُّ إشارةٍ إلى معرَّف
  select array_agg('النصّ المشترك ' || ord || ': بلا مُعرِّف (ref أو id) — والسؤال يشير إليه به')
    into v_tmp
    from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) with ordinality as e(value, ord)
   where nullif(btrim(coalesce(e.value->>'ref', e.value->>'id', '')), '') is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('مُعرِّف مكرَّر للنصّ المشترك: ' || d.ref) into v_tmp
    from (select nullif(btrim(coalesce(e.value->>'ref', e.value->>'id')), '') as ref
            from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) e
           where nullif(btrim(coalesce(e.value->>'ref', e.value->>'id', '')), '') is not null
           group by 1 having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('س' || ord || ': النصّ المشترك «' || btrim(e.value->>'passage') || '» غير معرَّف')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(btrim(coalesce(e.value->>'passage', '')), '') is not null
     and not exists (select 1
                       from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) g
                      where btrim(coalesce(g.value->>'ref', g.value->>'id', '')) = btrim(e.value->>'passage'));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ④ الهدفُ إلزاميّ، ومن فهرس المادّة
  select array_agg('س' || ord || ': بلا هدف — والهدف في البنك هو ما يعطي السؤال فرعه، وبالفرع يزنه النموذج')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(btrim(coalesce(e.value->>'objective', '')), '') is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('س' || ord || ': الهدف «' || btrim(e.value->>'objective') || '» ليس في فهرس أهداف المادة')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(btrim(coalesce(e.value->>'objective', '')), '') is not null
     and not exists (select 1 from objectives x
                      where x.subject_id = v_subject
                        and (v_scale is null or x.scale_id = v_scale)
                        and x.code = btrim(e.value->>'objective'));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ⑤ خانةٌ بأنماطٍ مختلفة — تردّها set_variant بعد الكتابة، فتُردّ هنا قبلها برسالةٍ تسمّيها
  select array_agg('الخانة «' || d.v || '» تجمع أنماطاً مختلفة (' || d.ks || ') — والخانة صيغ لسؤال واحد')
    into v_tmp
    from (select btrim(e.value->>'variant') as v,
                 string_agg(distinct coalesce(nullif(btrim(e.value->>'kind'), ''), 'mcq'), '، ') as ks
            from jsonb_array_elements(p_payload->'questions') e
           where nullif(btrim(coalesce(e.value->>'variant', '')), '') is not null
           group by 1
          having count(distinct coalesce(nullif(btrim(e.value->>'kind'), ''), 'mcq')) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'bank', v_title, 'content_fp', v_fp,
                              'أخطاء', to_jsonb(v_err));
  end if;

  -- ══════════════════ ⑦ تحذيراتٌ تُرى ولا تمنع ══════════════════

  select array_agg('الخانة «' || d.v || '» بسؤال واحد — لا تُقرن، وسؤال وحده ليس صيغةً لشيء') into v_tmp
    from (select btrim(e.value->>'variant') as v
            from jsonb_array_elements(p_payload->'questions') e
           where nullif(btrim(coalesce(e.value->>'variant', '')), '') is not null
           group by 1 having count(*) = 1) d;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  select count(*) into v_n
    from jsonb_array_elements(p_payload->'questions') e
   where nullif(btrim(coalesce(e.value->>'difficulty', '')), '') is null;
  if v_n > 0 then
    v_warn := v_warn || array['أسئلة بلا صعوبة: ' || v_n || ' — تُحفظ «متوسط»، والصعوبة مصفاةٌ في شاشة التركيب'];
  end if;

  if v_bank is not null then
    select array_agg('س' || ord || ': نصّه مطابق لسؤال حيّ في البنك — أهو مكرَّر؟') into v_tmp
      from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
     where nullif(btrim(coalesce(e.value->>'passage', '')), '') is null
       and exists (select 1 from questions x
                    where x.quiz_id = v_bank and x.retired_at is null and x.passage_id is null
                      and btrim(x.body) = btrim(e.value->>'body'));
    v_warn := v_warn || coalesce(v_tmp, '{}');
  end if;

  select array_agg('س' || d.ords || ': نصّ واحد في الدفعة أكثر من مرّة — أهو مكرَّر؟') into v_tmp
    from (select string_agg(e.ord::text, ' وس' order by e.ord) as ords
            from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
           where nullif(btrim(coalesce(e.value->>'passage', '')), '') is null
           group by btrim(e.value->>'body') having count(*) > 1) d;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  select array_agg(case when d.inbank > 0
                        then 'المجموعة «' || d.k || '» قائمة في البنك (نصوصها: ' || d.inbank
                             || ') — ونصوص هذه الدفعة تنضمّ إليها بدائل'
                        else 'المجموعة «' || d.k || '» بنصّ واحد — والمجموعة بدائل لنصّ واحد' end)
    into v_tmp
    from (select g.k, count(*) as infile,
                 (select count(*) from passages p
                   where v_bank is not null and p.quiz_id = v_bank and p.group_key = g.k) as inbank
            from (select btrim(e.value->>'group') as k
                    from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) e
                   where nullif(btrim(coalesce(e.value->>'group', '')), '') is not null) g
           group by g.k) d
   where d.inbank > 0 or d.infile = 1;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  if exists (select 1 from strands t where t.subject_id = v_subject) then
    select count(*) into v_n
      from jsonb_array_elements(p_payload->'questions') e
      join objectives x on x.subject_id = v_subject and (v_scale is null or x.scale_id = v_scale)
                       and x.code = btrim(e.value->>'objective')
      left join objectives h on h.id = x.parent_id
     where coalesce(x.strand_id, h.strand_id) is null;
    if v_n > 0 then
      v_warn := v_warn || array['أسئلة هدفها بلا فرع ولا عنوان له بفرع: ' || v_n || ' — لا يعدّها عدّاد الأوزان'];
    end if;
  end if;

  -- ══════════════════ الخطّة — تُقرأ قبل أن يُكتب شيء ══════════════════

  select jsonb_build_object(
    'bank', v_title, 'content_fp', v_fp, 'fp_rule', 'b1',
    'البنك', jsonb_build_object(
       'العنوان', v_title, 'id', v_bank, 'جديد', v_bank is null,
       'فيه قبلها', case when v_bank is null then null else jsonb_build_object(
          'أسئلة', (select count(*) from questions x where x.quiz_id = v_bank and x.retired_at is null),
          'خانات', (select count(distinct x.variant_key) from questions x
                     where x.quiz_id = v_bank and x.retired_at is null),
          'نصوص',  (select count(*) from passages p where p.quiz_id = v_bank)) end),
    'أسئلة', v_nq,
    'بأنماطها', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb)
                   from (select coalesce(nullif(btrim(e.value->>'kind'), ''), 'mcq') as k, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e group by 1) d),
    'بأقسامها', (select coalesce(jsonb_object_agg(s, n), '{}'::jsonb)
                   from (select coalesce(nullif(btrim(e.value->>'section'), ''), '—') as s, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e group by 1) d),
    'بصعوباتها', (select coalesce(jsonb_object_agg(s, n), '{}'::jsonb)
                   from (select coalesce(nullif(btrim(e.value->>'difficulty'), ''), 'medium') as s, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e group by 1) d),
    'بأهدافها', (select coalesce(jsonb_object_agg(o, n), '{}'::jsonb)
                   from (select btrim(e.value->>'objective') as o, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e group by 1) d),
    -- الفرعُ فرعُ الهدف أو فرعُ عنوانه (191) — وهو ما سيعدّه عدّادُ النموذج
    'بفروعها', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb)
                   from (select coalesce(t.code, '—') as k, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                           left join objectives x on x.subject_id = v_subject
                                                 and (v_scale is null or x.scale_id = v_scale)
                                                 and x.code = btrim(e.value->>'objective')
                           left join objectives h on h.id = x.parent_id
                           left join strands t on t.id = coalesce(x.strand_id, h.strand_id)
                          group by 1) d),
    'خاناتٌ ستُقرن', (select coalesce(jsonb_object_agg(v, n), '{}'::jsonb)
                   from (select btrim(e.value->>'variant') as v, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                          where nullif(btrim(coalesce(e.value->>'variant', '')), '') is not null
                          group by 1 having count(*) > 1) d),
    'نصوصٌ مشتركة', v_np,
    'مجموعاتُ نصوص', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb)
                   from (select btrim(e.value->>'group') as k, count(*) as n
                           from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) e
                          where nullif(btrim(coalesce(e.value->>'group', '')), '') is not null
                          group by 1) d)
  ) into v_plan;

  -- ══════════════════ الاعتماد — والجافّةُ تمرّ به ثمّ يُنقَض ══════════════════

  begin
    if v_bank is null then
      v_stage := 'إنشاء البنك';
      v_res := create_bank(v_subject, v_title);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_bank := (v_res->>'id')::bigint;
    else
      -- ③ بعد آخر سؤالٍ ونصٍّ في البنك — والموضعُ فريدٌ بين الأحياء (`questions_live_position`)
      v_qbase := coalesce((select max(x.position) from questions x where x.quiz_id = v_bank), 0);
      v_pbase := coalesce((select max(p.position) from passages p where p.quiz_id = v_bank), 0);
    end if;

    for r in select e.value as q, e.ord as ord
               from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb))
                    with ordinality as e(value, ord)
              order by e.ord loop
      v_stage := 'النصّ المشترك ' || r.ord;
      v_res := save_passage(p_quiz     => v_bank,
                            p_title    => nullif(btrim(coalesce(r.q->>'title', '')), ''),
                            p_body     => nullif(btrim(coalesce(r.q->>'body', '')), ''),
                            p_media    => nullif(btrim(coalesce(r.q->>'media', '')), ''),
                            p_kind     => coalesce(nullif(btrim(r.q->>'kind'), ''), 'text'),
                            p_lang     => coalesce(nullif(btrim(r.q->>'lang'), ''), 'ar'),
                            p_position => v_pbase + r.ord::int);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_pass := v_pass || jsonb_build_object(btrim(coalesce(r.q->>'ref', r.q->>'id')), v_res->>'id');
      v_key := nullif(btrim(coalesce(r.q->>'group', '')), '');
      if v_key is not null then
        v_grps := jsonb_set(v_grps, array[v_key],
                            coalesce(v_grps->v_key, '[]'::jsonb) || to_jsonb((v_res->>'id')::bigint), true);
      end if;
    end loop;

    -- ② المجموعاتُ بعد النصوص كلِّها: المعرّفاتُ لا تُعرف قبل الحفظ
    for r in select key as k, value as ids from jsonb_each(v_grps) loop
      v_stage := 'مجموعة النصوص «' || r.k || '»';
      select array_agg(x::bigint) into v_ids from jsonb_array_elements_text(r.ids) x;
      v_res := set_passage_group(v_ids, r.k);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_grouped := v_grouped + 1;
    end loop;

    for r in select e.value as q, e.ord as ord
               from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
              order by e.ord loop
      v_stage := 'السؤال ' || r.ord;

      select x.id into v_oid from objectives x
       where x.subject_id = v_subject
         and (v_scale is null or x.scale_id = v_scale)
         and x.code = btrim(r.q->>'objective');

      v_pid := null;
      if nullif(btrim(coalesce(r.q->>'passage', '')), '') is not null then
        v_pid := (v_pass->>btrim(r.q->>'passage'))::bigint;
      end if;

      --  🔑 الخياراتُ والمفاتيحُ تُمرَّر كما وردت — كما في import_quiz حرفاً
      v_res := save_question(p_quiz        => v_bank,
                             p_kind        => coalesce(nullif(btrim(r.q->>'kind'), ''), 'mcq'),
                             p_body        => r.q->>'body',
                             p_position    => v_qbase + r.ord::int,
                             p_options     => coalesce(r.q->'options', '[]'::jsonb),
                             p_explanation => r.q->>'explanation',
                             p_model       => r.q->>'model',
                             p_passage     => v_pid,
                             p_objective   => v_oid,
                             p_points      => (r.q->>'points')::int,
                             p_lang        => coalesce(nullif(btrim(r.q->>'lang'), ''), 'ar'),
                             p_difficulty  => nullif(btrim(coalesce(r.q->>'difficulty', '')), ''),
                             p_image       => nullif(btrim(coalesce(r.q->>'image', '')), ''),
                             p_video       => nullif(btrim(coalesce(r.q->>'video', '')), ''),
                             p_audio       => nullif(btrim(coalesce(r.q->>'audio', '')), ''),
                             p_section     => nullif(btrim(coalesce(r.q->>'section', '')), ''),
                             p_accept      => r.q->'accept',
                             p_wrong       => r.q->'wrong',
                             p_bank        => r.q->'bank');
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_qid := (v_res->>'id')::bigint;
      v_done := v_done + 1;

      v_key := nullif(btrim(coalesce(r.q->>'variant', '')), '');
      if v_key is not null then
        v_vars := jsonb_set(v_vars, array[v_key], coalesce(v_vars->v_key, '[]'::jsonb) || to_jsonb(v_qid), true);
      end if;
    end loop;

    --  ⑤ الاقترانُ بعد الإدراج كلِّه — والخانةُ تأخذ اسمَها من set_variant
    for r in select key as v, value as ids from jsonb_each(v_vars) loop
      if jsonb_array_length(r.ids) < 2 then continue; end if;
      v_stage := 'اقتران الخانة «' || r.v || '»';
      select array_agg(x::bigint) into v_ids from jsonb_array_elements_text(r.ids) x;
      v_res := set_variant(v_ids);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_paired := v_paired + 1;
    end loop;

    --  🧪 الجافّةُ: مرّ المسارُ كلُّه بحرّاسه الأحياء، ولا يبقى منه أثر
    if p_dry_run then
      raise exception using errcode = 'BY192', message = 'الجافّة تمّت';
    end if;

  exception
    when sqlstate 'BY192' then
      null;                                  -- نُقضت الكتابة، وبقي الحكم
    when others then
      v_out := jsonb_build_object(
        'ok', false, 'تجريبيّة', p_dry_run,
        'bank', v_title, 'content_fp', v_fp,
        'توقّف عند', v_stage, 'السبب', sqlerrm,
        'أُدرج قبل النقض', v_done,
        'بيانٌ', 'لم يبقَ من الدفعة شيء — تُصحَّح وتُعاد كاملةً',
        'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn));
      insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
      values ('bank', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());
      return v_out;
  end;

  v_out := jsonb_build_object(
    'ok', true, 'تجريبيّة', p_dry_run,
    'bank', v_title, 'bank_id', case when p_dry_run then v_exist else v_bank end,
    'content_fp', v_fp, 'fp_rule', 'b1',
    'questions', v_done, 'خاناتٌ قُرنت', v_paired, 'مجموعاتٌ وُسمت', v_grouped,
    'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn),
    'بيانٌ', case when p_dry_run    then 'جافّة: مرّ المسار كلّه بحرّاسه ولم يبقَ أثر'
                  when v_exist is null then 'اعتُمدت — وأُنشئ البنك، ولا يرى الطالب أسئلته إلا في نموذج'
                  else 'اعتُمدت — وأُضيفت الدفعة إلى البنك، ولا يرى الطالب أسئلته إلا في نموذج' end);

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('bank', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());

  return v_out;
end
$function$;

revoke execute on function public.import_bank(bigint, jsonb, boolean) from public, anon;
grant  execute on function public.import_bank(bigint, jsonb, boolean) to authenticated;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('192', 'استيرادُ بنك الأسئلة — دفعةٌ تُضاف إلى بنكٍ بعنوانه، وهدفُ كلِّ سؤالٍ يعطيه فرعَه', now())
on conflict (n) do update set applied_at = now();
