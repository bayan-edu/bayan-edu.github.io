-- ═══════════════════════════════════════════════════════════════════════
-- 154 · إحكام EXECUTE — الدَّينُ الذي حُجز له الرقم 58 ولم يُكتب له نصّ
--
-- 🔴 **المسألة مقيسةٌ لا منقولة:** بوستجريس يمنح `EXECUTE` إلى `PUBLIC`
--    على كلّ دالّةٍ جديدة، وسوبابيس يمنح `anon` بالافتراضيّ (`pg_default_acl`)
--    ⇒ **كلُّ دالّةٍ في `public` يناديها أيُّ زائرٍ عبر PostgREST** — بما
--    فيها `admin_decide`. والحراسةُ اليوم داخل الدوالّ وحدها: **طبقةٌ
--    واحدة حيث ينبغي طبقتان.**
--
-- 📌 **وهو تعميمُ ما فعله `118` في دالّتين**، وهو الذي سمّى الفخّين بنصّه:
--    «السحبُ من الثلاثة ثمّ منحٌ صريحٌ يُقصد». فسابقةٌ تُطبَّق لا نمطٌ يُخترع.
--
-- ═══ ثلاثةُ فخاخٍ كشفتها التجربةُ الجافّة قبل التطبيق ═══
--
-- 🔴 **① تعبيرُ السياسة يُقيَّم بصلاحية المنادي.** عشرُ دوالَّ تسكن في
--    `pg_policies` و`pg_attrdef` و`pg_constraint` و`pg_indexes`. وسحبُ
--    `is_admin` عن `authenticated` **يُعطِّل قراءةَ كلّ جدولٍ عليه سياسةٌ
--    تذكرها** — لا يمنع المديرَ وحده. **وسياساتُ المشروع كلُّها `to public`**
--    (قيس: الأدوارُ المستعملة `authenticated` و`public` لا غير) ⇒ تُقيَّم
--    بصلاحية `anon` أيضاً حين يقرأ.
--
-- 🔴 **② و`pg_trgm` يسكن `public` لا `extensions`** — واحدٌ وثلاثون دالّة
--    (`similarity` · `gtrgm_*` · `word_similarity` · `set_limit`…). وسحبُها
--    يمسّ البحثَ والفهارس بلا أن يسدّ ثغرة: **دوالُّ رياضياتٍ على نصّ لا
--    سطحَ هجوم.** ⇒ **كلُّ ما يملكه امتدادٌ يُستثنى** (`pg_depend.deptype='e'`).
--
-- 🔴 **③ ودالّةُ `security invoker` تُورّث الفحصَ لمن تنادي.** `search_ar`
--    تسكن في فهرسٍ وهي `invoker`، ومثلُها `card_key` و`can_see_item`.
--    فمنحُها وحدها لا يكفي: **جسدُها يجري بصلاحية المنادي، فما تناديه
--    يُفحَص.** ⇒ لا تُكتب القائمةُ بيد، بل **يُحسب الإغلاقُ التعدّيّ**:
--    يُمشى على حافات النداء، و`invoker` تُورّث، و`definer` **تقطع** لأنّها
--    تعمل بهوية مالكها.
--    ⚠️ والنمطُ النصّيُّ يرى الحافات لأنّه قيس: **صفرُ دالّةِ `invoker`
--       فيها SQL ديناميّ** (٢٧ من ١٦٥ دالّةً `invoker`، ولا `execute` في
--       واحدةٍ منها). ولو وُجدت لَما رآها النمط، ولوجب استثناؤها بيد.
--
-- ═══ المصادر — كلُّها مقيسة ═══
--   · **بذرةُ الزائر:** دوالُّ التعبير العشر + بابا التدرّب (منحُهما صريحٌ
--     من `118` ويُعاد تأكيدُه) + `signup_subjects` لأنّ نموذج التسجيل
--     **يُعرض قبل أن يكون للزائر حساب**.
--     📌 وقيس أنّ التدرّب لا يحتاج رابعة: البطاقاتُ تأتي **داخل لقطة**
--        `open_practice_session` لا بنداءٍ مستقلّ (`practice.js:41` · `:47`).
--   · **بذرةُ المسجَّل:** ما تناديه `js/api.js` — ٩٦ دالّة، **وهي الطبقةُ
--     الوحيدة التي تلمس القاعدة** (الثابت ①، وفُحص: صفرُ `db.` خارجها،
--     وصفرُ ملفٍّ في `sims/` أو `tools/` أو `*.html` يلمس Supabase).
--   · **وما بقي يُغلق.** ومنه `admin_log` — **حِرزُها أن تبقى بلا منح**
--     (152)، ودوالُّ تُنادى من جوف `definer` فلا تحتاج منحاً أصلاً.
--
-- 🔑 **ودوالُّ الزناد ليست في القائمة ولا تحتاجها:** `attempt_level_snapshot`
--    · `quiz_publish_guard` · `strands_guard` — صلاحيةُ دالّة الزناد تُفحَص
--    **عند `create trigger` لا عند إطلاقه.**
-- 🔒 و`postgres` و`service_role` خارج السحب كلِّه — مسارُ الطوارئ باقٍ.
--
-- ⚠️ **وما يسقط هنا يسقط صامتاً:** دالّةٌ فاتت الحسابَ تردّ
--    `permission denied for function` عند أوّل نقرةٍ عليها، لا عند التطبيق.
--    ⇒ القسم ③ **شرطُ تصديق هذا الملفّ**، والعلاجُ سطرُ منحٍ واحد لا
--    تراجعٌ عن الملفّ كلّه.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════
-- ① السحبُ ثمّ المنح — والإغلاقُ يُحسب ولا يُكتب بيد
--    🔑 والحلقةُ بالاسم لا بالتوقيع عمداً: **الدالّةُ المحمَّلة زائداً
--       تأخذ حكمَ اسمها كلِّه**، فلا تنجو نسخةٌ وتسقط أختُها.
-- ═══════════════════════════════════════════════════════════════════════

