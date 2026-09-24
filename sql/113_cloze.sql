-- ═══════════════════════════════════════════════════════════════════════
-- 113 · نمط «إكمال من قائمة» (cloze) — التأليف وحده، والنشر محجوب
--
-- لماذا نمطٌ جديد ولم يكفِ bank في gap؟
--   `gap` بنكُه **تلميح**: نصوصٌ تُعرض والطالب يكتب. فالمجال مفتوح،
--   وخطؤه لا يُشخَّص إلا إذا خمّن المؤلّفُ حرفَ ما سيكتبه — ولهذا
--   wrong_map في gap مفتاحُها «رقم الفراغ:النصّ» وهي بطبيعتها ناقصة.
--   وفي «إكمال من قائمة» الاختيار **مغلق**: كلُّ كلمةٍ في القائمة ليست
--   صواباً هي مشتّتٌ معلومٌ باسمه ⇒ يُمكن أن يحمل كوداً، فوجب أن يحمله.
--   وميزةُ المنصّة أن يُقال للطالب أيَّ خطأٍ وقع فيه لا أنّه أخطأ.
--
-- ولماذا المفاتيح لا النصوص؟ — درسُ 112 بحرفه: تحريرُ حرفٍ في نصّ
--   مقابلٍ كان يقطع كلَّ إشارةٍ إليه، في المفتاح وفي التشخيص، **وبصمت**.
--   ⇒ القائمة هنا [{k,t}] كقائمة المزاوجة، والمفتاحُ هو المرجع.
--
-- 🔑 والبنيةُ مزاوجةٌ موضعُ بنودها الجملة:
--       bank    [ {"k":"b1","t":"الأكسجين"}, … ]
--       accept  { "pairs": { "1":"b1", "2":"b3" } }   ← رقمُ الفراغ نصّاً
--       wrong   { "1:b3": "SUB" }                      ← «فراغ:كلمة» ⇒ كود
--   والمفتاح `pairs` مقصودٌ على وجهه: به تعمل grade_match و match_pairs
--   و match_key_ok **بلا تعديل**. ودالّةُ تصحيحٍ لا تُكتب خيرٌ من دالّةٍ
--   تُكتب ثم تتفارق عن أختها.
--
-- ⛔ وهذا الملفّ **لا يُبلغ الطالب**: get_quiz لا ترسله، و submit_attempt
--    لا تصحّحه. وحارسان يمنعان تسرّبه:
--      ① save_question ترفض إضافته إلى اختبارٍ **منشور** — فلا يتغيّر
--        اختبارٌ حيّ تحت أقدام طلابه.
--      ② quiz_readiness تحجب النشر ما دام في الاختبار سؤالٌ منه.
--    (وهو مسلك 109 نفسه يوم بلغت المزاوجة المحرّر قبل أن تبلغ الطالب.)
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① القيد: النمط يصير مقبولاً في العمود
-- ═══════════════════════════════════════════════════════════════════════

alter table public.questions drop constraint if exists questions_kind_check;
alter table public.questions add  constraint questions_kind_check
  check (kind = any (array['mcq','msq','gap','essay','audio','speaking',
                           'matching','ordering','truefalse','cloze']));


-- ═══════════════════════════════════════════════════════════════════════
-- ② حارسٌ صغير: مفاتيح accept أرقامُ فراغاتٍ من ١ إلى ن
--    منشأةٌ هنا — ولا نظير لها في المزاوجة، إذ مفاتيحُها بنودٌ لا أرقام.
--
--    ولماذا حارسٌ مستقلّ؟ لأن match_pairs تعدّ ولا تقرأ: مفتاحٌ اسمه
--    «٩» في سؤالٍ بفراغين يُعَدّ صحيحاً ثمّ لا يُقرأ أبداً — مفتاحٌ يتيم،
--    وصمتٌ يُصدَّق. وهذا الحارس يُنطقه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.cloze_keys_ok(p_accept jsonb, p_gaps int)
returns boolean language sql immutable set search_path to 'public' as $$
  select p_gaps > 0
     and match_pairs(p_accept) = p_gaps
     and not exists (
           select 1 from generate_series(1, p_gaps) i
            where not (p_accept -> 'pairs') ? i::text);
