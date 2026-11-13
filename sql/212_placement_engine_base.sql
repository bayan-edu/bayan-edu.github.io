-- ══════════════════════════════════════════════════════════
-- 212 · محرّكُ تحديد المستوى (ق١٧) ① — البنيةُ والتقدير
--       (المرحلة ٧ب من `spec-reading-library.md` · «تصميمُ محرّك ٧ب» · الخطوة ① · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **ق١٧: ممرٌّ تكيّفيٌّ لكلّ طبقة** — بنكُ مقتطفاتٍ موسومةٍ بنطاقها، ومحطّاتٌ تُركَّب حول تقديرٍ من المسار كلِّه. وهذا الملفُّ **أساسُه وحده**:
--      البنيةُ التي تحمله، والتقديرُ الذي يحسبه. **والجلسةُ (التركيبُ والتوجيهُ والحسم) في الخطوة ②** — فلا يتغيّر هنا شيءٌ يراه طالب.
--   ② **البنية — إضافاتٌ لا تمسّ قائماً:**
--        · `quizzes.tier` و`station_kind = 'adaptive'` — **بنكُ الطبقة** اختبارٌ دورُه `bank` بأداةٍ وطبقة. والقيدُ `quizzes_tool_kind_chk` يُلزم كلَّ اختبارِ أداةٍ
--          بنوع محطّة، فصار له نوعُه. **وقيدٌ جديد يحرسه:** `adaptive` بنكٌ بأداةٍ وطبقةٍ و`reveal = 'never'` — وإلا ردّت `submit_attempt` مفاتيحَه لمن ناداها.
--          ⚠️ **ولا يُنشر أبداً** (`quizzes_bank_unpublished` قائم) — بوّابتُه علامةُ المحرّك في الخطوة ② لا النشر ولا `can_access`.
--          **وحارسُ الأدوار (`quizzes_role_guard` · 185) يستثنيه وحده** من «البنكُ لا يحمل أداة» — كشفته الجافّةُ الأولى (أدناه).
--        · `passages.band` (١–٢٤ · **و٠ للتمهيد**) — نطاقُ المقتطف، ومنه صعوبةُ أسئلته · و`kind = 'words'` **«مجموعةُ كلمات» لـM1** (ق١٧ ⑫):
--          ثلاثةُ بنودِ «استمع واختر» تحت تعليمةٍ مسموعة.
--        · `scale_tiers.entry_rank` — **نطاقُ الدخول يكتبه المصمّم** (ق١٧ ②) · ومبدئيّاً M1 ⇐ R3 · M2 ⇐ R7 · M3 ⇐ R10 · M4 ⇐ R13 (لا يُكتب فوق قيمةٍ قائمة).
--        · `placement_sessions` + `tier` · `stage` · `station_q` · `est` · `tries` — للخطوة ②.
--        · `student_levels.source` + `provisional` — «مبدئيّ» حتى المعايرة (ق١٠ ④).
--   ③ **التقدير — «راش بصعوبةٍ اسميّة»** (ق١٧ ⑤ · وهو المخطّط §4 بعينه بصعوبة النطاق بدل المعايَرة):
--        · `guess_floor(نمط، خيارات، نقاط)` — حدُّ التخمين من النمط: الاختيارُ والجملةُ والترتيبُ ١ ÷ عددِها · الحكمُ «بجزأين» ٠٫٢٥ (حكمٌ مقبولٌ عشوائيّاً
--          يُكسب نقطة) و«حكمٌ ودليلُه» ٠٫٠٥ · المزاوجةُ والإكمالُ من قائمة ٠٫١ · الإكمالُ المكتوب ٠٫٠٢ · وغيرُها ٠٫٠٥. **تقريبٌ يُستبدل بالمعايرة.**
--        · `placement_items(محاولات)` — بنودُ المحاولات بصعوبتها (`٠٫٤ × نطاق نصّها`) وحدِّ تخمينها ونقاطها (`m`) وما نال (`s`). **والتمهيدُ (نطاق ٠) لا يدخل.**
--        · `placement_eap(بنود، مركز، انحراف)` — EAP على شبكةٍ من −٤ إلى ١٣٫٦ بخطوة ٠٫٠٥ (٣٥٣ نقطة)، كلُّ نقطةٍ من درجة البند محاولة، والأوّليُّ طبيعيّ.
--          **والنطاقُ أعلى ك يبلغ فيه التقديرُ `٠٫٤ك + ln 3`** — نقطةَ الـ٧٥٪ (٠ = قبل القراءة). **ثلاثتُها داخليّة** كـ`order_shuffle` (211).
--   ④ **ونقاطُ البند في `answers.meta`** (`pts`) — `submit_attempt` تحسبها أصلاً لتجمع الدرجة (الجزئيّةُ بـ`hits` · وإلا كاملُ النقاط أو صفر)، **فتُكتب مع كلّ إجابة**.
--      فيقرؤها التقديرُ من مصدرٍ واحد، ولا يُعيد حسابَ كلّ نمطٍ بقواعده. **والمجموعُ يساوي `attempts.score`** — يُقاس في الجافّة.
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** قيودُ `quizzes` و`passages` و`scale_tiers` و`placement_sessions` و`student_levels` · `set_my_level` (لا تحرس المصدرَ،
--   فالقيدُ وحده) · `submit_attempt` (بصمتها `a381ae1c`، ونصُّ الإدراج مرّةً واحدة) · ومنحُ الجداول على مستوى الجدول (فالأعمدةُ الجديدة ممنوحةٌ معه) ·
--   **وسياساتُ القراءة على `passages`/`questions`/`options` بـ`can_access`** — ولذلك لا يُفتح البنكُ بها (الخطوة ②).
-- **والشاهد:** `tools/placement-sim/eap_crosscheck.py` يحسب التقديرَ نفسَه في بايثون لسبع حالات، والجافّةُ تطابقه.
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة: القيود — والأعمدةُ الجديدة ═══════════

alter table public.quizzes add column if not exists tier text;
alter table public.quizzes drop constraint if exists quizzes_tier_chk;
alter table public.quizzes add constraint quizzes_tier_chk
  check (tier is null or tier = any (array['M1', 'M2', 'M3', 'M4']));
alter table public.quizzes drop constraint if exists quizzes_station_kind_chk;
alter table public.quizzes add constraint quizzes_station_kind_chk
  check (station_kind is null or station_kind = any (array['routing', 'panel', 'boundary', 'productive', 'adaptive']));
alter table public.quizzes drop constraint if exists quizzes_adaptive_chk;
alter table public.quizzes add constraint quizzes_adaptive_chk
  check (station_kind is distinct from 'adaptive'
         or (role = 'bank' and tool is not null and tier is not null and reveal = 'never'));

alter table public.passages add column if not exists band smallint;
alter table public.passages drop constraint if exists passages_band_chk;
alter table public.passages add constraint passages_band_chk check (band is null or band between 0 and 24);
alter table public.passages drop constraint if exists passages_kind_chk;
alter table public.passages add constraint passages_kind_chk
  check (kind = any (array['text', 'audio', 'video', 'image', 'words']));

alter table public.scale_tiers add column if not exists entry_rank integer;
alter table public.scale_tiers drop constraint if exists scale_tiers_entry_chk;
alter table public.scale_tiers add constraint scale_tiers_entry_chk
  check (entry_rank is null or (entry_rank >= 1 and entry_rank <= ceiling_rank));
update public.scale_tiers
   set entry_rank = case code when 'M1' then 3 when 'M2' then 7 when 'M3' then 10 when 'M4' then 13 end
 where entry_rank is null;

alter table public.placement_sessions add column if not exists tier text;
alter table public.placement_sessions add column if not exists stage text;
alter table public.placement_sessions add column if not exists station_q bigint[];
alter table public.placement_sessions add column if not exists est jsonb;
alter table public.placement_sessions add column if not exists tries smallint not null default 0;
alter table public.placement_sessions drop constraint if exists placement_sessions_tier_chk;
alter table public.placement_sessions add constraint placement_sessions_tier_chk
  check (tier is null or tier = any (array['M1', 'M2', 'M3', 'M4']));
alter table public.placement_sessions drop constraint if exists placement_sessions_stage_chk;
alter table public.placement_sessions add constraint placement_sessions_stage_chk
  check (stage is null or stage = any (array['practice', 'stations', 'paused', 'done']));

alter table public.student_levels drop constraint if exists student_levels_source_check;
alter table public.student_levels add constraint student_levels_source_check
  check (source = any (array['test', 'profile', 'self', 'teacher', 'promotion', 'provisional']));

-- ═══════════ معدَّلة: `quizzes_role_guard` — بنكُ الطبقة وحده يحمل أداة ═══════════
-- قِيس في الجافّة الأولى: الحارسُ (185) يردّ كلَّ بنكٍ أو نموذجٍ بأداة — «البنك والنموذج لا يكونان محطّةَ أداة». وعلّتُه أنّ البنكَ لا يُوجِّه ولا يُفتح بنفسه.
-- **وبنكُ الطبقة كذلك:** مخزونٌ يركّب منه المحرّكُ المحطّات، لا محطّةٌ توجّه — فيُستثنى هو وحده (`adaptive`)، والنموذجُ وسائرُ البنوك على المنع.
do $$
declare v text; n int;
        p text := 'if new.role in (''bank'', ''form'') and new.tool is not null then';
begin
  v := pg_get_functiondef('public.quizzes_role_guard()'::regprocedure);
  if position('adaptive' in v) > 0 then raise notice 'quizzes_role_guard تستثني بنكَ الطبقة من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'quizzes_role_guard: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p,
    'if new.role in (''bank'', ''form'') and new.tool is not null' || chr(10)
    || '     and not (new.role = ''bank'' and new.station_kind = ''adaptive'') then   -- 212 · بنكُ الطبقة (ق١٧) وحده');
