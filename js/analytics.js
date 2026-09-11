/* ══════════════════════════════════════════════════════════
   بيان — analytics.js
   الأداء: شاشة الطالب · بطاقة المعلّم · قائمة الطلاب · اللوحة

   📐 يقرأ 89 و86/87 عبر api.js وحدها.

   🔒 لا شرطَ صلاحيةٍ في هذه الوحدة — ولا يُضاف.
      الدوالّ `security invoker`، وRLS هي التي تفصل:
        المعلّم ⇒ طلابه · المدير ⇒ الجميع · الطالب ⇒ نفسه.

   🎓 شاشتا الطالب والمعلّم **مُصيِّرٌ واحد بوضعين** (M.forMe):
      ولو كُتبتا مرّتين لافترقتا يوماً، فرأى المعلّم رقماً ورأى
      الطالبُ غيرَه عن الشيء نفسه — وأيُّهما الصادق لا يُقرأ.

   🎓 وفرقُ الوضعين قرارٌ تربويّ لا ذوق:
      · للطالب: اللونُ لا يحكم على إتقانه (شريطٌ بلونٍ واحد)،
        ويحكم على **تغيّره** وحده. الطولُ يخبره أين هو — يحتاجها؛
        واللونُ الأحمر يخبره ما هو — لا يحتاجها.
      · للمعلّم: ألوان النطاقات، لأن عمله فرزٌ وتدخّل.

   ⚠️ **الفلتر يُبنى ممّا كان قبل الفلترة لا ممّا بقي بعدها** (b47).
      كانت قائمةُ المواد تُبنى من الاستجابة المُصفّاة، فإذا اختار
      الطالبُ مادةً عادت الاستجابةُ بمادةٍ واحدة — فابتلع الفلترُ
      خياراتِه وصار بابُه يُغلق خلفه. ⇒ M.opts تُملأ مرّةً بلا فلتر.

   ⚠️ التاريخ باسم الشهر لا بـ«يوم/شهر»: الأرقامُ العربية والخطُّ
      المائل نصٌّ ثنائيُّ الاتجاه، فترتيبُه على الشاشة ليس ترتيبَه
      في المصدر. «١٠ أغسطس» لا تحتمل قلباً.

   ⚠️ الفاصل «،» لا «·»: الصفر العربيّ «٠» نقطةٌ مرفوعة كالفاصل.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, esc, AR, errBox, nav, BUILD, scrollTop } from './ui.js';

const F = { level:null, subject:null, view:'list', search:'', opts:null };
const M = { uid:null, forMe:false, subject:null, strand:null,
            moreUp:false, moreDown:false, opts:null, base:null };

const MON = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
             'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

/* ═══════════ أدوات العرض ═══════════ */

const pct   = v => v==null ? '—' : AR(v)+'٪';
const num   = v => v==='' ? null : Number(v);
const empty = t => `<div class="status">${esc(t)}</div>`;
const dayMon = s => { const [,m,d] = s.split('-'); return AR(+d)+' '+MON[+m-1]; };

/* حدود اللون في موضعٍ واحد. وفي وضع الطالب لا نطاقَ للإتقان. */
function band(m, judge){ return !judge ? 'flat'
  : m==null ? 'na' : m<60 ? 'low' : m<80 ? 'mid' : 'high'; }

const thinTag = t => t ? `<span class="an-thin">عيّنة صغيرة</span>` : '';

function bar(m, thin, judge){
  const w = Math.max(0, Math.min(100, Number(m)||0));
  return `<div class="an-track"><div class="an-fill ${band(m,judge)}${thin?' thin':''}"
            style="width:${w}%"></div></div>`;
}

/* ── الحلقة ──
   النصُّ خارج الـSVG: الحلقة تُعكس أفقياً لتسير من الأعلى يساراً —
   اتجاه التقدّم في صفحةٍ عربية — والنصُّ ينعكس معها لو دخلها. */
