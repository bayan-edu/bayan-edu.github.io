/* ═══════════════════════════════════════════════════════════════════
   167 · صفُّ الدرس في المحرّر يحمل عدَّ بطاقاته

   لماذا:
   أضاف `166` مصادرَ الدرس إلى صفّ المعلّم، وبقيت البطاقاتُ خارجَه —
   فالمعلّم يراها من زرّ «💡 البطاقات» على رأس الشاشة (مستوى المادّة)
   ولا يعرف أيُّ درسٍ له بطاقاتٌ وأيُّه خالٍ إلا بالعدّ اليدويّ.

   🎓 **والخبرُ المقصودُ غيابُها لا حضورُها:** ٢١٣ درساً من ٢١٥ لها
      بطاقات (`card_lessons`) — فالدرسُ الخالي يُفضح بأيقونةٍ ناقصةٍ في
      صفٍّ تعوّدت العينُ أن تراها فيه. وهو نفسُ مقصد `166`.

   🔑 والعدُّ من `card_lessons` لا من `decks.lesson_id` — ذاك عمودٌ ميتٌ
      لم يُملأ قطّ، والحجّةُ كاملةٌ في رأس `165`.

   ⚠️ ولا حارسَ جديد: الدالّةُ محروسةٌ بـ`can_author or can_curate` في
      ذيلها، والعددُ عن الدرس نفسِه الذي أذِنت به.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

/* التعديلُ في موضعه بتعبيرٍ منتظم، والعددُ قِيس على الحيّة قبل الكتابة:
   مرساةُ `extras` مرّةٌ واحدة، و`'cards'` صفر. */
do $patch$
declare v text; n int;
begin
  v := pg_get_functiondef('public.author_lessons(bigint)'::regprocedure);

  if (select count(*) from regexp_matches(v, '''cards''', 'g')) > 0 then
    raise notice '167 · author_lessons فيها cards سلفاً — تُركت كما هي';
    return;                                  -- الملفّ قابلٌ لإعادة التشغيل
  end if;

  n := (select count(*) from regexp_matches(v, '''extras'',         \(select count', 'g'));
  if n <> 1 then
    raise exception '167 · مرساةُ extras وُجدت % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', n;
  end if;

  execute regexp_replace(v,
    '''extras'',         \(select count',
    '''cards'', (select count(*) from card_lessons cl' || chr(13) || chr(10) ||
    '                   where cl.lesson_id = l.id),' || chr(13) || chr(10) ||
    '      ''extras'',         (select count');
end $patch$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('167', 'صفُّ الدرس في المحرّر يحمل عدَّ بطاقاته', now())
on conflict (n) do update set applied_at = now();

commit;
