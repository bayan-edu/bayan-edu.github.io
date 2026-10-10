-- ══════════════════════════════════════════════════════════════════════
--  بيان — 162_due_front_image.sql  ·  وصورةُ الوجه تبلغ الطالب
-- ══════════════════════════════════════════════════════════════════════
--
--  🔑 ما يُغلقه: `160` بنى العمود، و`161` فتح عينَ البوّابة وردَّ
--  `deck_cards` صورةَ الوجه — **فرآها المؤلّف في محرّره، ولم يرها
--  الطالب في جلسته**. وقِيس على الحيّ قبل هذا الملفّ:
--
--      due_cards       front_image: لا   ·  image: نعم
--      practice_cards  front_image: لا   ·  image: نعم
--      browse_deck     front_image: لا   ·  image: نعم
--      deck_cards      front_image: نعم  ·  image: نعم   ← `161`
--
--  وجلسةُ الطالب تُغذّى من `due_cards` وحدها. ⇒ **صورةُ وجهٍ تُرفَع
--  وتُحفَظ وتُستورَد وتُعرَض في المعاينة، ثمّ تغيب عن الطالب بلا كلمة**
--  — وهو الصمتُ نفسُه الذي أُغلق ثلاثاً في `161`، في حلقته الأخيرة.
--
--  📐 **ولماذا `due_cards` وحدها:**
--     · `practice_cards` تغذّي «كلمة × معنى»، واللعبةُ لا تعرض وسيطاً
--       أصلاً — قِيس: `grep -n "image\|audio" js/card_game_match.js`
--       بلا مخرجات. ⇒ عمودٌ يُردّ بلا قارئٍ ثِقلٌ لا ميزة.
--     · `browse_deck` تغذّي قائمةَ الاشتراك، وصفُّها وجهٌ ومعنًى نصّاً
--       (`.pick-f` · `.pick-b`) بلا جرّة. ⇒ وهي تردُّ `image` اليوم
--       ولا يُقرأ — **فجوةٌ قائمةٌ تُرى ولا تُوسَّع.**
--     · والبطاقةُ بعد الاشتراك تُقرأ من `deck_cards`، وقد صارت تردُّها.
--
--  ┌─────────── ثوابتُ هذا الملفّ ───────────┐
--  │                                                                  │
--  │  ①  🔑 **التوقيعُ لا يتغيّر** — `due_cards(bigint, int, int)` كما   │
--  │     هو. ⇒ **لا `drop` في هذا الملفّ ولا منحٌ جديد**: الاستبدالُ    │
--  │     على توقيعٍ واحدٍ يُبقي الأذونَ كما هي، والمنحُ القائم          │
--  │     (`authenticated`) يُقاس في الفحص ③ لا يُعاد كتابتُه.          │
--  │                                                                  │
--  │  ②  📌 **والمتنُ لم يُعَد كتابتُه بل وُلِّد من `157` بأداة**،        │
--  │     وقِيست مطابقتُه للحيِّ **بالبصمة قبل التوليد**: متنُ            │
--  │     `due_cards` الحيُّ md5 `17aebde1…` وطولُه ٢٩٩٢ — وهي بعينها    │
--  │     بصمةُ نصِّ `sql/157` في المستودع بنهايات CRLF (وتلك سِمةُ      │
--  │     محرّر Supabase، وقد قِيست في `161` نفسِها).                   │
--  │     ⇒ **القاعدة ① مستوفاةٌ ببرهانٍ أقوى من القراءة**، والفرقُ      │
--  │     محصورٌ في موضعين بأعيانهما: عمودٌ يُقرأ، ومفتاحٌ يُردّ.         │
--  │                                                                  │
--  │  ③  ⚖️ **ولا حارسَ جديداً:** `can_see_card` و`can_see_deck`       │
--  │     كما هما، والعمودُ يسير مع صفّه لا بأذنٍ خاصّ. وصورةٌ لا        │
--  │     تُرى بطاقتُها لا تُردّ — لأنّ الصفَّ نفسَه لا يُردّ.             │
--  │                                                                  │
--  └──────────────────────────────────────────────────────────────────┘
--
--  🧪 وقياسٌ في الذيل يُشغَّل بعد الاعتماد، ولا يكتب حرفاً.
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ══════════════════════════════════════════════════════════════════════
--  معدَّلةٌ لا منشأة — وقد قُرئت حيّةً قبل استبدالها (بل بُصمت)
-- ══════════════════════════════════════════════════════════════════════

