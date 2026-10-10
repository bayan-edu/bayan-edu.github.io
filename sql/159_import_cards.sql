-- ══════════════════════════════════════════════════════════════════════
--  بيان — 159_import_cards.sql  ·  بوّابةُ استيراد البطاقات
-- ══════════════════════════════════════════════════════════════════════
--
--  🔑 ما يُغلقه: للمنصّة ثلاثُ بوّاباتِ استيراد — `import_lesson_map` ①
--  و`import_objectives` ② و`import_quiz` ③ — **ولا بوّابةَ للبطاقات.**
--  فمهمّةُ معلّمٍ تؤلّف بطاقاتٍ في السحاب تكتبها في Drive، ثمّ تقف:
--  لا يدخلها إلا لصقٌ بيد. **وباللصق تسقط الجدولة كلُّها.**
--
--  ┌─────────── ثوابتُ هذا الملفّ ───────────┐
--  │                                                                  │
--  │  ①  🔴 **لا يُكتب صفٌّ واحدٌ بـ`insert`.** الكتابةُ كلُّها بـ       │
--  │     `save_deck` و`save_cards` و`link_cards_lesson` و             │
--  │     `link_cards_strand` — فحراسةُ المحرّر نفسُها، وعقدُ الكتابة   │
--  │     في موضعٍ واحد (ثابت ⑥ · ⑨). وهي سابقةُ `import_quiz` حرفاً.  │
--  │                                                                  │
--  │  ②  🔴 **الوسمُ يُضاف ولا يُستبدل.** `set_card_lessons` تمحو ما   │
--  │     لم يُذكر — وبطاقةٌ وسمها المعلّمُ بيده بدرسٍ ثانٍ (زرّ b131)   │
--  │     **تفقد وسمَه صامتاً** عند أوّل إعادة استيراد. ⇒ تُستعمل      │
--  │     `link_cards_*` بـ`p_on = true`: تُضيف ولا تُزيل.             │
--  │     **والإزالةُ فعلٌ بشريٌّ من الشاشة، لا أثرٌ جانبيٌّ لاستيراد.**  │
--  │                                                                  │
--  │  ③  📌 **ولا بصمةَ دفعةٍ هنا** — خلافاً لـ`import_quiz`. التفرّدُ  │
--  │     `cards_deck_key` على (المجموعة · مفتاح الوجه) يجعل إعادةَ    │
--  │     الاستيراد **تصحيحاً بذاتها**: ما تكرّر وجهُه حُدِّث معناه.     │
--  │     والاختبارُ لا يملك ذلك، فاحتاج بصمة. **ولا يُستنسخ تعقيدٌ    │
--  │     لعلّةٍ غيرِ قائمة.**                                          │
--  │                                                                  │
--  │  ④  🧪 **الجافّةُ تجري المسارَ كلَّه بحرّاسه الأحياء ثمّ تُنقضه.**   │
--  │     لا «تحقّقٌ موازٍ» يُحاكي الحرّاس — فنسختان من الحكم تفترقان.  │
--  │                                                                  │
--  │  ⑤  🔑 **والقفلُ على المادّة والصفّ لا على المقرَّر:** المجموعةُ   │
--  │     بعد `157` واحدةٌ لكلّ (مادة · صفّ)، فدفعتان على مقرَّرين من   │
--  │     مادّةٍ واحدة تكتبان في مجموعةٍ واحدة.                        │
--  │                                                                  │
--  │  ⑥  ⚖️ **ما يُقاس يُحرَس هنا، وما يُحكَم يُترك للشاشة.** عددُ     │
--  │     البنود ووجودُ الدرس وحرفُ Tab المتسلّل: أرقامٌ تُقاس ⇒ حرّاس.  │
--  │     أمّا «أتستحقّ هذه بطاقة؟» فحكمٌ تربويٌّ لا يُقاس بـSQL.        │
--  │                                                                  │
--  └──────────────────────────────────────────────────────────────────┘
--
--  ⚠️ وكُنيةُ الجداول في هذا الملفّ `cd` لا `r`: و`r` متغيّرٌ مُعلَن،
--     وplpgsql يستبدل المتغيّرَ في نصّ SQL — فكُنيةٌ باسمه تُنتج
--     «column reference is ambiguous». قِيس في المراجعة قبل التشغيل.
-- ══════════════════════════════════════════════════════════════════════

begin;

