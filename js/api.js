/* ══════════════════════════════════════════════════════════
   بيان — api.js
   الطبقة الوحيدة التي تلمس Supabase.

   🔒 القاعدة، وهي قابلة للفحص آلياً:
      db خاصّ بهذا الملف — لا يُصدَّر. أي وحدة تريد بيانات
      تنادي دالة من هنا. للتحقق:
         grep -rn "\bdb\." js/ --exclude=api.js
      لا مخرجات = الطبقة سليمة.

   📐 العقد: كل دالة تُعيد استجابة Supabase كما هي — { data, error }
      (وللعدّ: { count }). معالجة الخطأ تبقى في الواجهة.

   ℹ️ هذا الملف ورقة في شجرة الاستيراد: لا يستورد أي وحدة من
      وحدات التطبيق، فلا تنطبق عليه قاعدة «function لا const».

   ⚠️ تضمين profiles يحتاج تلميحاً دائماً — أربعة جداول لها مفتاحان إليه:
        attempts          user_id · graded_by
        messages          student_id · sender_id
        mentorships       student_id · teacher_id     ← لم يُضمَّن بعد
        teacher_requests  user_id · reviewed_by       ← لم يُضمَّن بعد
      كل ما عدا profiles مفتاح واحد ⇒ التضمين المباشر آمن.
      أعد فحص الغموض بعد أي تعديل على المخطط (الاستعلام في CLAUDE.md).

   🔑 المفتاح العام مكشوف عمداً — الحماية في RLS.
      service_role key لا يُكتب هنا ولا في أي ملف — أبداً.
   ══════════════════════════════════════════════════════════ */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = "https://tjzrfevymfpktfuormhs.supabase.co";
const SUPABASE_ANON = "sb_publishable_8kuaa_38VYwyiMnwOik5cg_BvylvgYL";

const db = createClient(SUPABASE_URL, SUPABASE_ANON);


/* ═══════════ ① الجلسة ═══════════ */

export const currentUser    = ()                => db.auth.getUser();
export const signIn         = (email, password) => db.auth.signInWithPassword({ email, password });
export const signOutSession = ()                => db.auth.signOut();
export const sendResetLink  = email             => db.auth.resetPasswordForEmail(email);

/* 🆕 b103 · تغييرُ كلمة المرور من الملفّ — **يقع فوراً ولا ينتظر بريداً**،
   بخلاف `sendResetLink` التي تُرسل رابطاً لمن نسيها وهو خارج الجلسة.
   ⚠️ **والبريدُ لا يُغيَّر من هنا عمداً:** `updateUser({email})` تُرسل
      تأكيداً إلى العنوان الجديد ولا يقع التغييرُ حتى يُضغط — فشاشةٌ
      تقول «حُفظ» تكذب، ومسارُ العودة من الرابط غيرُ مبنيّ. **وعدٌ لا
      يُنجَز خيرٌ من وعدٍ يُنقَض.** */
export const updatePassword = password => db.auth.updateUser({ password });

/* 🆕 b91 · الدخول بحساب Google — نداءٌ واحد، وسوبابيس يتولّى OAuth كلَّه.
   ويبقى العهد: «Supabase مباشرة، لا خادمَ وسيط».
   ⚠️ و`redirectTo` يُبنى من الصفحة الحاضرة **بلا hash ولا استعلام** —
      وعنوانُ العودة يجب أن يكون مسموحاً في لوحة Supabase، وإلا رُدّ
      المستخدمُ إلى الموقع الافتراضيّ لا إلى حيث انطلق. */
export const signInWithGoogle = () => db.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: location.origin + location.pathname } });

/* ختمُ الموافقة على سياسة الخصوصية (121) */
export const acceptPolicy = version => db.rpc('accept_policy', { p_version: version });
export const onAuthChange   = cb                => db.auth.onAuthStateChange(cb);

// scale/level يُحملان في البيانات الوصفية لا في profiles:
// بين التسجيل وتأكيد البريد لا توجد جلسة، والبيانات الوصفية تعبر الفجوة.
/* 🆕 b91 · و`policy_version` تعبر الفجوة كأختيها: حين يكون «تأكيد
   البريد» مفعَّلاً لا توجد جلسةٌ لحظةَ التسجيل، فلا يُختَم شيء —
   والنيّةُ تُحفَظ في البيانات الوصفية ويختمها `boot` عند أوّل دخول.
   **وإلا ضاعت موافقةٌ وقعت فعلاً.** */
/* 🆕 123 · و`gram_gender` تعبر الفجوة كأخواتها — ولم يُمَسّ المحفِّز
   `handle_new_user` لأجلها: هو الذي يعبره كلُّ تسجيل، وخطأٌ فيه يُغلق
   البابَ على الجميع. **ومسلكٌ قائمٌ مُجرَّب آثرُ من محفِّزٍ يُستبدل.**
   ⚠️ والختمُ في `sealGram` أدناه — فما لا يُختَم يبقى `null`، وهو
      المعنى الصحيح: «لم يُسأل بعد» لا «مذكّر». */
export const signUp = (email, password, fullName, klass, scaleId, levelId, policyVersion, gramGender) =>
  db.auth.signUp({ email, password,
    options:{ data:{ full_name: fullName, klass,
                     scale_id: scaleId, level_id: levelId,
                     policy_version: policyVersion,
                     gram_gender: gramGender || null } } });

