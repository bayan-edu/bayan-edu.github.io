/* ══════════════════════════════════════════════════════════
   بيان — editor_banks.js  ③  بنوك المادة وتركيب النموذج (185)

   البنكُ اختبارٌ بدور: يُحرَّر بمحرّر الاختبار نفسِه (`openBank` في editor_quiz.js)،
   ولا يُنشر ولا يُربط بدرس — والقاعدةُ تحرس الثلاثة لا هذه الشاشة. وهو للمادّة لا
   للمقرَّر: يخدم مقرَّراتها كلَّها، فبابُه بين أبواب المادّة جوارَ فروعها وأهدافها.

   والنموذجُ اختبارٌ في درسٍ كأيّ اختبار، لا أسئلةَ له من عنده: سطورُه خاناتٌ من بنوك
   المادّة، وهذه شاشةُ تركيبه (spec §٤):
     ① بنكٌ ⇐ ② خاناتٌ تُصفّى بالفرع والهدف والصعوبة ⇐ ③ ترتيبٌ وأقسام ⇐
     ④ عدّادُ كلّ فرعٍ أمام الوزن الرسميّ لشعبة المقرَّر.
     ⑤ 🆕 b209 · أو **تركيبٌ تلقائيّ** يقترح السطورَ بالعدد والصعوبة والفروع، مسودّةً تُحرَّر
        بـ①–③ ثمّ تُحفظ كما تُحفظ اليدويّة (طلبُ المالك · ٢٩ أكتوبر) — والتعليلُ عند `autoCompose`.

   🔑 والسطرُ يشير إلى الخانة لا إلى سؤالها: الصيغةُ تُختار لكلّ طالبٍ ببذرته، والسؤالُ
      المتقاعد يرثه وريثُه في خانته — فيبلغ النماذجَ كلَّها بلا لمسةٍ هنا.
   🔑 والسطورُ تُحفظ دفعةً واحدة (`save_form_slots`): الترتيبُ والأقسامُ نداءٌ واحد لا
      أبوابٌ متفرّقة، والنموذجُ المنشور لا يُترك غيرَ جاهز — القاعدةُ تردّ السطورَ كلَّها.
   ⚠️ والعدّادُ يعدّ السطور لا الدرجات: سطرٌ سؤالٌ واحد عند الطالب. والأوزانُ صفوفُ
      `stream_weights`، وتُكتب في الخطوة ٤ — فقبلها يقول العدّادُ نسبَ النموذج وحده.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, toast, esc, escA, AR, errBox, nav, setWide, scrollTop, N } from './ui.js';
import { openCourse } from './editor.js';
import { openBank, openQuizPreview, quizSettings } from './editor_quiz.js';
import { openBankImport } from './editor_import.js';
import { strandsOf } from './editor_strands.js';
import { KIND_LABEL } from './render_q.js';

/* الصعوبةُ ثلاثٌ في القاعدة (قِيس: سهل ٥٨٠ · متوسط ٢٦٤٢ · صعب ١١٥٢) — ولا تسميةَ لها في الواجهة قبل هذه */
const DIFF = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' };

const variantsChip = n => `<span class="chip${n > 1 ? ' g' : ''}">${
  n > 1 ? N(n, 'صيغة', 'صيغتان', 'صيغ', 'صيغة') : 'صيغة واحدة'}</span>`;

const kindChips = x => `
  ${x.kind ? `<span class="chip">${esc(KIND_LABEL[x.kind] || x.kind)}</span>` : ''}
  ${x.difficulty ? `<span class="chip">${esc(DIFF[x.difficulty] || x.difficulty)}</span>` : ''}`;


/* ═══════════ ① بنوك المادة ═══════════ */

