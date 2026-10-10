-- ══════════════════════════════════════════════════════════════════════
--  بيان — 161_cards_media.sql  ·  البوّابةُ تفتح عينَها على الوسائط
-- ══════════════════════════════════════════════════════════════════════
--
--  🔑 ما يُغلقه: `160` بنى **أساسَ الصورة** — مخزنُ `img` وعمودُ
--  `front_image` وكاتبان يعرفانهما. **والبوّابةُ لا تزال عمياء:** قِيس
--  على الحيّ قبل هذا الملفّ — `import_cards` فيها صفرُ ذكرٍ لـ`image`
--  و`audio` و`front_image`، و`deck_cards` لا تردّ `front_image`.
--  ⇒ **ملفٌّ يحمل صورةً أو نُطقاً يفقدهما بلا كلمة**، وشاشةُ البطاقات
--  لا ترى صورةَ وجهٍ ولو كُتبت.
--
--  📐 **ولهذا يسبق هذا الملفُّ الناقلَ لا يتبعه:** لو رفع الناقلُ صورةً
--  اليوم وكتب مفتاحَها، لأسقطته البوّابةُ صامتاً وبقي في المخزن **ملفٌّ
--  يتيمٌ لا يُحيل إليه صفّ**. **والميزةُ تُقاس بما وصلها لا بما بُني منها.**
--
--  ┌─────────── ثوابتُ هذا الملفّ ───────────┐
--  │                                                                  │
--  │  ①  🔑 **التوقيعان لا يتغيّران** — `import_cards(bigint, jsonb,   │
--  │     boolean)` و`deck_cards(bigint)` كما هما. ⇒ **لا `drop` في     │
--  │     هذا الملفّ ولا منحٌ جديد**، والمنحُ القائم يبقى على حاله.      │
--  │     (وسابقةُ `160` تُقرأ: زيادةُ معاملٍ تُنشئ دالّةً ثانيةً.)        │
--  │                                                                  │
--  │  ②  📌 **والمتنُ لم يُعَد كتابتُه بل وُلِّد من `159` بأداة**، وقِيست  │
--  │     مطابقتُه للحيّ **بالبصمة قبل التوليد**: متنُ `import_cards`    │
--  │     الحيُّ md5 `08514e77…` وطولُه ١٣٣٥٢ — وهي بعينها بصمةُ         │
--  │     `sql/159` في المستودع. ⇒ **القاعدة ① مستوفاةٌ ببرهانٍ أقوى من  │
--  │     القراءة**، والفرقُ محصورٌ في ستّة مواضعَ بأعيانها.             │
--  │                                                                  │
--  │  ③  ⚖️ **وما يُقاس يُحرَس، وما يُحكَم يُترك:** شكلُ مفتاح الوسيط    │
--  │     يُقاس (`مخزن/مسار` أو `https`) **بمسطرة `js/api.js` نفسِها**   │
--  │     لا بمسطرةٍ تُخترع. أمّا «أتصلح هذه الصورةُ بديلاً عن المعنى؟»   │
--  │     فحكمٌ تربويٌّ موضعُه شاشةُ المؤلّف.                            │
--  │                                                                  │
--  │  ④  🔴 **والدفعةُ تُردّ كلُّها عند أوّل صمت.** `save_cards` تردّ     │
--  │     `skipped` وكانت لا تُقرأ — فصارت الخطّةُ تُقابَل بالمكتوب،     │
--  │     **والجافّةُ تكشف الفرقَ قبل أن يُكتب حرف.**                   │
--  │                                                                  │
--  └──────────────────────────────────────────────────────────────────┘
--
--  🧪 وتجربةٌ جافّةٌ في الذيل تُشغَّل بعد الاعتماد، وتنقض نفسها.
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ══════════════════════════════════════════════════════════════════════
--  معدَّلتان لا منشأتان — وكلتاهما قُرئت حيّةً قبل استبدالها
-- ══════════════════════════════════════════════════════════════════════

