-- ══════════════════════════════════════════════════════════════════════
--  ١٨٥ · البنكُ والنموذج — السؤالُ يُكتب في بنكٍ مرّة، ويختاره النموذجُ بسطر
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٦ أكتوبر): الخطوةُ ٣ من `spec-content-layers.md` (§٤ · §٨) على نسق الخطوتين قبلها.
--  وتُغلق الثقبَ ① من §١: `can_access` تفتح الاختبارَ المنشورَ الذي لا يتبع درساً لكلّ طالب.
--
--  🔑 **ولماذا خانةٌ لا نسخة:** النموذجُ يشير إلى خانة البنك لا إلى سؤالها ⇒ السؤالُ المتقاعد يولد وريثُه في
--     خانته فيبلغ النماذجَ كلَّها، وإحصاءاتُ السؤال (صعوبتُه وتشخيصُه) تتجمّع عليه عبر النماذج.
--
--  وعشرةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **البنكُ والنموذجُ اختباران بدور** (`quizzes.role`) لا جداولُ جديدة: البنكُ يُحرَّر بمحرّر الاختبار نفسِه بلا تغيير
--     (خانات · نصوص · تشخيص · أهداف · أقسام). **وقيودُه الثلاثة في القاعدة لا في الواجهة:** لا يُنشر (قيدُ فحص،
--     و`publish_quiz` تقولها برسالة) · لا يُربط بدرس (مشغّلٌ على `items`) · كلُّ سؤالٍ فيه في خانة (المشغّلُ يعطي
--     الوحيدَ `'v' || id` — عُرفُ `set_variant` بعينه، فتعيد `clear_variant` كلَّ سؤالٍ إلى خانةٍ باسمه، وتجمعه
--     `set_variant` إلى غيره — ⑦).
--  ② **النموذجُ بلا أسئلةٍ ولا نصوصٍ من عنده** (مشغّلان يردّانها)، سطورُه `form_slots` (بنك · خانة · موضع · قسم)،
--     ويُنشأ في درسٍ كأيّ اختبار ⇒ مسارُ الطالب لا يتغيّر. **ولا يسحب إلا من بنكٍ في مادّته:** لا من اختبار درس
--     (محاكاةٌ بأسئلةٍ رآها الطالب في دروسه تقيس ذاكرته لا مستواه — §٤)، ولا من مادّةٍ أخرى (§٩-٤).
--  ③ **`get_quiz` للنموذج فرعٌ لا تعديل:** صيغةٌ من كلّ سطرٍ بالبذرة نفسها، **والحارةُ لكلّ مجموعة نصوص** — المجموعةُ
--     «بنك : `group_key`»، والنصُّ بلا مجموعةٍ مجموعةُ نفسه — والقسمُ من السطر، والترتيبُ ترتيبُ السطور (والخلطُ
--     للاختبار العاديّ وحده). **والاختبارُ العاديّ يسير في مساره القديم حرفاً.**
--  ④ **`submit_attempt` تقبل سؤالاً من خانةٍ يسحبها النموذج** — أيَّ صيغةٍ منها، كما تقبل اليومَ أيَّ سؤالٍ من الاختبار.
--     والمراجعةُ بترتيب السطور. ونموذجٌ منشورٌ لا تُفرغه سطورُه (`save_form_slots` تردّ ما يُفقده الجاهزيّة).
--  ⑤ **الثقب ①:** المنشورُ الذي لا يتبع درساً يُقفل للطالب (صفرُ اختباراتٍ كذلك اليوم — قِيس)، **والبنكُ مقفلٌ صراحةً**
--     قبله. وسياساتُ الصفّ على `questions` و`options` و`passages` تقرأ `can_access` ⇐ أسئلةُ البنك لا يقرؤها طالبٌ
--     مباشرة، وتبلغه في النموذج وحده.
--  ⑥ **مجمعُ أسئلة الاختبار الحيّة في موضعٍ واحد** (`quiz_pool`): أسئلتُه، أو صيغُ خانات سطوره. وبه تقرأ
--     `quiz_readiness` (٣٣ موضعاً) و`objectives_for_quiz` و`list_quizzes` و`create_practice_session`.
--     🔴 **ويُقرأ مرّةً في مصفوفة لا في كلّ موضع:** لا فهرسَ على `questions(quiz_id)` إلا الجزئيّان، والمجمعُ في كلّ موضعٍ
--     مسحٌ للجدول كلّه — قِيس في التجربة الجافّة: `quiz_readiness` لأكبر اختبار ٤٫٣ ← ٢٩٫٩ ملّي ثانية.
--     **وللنموذج في الجاهزيّة سطورُه قبل أسئلته:** كلُّ سطرٍ يجد صيغةً حيّة، والموضوعيُّ منها ستّةٌ على الأقلّ (لا الصيغ:
--     النموذجُ يقدّم صيغةً من كلّ سطر).
--  ⑦ 🔑 **زياداتٌ على حرف §٤ تقتضيها السلامة — تُعرض:**
--     · `start_recording`: سؤالُ التحدّث في النموذج من بنكه، و`can_access` على البنك تردّه ⇐ `can_access_question`.
--     · `create_practice_session`: **البنكُ لا يُتدرَّب عليه** — جلسةُ التدرّب نشرٌ لأسئلته بمفاتيحها. والنموذجُ صيغةً
--       من كلّ سطر (`form_pick`).
--     · `quiz_detail`: إجاباتُ النموذج بترتيب سطوره · `delete_quiz`: البنكُ تحت نموذجٍ لا يُحذف من تحته.
--     · `set_variant` تردّ جمعَ سؤالين لكلٍّ منهما خانة — وفي البنك لكلّ وحيدٍ خانتُه ⇒ لم تكن لتجمع فيه شيئاً.
--       **فخانةُ الوحيد في البنك لا تُعدّ خانةً قائمة ما لم يسحبها نموذج**، والدمجُ يتبنّى خانةَ النموذج.
--     · **خانةٌ يسحبها نموذج لا تخلو من سؤالٍ حيّ** — لا بحذفٍ ولا بنقلٍ ولا بفكٍّ ولا بدمج. وحارسُها مؤجَّلٌ إلى
--       الإقرار كحارس النشر (`quizzes_publish_guard`): `retire_question` تُقاعد السؤالَ ثمّ تُولد وريثَه في خانته.
--  ⑧ **`stream_weights`** — الوزنُ الرسميّ لكلّ فرعٍ في كلّ شُعبة، يقرؤه عدّادُ النموذج. وحارسُه: الفرعُ والشُّعبةُ من
--     مادّةٍ واحدة، ومجموعُ الشُّعبة لا يتجاوز ١٠٠. **وصفوفُه في الخطوة ٤** — لا شُعبةَ اليوم.
--  ⑨ **وأبوابُ التأليف للواجهة بعد الإذن:** `create_bank` (للمادّة · لفريق الإشراف) · `create_form` · `save_form_slots`
--     (السطورُ دفعةً واحدة بترتيبها) · `set_passage_group` · `subject_banks` · `bank_slots` (الخاناتُ بفرعها من هدفها).
--     **و`save_quiz` لا تُمسّ** — فلا توقيعَ يسقط في هذا الملفّ.
--  ⑩ **ترقيعٌ في الحيّة لا نسخٌ لها:** خمسَ عشرةَ دالّةً بأربعةٍ وثلاثين مرسى، قِيس كلٌّ بعدده في الحيّة (٢٦ أكتوبر) —
--     عشرٌ منها في §٤ وخمسٌ من ⑦.
--
--  📐 وما ليس هنا عمداً:
--  · استيرادُ النموذج (قائمةُ الخانات — «لاحقاً» في §٤) · وتحويلُ اختبارٍ له محتوى إلى بنكٍ أو نموذج (يُردّ).
--  · الأوزانُ بلا شُعبة (STEP · §٩) · والتوجيهُ بين النماذج (SAT · §٩-٣).
--  · `objectives_tree` و`question_cards` لا تعرفان أسئلةَ البنك — شاشاتُ تأليفٍ لا طالب.
--  · تعديلُ سؤالٍ في البنك لا يعيد فحصَ النموذج المنشور — كالاختبار العاديّ اليوم بحرفه: الجاهزيّةُ تُفحص عند النشر
--    وعند تحديث صفّ الاختبار (`quizzes_publish_guard`)، لا عند تعديل سؤاله.
--  · `quizzes.version` ساكنٌ في المنصّة كلّها (١ في كلّ اختبار، ولا دالّةَ ترفعه) — فلا يرفعه النموذجُ وحده.
--  · شاشتا «بنوك المادّة» والتركيب (بعد الإذن) · وصفوفُ القدرات (الخطوة ٤).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ تمهيد ═══════════════════

