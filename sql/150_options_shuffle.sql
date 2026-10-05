-- ══════════════════════════════════════════════════════════════════════
--  ١٥٠ · خياراتُ الاختيار تُخلط بالبذرة — موضعُ الصواب لا يُقاس
-- ══════════════════════════════════════════════════════════════════════
--
--  **لماذا:** خياراتُ mcq وmsq كانت تصل الطالبَ بترتيب التخزين دائماً —
--  `order by o.position` بلا خلطٍ في المنصّة كلِّها. والملفّاتُ المسلَّمة
--  تضع الصوابَ أوّلاً (قيس بعد أوّل استيرادَين: «U1.MAJAZ» ١٤ من ١٤ في
--  «أ»، و«U1L2.DISC» ١٦ من ١٨) ⇒ **الطالبُ يتعلّم الموضعَ لا المفهوم،
--  والتشخيصُ يُبنى على مشتّتٍ لم يُقرأ أصلاً.**
--
--  ⇒ **تُخلط عند العرض لا عند الإدخال،** بالبذرة الحتميّة القائمة التي
--  تخلط بنكَ الإكمال والمزاوجة منذ `112`·`114` — فلسفةٌ واحدة لا ثانية:
--  ① ثابتٌ داخل المحاولة (البذرة تشمل رقمَها، وتحديثُ الصفحة لا يبدّله)
--  ② متغيّرٌ بين الطلاب وبين المحاولات — فيسقط النقلُ بين المتجاورين
--  ③ والمخزونُ لا يُمسّ: ما سُلّم يُحفظ كما سُلّم، والعلاجُ يصيب
--     القائمَ والقادمَ ومُدخلَ المحرّر اليدويّ سواء.
--  والتصحيحُ والتشخيصُ بمعرّف الخيار لا بموضعه (`submit_attempt` ·
--  `data-o` في الواجهة) فلا يتأثّران، والتسميةُ (أ·ب·ج) تتبع الموضعَ
--  المعروض (`optLabel(o,j)`).
--
--  📐 **وبابا نجاةٍ للترتيب المقصود:**
--  ① بنودُ المزاوجة لا تُخلط — عمودُها يقابل بنكاً يُخلط هو، وخلطُ
--     الطرفين معاً ضجيجٌ بلا قياس.
--  ② وسؤالٌ ثبّت مؤلّفُه تسمياتِ خياراته (`33` · عمود `label`) ترتيبُه
--     مقصودٌ فيبقى — فمن أراد «جميع ما سبق» آخراً فلْيُسمِّ خياراته.
--
--  🟡 **وفجوةٌ تُرى ولا تُعالَج هنا:** لقطةُ التدرّب
--  (`practice_snapshot_quiz` · `117`) تُجمَّد بترتيب التخزين — بابُها
--  بابُ تجميدٍ لا عرضٍ حيّ، وحكمُها يُقرَّر في خطوتها.
--
--  🔁 قابلٌ لإعادة التشغيل · `get_quiz` وحدها، والمنحُ محفوظٌ بالاستبدال.
-- ══════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────
--  ⚠️ معدَّلةٌ لا منشأة — آخرُ من مسّها `75` (الحرّاس) و`112`·`114` (البنك)
-- ─────────────────────────────────────────────────────────────────────

