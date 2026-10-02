-- ══════════════════════════════════════════════════════════════════════
--  بيان — 135_unit_one_source.sql  ·  الوحدةُ مصدرٌ واحد
-- ══════════════════════════════════════════════════════════════════════
--
--  ┌─────────────────────────── لماذا ───────────────────────────┐
--  │  للوحدة اسمانِ في القاعدة:                                   │
--  │     ① صفٌّ في `units` يُشار إليه بـ`lessons.unit_id`          │
--  │     ② نصٌّ في `lessons.unit` — من عهدٍ سابقٍ للجدول           │
--  │  ولا شيءَ في المنصّة اليوم يكتب ②: `save_lesson` تكتب         │
--  │  `unit_id` وحدها، و`import_lesson_map` تُنشئ الصفَّ ثمّ        │
--  │  تناديها. فالعمودُ ميّتٌ عند الكتابة، حيٌّ عند القراءة —       │
--  │  وتلك أسوأُ حال: **لا يُحدَّث ويُقرأ.**                        │
--  └──────────────────────────────────────────────────────────────┘
--
--  🔎 والفحص (١ أكتوبر ٢٠٢٦) وجد ثلاثة مواضع لا موضعاً:
--
--  ① **بيانات:** درسا العلوم المتكاملة (`1` · `2`) لهما نصُّ وحدةٍ ولا
--     `unit_id`. وبقيّةُ الدروس العشرة بـ`unit_id` ولا نصّ.
--     ⇒ **وشاشتان تختلفان على الدرس الواحد:** شجرةُ المحرّر تجمع
--     بـ`unit_id` (`editor.js:443`) فتضعهما تحت «دروس بلا وحدة»،
--     وشاشةُ الطالب تقرأ `coalesce(u.title, l.unit)` فتُظهر وحدتَهما.
--     ولا إنذار — كلٌّ صادقٌ في مصدره.
--
--  ② **`list_quizzes` تقرأ العمودَ الميت** (`select … l.unit …`).
--     ⇒ حقلُ الوحدة فيها **فارغٌ لكلّ درسٍ إلا درسَي العلوم** — أي
--     أنّ الخطأ يبدو صواباً في الحالة الشاذّة وحدها. ولا مُنادٍ لها في
--     الواجهة اليوم (فُحص `js/*.js`)، لكنّها ممنوحةٌ لـ`anon` و
--     `authenticated` — فدالّةٌ تكذب وتنتظر أوّلَ من يناديها.
--
--  ③ **والاستيرادُ يُنشئ صفوفاً.** فخريطةُ العلوم القادمة تُنشئ وحدةً
--     صفّاً بعنوان النصّ نفسِه ⇒ **درسان في وحدةٍ نصّية وبقيّتُهما في
--     وحدةٍ صفٍّ بالعنوان ذاته**: تكرارٌ في الشجرة لا يشكو منه أحد.
--     ⇒ ولهذا يُصلَح قبل أوّل استيراد لا بعده.
--
--  🔑 والقاعدةُ المستخلصة: **الشيءُ الواحد اسمٌ واحد.** وعمودانِ يقولان
--     الوحدةَ يعنيان شاشتين تقولان قولين — ولا يظهر إلا بعد أن يُبنى عليه.
--
--  ⚠️  والقيدُ في ③ قرارٌ لا يُقرأ من الشيفرة: **أُقفل العمودُ ولم يُحذف.**
--      الحذفُ يحتاج إذناً صريحاً ويُسقط التاريخ، والقيدُ يمنع العودة
--      الصامتة ويبقى تراجعُه سطراً واحداً.
--
--  يتطلّب 16 (units) · 131 (import_lesson_map). آمنٌ للإعادة.
--
--  ⓪ · قبل التشغيل — يُشغَّل وحده، والرقم يُسأل ولا يُقرأ من وثيقة:
--
--     select (floor(max(sql_log_sort(n))) + 1)::text as الرقم_التالي from sql_log;
--     -- المتوقَّع 135
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ ① الوحدةُ اليتيمة تصير صفّاً ═══════════
--
--  والمطابقةُ بالعنوان حرفاً — **نفسُ قاعدة `import_lesson_map`**، كي
--  يستقرّ الدرسُ حيث كان الاستيرادُ سيضعه، فلا ينشأ صفٌّ ثانٍ غداً.

do $$
declare r record; v_unit bigint; n_units int := 0; n_lessons int := 0;
begin
  for r in select distinct l.course_id, trim(l.unit) as title
             from lessons l
            where l.unit is not null and trim(l.unit) <> ''
              and l.unit_id is null
  loop
    select u.id into v_unit
      from units u where u.course_id = r.course_id and u.title = r.title;

    if v_unit is null then
      insert into units (course_id, title, position)
      values (r.course_id, r.title,
              coalesce((select max(u2.position) from units u2
                         where u2.course_id = r.course_id), 0) + 1)
      returning id into v_unit;
      n_units := n_units + 1;
    end if;

    update lessons set unit_id = v_unit
     where course_id = r.course_id and trim(unit) = r.title and unit_id is null;
    n_lessons := n_lessons + 1;
  end loop;

  -- والنصُّ يُفرَّغ **بعد** نقله لا قبله: لو انقطع التنفيذ بينهما
  -- لبقي النصُّ شاهداً، ولو عُكس الترتيب لضاع بلا أثر.
  update lessons set unit = null where unit is not null;

  raise notice 'وحداتٌ أُنشئت: % · دروسٌ نُقلت: %', n_units, n_lessons;
end $$;


