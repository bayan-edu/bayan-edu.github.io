/* ══════════════════════════════════════════════════════════
   بيان — dialogue_panel.js  حوارٌ يُولَّد بأصوات Google: لوحةٌ في نموذج «مقطع صوتي» (b219 · 199 · مختبر الصوتيّات، الخطوة ٢)

   حكمُ المالك (٦ نوفمبر): «وسّع» — والفكرةُ من أوّلها: محادثاتٌ بين أكثر من شخصين، بضبط السياق والنبرة وأسلوب الكلام.
   ⇒ المشهد · المتحدّثون بأصواتهم ولهجاتهم · النصُّ سطراً سطراً · ولكلّ سطرٍ نبرتُه ووقفتُه قبله · يُولَّد سطراً سطراً (طلبُ Google
   الواحد يتّسع لمتحدّثَين اثنين) · ويُسمع ويُعاد وحده · ثمّ «تجميع الحوار» ملفّاً واحداً يملأ مفتاحُه حقلَ الرابط — **وحفظُ المصدر
   هو الاعتماد**: لا يصل الطالبَ إلا ملفٌّ ثابتٌ حفظه معلّم (حكمُ ٢٨ أكتوبر).

   🔑 **المسوّدةُ في القاعدة لا في المتصفّح** (`audio_drafts` · 199 ②): لكلّ مؤلّفٍ في كلّ درس، تُحفظ بعد كلّ تغييرٍ بتوقّفٍ قصير
      وبعد كلّ توليد — فلا يضيع ما وُلّد بمغادرةٍ أو تعذّر شبكة. والحوارُ المجمَّع يحمل وصفتَه (`audio_scripts.draft`)، فيُفتح
      منها ويُعاد سطرٌ ويُجمَّع ملفّاً جديداً (`base` يقول من أيّ ملفٍّ بُنيت المسوّدة).
   🔑 **والسطرُ يعرف أنّه تغيّر بعد توليده** (`lineSig`): نصُّه وقائلُه وصوتُه ولهجتُه ونبرتُه والسطرُ قبله والمشهد — فلا يُجمَّع
      حوارٌ فيه صوتٌ لا يطابق سطرَه.
   🔑 **والدفعاتُ تتوالى ولا تتوازى:** خمسةُ سطورٍ في الطلب، وحصّةُ Gemini نحو عشرة طلباتٍ في الدقيقة (قِيس) — والدالّةُ تعيد ما ردّته الحصّة.
   🎨 هيئةُ لوحة السطور (`.vp` · `.al-*`)، ولا لونَ جديد.
   ══════════════════════════════════════════════════════════ */
import * as realApi from './api.js';
import { esc, escA, AR, N } from './ui.js';
import { clipPlayer } from './media.js';
import * as L from './audio_lines.js';

const STATE = { none: 'لم يُولَّد', ok: 'مولَّد ✔', stale: 'تغيّر بعد توليده', err: 'تعذّر' };
const BATCH = 5, SAVE_WAIT = 1500;
const lineN = n => N(n, 'سطر', 'سطران', 'سطور', 'سطراً');
const secs = ms => AR(String((ms / 1000).toFixed(1))).replace('.', '٫') + ' ث';
const blank = () => ({ scene: '', base: null, cast: [], lines: [] });
const TRACK_RX = lesson => new RegExp(`^r2:voice/dialogues/l${lesson}/track\\.[a-z0-9]{1,16}\\.mp3$`);

/* field حقلُ الرابط · item المصدرُ المحفوظ أو null · lesson رقمُ الدرس · api النداءاتُ (للقياس) ⇒ { el }
   🆕 b220 · وفي النصّ الصوتيّ بمحرّر الاختبار (200): `loadRecipe` يُرجع وصفةَ الحوار الذي في الحقل (`passage_lines`) مكانَ
   `track_draft` المصدر، و`host` اسمُ ما يُحفظ فيصل الحوارُ إلى الطالب («النص المشترك») */
