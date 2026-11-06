-- ══════════════════════════════════════════════════════════════════════
--  ١٩٨ · كشفُ نصّ المقطع خيارُ المعلّم — لا يُكشف افتراضاً، والنصُّ يُقرأ بدالّةٍ تحكم به
-- ══════════════════════════════════════════════════════════════════════
--
--  حكمُ المالك (٦ نوفمبر) بعد `b218` وقبل رفعه: «كشف النص في أسئلة وتمارين الاستماع يفضل ان يوضع كخيار يحدده المعلم
--  في الاعدادات وليس افتراضيا في كل الاسئلة». وكان `b218` يُظهر «كشف النص» لكلّ مقطعٍ له سطور.
--
--  وأحكام:
--  ① **ثلاثةٌ يختار منها المعلّم، والأوّلُ هو الافتراض:** `never` لا يُكشف · `after` بعد الاستماع كاملاً · `open` متاحٌ
--     للطالب. و«كاملاً» هي علامةُ المشغّل نفسُها: `item_progress.status = 'completed'` يكتبها `track_item` عند
--     `ended` — و«فتحَ» ليست «سمعَ» (تعليقُ المشغّل في student.js).
--  ② **والحكمُ في القاعدة لا في الزرّ:** `197` يُقرئ النصَّ كلَّ من يقرأ المقطع (`p_audio_lines_read`)، فزرٌّ مخفيٌّ وحده
--     كان يُخفي ما يصل — وهو ما تُبنى عليه الحراسةُ في المنصّة كلّها: ما في المتصفّح يُتجاوز. ⇒ **تُغلق القراءةُ المباشرة**
--     (لا منحَ لـ`authenticated`)، وتقرأ الشاشتان بدالّةٍ واحدة `item_lines(item)`: البنيةُ (القائلُ والموضع) لكلّ من يقرأ
--     المقطع — فإعادةُ السطر لا تحتاج نصَّه — والنصُّ بحكم الخيار، وللمعلّمين دائماً (`is_teacher`).
--     🔑 ورؤيةُ المقطع بشرط `p_items_read` بحرفه — كما يفعل `track_item` (قِيس ٦ نوفمبر) — فلا يُكتب شرطٌ ثالث.
--     📌 **والسياستان من `197` باقيتان بلا منح:** لا يقرأ بهما أحد، ولا تُحذفان (لا `drop` على الحيّ بلا إذن · AGENTS §٦).
--  ③ **والخيارُ يكتبه مؤلّفُ المقطع** (`set_audio_reveal`) بحارس السطور نفسِه (`audio_lines_problem`) وحكمِ `197` ④: نصُّ ملفٍّ
--     كتبه غيرُك لكاتبه أو للمشرف. وهو على النصّ (`audio_scripts`) لا على المصدر — فالسطورُ تتبع ملفَّها (`197` ①)، ومصدران
--     بالمفتاح نفسِه يكشفان معاً أو لا يكشفان.
--  ④ **والنصُّ الصوتيّ في الاختبار ليس هنا:** خيارُه في إعدادات الاختبار (الخطوة ٣)، وبابُه بعد المحاولة لا أثناءها.
--
--  📐 معدَّلٌ من `197`: مسارُ القراءة وحده (②). والجدولان ودالّتا الكتابة كما هي.
--  🗣️ والرسائلُ محايدة، وأربعٌ منها رسائلُ `197` بحرفها.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الخيار — عمودٌ في النصّ ═══════════════════

alter table public.audio_scripts add column if not exists reveal text not null default 'never';
alter table public.audio_scripts drop constraint if exists audio_scripts_reveal;
alter table public.audio_scripts add constraint audio_scripts_reveal
  check (reveal in ('never', 'after', 'open'));

comment on column public.audio_scripts.reveal is
  'كشفُ النصّ للطالب (198 ①): never لا يُكشف (الافتراض) · after بعد الاستماع كاملاً (item_progress completed) · open متاح — يختاره المعلّم';


-- ═══════════════════ ② القراءة — معدَّلة: دالّةٌ لا منح ═══════════════════

/* المقطعُ يُقرأ بشرط `p_items_read` بحرفه (كـ`track_item`)، والنصُّ بالخيار — وللمعلّمين دائماً.
   ⇒ { ok, script, lang, reveal, text, lines: [{ n, speaker, start_ms, end_ms, text? }] } — و`text` في السطر غائبٌ ما لم يُؤذن،
      و`script: null` لمقطعٍ بلا نصّ. أو { ok: false, error } */
