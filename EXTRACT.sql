-- ═══════════════════════════════════════════════════════════════════════
-- بيان · استعلامات الاستخراج
--
-- هذا الملفّ لا يُشغَّل كاملاً. كلُّ استعلامٍ فيه يُنسخ وحده إلى
-- Supabase SQL Editor، ومخرَجه يُلصق في القسم المقابل من 00_schema.sql
--
-- كلٌّ منها يُرجع خانةً واحدة (إلا ⑨ فسبعة صفوف).
-- وسِّع الخانة في المحرّر وانسخ محتواها كما هو.
--
-- 🔑 القاعدة هي المصدر · وهذا الملفّ هو الطريق إليها ·
--    و00_schema.sql هو المخرَج. لا تُحرّر المخرَج بيدك.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══ ② الجداول ══════════════════════════════════════════════════════
select string_agg(ddl, E'\n\n' order by nm) as ddl from (
  select c.relname as nm,
         'create table public.'||c.relname||' ('||E'\n  '||
         string_agg(
           a.attname||' '||format_type(a.atttypid, a.atttypmod)||
           coalesce(' default '||pg_get_expr(d.adbin, d.adrelid), '')||
           case when a.attnotnull then ' not null' else '' end,
           E',\n  ' order by a.attnum)||E'\n);' as ddl
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    join pg_attribute a on a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
    left join pg_attrdef d on d.adrelid = c.oid and d.adnum = a.attnum
   where n.nspname = 'public' and c.relkind = 'r'
   group by c.relname) t;


-- ═══ ③ القيود والفهارس ═════════════════════════════════════════════
--
-- 🔴 الفهارس التي يُنشئها قيدٌ مستبعَدةٌ هنا عمداً.
--    القيد PRIMARY KEY يُنشئ فهرسه بنفسه، فإدراج CREATE UNIQUE INDEX
--    بالاسم نفسه قبله يجعل الأمرين يتصادمان.
--
-- 🔑 والترتيب: المفاتيح الأولية والفريدة أوّلاً، ثم الفحوص،
--    ثم المفاتيح الأجنبية — لأنّها تشير إلى ما قبلها.

select string_agg(ddl, E'\n' order by ord, ddl) as ddl from (
  select case con.contype when 'p' then 1 when 'u' then 2
                          when 'c' then 3 else 4 end as ord,
         'alter table public.'||t.relname||' add constraint '||con.conname||' '||
         pg_get_constraintdef(con.oid)||';' as ddl
    from pg_constraint con
    join pg_class t on t.oid = con.conrelid
    join pg_namespace n on n.oid = t.relnamespace
   where n.nspname = 'public'
  union all
  select 5, i.indexdef||';'
    from pg_indexes i
   where i.schemaname = 'public'
     and not exists (
       select 1 from pg_constraint c
       join pg_class ic on ic.oid = c.conindid
       join pg_namespace nn on nn.oid = ic.relnamespace
       where nn.nspname = 'public' and ic.relname = i.indexname)
) t;


-- ═══ ④ الدوالّ ═════════════════════════════════════════════════════
select string_agg(pg_get_functiondef(p.oid)||';', E'\n\n' order by p.proname) as ddl
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public' and p.prokind in ('f','p')
   and not exists (select 1 from pg_depend d where d.objid = p.oid and d.deptype = 'e');


-- ═══ ⑤ العروض ══════════════════════════════════════════════════════
select string_agg('create or replace view public.'||c.relname||' as'||E'\n'||
                  pg_get_viewdef(c.oid, true), E'\n\n' order by c.relname) as ddl
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public' and c.relkind in ('v','m');


-- ═══ ⑥ الزنادات ════════════════════════════════════════════════════
--
-- ⚠️ يشمل سكيما auth (زناد on_auth_user_created).
--    واحذف من المخرَج الزنادات الحدثية التي تُنشئها Supabase:
--    issue_* و pgrst_* — دوالُّها ليست في القسم ④ فتشير إلى عدم.
--    الذي يخصّك: ensure_rls وحده.

select string_agg(ddl, E'\n' order by ddl) as ddl from (
  select pg_get_triggerdef(tg.oid)||';' as ddl
    from pg_trigger tg
    join pg_class c on c.oid = tg.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname in ('public','auth') and not tg.tgisinternal
  union all
  select 'create event trigger '||et.evtname||' on '||et.evtevent||
         ' execute function public.'||p.proname||'();'
    from pg_event_trigger et
    join pg_proc p on p.oid = et.evtfoid
) t;


-- ═══ ⑦ تفعيل RLS والسياسات ═════════════════════════════════════════
select string_agg(ddl, E'\n' order by ord, ddl) as ddl from (
  select 1 as ord,
         'alter table public.'||c.relname||' enable row level security;' as ddl
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity
  union all
  select 2,
         'create policy '||quote_ident(policyname)||' on public.'||tablename||
         ' for '||cmd||' to '||array_to_string(roles, ', ')||
         coalesce(' using ('||qual||')', '')||
         coalesce(' with check ('||with_check||')', '')||';'
    from pg_policies where schemaname = 'public'
) t;


-- ═══ ⑨ البيانات المرجعية — سبعة صفوف بالترتيب ══════════════════════
--
-- 🔑 الترتيب اعتمادٌ لا ذوق: scales قبل levels و paths،
--    وهذه قبل subjects، وكلُّها قبل courses.

select 1 as ord, 'dx_codes' as tbl,
  (select 'insert into public.dx_codes (code, name, remedy, family) values'||E'\n'||
     string_agg(format('  (%L, %L, %L, %L)', code, name, remedy, family),
                E',\n' order by family, code)||
     E'\non conflict (code) do nothing;' from public.dx_codes) as ddl

