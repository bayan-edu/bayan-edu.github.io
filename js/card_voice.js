/* ══════════════════════════════════════════════════════════
   بيان — card_voice.js  🔊  صوتُ وجه البطاقة في نموذجها (b216)

   حكمُ المالك (٥ نوفمبر): «يمكن بناء إضافة الصوت لشاشة تحرير البطاقات، ويتم التجربة يدويا عمليا بعدة بطاقات، ثم إذا المنتج جيد
   يتم توليد جميع البطاقات أليا». فهذا القسمُ للبطاقة الواحدة، والتوليدُ الجماعيّ بعد حكمه عليه.

   🔑 **الحفظُ هو الاعتماد** — ولا جدولَ ولا زرَّ اعتماد: الدالّةُ `tts` تضع الملفَّ في R2 وتعيد مفتاحَه، وهذا القسمُ يكتبه في حقل «مفتاح النُّطق»،
      فلا يعرفه الطالبُ حتى يُحفظ النموذج. وهو حكمُ النصوص نفسُه: «ما يسمعه الطالبُ اعتمده معلّم».
   🔑 **والبطاقةُ الجديدة تُولَّد قبل حفظها:** الملفُّ في مجلّد المجموعة لا البطاقة (`cardScope`)، فيُسمع ما كُتب الآن ثمّ يُحفظ معه.
   🔑 **والمولَّدُ يتبع نصَّ الوجه:** تغيّر الوجهُ بعده ⇒ `stale()` فيسقط عند الحفظ، ويُقال ذلك قبله — وكذلك في القاعدة لسائر المسارات (`195` ③).
   ⚠️ **والإنجليزيّةُ بلا هذا القسم:** يقرؤها جهازُ الطالب (`speak` في media.js)، والدالّةُ أصواتُها وتشكيلُها للعربيّة.
   ══════════════════════════════════════════════════════════ */
import * as realApi from './api.js';
import { esc } from './ui.js';
import { mediaUrl, clipPlayer } from './media.js';
import { VOICES, NARRATOR, isCardVoice } from './voice_rows.js';

const STATE = { none: 'بلا صوت', made: 'لم يُحفظ', ok: 'محفوظ ✔' };
const STALE = 'تغيّر الوجه بعد توليد هذا الصوت، فيسقط عند الحفظ ما لم يُعد توليده.';

/* fr حقلُ الوجه · back حقلُ المعنى · lang قائمةُ اللغة · key حقلُ مفتاح النطق · deck المجموعة · card البطاقةُ المحفوظة (أو null) ·
   api النداءاتُ (للقياس بنداءاتٍ مصنوعة) ⇒ { el, stale } — والموضعُ لمن نادى */