create or replace function public.item_lines(p_item bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_url text; v_kind text; v_seen boolean; v_sid bigint; v_lang text; v_reveal text; v_text boolean;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول'); end if;

  select i.url, i.kind,
         (is_teacher() or can_access_lesson(i.lesson_id)) and can_see_item(i.created_by, i.visibility, i.reviewed_at, i.id)
    into v_url, v_kind, v_seen
    from items i where i.id = p_item;
  if v_seen is not true then return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود'); end if;

  select s.id, s.lang, s.reveal into v_sid, v_lang, v_reveal
    from audio_scripts s where v_kind = 'audio' and s.track_key = v_url;
  if v_sid is null then return jsonb_build_object('ok', true, 'script', null, 'lines', '[]'::jsonb); end if;

  v_text := is_teacher() or v_reveal = 'open'
            or (v_reveal = 'after' and exists (select 1 from item_progress p
                                                where p.user_id = auth.uid() and p.item_id = p_item and p.status = 'completed'));

  return jsonb_build_object('ok', true, 'script', v_sid, 'lang', v_lang, 'reveal', v_reveal, 'text', v_text,
    'lines', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
                         'n', l.n, 'speaker', l.speaker, 'start_ms', l.start_ms, 'end_ms', l.end_ms,
                         'text', case when v_text then l.body end)) order by l.n)
                         from audio_lines l where l.script_id = v_sid), '[]'::jsonb));
end $fn$;

comment on function public.item_lines(bigint) is
  'سطورُ المقطع الصوتيّ للشاشتين (198 ②): البنيةُ لمن يقرأ المقطع (شرطُ p_items_read بحرفه)، والنصُّ بخيار المعلّم (reveal)، وللمعلّمين دائماً.';

/* القراءةُ المباشرة تُغلق: لا يمرّ النصُّ إلا بالدالّة (②) */
revoke all on public.audio_scripts, public.audio_lines from anon, authenticated;


-- ═══════════════════ ③ الكتابة — منشأة ═══════════════════

/* خيارُ الكشف لنصّ ملفّ المقطع ⇒ { ok, reveal } أو { ok: false, error } */
create or replace function public.set_audio_reveal(p_item bigint, p_reveal text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_key text; v_sid bigint; v_owner uuid; v_sub bigint;
begin
  v_problem := audio_lines_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  if p_reveal is null or p_reveal not in ('never', 'after', 'open') then
    return jsonb_build_object('ok', false, 'error', 'خيار الكشف غير معروف');
  end if;

  select i.url into v_key from items i where i.id = p_item;
  select s.id, s.created_by, s.subject_id into v_sid, v_owner, v_sub
    from audio_scripts s where s.track_key = v_key for update;
  if v_sid is null then
    return jsonb_build_object('ok', false, 'error', 'تُكتب سطور المقطع أولاً، ثم يُختار كشف نصها');
  end if;
  if v_owner is distinct from auth.uid() and not can_curate(v_sub) then
    return jsonb_build_object('ok', false, 'error', 'سطور هذا الملف كتبها مؤلفٌ آخر، وتعديلها له أو لفريق الإشراف');
  end if;

  update audio_scripts set reveal = p_reveal, updated_by = auth.uid(), updated_at = now() where id = v_sid;
  return jsonb_build_object('ok', true, 'reveal', p_reveal);
end $fn$;

comment on function public.set_audio_reveal(bigint, text) is
  'خيارُ كشف نصّ المقطع للطالب (198 ③): never · after · open — بحارس audio_lines_problem، ونصُّ غيرِك لكاتبه أو للمشرف.';


-- ═══════════════════ ④ المنح ═══════════════════

/* جديدتان ⇒ `fn_auto_lock` يسحب PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً */
revoke all on function public.item_lines(bigint), public.set_audio_reveal(bigint, text) from public, anon;
grant execute on function public.item_lines(bigint), public.set_audio_reveal(bigint, text) to authenticated, service_role;


-- ═══════════════════ ⑤ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public'
                    and table_name = 'audio_scripts' and column_name = 'reveal' and column_default like '''never''%') then
    raise exception '198: عمودُ reveal غائب أو افتراضُه ليس never';
  end if;
  if not exists (select 1 from pg_constraint where conname = 'audio_scripts_reveal') then
    raise exception '198: قيدُ الخيار غائب';
  end if;
  if has_table_privilege('authenticated', 'public.audio_scripts', 'select')
     or has_table_privilege('authenticated', 'public.audio_lines', 'select')
     or has_table_privilege('anon', 'public.audio_lines', 'select') then
    raise exception '198: القراءةُ المباشرة لم تُغلق';
  end if;
  if not has_function_privilege('authenticated', 'public.item_lines(bigint)', 'execute')
     or not has_function_privilege('authenticated', 'public.set_audio_reveal(bigint, text)', 'execute')
     or has_function_privilege('anon', 'public.item_lines(bigint)', 'execute') then
    raise exception '198: منحُ الدالّتين على غير ما قُصد';
  end if;
end $chk$;

insert into public.sql_log (n, title, applied_at)
values ('198', 'كشفُ نصّ المقطع خيارُ المعلّم — لا يُكشف افتراضاً، والنصُّ يُقرأ بدالّةٍ تحكم به', now())
on conflict (n) do update set applied_at = now();
