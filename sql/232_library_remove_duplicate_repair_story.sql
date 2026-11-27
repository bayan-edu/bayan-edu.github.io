-- ══════════════════════════════════════════════════════════
-- 232 · حذفُ كتابٍ واحدٍ من مكتبة بيان نهائياً — «Don't throw away, repair!» نسخةٌ ثانيةٌ ركيكة من «A Stitch in Time» (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر)** في قراءة الاختلاط (C3 · §٥٫٣ · المجموعة G5b): «نعم، اعتمدها» —
--      القصصُ المفردة يُغيَّر فيها جنسُ الشخصيّة ولا تُحذف، **والنسخةُ المكرّرة تُحذف**.
--   ② **الكتاب:** 2495 «Don't throw away, repair!» (M3 · R16 · غير منشور) — هو قصّةُ 2444 «A Stitch in Time» نفسُها
--      في ترجمةٍ ركيكة، وفيه فقراتٌ مكرّرةٌ مرّتين. **ويبقى 2444**، وتُعدَّل فيه شخصيّةُ شريشا.
--   ③ **ما يُحذف** (قيس قبل الكتابة): درسٌ · بندان (نصٌّ واختبار) · اختبارٌ · ٦ أسئلة وخياراتها ومفاتيحها ومقطعها · ٦ روابط بالبطاقات.
--      **ولا أثرَ على طالب:** الحرّاسُ أدناه يمنعون الحذف إن وُجدت إجابةٌ أو محاولة.
--   ④ **وما لا يُحذف:** الأهداف · **ثلاثُ بطاقاتٍ** لا تُربط بغير هذا الكتاب — تبقى بلا كتاب · صورةُ الغلاف في R2.
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228`–`231`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2495];
  v_left  int;
  v_quiz  bigint[];
  v_bad   text;
  v_q int; v_l int;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذف الكتاب من قبل'; return;
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

  -- الاختبارُ أولاً: يتسلسل إلى الأسئلة والخيارات والمفاتيح والمقطع وبند الاختبار
  delete from quizzes where id = any(v_quiz);
  get diagnostics v_q = row_count;
  -- ثمّ الدرس: يتسلسل إلى النصّ وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 1 or v_l <> 1 then
    raise exception 'حُذف % اختباراً و% درساً لا ١ و١ — لا يُحذف شيء', v_q, v_l;
  end if;
  perform set_config('c3.removed', v_l::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('232', 'حذفُ كتابٍ واحدٍ من مكتبة بيان نهائياً — «Don''t throw away, repair!» نسخةٌ ثانيةٌ ركيكة من «A Stitch in Time»', now())
on conflict (n) do update set applied_at = now();
