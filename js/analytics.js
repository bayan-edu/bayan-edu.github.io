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

   🎓 والاندفاعُ يُعلن قبل كلّ رقم (93): إجابةٌ خاطئةٌ في أقلّ من
      خمس ثوانٍ ليست خطأً في الفهم بل نقرةٌ بلا قراءة. ومن كان
      ثلثُ إجاباته كذلك، لا يرفعه شرحٌ ولا مراجعة — يرفعه أن يقرأ.
      ⇒ فتتصدّر الشاشةَ حين تكثر، ولا تُدفن تحت نِسَبٍ لا تصفه.

   📦 الرسم بـChart.js من CDN — كما تُستورَد supabase-js، فليس نمطاً
      جديداً. وكلُّ ألوانه تُقرأ من رموز base.css لحظةَ الرسم، ومراقبٌ
      على data-theme يُعيد بناءه عند تبديل السِمة.
      ⚠️ وأصناف CSS كلُّها جديدة (an-chart…) عمداً: نسخةٌ سابقة من
         الأنماط لا تقدر أن تكسر ما لا تعرف اسمه.

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

/* ── الرسم الزمنيّ: Chart.js ──
   تُحمَّل مرّةً عند أوّل رسمٍ لا عند تحميل الوحدة: شاشةُ الطالب قد
   لا تُفتح في الجلسة كلِّها، فلا تُدفع كلفتُها سلفاً. */
let _C = null, _obs = false;
async function ensureChart(){
  if(_C) return _C;
  const [a, b] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/chart.js@4.4.3/auto/+esm'),
    import('https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/+esm')
  ]);
  _C = a.default; _C.register(b.default);
  _C.defaults.font.family = getComputedStyle(document.body).fontFamily;
  return _C;
}

let _chart = null, _vol = null;

/* ⚠️ لوحتان لا لوحةٌ بمقياسين.
   كان الإتقانُ يميناً (٠–١٠٠) والجهدُ يساراً (٠–١٥٠) في رسمٍ واحد،
   فصار ارتفاعُ العمود وارتفاعُ النقطة لا علاقةَ بينهما — والعينُ
   تقارنهما لأنهما في إطارٍ واحد، فتقرأ علاقةً لا وجودَ لها.
   ⇒ مقياسٌ واحد لكلّ لوحة، ومحورُ زمنٍ مشترك بينهما.
   ⚠️ ومحاذاتُهما مضبوطةٌ بـafterFit: عرضُ عمود القيم مثبَّتٌ في
      الاثنتين، وإلّا انزاح الأسبوعُ عن عموده بمقدار عرضِ الأرقام. */
const AXW = 38;

