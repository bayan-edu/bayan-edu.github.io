-- ═══════════════════════════════════════════════════════════════════════
-- 120 · التأليف يُشترط له تحقّقٌ يشهد به المصادِق — لا نداءٌ من الواجهة
--
-- بنى `115` نصفَ الحارس: معلّمٌ **في مادّته**. وهذا الملفّ يكمله:
-- معلّمٌ في مادّته **وقد أثبت أنّه يملك بريده**.
--
-- 🔑 **ولماذا عمودٌ خاصّ لا `auth.users.email_confirmed_at`:** ذاك تابعٌ
--    لإعداد `Confirm email` العامّ في المشروع — لا يميّز الأدوار، **وإن
--    عُطّل صار كلُّ بريدٍ «مؤكَّداً» لحظةَ التسجيل** فيسقط الحارسُ كلُّه
--    بلا أن يتغيّر سطرٌ في هذا الملفّ. ⇒ `profiles.author_verified_at`
--    مستقلٌّ، ولا يُكتب إلا بشهادةٍ مستقلّة.
--
-- 🔴 **وأين تقع الثغرة لو تُركت الواجهةُ تكتبه:** معلّمٌ يفتح الطرفيّة
--    وينادي الدالّة بلا أن يفتح بريده. **فالواجهة لا تُؤتمن على حراسة
--    نفسها.** ⇒ الشهادةُ تُقرأ من `auth.mfa_amr_claims` — جدولٌ يكتبه
--    المصادِق، لا العميل. ومدخلُ العميل الوحيد `session_id` **داخل رمزٍ
--    موقَّع لا يُزوَّر**.
--
-- 🔑 **و«ليست كلمة مرور» لا «هي otp»** — وقيس سببُه:
--    ① الطرائق المسجَّلة في هذه القاعدة `password` وحدها، فاسمُ طريقة
--      رمز البريد **غيرُ مرصود هنا**، وكتابتُه ظنّاً تُنتج حارساً يرفض
--      الجميع. والنفيُ يصدُق على كلّ طريقةٍ تقتضي صندوقَ بريدٍ أو مزوّداً.
--    ② و`auth.mfa_factors` صفر ⇒ **لا `totp` ممكن**، وهو الاستثناء
--      النظريّ الوحيد (جلسةُ كلمةِ مرورٍ بعاملٍ ثانٍ). يُراجَع هذا
--      السطرُ يومَ تُفعَّل المصادقةُ الثنائية.
--
-- 🟡 **وما لم يُقَس فلا يُدَّعى:** حضورُ `session_id` في رمز هذا المشروع
--    **غيرُ مرصود** — ولا رمزَ حيٌّ في يد هذه الجلسة. ⇒ الدالّة **تسقط
--    صائحةً لا صامتة** إن غاب، ومعها `auth_claims_present()` تقيسه في
--    نداءٍ واحد من حسابٍ حقيقيّ. **والصامتُ يُصدَّق، والصاخبُ يُصلَح.**
--
-- 🔴 **وتوريثُ الثلاثة قرارٌ لا سهو:** المعلّمون الثلاثة في القاعدة
--    **اعتمدهم المدير واحداً واحداً** (`teacher_requests.status='approved'`)
--    — وهي بوّابةٌ أقوى من رمز بريد. ولولا التوريث لَسُلب أحدُهم تأليفاً
--    ناله في `115` **بلا رسالةٍ ولا سبب**، ولَبحث عن عطلٍ في حسابه.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① العمودان
--    و`phone` يُجمَع ولا يُتحقَّق منه الآن (قرار مرحلة الإعداد): يُهيّئ
--    الحقلَ لـTwilio Verify لاحقاً بلا إعادة هيكلة. **ولا يحرس شيئاً.**
-- ═══════════════════════════════════════════════════════════════════════

alter table public.profiles add column if not exists author_verified_at timestamptz;
alter table public.profiles add column if not exists phone text;

comment on column public.profiles.author_verified_at is
  'شهادةُ تحقّقٍ خاصّة بالتأليف — تُكتب من mark_author_verified وحدها، ولا علاقة لها بـ auth.users.email_confirmed_at العامّ (120)';
comment on column public.profiles.phone is
  'E.164 — يُجمَع ولا يُتحقَّق منه في مرحلة الإعداد. التحقّق بـ Twilio Verify مؤجَّلٌ عمداً إلى ما قبل الإطلاق أو عند نموّ التسجيل (120)';


-- ═══════════════════════════════════════════════════════════════════════
-- ② التوريث — مرّةً واحدة، ولمن اجتاز مراجعةَ إنسان
--    on conflict لا يلزم: التحديث مشروطٌ بـ is null فيستوي تكرارُه.
-- ═══════════════════════════════════════════════════════════════════════

update public.profiles p
   set author_verified_at = now()
 where p.author_verified_at is null
   and p.role in ('teacher','admin')
   and (p.role = 'admin'
        or exists (select 1 from public.teacher_requests r
                    where r.user_id = p.id and r.status = 'approved'));


-- ═══════════════════════════════════════════════════════════════════════
-- ③ تشخيصٌ — ما الذي يحمله رمزُ هذا المشروع فعلاً؟
--    🔑 **أسماءُ المفاتيح وحدها لا قيمُها**: تقيس ما لم يُقَس بعد، ولا
--       تُخرج بريداً ولا دوراً ولا معرّفاً. ويناديها صاحبُ الرمز عن رمزِ
--       نفسه لا عن رمز غيره.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.auth_claims_present()
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'keys', coalesce((select jsonb_agg(k order by k)
                        from jsonb_object_keys(coalesce(auth.jwt(), '{}'::jsonb)) k), '[]'::jsonb),
    'has_session_id', coalesce(auth.jwt() ? 'session_id', false),
    'amr_rows', (select count(*) from auth.mfa_amr_claims c
                  where c.session_id = nullif(auth.jwt() ->> 'session_id','')::uuid));