-- المُرقِّع (رأس الملفّ ⑩): أثلاثُ [مرسى، بديل، عدد] على الحيّة — والعددُ ما قِيس أو لا شيء.
-- والجسدُ الذي أسطرُه `\r\n` يأخذ المرسى والبديلَ بها.
create or replace function pg_temp.patch185(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; k int; n int;
        crlf boolean := position(E'\r' in pg_get_functiondef(p_fn)) > 0;
begin
  if coalesce(array_length(p_patches, 1), 0) % 3 <> 0 then
    raise exception '185 · %: المراسي أثلاثٌ [مرسى، بديل، عدد]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 3 loop
    a := p_patches[i];
    b := p_patches[i + 1];
    k := p_patches[i + 2]::int;
    if crlf then a := replace(a, E'\n', E'\r\n'); b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> k then
      raise exception '185 · %: وُجد المرسى «%» % مرّةً لا % — لا يُرقَّع على الظنّ', p_fn, a, n, k;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;


-- ═══════════════════ منشأة ═══════════════════

-- ① الدورُ عمودٌ في الاختبار — والبنكُ لا يُنشر بقيدٍ لا بوعد (رأس الملفّ ①)
alter table public.quizzes add column if not exists role text not null default 'quiz';
alter table public.quizzes drop constraint if exists quizzes_role_ck;
alter table public.quizzes add constraint quizzes_role_ck check (role in ('quiz', 'bank', 'form'));
alter table public.quizzes drop constraint if exists quizzes_bank_unpublished;
alter table public.quizzes add constraint quizzes_bank_unpublished check (role <> 'bank' or not published);

-- ② النصوصُ البديلة لنصٍّ واحد في البنك (رأس الملفّ ③)
alter table public.passages add column if not exists group_key text;

-- ③ سطورُ النموذج — والمفتاح (نموذج · موضع)، والخانةُ مرّةً في النموذج
create table if not exists public.form_slots (
  form_id  bigint  not null references public.quizzes(id) on delete cascade,
  bank_id  bigint  not null references public.quizzes(id) on delete restrict,
  slot_key text    not null check (slot_key <> ''),
  position integer not null check (position > 0),
  section  text,
  primary key (form_id, position),
  unique (form_id, bank_id, slot_key)
);
create index if not exists form_slots_bank on public.form_slots (bank_id, slot_key);

-- ④ الوزنُ الرسميّ لكلّ فرعٍ في كلّ شُعبة (رأس الملفّ ⑧)
create table if not exists public.stream_weights (
  stream_id bigint       not null references public.streams(id) on delete cascade,
  strand_id bigint       not null references public.strands(id) on delete cascade,
  pct       numeric(5,2) not null check (pct > 0 and pct <= 100),
  primary key (stream_id, strand_id)
);

-- ⑤ مجمعُ أسئلة الاختبار الحيّة — في موضعٍ واحد (رأس الملفّ ⑥). SQL بلا security definer لتُطوى في مناديها،
--    والحيّةُ وحدها: فبها يمرّ الفرعُ الأوّل بفهرس `questions_live_position`
create or replace function public.quiz_pool(p_quiz bigint)
returns setof bigint language sql stable
as $function$
  select q.id from public.questions q where q.quiz_id = p_quiz and q.retired_at is null
  union all
  select q.id from public.form_slots fs
    join public.questions q on q.quiz_id = fs.bank_id and q.variant_key = fs.slot_key
                           and q.retired_at is null
   where fs.form_id = p_quiz
$function$;

-- وصيغةٌ ثابتة من كلّ سطر — لجلسة التدرّب (رأس الملفّ ⑦)
create or replace function public.form_pick(p_form bigint)
returns setof bigint language sql stable
as $function$
  select min(q.id)
    from public.form_slots fs
    join public.questions q on q.quiz_id = fs.bank_id and q.variant_key = fs.slot_key
                           and q.retired_at is null
   where fs.form_id = p_form
   group by fs.position
$function$;

-- ⑥ أيبلغ الطالبُ هذا السؤال؟ من اختباره، أو من نموذجٍ يسحب خانتَه (رأس الملفّ ⑦)
create or replace function public.can_access_question(p_question bigint, p_user uuid default auth.uid())
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select exists (select 1 from questions q
                  where q.id = p_question
                    and (can_access(q.quiz_id, p_user)
                         or exists (select 1 from form_slots fs
                                     where fs.bank_id = q.quiz_id and fs.slot_key = q.variant_key
                                       and can_access(fs.form_id, p_user))));
$function$;

-- ⑦ الحرّاس — كلُّ قيدٍ في القاعدة، لكلّ كاتب (رأس الملفّ ① ② ⑦)
create or replace function public.quizzes_role_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if new.role in ('bank', 'form') and new.tool is not null then
    raise exception 'البنك والنموذج لا يكونان محطّةَ أداة' using errcode = 'check_violation';
  end if;
  /* النوعُ يُختار عند الإنشاء: اختبارٌ له محتوى لا يصير بنكاً ولا نموذجاً، ولا يعود منهما */
  if tg_op = 'UPDATE' and new.role is distinct from old.role
     and (exists (select 1 from questions  where quiz_id = old.id)
       or exists (select 1 from passages   where quiz_id = old.id)
       or exists (select 1 from attempts   where quiz_id = old.id)
       or exists (select 1 from items      where quiz_id = old.id)
       or exists (select 1 from form_slots where form_id = old.id or bank_id = old.id)) then
    raise exception 'نوعُ الاختبار يُختار عند إنشائه — ولا يتغيّر بعد أن صار له محتوى'
      using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace function public.questions_role_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare v_role text := (select z.role from quizzes z where z.id = new.quiz_id);
begin
  if v_role = 'form' then
    raise exception 'النموذج لا أسئلةَ له — يسحبها من بنوك المادّة' using errcode = 'check_violation';
  end if;
  /* في البنك كلُّ سؤالٍ في خانة: الوحيدُ يأخذ خانتَه بعُرف `set_variant` ('v' || معرّفه) */
  if v_role = 'bank' and new.variant_key is null and new.retired_at is null then
    new.variant_key := 'v' || new.id;
  end if;
  return new;
end $function$;

create or replace function public.questions_slot_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  /* خانةٌ يسحبها نموذج لا تخلو من سؤالٍ حيّ — بحذفٍ أو نقلٍ أو فكٍّ أو دمج (رأس الملفّ ⑦).
     ويُفحص عند الإقرار لا عند الجملة: `retire_question` تُقاعد السؤالَ ثمّ تُولد وريثَه في خانته */
  if exists (select 1 from form_slots fs
              where fs.bank_id = old.quiz_id and fs.slot_key = old.variant_key)
     and not exists (select 1 from questions q
                      where q.quiz_id = old.quiz_id and q.variant_key = old.variant_key
                        and q.retired_at is null) then
    raise exception 'الخانة % يسحبها نموذج فلا تبقى بلا سؤال — تُزال من سطوره أولاً', old.variant_key
      using errcode = 'check_violation';
  end if;
  return null;
end $function$;

create or replace function public.passages_role_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if (select z.role from quizzes z where z.id = new.quiz_id) = 'form' then
    raise exception 'النموذج لا نصوصَ له — تأتيه مع أسئلتها من البنوك' using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace function public.items_bank_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if new.quiz_id is not null
     and (select z.role from quizzes z where z.id = new.quiz_id) = 'bank' then
    raise exception 'البنك لا يُربط بدرس — تُسحب أسئلته في نموذج' using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace function public.form_slots_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare f record; b record;
begin
  select z.role, z.subject_id into f from quizzes z where z.id = new.form_id;
  select z.role, z.subject_id into b from quizzes z where z.id = new.bank_id;
  if f.role is distinct from 'form' then
    raise exception 'السطورُ للنموذج وحده' using errcode = 'check_violation';
  end if;
  if b.role is distinct from 'bank' then
    raise exception 'النموذج يسحب من بنك — لا من اختبار درس' using errcode = 'check_violation';
  end if;
  if b.subject_id is distinct from f.subject_id then
    raise exception 'البنك من مادّةٍ أخرى' using errcode = 'check_violation';
  end if;
  if not exists (select 1 from questions q
                  where q.quiz_id = new.bank_id and q.variant_key = new.slot_key
                    and q.retired_at is null) then
    raise exception 'لا خانةَ حيّةً بهذا المفتاح في البنك: %', new.slot_key using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace function public.stream_weights_guard()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if (select s.subject_id from streams s where s.id = new.stream_id)
     is distinct from (select t.subject_id from strands t where t.id = new.strand_id) then
    raise exception 'الفرعُ والشُّعبةُ من مادّتين' using errcode = 'check_violation';
  end if;
  if (select coalesce(sum(w.pct), 0) from stream_weights w
       where w.stream_id = new.stream_id and w.strand_id <> new.strand_id
         and not (tg_op = 'UPDATE' and w.stream_id = old.stream_id and w.strand_id = old.strand_id))
     + new.pct > 100 then
    raise exception 'مجموعُ أوزان الشُّعبة يتجاوز ١٠٠' using errcode = 'check_violation';
  end if;
  return new;
end $function$;

create or replace trigger quizzes_role_guard
  before insert or update of role, tool on public.quizzes
  for each row execute function public.quizzes_role_guard();
create or replace trigger questions_role_guard
  before insert or update of quiz_id, variant_key on public.questions
  for each row execute function public.questions_role_guard();
create or replace trigger passages_role_guard
  before insert or update of quiz_id on public.passages
  for each row execute function public.passages_role_guard();
create or replace trigger items_bank_guard
  before insert or update of quiz_id on public.items
  for each row execute function public.items_bank_guard();
create or replace trigger form_slots_guard
  before insert or update on public.form_slots
  for each row execute function public.form_slots_guard();
create or replace trigger stream_weights_guard
  before insert or update on public.stream_weights
  for each row execute function public.stream_weights_guard();

-- وحارسُ الخانة مشغّلُ قيدٍ مؤجَّلٌ كحارس النشر — ومشغّلُ القيد لا يقبل `or replace`، فيُنشأ مرّةً
do $t$
begin
  if not exists (select 1 from pg_trigger
                  where tgrelid = 'public.questions'::regclass and tgname = 'questions_slot_guard') then
    create constraint trigger questions_slot_guard
      after update of quiz_id, variant_key, retired_at or delete on public.questions
      deferrable initially deferred
      for each row when (old.variant_key is not null)
      execute function public.questions_slot_guard();
  end if;
end $t$;

-- ⑧ أبوابُ التأليف (رأس الملفّ ⑨)
create or replace function public.create_bank(p_subject bigint, p_title text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* البنكُ للمادّة لا لمقرَّر: يخدم مقرَّراتها كلَّها (§٤) — ويولد غيرَ منشور ولا يُنشر أبداً */
declare v_id bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if not exists (select 1 from subjects s where s.id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;
  if not can_curate(p_subject) then
    return jsonb_build_object('ok', false, 'error', 'بنوك المادّة لفريق الإشراف');
  end if;
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان البنك مطلوب');
  end if;

  insert into quizzes (subject_id, code, title, published, role)
  values (p_subject, 'tmp_' || gen_random_uuid()::text, trim(p_title), false, 'bank')
  returning id into v_id;
  update quizzes set code = 'q' || v_id where id = v_id;
  return jsonb_build_object('ok', true, 'id', v_id, 'code', 'q' || v_id);
end $function$;

create or replace function public.create_form(p_subject bigint, p_title text, p_minutes integer default 25)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* النموذجُ اختبارٌ يُضاف إلى درسٍ كأيّ اختبار (`save_item`) — ويولد بلا سطورٍ وغيرَ منشور */
declare v_id bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if not exists (select 1 from subjects s where s.id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;
  if not can_curate(p_subject) then
    return jsonb_build_object('ok', false, 'error', 'نماذجُ المادّة لفريق الإشراف');
  end if;
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان النموذج مطلوب');
  end if;
  if p_minutes is not null and (p_minutes < 1 or p_minutes > 240) then
    return jsonb_build_object('ok', false, 'error', 'الزمن بين دقيقةٍ و٢٤٠ دقيقة');
  end if;

  insert into quizzes (subject_id, code, title, minutes, published, role)
  values (p_subject, 'tmp_' || gen_random_uuid()::text, trim(p_title), coalesce(p_minutes, 25), false, 'form')
  returning id into v_id;
  update quizzes set code = 'q' || v_id where id = v_id;
  return jsonb_build_object('ok', true, 'id', v_id, 'code', 'q' || v_id);
end $function$;

create or replace function public.save_form_slots(p_form bigint, p_rows jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* السطورُ دفعةً واحدة بترتيبها [{bank, slot, section}] — فالترتيبُ والأقسامُ نداءٌ واحد لا أبوابٌ متفرّقة.
   🔴 والنموذجُ المنشور لا يُترك غيرَ جاهز: سطورٌ تُفقده الجاهزيّةَ تُردّ كلُّها (استثناءٌ لا رسالة —
      فالحذفُ والإدراجُ قبله يُنقضان معه). */
declare v_role text; v_pub boolean; v_n int := 0; r jsonb; v_rd jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select z.role, z.published into v_role, v_pub from quizzes z where z.id = p_form;
  if v_role is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if v_role <> 'form' then
    return jsonb_build_object('ok', false, 'error', 'السطورُ للنموذج وحده');
  end if;
  if not can_edit_quiz(p_form) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;
  if jsonb_typeof(p_rows) is distinct from 'array' then
    return jsonb_build_object('ok', false, 'error', 'السطورُ قائمة: [{bank, slot, section}]');
  end if;
  if exists (select 1 from jsonb_array_elements(p_rows) e
              group by e->>'bank', e->>'slot' having count(*) > 1) then
    return jsonb_build_object('ok', false, 'error', 'خانةٌ مكرَّرة في النموذج');
  end if;

  delete from form_slots where form_id = p_form;
  for r in select e from jsonb_array_elements(p_rows) e loop
    v_n := v_n + 1;
    insert into form_slots (form_id, bank_id, slot_key, position, section)
    values (p_form, (r->>'bank')::bigint, r->>'slot', v_n, nullif(trim(r->>'section'), ''));
  end loop;

  if v_pub then
    v_rd := quiz_readiness(p_form);
    if not (v_rd->>'ok')::boolean then
      raise exception 'النموذج منشور — والسطورُ الجديدة تجعله غير جاهز: %',
        (select string_agg(value #>> '{}', ' · ') from jsonb_array_elements(v_rd->'issues'));
    end if;
  end if;
  return jsonb_build_object('ok', true, 'rows', v_n);
end $function$;

create or replace function public.set_passage_group(p_ids bigint[], p_group text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* النصوصُ البديلة لنصٍّ واحد في البنك: مجموعةٌ تُختار منها حارةٌ واحدة في كلّ محاولة (`get_quiz`).
   والمجموعةُ الفارغة نصٌّ بلا بديل. ونظيرةُ `set_variant` للأسئلة. */
declare v_quiz bigint; v_quizzes int; v_found int; v_key text := nullif(trim(coalesce(p_group, '')), '');
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا نصوص محدَّدة');
  end if;
  select count(distinct pg.quiz_id), min(pg.quiz_id), count(*) into v_quizzes, v_quiz, v_found
    from passages pg where pg.id = any(p_ids);
  if v_found <> array_length(p_ids, 1) then
    return jsonb_build_object('ok', false, 'error', 'بعض المعرّفات مكرَّر أو لا نصّ له');
  end if;
  if v_quizzes <> 1 then
    return jsonb_build_object('ok', false, 'error', 'النصوص ليست من بنكٍ واحد');
  end if;
  if (select z.role from quizzes z where z.id = v_quiz) is distinct from 'bank' then
    return jsonb_build_object('ok', false, 'error', 'مجموعاتُ النصوص في البنوك وحدها');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  update passages set group_key = v_key where id = any(p_ids);
  return jsonb_build_object('ok', true, 'group', v_key, 'count', v_found);
end $function$;

create or replace function public.subject_banks(p_subject bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
/* «بنوك المادّة» — قسمٌ في تأليف المادّة لا المقرَّر (§٤): البنكُ يخدم مقرَّراتها كلَّها */
begin
  if not can_author(p_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;
  return jsonb_build_object('ok', true, 'subject_id', p_subject, 'banks', coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', b.id, 'code', b.code, 'title', b.title,
             'slots', (select count(distinct x.variant_key) from questions x
                        where x.quiz_id = b.id and x.retired_at is null),
             'questions', (select count(*) from questions x
                            where x.quiz_id = b.id and x.retired_at is null),
             'passages', (select count(*) from passages pg where pg.quiz_id = b.id),
             'forms', (select count(distinct fs.form_id) from form_slots fs where fs.bank_id = b.id),
             'curate', can_edit_quiz(b.id))
           order by b.title, b.id)
      from quizzes b where b.subject_id = p_subject and b.role = 'bank'), '[]'::jsonb));
end $function$;

create or replace function public.bank_slots(p_bank bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
/* خاناتُ البنك لشاشة التركيب: تُصفّى بالفرع والهدف والصعوبة (§٤) — والفرعُ من هدف السؤال،
   وكلُّ خانةٍ بصيغتها الأولى عيّنةً، وبعددِ صيغها الحيّة وعددِ النماذج التي تسحبها */
declare v_subject bigint; v_role text;
begin
  select z.subject_id, z.role into v_subject, v_role from quizzes z where z.id = p_bank;
  if v_role is distinct from 'bank' then
    return jsonb_build_object('ok', false, 'error', 'ليس بنكاً');
  end if;
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;
  return jsonb_build_object('ok', true, 'bank', p_bank, 'slots', coalesce((
    select jsonb_agg(jsonb_build_object(
             'slot', s.variant_key, 'variants', s.n, 'position', s.pos,
             'kind', v.kind, 'difficulty', v.difficulty, 'section', v.section,
             'sample', left(v.body, 160),
             'objective_id', v.objective_id, 'objective', ob.code, 'strand_id', ob.strand_id,
             'passage_id', v.passage_id,
             'group', case when v.passage_id is not null
                           then coalesce(pg.group_key, 'p' || pg.id::text) end,
             'forms', (select count(*) from form_slots fs
                        where fs.bank_id = p_bank and fs.slot_key = s.variant_key))
           order by s.pos, s.variant_key)
      from (select x.variant_key, count(*) as n, min(x.position) as pos,
                   (array_agg(x.id order by x.position, x.id))[1] as first_id
              from questions x
             where x.quiz_id = p_bank and x.retired_at is null
             group by x.variant_key) s
      join questions v on v.id = s.first_id
      left join objectives ob on ob.id = v.objective_id
      left join passages pg on pg.id = v.passage_id), '[]'::jsonb));
end $function$;


-- ═══════════════════ معدَّلةٌ لا منشأة ═══════════════════

-- ⑨ can_access — الثقب ①، والبنكُ صراحةً
do $$
begin
  if position('v_role' in pg_get_functiondef('public.can_access(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '185: الدورُ قائمٌ في can_access من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.can_access(bigint,uuid)', array[
    $a$declare v_lesson bigint; v_pub bool; v_tool text;$a$,
    $b$declare v_lesson bigint; v_pub bool; v_tool text; v_role text;$b$, '1',

    $a$select published, tool into v_pub, v_tool from quizzes where id = p_quiz;
  if v_pub is not true then return false; end if;$a$,
    $b$select published, tool, role into v_pub, v_tool, v_role from quizzes where id = p_quiz;
  if v_pub is not true then return false; end if;
  -- 185 · البنكُ لا يبلغه طالبٌ أبداً: يُسحب منه في نموذجٍ ولا يُفتح بنفسه (الثقب ①)
  if v_role = 'bank' then return false; end if;$b$, '1',

    $a$if v_lesson is null then return true; end if;$a$,
    $b$if v_lesson is null then return false; end if;   -- 185 · الثقب ①: المنشورُ بلا درسٍ كان مفتوحاً لكلّ طالب$b$, '1']);
end $$;

-- ⑩ publish_quiz — البنكُ لا يُنشر، برسالةٍ قبل القيد
do $$
begin
  if position('''bank''' in pg_get_functiondef('public.publish_quiz(bigint,boolean)'::regprocedure)) > 0 then
    raise notice '185: حارسُ البنك قائمٌ في publish_quiz من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.publish_quiz(bigint,boolean)', array[
    $a$  if p_publish then
    v_r := quiz_readiness(p_quiz);$a$,
    $b$  -- 185 · البنكُ لا يُنشر أبداً — تُسحب أسئلتُه في نموذج
  if p_publish and (select q.role from quizzes q where q.id = p_quiz) = 'bank' then
    return jsonb_build_object('ok', false, 'error', 'البنك لا يُنشر — تُسحب أسئلته في نموذج');
  end if;

  if p_publish then
    v_r := quiz_readiness(p_quiz);$b$, '1']);
end $$;

-- ⑪ list_quizzes — والنموذجُ يُعدّ من المجمع، والاختبارُ العاديّ بعدّه القديم حرفاً (والمتقاعدُ فيه)
do $$
begin
  if position('quiz_pool' in pg_get_functiondef('public.list_quizzes()'::regprocedure)) > 0 then
    raise notice '185: المجمعُ قائمٌ في list_quizzes من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.list_quizzes()', array[
    $a$x.quiz_id = q.id$a$,
    $b$(x.quiz_id = q.id or x.id in (select qp from quiz_pool(q.id) qp))$b$, '2']);
end $$;

-- ⑫ get_quiz — فرعُ النموذج، والاختبارُ العاديّ بمساره القديم حرفاً (رأس الملفّ ③)
do $$
begin
  if position('v_form' in pg_get_functiondef('public.get_quiz(bigint)'::regprocedure)) > 0 then
    raise notice '185: فرعُ النموذج قائمٌ في get_quiz من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.get_quiz(bigint)', array[
    $a$declare v jsonb; v_ids bigint[]; v_seed text; v_att int; v_lane bigint; v_sh bool;$a$,
    $b$declare v jsonb; v_ids bigint[]; v_seed text; v_att int; v_lane bigint; v_sh bool;
        v_form bool; v_lanes jsonb;   -- 185 · النموذجُ وحاراتُه$b$, '1',

    $a$  select shuffle into v_sh from quizzes where id = p_quiz;$a$,
    $b$  select shuffle, role = 'form' into v_sh, v_form from quizzes where id = p_quiz;$b$, '1',

    $a$  select passage_id into v_lane
$a$,
    $b$  if v_form then
    /* 185 · النموذج: صيغةٌ من كلّ سطرٍ بالبذرة نفسها، والحارةُ لكلّ مجموعة نصوصٍ لا للنموذج كلّه —
       المجموعةُ «بنك : group_key»، والنصُّ بلا مجموعةٍ مجموعةُ نفسه. */
    select jsonb_object_agg(g, lane) into v_lanes from (
      select distinct on (g) g, pid as lane from (
        select v2.quiz_id::text || ':' || coalesce(pg2.group_key, 'p' || pg2.id::text) as g, pg2.id as pid
          from form_slots fs
          join questions v2 on v2.quiz_id = fs.bank_id and v2.variant_key = fs.slot_key
                           and v2.retired_at is null
          join passages pg2 on pg2.id = v2.passage_id
         where fs.form_id = p_quiz) t
      order by g, md5(v_seed || pid::text)) s;

    select array_agg(pick) into v_ids from (
      select (select v2.id from questions v2
                left join passages pg2 on pg2.id = v2.passage_id
               where v2.quiz_id = fs.bank_id and v2.variant_key = fs.slot_key
                 and v2.retired_at is null
               order by coalesce(v2.passage_id = (v_lanes ->> (v2.quiz_id::text || ':'
                          || coalesce(pg2.group_key, 'p' || pg2.id::text)))::bigint, false) desc,
                        (v2.passage_id is null) desc,
                        md5(v_seed || v2.id::text)
               limit 1) as pick
        from form_slots fs where fs.form_id = p_quiz) s
     where pick is not null;
    v_ids := coalesce(v_ids, '{}'::bigint[]);
  else

  select passage_id into v_lane
$b$, '1',

    $a$    select array_agg(id) from questions
     where quiz_id = p_quiz and variant_key is null
       and retired_at is null), '{}'::bigint[]);
$a$,
    $b$    select array_agg(id) from questions
     where quiz_id = p_quiz and variant_key is null
       and retired_at is null), '{}'::bigint[]);
  end if;
$b$, '1',

    $a$     where pg.quiz_id = q.id
       and exists (select 1 from questions z$a$,
    $b$     where (pg.quiz_id = q.id or v_form)          -- 185 · ونصوصُ النموذج من بنوكها
       and exists (select 1 from questions z$b$, '1',

    $a$        order by pg.position)
      from passages pg$a$,
    $b$        order by case when v_form then (select min(fx.position) from form_slots fx
                                          join questions zx on zx.quiz_id = fx.bank_id
                                                           and zx.variant_key = fx.slot_key
                                         where fx.form_id = p_quiz and zx.id = any(v_ids)
                                           and zx.passage_id = pg.id) end,
                 pg.position)
      from passages pg$b$, '1',

    $a$        'section', x.section,$a$,
    $b$        'section', case when v_form then (select fx.section from form_slots fx
                                           where fx.form_id = p_quiz and fx.bank_id = x.quiz_id
                                             and fx.slot_key = x.variant_key)
                        else x.section end,$b$, '1',

    $a$      order by (select min(coalesce((select min(y.position) from questions y$a$,
    $b$      order by case when v_form then (select fx.position from form_slots fx   -- 185 · النموذجُ بترتيب سطوره
                                       where fx.form_id = p_quiz and fx.bank_id = x.quiz_id
                                         and fx.slot_key = x.variant_key) end,
               (select min(coalesce((select min(y.position) from questions y$b$, '1']);
end $$;

-- ⑬ submit_attempt — سؤالٌ من خانةٍ يسحبها النموذج، والمراجعةُ بترتيب سطوره (رأس الملفّ ④)
do $$
begin
  if position('form_slots' in pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure)) > 0 then
    raise notice '185: النموذجُ قائمٌ في submit_attempt من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.submit_attempt(bigint,jsonb,integer,boolean)', array[
    $a$     where q.id = (a->>'q')::bigint and q.quiz_id = p_quiz;$a$,
    $b$     where q.id = (a->>'q')::bigint
       and (q.quiz_id = p_quiz                  -- 185 · أو خانةٌ يسحبها النموذجُ من بنكه
            or exists (select 1 from form_slots fs where fs.form_id = p_quiz
                          and fs.bank_id = q.quiz_id and fs.slot_key = q.variant_key));$b$, '1',

    $a$      ) order by q.position)
      from answers ans$a$,
    $b$      ) order by coalesce((select fs.position from form_slots fs where fs.form_id = p_quiz
                             and fs.bank_id = q.quiz_id and fs.slot_key = q.variant_key), q.position),
                 q.position)
      from answers ans$b$, '1']);
end $$;

-- ⑭ quiz_readiness — المجمعُ مرّةً في مصفوفة تقرؤها المواضعُ الثلاثة والثلاثون، وللنموذج سطورُه قبل أسئلته (رأس الملفّ ⑥)
do $$
begin
  if position('quiz_pool' in pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure)) > 0 then
    raise notice '185: المجمعُ قائمٌ في quiz_readiness من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.quiz_readiness(bigint)', array[
    $a$        n int; v_kinds text;$a$,
    $b$        n int; v_kinds text; v_role text; v_pool bigint[];$b$, '1',

    $a$quiz_id = p_quiz$a$,
    $b$id = any(v_pool)$b$, '33',

    $a$    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
$a$,
    $b$    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;

  -- 185 · أسئلةُ الاختبار الحيّة مرّةً واحدة: أسئلتُه، أو صيغُ خانات سطوره (رأس الملفّ ⑥)
  v_pool := array(select qp from quiz_pool(p_quiz) qp);

  -- 185 · النموذج: سطورُه قبل أسئلته — كلُّ سطرٍ يجد صيغةً حيّة في بنكه، والموضوعيُّ منها ستّةٌ على الأقلّ
  select role into v_role from quizzes where id = p_quiz;
  if v_role = 'form' then
    select count(*) into n from form_slots where form_id = p_quiz;
    if n = 0 then
      v_issues := v_issues || to_jsonb('النموذج بلا سطور — يُركَّب من بنوك المادّة'::text);
    else
      select count(*) into n from form_slots fs
       where fs.form_id = p_quiz
         and not exists (select 1 from questions v2 where v2.quiz_id = fs.bank_id
                          and v2.variant_key = fs.slot_key and v2.retired_at is null);
      if n > 0 then
        v_issues := v_issues || to_jsonb(n || ' سطراً بلا صيغةٍ حيّة في بنكه');
      end if;
      select count(*) into n from form_slots fs
       where fs.form_id = p_quiz
         and exists (select 1 from questions v2 where v2.quiz_id = fs.bank_id
                      and v2.variant_key = fs.slot_key and v2.retired_at is null
                      and v2.kind in ('mcq','msq','gap','matching','cloze'));
      if n < 6 then
        v_issues := v_issues || to_jsonb(
          'يلزم ٦ سطور موضوعية على الأقل — الموجود ' || n || ' (بأقلّ من ذلك تفقد عتبة ٦٥٪ معناها)');
      end if;
    end if;
  end if;
$b$, '1',

    $a$  if v_mcq + v_msq + v_gap + v_match + v_cloze < 6 then$a$,
    $b$  if v_role is distinct from 'form'            -- 185 · وللنموذج سطورُه أعلاه
     and v_mcq + v_msq + v_gap + v_match + v_cloze < 6 then$b$, '1']);