/* 🆕 b90 · تسجيلُ المعلّم يقف هنا عند الاسم: بقيّةُ حقوله تحتاج قائمةَ
   المواد، و`p_subjects_read` تشترط `auth.uid() is not null` ⇒ لا تُقرأ
   قبل الجلسة. فتُؤجَّل إلى شاشة التفاصيل.
   🔑 و`wants_teacher` تعبر الفجوة: من أنشأ حسابه ثمّ ترك الشاشة يعود
      إليها عند أوّل دخول — **ولولا العلامة لَبقي طالباً بلا بابٍ يعود
      منه**، إذ سقط رابط «انضم كمعلم». */
export const signUpTeacher = (email, password, fullName, policyVersion, gramGender) =>
  db.auth.signUp({ email, password,
    options:{ data:{ full_name: fullName, wants_teacher: true,
                     policy_version: policyVersion,
                     gram_gender: gramGender || null } } });


/* ═══════════ ② الملف الشخصي والمناهج ═══════════ */

export const myProfile = uid => db.from('profiles').select('*').eq('id', uid).single();
export const myRole    = ()  => db.rpc('my_role');

// دالة لا UPDATE: تتحقّق أن الصف ينتمي للمنهج، وتُعيد {ok,error}
export const setMyGrade = (scaleId, levelId) =>
  db.rpc('set_my_grade', { p_scale: scaleId, p_level: levelId });

/* 🆕 b103 · الاسم — `update` مباشر ومنحٌ عموديّ يحرسه (٥٠). ولا دالّةَ
   له: لا حكمَ يُحرس، بخلاف الصفّ الذي يُتحقَّق انتماؤه للسلّم.
   ⚠️ و`.select()` ليست زينة — بها يُعرف **عددُ ما تغيّر**، وRLS تحجب
      بصفر صفوفٍ **بلا خطأ** (درسُ ١٠٦). */
export const setMyName = (uid, name) =>
  db.from('profiles').update({ full_name: name }).eq('id', uid).select('id');

/* 🆕 b103 · حقولُ المعلّم الثلاثة — **كتابةٌ واحدة لا ثلاث.** ثلاثةُ
   نداءاتٍ متتابعة تُنتج نجاحاً جزئياً عند انقطاعٍ في الوسط: يُحفظ
   الاسمُ وتسقط النبذة، **ولا يعرف صاحبُها أيُّهما وقع.**
   ⚠️ و`register_teacher` تفحص هذه الحقول عند التسجيل، وهذه تحرّرها
      بعده — والحارسُ هناك **منحٌ عموديّ** هنا (٥٠)، لا دالّةَ ثانية. */
export const setMyTeacherInfo = (uid, o) =>
  db.from('profiles').update({
    school:    o.school ?? null,
    bio:       o.bio    ?? null,
    years_exp: o.years  ?? null
  }).eq('id', uid).select('id');

/* 🆕 123 · صيغةُ المخاطبة — `update` مباشر لا دالّة، ومنحٌ عموديّ
   يحرسه (على غرار ٥٠). والقيدُ في القاعدة هو كلُّ التحقّق المطلوب،
   فلا حكمَ تحرسه دالّة — **ودالّةٌ بلا حكمٍ طبقةٌ تُصان بلا مقابل.**
   ⚠️ وهذه **الكاتبُ الوحيد** للعمود: يعبرها مسلكُ Google ومسلكُ
      «يُسأل مرّةً» وختمُ البيانات الوصفية جميعاً. ونسختان تتفارقان.
   📌 والمعرّفُ يُمرَّر ولا يُقرأ من `S`: هذه الوحدةُ لا تعرف الحالةَ
      المشتركة (كما `myProfile(uid)` فوقها) — ووحدةٌ تقرأ حالةً تصير
      مرتبطةً بترتيب التحميل. */
export const setMyGram = (uid, g) =>
  db.from('profiles').update({ gram_gender: g }).eq('id', uid).select('gram_gender');

/* 🆕 125 · اختياراتُ العلامة — `update` مباشر ومنحٌ عموديّ يحرسه.
   🔑 **والفراغُ يُرسَل صراحةً `null` ولا يُحذف من الحمولة:** «أرجِعه
      إلى المشتقّ» فعلٌ له معنًى، ولو أُسقط المفتاحُ من الكائن لبقيت
      القيمةُ القديمة في القاعدة — **فيرى صاحبُها اختياراً ألغاه.**
   ⚠️ و`avatar_motif` يُرسَل مع `avatar_kind` دائماً: القاعدة ترفض
      نوعَ «زخرفة» بلا زخرفة، وإرسالُ أحدهما وحده يُسقط الحفظ كلَّه. */
export const setMyAvatar = (uid, o) =>
  db.from('profiles').update({
    avatar_kind:   o.avatar_kind   ?? null,
    avatar_motif:  o.avatar_motif  ?? null,
    avatar_frame:  o.avatar_frame  ?? null,
    avatar_color:  o.avatar_color  ?? null,
    avatar_shape:  o.avatar_shape  ?? null,
    avatar_letter: o.avatar_letter ?? null
  }).eq('id', uid).select('avatar_frame');

/* ختمُ ما عبر في البيانات الوصفية — يُنادى من boot.
   🔑 **ولا يكتب إلا على فراغ:** من غيّر صيغتَه من قائمة الحساب تبقى
      البياناتُ الوصفية تحمل الأولى إلى الأبد، فلو كُتبت في كلّ دخولٍ
      **لرُدَّ تصحيحُه عليه في كلّ مرّة** — وهو عطلٌ صامت: يُصحّح
      فيُقبَل، ثمّ يعود غداً كما كان. */
