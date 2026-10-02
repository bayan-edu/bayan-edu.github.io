-- ══════════════════════════════════════════════════════════════════════
--  بيان — 137_import_strands.sql  ·  معلّمُ المادة يكتب فروعها
-- ══════════════════════════════════════════════════════════════════════
--
--  ┌─────────────────────────── لماذا ───────────────────────────┐
--  │  فروعُ العربية (READ · GRA) كتبناها نحن في المحرّر، لا        │
--  │  معلّمُ المادة. ثمّ صار الملفّ 136 يسأله أن **يختار** منها.   │
--  │                                                              │
--  │  وذاك مقلوب: الفروعُ طبيعةُ المادة لا إعدادُ منصّة.           │
--  │  العربيةُ فروعُها بيّنةٌ على كلّ درس · الإنجليزيةُ تقسيمُها    │
--  │  مختلف · والتاريخُ قد لا يكون له فروعٌ أصلاً.                │
--  │  ⇒ فمن يعرف المادة يكتبها، ومن لا فرعَ لمادته لا يُلزَم.      │
--  └──────────────────────────────────────────────────────────────┘
--
--  ⇒ صار ملفُّ المعلّم يحمل شيئين: **فروعَ المادة ودروسَ الفصل**.
--     ولمَ في ملفٍّ واحد؟ لأنّ إدراج أوّل فرعٍ يوقظ حارسَ النشر في
--     `publish_lesson` (درسٌ بلا فرعٍ لا يُنشر). فلو جاءت الفروعُ في
--     دفعةٍ والوسمُ في أخرى، لبقي ما بينهما درساً **مكتوباً لا يُنشر**
--     ولا يقول أحدٌ لماذا.
--
--  ✅ **وبلا فروعٍ لا شكوى:** مادةٌ لا فروعَ لها (التاريخ) تُرسل دروسَها
--     بلا `strand` ولا `strands` — ولا تحذير. والحارسُ نائمٌ أصلاً.
--
--  ⚙️ **والكتابةُ تمرّ بـ`save_strand` لا بإدراجٍ مباشر** — فهي الكاتبُ
--     الوحيد، وفيها صيغةُ الكود والتفرّد والحرّاس. وما يُفحص هنا يُفحص
--     **في التجربة الجافّة**، لأنّها لا تنادي الكاتبَ فلا تُظهر رفضَه.
--
--  🔴 **ولا حذف.** فرعٌ قائمٌ غائبٌ عن الملفّ **يُبلَّغ ولا يُمَسّ**:
--     حذفُه يُيتِّم وسمَ دروسٍ ومحاولاتٍ مضت، وسهوُ معلّمٍ عن سطرٍ
--     لا يُترجَم هدماً.
--
--  ⚠️ وحارسٌ ليس في القاعدة ويلزم هنا: **ورقةٌ موسومٌ بها درسٌ لا تصير
--     أباً لغيرها.** (`READ` موسومٌ به الدرس 17.) لأنّ القاعدة تقبل ذلك
--     بنيوياً، والعقدَ يرفضه: «يُوسَم أصغرُ ما لا ينقسم». فدرسٌ موسومٌ
--     بحاوية يُفسد النسبةَ صامتاً.
--
--  يتطلّب 136 · 79. آمنٌ للإعادة.
--
--  ⓪ · قبل التشغيل:
--     select (floor(max(sql_log_sort(n))) + 1)::text as الرقم_التالي from sql_log;
--     -- المتوقَّع 137
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ معدَّلة لا منشأة · import_lesson_map ═══════════
--
--  أصلُها 131 · نطاقُ المفتاح 132 · كودُ الفرع 136. والنصُّ منسوخٌ عن
--  الحيّ، والتغييرُ **ستّةُ مواضعَ معلَّمةٌ بـ🆕**:
--    ① جدولٌ ثانٍ للفروع الواردة، وأكوادُها تُحلّ إلى معرّفات
--    ② خمسةُ أخطاءٍ تردّ الدفعة: الصيغة · التكرار · أبٌ غائب ·
--       عمقٌ ثالث · وورقةٌ موسومةٌ تصير أباً
--    ③ وسمُ الدرس يُقبل بكودٍ **في الملفّ** ولو لم يكن في القاعدة بعد
--    ④ الخطّةُ تعرض الفروع، وتُبلّغ عن القائم الغائب عن الملفّ
--    ⑤ التنفيذ: الفروعُ قبل الدروس، والآباءُ قبل الأبناء، بـ`save_strand`
--    ⑥ التحذيرُ يسكت إن لم يكن للمادة فرعٌ ولا في الملفّ فرع

