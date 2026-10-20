/* ═══════════════════════════════════════════════════════════════════
   166 · بطاقةُ الدرس عند المعلّم تحمل مصادرَها لا عددَها

   لماذا:
   صفُّ الدرس في المحرّر كان يقول الشيءَ مرّتين — شارةٌ «N مصدراً» وزرٌّ
   «📦 المصادر (N)» بجوارها، وشارةٌ «📝 اختبار» وزرٌّ «📝 الاختبار»
   بجوارها. **واحدةٌ تُقرأ والأخرى تُنقَر، والمعنى واحد.** (قرارُ المالك:
   يبقى القابلُ للنقر وحدَه.)

   وبدل الشارتين: صفُّ أيقوناتٍ لمصادر الدرس، كلُّ أيقونةٍ تفتح مصدرَها
   واسمُها يظهر عند التمرير — كما صار عند الطالب في `b146`–`b149`.
   ⇒ والمعلّم يرى **غذاءَ الدرس بنظرة**: درسٌ كلُّه ملفّاتٌ للقراءة بلا
     مرئيٍّ ولا محاكاة يُفضح بصمتٍ على البطاقة، وذاك عائقُ محتوًى يُرى
     قبل أن يُسأل عنه.

   وما كان يمنع: `author_lessons` تردّ **أعداداً فقط** (`official_items` ·
   `extras` · `has_quiz`) ولا تردّ المصادرَ نفسَها.

   🔑 والمردودُ المعتمدُ وحدَه (`created_by is null`): «+N إضافي» شارةٌ
      قائمةٌ لا زرَّ لها، وإضافاتُ المعلمين بابُها «📦 المصادر» —
      والقسمةُ بينهما قائمةٌ في المحرّر منذ كُتب، فلا تُنقَض هنا.

   ⚠️ ولا حارسَ جديد: الدالّةُ محروسةٌ أصلاً بـ
      `can_author(c.subject_id) or can_curate(c.subject_id)` في ذيلها،
      والمردودُ الجديد من الدرس نفسِه الذي أذِنت به — فلا يتّسع المرئيّ.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

/* 🔑 التعديلُ في موضعه بتعبيرٍ منتظم لا بنسخ الدالّة — وإن قصُرت:
      النسخُ يُجمّد بقيّتها على ما هي اليوم، ويعيد تعديلاً لاحقاً إن وقع
      بين كتابة الملفّ وتشغيله. والعددُ المتوقَّع **قِيس على الحيّة قبل
      الكتابة**: مرساةُ `official_items` مرّةٌ واحدة، و`'items'` صفر. */
do $patch$
declare v text; n int;
begin
  v := pg_get_functiondef('public.author_lessons(bigint)'::regprocedure);

  if (select count(*) from regexp_matches(v, '''items''', 'g')) > 0 then
    raise notice '166 · author_lessons فيها items سلفاً — تُركت كما هي';
    return;                                  -- الملفّ قابلٌ لإعادة التشغيل
  end if;

  n := (select count(*) from regexp_matches(v, '''official_items'', \(select count', 'g'));
  if n <> 1 then
    raise exception '166 · مرساةُ official_items وُجدت % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', n;
  end if;

  execute regexp_replace(v,
    '''official_items'', \(select count',
    '''items'', coalesce((select jsonb_agg(jsonb_build_object(' || chr(13) || chr(10) ||
    '                 ''id'', i.id, ''kind'', i.kind, ''title'', i.title,' || chr(13) || chr(10) ||
    '                 ''url'', i.url, ''quiz_id'', i.quiz_id,' || chr(13) || chr(10) ||
    '                 ''is_graded'', i.is_graded)' || chr(13) || chr(10) ||
    '               order by i.position)' || chr(13) || chr(10) ||
    '               from items i' || chr(13) || chr(10) ||
    '              where i.lesson_id = l.id and i.created_by is null), ''[]''::jsonb),' ||
    chr(13) || chr(10) ||
    '      ''official_items'', (select count');
end $patch$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('166', 'بطاقةُ الدرس عند المعلّم تحمل مصادرَها لا عددَها', now())
on conflict (n) do update set applied_at = now();

commit;