$$;

grant execute on function public.cloze_keys_ok(jsonb, int)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ معدَّلة لا منشأة — save_question  (أصلُها 12 · وآخر مسّ 112)
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال، والفرق عن الحيّ:
--      · فرعُ 'cloze' الجديد            · حارسُ الاختبار المنشور
--      · points = عددُ الفراغات لها      · accept/wrong/bank تُحفظ لها
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.save_question(
  p_id bigint default null, p_quiz bigint default null,
  p_kind text default 'mcq', p_body text default null,
  p_position integer default 0, p_options jsonb default '[]'::jsonb,
  p_explanation text default null, p_model text default null,
  p_passage bigint default null, p_objective bigint default null,
  p_points integer default 1, p_lang text default 'ar',
  p_difficulty text default null, p_image text default null,
  p_video text default null, p_audio text default null,
  p_section text default null, p_accept jsonb default null,
  p_wrong jsonb default null, p_bank jsonb default null)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_subject bigint; v_quizid bigint; v_qid bigint; v_oid bigint;
  v_correct bigint; v_dx jsonb := '{}'::jsonb;
  v_bad text; v_n int; v_k int; r record;
  v_ids bigint[] := '{}'::bigint[];
  v_gaps int;
  v_pairs int;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_quizid := coalesce(p_quiz, (select q2.quiz_id from questions q2 where q2.id = p_id));
  select q.subject_id into v_subject from quizzes q where q.id = v_quizid;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  if p_id is not null and exists (select 1 from answers where question_id = p_id) then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا السؤال — أنشئ نسخة جديدة من الاختبار بكود مختلف');
  end if;

  if coalesce(trim(p_body), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'نصّ السؤال مطلوب');
  end if;

  if p_passage is not null
     and not exists (select 1 from passages pg
                      where pg.id = p_passage and pg.quiz_id = v_quizid) then
    return jsonb_build_object('ok', false, 'error', 'النصّ المشترك ليس من هذا الاختبار');
  end if;

  if p_difficulty is not null and p_difficulty not in ('easy','medium','hard') then
    return jsonb_build_object('ok', false,
      'error', 'مستوى الصعوبة: easy أو medium أو hard');
  end if;

  /* ⛔ 113 · حارسُ المرحلة — في موضع الفعل لا بعده.
     «إكمال من قائمة» يُؤلَّف ولا يصل الطالب بعد. ولو قُبل في اختبارٍ
     منشور لسقط إلى الطالب سؤالاً بلا خياراتٍ ولا تصحيح (فرعُ else في
     submit_attempt يخزّنه مقالياً). ⇒ يُمنع هنا، والسبب يُقال كاملاً:
     الرفضُ الذي لا يقول ماذا يُفعل يُنسب إلى عطل. */
  if p_kind = 'cloze'
     and exists (select 1 from quizzes q3 where q3.id = v_quizid and q3.published) then
    return jsonb_build_object('ok', false,
      'error', 'نمط «إكمال من قائمة» يُؤلَّف في اختبارٍ مسودّة: مسارُه إلى الطالب '
            || 'لم يُبنَ بعد، فلا يُضاف إلى اختبارٍ منشورٍ يجلس فيه طلاب. '
            || 'ألغِ النشر إن أردت تأليفه الآن.');
  end if;

  if p_kind = 'essay' then
    if coalesce(trim(p_model), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'السؤال المقالي يحتاج إجابة نموذجية — بها يقارن الطالب بنفسه');
    end if;

  elsif p_kind = 'mcq' then
    v_n := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_n < 2 then
      return jsonb_build_object('ok', false, 'error', 'السؤال يحتاج خيارين على الأقل');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n <> 1 then
      return jsonb_build_object('ok', false, 'error', 'يلزم خيار صحيح واحد بالضبط');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'msq' then
    v_k := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_k < 3 then
      return jsonb_build_object('ok', false,
        'error', 'الاختيار المتعدّد يحتاج ثلاثة خيارات على الأقل — صحيحان وخاطئ');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n < 2 then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خياران صحيحان على الأقل — وسؤالٌ صحيحه واحد هو اختيارٌ واحد متنكّر');
    end if;
    if v_n >= v_k then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خيار خاطئ واحد على الأقل — سؤالٌ كل خياراته صحيحة لا يميّز شيئاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'gap' then
    v_gaps := gap_count(p_body);

    if v_gaps = 0 then
      return jsonb_build_object('ok', false,
        'error', 'ضع فراغاً في النصّ: {{1}} — وفراغين: {{1}} و {{2}}');
    end if;
    if not gap_seq_ok(p_body) then
      return jsonb_build_object('ok', false,
        'error', 'أرقام الفراغات متتالية من ١ بلا فجوة ولا تكرار');
    end if;

    if p_accept is null or jsonb_typeof(p_accept -> 'slots') <> 'array' then
      return jsonb_build_object('ok', false,
        'error', 'الإجابة القصيرة تحتاج مقبولات — { "ordered":…, "slots":[[…]] }');
    end if;

    v_k := jsonb_array_length(p_accept -> 'slots');
    if v_k <> v_gaps then
      return jsonb_build_object('ok', false,
        'error', 'في النصّ ' || v_gaps || ' فراغاً، والمقبولات ' || v_k);
    end if;

    if exists (select 1 from jsonb_array_elements(p_accept -> 'slots') s
                where jsonb_typeof(s) <> 'array'
                   or jsonb_array_length(s) = 0
                   or exists (select 1 from jsonb_array_elements_text(s) a
                               where coalesce(trim(a),'') = '')) then
      return jsonb_build_object('ok', false,
        'error', 'كل فراغ يحتاج مقبولاً واحداً على الأقل، ولا مقبولَ فارغاً');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الأخطاء المتوقّعة كائن: { "1:نصّ الخطأ": "كود" }');
      end if;
      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ ('^[1-' || v_gaps || ']:.') limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخطأ يبدأ برقم الفراغ ثم نقطتين: ' || v_bad);
      end if;
      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if p_bank is not null and jsonb_typeof(p_bank) = 'array'
       and jsonb_array_length(p_bank) > 0 then
      select a into v_bad
        from jsonb_array_elements(p_accept -> 'slots') s,
             jsonb_array_elements_text(s) a
       where not exists (select 1 from jsonb_array_elements_text(p_bank) b where b = a)
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مقبولٌ ليس في القائمة: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  -- ═══ 113 · إكمال من قائمة ═══════════════════════════════════════
  elsif p_kind = 'cloze' then
    v_gaps := gap_count(p_body);

    if v_gaps < 2 then
      return jsonb_build_object('ok', false,
        'error', 'ضع فراغين على الأقل: {{1}} و {{2}} — وفراغٌ واحدٌ من قائمةٍ '
              || 'اختيارٌ من متعدد متنكّر، وذاك نمطُه أوضح');
    end if;
    if v_gaps > 8 then
      return jsonb_build_object('ok', false,
        'error', 'ثمانية فراغاتٍ حدٌّ كافٍ — والموجود ' || v_gaps ||
                 ' (وما فوقها عبءُ قراءةٍ لا قياس)');
    end if;
    if not gap_seq_ok(p_body) then
      return jsonb_build_object('ok', false,
        'error', 'أرقام الفراغات متتالية من ١ بلا فجوة ولا تكرار');
    end if;

    /* البنودُ هي الفراغات ⇒ لا options. وخيارٌ مُرسَلٌ هنا يُكتب في
       الجدول ولا يُقرأ أبداً — صمتٌ يُصدَّق. فيُرفض ناطقاً. */
    if jsonb_array_length(coalesce(p_options, '[]'::jsonb)) > 0 then
      return jsonb_build_object('ok', false,
        'error', 'في «إكمال من قائمة» الفراغُ هو البند ⇒ لا خيارات. '
              || 'الكلماتُ كلُّها في القائمة (bank)');
    end if;

    if not bank_keys_ok(p_bank) then
      return jsonb_build_object('ok', false,
        'error', 'قائمة الكلمات: [ {"k":"مفتاح","t":"كلمة"}, … ] — '
              || 'بمفاتيحَ فريدةٍ ونصوصٍ غير فارغة، ويُستحبّ أن تزيد على الفراغات');
    end if;

    if not cloze_keys_ok(p_accept, v_gaps) then
      return jsonb_build_object('ok', false,
        'error', 'لكلّ فراغٍ مفتاحُه برقمه من ١ إلى ' || v_gaps ||
                 ' — { "pairs": { "1":"مفتاح الكلمة", … } } والموجود ' ||
                 match_pairs(p_accept) || ' مفتاحاً');
    end if;

    if not match_key_ok(p_accept, p_bank) then
      select p.value into v_bad
        from jsonb_each_text(p_accept -> 'pairs') p
       where coalesce(trim(p.value), '') = ''
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = p.value) limit 1;
      return jsonb_build_object('ok', false,
        'error', 'صوابُ فراغٍ ليس في القائمة: ' || coalesce(v_bad, '—') ||
                 ' — وفراغُه لا يُصيبه أحد');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الخلطُ المتوقَّع كائن: { "رقم الفراغ:مفتاح الكلمة": "كود" }');
      end if;

      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ '^[1-9][0-9]*:[A-Za-z0-9_-]{1,16}$'
          or split_part(w.key, ':', 1)::int > v_gaps
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = split_part(w.key, ':', 2))
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخلط «رقم الفراغ:مفتاح الكلمة» وطرفاه موجودان: ' || v_bad);
      end if;

      /* خلطٌ إلى صوابِ الفراغ نفسه: كودٌ لا يُقرأ أبداً — يُقال ولا يُبتلع */
      select w.key into v_bad from jsonb_each(p_wrong) w
       where (p_accept -> 'pairs' ->> split_part(w.key, ':', 1))
             = split_part(w.key, ':', 2)
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'خلطٌ إلى صواب الفراغ نفسه: ' || v_bad || ' — كودٌ لا يُقرأ أبداً');
      end if;

      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'matching' then
    v_pairs := jsonb_array_length(coalesce(p_options, '[]'::jsonb));

    if jsonb_typeof(p_accept -> 'pairs') = 'array'
       or (p_bank is not null and jsonb_typeof(p_bank) = 'array'
           and jsonb_array_length(p_bank) > 0
           and jsonb_typeof(p_bank -> 0) <> 'object') then
      return jsonb_build_object('ok', false,
        'error', 'نسخة المحرّر قديمة: المزاوجة صارت بالمفاتيح لا بالنصّ والموضع '
              || '(112). حدّث الصفحة — وإن بقي، فالواجهة لم تصل بعد.');
    end if;

    if v_pairs < 3 or v_pairs > 8 then
      return jsonb_build_object('ok', false,
        'error', 'المزاوجة من ثلاثة بنودٍ إلى ثمانية — والموجود ' || v_pairs ||
                 ' (بندان يُحسمان بالاستبعاد، وما فوق الثمانية عبءُ قراءةٍ لا قياس)');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل بند يحتاج نصاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(o->>'k', '') !~ '^[A-Za-z0-9_-]{1,16}$') then
      return jsonb_build_object('ok', false,
        'error', 'كل بندٍ يحتاج مفتاحاً ثابتاً (k) — حروفٌ وأرقامٌ إلى ستّةَ عشرَ محرفاً');
    end if;

    if (select count(distinct o->>'k') from jsonb_array_elements(p_options) o) <> v_pairs then
      return jsonb_build_object('ok', false,
        'error', 'مفتاحان متطابقان لبندين — والمفتاح يشير إلى واحدٍ لا إلى اثنين');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'dx'), '') <> '') then
      return jsonb_build_object('ok', false,
        'error', 'في المزاوجة الكودُ للاقتران لا للبند — ضعه في الأخطاء المتوقّعة: '
                 || '{ "مفتاح البند:مفتاح المقابل": "كود" }');
    end if;

    if not bank_keys_ok(p_bank) then
      return jsonb_build_object('ok', false,
        'error', 'عمود المقابلات: [ {"k":"مفتاح","t":"نصّ"}, … ] — '
              || 'بمفاتيحَ فريدةٍ ونصوصٍ غير فارغة، ويُستحبّ أن يزيد على البنود');
    end if;

    if match_pairs(p_accept) <> v_pairs then
      return jsonb_build_object('ok', false,
        'error', 'البنود ' || v_pairs || ' والمفاتيح ' || match_pairs(p_accept) ||
                 ' — { "pairs": { "مفتاح البند": "مفتاح المقابل" } }');
    end if;

    select p.key into v_bad
      from jsonb_each_text(p_accept -> 'pairs') p
     where not exists (select 1 from jsonb_array_elements(p_options) o
                        where o->>'k' = p.key) limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false,
        'error', 'مفتاح بندٍ في المفاتيح لا وجود له بين البنود: ' || v_bad);
    end if;

    if not match_key_ok(p_accept, p_bank) then
      select p.value into v_bad
        from jsonb_each_text(p_accept -> 'pairs') p
       where coalesce(trim(p.value), '') = ''
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = p.value) limit 1;
      return jsonb_build_object('ok', false,
        'error', 'مقابلٌ ليس في القائمة: ' || coalesce(v_bad, '—') ||
                 ' — وبندُه لا يُصيبه أحد');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الأخطاء المتوقّعة كائن: { "مفتاح البند:مفتاح المقابل": "كود" }');
      end if;

      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ '^[A-Za-z0-9_-]{1,16}:[A-Za-z0-9_-]{1,16}$'
          or not exists (select 1 from jsonb_array_elements(p_options) o
                          where o->>'k' = split_part(w.key, ':', 1))
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = split_part(w.key, ':', 2))
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخلط «مفتاح البند:مفتاح المقابل» وطرفاه موجودان: ' || v_bad);
      end if;

      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  else
    return jsonb_build_object('ok', false, 'error', 'نمط السؤال غير معروف: ' || coalesce(p_kind,'—'));
  end if;

  if p_id is null then
    insert into questions (quiz_id, position, kind, body, image_url, video_url, audio_url,
                           points, passage_id, objective_id, difficulty, lang, section)
    values (v_quizid, coalesce(p_position,0), p_kind, trim(p_body), p_image, p_video, p_audio,
            case when p_kind = 'matching' then v_pairs
                 when p_kind = 'cloze'    then v_gaps      -- لكلّ فراغٍ درجة
                 else coalesce(p_points,1) end,
            p_passage, p_objective,
            coalesce(p_difficulty, 'medium'), coalesce(p_lang,'ar'),
            nullif(trim(coalesce(p_section,'')), ''))
    returning id into v_qid;
  else
    update questions set
      position = coalesce(p_position, position), kind = p_kind, body = trim(p_body),
      image_url = p_image, video_url = p_video, audio_url = p_audio,
      points = case when p_kind = 'matching' then v_pairs
                    when p_kind = 'cloze'    then v_gaps
                    else coalesce(p_points, points) end,
      passage_id = p_passage,
      objective_id = p_objective, difficulty = coalesce(p_difficulty, difficulty),
      lang = coalesce(p_lang, lang),
      section = nullif(trim(coalesce(p_section,'')), '')
     where id = p_id
    returning id into v_qid;
    if v_qid is null then
      return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود');
    end if;
    delete from question_keys where question_id = v_qid;
    delete from options       where question_id = v_qid;
  end if;

  if p_kind in ('mcq', 'msq', 'matching') then
    for r in select o, ord from jsonb_array_elements(p_options) with ordinality as t(o, ord) loop
      insert into options (question_id, position, label, body, image_url, item_key)
      values (v_qid, r.ord,
              nullif(trim(coalesce(r.o->>'label', '')), ''),
              trim(r.o->>'body'), nullif(r.o->>'image', ''),
              case when p_kind = 'matching' then r.o->>'k' end)
      returning id into v_oid;

      continue when p_kind = 'matching';

      if coalesce((r.o->>'correct')::boolean, false) then
        if p_kind = 'msq' then
          v_ids := v_ids || v_oid;
        else
          v_correct := v_oid;
        end if;
      else
        v_dx := v_dx || jsonb_build_object(v_oid::text, r.o->>'dx');
      end if;
    end loop;
  end if;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map, accept, wrong_map, bank)
  values (v_qid, v_correct, nullif(v_ids, '{}'::bigint[]),
          nullif(trim(coalesce(p_explanation,'')), ''),
          nullif(trim(coalesce(p_model,'')), ''), v_dx,
          case when p_kind in ('gap','matching','cloze') then p_accept end,
          case when p_kind in ('gap','matching','cloze') then p_wrong  end,
          case when p_kind in ('gap','matching','cloze') then p_bank   end)
  on conflict (question_id) do update
    set correct_id   = excluded.correct_id,
        correct_ids  = excluded.correct_ids,
        explanation  = excluded.explanation,
        model_answer = excluded.model_answer,
        dx_map       = excluded.dx_map,
        accept       = excluded.accept,
        wrong_map    = excluded.wrong_map,
        bank         = excluded.bank;

  update quizzes set question_count = (select count(*) from questions where quiz_id = v_quizid)
   where id = v_quizid;

  return jsonb_build_object(
    'ok', true, 'id', v_qid, 'kind', p_kind, 'gaps', v_gaps, 'pairs', v_pairs,
    'correct_n', coalesce(array_length(v_ids, 1), case when v_correct is null then 0 else 1 end),
    'dx_count', (select count(*) from jsonb_object_keys(v_dx)));