end $$;

-- ⑮ quiz_for_edit — الدورُ، ومجموعةُ النصّ، وسطورُ النموذج بعدّاد أوزانه، ومن يسحب من البنك
do $$
begin
  if position('''role''' in pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure)) > 0 then
    raise notice '185: الدورُ قائمٌ في quiz_for_edit من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.quiz_for_edit(bigint)', array[
    $a$    'tool', q.tool, 'station', q.station,$a$,
    $b$    'tool', q.tool, 'station', q.station,
    'role', q.role,                                   -- 185 · درسٌ · بنكٌ · نموذج$b$, '1',

    $a$        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang, 'position', pg.position,$a$,
    $b$        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang, 'position', pg.position,
        'group', pg.group_key,                        -- 185 · النصوصُ البديلة في البنك$b$, '1',

    $a$    'readiness', quiz_readiness(q.id)$a$,
    $b$    -- 185 · سطورُ النموذج بصيغتها الأولى عيّنةً وفرعِها من هدفها — وعدّادُ الفروع يقرأ أوزانَ شُعبة مقرَّره
    'rows', case when q.role = 'form' then coalesce((
        select jsonb_agg(jsonb_build_object(
                 'position', fs.position, 'bank_id', fs.bank_id, 'bank', b.title,
                 'slot', fs.slot_key, 'section', fs.section,
                 'variants', (select count(*) from questions v2
                               where v2.quiz_id = fs.bank_id and v2.variant_key = fs.slot_key
                                 and v2.retired_at is null),
                 'kind', sv.kind, 'difficulty', sv.difficulty, 'sample', left(sv.body, 160),
                 'objective_id', sv.objective_id,
                 'strand_id', (select ob.strand_id from objectives ob where ob.id = sv.objective_id),
                 'passage_id', sv.passage_id)
               order by fs.position)
          from form_slots fs
          join quizzes b on b.id = fs.bank_id
          left join lateral (select v2.kind, v2.difficulty, v2.body, v2.objective_id, v2.passage_id
                               from questions v2
                              where v2.quiz_id = fs.bank_id and v2.variant_key = fs.slot_key
                                and v2.retired_at is null
                              order by v2.position, v2.id limit 1) sv on true
         where fs.form_id = q.id), '[]'::jsonb) end,
    'weights', case when q.role = 'form' then coalesce((
        select jsonb_agg(jsonb_build_object(
                 'stream_id', sw.stream_id, 'stream', sm.name,
                 'strand_id', sw.strand_id, 'strand', st.name, 'pct', sw.pct)
               order by sm.sort_order, st.sort_order, st.id)
          from stream_weights sw
          join streams sm on sm.id = sw.stream_id
          join strands st on st.id = sw.strand_id
         where sw.stream_id in (select c.stream_id from items i
                                  join lessons l on l.id = i.lesson_id
                                  join courses c on c.id = l.course_id
                                 where i.quiz_id = q.id)), '[]'::jsonb) end,
    'used_by', case when q.role = 'bank' then coalesce((
        select jsonb_agg(jsonb_build_object(
                 'id', f.id, 'title', f.title,
                 'rows', (select count(*) from form_slots x where x.form_id = f.id and x.bank_id = q.id))
               order by f.title, f.id)
          from quizzes f
         where f.role = 'form'
           and exists (select 1 from form_slots x where x.form_id = f.id and x.bank_id = q.id)), '[]'::jsonb) end,

    'readiness', quiz_readiness(q.id)$b$, '1']);
