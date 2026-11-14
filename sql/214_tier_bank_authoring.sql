-- ══════════════════════════════════════════════════════════
-- 214 · بنكُ الطبقة في التأليف (ق١٧) — النطاقُ ومجموعةُ الكلمات والاستيراد والإعفاءُ من شرح الخطأ
--       (المرحلة ٧ب من `spec-reading-library.md` · «تصميمُ محرّك ٧ب» · الخطوة ④ · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **بنكُ الطبقة يُستورد من المشروع كما تُستورد البنوك** (⑤ في التصميم) — و`import_bank` لم تكن تعرف طبقةً ولا نطاقاً.
--      ⇒ `tier` و`tool` في رأس الدفعة: البنكُ يصير بنكَ طبقة (`station_kind = 'adaptive'` · `reveal = 'never'`)، و`band` لكلّ نصّ (٠–٢٤ · و٠ للتمهيد).
--      **ولا يُبدَّل بنكُ طبقةٍ إلى طبقةٍ أخرى، ولا بنكان لطبقةٍ واحدة في الأداة**، ولا يصير بنكَ طبقةٍ بنكٌ تسحب منه نماذج.
--   ② 🔴 **والهدفُ لا يُلزَم في بنك الطبقة.** قِيس: **مادّةُ القراءة (٧) بلا هدفٍ واحد في فهرسها** ⇒ لولا هذا لرُدّت دفعتُها كلُّها.
--      وعلّةُ الإلزام مكتوبةٌ في `import_bank` نفسِها: «الهدفُ في البنك هو ما يعطي السؤالَ فرعه، وبالفرع يزنه النموذج» —
--      **وبنكُ الطبقة لا نموذجَ له:** المحرّكُ يركّب منه محطّاتِه بالنطاق. والمكتوبُ منه يُطابَق بالفهرس كما كان.
--      🔴 **وكشفت الجافّةُ الأولى ما خبّأه الإلزام:** خطّةُ الدفعة تجمع الأسئلةَ بأهدافها (`jsonb_object_agg`)، وسؤالٌ بلا هدفٍ مفتاحٌ فارغ
--         يُسقطها كلَّها («field name must not be null») ⇒ «—» مفتاحُه، كما تفعل أخواتُها (`بأقسامها` · `بفروعها`).
--   ③ **والبصمةُ تزيد الطبقةَ والنطاقَ حين تُرسلان وحدهما** — فبصماتُ الملفّات القديمة كما هي، و«لا جديد» لملفٍّ قديمٍ أُعيد لا يكذب.
--   ④ **`words` في `save_passage`** — «مجموعةُ كلمات» لـM1 (ق١٧ ⑫): تعليمتُها المسموعة وسيطُها، أو عنوانٌ وحده، والأسئلةُ بأصواتها.
--      ولا تنقلب «نصّاً» حين لا وسيط (السلوكُ القديم يردّ كلَّ نوعٍ بلا وسيط إلى `text`).
--   ⑤ **`set_passage_band` بابُ النطاق وحده** كالمجموعة (`set_passage_group`) — لا معاملٌ تاسعٌ في `save_passage`:
--      دالّتان باسمٍ واحد ومعاملٍ زائدٍ له افتراضيّ تُربكان PostgREST («Could not choose the best candidate function»)،
--      وإسقاطُ القديمة حذفٌ على الحيّ لا يُحتاج.
--   ⑥ **والمحرّرُ يعرف بنكَ الطبقة:** `quiz_for_edit` تُرجع `band` لكلّ نصّ و`station_kind` و`tier` للاختبار، و`subject_banks` طبقةَ البنك وأداتَه.
--      🔴 **وكشف هذا عطلاً قديماً صامتاً:** إعداداتُ المحطّة في المحرّر تقرأ `station_kind`، و`quiz_for_edit` لم تُرجعه قطّ ⇒ تعرض
--         «محطّة التوجيه» لكلّ محطّة، والحفظُ يكتبها (`save_quiz`: `coalesce(p_kind, …)`). **ولم يقع:** محطّاتُ الأداتين التسعُ بأدوارها
--         (قِيس ١٤ نوفمبر). فإرجاعُه يُصلحه — ويفتح بابَ ⑧.
--   ⑦ **وبنكُ الطبقة معفًى من «شرح الخطأ» — قرارُ المالك (١٤ نوفمبر):** «نعفي اختبار تحديد المستوى من هذا الشرط، مع الاحتفاظ في توثيق
--      الاختبار ببيانٍ لدليل اختيار كلّ إجابةٍ صحيحة». وعلّةُ الشرط («الطالبُ يحتاج أن يعرف لماذا أخطأ») لا تقع على بنكٍ لا يُري الطالبَ شيئاً
--      (`reveal = 'never'`) — **وقِيس: ردّ `save_question` أوّلَ دفعةٍ تجريبيّة به.** فالشرطُ في مواضعه الثمانية (لكلّ نمطٍ موضع) يُستثنى منه بنكُ الطبقة،
--      **والحقلُ نفسُه (`explanation`) بيانُ دليل الإجابة الصحيحة فيه** — يُكتب للتوثيق ولا يُعرض، والاستيرادُ يُحذّر من سؤالٍ بلا دليل ولا يمنعه.
--      ⚠️ **والوسمُ قبل الأسئلة:** `import_bank` تَسِم البنكَ بطبقته قبل أن تحفظ أسئلته، فيقرأ `save_question` الإعفاءَ من البنك نفسِه.
--      **والجاهزيّةُ مثلُه:** `quiz_readiness` تعدّ السؤالَ بلا شرحٍ عائقاً في مواضعها الثمانية، والمحرّرُ يعرضها تحت «ما يحول دون اكتمال
--         الاختبار» ⇒ تُستثنى منها أسئلةُ بنك الطبقة كذلك، وإلا ناقضت الشاشةُ القرار.
--   ⑧ **وبابان لم يكونا يعرفان بنكَ الطبقة يحرسانه الآن:**
--      · `save_quiz` تردّ تبديلَ دوره أو كشفَه: قائمةُ أدوار المحطّة في الإعدادات بلا «adaptive»، فيختار المتصفّحُ أوّلَها «routing» ويُرسله
--        الحفظ ⇒ ينقلب البنكُ محطّةً **صامتاً** (`quizzes_adaptive_chk` لا يحرس إلا الـadaptive نفسَه). والمحرّرُ (b247) يُخفي القائمةَ فيه،
--        والحارسُ هنا لمتصفّحٍ لم يُحدَّث.
--      · و`form_slots_guard` تردّ سطرَ نموذجٍ من بنك الطبقة (⑤ في التصميم: «لا نموذجَ له») — وإلا رأى الطالبُ أسئلةَ القياس ومفاتيحَها بعد
--        تسليم نموذج. والاستيرادُ كان يردّ العكسَ وحده (بنكٌ تسحب منه نماذج لا يصير بنكَ طبقة · ①).
--   ⑨ **وبيانُ الاعتماد صادق:** «ولا يرى الطالب أسئلته إلا في اختبار المستوى» لبنك الطبقة، لا «إلا في نموذج».
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `save_passage` (`3e919309`) · `import_bank` (`4e4a52ab`) · `quiz_for_edit` (`efc347ce`) · `subject_banks` ·
--   `set_passage_group` · `create_bank` · و`save_question` (لا تُلزم هدفاً) · وفهرسُ أهداف المادّة ٧ (صفر).
--   **و(١٤ نوفمبر):** `save_question` (`68f2a487`) · `quiz_readiness` (`01745aa0`) · `save_quiz` (`803a02a8`) · `form_slots_guard` (`73c13aab`) ·
--   وبنوكُ الطبقة على الحيّ (صفر) · ونموذجٌ واحد.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة: `set_passage_band` ═══════════

create or replace function public.set_passage_band(p_id bigint, p_band integer)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare v_quiz bigint;
begin
  select pg.quiz_id into v_quiz from passages pg where pg.id = p_id;
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'النصّ غير موجود');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;
  if p_band is not null and (p_band < 0 or p_band > 24) then
    return jsonb_build_object('ok', false, 'error', 'النطاق من ٠ إلى ٢٤، و٠ للتمهيد');
  end if;
  update passages set band = p_band where id = p_id;
  return jsonb_build_object('ok', true, 'id', p_id, 'band', p_band);