union all select 2, 'item_kinds',
  (select 'insert into public.item_kinds (code, label_ar, icon, needs, sort_order, active) values'||E'\n'||
     string_agg(format('  (%L, %L, %L, %L, %s, %L)', code, label_ar, icon, needs, sort_order, active),
                E',\n' order by sort_order)||
     E'\non conflict (code) do nothing;' from public.item_kinds)

union all select 3, 'scales',
  (select 'insert into public.scales (id, code, name, kind, sort_order, country, track) values'||E'\n'||
     string_agg(format('  (%s, %L, %L, %L, %s, %L, %L)', id, code, name, kind, sort_order, country, track),
                E',\n' order by id)||
     E'\non conflict (id) do nothing;' from public.scales)

union all select 4, 'levels',
  (select 'insert into public.levels (id, scale_id, code, name, rank, min_score, max_score) values'||E'\n'||
     string_agg(format('  (%s, %s, %L, %L, %s, %s, %s)', id, scale_id, code, name, rank,
                coalesce(min_score::text,'null'), coalesce(max_score::text,'null')),
                E',\n' order by id)||
     E'\non conflict (id) do nothing;' from public.levels)

union all select 5, 'paths',
  (select 'insert into public.paths (id, scale_id, code, name, from_rank, sort_order, active) values'||E'\n'||
     string_agg(format('  (%s, %s, %L, %L, %s, %s, %L)', id, scale_id, code, name,
                coalesce(from_rank::text,'null'), sort_order, active),
                E',\n' order by id)||
     E'\non conflict (id) do nothing;' from public.paths)

union all select 6, 'subjects',
  (select 'insert into public.subjects (id, code, name, sort_order, active, scale_id, family, placement, progression, description, icon) values'||E'\n'||
     string_agg(format('  (%s, %L, %L, %s, %L, %s, %L, %L, %L, %L, %L)', id, code, name, sort_order,
                active, coalesce(scale_id::text,'null'), family, placement, progression, description, icon),
                E',\n' order by id)||
     E'\non conflict (id) do nothing;' from public.subjects)

union all select 7, 'courses',
  (select 'insert into public.courses (id, subject_id, level_id, path_id, title, elective_group, position, active) values'||E'\n'||
     string_agg(format('  (%s, %s, %s, %s, %L, %s, %s, %L)', id, subject_id,
                coalesce(level_id::text,'null'), coalesce(path_id::text,'null'), title,
                coalesce(elective_group::text,'null'), position, active),
                E',\n' order by id)||
     E'\non conflict (id) do nothing;' from public.courses)

order by 1;


-- ═══════════════════════════════════════════════════════════════════════
-- أقسامٌ لا تُستخرَج — مكتوبةٌ بيدك في 00_schema.sql
--
--   ①أ ①ب  التسلسلات  — ثابتة، لا تتغيّر إلا بجدولٍ جديد
select 1 as ord, '-- ①أ' as القسم,
       string_agg(format('create sequence if not exists public.%s;', c.relname),
                  E'\n' order by c.relname) as النصّ
  from pg_class c
 where c.relkind = 'S' and c.relnamespace = 'public'::regnamespace

union all
select 2, '-- ①ب',
       string_agg(format('alter sequence public.%-28s owned by public.%s.%s;',
                         c.relname, t.relname, a.attname), E'\n' order by c.relname)
  from pg_class c
  join pg_depend d   on d.objid = c.oid and d.deptype = 'a'
  join pg_class t    on t.oid = d.refobjid
  join pg_attribute a on a.attrelid = t.oid and a.attnum = d.refobjsubid
 where c.relkind = 'S'

union all
select 3, '-- ⑦ تفعيل RLS',
       string_agg(format('alter table public.%s enable row level security;', tablename),
                  E'\n' order by tablename)
  from pg_tables where schemaname = 'public' and rowsecurity

union all
select 4, '-- ⑦ السياسات',
       string_agg(format('create policy %s on public.%s%s%s%s;',
         quote_ident(policyname), tablename,
         case when cmd = 'ALL' then '' else E'\n  for ' || lower(cmd) end,
         case when qual is null then '' else E'\n  using (' || qual || ')' end,
         case when with_check is null then '' else E'\n  with check (' || with_check || ')' end),
         E'\n\n' order by tablename, policyname)
  from pg_policies where schemaname = 'public'

union all
select 5, '-- ⑩ العدّادات',
       string_agg(format(
         'select setval(''public.%s'', coalesce((select max(%s) from %s), 1), true);',
         c.relname, a.attname, t.relname), E'\n' order by c.relname)
  from pg_class c
  join pg_depend d   on d.objid = c.oid and d.deptype = 'a'
  join pg_class t    on t.oid = d.refobjid
  join pg_attribute a on a.attrelid = t.oid and a.attnum = d.refobjsubid
 where c.relkind = 'S'

order by 1;
--   ⑧      الصلاحيات  — تُكتب مُحكَمة لا كما هي
--   ⑩      setval     — مشتقّ من قائمة التسلسلات
--   ⑪      التخزين    — سطرُ الجرّة وأربع سياسات
--
-- وللتحقّق من أنّ شيئاً لم يفت، شغّل هذا قبل كلّ استخراج شامل:
--   select schemaname, count(*) from pg_policies group by 1 order by 1;
-- المتوقَّع: public و storage فقط. وأيّ سكيما ثالثة ⇒ قسمٌ ناقص.
-- ═══════════════════════════════════════════════════════════════════════