end $$;

-- ⑯ objectives_for_quiz — «المستعمَل» من المجمع، مرّةً لا لكلّ هدف
do $$
begin
  if position('quiz_pool' in pg_get_functiondef('public.objectives_for_quiz(bigint)'::regprocedure)) > 0 then
    raise notice '185: المجمعُ قائمٌ في objectives_for_quiz من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.objectives_for_quiz(bigint)', array[
    $a$  v_obj jsonb; v_les jsonb;$a$,
    $b$  v_obj jsonb; v_les jsonb; v_pool bigint[];$b$, '1',

    $a$  select s.scale_id into v_scale from subjects s where s.id = v_subject;$a$,
    $b$  select s.scale_id into v_scale from subjects s where s.id = v_subject;
  v_pool := array(select qp from quiz_pool(p_quiz) qp);   -- 185 · أسئلتُه، أو صيغُ خانات سطوره$b$, '1',

    $a$where x.quiz_id = p_quiz and x.objective_id = o.id$a$,
    $b$where x.id = any(v_pool) and x.objective_id = o.id$b$, '1']);
end $$;

-- ⑰ practice_snapshot_quiz — النموذجُ صيغةً من كلّ سطر بترتيب سطوره (رأس الملفّ ⑦)
do $$
begin
  if position('form_pick' in pg_get_functiondef('public.practice_snapshot_quiz(bigint)'::regprocedure)) > 0 then
    raise notice '185: النموذجُ قائمٌ في practice_snapshot_quiz من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.practice_snapshot_quiz(bigint)', array[
    $a$        from passages g where g.quiz_id = q.id), '[]'::jsonb),$a$,
    $b$        from passages g
       where g.quiz_id = q.id
          or g.id in (select x2.passage_id from questions x2         -- 185 · ونصوصُ صيغ النموذج من بنوكها
                       where x2.id in (select fp from form_pick(q.id) fp))), '[]'::jsonb),$b$, '1',

    $a$     where x.quiz_id = q.id
       and x.retired_at is null$a$,
    $b$     where x.id in (select y.id from questions y          -- 185 · أسئلتُه الحيّة، أو صيغةٌ من كلّ سطرٍ في النموذج
                     where y.quiz_id = q.id and y.retired_at is null
                    union all
                    select fp from form_pick(q.id) fp)
       and x.retired_at is null$b$, '1',

    $a$      ) order by x.position)$a$,
    $b$      ) order by coalesce((select fs.position from form_slots fs where fs.form_id = q.id
                             and fs.bank_id = x.quiz_id and fs.slot_key = x.variant_key), x.position),
                 x.position)$b$, '1']);