-- ─── ① البوّابة ───────────────────────────────────────────────────────

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
  v_added int := 0; v_updated int := 0;
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

  if jsonb_typeof(p_payload->'cards') <> 'array'
     or jsonb_array_length(p_payload->'cards') = 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true,
      'أخطاء', to_jsonb(array['الدفعة بلا بطاقات — تُرسل في المفتاح cards قائمةً']));
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
                         'note',  cd->>'note',  'lang', cd->>'lang')
                       order by (cd->>'rn')::int)
                  from jsonb_array_elements(v_rows) cd));
    v_added   := coalesce((v_res->>'added')::int, 0);
    v_updated := coalesce((v_res->>'updated')::int, 0);

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
  'بوّابةُ استيراد البطاقات (159): جافّةٌ أوّلاً، والدفعةُ تُردّ جملةً، ولا حذف. '
  'تكتب بـsave_deck وsave_cards وlink_cards_lesson وlink_cards_strand حصراً. '
  'والوسمُ يُضاف ولا يُستبدل — فلا يُمحى وسمٌ وضعه معلّمٌ بيده. '
  'ولا بصمةَ دفعةٍ: cards_deck_key يجعل إعادةَ الاستيراد تصحيحاً بذاتها.';

grant execute on function public.import_cards(bigint, jsonb, boolean) to authenticated;


-- ─── ② سطرُ السجلّ ───────────────────────────────────────────────────
insert into public.sql_log (n, title, applied_at, applied_by, note)
values ('159', 'بوّابةُ استيراد البطاقات — الحلقةُ الرابعة تكتمل',
        now(), current_user,
        'دالّةٌ مولودةٌ واحدة، ولا دالّةَ قائمةٌ مُسّت. والوسمُ يُضاف ولا يُستبدل.')
on conflict (n) do nothing;


-- ─── ③ الفحص — يُقرأ بعد التشغيل ─────────────────────────────────────

select '① الدالّة مولودةٌ ومحصَّنةٌ وممنوحة' as فحص,
       (p.prosecdef and p.proconfig::text like '%search_path=public%')::text as "محصَّنة؟",
       has_function_privilege('authenticated', p.oid, 'execute')::text as "authenticated؟"
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'import_cards';

select '② ولا دالّةَ قائمةٌ مُسّت' as فحص,
       string_agg(p.proname || '=' || length(pg_get_functiondef(p.oid))::text, ' · '
                  order by p.proname) as أطوال
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('save_cards','save_deck','link_cards_lesson','link_cards_strand',
                    'import_quiz','import_objectives','import_lesson_map');

select '③ سطرُ السجلّ' as فحص, l.n, l.title, l.applied_at from sql_log l where l.n = '159';

commit;

-- ══════════════════════════════════════════════════════════════════════
--  ④ تجربةٌ جافّةٌ بهويّة منسّق — تُشغَّل بعد الاعتماد، ولا تُبقي أثراً
--
--  do $probe$
--  declare v_uid text; r jsonb;
--  begin
--    select coalesce((select cu.user_id::text from curators cu
--                      where cu.subject_id is null or cu.subject_id = 1 limit 1),
--                    (select p.id::text from profiles p where p.role = 'admin' limit 1))
--      into v_uid;
--    perform set_config('request.jwt.claims',
--            json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
--    r := import_cards(12, '{"cards":[
--      {"front":"النتح","back":"تخلّصُ النبات من الماء الزائد بخاراً عبر الأوراق",
--       "examples":["ويفترق عن التبخّر: التبخّرُ من سطحٍ غير حيّ، والنتحُ من نباتٍ يتحكّم فيه",
--                   "كيسٌ شفّافٌ على غصنٍ تتجمّع فيه قطراتُ ماء — ذاك نتحُه",
--                   "وهو الحلقةُ الحيّةُ في دورة الماء"],
--       "lang":"ar","lessons":["U1.HYDRO"],"strands":["علوم الأرض والبيئة"]},
--      {"front":"الثغور","back":"فتحاتٌ مجهريّةٌ في سطح الورقة يخرج منها بخارُ الماء",
--       "examples":["يفترق خروجُ الماء منها عن التبخّر بأنّ النبات يتحكّم في فتحها"],
--       "lang":"ar","lessons":["U1.HYDRO"],"strands":["علوم الأرض والبيئة"]}]}'::jsonb,
--      true);
--    raise exception E'\n%', jsonb_pretty(r);
--  end $probe$;
--
--  والمتوقَّع: ok=true · تجريبيّة=true · سيُنشأ=٢ · وصلاتُ دروس=٢ ·
--  وتحذيرٌ واحدٌ على «الثغور» (بندٌ واحدٌ لا ثلاثة) — فالحارسُ يُقاس
--  بما يُنذر به، لا بصمته.
-- ══════════════════════════════════════════════════════════════════════