function gauge(m, thin, sub, small, judge){
  const R = 52, C = 2 * Math.PI * R;
  const v = Math.max(0, Math.min(100, Number(m) || 0));
  const on = (v / 100) * C;
  return `<div class="an-gauge${small?' sm':''}">
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle class="an-gbg" cx="60" cy="60" r="${R}"/>
      <circle class="an-gfg ${band(m,judge)}${thin?' thin':''}" cx="60" cy="60" r="${R}"
              stroke-dasharray="${on.toFixed(1)} ${(C-on).toFixed(1)}"
              transform="rotate(-90 60 60)"/>
    </svg>
    <div class="an-gt"><div class="an-gn ${band(m,judge)}">${pct(m)}</div>
      ${sub?`<div class="an-gs">${esc(sub)}</div>`:''}</div>
  </div>`;
}

/* ── الخطّ الزمنيّ ──
   ⚠️ لا preserveAspectRatio="none": التمديدُ غيرُ المتناسب يُسمّن
      الخطوطَ أفقياً ويُنحّفها رأسياً، وهو سببُ المظهر الرخيص كلِّه.
   ⚠️ والأسبوعُ الفارغ لا يُوصَل بما بعده: وصلُه يرسم تعلّماً لم يقع.
   ⚠️ ومحورُ القيم يمينَ الرسم لا يسارَه — لأن الزمن يبدأ من اليمين. */
function spark(tr){
  const pts = tr || [];
  if(pts.length < 2) return '';
  const n = pts.length;
  const W = 360, H = 152, PR = 36, PL = 12, T = 20, B = 30;
  const base = H - B;
  const maxE = Math.max(1, ...pts.map(p => p.answered || 0));
  const x = i => (W - PR) - (i * (W - PR - PL) / (n - 1));
  const y = m => base - (Math.max(0, Math.min(100, m)) / 100) * (base - T);

  /* شبكةٌ خفيفة: العينُ تحتاج مسطرةً لتقرأ ارتفاعاً */
  const grid = [0, 50, 100].map(v => `
    <line class="an-sg" x1="${PL}" y1="${y(v).toFixed(1)}" x2="${W-PR}" y2="${y(v).toFixed(1)}"/>
    <text class="an-sgt" x="${W-PR+6}" y="${(y(v)+3.5).toFixed(1)}">${AR(v)}</text>`).join("");

  /* الجهد: أعمدةٌ خلف الخطّ — تُقرأ ولا تزاحم */
  const bars = pts.map((p,i) => {
    const h = ((p.answered||0) / maxE) * 38;
    return h < 1.5 ? '' : `<rect class="an-sb" x="${(x(i)-6).toFixed(1)}"
        y="${(base-h).toFixed(1)}" width="12" height="${h.toFixed(1)}" rx="3"/>`;
  }).join("");

  /* مقاطعُ متّصلة فقط — وما بينها فراغٌ يُرى */
  const runs = []; let cur = [];
  pts.forEach((p,i) => { if(p.mastery == null){ if(cur.length) runs.push(cur); cur = []; }
                         else cur.push(i); });
  if(cur.length) runs.push(cur);

  const areas = runs.filter(r => r.length > 1).map(r => {
    const d = r.map((i,k) => `${k?'L':'M'}${x(i).toFixed(1)},${y(pts[i].mastery).toFixed(1)}`).join('')
            + `L${x(r[r.length-1]).toFixed(1)},${base}L${x(r[0]).toFixed(1)},${base}Z`;
    return `<path class="an-sa" d="${d}"/>`;
  }).join("");

  const lines = runs.filter(r => r.length > 1).map(r =>
    `<path class="an-sl" d="${r.map((i,k)=>`${k?'L':'M'}${x(i).toFixed(1)},${y(pts[i].mastery).toFixed(1)}`).join('')}"/>`
  ).join("");

  const showAll = n <= 6;
  const marks = pts.map((p,i) => {
    if(p.mastery == null) return '';
    const last = i === n-1;
    return `<circle class="an-sd${last?' last':''}" cx="${x(i).toFixed(1)}"
              cy="${y(p.mastery).toFixed(1)}" r="${last?5:3.6}">
              <title>${esc(dayMon(p.from))}: ${pct(p.mastery)}، ${AR(p.answered)} إجابة</title>
            </circle>
            ${(showAll || last) ? `<text class="an-sv${last?' last':''}" x="${x(i).toFixed(1)}"
              y="${(y(p.mastery)-10).toFixed(1)}" text-anchor="middle">${pct(p.mastery)}</text>` : ''}`;
  }).join("");

  return `<svg class="an-spark" viewBox="0 0 ${W} ${H}" role="img"
            aria-label="الإتقان والجهد أسبوعياً">
      <defs><linearGradient id="anGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   class="an-g1"/><stop offset="100%" class="an-g2"/>
      </linearGradient></defs>
      ${grid}${bars}${areas}${lines}${marks}
      <text class="an-st" x="${W-PR}" y="${H-9}" text-anchor="end">${dayMon(pts[0].from)}</text>
      <text class="an-st" x="${PL}"   y="${H-9}" text-anchor="start">${dayMon(pts[n-1].from)}</text>
    </svg>`;
}

