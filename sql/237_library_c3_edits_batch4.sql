-- ══════════════════════════════════════════════════════════
-- 237 · تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الرابعة: موضوعٌ يُستبدل في أربعة كتب (٢٦ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **أحكامُ المالك (٢٦ نوفمبر · `content-policy.md` §٨):** الموسيقى لا تبقى في نصٍّ معلوماتيٍّ إلّا إن كانت هي موضوعَه (G2 وحكمُ 818) ·
--      والآلةُ لا تُعرض في قصّة (§٥٫٨) · ولا غرامَ ولا خطبة (§٥٫٤).
--   ② **الكتبُ الأربعة:**
--      818 A Room-Sized Computer…: الموسيقى ← الصوتُ المسجَّل عامّةً. **والعنوانُ يتغيّر:** «…in Your Digital Music Player» ← «…in Your Phone»
--          في الدرس والبند والاختبار والمقطع. وتُحذف بطاقةُ «phonograph»: كلمتُها خرجت من النصّ.
--      2349 Waves are Everywhere!: مقطعُ الاختبار يأخذ صياغةَ نصّ الكتاب (كان `items.body` نُظِّف من قبل: «clapping along to a steady rhythm»)،
--          والكمانُ ← خيطٌ مشدود بين نقطتين — والفيزياءُ واحدة: شدُّ الخيط يرفع التردّد.
--      2536 The Maldhok in the Desert: «narh» نايُ الراعي ← قصبتُه التي ينادي بها طائرَه («reed pipe» · «long, low call»)، لا لحنَ يُعزف.
--      2230 Journey to the Centre of the Earth: Grauben خطيبةُ الراوي ← أختُه الصغرى. يتغيّر مشهدان وثلاثُ جمل.
--   ③ **الآليّةُ آليّةُ `234`:** كلُّ زوجٍ بعدده المقيس على القاعدة الحيّة في كلّ جدول، وعددٌ مخالف ⇐ لا يُعدَّل شيء.
--   ④ **قابلٌ لإعادة التشغيل:** الزوجُ المطبَّق لا يُوجد نصُّه القديم، فيُتخطّى.
-- ══════════════════════════════════════════════════════════

do $$
declare
  spec constant jsonb := $spec$[
{"l":818,"f":"sounded similar to the theme song from The Green Hornet radio show","r":"sounded similar to the buzzing opening of The Green Hornet radio show","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":818,"f":"used by computers, MP3 players","r":"used by computers, phones","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":1,"cards":0}},
{"l":818,"f":"it wasn't until 1972 that the technique was used in music to make digital master copies of phonograph records.","r":"it wasn't until the 1970s that the technique was used outside the military to make digital recordings of sound.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":1}},
{"l":818,"f":"The first commercial music release using pulse-code modulation came a decade later, when Billy Joel's album 52nd Street was issued on compact disc.","r":"In the early 1980s, sound recorded this way was first sold to the public on compact discs.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"switching over to digital music files,","r":"switching over to digital sound files,","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"required to maintain a music collection.","r":"required to keep a collection of recordings.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"is generally lower than music played during a live performance or recorded onto records and CDs.","r":"is generally lower than that of sound recorded onto CDs.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"Some audiophiles claim that digital recording and playback of music can never fully recreate the sound of music the way a fully analog phonograph record can.","r":"Some listeners claim that digital recording and playback can never fully recreate a sound the way a fully analog recording can.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"How does the text link a room-sized computer to your music player?","r":"How does the text link a room-sized computer to your phone?","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":818,"f":"Its method was later used in music to make master copies of records.","r":"Its method was later used to make digital recordings of sound.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":818,"f":"How CDs and MP3 files took the place of records.","r":"How CDs and MP3 files changed the way sound is stored.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":818,"f":"Music players still hold small SIGSALY machines inside them.","r":"Phones still hold small SIGSALY machines inside them.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":818,"f":"MP3 files sound better than any live music performance.","r":"MP3 files sound better than any other recording.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":818,"f":"Billy Joel helped the army build SIGSALY during the war.","r":"A radio show helped the army build SIGSALY during the war.","n":{"items":0,"passages":0,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2349,"f":"Whether you are rocking out to songs at a concert or staring at a rainbow","r":"Whether you are listening to sounds around you or staring at a rainbow","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2349,"f":"Imagine you are clapping along at a concert.","r":"Imagine you are clapping along to a steady rhythm.","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2349,"f":"One of the songs may have a lively, fast beat.","r":"One rhythm may be lively and fast.","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2349,"f":"Another song may be a slower melody.","r":"Another rhythm may be slower.","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2349,"f":"If the songs were the same length, you’d end up clapping many more times in the fast song than the slow one.","r":"If both rhythms lasted the same time, you’d end up clapping many more times in the fast rhythm than the slow one.","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2349,"f":"The frequency of claps is higher in the fast song than the slow one.","r":"The frequency of claps is higher in the fast rhythm than the slow one.","n":{"items":0,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":2349,"f":"is through sound and music.","r":"is through sound.","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2349,"f":"each musical instrument generates its own unique wave pattern.","r":"each object that makes a sound generates its own unique wave pattern.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2349,"f":"When someone pulls a bow across a violin’s string, for example, the string vibrates.","r":"When someone plucks a string stretched between two points, for example, the string vibrates.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2349,"f":"That vibration produces sound waves with a high frequency, resulting in a high-pitched sound.","r":"That vibration produces sound waves that travel through the air to your ears.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2349,"f":"To increase the frequencies of the sound waves produced by a violin, the strings can be tightened.","r":"To increase the frequencies of the sound waves produced by the string, it can be pulled tighter.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2349,"f":"This makes the instrument produce a tone with a higher pitch.","r":"This makes the string produce a sound with a higher pitch.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2349,"f":"What happens to a violin's sound when a string is tightened?","r":"What happens to the sound of a stretched string when it is pulled tighter?","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2349,"f":"The next time you listen to your favorite song, take in a sunset view,","r":"The next time you listen to the wind, take in a sunset view,","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2536,"f":"The haunting notes of the shepherd’s reed flute die down.","r":"The long, low call of the shepherd’s reed pipe dies down.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2536,"f":"* Narh - Flute made from desert grass","r":"* Narh - Pipe made from desert grass","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2536,"f":"* Poongi - Snake charmer’s flute made from a gourd","r":"* Poongi - Snake charmer’s pipe made from a gourd","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2536,"f":"he picks up his narh to play that haunting tune.","r":"he picks up his narh to blow that long, low call.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":1,"cards":0}},
{"l":2536,"f":"He plays the narh again.","r":"He blows the narh again.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2536,"f":"Chaitan plays his haunting tune again.","r":"Chaitan blows his long, low call again.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2536,"f":"The notes from the narh swell to a crescendo.","r":"The sound of the narh swells across the dunes.","n":{"items":1,"passages":1,"questions":0,"options":2,"keys":0,"cards":0}},
{"l":2536,"f":"And fade away.","r":"And fades away.","n":{"items":1,"passages":1,"questions":0,"options":1,"keys":0,"cards":0}},
{"l":2536,"f":"how Chaitan's narh flute marks","r":"how Chaitan's narh marks","n":{"items":0,"passages":0,"questions":1,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"There is a seventeen-year-old girl living in our town. I think she is the most beautiful girl in Germany. She's got long blonde hair and bright blue eyes. Her name is Grauben, and we are in love. We want to get married.","r":"I have a younger sister who lives with our aunt in this town. She is seventeen, and she is the kindest girl in Germany. Her name is Grauben, and we have looked after each other since we were children. I did not want to leave her.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"\"Are you in love with Grauben?\"","r":"\"Are you worried about Grauben?\"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"\"And you want to marry her?\"","r":"\"And you want to stay near her?\"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"he could not understand love because his only interest was science","r":"he could not understand such feelings because his only interest was science","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"She looked like an angel.","r":"She was smiling.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"We ran into each other's arms and kissed.","r":"We were happy to see each other.","n":{"items":0,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"Why are you excited, my love?\"","r":"Why are you excited, Grauben?\"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"\"But, Grauben, we want to get married. I don't know when I'm coming back.\"","r":"\"But, Grauben, I will be far away. I don't know when I'm coming back.\"","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"She looked at me lovingly and held my hand.","r":"She looked at me kindly and held my hand.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"famous like your uncle. Then, our life will be perfect together.","r":"famous like our uncle. Then, we will all be proud of you.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"you are the most wonderful girl in the world!","r":"you are the most wonderful sister in the world!","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"was my Grauben. And I saw her, like a white light, moving past the others, until I could hold her.","r":"was my sister Grauben. And I saw her, moving past the others, until she reached me.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}},
{"l":2230,"f":"but I did want to come back to you, every minute of every day.","r":"but I did want to come back home, every minute of every day.","n":{"items":1,"passages":1,"questions":0,"options":0,"keys":0,"cards":0}}
]$spec$::jsonb;
  e jsonb; l bigint; f text; r text; qz bigint[];
  c int[]; x int[];
  v_applied int := 0; v_skipped int := 0; v_rows int := 0;
begin
  -- لا يُعدَّل سؤالٌ أجاب عنه طالب
  if exists (select 1 from answers a join questions q on q.id = a.question_id join items i on i.quiz_id = q.quiz_id
              where i.lesson_id in (select (s->>'l')::bigint from jsonb_array_elements(spec) s)) then
    raise exception 'في هذه الكتب إجاباتٌ مسجَّلة — لا يُعدَّل شيء';
  end if;

  for e in select * from jsonb_array_elements(spec) loop
    l := (e->>'l')::bigint; f := e->>'f'; r := e->>'r';
    x := array[(e#>>'{n,items}')::int, (e#>>'{n,passages}')::int, (e#>>'{n,questions}')::int,
               (e#>>'{n,options}')::int, (e#>>'{n,keys}')::int, (e#>>'{n,cards}')::int];
    select coalesce(array_agg(distinct quiz_id), '{}') into qz from items where lesson_id = l and quiz_id is not null;
    c := array[
      (select count(*) from items     where lesson_id = l and position(f in body) > 0),
      (select count(*) from passages  where quiz_id = any(qz) and position(f in body) > 0),
      (select count(*) from questions where quiz_id = any(qz) and position(f in body) > 0),
      (select count(*) from options   where question_id in (select id from questions where quiz_id = any(qz)) and position(f in body) > 0),
      (select count(*) from question_keys where question_id in (select id from questions where quiz_id = any(qz)) and position(f in explanation) > 0),
      (select count(*) from cards     where id in (select card_id from card_lessons where lesson_id = l) and position(f in note) > 0)]::int[];
    if c = array[0,0,0,0,0,0] then
      v_skipped := v_skipped + 1; continue;           -- عُدِّل من قبل
    end if;
    if c <> x then
      raise exception 'الكتاب % · «%»: وُجد % لا % — لا يُعدَّل شيء', l, left(f, 50), c, x;
    end if;
    update items     set body = replace(body, f, r) where lesson_id = l and position(f in body) > 0;
    update passages  set body = replace(body, f, r) where quiz_id = any(qz) and position(f in body) > 0;
    update questions set body = replace(body, f, r) where quiz_id = any(qz) and position(f in body) > 0;
    update options   set body = replace(body, f, r) where question_id in (select id from questions where quiz_id = any(qz)) and position(f in body) > 0;
    update question_keys set explanation = replace(explanation, f, r) where question_id in (select id from questions where quiz_id = any(qz)) and position(f in explanation) > 0;
    update cards     set note = replace(note, f, r) where id in (select card_id from card_lessons where lesson_id = l) and position(f in note) > 0;
    v_applied := v_applied + 1;
    v_rows := v_rows + c[1] + c[2] + c[3] + c[4] + c[5] + c[6];
  end loop;
  perform set_config('c3.edits', v_applied || ' applied · ' || v_skipped || ' skipped · ' || v_rows || ' rows', true);
end $$;

-- عنوانُ 818 في مواضعه الأربعة، وبطاقةُ «phonograph»
do $$
declare
  v_old constant text := 'A Room-Sized Computer in Your Digital Music Player';
  v_new constant text := 'A Room-Sized Computer in Your Phone';
  v_t int := 0; v_n int; v_c int := 0;
begin
  update lessons  set title = v_new where id = 818 and title = v_old;                         get diagnostics v_n = row_count; v_t := v_t + v_n;
  update items    set title = v_new where lesson_id = 818 and title = v_old;                   get diagnostics v_n = row_count; v_t := v_t + v_n;
  update quizzes  set title = v_new where id in (select quiz_id from items where lesson_id = 818) and title = v_old;       get diagnostics v_n = row_count; v_t := v_t + v_n;
  update passages set title = v_new where quiz_id in (select quiz_id from items where lesson_id = 818) and title = v_old;  get diagnostics v_n = row_count; v_t := v_t + v_n;
  if v_t not in (0, 4) then
    raise exception 'عنوانُ 818 وُجد في % مواضع لا ٤ — لا يُعدَّل شيء', v_t;
  end if;
  if exists (select 1 from cards where id = 13119 and front like 'phonograph%')
     and not exists (select 1 from card_lessons where card_id = 13119 and lesson_id <> 818)
     and not exists (select 1 from card_reviews where card_id = 13119)
     and not exists (select 1 from questions where card_id = 13119)
     and not exists (select 1 from items where lesson_id = 818 and body ~* 'phonograph') then
    delete from cards where id = 13119;
    get diagnostics v_c = row_count;
  end if;
  perform set_config('c3.extra', 'titles ' || v_t || ' · card ' || v_c, true);
end $$;

insert into public.sql_log (n, title, applied_at)
values ('237', 'تعديلاتُ مراجعة C3 في نصوص مكتبة بيان — الدفعة الرابعة: موضوعٌ يُستبدل في أربعة كتب', now())
on conflict (n) do update set applied_at = now();
