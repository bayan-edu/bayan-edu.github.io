-- ══════════════════════════════════════════════════════════
-- 229 · حذفُ ثلاثة كتبٍ من مكتبة بيان نهائياً — كواكبُ يشرح النصُّ أنّ أسماءها لآلهةٍ قديمة ويصف تلك الآلهة (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر):** في مراجعة الكتب على السياسة القيميّة (C3 · §١ · المجموعة G4 «أسماءٌ من آلهةٍ قديمة»)
--      اعتُمد أوّلاً حذفُ جملة أصل الاسم، ثمّ عدّله المالك: «delete the first 3, modify the next 2, keep B».
--      والحذفُ النهائيّ هو ما اختاره في الحكم السابق (`228`) بعد أن عُرض عليه الأرشيف.
--   ② **الكتبُ الثلاثة** (كلّها M4 · رفّ العلوم · غير منشورة):
--      976 Mercury: Basic Facts («the quickest of the ancient gods») · 1563 Venus: In Depth («goddess of love and beauty» · Aphrodite · Diana) ·
--      1280 Mission: Pluto («the Roman god of the underworld»).
--      **ويبقى:** THE EARTH و African Wormwood — تُحذف منهما جملةُ أصل الاسم (تعديلٌ في النصّ لاحقاً) · وأعلامُ Apollo و Mount Thor تجتاز.
--   ③ **ما يُحذف** (قيس قبل الكتابة): ٣ دروس · ٦ بنود (نصٌّ واختبارٌ لكلٍّ) · ٣ اختبارات · ١٨ سؤالاً · ١٢٩ خياراً · ١٨ مفتاحاً · ٣ مقاطع ·
--      ١٨ ربطاً بالأهداف · ٢٢ ربطاً بالبطاقات. **ولا أثرَ على طالب:** صفرُ إجابة ومحاولة وتقدّم ونجمة.
--   ④ **وما لا يُحذف:** الأهدافُ (كلٌّ منها مربوطٌ بكتابٍ آخر · قيس) · **سبعُ بطاقاتٍ** لا تُربط بغير هذه الكتب — تبقى بلا كتاب ·
--      **صورُ الأغلفة الثلاث في R2** (`r2:img/l976-…` · `l1563-…` · `l1280-…`).
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[976, 1563, 1280];
  v_left  int;
  v_quiz  bigint[];
  v_bad   text;
  v_q int; v_l int;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب الثلاثة من قبل'; return;
  end if;
  if v_left <> 3 then
    raise exception 'بقي % كتاباً من ثلاثة — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
  end if;

  select array_agg(distinct i.quiz_id) into v_quiz
    from items i where i.lesson_id = any(v_ids) and i.quiz_id is not null;

  select string_agg(x, ' · ') into v_bad from (
    select 'ليس في المكتبة أو منشور: ' || string_agg(id::text, ',') x from lessons
     where id = any(v_ids) and (subject_id <> 7 or published) having count(*) > 0
    union all select 'اختبارٌ يشاركه كتابٌ آخر' from items i
     where i.quiz_id = any(v_quiz) and not i.lesson_id = any(v_ids) having count(*) > 0
    union all select 'إجاباتٌ مسجَّلة' from answers a join questions q on q.id = a.question_id
     where q.quiz_id = any(v_quiz) having count(*) > 0
    union all select 'محاولاتٌ مسجَّلة' from attempts a
     where a.quiz_id = any(v_quiz) or a.item_id in (select id from items where lesson_id = any(v_ids)) having count(*) > 0
    union all select 'درسٌ يتطلّبه' from lessons where requires_id = any(v_ids) having count(*) > 0
    union all select 'اختبارٌ يتطلّبه' from quizzes where requires_id = any(v_quiz) having count(*) > 0
    union all select 'مسارُ تسكين أو خانةُ نموذج' from placement_routes where to_quiz = any(v_quiz) having count(*) > 0
    union all select 'خانةُ نموذج' from form_slots where bank_id = any(v_quiz) having count(*) > 0
    union all select 'سؤالٌ خارجها يخلف سؤالاً منها' from questions
     where supersedes_id in (select id from questions where quiz_id = any(v_quiz)) and not quiz_id = any(v_quiz) having count(*) > 0
  ) g;
  if v_bad is not null then
    raise exception 'لا يُحذف شيء: %', v_bad;
  end if;

  -- الاختباراتُ أولاً: تتسلسل إلى الأسئلة والخيارات والمفاتيح والمقاطع وبند الاختبار
  delete from quizzes where id = any(v_quiz);
  get diagnostics v_q = row_count;
  -- ثمّ الدروس: تتسلسل إلى النصّ وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 3 or v_l <> 3 then
    raise exception 'حُذف % اختباراً و% درساً لا ٣ و٣ — لا يُحذف شيء', v_q, v_l;
  end if;
  perform set_config('c3.removed', v_l::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('229', 'حذفُ ثلاثة كتبٍ من مكتبة بيان نهائياً — كواكبُ يشرح النصُّ أنّ أسماءها لآلهةٍ قديمة ويصف تلك الآلهة', now())
on conflict (n) do update set applied_at = now();
