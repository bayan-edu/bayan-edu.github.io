-- ═══════════════════════════════════════════════════════════════════════
-- 164 · كودُ التشخيص اختياريٌّ على المشتّت — وغيابُه نقصُ معرفةٍ يحمله الهدف
--
-- ⚠️ الرقم مقروءٌ من sql_log يوم ١٩ أكتوبر ٢٠٢٦ (آخر مطبَّق 163).
--
-- لماذا (قرار المالك · ١٩ أكتوبر):
--   إثباتُ المعلوم بالضرورة حشو. السؤالُ مربوطٌ بهدفه، فاختيارُ مشتّتٍ
--   بلا كودٍ يعني بالضرورة أنّ الخلل في المعرفة أو في جوهر الهدف — لا في
--   التفكير. فلا علامةَ تقول ذلك، ولا كودَ ينوب عنه (سقط FACT ثمّ LEARN
--   ثمّ العلامة)، ولا إلزامَ بكودٍ لكلّ مشتّت: فهو عبءُ تعبئةٍ على من لا
--   يقصدها، وما يُملأ إرضاءً للحارس كذبٌ على الطالب.
--   ⇒ الثابتُ القديم «كلُّ مشتّتٍ خاطئ يحتاج كود تشخيص» يصير:
--      «الكودُ لمشتّتٍ يكشف خللَ تفكير. وغيابُه يعني أنّ الخلل في المعرفة،
--       والهدفُ المربوطُ بالسؤال يحمله.»
--   (يُصحَّح في AGENTS.md §٣ و STATE ⑥ ومحرّر الاستيراد — خطوة الواجهة.)
--
-- ما يفعله:
--   ① save_question — يرفع رفضَ «كل خيار خاطئ يحتاج كود تشخيص» (مرّتين:
--      mcq · msq) · يقصر فحصَ «كود غير معروف» على كودٍ مكتوب · ولا يكتب
--      في dx_map مفتاحاً لمشتّتٍ بلا كود (كان يكتب null).
--   ② quiz_readiness — يرفع عائقَي النشر «خيار خاطئ بلا كود» (mcq · msq).
--      ويبقى «كود غير معروف» عائقاً كما هو.
--   ③ admin_health — يُسقط بندَ dx_missing: ليس عطلاً.
--   ④ authoring_gaps — يُسقط فجوةَ Q.NO_DX: ليست فجوة.
--   ⑤ يُفرّغ خانات FE · REG · PRO من dx_map (كانت ١٠٢٥ + ٣٢ + ٠) ويحذف
--      الثلاثة — بالشرط الذاتيّ نفسه في 163.
--
-- الدوالّ الأربع تُقرأ حيّةً بـ pg_get_functiondef وتُستبدل الكتلةُ المقصودة
--   وحدها بتعبيرٍ منتظم، وبعدّادٍ يرفض إن وجد الكتلةَ أكثرَ أو أقلّ ممّا
--   قِيس يوم الكتابة — فلا يُستبدل شيءٌ على الظنّ.
--
-- ما لا يفعله — ينتظر خطوته (الواجهة والعقد):
--   · editor_quiz.js: parseImport يعدّ «الخيار بلا كود» و«الخلط بلا كود»
--     مشكلةً (2499 · 2553 · 2584) — تصير معلومةً لا مشكلة. والقالبُ القديم.
--   · AGENTS.md §٣ · STATE ⑥ · مهارةُ bayan-sql-discipline §٧ · عقدُ المؤلّفين.
--   · submit_attempt لا تحتاج شيئاً: مشتّتٌ بلا مفتاح ⇒ dx_code = null.
--
-- قابلٌ لإعادة التشغيل: كلُّ كتلةٍ لا تجدها تُخبر وتمضي، والتفريغُ والحذف
--   لا يجدان ما يعملان فيه.
-- ═══════════════════════════════════════════════════════════════════════


-- ─── ① ② ③ ④ الدوالّ الأربع — معدَّلة ────────────────────────────────────

-- عدّادُ المطابقات — مؤقّتٌ في pg_temp، يزول بانتهاء الجلسة
create or replace function pg_temp.cnt164(src text, pat text) returns int
language sql immutable as $f$ select count(*)::int from regexp_matches($1, $2, 'g') $f$;

