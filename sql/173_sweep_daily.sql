/* ═══════════════════════════════════════════════════════════════════
   173 · الكنّاسُ مرّةً في اليوم — والحدُّ خمسةُ أيام ليبقى الوعدُ سبعة

   لماذا:
   قرارُ المالك (٢١ أكتوبر ٢١:٢٨): «يكفي مرّة في اليوم» بدل كلّ ست ساعات (`172`).

   📐 والحسابُ يتغيّر معه — وهو سببُ الحدّ الجديد:
      مرورٌ يوميّ وحدُّ ستّة أيام ⇒ أطولُ عمرٍ **سبعةُ أيامٍ بلا هامش**: مرورٌ
      واحدٌ يتعثّر فيبلغ التسجيلُ ثمانية، ويُخلَف وعدُ الخصوصية («خلال ٧ أيام»).
      ⇒ **الحدُّ خمسة:** أطولُ عمرٍ ستّةُ أيام، **ويومٌ هامشٌ** لمرورٍ يفشل ثمّ يُعاد.
      والثمن: نافذةُ المعلّم للاستماع خمسةُ أيام على الأقلّ بدل ستّة.

   ⚠️ تعديلٌ لا إنشاء — بالمرساة لا بإعادة الكتابة (نمط `163`/`170`):
      في كلٍّ من الدالّتين `interval '6 days'` **مرّةً واحدة** — قِيس على الحيّ
      قبل الملفّ (`recordings_sweep_due d92e17b1` · `recordings_sweep_done da51b17d`).
      ويُردّ الملفُّ إن وُجدت غيرَ مرّة. ⚙️ قابلٌ لإعادة التشغيل.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

do $patch$
declare v text; n int; f text;
begin
  foreach f in array array['public.recordings_sweep_due(text, integer)',
                           'public.recordings_sweep_done(text, integer, integer, text)'] loop
    v := pg_get_functiondef(f::regprocedure);
    n := (length(v) - length(replace(v, $q$interval '6 days'$q$, ''))) / length($q$interval '6 days'$q$);
    if n = 0 and position($q$interval '5 days'$q$ in v) > 0 then
      raise notice '173 · % على خمسة أيام سلفاً', f;
      continue;
    end if;
    if n <> 1 then
      raise exception '173 · % فيها «6 days» % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', f, n;
    end if;
    execute replace(v, $q$interval '6 days'$q$, $q$interval '5 days'$q$);
  end loop;
end $patch$;

comment on table public.recording_sweeps is
  'سجلُّ مرور كنّاس التسجيلات (172 · يوميّ منذ 173). overdue_left > 0 ⇒ ملفٌّ جاوز خمسة أيام وبقي — إنذار';

/* الموعد — يوميّاً ٠٠:١٧ UTC (٣:١٧ فجراً بتوقيت الرياض: أهدأ ساعات المنصّة).
   و`cron.schedule` باسمٍ قائمٍ يُحدّثه. */
select cron.schedule(
  'recordings-sweep',
  '17 0 * * *',
  $job$
  select net.http_post(
    url     := 'https://tjzrfevymfpktfuormhs.supabase.co/functions/v1/recordings-sweep',
    headers := jsonb_build_object(
                 'Content-Type', 'application/json',
                 'x-sweep-secret', (select decrypted_secret from vault.decrypted_secrets
                                     where name = 'recordings_sweep_secret')),
    body    := '{}'::jsonb,
    timeout_milliseconds := 60000);
  $job$
);

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('173', 'الكنّاسُ مرّةً في اليوم — والحدُّ خمسةُ أيام ليبقى الوعدُ سبعة', now())
on conflict (n) do update set applied_at = now();

commit;