/* عنوانُ الاتجاه — واقعةٌ تُرى في الرسم لا خلاصةُ نافذةٍ مختارة.
   (آخرُ أسبوعين أعطى +٨ لنفس الطالب، وآخرُ ثلاثة أعطى −٦٫٦.) */
function trendLine(tr, forMe){
  const arr = tr || [];
  const act = arr.filter(p => p.mastery != null);
  const you = forMe ? 'ك' : 'ه';
  if(!act.length) return forMe ? 'ابدأ — كلُّ محاولةٍ تضيف نقطةً إلى خطّك.'
                               : 'لا محاولات مسجَّلة بعد.';
  if(arr.length && arr[arr.length-1].mastery == null){
    let gap = 0;
    for(let i = arr.length-1; i >= 0 && arr[i].mastery == null; i--) gap++;
    return `لا إجاباتٍ هذا الأسبوع — آخرُ نشاط${you} قبل ${AR(gap)} أسبوعاً.`;
  }
  const last = act[act.length-1], prev = act[act.length-2];
  const now  = `هذا الأسبوع ${pct(last.mastery)} من ${AR(last.answered)} إجابة`;
  if(!prev) return `${now} — وهي بداية${you}.`;
  const dv = Math.round((last.mastery - prev.mastery) * 10) / 10;
  if(dv === 0) return `${now} — كالأسبوع النشِط السابق تماماً.`;
  return `${now} — ${dv>0?'أعلى':'أقلّ'} من الأسبوع النشِط السابق بـ${AR(Math.abs(dv))} نقطة.`;
}


/* ═══════════ ① شاشة الطالب ═══════════ */

export async function loadMyPerformance(){
  nav('perf');
  Object.assign(M, { uid:null, forMe:true, subject:null, strand:null,
                     moreUp:false, moreDown:false, opts:null, base:null });
  await drawPerformance("أدائي", "اتجاهُك، وما تحسّن، وما يستحقّ عودة");
}

/* ═══════════ ② بطاقة الطالب — للمعلّم والمدير ═══════════ */

export async function openStudentCard(uid){
  Object.assign(M, { uid, forMe:false, subject:null, strand:null,
                     moreUp:false, moreDown:false, opts:null, base:null });
  await drawPerformance("بطاقة الطالب", null, true);
}


/* ═══════════ المُصيِّر المشترك ═══════════ */

