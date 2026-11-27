-- ══════════════════════════════════════════════════════════
-- 239 · حذفُ ثمانيةَ عشرَ كتاباً من مكتبة بيان نهائياً — ما بقي ممّا تعديلُه مشهدٌ أو موضوع (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر)** بعد أن عُرضت عليه الأربعةُ التي فيها قيمةٌ لتُعدَّل، والأربعةَ عشرَ التي لم تُقرأ بعد:
--      «احذفها لا تعدلها و14 كتابا المتبقية ايضا احذفها». فلا يُعدَّل من هذا الصنف شيء بعد اليوم:
--      **ما يحتاج إعادةَ كتابةِ مشهدٍ أو موضوعٍ يُحذف** — والمكتبةُ فيها ٩١٢ كتاباً، فالحذفُ أرخصُ من التأليف.
--      والحكمُ مسجَّلٌ في `content-policy.md` §٨.
--   ② **الكتبُ الثمانيةَ عشر** (كلّها غير منشورة):
--      - **فيها قيمةٌ وكانت ستُعدَّل (٤):** 1252 Journey to Earth · 2469 Malai's Mission · 2564 Practice Makes Perfect · 708 The Apetahi Flower.
--      - **مشهدٌ يُستبدل (٦):** 1237 Anna's Extraordinary Experiments with Weather · 1329 The Robots Are Here! · 705 The Sounds of Baseball ·
--        1918 Who Was John Glenn? · 1260 The River of Time · 2648 Memories - Good and Bad.
--      - **ملخّصاتُ روايات (٨):** 2143 Black Beauty · 2102 The Great Stone Face · 1378 Sherlock Holmes Short Stories · 1391 The Sign of Four ·
--        1421 The Speckled Band and Other Stories · 1393 Treasure Island · 1396 Huckleberry Finn · 1422 The Last of the Mohicans.
--      **وما لا يدخل هنا:** ما طُبّق تعديلُه من هذا الصنف في `236` و`237` (عشرةُ كتب) — باقٍ بتعديله.
--   ③ **ما يُحذف** (قيس قبل الكتابة): ١٨ درساً · ٤٦ بنداً · ١٨ اختباراً · ١١٠ أسئلة وخياراتها ومفاتيحها ومقاطعها · ٧٦ ربطاً بالبطاقات ·
--      **والبطاقاتُ التي لا كتابَ لها غيرها** (ثلاثون: تُحذف سبعٌ وعشرون، وتبقى ثلاثٌ راجعها طالب). ولا إجابةَ لطالب.
--   ④ **وما لا يُحذف:** الأهداف · ثلاثُ بطاقاتٍ راجعها طالب — حذفُها يمحو سجلَّ مراجعته · صورُ الأغلفة والمشاهد في R2.
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228`–`238`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[1252, 2469, 2564, 708,
                                     1237, 1329, 705, 1918, 1260, 2648,
                                     2143, 2102, 1378, 1391, 1421, 1393, 1396, 1422];
  v_left  int;
  v_quiz  bigint[];
  v_cards bigint[];
  v_bad   text;
  v_q int; v_l int; v_c int := 0;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب الثمانيةَ عشر من قبل'; return;
  end if;
  if v_left <> 18 then
    raise exception 'بقي % كتاباً من ثمانيةَ عشر — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
  end if;

  select array_agg(distinct i.quiz_id) into v_quiz
    from items i where i.lesson_id = any(v_ids) and i.quiz_id is not null;

  -- البطاقاتُ التي لا كتابَ لها غير هذه، ولم يراجعها طالب، ولا يشير إليها سؤالٌ باقٍ
  select array_agg(distinct cl.card_id) into v_cards
    from card_lessons cl
   where cl.lesson_id = any(v_ids)
     and not exists (select 1 from card_lessons c2 where c2.card_id = cl.card_id and not c2.lesson_id = any(v_ids))
     and not exists (select 1 from card_reviews r where r.card_id = cl.card_id)
     and not exists (select 1 from card_review_log g where g.card_id = cl.card_id)
     and not exists (select 1 from questions q where q.card_id = cl.card_id and not q.quiz_id = any(v_quiz));

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

  -- الاختباراتُ أولاً: تتسلسل إلى الأسئلة والخيارات والمفاتيح والمقاطع وبنود الاختبار
  delete from quizzes where id = any(v_quiz);
  get diagnostics v_q = row_count;
  -- ثمّ الدروس: تتسلسل إلى النصوص وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 18 or v_l <> 18 then
    raise exception 'حُذف % اختباراً و% درساً لا ١٨ و١٨ — لا يُحذف شيء', v_q, v_l;
  end if;
  -- ثمّ البطاقاتُ التي صارت بلا كتاب
  if v_cards is not null then
    delete from cards where id = any(v_cards);
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.removed', v_l || ' books · ' || v_c || ' cards', true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('239', 'حذفُ ثمانيةَ عشرَ كتاباً من مكتبة بيان نهائياً — ما بقي ممّا تعديلُه مشهدٌ أو موضوع', now())
on conflict (n) do update set applied_at = now();
