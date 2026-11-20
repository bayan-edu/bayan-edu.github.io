-- ══════════════════════════════════════════════════════════
-- 222 · سجلُّ الاستيراد يحفظ بصمةَ الملفّ لا نسختَه (ق٢٠ ④ من `spec-reading-library.md` · ٢٠ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قِيس على الحيّ (٢٠ نوفمبر):** القاعدةُ ٤٥٦ ميغا من ٥٠٠ (الخطّةُ المجّانيّة — وبعدها تصير للقراءة وحدها)، و`import_log` منها **٩٧ ميغا**:
--      كلُّ استيرادٍ يحفظ ملفَّه كاملاً في `payload` (الاختباراتُ وحدها ٦٧ ميغا — وفيها جملُ النصوص مكرّرةً بعد توسيع `expandKinds`).
--   ② **نصُّ المالك:** «وتصفير import log بما لا يؤثر على الاستيراد مستقبلاً».
--   ③ **وما يقرأ السجلّ — قِيس:** `import_quiz` و`import_bank` وحدهما، **وتقرآن `result` لا `payload`:** دفعةٌ بصمتُها (`content_fp`) في نتيجةِ استيرادٍ
--      معتمَدٍ سابق ⇒ «لا جديد» بلا كتابة. **فحذفُ السطور يُفقدهما ذاكرتهما** فتُعاد كتابةُ ما استُورد — وهذا ما يمسّ الاستيراد. ولا تقرأ الواجهةُ
--      السجلَّ أصلاً (لا ذكرَ له في `js/`)، ولا مفتاحَ أجنبيّاً إليه.
--   ⇒ **فالتصفيرُ تفريغُ النسخ لا محوُ السطور:**
--      - `payload` يصير بصمتَه: `{"_digest": {"bytes": …, "md5": …}}` — والعمودُ `not null`، والبصمةُ تشهد بما استُورد (حجمُه وهويّتُه) بلا كلفته.
--      - **وسطورُ التجارب الجافّة تُحذف:** لا يقرؤها شيء (الفحصان يشترطان `dry_run = false`).
--      - **وتبقى النتائجُ كلُّها** — الناجحةُ للفحصين، والفاشلةُ شاهداً — ومعها من استورد ومتى.
--   ④ **ومن بعد:** الدوالُّ الستّ تكتب البصمةَ لا النسخة (`import_payload_digest`) — فلا يعود السجلُّ إلى الامتلاء.
--
-- **ويلزم بعده — خارجَ المعاملة، وحده:** `vacuum full public.import_log;` — فالنسخُ في TOAST، والمساحةُ لا تعود إلى عدّاد الخطّة بغيره.
--
-- **إعادةُ تشغيله بلا أثر:** الرقعُ تتعرّف أثرَها، والتنظيفُ لا يمسّ سطراً بصمتُه مكتوبة — فالتجاربُ الجافّةُ بعده تبقى.
--
-- **قُرئت الحيّاتُ قبله (٢٠ نوفمبر)** — والمرساةُ `p_course, v_subject, p_payload, ` في جملة `insert into import_log` وحدها، بعددها:
--   `import_quiz` ٢ (`34d0bf8e`) · `import_bank` ٢ (`2705f331`) · `import_cards` ٢ (`85ef9aa6`) · `import_texts` ٣ (`d1ddf384`) ·
--   `import_objectives` ١ (`a999018f`) · `import_lesson_map` ١ (`54b63709`). **وعددٌ مخالفٌ يرفع استثناءً فلا يُكتب شيء.**
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة: بصمةُ الملفّ ═══════════

create or replace function public.import_payload_digest(p jsonb)
returns jsonb
language sql
immutable
set search_path to 'public'
as $$
  -- 222 · ما يبقى من الملفّ في السجلّ: حجمُه وبصمتُه. وبصمةٌ تُمرَّر تعود كما هي (فإعادةُ التشغيل لا تبصم البصمة)
  select case
           when p is null       then jsonb_build_object('_digest', null)
           when p ? '_digest'   then p
           else jsonb_build_object('_digest', jsonb_build_object('bytes', octet_length(p::text), 'md5', md5(p::text)))
         end
$$;

revoke execute on function public.import_payload_digest(jsonb) from public, anon;
grant  execute on function public.import_payload_digest(jsonb) to authenticated;

-- ═══════════ معدَّلة: الدوالُّ الستّ تكتب البصمة — رُقعٌ بعدّ نصّها ═══════════

do $$
declare v text; n int; sig regprocedure; f record;
        anchor text := 'p_course, v_subject, p_payload, ';
        repl   text := 'p_course, v_subject, import_payload_digest(p_payload), ';   -- 222
begin
  for f in select * from (values ('import_quiz', 2), ('import_bank', 2), ('import_cards', 2),
                                 ('import_texts', 3), ('import_objectives', 1), ('import_lesson_map', 1)) t(fn, want) loop
    select p.oid::regprocedure into strict sig from pg_proc p
      join pg_namespace ns on ns.oid = p.pronamespace
     where ns.nspname = 'public' and p.proname = f.fn;
    v := pg_get_functiondef(sig);
    if position(repl in v) > 0 then
      raise notice '222 · % رُقعت من قبل', f.fn;
      continue;
    end if;
    n := (length(v) - length(replace(v, anchor, ''))) / length(anchor);
    if n <> f.want then
      raise exception '222 · %: المرساةُ % مرّة لا % — لا يُستبدل على الظنّ', f.fn, n, f.want;
    end if;
    execute replace(v, anchor, repl);
  end loop;
end $$;

-- ═══════════ البيانات: النسخُ تصير بصماتها، والتجاربُ الجافّةُ القديمة تُحذف ═══════════

delete from public.import_log
 where dry_run and not (payload ? '_digest');

update public.import_log
   set payload = public.import_payload_digest(payload)
 where not (payload ? '_digest');

insert into public.sql_log (n, title, applied_at)
values ('222', 'سجلُّ الاستيراد يحفظ بصمةَ الملفّ لا نسختَه — وتُفرَّغ النسخُ القائمة (ق٢٠ ④)', now())
on conflict (n) do update set applied_at = now();
