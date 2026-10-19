/* ═══════════════════════════════════════════════════════════════════
   165 · بطاقاتُ الدرس تصل الطالب — الوسمُ على البطاقة لا على المجموعة

   لماذا:
   ‏`loadLessonDeck` في الواجهة تبحث عن مجموعةٍ بـ‏`d.lesson_id = l.id`.
   وقُرئ الحيُّ في ٢٠ أكتوبر ٢٠٢٦ فإذا العطلُ مزدوجٌ وصامت:
     ① ‏`subject_decks` لا تُرجع `lesson_id` إطلاقاً — مفاتيحُها
        `id · title · position · level_id · mine · cards · lessons`
        ⇒ القيمةُ `undefined` في المتصفّح، والمقارنةُ تكذب أبداً.
     ② ولو أرجعتْه لما نفع: `decks.lesson_id` فارغٌ في الستّ كلِّها
        (صفرٌ من ستّ) — العمودُ موجودٌ ولم يُملأ قطّ.
   ⇒ بطاقةُ الدرس لم تُرسَم لطالبٍ واحدٍ منذ كُتبت. لا رسالةَ خطأ ولا
     شاشةَ فارغة، بل غيابٌ يُقرأ «لا بطاقات لهذا الدرس».

   🔑 والرابطُ الحقيقيُّ الذي استعمله المؤلّفون هو `card_lessons`:
      ٢٢٨٦ رابطاً تغطّي ٢١٣ درساً من ١٩٩٢ بطاقة. والوسمُ على **البطاقة**
      أصحُّ من الوسم على المجموعة: بطاقةٌ واحدة قد تخدم درسين، ومجموعةٌ
      واحدة تخدم المادّةَ كلَّها.

   🔑 و`decks.lesson_id` لا يُملأ ولا يُحذف هنا — **قرارٌ لا سهو**:
      ملؤه يُثبّت النموذجَ الخاطئ، وحذفُه يُسقط عموداً قد يُستعمل.
      يُترك ميتاً ومكتوباً في `STATE.md` — فالفجوة تُرى والصمت لا يُرى.

   ⚠️ وما لا يفعله هذا الملفّ: لا يمسّ `browse_deck` ولا `deck_cards` —
      هما بابُ «تصفّح مجموعة» وهو قائمٌ سليم. والجديدةُ بابٌ ثانٍ بجواره.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────── منشأة ───────────────────────── */

/* بطاقاتُ درسٍ بعينه — على شكل `browse_deck` حرفاً، وزيادةُ حقلين:
     · `note`       — كانت الواجهة تجلبها بنداءٍ ثانٍ إلى `deck_cards`
     · `front_image` — أُضيف في `160` ولم يبلغ هذا المسار
   وحارسان لا واحد:
     · `can_access_lesson` — درسٌ مقفلٌ لا تُسرَّب بطاقاتُه
     · `can_see_deck`      — **على كلّ بطاقةٍ بمجموعتها**، فبطاقاتُ درسٍ
       واحدٍ قد تتوزّع على مجموعاتٍ بعضُها غيرُ مرئيٍّ لهذا الطالب. */
create or replace function public.lesson_cards(p_lesson bigint)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare v_uid uuid := auth.uid(); v jsonb;
begin
  if v_uid is null then raise exception 'لا جلسة'; end if;
  if not can_access_lesson(p_lesson) then raise exception 'لا صلاحية'; end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', c.id, 'front', c.front, 'back', c.back,
           'note', c.note, 'lang', c.lang,
           'audio', c.audio, 'image', c.image, 'front_image', c.front_image,
           'mine', r.card_id is not null)              -- في صندوقي سلفاً؟
         order by c.position, c.id), '[]'::jsonb)
    into v
    from card_lessons cl
    join cards c on c.id = cl.card_id
    left join card_reviews r on r.card_id = c.id and r.user_id = v_uid
   where cl.lesson_id = p_lesson
     and can_see_deck(c.deck_id);

  return v;
end $function$;

grant execute on function public.lesson_cards(bigint) to authenticated;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

/* `list_lessons` تُلحق عدَّ بطاقات كلّ درس، فيظهر في صفّ أيقونات البطاقة.
   🔑 والتعديلُ في موضعه لا بنسخ الدالّة: متنُها نحو سبعين سطراً، ونسخُها
      يُجمّد بقيّتها على ما كانت اليوم ويعيد تعديلاً لاحقاً إن وقع.
      والعددُ المتوقَّع **قِيس على الحيّة قبل كتابة هذا الملفّ**:
      مرساةُ `pass_mark` مرّةٌ واحدة، و`'cards'` صفر. */
do $patch$
declare v text; n int;
begin
  v := pg_get_functiondef('public.list_lessons(bigint)'::regprocedure);

  if (select count(*) from regexp_matches(v, '''cards'', \(select count', 'g')) > 0 then
    raise notice '165 · list_lessons فيها cards سلفاً — تُركت كما هي';
    return;                                  -- الملفّ قابلٌ لإعادة التشغيل
  end if;

  n := (select count(*) from regexp_matches(v, '''pass_mark'', l\.pass_mark,', 'g'));
  if n <> 1 then
    raise exception '165 · مرساةُ pass_mark وُجدت % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ', n;
  end if;

  execute regexp_replace(v,
    '''pass_mark'', l\.pass_mark,',
    '''pass_mark'', l.pass_mark,' || chr(13) || chr(10) ||
    '      ''cards'', (select count(*) from card_lessons cl' || chr(13) || chr(10) ||
    '                    join cards c on c.id = cl.card_id' || chr(13) || chr(10) ||
    '                   where cl.lesson_id = l.id and can_see_deck(c.deck_id)),');
end $patch$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('165', 'بطاقاتُ الدرس تصل الطالب — الوسمُ على البطاقة لا على المجموعة', now())
on conflict (n) do update set applied_at = now();

commit;