end $function$;

grant execute on function public.save_question(bigint,bigint,text,text,integer,jsonb,
  text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ معدَّلة لا منشأة — quiz_readiness  (أصلُها 22 · وآخر مسّ 112)
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال، والفرق عن الحيّ:
--      · عدُّ cloze ورقمُه في الجواب     · فحوصُه السبعة
--      · قفلُ المرحلة: النشر محجوب ما دام في الاختبار سؤالٌ منه
--
--    ⚠️ وكلُّ فحصٍ مصوغٌ لحالته وحدها (④ في CLAUDE.md): «قائمةٌ مكسورة»
--       غيرُ «مفتاحٍ ناقص» غيرُ «صوابٍ ليس في القائمة». واختبارٌ واحد
--       على الثلاثة يُنتج «فشلاً» لا يدلّ على موضعه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.quiz_readiness(p_quiz bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v_mcq int; v_msq int; v_gap int; v_essay int; v_match int; v_cloze int;
        v_marks int;
        v_issues jsonb := '[]'::jsonb; v_warns jsonb := '[]'::jsonb;
        n int; v_kinds text;
begin
  if not exists (select 1 from quizzes where id = p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;

  select count(*) filter (where kind='mcq'),
         count(*) filter (where kind='msq'),
         count(*) filter (where kind='gap'),
         count(*) filter (where kind='essay'),
         count(*) filter (where kind='matching'),
         count(*) filter (where kind='cloze')
    into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze from questions
   where quiz_id = p_quiz and retired_at is null;

  select coalesce(sum(points), 0) into v_marks from questions
   where quiz_id = p_quiz and retired_at is null
     and kind in ('mcq','msq','gap','matching','cloze');

  select string_agg(distinct kind, ' · ') into v_kinds
    from questions where quiz_id = p_quiz and retired_at is null
     and kind not in ('mcq','msq','gap','essay','matching','cloze');
  if v_kinds is not null then
    v_issues := v_issues || to_jsonb(
      'أنماط غير مبنيّة في الواجهة (' || v_kinds ||
      ') — ستُعرض للطالب كأسئلة مقالية');
  end if;

  if v_mcq + v_msq + v_gap + v_match + v_cloze < 6 then
    v_issues := v_issues || to_jsonb(
      'يلزم ٦ أسئلة موضوعية على الأقل — الموجود ' ||
      (v_mcq + v_msq + v_gap + v_match + v_cloze) ||
      ' (بأقلّ من ذلك تفقد عتبة ٦٥٪ معناها)');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and (k.question_id is null or k.correct_id is null);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا إجابة صحيحة محدَّدة'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا شرح للخطأ'); end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' خياراً خاطئاً بلا كود تشخيص — التشخيص هو ما يميّز بيان');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) < 2;
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بأقلّ من إجابتين صحيحتين');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) >=
         (select count(*) from options o where o.question_id = x.id);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال اختيار متعدّد بلا خيار خاطئ — لا يميّز شيئاً');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and not (o.id = any (coalesce(k.correct_ids, '{}'::bigint[])))
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' خياراً خاطئاً في أسئلة الاختيار المتعدّد بلا كود تشخيص');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بلا شرح للخطأ');
  end if;

  select count(*) into n from questions x
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (gap_count(x.body) = 0 or not gap_seq_ok(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال بلا {{1}} في نصّه أو بأرقامٍ غير متتالية');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (k.accept is null or jsonb_typeof(k.accept -> 'slots') <> 'array'
          or jsonb_array_length(k.accept -> 'slots') = 0);
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا مقبولات — لا يُصيبه أحد');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and jsonb_typeof(k.accept -> 'slots') = 'array'
     and jsonb_array_length(k.accept -> 'slots') <> gap_count(x.body);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال لا يطابق عددُ مقبولاته عددَ فراغاته');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا شرح للخطأ');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  -- 112 · البنك صار jsonb
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and k.bank is not null
     and exists (select 1
                   from jsonb_array_elements(k.accept -> 'slots') s,
                        jsonb_array_elements_text(s) a
                  where not exists (select 1
                                      from jsonb_array_elements_text(k.bank) b
                                     where b = a));
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤالاً فيه مقبولٌ ليس في قائمة الكلمات');
  end if;

  -- ─── المزاوجة ────────────────────────────────────────────
  -- 112 · بندٌ بلا مفتاح: سؤالٌ من عهدٍ سابق لم يُحفَظ بعد الهجرة،
  --       ومفاتيحُه لا تُقرأ ⇒ لا يُصيبه أحد ولا يُشخَّص خطؤه.
  select count(distinct x.id) into n from questions x
    join options o on o.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and o.item_key is null;
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه بندٌ بلا مفتاح — افتحه في المحرّر واحفظه ليُبنى مفتاحه');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not bank_keys_ok(k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة عمودُ مقابلاته مكسور — [ {"k":…,"t":…} ] بمفاتيحَ فريدة');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and match_pairs(k.accept) <>
         (select count(*) from options o where o.question_id = x.id);
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال مزاوجة لا يطابق عددُ مفاتيحه عددَ بنوده');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not match_key_ok(k.accept, k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه مقابلٌ ليس في القائمة — وبندُه لا يُصيبه أحد');
  end if;

  -- 112 · مفتاحٌ في accept لا بندَ له — مفتاحٌ يتيمٌ لا يُقرأ أبداً
  select count(distinct x.id) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each_text(coalesce(k.accept -> 'pairs', '{}'::jsonb)) p
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not exists (select 1 from options o
                      where o.question_id = x.id and o.item_key = p.key);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه مفتاحُ بندٍ لا وجود له بين البنود');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال مزاوجة بلا شرح للخطأ');
  end if;

  -- ⚠️ تنبيهٌ لا منع: بنكٌ استُهلك كلُّه ⇒ البند الأخير يُحلّ بالاستبعاد.
  --    112 · والمقارنة بالمفاتيح لا بالنصوص.
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and k.bank is not null and match_pairs(k.accept) > 0
     and not exists (
           select 1 from jsonb_array_elements(k.bank) b
            where not exists (
                  select 1 from jsonb_each_text(k.accept -> 'pairs') p
                   where p.value = b ->> 'k'));
  if n > 0 then
    v_warns := v_warns || to_jsonb(
      n || ' سؤال مزاوجة بلا مقابلٍ زائد — البند الأخير يُحلّ بالاستبعاد فلا يُشخَّص');
  end if;

  -- ─── 113 · إكمال من قائمة ────────────────────────────────
  select count(*) into n from questions x
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and (gap_count(x.body) < 2 or gap_count(x.body) > 8 or not gap_seq_ok(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فراغاتُه أقلُّ من اثنين أو أكثرُ من ثمانية '
        || 'أو أرقامُها غير متتالية من ١');
  end if;

  -- الفراغُ هو البند ⇒ خيارٌ مخزَّنٌ هنا لا يُقرأ أبداً
  select count(distinct x.id) into n from questions x
    join options o on o.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze';
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه خياراتٌ مخزَّنة — الفراغُ هو البند فلا خيارات له');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not bank_keys_ok(k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» قائمةُ كلماته مكسورة — [ {"k":…,"t":…} ] بمفاتيحَ فريدة');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not cloze_keys_ok(k.accept, gap_count(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه فراغٌ بلا مفتاح — لكلّ فراغٍ مفتاحُه برقمه');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not match_key_ok(k.accept, k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه صوابٌ ليس في القائمة — وفراغُه لا يُصيبه أحد');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال «إكمال من قائمة» بلا شرح للخطأ');
  end if;

  -- ⚠️ تنبيهٌ لا منع — نظيرُ تنبيه المزاوجة بحرفه: بلا كلمةٍ زائدة
  --    يُحلّ الفراغُ الأخير بالاستبعاد، فيُصيبه من يجهله ولا يُسجَّل له كود.
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and k.bank is not null and match_pairs(k.accept) > 0
     and not exists (
           select 1 from jsonb_array_elements(k.bank) b
            where not exists (
                  select 1 from jsonb_each_text(k.accept -> 'pairs') p
                   where p.value = b ->> 'k'));
  if n > 0 then
    v_warns := v_warns || to_jsonb(
      n || ' سؤال «إكمال من قائمة» بلا كلمةٍ زائدة — الفراغ الأخير يُحلّ بالاستبعاد فلا يُشخَّص');
  end if;

  /* ⛔ قفلُ المرحلة — ويُذكر آخراً ليُقرأ آخرَ ما يُقرأ.
     get_quiz لا ترسل النمط، و submit_attempt لا تصحّحه. فالنشرُ محجوب
     ما دام في الاختبار سؤالٌ منه — ولا يُرفع القفل إلا ببناء مسارِه. */
  if v_cloze > 0 then
    v_issues := v_issues || to_jsonb(
      v_cloze || ' سؤال «إكمال من قائمة» — النمط يُؤلَّف اليوم ولا يبلغ الطالب بعد: '
              || 'لا يُرسَل في الاختبار ولا يُصحَّح. والنشر محجوب حتى يُبنى مسارُه.');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='essay'
     and coalesce(trim(k.model_answer),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً مقالياً بلا إجابة نموذجية'); end if;

  return jsonb_build_object(
    'ok', jsonb_array_length(v_issues) = 0,
    'mcq', v_mcq, 'msq', v_msq, 'gap', v_gap, 'essay', v_essay,
    'match', v_match, 'cloze', v_cloze, 'marks', v_marks,
    'issues', v_issues, 'warns', v_warns);
end $function$;

grant execute on function public.quiz_readiness(bigint)
  to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('113', 'نمط «إكمال من قائمة» (cloze) — التأليف وحده، والنشر محجوب', now())
on conflict (n) do update set applied_at = now();