create or replace function public.import_lesson_map(
  p_course bigint, p_payload jsonb,
  p_dry_run boolean default true, p_allow_retitle boolean default false)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_subject bigint; v_level bigint;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_new jsonb := '[]'::jsonb; v_upd jsonb := '[]'::jsonb; v_out jsonb := '[]'::jsonb;
  v_snew jsonb := '[]'::jsonb; v_supd jsonb := '[]'::jsonb;
  v_res jsonb; v_unit bigint; v_id bigint; v_cur record; r record; v_out_json jsonb;
  v_sid bigint; v_pid bigint; v_has_strands boolean;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id, c.level_id into v_subject, v_level from courses c where c.id = p_course;
  if not found then return jsonb_build_object('ok', false, 'error', 'المقرّر غير موجود'); end if;

  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'استيراد خرائط الدروس لفريق الإشراف');
  end if;

  perform pg_advisory_xact_lock(hashtext('import_lesson_map'), v_subject::int);

  if jsonb_typeof(p_payload->'lessons') <> 'array'
     or jsonb_array_length(p_payload->'lessons') = 0 then
    return jsonb_build_object('ok', false, 'error', 'الدفعة بلا دروس');
  end if;

  if p_payload ? 'strands' and jsonb_typeof(p_payload->'strands') <> 'array' then
    return jsonb_build_object('ok', false, 'error', 'الفروع تُرسل قائمةً أو لا تُرسل');
  end if;

  -- ═══ 🆕 ① الفروعُ الواردة ═══
  drop table if exists _str;
  create temp table _str on commit drop as
  select e.ord_in                                    as seq,
         upper(nullif(trim(e.value->>'code'), ''))    as code,
         nullif(trim(e.value->>'name'), '')           as name,
         upper(nullif(trim(e.value->>'parent'), ''))  as parent_code,
         nullif(trim(e.value->>'sort'), '')           as sort_raw
    from jsonb_array_elements(coalesce(p_payload->'strands', '[]'::jsonb))
         with ordinality as e(value, ord_in);

  alter table _str add column id bigint;
  update _str set id = (select s.id from strands s
                         where s.subject_id = v_subject and s.code = _str.code);

  drop table if exists _map;
  create temp table _map on commit drop as
  select e.ord_in as seq,
         nullif(trim(e.value->>'key'), '')         as k,
         nullif(trim(e.value->>'title'), '')       as title,
         nullif(trim(e.value->>'unit'), '')        as unit,
         nullif(trim(e.value->>'summary'), '')     as summary,
         upper(nullif(trim(e.value->>'strand'), '')) as strand_code,
         nullif(trim(e.value->>'order'), '')       as ord_raw,
         nullif(trim(e.value->>'existing_id'), '') as ex_raw
    from jsonb_array_elements(p_payload->'lessons') with ordinality as e(value, ord_in);

  alter table _map add column ord int;
  alter table _map add column ex  bigint;
  alter table _map add column strand bigint;
  update _map set ord = case when ord_raw ~ '^[0-9]{1,4}$' then ord_raw::int end,
                  ex  = case when ex_raw  ~ '^[0-9]{1,18}$' then ex_raw::bigint end;

  update _map set strand = (select st.id from strands st
                             where st.subject_id = v_subject and st.code = _map.strand_code);

  select array_agg('سطر ' || seq || ': المفتاح مفقود أو مخالف للصيغة')
    into v_tmp from _map where k is null or k !~ '^[A-Za-z0-9_.-]{2,40}$';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('مفتاحٌ مكرَّرٌ في الدفعة: ' || k)
    into v_tmp from (select k from _map where k is not null group by k having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || seq || ': العنوان مفقود') into v_tmp from _map where title is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || seq || ': الترتيب مفقود أو ليس رقماً') into v_tmp from _map where ord is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('ترتيبٌ مكرَّرٌ في الدفعة: ' || ord)
    into v_tmp from (select ord from _map where ord is not null group by ord having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || m.seq || ': الدرس ' || m.ex || ' ليس في هذا المقرّر')
    into v_tmp from _map m
   where m.ex is not null
     and not exists (select 1 from lessons l where l.id = m.ex and l.course_id = p_course);
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('المفتاح ' || m.k || ' مرتبطٌ بدرسٍ آخر في المقرّر (' || l.id || ')')
    into v_tmp from _map m
    join lessons l on l.course_id = p_course and l.author_key = m.k
   where m.ex is not null and l.id <> m.ex;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('الدرس ' || l.id || ' يحمل المفتاح ' || l.author_key || ' ولا يقبل ' || m.k)
    into v_tmp from _map m join lessons l on l.id = m.ex
   where l.author_key is not null and l.author_key <> m.k;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ═══ 🆕 ② حرّاسُ الفروع — تُفحص في الجافّة لأنّها لا تنادي save_strand ═══

  -- صيغةُ الكود كما في save_strand حرفاً: حروفٌ لاتينية كبيرة، حتى ١٢
  select array_agg('فرع ' || seq || ': الكود مفقود أو مخالف للصيغة (حروف لاتينية كبيرة حتى ١٢)')
    into v_tmp from _str where code is null or code !~ '^[A-Z][A-Z0-9_]{0,11}$';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('فرع ' || seq || ': الاسم مفقود') into v_tmp from _str where name is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('كودُ فرعٍ مكرَّرٌ في الملفّ: ' || code)
    into v_tmp from (select code from _str where code is not null group by code having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('اسمُ فرعٍ مكرَّرٌ في الملفّ: ' || name)
    into v_tmp from (select min(name) as name from _str where name is not null
                      group by norm_ar(name) having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- اسمٌ يحمله فرعٌ آخرُ في المادة — save_strand ترفضه
  select array_agg('فرع ' || t.seq || ': الاسم «' || t.name || '» يحمله الفرع ' || s.code || ' في المادة')
    into v_tmp from _str t join strands s
      on s.subject_id = v_subject and norm_ar(s.name) = norm_ar(t.name) and s.code <> t.code;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- أبٌ غائب: لا في الملفّ ولا في المادة
  select array_agg('فرع ' || t.seq || ': الفرع الأعلى «' || t.parent_code || '» غير موجود')
    into v_tmp from _str t
   where t.parent_code is not null
     and not exists (select 1 from _str p where p.code = t.parent_code)
     and not exists (select 1 from strands s where s.subject_id = v_subject and s.code = t.parent_code);
  v_err := v_err || coalesce(v_tmp, '{}');

  -- عمقٌ ثالث: أبٌ له أبٌ — في الملفّ أو في القاعدة
  select array_agg('فرع ' || t.seq || ': العمق طبقتان — «' || t.parent_code || '» فرعٌ لغيره')
    into v_tmp from _str t
   where t.parent_code is not null
     and (exists (select 1 from _str p where p.code = t.parent_code and p.parent_code is not null)
       or exists (select 1 from strands s where s.subject_id = v_subject
                   and s.code = t.parent_code and s.parent_id is not null));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ورقةٌ موسومٌ بها درسٌ أو مصدرٌ لا تصير أباً (حكمُ العقد لا حكمُ القاعدة)
  select array_agg('فرع ' || t.seq || ': «' || t.parent_code
                   || '» موسومٌ به محتوًى قائم، فلا يصير أباً — انقل وسمَه أوّلاً')
    into v_tmp from _str t
    join strands s on s.subject_id = v_subject and s.code = t.parent_code
   where t.parent_code is not null
     and (exists (select 1 from lessons l where l.strand_id = s.id and l.archived_at is null)
       or exists (select 1 from items   i where i.strand_id = s.id));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ═══ 🆕 ③ وسمُ الدرس: يُقبل كودٌ في الملفّ ولو لم يُكتب بعد ═══
  select array_agg('سطر ' || seq || ': الفرع «' || strand_code || '» ليس من فروع المادة ولا في هذا الملفّ')
    into v_tmp from _map
   where strand_code is not null and strand is null
     and not exists (select 1 from _str t where t.code = _map.strand_code);
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || m.seq || ': الفرع «' || m.strand_code || '» حاوٍ لا ورقة — يُوسَم بورقةٍ تحته')
    into v_tmp from _map m
   where m.strand_code is not null
     and (exists (select 1 from _str c where c.parent_code = m.strand_code)
       or exists (select 1 from strands c join strands p on p.id = c.parent_id
                   where p.subject_id = v_subject and p.code = m.strand_code));
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'أخطاء', to_jsonb(v_err));
  end if;

  select array_agg('الدرس ' || l.id || ': العنوان في الخريطة يخالف القاعدة — '
                   || case when p_allow_retitle then 'سيُغيَّر' else 'لم يُغيَّر' end)
    into v_tmp from _map m
    join lessons l on l.id = coalesce(m.ex, (select l2.id from lessons l2
                                              where l2.course_id = p_course and l2.author_key = m.k))
   where l.title is distinct from m.title;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- 🆕 ④ فرعٌ قائمٌ غائبٌ عن الملفّ — يُبلَّغ ولا يُمَسّ
  if exists (select 1 from _str) then
    select array_agg('الفرع ' || s.code || ' («' || s.name || '») قائمٌ وليس في الملفّ — لم يُمَسّ')
      into v_tmp from strands s
     where s.subject_id = v_subject
       and not exists (select 1 from _str t where t.code = s.code);
    v_warn := v_warn || coalesce(v_tmp, '{}');
  end if;

  -- 🆕 ⑥ هل للمادة فروعٌ بعد هذا الملفّ؟ وبلا فروعٍ لا تحذير (التاريخ)
  v_has_strands := exists (select 1 from strands st where st.subject_id = v_subject)
                or exists (select 1 from _str);

  if v_has_strands then
    select array_agg('«' || m.title || '» بلا فرع — يُوسَم الدرس أو مكوّنُه الرسميّ قبل النشر')
      into v_tmp from _map m
      left join lessons l on l.id = coalesce(m.ex, (select l2.id from lessons l2
                                                      where l2.course_id = p_course and l2.author_key = m.k))
     where m.strand_code is null and l.strand_id is null;
    v_warn := v_warn || coalesce(v_tmp, '{}');
  end if;

  -- 🆕 ④ خطّةُ الفروع
  select coalesce(jsonb_agg(jsonb_build_object('code', code, 'name', name, 'parent', parent_code)
                            order by seq), '[]'::jsonb)
    into v_snew from _str where id is null;

  select coalesce(jsonb_agg(jsonb_build_object('code', t.code, 'name', t.name, 'parent', t.parent_code,
                              'الاسم السابق', s.name) order by t.seq), '[]'::jsonb)
    into v_supd from _str t join strands s on s.id = t.id;

  select coalesce(jsonb_agg(jsonb_build_object('key', k, 'title', title, 'order', ord,
                                               'strand', strand_code) order by ord), '[]'::jsonb)
    into v_new from _map where ex is null
     and not exists (select 1 from lessons l where l.course_id = p_course and l.author_key = _map.k);

  select coalesce(jsonb_agg(jsonb_build_object('id', coalesce(m.ex, l2.id), 'key', m.k,
                    'title', m.title, 'order', m.ord,
                    'strand', coalesce(m.strand_code,
                                       (select st.code from strands st where st.id = lx.strand_id))
                  ) order by m.ord), '[]'::jsonb)
    into v_upd from _map m
    left join lessons l2 on l2.course_id = p_course and l2.author_key = m.k
    left join lessons lx on lx.id = coalesce(m.ex, l2.id)
   where m.ex is not null or l2.id is not null;

  select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'title', l.title,
           'أسئلة', (select count(*) from questions q join items i on i.quiz_id = q.quiz_id
                      where i.lesson_id = l.id and q.retired_at is null))), '[]'::jsonb)
    into v_out from lessons l
   where l.course_id = p_course and l.archived_at is null
     and not exists (select 1 from _map m
                      where m.ex = l.id or (l.author_key is not null and m.k = l.author_key));

  v_out_json := jsonb_build_object('ok', true, 'تجريبيّة', p_dry_run, 'المقرّر', p_course,
    'المادة', v_subject,
    'فروعٌ ستُنشأ', v_snew, 'فروعٌ ستُحدَّث', v_supd,
    'سيُنشأ', v_new, 'سيُحدَّث', v_upd,
    'خارج الخريطة', v_out, 'تحذيرات', to_jsonb(v_warn));

  if not p_dry_run then

    -- 🆕 ⑤ الفروعُ قبل الدروس، والآباءُ قبل الأبناء — وبـ`save_strand` لا بإدراج
    for r in select * from _str where parent_code is null order by seq loop
      select s.id into v_sid from strands s where s.subject_id = v_subject and s.code = r.code;
      v_res := save_strand(p_id => v_sid, p_subject => v_subject, p_parent => null,
                           p_code => r.code, p_name => r.name,
                           p_sort => case when r.sort_raw ~ '^[0-9]{1,4}$'
                                          then r.sort_raw::int else r.seq::int end);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر الفرع «%» : %', r.code, coalesce(v_res->>'error','؟');
      end if;
    end loop;

    for r in select * from _str where parent_code is not null order by seq loop
      select s.id into v_sid from strands s where s.subject_id = v_subject and s.code = r.code;
      select s.id into v_pid from strands s where s.subject_id = v_subject and s.code = r.parent_code;
      v_res := save_strand(p_id => v_sid, p_subject => v_subject, p_parent => v_pid,
                           p_code => r.code, p_name => r.name,
                           p_sort => case when r.sort_raw ~ '^[0-9]{1,4}$'
                                          then r.sort_raw::int else r.seq::int end);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر الفرع «%» : %', r.code, coalesce(v_res->>'error','؟');
      end if;
    end loop;

    -- وتُعاد قراءةُ أكواد الدروس: الفروعُ الجديدة صارت لها معرّفات
    update _map set strand = (select st.id from strands st
                               where st.subject_id = v_subject and st.code = _map.strand_code);

    for r in select * from _map order by ord loop
      v_unit := null;
      if r.unit is not null then
        select u.id into v_unit from units u where u.course_id = p_course and u.title = r.unit;
        if v_unit is null then
          insert into units (course_id, title, position)
          values (p_course, r.unit,
                  coalesce((select max(u2.position) from units u2 where u2.course_id = p_course),0)+1)
          returning id into v_unit;
        end if;
      end if;

      v_id := r.ex;
      if v_id is null then
        select l.id into v_id from lessons l where l.course_id = p_course and l.author_key = r.k;
      end if;

      if v_id is null then
        v_res := save_lesson(p_id => null, p_course => p_course, p_title => r.title,
                             p_unit_id => v_unit, p_summary => r.summary, p_position => r.ord,
                             p_requires => null, p_pass_mark => 65, p_published => false,
                             p_strand => r.strand);
      else
        select l.title, l.published, l.requires_id, l.pass_mark, l.strand_id, l.unit_id, l.summary
          into v_cur from lessons l where l.id = v_id;
        v_res := save_lesson(p_id => v_id, p_course => p_course,
                             p_title => case when p_allow_retitle then r.title else v_cur.title end,
                             p_unit_id => coalesce(v_unit, v_cur.unit_id),
                             p_summary => coalesce(r.summary, v_cur.summary),
                             p_position => r.ord, p_requires => v_cur.requires_id,
                             p_pass_mark => v_cur.pass_mark, p_published => v_cur.published,
                             p_strand => coalesce(r.strand, v_cur.strand_id));
      end if;

      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر الدرس «%» : %', r.title, coalesce(v_res->>'error','؟');
      end if;

      update lessons set author_key = r.k where id = (v_res->>'id')::bigint;
    end loop;
  end if;

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('lesson_map', p_course, v_subject, p_payload, v_out_json, p_dry_run, auth.uid());

  return v_out_json;
