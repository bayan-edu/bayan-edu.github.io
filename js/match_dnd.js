/* ══════════════════════════════════════════════════════════
   بيان — match_dnd.js
   إسنادُ المزاوجة: لمستان أصلاً، وسحبٌ فوقهما بالآلة نفسها.
   لا تتصل بقاعدة البيانات — ولا تعرف ما الإجابة الصحيحة.

   🔴 وفي render_q.js قرارٌ مسجَّل كان يقول: «الإسنادُ بقائمةٍ أصيلة
      لا بسحبٍ وإفلات: تعمل باللمس وبلوحة المفاتيح وقارئ الشاشة،
      والسحبُ يسقط في الثلاثة». وهو صادقٌ في **سحب HTML5 الأصليّ**
      وحده — ذاك لا يعمل باللمس إطلاقاً ولا يُدرَك بلوحة مفاتيح.
      ⇒ فلم يُنقض القرار بل استُوفيت شروطُه الثلاثة:

      ① اللمس      — النواةُ نقرتان (المقابل ثمّ البند)، والسحبُ
                     ببصمة المؤشّر لا بـ dragstart، فيعمل بالإصبع.
      ② المفاتيح   — المقابلُ والخانة **زرّان أصيلان**، فـ Enter و
                     Space تعملان بلا شيفرة، و Escape تُنزل المحمول.
      ③ قارئ الشاشة — aria-pressed على المقابل، ونصٌّ مخفيّ داخل
                     الخانة يقول «مقابل البند ن»، و aria-live يُعلن
                     الحملَ والوضع. ولا aria-label على الخانة: يمحو
                     نصَّها فيُقرأ العنوانُ ولا تُقرأ الإجابة.

   ⏱️ والأهمُّ — a.sec أساسُ التشخيص (quiz.js §b22): وقتُ الحركة
      يُحسب فيه، فتُقرأ الحركةُ تردّداً. ولذلك **لم تُضَف حركة**:
      نقرتان أقلُّ من فتح قائمةٍ وتمريرٍ واختيار. والسحبُ مسارٌ ثانٍ
      لمن أراده، لا طريقٌ مفروض.

   🔑 والمقابلُ يبقى متاحاً بعد وضعه (يُعتم ولا يُرفع): سؤالٌ قد يصحّ
      فيه مقابلٌ لبندين، ورفعُه يمنع إجابةً سليمة.
   ══════════════════════════════════════════════════════════ */

/* عتبةُ السحب — دونها نقرةٌ لا سحب. وبها تنجو النقرةُ من ارتجاف
   الإصبع، ولولاها لصار كلُّ لمسٍ سحباً فاشلاً. */
const DRAG = 6;

/* يُربط ما لم يُربط. ويُنادى بعد كلّ رسمٍ — فالحارس dataset.wired
   يمنع التركيب مرّتين على العنصر نفسه (كما في paintList). */
export function wireMatching(root, onChange = () => {}){
  if(!root) return;
  root.querySelectorAll('.mq').forEach(mq => {
    if(mq.classList.contains('ro') || mq.dataset.wired) return;
    mq.dataset.wired = '1';
    setup(mq, onChange);
  });
}