async function drawPerformance(title, sub, back){
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const crumb = back ? `<div class="crumb" id="bk">← تحليل الأداء</div>` : '';
  const bind  = () => { const b = document.getElementById('bk'); if(b) b.onclick = loadStudents; };

  /* ⚠️ b47 · النداء الأول بلا فلتر — ومنه وحده تُبنى القوائم.
     ولو بُنيت من المُصفّى لأغلق الفلترُ بابَه خلف مستعمِله. */
  if(!M.opts){
    const first = await api.studentPerformance(M.uid, null, null);
    if(first.error){ app.innerHTML = crumb + errBox(first.error,'الأداء'); bind(); return; }
    M.base = first.data || {};
    M.opts = M.base.subjects || [];
  }

  let d = M.base;
  if(M.subject || M.strand){
    const r = await api.studentPerformance(M.uid, M.subject, M.strand);
    if(r.error){ app.innerHTML = crumb + errBox(r.error,'الأداء'); bind(); return; }
    d = r.data || {};
  }

  const st = d.student, o = d.overall || {}, fl = d.filter || {};
  head(title, sub ?? (st?.name || ''));
  if(!st){ app.innerHTML = crumb + empty("لا بيانات — أو ليس ضمن طلابك"); bind(); return; }

  const judge = !M.forMe;
  const qs    = d.quizzes  || [];
  const subs  = d.subjects || [];

  /* الفرعُ يُخفى ما لم يوجد فرعان فأكثر: فلترٌ بخيارٍ واحد يُقرأ عطلاً */
  const curOpt  = M.opts.find(s => String(s.subject_id) === String(M.subject));
  const strOpt  = (curOpt?.strands || []).filter(x => x.strand_id != null);
  const showStr = M.subject && strOpt.length > 1;

  /* ترشيحان من قائمةٍ واحدة، فلا تفترقان */
  const up   = qs.filter(x => x.gain != null).sort((a,b) => b.gain - a.gain);
  const down = qs.filter(x => x.mastery != null && x.mastery < x.pass)
                 .sort((a,b) => a.mastery - b.mastery);

  const gainTag = g => `<span class="an-n ${g>0?'high':g<0?'low':'mid'}">
      ${g>0?'▲':g<0?'▼':'='} ${AR(Math.abs(g))}</span>`;

  const quizRow = (x, mode) => `
    <div class="an-row static">
      <div class="an-h">
        <span class="qz-t">${esc(x.title)}</span>
        ${mode==='gain' ? gainTag(x.gain)
                        : `<span class="an-n ${band(x.mastery,judge)}">${pct(x.mastery)}</span>`}
      </div>
      ${mode==='gain' ? '' : bar(x.mastery, x.answered<10, judge)}
      <div class="qz-m">${x.lesson?esc(x.lesson)+'، ':''}${
        x.attempts>1 ? `${AR(x.attempts)} محاولات، من ${pct(x.first)} إلى ${pct(x.mastery)}`
                     : `محاولةٌ واحدة، ${AR(x.answered)} إجابة`}${
        mode==='need' ? `، عتبةُ النجاح ${pct(x.pass)}` : ''}</div>
    </div>`;

  const section = (ttl, arr, mode, more, key, note) => !arr.length ? '' : `
    <h2 class="sec">${esc(ttl)}</h2>
    ${note ? `<div class="warnbox">${note}</div>` : ''}
    ${arr.slice(0, more ? arr.length : 10).map(x => quizRow(x, mode)).join("")}
    ${arr.length > 10 && !more
      ? `<button class="an-more" data-more="${key}">عرض المزيد (${AR(arr.length-10)})</button>` : ''}`;

  const selBox = `<div class="an-bar">
      <select id="mSubject" class="an-sel" aria-label="اختر المادة">
        <option value="">كلّ المواد</option>
        ${M.opts.map(s => `<option value="${s.subject_id}"
           ${String(M.subject)===String(s.subject_id)?'selected':''}>${esc(s.name)}</option>`).join("")}
      </select>
      ${showStr ? `<select id="mStrand" class="an-sel" aria-label="اختر الفرع">
          <option value="">كلّ الفروع</option>
          ${strOpt.map(x => `<option value="${x.strand_id}"
             ${String(M.strand)===String(x.strand_id)?'selected':''}>${esc(x.name)}</option>`).join("")}
        </select>` : ''}
    </div>`;

  app.innerHTML = `
    ${crumb}

    <div class="card an-top">
      <div class="an-tl">
        <div class="an-head">${esc(trendLine(d.trend, M.forMe))}</div>
        ${spark(d.trend) || `<div class="qz-m">الخطُّ يظهر بعد أسبوعين من النشاط.</div>`}
        <div class="an-foot">الأعمدةُ عددُ الإجابات في الأسبوع. والنسبةُ الأسبوعية
          تتحرّك بما دُرس فيه أيضاً، لا بالاجتهاد وحده.</div>
      </div>
      <div class="an-tr">
        ${gauge(o.mastery, false, fl.subject ? 'إتقان المادة' : 'إتقان عام', false, judge)}
        <div class="qz-m an-cen">${
          fl.subject ? esc(fl.subject) + (fl.strand ? '، '+esc(fl.strand) : '')
                     : `${AR(o.subjects||0)} مادة، ${AR(o.answered||0)} إجابة`}</div>
      </div>
    </div>

    ${selBox}

    ${M.subject
      ? (qs.length
          ? `<h2 class="sec">اختبارات ${esc(fl.strand || fl.subject || '')}</h2>
             ${qs.map(x => quizRow(x, 'plain')).join("")}`
          : empty("لا محاولات ضمن هذا الاختيار"))
      : `
        ${section('ما تحسّن', up, 'gain', M.moreUp, 'up',
            'هذا وحده يقيس <b>ما فعله التعليم</b>: الفرق بين المحاولة الأولى وأحدثها.')}
        ${section('يستحقّ عودة', down, 'need', M.moreDown, 'down',
            'دون عتبةِ النجاح التي حدّدها معلّمُ الاختبار. <b>ابدأ من أعلى القائمة.</b>')}
        ${subs.length ? `<h2 class="sec">المواد — الأضعف أوّلاً</h2>
          ${subs.map(s => `
            <div class="an-row" data-s="${s.subject_id}">
              <div class="an-h"><span class="qz-t">${esc(s.name)}</span>
                <span class="an-n ${band(s.mastery,judge)}">${pct(s.mastery)}</span></div>
              ${bar(s.mastery, s.thin, judge)}
              <div class="qz-m">${AR(s.quizzes)} اختباراً، ${AR(s.answered)} إجابة ${thinTag(s.thin)}</div>
            </div>`).join("")}` : empty("لا محاولات مصحَّحة بعد")}`}

    <p class="hint">الإتقان = إجاباتٌ صحيحة ÷ إجابات مُصحَّحة، من أحدث محاولةٍ
      لكلّ اختبار · نسخة الواجهة ${BUILD}</p>`;

  bind();
  const redraw = () => drawPerformance(title, sub, back);
  const s1 = document.getElementById('mSubject');
  if(s1) s1.onchange = e => { M.subject = num(e.target.value); M.strand = null; redraw(); };
  const s2 = document.getElementById('mStrand');
  if(s2) s2.onchange = e => { M.strand = num(e.target.value); redraw(); };
  app.querySelectorAll('[data-more]').forEach(b => b.onclick = () => {
    if(b.dataset.more === 'up') M.moreUp = true; else M.moreDown = true; redraw();
  });
  app.querySelectorAll('[data-s]').forEach(el => el.onclick = () => {
    M.subject = Number(el.dataset.s); M.strand = null; redraw();
  });
  scrollTop();
}


