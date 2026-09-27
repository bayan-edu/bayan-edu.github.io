/* ══════════════════════════════════════════════════════════════════
   بيان — مِسبارُ لوحة الأفاتار  (المهمّة ٠·٢)

   قرارُ المالك (٢٧ سبتمبر): **ثمانيةُ ألوانٍ نابضة**، ولا تُقيَّد
   بعلاقتها بالشعار ولا بعائلات المعنى. فسقط حارسا `FAM` و`LOGO`،
   وبقي ما يخدم وظيفةَ العلامة نفسِها:

     ① الحرفُ يُقرأ عليها     — تباينُ الحبر ≥ ٤٫٥
     ② القرصُ يُرى على الورقتين — ≥ ٣ على الفاتحة والداكنة
     ③ الألوانُ يُفرَّق بينها   — ΔE في الرؤى الثلاث
     ④ وتكون نابضة            — أقصى إشباعٍ يسمح به ①②

   🔑 **والحبرُ ليس أبيضَ دائماً.** قرصٌ نابضٌ فاتح (ليمونيّ · فيروزيّ
      صاخب) لا يحمل حبراً أبيضَ بتباينٍ ٤٫٥ — ويحمل حبراً داكناً.
      فيُختار الحبرُ لكلّ لونٍ بالقياس، ويُخزَّن معه. **وتقييدُ الحبر
      بالأبيض يحرم اللوحةَ من أنصع أنصافها.**

   التشغيل — من مجلّدٍ فيه culori:
     npm i culori
     node palette-scan.mjs <عدد> <أدنى تباعد صبغيّ>
     مثال:  node palette-scan.mjs 8 32

   ⚠️ **ومحاكاةُ عمى الألوان ليست زينةً هنا:** لونان متباعدان في الرؤية
      العادية قد ينطبقان عند ثمانيةٍ بالمئة من الطلاب.
   ══════════════════════════════════════════════════════════════════ */
import { converter, formatHex, differenceCiede2000, wcagContrast,
         filterDeficiencyProt, filterDeficiencyDeuter, parse } from 'culori';

const rgbC = converter('rgb'), dE = differenceCiede2000();
const prot = filterDeficiencyProt(1), deut = filterDeficiencyDeuter(1);
const VIS = [['normal', c=>c], ['protan', prot], ['deutan', deut]];
const see = (hex,f) => formatHex(f(parse(hex)));
const pairW = (a,b) => Math.min(...VIS.map(([,f]) => dE(see(a,f), see(b,f))));

const PAGE_L = '#F5F5F4', PAGE_D = '#171717';
const INK_W  = '#ffffff', INK_D = '#1C1917';   // حبران لا واحد

const inG = c => { const r = rgbC(c); return r && ['r','g','b'].every(k => r[k] >= -1e-4 && r[k] <= 1.0001); };

/* أنبضُ لونٍ ممكن لكلّ صبغة: أقصى إشباعٍ يبقى معه الحرفُ مقروءاً
   والقرصُ مرئياً على الورقتين. */
function bestOfHue(h){
  let best = null;
  for(let c = 0.34; c >= 0.05; c -= 0.004)
    for(let l = 0.38; l <= 0.86; l += 0.01){
      const col = { mode:'oklch', l, c, h }; if(!inG(col)) continue;
      const hex = formatHex(col);
      if(wcagContrast(hex, PAGE_L) < 3) continue;
      if(wcagContrast(hex, PAGE_D) < 3) continue;
      const cw = wcagContrast(hex, INK_W), cd = wcagContrast(hex, INK_D);
      const ink = cw >= cd ? INK_W : INK_D;
      const ct  = Math.max(cw, cd);
      if(ct < 4.5) continue;
      if(!best || c > best.c)
        best = { hex, h, c:+c.toFixed(3), l:+l.toFixed(2), ink,
                 ct:+ct.toFixed(2), pL:+wcagContrast(hex,PAGE_L).toFixed(2),
                 pD:+wcagContrast(hex,PAGE_D).toFixed(2) };
    }
  return best;
}