function setup(mq, onChange){
  const live = mq.querySelector('.mq-live');
  const say  = t => { if(live) live.textContent = t; };
  const label = slot => slot.querySelector('.sr-only')?.textContent.trim() || '';

  /* محمولٌ واحدٌ لا اثنان: إمّا مقابلٌ يبحث عن بند، أو بندٌ يبحث عن
     مقابل. وهما اتّجاها الإسناد — والطالب يبدأ من أيّهما شاء. */
  let chip = null, slot = null;

  const drop = () => {
    if(chip){ chip.classList.remove('armed'); chip.setAttribute('aria-pressed','false'); }
    if(slot)  slot.classList.remove('armed');
    chip = slot = null;
    mq.classList.remove('arming');
  };

  const armChip = el => {
    if(chip === el) return drop();
    drop(); chip = el;
    el.classList.add('armed'); el.setAttribute('aria-pressed','true');
    mq.classList.add('arming');
    say(`حُمِل «${el.textContent.trim()}» — اختر بنداً`);
  };

  const armSlot = el => {
    if(slot === el) return drop();
    drop(); slot = el;
    el.classList.add('armed');
    mq.classList.add('arming');
    say(`${label(el)} — اختر مقابلاً`);
  };

  /* الوضع: نصُّ المقابل يُكتب في الخانة، ومفتاحُه في dataset.
     ولا يُعاد رسمُ شيء — الدرسُ b22: إعادةُ الرسم تقفز بالطالب
     وتُحسب في a.sec، فيُقاس التردّدُ حركةً لا فهماً. */
  const put = (bw, sl) => {
    const t = sl.querySelector('.slot-t');
    if(t) t.textContent = bw.textContent.trim();
    sl.dataset.v = bw.dataset.bw;
    /* 🆕 114 · والوسمُ على الخانة نفسها **وعلى صفّها**: المزاوجةُ تُغلّف
       خانتَها بـ‎.pair‎، و«إكمال من قائمة» خانتُه في متن الجملة بلا غلاف.
       فلو عُلِّق الوسمُ على الغلاف وحده لبقيت خانةُ الجملة تبدو فارغة
       وفيها كلمة — وهو صمتٌ يراه الطالب ولا يفهمه. */
    sl.classList.add('filled');
    sl.closest('.pair')?.classList.add('filled');
    drop(); paintUsed();
    say(`وُضع «${bw.textContent.trim()}» عند ${label(sl)}`);
    onChange(sl.dataset.k, bw.dataset.bw, sl);
  };

  const wipe = sl => {
    const t = sl.querySelector('.slot-t');
    if(t) t.textContent = t.dataset.ph || '';
    delete sl.dataset.v;
    sl.classList.remove('filled');
    sl.closest('.pair')?.classList.remove('filled');
    paintUsed();
    say(`أُزيل مقابل ${label(sl)}`);
    onChange(sl.dataset.k, null, sl);
  };

  /* المستعمَلُ يُعتم ولا يُرفع — ورفعُه يمنع مقابلاً يصحّ لبندين */
  const paintUsed = () => {
    const used = new Set([...mq.querySelectorAll('.pair-slot')]
      .map(s => s.dataset.v).filter(Boolean));
    mq.querySelectorAll('.bank-w').forEach(b =>
      b.classList.toggle('used', used.has(b.dataset.bw)));
  };
  paintUsed();

  /* ── النقر: يخدم الاتّجاهين ومسارَ لوحة المفاتيح معاً ──
     الزرُّ الأصيل يُطلق click من Enter و Space بلا شيفرة، فما يلي
     هو مسارُ الفأرة واللمس والمفاتيح في موضعٍ واحد. */
  mq.addEventListener('click', e => {
    /* 🔴 نقرةٌ تولد من السحب: الالتقاط يُعيد توجيه أحداث التوافق إلى
       المقابل، فتقع click عليه بعد pointerup فيُحمَل من جديد ويبقى
       مضيئاً بعد أن وُضع. و preventDefault على pointerup لا تمنعها —
       النقرةُ تُولَّد من تسلسل الفأرة لا منها. ⇒ تُبتلَع نقرةٌ واحدة،
       ويُصفَّر العلمُ عند pointerdown التالية فلا يبتلع نقرةً بريئة. */
    if(skipClick){ skipClick = false; return; }

    const x = e.target.closest('.slot-x');
    if(x){ const sl = x.closest('.pair')?.querySelector('.pair-slot');
           if(sl?.dataset.v) wipe(sl); return; }

    const bw = e.target.closest('.bank-w');
    if(bw){ slot ? put(bw, slot) : armChip(bw); return; }

    const sl = e.target.closest('.pair-slot');
    if(sl){
      if(chip) return put(chip, sl);
      if(sl.dataset.v) return wipe(sl);   // الممتلئةُ تُفرَّغ بنقرةٍ عليها
      return armSlot(sl);
    }
  });

  mq.addEventListener('keydown', e => { if(e.key === 'Escape') drop(); });

  /* ── السحب: بصمةُ المؤشّر لا dragstart ──
     🔑 و pointer-events تُوحّد الفأرة والقلم والإصبع في مسارٍ واحد،
        بخلاف HTML5 DnD الذي لا يعرف اللمس. وثمنُها سطرٌ في CSS:
        ‎.bank-w{touch-action:none}‎ — فالإصبعُ الذي يبدأ على مقابلٍ
        يسحبه ولا يُمرّر الصفحة. والشريطُ صغيرٌ أعلى البطاقة، وما
        حولَه كلُّه يُمرَّر. */
  let from = null, ghost = null, over = null, x0 = 0, y0 = 0, moved = false;
  let skipClick = false;

  const endDrag = () => {
    ghost?.remove(); ghost = null;
    over?.classList.remove('over'); over = null;
    from = null; moved = false;
  };

  mq.addEventListener('pointerdown', e => {
    const bw = e.target.closest('.bank-w');
    if(!bw || e.button > 0) return;
    from = bw; x0 = e.clientX; y0 = e.clientY; moved = false; skipClick = false;
    /* ⚠️ الالتقاطُ يرمي حين لا يكون المؤشّر حيّاً (وهو ما يقع في
       الاختبار الآليّ، وفي حالاتِ حافّةٍ عند المتصفّح). ويُلتقَط
       الرميُ ولا يُوقف السحب: بلا التقاطٍ يبقى التتبّع ما دام
       المؤشّر داخل .mq — والالتقاطُ إحكامٌ لا شرط. */
    try { bw.setPointerCapture(e.pointerId); } catch { /* يمضي بلا التقاط */ }
  });

  mq.addEventListener('pointermove', e => {
    if(!from) return;
    if(!moved){
      if(Math.hypot(e.clientX - x0, e.clientY - y0) < DRAG) return;
      moved = true;
      ghost = document.createElement('div');
      ghost.className = 'mq-ghost';
      ghost.textContent = from.textContent.trim();
      document.body.appendChild(ghost);
      mq.classList.add('dragging');
    }
    ghost.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    /* الشبحُ بلا pointer-events، فما تحته هو ما يُصاب فعلاً */
    const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('.pair-slot');
    if(t !== over){ over?.classList.remove('over'); over = t; over?.classList.add('over'); }
  });

  mq.addEventListener('pointerup', e => {
    if(!from) return;
    const bw = from, hit = over;
    mq.classList.remove('dragging');
    /* لم يتحرّك ⇒ نقرةٌ لا سحب، ويتكفّل بها مستمعُ click */
    if(!moved){ endDrag(); return; }
    endDrag();
    skipClick = true;                   // النقرةُ التالية أثرُ السحب لا قصدُ الطالب
    if(hit) put(bw, hit); else say('أُفلت خارج البنود — لم يقع شيء');
  });

  mq.addEventListener('pointercancel', () => { mq.classList.remove('dragging'); endDrag(); });
}