end $$;

revoke all on function public.set_passage_band(bigint, integer) from public, anon;
grant execute on function public.set_passage_band(bigint, integer) to authenticated;

-- ═══════════ معدَّلة: رُقعٌ بعدّ نصّها — والقائمُ كما هو ═══════════

-- `save_passage`: «مجموعةُ كلمات» (④)
do $$
declare v text; n int; i int;
        p text[] := array[
          'if coalesce(trim(p_body), '''') = '''' and coalesce(trim(p_media), '''') = '''' then',
          'if v_kind not in (''text'',''audio'',''video'',''image'') then',
          '''نوع الوسيط: audio أو video أو image''',
          'if coalesce(trim(p_media),'''') =  '''' then v_kind := ''text''; end if;'];
        r text[] := array[
          'if coalesce(trim(p_body), '''') = '''' and coalesce(trim(p_media), '''') = ''''' || chr(10)
            || '     and not (coalesce(trim(p_kind), '''') = ''words'' and coalesce(trim(p_title), '''') <> '''') then   -- 214 · مجموعةُ كلمات: عنوانُها يكفي',
          'if v_kind not in (''text'',''audio'',''video'',''image'',''words'') then   -- 214 · مجموعةُ كلمات (ق١٧ ⑫)',
          '''نوع الوسيط: audio أو video أو image أو words''',
          'if coalesce(trim(p_media),'''') =  '''' and v_kind <> ''words'' then v_kind := ''text''; end if;   -- 214 · والمجموعةُ بلا وسيطٍ تبقى مجموعة'];
begin
  v := pg_get_functiondef('public.save_passage(bigint,bigint,text,text,text,text,text,integer)'::regprocedure);
  if position('''words''' in v) > 0 then raise notice 'save_passage تعرف مجموعةَ الكلمات من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'save_passage (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `save_question`: بنكُ الطبقة معفًى من «شرح الخطأ» في مواضعه الثمانية (⑦ · قرارُ المالك)
do $$
declare v text; n int; i int;
        p text[] := array[
          'v_pbody text;          -- 208 · متنُ نصّ اختيار الجملة',
          'select q.subject_id into v_subject from quizzes q where q.id = v_quizid;',
          'if coalesce(trim(p_explanation), '''') = '''' then'];
        r text[] := array[
          'v_pbody text;          -- 208 · متنُ نصّ اختيار الجملة' || chr(10)
            || '  v_tierbank boolean := false;   -- 214 · بنكُ اختبار المستوى: الشرحُ فيه دليلُ الإجابة للتوثيق، لا شرطٌ (reveal = never)',
          'select q.subject_id, coalesce(q.station_kind = ''adaptive'', false) into v_subject, v_tierbank'
            || ' from quizzes q where q.id = v_quizid;',
          'if coalesce(trim(p_explanation), '''') = '''' and not v_tierbank then'];
        c int[] := array[1, 1, 8];                                  -- الثمانيةُ مقيسةٌ على الحيّ: موضعٌ لكلّ نمط
begin
  v := pg_get_functiondef('public.save_question(bigint,bigint,text,text,integer,jsonb,text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)'::regprocedure);
  if position('v_tierbank' in v) > 0 then raise notice 'save_question تعفي بنكَ الطبقة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> c[i] then raise exception 'save_question (الرقعة %): وُجد النصّ % مرّة لا %', i, n, c[i]; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `import_bank`: الطبقةُ والأداةُ في الرأس، والنطاقُ لكلّ نصّ، والهدفُ اختياريٌّ في بنك الطبقة (①–③)
do $$
declare v text; n int; i int;
        p text[] := array[
          -- ١ المتغيّران
          'v_stage text := ''التحقّق'';',
          -- ٢ الرأس: الطبقةُ من سلّم المادّة، ولا أداةَ بلا طبقة
          'v_err := v_err || array[''النصوص المشتركة تُرسل قائمةً أو لا تُرسل''];' || chr(10) || '  end if;',
          -- ٣ البصمة: الطبقةُ حين تُرسل وحدها
          'v_title, quiz_payload_fp(p_payload),',
          -- ٤ والنطاقُ لكلّ نصٍّ حين يُرسل وحده
          '(select string_agg(e.ord || '':'' || coalesce(btrim(e.value->>''group''), ''''), '','' order by e.ord)',
          -- ٥ بنكُ الطبقة: لا يُبدَّل، ولا بنكان لطبقة، ولا بنكٌ تسحب منه نماذج
          'v_exist := v_bank;',
          -- ٦ النطاقُ عددٌ من ٠ إلى ٢٤
          'select array_agg(''مُعرِّف مكرَّر للنصّ المشترك: '' || d.ref) into v_tmp',
          -- ٧ الهدفُ اختياريٌّ في بنك الطبقة
          'where nullif(btrim(coalesce(e.value->>''objective'', '''')), '''') is null;',
          -- ٨ تحذير: نصوصٌ بلا نطاق في بنك الطبقة
          'select array_agg(''الخانة «'' || d.v || ''» بسؤال واحد — لا تُقرن، وسؤال وحده ليس صيغةً لشيء'') into v_tmp',
          -- ٩ الخطّة
          '''نصوصٌ مشتركة'', v_np,',
          -- ١٠ وسمُ البنك بعد إنشائه أو إيجاده
          'v_pbase := coalesce((select max(p.position) from passages p where p.quiz_id = v_bank), 0);' || chr(10) || '    end if;',
          -- ١١ نطاقُ النصّ بعد حفظه
          'v_pass := v_pass || jsonb_build_object(btrim(coalesce(r.q->>''ref'', r.q->>''id'')), v_res->>''id'');',
          -- ١٢ الخطّة: سؤالٌ بلا هدف (بنكُ الطبقة) لا يُسقطها — كشفته الجافّةُ الأولى
          '(select btrim(e.value->>''objective'') as o, count(*) as n',
          -- ١٣ بيانُ الاعتماد: بنكُ الطبقة لا نموذجَ له (⑨)
          'when v_exist is null then ''اعتُمدت — وأُنشئ البنك، ولا يرى الطالب أسئلته إلا في نموذج'''];
        r text[] := array[
          'v_stage text := ''التحقّق'';' || chr(10)
            || '  v_tier text := nullif(btrim(coalesce(p_payload->>''tier'', '''')), '''');   -- 214 · بنكُ الطبقة (ق١٧)' || chr(10)
            || '  v_tool text := nullif(btrim(coalesce(p_payload->>''tool'', '''')), '''');',
          'v_err := v_err || array[''النصوص المشتركة تُرسل قائمةً أو لا تُرسل''];' || chr(10) || '  end if;' || chr(10)
            || '  -- 214 · بنكُ الطبقة: tier وأداتُه معاً، والطبقةُ من سلّم المادّة' || chr(10)
            || '  if v_tier is not null then' || chr(10)
            || '    if not exists (select 1 from scale_tiers st where st.scale_id = v_scale and st.code = v_tier) then' || chr(10)
            || '      v_err := v_err || array[''الطبقة «'' || v_tier || ''» ليست في سلّم المادة''];' || chr(10)
            || '    end if;' || chr(10)
            || '    if v_tool is null then' || chr(10)
            || '      v_err := v_err || array[''بنك الطبقة يحتاج أداته في tool — مثل reading_placement''];' || chr(10)
            || '    end if;' || chr(10)
            || '  elsif v_tool is not null then' || chr(10)
            || '    v_err := v_err || array[''tool بلا tier — والأداة في الدفعة لبنك الطبقة وحده''];' || chr(10)
            || '  end if;',
          'v_title, quiz_payload_fp(p_payload),' || chr(10)
            || '            case when v_tier is not null then ''tier:'' || v_tier || ''@'' || coalesce(v_tool, '''') end,   -- 214 · وحين تُرسل وحدها (رأسُ الملفّ ③)',
          '(select string_agg(e.ord || '':'' || coalesce(btrim(e.value->>''group''), '''')'
            || ' || case when e.value ? ''band'' then ''#'' || coalesce(e.value->>''band'', '''') else '''' end, '','' order by e.ord)',
          'v_exist := v_bank;' || chr(10) || chr(10)
            || '  -- 214 · بنكُ الطبقة: لا يُبدَّل طبقةً بطبقة، ولا بنكان لطبقةٍ واحدة في الأداة، ولا يصير بنكَ طبقةٍ بنكٌ تسحب منه نماذج' || chr(10)
            || '  if v_tier is not null then' || chr(10)
            || '    if v_bank is not null and (select z.tier from quizzes z where z.id = v_bank) is not null' || chr(10)
            || '       and (select z.tier from quizzes z where z.id = v_bank) <> v_tier then' || chr(10)
            || '      return jsonb_build_object(''ok'', false, ''مرفوضة'', true, ''bank'', v_title, ''content_fp'', v_fp,' || chr(10)
            || '        ''أخطاء'', to_jsonb(array[''البنك «'' || v_title || ''» بنك طبقة '' || (select z.tier from quizzes z where z.id = v_bank)' || chr(10)
            || '                               || '' — والدفعة لطبقة '' || v_tier]));' || chr(10)
            || '    end if;' || chr(10)
            || '    if exists (select 1 from quizzes z where z.tool = v_tool and z.tier = v_tier and z.station_kind = ''adaptive''' || chr(10)
            || '                and z.id is distinct from v_bank) then' || chr(10)
            || '      return jsonb_build_object(''ok'', false, ''مرفوضة'', true, ''bank'', v_title, ''content_fp'', v_fp,' || chr(10)
            || '        ''أخطاء'', to_jsonb(array[''للطبقة '' || v_tier || '' في '' || v_tool || '' بنك آخر: «'''|| chr(10)
            || '                               || (select z.title from quizzes z where z.tool = v_tool and z.tier = v_tier' || chr(10)
            || '                                     and z.station_kind = ''adaptive'' and z.id is distinct from v_bank limit 1) || ''»'']));' || chr(10)
            || '    end if;' || chr(10)
            || '    if v_bank is not null and (select z.tier from quizzes z where z.id = v_bank) is null' || chr(10)
            || '       and exists (select 1 from form_slots fs where fs.bank_id = v_bank) then' || chr(10)
            || '      return jsonb_build_object(''ok'', false, ''مرفوضة'', true, ''bank'', v_title, ''content_fp'', v_fp,' || chr(10)
            || '        ''أخطاء'', to_jsonb(array[''البنك «'' || v_title || ''» تسحب منه نماذج — وبنك الطبقة لا نموذج له، فيُستورد بعنوانٍ آخر'']));' || chr(10)
            || '    end if;' || chr(10)
            || '  end if;',
          '-- 214 · النطاقُ عددٌ من ٠ إلى ٢٤ (و٠ للتمهيد) — والقيدُ في القاعدة يردّه، لكن برسالةٍ لا تُسمّي النصّ' || chr(10)
            || '  select array_agg(''النصّ المشترك '' || ord || '': النطاق «'' || (e.value->>''band'') || ''» ليس عدداً من ٠ إلى ٢٤'')' || chr(10)
            || '    into v_tmp' || chr(10)
            || '    from jsonb_array_elements(coalesce(p_payload->''passages'', ''[]''::jsonb)) with ordinality as e(value, ord)' || chr(10)
            || '   where e.value ? ''band'' and jsonb_typeof(e.value->''band'') <> ''null''' || chr(10)
            || '     and not (case when coalesce(e.value->>''band'', '''') ~ ''^[0-9]{1,2}$''' || chr(10)
            || '                   then (e.value->>''band'')::int between 0 and 24 else false end);' || chr(10)
            || '  v_err := v_err || coalesce(v_tmp, ''{}'');' || chr(10) || chr(10)
            || '  select array_agg(''مُعرِّف مكرَّر للنصّ المشترك: '' || d.ref) into v_tmp',
          'where nullif(btrim(coalesce(e.value->>''objective'', '''')), '''') is null' || chr(10)
            || '     and v_tier is null;   -- 214 · بنكُ الطبقة لا نموذجَ له: الهدفُ فيه اختياريّ (رأسُ الملفّ ②)',
          '-- 214 · نصوصٌ بلا نطاق في بنك الطبقة: لا تمنع الدفعة، ولا تبدأ على البنك جلسةٌ حتى يُكتب (`placement_bank_issues`)' || chr(10)
            || '  if v_tier is not null then' || chr(10)
            || '    select count(*) into v_n from jsonb_array_elements(coalesce(p_payload->''passages'', ''[]''::jsonb)) e' || chr(10)
            || '     where not (e.value ? ''band'') or jsonb_typeof(e.value->''band'') = ''null'';' || chr(10)
            || '    if v_n > 0 then' || chr(10)
            || '      v_warn := v_warn || array[''نصوص بلا نطاق في بنك الطبقة: '' || v_n || '' — لا تبدأ عليه جلسة حتى يُكتب نطاقها''];' || chr(10)
            || '    end if;' || chr(10)
            || '    -- ⑦ ودليلُ الإجابة الصحيحة يُوثَّق ولا يُلزَم (قرارُ المالك)' || chr(10)
            || '    select count(*) into v_n from jsonb_array_elements(p_payload->''questions'') e' || chr(10)
            || '     where nullif(btrim(coalesce(e.value->>''explanation'', '''')), '''') is null;' || chr(10)
            || '    if v_n > 0 then' || chr(10)
            || '      v_warn := v_warn || array[''أسئلة بلا دليل للإجابة الصحيحة: '' || v_n || '' — يُكتب في explanation للتوثيق، ولا يراه الطالب''];' || chr(10)
            || '    end if;' || chr(10)
            || '  end if;' || chr(10) || chr(10)
            || '  select array_agg(''الخانة «'' || d.v || ''» بسؤال واحد — لا تُقرن، وسؤال وحده ليس صيغةً لشيء'') into v_tmp',
          '''نصوصٌ مشتركة'', v_np,' || chr(10)
            || '    ''طبقة'', case when v_tier is null then null else jsonb_build_object(''الطبقة'', v_tier, ''الأداة'', v_tool) end,   -- 214' || chr(10)
            || '    ''بنطاقاتها'', (select coalesce(jsonb_object_agg(b, n), ''{}''::jsonb)' || chr(10)
            || '                   from (select e.value->>''band'' as b, count(*) as n' || chr(10)
            || '                           from jsonb_array_elements(coalesce(p_payload->''passages'', ''[]''::jsonb)) e' || chr(10)
            || '                          where e.value ? ''band'' and jsonb_typeof(e.value->''band'') <> ''null'' group by 1) d),',
          'v_pbase := coalesce((select max(p.position) from passages p where p.quiz_id = v_bank), 0);' || chr(10) || '    end if;' || chr(10) || chr(10)
            || '    -- 214 · بنكُ الطبقة: أداتُه وطبقتُه، ولا يكشف مفاتيحَه (`quizzes_adaptive_chk`) — والقائمُ يصير بنكَ طبقةٍ بالدفعة نفسِها' || chr(10)
            || '    if v_tier is not null then' || chr(10)
            || '      v_stage := ''وسم بنك الطبقة'';' || chr(10)
            || '      update quizzes set tool = v_tool, tier = v_tier, station_kind = ''adaptive'', reveal = ''never''' || chr(10)
            || '       where id = v_bank' || chr(10)
            || '         and (tool, tier, station_kind, reveal) is distinct from (v_tool, v_tier, ''adaptive'', ''never'');' || chr(10)
            || '    end if;',
          'v_pass := v_pass || jsonb_build_object(btrim(coalesce(r.q->>''ref'', r.q->>''id'')), v_res->>''id'');' || chr(10)
            || '      if r.q ? ''band'' and jsonb_typeof(r.q->''band'') <> ''null'' then             -- 214 · نطاقُ النصّ' || chr(10)
            || '        update passages set band = (r.q->>''band'')::smallint where id = (v_res->>''id'')::bigint;' || chr(10)
            || '      end if;',
          '(select coalesce(nullif(btrim(e.value->>''objective''), ''''), ''—'') as o, count(*) as n'
            || '   -- 214 · مفتاحٌ فارغٌ يُسقط jsonb_object_agg («field name must not be null»)',
          'when v_tier is not null and v_exist is null then ''اعتُمدت — وأُنشئ البنك، ولا يرى الطالب أسئلته إلا في اختبار المستوى''   -- 214 ⑨' || chr(10)
            || '                  when v_tier is not null then ''اعتُمدت — وأُضيفت الدفعة إلى البنك، ولا يرى الطالب أسئلته إلا في اختبار المستوى''' || chr(10)
            || '                  when v_exist is null then ''اعتُمدت — وأُنشئ البنك، ولا يرى الطالب أسئلته إلا في نموذج'''];