export async function openBanks(course, subject){
  nav('editor'); setWide(true);
  head("بنوك المادة", subject?.name || course.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  const { data, error } = await api.subjectBanks(subject.id);
  const banks = data?.ok ? data.banks || [] : [];
  const err = error || (data && !data.ok ? { message: data.error } : null);

  /* ⛔ ومن لا يملك البنكَ يراه ولا يفتحه — والصفُّ المغلق يُرى (`.ro`) كصفّ «مصادر فقط» */
  const row = b => `<div class="ed-row${b.curate ? '' : ' ro'}"${b.curate ? ` data-bk="${b.id}"` : ''}>
      <div style="flex:1;min-width:0">
        <div class="ed-t" dir="auto">${esc(b.title)}</div>
        <div class="ed-m">
          <span class="chip">${N(b.slots, 'خانة', 'خانتان', 'خانات', 'خانة')}</span>
          <span class="chip">${N(b.questions, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}</span>
          ${b.passages ? `<span class="chip">${N(b.passages, 'نصّ', 'نصّان', 'نصوص', 'نصّاً')}</span>` : ''}
          ${b.forms ? `<span class="chip g">يسحب منه ${N(b.forms, 'نموذج', 'نموذجان', 'نماذج', 'نموذجاً')}</span>`
                    : `<span class="chip">لم يسحب منه نموذج بعد</span>`}
        </div>
      </div>
      ${b.curate ? '<div class="qz-go">تحرير ←</div>' : ''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">→ دروس المقرَّر</div>
    ${errBox(err, 'بنوك المادة')}

    <div class="ed-hint">البنك للمادة كلّها لا لمقرَّر: تُكتب أسئلته مرّة، ويسحب منه كلّ نموذج
      ما يحتاج. ولا يراه الطالب إلا داخل نموذج.</div>

    <div class="grp">البنوك <span class="chip">${AR(banks.length)}</span></div>
    ${banks.length ? banks.map(row).join('') : '<div class="ed-empty">لا بنوك بعد</div>'}

    ${/* 🆕 b208 · والاستيرادُ بابٌ ثانٍ إلى البنك (192): ملفٌّ يُضيف إلى بنكٍ بعنوانه أو يُنشئه — ويعود إلى هنا */''}
    <div class="nav" style="margin-top:12px">
      <button class="btn ghost" id="bkImp">⇪ استيراد أسئلة من ملفّ</button>
    </div>

    <div class="card" style="margin-top:18px">
      <div class="grp" style="margin-top:0">بنك جديد</div>
      <label class="fl">العنوان *</label>
      <input type="text" id="bkT" dir="auto" placeholder="مثال: بنك الاستيعاب المقروء">
      <p class="small">بنك لكلّ فرع أوضح من بنك واحد كبير: النموذج يسحب من كلّ فرع ما يوافق وزنه.</p>
      <div class="nav" style="margin-top:14px">
        <button class="btn primary" id="bkNew">إنشاء البنك</button>
      </div>
    </div>`;

  document.getElementById("bk").onclick = () => openCourse(course);
  document.getElementById("bkImp").onclick = () =>
    openBankImport(course, { label: 'بنوك المادة', go: () => openBanks(course, subject) });
  app.querySelectorAll("[data-bk]").forEach(el =>
    el.onclick = () => openBank(course, subject, Number(el.dataset.bk)));
  document.getElementById("bkNew").onclick = async e => {
    const b = e.currentTarget;
    const title = document.getElementById("bkT").value.trim();
    if(!title){ toast("عنوان البنك مطلوب"); return; }
    b.disabled = true;
    const { data, error } = await api.createBank({ subject: subject.id, title });
    if(error || !data?.ok){ b.disabled = false; toast(error?.message || data?.error); return; }
    toast("أُنشئ البنك");
    openBank(course, subject, data.id);
  };
  scrollTop();
}


/* ═══════════ ② تركيب النموذج ═══════════ */

let F = null;              // { course, lesson, z, rows, dirty, banks, bankErr, strands, bank, f, ac }
const SLOTS = new Map();   // خاناتُ كلّ بنك — تُجلب مرّةً للشاشة، وتُبطَل حين يتغيّر عدُّ نماذجها

/* يناديها `load` في editor_quiz.js حين يكون اختبارُ الدرس نموذجاً — و`z` حمولةُ `quiz_for_edit` */
export async function openForm(course, lesson, z){
  nav('editor'); setWide(true);
  head("تركيب النموذج");
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  SLOTS.clear();

  const [bk, strands] = await Promise.all([
    api.subjectBanks(course.subject_id), strandsOf(course.subject_id)]);
  const banks = bk.data?.ok ? bk.data.banks || [] : [];
  F = { course, lesson, z, rows: rowsOf(z), dirty: false, banks, strands,
        bankErr: bk.error?.message || (bk.data && !bk.data.ok ? bk.data.error : null),
        bank: banks[0]?.id ?? null, f: { strand: '', obj: '', diff: '' },
        /* ⑤ مدخلاتُ التركيب — تبقى ما بقيت الشاشة. `banks: null` كلُّها · `off` فروعٌ مستثناة ·
           `base` لقطةُ السطور ساعةَ «تركيب»، ومنها يبدأ «تركيبٌ آخر» */
        ac: { open: false, n: 20, dist: (z.weights || []).length ? 'w' : 'eq', banks: null, off: [],
              diff: { easy: 30, medium: 50, hard: 20 }, any: false, mode: 'fill', base: null, report: null } };
  if(F.bank != null) await loadSlots(F.bank);
  render();
  scrollTop();
}

const rowsOf = z => (z.rows || []).map(r => ({
  bank: r.bank_id, bankTitle: r.bank, slot: r.slot, section: r.section || '',
  kind: r.kind, difficulty: r.difficulty, sample: r.sample, objective_id: r.objective_id,
  strand_id: r.strand_id, variants: r.variants, passage_id: r.passage_id }));

async function loadSlots(id){
  const k = String(id);
  if(SLOTS.has(k)) return SLOTS.get(k);
  const { data, error } = await api.bankSlots(id);
  const v = data?.ok ? { list: data.slots || [] }
                     : { list: [], error: error?.message || data?.error || 'تعذّر تحميل الخانات' };
  SLOTS.set(k, v);
  return v;
}

const strandName = id => F.strands.find(x => String(x.id) === String(id))?.name;

function render(){
  const z = F.z, r = z.readiness || {};
  const n = F.rows.length;
  const pub = !!z.published, live = pub && !!F.lesson?.published;
  const s = !pub  ? { c:'draft', t:'مسودّة — لا يظهر لأحد' }
          : live  ? { c:'live',  t:'منشور ويصل الطلاب' }
                  : { c:'half',  t:'منشور — والدرس مسودّة' };

  app.innerHTML = `
    <div class="eq-sc">
      <div class="eq-tb">
        <button class="eq-back" id="fmBack" title="رجوع">
          <span class="eq-back-a">→</span>
          <span class="eq-back-t" dir="auto">${esc(F.lesson?.title || 'دروس المقرَّر')}</span>
        </button>
        <div class="eq-kinds"><span class="chip">${
          !n ? 'لا سطور بعد' : n === 1 ? 'سطر واحد' : N(n, 'سطر', 'سطران', 'سطور', 'سطراً')}</span></div>
        <span class="eq-state ${s.c}">${s.t}</span>
        <div class="eq-acts">
          <button class="eq-tbb" id="fmSet"><span class="eq-i">⚙</span> الإعدادات</button>
          <button class="eq-tbb" id="fmPrev" title="عِش تجربة الطالب"><span class="eq-i">👁</span> معاينة</button>
          <button class="eq-tbb" id="fmSave">حفظ السطور</button>
          <button class="eq-tbb" id="fmPub">${pub ? 'إلغاء النشر' : 'نشر النموذج'}</button>
        </div>
      </div>
      ${issues(r)}
      <div class="fm">
        <section class="fm-main">${rowsPanel()}</section>
        <aside class="fm-side">${weightsPanel()}${autoPanel()}${pickPanel()}</aside>
      </div>
    </div>`;

  paintBar();
  wire();
}

/* حالُ الأزرار من حال السطور — بلا رسمٍ للصفحة: كتابةُ القسم حرفاً حرفاً لا تُعيد بناء ما حولها */
function paintBar(){
  const $ = id => document.getElementById(id);
  const pub = !!F.z.published, ready = !!F.z.readiness?.ok;
  const sv = $("fmSave"), pv = $("fmPrev"), pb = $("fmPub");
  if(sv){ sv.disabled = !F.dirty; sv.classList.toggle('go', F.dirty); }
  if(pv){ pv.disabled = F.dirty || !F.rows.length;
          pv.title = F.dirty ? 'تُحفظ السطور أولاً' : 'عِش تجربة الطالب'; }
  if(pb && !pub){
    pb.disabled = F.dirty || !ready;
    pb.classList.toggle('go', !F.dirty && ready);
    pb.title = F.dirty ? 'تُحفظ السطور أولاً' : ready ? '' : 'لا يُنشر قبل أن تكتمل الجاهزية';
  }
}

/* ما يحول دون الاكتمال — من `quiz_readiness` بعد الحفظ، فالمحرَّرُ غيرُ المحفوظ يُقال قبلها */
function issues(r){
  const out = (r.issues || []).map(esc);
  if(F.dirty) out.unshift('في السطور تغييرات لم تُحفظ — والجاهزية تُقرأ بعد الحفظ.');
  if(!out.length) return '';
  return `<div class="eq-warns">
    <div class="eq-warns-h">⚠️ ما يحول دون اكتمال النموذج</div>
    <ul>${out.map(x => `<li>${x}</li>`).join('')}</ul>
  </div>`;
}

/* ③ السطورُ بترتيبها وأقسامها — والقسمُ يتبع السطرَ الذي قبله عند الإضافة، فما يُضاف تباعاً
   يسكن قسمَه بلا كتابة */
function rowsPanel(){
  const row = (x, i) => `<div class="fm-row">
      <div class="fm-n">${AR(i + 1)}</div>
      <div class="fm-b">
        <div class="fm-s" dir="auto">${esc(x.sample || '—')}</div>
        <div class="ed-m">
          <span class="chip"><bdi>${esc(x.bankTitle || '')}</bdi></span>
          ${kindChips(x)}
          ${strandName(x.strand_id) ? `<span class="chip">🌿 <bdi>${esc(strandName(x.strand_id))}</bdi></span>` : ''}
          ${variantsChip(x.variants)}
          ${x.passage_id ? '<span class="chip">بنصّ مشترك</span>' : ''}
        </div>
        <input class="fm-sec" data-sec="${i}" dir="auto" value="${escA(x.section || '')}"
               placeholder="القسم" aria-label="قسم السطر ${AR(i + 1)}">
      </div>
      <div class="fm-acts">
        <button type="button" class="btn ghost" data-up="${i}" ${i ? '' : 'disabled'} aria-label="تقديم السطر">↑</button>
        <button type="button" class="btn ghost" data-dn="${i}" ${i < F.rows.length - 1 ? '' : 'disabled'} aria-label="تأخير السطر">↓</button>
        <button type="button" class="btn ghost" data-rm="${i}">إزالة</button>
      </div>
    </div>`;

  return `<div class="grp" style="margin-top:0">سطور النموذج <span class="chip">${AR(F.rows.length)}</span></div>
    ${F.rows.length ? F.rows.map(row).join('')
                    : '<div class="ed-empty">لا سطور بعد — تُضاف من بنوك المادة.</div>'}`;
}

/* ④ العدّاد — «الحساب: الرسمي ٢٣٪ · نموذجك ٢١٪» (spec §٤). والفرعُ من هدف الصيغة الأولى في خانته.
   🔑 والبعيدُ عن وزنه بخمسِ نقاطٍ فأكثر كهرمانيّ: فرقُ نقطةٍ أو نقطتين حتميٌّ في نموذجٍ قصير،
      وتلوينُه إنذارٌ لا يُنتهى منه فيُتجاهل. */
function weightsPanel(){
  const n = F.rows.length;
  const W = F.z.weights || [];
  const by = new Map();
  F.rows.forEach(x => { const k = String(x.strand_id ?? ''); by.set(k, (by.get(k) || 0) + 1); });
  const pct = c => n ? Math.round(c * 100 / n) : 0;

  const line = (name, mine, off) => `<div class="fm-w${off != null && Math.abs(mine - off) >= 5 ? ' far' : ''}">
      <span class="fm-wn"><bdi>${esc(name)}</bdi></span>
      <span>${off != null ? `الرسمي ${AR(off)}٪ · ` : ''}نموذجك ${AR(mine)}٪</span>
    </div>`;

  /* الشعبُ واحدةٌ في الغالب — ونموذجٌ في وحدةٍ مستعارة (184) قد يقرأ وزنَ شعبتين، فلكلٍّ عنوانُها */
  const streams = [...new Map(W.map(w => [String(w.stream_id), w.stream])).entries()];
  const official = streams.map(([sid, sname]) => {
    const ws = W.filter(w => String(w.stream_id) === sid);
    return `${streams.length > 1 ? `<div class="fm-wh"><bdi>${esc(sname)}</bdi></div>` : ''}
      ${ws.map(w => line(w.strand, pct(by.get(String(w.strand_id)) || 0), Math.round(Number(w.pct)))).join('')}`;
  }).join('');
  const extra = [...by.keys()].filter(k => k && !W.some(w => String(w.strand_id) === k))
    .map(k => line(strandName(k) || '—', pct(by.get(k)), null)).join('');
  const none = by.get('') ? line('بلا فرع', pct(by.get('')), null) : '';

  return `<div class="card fm-wt">
    <div class="grp" style="margin-top:0">الفروع أمام الوزن الرسمي</div>
    ${n ? official + extra + none : '<div class="ed-empty">يظهر العدّاد مع أوّل سطر.</div>'}
    ${W.length ? '' : '<p class="small">لا وزن رسمياً لشعبة هذا المقرَّر بعد — فالنسب لنموذجك وحده.</p>'}
  </div>`;
}

/* ═══ ⑤ 🆕 b209 · التركيبُ التلقائيّ ═══
   يقترح السطورَ من بنوك المادّة بالعدد والصعوبة والفروع، **مسودّةً لا حفظاً**: تُحرَّر بالأدوات نفسِها
   ثمّ «حفظ السطور» — فالقاعدةُ لا تعرف من أين جاء السطر، و`save_form_slots` تحرسه كما تحرس اليدويّ.
   🔑 **حصّةُ كلّ فرعٍ من وزنه** (أو بالتساوي)، بالباقي الأكبر حتى يبلغ المجموعُ العددَ حرفاً — تقريبُ كلِّ
      حصّةٍ وحدها يُنقص سطراً أو يزيده.
   🔑 **وأسئلةُ النصّ الواحد وحدةٌ لا تُقطع** (`group` من bank_slots: مجموعةُ النصوص أو النصُّ نفسُه) —
      تُؤخذ معاً متتاليةً وتُحسب كلُّها من حصّة فرعها. ونصٌّ أكبرُ من الباقي لا يُؤخذ ليُبتر.
   🔑 **وما لم يسحبه نموذجٌ أوّلاً** (`forms`)، ثمّ الأقلُّ سحباً — فتختلف النماذجُ ما أمكن. والاختيارُ بعدها عشوائيّ.
   ⚠️ **والنقصُ يُقال ولا يُسدّ من فرعٍ آخر:** فرعٌ لا يكفيه بنكُه يُذكر بما طُلب وما وُجد، وصعوبةٌ نفدت يُؤخذ
      أقربُها ويُعدّ «بديلاً» — فلا يُخدع العدّادُ بنموذجٍ تمّ عددُه وفسد توزيعُه. */

/* الباقي الأكبر: أعدادٌ صحيحةٌ بنسب `ws` مجموعُها `n` حرفاً */
function split(n, ws){
  const sum = ws.reduce((s, w) => s + (Number(w) || 0), 0);
  if(!(sum > 0) || !(n > 0)) return ws.map(() => 0);
  const raw = ws.map(w => n * (Number(w) || 0) / sum);
  const out = raw.map(Math.floor);
  let left = n - out.reduce((s, v) => s + v, 0);
  raw.map((v, i) => [v - out[i], i]).sort((a, b) => b[0] - a[0])
     .forEach(([, i]) => { if(left > 0){ out[i]++; left--; } });
  return out;
}

/* أوزانُ الشعبة الأولى — نموذجٌ في وحدةٍ مستعارة قد يقرأ شعبتين، والعدّادُ يعرضهما، والتركيبُ يتبع أولاهما */
function streamWeights(){
  const W = F.z.weights || [];
  const sid = W.length ? String(W[0].stream_id) : null;
  return W.filter(w => String(w.stream_id) === sid)
          .map(w => ({ id: String(w.strand_id), name: w.strand, pct: Number(w.pct) || 0, stream: w.stream }));
}

const DK = ['easy', 'medium', 'hard'];

function autoPanel(){
  if(F.bankErr || !F.banks.length) return '';
  const A = F.ac, W = streamWeights();
  const byW = A.dist === 'w' && W.length;
  const scope = byW ? W : F.strands.map(s => ({ id: String(s.id), name: s.name }));
  const off = new Set(A.off);
  const chk = (attr, v, on, label) => `<label><input type="checkbox" ${attr}="${escA(v)}"${on ? ' checked' : ''}>
      <bdi>${esc(label)}</bdi></label>`;
  const R = A.report;

  return `<details class="card fm-auto" id="acBox"${A.open ? ' open' : ''}>
    <summary class="grp" style="margin:0">تركيب تلقائي</summary>
    <p class="small">يقترح السطور من البنوك بالعدد والصعوبة والفروع — ثمّ تُحرَّر يدوياً وتُحفظ.</p>

    <label class="fl" for="acN">عدد الأسئلة</label>
    <input type="number" id="acN" min="1" max="300" value="${escA(A.n)}">

    <label class="fl" for="acDist">التوزيع على الفروع</label>
    <select id="acDist">
      ${W.length ? `<option value="w"${byW ? ' selected' : ''}>بأوزان الهيئة${
        W[0].stream ? ' — ' + esc(W[0].stream) : ''}</option>` : ''}
      <option value="eq"${byW ? '' : ' selected'}>بالتساوي بين الفروع</option>
    </select>
    <div class="fm-ac-ch">${scope.map(s => chk('data-acs', s.id, !off.has(s.id),
      byW ? `${s.name} ${AR(Math.round(s.pct))}٪` : s.name)).join('')}</div>

    ${F.banks.length > 1 ? `<label class="fl">البنوك</label>
      <div class="fm-ac-ch">${F.banks.map(b => chk('data-acb', String(b.id),
        !A.banks || A.banks.includes(String(b.id)), b.title)).join('')}</div>` : ''}

    <label class="fl">الصعوبة ٪</label>
    <div class="fm-ac-d">${DK.map((d, i) => `<label>${DIFF[d]}
      <input type="number" id="acD${i}" min="0" max="100" value="${escA(A.diff[d])}"${A.any ? ' disabled' : ''}></label>`).join('')}</div>
    <div class="fm-ac-ch"><label><input type="checkbox" id="acAny"${A.any ? ' checked' : ''}> بلا قيد للصعوبة</label></div>

    ${F.rows.length ? `<label class="fl">السطور القائمة</label>
      <div class="fm-ac-ch">
        <label><input type="radio" name="acMode" value="fill"${A.mode !== 'new' ? ' checked' : ''}> إكمالها إلى العدد</label>
        <label><input type="radio" name="acMode" value="new"${A.mode === 'new' ? ' checked' : ''}> تركيب من جديد</label>
      </div>` : ''}

    <div class="nav" style="margin-top:12px">
      <button type="button" class="btn primary" id="acGo">تركيب</button>
      ${R ? '<button type="button" class="btn ghost" id="acRe">تركيب آخر</button>' : ''}
    </div>
    ${R ? reportBox(R) : ''}
  </details>`;
}

/* ما تحقّق وما نقص — بالأرقام، والنقصُ بلون التنبيه */
function reportBox(R){
  if(R.full) return `<div class="fm-ac-r">النموذج بلغ العدد المطلوب — لا سطر يُضاف.</div>`;
  return `<div class="fm-ac-r">
    <div><b>رُكّب ${N(R.added, 'سطر', 'سطران', 'سطور', 'سطراً')}</b>${R.base
      ? ` بعد ${N(R.base, 'سطر قائم', 'سطرين قائمين', 'سطور قائمة', 'سطراً قائماً')}` : ''} — والسطور مسودّة:
      تُحرَّر ثمّ «حفظ السطور».</div>
    <div>الصعوبة: ${DK.map(d => `${DIFF[d]} ${AR(R.d[d] || 0)}`).join(' · ')}${R.fallback
      ? ` · ${N(R.fallback, 'سطر', 'سطران', 'سطور', 'سطراً')} من صعوبة أقرب بعد نفاد المطلوبة` : ''}</div>
    <div>لم يسحبها نموذج قبل: ${AR(R.fresh)} من ${AR(R.added)}</div>
    ${R.short.length ? `<div class="eq-iss">⚠️ نقص في البنوك — ${R.short.map(s =>
      `<bdi>${esc(s.name)}</bdi>: طُلب ${AR(s.want)} ووُجد ${AR(s.got)}`).join(' · ')}</div>` : ''}
  </div>`;
}

/* 🔑 والمدخلاتُ تُقرأ من F.ac لا من الشاشة: الرسمُ يُعاد بعد التركيب، وما كُتب باقٍ */
async function autoCompose(again){
  const A = F.ac;
  const n = Math.floor(Number(A.n));
  if(!(n > 0)){ toast('عدد الأسئلة مطلوب'); return; }
  const banks = F.banks.filter(b => !A.banks || A.banks.includes(String(b.id)));
  if(!banks.length){ toast('لا بنك مختاراً'); return; }

  /* «تركيبٌ آخر» يبدأ من اللقطة نفسِها — لا من مقترحٍ سبقه */
  if(!again || !A.base) A.base = A.mode === 'new' ? [] : F.rows.slice();
  const base = A.base;
  if(base.length >= n){ A.report = { full: true }; A.open = true; render(); return; }

  const go = document.getElementById("acGo");
  if(go) go.disabled = true;
  for(const b of banks) await loadSlots(b.id);

  /* الوحدات: خانةٌ وحدها، أو خاناتُ النصّ الواحد معاً بترتيبها في البنك */
  const taken = new Set(base.map(x => x.bank + ':' + x.slot));
  const units = [];
  banks.forEach((b, bi) => {
    const groups = new Map();
    (SLOTS.get(String(b.id))?.list || [])
      .filter(x => !taken.has(b.id + ':' + x.slot))
      .forEach(x => {
        const k = x.group ? 'g:' + x.group : 's:' + x.slot;
        if(!groups.has(k)) groups.set(k, []);
        groups.get(k).push(x);
      });
    groups.forEach(xs => {
      xs.sort((p, q) => p.position - q.position);
      units.push({ b, bi, xs, size: xs.length, strand: String(xs[0].strand_id ?? ''), pos: xs[0].position,
                   uses: xs.reduce((s, x) => s + (Number(x.forms) || 0), 0), r: Math.random() });
    });
  });

  /* النطاق والحصص: الوزنُ (أو التساوي بين ما له خانات)، ثمّ يُطرح ما في السطور القائمة من كلّ فرع */
  const W = streamWeights(), off = new Set(A.off);
  const scope = (A.dist === 'w' && W.length)
    ? W.filter(s => !off.has(s.id))
    : F.strands.map(s => ({ id: String(s.id), name: s.name, pct: 1 }))
        .filter(s => !off.has(s.id) && units.some(u => u.strand === s.id));
  if(!scope.length){ if(go) go.disabled = false; toast('لا فرع في النطاق'); return; }

  const target = split(n, scope.map(s => s.pct));
  const have = new Map();
  base.forEach(x => { const k = String(x.strand_id ?? ''); have.set(k, (have.get(k) || 0) + 1); });
  let need = scope.map((s, i) => Math.max(0, target[i] - (have.get(s.id) || 0)));
  const room = n - base.length;
  if(need.reduce((s, v) => s + v, 0) > room) need = split(room, need);

  /* 🔑 الصعوبةُ تُحسب للنموذج كلِّه لا لكلّ فرع: فرعٌ حصّتُه سطرٌ أو سطران يُقرَّب «متوسطاً» دائماً، فتنقلب
     النسبُ في نموذجٍ أكثرُ فروعه صغيرة (قِيس: إكمالُ أربعة سطور جاء متوسطاً كلُّه). فلكلّ فرعٍ من الصعوبة
     بقدر ما بقي منها في النموذج — والباقي يُنقص بما أُخذ فعلاً، ومنه النصوصُ بصعوباتها */
  const dw = DK.map(d => Math.max(0, Number(A.diff[d]) || 0));
  const useDiff = !A.any && dw.some(v => v > 0);
  const gs = useDiff ? split(need.reduce((s, v) => s + v, 0), dw) : null;
  const gleft = gs ? Object.fromEntries(DK.map((d, j) => [d, gs[j]])) : null;
  const picked = [], R = { base: base.length, added: 0, d: {}, fallback: 0, fresh: 0, short: [] };

  scope.forEach((s, i) => {
    let left = need[i];
    const ds = gleft ? split(left, DK.map(d => gleft[d])) : null;
    const want = ds ? Object.fromEntries(DK.map((d, j) => [d, ds[j]])) : null;
    const cand = units.filter(u => u.strand === s.id && !u.used)
      .sort((p, q) => (p.uses > 0) - (q.uses > 0) || p.uses - q.uses || p.r - q.r);
    const take = u => {
      u.used = true; picked.push(u); left -= u.size;
      if(want) u.xs.forEach(x => {
        if(want[x.difficulty] > 0) want[x.difficulty]--;
        if(gleft[x.difficulty] > 0) gleft[x.difficulty]--;
      });
    };
    /* النصوصُ أوّلاً — وحداتٌ كبيرة لا تُقسم، ثمّ المفردةُ بالصعوبة المطلوبة، ثمّ أقربُها */
    cand.filter(u => u.size > 1).forEach(u => { if(u.size <= left) take(u); });
    const singles = cand.filter(u => u.size === 1);
    if(want) singles.forEach(u => { if(left > 0 && !u.used && want[u.xs[0].difficulty] > 0) take(u); });
    const most = want ? DK.reduce((m, d) => (want[d] > want[m] ? d : m), 'medium') : 'medium';
    singles.filter(u => !u.used)
      .sort((p, q) => Math.abs(DK.indexOf(p.xs[0].difficulty) - DK.indexOf(most))
                    - Math.abs(DK.indexOf(q.xs[0].difficulty) - DK.indexOf(most)))
      .forEach(u => { if(left > 0 && !u.used){ if(want) R.fallback++; take(u); } });
    if(left > 0) R.short.push({ name: s.name, want: need[i], got: need[i] - left });
  });

  /* الترتيب: القسمُ بأوّل ظهوره في البنوك، ثمّ الفرعُ بترتيب النطاق، والنصُّ متّصلٌ بأسئلته */
  const secRank = new Map();
  banks.forEach(b => (SLOTS.get(String(b.id))?.list || []).slice()
    .sort((p, q) => p.position - q.position)
    .forEach(x => { const k = x.section || ''; if(k && !secRank.has(k)) secRank.set(k, secRank.size); }));
  const rank = u => secRank.has(u.xs[0].section || '') ? secRank.get(u.xs[0].section || '') : secRank.size;
  const stRank = new Map(scope.map((s, i) => [s.id, i]));
  picked.sort((p, q) => rank(p) - rank(q) || stRank.get(p.strand) - stRank.get(q.strand)
                     || p.bi - q.bi || p.pos - q.pos);

  const rows = picked.flatMap(u => u.xs.map(x => ({
    bank: Number(u.b.id), bankTitle: u.b.title, slot: x.slot, section: x.section || '',
    kind: x.kind, difficulty: x.difficulty, sample: x.sample, objective_id: x.objective_id,
    strand_id: x.strand_id, variants: x.variants, passage_id: x.passage_id })));
  rows.forEach(x => { R.d[x.difficulty] = (R.d[x.difficulty] || 0) + 1; });
  R.added = rows.length;
  R.fresh = picked.reduce((s, u) => s + u.xs.filter(x => !Number(x.forms)).length, 0);

  F.rows = base.concat(rows);
  F.dirty = true;
  A.report = R; A.open = true;
  render();
}

/* ① + ② الإضافةُ من بنك: الخاناتُ بصيغتها الأولى عيّنةً، تُصفّى بالفرع والهدف والصعوبة — والمصفاةُ
   تُبنى ممّا في البنك لا من قوائم المادّة كلِّها، فلا يُختار فرعٌ لا خانةَ فيه */
function pickPanel(){
  if(F.bankErr) return errBox({ message: F.bankErr }, 'بنوك المادة');
  if(!F.banks.length) return `<div class="card">
      <div class="grp" style="margin-top:0">الإضافة من بنك</div>
      <div class="ed-empty">لا بنوك في هذه المادة بعد — تُنشأ من «بنوك المادة» في دروس المقرَّر.</div>
    </div>`;

  const S = SLOTS.get(String(F.bank)) || { list: [] };
  const inForm = new Set(F.rows.map(x => x.bank + ':' + x.slot));
  const list = S.list.filter(x =>
       (!F.f.strand || String(x.strand_id) === F.f.strand)
    && (!F.f.obj    || String(x.objective_id) === F.f.obj)
    && (!F.f.diff   || x.difficulty === F.f.diff));

  const opt = (v, t, cur) => `<option value="${escA(v)}"${String(cur) === String(v) ? ' selected' : ''}>${esc(t)}</option>`;
  const strandIds = [...new Set(S.list.map(x => x.strand_id).filter(v => v != null))];
  const objs = [...new Map(S.list.filter(x => x.objective_id != null)
                          .map(x => [String(x.objective_id), x.objective])).entries()];
  const diffs = Object.keys(DIFF).filter(d => S.list.some(x => x.difficulty === d));

  const slot = x => {
    const used = inForm.has(F.bank + ':' + x.slot);
    return `<div class="fm-slot${used ? ' on' : ''}">
      <div class="fm-b">
        <div class="fm-s" dir="auto">${esc(x.sample || '—')}</div>
        <div class="ed-m">
          ${kindChips(x)}
          ${x.objective ? `<span class="chip"><bdi>${esc(x.objective)}</bdi></span>` : ''}
          ${variantsChip(x.variants)}
          ${!used && x.forms ? `<span class="chip">في ${N(x.forms, 'نموذج', 'نموذجين', 'نماذج', 'نموذجاً')}</span>` : ''}
        </div>
      </div>
      ${used ? '<span class="chip g">في النموذج</span>'
             : `<button type="button" class="btn ghost" data-add="${escA(x.slot)}">إضافة</button>`}
    </div>`;
  };

  return `<div class="card fm-pick">
    <div class="grp" style="margin-top:0">الإضافة من بنك</div>
    <select id="fmBank" aria-label="البنك">${F.banks.map(b => opt(b.id, b.title, F.bank)).join('')}</select>
    ${/* 🆕 b209 · والهدفُ سطرٌ وحده آخرَ المصفاة: كودُه لاتينيٌّ طويل (`ARI.ORDER_OPS`)، وفي ثلث العمود كان
          يُقصّ أوّلُه تحت السهم — «C.MAIN» مكان «RC.MAIN» (بلاغُ المالك بلقطة) */''}
    <div class="fm-filt">
      <select id="fmSt" aria-label="الفرع"><option value="">— الفرع —</option>${
        strandIds.map(id => opt(id, strandName(id) || '—', F.f.strand)).join('')}</select>
      <select id="fmDf" aria-label="الصعوبة"><option value="">— الصعوبة —</option>${
        diffs.map(d => opt(d, DIFF[d], F.f.diff)).join('')}</select>
      <select id="fmOb" class="fm-ob" aria-label="الهدف"><option value="">— الهدف —</option>${
        objs.map(([id, code]) => opt(id, code || '—', F.f.obj)).join('')}</select>
    </div>
    ${S.error ? `<div class="ed-empty">${esc(S.error)}</div>` : ''}
    <div class="fm-slots">${list.length ? list.map(slot).join('')
      : `<div class="ed-empty">${S.list.length ? 'لا خانة توافق المصفاة' : 'لا خانات في هذا البنك بعد'}</div>`}</div>
  </div>`;
}

function wire(){
  const $ = id => document.getElementById(id);
  $("fmBack").onclick = leave;
  $("fmSet").onclick  = () => quizSettings();
  $("fmPrev").onclick = () => openQuizPreview(F.course, F.lesson, 'form');
  $("fmSave").onclick = save;
  $("fmPub").onclick  = publish;

  app.querySelectorAll("[data-sec]").forEach(el => el.oninput = () => {
    F.rows[+el.dataset.sec].section = el.value;
    if(!F.dirty){ F.dirty = true; paintBar(); }
  });
  const move = (i, j) => {
    [F.rows[i], F.rows[j]] = [F.rows[j], F.rows[i]];
    F.dirty = true; render();
  };
  app.querySelectorAll("[data-up]").forEach(el => el.onclick = () => move(+el.dataset.up, +el.dataset.up - 1));
  app.querySelectorAll("[data-dn]").forEach(el => el.onclick = () => move(+el.dataset.dn, +el.dataset.dn + 1));
  app.querySelectorAll("[data-rm]").forEach(el => el.onclick = () => {
    F.rows.splice(+el.dataset.rm, 1);
    F.dirty = true; render();
  });

  app.querySelectorAll("[data-add]").forEach(el => el.onclick = () => {
    const x = (SLOTS.get(String(F.bank))?.list || []).find(s => s.slot === el.dataset.add);
    if(!x) return;
    const b = F.banks.find(y => String(y.id) === String(F.bank));
    F.rows.push({ bank: Number(F.bank), bankTitle: b?.title || '', slot: x.slot,
      section: F.rows.length ? F.rows[F.rows.length - 1].section : '',
      kind: x.kind, difficulty: x.difficulty, sample: x.sample, objective_id: x.objective_id,
      strand_id: x.strand_id, variants: x.variants, passage_id: x.passage_id });
    F.dirty = true; render();
  });

  const bk = $("fmBank");
  if(bk) bk.onchange = async () => {
    F.bank = Number(bk.value);
    F.f = { strand: '', obj: '', diff: '' };
    await loadSlots(F.bank);
    render();
  };
  const filt = (id, k) => { const el = $(id); if(el) el.onchange = () => { F.f[k] = el.value; render(); }; };
  filt("fmSt", 'strand'); filt("fmOb", 'obj'); filt("fmDf", 'diff');

  /* ⑤ مدخلاتُ التركيب تُكتب في F.ac ساعةَ تتغيّر — وما يغيّر الشاشةَ نفسَها (النطاقُ والقيد) يُعيد رسمها */
  const ab = $("acBox");
  if(ab){
    const A = F.ac;
    ab.ontoggle = () => { A.open = ab.open; };
    $("acN").oninput = e => { A.n = e.target.value; };
    $("acDist").onchange = e => { A.dist = e.target.value; render(); };
    app.querySelectorAll("[data-acs]").forEach(el => el.onchange = () => {
      const s = new Set(A.off);
      el.checked ? s.delete(el.dataset.acs) : s.add(el.dataset.acs);
      A.off = [...s];
    });
    app.querySelectorAll("[data-acb]").forEach(el => el.onchange = () => {
      const all = F.banks.map(b => String(b.id));
      const cur = new Set(A.banks || all);
      el.checked ? cur.add(el.dataset.acb) : cur.delete(el.dataset.acb);
      A.banks = cur.size === all.length ? null : [...cur];
    });
    DK.forEach((d, i) => { const el = $("acD" + i); if(el) el.oninput = () => { A.diff[d] = el.value; }; });
    $("acAny").onchange = e => { A.any = e.target.checked; render(); };
    app.querySelectorAll('[name="acMode"]').forEach(el => el.onchange = () => { A.mode = el.value; });
    $("acGo").onclick = () => autoCompose(false);
    const re = $("acRe");
    if(re) re.onclick = () => autoCompose(true);
  }
}

function leave(){
  if(F.dirty && !confirm("في السطور تغييرات لم تُحفظ — الخروج بلا حفظ؟")) return;
  openCourse(F.course);
}

async function reloadForm(){
  const { data, error } = await api.quizForEdit(F.z.id);
  if(error || !data?.ok){ toast(error?.message || data?.error); return; }
  F.z = data; F.rows = rowsOf(data); F.dirty = false;
  render();
}

async function save(){
  const b = document.getElementById("fmSave");
  if(b) b.disabled = true;
  const rows = F.rows.map(x => ({ bank: x.bank, slot: x.slot, section: (x.section || '').trim() || null }));
  const { data, error } = await api.saveFormSlots(F.z.id, rows);
  /* والمنشورُ الذي تُفقده السطورُ جاهزيّتَه يُردّ استثناءً بنصّ القاعدة — فيُقال كما جاء */
  if(error || !data?.ok){ if(b) b.disabled = false; toast(error?.message || data?.error); return; }
  toast("حُفظت السطور");
  F.ac.report = null; F.ac.base = null;                // ⑤ المقترحُ صار سطوراً محفوظة
  F.banks.forEach(x => SLOTS.delete(String(x.id)));   // عدُّ «في N نماذج» تغيّر
  if(F.bank != null) await loadSlots(F.bank);
  reloadForm();
}

async function publish(){
  const pub = !!F.z.published;
  const { data, error } = await api.publishQuiz(F.z.id, !pub);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  if(pub){ toast("أُلغي النشر"); return reloadForm(); }
  toast("نُشر النموذج");
  /* نموذجٌ منشور داخل درسٍ مسودّة لا يصل أحداً — يُسأل ولا يُفترض، كما في محرّر الاختبار */
  if(F.lesson && !F.lesson.published &&
     confirm("نُشر النموذج.\n\nوالدرس ما زال مسودّة — فلن يظهر لأحد.\nأيُنشر الدرس أيضاً؟")){
    const l = await api.publishLesson(F.lesson.id, true);
    if(l.error || !l.data?.ok) toast(l.error?.message || l.data?.error);
    else { F.lesson.published = true; toast("نُشر الدرس — صار يظهر لطلابه"); }
  }
  reloadForm();
}
