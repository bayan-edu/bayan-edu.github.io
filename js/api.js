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
export const onAuthChange   = cb                => db.auth.onAuthStateChange(cb);

// scale/level يُحملان في البيانات الوصفية لا في profiles:
// بين التسجيل وتأكيد البريد لا توجد جلسة، والبيانات الوصفية تعبر الفجوة.
export const signUp = (email, password, fullName, klass, scaleId, levelId) =>
  db.auth.signUp({ email, password,
    options:{ data:{ full_name: fullName, klass,
                     scale_id: scaleId, level_id: levelId } } });


/* ═══════════ ② الملف الشخصي والمناهج ═══════════ */

export const myProfile = uid => db.from('profiles').select('*').eq('id', uid).single();
export const myRole    = ()  => db.rpc('my_role');

// دالة لا UPDATE: تتحقّق أن الصف ينتمي للمنهج، وتُعيد {ok,error}
export const setMyGrade = (scaleId, levelId) =>
  db.rpc('set_my_grade', { p_scale: scaleId, p_level: levelId });

export const academicScales = () =>
  db.from('scales')
    .select('id,name,country,sort_order,levels(id,name,rank)')
    .eq('kind','academic').order('sort_order');


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

export const unreadFeedbackCount = uid =>
  db.from('attempts').select('id', { count:'exact', head:true })
    .eq('user_id', uid).not('teacher_comment','is',null).eq('read_by_student', false);

export const myFeedback = uid =>
  db.from('attempts')
    .select('id,submitted_at,pct,score,total,essay_score,teacher_comment,read_by_student,quizzes(title)')
    .eq('user_id', uid).not('teacher_comment','is',null)
    .order('submitted_at', { ascending:false });

export const markFeedbackRead = ids =>
  db.from('attempts').update({ read_by_student:true }).in('id', ids);

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


/* ═══════════ ⑨ الإدارة ═══════════ */

export const requestTeacherAccess = ({ school, subject, years, note }) =>
  db.rpc('request_teacher_access', {
    p_school: school, p_subject: subject, p_years: years, p_note: note });

export const adminRequests = status => db.rpc('admin_requests', { p_status: status });

export const adminDecide = (id, approve, note) =>
  db.rpc('admin_decide', { p_request: id, p_approve: approve, p_note: note });
