/* ══════════════════════════════════════════════════════════
   بيان — recordings-sweep · الدالّةُ الطرفيّة الثانية (172 · يوميّة منذ 173)

   كنّاسُ التسجيلات: يحذف من مخزن `recordings` ما جاوز خمسة أيام،
   واليتيمَ الذي جاوز ساعة. فلا يبقى صوتُ طالبٍ أكثر من سبعة أيام —
   وعدُ صفحة الخصوصية §٢ و§٨.

   لماذا دالّةٌ طرفيّة لا SQL:
     حذفُ صفٍّ من `storage.objects` يُيتّم الملفَّ في التخزين. والحذفُ
     الصحيح عبر Storage API، وهو يقتضي مفتاحَ الخدمة — والمفتاحُ يسكن
     هنا (متغيّرُ بيئةٍ يضعه Supabase بنفسه) لا في القاعدة ولا في المتصفّح.

   🔑 من يناديها: `pg_cron` مرّةً في اليوم (٣:١٧ فجراً بالرياض) عبر `pg_net`، ومعه
      `x-sweep-secret` من Vault. **والدالّةُ لا تطابق المفتاحَ بنفسها:**
      تمرّره إلى `recordings_sweep_due` فتطابقه القاعدةُ بما في Vault.
      ⇒ لا سرَّ هنا يُضبط، ومن نادى الرابطَ بغير المفتاح رُدّ (`403`).
   ⚙️ `verify_jwt = false`: النداءُ من القاعدة لا من مستخدم، فلا JWT له.
      والحارسُ المفتاح — وأقصى ما يفعله نداءٌ مشروعٌ زائد حذفُ ما وجب حذفُه.
   ══════════════════════════════════════════════════════════ */
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const BUCKET = 'recordings';
const LIMIT = 500;   // في المرور الواحد — وما زاد يلحقه مرورُ الغد (والحدُّ في القاعدة: 173)
const CHUNK = 100;   // في نداء الحذف الواحد

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'POST وحده' }, 405);

  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) return json({ error: 'مفتاحُ الخدمة غائبٌ عن بيئة الدالّة' }, 500);

  const secret = req.headers.get('x-sweep-secret') ?? '';
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  /* ① ماذا يُحذف — والقاعدةُ تطابق المفتاحَ هنا أوّلاً */
  const { data: due, error: e1 } = await db.rpc('recordings_sweep_due', { p_secret: secret, p_limit: LIMIT });
  if (e1) {
    const denied = e1.code === '42501';
    return json({ error: denied ? 'مرفوض' : e1.message }, denied ? 403 : 500);
  }
  const paths: string[] = Array.isArray(due) ? due.filter((p): p is string => typeof p === 'string') : [];

  /* ② الحذفُ بـStorage API — دفعاتٍ، ولا تُوقف دفعةٌ فاشلةٌ أخواتِها */
  let removed = 0;
  const errors: string[] = [];
  for (let i = 0; i < paths.length; i += CHUNK) {
    const { data, error } = await db.storage.from(BUCKET).remove(paths.slice(i, i + CHUNK));
    if (error) errors.push(error.message);
    else removed += data?.length ?? 0;
  }

  /* ③ الختمُ والسجلّ — والقاعدةُ تقرأ «غاب الملفّ» من المخزن نفسه */
  const { data: done, error: e3 } = await db.rpc('recordings_sweep_done', {
    p_secret: secret, p_listed: paths.length, p_removed: removed,
    p_note: errors.length ? errors.join(' | ') : null,
  });
  if (e3) errors.push('الختم: ' + e3.message);

  const out = { listed: paths.length, removed, ...(done ?? {}), errors };
  console.log('recordings-sweep', JSON.stringify(out));
  return json(out, errors.length ? 500 : 200);
});