export const sealGram = async (uid, profile, meta) => {
  const g = meta?.gram_gender;
  if(profile?.gram_gender || (g !== 'm' && g !== 'f')) return null;
  const { data, error } = await setMyGram(uid, g);
  if(!error && data?.length) profile.gram_gender = g;
  return error;
};

export const academicScales = () =>
  db.from('scales')
    .select('id,name,country,sort_order,levels(id,name,rank)')
    .eq('kind','academic').order('sort_order');

/* 🆕 b93 · موادّ التسجيل — دالّةٌ لا قراءةُ جدول (122).
   🔴 وكانت قراءةً مباشرة فسقطت: `p_subjects_read` تشترط
      `auth.uid() is not null`، فلا تُقرأ القائمةُ قبل الجلسة —
      وانقسم نموذجُ المعلّم خطوتين لأجل ذلك.
   🔑 ولم تُرخَ السياسة: الجدولُ فيه `owner_id` و`placement` و`tool`.
      فالدالّةُ تُعيد **الاسمَ والمعرّفَ فقط** — الحقُّ بقدره.
   ⚠️ ولا تُخلَط بـ list_teachable_subjects: تلك تشترط is_teacher()،
      والمسجِّلُ هنا لم يصر معلّماً بعد. */
export const signupSubjects = () => db.rpc('signup_subjects');


/* ═══════════ ②-ب تسجيل المعلّم وشهادة التأليف (120) ═══════════ */

export const registerTeacher = o => db.rpc('register_teacher', {
  p_full_name: o.fullName, p_school: o.school, p_subject: o.subject,
  p_years: o.years, p_note: o.note, p_phone: o.phone });

/* 🔒 الشهادةُ تُكتب في القاعدة بعد قراءة طريقةِ الجلسة من المصادِق —
   والواجهةُ تطلبها ولا تمنحها. */
export const markAuthorVerified = () => db.rpc('mark_author_verified');
export const authClaimsPresent  = () => db.rpc('auth_claims_present');

/* رمزُ بريدٍ مستقلٌّ عن تأكيد التسجيل العامّ — ولا يُنشئ حساباً */
export const sendEmailOtp = email =>
  db.auth.signInWithOtp({ email, options:{ shouldCreateUser:false } });
export const verifyEmailOtp = (email, token) =>
  db.auth.verifyOtp({ email, token, type:'email' });


/* ═══════════ ③ المواد والدروس والمصادر ═══════════ */

export const listSubjects = ()  => db.rpc('list_subjects');
export const listLessons  = sid => db.rpc('list_lessons', { p_subject: sid });

export const markItemOpened    = id => db.rpc('track_item', { p_item: id, p_status: 'opened' });
export const markItemCompleted = id => db.rpc('track_item', { p_item: id, p_status: 'completed' });


/* ═══════════ ④ الإرشاد ═══════════ */

export const listMentors = sid => db.rpc('list_mentors', { p_subject: sid });
export const myMentor    = sid => db.rpc('my_mentor',    { p_subject: sid });

// teacherId = null → المتابعة الذاتية
export const chooseMentor = (sid, teacherId) =>
  db.rpc('choose_mentor', { p_subject: sid, p_teacher: teacherId });


/* ═══════════ ⑤ الاختبار ═══════════ */
/* 🔒 لا يصل المتصفح مفتاح إجابة واحد — التصحيح كله في submit_attempt */

export const getQuiz = qid => db.rpc('get_quiz', { p_quiz: qid });

export const submitAttempt = (quizId, answers, durationSec, auto) =>
  db.rpc('submit_attempt', {
    p_quiz: quizId, p_answers: answers, p_duration: durationSec, p_auto: auto });


/* ═══════════ ⑥ الملاحظات والتصحيح ═══════════ */

/* 🔔 «ما الجديد عندي؟» — جوابٌ واحد بحسب الدور (106):
      الطالب         feedback · messages · due · bell
      المعلّم/المدير  grading · messages · requests · bell
   و bell رقمُ الجرس، يُقرَّر في القاعدة لا هنا — والمستحقّ خارجه عمداً.
   ⚠️ حلّت محلّ unreadFeedbackCount: عدٌّ في موضعين يختلف يوماً (ثابت ⑨). */
export const myCounts = () => db.rpc('my_counts');

export const myFeedback = uid =>
  db.from('attempts')
    .select('id,submitted_at,pct,score,total,essay_score,teacher_comment,read_by_student,quizzes(title)')
    .eq('user_id', uid).not('teacher_comment','is',null)
    .order('submitted_at', { ascending:false });

/* «قُرئت» تعني «عُرضت»: تُمرَّر معرّفاتُ ما رسمته الشاشة، ولا «علِّم الكلّ».
   🔴 كانت update مباشرة، وسياسة UPDATE على attempts للمعلّم وحده (STATE ⑦)
      ⇒ صفر صفوف بلا خطأ، فبقي الرقم أبداً. الآن دالّةٌ تُرجع عددَ ما تغيّر
      (106) — فيُرى الفشل. */
export const markFeedbackRead = ids => db.rpc('mark_feedback_read', { p_ids: ids });

