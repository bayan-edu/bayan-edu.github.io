-- ══════════════════════════════════════════════════════════
-- 249 · حذفُ كتابٍ واحد من مكتبة بيان نهائياً — نصُّه حطامُ مسحٍ ضوئيّ لا يُقرأ (٢٧ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **الكتاب:** 2093 «Classic Literature: The Jungle Book» (M3 · R8 بعد `240` · مستورد · غير منشور).
--      نصُّه ليس نصّاً: شظايا معجمٍ ورموزُ تمارين من الصفحة الممسوحة («TF.» · «□ hillz»)، فلا تُكتب عليه أسئلةُ فهم.
--      ظهر ذلك عند تحويل أسئلة المستوى الثامن (`248`).
--   ② **حكمُ المالك (٢٧ نوفمبر):** «نعم احذفه مباشرة» — على قاعدته المسجَّلة في `content-policy.md` §٨:
--      كتابٌ يحتاج إعادةَ كتابةٍ يُحذف ولا يُعدَّل.
--   ③ **ما يُحذف:** الدرسُ وبنودُه واختبارُه وأسئلتُه وخياراتُها ومفاتيحُها ومقطعُه وروابطُه بالبطاقات،
--      ومعها كلُّ بطاقةٍ لا كتابَ لها غيره ولم يراجعها طالب ولا يشير إليها سؤال (طلبُ المالك في `233`).
--   ④ **حرّاسٌ قبل الحذف** كحرّاس `228`–`239`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑤ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[2093];
  v_left  int;
  v_quiz  bigint[];
  v_cards bigint[];
  v_bad   text;
  v_q int; v_l int; v_c int := 0;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذف الكتاب من قبل'; return;
  end if;
  if not exists (select 1 from lessons where id = 2093 and title = 'Classic Literature: The Jungle Book') then
    raise exception 'الدرس 2093 ليس «Classic Literature: The Jungle Book» — لا يُحذف شيء';
  end if;

  select array_agg(distinct i.quiz_id) into v_quiz
    from items i where i.lesson_id = any(v_ids) and i.quiz_id is not null;

  -- البطاقاتُ التي لا كتابَ لها غيره، ولم يراجعها طالب، ولا يشير إليها سؤال
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
    union all select 'سؤالٌ خارجه يخلف سؤالاً منه' from questions
     where supersedes_id in (select id from questions where quiz_id = any(v_quiz)) and not quiz_id = any(v_quiz) having count(*) > 0
  ) g;
  if v_bad is not null then
    raise exception 'لا يُحذف شيء: %', v_bad;
  end if;

  -- الاختبارُ أولاً: يتسلسل إلى الأسئلة والخيارات والمفاتيح والمقطع وبندِ الاختبار
  delete from quizzes where id = any(v_quiz);
  get diagnostics v_q = row_count;
  -- ثمّ الدرس: يتسلسل إلى النصّ وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 1 or v_l <> 1 then
    raise exception 'حُذف % اختباراً و% درساً لا ١ و١ — لا يُحذف شيء', v_q, v_l;
  end if;
  -- ثمّ البطاقاتُ التي صارت بلا كتاب
  if v_cards is not null then
    delete from cards where id = any(v_cards);
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.removed', v_l || ' books · ' || v_c || ' cards', true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('249', 'حذفُ كتابٍ واحد من مكتبة بيان نهائياً — نصُّه حطامُ مسحٍ ضوئيّ لا يُقرأ', now())
on conflict (n) do update set applied_at = now();
