-- ═══════════════════════════════════════════════════════════════════════
-- 125 · أعمدةُ الأفاتار — اختيارٌ يُخزَّن، وبقيّةٌ تُشتقّ
--
-- العلامةُ أربعةُ محاور: الإطار × اللون × شكل القرص × الحرف. وهي محاورُ
-- **مستقلّة** تُجمع ولا تُضرَب — إضافةُ إطارٍ جديدٍ كلفتُها فحصان، لا
-- ضربٌ في كلّ لباسٍ وملحقة. (وهذا ما حسم رفضَ نظام الشخصية في المهمّة ٦.)
--
-- 🔑 **ورمزٌ لا كودُ لون.** `'av-3'` لا `'#0ca14b'`. ولو خُزّن الكودُ
--    لصارت كلُّ إعادةِ معايرةٍ **هجرةَ بياناتٍ على كلّ صفّ**؛ وبالرمز
--    تصير تغييرَ سطرٍ في `base.css`. والكلفةُ الآن صفر، وبعد ألف حسابٍ
--    باهظة. واللوحةُ نفسُها في رأس `css/base.css` مع تعليلها.
--
-- 🔑 **وكلُّ الأعمدة تقبل `null` — والفراغُ يعني «لم يُختَر» لا «افتراض».**
--    نصَّت الخطّةُ على `not null default 'av-1'`، **وفيه عيبان:**
--    ① كلُّ حسابٍ جديدٍ يخرج بلون واحد، فتتشابه العلاماتُ في أوّل يومٍ
--       — وهو نقضُ وظيفة الأفاتار نفسِها.
--    ② ولا يُفرَّق بين **من اختار الافتراضَ** ومن **لم يُسأل قطّ**،
--       فتُنسَب إلى التسعةَ عشرَ القائمين اختياراتٌ لم يتّخذوها. وهو
--       عينُ الدرس المكتوب في رأس `123`: **نسبةٌ عن أحدٍ أسوأ من غيابها.**
--    ⇒ الفراغُ يُشتقّ عند الرسم: اللونُ من `id` (ثابتٌ ومتنوّع)، والحرفُ
--       من `full_name`، والإطارُ والشكلُ من ثوابت البيت.
--    📌 **والاشتقاقُ في المُصيِّر وحده** (`js/avatar.js`) — لا في القاعدة
--       ولا في الواجهة أيضاً. نسختان لقاعدةِ اشتقاقٍ واحدة تتفارقان،
--       فيرى الطالبُ لونَه يتغيّر بين شاشتين.
--
-- 🔑 **والحرفُ لا يُخزَّن افتراضاً** — يُشتقّ من `full_name` فيبقى متّسقاً
--    إن صُحّح الاسم. و`avatar_letter` يُملأ عند **تجاوزٍ صريحٍ** من صاحبه.
--
-- ✅ **وفُحصت سياسةُ القراءة ولم تُفترض** (نمط §٧ — انتحالُ دورٍ ومطالبة):
--      الطالب ← معلّمه: يرى · ← نفسه: يرى · ← **زميله: محجوب**
--      المعلّم ← طالبه: يرى · ← **طالبِ غيره: محجوب**
--    ⚠️ **وأوّلُ فحصٍ أعطى «يرى» في الأخيرة فكاد يُبلَّغ عنه ثقباً** —
--       والسببُ أنّ من انتُحل كان `role='admin'` لا `'teacher'`، و
--       `is_admin()` تفتح كلَّ شيء. **وهو عكسُ فخّ §٧: اختيارُ صاحبِ
--       صلاحيةٍ أعلى يُوسّع الفتحةَ كما أنّ الأدنى يُضيّقها.**
--    📌 **ويتبع ذلك حدٌّ يُكتب:** أفاتارُ الزملاء **لا يُقرأ بالجدول**.
--       فأيُّ شاشةٍ تعرض زملاءَ الصفّ تحتاج دالّةَ `security definer`
--       تُعيد القدرَ المطلوب — لا إرخاءَ سياسةٍ على `profiles`.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معجمُ الزخارف — جدولٌ لا قيدُ نصّ
--    إضافةُ زخرفةٍ تصير **إدراجَ صفّ** لا هجرةَ مخطّط، وتجد الواجهةُ
--    قائمتَها في موضعٍ واحد (شاشةُ التخصيص — المهمّة ٨).
--    🔑 و`note` تحمل **لماذا دخلت** — الحجّةُ تُكتب حيث يقع السؤال.
-- ═══════════════════════════════════════════════════════════════════════

create table if not exists public.avatar_motifs (
  code       text primary key,
  name       text not null,
  note       text,
  sort_order int  not null default 0,
  active     bool not null default true
);

comment on table public.avatar_motifs is
  'معجمُ زخارف الأفاتار. الرمزُ يُخزَّن في profiles.avatar_motif، والرسمُ في js/avatar.js (125)';

insert into public.avatar_motifs (code, name, note, sort_order) values
  ('star8',   'نجمة ثمانية',    'مربّعان متقاطعان — أوسعُ الزخارف انتشاراً وأقلُّها التباساً عند ٣٢px', 10),
  ('sun12',   'شمسة اثني عشرية','دائرةٌ باثنتي عشرة شعاعاً — تحتاج حجماً، وتُفحص عند ٣٢px قبل النشر', 20),
  ('rings',   'تشابك دوائر',    'ثلاثُ دوائرَ متداخلة — بنيةٌ تبقى مقروءةً وهي مصغَّرة',            30),
  ('knot8',   'گره مثمّنة',      'عقدةٌ مثمّنة من الزخرفة الفارسية',                                  40),
  ('pen',     'قلم',            'من تراث العلم — أداةُ الكاتب',                                      50),
  ('lamp',    'مشكاة',          'المصباحُ في الكوّة — صورةُ النور في التراث',                         60),
  ('book',    'كتاب على رحل',   'الرحلُ حاملُ الكتاب — صورةُ الدرس نفسِه',                            70),
  ('astro',   'إسطرلاب',        'آلةُ الفلك — أشهرُ ما يمثّل العلمَ التطبيقيّ',                        80),
  ('moon',    'بدر',            'القمرُ تامّاً — ولا يُخلَط بالهلال، وهو موقوفٌ لقرار المالك',        90)