// المعلم لا يرى إلا طلابه — العزل في RLS عبر teaches()، لا في هذا الاستعلام
export const attemptsToGrade = () =>
  db.from('attempts')
    .select('id,submitted_at,score,total,pct,essay_score,teacher_comment,profiles!attempts_user_id_fkey(full_name,klass),quizzes(title)')
    .order('submitted_at', { ascending:false }).limit(200);

export const attempt = id =>
  db.from('attempts').select('*,profiles!attempts_user_id_fkey(full_name),quizzes(title)').eq('id', id).single();

export const attemptAnswers = id =>
  db.from('answers').select('essay_text,questions(body,kind,position)').eq('attempt_id', id);

export const saveGrade = (id, essayScore, comment, graderId) =>
  db.from('attempts').update({
    essay_score: essayScore,
    teacher_comment: comment,
    graded_at: new Date().toISOString(),
    graded_by: graderId,
    read_by_student: false
  }).eq('id', id);


/* ═══════════ ⑦ الرسائل ═══════════ */
/* 🔴 أسماء المفاتيح الأجنبية أدناه هشّة: تغييرها في SQL يكسر الرسائل
      بلا خطأ ظاهر. جمعها في موضع واحد هو أهمّ ما تشتريه هذه الطبقة.
      نفس القاعدة تنطبق على attempts أعلاه: لها مفتاحان إلى profiles
      (user_id · graded_by) فيلزم التلميح الصريح في كل تضمين. */

export const studentThread = sid =>
  db.from('messages')
    .select('*, profiles!messages_sender_id_fkey(full_name)')
    .eq('student_id', sid).order('created_at');

export const teacherInbox = () =>
  db.from('messages')
    .select('*, student:profiles!messages_student_id_fkey(full_name)')
    .order('created_at', { ascending:false }).limit(500);

export const sendMessage = ({ studentId, senderId, senderRole, body }) =>
  db.from('messages').insert({
    student_id: studentId, sender_id: senderId, sender_role: senderRole, body,
    ...(senderRole === 'teacher' ? { read_by_teacher:true } : { read_by_student:true })
  });

// الطالب يقرأ رسائل معلمه
export const studentReadsThread = sid =>
  db.from('messages').update({ read_by_student:true })
    .eq('student_id', sid).eq('sender_role','teacher').eq('read_by_student', false);

// المعلم يقرأ رسائل طالبه
export const teacherReadsThread = sid =>
  db.from('messages').update({ read_by_teacher:true })
    .eq('student_id', sid).eq('sender_role','student').eq('read_by_teacher', false);


/* ═══════════ ⑧ موادّ المعلم ═══════════ */

export const listTeachableSubjects = ()  => db.rpc('list_teachable_subjects');
export const setMySubjects         = ids => db.rpc('set_my_subjects', { p_ids: ids });

/* 🆕 b88 · السعة والاستقبال — تُرجع منذ 116 هل مسّ التحديثُ صفّاً.
   فمادّةٌ نُقرت ولم تُحفظ بعدُ لا صفَّ لها ⇒ false لا «نعم» صامتة. */
export const setSubjectCapacity = (id, cap, accepting) =>
  db.rpc('set_subject_capacity',
         { p_subject: id, p_cap: cap, p_accepting: accepting });


/* ═══════════ ⑨ جلسات التدرّب (117 · 118 · 119) ═══════════
   🔒 الأوّلان وحدهما مفتوحان لـ anon في القاعدة كلِّها. والأخيران
      للمعلّم. والنداءُ هنا واحدٌ في الحالين — والحارسُ في الدالّة. */

export const openPractice   = tok => db.rpc('open_practice_session', { p_token: tok });
export const answerPractice = (tok, name, ref, ans) =>
  db.rpc('submit_practice_answer',
         { p_token: tok, p_name: name, p_ref: String(ref), p_answer: ans });

export const createPractice = (kind, source, days) =>
  db.rpc('create_practice_session',
         { p_kind: kind, p_source: source, p_days: days });
export const myPractice = () => db.rpc('my_practice_sessions');


/* ═══════════ ⑨ التأليف ═══════════ */

// شجرة كاملة في نداء واحد: مناهج · صفوف · مسارات · مواد · مقرّرات
// + أنماط العناصر وأكواد التشخيص. تُحمَّل مرة وتُخزَّن في S.tree
export const authorTree   = ()  => db.rpc('author_tree');
export const authorLessons = cid => db.rpc('author_lessons', { p_course: cid });

// أهدافُ درسِ الاختبار — قائمةُ ما يصلح وسمُ سؤالٍ به (139).
// ولا موضعَها author_tree: تلك تُحمَّل مرّةً للجلسة، وهذه تتبع اختباراً بعينه.
export const objectivesForQuiz = qid => db.rpc('objectives_for_quiz', { p_quiz: qid });

export const listTools = () => db.rpc('list_tools');
export const toolRoutes  = t => db.rpc('tool_routes', { p_tool: t });
export const saveRoute   = o => db.rpc('save_route', {
  p_id: o.id ?? null, p_from: o.from ?? null,
  p_min: o.min, p_max: o.max, p_verdict: o.verdict,
  p_to: o.to ?? null, p_level: o.level ?? null, p_note: o.note ?? null });
export const deleteRoute = id => db.rpc('delete_route', { p_id: id });
export const placementStart  = t => db.rpc('placement_start', { p_tool: t });
export const placementSubmit = (sid, ans, sec) =>
  db.rpc('placement_submit', { p_session: sid, p_answers: ans, p_duration: sec });