do $do$
declare
  /* بذرةُ الزائر — عشرُ دوالِّ تعبيرٍ وثلاثةُ أبوابٍ مفتوحةٍ بقصد */
  v_anon_seed text[] := array[
    'can_access', 'can_access_lesson', 'can_edit_quiz', 'can_see_deck',
    'can_see_item', 'card_key', 'is_admin', 'is_teacher', 'search_ar', 'teaches',
    'open_practice_session', 'submit_practice_answer', 'signup_subjects'];

  /* بذرةُ المسجَّل — ما تناديه js/api.js (٩٦) */
  v_ui_seed text[] := array[
    'accept_policy', 'add_my_card', 'admin_audit_list', 'admin_curators',
    'admin_decide', 'admin_health', 'admin_overview', 'admin_requests',
    'admin_set_curator', 'admin_set_role', 'admin_set_teacher_subjects',
    'admin_users', 'attach_passage', 'auth_claims_present',
    'author_lessons', 'author_tree', 'browse_deck', 'choose_mentor',
    'clear_variant', 'cohort_performance', 'create_practice_session',
    'deck_cards', 'delete_card', 'delete_deck', 'delete_item',
    'delete_passage', 'delete_question', 'delete_quiz', 'delete_route',
    'delete_strand', 'due_cards', 'due_counts', 'duplicate_question',
    'game_board', 'get_quiz', 'import_quiz', 'lesson_items', 'list_lessons',
    'list_mentors', 'list_strands', 'list_subjects',
    'list_teachable_subjects', 'list_tools', 'mark_author_verified',
    'mark_feedback_read', 'my_counts', 'my_mentor', 'my_practice_sessions',
    'my_role', 'objectives_for_quiz', 'objectives_tree',
    'open_practice_session', 'placement_start', 'placement_submit',
    'practice_cards', 'publish_lesson', 'publish_quiz', 'quiz_detail',
    'quiz_for_edit', 'quiz_readiness', 'register_teacher', 'reorder_items',
    'reorder_questions', 'request_teacher_access', 'retire_question',
    'review_card', 'save_card', 'save_cards', 'save_deck',
    'save_game_score', 'save_item', 'save_lesson', 'save_my_note',
    'save_objective', 'save_passage', 'save_question', 'save_quiz',
    'save_route', 'save_strand', 'save_unit', 'search_all', 'set_my_grade',
    'set_my_subjects', 'set_section', 'set_subject_capacity', 'set_variant',
    'signup_subjects', 'student_dx', 'student_performance',
    'students_overview', 'subject_decks', 'submit_attempt',
    'submit_practice_answer', 'subscribe_cards', 'tool_routes',
    'track_item'];

  v_anon text[]; v_auth text[];
  r record; n_all int := 0; n_a int := 0; n_u int := 0; n_shut int := 0;