$function$;

revoke all  on function public.auth_claims_present() from public, anon, authenticated;
grant execute on function public.auth_claims_present() to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ الشهادة — تُقرأ من المصادِق ولا تُقبَل من الواجهة
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.mark_author_verified()
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare v_sid uuid; v_m text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  v_sid := nullif(auth.jwt() ->> 'session_id', '')::uuid;

  -- 🔴 بلا معرّف جلسةٍ لا شاهدَ على الطريقة ⇒ يُردّ بنصٍّ يُقرأ، لا بصمت
  if v_sid is null then
    return jsonb_build_object('ok', false, 'code', 'no_session_claim',
      'error', 'تعذّر قراءة طريقة الدخول من جلستك — أعد فتح رابط التحقّق من بريدك');
  end if;

  select c.authentication_method into v_m
    from auth.mfa_amr_claims c
   where c.session_id = v_sid
     and c.authentication_method <> 'password'
   order by c.created_at desc
   limit 1;

  if v_m is null then
    return jsonb_build_object('ok', false, 'code', 'password_session',
      'error', 'افتح رابطَ التحقّق المرسَل إلى بريدك، ثمّ أعد المحاولة');
  end if;

  update profiles
     set author_verified_at = coalesce(author_verified_at, now())
   where id = auth.uid();

  return jsonb_build_object('ok', true, 'method', v_m,
    'at', (select author_verified_at from profiles where id = auth.uid()));
end $function$;

revoke all  on function public.mark_author_verified() from public, anon, authenticated;
grant execute on function public.mark_author_verified() to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ تسجيل المعلّم — تحلّ محلّ request_teacher_access للتسجيلات الجديدة
--    🔒 و`request_teacher_access` و`admin_decide` **تبقيان كما هما**:
--       رخيصٌ وقابلٌ للتراجع، ولا هجرةَ بيانات. وتقاعدُهما في الواجهة.
--    🔑 والمادّة **معرّفٌ لا نصّ حرّ**: `teacher_subjects` تحتاج
--       `subject_id`، ونصٌّ حرّ لا يُنتجه — وهو شرطُ تنفيذ البند لا زينة.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.register_teacher(
  p_full_name text, p_school text, p_subject bigint,
  p_years integer, p_note text, p_phone text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare v_role text; v_phone text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select role into v_role from profiles where id = auth.uid();
  if v_role in ('teacher','admin') then
    return jsonb_build_object('ok', false, 'error', 'حسابك مفعّل كمعلم بالفعل');
  end if;

  if coalesce(trim(p_full_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'اكتب اسمك الكامل');
  end if;

  if not exists (select 1 from subjects s where s.id = p_subject and s.active) then
    return jsonb_build_object('ok', false, 'error', 'اختر مادّةً من القائمة');
  end if;

  -- الهاتف اختياريّ — وإن كُتب فُحص شكلُه. ولا يُفرَّغ صامتاً: يُردّ
  -- برسالةٍ، فمن أخطأ في كتابته يعرف أنّه أخطأ.
  v_phone := nullif(regexp_replace(coalesce(p_phone,''), '[\s\-()]', '', 'g'), '');
  if v_phone is not null and v_phone !~ '^\+[1-9][0-9]{6,14}$' then
    return jsonb_build_object('ok', false, 'error',
      'رقم الهاتف يُكتب بصيغة دولية كاملة، مثل ‎+9665XXXXXXXX');
  end if;

  update profiles
     set role       = 'teacher',
         full_name  = trim(p_full_name),
         school     = nullif(trim(coalesce(p_school,'')), ''),
         years_exp  = p_years,
         bio        = nullif(trim(coalesce(p_note,'')), ''),
         phone      = v_phone
   where id = auth.uid();

  insert into teacher_subjects (teacher_id, subject_id)
  values (auth.uid(), p_subject)
  on conflict (teacher_id, subject_id) do nothing;

  -- 🔑 ولا يُمنح التأليفُ هنا: الدورُ شيءٌ والشهادةُ شيءٌ آخر.
  --    والواجهة تقرأ `verified` لتعرف أتعرض خطوةَ البريد أم لا.
  return jsonb_build_object('ok', true,
    'verified', (select author_verified_at is not null from profiles where id = auth.uid()));
end $function$;

revoke all  on function public.register_teacher(text, text, bigint, integer, text, text)
  from public, anon, authenticated;
grant execute on function public.register_teacher(text, text, bigint, integer, text, text)
  to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑥ معدَّلة لا منشأة — can_author  (أصلُها في دوالّ التأليف · وآخر مسّ 115)
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال. والفرق مسنَدٌ ثالث:
--    الشهادة. وما عداه بحرفه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.can_author(p_subject bigint)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select can_curate(p_subject)
      or (is_teacher()
          and exists (select 1 from profiles pr
                       where pr.id = auth.uid()
                         and pr.author_verified_at is not null)
          and exists (select 1 from teacher_subjects t
                       where t.teacher_id = auth.uid()
                         and t.subject_id = p_subject));
$function$;

grant execute on function public.can_author(bigint)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑦ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('120', 'التأليف يُشترط له تحقّقٌ يشهد به المصادِق — لا نداءٌ من الواجهة', now())
on conflict (n) do update set applied_at = now();