const N = Number(process.argv[2] || 8);
const HUE_SEP = Number(process.argv[3] || 32);
/* 🔑 أرضيةُ نبضٍ إلزامية: بعضُ الصبغات (الفيروزيُّ والخردليّ) لا تبلغ
   إشباعاً عالياً وهي تحفظ تباينَها على الورقة الفاتحة. فبلا أرضيةٍ
   يملؤها المنتقي لأنّها «متباعدة»، فتخرج اللوحةُ وفيها موضعان باهتان
   بين ستّةٍ نابضة — **وباهتٌ واحدٌ وسط النابضات يبدو عطلاً لا خياراً.** */
const C_MIN = Number(process.argv[4] || 0);
const hd = (a,b) => { const d = Math.abs(a-b) % 360; return Math.min(d, 360-d); };

const pool = [];
for(let h=0; h<360; h++){ const b = bestOfHue(h); if(b && b.c >= C_MIN) pool.push(b); }
const avgC = (pool.reduce((s,x)=>s+x.c,0)/pool.length).toFixed(3);
console.log(`صبغاتٌ ناجية: ${pool.length}/360 · متوسّطُ الإشباع الممكن ${avgC}`);

let best = null;
for(const seed of pool){
  const ch = [seed];
  while(ch.length < N){
    let bc=null, bd=-1;
    for(const x of pool){
      if(ch.some(y => hd(x.h, y.h) < HUE_SEP)) continue;
      const d = Math.min(...ch.map(y => pairW(x.hex, y.hex)));
      if(d > bd){ bd = d; bc = x; }
    }
    if(!bc) break; ch.push(bc);
  }
  if(ch.length < N) continue;
  let md = Infinity;
  for(let i=0;i<N;i++) for(let j=i+1;j<N;j++) md = Math.min(md, pairW(ch[i].hex, ch[j].hex));
  /* الترجيح: التباعدُ أولاً، ثمّ النبض (متوسّط الإشباع) عند التعادل */
  const vivid = ch.reduce((s,x)=>s+x.c,0)/N;
  if(!best || md > best.md + 1e-9 || (Math.abs(md-best.md) < 1e-9 && vivid > best.vivid))
    best = { md:+md.toFixed(1), vivid:+vivid.toFixed(3), ch };
}

if(!best){ console.log('🔴 لا تكفي — يُخفَّض التباعدُ الصبغيّ أو العدد'); process.exit(0); }

const set = best.ch.slice().sort((a,b)=>a.h-b.h);
console.log(`\nالثمانية · أدنى تباعدٍ في الرؤى الثلاث ΔE ${best.md} · متوسّط الإشباع ${best.vivid}\n`);
console.table(set.map((x,i)=>({
  رمز:'av-'+(i+1), hex:x.hex, صبغة:x.h, إشباع:x.c, خفّة:x.l,
  الحبر: x.ink === INK_W ? 'أبيض' : 'داكن', تباين:x.ct,
  'على الورق':x.pL, 'على الداكن':x.pD })));

for(const [vn, f] of VIS){
  let mn = Infinity, pair='';
  for(let i=0;i<set.length;i++) for(let j=i+1;j<set.length;j++){
    const d = dE(see(set[i].hex,f), see(set[j].hex,f));
    if(d<mn){ mn=d; pair='av-'+(i+1)+'/av-'+(j+1); }
  }
  console.log(`${vn}: أدنى تباعد ΔE ${mn.toFixed(1)}  (${pair})`);
}
console.log('\nCSS:');
console.log(':root{' + set.map((x,i)=>`--av-${i+1}:${x.hex};--av-${i+1}-ink:${x.ink}`).join(';') + '}');
console.log('\nJSON:');
console.log(JSON.stringify(set.map(x=>({ hex:x.hex, ink:x.ink }))));