end
$function$;

grant execute on function public.import_lesson_map(bigint, jsonb, boolean, boolean)
  to authenticated, service_role;


-- ═══════════ السجلّ ═══════════

insert into public.sql_log (n, title, applied_at)
values ('137', 'معلّمُ المادة يكتب فروعها مع دروسه — ولا حذفَ ولا إلزام', now())
on conflict (n) do update set applied_at = now();


-- ══════════════════════════════════════════════════════════════════════
--  الفحص — ستّةُ أسئلةٍ مستقلّة، وكلُّها **جافّة** (القاعدة ④)
--  ويُقاس قبلها وبعدها: عددُ فروع المادة وعددُ دروس المقرّر لا يتغيّران.
-- ══════════════════════════════════════════════════════════════════════
--
--  ① فرعٌ جديد ووسمٌ به في نفس الملفّ ⇒ «فروعٌ ستُنشأ» فيه، ولا خطأ
--     {"strands":[{"code":"RHET","name":"بلاغة"}],
--      "lessons":[{"key":"ZZ.R1","order":1,"title":"…","strand":"RHET"}]}
--
--  ② كودٌ مخالفُ الصيغة ⇒ تُردّ الدفعة
--     "code":"rhet-1"   أو   "code":"BALAGHA_TAWEEL"
--
--  ③ أبٌ غائب ⇒ تُردّ: «الفرع الأعلى «XX» غير موجود»
--
--  ④ 🔑 ورقةٌ موسومٌ بها درسٌ تصير أباً ⇒ تُردّ
--     {"strands":[{"code":"RHET","name":"بلاغة","parent":"READ"}], …}
--     المتوقَّع: «READ موسومٌ به محتوًى قائم، فلا يصير أباً»
--     (الدرس 17 موسومٌ بـREAD — وهذا الفحصُ أهمُّ ما في الملفّ)
--
--  ⑤ فرعٌ قائمٌ غائبٌ عن الملفّ ⇒ **تحذيرٌ** لا خطأ، ولا يُحذف
--
--  ⑥ مادةٌ بلا فروعٍ (التاريخ · مقرّر 10) ودروسٌ بلا strand ⇒ لا تحذير
--
--  ⑦ · الختام: ① sql_log ✅ · ② العلل في الرأس ✅ · ③ STATE ⬜ ·
--     ④ BUILD لا يلزم · ⑤ 00_schema لا يلزم (دالّةٌ معدَّلة لا بنية)
-- ══════════════════════════════════════════════════════════════════════