export const deleteQuiz = (id, confirm=false) =>
  db.rpc('delete_quiz', { p_quiz: id, p_confirm: confirm });
export const saveLesson = o => db.rpc('save_lesson', {
  p_id:        o.id       ?? null,
  p_course:    o.course,
  p_title:     o.title,
  p_unit_id:   o.unitId   ?? null,
  p_summary:   o.summary  ?? null,
  p_position:  o.position ?? 0,
  p_requires:  o.requires ?? null,
  p_pass_mark: o.passMark ?? 65,
  p_published: o.published ?? false,
  p_strand:    o.strand ?? null });

// محرّر الأسئلة — نقيض get_quiz: يُعيد المفاتيح والتشخيص للمؤلّف
export const quizForEdit      = id => db.rpc('quiz_for_edit',      { p_quiz: id });
export const duplicateQuestion = id => db.rpc('duplicate_question', { p_id: id });
export const retireQuestion    = id => db.rpc('retire_question',    { p_id: id });
export const deleteQuestion    = id => db.rpc('delete_question',    { p_id: id });
export const quizReadiness     = id => db.rpc('quiz_readiness',     { p_quiz: id });
export const publishQuiz = (id, on = true) =>
  db.rpc('publish_quiz', { p_quiz: id, p_publish: on });
export const publishLesson = (id, on = true) =>
  db.rpc('publish_lesson', { p_lesson: id, p_publish: on });

export const saveQuiz = o => db.rpc('save_quiz', {
  p_id: o.id ?? null, p_course: o.course ?? null, p_title: o.title,
  p_minutes: o.minutes ?? 25, p_unit: o.unit ?? null,
  p_code: o.code ?? null, p_official: o.official ?? true,
  p_subject: o.subject ?? null, p_tool: o.tool ?? null,
  p_station: o.station ?? null,
     p_kind: o.stationKind ?? null,
  // ⚠️ null في plays معنًى («بلا حدّ») لا «لم يُرسل» ⇒ تُرسل دائماً
  p_plays: o.plays ?? null, p_reveal: o.reveal ?? null,
  p_pass_mark: o.passMark ?? null, p_shuffle: o.shuffle ?? null });

// p_options: [{label, body, correct, dx}] — المعرّفات تُبنى في القاعدة
/* 🔑 عقدُ استيراد الاختبار (147 · 148) — دالّةٌ واحدة تُنشئ الاختبارَ
   وبندَه ونصوصَه وأسئلتَه بحرّاس المحرّر نفسِها، ذرّيّةً. و`dry` تُجري
   المسارَ كلَّه ثمّ تُنقضه ⇒ ما قالت «يمرّ» مرّ عند الاعتماد. */
export const importQuiz = (course, payload, dry = true) =>
  db.rpc('import_quiz', { p_course: course, p_payload: payload, p_dry_run: dry });

/* 🆕 عقدُ استيراد البطاقات (159) — والفرقُ عن أخيه فرقان:
   · لكلّ بطاقةٍ **دروسُها وفروعُها**، لا واحدٌ للدفعة كما في شاشة اللصق.
   · والوسمُ **يُضاف ولا يُستبدل** — فما وسمه المعلّمُ بيده لا يُمحى
     أثراً جانبيّاً لاستيراد. */
export const importCards = (course, payload, dry = true) =>
  db.rpc('import_cards', { p_course: course, p_payload: payload, p_dry_run: dry });

export const saveQuestion = o => db.rpc('save_question', {
  p_id:          o.id      ?? null,
  p_quiz:        o.quiz,
  p_kind:        o.kind    ?? 'mcq',
  p_body:        o.body,
  p_position:    o.position ?? 0,
  p_options:     o.options ?? [],
  p_explanation: o.explanation ?? null,
  p_model:       o.model   ?? null,
  p_passage:     o.passage ?? null,
  p_objective:   o.objective ?? null,
  p_points:      o.points  ?? 1,
  p_lang:        o.lang    ?? 'ar',
  p_difficulty:  o.difficulty ?? null,
  p_image:       o.image   ?? null,
  p_video:       o.video   ?? null,
  p_audio:       o.audio   ?? null,
  p_section:     o.section ?? null,
  p_accept:      o.accept  ?? null,
  p_wrong:       o.wrong   ?? null,
  p_bank:        o.bank    ?? null });

export const savePassage = o => db.rpc('save_passage', {
  p_id: o.id ?? null, p_quiz: o.quiz, p_title: o.title ?? null,
  p_body: o.body ?? null, p_media: o.media ?? null,
  p_kind: o.kind ?? 'text',
  p_lang: o.lang ?? 'ar', p_position: o.position ?? 0 });

export const deletePassage = id => db.rpc('delete_passage', { p_id: id });

// النصّ والقسم حاويتان تعلوان مجموعة — تُربطان بمدى لا بسؤال
export const attachPassage = (pid, ids) =>
  db.rpc('attach_passage', { p_passage: pid, p_ids: ids });
export const setSection = (sec, ids) =>
  db.rpc('set_section', { p_section: sec, p_ids: ids });

// والخانة ثالثتهما — لكنها مجموعة لا مدى: النسخ لا تتجاور بالضرورة
export const setVariant   = ids => db.rpc('set_variant',   { p_ids: ids });
export const clearVariant = ids => db.rpc('clear_variant', { p_ids: ids });