end $$;

-- ⑱ course_state — وسطورُ النموذج أسئلتُه في عدّ الدرس
do $$
begin
  if position('form_slots' in pg_get_functiondef('public.course_state(bigint)'::regprocedure)) > 0 then
    raise notice '185: النموذجُ قائمٌ في course_state من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.course_state(bigint)', array[
    $a$        'questions', (select count(*) from questions q where q.quiz_id in
                       (select i.quiz_id from items i
                         where i.lesson_id = le.id and i.quiz_id is not null)),$a$,
    $b$        'questions', (select count(*) from questions q where q.quiz_id in
                       (select i.quiz_id from items i
                         where i.lesson_id = le.id and i.quiz_id is not null))
                   + (select count(*) from form_slots fs where fs.form_id in   -- 185 · وسطورُ النموذج أسئلتُه
                       (select i.quiz_id from items i
                         where i.lesson_id = le.id and i.quiz_id is not null)),$b$, '1']);
end $$;

-- ⑲ create_practice_session — البنكُ لا يُتدرَّب عليه، والمقاليُّ يُعدّ من المجمع (رأس الملفّ ⑦)
do $$
begin
  if position('quiz_pool' in pg_get_functiondef('public.create_practice_session(text,bigint,integer)'::regprocedure)) > 0 then
    raise notice '185: البنكُ محروسٌ في create_practice_session من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.create_practice_session(text,bigint,integer)', array[
    $a$    select count(*) into v_essay from questions
     where quiz_id = p_source and retired_at is null and kind = 'essay';$a$,
    $b$    -- 185 · البنكُ لا يُعرض للطلاب: جلسةُ التدرّب نشرٌ لأسئلته بمفاتيحها
    if (select q.role from quizzes q where q.id = p_source) = 'bank' then
      return jsonb_build_object('ok', false, 'error', 'البنك لا يُعرض للطلاب — تُسحب أسئلته في نموذج');
    end if;
    select count(*) into v_essay from questions
     where id in (select qp from quiz_pool(p_source) qp) and retired_at is null and kind = 'essay';$b$, '1']);
