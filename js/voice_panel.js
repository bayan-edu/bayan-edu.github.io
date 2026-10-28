/* ══════════════════════════════════════════════════════════
   بيان — voice_panel.js  🔊  صوتُ النصّ: لوحةٌ في المحرّر (b203 · الخطوة ٦ من ستّ)

   تحت مربّع النصّ بعد محدِّد السور، للنصّ العربيّ ولمن يملك تحريرَه (`attachVoice` في editor_items.js). سطرٌ لكلّ
   جملة: حالُها · صوتُها من اللوحة والمقترحُ معلَّم · استماعٌ · توليدٌ أو إعادتُه · اعتمادٌ أو إلغاؤه · ونطقُها وتصحيحُه.
   والمنطقُ في `voice_rows.js` (يُقاس في node)، وهنا الرسمُ والنداء.
   🔑 **ولا يسمع الطالبُ إلا ما اعتُمد** (189 ⑤)، وإعادةُ التوليد تُسقط الاعتماد — والقاعدةُ تحكم بهما لا هذه اللوحة.
   🔑 **والصوتُ يُولَّد للنصّ المحفوظ:** الصفُّ يحفظ الجملةَ كما في القاعدة، وتعديلٌ لم يُحفظ يولّد صوتاً لجملةٍ لا يراها
      الطالب ⇒ التوليدُ ينتظر الحفظ، والاستماعُ والاعتمادُ لا (جملُهما محفوظة).
   🔑 **والنطقُ** (المشكولُ الذي سمعه الصوت) يعود في ردّ التوليد (`text`)، ومكانُه الدائم ملفُّ `.txt` بجوار صوته في R2 —
      يُقرأ إن أذن المخزنُ للموقع (CORS)، وإلّا ظهر ساعةَ التوليد وحدها (189: «ثلاثٌ للخطوتين التاليتين» ①).
   🔑 **والنبرةُ:** سطرُ الحوار يحمل الجملةَ قبله، فتعرف بها الدالّةُ قائلَه (فالصوتُ النسائيّ بعد «فقالت») ونبرتَه («بين شهقاتها»)، وما
      كتبه المؤلّفُ في «النبرة» يغلبها — حكمُ المالك: «نعم تلقائياً» و«يحتاج ضبط للنبرة حسب النص». ونبراتٌ جاهزةٌ تملأ الحقلَ
      بلمسة (`TONES`) والكتابةُ باقيةٌ لما سواها — «يمكن إضافة أكثر من نبرة».
   🔑 **والدفعاتُ تتوالى ولا تتوازى:** حصّةُ Gemini للمشروع كلّه نحو عشرة طلباتٍ في الدقيقة (قِيس)، والحوارُ عليه.
      وبعد كلّ دفعةٍ تُقرأ الأصواتُ من القاعدة — فاللوحةُ تُري ما حُفظ لا ما ظنّت.
   🎨 محايدةٌ كمحدِّد السور، والحالُ تتلوّن بمعناها: «لم يُعتمد» و«ممسَكة» انتباهٌ (`warn`) · والتعذّرُ (`danger`).
   ══════════════════════════════════════════════════════════ */
import { textSentences } from './book.js';
import { VOICES, TONES, HELD, voiceRows, voiceBatches, tally } from './voice_rows.js';
import { esc, escA, AR, N, toast } from './ui.js';
import { clipPlayer, mediaUrl } from './media.js';
import * as realApi from './api.js';

const STATE = { none: 'بلا صوت', made: 'لم يُعتمد', ok: 'معتمد ✔', held: 'ممسَكة' };
const SUM   = [['ok', 'المعتمد'], ['made', 'لم يُعتمد'], ['none', 'بلا صوت'], ['held', 'ممسَكة']];
const KIND  = { cover: 'العنوان', h: 'عنوان فرعي', v: 'بيت' };
const WAIT  = 400;                  // يتبع تنبيهُ الحفظ الكتابةَ بعد توقّفٍ قصير، لا مع كلّ حرف