do $$
declare
  v text; n int; sig regprocedure;

  -- ── save_question ──
  p_sq_require text := $p$if exists \(select 1 from jsonb_array_elements\(p_options\) o\s+where not coalesce\(\(o->>'correct'\)::boolean, false\)\s+and coalesce\(trim\(o->>'dx'\), ''\) = ''\) then\s+return jsonb_build_object\('ok', false,\s+'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان'\);\s+end if;\s*$p$;
  p_sq_orphan  text := $p$where not coalesce\(\(o->>'correct'\)::boolean, false\)\s+and not exists \(select 1 from dx_codes d where d\.code = o->>'dx'\)$p$;
  r_sq_orphan  text := $r$where not coalesce((o->>'correct')::boolean, false)
       and coalesce(trim(o->>'dx'), '') <> ''
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')$r$;
  p_sq_vdx     text := $p$v_dx := v_dx \|\| jsonb_build_object\(v_oid::text, r\.o->>'dx'\);$p$;
  r_sq_vdx     text := $r$if coalesce(trim(r.o->>'dx'), '') <> '' then
          v_dx := v_dx || jsonb_build_object(v_oid::text, trim(r.o->>'dx'));
        end if;$r$;
  -- ── quiz_readiness ──
  p_qr_mcq text := $p$select count\(\*\) into n from options o\s+join questions x on x\.id = o\.question_id\s+join question_keys k on k\.question_id = x\.id\s+where x\.quiz_id = p_quiz and x\.retired_at is null and x\.kind='mcq' and o\.id is distinct from k\.correct_id\s+and coalesce\(trim\(k\.dx_map ->> o\.id::text\), ''\) = '';\s+if n > 0 then\s+v_issues := v_issues \|\| to_jsonb\(n \|\| ' خياراً خاطئاً بلا كود تشخيص — التشخيص هو ما يميّز بيان'\);\s+end if;\s*$p$;
  p_qr_msq text := $p$select count\(\*\) into n from options o\s+join questions x on x\.id = o\.question_id\s+join question_keys k on k\.question_id = x\.id\s+where x\.quiz_id = p_quiz and x\.retired_at is null and x\.kind='msq'\s+and not \(o\.id = any \(coalesce\(k\.correct_ids, '\{\}'::bigint\[\]\)\)\)\s+and coalesce\(trim\(k\.dx_map ->> o\.id::text\), ''\) = '';\s+if n > 0 then\s+v_issues := v_issues \|\| to_jsonb\(\s+n \|\| ' خياراً خاطئاً في أسئلة الاختيار المتعدّد بلا كود تشخيص'\);\s+end if;\s*$p$;
  -- ── admin_health ──
  p_ah text := $p$union all\s+select 'dx_missing', 'خيارات خاطئة بلا كود تشخيص',.*?and not \(k\.dx_map \? o\.id::text\)\), ''$p$;
  -- ── authoring_gaps ──
  p_ag text := $p$union all\s+select 'Q\.NO_DX',.*?and coalesce\(k\.dx_map, '\{\}'::jsonb\) = '\{\}'::jsonb$p$;

begin
  -- ── ① save_question ──
  select p.oid::regprocedure into sig from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'save_question';
  v := pg_get_functiondef(sig);
  n := pg_temp.cnt164(v, p_sq_require);
  if n = 0 then
    raise notice '164: save_question — الرفضُ مرفوعٌ من قبل';
  else
    if n <> 2 then raise exception '164: save_question — كتلةُ الرفض وُجدت % مرّة لا ٢', n; end if;
    if pg_temp.cnt164(v, p_sq_orphan) <> 2 then raise exception '164: save_question — فحصُ الكود المجهول ليس اثنين'; end if;
    if pg_temp.cnt164(v, p_sq_vdx) <> 1 then raise exception '164: save_question — سطرُ بناء dx_map ليس واحداً'; end if;
    v := regexp_replace(v, p_sq_require, '', 'g');
    v := regexp_replace(v, p_sq_orphan, r_sq_orphan, 'g');
    v := regexp_replace(v, p_sq_vdx, r_sq_vdx, 'g');
    execute v;
    raise notice '164: save_question — رُفع الرفض ×٢ · قُصر فحصُ المجهول ×٢ · لا مفتاحَ لمشتّتٍ بلا كود';
  end if;

  -- ── ② quiz_readiness ──
  select p.oid::regprocedure into sig from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'quiz_readiness';
  v := pg_get_functiondef(sig);
  n := pg_temp.cnt164(v, p_qr_mcq) + pg_temp.cnt164(v, p_qr_msq);
  if n = 0 then
    raise notice '164: quiz_readiness — العائقان مرفوعان من قبل';
  else
    if pg_temp.cnt164(v, p_qr_mcq) <> 1 or pg_temp.cnt164(v, p_qr_msq) <> 1 then
      raise exception '164: quiz_readiness — كتلتا «بلا كود» ليستا واحدةً واحدة (mcq %, msq %)', pg_temp.cnt164(v, p_qr_mcq), pg_temp.cnt164(v, p_qr_msq);
    end if;
    v := regexp_replace(v, p_qr_mcq, '', 'g');
    v := regexp_replace(v, p_qr_msq, '', 'g');
    execute v;
    raise notice '164: quiz_readiness — رُفع عائقا النشر (mcq · msq)';
  end if;

  -- ── ③ admin_health ──
  select p.oid::regprocedure into sig from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'admin_health';
  v := pg_get_functiondef(sig);
  n := pg_temp.cnt164(v, p_ah);
  if n = 0 then
    raise notice '164: admin_health — dx_missing ساقطٌ من قبل';
  else
    if n <> 1 then raise exception '164: admin_health — dx_missing وُجد % مرّة', n; end if;
    v := regexp_replace(v, p_ah, '', 'g');
    execute v;
    raise notice '164: admin_health — سقط بندُ dx_missing';
  end if;

  -- ── ④ authoring_gaps ──
  select p.oid::regprocedure into sig from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'authoring_gaps';
  v := pg_get_functiondef(sig);
  n := pg_temp.cnt164(v, p_ag);
  if n = 0 then
    raise notice '164: authoring_gaps — Q.NO_DX ساقطةٌ من قبل';
  else
    if n <> 1 then raise exception '164: authoring_gaps — Q.NO_DX وُجدت % مرّة', n; end if;
    v := regexp_replace(v, p_ag, '', 'g');
    execute v;
    raise notice '164: authoring_gaps — سقطت فجوةُ Q.NO_DX';
  end if;
