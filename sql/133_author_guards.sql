/* ══════════════════════════════════════════════════════════════════════
   ١٣٣ · حرّاسُ المصدر يتّفقون — والتدريبُ غيرُ المنشور يُرى

   🔴 **لماذا:** على المصدر المعتمد الواحد كان ثلاثةُ حرّاسٍ لا يتّفقون،
      فصار المشرفُ غيرُ المدير يملك ما هو أخطر ولا يملك ما هو أهون:

        الفعل            الدالّة          الشرط قبل هذا الملفّ
        ─────────────    ─────────────    ────────────────────
        حذف المصدر       delete_item      can_curate
        تحرير أسئلته     can_edit_quiz    can_curate
        تعديل المصدر     save_item        is_admin     ← الشاذّ

      ⇒ يَحذف المصدرَ المعتمد ولا يُصحّح عنواناً فيه. وهذا انقلابٌ في
      سُلّم الخطر: الحذفُ يُفني والتعديلُ يُصلح، فلا يكون الأشدُّ أيسر.
      ⇒ `save_item` تُردّ إلى `can_curate` كأخواتها. **وهو توسيعٌ لا
      تضييق:** `can_curate = is_admin() or curator` — فلا يفقد مديرٌ شيئاً،
      وإنّما يكسب المشرفُ ما كان له في الحذف أصلاً.

   🔴 **والثاني — عطلٌ صامت:** التدريبُ الذي يضيفه المعلّم مصدراً إضافياً
      يُخلَق `published = false`، و`can_access` تردّ الطالبَ عن كلّ
      اختبارٍ غير منشور. فالمعلّم يضيف ويطمئنّ، والطالب لا يرى — **ولا
      شيءَ على الشاشة يقول ذلك.** ⇒ `lesson_items` تُرجع `quiz_published`،
      وتعرضه الواجهةُ شارةً. والفجوة تُرى والصمت لا يُرى.

   ⚠️ **وما لم يُمسّ:** الازدواجُ في `save_quiz` (نسختان: بـ`p_kind` وبلا)
      بقي كما هو — حذفُ نسخةٍ قرارٌ يُؤذَن له في جلسته، والعميل يرسل
      `p_kind` دائماً فتُحسَم النسخةُ باسم الوسيط.
   ══════════════════════════════════════════════════════════════════════ */


/* ═══════════ معدَّلة لا منشأة — أصلها في المخطّط ═══════════ */

/* `save_item` — غُيّر فيها حارسان اثنان لا غير:
     ① بوّابة «منسوب إلى بيان»   : is_admin()  ⇐ can_curate(v_subject)
     ② شرط التحديث على المعتمد  : is_admin()  ⇐ can_curate(v_subject)
   وما عداهما منقولٌ من الحيّ بحرفه. */
CREATE OR REPLACE FUNCTION public.save_item(
  p_id bigint DEFAULT NULL::bigint,
  p_lesson bigint DEFAULT NULL::bigint,
  p_kind text DEFAULT NULL::text,
  p_title text DEFAULT NULL::text,
  p_description text DEFAULT NULL::text,
  p_url text DEFAULT NULL::text,
  p_body text DEFAULT NULL::text,
  p_quiz bigint DEFAULT NULL::bigint,
  p_position integer DEFAULT 0,
  p_duration integer DEFAULT NULL::integer,
  p_lang text DEFAULT 'ar'::text,
  p_official boolean DEFAULT false,
  p_is_graded boolean DEFAULT false,
  p_required boolean DEFAULT false,
  p_visibility text DEFAULT 'private'::text,
  p_strand bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_lesson bigint; v_subject bigint; v_id bigint;
        v_by uuid; v_vis text; v_needs text; v_label text;
        v_strand bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_lesson := coalesce(p_lesson, (select lesson_id from items where id = p_id));
  select subject_id into v_subject from lessons where id = v_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;

  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  -- 🔑 منسوب إلى بيان أم إلى شخص؟   ① can_curate لا is_admin
  if p_official and not can_curate(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'المحتوى المعتمد ضمن المنهج يضيفه فريق الإشراف · أضِفه مصدراً إضافياً باسمك');
  end if;
  v_by  := case when p_official then null else auth.uid() end;
  v_vis := case when p_official then 'class' else coalesce(p_visibility, 'private') end;

  if not p_official and (p_is_graded or p_required) then
    return jsonb_build_object('ok', false,
      'error', 'المصدر الإضافي لا يكون شرط انتقال ولا يدخل حساب البوّابة');
  end if;

  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان العنصر مطلوب');
  end if;

  -- ▼ النمط ومتطلّبه — من الجدول المرجعي
  select k.needs, k.label_ar into v_needs, v_label
    from item_kinds k where k.code = p_kind and k.active;
  if v_needs is null then
    return jsonb_build_object('ok', false,
      'error', 'نمط غير معروف: ' || coalesce(p_kind, '—'));
  end if;

  if v_needs = 'quiz' and p_quiz is null then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج اختباراً مرتبطاً');
  elsif v_needs = 'url' and coalesce(trim(p_url), '') = '' then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج رابطاً');
  elsif v_needs = 'body' and coalesce(trim(p_body), '') = '' then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج نصاً');
  end if;

  -- الفرع — كحارس الدرس بحرفه. والوسم هنا للإنجليزية: المكوّن ينقسم
  --    والدرس لا. ومَن ترك الحقل فارغاً ورث فرع درسه عند القراءة.
  v_strand := coalesce(p_strand, (select strand_id from items where id = p_id));
  if v_strand is not null then
    if not exists (select 1 from strands s
                    where s.id = v_strand and s.subject_id = v_subject) then
      return jsonb_build_object('ok', false, 'error', 'الفرع لا يتبع مادة هذا الدرس');
    end if;
    if exists (select 1 from strands c where c.parent_id = v_strand) then
      return jsonb_build_object('ok', false,
        'error', 'يُختار فرعٌ نهائيّ: «جبر» لا «بحتة»');
    end if;
  end if;

  if p_id is null then
    insert into items (lesson_id, kind, title, description, url, body, quiz_id, position,
                       is_graded, required, duration_min, lang, created_by, visibility,
                       strand_id)
    values (v_lesson, p_kind, trim(p_title), p_description, p_url, p_body, p_quiz,
            coalesce(p_position,0), coalesce(p_is_graded,false), coalesce(p_required,false),
            p_duration, coalesce(p_lang,'ar'), v_by, v_vis,
            v_strand)
    returning id into v_id;
  else
    update items set
      kind = p_kind, title = trim(p_title), description = p_description,
      url = p_url, body = p_body, quiz_id = p_quiz,
      position = coalesce(p_position, position),
      is_graded = coalesce(p_is_graded, is_graded), required = coalesce(p_required, required),
      duration_min = p_duration, lang = coalesce(p_lang, lang), visibility = v_vis,
      strand_id = v_strand
     where id = p_id
       -- ② can_curate لا is_admin — وترتيب and/or محفوظ: (معتمد ومشرف) أو (صاحبه)
       and (created_by is null and can_curate(v_subject) or created_by = auth.uid())
    returning id into v_id;
    if v_id is null then
      return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود أو ليس من تأليفك');
    end if;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id);