/* ═══════════ ③ قائمة الطلاب واللوحة — للمعلّم والمدير ═══════════ */

export async function loadStudents(){
  nav('students');
  head("تحليل الأداء", "الأضعف أوّلاً — الترتيب توجيه");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  /* القوائم من النداء غير المُصفّى — نفس درس b47 */
  if(!F.opts){
    const { data, error } = await api.cohortPerformance(null, null);
    if(error){ app.innerHTML = errBox(error,'لوحة الأداء'); return; }
    F.opts = {
      subjects: (data?.by_subject||[]).map(x => [x.subject_id, x.name]),
      levels:   (data?.by_level  ||[]).map(x => [x.level_id,   x.name])
    };
  }

  const sel = (id, cur, list, all) => `
    <select id="${id}" class="an-sel">
      <option value="">${esc(all)}</option>
      ${list.map(([v,n]) => `<option value="${v}" ${String(cur)===String(v)?'selected':''}>${esc(n)}</option>`).join("")}
    </select>`;

  app.innerHTML = `
    <div class="an-bar">
      ${sel('flLevel',   F.level,   F.opts.levels,   'كل الصفوف')}
      ${sel('flSubject', F.subject, F.opts.subjects, 'كل المواد')}
      <input id="flSearch" class="an-sel" type="search" placeholder="بحث بالاسم"
             value="${esc(F.search)}">
    </div>
    <div class="an-tabs">
      <button class="an-tab ${F.view==='list' ?'on':''}" data-v="list">القائمة</button>
      <button class="an-tab ${F.view==='board'?'on':''}" data-v="board">اللوحة</button>
    </div>
    <div id="anBody"><div class="status">جارٍ التحميل…</div></div>
    <p class="hint">نسخة الواجهة ${BUILD}</p>`;

  document.getElementById('flLevel').onchange   = e => { F.level = num(e.target.value); render(); };
  document.getElementById('flSubject').onchange = e => { F.subject = num(e.target.value); render(); };
  document.getElementById('flSearch').oninput   = e => { F.search = e.target.value; if(F.view==='list') render(); };
  app.querySelectorAll('.an-tab').forEach(b => b.onclick = () => {
    F.view = b.dataset.v;
    app.querySelectorAll('.an-tab').forEach(x => x.classList.toggle('on', x===b));
    render();
  });

  render();
  scrollTop();
}

