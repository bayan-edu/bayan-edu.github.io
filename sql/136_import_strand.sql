-- ══════════════════════════════════════════════════════════════════════
--  بيان — 136_import_strand.sql  ·  الخريطةُ تحمل الفرع
-- ══════════════════════════════════════════════════════════════════════
--
--  ┌─────────────────────────── لماذا ───────────────────────────┐
--  │  عقدُ التأليف (§⑦) يقول: العربيةُ والرياضياتُ والعلومُ        │
--  │  والتاريخُ والفلسفةُ **تُوسَم على الدرس**.                     │
--  │  و`import_lesson_map` كانت تُدرج كلَّ درسٍ جديد بـ             │
--  │  `p_strand => null`.                                         │
--  │  ⇒ **المهارةُ تطلب وسماً لا تنقله القناة.**                   │
--  └──────────────────────────────────────────────────────────────┘
--
--  وأثرُه ليس نظريّاً: في `publish_lesson` حارسٌ مشروط — إن وُجد
--  للمادة فروعٌ فلا يُنشر درسٌ بلا فرعٍ له أو لمكوّنٍ رسميٍّ موسوم.
--  وفروعُ العربية **مكتوبةٌ** (`READ` · `GRA`) ⇒ فخريطةُ الترم الأول
--  كانت ستهبط كاملةً **غيرَ قابلةٍ للنشر**، والسببُ لا يظهر إلا عند
--  أوّل محاولةِ نشرٍ بعد كتابة الأسئلة — أي بعد أسابيع من العمل.
--
--  🔑 **ولمَ يحمله المؤلّف لا المشرف؟** لأنّ الوسمَ حكمٌ على مضمون
--     الدرس، ومن قسّم المقرّرَ يعرفه. ووسمُ عشرين درساً بيدٍ في
--     المحرّر عملٌ صامتٌ يُنسى — فتبقى الخريطةُ كلُّها محجوبةً بلا
--     أن يسأل أحدٌ لماذا. **والعملُ المنسيُّ عطلٌ صامتٌ مؤجَّل.**
--
--  ⚙️ والحرّاسُ ليسوا جديدين: `save_lesson` تردّ الفرعَ الغريبَ عن
--     المادة والفرعَ الحاويَ أصلاً. لكنّها **لا تُنادى في التجربة
--     الجافّة** — فكان الخطأ يظهر عند الاعتماد لا عند عرض الفرق.
--     ⇒ فُحص الكودُ هنا أيضاً، ليُردّ في الجافّة بسطره.
--     **والتكرارُ مقصود: حارسٌ يحرس، وفحصٌ يُري.**
--
--  ⚠️ وتحذيرٌ لا خطأ حين يأتي الدرسُ بلا فرعٍ والمادةُ لها فروع:
--     لأنّ الإنجليزيةَ والفرنسيةَ تُوسَمان على المكوّن لا الدرس (§⑦)،
--     فخطأٌ هنا يمنع مادةً تعمل بالعقد. والتحذيرُ يُقرأ في الفرق.
--
--  ⚪ وملاحظةٌ لا تُمَسّ: `anon` يملك EXECUTE على الدالّة من قبل،
--     وحرّاسُها (`auth.uid()` ثمّ `can_curate`) تجعله بلا أثر.
--     يُسجَّل ليُرى، ولا يُصلَح في ملفٍّ غرضُه غيرُه.
--
--  يتطلّب 131 · 132 (المفتاح ونطاقه) · 79 (الفروع). آمنٌ للإعادة.
--
--  ⓪ · قبل التشغيل:
--     select (floor(max(sql_log_sort(n))) + 1)::text as الرقم_التالي from sql_log;
--     -- المتوقَّع 136
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ معدَّلة لا منشأة · import_lesson_map ═══════════
--
--  أصلُها في `131`، ونطاقُ مفتاحها في `132`. والنصُّ أدناه منسوخٌ عن
--  `pg_get_functiondef` الحيّ، والتغييرُ **خمسةُ مواضعَ معلَّمةٌ بـ🆕**:
--    ① `_map` يقبل `strand` (كود الفرع) ويحلّه إلى معرّف
--    ② خطآن يردّان الدفعة: كودٌ ليس من فروع المادة · كودٌ حاوٍ لا ورقة
--    ③ تحذيرٌ: درسٌ بلا فرعٍ والمادةُ لها فروع
--    ④ الخطّةُ تُظهر الفرع في «سيُنشأ» و«سيُحدَّث»
--    ⑤ التنفيذُ يمرّره — والغيابُ يحفظ القائم لا يمحوه