on conflict (code) do update
  set name = excluded.name, note = excluded.note, sort_order = excluded.sort_order;

alter table public.avatar_motifs enable row level security;
drop policy if exists p_motifs_read on public.avatar_motifs;
create policy p_motifs_read on public.avatar_motifs for select using (true);
grant select on public.avatar_motifs to authenticated, anon;

-- 🟡 والهلالُ والمسجد **لم يُدرَجا** — عائقُ محتوًى لا تقنية، وقرارُ
--    مالكٍ لا قرارُ قياس. ومكانُهما `insert` في ملفٍّ تالٍ إن أُقرّا.


-- ═══════════════════════════════════════════════════════════════════════
-- ② الأعمدة الستّة
-- ═══════════════════════════════════════════════════════════════════════

alter table public.profiles add column if not exists avatar_kind   text;
alter table public.profiles add column if not exists avatar_motif  text;
alter table public.profiles add column if not exists avatar_frame  text;
alter table public.profiles add column if not exists avatar_color  text;
alter table public.profiles add column if not exists avatar_shape  text;
alter table public.profiles add column if not exists avatar_letter text;

-- القيودُ مفصولةٌ عن الأعمدة ليبقى الملفُّ قابلاً لإعادة التشغيل
alter table public.profiles drop constraint if exists profiles_avatar_kind_ck;
alter table public.profiles add  constraint profiles_avatar_kind_ck
  check (avatar_kind is null or avatar_kind in ('letter','motif'));

alter table public.profiles drop constraint if exists profiles_avatar_frame_ck;
alter table public.profiles add  constraint profiles_avatar_frame_ck
  check (avatar_frame is null or avatar_frame in ('star','oct','ring','none'));

-- 🔑 القيدُ نمطٌ لا قائمة: تغييرُ عدد الألوان يصير تعديلَ سطر
alter table public.profiles drop constraint if exists profiles_avatar_color_ck;
alter table public.profiles add  constraint profiles_avatar_color_ck
  check (avatar_color is null or avatar_color ~ '^av-[1-8]$');

alter table public.profiles drop constraint if exists profiles_avatar_shape_ck;
alter table public.profiles add  constraint profiles_avatar_shape_ck
  check (avatar_shape is null or avatar_shape in ('circle','squircle'));

-- حرفٌ واحدٌ لا كلمة — والعربيةُ لا تعرف اختصار الاسم بحرفين (js/ui.js)
alter table public.profiles drop constraint if exists profiles_avatar_letter_ck;
alter table public.profiles add  constraint profiles_avatar_letter_ck
  check (avatar_letter is null or char_length(avatar_letter) = 1);

-- 🔑 **وقيدٌ عابرٌ للأعمدة: نوعُ «زخرفة» بلا زخرفةٍ لا يُرسم شيئاً.**
--    ولو تُرك لسقط الرسمُ صامتاً وبدا عطلاً في المتصفّح. ⇒ يُصاح به هنا.
alter table public.profiles drop constraint if exists profiles_avatar_motif_ck;
alter table public.profiles add  constraint profiles_avatar_motif_ck
  check (avatar_kind is distinct from 'motif' or avatar_motif is not null);

-- والمفتاحُ الأجنبيّ يمنع رمزاً لا وجودَ له. ولا حذفَ لزخرفةٍ مستعمَلة:
-- `restrict` يمنع، ولا تُصفَّر اختياراتُ من اختارها من حيث لا يدري.
alter table public.profiles drop constraint if exists profiles_avatar_motif_fk;
alter table public.profiles add  constraint profiles_avatar_motif_fk
  foreign key (avatar_motif) references public.avatar_motifs(code) on delete restrict;

comment on column public.profiles.avatar_kind is
  'letter | motif — وفارغٌ يعني letter. لا نوعَ ثالث: رُفض نظامُ الشخصية بالقياس (المهمّة ٦) (125)';
comment on column public.profiles.avatar_color is
  'رمزٌ av-1..av-8 لا كودُ لون — القيمُ في رأس css/base.css. وفارغٌ يُشتقّ من id في js/avatar.js (125)';
comment on column public.profiles.avatar_letter is
  'تجاوزٌ صريح. وفارغٌ يُشتقّ من full_name فيتبع تصحيحَ الاسم (125)';


-- ═══════════════════════════════════════════════════════════════════════
-- ③ الصلاحية — عموديّة على غرار ٥٠
--    و`authenticated` له `select` على مستوى الجدول فترثه الأعمدةُ الجديدة،
--    أمّا `update` فعموديٌّ عندها ⇒ **ما لا يُمنح صريحاً يسقط بلا شكوى.**
--    والسياسةُ `p_profiles_edit` (‏`id = auth.uid()`‏) تقصره على صفّه.
-- ═══════════════════════════════════════════════════════════════════════

grant update (avatar_kind, avatar_motif, avatar_frame,
              avatar_color, avatar_shape, avatar_letter)
  on public.profiles to authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('125', 'أعمدةُ الأفاتار — اختيارٌ يُخزَّن، وبقيّةٌ تُشتقّ', now())
on conflict (n) do update set applied_at = now();