-- ═══════════ ② معدَّلة لا منشأة · list_quizzes ═══════════
--
--  أصلُها في ملفٍّ سابق. والتغييرُ سطرانِ لا أكثر: `l.unit` ⇒ `u.title`،
--  وضمُّ `units`. وما عداهما منسوخٌ عن النصّ الحيّ (`pg_get_functiondef`)
--  حرفاً — فالاستبدالُ الأعمى هو ما كلّف ٥ سبتمبر.

create or replace function public.list_quizzes()
returns table(id bigint, code text, title text, unit text, minutes integer,
              subject text, mcq_count integer, essay_count integer,
              locked boolean, reason text, best integer)
language plpgsql stable security definer set search_path to 'public'
as $function$
begin
  return query
  select q.id, l.code, l.title, u.title, q.minutes, s.name,
         (select count(*)::int from questions x where x.quiz_id = q.id and x.kind='mcq'),
         (select count(*)::int from questions x where x.quiz_id = q.id and x.kind='essay'),
         not can_access_lesson(l.id),
         case when can_access_lesson(l.id) then null
              else 'يسبقه: ' ||
                   coalesce((select r.title from lessons r where r.id = l.requires_id),'') end,
         (select max(a.pct) from attempts a
          where a.quiz_id = q.id and a.user_id = auth.uid())
  from lessons l
  join items   i on i.lesson_id = l.id and i.kind = 'quiz'
  join quizzes q on q.id = i.quiz_id
  left join subjects s on s.id = l.subject_id
  left join units    u on u.id = l.unit_id
  where l.published and l.archived_at is null
  order by l.position;
end $function$;

-- المنحُ يُعاد صريحاً — والقسم ⑧ في المخطّط يسحب الافتراضيّ يوماً
grant execute on function public.list_quizzes() to anon, authenticated, service_role;


-- ═══════════ ③ العمودُ يتقاعد — ويُقفل ═══════════

comment on table units is
  'وحداتُ المقرّر — المصدرُ الوحيد لاسم الوحدة. يُشار إليها بـlessons.unit_id، ولا نصَّ ثانٍ يوازيها.';

comment on column lessons.unit is
  '⛔ متقاعد (135). الوحدةُ صفٌّ في units يُشار إليه بـunit_id. أُفرِغ هذا العمود ونُقل ما فيه، والقيدُ lessons_unit_retired_chk يمنع عودته صامتاً. ولم يُحذف العمود: الحذفُ يحتاج إذناً صريحاً.';

alter table lessons drop constraint if exists lessons_unit_retired_chk;
alter table lessons add  constraint lessons_unit_retired_chk check (unit is null);


-- ═══════════ ④ الفحص — لكلّ حالةٍ سطرُها (القاعدة ④) ═══════════
--
--  ثلاثةُ أسئلةٍ مستقلّة، كلٌّ يُجيب عن موضعه. واختبارٌ واحدٌ عليها
--  جميعاً يُنتج «فشلاً» لا يدلّ على شيء.
--
--  select 'نصٌّ بلا صفّ (متوقَّع 0)' as الفحص, count(*)::text as الناتج
--    from lessons where unit is not null
--  union all
--  select 'درسٌ بلا وحدةٍ في مقرّرٍ له وحدات (متوقَّع 0)',
--         count(*)::text from lessons l
--   where l.unit_id is null and l.archived_at is null
--     and exists (select 1 from units u where u.course_id = l.course_id)
--  union all
--  select 'وحدةُ العلوم — صفٌّ واحدٌ لا اثنان (متوقَّع 1)',
--         count(*)::text from units where course_id = 12
--  union all
--  select 'list_quizzes تقول الوحدة (متوقَّع: لا فراغ لدرسٍ له وحدة)',
--         coalesce(string_agg(distinct coalesce(unit,'∅'), ' · '), '—')
--    from list_quizzes();


-- ═══════════ ⑤ السجلّ ═══════════

insert into public.sql_log (n, title, applied_at)
values ('135', 'الوحدةُ مصدرٌ واحد — عمودُ النصّ يتقاعد ويُقفل', now())
on conflict (n) do update set applied_at = now();


-- ══════════════════════════════════════════════════════════════════════
--  ⑥ · الختام الخمسة (CLAUDE.md §٨) — ما وقع هنا وما يقع خارجه
-- ══════════════════════════════════════════════════════════════════════
--
--  ①  سطر sql_log ................. ✅ القسم ⑤
--  ②  قرارٌ لا يُقرأ من الشيفرة .... ✅ «أُقفل ولم يُحذف» في الرأس،
--                                    وتعليقُ العمود يحمله في القاعدة
--  ③  STATE.md ٠·د ............... ⬜ خارج الملفّ
--  ④  BUILD في js/ui.js .......... ⬜ لا يلزم: لا واجهةَ هنا.
--                                    و`editor.js` و`student.js` لا تُمَسّ —
--                                    كلتاهما تقرأ `unit_id` أو ناتجَ
--                                    `list_lessons`، وكلتاهما تصحّ الآن
--                                    لأنّ البيانات صارت واحدة.
--  ⑤  00_schema.sql يُعاد استخراجه  🔴 **يلزم**: قيدٌ جديد وتعليقان.
--
--  🟡 وبقيَ موضعٌ لا يكذب ولا يلزم: `list_lessons` فيها
--     `coalesce(u.title, l.unit)`. والشقُّ الثاني صار **ميّتاً مؤكَّداً**
--     بقيد ③ — تُرك عمداً: لمسُ دالّةٍ كبيرةٍ بلا حاجةٍ خطرٌ بلا مقابل،
--     وهو يُنظَّف يوم تُمَسّ لسببٍ آخر.
-- ══════════════════════════════════════════════════════════════════════
