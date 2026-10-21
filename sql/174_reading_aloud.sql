/* ═══════════════════════════════════════════════════════════════════
   174 · القراءةُ الجهريّة — الطالبُ يقرأ نصَّ الدرس بصوته

   لماذا:
   قرارُ المالك (٢١ أكتوبر): **أوّلُ استعمالٍ للتسجيل أن يقرأ الطالبُ نصَّ
   الدرس بصوته** — في مصادر «نصّ» من العربيّة والإنجليزيّة. واسمُها:
   «القراءة الجهرية» و«Reading aloud».
   و`171` بنى التسجيلَ على **سؤال** (`speaking`) — فهذا الملفُّ يصله بـ**مصدر
   الدرس** أيضاً، دون أن يمسّ طريقَ السؤال.

   🔑 ثلاثةُ أحكام:
   ① **الإعدادُ للمادّة لا للنصّ** (`subjects.reading_aloud`): يُطلب في كلّ
      مصدر «نصّ» في المادّة المفعَّلة. وتفعيلُ مادّةٍ أخرى (الفرنسيّة مثلاً)
      سطرٌ في القاعدة لا شيفرة. ويُفعَّل هنا للعربيّة والإنجليزيّة **بالرمز
      لا بالرقم** (`eg_ara` · `eg_eng`).
   ② **والشرطُ في موضعٍ واحد** (`reading_aloud_subject`): نصٌّ غيرُ فارغ ·
      مادّتُه مفعَّلة · والدرسُ متاحٌ للطالب (`can_access_lesson`). تقرؤه
      `my_reading` (أيظهر الزرّ؟) و`start_reading` (أيُصدَر المسار؟) معاً —
      فلا يظهر زرٌّ يُردّ طلبُه، ولا يُقبل طلبٌ بلا زرّ.
   ③ **والتسجيلُ يستهدف شيئاً واحداً:** سؤالاً **أو** مصدراً (`num_nonnulls = 1`).
      وحارسا المخزن (`recording_upload_ok` · `can_hear_recording`) لا يتغيّران:
      يقرآن المسارَ والمادّة، والمادّةُ تُكتب في الصفّ في الحالين.

   📐 خمسُ دقائق و٥ م.ب: أطولُ نصٍّ اليوم ٤٩٠ كلمة (نحو أربع دقائق قراءة)،
      وخمسُ دقائق بـ٤٨ ك.ب/ث ≈ ١٫٨ م.ب — والحدُّ ٥ يتّسع لمتصفّحٍ يتجاهل
      المعدّلَ المطلوب (سفاري).

   ⚠️ **وعائقُ محتوى قائم:** العربيّةُ بلا مصدر «نصّ» واحد في دروسها اليوم،
      والإنجليزيّةُ بمصدرٍ واحد (الدرس ٩). فالزرُّ يظهر حيث يوجد النصّ.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

/* ① إعدادُ المادّة */
alter table public.subjects add column if not exists reading_aloud boolean not null default false;
comment on column public.subjects.reading_aloud is
  'القراءة الجهرية: يُطلب من الطالب تسجيلُ قراءته لكلّ مصدر «نصّ» في دروس هذه المادّة (174)';

update public.subjects set reading_aloud = true
 where code in ('eg_ara', 'eg_eng') and reading_aloud is distinct from true;

/* ② التسجيلُ يستهدف سؤالاً أو مصدراً — واحداً لا اثنين ولا صفراً */
alter table public.recordings alter column question_id drop not null;
alter table public.recordings add column if not exists item_id bigint references public.items(id) on delete cascade;
comment on column public.recordings.item_id is
  'مصدرُ الدرس الذي قُرئ جهراً (174). والصفُّ يستهدف question_id أو item_id — واحداً';

do $con$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.recordings'::regclass
                                             and conname = 'recordings_one_target') then
    alter table public.recordings
      add constraint recordings_one_target check (num_nonnulls(question_id, item_id) = 1);
  end if;
end $con$;

create index if not exists recordings_student_item on public.recordings (student_id, item_id, created_at desc)
  where item_id is not null;

/* ③ المخزن — ٥ م.ب (رأسُ الملفّ) */
update storage.buckets set file_size_limit = 5242880 where id = 'recordings';

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ④ الشرطُ في موضعٍ واحد — يُرجع مادّةَ النصّ إن طُلبت قراءتُه، وإلّا null */
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
     and auth.uid() is not null
     and can_access_lesson(l.id, auth.uid());
$function$;

/* ⑤ أيظهر الزرّ؟ — ومعه قراءاتي السابقة لهذا النصّ (الأحدثُ أوّلاً) */
create or replace function public.my_reading(p_item bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'enabled',     reading_aloud_subject(p_item) is not null,
    'max_seconds', 300,
    'today',       (select count(*) from recordings r
                     where r.student_id = auth.uid() and r.item_id = p_item
                       and r.created_at > now() - interval '24 hours'),
    'recent',      coalesce((select jsonb_agg(jsonb_build_object(
                                 'id', x.id, 'at', x.created_at, 'deleted', x.deleted_at is not null)
                               order by x.created_at desc)
                               from (select id, created_at, deleted_at from recordings r
                                      where r.student_id = auth.uid() and r.item_id = p_item
                                      order by created_at desc limit 5) x), '[]'::jsonb));
$function$;

/* ⑥ إصدارُ مسار — نظيرُ start_recording للمصدر */
create or replace function public.start_reading(p_item bigint, p_mime text)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare
  v_uid  uuid := auth.uid();
  v_subject bigint;
  v_mime text := lower(split_part(coalesce(p_mime, ''), ';', 1));
  v_ext  text;  v_path text;  v_id bigint;
begin
  if v_uid is null then raise exception 'يجب تسجيل الدخول'; end if;

  v_subject := reading_aloud_subject(p_item);
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'هذا النص لا يطلب قراءة جهرية');
  end if;

  v_ext := case v_mime when 'audio/webm' then 'webm' when 'audio/ogg' then 'ogg'
                       when 'audio/mp4'  then 'm4a' end;
  if v_ext is null then
    return jsonb_build_object('ok', false, 'error', 'صيغة التسجيل غير مقبولة');
  end if;

  if (select count(*) from recordings
       where student_id = v_uid and item_id = p_item
         and created_at > now() - interval '24 hours') >= 5 then
    return jsonb_build_object('ok', false, 'error', 'بلغت حدّ التسجيل لهذا النص اليوم');
  end if;

  v_path := v_uid::text || '/i' || p_item || '-'
         || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8) || '.' || v_ext;

  insert into recordings (student_id, item_id, subject_id, path, mime)
  values (v_uid, p_item, v_subject, v_path, v_mime)
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id, 'bucket', 'recordings',
                            'path', v_path, 'mime', v_mime,
                            'max_bytes', 5242880, 'max_seconds', 300);
end $function$;

/* ───────────────────────── الصلاحيات ───────────────────────── */

revoke all on function public.reading_aloud_subject(bigint)  from public, anon;
revoke all on function public.my_reading(bigint)             from public, anon;
revoke all on function public.start_reading(bigint, text)    from public, anon;
grant execute on function public.reading_aloud_subject(bigint) to authenticated;
grant execute on function public.my_reading(bigint)            to authenticated;
grant execute on function public.start_reading(bigint, text)   to authenticated;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('174', 'القراءةُ الجهريّة — الطالبُ يقرأ نصَّ الدرس بصوته', now())
on conflict (n) do update set applied_at = now();

commit;