async function drawChart(tr){
  const cv = document.getElementById('anChart');
  const bv = document.getElementById('anVol');
  const pts = tr || [];
  if(!cv || !bv || pts.length < 2) return;

  let C;
  try { C = await ensureChart(); }
  catch(e){ const box = cv.closest('.an-chart');
    if(box) box.innerHTML = `<div class="qz-m">تعذّر تحميل مكتبة الرسم — تحقّق من الاتصال.</div>`;
    return; }

  const css = getComputedStyle(document.documentElement);
  const v   = k => css.getPropertyValue(k).trim();
  const ACC = v('--accent'), MUT = v('--text-muted'), LN = v('--line'),
        FILL = v('--fill-strong'), SURF = v('--surface-2'), TXT = v('--text');

  const labels = pts.map(p => dayMon(p.from));
  const maxE   = Math.max(1, ...pts.map(p => p.answered || 0));
  const last   = pts.length - 1;

  if(_chart) _chart.destroy();
  if(_vol)   _vol.destroy();

  const ctx  = cv.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, cv.clientHeight || 176);
  grad.addColorStop(0, ACC + '4D');
  grad.addColorStop(1, ACC + '00');

  const tip = {
    rtl:true, textDirection:'rtl', displayColors:false, backgroundColor:SURF,
    titleColor:TXT, bodyColor:MUT, borderColor:LN, borderWidth:1,
    padding:10, cornerRadius:9
  };

  /* ① الإتقانُ والإنجاز — كلاهما نسبةٌ مئوية، فمحورٌ واحد يسعهما.
     (وهذا ما حلّ مشكلة المقياسين: الجهدُ عددٌ فنُقل إلى لوحته.) */
  _chart = new C(ctx, {
    type:'line',
    data:{ labels, datasets:[
    { label:'الإنجاز — ما قطعتَه من دروس صفّك',
      data: pts.map(p => p.done),
      spanGaps:true, tension:.2, borderWidth:2, borderColor:MUT,
      borderDash:[5,4], fill:false, pointRadius:0, pointHoverRadius:4,
      datalabels:{ display:false } },
    {
      label:'الإتقان — في الاختبارات التي أنجزتَها',
      data: pts.map(p => p.mastery),
      /* ⚠️ الأسبوع الفارغ لا يُوصَل بما بعده: وصلُه يرسم تعلّماً لم يقع */
      spanGaps:false, tension:.35, borderWidth:2.6, borderColor:ACC,
      fill:true, backgroundColor:grad,
      pointRadius: pts.map((p,i) => i===last ? 4.5 : 3),
      pointBackgroundColor: pts.map((p,i) => i===last ? ACC : SURF),
      pointBorderColor:ACC, pointBorderWidth:2, pointHoverRadius:6,
      /* ⚠️ الأخيرةُ وحدها: قيمةٌ فوق كلّ نقطةٍ تصطدم بالخطّ الثاني،
         والمحورُ والتلميحُ يكفيان لما عداها. */
      datalabels:{ align:'top', offset:9, clamp:true,
        display: c => c.dataIndex === last,
        color: ACC, font:{ size:12, weight:'700' },
        formatter: x => x==null ? '' : AR(x)+'٪' }
    }]},
    options:{
      responsive:true, maintainAspectRatio:false,
      layout:{ padding:{ top:20, left:6 } },
      interaction:{ mode:'index', intersect:false },
      plugins:{
        /* وسيلةُ إيضاحٍ لازمة الآن: خطّان لا يُفرَّق بينهما بالشكل وحده */
        legend:{ display:true, position:'top', align:'end', rtl:true,
          labels:{ color:MUT, boxWidth:22, boxHeight:2, usePointStyle:false,
                   font:{ size:10.5 }, padding:12 } },
        tooltip:{ ...tip, callbacks:{
          label: c => c.parsed.y==null ? 'لا نشاط هذا الأسبوع'
                    : (c.datasetIndex===0 ? 'الإنجاز ' : 'الإتقان ')
                      + AR(c.parsed.y) + '٪' } } },
      scales:{
        x:{ reverse:true, grid:{ display:false }, border:{ display:false },
            ticks:{ display:false } },
        y:{ position:'right', min:0, max:100,
            grid:{ color:LN, drawTicks:false }, border:{ display:false },
            afterFit: sc => { sc.width = AXW; },
            ticks:{ color:MUT, font:{ size:10 }, stepSize:25, padding:6,
                    callback: x => AR(x)+'٪' } }
      }
    }
  });

  /* ② الجهد — أعمدةٌ بأرقامها، بلا محورٍ ثانٍ يُقارَن به */
  _vol = new C(bv.getContext('2d'), {
    type:'bar',
    data:{ labels, datasets:[{
      data: pts.map(p => p.answered || 0),
      backgroundColor: FILL, borderRadius:4,
      barPercentage:.62, categoryPercentage:.78,
      /* ⚠️ anchor:'end' + align:'end' هو اصطلاح الأعمدة الرأسية.
         و`align:'top'` تُحسب بالنسبة إلى **الخانة** لا إلى العمود،
         فينزاح الرقمُ جانباً ويبدو تابعاً لعمودٍ ليس عمودَه.
         🎓 والطويلُ يحمل رقمه داخله والقصيرُ فوقه: رقمٌ فوق عمودٍ
            قصير يطفو في فراغٍ فلا يُنسب إلى شيء. */
      datalabels:{
        anchor:'end', clamp:true, offset:4,
        align: c => (c.dataset.data[c.dataIndex] || 0) / maxE > .3 ? 'start' : 'end',
        color: MUT, font:{ size:10.5, weight:'600' },
        formatter: x => x ? AR(x) : '' }
    }]},
    options:{
      responsive:true, maintainAspectRatio:false,
      layout:{ padding:{ top:22, left:6 } },
      plugins:{ legend:{ display:false },
        tooltip:{ ...tip, callbacks:{
          label: c => AR(c.parsed.y) + ' إجابة' } } },
      scales:{
        x:{ reverse:true, grid:{ display:false }, border:{ color:LN },
            ticks:{ color:MUT, font:{ size:11 }, maxRotation:0, autoSkipPadding:10 } },
        /* محورٌ مخفيٌّ بعرضٍ مطابق — يحاذي اللوحتين ولا يعرض مقياساً ثانياً */
        y:{ position:'right', min:0, display:true, grid:{ display:false },
            border:{ display:false }, ticks:{ display:false },
            afterFit: sc => { sc.width = AXW; } }
      }
    }
  });

  /* السِمة تتبدّل ⇒ الرسم يُعاد: ألوانه مقروءةٌ لحظةَ البناء لا حيّة */
  if(!_obs){
    _obs = true;
    new MutationObserver(() => { if(document.getElementById('anChart')) drawChart(_lastTrend); })
      .observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
  }
}
let _lastTrend = null;

