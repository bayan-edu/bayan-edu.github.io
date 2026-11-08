-- ══════════════════════════════════════════════════════════════════════
--  ٢٠٢ · سؤالُ الفكرة العامة للمقطع الصوتيّ — يوجّه الاستماعَ الأوّل ولا يُسجَّل
-- ══════════════════════════════════════════════════════════════════════
--
--  حكمُ المالك (٨ نوفمبر) بعد نقاش أنشطة المقطع: «listening for gist task أولاً بسؤال يظهر قبل الاستماع مع توجيه حسب لغة
--  المقطع … سؤال واحد عن الفكرة العامة من أربع خيارات … وتظهر التغذية الراجعة بعد انتهاء المقطع، ولا داعي لتسجيل نتائجه —
--  هو فقط لتوجيه الطالب للاستماع». ثمّ: «الاختيار أثناء الاستماع لا مشكلة، والتغذية الراجعة بعد الضغط على تسليم، ولا يُفعَّل
--  التسليم إلا بعد انتهاء المقطع».
--
--  وأحكام:
--  ① **على المصدر لا على الملفّ** (`items.gist`) — بخلاف السطور (`197` ①: تتبع ملفَّها). السطورُ وصفُ الملفّ، والسؤالُ
--     غرضُ المعلّم من المقطع في درسه: معلّمان يستعملان الملفَّ نفسَه بغرضين.
--  ② **والشكلُ قيدٌ في الجدول** (`gist_problem`) لا في دالّة الحفظ وحدها: الجدولُ يقبل الكتابةَ المباشرة بحكم RLS،
--     فشكلٌ تحرسه الدالّةُ وحدها يُتجاوز. سؤالٌ · أربعةُ خيارات مختلفة · مفتاحٌ من ٠ إلى ٣ · وسطرُ «لماذا» لكلّ خيار (قد يُترك فارغاً).
--  ③ **ويكتبه مؤلّفُ المقطع** (`save_item_gist`) بحارس السطور نفسِه (`audio_lines_problem` · 197): مؤلّفُ المادّة، ومقطعٌ صوتيّ،
--     وصاحبُ المصدر أو فريقُ الإشراف للمعتمد. والسؤالُ الفارغ يمحوه.
--  ④ **ويُقرأ بدالّة** (`item_gist`) بشرط رؤية المقطع بحرفه (`p_items_read` كما في `item_lines` · 198 ②).
--     🔑 **والمفتاحُ يصل متصفّحَ الطالب — عن علم:** لا درجةَ ولا تسجيل، فلا شيءَ يُحرس. ولو صار السؤالُ يوماً يُحتسب فمكانُه
--     محرّكُ الاختبار (المفتاحُ هناك لا يغادر القاعدة قبل التسليم)، لا هذا العمود.
--  ⑤ **و`item_lines` لا تُمسّ:** دالّةٌ تعمل، والسؤالُ يُطلب بجوارها — ومقطعٌ بلا سطورٍ له سؤالُه.
--
--  📐 منشأٌ كلُّه: عمودٌ وقيدٌ وثلاثُ دوالّ. ولا جدولَ ولا سياسة.
--  🗣️ والرسائلُ محايدة، ورسائلُ الحارس رسائلُ `197` بحرفها.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الشكل — دالّةٌ ثابتة يقرؤها القيدُ والحفظ ═══════════════════

/* ⇒ null إن سلم الشكل، وإلا نصُّ أوّل ما ينقصه — يقوله المحرّرُ للمعلّم كما هو */
create or replace function public.gist_problem(p jsonb)
returns text language plpgsql immutable set search_path to 'public'
as $fn$
declare c jsonb; w jsonb; k int; t text; seen text[] := '{}';
begin
  if p is null then return null; end if;
  if jsonb_typeof(p) <> 'object' then return 'صيغة السؤال غير معروفة'; end if;

  t := btrim(coalesce(p->>'q', ''));
  if t = '' then return 'السؤال فارغ'; end if;
  if char_length(t) > 300 then return 'السؤال أطول من ٣٠٠ حرف'; end if;

  c := p->'choices';
  if jsonb_typeof(c) is distinct from 'array' or jsonb_array_length(c) <> 4 then
    return 'يلزم أربعة خيارات';
  end if;
  for k in 0..3 loop
    if jsonb_typeof(c->k) is distinct from 'string' then return 'الخيار ' || (k + 1) || ' ليس نصاً'; end if;
    t := btrim(c->>k);
    if t = '' then return 'الخيار ' || (k + 1) || ' فارغ'; end if;
    if char_length(t) > 200 then return 'الخيار ' || (k + 1) || ' أطول من ٢٠٠ حرف'; end if;
    if lower(t) = any(seen) then return 'الخيار ' || (k + 1) || ' مكرر'; end if;
    seen := seen || lower(t);
  end loop;

  if jsonb_typeof(p->'key') is distinct from 'number' or (p->>'key') !~ '^[0-3]$' then
    return 'لم تُحدَّد الإجابة الصحيحة';
  end if;

  w := p->'why';
  if w is not null then
    if jsonb_typeof(w) <> 'array' or jsonb_array_length(w) <> 4 then return 'صيغة «لماذا» غير معروفة'; end if;
    for k in 0..3 loop
      if jsonb_typeof(w->k) is distinct from 'string' then return 'صيغة «لماذا» غير معروفة'; end if;
      if char_length(w->>k) > 300 then return '«لماذا» للخيار ' || (k + 1) || ' أطول من ٣٠٠ حرف'; end if;
    end loop;
  end if;
  return null;