create or replace function public.import_lesson_map(
  p_course bigint, p_payload jsonb,
  p_dry_run boolean default true, p_allow_retitle boolean default false)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_subject bigint; v_level bigint;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_new jsonb := '[]'::jsonb; v_upd jsonb := '[]'::jsonb; v_out jsonb := '[]'::jsonb;
  v_res jsonb; v_unit bigint; v_id bigint; v_cur record; r record; v_out_json jsonb;
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

  drop table if exists _map;
  create temp table _map on commit drop as
  select e.ord_in as seq,
         nullif(trim(e.value->>'key'), '')         as k,
         nullif(trim(e.value->>'title'), '')       as title,
         nullif(trim(e.value->>'unit'), '')        as unit,
         nullif(trim(e.value->>'summary'), '')     as summary,
         nullif(trim(e.value->>'strand'), '')      as strand_code,   -- 🆕 ①
         nullif(trim(e.value->>'order'), '')       as ord_raw,
         nullif(trim(e.value->>'existing_id'), '') as ex_raw
    from jsonb_array_elements(p_payload->'lessons') with ordinality as e(value, ord_in);

  alter table _map add column ord int;
  alter table _map add column ex  bigint;
  alter table _map add column strand bigint;                          -- 🆕 ①
  update _map set ord = case when ord_raw ~ '^[0-9]{1,4}$' then ord_raw::int end,
                  ex  = case when ex_raw  ~ '^[0-9]{1,18}$' then ex_raw::bigint end;

  -- 🆕 ① الكودُ يُحلّ إلى معرّف — والمطابقةُ على (المادة · الكود)، وهي فريدة
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

  -- 🆕 ② كودٌ لا يقابله فرعٌ في المادة — نظيرُ حارسِ save_lesson، لكن في الجافّة
  select array_agg('سطر ' || seq || ': الفرع «' || strand_code || '» ليس من فروع المادة')
    into v_tmp from _map where strand_code is not null and strand is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- 🆕 ② وفرعٌ حاوٍ لا يُوسَم به: «يُوسَم أصغرُ ما لا ينقسم» (العقد §⑦)
  select array_agg('سطر ' || m.seq || ': الفرع «' || m.strand_code || '» حاوٍ لا ورقة — يُوسَم بورقةٍ تحته')
    into v_tmp from _map m
   where m.strand is not null
     and exists (select 1 from strands c where c.parent_id = m.strand);
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

  -- 🆕 ③ تحذيرٌ لا خطأ: الإنجليزيةُ تُوسَم على المكوّن، فخطأٌ هنا يمنع مادةً
  --      تعمل بالعقد. والحارسُ في publish_lesson يقبل وسمَ المكوّن الرسميّ.
  if exists (select 1 from strands st where st.subject_id = v_subject) then
    select array_agg('«' || m.title || '» بلا فرع — يُوسَم الدرس أو مكوّنُه الرسميّ قبل النشر')
      into v_tmp from _map m
      left join lessons l on l.id = coalesce(m.ex, (select l2.id from lessons l2
                                                      where l2.course_id = p_course and l2.author_key = m.k))
     where m.strand is null and l.strand_id is null;
    v_warn := v_warn || coalesce(v_tmp, '{}');
  end if;

  -- 🆕 ④ الفرعُ يُعرض في الخطّة — فما لا يُرى في الفرق يُعتمد بلا قراءة
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
    'المادة', v_subject, 'سيُنشأ', v_new, 'سيُحدَّث', v_upd,
    'خارج الخريطة', v_out, 'تحذيرات', to_jsonb(v_warn));

  if not p_dry_run then
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
                             p_strand => r.strand);                   -- 🆕 ⑤
      else
        select l.title, l.published, l.requires_id, l.pass_mark, l.strand_id, l.unit_id, l.summary
          into v_cur from lessons l where l.id = v_id;
        v_res := save_lesson(p_id => v_id, p_course => p_course,
                             p_title => case when p_allow_retitle then r.title else v_cur.title end,
                             p_unit_id => coalesce(v_unit, v_cur.unit_id),
                             p_summary => coalesce(r.summary, v_cur.summary),
                             p_position => r.ord, p_requires => v_cur.requires_id,
                             p_pass_mark => v_cur.pass_mark, p_published => v_cur.published,
                             p_strand => coalesce(r.strand, v_cur.strand_id));  -- 🆕 ⑤
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

-- المنحُ يُعاد صريحاً — والقسم ⑧ في المخطّط يسحب الافتراضيّ يوماً
grant execute on function public.import_lesson_map(bigint, jsonb, boolean, boolean)
  to authenticated, service_role;


-- ═══════════ السجلّ ═══════════

insert into public.sql_log (n, title, applied_at)
values ('136', 'الخريطةُ تحمل الفرع — فلا تهبط دروسٌ لا تُنشر', now())
on conflict (n) do update set applied_at = now();


-- ══════════════════════════════════════════════════════════════════════
--  الفحص — ثلاثةُ أسئلةٍ مستقلّة، كلٌّ يخصّ موضعَه (القاعدة ④)
--  وكلُّها **جافّة**: عددُ دروس المقرّر لا يتغيّر، ويُقاس.
-- ══════════════════════════════════════════════════════════════════════
--
--  ① الفرعُ السليم يُعرض في الخطّة:
--     payload: {"lessons":[{"key":"U1.READ1","order":1,"title":"…","strand":"READ"}]}
--     المتوقَّع: سيُنشأ ⇒ strand = "READ"
--
--  ② كودٌ لا وجودَ له ⇒ الدفعةُ تُردّ كاملةً بسطرها:
--     "strand":"ZZZ"  ⇒  مرفوضة: «سطر 1: الفرع «ZZZ» ليس من فروع المادة»
--
--  ③ درسٌ بلا فرعٍ في مادةٍ لها فروع ⇒ تحذيرٌ لا رفض:
--     بلا strand ⇒ تحذيرات: «… بلا فرع — يُوسَم الدرس أو مكوّنُه…»
--
--  ⑥ · الختام الخمسة: ① سطر sql_log ✅ · ② العلل في الرأس ✅ ·
--     ③ STATE ⬜ · ④ BUILD لا يلزم (لا واجهة) ·
--     ⑤ 00_schema: دالّةٌ معدَّلةٌ لا بنيةٌ جديدة ⇒ لا يلزم
-- ══════════════════════════════════════════════════════════════════════