begin
  v := pg_get_functiondef('public.import_bank(bigint,jsonb,boolean)'::regprocedure);
  if position('v_tier' in v) > 0 then raise notice 'import_bank تعرف بنكَ الطبقة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'import_bank (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `quiz_for_edit` · `subject_banks`: المحرّرُ يعرف بنكَ الطبقة ونطاقَ كلّ نصّ (⑥)
do $$
declare v text; n int; i int;
        p text[] := array[
          '''group'', pg.group_key,                        -- 185 · النصوصُ البديلة في البنك',
          '''role'', q.role,                                   -- 185 · درسٌ · بنكٌ · نموذج'];
        r text[] := array[
          '''group'', pg.group_key,                        -- 185 · النصوصُ البديلة في البنك' || chr(10)
            || '        ''band'', pg.band,                              -- 214 · نطاقُ المقتطف (ق١٧)',
          '''role'', q.role,                                   -- 185 · درسٌ · بنكٌ · نموذج' || chr(10)
            || '    ''station_kind'', q.station_kind, ''tier'', q.tier,   -- 214 · بنكُ الطبقة يعرفه المحرّر'];
begin
  v := pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure);
  if position('pg.band' in v) > 0 then
    raise notice 'quiz_for_edit تعرف النطاقَ من قبل';
  else
    for i in 1 .. array_length(p, 1) loop
      n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
      if n <> 1 then raise exception 'quiz_for_edit (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
      v := replace(v, p[i], r[i]);
    end loop;
    execute v;
  end if;

  v := pg_get_functiondef('public.subject_banks(bigint)'::regprocedure);
  if position('b.tier' in v) > 0 then
    raise notice 'subject_banks تعرف الطبقةَ من قبل';
  else
    n := (length(v) - length(replace(v, '''curate'', can_edit_quiz(b.id))', ''))) / length('''curate'', can_edit_quiz(b.id))');
    if n <> 1 then raise exception 'subject_banks: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, '''curate'', can_edit_quiz(b.id))',
      '''curate'', can_edit_quiz(b.id),' || chr(10)
      || '             ''tier'', b.tier, ''tool'', b.tool)   -- 214 · بنكُ الطبقة على بطاقته');
  end if;
end $$;

-- `quiz_readiness`: سؤالُ بنك الطبقة بلا دليلٍ لا يُعدّ عائقاً للاكتمال (⑦)
do $$
declare v text; n int; i int;
        p text[] := array[
          'n int; v_kinds text; v_role text; v_pool bigint[];',
          'select role into v_role from quizzes where id = p_quiz;',
          'coalesce(trim(k.explanation),'''') = '''''];
        r text[] := array[
          'n int; v_kinds text; v_role text; v_pool bigint[];' || chr(10)
            || '        v_tierbank boolean := false;   -- 214 · بنكُ اختبار المستوى: الدليلُ فيه للتوثيق، لا عائقٌ للاكتمال',
          'select role, coalesce(station_kind = ''adaptive'', false) into v_role, v_tierbank from quizzes where id = p_quiz;',
          'coalesce(trim(k.explanation),'''') = '''' and not v_tierbank'];
        c int[] := array[1, 1, 8];                                  -- الثمانيةُ مقيسةٌ على الحيّ: موضعٌ لكلّ نمط
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('v_tierbank' in v) > 0 then raise notice 'quiz_readiness تعفي بنكَ الطبقة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> c[i] then raise exception 'quiz_readiness (الرقعة %): وُجد النصّ % مرّة لا %', i, n, c[i]; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `save_quiz`: دورُ بنك الطبقة وكتمانُه لا يُبدَّلان من الإعدادات (⑧)
do $$
declare v text; n int;
        p text := '-- 🔑 محطّةٌ في أداة يلزمها دور — وإلا لم يُعرف موضعها من التوجيه';
begin
  v := pg_get_functiondef('public.save_quiz(bigint,bigint,text,integer,text,text,boolean,bigint,text,integer,integer,text,integer,boolean,text)'::regprocedure);
  if position('بنك اختبار المستوى' in v) > 0 then raise notice 'save_quiz تحرس بنكَ الطبقة من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'save_quiz: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p,
    '-- 214 · بنكُ اختبار المستوى: دورُه وكتمانُه ثابتان — وإعداداتٌ قديمةٌ في متصفّحٍ تُرسل «routing» فتقلبه صامتاً (⑧)' || chr(10)
    || '  if p_id is not null and (select z.station_kind from quizzes z where z.id = p_id) = ''adaptive''' || chr(10)
    || '     and (p_kind is not null or coalesce(p_reveal, ''never'') <> ''never'') then' || chr(10)
    || '    return jsonb_build_object(''ok'', false, ''error'', ''بنك اختبار المستوى: دوره ثابت، ولا يُعرض بعده شيء للطالب'');' || chr(10)
    || '  end if;' || chr(10) || chr(10)
    || '  ' || p);
end $$;

-- `form_slots_guard`: لا سطرَ نموذجٍ من بنك الطبقة (⑧ · ⑤ في التصميم)
do $$
declare v text; n int; i int;
        p text[] := array[
          'select z.role, z.subject_id into b from quizzes z where z.id = new.bank_id;',
          'raise exception ''النموذج يسحب من بنك — لا من اختبار درس'' using errcode = ''check_violation'';' || chr(10) || '  end if;'];
        r text[] := array[
          'select z.role, z.subject_id, z.station_kind into b from quizzes z where z.id = new.bank_id;',
          'raise exception ''النموذج يسحب من بنك — لا من اختبار درس'' using errcode = ''check_violation'';' || chr(10) || '  end if;' || chr(10)
            || '  if b.station_kind = ''adaptive'' then   -- 214 · بنكُ الطبقة لا نموذجَ له: أسئلتُه للاختبار وحده' || chr(10)
            || '    raise exception ''بنك اختبار المستوى لا يُسحب منه في نموذج — أسئلته للاختبار وحده'' using errcode = ''check_violation'';' || chr(10)
            || '  end if;'];
begin
  v := pg_get_functiondef('public.form_slots_guard()'::regprocedure);
  if position('station_kind' in v) > 0 then raise notice 'form_slots_guard تعرف بنكَ الطبقة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'form_slots_guard (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('214', 'بنكُ الطبقة في التأليف (ق١٧) — النطاقُ ومجموعةُ الكلمات والاستيراد والإعفاءُ من شرح الخطأ', now())
on conflict (n) do update set applied_at = now();