end $$;

-- ⑳ quiz_detail — إجاباتُ النموذج بموضع سطورها
do $$
begin
  if position('form_slots' in pg_get_functiondef('public.quiz_detail(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '185: النموذجُ قائمٌ في quiz_detail من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.quiz_detail(bigint,uuid)', array[
    $a$  select qu.position, qu.body, qu.kind,$a$,
    $b$  select coalesce((select fs.position from form_slots fs     -- 185 · وفي النموذج موضعُ سطره
                     where fs.form_id = p_quiz and fs.bank_id = qu.quiz_id
                       and fs.slot_key = qu.variant_key), qu.position) as position,
         qu.body, qu.kind,$b$, '1']);
end $$;

-- ㉑ start_recording — سؤالُ التحدّث في النموذج من بنكه (رأس الملفّ ⑦)
do $$
begin
  if position('can_access_question' in pg_get_functiondef('public.start_recording(bigint,text)'::regprocedure)) > 0 then
    raise notice '185: can_access_question قائمةٌ في start_recording من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.start_recording(bigint,text)', array[
    $a$  if not can_access(v_quiz, v_uid) then$a$,
    $b$  if not can_access_question(p_question, v_uid) then   -- 185 · وسؤالُ النموذج من بنكه$b$, '1']);
end $$;