async function render(){
  const box = document.getElementById('anBody');
  if(!box) return;
  box.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  if(F.view === 'list') await renderList(box);
  else                  await renderBoard(box);
}

async function renderList(box){
  const { data, error } = await api.studentsOverview(F.level, F.subject, F.search);
  if(error){ box.innerHTML = errBox(error,'قائمة الطلاب'); return; }
  const rows = data || [];

  if(!rows.length){
    /* قد يكون الحاجز صلاحيةً أو فلتراً أو غيابَ محاولات — ثلاثةٌ لا تُخلط */
    box.innerHTML = empty(F.search ? "لا اسم يطابق البحث"
                                   : "لا محاولات بعد ضمن هذا الفلتر");
    return;
  }

  box.innerHTML = rows.map(r => `
    <div class="an-row" data-u="${esc(r.user_id)}">
      <div class="an-h">
        <span class="qz-t">${esc(r.name||'طالب')}</span>
        <span class="an-n ${band(r.mastery,true)}">${pct(r.mastery)}</span>
      </div>
      ${bar(r.mastery, r.thin, true)}
      <div class="qz-m">
        ${r.level?esc(r.level)+'، ':''}${AR(r.subjects)} مادة، ${AR(r.attempts)} محاولة${
          r.days_silent!=null && r.days_silent>0 ? `، بلا نشاط ${AR(r.days_silent)} يوماً` : ''}
      </div>
      ${r.dx_top ? `<div class="an-dx">أكثر أخطائه: ${esc(r.dx_top.name||r.dx_top.code)}
                     <span class="an-c">${AR(r.dx_top.n)}</span></div>` : ''}
      ${thinTag(r.thin)}
    </div>`).join("");

  box.querySelectorAll('.an-row').forEach(el =>
    el.onclick = () => openStudentCard(el.dataset.u));
}

async function renderBoard(box){
  const { data, error } = await api.cohortPerformance(F.level, F.subject);
  if(error){ box.innerHTML = errBox(error,'لوحة الأداء'); return; }
  const d = data || {}, o = d.overall || {};
  if(!o.students){ box.innerHTML = empty("لا محاولات بعد ضمن هذا الفلتر"); return; }

  const subjName = {};
  (d.by_subject||[]).forEach(x => subjName[x.subject_id] = x.name);

  const line = (name, x) => `
    <div class="an-row static">
      <div class="an-h"><span class="qz-t">${esc(name)}</span>
        <span class="an-n ${band(x.mastery,true)}">${pct(x.mastery)}</span></div>
      ${bar(x.mastery, x.thin, true)}
      <div class="qz-m">${AR(x.students)} طالباً، ${AR(x.attempts)} محاولة</div>
      ${thinTag(x.thin)}
    </div>`;

  const group = (title, arr, nameOf) => !arr?.length ? '' : `
    <h2 class="sec">${esc(title)}</h2>${arr.map(x => line(nameOf(x), x)).join("")}`;

  box.innerHTML = `
    <div class="card an-sum">
      ${gauge(o.mastery, o.thin, 'إتقان', false, true)}
      <div class="qz-m an-cen">${AR(o.students)} طالباً، ${AR(o.attempts)} محاولة</div>
      ${o.thin ? `<div class="warnbox">العيّنة أصغر من أن يُبنى عليها حكم.
         الرقم صحيحُ الحساب، والخريطةُ هنا تكشف <b>أين ينقصنا المحتوى</b>
         أكثر مما تقيس أداءً.</div>` : ''}
    </div>
    ${group('المواد',  d.by_subject, x => x.name)}
    ${group('الصفوف',  d.by_level,   x => x.name)}
    ${(() => {
      /* غير المصنَّف يكرّر by_subject حرفاً بحرف ⇒ يُستبعد، ويُقال سببُه */
      const tagged = (d.by_strand||[]).filter(x => x.strand_id != null);
      if(tagged.length) return group('الفروع', tagged, x =>
        (subjName[x.subject_id] ? subjName[x.subject_id]+' — ' : '') + x.name);
      return `<h2 class="sec">الفروع</h2>
        <div class="status">لم تُصنَّف الدروس بفروع بعد — التصنيف يفتح هذا التقسيم.</div>`;
    })()}`;
}
