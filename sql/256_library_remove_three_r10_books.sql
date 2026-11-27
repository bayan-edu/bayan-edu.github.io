-- ══════════════════════════════════════════════════════════
-- 256 · حذفُ ثلاثة كتبٍ من مكتبة بيان نهائياً — ظهرت عللُها عند تحويل أسئلة المستوى العاشر (٢٧ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٧ نوفمبر):** «احذف الثلاثة» — بعد أن عُرضت عليه بعللها. والثلاثةُ مستوردة، في R10، غير منشورة:
--      2285 «space» (M3) — تسعُ جملٍ من كتابة متعلّمٍ لم تُصحَّح («Astronets» · «cantrol» · «In moon planet»)، وفيها معلومةٌ خاطئة
--           («Space has no gravity») تناقض كتابَ الجاذبية في المستوى نفسه. وقاعدةُ المالك: كلُّ نصٍّ يحمل معلومةً صحيحة.
--      2139 «Reading: The Wind in the Willows» (M3) — القصّةُ محشوّةٌ بصفحات تمارين الكتاب المطبوع ورؤوس صفحاته،
--           وفي آخرها مفتاحُ إجابات الناشر، ومنه إجاباتُ أسئلة الفهم نفسها. مثلُ «The Jungle Book» المحذوف في `249`.
--      1392 «The Black Cat» (M4) — روايةُ تهريب آثار: نصُّها مسحٌ خام كثيرُ الأخطاء ومقطوعُ الهامش في آخره، وفيها قتيلٌ بسكّين،
--           ومطاردةٌ يموت فيها أربعة، وبطلٌ يقتل خصمَه ثمّ يُخفي ذلك ويكذب على الشرطة، والقصّةُ تعرضه نجاحاً.
--   ② وقاعدتُه المسجَّلة في `content-policy.md` §٨: كتابٌ يحتاج إعادةَ كتابةٍ يُحذف ولا يُعدَّل.
--   ③ **ما يُحذف:** الدروسُ الثلاثة وبنودُها واختباراتُها وأسئلتُها وخياراتُها ومفاتيحُها ومقاطعُها وروابطُها بالبطاقات،
--      ومعها كلُّ بطاقةٍ لا كتابَ لها غيرها ولم يراجعها طالب ولا يشير إليها سؤال (طلبُ المالك في `233`).
--   ④ **حرّاسٌ قبل الحذف** كحرّاس `228`–`249`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑤ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2285, 2139, 1392];
  v_left  int;
  v_quiz  bigint[];
  v_cards bigint[];
  v_bad   text;
  v_q int; v_l int; v_c int := 0;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب الثلاثة من قبل'; return;
  end if;
  if v_left <> 3 then
    raise exception 'بقي % كتاباً من ثلاثة — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
  end if;
  if (select count(*) from lessons where (id, title) in ((2285, 'space'), (2139, 'Reading: The Wind in the Willows'), (1392, 'The Black Cat'))) <> 3 then
    raise exception 'عنوانُ درسٍ من الثلاثة ليس ما قيس — لا يُحذف شيء';
  end if;

  select array_agg(distinct i.quiz_id) into v_quiz
    from items i where i.lesson_id = any(v_ids) and i.quiz_id is not null;

  -- البطاقاتُ التي لا كتابَ لها غير هذه، ولم يراجعها طالب، ولا يشير إليها سؤال
  select array_agg(distinct cl.card_id) into v_cards
    from card_lessons cl
   where cl.lesson_id = any(v_ids)
     and not exists (select 1 from card_lessons c2 where c2.card_id = cl.card_id and not c2.lesson_id = any(v_ids))
     and not exists (select 1 from card_reviews r where r.card_id = cl.card_id)
     and not exists (select 1 from card_review_log g where g.card_id = cl.card_id)
     and not exists (select 1 from questions q where q.card_id = cl.card_id);

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
  if v_q <> 3 or v_l <> 3 then
    raise exception 'حُذف % اختباراً و% درساً لا ٣ و٣ — لا يُحذف شيء', v_q, v_l;
  end if;
  -- ثمّ البطاقاتُ التي صارت بلا كتاب
  if v_cards is not null then
    delete from cards where id = any(v_cards);
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.removed', v_l || ' books · ' || v_c || ' cards', true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('256', 'حذفُ ثلاثة كتبٍ من مكتبة بيان نهائياً — ظهرت عللُها عند تحويل أسئلة المستوى العاشر', now())
on conflict (n) do update set applied_at = now();