create or replace function public.due_cards(
  p_subject bigint,
  p_limit   int default 30,
  p_new     int default 6)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_uid uuid := auth.uid(); v jsonb;
begin
  if v_uid is null then raise exception 'لا جلسة'; end if;

  with mine as (
    select d.id from decks d
     where d.subject_id = p_subject and can_see_deck(d.id)
  ),
  pool as (
    select c.id, c.front, c.back, c.note, c.audio, c.image, c.front_image,
           c.lang, c.position,
           r.state, r.due, r.reps, r.my_note,
           case
             when r.card_id is null and exists (
                    select 1 from answers a
                      join attempts t on t.id = a.attempt_id
                      join questions q on q.id = a.question_id
                     where t.user_id = v_uid and q.card_id = c.id
                       and a.is_correct is not true)              then 1  -- ① تشخيص
             when r.card_id is not null and r.due <= now()        then 2  -- ② مستحقّ
             when r.card_id is null and exists (                          -- ③ درسٌ فُتح
                    select 1 from card_lessons cl
                      join items i on i.lesson_id = cl.lesson_id
                      join item_progress p on p.item_id = i.id
                     where cl.card_id = c.id and p.user_id = v_uid)
                                                                  then 3
             else 9
           end as rank
      from cards c
      join mine m on m.id = c.deck_id
      left join card_reviews r on r.card_id = c.id and r.user_id = v_uid
     where can_see_card(c.id)      -- 🔒 الدرسُ على البطاقة، فالحارسُ معها
  ),
  fresh as (
    --  🐛 position أوّلاً: ترتيبُ المؤلّف هو الذي يصل الطالب
    select * from pool where rank = 3 order by position, id limit greatest(0, p_new)
  ),
  q as (
    select * from pool where rank in (1,2)
    union all
    select * from fresh
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', x.id, 'front', x.front, 'back', x.back, 'note', x.note,
           'audio', x.audio, 'image', x.image, 'front_image', x.front_image,
           'lang', x.lang,
           'state',   coalesce(x.state,'new'),
           'reps',    coalesce(x.reps,0),
           'my_note', x.my_note,
           'entry',   case x.rank when 1 then 'dx' when 2 then 'due' else 'new' end,
           'dx_note', (select d.student_note
                         from answers a
                         join attempts t  on t.id = a.attempt_id
                         join questions qq on qq.id = a.question_id
                         join dx_codes d  on d.code = a.dx_code
                        where t.user_id = v_uid and qq.card_id = x.id
                          and a.is_correct is not true
                        order by a.id desc limit 1)
         ) order by x.rank, x.due nulls last, x.position, x.id), '[]'::jsonb)
    into v
    from (select * from q
           order by rank, due nulls last, position, id
           limit greatest(1, p_limit)) x;

  return jsonb_build_object(
    'subject', p_subject,
    'cards',   v,
    'count',   jsonb_array_length(v));
end $$;


-- ─── سطرُ السجلّ ─────────────────────────────────────────────────────
insert into public.sql_log (n, title, applied_at, applied_by, note)
values ('162', 'وصورةُ الوجه تبلغ الطالب — آخرُ حلقةٍ في سلسلة الصورة',
        now(), current_user,
        'معدَّلةٌ واحدةٌ لا منشأة، وتوقيعُها لم يتغيّر فلا drop ولا منحَ جديد. '
        'والمتنُ وُلِّد من 157 بأداة بعد إثبات مطابقته للحيّ بالبصمة. '
        'وdue_cards وحدها: اللعبةُ لا تعرض وسيطاً، وقائمةُ الاشتراك نصٌّ بلا جرّة.')
on conflict (n) do update set applied_at = now();


-- ══════════════════════════════════════════════════════════════════════
--  الفحوص — كلٌّ مكتوبٌ لحالته
-- ══════════════════════════════════════════════════════════════════════

select '① توقيعٌ واحدٌ لا اثنان' as فحص,
       count(*)::text as عدد,
       string_agg(p.pronargs::text, ' · ') as معاملات
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'due_cards';

