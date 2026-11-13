-- ══════════════════════════════════════════════════════════
-- 213 · محرّكُ تحديد المستوى (ق١٧) ② — الجلسة
--       (المرحلة ٧ب من `spec-reading-library.md` · «تصميمُ محرّك ٧ب» · الخطوة ② · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **الجلسةُ تجعل تقديرَ `212` اختباراً:** بندا تمهيد · محطّاتٌ ثلاثيّةٌ تُركَّب حول التقدير · قاعدةُ الأرضيّة · الحسمُ «مبدئيّاً».
--      **وIELTS على جدول مساراته كما هو:** الفرعُ تختاره الأداةُ — أداةٌ ذاتُ بنوك طبقات (`station_kind = 'adaptive'`) — بسطرٍ واحد
--      في `placement_start` و`placement_submit` و`tool_readiness`. **والعقدُ مع الواجهة نفسُه** (`{session, quiz}` ثمّ `{done, quiz | level}`)،
--      ويزيد `stage` (`practice` · `stations` · `paused`) لشاشات الخطوة ③.
--   ② **البنكُ يفتحه المحرّكُ وحده** — علامةُ معاملة (`bayan.placement_bank`) تضعها نداءاتُه، و`placement_station` تقرؤها:
--      بنكٌ بالعلامة وجلسةٌ مفتوحةٌ عليه ⇐ **أسئلةُ المحطّة الجارية وحدها**، في `get_quiz` رسماً وفي `submit_attempt` تصحيحاً.
--      **و`can_access` لا تُمسّ** — سياساتُ القراءة على `passages`/`questions`/`options` تقرؤها، فلو فتحت البنكَ لقرأه الطالبُ كلَّه من الجداول.
--      والعلامةُ محلّيّةٌ للمعاملة (`is_local`)، **ولا يضعها عميل**: `set_config` ليست في المخطّط المكشوف.
--   ③ **التركيبُ (`placement_pick`):** لكلٍّ من ك−١ · ك · ك+١ مقتطفٌ لم يره في الجلسة — وما رآه في جلساتٍ سابقة يتأخّر — والنطاقُ بلا مقتطف ⇐ أقربُ نطاقٍ له
--      مقتطف. **الأسهلُ أوّلاً.** **وM1 (ق١٧ ⑫):** محطّةٌ تمسّ R1–R5 فيها «مجموعةُ كلمات». والمحطّةُ تُحفظ أسئلتُها (`station_q`) فالاستئنافُ يعيدها نفسَها.
--   ④ **الحسم:** التقديرُ من المسار كلِّه (`placement_estimate` = `212` بأوّليِّ الطبقة) · ثلاثُ محطّات، **إلا أن تمنعها الأرضيّة** (لم ينجح في مقتطفٍ —
--      ثلثا نقاطه — ولم يبلغ R1 ⇐ أخرى حتى خمس) · ثمّ **(المقدَّر − ١) ثمّ السقف ثمّ لا دون R1** ⇐ `set_my_level(…, 'provisional')` والطبقةُ معه.
--      🔑 **والمقدَّرُ هنا بلا قصٍّ عند ٢٤** — فالخفضُ قبل السقف حقّاً (ق١٧ ⑦): قارئٌ فوق السلّم في M4 ⇐ R24 لا R23.
--      **ومن لم ينجح في مقتطفٍ قطّ ⇐ R1** وبندٌ في جرس معلّمه. **والإجابةُ الغائبة تُصحَّح فارغة** — فلا يرفع التخطّي التقدير.
--   ⑤ **الجرس (قرارُ المالك · ١٣ نوفمبر)** لا رسالةُ نظام: `my_counts` يزيد `placement` — جلساتُ طلاب المعلّم التي تنتظره: **الموقوفةُ حتى يستأنفها
--      (`placement_resume`) · ومن انتهى عند R1 حتى يراها (`placement_seen` · `seen_at`)**. يسكت بفعل المعلّم وحده، كالمقاليّة حين تُصحَّح.
--      **ومعلّمُه = معلّمُه في مادّة الأداة** (`teaches_subject`)، **والمديرُ لمن لا معلّمَ له فيها** — وإلا بقي موقوفاً لا يستأنفه أحد.
--      والعددُ من القائمة نفسِها (`placement_alerts`) — عدٌّ في موضعين يختلف يوماً (الثابت ⑨).
--   ⑥ **`p_sessions_read` تُحصر بمعلّم الطالب** (`teaches`) كـ`p_slevels_read` — قِيس: `is_teacher()` = أيُّ معلّمٍ يقرأ جلساتِ الطلاب كلِّهم،
--      والجلسةُ تحمل الآن التقديرَ والمسار. **ولا شيءَ في `js/` يقرأ الجدولَ مباشرة** (قِيس).
--   ⑦ **وما لا يتغيّر هنا:** `subjects.tool` للمادّة ٧ يبقى فارغاً حتى أوّل بنكٍ جاهز (٧د) — فـ«قيد الإعداد» عند الطالب كما هي ·
--      والاختبارُ ١٩ (محطّةُ توجيهٍ فارغة) باقٍ، وحارسُ الجاهزيّة يُسمّيه · والشاشاتُ في الخطوة ③.
--   ⑧ **وتصحيحٌ صغير في الطريق:** افتراضيُّ `passages.kind` كان `'reading'` — خارج `passages_kind_chk` منذ ما قبل `212` (قِيس في نصّه القديم)،
--      فكلُّ إدراجٍ بلا نوعٍ يسقط ⇐ `'text'`.
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `get_quiz` · `submit_attempt` (`77e1c66a`) · `placement_start` · `placement_submit` · `tool_readiness` · `my_counts` ·
--   `can_access` · `set_my_level` · `entry_tier` · `age_tier` · `teaches` · `teaches_subject` · سياستا `placement_sessions` و`student_levels` · أعمدةُ الجداول ·
--   والمستوياتُ (`levels.rank` ١–٢٤ للسلّم ١٧) · والطبقاتُ (M1 ٥–٧ · M2 ٨–١٠ · M3 ١١–١٣ · M4 ١٤–١٨).
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة: البنية والسياسة ═══════════

alter table public.placement_sessions add column if not exists seen_at timestamptz;   -- رآها المعلّم (انتهت عند R1 بالأرضيّة)

alter table public.passages alter column kind set default 'text';                      -- ⑧

-- بنكٌ واحد لكلّ طبقةٍ في الأداة — فلا يُسأل «أيُّهما؟»
create unique index if not exists quizzes_adaptive_tier_uq
  on public.quizzes (tool, tier) where station_kind = 'adaptive';

drop policy if exists p_sessions_read on public.placement_sessions;
create policy p_sessions_read on public.placement_sessions
  for select using (user_id = auth.uid() or teaches(user_id));                        -- ⑥

-- ═══════════ منشأة: داخليّة — لا تُمنح لطالبٍ ولا معلّم ═══════════

-- محطّةُ الجلسة إن فتح المحرّكُ هذا البنك في هذه المعاملة — وإلا لا شيء
create or replace function public.placement_station(p_quiz bigint)
returns bigint[]
language plpgsql stable security definer
set search_path = public
as $$
declare v text := current_setting('bayan.placement_bank', true);
begin
  if v is null or v <> p_quiz::text then return null; end if;      -- و'' بعد انقضاء معاملةٍ سابقة لا يساوي رقماً
  return (select s.station_q
            from placement_sessions s
            join quizzes b on b.id = s.current_quiz and b.station_kind = 'adaptive'
           where s.user_id = auth.uid() and s.current_quiz = p_quiz
             and s.finished_at is null and s.stage in ('practice', 'stations')
           order by s.id desc
           limit 1);
end $$;

create or replace function public.placement_bank(p_tool text, p_tier text)
returns bigint
language sql stable security definer
set search_path = public
as $$
  select q.id from quizzes q where q.tool = p_tool and q.station_kind = 'adaptive' and q.tier = p_tier
$$;

-- بندا التمهيد: أوّلُ سؤالين في نصوص النطاق ٠
create or replace function public.placement_practice(p_bank bigint)
returns bigint[]
language sql stable security definer
set search_path = public
as $$
  select (array_agg(x.id order by pg.position, pg.id, x.position, x.id))[1:2]
    from questions x join passages pg on pg.id = x.passage_id
   where pg.quiz_id = p_bank and pg.band = 0 and x.retired_at is null
$$;

-- حرّاسُ بنك الطبقة — والجلسةُ لا تبدأ على بنكٍ له واحد
create or replace function public.placement_bank_issues(p_bank bigint)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare b quizzes; t scale_tiers; v jsonb := '[]'::jsonb; n int; v_miss text;
begin
  select * into b from quizzes where id = p_bank;
  select st.* into t from scale_tiers st join subjects sj on sj.scale_id = st.scale_id
   where sj.id = b.subject_id and st.code = b.tier;
  if t.code is null or t.entry_rank is null then
    return jsonb_build_array(('طبقةٌ بلا نطاق دخولٍ في سلّم المادّة: ' || coalesce(b.tier, '—'))::text);
  end if;

  select count(*) into n from questions x join passages pg on pg.id = x.passage_id
   where pg.quiz_id = p_bank and pg.band = 0 and x.retired_at is null;
  if n < 2 then v := v || to_jsonb('يلزم بندا تمهيد في نصٍّ نطاقُه ٠ — الموجود ' || n); end if;

  select count(*) into n from passages where quiz_id = p_bank and band is null;
  if n > 0 then v := v || to_jsonb('نصوصٌ بلا نطاق: ' || n); end if;

  select count(*) into n from passages pg
   where pg.quiz_id = p_bank and pg.band >= 1 and pg.kind <> 'words'
     and (select count(*) from questions x where x.passage_id = pg.id and x.retired_at is null) <> 3;
  if n > 0 then v := v || to_jsonb('مقتطفاتٌ أسئلتُها غيرُ ثلاثة: ' || n); end if;

  select string_agg('R' || g, '، ' order by g) into v_miss
    from generate_series(1, least(t.entry_rank + 2, t.ceiling_rank)) g
   where not exists (select 1 from passages pg
                      where pg.quiz_id = p_bank and pg.band = g and pg.kind <> 'words'
                        and exists (select 1 from questions x where x.passage_id = pg.id and x.retired_at is null));
  if v_miss is not null then v := v || to_jsonb('نطاقاتٌ بلا مقتطف: ' || v_miss); end if;

  select count(*) into n from passages where quiz_id = p_bank and band > t.ceiling_rank;
  if n > 0 then v := v || to_jsonb('نصوصٌ فوق سقف الطبقة (R' || t.ceiling_rank || '): ' || n); end if;

  select count(*) into n from questions where quiz_id = p_bank and retired_at is null and kind = 'essay';
  if n > 0 then v := v || to_jsonb('أسئلةٌ مقاليّة لا يُقدَّر بها: ' || n); end if;

  select count(*) into n from questions where quiz_id = p_bank and retired_at is null and passage_id is null;
  if n > 0 then v := v || to_jsonb('أسئلةٌ بلا نصّ: ' || n); end if;

  if b.tier = 'M1' and not exists (select 1 from passages pg
                                    where pg.quiz_id = p_bank and pg.kind = 'words' and pg.band between 1 and 5
                                      and exists (select 1 from questions x where x.passage_id = pg.id and x.retired_at is null)) then
    v := v || to_jsonb('يلزم «مجموعة كلمات» في R1–R5'::text);                     -- ق١٧ ⑫
  end if;

  return v;
end $$;

-- جاهزيّةُ أداةٍ تكيّفيّة: بنوكُها بحرّاسها، وما ليس بنكاً فيها
create or replace function public.placement_readiness(p_tool text)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare v jsonb := '[]'::jsonb; v_banks jsonb := '[]'::jsonb; r record; v_i jsonb;
begin
  for r in select q.id, q.title, q.tier from quizzes q
            where q.tool = p_tool and q.station_kind = 'adaptive' order by q.tier
  loop
    v_i := placement_bank_issues(r.id);
    v_banks := v_banks || jsonb_build_object('id', r.id, 'tier', r.tier, 'title', r.title,
                                             'ok', jsonb_array_length(v_i) = 0, 'issues', v_i);
    select v || coalesce(jsonb_agg(to_jsonb(r.tier || ' · ' || (e #>> '{}'))), '[]'::jsonb) into v
      from jsonb_array_elements(v_i) e;
  end loop;

  for r in select q.title from quizzes q
            where q.tool = p_tool and q.station_kind is distinct from 'adaptive'
  loop
    v := v || to_jsonb('«' || r.title || '» ليست بنكَ طبقة — والأداةُ التكيّفيّة لا محطّاتِ مسارٍ فيها');
  end loop;

  return jsonb_build_object('ok', jsonb_array_length(v) = 0, 'tool', p_tool, 'adaptive', true,
                            'stations', jsonb_array_length(v_banks), 'routes', 0,
                            'banks', v_banks, 'issues', v);
end $$;

-- تركيبُ محطّة حول نطاق: {center, passages, bands, q} — والأسهلُ أوّلاً
create or replace function public.placement_pick(p_session bigint, p_center integer)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare s placement_sessions; v_ceil int; v_c int; v_seen bigint[]; v_before bigint[];
        v_pick bigint[] := '{}'::bigint[]; b int; v_p bigint; v_low int;
        v_order bigint[]; v_bands jsonb; v_q bigint[];
begin
  select * into s from placement_sessions where id = p_session;
  select st.ceiling_rank into v_ceil
    from quizzes q join subjects sj on sj.id = q.subject_id
    join scale_tiers st on st.scale_id = sj.scale_id and st.code = s.tier
   where q.id = s.current_quiz;
  v_c := least(greatest(coalesce(p_center, 1), 1), v_ceil);

  -- ما رآه في هذه الجلسة لا يُعاد، وما رآه في جلساتٍ سابقة يتأخّر
  select coalesce(array_agg(distinct (p #>> '{}')::bigint), '{}'::bigint[]) into v_seen
    from jsonb_array_elements(s.path) e, jsonb_array_elements(coalesce(e->'passages', '[]'::jsonb)) p;
  select coalesce(array_agg(distinct (p #>> '{}')::bigint), '{}'::bigint[]) into v_before
    from placement_sessions o, jsonb_array_elements(o.path) e, jsonb_array_elements(coalesce(e->'passages', '[]'::jsonb)) p
   where o.user_id = s.user_id and o.tool = s.tool and o.id <> s.id;

  foreach b in array array[v_c - 1, v_c, v_c + 1] loop
    v_p := null;
    select pg.id into v_p
      from passages pg
     where pg.quiz_id = s.current_quiz and pg.band >= 1 and pg.kind <> 'words'
       and not (pg.id = any (v_seen || v_pick))
       and exists (select 1 from questions x where x.passage_id = pg.id and x.retired_at is null)
     order by abs(pg.band - b),
              case when b < v_c then pg.band end,          -- عند التساوي: الأدنى في خانة الأدنى
              case when b > v_c then -pg.band end,         -- والأعلى في خانة الأعلى
              pg.id = any (v_before),
              md5(p_session::text || ':' || pg.id::text)
     limit 1;
    if v_p is not null then v_pick := v_pick || v_p; end if;
  end loop;

  -- ق١٧ ⑫: محطّةٌ من M1 تمسّ R1–R5 فيها «مجموعةُ كلمات»
  if s.tier = 'M1' then
    select min(pg.band) into v_low from passages pg where pg.id = any (v_pick);
    if v_low between 1 and 5 then
      v_p := null;
      select pg.id into v_p
        from passages pg
       where pg.quiz_id = s.current_quiz and pg.kind = 'words' and pg.band between 1 and 5
         and not (pg.id = any (v_seen || v_pick))
         and exists (select 1 from questions x where x.passage_id = pg.id and x.retired_at is null)
       order by abs(pg.band - v_low), pg.id = any (v_before), md5(p_session::text || ':' || pg.id::text)
       limit 1;
      if v_p is not null then v_pick := v_pick || v_p; end if;
    end if;
  end if;

  select array_agg(pg.id order by pg.band, (pg.kind = 'words') desc, pg.id),
         jsonb_agg(pg.band order by pg.band, (pg.kind = 'words') desc, pg.id)
    into v_order, v_bands
    from passages pg where pg.id = any (v_pick);

  select array_agg(x.id order by array_position(v_order, x.passage_id), x.position, x.id) into v_q
    from questions x where x.passage_id = any (v_order) and x.retired_at is null;

  return jsonb_build_object('center', v_c,
                            'passages', to_jsonb(coalesce(v_order, '{}'::bigint[])),
                            'bands', coalesce(v_bands, '[]'::jsonb),
                            'q', to_jsonb(coalesce(v_q, '{}'::bigint[])));
end $$;

-- مقتطفاتٌ نجح فيها: ثلثا نقاطها — والتمهيدُ والمقاليُّ لا يدخلان
create or replace function public.placement_passed(p_attempts bigint[])
returns integer
language sql stable security definer
set search_path = public
as $$
  select count(*)::int from (
    select q.passage_id,
           sum(least(greatest(coalesce((a.meta->>'pts')::numeric, 0), 0), coalesce(q.points, 1))) as s,
           sum(coalesce(q.points, 1)) as m
      from answers a
      join questions q  on q.id  = a.question_id
      join passages  pg on pg.id = q.passage_id
     where a.attempt_id = any (p_attempts) and coalesce(pg.band, 0) > 0 and q.kind <> 'essay'
     group by q.passage_id) t
   where t.m > 0 and 3 * t.s >= 2 * t.m
$$;

-- تقديرُ الجلسة من محطّاتها كلِّها — والأوّليُّ توزيعُ الطبقة: مركزُه نطاقُ الدخول، وانحرافُه ٣ (ق١٧ ⑤)
create or replace function public.placement_estimate(p_session bigint)
returns jsonb
language sql stable security definer
set search_path = public
as $$
  select placement_eap(
           placement_items(coalesce((select array_agg((x.e->>'attempt')::bigint order by x.o)
                                       from jsonb_array_elements(s.path) with ordinality as x(e, o)
                                      where x.e->>'kind' = 'station'), '{}'::bigint[])),
           (0.4 * st.entry_rank + ln(3.0::float8) + 0.2)::float8,
           3.0::float8)
    from placement_sessions s
    join quizzes b      on b.tool = s.tool and b.station_kind = 'adaptive' and b.tier = s.tier
    join subjects sj    on sj.id = b.subject_id
    join scale_tiers st on st.scale_id = sj.scale_id and st.code = s.tier
   where s.id = p_session
$$;

-- معلّمُ الطالب في مادّة الأداة — والمديرُ لمن لا معلّمَ له فيها
create or replace function public.placement_watches(p_student uuid, p_tool text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from quizzes q
     where q.tool = p_tool and q.station_kind = 'adaptive'
       and (teaches_subject(p_student, q.subject_id)
            or (is_admin() and not exists (select 1 from mentorships m
                                            where m.student_id = p_student and m.subject_id = q.subject_id
                                              and m.active))))
$$;

-- البدء: جلسةٌ مفتوحة تُستأنف بمحطّتها، والموقوفةُ تنتظر معلّمها — وإلا تمهيدٌ على بنك الطبقة
create or replace function public.placement_start_adaptive(p_tool text)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare v_uid uuid := auth.uid(); s placement_sessions; v_scale bigint; v_tier text; v_bank bigint;
begin
  select * into s from placement_sessions
   where user_id = v_uid and tool = p_tool and finished_at is null
   order by id desc limit 1;
  if s.id is not null then
    if s.stage = 'paused' then
      return jsonb_build_object('ok', true, 'session', s.id, 'resumed', true, 'stage', 'paused');
    end if;
    perform set_config('bayan.placement_bank', s.current_quiz::text, true);
    return jsonb_build_object('ok', true, 'session', s.id, 'resumed', true, 'stage', s.stage,
                              'tier', s.tier, 'quiz', get_quiz(s.current_quiz));
  end if;

  select sj.scale_id into v_scale
    from quizzes q join subjects sj on sj.id = q.subject_id
   where q.tool = p_tool and q.station_kind = 'adaptive'
   limit 1;
  v_tier := age_tier(v_scale, v_uid);
  if v_tier is null then
    return jsonb_build_object('ok', false, 'need', 'birth', 'error', 'يلزم تاريخ ميلادك أولاً — من ملفك الشخصي');
  end if;

  v_bank := placement_bank(p_tool, v_tier);
  if v_bank is null or jsonb_array_length(placement_bank_issues(v_bank)) > 0 then
    return jsonb_build_object('ok', false, 'error', 'اختبار تحديد المستوى قيد الإعداد');
  end if;

  insert into placement_sessions (user_id, tool, current_quiz, tier, stage, station_q, tries)
  values (v_uid, p_tool, v_bank, v_tier, 'practice', placement_practice(v_bank), 0)
  returning * into s;

  perform set_config('bayan.placement_bank', v_bank::text, true);
  return jsonb_build_object('ok', true, 'session', s.id, 'resumed', false, 'stage', 'practice',
                            'tier', v_tier, 'quiz', get_quiz(v_bank));
end $$;

-- الإرسال: تمهيدٌ أو محطّة — والملكيّةُ والانتهاءُ يحرسهما `placement_submit` قبل أن تصل هنا
create or replace function public.placement_submit_adaptive(p_session bigint, p_answers jsonb, p_duration integer)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare s placement_sessions; v_ans jsonb; v_att bigint; v_ok bool; v_pick jsonb; v_est jsonb; v_q bigint[];
        v_n int; v_atts bigint[]; v_passed int; v_r1 bool; v_scale bigint; v_ceil int; v_entry int;
        v_raw int; v_place int; v_floor bool; v_level bigint; v_set jsonb;
begin
  select * into s from placement_sessions where id = p_session for update;
  if s.stage = 'paused' then
    return jsonb_build_object('ok', false, 'stage', 'paused', 'error', 'توقّف الاختبار، وأُبلغ معلّمك');
  end if;
  if s.stage is distinct from 'practice' and s.stage is distinct from 'stations' or s.station_q is null then
    return jsonb_build_object('ok', false, 'error', 'لا محطّةَ جارية');
  end if;

  -- إرسالٌ لمحطّةٍ مضت (نقرتان) لا يُصحَّح على التالية
  if jsonb_typeof(p_answers) = 'array' and jsonb_array_length(p_answers) > 0
     and not exists (select 1 from jsonb_array_elements(p_answers) e
                      where e->>'q' = any (select x::text from unnest(s.station_q) x)) then
    return jsonb_build_object('ok', false, 'stale', true, 'error', 'أُرسلت هذه المحطّة من قبل');
  end if;

  -- أسئلةُ المحطّة وحدها، كلٌّ مرّةً واحدة — وما لم يُجب يُصحَّح فارغاً، فلا يرفع التخطّي التقدير
  select coalesce(jsonb_agg(coalesce(f.a, jsonb_build_object('q', t.q)) order by t.i), '[]'::jsonb) into v_ans
    from unnest(s.station_q) with ordinality as t(q, i)
    left join lateral (
      select x.e as a
        from jsonb_array_elements(case when jsonb_typeof(p_answers) = 'array' then p_answers else '[]'::jsonb end)
             with ordinality as x(e, o)
       where x.e->>'q' = t.q::text
       order by x.o limit 1) f on true;

  perform set_config('bayan.placement_bank', s.current_quiz::text, true);
  v_att := (submit_attempt(s.current_quiz, v_ans, coalesce(p_duration, 0), false) ->> 'attempt_id')::bigint;

  select sj.scale_id, st.ceiling_rank, st.entry_rank into v_scale, v_ceil, v_entry
    from quizzes b join subjects sj on sj.id = b.subject_id
    join scale_tiers st on st.scale_id = sj.scale_id and st.code = s.tier
   where b.id = s.current_quiz;

  -- ① التمهيد: أصاب أحدَهما ⇐ المحطّةُ الأولى حول نطاق الدخول · أخطأهما ⇐ مرّةً ثانية · ثمّ «موقوفة» بلا مستوى
  if s.stage = 'practice' then
    select coalesce(bool_or(a.is_correct), false) into v_ok from answers a where a.attempt_id = v_att;
    update placement_sessions
       set path = path || jsonb_build_object('kind', 'practice', 'attempt', v_att, 'ok', v_ok, 'at', now())
     where id = p_session;

    if not v_ok then
      if s.tries + 1 >= 2 then
        update placement_sessions set tries = s.tries + 1, stage = 'paused', station_q = null where id = p_session;
        return jsonb_build_object('ok', true, 'done', false, 'stage', 'paused');
      end if;
      update placement_sessions set tries = s.tries + 1 where id = p_session;
      return jsonb_build_object('ok', true, 'done', false, 'stage', 'practice', 'retry', true,
                                'quiz', get_quiz(s.current_quiz));
    end if;

    v_pick := placement_pick(p_session, v_entry);
    select array_agg((x.e #>> '{}')::bigint order by x.o) into v_q
      from jsonb_array_elements(v_pick->'q') with ordinality as x(e, o);
    update placement_sessions
       set stage = 'stations', station_q = v_q, est = jsonb_build_object('next', v_pick - 'q')
     where id = p_session;
    return jsonb_build_object('ok', true, 'done', false, 'stage', 'stations', 'station', 1,
                              'quiz', get_quiz(s.current_quiz));
  end if;

  -- ② المحطّة تُسجَّل في المسار بنصوصها ونطاقاتها ودرجتها — ثمّ التقديرُ من المسار كلِّه
  update placement_sessions
     set path = path || (coalesce(s.est->'next', '{}'::jsonb) || jsonb_build_object(
                  'kind', 'station',
                  'n', (select count(*) from jsonb_array_elements(s.path) e where e->>'kind' = 'station') + 1,
                  'attempt', v_att,
                  'raw', (select a.score from attempts a where a.id = v_att),
                  'of', (select a.total from attempts a where a.id = v_att),
                  'at', now()))
   where id = p_session;

  v_est := placement_estimate(p_session);
  update placement_sessions
     set path = jsonb_set(path, array[(jsonb_array_length(path) - 1)::text, 'est'], v_est)
   where id = p_session;

  select array_agg((x.e->>'attempt')::bigint order by x.o), count(*) into v_atts, v_n
    from placement_sessions ps, jsonb_array_elements(ps.path) with ordinality as x(e, o)
   where ps.id = p_session and x.e->>'kind' = 'station';
  v_passed := placement_passed(v_atts);
  select exists (select 1 from placement_sessions ps, jsonb_array_elements(ps.path) e,
                               jsonb_array_elements(coalesce(e->'bands', '[]'::jsonb)) bd
                  where ps.id = p_session and e->>'kind' = 'station' and (bd #>> '{}')::int <= 1) into v_r1;

  -- ③ التالية حول النطاق المقدَّر — ثلاثٌ، إلا أن تمنعها الأرضيّة فحتى خمس
  if v_n < 3 or (v_n < 5 and v_passed = 0 and not v_r1) then
    v_pick := placement_pick(p_session, (v_est->>'band')::int);
    select array_agg((x.e #>> '{}')::bigint order by x.o) into v_q
      from jsonb_array_elements(v_pick->'q') with ordinality as x(e, o);
    if v_q is not null then                                       -- بنكٌ نفد لا يُوقف الطالب: يُحسم بما عنده
      update placement_sessions
         set station_q = v_q, est = v_est || jsonb_build_object('next', v_pick - 'q')
       where id = p_session;
      return jsonb_build_object('ok', true, 'done', false, 'stage', 'stations', 'station', v_n + 1,
                                'quiz', get_quiz(s.current_quiz));
    end if;
  end if;

  -- ④ الحسم: (المقدَّر بلا قصّ − ١) ثمّ السقف ثمّ لا دون R1 — ومن لم ينجح في مقتطفٍ قطّ ⇐ R1 وبندٌ في جرس معلّمه
  v_raw   := floor(((v_est->>'eap')::numeric - ln(3::numeric)) / 0.4)::int;
  v_floor := v_passed = 0;
  v_place := case when v_floor then 1 else greatest(1, least(v_ceil, v_raw - 1)) end;
  select lv.id into v_level from levels lv where lv.scale_id = v_scale and lv.rank = v_place;

  update placement_sessions
     set stage = 'done', finished_at = now(), current_quiz = null, station_q = null, level_id = v_level,
         est = v_est || jsonb_build_object('raw', v_raw, 'placed', v_place, 'floor', v_floor, 'passed', v_passed)
   where id = p_session;

  v_set := set_my_level(v_scale, v_level, 'provisional');

  return jsonb_build_object('ok', true, 'done', true, 'provisional', true,
                            'level', (select lv.name from levels lv where lv.id = v_level),
                            'level_id', v_level, 'band', v_place, 'stations', v_n,
                            'saved', coalesce((v_set->>'ok')::boolean, false));
end $$;

revoke all on function public.placement_station(bigint)                          from public, anon, authenticated;
revoke all on function public.placement_bank(text, text)                         from public, anon, authenticated;
revoke all on function public.placement_practice(bigint)                         from public, anon, authenticated;
revoke all on function public.placement_bank_issues(bigint)                      from public, anon, authenticated;
revoke all on function public.placement_readiness(text)                          from public, anon, authenticated;
revoke all on function public.placement_pick(bigint, integer)                    from public, anon, authenticated;
revoke all on function public.placement_passed(bigint[])                         from public, anon, authenticated;
revoke all on function public.placement_estimate(bigint)                         from public, anon, authenticated;
revoke all on function public.placement_watches(uuid, text)                      from public, anon, authenticated;
revoke all on function public.placement_start_adaptive(text)                     from public, anon, authenticated;
revoke all on function public.placement_submit_adaptive(bigint, jsonb, integer)  from public, anon, authenticated;

-- ═══════════ منشأة: للمعلّم — والجرسُ يقرؤها ═══════════

-- جلساتٌ تنتظر المعلّم: الموقوفةُ حتى يستأنفها، ومن انتهى عند R1 حتى يراها
create or replace function public.placement_alerts()
returns jsonb
language sql stable security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'session', s.id, 'student', s.user_id, 'name', p.full_name, 'tier', s.tier, 'stage', s.stage,
           'placed', (s.est->>'placed')::int,
           'at', coalesce(s.finished_at, (select max((e->>'at')::timestamptz) from jsonb_array_elements(s.path) e), s.started_at))
           order by s.id), '[]'::jsonb)
    from placement_sessions s
    join profiles p on p.id = s.user_id
   where auth.uid() is not null and is_teacher()
     and (s.stage = 'paused'
          or (s.stage = 'done' and coalesce((s.est->>'floor')::boolean, false) and s.seen_at is null))
     and placement_watches(s.user_id, s.tool)
$$;

-- عددُ الجرس من القائمة نفسِها
create or replace function public.placement_alerts_count()
returns integer
language sql stable security definer
set search_path = public
as $$
  select jsonb_array_length(placement_alerts())
$$;

create or replace function public.placement_resume(p_session bigint)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare s placement_sessions;
begin
  select * into s from placement_sessions where id = p_session for update;
  if s.id is null or auth.uid() is null or not placement_watches(s.user_id, s.tool) then
    return jsonb_build_object('ok', false, 'error', 'ليست من جلسات طلابك');
  end if;
  if s.stage is distinct from 'paused' then
    return jsonb_build_object('ok', false, 'error', 'هذه الجلسة غير موقوفة');
  end if;
  update placement_sessions
     set stage = 'practice', tries = 0, station_q = placement_practice(s.current_quiz),
         path = path || jsonb_build_object('kind', 'resume', 'by', auth.uid(), 'at', now())
   where id = p_session;
  return jsonb_build_object('ok', true, 'session', p_session);
end $$;

create or replace function public.placement_seen(p_session bigint)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare s placement_sessions;
begin
  select * into s from placement_sessions where id = p_session for update;
  if s.id is null or auth.uid() is null or not placement_watches(s.user_id, s.tool) then
    return jsonb_build_object('ok', false, 'error', 'ليست من جلسات طلابك');
  end if;
  if s.stage is distinct from 'done' or not coalesce((s.est->>'floor')::boolean, false) then
    return jsonb_build_object('ok', false, 'error', 'لا تنبيه على هذه الجلسة');
  end if;
  update placement_sessions set seen_at = coalesce(seen_at, now()) where id = p_session;
  return jsonb_build_object('ok', true, 'session', p_session);
end $$;

revoke all on function public.placement_alerts()        from public, anon;
revoke all on function public.placement_alerts_count()  from public, anon;
revoke all on function public.placement_resume(bigint)  from public, anon;
revoke all on function public.placement_seen(bigint)    from public, anon;
grant execute on function public.placement_alerts()        to authenticated;
grant execute on function public.placement_alerts_count()  to authenticated;   -- `my_counts` تُنادى بصلاحيّة السائل
grant execute on function public.placement_resume(bigint)  to authenticated;
grant execute on function public.placement_seen(bigint)    to authenticated;

-- ═══════════ معدَّلة: رُقعٌ بعدّ نصّها — والقائمُ كما هو ═══════════

-- `get_quiz`: بنكٌ بعلامة المحرّك ⇐ أسئلةُ المحطّة الجارية بترتيبها، لا البنكُ كلُّه
do $$
declare v text; n int; i int;
        p text[] := array[
          'v_form bool; v_lanes jsonb;   -- 185 · النموذجُ وحاراتُه',
          'if not can_access(p_quiz) and not is_teacher() then',
          'if v_form then',
          'order by case when v_form then (select min(fx.position) from form_slots fx',
          'order by case when v_form then (select fx.position from form_slots fx   -- 185 · النموذجُ بترتيب سطوره'];
        r text[] := array[
          'v_form bool; v_lanes jsonb;   -- 185 · النموذجُ وحاراتُه' || chr(10)
            || '        v_station bigint[];          -- 213 · محطّةُ الجلسة التكيّفيّة (ق١٧)',
          'v_station := placement_station(p_quiz);   -- 213 · بنكُ الطبقة يفتحه المحرّكُ وحده' || chr(10)
            || '  if v_station is null and not can_access(p_quiz) and not is_teacher() then',
          'if v_station is not null then' || chr(10)
            || '    v_ids := v_station;   -- 213 · أسئلةُ المحطّة الجارية لا البنكُ كلُّه' || chr(10)
            || '  elsif v_form then',
          'order by (select min(array_position(v_station, zs.id)) from questions zs'
            || ' where zs.passage_id = pg.id and zs.id = any (v_station)),   -- 213 · بترتيب المحطّة: الأسهلُ أوّلاً' || chr(10)
            || '                 case when v_form then (select min(fx.position) from form_slots fx',
          'order by array_position(v_station, x.id),   -- 213 · بترتيب المحطّة' || chr(10)
            || '               case when v_form then (select fx.position from form_slots fx   -- 185 · النموذجُ بترتيب سطوره'];
begin
  v := pg_get_functiondef('public.get_quiz(bigint)'::regprocedure);
  if position('placement_station(' in v) > 0 then raise notice 'get_quiz تعرف محطّةَ الجلسة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'get_quiz (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `submit_attempt`: بالعلامة نفسِها يُقبل البنك، وتُصحَّح أسئلةُ المحطّة وحدها
do $$
declare v text; n int; i int;
        p text[] := array[
          'v_seq bigint[];   -- 210 · ترتيبُ الطالب',
          'if not can_access(p_quiz) then raise exception',
          'where q.id = (a->>''q'')::bigint'];
        r text[] := array[
          'v_seq bigint[];   -- 210 · ترتيبُ الطالب' || chr(10)
            || '  v_station bigint[];   -- 213 · محطّةُ الجلسة التكيّفيّة (ق١٧)',
          'v_station := placement_station(p_quiz);   -- 213 · بنكُ الطبقة بعلامة المحرّك وحدها' || chr(10)
            || '  if v_station is null and not can_access(p_quiz) then raise exception',
          'where q.id = (a->>''q'')::bigint' || chr(10)
            || '       and (v_station is null or q.id = any (v_station))   -- 213 · أسئلةُ المحطّة وحدها'];
begin
  v := pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure);
  if position('placement_station(' in v) > 0 then raise notice 'submit_attempt تعرف محطّةَ الجلسة من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'submit_attempt (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

-- `placement_start` · `placement_submit` · `tool_readiness`: أداةٌ ذاتُ بنوك طبقات ⇐ فرعُها — وجدولُ المسارات (IELTS) كما هو
do $$
declare v text; n int; p text;
begin
  v := pg_get_functiondef('public.placement_start(text)'::regprocedure);
  if position('placement_start_adaptive' in v) > 0 then
    raise notice 'placement_start تعرف الفرعَ التكيّفيّ من قبل';
  else
    p := '-- محطّة المدخل — وهي واحدةٌ يفرضها tool_readiness';
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'placement_start: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, p,
      '-- 213 · أداةٌ ذاتُ بنوك طبقات (ق١٧) ⇐ الجلسةُ التكيّفيّة' || chr(10)
      || '  if exists (select 1 from quizzes where tool = p_tool and station_kind = ''adaptive'') then' || chr(10)
      || '    return placement_start_adaptive(p_tool);' || chr(10)
      || '  end if;' || chr(10) || chr(10)
      || '  ' || p);
  end if;

  v := pg_get_functiondef('public.placement_submit(bigint,jsonb,integer)'::regprocedure);
  if position('placement_submit_adaptive' in v) > 0 then
    raise notice 'placement_submit تعرف الفرعَ التكيّفيّ من قبل';
  else
    p := '-- ① يُصحَّح ويُخزَّن بالمسار المعتاد';
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'placement_submit: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, p,
      '-- 213 · الجلسةُ التكيّفيّة (ق١٧) فرعُها' || chr(10)
      || '  if s.stage is not null then' || chr(10)
      || '    return placement_submit_adaptive(p_session, p_answers, p_duration);' || chr(10)
      || '  end if;' || chr(10) || chr(10)
      || '  ' || p);
  end if;

  v := pg_get_functiondef('public.tool_readiness(text)'::regprocedure);
  if position('placement_readiness' in v) > 0 then
    raise notice 'tool_readiness تعرف الأداةَ التكيّفيّة من قبل';
  else
    p := '-- ① محطّةٌ بلا مسارٍ يغادرها — إلا الإنتاجية فلا توجيه لها';
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'tool_readiness: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, p,
      '-- 213 · أداةٌ ذاتُ بنوك طبقات (ق١٧): حرّاسُها حرّاسُ البنك لا جدولِ المسارات' || chr(10)
      || '  if exists (select 1 from quizzes where tool = p_tool and station_kind = ''adaptive'') then' || chr(10)
      || '    return placement_readiness(p_tool);' || chr(10)
      || '  end if;' || chr(10) || chr(10)
      || '  ' || p);
  end if;
end $$;

-- `my_counts`: الجرسُ يعدّ جلساتٍ تنتظر المعلّم (⑤ · قرارُ المالك)
do $$
declare v text; n int; i int;
        p text[] := array[
          'v_feedback int; v_messages int; v_due int; v_grading int; v_requests int;',
          'v_requests := admin_pending_count();',
          '''bell'',     v_grading + v_messages + v_requests);'];
        r text[] := array[
          'v_feedback int; v_messages int; v_due int; v_grading int; v_requests int; v_place int;',
          'v_requests := admin_pending_count();' || chr(10)
            || '  v_place    := placement_alerts_count();     -- 213 · جلساتٌ تنتظر المعلّم (ق١٧ · قرارُ المالك: الجرس)',
          '''placement'', v_place,' || chr(10)
            || '    ''bell'',     v_grading + v_messages + v_requests + v_place);'];
begin
  v := pg_get_functiondef('public.my_counts()'::regprocedure);
  if position('placement_alerts_count' in v) > 0 then raise notice 'my_counts تعدّ جلساتِ التسكين من قبل'; return; end if;
  for i in 1 .. array_length(p, 1) loop
    n := (length(v) - length(replace(v, p[i], ''))) / length(p[i]);
    if n <> 1 then raise exception 'my_counts (الرقعة %): وُجد النصّ % مرّة لا مرّةً واحدة', i, n; end if;
    v := replace(v, p[i], r[i]);
  end loop;
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('213', 'محرّكُ تحديد المستوى (ق١٧) ② — الجلسة', now())
on conflict (n) do update set applied_at = now();