/* inp مربّعُ النصّ · item المصدرُ المحفوظ ({ id, title, body }) · title حقلُ العنوان · lang قائمةُ اللغة ·
   api النداءاتُ (للقياس بنداءاتٍ مصنوعة) ⇒ { el } — والموضعُ لمن نادى */
export function voicePanel(inp, { item = null, title = null, lang = null, api = realApi } = {}){
  const el = document.createElement('section');
  el.className = 'vp';
  el.setAttribute('aria-label', 'صوت النص');
  el.innerHTML = `<div class="vp-top"><b class="vp-h">صوت النص</b><span class="vp-sum"></span></div>
    <p class="vp-say">يُولَّد صوت كل جملة ويُسمع هنا، ولا يسمعه الطالب حتى يُعتمد. والآيات المرقّمة تُتلى بصوت الحصري.</p>
    <p class="vp-note" aria-live="polite"></p>
    <div class="vp-acts"></div>
    <div class="vp-rows"></div>`;
  const note = el.querySelector('.vp-note'), acts = el.querySelector('.vp-acts'), list = el.querySelector('.vp-rows');
  const tell = (text, tone = '') => { note.textContent = text; note.className = 'vp-note' + (tone ? ' ' + tone : ''); };

  /* الإنجليزيّةُ بصوت الجهاز (b155) ⇒ لا لوحة */
  const showLang = () => { el.hidden = (lang?.value || 'ar') !== 'ar'; };
  lang?.addEventListener('change', showLang);
  showLang();
  if(!item?.id){ tell('يُولَّد الصوت بعد حفظ النص.'); return { el }; }

  const sents = textSentences(item.body || '', item.title || '');
  const player = clipPlayer();
  /* ما يخصّ الجملة بنصّها: صوتٌ اختاره المؤلّف · نطقُها (نصٌّ، أو false إن تعذّرت قراءتُه) · تصحيحٌ يُكتب · نبرةٌ يكتبها المؤلّف
     (تغلب ما تستنبطه الدالّةُ من الجملة قبل الحوار · حكمُ المالك: «يحتاج ضبط للنبرة حسب النص») · خطأُ آخر توليد */
  const chosen = {}, spoken = {}, fixes = {}, tones = {}, errs = {}, open = new Set();
  let rows = [], busy = false, stop = false, playing = null, progress = '', timer = 0;

  /* والمحفوظُ يُقارَن بما في المربّع بعد توحيد نهايات الأسطر: المربّعُ يكتبها «\n» أبداً، والمحفوظُ قد يحمل «\r\n»
     فيبدو النصُّ معدَّلاً ولم يُمسّ */
  const norm = s => String(s || '').replace(/\r\n?/g, '\n').trim();
  const dirty = () => norm(inp.value) !== norm(item.body) || (!!title && norm(title.value) !== norm(item.title));

  async function reload(){
    const { data, error } = await api.itemVoices(item.id);
    if(error){ tell('تعذّر جلب أصوات النص: ' + error.message, 'bad'); return false; }
    rows = voiceRows(sents, data || []);
    return true;
  }

  /* ── الرسم ── */
  const sumText = () => {
    const t = tally(rows);
    return [N(rows.length, 'جملة', 'جملتان', 'جمل', 'جملة'),
            ...SUM.filter(([k]) => t[k]).map(([k, w]) => `${w} ${AR(t[k])}`)].join(' · ');
  };
  const sayBox = r => {
    const s = spoken[r.text];
    const shown = typeof s === 'string' ? esc(s)
      : !r.clip ? 'لم يُولَّد صوت هذه الجملة بعد.'
      : s === false ? 'لا يُقرأ نطق هذا الصوت من المخزن، ويظهر عند إعادة التوليد.' : 'يُقرأ النطق…';
    const off = VOICES[chosen[r.text] || r.voice]?.tone ? '' : ' disabled', cur = String(tones[r.text] || '').trim();
    return `<div class="vp-sayb">
      <p class="vp-spoken">${shown}</p>
      <label class="vp-fixl">تصحيح النطق: الجملة مشكولةً كما تُنطق</label>
      <textarea class="vp-fix" dir="rtl" rows="2">${esc(fixes[r.text] ?? (typeof s === 'string' ? s : ''))}</textarea>
      <label class="vp-fixl">النبرة: ${toneSay(r)}</label>
      <div class="vp-tones" role="group" aria-label="نبرات جاهزة">${TONES.map(t => `<button type="button" class="vp-tn" data-act="tone"
        data-tone="${escA(t)}" aria-pressed="${t === cur}"${off}>${esc(t)}</button>`).join('')}</div>
      <input class="vp-tone" type="text" dir="rtl" maxlength="200" placeholder="أو نبرة أخرى تُكتب هنا" value="${escA(tones[r.text] || '')}"${off}>
      <button type="button" class="mf-up" data-act="fix"${busy || dirty() ? ' disabled' : ''}>توليد بالنطق والنبرة</button>
    </div>`;
  };
  /* أيُّ نبرةٍ جاهزةٍ تطابق الحقل — تُعلَّم في مربّعها وحده، فالكتابةُ لا تُعيد رسمَ اللوحة ولا يضيع موضعُ المؤشّر */
  const pressTones = (box, t) => box.querySelectorAll('.vp-tn')
    .forEach(c => c.setAttribute('aria-pressed', String(c.dataset.tone === String(t || '').trim())));
  /* النبرةُ التي تُرسل: المكتوبةُ لصوتٍ يأخذها — وChirp لا يأخذها، فما كُتب له لا يُرسل */
  const toneFor = r => VOICES[chosen[r.text] || r.voice]?.tone ? String(tones[r.text] || '').trim() : '';
  /* من أين نبرةُ الجملة إن لم تُكتب: صوتُ Chirp لا يأخذها · والحوارُ من الجملة قبله · والسردُ بلا نبرةٍ ما لم تُكتب */
  const toneSay = r => {
    const v = VOICES[chosen[r.text] || r.voice];
    if(!v?.tone) return 'صوت Chirp لا يأخذ نبرة، وأصوات Gemini تأخذها.';
    return r.talk && r.lead ? `تُستنبط من الجملة قبلها «${esc(r.lead.slice(-90))}»، أو تُكتب هنا فتغلبها.` : 'تُكتب هنا إن أُريدت.';
  };
  const rowHtml = (r, k) => {
    const v = chosen[r.text] || r.voice;
    const tag = KIND[r.kind] || (r.talk ? 'حوار' : '');
    const opts = Object.entries(VOICES).map(([id, x]) => `<option value="${id}"${id === v ? ' selected' : ''}>${
      x.name} · ${x.role}${id === r.recommended ? ' (مقترح)' : ''}</option>`).join('');
    const off = busy ? ' disabled' : '';
    return `<div class="vp-row" data-k="${k}">
      <p class="vp-t">${tag ? `<span class="vp-tag">${tag}</span>` : ''}${esc(r.text)}</p>
      <div class="vp-ctl"><span class="vp-st ${r.state}">${STATE[r.state]}</span>${r.state === 'held' ? '' : `
        <select class="vp-v" aria-label="صوت الجملة"${off}>${opts}</select>
        ${r.clip ? `<button type="button" class="mf-up" data-act="play">${playing === r.text ? 'إيقاف' : 'استماع'}</button>` : ''}
        <button type="button" class="mf-up" data-act="gen"${busy || dirty() ? ' disabled' : ''}>${r.clip ? 'إعادة التوليد' : 'توليد'}</button>
        ${r.clip ? `<button type="button" class="mf-up" data-act="approve"${off}>${r.state === 'ok' ? 'إلغاء الاعتماد' : 'اعتماد'}</button>` : ''}
        <button type="button" class="mf-up" data-act="say" aria-expanded="${open.has(r.text)}">النطق والنبرة</button>`}</div>
      ${r.state === 'held' ? `<p class="vp-rn warn">${HELD}</p>` : ''}
      ${errs[r.text] ? `<p class="vp-rn bad">${esc(errs[r.text])}</p>` : ''}
      ${open.has(r.text) && r.state !== 'held' ? sayBox(r) : ''}
    </div>`;
  };
  function draw(){
    const t = tally(rows), wait = dirty();
    el.querySelector('.vp-sum').textContent = rows.length ? sumText() : '';
    if(wait) tell('التوليد ينتظر حفظ التعديلات: الصوت يُولَّد للنص المحفوظ.', 'warn');
    else if(note.classList.contains('warn')) tell('');
    acts.innerHTML = `
      <button type="button" class="mf-up" data-act="missing"${busy || wait || !t.none ? ' disabled' : ''}>توليد ما لا صوت له</button>
      <button type="button" class="mf-up" data-act="all"${busy || !t.made ? ' disabled' : ''}>اعتماد المولَّد كله</button>
      ${busy ? `<button type="button" class="mf-up" data-act="stop"${stop ? ' disabled' : ''}>إيقاف بعد هذه الدفعة</button>` : ''}
      <span class="vp-prog" aria-live="polite">${esc(progress)}</span>`;
    list.innerHTML = rows.map(rowHtml).join('');
  }

  /* ── الأفعال ── */
  async function generate(todo, extra = {}){
    if(busy || !todo.length) return;
    if(dirty()){ toast('التوليد ينتظر حفظ التعديلات'); return; }
    busy = true; stop = false;
    todo.forEach(r => { delete errs[r.text]; });
    const voice = Object.fromEntries(todo.map(r => [r.text, chosen[r.text] || r.voice]));
    const tone = Object.fromEntries(todo.map(r => [r.text, toneFor(r)]).filter(([, t]) => t));
    const batches = voiceBatches(sents, todo, { voice, spoken: extra.spoken || {}, tone });
    const total = batches.reduce((n, b) => n + b.sentences.length, 0);
    let done = 0;
    for(const b of batches){
      if(stop) break;
      progress = total > 1 ? `يُولَّد ${AR(done + b.sentences.length)} من ${AR(total)}…` : 'يُولَّد…';
      draw();
      const { data, error } = await api.generateVoices(item.id, b.sentences, b.context);
      if(error){
        b.sentences.forEach(s => { errs[s.text] = error.message; });
        /* ما يردّ الدفعاتِ كلَّها يوقفها: لا هويّة (٤٠١) · لا صلاحية (٤٠٣) · سرٌّ لم يُضبط (٥٠٠) · Google لا يُبلَغ (٥٠٢) ·
           انقطاعٌ بلا رمز. وجملةٌ ردّها الفحصُ (٤٠٠) تخصّ دفعتَها، فتمضي البواقي */
        if(!error.status || [401, 403, 500, 502].includes(error.status)) stop = true;
      } else {
        (data?.results || []).forEach((x, k) => {
          const t = b.sentences[k]?.text;
          if(!t) return;
          if(x.state === 'ok'){ spoken[t] = x.text; delete fixes[t]; }
          else if(x.state === 'error') errs[t] = x.error;
        });
      }
      done += b.sentences.length;
      await reload();
    }
    busy = false; progress = '';
    draw();
  }

  async function approve(todo, ok){
    const shas = [...new Set(todo.filter(r => r.clip).map(r => r.clip.sha))];
    if(busy || !shas.length) return;
    busy = true; draw();
    const { data, error } = await api.approveVoices(item.id, shas, ok);
    if(error || data?.ok === false) toast((ok ? 'تعذّر الاعتماد: ' : 'تعذّر إلغاء الاعتماد: ') + (error?.message || data?.error || ''));
    await reload();
    busy = false; draw();
  }

  function play(r){
    if(playing === r.text){ player.stop(); playing = null; draw(); return; }
    player.stop();
    playing = r.text;
    const end = () => { if(playing === r.text){ playing = null; draw(); } };
    if(!player.play(r.clip.audio, { onend: end, onerror: e => { end(); if(e !== 'interrupted') toast('تعذّر تشغيل الصوت'); } })) end();
    draw();
  }

  /* النطقُ من ملفّه في R2 — مرّةً لكلّ جملة، وتعذُّرُه يُقال ولا يُعاد (المخزنُ بلا إذنٍ للموقع ⇒ يُردّ الطلب) */
  async function readSpoken(r){
    if(spoken[r.text] !== undefined || !r.clip?.spoken) return;
    try {
      const res = await fetch(mediaUrl(r.clip.spoken));
      spoken[r.text] = res.ok ? await res.text() : false;
    } catch(e){ spoken[r.text] = false; }
    draw();
  }

  const act = {
    play, gen: r => generate([r]), approve: r => approve([r], r.state !== 'ok'),
    say: r => { open.has(r.text) ? open.delete(r.text) : open.add(r.text); draw(); if(open.has(r.text)) readSpoken(r); },
    /* بالنطق المكتوب إن كُتب (فلا يُعاد التشكيل)، وبالنبرة المكتوبة إن كُتبت — وأحدُهما يكفي */
    fix: r => {
      const t = String(fixes[r.text] ?? (typeof spoken[r.text] === 'string' ? spoken[r.text] : '')).trim();
      if(!t && !toneFor(r)){ toast('لا نطق ولا نبرة مكتوبان'); return; }
      generate([r], { spoken: t ? { [r.text]: t } : {} });
    },
    /* نبرةٌ جاهزة تملأ الحقلَ بلفظها فيُرى ما يُرسل، ولمسةٌ ثانيةٌ عليها تُفرغه */
    tone: (r, b) => {
      const t = String(tones[r.text] || '').trim() === b.dataset.tone ? '' : b.dataset.tone;
      const box = b.closest('.vp-sayb');
      tones[r.text] = box.querySelector('.vp-tone').value = t;
      pressTones(box, t);
    }
  };
  const rowOf = n => rows[+n.closest('.vp-row')?.dataset.k];
  list.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]');
    const r = b && rowOf(b);
    if(r) act[b.dataset.act]?.(r, b);
  });
  /* والصوتُ يغيّر ما تقوله النبرة (Chirp لا يأخذها) ⇒ يُعاد رسمُ مربّعها إن كان مفتوحاً، والقائمةُ في مكانها فلا يضيع موضعُها */
  list.addEventListener('change', e => {
    const s = e.target.closest('.vp-v'), r = s && rowOf(s);
    if(!r) return;
    chosen[r.text] = s.value;
    const box = s.closest('.vp-row').querySelector('.vp-sayb');
    if(box) box.outerHTML = sayBox(r);
  });
  list.addEventListener('input', e => {
    const t = e.target.closest('.vp-fix, .vp-tone'), r = t && rowOf(t);
    if(!r) return;
    if(t.classList.contains('vp-tone')){ tones[r.text] = t.value; pressTones(t.closest('.vp-sayb'), t.value); }
    else fixes[r.text] = t.value;
  });
  acts.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]');
    if(!b) return;
    if(b.dataset.act === 'missing') generate(rows.filter(r => r.state === 'none'));
    if(b.dataset.act === 'all') approve(rows.filter(r => r.state === 'made'), true);
    if(b.dataset.act === 'stop'){ stop = true; draw(); }
  });
  /* تعديلُ المربّع أو العنوان يوقف التوليدَ حتى الحفظ — ويُرسم بعد توقّف الكتابة */
  const later = () => { clearTimeout(timer); timer = setTimeout(() => { if(!busy) draw(); }, WAIT); };
  inp.addEventListener('input', later);
  title?.addEventListener('input', later);

  tell('تُقرأ أصوات النص…');
  reload().then(ok => { if(ok) tell(''); draw(); });
  return { el };
}