end $$;


-- ─── ⑤ تفريغُ خانات نقص المعرفة — وحذفُ الثلاثة ──────────────────────────

update question_keys k
   set dx_map = coalesce((select jsonb_object_agg(e.key, e.value)
                            from jsonb_each_text(k.dx_map) e
                           where e.value not in ('FE', 'REG', 'PRO')), '{}'::jsonb)
 where exists (select 1 from jsonb_each_text(k.dx_map) e where e.value in ('FE', 'REG', 'PRO'));

update question_keys k
   set wrong_map = coalesce((select jsonb_object_agg(e.key, e.value)
                               from jsonb_each_text(k.wrong_map) e
                              where e.value not in ('FE', 'REG', 'PRO')), '{}'::jsonb)
 where exists (select 1 from jsonb_each_text(k.wrong_map) e where e.value in ('FE', 'REG', 'PRO'));

update answers set dx_code = null where dx_code in ('FE', 'REG', 'PRO');

-- ⛔ حذفٌ على القاعدة الحيّة: مُقرٌّ في جلسة ١٩ أكتوبر، وبالشرط الذاتيّ نفسه.
delete from dx_codes d
 where d.code in ('FE', 'REG', 'PRO')
   and not exists (select 1 from question_keys k, jsonb_each_text(k.dx_map)    e where e.value = d.code)
   and not exists (select 1 from question_keys k, jsonb_each_text(k.wrong_map) e where e.value = d.code)
   and not exists (select 1 from answers a where a.dx_code = d.code)
   and not exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                    where n.nspname = 'public'
                      and pg_get_functiondef(p.oid) like '%''' || d.code || '''%');


-- ═══════════ الفحص — كلُّ سطرٍ يفحص شيئاً واحداً ═══════════

select 'dx_codes الآن' as "الفحص", (select count(*)::text from dx_codes) || ' (١٤ متوقَّعة)' as "النتيجة"
union all
select 'FE · REG · PRO بقيت ⚠️',
       (select coalesce(string_agg(code, ' · '), 'لا شيء') from dx_codes where code in ('FE','REG','PRO'))
union all
select '🔴 دوالّ ما زالت ترفض «خيار خاطئ بلا كود»',
       (select count(*)::text from pg_proc p join pg_namespace n on n.oid = p.pronamespace
         where n.nspname = 'public'
           and (pg_get_functiondef(p.oid) like '%كل خيار خاطئ يحتاج كود تشخيص%'
             or pg_get_functiondef(p.oid) like '%بلا كود تشخيص%'
             or pg_get_functiondef(p.oid) like '%''dx_missing''%'
             or pg_get_functiondef(p.oid) like '%''Q.NO_DX''%'))
union all
select 'save_question يقصر فحصَ المجهول على كودٍ مكتوب',
       (select count(*)::text from pg_proc p join pg_namespace n on n.oid = p.pronamespace
         where n.nspname = 'public' and p.proname = 'save_question'
           and pg_get_functiondef(p.oid) like '%coalesce(trim(o->>''dx''), '''') <> ''''%') || ' / 1'
union all
select '🔴 أكواد يتيمة في dx_map',
       (select count(*)::text from question_keys k, jsonb_each_text(k.dx_map) e
         where not exists (select 1 from dx_codes d where d.code = e.value))
union all
select 'خانات dx_map (كانت ١٢٨٦٩ ⇒ ١١٨١٢ متوقَّعة)',
       (select count(*)::text from question_keys k, jsonb_each_text(k.dx_map) e)
union all
select 'أسئلة حيّة فيها مشتّتٌ بلا كود (نقص معرفة — معلومة لا عطل)',
       (select count(distinct q.id)::text from questions q
           join options o on o.question_id = q.id
           join question_keys k on k.question_id = q.id
          where q.retired_at is null and q.kind in ('mcq','msq')
            and o.id is distinct from k.correct_id
            and not (o.id = any (coalesce(k.correct_ids, '{}'::bigint[])))
            and not (k.dx_map ? o.id::text))
union all
select 'answers بالكود',
       (select coalesce(string_agg(dx_code || ' ' || n, ' · '), 'لا شيء')
          from (select dx_code, count(*) as n from answers where dx_code is not null group by 1) z);


insert into public.sql_log (n, title, applied_at)
values ('164', 'كودُ التشخيص اختياريٌّ على المشتّت — وغيابُه نقصُ معرفةٍ يحمله الهدف', now())
on conflict (n) do update set applied_at = now();
