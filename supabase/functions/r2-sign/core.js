/* ══════════════════════════════════════════════════════════
   بيان — r2-sign · core.js
   المنطقُ النقيّ للدالّة الطرفيّة: لا Deno ولا شبكة ولا سرّ.
   فيُقاس في node كما يُشحن (`node tools/r2_sign.test.mjs`).

   لماذا دالّةٌ طرفيّة أصلاً (قرارُ المالك · ٢٠ أكتوبر):
     الرفعُ إلى R2 يقتضي توقيعاً بمفتاحٍ سرّيّ، والسرُّ لا يسكن
     المتصفّح. فالدالّةُ تتحقّق من الصلاحية بـ`can_upload_media()`
     — الحارسُ نفسُه الذي يحرس مخازن Supabase — ثمّ تُسلّم المتصفّحَ
     رابطاً موقَّعاً لملفٍّ واحدٍ بعينه، يرفع إليه مباشرةً ويموت بعد
     دقائق. فلا يمرّ الملفُّ بالدالّة، ولا يرى المتصفّحُ السرّ.

   🔒 وما يُوقَّع (فتردّه R2 إن خالفه المتصفّح — `403`):
        · المسارُ بعينه          — لا يُرفع إلى غيره
        · `Content-Type`         — تقرّره الدالّةُ من اللاحقة لا المتصفّح
        · `Content-Length`       — الحجمُ المُعلَن، فلا يُرفع أكبرُ منه
        · `If-None-Match: *`     — لا يُطمَس ملفٌّ قائم (`412`)، نظيرُ
                                   `upsert:false` في `api.js`
   ══════════════════════════════════════════════════════════ */

/* المدّة: تُفحص عند بدء الرفع لا عند تمامه، والصوتُ ١٠ م.ب على شبكةٍ
   ضعيفة يبدأ في ثوانٍ. وعشرُ دقائق تتّسع لتأخّرِ المؤلّف بين التوقيع
   والرفع، ولا تُبقي الرابطَ صالحاً زمناً يُغري. */
export const EXPIRES = 600;

/* 📐 المسطرةُ مسطرةُ `js/media.js` حرفاً — `AUDIO_EXT`/`AUDIO_MAX_MB`
   و`IMG_EXT`/`IMG_MAX_MB` — والأنواعُ أنواعُ مخزنَي Supabase.
   ⚠️ ومسطرتان تفترقان: حدٌّ هنا أضيقُ من media.js يردّ ما قبلته
      الشاشة بعد الانتظار، وأوسعُ يقبل ما لا تقبله. فإن تغيّر أحدُهما
      تغيّرا معاً. (والقياسُ يقرأ media.js ويقارن — لا يثق بهذا التعليق.)
   📐 والفيديو غائبٌ عمداً: يدخل مع مشغّله، لا قبله. */
export const RULES = Object.freeze({
  audio: { maxMb: 10, types: { mp3: 'audio/mpeg', m4a: 'audio/mp4', ogg: 'audio/ogg',
                               wav: 'audio/wav',  aac: 'audio/aac' } },
  img:   { maxMb: 2,  types: { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
                               webp: 'image/webp' } },
});

/* شكلُ المفتاح كما تبنيه `mediaKey` في media.js:
     مجلّد/نطاق-ستُّ خاناتٍ.لاحقة   والنطاقُ [a-z0-9]{1,8} بعد تطهيره
   والوسمُ `r2:` مقبولٌ ومنزوع: المسارُ في المخزن هو المفتاحُ بلا وسمه.
   ⇒ لا `..` ولا `/` زائدة ولا حرفٌ كبير ولا مسافة — المسطرةُ تمنعها بنيةً. */
export const KEY_RX = /^(?:r2:)?([a-z]+)\/([a-z0-9]{1,8})-([a-z0-9]{6})\.([a-z0-9]{2,4})$/;

/**
 * يفحص طلبَ التوقيع. العقد: { path, type, size, key } أو { error, status }.
 * الحجمُ يُعلنه المتصفّح (file.size) ويُوقَّع، فلا يُرفع غيرُه.
 */
export function check(body){
  const raw = String(body?.key ?? '');
  const m = KEY_RX.exec(raw);
  if(!m) return { error: 'مفتاحٌ بغير مسطرة media.js', status: 400 };

  const [, folder, , , ext] = m;
  const rule = RULES[folder];
  if(!rule) return { error: `مجلّدٌ غير مأذون: ${folder}`, status: 400 };

  const type = rule.types[ext];
  if(!type) return { error: `صيغةٌ غير مقبولة في ${folder}: ${ext}`, status: 400 };

  const size = Number(body?.size);
  if(!Number.isInteger(size) || size < 1) return { error: 'حجمٌ غير صالح', status: 400 };
  if(size > rule.maxMb * 1048576)
    return { error: `الملفّ أكبر من حدّ ${folder} (${rule.maxMb} م.ب)`, status: 413 };

  const path = raw.replace(/^r2:/, '');
  return { path, type, size, key: 'r2:' + path };
}

/**
 * يوقّع رابطَ رفعٍ لملفٍّ واحد. `AwsClient` يُمرَّر ولا يُستورد: الدالّةُ
 * تمرّر `npm:aws4fetch` والقياسُ يمرّر نسختَه — فالمنطقُ واحدٌ في البيئتين.
 * @returns {{ url: string, headers: Record<string,string> }}
 *   `headers` ما يجب أن يرسله المتصفّح بأعيانه. و`Content-Length`
 *   ليس منها: يضعه المتصفّحُ وحده من حجم الملفّ، ولا يُكتب يدوياً.
 */
export async function presign(AwsClient, env, { path, type, size }, opts = {}){
  const client = new AwsClient({ accessKeyId: env.accessKeyId, secretAccessKey: env.secretAccessKey,
                                 service: 's3', region: 'auto' });
  const url = new URL(`https://${env.accountId}.r2.cloudflarestorage.com/${env.bucket}/${path}`);
  url.searchParams.set('X-Amz-Expires', String(opts.expires ?? EXPIRES));

  const send = { 'Content-Type': type, 'If-None-Match': '*' };
  const signed = await client.sign(
    new Request(url, { method: 'PUT', headers: { ...send, 'Content-Length': String(size) } }),
    { aws: { signQuery: true, allHeaders: true, ...(opts.datetime ? { datetime: opts.datetime } : {}) } });

  return { url: signed.url, headers: send };
}