-- ─── ① `deck_cards` — تردّ صورةَ الوجه ──────────────────────────────
--  🔑 وبدونها **لا ترى شاشةُ البطاقات صورةَ وجهٍ ولو كُتبت** — ورقيقةُ
--     «بلا صورة» في المِصفاة (`b134`) تُركت تنتظر هذا السطرَ بعينه،
--     لأنّ رقيقةً تقول «بلا صورة» وفي البطاقة صورةُ وجهٍ **تكذب**.

create or replace function public.deck_cards(p_deck bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $fn$
declare v jsonb;
begin
  if not can_see_deck(p_deck) then raise exception 'لا صلاحية'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', c.id, 'front', c.front, 'back', c.back,
           'note', c.note, 'audio', c.audio, 'image', c.image, 'lang', c.lang,
           --  🆕 161 · صورةُ الوجه (عمودُ `160`)
           'front_image', c.front_image,
           'position', c.position,
           'lessons', (select coalesce(jsonb_agg(jsonb_build_object(
                                 'id', l.id, 'title', l.title) order by l.position, l.id), '[]'::jsonb)
                         from card_lessons cl join lessons l on l.id = cl.lesson_id
                        where cl.card_id = c.id),
           'strands', (select coalesce(jsonb_agg(jsonb_build_object(
                                 'id', s.id, 'name', s.name) order by s.sort_order, s.id), '[]'::jsonb)
                         from card_strands cs join strands s on s.id = cs.strand_id
                        where cs.card_id = c.id)
         ) order by c.position, c.id), '[]'::jsonb)
    into v from cards c where c.deck_id = p_deck;
  return v;
end $fn$;


-- ─── ② `import_cards` — ستّةُ مواضعَ لا سابعَ لها ────────────────────
--  ① حارسٌ يصمد لغياب `cards` · ② التطبيعُ ينقل الوسائط الثلاث ·
--  ③ حارسُ شكلِ المفتاح · ④ الوسائطُ تصل `save_cards` ·
--  ⑤ قراءةُ `skipped` ومقابلةُ الخطّة بالمكتوب · ⑥ `v_skipped`.