create or replace function public.get_quiz(p_quiz bigint)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare v jsonb; v_ids bigint[]; v_seed text; v_att int; v_lane bigint; v_sh bool;
begin
  if not can_access(p_quiz) and not is_teacher() then
    raise exception 'هذا الاختبار غير متاح لك بعد';
  end if;

  select shuffle into v_sh from quizzes where id = p_quiz;

  select count(*) into v_att
    from attempts where quiz_id = p_quiz and user_id = auth.uid();

  v_seed := coalesce(auth.uid()::text, 'anon') || ':' ||
            p_quiz::text || ':' || v_att::text;

  select passage_id into v_lane
    from questions
   where quiz_id = p_quiz and variant_key is not null and passage_id is not null
     and retired_at is null
   group by passage_id
   order by md5(v_seed || passage_id::text)
   limit 1;

  select array_agg(id) into v_ids from (
    select distinct on (variant_key) id
      from questions
     where quiz_id = p_quiz and variant_key is not null
       and retired_at is null
     order by variant_key,
              (passage_id is not distinct from v_lane) desc,
              (passage_id is null) desc,
              md5(v_seed || id::text)
  ) s;

  v_ids := coalesce(v_ids, '{}'::bigint[]) || coalesce((
    select array_agg(id) from questions
     where quiz_id = p_quiz and variant_key is null
       and retired_at is null), '{}'::bigint[]);

  select jsonb_build_object(
    'id', q.id, 'title', q.title, 'minutes', q.minutes, 'version', q.version,
    'plays', q.plays,
    'passages', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', pg.id, 'title', pg.title, 'body', pg.body,
        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang)
        order by pg.position)
      from passages pg
     where pg.quiz_id = q.id
       and exists (select 1 from questions z
                    where z.id = any(v_ids) and z.passage_id = pg.id)), '[]'::jsonb),
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', x.id, 'kind', x.kind, 'body', x.body,
        'section', x.section,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        'passage_id', x.passage_id, 'lang', x.lang,
        'gaps', case when x.kind = 'gap' then gap_count(x.body) end,
        -- 112 · الإكمال نصوصٌ تُخلط بنصّها، والمزاوجة [{k,t}] تُخلط بمفتاحها
        --       فلا يقفز مقابلٌ أمام الطالب إن حُرِّر نصُّه بين محاولتين.
        -- 114 · و«إكمال من قائمة» قائمتُه [{k,t}] كالمزاوجة ⇒ تُخلط بمفتاحها
        'bank', case
                  when x.kind = 'gap' then
                    (select jsonb_agg(b order by md5(v_seed || x.id::text || b))
                       from question_keys k2,
                            jsonb_array_elements_text(k2.bank) b
                      where k2.question_id = x.id)
                  when x.kind in ('matching', 'cloze') then
                    (select jsonb_agg(b order by md5(v_seed || x.id::text || (b->>'k')))
                       from question_keys k2,
                            jsonb_array_elements(k2.bank) b
                      where k2.question_id = x.id)
                end,
        -- 150 · وخياراتُ الاختيار تُخلط بالبذرة نفسِها — موضعُ الصواب
        --       الثابت («أ» في الملفّات المسلَّمة) يُقاس بدل المفهوم.
        --       حتميٌّ داخل المحاولة، متغيّرٌ بين الطلاب والمحاولات،
        --       والتصحيحُ بالمعرّف فلا يتأثّر. وبنودُ المزاوجة بترتيبها
        --       (عمودُها يقابل بنكاً يُخلط)، وسؤالٌ ثبّت مؤلّفُه تسمياتِ
        --       خياراته (33) ترتيبُه مقصودٌ فيبقى.
        'options', coalesce((
          select jsonb_agg(jsonb_build_object('id', o.id, 'label', o.label,
                           'body', o.body, 'image', o.image_url,
                           'k', o.item_key)
                 order by case when x.kind in ('mcq', 'msq')
                                and not exists (select 1 from options o2
                                                 where o2.question_id = x.id
                                                   and o2.label is not null)
                               then md5(v_seed || 'k' || o.id::text) end,
                          o.position)
          from options o where o.question_id = x.id), '[]'::jsonb)
      )
      order by (select min(coalesce((select min(y.position) from questions y
                                      where y.quiz_id = z.quiz_id
                                        and y.variant_key = z.variant_key
                                        and y.retired_at is null), z.position))
                  from questions z
                 where z.id = any(v_ids) and z.quiz_id = x.quiz_id
                   and z.passage_id is not distinct from x.passage_id
                   and z.section    is not distinct from x.section),
               case when v_sh and x.passage_id is null
                    then md5(v_seed || 'o' || x.id::text) end,
               coalesce((select min(y.position) from questions y
                          where y.quiz_id = x.quiz_id
                            and y.variant_key = x.variant_key
                            and y.retired_at is null), x.position),
               x.position)
      from questions x where x.id = any(v_ids)), '[]'::jsonb)
  ) into v
  from quizzes q where q.id = p_quiz;

  return v;
end $function$;

insert into public.sql_log (n, title, applied_at)
values ('150', 'خياراتُ الاختيار تُخلط بالبذرة — موضعُ الصواب لا يُقاس', now())
on conflict (n) do update set applied_at = now();