/* ── رسمُ محاولاتِ اختبارٍ واحد ──
   خطُّ عتبةِ النجاح معه: رقمٌ بلا مرجعٍ لا يُقرأ، و«٤٢٪» تختلف
   تماماً حين تكون العتبةُ ٦٥ عنها حين تكون ٣٥. */
let _qchart = null;

async function drawQuizChart(atts, pass){
  const cv = document.getElementById('anQChart');
  if(!cv || !(atts||[]).length) return;
  let C; try { C = await ensureChart(); } catch(e){ return; }

  const css = getComputedStyle(document.documentElement);
  const v = k => css.getPropertyValue(k).trim();
  const ACC = v('--accent'), MUT = v('--text-muted'), LN = v('--line'),
        SURF = v('--surface-2'), TXT = v('--text');

  const best = Math.max(...atts.map(a => a.mastery ?? 0));
  if(_qchart) _qchart.destroy();

  _qchart = new C(cv.getContext('2d'), {
    type:'line',
    data:{
      labels: atts.map(a => 'محاولة ' + AR(a.no)),
      datasets:[
        { label:'عتبة النجاح', data: atts.map(() => pass),
          borderColor:MUT, borderDash:[5,4], borderWidth:1.6,
          pointRadius:0, fill:false, datalabels:{ display:false } },
        { label:'الإتقان', data: atts.map(a => a.mastery),
          borderColor:ACC, borderWidth:2.8, tension:.3, fill:false,
          /* الذروةُ تُعلَّم: `gain` وحده يخفي انحداراً عنها */
          pointRadius: atts.map(a => a.mastery===best ? 6 : 4),
          pointBackgroundColor: atts.map(a => a.mastery===best ? ACC : SURF),
          pointBorderColor:ACC, pointBorderWidth:2.4, pointHoverRadius:7,
          datalabels:{ align:'top', offset:6, color:MUT, font:{ size:10.5, weight:'600' },
            formatter: x => x==null ? '' : AR(x)+'٪' } }
      ]},
    options:{
      responsive:true, maintainAspectRatio:false,
      layout:{ padding:{ top:20, left:6 } },
      interaction:{ mode:'index', intersect:false },
      plugins:{ legend:{ display:false },
        tooltip:{ rtl:true, textDirection:'rtl', displayColors:false,
          backgroundColor:SURF, titleColor:TXT, bodyColor:MUT,
          borderColor:LN, borderWidth:1, padding:10, cornerRadius:9,
          callbacks:{ label: c => c.datasetIndex===0 ? 'عتبة النجاح ' + AR(pass) + '٪'
                                                     : 'الإتقان ' + AR(c.parsed.y) + '٪' } } },
      scales:{
        x:{ reverse:false, grid:{ display:false }, border:{ color:LN },
            ticks:{ color:MUT, font:{ size:11 }, maxRotation:0 } },
        y:{ position:'right', min:0, max:100, grid:{ color:LN, drawTicks:false },
            border:{ display:false }, afterFit: sc => { sc.width = AXW; },
            ticks:{ color:MUT, font:{ size:10 }, stepSize:25, padding:6,
                    callback: x => AR(x)+'٪' } }
      }
    }
  });
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
  const dxr = await api.studentDx(M.uid, M.subject);
  const dx  = dxr.error ? { rush:{}, patterns:[] } : (dxr.data || {});

  const st = d.student, o = d.overall || {}, fl = d.filter || {};
  head(title, sub ?? (st?.name || ''));
  if(!st){ app.innerHTML = crumb + empty("لا بيانات — أو ليس ضمن طلابك"); bind(); return; }

  const judge = !M.forMe;
  const qs    = d.quizzes  || [];
  const subs  = d.subjects || [];
  const cp    = d.completion || {};
  const you   = M.forMe;

  /* 🎓 الاندفاع يتصدّر حين يكثر: من كان ثلثُ إجاباته نقراً بلا قراءة
     لا يرفعه شرحٌ ولا مراجعة — يرفعه أن يقرأ. ودفنُه تحت نِسَبٍ لا
     تصفه يجعل الشاشةَ كلَّها تشخّص ما ليس موجوداً. */
  const rushBox = r => (!r || !r.gradable || (r.pct||0) < 20) ? '' : `
    <div class="an-rush">
      <b>${AR(r.rushed)} من ${AR(r.gradable)} إجابة (${AR(r.pct)}٪)</b>
      ${you ? `أجبتَها في أقلّ من ${AR(r.threshold)} ثوانٍ — وهي أسرعُ من قراءة السؤال.
        اقرأ الجذعَ مرّتين قبل أن تختار: هذا وحده قد يرفع نتيجتك أكثر من أيّ مراجعة.`
            : `دون ${AR(r.threshold)} ثوانٍ وخاطئة. وأنماطُ الخطأ أدناه محسوبةٌ
        <b>بعد استبعادها</b> — فهي لا تصف تصوّراً خاطئاً بل نقراً.`}
    </div>`;

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
    <div class="an-row" data-q="${x.quiz_id}">
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
      ${/* 🎓 الذروةُ تُقال حين يكون الحاضرُ دونها: gain وحده يخفي انحداراً */''}
      ${x.since_best != null && x.since_best < -2
        ? `<div class="an-drop">بلغ ${pct(x.best)} في المحاولة ${AR(x.best_no)}،
             ثمّ نزل ${AR(Math.abs(x.since_best))} نقطة</div>` : ''}
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
        ${(d.trend||[]).length > 1 ? `
          <div class="an-chart">
            <div class="an-clab">الإتقان الأسبوعيّ</div>
            <div class="an-cmain"><canvas id="anChart"></canvas></div>
            <div class="an-clab">عددُ الإجابات في الأسبوع</div>
            <div class="an-cvol"><canvas id="anVol"></canvas></div>
          </div>` : `<div class="qz-m">الرسمُ يظهر بعد أسبوعين من النشاط.</div>`}
        <div class="an-foot">النسبةُ الأسبوعية تتحرّك بما دُرس في الأسبوع أيضاً،
          لا بالاجتهاد وحده — ولهذا يُعرض الجهدُ معها.</div>
      </div>
      <div class="an-tr">
        <div class="an-two">
          <div class="an-one">
            ${gauge(o.mastery, false, 'إتقان', true, judge)}
            <div class="an-note">في الاختبارات التي أُنجزت</div>
          </div>
          <div class="an-one">
            ${gauge(cp.pct, false, 'إنجاز', true, false)}
            <div class="an-note">${cp.required
              ? `${AR(cp.done)} من ${AR(cp.required)} ${fl.subject?'في هذه المادة':'من دروس صفّه'}`
              : 'لا دروسَ منشورةً مطلوبة'}</div>
          </div>
        </div>
      </div>
    </div>

    ${selBox}

    ${rushBox(dx.rush)}

    ${dxSection(dx.patterns, you)}

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
  _lastTrend = d.trend || [];
  drawChart(_lastTrend);
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
  app.querySelectorAll('[data-q]').forEach(el => el.onclick = () =>
    openQuiz(Number(el.dataset.q), title, sub, back));
  scrollTop();
}


