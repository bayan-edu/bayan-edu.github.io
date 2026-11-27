-- ══════════════════════════════════════════════════════════
-- 238 · حذفُ كتابين من مكتبة بيان نهائياً — لا قيمةَ خُلقيّةً فيهما ولا معلومةَ علميّة (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **حكمُ المالك (٢٦ نوفمبر)** في الكتب التي مخالفتُها في صلب القصّة:
--      «إذا تحتوي على قيمة اخلاقية او معلومة علمية نقرأها، إذا كانت بلا قيمة لا داعي لقراءتها واحذفها مباشرة».
--      فالكتابُ الذي يحمل قيمةً يُعدَّل، والذي لا يحمل شيئاً يُحذف بلا عرضٍ على المالك. والحكمُ مسجَّلٌ في `content-policy.md` §٨.
--   ② **الكتابان** (M3 · R12 · غير منشورين):
--      1991 The Blue Beautiful Butterfly — طفلٌ يشرب قارورةً مجهولة كُتب عليها «Drink This» فيصغر ويركب فراشة؛ الجرعةُ هي القصّة،
--           ولا عاقبةَ لشرب المجهول، وما فيه من علمٍ فقرةٌ ملحقةٌ في آخره.
--      2186 Reading: Puss in Boots — القطُّ يكذب على الملك ويهدّد الفلّاحين ويحتال، فيفوز صاحبُه بالثروة والأميرة؛
--           الكذبُ فيه هو الذي ينجح، ومعه غولٌ يتحوّل وحبٌّ من أوّل نظرة.
--      **والأربعةُ الأخرى من مجموعتهما فيها قيمةٌ فتُعدَّل:** Journey to Earth · Malai's Mission · Practice Makes Perfect · The Apetahi Flower.
--   ③ **ما يُحذف** (قيس قبل الكتابة): درسان · ٤ بنود · اختباران · ١٢ سؤالاً وخياراتها ومفاتيحها ومقطعاها · ٨ روابط بالبطاقات ·
--      **وبطاقةٌ واحدة** لا كتابَ لها غيرهما (طلبُ المالك في `233`: البطاقةُ بلا كتاب تُحذف). ولا إجابةَ لطالب.
--   ④ **وما لا يُحذف:** الأهداف · صورُ الغلافين والمشاهد في R2.
--   ⑤ **حرّاسٌ قبل الحذف** كحرّاس `228`–`232`: أيُّ حارسٍ يسقط ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids   constant bigint[] := array[1991, 2186];
  v_left  int;
  v_quiz  bigint[];
  v_cards bigint[];
  v_bad   text;
  v_q int; v_l int; v_c int := 0;
begin
  select count(*) into v_left from lessons where id = any(v_ids);
  if v_left = 0 then
    raise notice 'حُذف الكتابان من قبل'; return;
  end if;
  if v_left <> 2 then
    raise exception 'بقي % كتاباً من اثنين — حذفٌ جزئيٌّ سابق؟ لا يُحذف شيء', v_left;
  end if;

  select array_agg(distinct i.quiz_id) into v_quiz
    from items i where i.lesson_id = any(v_ids) and i.quiz_id is not null;

  -- البطاقاتُ التي لا كتابَ لها غير هذين، ولم يراجعها طالب، ولا يشير إليها سؤال
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

  -- الاختباران أولاً: يتسلسلان إلى الأسئلة والخيارات والمفاتيح والمقطعين وبندَي الاختبار
  delete from quizzes where id = any(v_quiz);
  get diagnostics v_q = row_count;
  -- ثمّ الدرسان: يتسلسلان إلى النصّين وروابط الأهداف والبطاقات
  delete from lessons where id = any(v_ids);
  get diagnostics v_l = row_count;
  if v_q <> 2 or v_l <> 2 then
    raise exception 'حُذف % اختباراً و% درساً لا ٢ و٢ — لا يُحذف شيء', v_q, v_l;
  end if;
  -- ثمّ البطاقاتُ التي صارت بلا كتاب
  if v_cards is not null then
    delete from cards where id = any(v_cards);
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.removed', v_l || ' books · ' || v_c || ' cards', true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('238', 'حذفُ كتابين من مكتبة بيان نهائياً — لا قيمةَ خُلقيّةً فيهما ولا معلومةَ علميّة', now())
on conflict (n) do update set applied_at = now();