-- ㉒ delete_quiz — البنكُ تحت نموذجٍ لا يُحذف من تحته
do $$
begin
  if position('form_slots' in pg_get_functiondef('public.delete_quiz(bigint,boolean)'::regprocedure)) > 0 then
    raise notice '185: حارسُ البنك قائمٌ في delete_quiz من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.delete_quiz(bigint,boolean)', array[
    $a$  select count(*) into v_n from questions where quiz_id = p_quiz;$a$,
    $b$  -- 185 · البنكُ يسحب منه نموذج ⇒ يُزال من سطوره أوّلاً، ولا يُحذف من تحتها
  if exists (select 1 from form_slots fs where fs.bank_id = p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'البنك يسحب منه نموذج — يُزال من سطوره أولاً');
  end if;

  select count(*) into v_n from questions where quiz_id = p_quiz;$b$, '1']);
end $$;

-- ㉓ set_variant — خانةُ الوحيد في البنك ليست خانةً قائمة ما لم يسحبها نموذج (رأس الملفّ ⑦)
do $$
begin
  if position('form_slots' in pg_get_functiondef('public.set_variant(bigint[])'::regprocedure)) > 0 then
    raise notice '185: البنكُ قائمٌ في set_variant من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch185('public.set_variant(bigint[])', array[
    $a$    from questions
   where id = any(p_ids) and retired_at is null and variant_key is not null;$a$,
    $b$    from questions q0
   where id = any(p_ids) and retired_at is null and variant_key is not null
     -- 185 · وفي البنك لكلّ وحيدٍ خانتُه (عُرفُ المشغّل): لا تُعدّ قائمةً ما لم يسحبها نموذج،
     --       وإلا لم يُجمع في البنك سؤالان أبداً. والدمجُ يتبنّى خانةَ النموذج إن كانت
     and not ((select z.role from quizzes z where z.id = q0.quiz_id) = 'bank'
              and not exists (select 1 from questions q1
                               where q1.quiz_id = q0.quiz_id and q1.variant_key = q0.variant_key
                                 and q1.retired_at is null and q1.id <> q0.id)
              and not exists (select 1 from form_slots fs
                               where fs.bank_id = q0.quiz_id and fs.slot_key = q0.variant_key));$b$, '1']);