// مصادر الدرس — دالة قراءة خاصة بالتأليف (p_items_read تحجب المدير)
export const lessonItems  = lid => db.rpc('lesson_items',  { p_lesson: lid });
export const deleteItem   = id  => db.rpc('delete_item',   { p_id: id });
export const reorderItems = (lid, ids) =>
  db.rpc('reorder_items', { p_lesson: lid, p_ids: ids });
// وأسئلة الاختبار مثلها — والقائمة كاملة، فالناتج ١..ن بلا فجوة
export const reorderQuestions = (qid, ids) =>
  db.rpc('reorder_questions', { p_quiz: qid, p_ids: ids });

export const saveItem = o => db.rpc('save_item', {
  p_id: o.id ?? null, p_lesson: o.lesson, p_kind: o.kind,
  p_title: o.title, p_description: o.description ?? null,
  p_url: o.url ?? null, p_body: o.body ?? null, p_quiz: o.quiz ?? null,
  p_position: o.position ?? 0, p_duration: o.duration ?? null,
  p_lang: o.lang ?? 'ar', p_official: o.official ?? false,
  p_is_graded: o.isGraded ?? false, p_required: o.required ?? false,
  p_visibility: o.visibility ?? 'private' });

export const saveUnit = o => db.rpc('save_unit', {
  p_id: o.id ?? null, p_course: o.course,
  p_title: o.title, p_position: o.position ?? 0 });

/* cards — البطاقات: المجموعة تتبع (مادة · صفّ) لا مقرَّراً */
export const subjectDecks = sid => db.rpc('subject_decks', { p_subject: sid });
export const deckCards    = did => db.rpc('deck_cards',    { p_deck: did });
export const deleteCard   = id  => db.rpc('delete_card',   { p_id: id });
export const deleteDeck   = id  => db.rpc('delete_deck',   { p_id: id });
export const saveCards    = (did, rows) =>
  db.rpc('save_cards', { p_deck: did, p_rows: rows });
export const saveCard = o => db.rpc('save_card', {
  p_id: o.id ?? null, p_deck: o.deck ?? null,
  p_front: o.front, p_back: o.back,
  p_note: o.note ?? null, p_audio: o.audio ?? null,
  p_image: o.image ?? null, p_lang: o.lang ?? 'ar' });
/* 🔑 ولا p_lesson هنا (sql/157): الدرسُ صار على البطاقة، والدالّةُ
   تصيح إن أُرسل — ومعاملٌ يُقبل ولا يُكتب أخطرُ من معاملٍ يُرفض. */
export const saveDeck = o => db.rpc('save_deck', {
  p_id: o.id ?? null, p_title: o.title,
  p_subject: o.subject ?? null, p_level: o.level ?? null,
  p_position: o.position ?? 0 });

/* ── بُعدا البطاقة (157) — الدرسُ أين تظهر، والفرعُ ما نوعُها ──
   دالّتان لكلّ بُعد: استبدالٌ كاملٌ لبطاقةٍ واحدة (تحرير)، ووضعٌ
   أو رفعٌ لدفعةٍ على درسٍ واحد (لصق). */
export const setCardLessons  = (id, ids) =>
  db.rpc('set_card_lessons',  { p_card: id, p_lessons: ids });
export const setCardStrands  = (id, ids) =>
  db.rpc('set_card_strands',  { p_card: id, p_strands: ids });
export const linkCardsLesson = (ids, lesson, on = true) =>
  db.rpc('link_cards_lesson', { p_cards: ids, p_lesson: lesson, p_on: on });
export const linkCardsStrand = (ids, strand, on = true) =>
  db.rpc('link_cards_strand', { p_cards: ids, p_strand: strand, p_on: on });
/* ── السؤالُ يُحيل إلى بطاقته (158) ──
   وبها يعمل مدخلُ التشخيص في `due_cards` المبنيُّ منذ الملفّ `100`.
   ثلاثُ دوالَّ لا واحدة، وكلٌّ تُنادى في وقتٍ مختلف:
     · `quizCardLinks`   مرّةً مع فتح المحرّر — فيعرف كلُّ زرٍّ حالَه.
     · `questionCards`   عند الطلب — قائمةُ مصطلحات درس هذا الاختبار.
     · `linkQuestionCard` بطاقةٌ تُربط، وفارغٌ **يفكّ الربط**.
   ⚠️ ولا تُفتح `saveQuestion` لأجل هذا الحقل: عشرون معاملاً، وفتحُها
      لإضافة واحدٍ مخاطرةٌ تفوق نفعَها (158 · ثابت ①). */
export const quizCardLinks  = qid => db.rpc('quiz_card_links', { p_quiz: qid });
export const questionCards  = qid => db.rpc('question_cards', { p_question: qid });
export const linkQuestionCard = (qid, card = null) =>
  db.rpc('link_question_card', { p_question: qid, p_card: card });

export const saveMyNote     = (id, note) => db.rpc('save_my_note', { p_card: id, p_note: note });
export const dueCards       = (sid, limit, fresh) =>
  db.rpc('due_cards', { p_subject: sid, p_limit: limit ?? 30, p_new: fresh ?? 6 });
export const dueCounts      = () => db.rpc('due_counts');