export function cardVoice({ fr, back, lang, key, deck, card = null, api = realApi }){
  const el = document.createElement('section');
  el.className = 'vp';
  el.setAttribute('aria-label', 'صوت الوجه');
  el.innerHTML = `<div class="vp-top"><b class="vp-h">صوت الوجه</b><span class="vp-st none"></span></div>
    <p class="vp-say">يُولَّد من نص الوجه ويُسمع هنا، ولا يسمعه الطالب حتى تُحفظ البطاقة.</p>
    <div class="vp-ctl">
      <select class="vp-v" aria-label="صوت الوجه">${Object.entries(VOICES).map(([id, x]) => `<option value="${id}"${id === NARRATOR ? ' selected' : ''}>${
        esc(x.name)} · ${esc(x.role)}${id === NARRATOR ? ' (مقترح)' : ''}</option>`).join('')}</select>
      <button type="button" class="mf-up" data-act="gen"></button>
      <button type="button" class="mf-up" data-act="play"></button>
      <button type="button" class="mf-up" data-act="del">حذف الصوت</button>
    </div>
    <p class="vp-note" aria-live="polite"></p>
    <div class="vp-sayb">
      <p class="vp-spoken"></p>
      <label class="vp-fixl" for="cvFix">تصحيح النطق: الوجه مشكولًا كما يُنطق</label>
      <input class="vp-tone" id="cvFix" type="text" dir="rtl" maxlength="4000">
      <button type="button" class="mf-up" data-act="fix">توليد بالنطق</button>
    </div>`;
  const $ = s => el.querySelector(s);
  const st = $('.vp-st'), note = $('.vp-note'), pick = $('.vp-v'), box = $('.vp-sayb'), said = $('.vp-spoken'), fix = $('#cvFix');
  const btn = a => $(`button[data-act="${a}"]`);
  const player = clipPlayer();

  const saved = card?.audio || '';
  let voiced = isCardVoice(saved) ? String(card.front || '').trim() : null;   // الوجهُ الذي وُلّد له الصوتُ الحالي
  let spoken;                                                                 // ما قرأه الصوت: نصٌّ · أو false إن تعذّرت قراءتُه · وقبلها undefined
  let busy = false, playing = false, msg = ['', ''];

  const now = () => key.value.trim();
  const stale = () => isCardVoice(now()) && voiced !== null && fr.value.trim() !== voiced;
  const stop = () => { player.stop(); playing = false; };

  function draw(){
    const k = now(), state = !k ? 'none' : k === saved ? 'ok' : 'made';
    st.className = `vp-st ${state}`;
    st.textContent = STATE[state];
    pick.disabled = btn('fix').disabled = btn('gen').disabled = busy;
    btn('gen').textContent = busy ? 'يُولَّد…' : isCardVoice(k) ? 'إعادة التوليد' : 'توليد الصوت';
    btn('play').hidden = btn('del').hidden = !k;
    btn('play').textContent = playing ? 'إيقاف' : 'استماع';
    box.hidden = !isCardVoice(k);
    /* ما قرأه الصوتُ في حقل التصحيح نفسِه — وكلمةٌ لا تحتاج سطرين يقولانها — فهذا السطرُ لما لم يُعرف منه بعد */
    said.hidden = typeof spoken === 'string';
    said.textContent = spoken === false ? 'لا يُقرأ نطق هذا الصوت من المخزن، ويظهر عند إعادة التوليد.' : 'يُقرأ النطق…';
    const [text, tone] = stale() ? [STALE, 'warn'] : msg;
    note.textContent = text;
    note.className = 'vp-note' + (tone ? ' ' + tone : '');
  }
  const tell = (text = '', tone = '') => { msg = [text, tone]; draw(); };

  /* النطقُ من ملفّه بجوار الصوت (كلوحة النصّ) — مرّةً، وتعذُّرُه يُقال ولا يُعاد */
  async function readSpoken(){
    try {
      const res = await fetch(mediaUrl(saved.replace(/\.mp3$/, '.txt')));
      spoken = res.ok ? await res.text() : false;
    } catch(e){ spoken = false; }
    if(typeof spoken === 'string' && !fix.value) fix.value = spoken;
    draw();
  }

  /* `written` نطقٌ كتبه المعلّم فيُقرأ بحرفه (`spokenFor`) — وإلّا فالوجهُ بتشكيله ووقفه. ومعنى البطاقة سياقُ تشكيلها */
  async function generate(written){
    const text = fr.value.trim();
    if(!text){ tell('يُكتب الوجه أولاً.', 'warn'); return; }
    stop();
    busy = true; tell();
    const { data, error } = await api.generateCardVoices(deck, [{ text, voice: pick.value, ...(written ? { spoken: written } : {}) }], back.value.trim());
    busy = false;
    const r = data?.results?.[0];
    if(error) tell(error.message, 'bad');
    else if(r?.state === 'held') tell(r.reason, 'warn');
    else if(r?.state !== 'ok') tell(r?.error || 'لم يُولَّد الصوت.', 'bad');
    else {
      key.value = r.audio;
      voiced = text; spoken = fix.value = r.text;
      key.dispatchEvent(new Event('input', { bubbles: true }));
      tell('استمع إليه، ثم احفظ البطاقة ليسمعه الطالب.');
    }
  }

  function play(){
    if(playing){ stop(); draw(); return; }
    stop();
    const end = () => { playing = false; draw(); };
    playing = player.play(now(), { onend: end, onerror: e => { end(); if(e !== 'interrupted') tell('تعذّر تشغيل الصوت.', 'bad'); } });
    if(!playing) tell('تعذّر تشغيل الصوت.', 'bad');
    draw();
  }

  btn('gen').onclick = () => generate();
  btn('play').onclick = play;
  btn('fix').onclick = () => {
    const t = fix.value.trim();
    if(!t){ tell('لا نطق مكتوب.', 'warn'); return; }
    generate(t);
  };
  btn('del').onclick = () => {
    stop();
    key.value = '';
    voiced = null; spoken = undefined; fix.value = '';
    key.dispatchEvent(new Event('input', { bubbles: true }));
    tell(saved ? 'يثبت حذف الصوت بحفظ البطاقة.' : '');
  };
  /* رفعُ ملفٍّ أو لصقُ مفتاحٍ يطلق `input` من الحقل (`attachUpload`) — فتتبعه الحالُ */
  key.addEventListener('input', () => { stop(); if(!isCardVoice(now())) msg = ['', '']; draw(); });
  fr.addEventListener('input', draw);

  const showLang = () => { el.hidden = (lang.value || 'ar') !== 'ar'; };
  lang.addEventListener('change', showLang);
  showLang();

  draw();
  if(isCardVoice(saved)) readSpoken();
  return { el, stale };
}
