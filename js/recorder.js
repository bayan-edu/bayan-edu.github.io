/* ══════════════════════════════════════════════════════════
   بيان — recorder.js · القراءة الجهرية  (b164 · sql/174)

   يقرأ الطالبُ نصَّ الدرس بصوته وهو يقلّب الكتاب، ثمّ يسمع قراءته
   ويرسلها. وهو أوّلُ ما يُسجَّل في المنصّة (قرارُ المالك · ٢١ أكتوبر).

   🎯 لماذا تُسمَع القراءةُ قبل إرسالها؟ — لأنّ أوّلَ مقوِّمٍ للنطق هو
      صاحبُه: من يسمع نفسَه يلتقط ما لا يلتقطه وهو يقرأ. فالمراجعةُ
      خطوةُ تعلّمٍ لا شكليّةُ واجهة، و«إعادة التسجيل» دعوةٌ إليها.

   🔒 ما وعدت به صفحةُ الخصوصية (§٢) يُنفَّذ هنا بحرفه:
      ① **لا يُطلب الميكروفون إلا بضغطة «بدء التسجيل»** — لا عند فتح
         الكتاب ولا عند فتح اللوحة. ② ويُغلَق المسارُ لحظةَ الإيقاف
         (`track.stop()`) فيختفي مؤشّرُ الميكروفون من المتصفّح.
      ③ والمسارُ في المخزن تُصدره القاعدة (`start_reading`) لا هذا الملفّ.

   📐 الوحدةُ لا تعرف المنصّة: النصوصُ (`t`) والنداءاتُ (`api`) تُمرَّر
      إليها من الجسر في student.js — فالعربيّةُ بـ`G()` هناك، وهنا لا
      نصَّ معروضاً واحداً. وما تحتها نقيٌّ يُقاس في node.
   ══════════════════════════════════════════════════════════ */

/* الأنواعُ التي يقبلها المخزن (sql/171) — بترتيب التفضيل:
   webm (كروم وإيدج) · ogg (فايرفوكس) · mp4 (سفاري) */
export const ACCEPT = ['audio/webm', 'audio/ogg', 'audio/mp4'];
const TRY = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/ogg', 'audio/mp4'];
const BITRATE = 48000;      // كلامٌ لا موسيقى: ٤٨ ك.ب/ث تكفي، وخمسُ دقائق ≈ ١٫٨ م.ب
const MIN_SEC = 2;          // أقصرُ من ثانيتين ⇒ ضغطةٌ خاطئة لا قراءة
const UPLOAD_WINDOW = 14 * 60e3;   // المسارُ يُقبل رفعُه ١٥ دقيقة (sql/171) — وهامشُ دقيقة

/* ═══════════ أدواتٌ نقيّة ═══════════ */

/** النوعُ بلا معاملاته: 'audio/webm;codecs=opus' ⇒ 'audio/webm' */
export const baseMime = m => String(m || '').split(';')[0].trim().toLowerCase();

/** أوّلُ نوعٍ يدعمه المتصفّح من TRY، أو null. `isSupported` يُمرَّر للقياس. */
export function pickMime(isSupported){
  for(const m of TRY){
    try { if(isSupported(m)) return m; } catch(e){}
  }
  return null;
}

/** أيُسجِّل هذا المتصفّح أصلاً؟ — يُسأل قبل أن يظهر الزرّ */
export function canRecord(w = globalThis){
  return !!(w?.navigator?.mediaDevices?.getUserMedia && w?.MediaRecorder
            && pickMime(m => w.MediaRecorder.isTypeSupported(m)));
}

/** ٧٥ ثانية ⇒ «1:15» — والأرقامُ تُمرَّر (هنديّةٌ في العربيّة) */
export const clock = (sec, num = String) => {
  const s = Math.max(0, Math.floor(sec));
  return num(Math.floor(s / 60)) + ':' + num(String(s % 60).padStart(2, '0'));
};

/** كم يوماً مضى على التاريخ — بالتقويم لا بالساعات («أمس» يبدأ بعد منتصف الليل) */
export function daysAgo(iso, now = new Date()){
  const d = new Date(iso);
  if(isNaN(d)) return null;
  const a = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const b = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((b - a) / 864e5));
}

/** سببُ فشل getUserMedia ⇒ مفتاحُ رسالة */
export function micError(e){
  const n = e?.name || '';
  if(n === 'NotAllowedError' || n === 'SecurityError') return 'denied';
  if(n === 'NotFoundError' || n === 'OverconstrainedError') return 'nomic';
  return 'micfail';
}

/* ═══════════ الواجهة ═══════════ */

