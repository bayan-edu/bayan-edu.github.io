-- ══════════════════════════════════════════════════════════════════════
--  ١٥١ · صندوقُ الاستلام المجزّأ — الحمولةُ الكبيرة تعبر قطعاً تُحاسَب
-- ══════════════════════════════════════════════════════════════════════
--
--  **لماذا:** الناقلُ المجدول يجري في جلسة Claude، والحمولةُ تمرّ من
--  نتيجة أداة Drive إلى نداء SQL عبر إصدار النموذج — **وقد قيس حدُّه:**
--  ١٥ كيلوبايت عبرت سليمةً (بصمات 147·148·150 طابقت بايتاً بايتاً)،
--  و٣٠ كيلوبايت سقطت مرّتين (٣٥٣٨ من ٣٠٨٩٠). والنمطُ المرصود إسقاطُ
--  كتلٍ لا تبديلُ محارف. ⇒ تُقسَّم الحمولةُ قطعاً ≤ ٨ كيلوبايت:
--  كلُّ قطعةٍ في منطقة الأمان، **والمجموعُ يُحاسَب على حجم Drive
--  المعلَن قبل أن يُفكّ أو يبلغ العقد** — فإسقاطٌ أو تكرارٌ يُردّ
--  ناطقاً بالرقمين، ولا يدخل القاعدةَ ما لم يُوزن.
--
--  🔑 **ولا بابَ خلفيّ:** التسليمُ ينتهي إلى `import_quiz` نفسِها
--  (147–150) بحرّاسها كلِّها. هذا البابُ وزّانٌ ومجمِّع لا غير.
--
--  📐 **قراراتُه:**
--  ① المفتاح (`by_user`, `key`) — ناقلانِ لا يتصادمان، وإعادةُ القطعة
--     الأولى بمفتاحٍ قائمٍ تبدأ من صفحةٍ بيضاء (إعادةُ محاولةٍ نظيفة).
--  ② `base64` للنقل — محارفُه لا تحتاج إفلاتاً في نصّ SQL، فلا تُفسدها
--     علامات الاقتباس.
--  ③ الصندوقُ يُنظّف نفسَه: صفٌّ أتمّ يومه يُمحى عند أوّل استلامٍ تالٍ،
--     والاعتمادُ الناجح يمحو صفَّه — **وهذا الحذفُ دورةُ حياة الصندوق
--     الموثَّقة هنا، لا حذفَ محتوًى.**
--  ④ على الجدول RLS بلا سياسات، ولا منحَ مباشراً عليه — لا يبلغه أحدٌ
--     إلا عبر الدالّتين، وحارسُهما `can_author` كحارس العقد.
--
--  🔁 قابلٌ لإعادة التشغيل · ودالّتان منشأتان لا معدَّلتان.
-- ══════════════════════════════════════════════════════════════════════

create table if not exists public.import_inbox (
  key          text        not null,
  by_user      uuid        not null,
  course_id    bigint      not null,
  total_chunks int         not null,
  total_bytes  int         not null,
  parts        jsonb       not null default '{}'::jsonb,
  at           timestamptz not null default now(),
  primary key (by_user, key)
);

alter table public.import_inbox enable row level security;
revoke all on public.import_inbox from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────
--  ① الاستلام — قطعةٌ تُودَع، والأولى تفتح الصفَّ من جديد
-- ─────────────────────────────────────────────────────────────────────

create or replace function public.import_stage(
  p_key          text,
  p_course       bigint,
  p_seq          int,
  p_total_chunks int,
  p_total_bytes  int,
  p_chunk        text
) returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_subject bigint; v_n int;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject from courses c where c.id = p_course and c.active;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود أو معطَّل');
  end if;
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'الاستلامُ يلزمه حقُّ التأليف في هذه المادة');
  end if;

  if coalesce(trim(p_key), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'الدفعة بلا مفتاح (p_key)');
  end if;
  if p_total_chunks is null or p_total_chunks < 1 or p_total_chunks > 64
     or p_total_bytes is null or p_total_bytes < 2 or p_total_bytes > 2*1024*1024 then
    return jsonb_build_object('ok', false,
      'error', 'الإعلانُ خارج الحدود: القطعُ من ١ إلى ٦٤، والحجمُ حتى ٢ ميجابايت');
  end if;
  if p_seq is null or p_seq < 1 or p_seq > p_total_chunks then
    return jsonb_build_object('ok', false,
      'error', 'رقمُ القطعة خارج المعلَن: ' || coalesce(p_seq::text, '—')
            || ' من ' || p_total_chunks);
  end if;
  --  حارسُ المحارف: ما ليس من أبجدية base64 تسرُّبُ اقتباسٍ أو قصٌّ فاسد
  if p_chunk is null or p_chunk !~ '^[A-Za-z0-9+/=]+$' then
    return jsonb_build_object('ok', false,
      'error', 'القطعة ليست base64 نقيّاً — في النقل محرفٌ دخيل');
  end if;

  --  كنسُ ما أتمّ يومه — الصندوقُ عابرٌ لا أرشيف
  delete from import_inbox where at < now() - interval '1 day';

  if p_seq = 1 then
    insert into import_inbox as b
           (key, by_user, course_id, total_chunks, total_bytes, parts)
    values (trim(p_key), auth.uid(), p_course, p_total_chunks, p_total_bytes,
            jsonb_build_object('1', p_chunk))
    on conflict (by_user, key) do update
      set course_id    = excluded.course_id,
          total_chunks = excluded.total_chunks,
          total_bytes  = excluded.total_bytes,
          parts        = excluded.parts,
          at           = now();
  else
    update import_inbox
       set parts = parts || jsonb_build_object(p_seq::text, p_chunk)
     where by_user = auth.uid() and key = trim(p_key)
       and course_id = p_course
       and total_chunks = p_total_chunks and total_bytes = p_total_bytes;
    if not found then
      return jsonb_build_object('ok', false,
        'error', 'لا صفَّ مفتوحاً لهذا المفتاح بهذا الإعلان — القطعةُ ١ تفتح، '
              || 'والإعلانُ لا يتبدّل بين القطع');
    end if;
  end if;

  select count(*) into v_n
    from import_inbox b, jsonb_object_keys(b.parts)
   where b.by_user = auth.uid() and b.key = trim(p_key);

  return jsonb_build_object('ok', true,
    'المفتاح', trim(p_key), 'وصلت', v_n, 'من', p_total_chunks,
    'طول_القطعة', length(p_chunk));