end $$;

-- ═══════════ منشأة: التقدير — داخليّةٌ ثلاثتُها ═══════════

-- حدُّ التخمين من نمط البند — تقريبٌ قبل المعايرة (رأسُ الملفّ ③)
create or replace function public.guess_floor(p_kind text, p_options integer, p_points integer)
returns double precision
language sql immutable
set search_path = public
as $$
  select (case
    when p_kind in ('mcq', 'sentence', 'ordering') then 1.0 / greatest(coalesce(p_options, 2), 2)
    when p_kind = 'judge' then case when coalesce(p_points, 1) >= 2 then 0.25 else 0.05 end
    when p_kind in ('matching', 'cloze') then 0.10
    when p_kind = 'gap' then 0.02
    else 0.05 end)::double precision
$$;

-- بنودُ محاولاتٍ بصعوبتها الاسميّة وحدِّ تخمينها ونقاطها — والتمهيدُ (نطاق ٠) والمقاليُّ لا يدخلان
create or replace function public.placement_items(p_attempts bigint[])
returns jsonb
language sql stable
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'q', q.id, 'band', pg.band,
           'b', round(0.4 * pg.band, 6),
           'c', guess_floor(q.kind, (select count(*)::int from options o where o.question_id = q.id), coalesce(q.points, 1)::int),   -- `points` رقميّ لا صحيح
           'm', coalesce(q.points, 1),
           's', least(greatest(coalesce((a.meta->>'pts')::numeric, 0), 0), coalesce(q.points, 1)))
         order by a.id), '[]'::jsonb)
    from answers a
    join questions q  on q.id  = a.question_id
    join passages  pg on pg.id = q.passage_id
   where a.attempt_id = any (p_attempts)
     and coalesce(pg.band, 0) > 0
     and q.kind <> 'essay'
