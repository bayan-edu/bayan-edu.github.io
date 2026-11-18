-- ══════════════════════════════════════════════════════════
-- 218 · عنوانُ الرفّ في المكتبة — حقلٌ يحدّده المؤلّف على الفرع
--       (b250 · رفوفُ المكتبة · ١٨ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (١٨ نوفمبر · على لقطة الرفوف الثانية):** «احذف عناوين الأرفف إلا إذا تم تحديدها في المحرّر».
--      ونفّذ `b250` نصفَه: اللافتةُ لا تُكتب إلا بعنوان — ولم يكن للعنوان موضع. ثمّ قال المالك «Add the field».
--   ② **ولماذا عمودٌ جديد لا اسمُ الفرع نفسُه:** `strands.name` اسمُ تصنيفٍ يقرؤه المحرّرُ والتحليلات وتقريرُ «أين يسكن الضعف»
--      («قصص ومغامرات» · «نصوص سردية») — ولم يُكتب للطالب. والعنوانُ على الرفّ كلامٌ للطالب يختاره المؤلّف أو يتركه.
--      فاسمان لشيئين، لا اسمٌ يُحمَّل معنيين. **وفارغُه يعني «لا لافتة»** (`null`)، لا «اكتب الاسم».
--   ③ **ولماذا دالّةٌ مستقلّة (`set_strand_shelf_title`) لا وسيطٌ سابعٌ في `save_strand`:** الوسيطُ الجديد يغيّر توقيعها
--      فيولد نسخةٌ ثانيةٌ بجوار الأولى (`create or replace` لا يستبدل توقيعاً مختلفاً)، وإزالةُ الأولى `drop` على القاعدة الحيّة.
--      والعنوانُ حقلٌ لا يحرسه شيءٌ من حرّاس `save_strand` (الكود · تفرّدُ الاسم · الشجرة) — فبابُه وحده أوضح.
--      والصلاحيةُ صلاحيةُ أخواتها بعينها: `can_curate(المادّة)`.
--   ④ **والعنوانُ للورقة وحدها:** الحاويةُ («نصوص سردية») لا كتبَ عليها فلا رفَّ لها (`selectable` في `list_strands`).
--   ⑤ **و`author_tree` تُرجع `family` للمادّة:** المحرّرُ يُظهر خانةَ العنوان في المكتبة وحدها (`family = 'reading'` — حكمُ `216`)،
--      ولم يكن يعرف جنسَ المادّة. رقعةُ سطرٍ واحد.
--   ⑥ **وحدُّه ٤٠ حرفاً:** اللافتةُ سطرٌ واحدٌ على تاج الخزانة (‎max-width:80%)، وأطولُ منها يُقصّ.
--
-- **قُرئت الحيّةُ قبله (١٨ نوفمبر):** `save_strand` (`4de144a0`) · `list_strands` (`3a58205f`) · `author_tree` (`685afc66`) —
--   والنمطان مقيسان: كلٌّ مرّةً واحدة. ولا عمودَ `shelf_title` ولا دالّةَ بالاسم قبله.
-- 🧪 **الجافّة (١٨ نوفمبر · رُدّت كلُّها، وقِيس بعدها أنّ البصمتين كما كانتا):** المشرفُ على ورقة ⇐ `ok` والعنوانُ مقصوصُ الطرفين («Stories») ·
--   على حاوية ⇐ يُردّ · ٤١ حرفاً ⇐ يُردّ · فراغٌ ⇐ `null` · والطالبُ ⇐ «تحرير الفروع لفريق الإشراف» · و`list_strands(7)` تحمل `shelf_title`
--   في كلّ صفّ · و`author_tree` تقول `family = reading` للمادّة ٧. البصمتان بعدها: `list_strands` ⇐ `6c562e84` · `author_tree` ⇐ `62b2cda9`.
-- ══════════════════════════════════════════════════════════

begin;

-- ═══════════ منشأ: العمود ═══════════
alter table public.strands add column if not exists shelf_title text;
alter table public.strands drop constraint if exists strands_shelf_title_len;
alter table public.strands add constraint strands_shelf_title_len
  check (shelf_title is null or char_length(shelf_title) between 1 and 40);
comment on column public.strands.shelf_title is
  '218 · عنوانُ الرفّ للطالب في المكتبة — يحدّده المؤلّف، وفارغُه: لا لافتة. غيرُ اسم الفرع (name) الذي يقرؤه المحرّر والتحليلات.';

-- ═══════════ منشأة: set_strand_shelf_title ═══════════
create or replace function public.set_strand_shelf_title(p_id bigint, p_title text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_subject bigint; v_title text := nullif(btrim(p_title), '');
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select subject_id into v_subject from strands where id = p_id;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الفرع غير موجود');
  end if;

  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'تحرير الفروع لفريق الإشراف');
  end if;

  --  ④ الحاويةُ لا رفَّ لها — ومسحُ عنوانها مقبول، فلا يعلق عنوانٌ على فرعٍ صار حاوية
  if v_title is not null and exists (select 1 from strands c where c.parent_id = p_id) then
    return jsonb_build_object('ok', false, 'error', 'لهذا الفرع أبناء، والعنوان للرف الذي تُوضع عليه الكتب');
  end if;

  if char_length(v_title) > 40 then
    return jsonb_build_object('ok', false, 'error', 'عنوان الرف ٤٠ حرفاً على الأكثر');
  end if;

  update strands set shelf_title = v_title where id = p_id;
  return jsonb_build_object('ok', true, 'id', p_id, 'shelf_title', v_title);
end $$;

revoke execute on function public.set_strand_shelf_title(bigint, text) from public, anon;
grant  execute on function public.set_strand_shelf_title(bigint, text) to authenticated;

-- ═══════════ معدَّلة لا منشأة: list_strands — تُرجع `shelf_title` ═══════════
do $$
declare v text; n int; sig regprocedure := 'public.list_strands(bigint)'::regprocedure;
begin
  v := pg_get_functiondef(sig);
  if position('''shelf_title''' in v) > 0 then raise notice 'list_strands: صُحّحت من قبل'; return; end if;
  n := (select count(*) from regexp_matches(v, '''id'', s\.id, ''code'', s\.code, ''name'', s\.name,', 'g'));
  if n <> 1 then raise exception 'list_strands: وُجد النمط % مرّة لا ١', n; end if;
  execute regexp_replace(v, '''id'', s\.id, ''code'', s\.code, ''name'', s\.name,',
                            '''id'', s.id, ''code'', s.code, ''name'', s.name, ''shelf_title'', s.shelf_title,  -- 218');
end $$;

-- ═══════════ معدَّلة لا منشأة: author_tree — تُرجع `family` المادّة ═══════════
do $$
declare v text; n int; sig regprocedure := 'public.author_tree()'::regprocedure;
begin
  v := pg_get_functiondef(sig);
  if position('''family'', s.family' in v) > 0 then raise notice 'author_tree: صُحّحت من قبل'; return; end if;
  n := (select count(*) from regexp_matches(v, '''icon'', s\.icon\)', 'g'));
  if n <> 1 then raise exception 'author_tree: وُجد النمط % مرّة لا ١', n; end if;
  execute regexp_replace(v, '''icon'', s\.icon\)', '''icon'', s.icon, ''family'', s.family)  -- 218');
end $$;

insert into public.sql_log (n, title, applied_at)
values ('218', 'عنوانُ الرفّ في المكتبة — حقلٌ يحدّده المؤلّف على الفرع', now())
on conflict (n) do update set applied_at = now();

commit;