end
$function$;

-- ─────────────────────────────────────────────────────────────────────
--  ② التسليم — يُجمَع ويُوزَن ويُفكّ، ثمّ يُسلَّم إلى العقد نفسِه
-- ─────────────────────────────────────────────────────────────────────

create or replace function public.import_staged(
  p_key text,
  p_dry boolean default true
) returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v import_inbox%rowtype;
  v_missing text; v_b64 text; v_bytes bytea; v_payload jsonb; v_res jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select * into v from import_inbox
   where by_user = auth.uid() and key = trim(p_key);
  if not found then
    return jsonb_build_object('ok', false,
      'error', 'لا صفَّ بهذا المفتاح — لم يصل شيءٌ أو كُنس بعد يومه');
  end if;

  select string_agg(s::text, '، ' order by s) into v_missing
    from generate_series(1, v.total_chunks) s
   where not (v.parts ? s::text);
  if v_missing is not null then
    return jsonb_build_object('ok', false,
      'error', 'قطعٌ لم تصل: ' || v_missing || ' من ' || v.total_chunks);
  end if;

  select string_agg(v.parts ->> i::text, '' order by i) into v_b64
    from generate_series(1, v.total_chunks) i;

  begin
    v_bytes := decode(v_b64, 'base64');
  exception when others then
    return jsonb_build_object('ok', false, 'error', 'base64 لا يُفكّ: ' || sqlerrm);
  end;

  --  ⚖️ الحارسُ الذهبي: وزنُ المجمَّع على حجم Drive المعلَن — قبل أيّ عقد
  if octet_length(v_bytes) <> v.total_bytes then
    return jsonb_build_object('ok', false,
      'error', 'حمولةٌ لا تزن إعلانها: وصل ' || octet_length(v_bytes)
            || ' من ' || v.total_bytes || ' بايتاً — تُعاد من القطعة ١');
  end if;

  begin
    v_payload := convert_from(v_bytes, 'UTF8')::jsonb;
  exception when others then
    return jsonb_build_object('ok', false,
      'error', 'الحمولةُ ليست JSON صالحاً: ' || sqlerrm);
  end;

  v_res := import_quiz(v.course_id, v_payload, p_dry);

  --  اعتمادٌ ناجحٌ يمحو صفَّه — دورةُ حياة الصندوق، لا حذفُ محتوًى
  if coalesce((v_res->>'ok')::boolean, false) and not p_dry then
    delete from import_inbox where by_user = auth.uid() and key = trim(p_key);
  end if;

  return v_res || jsonb_build_object('المفتاح', trim(p_key),
                                     'بايتات_وُزنت', octet_length(v_bytes));
end
$function$;

-- المنحُ صريحٌ والسحبُ صريح — عادةُ هذا العقد منذ 147
revoke execute on function public.import_stage(text,bigint,int,int,int,text) from public, anon;
revoke execute on function public.import_staged(text,boolean)                 from public, anon;
grant  execute on function public.import_stage(text,bigint,int,int,int,text) to authenticated, service_role;
grant  execute on function public.import_staged(text,boolean)                 to authenticated, service_role;

comment on function public.import_stage(text,bigint,int,int,int,text) is
  'استلامُ قطعةِ حمولةٍ (base64) في صندوق الاستيراد: القطعةُ ١ تفتح الصفَّ '
  'وتمحو سابقَه، والإعلانُ (عددُ القطع والحجم) لا يتبدّل بين القطع (151).';
comment on function public.import_staged(text,boolean) is
  'تسليمُ ما اكتمل في الصندوق: يُجمَع بالترتيب، يُوزَن على حجم Drive المعلَن، '
  'يُفكّ ويُسلَّم إلى import_quiz بحرّاسها. والاعتمادُ الناجح يمحو صفَّه (151).';

insert into public.sql_log (n, title, applied_at)
values ('151', 'صندوقُ الاستلام المجزّأ — الحمولةُ الكبيرة تُحاسَب قبل أن تُفكّ', now())
on conflict (n) do update set applied_at = now();
