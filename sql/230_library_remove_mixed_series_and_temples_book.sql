-- ══════════════════════════════════════════════════════════
-- 230 · حذفُ عشرة كتبٍ من مكتبة بيان نهائياً — سلسلتا Lee's Mountain وHacked! (اختلاط)، وMonumental Maths (معابد) (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر)** في مراجعة الكتب على السياسة القيميّة (C3 · `content-policy.md` §١ و§٥٫٣):
--      «افضل حذف Lee's Mountain و hacked» — فعُدِّل حكمُ G5: **فريقُ Hacked! يُستبعد أيضاً** بعد أن كان يجتاز.
--      و«فيما يخص ما يشير إلى دور العبادة غيرها جميعها وإن لم يستقم التغيير في اي منها فاحذفها» (G6).
--      والحكمان مسجَّلان في جدول الأحكام (§٨).
--   ② **الكتبُ العشرة** (كلّها غير منشورة):
--      Lee's Mountain #1–#5 (M3): 2649 · 2660 · 2592 · 2594 · 2646.
--      Hacked! #2–#5 (M3): 2590 · 2593 · 2557 · 2684 (لا يوجد #1 في المكتبة).
--      1494 Monumental Maths (M4): **التعديلُ لا يستقيم** — المعابدُ مثالُ النصّ في الفركتلات كلِّه (معابد الهويسالا)
--      وثلاثةٌ من خمسة أمثلة التناظر (Keshava · Angkor Wat «أكبر مجمّعٍ دينيّ» · Brihadeshwara)، مع وصفٍ بالإعجاب؛
--      ونزعُها يُسقط نحو ثلث النصّ ومفهومَ الفركتل معه.
--      **ولا يُحذف هنا:** The Riverkeepers (#3 #4 #5) — مستبعدةٌ بحكم G5 ولم يُسمِّها المالك في هذا الحكم؛
--      وكتبُ G6 السبعة الباقية — تُعدَّل لا تُحذف.
--   ③ **ما يُحذف** (قيس قبل الكتابة): ١٠ دروس · ٢٠ بنداً (نصٌّ واختبارٌ لكلٍّ) · ١٠ اختبارات · ٦٠ سؤالاً وخياراتها ومفاتيحها ومقاطعها ·
--      ٣٤ ربطاً بالبطاقات. **ولا أثرَ على طالب:** الحرّاسُ أدناه يمنعون الحذف إن وُجدت إجابةٌ أو محاولة.
--   ④ **وما لا يُحذف:** الأهداف · **سبعَ عشرةَ بطاقةً** لا تُربط بغير هذه الكتب — تبقى بلا كتاب · صورُ الأغلفة العشر في R2.
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228` و`229`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2649, 2660, 2592, 2594, 2646, 2590, 2593, 2557, 2684, 1494];
  v_left  int;
  v_quiz  bigint[];
  v_bad   text;
  v_q int; v_l int;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب العشرة من قبل'; return;
  end if;
  if v_left <> 10 then
    raise exception 'بقي % كتاباً من عشرة — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
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
    union all select 'مسارُ تسكين' from placement_routes where to_quiz = any(v_quiz) having count(*) > 0
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
  if v_q <> 10 or v_l <> 10 then
    raise exception 'حُذف % اختباراً و% درساً لا ١٠ و١٠ — لا يُحذف شيء', v_q, v_l;
  end if;
  perform set_config('c3.removed', v_l::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('230', 'حذفُ عشرة كتبٍ من مكتبة بيان نهائياً — سلسلتا Lee''s Mountain وHacked! (اختلاط)، وMonumental Maths (معابد)', now())
on conflict (n) do update set applied_at = now();