/* ── البحث العامّ (107 · 108) ──
   p_limit سقفٌ **لكلّ نوع** لا للمجموع: أربعةُ أنواع ⇒ حتى ٣٢ نتيجة.
   وثمانيةٌ تكفي المجموعةَ الواحدة في لوحةٍ تُقرأ بلمحة ولا تُتصفَّح. */
export const searchAll = (q, n = 8) =>
  db.rpc('search_all', { p_q: q, p_limit: n });
export const addMyCard      = o => db.rpc('add_my_card', {
  p_subject: o.subject, p_front: o.front, p_level: o.level ?? null, p_back: o.back ?? null });
export const subscribeCards = ids => db.rpc('subscribe_cards', { p_card_ids: ids });
export const browseDeck     = id  => db.rpc('browse_deck',     { p_deck: id });
export const reviewCard = (id, rating) => db.rpc('review_card', { p_card: id, p_rating: rating });
export const saveGameScore = (sid, pairs, mistakes, seconds) =>
  db.rpc('save_game_score', { p_subject: sid, p_pairs: pairs,
                              p_mistakes: mistakes, p_seconds: seconds });
export const gameBoard = (sid, pairs) => db.rpc('game_board', { p_subject: sid, p_pairs: pairs });
export const practiceCards = (sid, limit) =>
  db.rpc('practice_cards', { p_subject: sid, p_limit: limit ?? 12 });

/* ═══════════ ⑪ الفروع ═══════════ */
export const listStrands  = sid => db.rpc('list_strands',  { p_subject: sid });
export const deleteStrand = id  => db.rpc('delete_strand', { p_id: id });
export const saveStrand = o => db.rpc('save_strand', {
  p_id:      o.id      ?? null,
  p_subject: o.subject ?? null,
  p_parent:  o.parent  ?? null,
  p_code:    o.code,
  p_name:    o.name,
  p_sort:    o.sort ?? 0 });

/* ═══════════ ⑫ أهداف المادة ═══════════ */
// شجرةُ الفهرس بأعدادها في نداءٍ واحد — وبها تُفحص الأهداف لا بأسمائها (143)
export const objectivesTree = sid => db.rpc('objectives_tree', { p_subject: sid });

/* الكاتبُ الوحيد.
   🔴 و`p_remedial` يُعاد كما هو ولا يُسقَط: `save_objective` تكتب
      `remedial_item_id = p_remedial` كتابةً صريحة — فإسقاطُه يُمرّر فارغاً
      **فيمحو وصلَ عنصر العلاج** الذي ربطه إنسانٌ في شاشة المكوّنات، بلا
      شكوى ولا أثر. والنصّان (`evidence` و`remedy_note`) محميّان في القاعدة
      بـcoalesce منذ 141، أمّا هذا فمعرّفٌ ومحوُه فقدُ وصلةٍ لا فقدُ نصّ. */
export const saveObjective = o => db.rpc('save_objective', {
  p_id:          o.id      ?? null,
  p_subject:     o.subject ?? null,
  p_code:        o.code,
  p_name:        o.name,
  p_parent:      o.parent  ?? null,
  p_remedial:    o.remedial ?? null,
  p_scale:       o.scale   ?? null,
  p_strand:      o.strand  ?? null,
  p_evidence:    o.evidence    ?? null,
  p_remedy_note: o.remedy_note ?? null });

/* ═══════════ ⑩ الإدارة ═══════════ */

export const requestTeacherAccess = ({ school, subject, years, note }) =>
  db.rpc('request_teacher_access', {
    p_school: school, p_subject: subject, p_years: years, p_note: note });

export const adminRequests = status => db.rpc('admin_requests', { p_status: status });

export const adminDecide = (id, approve, note) =>
  db.rpc('admin_decide', { p_request: id, p_approve: approve, p_note: note });

/* ═══════════ ⑩-ب لوحة الإدارة — 152 ═══════════
   🔑 والحارس `is_admin()` **في كل دالّة منها، لا في هذه الطبقة**.
      فلو حرست الواجهة لكانت حراسةً تُتخطّى بفتح الطرفية.
   📐 والعقد كما هو: تُعاد استجابة Supabase بحرفها، ومعالجة الخطأ
      في الشاشة. وخمسٌ منها قارئة وثلاثٌ تكتب — والكاتبة تُعيد
      `{ ok, error }` في `data` لا في `error`، فتُقرأ قراءتين. */

export const adminOverview = ()        => db.rpc('admin_overview');
export const adminHealth   = ()        => db.rpc('admin_health');
export const adminCurators = ()        => db.rpc('admin_curators');
export const adminAudit    = (limit)   => db.rpc('admin_audit_list', { p_limit: limit ?? 60 });

export const adminUsers = (q, role) =>
  db.rpc('admin_users', { p_q: q || null, p_role: role || null });

export const adminSetRole = (userId, role, note) =>
  db.rpc('admin_set_role', { p_user: userId, p_role: role, p_note: note || null });

/* `subject = null` ⇒ كل المواد. وهو نطاقٌ لا غياب قيمة — والقاعدة
   تقرؤه كذلك في `coalesce(subject_id, 0)`. */
export const adminSetCurator = (userId, subject, on, note) =>
  db.rpc('admin_set_curator', { p_user: userId, p_subject: subject ?? null,
                                p_on: !!on, p_note: note || null });

export const adminSetTeacherSubjects = (teacherId, subjectIds, note) =>
  db.rpc('admin_set_teacher_subjects', { p_teacher: teacherId,
                                         p_subjects: subjectIds || [],
                                         p_note: note || null });