const svg = d => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICO = {
  mic:  svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'),
  stop: svg('<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>'),
};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * يركّب القراءةَ الجهريّة: زرٌّ في شريط الكتاب، ولوحةٌ تحته.
 * @param {HTMLElement} slot  موضعُ الزرّ (ctl.slot في book.js)
 * @param {HTMLElement} sheet موضعُ اللوحة (تحت الكتاب)
 * @param {object} o
 *   itemId · t (النصوص) · num (الأرقام) · dir · privacyUrl
 *   info  — ما أعادته my_reading: { recent:[{at,deleted}], max_seconds }
 *   api   — { start(itemId, mime) ⇒ {data,error} · upload(path, blob, mime) ⇒ {error} }
 *   busy(on) — يُنادى عند بدء التسجيل وانتهائه (يُسكت صوتَ الكتاب)
 */
export function mountReading(slot, sheet, o){
  const t = o.t, num = o.num || String;
  const maxSec = Math.min(Number(o.info?.max_seconds) || 300, 600);

  let state = 'idle';          // idle · open · asking · rec · review · sending · sent · error
  let stream = null, rec = null, chunks = [], mime = null;
  let t0 = 0, timer = 0, secs = 0;
  let blob = null, url = null;
  let pending = null;          // { path, at } — مسارٌ صدر ولم يكتمل رفعُه
  let errKey = null, errText = '';
  let recent = Array.isArray(o.info?.recent) ? o.info.recent.slice() : [];

  /* ── الزرّ ── */
  slot.innerHTML = `<button type="button" class="bk-btn sm pill ra-btn" aria-pressed="false"
      aria-label="${esc(t.name)}">${ICO.mic}<span class="bk-lbl">${esc(t.name)}</span></button>`;
  const btn = slot.querySelector('button');
  btn.onclick = () => {
    if(state === 'rec') return stop();
    if(state === 'idle' || state === 'sent'){ state = 'open'; draw(); reveal(); }
    else reveal();
  };

  /* ── اللوحة ── */
  sheet.classList.add('ra');
  sheet.dir = o.dir || 'rtl';
  sheet.addEventListener('click', e => {
    const a = e.target.closest('[data-ra]')?.dataset.ra;
    if(!a) return;
    if(a === 'start') start();
    else if(a === 'stop') stop();
    else if(a === 'send') send();
    else if(a === 'again'){ discard(); start(); }
    else if(a === 'close'){ discard(); state = 'idle'; draw(); }
  });

  function reveal(){ try { sheet.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch(e){} }

  const lastLine = () => {
    const r = recent[0];
    if(!r) return '';
    const d = daysAgo(r.at);
    return d == null ? '' : `<p class="ra-last">${esc(t.last(d))}</p>`;
  };

  function draw(){
    btn.setAttribute('aria-pressed', state === 'rec' ? 'true' : 'false');
    btn.classList.toggle('rec', state === 'rec');
    btn.innerHTML = state === 'rec'
      ? `${ICO.stop}<span class="bk-lbl ra-clock" dir="ltr">${clock(secs, num)}</span>`
      : `${ICO.mic}<span class="bk-lbl">${esc(t.name)}</span>`;
    btn.setAttribute('aria-label', state === 'rec' ? t.stop : t.name);

    if(state === 'idle'){ sheet.hidden = true; sheet.innerHTML = ''; return; }
    sheet.hidden = false;
    const head = `<div class="ra-head"><b>${esc(t.name)}</b>
        <button type="button" class="ra-x" data-ra="close" aria-label="${esc(t.close)}">×</button></div>`;
    let body = '';
    if(state === 'open' || state === 'asking'){
      body = `<p>${esc(t.intro)}</p>
        <p class="ra-note">${esc(t.privacy)}
          <a href="${esc(o.privacyUrl || '/privacy.html')}" target="_blank" rel="noopener">${esc(t.privacyLink)}</a></p>
        ${lastLine()}
        <div class="ra-btns"><button type="button" class="btn primary" data-ra="start"
          ${state === 'asking' ? 'disabled' : ''}>${state === 'asking' ? '…' : esc(t.start)}</button></div>`;
    }
    else if(state === 'rec'){
      body = `<p class="ra-live"><span class="ra-dot" aria-hidden="true"></span>${esc(t.recording)}
          <span class="ra-clock" dir="ltr">${clock(secs, num)}</span></p>
        <p class="ra-note">${esc(t.turnPages)}</p>
        <div class="ra-btns"><button type="button" class="btn primary" data-ra="stop">${esc(t.stop)}</button></div>`;
    }
    else if(state === 'review' || state === 'sending'){
      body = `<p>${esc(t.review)}</p>
        <audio class="ra-audio" controls preload="metadata" src="${url}"></audio>
        <div class="ra-btns">
          <button type="button" class="btn primary" data-ra="send" ${state === 'sending' ? 'disabled' : ''}>${
            state === 'sending' ? '…' : esc(pending ? t.retry : t.send)}</button>
          <button type="button" class="btn ghost" data-ra="again" ${state === 'sending' ? 'disabled' : ''}>${esc(t.again)}</button>
        </div>`;
    }
    else if(state === 'sent'){
      body = `<p class="ra-done">${esc(t.sent)}</p>
        <div class="ra-btns"><button type="button" class="btn ghost" data-ra="close">${esc(t.close)}</button></div>`;
    }
    else if(state === 'error'){
      body = `<p class="ra-err">${esc(errKey ? t[errKey] : errText)}</p>
        <div class="ra-btns"><button type="button" class="btn ghost" data-ra="close">${esc(t.close)}</button></div>`;
    }
    sheet.innerHTML = `<div class="ra-in" aria-live="polite">${head}${body}</div>`;
  }

  /* ── التسجيل ── */
  async function start(){
    discard();
    state = 'asking'; draw();
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch(e){
      stream = null; errKey = micError(e); state = 'error'; draw(); return;
    }
    if(!slot.isConnected){ release(); return; }      // غادر الكتابَ وهو ينتظر الإذن

    const want = pickMime(m => MediaRecorder.isTypeSupported(m));
    try { rec = new MediaRecorder(stream, { mimeType: want, audioBitsPerSecond: BITRATE }); }
    catch(e){ rec = new MediaRecorder(stream); }
    mime = baseMime(rec.mimeType || want);
    chunks = [];
    rec.ondataavailable = e => { if(e.data?.size) chunks.push(e.data); };
    rec.onstop = finish;
    rec.start(1000);
    t0 = performance.now(); secs = 0;
    o.busy?.(true);
    state = 'rec'; draw();
    timer = setInterval(tick, 250);
  }

  function tick(){
    if(!slot.isConnected){ cancel(); return; }       // غادر الكتابَ وهو يسجّل ⇒ لا يبقى الميكروفون
    const s = (performance.now() - t0) / 1000;
    if(Math.floor(s) !== Math.floor(secs)){
      secs = s;
      const c = clock(secs, num);
      btn.querySelector('.ra-clock')?.replaceChildren(c);
      sheet.querySelector('.ra-clock')?.replaceChildren(c);
    }
    secs = s;
    if(secs >= maxSec) stop(true);
  }

  function stop(hitMax){
    if(state !== 'rec' || !rec) return;
    clearInterval(timer); timer = 0;
    secs = (performance.now() - t0) / 1000;
    if(hitMax) o.toast?.(t.max);
    try { rec.stop(); } catch(e){ finish(); }
  }

  function finish(){
    release();
    o.busy?.(false);
    if(!slot.isConnected) return;
    if(secs < MIN_SEC || !chunks.length){ errKey = 'short'; state = 'error'; draw(); return; }
    blob = new Blob(chunks, { type: mime });
    chunks = [];
    url = URL.createObjectURL(blob);
    pending = null;
    state = 'review'; draw(); reveal();
  }

  /** يُغلق الميكروفون — فيختفي مؤشّرُه من المتصفّح فوراً */
  function release(){
    stream?.getTracks().forEach(tr => { try { tr.stop(); } catch(e){} });
    stream = null;
  }

  function cancel(){
    clearInterval(timer); timer = 0;
    if(rec){ rec.onstop = null; try { rec.stop(); } catch(e){} }
    rec = null; chunks = [];
    release();
    o.busy?.(false);
  }

  function discard(){
    if(url){ URL.revokeObjectURL(url); url = null; }
    blob = null; pending = null; errKey = null; errText = '';
  }

  /* ── الإرسال: مسارٌ من القاعدة ثمّ رفعٌ إليه ── */
  async function send(){
    if(!blob || state === 'sending') return;
    if(!ACCEPT.includes(mime)){ errText = t.badType; errKey = null; state = 'error'; draw(); return; }
    state = 'sending'; draw();

    /* مسارٌ صدر ولم يُرفع إليه (فشلٌ سابق) يُعاد استعمالُه ما دام في نافذته —
       فإعادةُ المحاولة لا تأكل من حدّ اليوم (٥). */
    if(!pending || Date.now() - pending.at > UPLOAD_WINDOW){
      const { data, error } = await o.api.start(o.itemId, mime);
      if(error || !data?.ok){ return failed(data?.error || error?.message || ''); }
      if(blob.size > (data.max_bytes || Infinity)){ return failed(t.tooBig); }
      pending = { path: data.path, at: Date.now() };
    }
    const { error: e2 } = await o.api.upload(pending.path, blob, mime);
    if(e2) return failed(e2.message || '');

    recent.unshift({ at: new Date().toISOString(), deleted: false });
    discard();
    state = 'sent'; draw();
  }

  function failed(msg){
    o.toast?.(t.fail + (msg ? ' — ' + msg : ''));
    state = 'review'; draw();
  }

  draw();
  return { get state(){ return state; }, stop: cancel };
}
