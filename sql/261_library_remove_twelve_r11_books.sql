-- ══════════════════════════════════════════════════════════
-- 261 · حذفُ اثني عشر كتاباً من مكتبة بيان نهائياً — ظهرت عللُها عند تحويل أسئلة المستوى الحادي عشر (٢٧ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٧ نوفمبر):** «احذف الاثنى عشر» — بعد أن عُرضت عليه بعللها: عشرةٌ تركها الوكلاءُ عند تحويل
--      الأسئلة (`257`–`260`)، واثنان بقيا وحُوِّلت أسئلتُهما ثمّ عُرضا عليه بما فيهما. والكلُّ مستورد، في R11، غير منشور:
--      2325 «DISCOVERING GRAVITY» · 2322 «An Exciting Trip to Space» · 1259 «Journey To A New Planet!» ·
--      1637 «Where Am I?» · 1639 «Plants» — كتابةُ متعلّمين لم تُصحَّح (جملٌ مبتورة، أقوالٌ موضوعة على لسان نيوتن،
--           سطرٌ باسم كاتبٍ طفل داخل النصّ).
--      1605 «Every Drop Counts» — أرقامٌ خاطئة («1.3 billion people in India don't have clean water») وبقايا تمارين.
--      2492 «CHEW CHOMP YUM!» — دعاوى صحّيةٌ غير مسنودة («يقاومان السرطان») وبقايا كتابٍ مصوَّر.
--      1702 «The Moons in Our Solar System» — رقمٌ قديم («Jupiter has 79 moons»).
--      2669 «Happy Maths : Time and Money» — جداولُ مبعثرة وجملٌ مقطوعة ومفتاحُ إجابات الناشر داخل النصّ.
--      1390 «The Space Invaders» — روايةُ لصوص: قتلٌ على الصفحة وتخطيطٌ مفصَّل له ولصٌّ ينجو بالمسروق، ونصُّها مسحٌ
--           فيه رؤوسُ صفحاتٍ وفجوة. مثلُ «The Black Cat» المحذوف في `256`.
--      2459 «The Caterpillar Mom!» — نصٌّ لم يُحرَّر (اسمُ الصديقة يتبدّل، هفواتُ طباعة).
--      2488 «There's a Hole in my Galaxy» — أرقامٌ غير دقيقة في قصّةٍ تصرّح بأنها خيال.
--      وقاعدةُ المالك: كلُّ نصٍّ يحمل معلومةً صحيحة.
--   ② وقاعدتُه المسجَّلة في `content-policy.md` §٨: كتابٌ يحتاج إعادةَ كتابةٍ يُحذف ولا يُعدَّل.
--   ③ **ما يُحذف:** الدروسُ وبنودُها واختباراتُها وأسئلتُها وخياراتُها ومفاتيحُها ومقاطعُها وروابطُها بالبطاقات،
--      ومعها كلُّ بطاقةٍ لا كتابَ لها غيرها ولم يراجعها طالب ولا يشير إليها سؤال (طلبُ المالك في `233`).
--   ④ **حرّاسٌ قبل الحذف** كحرّاس `228`–`256`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑤ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2325, 2322, 1259, 1637, 1639, 1605, 2492, 1702, 2669, 1390, 2459, 2488];
  v_left  int;
  v_quiz  bigint[];
  v_cards bigint[];
  v_bad   text;
  v_q int; v_l int; v_c int := 0;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذفت الكتب الاثنا عشر من قبل'; return;
  end if;
  if v_left <> 12 then
    raise exception 'بقي % كتاباً من اثني عشر — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
  end if;
  if (select count(*) from lessons where (id, title) in (
        (2325, 'DISCOVERING GRAVITY'), (2322, 'An Exciting Trip to Space'), (1259, 'Journey To A New Planet!'),
        (1637, 'Where Am I?'), (1639, 'Plants'), (1605, 'Every Drop Counts'),
        (2492, 'CHEW CHOMP YUM! All that is good for your tum!'), (1702, 'The Moons in Our Solar System'),
        (2669, 'Happy Maths : Time and Money'), (1390, 'The Space Invaders'),
        (2459, 'The Caterpillar Mom!'), (2488, 'There''s a Hole in my Galaxy'))) <> 12 then
    raise exception 'عنوانُ درسٍ من الاثني عشر ليس ما قيس — لا يُحذف شيء';
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
  if v_q <> 12 or v_l <> 12 then
    raise exception 'حُذف % اختباراً و% درساً لا ١٢ و١٢ — لا يُحذف شيء', v_q, v_l;
  end if;
  -- ثمّ البطاقاتُ التي صارت بلا كتاب
  if v_cards is not null then
    delete from cards where id = any(v_cards);
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.removed', v_l || ' books · ' || v_c || ' cards', true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('261', 'حذفُ اثني عشر كتاباً من مكتبة بيان نهائياً — ظهرت عللُها عند تحويل أسئلة المستوى الحادي عشر', now())
on conflict (n) do update set applied_at = now();