export function dialoguePanel({ field = null, item = null, lesson, loadRecipe = null, host = 'المصدر', api = realApi } = {}){
  const el = document.createElement('section');
  el.className = 'vp dg';
  el.setAttribute('aria-label', 'حوار يُولَّد');
  el.innerHTML = `<div class="vp-top"><b class="vp-h">حوار يُولَّد بأصوات Google</b><span class="vp-sum"></span>
      <button type="button" class="mf-up dg-open" data-act="open">بناء حوار</button></div>
    <p class="vp-say">مشهدٌ ومتحدثون بأصواتهم ونص الحوار سطراً سطراً. يُولَّد كل سطر ويُسمع ويُعاد وحده، ثم يُجمَّع الحوار ملفاً واحداً يملأ حقل الرابط، ويصل إلى الطالب بحفظ ${host}.</p>
    <p class="vp-note" aria-live="polite"></p>
    <div class="dg-body" hidden>
      <label class="vp-fixl" for="dgScene">المشهد: المكان والعلاقة والموقف</label>
      <textarea class="vp-fix" id="dgScene" dir="auto" rows="2" maxlength="600" placeholder="Two friends at a noisy café. Tom is late and apologises."></textarea>
      <div class="dg-cast"></div>
      <div class="vp-acts"><button type="button" class="mf-up" data-act="addcast">＋ متحدث</button></div>
      <label class="vp-fixl" for="dgTx">نص الحوار سطراً سطراً، واسم المتحدث قبل نقطتين: Sara: Hi Tom!</label>
      <textarea class="vp-fix al-tx" id="dgTx" dir="auto" rows="5" spellcheck="false"></textarea>
      <div class="vp-acts"><button type="button" class="mf-up" data-act="split">تقسيم السطور</button></div>
      <datalist id="dgTones">${L.TONES_EN.map(t => `<option value="${t}"></option>`).join('')}</datalist>
      <ol class="al-rows dg-rows" dir="ltr"></ol>
      <div class="vp-acts">
        <button type="button" class="mf-up" data-act="genall"></button>
        <button type="button" class="mf-up" data-act="stop" hidden>إيقاف بعد هذه الدفعة</button>
        <button type="button" class="mf-up" data-act="build">تجميع الحوار</button>
        <span class="vp-prog"></span>
      </div>
    </div>`;
  const $ = s => el.querySelector(s);
  const sum = $('.vp-sum'), note = $('.vp-note'), body = $('.dg-body'), scene = $('#dgScene'), tx = $('#dgTx'),
        castBox = $('.dg-cast'), list = $('.dg-rows'), prog = $('.vp-prog');
  const btn = a => el.querySelector(`button[data-act="${a}"]`);
  const tell = (text = '', tone = '') => { note.textContent = text; note.className = 'vp-note' + (tone ? ' ' + tone : ''); };
  const player = clipPlayer();

  let d = blank(), busy = false, stop = false, playing = -1, timer = 0, errs = {};

  /* ── الحال ── */
  /* صوتُ المتحدّث الجديد: لم يُستعمل، ويخالف جنسُه جنسَ صوت من قبله — فيتباين المتتاليان للأذن. والاسمُ لا يُستدلّ به على
     صاحبه (Tom أُعطي Leda في أوّل تجربة)، فالمعلّمُ يراجع الأصواتَ كما تقول الرسالة */
  const nextVoice = () => {
    const ids = Object.keys(L.DIALOGUE_VOICES), used = new Set(d.cast.map(c => c.voice));
    const want = L.DIALOGUE_VOICES[d.cast.at(-1)?.voice]?.g === 'f' ? 'm' : 'f';
    return ids.find(v => !used.has(v) && L.DIALOGUE_VOICES[v].g === want) || ids.find(v => !used.has(v)) || ids[0];
  };
  const prevOf = k => k > 0 ? d.lines[k - 1] : null;
  const sigOf = k => L.lineSig(d.lines[k], d.cast, d.scene, prevOf(k));
  const castOf = name => d.cast.find(c => c.name === name);
  const stateOf = k => errs[k] ? 'err' : !d.lines[k].clip ? 'none' : d.lines[k].sig === sigOf(k) ? 'ok' : 'stale';
  const ready = () => d.lines.length > 0 && d.lines.every((_, k) => stateOf(k) === 'ok');
  const todo = () => d.lines.map((_, k) => k).filter(k => stateOf(k) !== 'ok');

  /* ── الرسم ── */
  const voiceOpts = v => Object.entries(L.DIALOGUE_VOICES).map(([id, x]) =>
    `<option value="${id}"${id === v ? ' selected' : ''}>${x.name} · ${x.g === 'f' ? 'امرأة' : 'رجل'} · ${x.say}</option>`).join('');
  const accentOpts = a => Object.entries(L.ACCENTS).map(([id, t]) => `<option value="${id}"${id === a ? ' selected' : ''}>${t}</option>`).join('');
  function drawCast(){
    castBox.innerHTML = d.cast.map((c, j) => `<div class="vp-acts dg-c" data-j="${j}">
        <input class="vp-tone dg-name" type="text" dir="auto" maxlength="40" value="${escA(c.name)}" aria-label="اسم المتحدث ${AR(j + 1)}">
        <select class="vp-v dg-voice" aria-label="صوت ${escA(c.name)}">${voiceOpts(c.voice)}</select>
        <select class="vp-v dg-accent" aria-label="لهجة ${escA(c.name)}">${accentOpts(c.accent)}</select>
        <button type="button" class="vp-tn" data-act="rmcast" aria-label="حذف ${escA(c.name)}">✕</button>
      </div>`).join('');
  }
  const gapOpts = g => L.GAPS.concat(0).sort((a, b) => a - b).map(x => `<option value="${x}"${x === g ? ' selected' : ''}>${secs(x)}</option>`).join('');
  function drawRows(){
    list.innerHTML = d.lines.map((l, k) => {
      const st = stateOf(k), c = castOf(l.speaker);
      return `<li class="al-row dg-row" data-k="${k}">
        <span class="al-n">${AR(k + 1)}</span>
        ${l.speaker ? `<b class="al-who" dir="auto">${esc(l.speaker)}</b>` : ''}
        <span class="al-t" dir="auto">${esc(l.text)}</span>
        <span class="vp-st ${st === 'ok' ? 'ok' : st === 'none' ? 'none' : 'made'}" dir="rtl">${STATE[st]}</span>
        <span class="al-ctl" dir="rtl">
          <input class="vp-tone dg-tone" type="text" dir="ltr" list="dgTones" maxlength="200" value="${escA(l.tone || '')}" placeholder="tone" aria-label="نبرة السطر ${AR(k + 1)}">
          ${k ? `<select class="vp-v dg-gap" aria-label="الوقفة قبل السطر ${AR(k + 1)}">${gapOpts(l.gap ?? 400)}</select>` : ''}
          <button type="button" class="vp-tn" data-act="gen" aria-label="توليد السطر ${AR(k + 1)}"${busy || !c ? ' disabled' : ''}>${l.clip ? 'إعادة' : 'توليد'}</button>
          ${l.clip ? `<button type="button" class="vp-tn" data-act="play" aria-label="سماع السطر ${AR(k + 1)}">${playing === k ? '■' : '▶'}</button>` : ''}
        </span>
        ${!c && l.speaker ? `<p class="vp-rn warn" dir="rtl">«${esc(l.speaker)}» ليس بين المتحدثين أعلاه، فلا صوت له بعد.</p>` : ''}
        ${!l.speaker ? `<p class="vp-rn warn" dir="rtl">سطرٌ بلا متحدث: يُكتب اسمه قبل نقطتين.</p>` : ''}
        ${errs[k] ? `<p class="vp-rn bad" dir="rtl">${esc(errs[k])}</p>` : ''}
      </li>`;
    }).join('');
  }
  function draw(){
    const left = todo().length;
    sum.textContent = d.lines.length ? `${lineN(d.lines.length)} · ${left ? `بلا صوتٍ صالح ${AR(left)}` : 'وُلّدت كلها'}` : '';
    btn('genall').textContent = left ? `توليد ما لم يُولَّد (${AR(left)})` : 'وُلّدت السطور كلها';
    btn('genall').disabled = busy || !left || d.lines.some(l => !castOf(l.speaker));
    btn('build').disabled = busy || !ready();
    btn('stop').hidden = !busy;
    btn('split').disabled = btn('addcast').disabled = busy;
    drawRows();
  }

  /* ── الحفظ ── المسوّدةُ بعد كلّ تغييرٍ بتوقّفٍ قصير، وبعد كلّ توليدٍ في الحال */
  const plain = () => ({ scene: d.scene, base: d.base, cast: d.cast,
    lines: d.lines.map(l => ({ speaker: l.speaker || null, text: l.text, tone: l.tone || null, gap: l.gap ?? null,
                              clip: l.clip || null, ms: l.ms || null, sig: l.clip ? l.sig : null })) });
  async function saveDraft(){
    clearTimeout(timer);
    const { data, error } = await api.saveDialogueDraft(lesson, d.lines.length || d.cast.length || d.scene ? toWire(plain()) : null);
    if(error || !data?.ok) tell('لم تُحفظ المسوّدة: ' + (error?.message || data?.error || ''), 'bad');
  }
  /* الوصفةُ في القاعدة بما يقبله فحصُها (199 ⑤): `sig` بصمةٌ لا نصّ — ١٦ خانةً من نصّ البصمة */
  const toWire = x => ({ ...x, lines: x.lines.map(l => ({ ...l, sig: l.sig ? hex16(l.sig) : null })) });
  const later = () => { clearTimeout(timer); timer = setTimeout(saveDraft, SAVE_WAIT); };

  /* ── التوليد ── */
  async function generate(ks){
    const sent = ks.filter(k => castOf(d.lines[k].speaker));
    if(!sent.length) return;
    busy = true; stop = false; errs = {}; draw();
    for(let i = 0; i < sent.length && !stop; i += BATCH){
      const part = sent.slice(i, i + BATCH);
      prog.textContent = `يُولَّد ${AR(Math.min(i + BATCH, sent.length))} من ${AR(sent.length)}…`;
      const req = part.map(k => { const l = d.lines[k], c = castOf(l.speaker);
        return { key: 'r' + k, speaker: l.speaker, text: l.text, voice: c.voice, accent: c.accent, tone: l.tone || null, prev: prevOf(k)?.text || null }; });
      const { data, error } = await api.dialogueVoices(lesson, d.scene, req);
      if(error){ part.forEach(k => { errs[k] = error.message; }); break; }
      for(const r of data?.results || []){
        const k = +String(r.key).slice(1);
        if(r.state === 'ok') Object.assign(d.lines[k], { clip: r.clip, ms: r.ms, sig: sigOf(k) });
        else errs[k] = r.error || 'لم يُولَّد الصوت';
      }
      draw();
      await saveDraft();
    }
    busy = false; prog.textContent = ''; draw();
    const failed = Object.keys(errs).length;
    tell(failed ? `تعذّر ${lineN(failed)}، وسببه تحته.` : 'وُلّدت. يُسمع كل سطر، ويُعاد ما لا يُرضي، ثم «تجميع الحوار».', failed ? 'warn' : '');
  }

  async function build(){
    if(!ready()) return;
    busy = true; draw(); tell('يُجمَّع الحوار…');
    const lines = d.lines.map((l, k) => ({ clip: l.clip, gap: k ? (l.gap ?? 400) : 0, speaker: l.speaker || null, text: l.text }));
    const { data, error } = await api.assembleDialogue(lesson, lines, toWire(plain()));
    busy = false;
    if(error || !data?.track){ tell('لم يُجمَّع الحوار: ' + (error?.message || data?.error || ''), 'bad'); draw(); return; }
    d.base = data.track;
    await saveDraft();
    if(field){ field.value = data.track; field.dispatchEvent(new Event('input', { bubbles: true })); field.dispatchEvent(new Event('change', { bubbles: true })); }
    tell(`جُمّع الحوار (${secs(data.ms)}) وصار مفتاحه في حقل الرابط. يصل إلى الطالب بحفظ ${host}، وتظهر سطوره في «سطور المقطع» بعد الحفظ.`);
    draw();
  }

  /* ── الأحداث ── */
  function play(k){
    if(playing === k){ player.stop(); playing = -1; draw(); return; }
    player.stop();
    const end = () => { playing = -1; draw(); };
    playing = player.play(d.lines[k].clip, { onend: end, onerror: e => { end(); if(e !== 'interrupted') tell('تعذّر تشغيل الصوت.', 'bad'); } }) ? k : -1;
    draw();
  }
  el.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]');
    if(!b || b.disabled) return;
    const a = b.dataset.act, row = b.closest('.dg-row'), k = row ? +row.dataset.k : -1;
    if(a === 'open'){ body.hidden = !body.hidden; b.textContent = body.hidden ? 'بناء حوار' : 'طيّ'; return; }
    if(a === 'addcast'){
      if(d.cast.length >= 8){ tell('المتحدثون ثمانية على الأكثر.', 'warn'); return; }
      d.cast.push({ name: `Speaker ${d.cast.length + 1}`, voice: nextVoice(), accent: 'en-US' }); drawCast(); draw(); later(); return;
    }
    if(a === 'rmcast'){ d.cast.splice(+b.closest('.dg-c').dataset.j, 1); drawCast(); draw(); later(); return; }
    if(a === 'split') return split();
    if(a === 'genall') return generate(todo());
    if(a === 'stop'){ stop = true; b.disabled = true; return; }
    if(a === 'build') return build();
    if(a === 'gen' && k >= 0) return generate([k]);
    if(a === 'play' && k >= 0) return play(k);
  });
  el.addEventListener('input', e => {
    const t = e.target, row = t.closest('.dg-row'), c = t.closest('.dg-c');
    if(t === scene){ d.scene = scene.value.replace(/\s+/g, ' ').trim(); later(); return draw(); }
    if(c && t.classList.contains('dg-name')){
      const j = +c.dataset.j, old = d.cast[j].name, name = t.value.trim();
      d.cast[j].name = name;
      d.lines.forEach(l => { if(l.speaker === old) l.speaker = name; });    // الاسمُ يتبعه سطورُه
      tx.value = L.scriptText(d.lines); later(); return draw();
    }
    if(row && t.classList.contains('dg-tone')){ d.lines[+row.dataset.k].tone = t.value.trim(); later(); updateState(+row.dataset.k); }
  });
  el.addEventListener('change', e => {
    const t = e.target, row = t.closest('.dg-row'), c = t.closest('.dg-c');
    if(c && t.classList.contains('dg-voice')){ d.cast[+c.dataset.j].voice = t.value; later(); return draw(); }
    if(c && t.classList.contains('dg-accent')){ d.cast[+c.dataset.j].accent = t.value; later(); return draw(); }
    if(row && t.classList.contains('dg-gap')){ d.lines[+row.dataset.k].gap = +t.value; later(); }
  });
  /* النبرةُ تُكتب في سطرها: يُحدَّث حالُه وحده، فلا يضيع موضعُ المؤشّر برسم اللوحة كلّها */
  function updateState(k){
    const st = stateOf(k), chip = list.querySelector(`.dg-row[data-k="${k}"] .vp-st`);
    if(chip){ chip.textContent = STATE[st]; chip.className = `vp-st ${st === 'ok' ? 'ok' : st === 'none' ? 'none' : 'made'}`; }
    const left = todo().length;
    sum.textContent = `${lineN(d.lines.length)} · ${left ? `بلا صوتٍ صالح ${AR(left)}` : 'وُلّدت كلها'}`;
    btn('build').disabled = busy || !ready();
    btn('genall').disabled = busy || !left; btn('genall').textContent = left ? `توليد ما لم يُولَّد (${AR(left)})` : 'وُلّدت السطور كلها';
  }

  /* التقسيم: سطورٌ لم يتغيّر نصُّها وقائلُها تحمل ما وُلّد لها ونبرتَها ووقفتَها، والمتحدّثون الجدد يُضافون بأصواتٍ لم تُستعمل */
  function split(){
    const fresh = L.parseScript(tx.value);
    let at = 0;
    d.lines = fresh.map((l, k) => {
      for(let j = at; j < d.lines.length; j++){
        const o = d.lines[j];
        if(o.text === l.text && (o.speaker || null) === (l.speaker || null)){ at = j + 1; return { ...o }; }
      }
      return { speaker: l.speaker, text: l.text, tone: '', gap: L.gapFor(fresh[k - 1], l), clip: null, ms: null, sig: null };
    });
    for(const l of d.lines) if(l.speaker && !castOf(l.speaker) && d.cast.length < 8)
      d.cast.push({ name: l.speaker, voice: nextVoice(), accent: 'en-US' });
    tx.value = L.scriptText(d.lines);
    errs = {}; drawCast(); draw(); later();
    tell(d.lines.length ? `${lineN(d.lines.length)}. تُراجع أصوات المتحدثين، ثم «توليد ما لم يُولَّد».` : 'لا سطور في النص.', d.lines.length ? '' : 'warn');
  }

  /* ── البدء: وصفةُ الحوار الذي في المصدر، أو مسوّدةُ المؤلّف في هذا الدرس ── */
  (async () => {
    if(!lesson){ tell('يُبنى الحوار داخل درس.'); return; }
    const url = (field?.value || item?.url || '').trim();
    let mine = null, recipe = null;
    const r1 = await api.dialogueDraft(lesson);
    if(r1.error || !r1.data?.ok){ tell('تعذّر جلب المسوّدة: ' + (r1.error?.message || r1.data?.error || ''), 'bad'); return; }
    mine = r1.data.draft;
    if(TRACK_RX(lesson).test(url) && loadRecipe) recipe = await Promise.resolve().then(loadRecipe).catch(() => null);
    else if(item?.id && TRACK_RX(lesson).test(url)){
      const r2 = await api.trackDraft(item.id);
      if(!r2.error && r2.data?.ok) recipe = r2.data.draft;
    }
    /* مسوّدةٌ بُنيت من هذا الملفّ أولى من وصفته (عملٌ لم يُجمَّع بعد)، ومسوّدةُ حوارٍ آخر لا تُفتح هنا */
    const src = mine && (mine.base === url || (!mine.base && !recipe)) ? mine : recipe ? { ...recipe, base: url } : null;
    if(src){
      d = { scene: src.scene || '', base: src.base || null, cast: src.cast || [],
            lines: (src.lines || []).map(l => ({ ...l, tone: l.tone || '', sig: null })) };
      /* البصمةُ المحفوظة مختصرة (`hex16`) — فتُقارَن بالمختصر: سطرٌ لم يتغيّر بعد توليده يبقى «مولَّداً» */
      d.lines.forEach((l, k) => { const saved = (src.lines || [])[k]?.sig; l.sig = saved && saved === hex16(sigOf(k)) ? sigOf(k) : (l.clip ? 'x' : null); });
      scene.value = d.scene; tx.value = L.scriptText(d.lines);
      body.hidden = false; btn('open').textContent = 'طيّ';
      tell(recipe && src !== mine ? `هذه وصفة الحوار الذي في ${host}: يُعاد منها سطرٌ ثم يُجمَّع ملفاً جديداً.` : mine && src === mine ? 'هذه مسوّدتك المحفوظة لهذا الدرس.' : '');
    }
    drawCast(); draw();
  })();

  return { el };
}

/* ١٦ خانةً ستّ عشريّة من نصّ البصمة (FNV-1a مرّتين) — تكفي لمعرفة التغيّر، ويقبلها فحصُ الوصفة (199 ⑤) */
function hex16(s){
  let a = 0x811c9dc5, b = 0x01000193 ^ 0x5bd1e995;
  for(const ch of String(s)){ const c = ch.codePointAt(0);
    a = Math.imul(a ^ c, 0x01000193) >>> 0; b = Math.imul(b ^ c, 0x01000193) >>> 0; b = (b + a) >>> 0; }
  return a.toString(16).padStart(8, '0') + b.toString(16).padStart(8, '0');
}