end $$;


-- ═══════════════════ الصلاحيات — ثلاثُ طبقات ═══════════════════

-- ① المنح: الأبوابُ الداخليّة والحرّاسُ مغلقة، وأبوابُ التأليف للمسجَّل وحرّاسُها في داخلها
revoke all on function public.quiz_pool(bigint)                   from public, anon, authenticated;
revoke all on function public.form_pick(bigint)                   from public, anon, authenticated;
revoke all on function public.can_access_question(bigint, uuid)   from public, anon, authenticated;
revoke all on function public.quizzes_role_guard()                from public, anon, authenticated;
revoke all on function public.questions_role_guard()              from public, anon, authenticated;
revoke all on function public.questions_slot_guard()              from public, anon, authenticated;
revoke all on function public.passages_role_guard()               from public, anon, authenticated;
revoke all on function public.items_bank_guard()                  from public, anon, authenticated;
revoke all on function public.form_slots_guard()                  from public, anon, authenticated;
revoke all on function public.stream_weights_guard()              from public, anon, authenticated;
revoke all on function public.create_bank(bigint, text)           from public, anon;
revoke all on function public.create_form(bigint, text, integer)  from public, anon;
revoke all on function public.save_form_slots(bigint, jsonb)      from public, anon;
revoke all on function public.set_passage_group(bigint[], text)   from public, anon;
revoke all on function public.subject_banks(bigint)               from public, anon;
revoke all on function public.bank_slots(bigint)                  from public, anon;
grant execute on function public.create_bank(bigint, text)          to authenticated;
grant execute on function public.create_form(bigint, text, integer) to authenticated;
grant execute on function public.save_form_slots(bigint, jsonb)     to authenticated;
grant execute on function public.set_passage_group(bigint[], text)  to authenticated;
grant execute on function public.subject_banks(bigint)              to authenticated;
grant execute on function public.bank_slots(bigint)                 to authenticated;

--    والجدولان: سطورُ النموذج لا يقرؤها أحدٌ مباشرة (تركيبُ المحاكاة لا يُكشف للطالب)، والأوزانُ يقرؤها المسجَّل
alter table public.form_slots enable row level security;
revoke all on public.form_slots from anon, authenticated;
alter table public.stream_weights enable row level security;
revoke all on public.stream_weights from anon, authenticated;
grant select on public.stream_weights to authenticated;

-- ② الصفّ: الأوزانُ بياناتٌ رسميّة لا سرّ فيها
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'stream_weights'
                                         and policyname = 'p_stream_weights_read') then
    alter policy p_stream_weights_read on public.stream_weights to authenticated
      using (auth.uid() is not null);
  else
    create policy p_stream_weights_read on public.stream_weights for select to authenticated
      using (auth.uid() is not null);
  end if;
end $pol$;

-- ③ المعنى: في الدوالّ أعلاه — وتعليقُها هنا
comment on column public.quizzes.role is
  'quiz اختبارُ درس (الافتراض) · bank بنكُ المادّة: لا يُنشر ولا يُربط بدرس وكلُّ سؤالٍ فيه في خانة · form نموذجٌ يُركَّب من خانات البنوك ولا أسئلةَ له (185)';
comment on column public.passages.group_key is
  'النصوصُ البديلة لنصٍّ واحد في البنك: تُختار منها حارةٌ واحدة في كلّ محاولة. والفارغُ نصٌّ بلا بديل (185)';
comment on table public.form_slots is
  'سطورُ النموذج: من البنك ب · الخانة خ · في الموضع م · القسم ق. يشير إلى الخانة لا إلى السؤال، فيبلغه وريثُ المتقاعد (185)';
comment on table public.stream_weights is
  'الوزنُ الرسميّ لكلّ فرعٍ في كلّ شُعبة — يقرؤه عدّادُ النموذج. والفرعُ والشُّعبةُ من مادّةٍ واحدة، والمجموعُ لا يتجاوز ١٠٠ (185)';
comment on function public.quiz_pool(bigint) is
  'مجمعُ أسئلة الاختبار الحيّة في موضعٍ واحد: أسئلتُه، أو صيغُ خانات سطوره إن كان نموذجاً. يُقرأ مرّةً في مصفوفة لا في كلّ موضع. SQL بلا security definer لتُطوى — ومغلقة (185)';
comment on function public.form_pick(bigint) is
  'صيغةٌ ثابتة من كلّ سطر — لجلسة التدرّب على النموذج (185)';
comment on function public.can_access_question(bigint, uuid) is
  'أيبلغ الطالبُ هذا السؤال؟ من اختباره، أو من نموذجٍ يسحب خانتَه — سؤالُ start_recording (185)';
comment on function public.create_bank(bigint, text) is
  'بنكٌ جديد للمادّة — لفريق الإشراف، ويولد غيرَ منشور (185)';
comment on function public.create_form(bigint, text, integer) is
  'نموذجٌ جديد في المادّة — يُضاف إلى درسٍ كأيّ اختبار، ويولد بلا سطور (185)';
comment on function public.save_form_slots(bigint, jsonb) is
  'سطورُ النموذج دفعةً واحدة بترتيبها [{bank, slot, section}] — والمنشورُ لا يُترك غيرَ جاهز (185)';
comment on function public.set_passage_group(bigint[], text) is
  'مجموعةُ النصوص البديلة في البنك — نظيرةُ set_variant للأسئلة (185)';
comment on function public.subject_banks(bigint) is
  '«بنوك المادّة» بعدد خاناتها وأسئلتها ونصوصها والنماذج التي تسحب منها (185)';
comment on function public.bank_slots(bigint) is
  'خاناتُ البنك لشاشة التركيب: عيّنةٌ وصيغٌ حيّة ونمطٌ وصعوبةٌ وهدفٌ وفرعُه ومجموعةُ النصّ (185)';


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('185', 'البنكُ والنموذج — السؤالُ يُكتب في بنكٍ مرّة، ويختاره النموذجُ بسطر', now())
on conflict (n) do update set applied_at = now();