/* ═══════════ أنماطُ الخطأ ═══════════
   🎓 الترتيب يختلف بالقارئ لا بالبيانات:
     · للطالب: ما زال أوّلاً — دليلٌ أن جهده أثمر، ثم ما يحتاج عودة.
       وصدرُ الشاشة ليس موضعَ إخفاقه.
     · للمعلّم: المستعصي أوّلاً — عملُه فرزٌ وتدخّل.
   ⚠️ و`untested` لا يُعرض حكماً: اختبارٌ بمحاولةٍ واحدة لم يُختبر
      علاجُه أصلاً، فوسمُه إخفاقاً حكمٌ على دواءٍ لم يُعطَ. */
const DXS = {
  persistent:['يحتاج عودة','لم يزل بعد الإعادة'],
  partial:   ['في الطريق','زال في بعضٍ وبقي في بعض'],
  cleared:   ['زال','لم يعد يظهر بعد الإعادة'],
  untested:  ['لم يُختبر','ظهر ولم تُعَد اختباراتُه']
};

function dxSection(pats, forMe){
  const p = pats || [];
  if(!p.length) return '';
  const order = forMe ? ['cleared','persistent','partial','untested']
                      : ['persistent','partial','cleared','untested'];
  const head  = forMe
    ? 'أنماطُ أخطائك — والترتيبُ يبدأ بما تجاوزتَه'
    : 'أنماطُ الخطأ — المستعصي أوّلاً';

  const rows = order.flatMap(st => p.filter(x => x.state === st).map(x => `
    <div class="an-row static">
      <div class="an-h">
        <span class="qz-t">${esc(x.note || x.name || x.code || '—')}</span>
        <span class="an-st ${x.state}">${DXS[x.state][0]}</span>
      </div>
      <div class="qz-m">
        ${x.name ? `<b>${esc(x.name)}</b>${x.code?' · '+esc(x.code):''}، ` : ''}
        ظهر في ${AR(x.quizzes)} اختباراً${
          x.retried ? `، أُعيد منها ${AR(x.retried)} وزال في ${AR(x.cleared)}`
                    : '، ولم يُعَد أيٌّ منها بعد'}
      </div>
      ${x.remedy ? `<div class="an-dx">${esc(x.remedy)}</div>` : ''}
    </div>`));

  return `<h2 class="sec">${head}</h2>${rows.join("")}`;
}