begin
  /* الإغلاقُ التعدّيّ للزائر — حافةٌ تُتبع من invoker وحدها */
  with recursive
  fns as (select p.proname::text nm, p.prosecdef, pg_get_functiondef(p.oid) def
            from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
           where ns.nspname = 'public' and p.prokind = 'f'
             and not exists (select 1 from pg_depend d
                              where d.objid = p.oid and d.deptype = 'e')),
  walk(nm) as (
    select (unnest(v_anon_seed) collate "C")
    union
    select (f2.nm collate "C") from walk w
      join fns f1 on f1.nm = w.nm and not f1.prosecdef
      join fns f2 on f1.def ~ ('\m' || f2.nm || '\s*\(') and f2.nm <> f1.nm)
  select array_agg(distinct nm) into v_anon from walk;

  /* ونظيرُه للمسجَّل — بذرتُه بذرةُ الزائر وما تناديه الواجهة */
  with recursive
  fns as (select p.proname::text nm, p.prosecdef, pg_get_functiondef(p.oid) def
            from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
           where ns.nspname = 'public' and p.prokind = 'f'
             and not exists (select 1 from pg_depend d
                              where d.objid = p.oid and d.deptype = 'e')),
  walk(nm) as (
    select (unnest(v_anon_seed || v_ui_seed) collate "C")
    union
    select (f2.nm collate "C") from walk w
      join fns f1 on f1.nm = w.nm and not f1.prosecdef
      join fns f2 on f1.def ~ ('\m' || f2.nm || '\s*\(') and f2.nm <> f1.nm)
  select array_agg(distinct nm) into v_auth from walk;

  for r in
    select p.oid::regprocedure::text as sig, p.proname::text as nm
      from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
     where ns.nspname = 'public' and p.prokind = 'f'
       and not exists (select 1 from pg_depend d           -- ② الامتدادات تُستثنى
                        where d.objid = p.oid and d.deptype = 'e')
     order by p.proname
  loop
    n_all := n_all + 1;
    execute format('revoke all on function %s from public, anon, authenticated', r.sig);

    if r.nm = any(v_anon) then
      execute format('grant execute on function %s to anon, authenticated', r.sig);
      n_a := n_a + 1;
    elsif r.nm = any(v_auth) then
      execute format('grant execute on function %s to authenticated', r.sig);
      n_u := n_u + 1;
    else
      n_shut := n_shut + 1;
    end if;
  end loop;

  raise notice 'دوالُّ المشروع: % · للزائر: % · للمسجَّل: % · مغلقة: %',
    n_all, n_a, n_u, n_shut;
end $do$;


-- ═══════════════════════════════════════════════════════════════════════
-- ② الحارسُ الدائم — ودونه يُنقَض الملفُّ بأوّل دالّةٍ تُكتب بعده
--    🔑 ونظيرُه قائمٌ في المشروع: `rls_auto_enable` تقفل RLS على كلّ
--       جدولٍ جديد. فهذا أخوها في الدوالّ.
--    ⚠️ **ولا يسحب من `authenticated` عمداً:** ملفٌّ جديد يكتب `grant`
--       صريحاً لمن يحتاج، فلا يُفاجأ بسقوط ما منحه لتوّه. والمقصودُ
--       `PUBLIC` و`anon` — وهما البابُ الذي لا يُغلق بيد.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.fn_auto_lock()
returns event_trigger language plpgsql security definer set search_path to 'public'
as $fn$
declare o record;
begin
  for o in select * from pg_event_trigger_ddl_commands()
            where command_tag = 'CREATE FUNCTION' and schema_name = 'public'
  loop
    execute format('revoke all on function %s from public, anon', o.object_identity);
  end loop;
end $fn$;

drop event trigger if exists fn_auto_lock_trg;
create event trigger fn_auto_lock_trg on ddl_command_end
  when tag in ('CREATE FUNCTION') execute function public.fn_auto_lock();

/* 🔴 والحارسُ لا يحرس نفسَه: وُلد **قبل** أن يُركَّب مُطلِقُه، وبعد أن
   مرّت حلقةُ ① ⇒ نال منحَ `PUBLIC` الافتراضيّ. وقيس بعد التطبيق:
   ظهر في قائمة «ما بقي مفتوحاً للزائر» سابعَ عشرَ بين الستّ عشرة.
   **وهو بابٌ لا يُدخل منه** (نوعُها `event_trigger` لا تُنادى من
   PostgREST)، **لكنّ قائمةً فيها ما لا يُفسَّر تُدرِّب على التغاضي.** */
revoke all on function public.fn_auto_lock() from public, anon, authenticated;

