-- ══════════════════════════════════════════════════════════════════════
--  ١٨٦ · أبوابُ الزائر تعود — والحارسُ يقفل الجديدَ ولا يمسّ المُعاد
-- ══════════════════════════════════════════════════════════════════════
--
--  وُجد بعد تطبيق 185 (٢٦ أكتوبر) في فرق المستشار: سقط `can_access` من قائمة ما يبلغه الزائر،
--  ولم يكتب 185 سطراً واحداً يمسّ منحَه.
--
--  🔴 **والسببُ في الحارس لا في الملفّات:** `fn_auto_lock_trg` (154) يسحب `PUBLIC` و`anon` عند كلّ
--     `CREATE FUNCTION` في `public` — **و`create or replace` يحمل الوسمَ نفسَه.** فكلُّ ملفٍّ أعاد كتابةَ
--     دالّةٍ من قائمة الزائر نقضَ 154 فيها بصمت. وقِيس الحيّ: خمسٌ سقطت من ستَّ عشرة —
--       · `open_practice_session` (157 · ١٠ أكتوبر) و`submit_practice_answer` (163 · ١٩ أكتوبر)
--         **⇒ جلسةُ التدرّب للزائر معطّلةٌ منذ ١٠ أكتوبر:** فتحُ الرابط يردّ
--         «permission denied for function open_practice_session» (`practice.js:41`).
--       · `can_see_deck` (157) · `can_access_lesson` (184) · `can_access` (185) — دوالُّ تعبيرٍ في سياسات
--         `items` و`questions` و`options` و`passages`: قراءةُ الزائر لها تقع في الخطأ نفسه لا في صفرِ صفّ.
--
--  وحكمان:
--  ① **الإغلاقُ يُحسب كما حسبه 154 ولا يُكتب بيد** — البذرةُ نفسُها بحرفها، والحلقةُ على الدوالّ الحيّة اليوم
--     (ستَّ عشرةَ دالّةً كما قال 154). **ومنحٌ لا سحب:** ما ينقص الزائرَ من الإغلاق يُعطاه، ولا يُمسّ غيرُه.
--  ② **الحارسُ يقفل الجديدَ وحده.** الدالّةُ الجديدة تولد ومنحُ `PUBLIC` عليها (افتراضُ بوستجريس، وقِيس
--     `pg_default_acl` في `public`: يضيف إليه ولا يسحبه)، والمُعادةُ بـ`or replace` تحمل منحَها القديم كما هو —
--     و154 سحب `PUBLIC` عن الدوالّ كلِّها. ⇒ **وجودُ `PUBLIC` على الدالّة علامةُ ولادتها**، وبه يقفل الحارس.
--
--  📐 وما ليس هنا عمداً: لا سحبَ من أحد · ولا مساسَ بمنح `authenticated` · ولا بجدولَي `decks` و`card_game_scores`
--     (يردّان الزائرَ بالجدول لا بالدالّة — قِيس: «permission denied for table»، وهو حكمٌ سابق لا عطل).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① المنح — الإغلاقُ التعدّيّ من بذرة 154 بحرفها ═══════════════════

do $$
declare
  /* بذرةُ الزائر (154) — عشرُ دوالِّ تعبيرٍ وثلاثةُ أبوابٍ مفتوحةٍ بقصد */
  v_anon_seed text[] := array[
    'can_access', 'can_access_lesson', 'can_edit_quiz', 'can_see_deck',
    'can_see_item', 'card_key', 'is_admin', 'is_teacher', 'search_ar', 'teaches',
    'open_practice_session', 'submit_practice_answer', 'signup_subjects'];
  v_anon text[]; r record; n int := 0;
begin
  /* الإغلاقُ التعدّيّ للزائر — حافةٌ تُتبع من invoker وحدها (154 ③) */
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

  for r in
    select p.oid::regprocedure::text as sig
      from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
     where ns.nspname = 'public' and p.prokind = 'f' and p.proname = any(v_anon)
       and not exists (select 1 from pg_depend d where d.objid = p.oid and d.deptype = 'e')
       and not has_function_privilege('anon', p.oid, 'execute')
     order by p.proname
  loop
    execute format('grant execute on function %s to anon, authenticated', r.sig);
    n := n + 1;
  end loop;

  /* والملفُّ لا يُصدَّق بما لم يتمّ: إغلاقٌ ناقصٌ بعد المنح عطلٌ يُرفع لا يُسجَّل */
  if exists (select 1 from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
              where ns.nspname = 'public' and p.prokind = 'f' and p.proname = any(v_anon)
                and (not has_function_privilege('anon', p.oid, 'execute')
                     or not has_function_privilege('authenticated', p.oid, 'execute'))) then
    raise exception '186: الإغلاقُ ناقصٌ بعد المنح';
  end if;
  raise notice '186: الإغلاقُ % دالّة — وأُعيد للزائر منها %', array_length(v_anon, 1), n;
end $$;


-- ═══════════════════ ② الحارس — يقفل الجديدَ وحده (رأس الملفّ ②) ═══════════════════

create or replace function public.fn_auto_lock()
returns event_trigger language plpgsql security definer set search_path to 'public'
as $fn$
declare o record;
begin
  for o in select * from pg_event_trigger_ddl_commands()
            where command_tag = 'CREATE FUNCTION' and schema_name = 'public'
  loop
    /* 186 · منحُ PUBLIC علامةُ الولادة: الجديدةُ تحمله، والمُعادةُ بـ or replace تحمل منحَها القديم
       بلا PUBLIC (154 سحبه عن الدوالّ كلِّها) — فلا يُسحب منها anon مُنح بقصد */
    if exists (select 1 from pg_proc p, aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                where p.oid = o.objid and a.grantee = 0 and a.privilege_type = 'EXECUTE') then
      execute format('revoke all on function %s from public, anon', o.object_identity);
    end if;
  end loop;
end $fn$;

comment on function public.fn_auto_lock() is
  'يسحب منحَ PUBLIC و anon عن كلّ دالّةٍ جديدة في public (154) — والجديدةُ وحدها: المُعادةُ بـ or replace '
  'تحمل منحَها القديم (186). أخو rls_auto_enable في الجداول، ولا يمسّ authenticated عمداً.';


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('186', 'أبوابُ الزائر تعود — والحارسُ يقفل الجديدَ ولا يمسّ المُعاد', now())
on conflict (n) do update set applied_at = now();
