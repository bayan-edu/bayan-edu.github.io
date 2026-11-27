-- ══════════════════════════════════════════════════════════
-- 228 · حذفُ سبعة كتبٍ من مكتبة بيان نهائياً — تقول بنشوء نوعٍ من نوع، أو بتطوّر الحياة، أو بتطوّر الإنسان (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر):** في مراجعة الكتب على السياسة القيميّة (C3 · `content-policy.md` §١ · المجموعة G3):
--      «احذف جميع كتب ب، ج» — ثمّ «احذفها نهائياً» بعد أن عُرض عليه الأرشيفُ بديلاً يُرجَع عنه.
--      والحكمُ مسجَّلٌ في جدول الأحكام في السياسة (§٨)، ويُلزم ما بعده.
--   ② **الكتبُ السبعة** (كلّها M4 · رفّ العلوم · غير منشورة):
--      918 Saving Species: Magnificent Madagascar · 1300 Can Imitating Be Life-Saving? · 1334 The Wolf Within ·
--      1451 Coast Beast · 1471 Sea Monsters · 1519 High Jumpers · 1577 The Senses of Smell and Taste (تطوّر الإنسان).
--      **وما لم يُحكم فيه:** تكيّفُ صفةٍ في نوعٍ واحد (١٢ كتاباً، المجموعة (أ)) — باقٍ.
--   ③ **ما يُحذف** (قيس قبل الكتابة): ٧ دروس · ٧ نصوص · ٧ اختبارات · ٤٢ سؤالاً · ٢٧١ خياراً · ٤٢ مفتاحاً · ٧ مقاطع (`passages`) ·
--      ٤٢ ربطاً بالأهداف · ٤٤ ربطاً بالبطاقات. **ولا أثرَ على طالب:** صفرُ إجابة، وصفرُ محاولة، وصفرُ تقدّم، وصفرُ نجمة.
--   ④ **وما لا يُحذف:**
--      - **الأهدافُ** — كلٌّ منها مربوطٌ بكتابٍ آخر أيضاً (قيس).
--      - **البطاقاتُ الثلاثَ عشرةَ** التي لا تُربط بغير هذه الكتب — تبقى بلا كتاب. حذفُها قرارٌ آخر.
--      - **صورُ الأغلفة السبع في R2** (`r2:img/l918-…` …) — المخزنُ خارج القاعدة، وتُحذف من هناك إن شاء المالك.
--   ⑤ **حرّاسٌ قبل الحذف:** في المادّة ٧ · غيرُ منشور · ولا إجابةَ ولا محاولة · والاختبارُ لا يشاركه كتابٌ آخر ·
--      ولا يتطلّبه درسٌ ولا اختبار ولا مسارُ تسكين ولا خانةُ نموذج. **وأيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.**
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[918, 1300, 1334, 1451, 1471, 1519, 1577];
  v_left  int;
  v_quiz  bigint[];
  v_bad   text;
  v_q int; v_l int;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب السبعة من قبل'; return;
  end if;
  if v_left <> 7 then
    raise exception 'بقي % كتاباً من سبعة — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
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
  if v_q <> 7 or v_l <> 7 then
    raise exception 'حُذف % اختباراً و% درساً لا ٧ و٧ — لا يُحذف شيء', v_q, v_l;
  end if;
  perform set_config('c3.removed', v_l::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('228', 'حذفُ سبعة كتبٍ من مكتبة بيان نهائياً — تقول بنشوء نوعٍ من نوع، أو بتطوّر الحياة، أو بتطوّر الإنسان', now())
on conflict (n) do update set applied_at = now();
