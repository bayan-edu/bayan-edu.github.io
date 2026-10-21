/* ═══════════════════════════════════════════════════════════════════
   170 · بوّابةُ البطاقات تقبل وسمَ R2 — `r2:مخزن/مسار`

   لماذا:
   منذ `b161` يُرفع كلُّ وسيطٍ جديدٍ إلى Cloudflare R2، ومفتاحُه موسومٌ
   (`r2:img/c5-k3j9fq.webp`) — يبنيه `js/media.js` (UPLOAD_TO) ويقرؤه
   `mediaUrl` (HOME.r2). **وحارسُ `import_cards` ⑦ (من `161`) يردّه:**
   مسطرتُه `^[a-z0-9][a-z0-9-]*/.+$` لا تعرف الوسم.
   🧪 قِيس على الحيّ قبل الملفّ (جافّةٌ بهويّة المدير، والمعاملةُ نُقضت):
      r2:img/c5-abc123.webp  ⇒ ok=false «ليس مفتاحَ مخزنٍ ولا رابطاً»
      img/c5-abc123.webp     ⇒ ok=true
      zz:img/c5-abc123.webp  ⇒ ok=false
      c5-abc123.webp         ⇒ ok=false
   ⇒ **والناقلُ (tools/naqil_cards.gs) لا يُنقل إلى R2 قبل هذا الملفّ** — وإلّا
     رُدّت كلُّ دفعةٍ يرفع صورَها، وهي سابقةُ `161` بعينها: الحارسُ قبل الناقل.

   🔑 **و`r2:` وحده لا كلُّ وسم:** المستودعاتُ المفعّلة في `HOME` بـmedia.js هي
      `sb` (بلا وسم) و`r2`. ووسمٌ لا مستودعَ له تردّه `mediaUrl` بـ`null` فيُعرض
      **فراغاً** — فقبولُه هنا يُعيد الصمتَ الذي سُدَّ له الحارسُ أصلاً.
      ⇒ ويومَ يُفعَّل مستودعٌ ثالث، يُضاف وسمُه هنا وفي HOME معاً.

   ⚠️ **وتعديلٌ لا إنشاء — بأداةٍ لا بإعادة كتابة:** الدالّةُ ١٦٦٤٤ حرفاً، فلا
      تُنسخ كلُّها لأجل سطر. تُقرأ حيّةً (`pg_get_functiondef`) ويُستبدل
      **مرساتان بأعيانهما** — ويُردّ الملفُّ إن لم تُوجد كلٌّ منهما مرّةً واحدة.
      🔑 وبصمةُ الحيّ قبله `58a170ff…` وطولُه ١٦٦٤٤ — **بصمةُ `161` بعينها**، فلم
      يُمسّ منذئذ (قاعدة ① مستوفاة).
   ⚙️ قابلٌ لإعادة التشغيل: إن وُجدت المسطرةُ الجديدة تُرك كما هو.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

do $patch$
declare
  v  text;
  a1 text := E'     and m.v !~ ''^[a-z0-9][a-z0-9-]*/.+$''\n';
  b1 text := E'     and m.v !~ ''^(r2:)?[a-z0-9][a-z0-9-]*/.+$''\n';
  a2 text := E'  --     يُصدَّق. ومفتاحٌ بلا مخزنٍ (`u1-ab12.png`) أشيعُ غلطٍ هنا.\n';
  b2 text := E'  --     يُصدَّق. ومفتاحٌ بلا مخزنٍ (`u1-ab12.png`) أشيعُ غلطٍ هنا.\n'
          || E'  --  🆕 170 · والوسمُ `r2:` مقبولٌ قبل المسار (b161): مستودعُ R2 في\n'
          || E'  --     `js/media.js` (HOME). **وحده لا كلَّ وسم** — فوسمٌ لا مستودعَ له\n'
          || E'  --     تردّه `mediaUrl` بـ`null` فيُعرض فراغاً، وذاك الصمتُ نفسُه.\n';
  n1 int; n2 int;
begin
  v := pg_get_functiondef('public.import_cards(bigint, jsonb, boolean)'::regprocedure);

  if position('^(r2:)?[a-z0-9]' in v) > 0 then
    raise notice '170 · import_cards تقبل r2: سلفاً — تُركت كما هي';
    return;
  end if;

  n1 := (length(v) - length(replace(v, a1, ''))) / length(a1);
  n2 := (length(v) - length(replace(v, a2, ''))) / length(a2);
  if n1 <> 1 or n2 <> 1 then
    raise exception '170 · المرساتان وُجدتا % و% مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', n1, n2;
  end if;

  execute replace(replace(v, a1, b1), a2, b2);
end $patch$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('170', 'بوّابةُ البطاقات تقبل وسمَ R2 — r2:مخزن/مسار', now())
on conflict (n) do update set applied_at = now();

commit;

/* ─────────── الفحص — جملةٌ واحدة: المسطرةُ الجديدة قائمة والتوقيعُ والمنحُ كما كانا ─────────── */

select position('^(r2:)?[a-z0-9][a-z0-9-]*/.+$' in p.prosrc) > 0                 as المسطرة_الجديدة,
       position('170 · والوسمُ' in p.prosrc) > 0                               as التعليق,
       length(p.prosrc)                                                        as الطول,
       md5(p.prosrc)                                                           as البصمة,
       has_function_privilege('authenticated', p.oid, 'execute')               as منحُ_المسجَّل
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public' and p.proname = 'import_cards';
