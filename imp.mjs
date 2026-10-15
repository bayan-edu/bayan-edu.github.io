import pw from '/opt/node-tools/node_modules/playwright/index.js';
const { chromium } = pw;
const STUB=`export const createClient=()=>({auth:{getUser:async()=>({data:{user:null},error:null}),
 onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},rpc:async()=>({data:null,error:null}),
 from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:null,error:null})})})})});`;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const ctx=await b.newContext({viewport:{width:1200,height:500}}); const pg=await ctx.newPage();
const errs=[]; pg.on('pageerror',e=>errs.push(String(e).slice(0,160)));
pg.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,160)));
await pg.route('**/cdn.jsdelivr.net/**', r=>r.fulfill({status:200,contentType:'text/javascript',body:STUB}));
await pg.goto('http://127.0.0.1:8778/index.html',{waitUntil:'domcontentloaded'});
await pg.waitForSelector('.gatex',{timeout:15000});
const r = await pg.evaluate(async () => {
  const out = {};
  for (const m of ['editor','flashcards','teacher','student','ui','auth','analytics','quiz'])
    try { await import(`./js/${m}.js`); out[m]='✔'; } catch(e){ out[m]='✗ '+e.message.slice(0,70); }
  return out;
});
console.log(JSON.stringify(r,null,0));
console.log('أخطاء الطرف:', errs.length?errs.slice(0,3):'لا شيء');
await ctx.close(); await b.close();
