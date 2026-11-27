-- ══════════════════════════════════════════════════════════
-- 231 · حذفُ ستّةٍ وعشرين كتاباً من مكتبة بيان نهائياً — ما استُبعد في مراجعة C3 ولم يُحذف بعد (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر)** في مراجعة الكتب على السياسة القيميّة (C3 · `content-policy.md`):
--      أكّد استبعادَ ما أوصى به المساعد في أوّل المراجعة («نعم احذفها»)، وما حكم هو باستبعاده في أثنائها.
--      والأحكامُ مسجَّلةٌ في جدول الأحكام (§٨)، وكلُّ كتابٍ بسببه في `c3_review_961.csv` (خارج المستودع).
--   ② **الكتبُ الستّة والعشرون** (كلّها غير منشورة):
--      - **حكمُ المالك في أثناء المراجعة (٦):** The Riverkeepers #3 #4 #5 (2504 · 2565 · 2560 — اختلاط §٥٫٣) ·
--        1349 Round the World in Eighty Days (رهانٌ تقوم عليه الحبكة، وخطبة) · 2083 City of Lights (لا حقيقةَ ولا قيمة) ·
--        2630 Albertina Sisulu (نضالٌ سياسيّ هو موضوعُ السيرة).
--      - **السياسة والاحتجاج §٣ (٦):** 1067 Grandfather Goes on Strike · 808 Iranians Turn to Telegram Amid Protests ·
--        1307 Greta Thunberg · 776 Bans Over Plastic Bags · 1295 Ben Carson … Politician · 1352 A History of Britain.
--      - **ملخّصاتُ رواياتٍ كلاسيكيّة** تقوم حبكتُها على الغرام أو الخمر أو أعيادٍ أخرى أو السحر (١٣):
--        1362 The House of Stairs · 1370 Lord Jim · 1374 Three Men in a Boat · 1377 A Picture to Remember ·
--        1385 The Merchant of Venice · 1386 O. Henry · 1397 Little Women · 1395 Tom Sawyer · 1424 The Mill on the Floss ·
--        1414 Ali Baba and the Forty Thieves (سحرٌ تقوم عليه الحبكة، ورقصٌ هو ذروتُها، وقتلٌ موصوف) ·
--        1427 Blackbeard's Treasure · 1372 و1388 The Adventures of Sherlock Holmes.
--      - **2055 Gulliver's Travels في M3:** الحربُ محورُ الحكاية، ولا حربَ قبل M4.
--      **وAli Baba** أُخرج أوّلاً لأنّ المالك سأل عنه، فلمّا عُرضت عليه علّتُه قال: «نعم، احذفها معها».
--   ③ **ما يُحذف** (قيس قبل الكتابة): ٢٦ درساً · ٧٣ بنداً (بعضُ الكتب نصوصُه فصول) · ٢٦ اختباراً · ١٥٨ سؤالاً وخياراتها ومفاتيحها ومقاطعها ·
--      ٨٦ ربطاً بالبطاقات. **ولا أثرَ على طالب:** الحرّاسُ أدناه يمنعون الحذف إن وُجدت إجابةٌ أو محاولة.
--   ④ **وما لا يُحذف:** الأهداف · **أربعٌ وعشرون بطاقةً** لا تُربط بغير هذه الكتب — تبقى بلا كتاب · صورُ الأغلفة والمشاهد في R2.
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228`–`230`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2504, 2560, 2565, 1349, 2083, 2630,
                                     1067, 808, 1307, 776, 1295, 1352,
                                     1362, 1370, 1374, 1377, 1385, 1386, 1397, 1395, 1424, 1414, 1427, 1372, 1388,
                                     2055];
  v_left  int;
  v_quiz  bigint[];
  v_bad   text;
  v_q int; v_l int;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب الستّة والعشرون من قبل'; return;
  end if;
  if v_left <> 26 then
    raise exception 'بقي % كتاباً من ستّةٍ وعشرين — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
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
  -- ثمّ الدروس: تتسلسل إلى النصوص وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 26 or v_l <> 26 then
    raise exception 'حُذف % اختباراً و% درساً لا ٢٦ و٢٦ — لا يُحذف شيء', v_q, v_l;
  end if;
  perform set_config('c3.removed', v_l::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('231', 'حذفُ ستّةٍ وعشرين كتاباً من مكتبة بيان نهائياً — ما استُبعد في مراجعة C3 ولم يُحذف بعد', now())
on conflict (n) do update set applied_at = now();
