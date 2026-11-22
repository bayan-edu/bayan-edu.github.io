-- ══════════════════════════════════════════════════════════
-- 225 · حدُّ الإنجاز في كتب المكتبة ٨٠٪ — يُرفع ما كان، ولا يعود إلى ٦٥ في كتابٍ جديد (`spec-reading-motivation.md` ق١ · ٢٢ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (٢٢ نوفمبر):** «ارفع الحد الأدنى للإنجاز في اختبارات المكتبة إلى 80 ليتطابق الحدّان» — حدُّ «أُنجز» على الرفّ
--      وحدُّ نجوم الفهم الثلاث (`224` يقرأ `lesson_done_at` نفسَها). وكانت الخطّةُ ٨٠ من قبل (الخريطة §٣ في `spec-reading-library.md`: «`pass_mark` ٨٠»).
--   ② **قِيس قبله (٢٢ نوفمبر):** دروسُ المادّة ٧ كلُّها (٩٦١) على **٦٥** · **واختباراتُها كلُّها على ٨٠ من قبل** (`quizzes.pass_mark`) —
--      فالافتراقُ في الدرس وحده، وهو الذي يحسم الإتمام. والمادّة ٥٥ بلا دروس.
--      **ولا أثرَ على طالب:** صفرُ محاولةٍ في دروس المكتبة، فلا درسَ «أُنجز» عند ٦٥ يُسحب منه إنجازه · وصفرُ درسٍ فيها له `requires_id`.
--   ③ **ومن أين جاءت ٦٥:** `import_lesson_map` تنشئ الدرسَ بـ`p_pass_mark => 65` حرفاً، و`save_lesson` و`lessons.pass_mark` افتراضُهما ٦٥،
--      ونموذجُ الدرس في المحرّر يبدأ بـ٦٥ (`editor.js`). **فرفعُ الصفوف وحده يعود إلى ٦٥ مع أوّل استيراد** — بصمت.
--   ④ **فالحارسُ على الجدول لا على أربعة عملاء:** مُطلِقٌ قبل الكتابة على `lessons`، للمكتبة وحدها (`subjects.family = 'reading'`):
--      - **في الإنشاء يُرفع ما دون ٨٠ إلى ٨٠** — فالـ٦٥ هناك افتراضُ مستورِدٍ أو نموذج، لا قرارُ مؤلّف. فلا يُمسّ `import_lesson_map` (٣٠٠ سطر).
--      - **وفي التعديل يُردّ ما دون ٨٠ صاخباً** — فهناك قرارُ مؤلّفٍ كتبه بيده، ورفعُه بصمتٍ يكذب عليه. والمحرّرُ يرسل حدَّ الدرس كما قرأه
--        (`value="${lesson?.pass_mark}"`)، فحفظُ درسٍ لم يُمسّ حدُّه يمرّ.
--      - **والحدُّ ٨٠ في هذا الموضع وحده.** ونجومُ الفهم لا تحمل عتبةً ثانية (`224`) — فلا يفترقان.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة ═══════════

create or replace function public.library_pass_floor()
returns trigger
language plpgsql security definer
set search_path to 'public'
as $$
begin
  if new.pass_mark is not null and new.pass_mark >= 80 then return new; end if;
  if not exists (select 1 from subjects s where s.id = new.subject_id and s.family = 'reading') then return new; end if;
  if tg_op = 'INSERT' then
    new.pass_mark := 80;        -- افتراضُ مستورِدٍ أو نموذج (رأس الملفّ ④)
    return new;
  end if;
  raise exception 'حدّ الإنجاز في كتب المكتبة ٨٠٪ على الأقل' using errcode = '22023';
end $$;
revoke all on function public.library_pass_floor() from public, anon, authenticated;

drop trigger if exists lessons_library_pass_floor on public.lessons;
create trigger lessons_library_pass_floor before insert or update of pass_mark, subject_id on public.lessons
  for each row execute function public.library_pass_floor();

-- ═══════════ البيانات ═══════════

update public.lessons l
   set pass_mark = 80
  from public.subjects s
 where s.id = l.subject_id and s.family = 'reading'
   and (l.pass_mark is null or l.pass_mark < 80);

insert into public.sql_log (n, title, applied_at)
values ('225', 'حدُّ الإنجاز في كتب المكتبة ٨٠٪ — يُرفع ما كان، ولا يعود إلى ٦٥ في كتابٍ جديد', now())
on conflict (n) do update set applied_at = now();