/* ═══════════ شاشةُ اختبارٍ واحد ═══════════
   🔑 التشخيصُ متنٌ والإجابةُ سياق — ولا مفتاحَ البتّة (91).
      لو رأى الطالبُ الصوابَ متى شاء ثمّ أعاد، لقاست الإعادةُ
      الذاكرةَ لا التعلّم، وفرغ أثمنُ رقمٍ في المنصة. */
async function openQuiz(quizId, backTitle, backSub, backHas){
  app.innerHTML = `<div class="status">جارٍ الفتح…</div>`;
  const { data, error } = await api.quizDetail(quizId, M.uid);
  const crumb = `<div class="crumb" id="bq">← ${M.forMe ? 'أدائي' : 'بطاقة الطالب'}</div>`;
  const back  = () => drawPerformance(backTitle, backSub, backHas);

  if(error){ app.innerHTML = crumb + errBox(error,'تفاصيل الاختبار');
             document.getElementById('bq').onclick = back; return; }

  const d = data || {}, qz = d.quiz || {}, atts = d.attempts || [];
  head(qz.title || 'اختبار', qz.lesson || '');
  const judge = !M.forMe;
  const last  = atts.length ? atts[atts.length-1] : null;

  const ansRow = a => `
    <div class="an-q ${a.is_correct===true?'ok':a.is_correct===false?'no':'na'}">
      <div class="an-qh">
        <span class="an-qn">${AR(a.position)}</span>
        <span class="an-qb">${esc(a.body || '')}</span>
      </div>
      ${a.chosen  ? `<div class="an-qc">اخترتَ: ${esc(a.chosen)}</div>` : ''}
      ${a.written ? `<div class="an-qc">كتبتَ: ${esc(a.written)}</div>` : ''}
      ${a.rushed
        ? `<div class="an-qr">أُجيب في ${AR(a.seconds)} ثانية — أسرعُ من قراءة السؤال،
             فلا تشخيصَ له.</div>`
        : (a.note ? `<div class="an-qd">${esc(a.note)}</div>` : '')}
      ${a.name ? `<div class="qz-m">${esc(a.name)}${a.code?' · '+esc(a.code):''}</div>` : ''}
      ${a.remedy ? `<div class="an-dx">${esc(a.remedy)}</div>` : ''}
    </div>`;

  app.innerHTML = `
    ${crumb}
    ${atts.length > 1 ? `
      <div class="card">
        <div class="an-clab">الدرجة في كلّ محاولة</div>
        <div class="an-cmain"><canvas id="anQChart"></canvas></div>
      </div>` : last ? `
      <div class="card an-sum">
        ${gauge(last.mastery, false, 'إتقان', false, judge)}
        <div class="qz-m an-cen">محاولةٌ واحدة، ${AR(last.answered)} إجابة،
          عتبةُ النجاح ${pct(qz.pass)}</div>
      </div>` : ''}

    ${d.rush ? rushLine(d.rush, M.forMe) : ''}

    ${!d.revealed
      ? `<div class="warnbox">هذا الاختبار لا تُعرض مراجعتُه — قرارٌ اتّخذه
           مؤلّفه، ومحطّاتُ تحديد المستوى كلُّها كذلك.</div>`
      : `<h2 class="sec">تفاصيل آخر محاولة</h2>
         <div class="an-foot">الصوابُ من الخطأ والتشخيص — <b>بلا الإجابة الصحيحة</b>،
           لتبقى الإعادةُ قياساً لفهمك لا لذاكرتك.</div>
         ${(d.answers||[]).map(ansRow).join("") || empty("لا إجابات")}`}

    <p class="hint">نسخة الواجهة ${BUILD}</p>`;

  document.getElementById('bq').onclick = back;
  if(atts.length > 1) drawQuizChart(atts, qz.pass || 65);
  scrollTop();
}

function rushLine(r, forMe){
  if(!r || !r.gradable || !r.rushed) return '';
  return `<div class="an-rush">
    <b>${AR(r.rushed)} من ${AR(r.gradable)}</b> ${forMe
      ? `من إجاباتك هنا كانت في أقلّ من ${AR(r.threshold)} ثوانٍ.`
      : `من إجاباته دون ${AR(r.threshold)} ثوانٍ وخاطئة.`}</div>`;
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