--  🔑 **وبالبصمة لا بالطول** — وهي طرفةٌ قِيست هنا بعينها: ما زادته هذه
--     المعدَّلةُ (٦٧ محرفاً) ساوى بالضبط ما سقط من `\r` حين كُتب المتنُ
--     بنهاياتٍ LF بدل CRLF ⇒ **طولُ المتن ٢٩٩٢ قبلُ وبعدُ، وطولُ التعريف
--     ٣٢١٨ قبلُ وبعدُ** — ولو كان الفحصُ بالطول وحدَه لأقسم أنّ شيئاً
--     لم يُطبَّق. والبصمةُ وحدها فرّقت: `17aebde1…` ⇒ `29316f52…`.
--  ⚠️ **و`\r` تُحذف قبل البصم** — وإلّا كذب الفحصُ على من اعتمد الملفَّ
--     من محرّر Supabase: يحوّل النهاياتِ إلى CRLF فتتغيّر البصمةُ وحدَها
--     والمتنُ هو هو. فالمقارنةُ على نصٍّ مُسوّى، والمنتظَرُ بصمةُ الملفّ
--     بنهايات LF — وهي ما في المستودع.
select '② والعمودُ يُقرأ ويُردّ' as فحص,
       (select count(*) from regexp_matches(d, 'c\.front_image', 'g'))::text  as "يُقرأ من cards",
       (select count(*) from regexp_matches(d, $r$'front_image'$r$, 'g'))::text as "مفتاحٌ راجع",
       md5(replace(p.prosrc, chr(13), '')) as بصمة,
       (md5(replace(p.prosrc, chr(13), '')) = '29316f525b6e7f83df90d34bda412e24')::text
         as "طابقَ الملفَّ؟",
       length(d)::text as "طولُ التعريف (لا يُعوَّل عليه وحدَه)"
from pg_proc p
     join pg_namespace n on n.oid = p.pronamespace
     cross join lateral (select pg_get_functiondef(p.oid) as d) t
where n.nspname = 'public' and p.proname = 'due_cards';

select '③ والمنحُ القائم على حاله' as فحص,
       has_function_privilege('authenticated', p.oid, 'execute')::text as "authenticated؟",
       has_function_privilege('service_role',  p.oid, 'execute')::text as "service_role؟"
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'due_cards';

select '④ ولا دالّةَ أخرى مُسّت' as فحص,
       string_agg(p.proname || '=' || length(pg_get_functiondef(p.oid))::text, ' · '
                  order by p.proname) as أطوال
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('import_cards','deck_cards','save_cards','save_card',
                    'practice_cards','browse_deck','review_card','due_counts');

select '⑤ سطرُ السجلّ' as فحص, l.n, l.title, l.applied_at from sql_log l where l.n = '162';

commit;

-- ══════════════════════════════════════════════════════════════════════
--  🧪 قياسٌ بهويّة طالبٍ له بطاقةٌ بصورةِ وجه — بعد الاعتماد، بلا كتابة
--
--  do $probe$
--  declare v_uid text; v_sub bigint; v jsonb; v_n int;
--  begin
--    select d.subject_id into v_sub
--      from cards c join decks d on d.id = c.deck_id
--     where c.front_image is not null limit 1;
--    if v_sub is null then
--      raise exception 'لا بطاقةَ بصورةِ وجهٍ بعد — والقياسُ يُعاد بعد أوّل استيراد';
--    end if;
--
--    select p.id::text into v_uid from profiles p where p.role = 'admin' limit 1;
--    perform set_config('request.jwt.claims',
--            json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
--
--    v := due_cards(v_sub, 30, 6);
--    select count(*) into v_n
--      from jsonb_array_elements(v->'cards') e
--     where e ? 'front_image';
--
--    raise exception E'\nالمادة % · بطاقاتٌ راجعة % · فيها مفتاحُ front_image %',
--          v_sub, v->>'count', v_n;
--  end $probe$;
--
--  والمتوقَّع: المفتاحُ في **كلّ** بطاقةٍ راجعة (قيمتُه null لمن لا صورةَ
--  لها) — فالمبنى يُكتب لكلّ صفّ. ولا يبقى من القياس أثر.
-- ══════════════════════════════════════════════════════════════════════
