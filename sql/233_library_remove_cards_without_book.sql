-- ══════════════════════════════════════════════════════════
-- 233 · حذفُ بطاقات مكتبة بيان التي لا كتابَ لها (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **طلبُ المالك (٢٦ نوفمبر):** «احذف البطاقات الفارغة» — بعد أن حُذف ٤٧ كتاباً في مراجعة C3 (`228`–`232`)
--      فبقيت بطاقاتُها بلا كتاب.
--   ② **والمقيسُ أكبرُ من المذكور:** ذُكر للمالك ٦١ بطاقة (ما يتّمته ملفّاتُ الحذف الخمسة: ١٣+٧+١٧+٢٤+٣ = ٦٤)،
--      والقاعدةُ فيها **١١٠٧ بطاقاتٍ** في مجموعات المادّة ٧ بلا رابطٍ في `card_lessons` — من ٣٥٧٤.
--      والباقي يتيمٌ من قبل هذه المراجعة. **ولا يُميَّز هذا من ذاك:** الرابطُ حُذف مع الكتاب بالتسلسل.
--      والبطاقةُ بلا رابطٍ لا تظهر في كتاب (`165`: بطاقاتُ الدرس من `card_lessons`).
--   ③ **ما يُحذف:** كلُّ بطاقةٍ في مجموعةٍ من المادّة ٧ · بلا رابطٍ بدرس · **ولم يراجعها طالب** · ولا يشير إليها سؤال.
--      ومعها بالتسلسل: روابطُها بالخيوط (`card_strands`) — وقيس: صفر.
--   ④ **وما لا يُحذف:** **ثلاثُ بطاقاتٍ راجعها طالب** (`card_reviews`) — تبقى، فحذفُها يمحو سجلَّ مراجعته ·
--      المجموعاتُ نفسُها (`decks`) ولو فرغت · ملفّاتُ الصوت والصورة في R2.
--   ⑤ **حارس:** إن زاد العددُ على المقيس (١١٠٤) فشيءٌ تغيّر ⇐ لا يُحذف شيء.
--   ⑥ **قابلٌ لإعادة التشغيل:** ما حُذف لا يوجد، فالإعادةُ تُخبر وتمضي.
-- ══════════════════════════════════════════════════════════

do $$
declare
  v_ids bigint[];
  v_n   int;
begin
  select array_agg(c.id) into v_ids
    from cards c join decks d on d.id = c.deck_id
   where d.subject_id = 7
     and not exists (select 1 from card_lessons cl where cl.card_id = c.id)
     and not exists (select 1 from card_reviews r where r.card_id = c.id)
     and not exists (select 1 from card_review_log g where g.card_id = c.id)
     and not exists (select 1 from questions q where q.card_id = c.id);

  if v_ids is null then
    raise notice 'لا بطاقةَ بلا كتاب — حُذفت من قبل'; return;
  end if;
  if cardinality(v_ids) > 1104 then
    raise exception 'وُجدت % بطاقةً بلا كتاب لا ١١٠٤ — تغيّر شيء، لا يُحذف شيء', cardinality(v_ids);
  end if;

  delete from cards where id = any(v_ids);
  get diagnostics v_n = row_count;
  if v_n <> cardinality(v_ids) then
    raise exception 'حُذف % لا % — لا يُحذف شيء', v_n, cardinality(v_ids);
  end if;
  perform set_config('c3.removed', v_n::text, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('233', 'حذفُ بطاقات مكتبة بيان التي لا كتابَ لها', now())
on conflict (n) do update set applied_at = now();