comment on function public.fn_auto_lock() is
  'يسحب منحَ PUBLIC و anon عن كلّ دالّةٍ جديدة في public (154) — أخو '
  'rls_auto_enable في الجداول. ولا يمسّ authenticated عمداً.';


-- ═══════════════════════════════════════════════════════════════════════
-- ③ الفحص — شرطُ تصديق هذا الملفّ. والسطرُ الأوّل هو الحاسم.
-- ═══════════════════════════════════════════════════════════════════════
/*
select 'دوالٌّ تناديها الواجهة ولا يبلغها المسجَّل' as الفحص,
       coalesce((select string_agg(x, ' · ') from unnest(array[
         'my_role','list_subjects','get_quiz','submit_attempt','my_counts','search_all',
         'student_performance','cohort_performance','students_overview','review_card',
         'admin_users','admin_health','save_quiz','track_item','quiz_readiness',
         'author_tree','list_lessons','my_mentor','choose_mentor','due_cards']) x
         where not exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
                            where n.nspname='public' and p.proname=x
                              and has_function_privilege('authenticated', p.oid,'execute'))),
       '✅ صفر — لا شاشةَ انكسرت') as الحكم
union all
select 'بابُ الزائر مفتوحٌ كما كان',
       (select count(distinct p.proname)::text || ' / 3' from pg_proc p
          join pg_namespace n on n.oid=p.pronamespace where n.nspname='public'
          and p.proname in ('open_practice_session','submit_practice_answer','signup_subjects')
          and has_function_privilege('anon', p.oid,'execute'))
union all
select 'دوالُّ التعبير تبلغ الزائرَ والمسجَّل',
       (select count(distinct p.proname)::text || ' / 10' from pg_proc p
          join pg_namespace n on n.oid=p.pronamespace where n.nspname='public'
          and p.proname in ('can_access','can_access_lesson','can_edit_quiz','can_see_deck',
              'can_see_item','card_key','is_admin','is_teacher','search_ar','teaches')
          and has_function_privilege('anon', p.oid,'execute')
          and has_function_privilege('authenticated', p.oid,'execute'))
union all
select 'pg_trgm لم يُمسّ',
       (select count(*)::text || ' دالّةَ امتدادٍ بمنحها' from pg_proc p
          join pg_namespace n on n.oid=p.pronamespace
          join pg_depend d on d.objid=p.oid and d.deptype='e'
         where n.nspname='public' and has_function_privilege('anon', p.oid,'execute'))
union all
select 'admin_log ما زالت بلا منح',
       case when has_function_privilege('authenticated','public.admin_log(text,uuid,jsonb,jsonb,text)','execute')
            then '🔴' else '✅' end
union all
select 'make_admin ما زالت مغلقة (151 · 153)',
       case when has_function_privilege('anon','public.make_admin(text)','execute')
             or has_function_privilege('authenticated','public.make_admin(text)','execute')
            then '🔴' else '✅' end
union all
select 'ما بقي مفتوحاً للزائر — يُقرأ اسماً اسماً',
       (select coalesce(string_agg(distinct p.proname, ' · ' order by p.proname), 'لا شيء')
          from pg_proc p join pg_namespace n on n.oid=p.pronamespace
         where n.nspname='public' and p.prokind='f'
           and not exists (select 1 from pg_depend d where d.objid=p.oid and d.deptype='e')
           and has_function_privilege('anon', p.oid,'execute'))
union all
select 'الحارسُ الدائم مركَّب',
       case when exists (select 1 from pg_event_trigger where evtname='fn_auto_lock_trg')
            then '✅' else '🔴' end;
*/


-- ═══════════════════════════════════════════════════════════════════════
-- ④ السجلّ — ومعه 58: الرقمُ المحجوز يُغلق بسببه لا يُترك حرّاً
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('154', 'إحكام EXECUTE — سحبٌ من PUBLIC و anon ومنحٌ محسوبٌ بالإغلاق التعدّيّ', now())
on conflict (n) do update set applied_at = now();

insert into public.sql_log (n, title, note)
values ('58', '⛔ محجوز ولا ملفّ له',
  'نيّةُ إحكام EXECUTE نُفِّذت في 154 بإغلاقٍ تعدّيٍّ محسوبٍ من js/api.js ومن pg_policies، مع استثناء دوالّ الامتدادات. يبقى هذا الصفُّ شاهداً أنّ 58 ليس حرّاً.')
on conflict (n) do update set note = excluded.note;