end $function$;


/* `lesson_items` — أُضيف حقلٌ واحد: `quiz_published`.
   وهو `null` لكلّ مصدرٍ لا اختبارَ له، فتفرّق الواجهةُ بين «غير منشور»
   و«لا يُنشر أصلاً». وما عداه منقولٌ من الحيّ بحرفه. */
CREATE OR REPLACE FUNCTION public.lesson_items(p_lesson bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_lstrand bigint; v jsonb;
begin
  select c.subject_id, l.strand_id into v_subject, v_lstrand
    from lessons l join courses c on c.id = l.course_id where l.id = p_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;
  if not (can_author(v_subject) or can_curate(v_subject)) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك التأليف في هذه المادة');
  end if;

  select jsonb_build_object(
    'ok', true,
    'curate', can_curate(v_subject),
    'subject_id', v_subject,
    'lesson_strand', strand_json(v_lstrand),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id, 'kind', i.kind,
        'label', k.label_ar, 'icon', k.icon, 'needs', k.needs,
        'title', i.title, 'description', i.description,
        'url', i.url, 'body', i.body, 'quiz_id', i.quiz_id,
        'position', i.position, 'is_graded', i.is_graded, 'required', i.required,
        'duration', i.duration_min, 'lang', i.lang,
        'strand', strand_json(i.strand_id),
        'official', i.created_by is null,
        'mine', i.created_by = auth.uid(),
        'author', (select p.full_name from profiles p where p.id = i.created_by),
        'visibility', i.visibility,
        'reviewed', i.reviewed_at is not null,
        -- 🆕 ١٣٣ · حالةُ الاختبار المرتبط — null لمن لا اختبار له
        'quiz_published', (select q.published from quizzes q where q.id = i.quiz_id),
        -- عنصرٌ لمسه طالب لا يُحذف: تقدّمه ومحاولاته تشير إليه
        'touched', (select count(*) from item_progress ip where ip.item_id = i.id)
                   + (select count(*) from attempts a where a.item_id = i.id)
      ) order by i.created_by nulls first, i.position)
      from items i
      left join item_kinds k on k.code = i.kind
      where i.lesson_id = p_lesson), '[]'::jsonb)
  ) into v;
  return v;
end $function$;


/* ⚠️ والمنحُ يُعاد صراحةً — ما لا يحمل منحاً يسقط بلا شكوى */
grant execute on function public.save_item(bigint,bigint,text,text,text,text,text,
       bigint,integer,integer,text,boolean,boolean,boolean,text,bigint) to authenticated;
grant execute on function public.lesson_items(bigint) to authenticated;


insert into public.sql_log (n, title, applied_at)
values ('133', 'حرّاسُ المصدر يتّفقون — والتدريبُ غيرُ المنشور يُرى', now())
on conflict (n) do update set applied_at = now();