create or replace function public.import_cards(
  p_course  bigint,
  p_payload jsonb,
  p_dry_run boolean default true)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_subject bigint; v_level bigint; v_sname text;
  v_deck bigint; v_deck_new boolean := false;
  v_rows jsonb; v_n int;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_plan jsonb; v_out jsonb; v_res jsonb;
  v_added int := 0; v_updated int := 0; v_skipped int := 0;
  v_lrows int := 0; v_srows int := 0;
  v_stage text := 'التحقّق';
  v_lid bigint; v_sid bigint; r record;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id, c.level_id into v_subject, v_level
    from courses c where c.id = p_course and c.active;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود أو معطَّل');
  end if;

  --  🔒 و`can_curate` لا `can_author`: المجموعةُ **رسميّةٌ للمادّة كلِّها**،
  --  فالكتابةُ فيها فعلُ إشرافٍ لا فعلُ تأليفٍ على درسٍ بعينه. ومعلّمٌ
  --  موثَّقٌ يؤلّف اختبارَ درسِه، ولا يكتب في معجم المادّة.
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'استيرادُ البطاقات لفريق الإشراف على المادة');
  end if;

  select s.name into v_sname from subjects s where s.id = v_subject;

  --  (ثابت ⑤)
  perform pg_advisory_xact_lock(hashtext('import_cards'),
                                (v_subject * 1000 + coalesce(v_level, 0))::int);

  -- ══════════════ قراءةُ الدفعة وتطبيعُها مرّةً واحدة ══════════════
  --  🔑 تُطبَّع هنا ثمّ تُقرأ في الفحص والخطّة والكتابة من موضعٍ واحد —
  --  فثلاثةُ قُرّاءٍ لشكلٍ واحد يفترقون عند أوّل تعديل.

  --  🔴 161 · وكان هذا الحارسُ **يمرّ على غياب المفتاح**: `jsonb_typeof`
  --     تردّ NULL للمفتاح الغائب، فيصير الشرطُ كلُّه NULL فلا يُفعَل.
  --     ⇒ ملفٌّ مُخطئُ المفتاح كان يُحكى «تمّت» وخطّةَ أصفار، **ويُنشئ في
  --     الاعتماد مجموعةً رسميّةً فارغةً للمادّة.** قِيس على الحيّ:
  --     `{}` ⇒ ok=true · و`{"cards":[]}` تُردّ · و`{"cards":"نصّ"}` تُردّ.
  --     **فالغائبُ وحدَه كان يمرّ**، وهو أخطرُها: المؤلّفُ يُطمأن
  --     وبطاقاتُه لم تبلغ حرفاً.
  --  📌 وفرعان لا شرطٌ واحد: `jsonb_array_length` على غير قائمةٍ تصيح،
  --     فلا يُتّكل على ترتيب تقويم `or`. والسببُ يُسمّى لمن يقرأ.
  if coalesce(jsonb_typeof(p_payload->'cards'), 'غائب') <> 'array' then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'المقرَّر', p_course,
      'أخطاء', to_jsonb(array['لا قائمةَ cards في الدفعة — والمنتظر { "cards": [ … ] }. '
        || 'وما وُجد: ' || coalesce(jsonb_typeof(p_payload->'cards'), 'المفتاح غائب')]));
  end if;
  if jsonb_array_length(p_payload->'cards') = 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'المقرَّر', p_course,
      'أخطاء', to_jsonb(array['قائمةُ cards فارغة — ولا دفعةَ بلا بطاقة']));
  end if;

  select jsonb_agg(jsonb_build_object(
           'rn',    t.ord,
           'front', btrim(coalesce(t.e->>'front', '')),
           'back',  btrim(coalesce(t.e->>'back',  '')),
           --  يُقبل `examples` قائمةً أو `note` نصّاً — والقائمةُ أوضح
           'note',  coalesce(
                      (select string_agg(btrim(x.value), '؛')
                         from jsonb_array_elements_text(
                                case when jsonb_typeof(t.e->'examples') = 'array'
                                     then t.e->'examples' else '[]'::jsonb end) x
                        where btrim(x.value) <> ''),
                      nullif(btrim(coalesce(t.e->>'note', '')), '')),
           'lang',  lower(coalesce(nullif(btrim(coalesce(t.e->>'lang','')),''), 'ar')),
           --  🆕 161 · والوسائطُ تُنقل. كانت `cards` تحملها و`save_cards`
           --     تكتبها **وهذه لا تقرؤها** — فملفٌّ يحملها يفقدها بلا كلمة.
           --     وهي عينُ «فجوةِ التكافؤ» المكتوبة عن الاختبار في ٥ أكتوبر.
           'image',       nullif(btrim(coalesce(t.e->>'image','')),''),
           'front_image', nullif(btrim(coalesce(t.e->>'front_image','')),''),
           'audio',       nullif(btrim(coalesce(t.e->>'audio','')),''),
           'lessons', case when jsonb_typeof(t.e->'lessons') = 'array' then t.e->'lessons'
                           when nullif(btrim(coalesce(t.e->>'lesson','')),'') is not null
                                then jsonb_build_array(btrim(t.e->>'lesson'))
                           else '[]'::jsonb end,
           'strands', case when jsonb_typeof(t.e->'strands') = 'array' then t.e->'strands'
                           when nullif(btrim(coalesce(t.e->>'strand','')),'') is not null
                                then jsonb_build_array(btrim(t.e->>'strand'))
                           else '[]'::jsonb end)
         order by t.ord)
    into v_rows
    from jsonb_array_elements(p_payload->'cards') with ordinality as t(e, ord);

  v_n := jsonb_array_length(v_rows);

  -- ══════════════════ حرّاسٌ تُقاس (ثابت ⑥) ══════════════════

  --  ① الوجهُ والمعنى — ولا بطاقةَ بأحدهما
  select array_agg('بطاقة ' || (cd->>'rn') || ': بلا وجه')
    into v_tmp from jsonb_array_elements(v_rows) cd where (cd->>'front') = '';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('بطاقة ' || (cd->>'rn') || ' «' || (cd->>'front') || '»: بلا معنى')
    into v_tmp from jsonb_array_elements(v_rows) cd
   where (cd->>'back') = '' and (cd->>'front') <> '';
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ② 🔴 حرفٌ يكسر شاشةَ اللصق — ويُمسَك هنا قبل أن يُمسَك هناك.
  --     درسٌ قِيس: Tab زائدٌ يشطر عموداً، وسطرٌ جديدٌ يشطر بطاقةً نصفين.
  --     والقاعدةُ تقبله اليوم صامتةً ثمّ يسقط عند أوّل تصديرٍ إلى الشاشة.
  --     **فالحدُّ يُوضع حيث يُعرَف، لا حيث يُكتشَف.**
  select array_agg('بطاقة ' || (cd->>'rn') || ' «' || left(cd->>'front', 30)
                   || '»: فيها Tab أو سطرٌ جديد — وهما فاصلا شاشة اللصق')
    into v_tmp from jsonb_array_elements(v_rows) cd
   where (cd->>'front') ~ E'[\t\n\r]' or (cd->>'back') ~ E'[\t\n\r]'
      or coalesce(cd->>'note','') ~ E'[\t\n\r]';
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ③ وجهان بمفتاحٍ واحدٍ في الدفعة: `save_cards` تُسقط الثانيَ صامتاً
  --     (أوّلُ ظهورٍ يفوز) — والصمتُ هنا يُقال.
  select array_agg('وجهٌ مكرَّرٌ في الدفعة: ' || d.f) into v_tmp
    from (select cd->>'front' as f from jsonb_array_elements(v_rows) cd
           where (cd->>'front') <> ''
           group by card_key(cd->>'front'), cd->>'front'
          having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ④ لغةٌ لا تعرفها المنصّة
  select array_agg('بطاقة ' || (cd->>'rn') || ': لغةٌ غير معروفة «' || (cd->>'lang') || '»')
    into v_tmp from jsonb_array_elements(v_rows) cd where (cd->>'lang') not in ('ar','en');
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑤ مفتاحُ درسٍ ليس في هذا المقرَّر
  select array_agg(distinct 'مفتاحُ درسٍ ليس في هذا المقرَّر: «' || btrim(k.value) || '»')
    into v_tmp
    from jsonb_array_elements(v_rows) cd
    cross join lateral jsonb_array_elements_text(cd->'lessons') k
   where not exists (select 1 from lessons l
                      where l.course_id = p_course and l.author_key = btrim(k.value)
                        and l.archived_at is null);
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑥ فرعٌ ليس في هذه المادّة — ولا يُخترع فرع
  select array_agg(distinct 'فرعٌ ليس في هذه المادة: «' || btrim(s.value) || '»') into v_tmp
    from jsonb_array_elements(v_rows) cd
    cross join lateral jsonb_array_elements_text(cd->'strands') s
   where not exists (select 1 from strands st
                      where st.subject_id = v_subject and st.name = btrim(s.value));
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⑦ 🆕 161 · شكلُ مفتاح الوسيط — `مخزن/مسار` أو رابطُ `https`.
  --     **والمسطرةُ مُعادةٌ من `js/api.js` (`KEY_RX`) لا مخترعة:** ما خالفها
  --     تردّه `publicUrl` بـ`null` فيُعرض **فراغاً بلا رسالة** — وذاك صمتٌ
  --     يُصدَّق. ومفتاحٌ بلا مخزنٍ (`u1-ab12.png`) أشيعُ غلطٍ هنا.
  select array_agg('بطاقة ' || (cd->>'rn') || ' «' || left(cd->>'front', 24)
                   || '»: ' || m.k || ' ليس مفتاحَ مخزنٍ ولا رابطاً — «' || m.v || '»')
    into v_tmp
    from jsonb_array_elements(v_rows) cd
    cross join lateral (values ('image',       cd->>'image'),
                               ('front_image', cd->>'front_image'),
                               ('audio',       cd->>'audio')) m(k, v)
   where coalesce(m.v, '') <> ''
     and m.v !~ '^[a-z0-9][a-z0-9-]*/.+$'
     and m.v !~* '^https?://';
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true,
      'المقرَّر', p_course, 'المادة', v_subject, 'العدد', v_n,
      'أخطاء', to_jsonb(v_err),
      'بيانٌ', 'الدفعةُ تُردّ جملةً — ولا تُصلَح هنا بل عند مؤلّفها');
  end if;

  -- ══════════════ تحذيراتٌ تُعرَض ولا تمنع ══════════════
  --  ⚖️ (ثابت ⑥) — أحكامٌ على جودةِ تعلُّم، والقرارُ فيها للمشرف أمام
  --     الفرق، لا لدالّةٍ تردّ دفعةً كاملةً من أجل سطر.

  select array_agg('«' || (cd->>'front') || '»: '
          || case when coalesce(cd->>'note','') = '' then 'عمودُها الثالث فارغ'
                  else 'بنودُ عمودها الثالث '
                    || array_length(string_to_array(cd->>'note', '؛'), 1)::text
                    || ' لا ثلاثة' end
          || ' — والمنصّةُ تختار بنداً في كلّ لقاء، فيرى الطالبُ السطرَ نفسَه')
    into v_tmp from jsonb_array_elements(v_rows) cd
   where coalesce(array_length(string_to_array(coalesce(cd->>'note',''), '؛'), 1), 0) < 3
      or coalesce(cd->>'note','') = '';
  v_warn := v_warn || coalesce(v_tmp, '{}');

  select array_agg('«' || (cd->>'front') || '»: بلا درس — فلا تظهر في قائمة '
                   || 'بطاقات أسئلة درسٍ، ولا تصل طالباً إلا باختياره')
    into v_tmp from jsonb_array_elements(v_rows) cd
   where jsonb_array_length(cd->'lessons') = 0;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  select array_agg('«' || (cd->>'front') || '»: بندان متطابقان في العمود الثالث')
    into v_tmp from jsonb_array_elements(v_rows) cd
   where (select count(*) <> count(distinct btrim(x))
            from unnest(string_to_array(coalesce(cd->>'note',''), '؛')) x
           where btrim(x) <> '');
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- ══════════════ المجموعة — تُوجد أو تُنشأ ══════════════

  select d.id into v_deck from decks d
   where d.subject_id = v_subject
     and coalesce(d.level_id, 0) = coalesce(v_level, 0)
     and d.owner_id is null;
  v_deck_new := v_deck is null;

  -- ══════════════ الخطّةُ — قبل أن يُكتب حرف ══════════════

  select jsonb_build_object(
    'المجموعة', case when v_deck_new
                     then 'ستُنشأ: بطاقات ' || coalesce(v_sname, '؟')
                     else v_deck::text end,
    'سيُنشأ',  coalesce((select count(*) from jsonb_array_elements(v_rows) cd
                         where v_deck is null
                            or not exists (select 1 from cards c
                                            where c.deck_id = v_deck
                                              and c.front_key = card_key(cd->>'front'))), 0),
    'سيُحدَّث', coalesce((select count(*) from jsonb_array_elements(v_rows) cd
                         where v_deck is not null
                           and exists (select 1 from cards c
                                        where c.deck_id = v_deck
                                          and c.front_key = card_key(cd->>'front'))), 0),
    'وصلاتُ دروس', coalesce((select count(*) from jsonb_array_elements(v_rows) cd
                             cross join lateral jsonb_array_elements_text(cd->'lessons') k), 0),
    'وصلاتُ فروع', coalesce((select count(*) from jsonb_array_elements(v_rows) cd
                             cross join lateral jsonb_array_elements_text(cd->'strands') s), 0))
    into v_plan;

  -- ══════════════ التنفيذ — ذرّيٌّ، والجافّةُ تنقضه ══════════════
  begin

    if v_deck_new then
      v_stage := 'إنشاءُ مجموعة المادة';
      v_deck := save_deck(null, 'بطاقات ' || coalesce(v_sname, '؟'),
                          v_subject, v_level, null, 0);
    end if;

    v_stage := 'حفظُ البطاقات';
    v_res := save_cards(v_deck,
               (select jsonb_agg(jsonb_build_object(
                         'front', cd->>'front', 'back', cd->>'back',
                         'note',  cd->>'note',  'lang', cd->>'lang',
                         'image', cd->>'image', 'audio', cd->>'audio',
                         'front_image', cd->>'front_image')
                       order by (cd->>'rn')::int)
                  from jsonb_array_elements(v_rows) cd));
    v_added   := coalesce((v_res->>'added')::int, 0);
    v_updated := coalesce((v_res->>'updated')::int, 0);
    v_skipped := coalesce((v_res->>'skipped')::int, 0);

    --  🔴 161 · ومقابلةُ ما خُطّط بما كُتب. `save_cards` تردّ `skipped`
    --     **وكانت لا تُقرأ**: بطاقةٌ وجهُها تشكيلٌ أو تطويلٌ وحدَه
    --     (`card_key` تردّ NULL) تُعدّ في الخطّة ولا تُكتب. قِيس على الحيّ:
    --     بطاقتان إحداهما وجهُها «ـــ» ⇒ الخطّةُ وعدت ٢ و`save_cards`
    --     كتبت `added 1 · skipped 1` — **ولا صوتَ في المسار كلِّه.**
    --  📐 وتُردّ الدفعةُ كلُّها لا بطاقةٌ بعينها: «تمرّ كلُّها أو لا يبقى
    --     منها شيء» ثابتُ هذه البوّابة منذ `159`. **والجافّةُ تكشفه قبل
    --     أن يُكتب حرف**، فالثمنُ تحذيرٌ لا خسارة.
    if v_added + v_updated <> v_n then
      raise exception 'خُطّط لـ% بطاقةً وكُتب % — وأسقطت save_cards %. '
                      'وسببُه الغالب وجهٌ لا يبقى منه حرفٌ بعد إسقاط '
                      'التشكيل والتطويل، فلا مفتاحَ له.',
                      v_n, v_added + v_updated, v_skipped;
    end if;

    --  🔑 والمعرّفاتُ تُقرأ بالمفتاح لا بترتيب `ids`: `save_cards` تُرجعها
    --  بترتيب `returning` لا بترتيب الدخل، فالمطابقةُ بالموضع تَعِدُ ولا
    --  تفي. و`front_key` عمودٌ مولَّدٌ مخزَّنٌ من `card_key(front)` —
    --  فالوصلُ به دقيقٌ ومفهرَس.

    --  (ثابت ②) الوسمُ يُضاف ولا يُستبدل — ودرسٌ واحدٌ في كلّ نداء
    v_stage := 'وسمُ الدروس';
    for r in
      select btrim(k.value) as akey, array_agg(c.id) as ids
        from jsonb_array_elements(v_rows) cd
        cross join lateral jsonb_array_elements_text(cd->'lessons') k
        join cards c on c.deck_id = v_deck and c.front_key = card_key(cd->>'front')
       group by 1
    loop
      select l.id into v_lid from lessons l
       where l.course_id = p_course and l.author_key = r.akey and l.archived_at is null;
      v_res := link_cards_lesson(r.ids, v_lid, true);
      v_lrows := v_lrows + coalesce((v_res->>'changed')::int, 0);
    end loop;

    v_stage := 'وسمُ الفروع';
    for r in
      select btrim(s.value) as sname, array_agg(c.id) as ids
        from jsonb_array_elements(v_rows) cd
        cross join lateral jsonb_array_elements_text(cd->'strands') s
        join cards c on c.deck_id = v_deck and c.front_key = card_key(cd->>'front')
       group by 1
    loop
      select st.id into v_sid from strands st
       where st.subject_id = v_subject and st.name = r.sname;
      v_res := link_cards_strand(r.ids, v_sid, true);
      v_srows := v_srows + coalesce((v_res->>'changed')::int, 0);
    end loop;

    --  🧪 الجافّةُ: مرّ المسارُ كلُّه بحرّاسه الأحياء، ولا يبقى منه أثر
    if p_dry_run then
      raise exception using errcode = 'BY159', message = 'الجافّة تمّت';
    end if;

  exception
    when sqlstate 'BY159' then
      null;                                  -- نُقضت الكتابة، وبقي الحكم
    when others then
      v_out := jsonb_build_object(
        'ok', false, 'تجريبيّة', p_dry_run,
        'توقّف عند', v_stage, 'السبب', sqlerrm,
        'بيانٌ', 'لم يبقَ من الدفعة شيء — تُصحَّح وتُعاد كاملةً',
        'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn));
      insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
      values ('cards', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());
      return v_out;
  end;

  v_out := jsonb_build_object(
    'ok', true, 'تجريبيّة', p_dry_run,
    'المقرَّر', p_course, 'المادة', v_subject,
    'المجموعة', case when p_dry_run and v_deck_new then null else v_deck end,
    'أُنشئت',  case when p_dry_run then null else v_added end,
    'حُدِّثت',  case when p_dry_run then null else v_updated end,
    'وصلاتُ دروسٍ وقعت', case when p_dry_run then null else v_lrows end,
    'وصلاتُ فروعٍ وقعت', case when p_dry_run then null else v_srows end,
    'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn),
    'بيانٌ', case when p_dry_run
                  then 'جافّة: مرّ المسارُ كلُّه بحرّاسه ولم يبقَ أثر'
                  else 'اعتُمدت. والوسمُ يُضاف ولا يُزال — '
                    || 'فإزالةُ وسمٍ قائمٍ من شاشة البطاقات لا من الاستيراد' end);

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('cards', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());

  return v_out;
end $$;

comment on function public.import_cards(bigint, jsonb, boolean) is
  'بوّابةُ استيراد البطاقات (159 · وُسّعت في 161): جافّةٌ أوّلاً، والدفعةُ '
  'تُردّ جملةً، ولا حذف. وتنقل الوسائطَ الثلاث (image · front_image · audio) '
  'بشكلٍ محروسٍ بمسطرة js/api.js. وتقرأ skipped فتُقابل الخطّةَ بالمكتوب — '
  'فلا تسقط بطاقةٌ صامتةً. والوسمُ يُضاف ولا يُستبدل.';

comment on function public.deck_cards(bigint) is
  'بطاقاتُ المجموعة للشاشة (157 · وُسّعت في 161 بـfront_image).';


-- ─── ③ سطرُ السجلّ ──────────────────────────────────────────────────
insert into public.sql_log (n, title, applied_at, applied_by, note)
values ('161', 'البوّابةُ تفتح عينَها على الوسائط — وثلاثةُ صموتٍ تُنطَق',
        now(), current_user,
        'معدَّلتان لا منشأتان، وتوقيعاهما لم يتغيّرا فلا drop ولا منحَ جديد. '
        'والمتنُ وُلِّد من 159 بأداة بعد إثبات مطابقته للحيّ بالبصمة.')
on conflict (n) do update set applied_at = now();


-- ─── ④ الفحص — سطرٌ لكلّ حالةٍ بما يخصّها (القاعدة ④) ────────────────

select '① التوقيعان لم يتغيّرا، ولا دالّةَ ثانية' as فحص,
       (select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace
         where n.nspname='public' and p.proname='import_cards')::text as "تواقيع import_cards",
       (select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace
         where n.nspname='public' and p.proname='deck_cards')::text as "تواقيع deck_cards";

select '② والمنحُ باقٍ كما كان' as فحص, p.proname,
       has_function_privilege('authenticated', p.oid, 'execute')::text as "authenticated؟",
       has_function_privilege('service_role',  p.oid, 'execute')::text as "service_role؟"
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in ('import_cards','deck_cards') order by 1;

select '③ البوّابةُ صارت تقرأ الوسائطَ الثلاث' as فحص,
       (select count(*) from regexp_matches(d, 'front_image', 'g'))::text as "front_image",
       (select count(*) from regexp_matches(d, $r$'image'$r$, 'g'))::text as "image",
       (select count(*) from regexp_matches(d, $r$'audio'$r$, 'g'))::text as "audio",
       (select count(*) from regexp_matches(d, 'skipped', 'g'))::text     as "skipped"
from (select pg_get_functiondef('public.import_cards(bigint,jsonb,boolean)'::regprocedure) as d) t;

select '④ وdeck_cards تردّ صورةَ الوجه' as فحص,
       (position('front_image' in pg_get_functiondef('public.deck_cards(bigint)'::regprocedure)) > 0)::text as "تردُّها؟";

select '⑤ ولا دالّةَ أخرى مُسّت' as فحص,
       string_agg(p.proname || '=' || length(pg_get_functiondef(p.oid))::text, ' · '
                  order by p.proname) as أطوال
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('save_card','save_cards','save_deck','card_key',
                    'link_cards_lesson','link_cards_strand','can_upload_media','due_cards');

select '⑥ سطرُ السجلّ' as فحص, l.n, l.title, l.applied_at from sql_log l where l.n = '161';

commit;

-- ══════════════════════════════════════════════════════════════════════
--  ⑤ تجربةٌ جافّةٌ بهويّة مدير — تُشغَّل بعد الاعتماد، وتنقض نفسها
--
--  do $probe$
--  declare v_uid text; a jsonb; b jsonb; c jsonb;
--  begin
--    select p.id::text into v_uid from profiles p where p.role = 'admin' limit 1;
--    perform set_config('request.jwt.claims',
--            json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
--
--    a := import_cards(12, '{}'::jsonb, true);                    -- غيابُ cards
--    b := import_cards(12, '{"cards":[{"front":"قياسُ ١٦١","back":"معنًى",
--           "image":"بلا-مخزن.png"}]}'::jsonb, true);              -- مفتاحٌ بلا مخزن
--    c := import_cards(12, '{"cards":[{"front":"قياسُ ١٦١","back":"معنًى",
--           "examples":["أ","ب","ج"],"lessons":["U1.HYDRO"],
--           "image":"img/x-aa11bb.webp","front_image":"img/y-cc22dd.png",
--           "audio":"audio/z-ee33ff.mp3"}]}'::jsonb, true);        -- دفعةٌ سليمة
--
--    raise exception E'\n① غيابُ cards ⇒ ok=% · %\n② مفتاحٌ بلا مخزن ⇒ ok=% · %\n③ دفعةٌ سليمة ⇒ ok=% · الخطّة %',
--          a->>'ok', a->'أخطاء', b->>'ok', b->'أخطاء', c->>'ok', c->'الخطّة';
--  end $probe$;
--
--  والمتوقَّع: ① ok=false ويُسمّى «المفتاح غائب» — **وكان يمرّ بـtrue** ·
--  ② ok=false و«image ليس مفتاحَ مخزنٍ ولا رابطاً» · ③ ok=true وخطّةٌ
--  بسطرٍ واحد. ولا يبقى من التجربة أثر.
-- ══════════════════════════════════════════════════════════════════════
