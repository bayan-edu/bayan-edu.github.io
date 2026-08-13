/* ══════════════════════════════════════════════════════════
   بيان — api.js
   عميل Supabase. نقطة الاتصال الوحيدة بقاعدة البيانات.
   المفتاح العام (publishable) مكشوف عمداً — الحماية في RLS.
   🔒 service_role key لا يُكتب هنا ولا في أي ملف — أبداً.
   ══════════════════════════════════════════════════════════ */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL  = "https://tjzrfevymfpktfuormhs.supabase.co";
export const SUPABASE_ANON = "sb_publishable_8kuaa_38VYwyiMnwOik5cg_BvylvgYL";

export const db = createClient(SUPABASE_URL, SUPABASE_ANON);