end $fn$;

comment on function public.gist_problem(jsonb) is
  'شكلُ سؤال الفكرة العامة (202 ②): { q, choices[4], key 0–3, why[4]? } ⇒ null أو أوّلُ ما ينقصه. يقرؤه قيدُ items.gist ودالّةُ الحفظ.';


-- ═══════════════════ ② العمود والقيد ═══════════════════

alter table public.items add column if not exists gist jsonb;
alter table public.items drop constraint if exists items_gist_shape;
alter table public.items add constraint items_gist_shape check (gist_problem(gist) is null);

comment on column public.items.gist is
  'سؤالُ الفكرة العامة للمقطع الصوتيّ (202): يوجّه الاستماعَ الأوّل، ولا يُسجَّل جوابُه. يكتبه save_item_gist ويقرؤه item_gist.';


-- ═══════════════════ ③ الكتابة — منشأة ═══════════════════

/* السؤالُ للمقطع، أو null/سؤالٌ فارغ يمحوه ⇒ { ok, gist } أو { ok: false, error }.
   النصوصُ تُقصّ أطرافُها قبل الحكم، و«لماذا» الغائبةُ أربعةُ نصوصٍ فارغة */
create or replace function public.save_item_gist(p_item bigint, p_gist jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v jsonb;
begin
  v_problem := audio_lines_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  if p_gist is null or jsonb_typeof(p_gist) <> 'object' or btrim(coalesce(p_gist->>'q', '')) = '' then
    update items set gist = null where id = p_item;
    return jsonb_build_object('ok', true, 'gist', null);
  end if;

  v := jsonb_build_object(
    'q', btrim(p_gist->>'q'),
    'choices', case when jsonb_typeof(p_gist->'choices') = 'array'
                    then (select coalesce(jsonb_agg(to_jsonb(btrim(e)) order by o), '[]'::jsonb)
                            from jsonb_array_elements_text(p_gist->'choices') with ordinality x(e, o))
                    else p_gist->'choices' end,
    'key', p_gist->'key',
    'why', case when jsonb_typeof(p_gist->'why') = 'array'
                then (select coalesce(jsonb_agg(to_jsonb(btrim(e)) order by o), '[]'::jsonb)
                        from jsonb_array_elements_text(p_gist->'why') with ordinality x(e, o))
                else '["", "", "", ""]'::jsonb end);

  v_problem := gist_problem(v);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  update items set gist = v where id = p_item;
  return jsonb_build_object('ok', true, 'gist', v);
end $fn$;

comment on function public.save_item_gist(bigint, jsonb) is
  'يكتب سؤالَ الفكرة العامة للمقطع الصوتيّ (202 ③) بحارس audio_lines_problem، والفارغُ يمحوه.';


-- ═══════════════════ ④ القراءة — منشأة ═══════════════════

/* ⇒ { ok, gist, lang } — و`gist: null` لمقطعٍ بلا سؤال. أو { ok: false, error } */
create or replace function public.item_gist(p_item bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_seen boolean; v_gist jsonb; v_lang text;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول'); end if;

  select (is_teacher() or can_access_lesson(i.lesson_id)) and can_see_item(i.created_by, i.visibility, i.reviewed_at, i.id),
         case when i.kind = 'audio' then i.gist end, i.lang
    into v_seen, v_gist, v_lang
    from items i where i.id = p_item;
  if v_seen is not true then return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود'); end if;

  return jsonb_build_object('ok', true, 'gist', v_gist, 'lang', coalesce(v_lang, 'ar'));
end $fn$;

comment on function public.item_gist(bigint) is
  'سؤالُ الفكرة العامة للمقطع (202 ④) بشرط رؤية المقطع (p_items_read بحرفه، كـitem_lines) — والمفتاحُ معه عن علم: لا يُسجَّل جواب.';


-- ═══════════════════ ⑤ المنح ═══════════════════

revoke all on function public.save_item_gist(bigint, jsonb), public.item_gist(bigint) from public, anon;
grant execute on function public.save_item_gist(bigint, jsonb), public.item_gist(bigint) to authenticated, service_role;


-- ═══════════════════ ⑥ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public'
                    and table_name = 'items' and column_name = 'gist' and data_type = 'jsonb') then
    raise exception '202: عمودُ gist غائب';
  end if;
  if not exists (select 1 from pg_constraint where conname = 'items_gist_shape') then
    raise exception '202: قيدُ الشكل غائب';
  end if;
  if public.gist_problem('{"q":"x","choices":["a","b","c","d"],"key":1}'::jsonb) is not null
     or public.gist_problem('{"q":"x","choices":["a","b","c","A"],"key":1}'::jsonb) is null
     or public.gist_problem('{"q":"x","choices":["a","b","c","d"],"key":4}'::jsonb) is null then
    raise exception '202: حكمُ الشكل على غير ما قُصد';
  end if;
  if not has_function_privilege('authenticated', 'public.save_item_gist(bigint, jsonb)', 'execute')
     or not has_function_privilege('authenticated', 'public.item_gist(bigint)', 'execute')
     or has_function_privilege('anon', 'public.item_gist(bigint)', 'execute') then
    raise exception '202: منحُ الدالّتين على غير ما قُصد';
  end if;
end $chk$;

insert into public.sql_log (n, title, applied_at)
values ('202', 'سؤالُ الفكرة العامة للمقطع الصوتيّ — يوجّه الاستماعَ الأوّل ولا يُسجَّل', now())
on conflict (n) do update set applied_at = now();
