-- ══════════════════════════════════════════════════════════════════════
--  ١٩٦ · أصواتُ المجموعة دفعةً — تُكتب في البطاقات التي لا صوت لها، ووجهُها هو الذي وُلّد له
-- ══════════════════════════════════════════════════════════════════════
--
--  سأل المالك بعد أن جرّب `b216` على ستّ بطاقات: «هل يمكنك توليد صوت جميع بطاقات مادة اللغة العربية»، وحكم في الاعتماد (٥ نوفمبر ٢٠٢٦):
--  **«اعتماد آليّ فوري»** — يُكتب صوتُ كلّ بطاقةٍ فيها ساعةَ توليده فيسمعه الطالب، ويراجعه المعلّمُ بعدُ من نموذجها. ⇒ لا مسوّدةَ ولا عمود.
--  والتوليدُ من المتصفّح بهويّة المؤلّف (زرّ «توليد الأصوات» في شاشة البطاقات · `deckVoices` في voice_rows.js): الدالّةُ `tts` تضع الملفَّ في R2
--  وتعيد مفتاحه، وهذه تكتبه — **و`save_card` لا تصلح لها:** تكتب الحقولَ كلَّها من نسخة المتصفّح، فتمحو ما عدّله غيرُه في أثناء التوليد.
--
--  🔒 وما يُكتب محدودٌ بثلاثة شروطٍ في الصفّ نفسه، لا في المتصفّح:
--     · بطاقةٌ في المجموعة **بلا صوت** — فلا يُطمس صوتٌ صُحّح باليد أو رُفع ملفّه (ستُّ بطاقاتٍ في `20` يوم كُتب الملفّ)
--     · **ووجهُها هو الوجهُ الذي وُلّد له** — فوجهٌ عُدّل في أثناء التوليد لا يأخذ صوتَ سابقه (وهو حكمُ القادح في `195` على مسارٍ آخر)
--     · **ومفتاحٌ مولَّدٌ في مجلّد هذه المجموعة** (`r2:voice/cards/<المجموعة>/<البصمة>.<الإصدار>.mp3` · `clipKeys` و`cardScope` في `core.js`)
--  والحارسُ حارسُ التوليد نفسُه (`card_voice_problem` · `195`): مؤلّفُ المادة، ومالكُ المجموعة أو مشرفُها.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════ منشأة ═══════════════

create or replace function public.set_card_voices(p_deck bigint, p_rows jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_problem text; v_n int; v_ids bigint[];
begin
  v_problem := card_voice_problem(p_deck);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows) > 50 then
    return jsonb_build_object('ok', false, 'error', 'الدفعة خمسون بطاقة على الأكثر');
  end if;

  with r as (
    select (e->>'card')::bigint as card, e->>'front' as front, e->>'audio' as audio
      from jsonb_array_elements(p_rows) e
  ), w as (
    update cards c set audio = r.audio
      from r
     where c.id = r.card and c.deck_id = p_deck and c.audio is null and c.front = r.front
       and r.audio ~ ('^r2:voice/cards/' || p_deck || '/[0-9a-f]{16}\.[a-z0-9]{1,16}\.mp3$')
    returning c.id
  )
  select count(*)::int, coalesce(array_agg(id), '{}') into v_n, v_ids from w;

  return jsonb_build_object('ok', true, 'written', v_n, 'ids', to_jsonb(v_ids));
end $function$;

revoke all on function public.set_card_voices(bigint, jsonb) from public, anon;
grant execute on function public.set_card_voices(bigint, jsonb) to authenticated;


insert into public.sql_log (n, title, applied_at)
values ('196', 'أصواتُ المجموعة دفعةً — تُكتب في البطاقات التي لا صوت لها، ووجهُها هو الذي وُلّد له', now())
on conflict (n) do update set applied_at = now();
