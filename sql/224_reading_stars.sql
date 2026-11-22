-- ══════════════════════════════════════════════════════════
-- 224 · نجومُ المكتبة — سجلٌّ يُلحَق ولا يُعدَّل، تكتبه القاعدةُ لحظةَ الواقعة (المرحلة ① من `spec-reading-motivation.md` · ٢٢ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قراراتُ المالك (٢٢ نوفمبر):** نجومُ الكتاب خمسٌ بأوزانٍ «لا تكون موحّدة»: قراءةٌ ١ · فهمٌ ٣ (٨٠٪ فأكثر) · كلماتٌ ١.
--      **والوزنُ بعدد النجوم** لا بنجمةٍ «تساوي ثلاثاً» — فالسطرُ يحمل عددَه.
--   ② **سجلٌّ لا اشتقاق:** الاشتقاقُ يعيد كتابةَ التاريخ إن عُدّلت الأوزان — فتتغيّر لوحاتُ الأسابيع الماضية وتُسحب أوسمةٌ مُنحت.
--      والسجلُّ يحفظ الوزنَ يومَ الكسب، كما تحفظ `level_promotions` صورةَ الشرط يومَ الترقية. **والفريدُ على (طالب · درس · نوع)**
--      يجعل إعادةَ قراءة كتابٍ متقَنٍ لا تكتب شيئاً.
--   ③ **بمُطلِقاتٍ على جداول الوقائع لا بتعديل دوالّها:** `track_item` و`submit_attempt` و`review_card` قائمةٌ لا تُمسّ.
--      المُطلِقُ يقرأ ما كتبته: `item_progress` (الإتمامُ والزمن) · `attempts` (حين تُكتب `pct` — `submit_attempt` تُدرج ثمّ تُحدّث)
--      · `card_review_log`. فلا `create or replace` على دالّةٍ حيّة في هذا الملفّ.
--   ④ 🔴 **والنجومُ لا توقف التعلّم:** خطأٌ في حسابها لا يُسقط محاولةً ولا قراءةً ولا مراجعة — المُطلِقُ يلتقطه ويكتبه في `star_faults`.
--      **والصمتُ لا يُرى، فالخطأُ سطرٌ يُقرأ** لا تحذيرٌ في سجلّات الخادم.
--   ⑤ **نجمةُ القراءة تعيد فحصَ الزمن في القاعدة:** العتبةُ اليوم في المتصفّح وحده (`onEnd` · `WPM_FAST = 450` في `book.js`)، ونداءٌ مصنوعٌ
--      لـ`track_item` يكتب الإتمام. فالنجمةُ تشترط `seconds_spent` ≥ ٠٫٨ × الكلمات ÷ ٤٥٠ دقيقة — **والـ٠٫٨ سماحٌ** لأنّ الواجهة تعدّ كلماتِ
--      الصفحات المعروضة والقاعدةَ كلماتِ المتن. **والكتابُ بأجزائه كلّها** (حتى ٤ نصوص للدرس — قِيس).
--      ⚠️ **ونصٌّ بلا متنٍ في القاعدة** (كتابٌ فوق ٣٠٠٠ كلمة يوم يُنقل إلى R2 وحده · ق٢٠) **لا يُفحص زمنُه** — لا كلماتَ يُقاس بها، فيُقبل
--      إتمامُه كما قبلته الواجهة. **وقِيس اليوم: صفرُ نصٍّ بلا متن** في المادّة ٧ (١٠٠٠ نصّ).
--   ⑥ **نجومُ الفهم الثلاث = إتمامُ الدرس نفسُه** (`lesson_done_at`): كلُّ اختبارٍ محتسبٍ بلغ `lessons.pass_mark` — **في أيّ محاولة**: من أخطأ
--      ثمّ قرأ العلاج وأتقن تعلّم، ونقصُ نجومه عقوبةٌ للتشخيص.
--      🔑 **عتبةٌ واحدة لا اثنتان** — قرارُ المالك (٢٢ نوفمبر): «ارفع الحد الأدنى للإنجاز في اختبارات المكتبة إلى 80 ليتطابق الحدّان».
--      كُتبت المسودّةُ الأولى بعتبةٍ للنجوم (`quiz_pct` ٨٠) منفصلةً عن `pass_mark` (٦٥ في دروس المكتبة كلّها يومها) — فـ«أُنجز» على الرفّ
--      بلا نجوم فهم. **فسقطت العتبةُ الثانية:** النجومُ تقرأ `pass_mark`، ورفعُه إلى ٨٠ وحارسُه في `225` — فلا يفترقان يوماً.
--   ⑦ **نجمةُ الكلمات:** أصاب في مراجعة ٨٠٪ من بطاقات الكتاب (`card_lessons`) **بعد يومٍ على الأقلّ من لقائها السابق** — فالمراجعةُ في
--      الجلسة نفسِها حفظٌ قصير لا تذكّر. **والإصابةُ تقديرٌ ≥ ٢** (Hard فما فوق): في FSRS الواحدُ وحده نسيان.
--      وكتابٌ بلا بطاقات لا نجمةَ كلماتٍ له (أعلاه ٤) — والواجهةُ لا ترسم مكانها.
--   ⑧ **للطلاب وحدهم** (`profiles.role = 'student'`): المعلّمُ يفتح الكتابَ ويحلّ اختبارَه مؤلّفاً لا قارئاً، ولا يُعدّ في لوحة.
--   ⑨ **والقواعدُ لكلّ مادّةٍ في صفّ** (`star_rules`): المكتبتان (٧ و٥٥ · `family = 'reading'`) اليوم، ولا نجومَ لمادّةٍ بلا صفّ.
--      وتُعدَّل بالنتائج — والسجلُّ يحفظ ما كان. ⚠️ **ولا دالّةَ تعديلٍ في هذا الملفّ:** شاشتُها مع المرحلة ③، وتعديلُها يُسجَّل يومها.
--   ⑩ **والقراءةُ بدالّةٍ واحدة** (`my_stars`): المجموعُ والكتبُ والكلماتُ المقروءة ونجومُ كلّ كتاب. **والجدولُ يقرؤه صاحبُه ومعلّموه**
--      (`teaches`) — ولا كتابةَ عليه لأحد إلا من المُطلِقات.
--
-- **قُرئت الحيّاتُ قبله (٢٢ نوفمبر · ولم يُستبدل منها شيء):** `track_item(bigint,text,integer)` (تجمع `seconds_spent` وتحفظ أوّلَ `completed_at`) ·
--   `lesson_done_at(bigint,uuid)` · `review_card(bigint,integer)` (تكتب `card_review_log` بـ`elapsed_sec` منذ المراجعة السابقة) ·
--   `submit_attempt(bigint,jsonb,integer,boolean)` (تُدرج المحاولةَ و`pct` صفرٌ بافتراض العمود ثمّ `update attempts set … pct`). والمُطلِقُ الوحيدُ القائم على
--   الجداول الثلاثة `attempts_level_snapshot` (BEFORE INSERT) — لا يصطدم بها.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة ═══════════

-- ① القواعد
create table if not exists public.star_rules (
  subject_id      bigint primary key references public.subjects(id) on delete cascade,
  w_read          smallint not null default 1 check (w_read  between 0 and 9),
  w_quiz          smallint not null default 3 check (w_quiz  between 0 and 9),
  w_cards         smallint not null default 1 check (w_cards between 0 and 9),
  cards_pct       integer  not null default 80 check (cards_pct between 1 and 100),
  cards_gap_hours integer  not null default 24 check (cards_gap_hours >= 0),
  wpm_max         integer  not null default 450 check (wpm_max > 0),
  time_slack      numeric(3,2) not null default 0.80 check (time_slack > 0 and time_slack <= 1),
  active          boolean  not null default true,
  updated_at      timestamptz not null default now()
);

-- ② السجلّ
create table if not exists public.star_log (
  user_id    uuid   not null references public.profiles(id) on delete cascade,
  lesson_id  bigint not null references public.lessons(id)  on delete cascade,
  subject_id bigint not null references public.subjects(id) on delete cascade,
  kind       text   not null check (kind in ('read','quiz','cards')),
  stars      smallint not null check (stars > 0),
  earned_at  timestamptz not null default now(),
  primary key (user_id, lesson_id, kind)
);
-- لوحةُ الأسبوع والسلسلة (المرحلتان ③ و⑤) تقرآن بالمادّة والزمن
create index if not exists star_log_subject_earned on public.star_log (subject_id, earned_at);

-- ③ الأخطاء — سطرٌ يُقرأ لا تحذيرٌ يضيع (رأس الملفّ ④)
create table if not exists public.star_faults (
  id        bigint generated always as identity primary key,
  at        timestamptz not null default now(),
  source    text not null,
  user_id   uuid,
  lesson_id bigint,
  err       text not null
);

-- ④ المنحُ والسياسات — ثلاثُ طبقات (AGENTS §٥). والجدولُ الجديد في Supabase يولد بمنحٍ كاملٍ لـanon وauthenticated ⇒ يُسحب أوّلاً
revoke all on public.star_rules  from anon, authenticated;
revoke all on public.star_log    from anon, authenticated;
revoke all on public.star_faults from anon, authenticated;
grant select on public.star_rules to authenticated;
grant select on public.star_log   to authenticated;

alter table public.star_rules  enable row level security;
alter table public.star_log    enable row level security;
alter table public.star_faults enable row level security;   -- بلا سياسة ⇒ لا يقرؤه إلا المحرّر

drop policy if exists p_star_rules_read on public.star_rules;
create policy p_star_rules_read on public.star_rules for select to authenticated using (true);

drop policy if exists p_star_log_read on public.star_log;
create policy p_star_log_read on public.star_log for select to authenticated
  using (user_id = auth.uid() or teaches(user_id));

-- ⑤ عددُ الكلمات — كما تعدّها `words` في book.js: ما بين الفراغات
create or replace function public.word_count(p text)
returns integer language sql immutable parallel safe
set search_path to 'public'
as $$
  select case when p is null or btrim(p) = '' then 0
              else array_length(regexp_split_to_array(btrim(p), '\s+'), 1) end;
$$;
grant execute on function public.word_count(text) to authenticated;

-- ⑥ المنح — يحسب الأنواعَ الثلاثة لدرسٍ وطالب، ويكتب ما لم يُكتب. ولا يُنادى من الواجهة
create or replace function public.star_award(p_user uuid, p_lesson bigint)
returns integer
language plpgsql security definer
set search_path to 'public'
as $$
declare
  r star_rules%rowtype;
  v_subj bigint; v_n int := 0; v_rows int;
  v_need int; v_ok int;   -- القراءةُ والكلمات (الفهمُ يقرأ `lesson_done_at`)
begin
  if p_user is null or p_lesson is null then return 0; end if;

  select l.subject_id into v_subj from lessons l where l.id = p_lesson;
  select * into r from star_rules s where s.subject_id = v_subj and s.active;
  if not found then return 0; end if;                                   -- مادّةٌ بلا نجوم
  if not exists (select 1 from profiles p where p.id = p_user and p.role = 'student') then return 0; end if;

  -- القراءة: كلُّ أجزاء الكتاب أُتمّت، وزمنُها زمنُ قارئٍ لا ماسح (رأس الملفّ ⑤)
  if r.w_read > 0 and not exists (select 1 from star_log s where s.user_id = p_user and s.lesson_id = p_lesson and s.kind = 'read') then
    select count(*),
           count(*) filter (where pr.completed_at is not null
                              and (i.body is null
                                   or pr.seconds_spent >= r.time_slack * word_count(i.body) * 60.0 / r.wpm_max))
      into v_need, v_ok
      from items i
      left join item_progress pr on pr.item_id = i.id and pr.user_id = p_user
     where i.lesson_id = p_lesson and i.kind = 'text';
    if v_need > 0 and v_ok = v_need then
      insert into star_log (user_id, lesson_id, subject_id, kind, stars)
      values (p_user, p_lesson, v_subj, 'read', r.w_read)
      on conflict do nothing;
      get diagnostics v_rows = row_count; v_n := v_n + v_rows;
    end if;
  end if;

  -- الفهم: الدرسُ أُتمّ — العتبةُ `pass_mark` نفسُها (رأس الملفّ ⑥)
  if r.w_quiz > 0 and not exists (select 1 from star_log s where s.user_id = p_user and s.lesson_id = p_lesson and s.kind = 'quiz') then
    if lesson_done_at(p_lesson, p_user) is not null then
      insert into star_log (user_id, lesson_id, subject_id, kind, stars)
      values (p_user, p_lesson, v_subj, 'quiz', r.w_quiz)
      on conflict do nothing;
      get diagnostics v_rows = row_count; v_n := v_n + v_rows;
    end if;
  end if;

  -- الكلمات: أصاب في `cards_pct` من بطاقات الكتاب بعد مهلةٍ من لقائها السابق (رأس الملفّ ⑦)
  if r.w_cards > 0 and not exists (select 1 from star_log s where s.user_id = p_user and s.lesson_id = p_lesson and s.kind = 'cards') then
    select count(distinct cl.card_id) into v_need from card_lessons cl where cl.lesson_id = p_lesson;
    if v_need > 0 then
      select count(distinct cl.card_id) into v_ok
        from card_lessons cl
        join card_review_log g on g.card_id = cl.card_id and g.user_id = p_user
       where cl.lesson_id = p_lesson
         and g.rating >= 2
         and g.elapsed_sec >= r.cards_gap_hours * 3600;
      if v_ok * 100 >= r.cards_pct * v_need then
        insert into star_log (user_id, lesson_id, subject_id, kind, stars)
        values (p_user, p_lesson, v_subj, 'cards', r.w_cards)
        on conflict do nothing;
        get diagnostics v_rows = row_count; v_n := v_n + v_rows;
      end if;
    end if;
  end if;

  return v_n;
end $$;
revoke all on function public.star_award(uuid, bigint) from public, anon, authenticated;

-- ⑦ المُطلِقات — كلٌّ يلتقط خطأه ولا يُسقط الواقعة (رأس الملفّ ④)
create or replace function public.star_on_progress()
returns trigger language plpgsql security definer
set search_path to 'public'
as $$
declare v_lesson bigint;
begin
  if new.completed_at is null then return null; end if;              -- فتحٌ بلا إتمام
  select i.lesson_id into v_lesson from items i where i.id = new.item_id and i.kind = 'text';
  if v_lesson is null then return null; end if;
  begin
    perform star_award(new.user_id, v_lesson);
  exception when others then
    insert into star_faults (source, user_id, lesson_id, err) values ('item_progress', new.user_id, v_lesson, sqlerrm);
  end;
  return null;
end $$;

create or replace function public.star_on_attempt()
returns trigger language plpgsql security definer
set search_path to 'public'
as $$
declare v_lesson bigint;
begin
  if coalesce(new.pct, 0) = 0 then return null; end if;               -- الإدراجُ قبل التصحيح (`pct` صفرٌ بالافتراض لا عدم)
  for v_lesson in
    select distinct i.lesson_id from items i where i.quiz_id = new.quiz_id and i.is_graded
  loop
    begin
      perform star_award(new.user_id, v_lesson);
    exception when others then
      insert into star_faults (source, user_id, lesson_id, err) values ('attempts', new.user_id, v_lesson, sqlerrm);
    end;
  end loop;
  return null;
end $$;

create or replace function public.star_on_review()
returns trigger language plpgsql security definer
set search_path to 'public'
as $$
declare v_lesson bigint;
begin
  if new.rating < 2 then return null; end if;                          -- النسيانُ لا يمنح شيئاً
  for v_lesson in
    select distinct cl.lesson_id
      from card_lessons cl
      join lessons l on l.id = cl.lesson_id
      join star_rules s on s.subject_id = l.subject_id and s.active
     where cl.card_id = new.card_id
  loop
    begin
      perform star_award(new.user_id, v_lesson);
    exception when others then
      insert into star_faults (source, user_id, lesson_id, err) values ('card_review_log', new.user_id, v_lesson, sqlerrm);
    end;
  end loop;
  return null;
end $$;

revoke all on function public.star_on_progress() from public, anon, authenticated;
revoke all on function public.star_on_attempt()  from public, anon, authenticated;
revoke all on function public.star_on_review()   from public, anon, authenticated;

drop trigger if exists star_progress on public.item_progress;
create trigger star_progress after insert or update of completed_at, seconds_spent on public.item_progress
  for each row execute function public.star_on_progress();

drop trigger if exists star_attempt on public.attempts;
create trigger star_attempt after insert or update of pct on public.attempts
  for each row execute function public.star_on_attempt();

drop trigger if exists star_review on public.card_review_log;
create trigger star_review after insert on public.card_review_log
  for each row execute function public.star_on_review();

-- ⑧ القراءة — نجومُ الطالب في مادّة: المجموعُ والكتبُ المتقنة والكلماتُ المقروءة ونجومُ كلّ كتاب
create or replace function public.my_stars(p_subject bigint)
returns jsonb
language sql stable security definer
set search_path to 'public'
as $$
  select case when auth.uid() is null then null else jsonb_build_object(
    'rule', (select jsonb_build_object('read', s.w_read, 'quiz', s.w_quiz, 'cards', s.w_cards)
               from star_rules s where s.subject_id = p_subject and s.active),
    'total', (select coalesce(sum(g.stars), 0) from star_log g
               where g.user_id = auth.uid() and g.subject_id = p_subject),
    'books', (select count(*) from star_log g
               where g.user_id = auth.uid() and g.subject_id = p_subject and g.kind = 'quiz'),
    -- كلماتُ ما قُرئ قراءةَ قارئ — ونصٌّ بلا متنٍ في القاعدة يُعدّ صفراً (رأس الملفّ ⑤)
    'words', (select coalesce(sum(word_count(i.body)), 0)
                from star_log g join items i on i.lesson_id = g.lesson_id and i.kind = 'text'
               where g.user_id = auth.uid() and g.subject_id = p_subject and g.kind = 'read'),
    'lessons', coalesce((select jsonb_object_agg(x.lesson_id::text, x.kinds) from (
                  select g.lesson_id, jsonb_object_agg(g.kind, g.stars) kinds
                    from star_log g where g.user_id = auth.uid() and g.subject_id = p_subject
                   group by g.lesson_id) x), '{}'::jsonb)
  ) end;
$$;
revoke all on function public.my_stars(bigint) from public, anon;
grant execute on function public.my_stars(bigint) to authenticated;

-- ⑨ البذور — المكتبتان (`family = 'reading'`) بالأوزان المعتمدة
insert into public.star_rules (subject_id)
select id from public.subjects where family = 'reading'
on conflict (subject_id) do nothing;

-- ⑩ ما سبق الملفَّ — يُمنح بأثرٍ رجعيٍّ مرّةً، وتاريخُه يومُ التطبيق لا يومُ الواقعة.
--    (قِيس ٢٢ نوفمبر: صفرُ طالبٍ له مستوًى في المكتبة — فالمتوقَّعُ صفر.) والإعادةُ لا تكتب شيئاً: الفريد.
do $$
declare x record;
begin
  for x in
    select distinct u.user_id, u.lesson_id from (
      select pr.user_id, i.lesson_id from item_progress pr join items i on i.id = pr.item_id
       where pr.completed_at is not null and i.kind = 'text'
      union
      select a.user_id, i.lesson_id from attempts a join items i on i.quiz_id = a.quiz_id and i.is_graded
       where a.pct > 0
      union
      select g.user_id, cl.lesson_id from card_review_log g join card_lessons cl on cl.card_id = g.card_id
    ) u
    join lessons l on l.id = u.lesson_id
    join star_rules s on s.subject_id = l.subject_id and s.active
    join profiles p on p.id = u.user_id and p.role = 'student'
  loop
    perform public.star_award(x.user_id, x.lesson_id);
  end loop;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('224', 'نجومُ المكتبة — سجلٌّ يُلحَق ولا يُعدَّل، تكتبه القاعدةُ لحظةَ الواقعة', now())
on conflict (n) do update set applied_at = now();
