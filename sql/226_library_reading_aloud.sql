-- ══════════════════════════════════════════════════════════
-- 226 · القراءةُ الجهريّة في المكتبة الإنجليزيّة — من R1 إلى R6 وحدها (٢٢ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (٢٢ نوفمبر):** «فعّل التسجيل الصوتي الآن، ونؤجّل موضوع النجمة». والكتابُ في المكتبة يُفتح بـ`openText`
--      نفسِها التي تركّب «القراءة الجهرية» (`recorder.js` · `b164`)، فالزرُّ يظهر حين يقول `my_reading` إنّه مفعَّل — **بلا سطرٍ في الواجهة.**
--   ② **ولماذا لا المادّةُ كلُّها:** التسجيلُ خمسُ دقائق حدّاً (`174` · `my_reading.max_seconds`). وقِيست الأطوال (٢٢ نوفمبر · المادّة ٧):
--        R1–R6 ⇐ أطولُ كتابٍ ٢٢٠ كلمة (أقلُّ من أربع دقائق بسرعة مبتدئ)
--        R7–R11 ⇐ حتى ٦١٨ كلمة — تتجاوز الخمس عند القارئ البطيء
--        R12 ⇐ جزءٌ واحدٌ بـ٥٬٤٨٩ كلمة
--      فتفعيلُ المادّة كلِّها يقطع التسجيلَ في منتصف النصّ الطويل، ويقرأ الطالبُ «بلغت الحدّ» بعد خمس دقائق من القراءة.
--      **والمستوياتُ الأولى هي حيث القراءةُ الجهريّة المهارةُ نفسُها** (فكُّ الرموز) — وهي ما سمّاه المالك.
--   ③ **فالحدُّ عمودٌ في المادّة لا رقمٌ في الدالّة** (`reading_aloud_max_rank`): رتبةُ المستوى (`levels.rank`) التي لا يُطلب التسجيلُ بعدها،
--      وفارغُه «كلُّ المستويات» — فالعربيّةُ والإنجليزيّةُ (`eg_ara` · `eg_eng`) كما كانتا حرفاً. ورفعُه يوماً سطرٌ في القاعدة لا شيفرة.
--      ودرسٌ بلا مستوًى في مادّةٍ لها حدّ ⇐ لا يُطلب تسجيلُه (لا يُعرف أيقع تحت الحدّ).
--   ④ **والشرطُ باقٍ في موضعه الواحد** (`reading_aloud_subject` · `174` ②): تقرؤه `my_reading` (أيظهر الزرّ؟) و`start_reading` (أيُصدَر المسار؟) —
--      فلا يظهر زرٌّ يُردّ طلبُه. وقُرئت الحيّةُ قبله (٢٢ نوفمبر) فطابقت `174` حرفاً، ولا ينادي `reading_aloud` غيرُ هذه الثلاث.
--   ⑤ **والمكتبةُ العربيّة (٥٥) لم تُفعَّل:** لا كتبَ فيها بعد، وسلّمُها غيرُ سلّم الإنجليزيّة فرتبتُها السادسة لا تعني R6. تُفعَّل بسطرٍ يومَ تصلها كتبُها.
--   ⑥ **والتحليلُ الآليّ (`reading_ai`) مطفأٌ كما كان** — وشروطُه قبل إشعاله في `STATE.md` (`177`). **ونجمةُ الصوت مؤجّلةٌ بالقرار نفسِه.**
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة لا منشأة ═══════════

alter table public.subjects add column if not exists reading_aloud_max_rank smallint
  check (reading_aloud_max_rank is null or reading_aloud_max_rank > 0);
comment on column public.subjects.reading_aloud_max_rank is
  'القراءة الجهرية تُطلب حتى هذه الرتبة من المستوى (levels.rank) وحدها — وفارغه كل المستويات (226)';

-- الشرطُ الواحد (`174` ④) — وزاد عليه سطرُ المستوى وحده
create or replace function public.reading_aloud_subject(p_item bigint)
returns bigint language sql stable security definer set search_path to 'public'
as $function$
  select l.subject_id
    from items i
    join lessons  l on l.id = i.lesson_id
    join subjects s on s.id = l.subject_id
   where i.id = p_item
     and i.kind = 'text'
     and coalesce(btrim(i.body), '') <> ''
     and s.reading_aloud
     and (s.reading_aloud_max_rank is null
          or exists (select 1 from levels lv
                      where lv.id = l.level_id and lv.rank <= s.reading_aloud_max_rank))
     and auth.uid() is not null
     and can_access_lesson(l.id, auth.uid());
$function$;
revoke all on function public.reading_aloud_subject(bigint) from public, anon;
grant execute on function public.reading_aloud_subject(bigint) to authenticated;

-- ═══════════ البيانات ═══════════

update public.subjects
   set reading_aloud = true, reading_aloud_max_rank = 6
 where code = 'sk_read'
   and (reading_aloud is distinct from true or reading_aloud_max_rank is distinct from 6);

insert into public.sql_log (n, title, applied_at)
values ('226', 'القراءةُ الجهريّة في المكتبة الإنجليزيّة — من R1 إلى R6 وحدها', now())
on conflict (n) do update set applied_at = now();