$$;

-- EAP على شبكةٍ ثابتة — والنطاقُ أعلى ك يبلغ فيه التقديرُ نقطةَ الـ٧٥٪ (٠٫٤ك + ln 3)
create or replace function public.placement_eap(p_items jsonb, p_mean double precision, p_sd double precision)
returns jsonb
language sql immutable
set search_path = public
as $$
  with g  as (select -4.0::double precision + 0.05 * i as th from generate_series(0, 352) i),
       it as (select (e->>'b')::double precision as b, (e->>'c')::double precision as c,
                     (e->>'m')::double precision as m, (e->>'s')::double precision as s
                from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) e),
       pr as (select g.th, it.m, it.s,
                     it.c + (1 - it.c) / (1 + exp(-(g.th - it.b))) as p
                from g cross join it),
       sp as (select pr.th, sum(pr.s * ln(pr.p) + (pr.m - pr.s) * ln(1 - pr.p)) as lsum from pr group by pr.th),
       ll as (select g.th, coalesce(sp.lsum, 0) - 0.5 * ((g.th - p_mean) / p_sd) ^ 2 as l
                from g left join sp on sp.th = g.th),
       w  as (select th, exp(l - max(l) over ()) as w from ll),
       e  as (select sum(th * w) / sum(w) as eap from w)
  select jsonb_build_object(
           'eap',  round(e.eap::numeric, 6),
           'sd',   round(sqrt((select sum((w.th - e.eap) ^ 2 * w.w) / sum(w.w) from w))::numeric, 6),
           'band', greatest(0, least(24, floor((e.eap - ln(3)) / 0.4)::int)),
           'n',    (select count(*) from it))
    from e
$$;

revoke all on function public.guess_floor(text, integer, integer)       from public, anon, authenticated;
revoke all on function public.placement_items(bigint[])                 from public, anon, authenticated;
revoke all on function public.placement_eap(jsonb, double precision, double precision) from public, anon, authenticated;

-- ═══════════ معدَّلة: `submit_attempt` — نقاطُ البند في `meta` ═══════════

do $$
declare v text; n int;
        p text := 'nullif(a->>''conf'','''')::int, v_meta, v_txt);';
begin
  v := pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure);
  if position('''pts''' in v) > 0 then raise notice 'submit_attempt تكتب نقاطَ البند من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'submit_attempt (الإدراج): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p,
    'nullif(a->>''conf'','''')::int,' || chr(10)
    || '              coalesce(v_meta, ''{}''::jsonb) || jsonb_build_object(''pts'',   -- 212 · نقاطُ البند كما جُمعت في الدرجة أعلاه'
    || chr(10) || '                case when k.kind in (''matching'', ''cloze'', ''judge'', ''ordering'') then coalesce((v_g->>''hits'')::int, 0)'
    || chr(10) || '                     when v_ok then coalesce(k.points, 1) else 0 end), v_txt);');
end $$;

insert into public.sql_log (n, title, applied_at)
values ('212', 'محرّكُ تحديد المستوى (ق١٧) ① — البنيةُ والتقدير', now())
on conflict (n) do update set applied_at = now();
