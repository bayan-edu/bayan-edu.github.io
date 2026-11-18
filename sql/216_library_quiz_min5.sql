-- ══════════════════════════════════════════════════════════
-- 216 · اختبارُ الكتاب في المكتبة يُنشر بخمسة أسئلة
--       (المرحلة ٧ من `spec-reading-library.md` · ١٨ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (١٨ نوفمبر):** «هل يمكنك عمل استثناء لاختبارات الكتب ان يتم نشرها اذا كانت اختباراتها ب 5 أسئلة فقط».
--      قِيس: في المادّة ٧ (`مكتبة بيان`) ١٨٣ اختبارَ كتاب، **٧٢ منها بخمسة أسئلة** يردّها حدُّ الستّة في `quiz_readiness` — ولا يُنشر منها شيء.
--   ② **والحدُّ في المكتبة خمسة، وفي غيرها ستّةٌ كما كان.** والمكتبةُ تُعرف بـ`subjects.family = 'reading'` لا برقم المادّة (قِيس: المادّةُ ٧ وحدها اليوم) —
--      فمكتبةٌ ثانيةٌ تأخذ الحكمَ بلا ملفّ. والاستثناءُ لاختبار الدرس (`role = 'quiz'`) وحده: البنكُ لا يُنشر، والنموذجُ حكمُه في سطوره.
--   ③ ⚠️ **وعتبةُ ٦٥٪ على خمسة بنودٍ أربعةٌ منها** (٣ من ٥ = ٦٠٪ لا تنجح) — والرسالةُ القائمة تقول علّةَ الحدّ («بأقلّ من ذلك تفقد عتبة ٦٥٪ معناها»).
--      فالمالكُ اختار الخمسةَ وهذا ثمنُها، ولم يُغيَّر `pass_mark`.
--   ④ **والحدُّ يُرجَع في الجاهزيّة (`min`)** فيقرؤه المحرّر بدل الستّة المكتوبة فيه (`kindChips` · b248).
--   **وبابا النشر كلاهما يقرآن `quiz_readiness`** (`publish_quiz` · `quiz_publish_guard`) ⇒ رقعةٌ واحدة تكفي.
--   📌 **والرقمُ ٢١٦ لا ٢١٥:** `215` أخذته جلسةٌ أخرى اليومَ نفسَه («تفعيل أداة تحديد المستوى لمكتبة بيان») وطُبّق — قِيس في `sql_log`.
--
-- **قُرئت الحيّةُ قبله (١٨ نوفمبر):** `quiz_readiness` (`61727e76` — بعد `214`) · `publish_quiz` (`dad26e6c`) · `quiz_publish_guard` (`b747bf0a`).
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة: `quiz_readiness` ═══════════
do $$
declare v text; n int; i int;
        p text[] := array[
          'v_tierbank boolean := false;',
          'select role, coalesce(station_kind = ''adaptive'', false) into v_role, v_tierbank from quizzes where id = p_quiz;',
          '+ v_judge + v_ord < 6 then',
          '''يلزم ٦ أسئلة موضوعية على الأقل — الموجود '' ||',
          '''issues'', v_issues, ''warns'', v_warns);'];
        r text[] := array[
          'v_tierbank boolean := false; v_min int := 6;   -- 216 · واختبارُ الكتاب في المكتبة بخمسة',
          'select role, coalesce(station_kind = ''adaptive'', false) into v_role, v_tierbank from quizzes where id = p_quiz;' || chr(10)
            || '  if v_role = ''quiz'' and exists (select 1 from quizzes z join subjects s on s.id = z.subject_id' || chr(10)
            || '                                  where z.id = p_quiz and s.family = ''reading'') then' || chr(10)
            || '    v_min := 5;                                   -- 216 · قرارُ المالك: اختبارُ الكتاب يُنشر بخمسة أسئلة' || chr(10)
            || '  end if;',
          '+ v_judge + v_ord < v_min then',
          '''يلزم '' || case when v_min = 5 then ''٥'' else ''٦'' end || '' أسئلة موضوعية على الأقل — الموجود '' ||',
          '''issues'', v_issues, ''warns'', v_warns, ''min'', v_min);'];
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('v_min' in v) > 0 then raise notice 'quiz_readiness تعرف حدَّ المكتبة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'quiz_readiness (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('216', 'اختبارُ الكتاب في المكتبة يُنشر بخمسة أسئلة', now())
on conflict (n) do update set applied_at = now();