/* ═══════════ ⑩-ج إدارة المحتوى — 155 ═══════════
   🔑 الهيكلُ فوق الدرس: المقياس والمستوى والمسار والمادّة والمقرَّر
      وكود التشخيص. **وما يُؤلَّف يبقى في المحرّر** — فلا درسَ هنا
      ولا وحدةَ ولا سؤال.
   📐 و`id` فارغٌ ⇒ إنشاء، وإلا تعديل. والردُّ `{ok, id, name}` دائماً. */

export const contentTree = () => db.rpc('content_tree');

export const saveScale = o => db.rpc('save_scale', {
  p_id: o.id ?? null, p_code: o.code, p_name: o.name, p_kind: o.kind,
  p_country: o.country ?? null, p_track: o.track ?? null,
  p_sort: o.sort ?? 0, p_note: o.note ?? null });

export const saveLevel = o => db.rpc('save_level', {
  p_id: o.id ?? null, p_scale: o.scale, p_code: o.code, p_name: o.name,
  p_rank: o.rank, p_min: o.min ?? null, p_max: o.max ?? null, p_note: o.note ?? null });

export const savePath = o => db.rpc('save_path', {
  p_id: o.id ?? null, p_scale: o.scale, p_code: o.code, p_name: o.name,
  p_from_rank: o.fromRank ?? null, p_sort: o.sort ?? 0,
  p_active: o.active ?? true, p_note: o.note ?? null });

export const saveSubject = o => db.rpc('save_subject', {
  p_id: o.id ?? null, p_code: o.code, p_name: o.name, p_scale: o.scale ?? null,
  p_family: o.family ?? null, p_placement: o.placement ?? 'profile',
  p_progression: o.progression ?? 'chain', p_active: o.active ?? true,
  p_icon: o.icon ?? null, p_tool: o.tool ?? null,
  p_description: o.description ?? null, p_sort: o.sort ?? 0, p_note: o.note ?? null });

/* ⚠️ و`p_elective_group` نصٌّ والعمودُ `smallint` — التحويلُ في الدالّة
      بتحقُّقٍ صريح (155). فيُرسَل كما كُتب في الحقل، أو `null`. */
export const saveCourse = o => db.rpc('save_course', {
  p_id: o.id ?? null, p_subject: o.subject, p_level: o.level ?? null,
  p_title: o.title, p_path: o.path ?? null,
  p_elective_group: o.electiveGroup ?? null,
  p_position: o.position ?? 0, p_active: o.active ?? true, p_note: o.note ?? null });

export const saveDxCode = o => db.rpc('save_dx_code', {
  p_code: o.code, p_name: o.name, p_remedy: o.remedy ?? null,
  p_family: o.family ?? null, p_student_note: o.studentNote ?? null,
  p_note: o.note ?? null });

/* ═══════════ ⑦ الوسائط ═══════════ */
/* 📐 العقد: المقطع الأول من المفتاح هو اسم المخزن.
     "audio/l1-a1.mp3"  ⇒  المخزن audio · المسار l1-a1.mp3
   فمخزنٌ جديد (img · docs) لا يحتاج تعديلاً هنا. */
const KEY_RX = /^([a-z0-9][a-z0-9-]*)\/(.+)$/;

export function publicUrl(key){
  const m = KEY_RX.exec(key || "");
  if(!m){ console.warn("[media] مفتاح بلا مخزن:", key); return null; }
  return db.storage.from(m[1]).getPublicUrl(m[2]).data.publicUrl;
}
/* الرفع — نقطة الاختناق الوحيدة نحو المخزن.
   ⚠️ upsert:false عمداً: سياسة storage لا تسمح بـupdate أصلاً،
      فالتصادم (احتمالٌ في ملياريّ) يصير خطأً ظاهراً لا طمساً صامتاً. */
export async function uploadMedia(key, file){
  const m = KEY_RX.exec(key || "");
  if(!m) return { error: { message: "مفتاح بلا مخزن: " + key } };
  const { error } = await db.storage.from(m[1]).upload(m[2], file, {
    contentType: file.type || 'audio/mpeg',
    upsert: false
  });
  return { error };
}

/* ═══════════ ⑧ التحليلات — 85 · 86 · 87 ═══════════
   ⚠️ الثلاث `security invoker`: RLS هي التي تفصل المعلّم عن المدير
      عن الطالب. فلا تُمرَّر هنا معرّفات «للتصفية» ظنّاً أنها حماية. */

export const studentPerformance = (uid, subjectId, strandId) =>
  db.rpc('student_performance', { p_student: uid       || null,
                                  p_subject: subjectId || null,
                                  p_strand:  strandId  || null });

export const cohortPerformance = (levelId, subjectId) =>
  db.rpc('cohort_performance', { p_level_id:   levelId   || null,
                                 p_subject_id: subjectId || null });

export const studentsOverview = (levelId, subjectId, search) =>
  db.rpc('students_overview', { p_level_id:   levelId   || null,
                                p_subject_id: subjectId || null,
                                p_search:     search    || null,
                                p_limit:      100 });
export const studentDx = (uid, subjectId) =>
  db.rpc('student_dx', { p_student: uid || null, p_subject: subjectId || null });

export const quizDetail = (quizId, uid) =>
  db.rpc('quiz_detail', { p_quiz: quizId, p_student: uid || null });
