-- ══════════════════════════════════════════════════════════
-- 219 · مكتبةُ بيان العربيّة — مادّةٌ ثانيةٌ بالبنية نفسِها، وسلّمُها AR1–AR24، وعناوينُ المقرّرات الإنجليزيّة
--       (`spec-arabic-library.md` · قراراتُ المالك ع٢ وع٤–ع٧، ١٩ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **مادّةٌ ثانيةٌ لا نظامٌ ثانٍ.** كلُّ ما بُني للمكتبة الإنجليزيّة (`203`–`218`) مُعلَّقٌ بسلّم المادّة أو بنوعها
--      (`family = 'reading'`) لا برقمها — قِيس ١٩ نوفمبر: الطبقاتُ (`scale_tiers` · `my_tier` · `entry_tier`) والترقيةُ
--      (`promotion_state` · `promote_level`) ومحرّكُ التسكين (`placement_*` · `import_bank`) واختبارُ الكتاب (`quiz_readiness`).
--      ⇒ فهذا الملفُّ صفوفٌ في الأكثر، ورقعةٌ واحدة (⑤).
--   ② **وسلّمُها مستقلّ** (ع٢ · قرارُ المالك): مستوى الطالب يُحفظ لكلّ سلّمٍ لا لكلّ مادّة — مفتاحُ `student_levels`
--      `(user_id, scale_id)`. فسلّمٌ مشترك يجعل للطالب مستوًى قرائيّاً واحداً باللغتين: يُسكَّن في إحداهما فيُسكَّن في الأخرى،
--      ويُرقّى كذلك. **واسمُ المستوى «AR7» وحده بلا مقابل:** CEFR درجاتُ لغةٍ أجنبيّة، والعربيّةُ لغةُ أكثر طلابنا الأولى.
--      و`levelText` (ui.js) لا تمسّه — لا نقطةَ فيه تُقلب قوسين.
--   ③ **والطبقاتُ الأربع بأسمائها وأعمارها ورموزها** (`M1`–`M4` — قيدا `scale_tiers` و`courses_tier_chk` لا يقبلان غيرها،
--      ومحرّكُ التسكين يعامل `M1` بمعيّة بالغ · ق١٧). **والسقفُ AR24 لكلّ طبقة، والدخولُ فارغ** (ع٣): لا إطارَ يقول بعدُ
--      أين يقف ابنُ العاشرة في AR، والرقمُ المخترَع يُصدَّق. وAR24 القيمةُ المحايدة — لا عبورَ طبقةٍ قبله — و`ceiling_rank`
--      إلزاميّ. والدخولُ الفارغ صاخب: `placement_bank_issues` تردّ «طبقةٌ بلا نطاق دخول» على أوّل بنك.
--      📌 ولا يقرأ السقفَ شيءٌ قبل أن يبلغ طالبٌ مستوًى في السلّم — ولا يبلغه إلا التسكين (ع٦ · لم يُبنَ).
--   ④ **ولا رفوف** (ع٤ · قرارُ المالك): «عددُ الرفوف بحسب عدد الكتب وأنواعها» — فالتصنيفُ يُنشئه المؤلّفُ في شاشة الفروع
--      حين يكون له كتب، وما لا تصنيفَ له يصطفّ رفوفاً متتالية (`b251`). **والمادّةُ ظاهرةٌ «قيد الإعداد»** (ع٥) — لا تُخفى.
--      ⚠️ **والواجهةُ الحيّة (`b250`) تكتب على بطاقتها «تحديد المستوى»** ثمّ تردّ النقرةَ بتنبيه «اختبار تحديد المستوى قيد الإعداد»
--         (`startPlacement`) — و`b251` يجعل البطاقةَ نفسَها «قيد الإعداد». **فيُطبَّق هذا الملفُّ مع `b251` أو بعده.**
--   ⑤ **ورقعةٌ واحدة تفكّ المادّة ٧ (معدَّلة):** `my_course_in` تقرأ `reading_tier()`، وفيها سلّمُ الإنجليزيّة نصّاً
--      (`scales.code = 'reading'`) — فطالبُ المكتبة العربيّة يُبحث عن طبقته في سلّمٍ ليس سلّمه، **فلا يجد مقرَّره**، ويتعطّل معها
--      `level_progress` و`promote_level` (مناديتاها الوحيدتان · قِيس). ⇐ طبقتُه في **سلّم مستوى المقرَّر** — وهو للمادّة ٧ السلّمُ
--      نفسُه، فلا يتغيّر للإنجليزيّة شيء. وقُرئت حيّةً (md5 `2f0b47f5…`) والمرسى فيها مرّةً واحدة.
--      📌 و`reading_tier` تبقى بلا منادٍ في القاعدة — لا تُحذف (⛔ لا `drop` بلا إذن)، ويُكتب عليها أنّها للإنجليزيّة وحدها.
--   ⑥ **وعناوينُ المقرّرات الإنجليزيّة** (ع٧ · قرارُ المالك): كانت «مكتبة بيان — البراعم»… منذ `203`، و`217` غيّر اسمَ المادّة
--      وحده ⇒ مادّتان بالعنوان نفسِه في المحرّر. ⇐ «Bayan Library — Early Readers · Juniors · Teens · Youth» (M1–M4).
--      والعنوانُ يقرؤه فريقُ التأليف وحده — شاشاتُ الطالب لا تعرضه.
--   ⑦ **ويُعاد تشغيلُه بلا أثرٍ ثانٍ:** السلّمُ والمادّةُ بكودهما، والمستوياتُ بكودها، والطبقاتُ بمفتاحها (`do nothing` — فما كتبه
--      المصمّمُ بعدُ لا يُمحى)، والمقرّراتُ بمستواها وطبقتها، والعناوينُ بـ`is distinct from`، والرقعةُ بمرساها — وبعدها صفر ⇒ تُتخطّى.
-- ══════════════════════════════════════════════════════════

-- الحرّاس: المادّةُ ٧ واحدةٌ بعينها · وطبقاتُ سلّمها أربعٌ (منها تُنسخ الأسماءُ والأعمار) · و`my_course_in` كما قُرئت أو كما يكتبها هذا الملفّ
do $$
declare v text := pg_get_functiondef('public.my_course_in(bigint,uuid)'::regprocedure);
        n int  := (select count(*) from regexp_matches(v, 'c\.tier = reading_tier\(p_user\)', 'g'));
begin
  if (select count(*) from public.subjects where code = 'sk_read') <> 1 then
    raise exception 'المادّة sk_read ليست واحدةً بعينها — لم يُكتب شيء';
  end if;
  if (select count(*) from public.scale_tiers t join public.scales s on s.id = t.scale_id where s.code = 'reading') <> 4 then
    raise exception 'طبقاتُ السلّم reading ليست أربعاً — لم يُكتب شيء';
  end if;
  if n <> 1 and v not like '%219 · طبقتُه في سلّم مستوى المقرَّر%' then
    raise exception 'my_course_in: المرسى وُجد % مرّةً لا مرّةً واحدة — تُقرأ ثانيةً، ولم يُكتب شيء', n;
  end if;
end $$;

-- ═══════════ منشأة ═══════════

-- ① السلّم (② في الرأس)
insert into public.scales (code, name, kind, sort_order)
values ('reading_ar', 'مستويات القراءة العربية — AR1–AR24', 'proficiency', 54)
on conflict (code) do nothing;

-- ② مستوياتُه الأربعة والعشرون — «AR7» بلا مقابل
insert into public.levels (scale_id, code, name, rank)
select s.id, 'AR' || g, 'AR' || g, g
  from public.scales s, generate_series(1, 24) g
 where s.code = 'reading_ar'
on conflict (scale_id, code) do update set name = excluded.name;

-- ③ طبقاتُه: الأسماءُ والأعمارُ والترتيبُ من طبقات `reading` · والسقفُ AR24 · والدخولُ فارغ (③ في الرأس)
insert into public.scale_tiers (scale_id, code, name, age_from, age_to, ceiling_rank, position, entry_rank)
select ar.id, t.code, t.name, t.age_from, t.age_to, 24, t.position, null
  from public.scale_tiers t
  join public.scales en on en.id = t.scale_id and en.code = 'reading'
  join public.scales ar on ar.code = 'reading_ar'
on conflict (scale_id, code) do nothing;

-- ④ المادّة — «قيد الإعداد» حتى تجهز (④ في الرأس) · والأداةُ فارغةٌ حتى يُبنى اختبارُها (ع٦)
insert into public.subjects (code, name, sort_order, active, scale_id, family, placement, progression,
                             description, icon, tool, reading_aloud, reading_ai)
select 'sk_read_ar', 'مكتبة بيان', 11, true, s.id, 'reading', 'test', 'level',
       'قصص وكتب بالعربية على قدر مستواك وعمرك', '📖', null, false, false
  from public.scales s
 where s.code = 'reading_ar'
on conflict (code) do nothing;

-- ⑤ مقرَّرٌ لكلّ خانة: ٢٤ مستوًى × ٤ طبقات — «مكتبة بيان — اسمُ الطبقة»، والترتيبُ بالمستوى ثمّ الطبقة (كـ`203` ④)
insert into public.courses (subject_id, level_id, title, position, active, tier)
select su.id, lv.id, 'مكتبة بيان — ' || t.name, lv.rank * 10 + t.position, true, t.code
  from public.subjects su
  join public.levels lv on lv.scale_id = su.scale_id
  join public.scale_tiers t on t.scale_id = su.scale_id
 where su.code = 'sk_read_ar'
   and not exists (select 1 from public.courses c
                    where c.subject_id = su.id and c.level_id = lv.id and c.tier = t.code);

-- ═══════════ معدَّلة ═══════════

-- ⑥ my_course_in — طبقةُ الطالب في سلّم مستوى المقرَّر لا في سلّم الإنجليزيّة (⑤ في الرأس) · مرّةً واحدة
do $$
declare v text := pg_get_functiondef('public.my_course_in(bigint,uuid)'::regprocedure);
        n int  := (select count(*) from regexp_matches(v, 'c\.tier = reading_tier\(p_user\)', 'g'));
begin
  if v like '%219 · طبقتُه في سلّم مستوى المقرَّر%' then raise notice 'my_course_in عُدّلت من قبل'; return; end if;
  if n <> 1 then
    raise exception 'my_course_in: المرسى وُجد % مرّةً لا مرّةً واحدة — لم يُكتب شيء', n;
  end if;
  execute regexp_replace(v, 'c\.tier = reading_tier\(p_user\)\)',
    'c.tier = my_tier((select lv.scale_id from levels lv where lv.id = c.level_id), p_user))'
    || '   -- 219 · طبقتُه في سلّم مستوى المقرَّر (كانت reading_tier: سلّمُ الإنجليزيّة نصّاً)');
end $$;

comment on function public.reading_tier(uuid) is
  'طبقةُ الطالب في سلّم المكتبة الإنجليزيّة (reading) وحده — بلا منادٍ في القاعدة منذ 219: my_course_in تقرأ my_tier بسلّم مقرَّرها. (207 · 219)';

-- ⑦ عناوينُ مقرّرات المكتبة الإنجليزيّة (⑥ في الرأس · ع٧)
update public.courses c
   set title = 'Bayan Library — ' || m.en
  from public.subjects su,
       (values ('M1', 'Early Readers'), ('M2', 'Juniors'), ('M3', 'Teens'), ('M4', 'Youth')) as m(code, en)
 where su.code = 'sk_read' and c.subject_id = su.id and c.tier = m.code
   and c.title is distinct from 'Bayan Library — ' || m.en;

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('219', 'مكتبةُ بيان العربيّة — مادّةٌ ثانيةٌ بالبنية نفسِها، وسلّمُها AR1–AR24، وعناوينُ المقرّرات الإنجليزيّة', now())
on conflict (n) do update set applied_at = now();
