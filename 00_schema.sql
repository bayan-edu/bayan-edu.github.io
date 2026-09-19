-- ═══════════════════════════════════════════════════════════════════════
-- بيان · البنية الكاملة — مستخرَجة من Supabase
--
-- استُخرجت: 5 سبتمبر ٢٠٢٦
-- تُقابل:     الملفّات ٠١ إلى 68
--
-- ⚠️ مولَّد آلياً — لا يُحرَّر بيد. يُعاد استخراجه.
--    الملفّات المرقَّمة في sql/ تاريخٌ، وهذا حالة.
--
-- ⚠️ الترتيب شرطُ تشغيل لا تنظيم: كلُّ قسمٍ يعتمد على ما قبله.
--    لا تُعِد ترتيب الأقسام.
--
-- التشغيل: على قاعدةٍ فارغة، مرّةً واحدة، بدور postgres.
-- ═══════════════════════════════════════════════════════════════════════

-- 🔑 لازم: الدوالّ مرتَّبة أبجدياً لا بالاعتماد.
--    can_author تنادي can_curate، والأبجدية تضع can_author أوّلاً.
--    وPostgres يفحص جسد دوالّ language sql وقت إنشائها ⇒ يُخفق.
--    هذا السطر يؤجّل الفحص إلى وقت النداء.
set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ①أ  التسلسلات — الإنشاء
--     قبل الجداول: أعمدة id تحمل default nextval('…')
-- ═══════════════════════════════════════════════════════════════════════

create sequence if not exists public.answers_id_seq;
create sequence if not exists public.attempts_id_seq;
create sequence if not exists public.classes_id_seq;
create sequence if not exists public.courses_id_seq;
create sequence if not exists public.items_id_seq;
create sequence if not exists public.lessons_id_seq;
create sequence if not exists public.levels_id_seq;
create sequence if not exists public.mentorships_id_seq;
create sequence if not exists public.messages_id_seq;
create sequence if not exists public.objectives_id_seq;
create sequence if not exists public.options_id_seq;
create sequence if not exists public.passage_history_id_seq;
create sequence if not exists public.passages_id_seq;
create sequence if not exists public.paths_id_seq;
create sequence if not exists public.placement_routes_id_seq;
create sequence if not exists public.placement_sessions_id_seq;
create sequence if not exists public.question_reports_id_seq;
create sequence if not exists public.questions_id_seq;
create sequence if not exists public.quizzes_id_seq;
create sequence if not exists public.review_queue_id_seq;
create sequence if not exists public.scales_id_seq;
create sequence if not exists public.subjects_id_seq;
create sequence if not exists public.teacher_requests_id_seq;
create sequence if not exists public.units_id_seq;

-- ═══════════════════════════════════════════════════════════════════════
-- ②  الجداول — 34 جدولاً
-- ═══════════════════════════════════════════════════════════════════════
-- ⬇️⬇️⬇️  الصق هنا مخرَج «الجداول» كاملاً  ⬇️⬇️⬇️
create table public.answers (
  id bigint default nextval('answers_id_seq'::regclass) not null,
  attempt_id bigint not null,
  question_id bigint not null,
  option_id bigint,
  essay_text text,
  is_correct boolean,
  dx_code text,
  seconds integer default 0 not null,
  changes integer default 0 not null,
  confidence integer,
  meta jsonb default '{}'::jsonb not null
);

create table public.attempts (
  id bigint default nextval('attempts_id_seq'::regclass) not null,
  user_id uuid not null,
  quiz_id bigint not null,
  submitted_at timestamp with time zone default now() not null,
  score numeric default 0 not null,
  total numeric default 0 not null,
  pct integer default 0 not null,
  duration_sec integer default 0 not null,
  auto_submitted boolean default false not null,
  essay_score numeric,
  teacher_comment text,
  graded_at timestamp with time zone,
  graded_by uuid,
  read_by_student boolean default false not null,
  served_questions bigint[],
  quiz_version integer,
  item_id bigint
);

create table public.classes (
  id bigint default nextval('classes_id_seq'::regclass) not null,
  teacher_id uuid not null,
  name text not null,
  join_code text not null,
  scale_id bigint,
  level_id bigint,
  active boolean default true not null,
  created_at timestamp with time zone default now() not null
);

create table public.courses (
  id bigint default nextval('courses_id_seq'::regclass) not null,
  subject_id bigint not null,
  level_id bigint,
  path_id bigint,
  title text,
  elective_group smallint,
  position integer default 0 not null,
  active boolean default true not null
);

create table public.curators (
  user_id uuid not null,
  subject_id bigint,
  added_at timestamp with time zone default now() not null,
  added_by uuid
);

create table public.dx_codes (
  code text not null,
  name text not null,
  remedy text,
  family text default 'general'::text not null,
  student_note text
);

create table public.enrollments (
  class_id bigint not null,
  student_id uuid not null,
  joined_at timestamp with time zone default now() not null
);

create table public.item_kinds (
  code text not null,
  label_ar text not null,
  icon text not null,
  needs text default 'url'::text not null,
  sort_order integer default 100 not null,
  active boolean default true not null
);

create table public.item_progress (
  user_id uuid not null,
  item_id bigint not null,
  status text default 'opened'::text not null,
  seconds_spent integer default 0 not null,
  opened_at timestamp with time zone default now() not null,
  completed_at timestamp with time zone
);

create table public.items (
  id bigint default nextval('items_id_seq'::regclass) not null,
  lesson_id bigint not null,
  kind text not null,
  title text not null,
  description text,
  url text,
  body text,
  quiz_id bigint,
  position integer default 0 not null,
  is_graded boolean default false not null,
  required boolean default false not null,
  duration_min integer,
  lang text default 'ar'::text not null,
  created_at timestamp with time zone default now() not null,
  created_by uuid,
  visibility text default 'private'::text not null,
  reviewed_at timestamp with time zone,
  reviewed_by uuid
);

create table public.lessons (
  id bigint default nextval('lessons_id_seq'::regclass) not null,
  subject_id bigint not null,
  level_id bigint,
  code text not null,
  title text not null,
  unit text,
  summary text,
  position integer default 0 not null,
  requires_id bigint,
  pass_mark integer default 65 not null,
  published boolean default true not null,
  archived_at timestamp with time zone,
  created_by uuid,
  visibility text default 'private'::text not null,
  created_at timestamp with time zone default now() not null,
  course_id bigint,
  unit_id bigint
);

create table public.levels (
  id bigint default nextval('levels_id_seq'::regclass) not null,
  scale_id bigint not null,
  code text not null,
  name text not null,
  rank integer not null,
  min_score integer,
  max_score integer
);

create table public.mentorships (
  id bigint default nextval('mentorships_id_seq'::regclass) not null,
  student_id uuid not null,
  subject_id bigint not null,
  teacher_id uuid,
  active boolean default true not null,
  started_at timestamp with time zone default now() not null,
  ended_at timestamp with time zone
);

create table public.messages (
  id bigint default nextval('messages_id_seq'::regclass) not null,
  student_id uuid not null,
  sender_id uuid not null,
  sender_role text not null,
  body text not null,
  created_at timestamp with time zone default now() not null,
  read_by_student boolean default false not null,
  read_by_teacher boolean default false not null
);

create table public.objectives (
  id bigint default nextval('objectives_id_seq'::regclass) not null,
  scale_id bigint,
  code text not null,
  name text not null,
  parent_id bigint,
  remedial_item_id bigint
);

create table public.options (
  id bigint default nextval('options_id_seq'::regclass) not null,
  question_id bigint not null,
  position integer not null,
  label text,
  body text not null,
  image_url text
);

create table public.passage_history (
  id bigint default nextval('passage_history_id_seq'::regclass) not null,
  passage_id bigint not null,
  title text,
  body text,
  media_url text,
  kind text,
  replaced_at timestamp with time zone default now() not null,
  replaced_by uuid
);

create table public.passages (
  id bigint default nextval('passages_id_seq'::regclass) not null,
  quiz_id bigint not null,
  position integer default 0 not null,
  title text,
  body text,
  media_url text,
  kind text default 'reading'::text not null,
  lang text default 'ar'::text not null
);

create table public.paths (
  id bigint default nextval('paths_id_seq'::regclass) not null,
  scale_id bigint not null,
  code text not null,
  name text not null,
  from_rank integer,
  sort_order integer default 100 not null,
  active boolean default true not null
);

create table public.placement_routes (
  id bigint default nextval('placement_routes_id_seq'::regclass) not null,
  from_quiz bigint not null,
  min_raw integer not null,
  max_raw integer not null,
  verdict text not null,
  to_quiz bigint,
  level_id bigint,
  note text,
  created_at timestamp with time zone default now() not null
);

create table public.placement_sessions (
  id bigint default nextval('placement_sessions_id_seq'::regclass) not null,
  user_id uuid not null,
  tool text not null,
  current_quiz bigint,
  path jsonb default '[]'::jsonb not null,
  started_at timestamp with time zone default now() not null,
  finished_at timestamp with time zone,
  level_id bigint
);

create table public.profiles (
  id uuid not null,
  full_name text not null,
  klass text,
  role text default 'student'::text not null,
  created_at timestamp with time zone default now() not null,
  scale_id bigint,
  level_id bigint,
  bio text,
  school text,
  years_exp integer,
  path_id bigint
);

create table public.question_keys (
  question_id bigint not null,
  correct_id bigint,
  explanation text,
  model_answer text,
  dx_map jsonb default '{}'::jsonb not null,
  correct_ids bigint[],
  accept jsonb,
  wrong_map jsonb,
  bank text[]
);

create table public.question_reports (
  id bigint default nextval('question_reports_id_seq'::regclass) not null,
  question_id bigint not null,
  user_id uuid not null,
  reason text not null,
  note text,
  status text default 'open'::text not null,
  created_at timestamp with time zone default now() not null
);

create table public.questions (
  id bigint default nextval('questions_id_seq'::regclass) not null,
  quiz_id bigint not null,
  position integer not null,
  kind text default 'mcq'::text not null,
  body text not null,
  image_url text,
  video_url text,
  points numeric default 1 not null,
  passage_id bigint,
  objective_id bigint,
  difficulty text default 'medium'::text not null,
  lang text default 'ar'::text not null,
  audio_url text,
  section text,
  variant_key text,
  retired_at timestamp with time zone,
  supersedes_id bigint
);

create table public.quizzes (
  id bigint default nextval('quizzes_id_seq'::regclass) not null,
  subject_id bigint,
  code text not null,
  title text not null,
  unit text,
  minutes integer default 25 not null,
  sort_order integer default 0 not null,
  requires_id bigint,
  pass_mark integer default 0 not null,
  published boolean default true not null,
  question_count integer,
  shuffle boolean default false not null,
  version integer default 1 not null,
  created_by uuid,
  tool text,
  station integer,
  plays smallint,
  reveal text default 'immediate'::text not null,
  station_kind text
);

create table public.review_queue (
  id bigint default nextval('review_queue_id_seq'::regclass) not null,
  user_id uuid not null,
  question_id bigint not null,
  due_at timestamp with time zone default (now() + '1 day'::interval) not null,
  interval_days integer default 1 not null,
  streak integer default 0 not null,
  last_result boolean
);

create table public.scales (
  id bigint default nextval('scales_id_seq'::regclass) not null,
  code text not null,
  name text not null,
  kind text default 'academic'::text not null,
  sort_order integer default 0 not null,
  country text,
  track text
);

create table public.student_courses (
  user_id uuid not null,
  course_id bigint not null,
  chosen_at timestamp with time zone default now() not null
);

create table public.student_levels (
  user_id uuid not null,
  scale_id bigint not null,
  level_id bigint not null,
  source text default 'test'::text not null,
  set_at timestamp with time zone default now() not null
);

create table public.subjects (
  id bigint default nextval('subjects_id_seq'::regclass) not null,
  code text not null,
  name text not null,
  sort_order integer default 0 not null,
  active boolean default true not null,
  scale_id bigint,
  family text,
  placement text default 'profile'::text not null,
  progression text default 'chain'::text not null,
  owner_id uuid,
  description text,
  icon text,
  tool text
);

create table public.teacher_requests (
  id bigint default nextval('teacher_requests_id_seq'::regclass) not null,
  user_id uuid not null,
  full_name text not null,
  school text,
  subject_area text,
  years_exp integer,
  note text,
  status text default 'pending'::text not null,
  created_at timestamp with time zone default now() not null,
  reviewed_at timestamp with time zone,
  reviewed_by uuid,
  decision_note text
);

create table public.teacher_subjects (
  teacher_id uuid not null,
  subject_id bigint not null,
  capacity integer default 40 not null,
  accepting boolean default true not null,
  added_at timestamp with time zone default now() not null
);

create table public.units (
  id bigint default nextval('units_id_seq'::regclass) not null,
  course_id bigint not null,
  title text not null,
  position integer default 0 not null
);
-- ⬆️⬆️⬆️  نهاية اللصق  ⬆️⬆️⬆️

-- 🔴 رقعة لم تدخل الاستخراج: passages.kind الافتراضيّة 'reading'
--    وقيدُ الجدول لا يقبل إلا text/audio/video/image ⇒ كلُّ insert
--    لا يذكر kind صراحةً يُرفض. صحّحها هنا لا في الجدول أعلاه.
alter table public.passages alter column kind set default 'text';


-- ═══════════════════════════════════════════════════════════════════════
-- ①ب  التسلسلات — الربط
--     بعد الجداول: owned by يحتاج الجدول موجوداً
-- ═══════════════════════════════════════════════════════════════════════
alter sequence public.answers_id_seq               owned by public.answers.id;
alter sequence public.attempts_id_seq              owned by public.attempts.id;
alter sequence public.classes_id_seq               owned by public.classes.id;
alter sequence public.courses_id_seq               owned by public.courses.id;
alter sequence public.items_id_seq                 owned by public.items.id;
alter sequence public.lessons_id_seq               owned by public.lessons.id;
alter sequence public.levels_id_seq                owned by public.levels.id;
alter sequence public.mentorships_id_seq           owned by public.mentorships.id;
alter sequence public.messages_id_seq              owned by public.messages.id;
alter sequence public.objectives_id_seq            owned by public.objectives.id;
alter sequence public.options_id_seq               owned by public.options.id;
alter sequence public.passage_history_id_seq       owned by public.passage_history.id;
alter sequence public.passages_id_seq              owned by public.passages.id;
alter sequence public.paths_id_seq                 owned by public.paths.id;
alter sequence public.placement_routes_id_seq      owned by public.placement_routes.id;
alter sequence public.placement_sessions_id_seq    owned by public.placement_sessions.id;
alter sequence public.question_reports_id_seq      owned by public.question_reports.id;
alter sequence public.questions_id_seq             owned by public.questions.id;
alter sequence public.quizzes_id_seq               owned by public.quizzes.id;
alter sequence public.review_queue_id_seq          owned by public.review_queue.id;
alter sequence public.scales_id_seq                owned by public.scales.id;
alter sequence public.subjects_id_seq              owned by public.subjects.id;
alter sequence public.teacher_requests_id_seq      owned by public.teacher_requests.id;
alter sequence public.units_id_seq                 owned by public.units.id;

-- ═══════════════════════════════════════════════════════════════════════
-- ③  القيود والفهارس
-- ═══════════════════════════════════════════════════════════════════════
-- ⬇️⬇️⬇️  الصق هنا مخرَج «القيود والفهارس»  ⬇️⬇️⬇️
--
alter table public.answers add constraint answers_pkey PRIMARY KEY (id);
alter table public.attempts add constraint attempts_pkey PRIMARY KEY (id);
alter table public.classes add constraint classes_pkey PRIMARY KEY (id);
alter table public.courses add constraint courses_pkey PRIMARY KEY (id);
alter table public.dx_codes add constraint dx_codes_pkey PRIMARY KEY (code);
alter table public.enrollments add constraint enrollments_pkey PRIMARY KEY (class_id, student_id);
alter table public.item_kinds add constraint item_kinds_pkey PRIMARY KEY (code);
alter table public.item_progress add constraint item_progress_pkey PRIMARY KEY (user_id, item_id);
alter table public.items add constraint items_pkey PRIMARY KEY (id);
alter table public.lessons add constraint lessons_pkey PRIMARY KEY (id);
alter table public.levels add constraint levels_pkey PRIMARY KEY (id);
alter table public.mentorships add constraint mentorships_pkey PRIMARY KEY (id);
alter table public.messages add constraint messages_pkey PRIMARY KEY (id);
alter table public.objectives add constraint objectives_pkey PRIMARY KEY (id);
alter table public.options add constraint options_pkey PRIMARY KEY (id);
alter table public.passage_history add constraint passage_history_pkey PRIMARY KEY (id);
alter table public.passages add constraint passages_pkey PRIMARY KEY (id);
alter table public.paths add constraint paths_pkey PRIMARY KEY (id);
alter table public.placement_routes add constraint placement_routes_pkey PRIMARY KEY (id);
alter table public.placement_sessions add constraint placement_sessions_pkey PRIMARY KEY (id);
alter table public.profiles add constraint profiles_pkey PRIMARY KEY (id);
alter table public.question_keys add constraint question_keys_pkey PRIMARY KEY (question_id);
alter table public.question_reports add constraint question_reports_pkey PRIMARY KEY (id);
alter table public.questions add constraint questions_pkey PRIMARY KEY (id);
alter table public.quizzes add constraint quizzes_pkey PRIMARY KEY (id);
alter table public.review_queue add constraint review_queue_pkey PRIMARY KEY (id);
alter table public.scales add constraint scales_pkey PRIMARY KEY (id);
alter table public.student_courses add constraint student_courses_pkey PRIMARY KEY (user_id, course_id);
alter table public.student_levels add constraint student_levels_pkey PRIMARY KEY (user_id, scale_id);
alter table public.subjects add constraint subjects_pkey PRIMARY KEY (id);
alter table public.teacher_requests add constraint teacher_requests_pkey PRIMARY KEY (id);
alter table public.teacher_subjects add constraint teacher_subjects_pkey PRIMARY KEY (teacher_id, subject_id);
alter table public.units add constraint units_pkey PRIMARY KEY (id);
alter table public.classes add constraint classes_join_code_key UNIQUE (join_code);
alter table public.lessons add constraint lessons_code_key UNIQUE (code);
alter table public.levels add constraint levels_scale_id_code_key UNIQUE (scale_id, code);
alter table public.levels add constraint levels_scale_id_rank_key UNIQUE (scale_id, rank);
alter table public.objectives add constraint objectives_scale_id_code_key UNIQUE (scale_id, code);
alter table public.options add constraint options_question_id_position_key UNIQUE (question_id, "position");
alter table public.paths add constraint paths_scale_id_code_key UNIQUE (scale_id, code);
alter table public.quizzes add constraint quizzes_code_key UNIQUE (code);
alter table public.review_queue add constraint review_queue_user_id_question_id_key UNIQUE (user_id, question_id);
alter table public.scales add constraint scales_code_key UNIQUE (code);
alter table public.subjects add constraint subjects_code_key UNIQUE (code);
alter table public.teacher_requests add constraint teacher_requests_user_id_key UNIQUE (user_id);
alter table public.answers add constraint answers_confidence_check CHECK (((confidence >= 1) AND (confidence <= 3)));
alter table public.item_kinds add constraint item_kinds_needs_chk CHECK ((needs = ANY (ARRAY['url'::text, 'body'::text, 'quiz'::text, 'none'::text])));
alter table public.item_progress add constraint item_progress_status_check CHECK ((status = ANY (ARRAY['opened'::text, 'completed'::text])));
alter table public.items add constraint items_authored_not_gating CHECK (((created_by IS NULL) OR ((is_graded = false) AND (required = false))));
alter table public.items add constraint items_visibility_chk CHECK ((visibility = ANY (ARRAY['private'::text, 'class'::text, 'public'::text])));
alter table public.lessons add constraint lessons_visibility_check CHECK ((visibility = ANY (ARRAY['private'::text, 'class'::text, 'public'::text])));
alter table public.messages add constraint messages_sender_role_check CHECK ((sender_role = ANY (ARRAY['student'::text, 'teacher'::text])));
alter table public.passages add constraint passages_kind_chk CHECK ((kind = ANY (ARRAY['text'::text, 'audio'::text, 'video'::text, 'image'::text])));
alter table public.placement_routes add constraint pr_noself_chk CHECK (((to_quiz IS NULL) OR (to_quiz <> from_quiz)));
alter table public.placement_routes add constraint pr_range_chk CHECK (((min_raw >= 0) AND (max_raw >= min_raw)));
alter table public.placement_routes add constraint pr_verdict_chk CHECK ((((verdict = 'next'::text) AND (to_quiz IS NOT NULL) AND (level_id IS NULL)) OR ((verdict = 'done'::text) AND (level_id IS NOT NULL) AND (to_quiz IS NULL))));
alter table public.profiles add constraint profiles_role_check CHECK ((role = ANY (ARRAY['student'::text, 'pending_teacher'::text, 'teacher'::text, 'admin'::text])));
alter table public.question_keys add constraint question_keys_accept_chk CHECK (((accept IS NULL) OR ((jsonb_typeof((accept -> 'slots'::text)) = 'array'::text) AND ((jsonb_array_length((accept -> 'slots'::text)) >= 1) AND (jsonb_array_length((accept -> 'slots'::text)) <= 4)))));
alter table public.question_keys add constraint question_keys_correct_ids_chk CHECK (((correct_ids IS NULL) OR (COALESCE(array_length(correct_ids, 1), 0) >= 2)));
alter table public.question_reports add constraint question_reports_reason_check CHECK ((reason = ANY (ARRAY['unclear'::text, 'wrong_answer'::text, 'typo'::text, 'image_broken'::text, 'other'::text])));
alter table public.question_reports add constraint question_reports_status_check CHECK ((status = ANY (ARRAY['open'::text, 'reviewed'::text, 'fixed'::text, 'dismissed'::text])));
alter table public.questions add constraint questions_difficulty_check CHECK ((difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text])));
alter table public.questions add constraint questions_kind_check CHECK ((kind = ANY (ARRAY['mcq'::text, 'msq'::text, 'gap'::text, 'essay'::text, 'audio'::text, 'speaking'::text, 'matching'::text, 'ordering'::text, 'truefalse'::text])));
alter table public.quizzes add constraint quizzes_plays_chk CHECK (((plays IS NULL) OR ((plays >= 1) AND (plays <= 5))));
alter table public.quizzes add constraint quizzes_reveal_chk CHECK ((reveal = ANY (ARRAY['immediate'::text, 'never'::text])));
alter table public.quizzes add constraint quizzes_station_kind_chk CHECK (((station_kind IS NULL) OR (station_kind = ANY (ARRAY['routing'::text, 'panel'::text, 'boundary'::text, 'productive'::text]))));
alter table public.quizzes add constraint quizzes_tool_kind_chk CHECK (((tool IS NULL) OR (station_kind IS NOT NULL)));
alter table public.scales add constraint scales_kind_check CHECK ((kind = ANY (ARRAY['academic'::text, 'proficiency'::text])));
alter table public.student_levels add constraint student_levels_source_check CHECK ((source = ANY (ARRAY['test'::text, 'profile'::text, 'self'::text, 'teacher'::text])));
alter table public.subjects add constraint subjects_placement_check CHECK ((placement = ANY (ARRAY['profile'::text, 'test'::text, 'open'::text])));
alter table public.subjects add constraint subjects_progression_check CHECK ((progression = ANY (ARRAY['chain'::text, 'level'::text, 'free'::text])));
alter table public.teacher_requests add constraint teacher_requests_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])));
alter table public.teacher_subjects add constraint teacher_subjects_capacity_check CHECK (((capacity >= 1) AND (capacity <= 500)));
alter table public.answers add constraint answers_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE;
alter table public.answers add constraint answers_dx_code_fkey FOREIGN KEY (dx_code) REFERENCES dx_codes(code);
alter table public.answers add constraint answers_option_id_fkey FOREIGN KEY (option_id) REFERENCES options(id);
alter table public.answers add constraint answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
alter table public.attempts add constraint attempts_graded_by_fkey FOREIGN KEY (graded_by) REFERENCES profiles(id);
alter table public.attempts add constraint attempts_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id);
alter table public.attempts add constraint attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public.attempts add constraint attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.classes add constraint classes_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id);
alter table public.classes add constraint classes_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id);
alter table public.classes add constraint classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.courses add constraint courses_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE;
alter table public.courses add constraint courses_path_id_fkey FOREIGN KEY (path_id) REFERENCES paths(id) ON DELETE CASCADE;
alter table public.courses add constraint courses_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.curators add constraint curators_added_by_fkey FOREIGN KEY (added_by) REFERENCES profiles(id);
alter table public.curators add constraint curators_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.curators add constraint curators_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.enrollments add constraint enrollments_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;
alter table public.enrollments add constraint enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.item_progress add constraint item_progress_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
alter table public.item_progress add constraint item_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.items add constraint items_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id);
alter table public.items add constraint items_kind_fkey FOREIGN KEY (kind) REFERENCES item_kinds(code);
alter table public.items add constraint items_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;
alter table public.items add constraint items_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public.items add constraint items_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES profiles(id);
alter table public.lessons add constraint lessons_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id);
alter table public.lessons add constraint lessons_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id);
alter table public.lessons add constraint lessons_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id);
alter table public.lessons add constraint lessons_requires_id_fkey FOREIGN KEY (requires_id) REFERENCES lessons(id);
alter table public.lessons add constraint lessons_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.lessons add constraint lessons_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);
alter table public.levels add constraint levels_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id) ON DELETE CASCADE;
alter table public.mentorships add constraint mentorships_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.mentorships add constraint mentorships_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.mentorships add constraint mentorships_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE SET NULL;
alter table public.messages add constraint messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES profiles(id);
alter table public.messages add constraint messages_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.objectives add constraint objectives_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES objectives(id);
alter table public.objectives add constraint objectives_remedial_item_id_fkey FOREIGN KEY (remedial_item_id) REFERENCES items(id) ON DELETE SET NULL;
alter table public.objectives add constraint objectives_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id) ON DELETE CASCADE;
alter table public.options add constraint options_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public.passage_history add constraint passage_history_passage_id_fkey FOREIGN KEY (passage_id) REFERENCES passages(id) ON DELETE CASCADE;
alter table public.passage_history add constraint passage_history_replaced_by_fkey FOREIGN KEY (replaced_by) REFERENCES profiles(id) ON DELETE SET NULL;
alter table public.passages add constraint passages_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public.paths add constraint paths_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id) ON DELETE CASCADE;
alter table public.placement_routes add constraint placement_routes_from_quiz_fkey FOREIGN KEY (from_quiz) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public.placement_routes add constraint placement_routes_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE RESTRICT;
alter table public.placement_routes add constraint placement_routes_to_quiz_fkey FOREIGN KEY (to_quiz) REFERENCES quizzes(id) ON DELETE RESTRICT;
alter table public.placement_sessions add constraint placement_sessions_current_quiz_fkey FOREIGN KEY (current_quiz) REFERENCES quizzes(id) ON DELETE SET NULL;
alter table public.placement_sessions add constraint placement_sessions_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE SET NULL;
alter table public.placement_sessions add constraint placement_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.profiles add constraint profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public.profiles add constraint profiles_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id);
alter table public.profiles add constraint profiles_path_id_fkey FOREIGN KEY (path_id) REFERENCES paths(id);
alter table public.profiles add constraint profiles_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id);
alter table public.question_keys add constraint question_keys_correct_id_fkey FOREIGN KEY (correct_id) REFERENCES options(id);
alter table public.question_keys add constraint question_keys_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public.question_reports add constraint question_reports_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public.question_reports add constraint question_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.questions add constraint questions_objective_id_fkey FOREIGN KEY (objective_id) REFERENCES objectives(id);
alter table public.questions add constraint questions_passage_id_fkey FOREIGN KEY (passage_id) REFERENCES passages(id) ON DELETE SET NULL;
alter table public.questions add constraint questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public.questions add constraint questions_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES questions(id) ON DELETE SET NULL;
alter table public.quizzes add constraint quizzes_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id);
alter table public.quizzes add constraint quizzes_publish_guard TRIGGER DEFERRABLE INITIALLY DEFERRED;
alter table public.quizzes add constraint quizzes_requires_id_fkey FOREIGN KEY (requires_id) REFERENCES quizzes(id);
alter table public.quizzes add constraint quizzes_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.review_queue add constraint review_queue_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public.review_queue add constraint review_queue_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.student_courses add constraint student_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
alter table public.student_courses add constraint student_courses_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.student_levels add constraint student_levels_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id);
alter table public.student_levels add constraint student_levels_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id) ON DELETE CASCADE;
alter table public.student_levels add constraint student_levels_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.subjects add constraint subjects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES profiles(id);
alter table public.subjects add constraint subjects_scale_id_fkey FOREIGN KEY (scale_id) REFERENCES scales(id);
alter table public.teacher_requests add constraint teacher_requests_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES profiles(id);
alter table public.teacher_requests add constraint teacher_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.teacher_subjects add constraint teacher_subjects_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public.teacher_subjects add constraint teacher_subjects_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
alter table public.units add constraint units_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
CREATE INDEX courses_level_path_idx ON public.courses USING btree (level_id, path_id) WHERE active;
CREATE INDEX idx_answers_attempt ON public.answers USING btree (attempt_id);
CREATE INDEX idx_answers_question ON public.answers USING btree (question_id);
CREATE INDEX idx_attempts_user ON public.attempts USING btree (user_id, quiz_id);
CREATE INDEX idx_enroll_student ON public.enrollments USING btree (student_id);
CREATE INDEX idx_items_lesson ON public.items USING btree (lesson_id, "position");
CREATE INDEX idx_lessons_subject ON public.lessons USING btree (subject_id, "position");
CREATE INDEX idx_mentorship_teacher ON public.mentorships USING btree (teacher_id) WHERE active;
CREATE INDEX idx_messages_student ON public.messages USING btree (student_id, created_at);
CREATE INDEX idx_passages_quiz ON public.passages USING btree (quiz_id, "position");
CREATE INDEX idx_review_due ON public.review_queue USING btree (user_id, due_at);
CREATE INDEX idx_treq_status ON public.teacher_requests USING btree (status, created_at);
CREATE INDEX items_author_idx ON public.items USING btree (created_by) WHERE (created_by IS NOT NULL);
CREATE INDEX items_authored_idx ON public.items USING btree (lesson_id, visibility) WHERE (created_by IS NOT NULL);
CREATE INDEX lessons_course_idx ON public.lessons USING btree (course_id);
CREATE INDEX mentorships_student_active_idx ON public.mentorships USING btree (student_id, teacher_id) WHERE active;
CREATE INDEX passage_history_lookup ON public.passage_history USING btree (passage_id, replaced_at DESC);
CREATE INDEX pr_from_idx ON public.placement_routes USING btree (from_quiz, min_raw);
CREATE INDEX ps_user_idx ON public.placement_sessions USING btree (user_id, tool);
CREATE INDEX questions_supersedes_idx ON public.questions USING btree (supersedes_id) WHERE (supersedes_id IS NOT NULL);
CREATE INDEX questions_variant_key_idx ON public.questions USING btree (quiz_id, variant_key) WHERE (variant_key IS NOT NULL);
CREATE INDEX quizzes_tool_idx ON public.quizzes USING btree (tool) WHERE (tool IS NOT NULL);
CREATE INDEX units_course_idx ON public.units USING btree (course_id, "position");
CREATE UNIQUE INDEX courses_uniq ON public.courses USING btree (subject_id, COALESCE(level_id, (0)::bigint), COALESCE(path_id, (0)::bigint));
CREATE UNIQUE INDEX curators_uniq ON public.curators USING btree (user_id, COALESCE(subject_id, (0)::bigint));
CREATE UNIQUE INDEX ps_open_uk ON public.placement_sessions USING btree (user_id, tool) WHERE (finished_at IS NULL);
CREATE UNIQUE INDEX questions_live_position ON public.questions USING btree (quiz_id, "position") WHERE (retired_at IS NULL);
CREATE UNIQUE INDEX quizzes_tool_station_uk ON public.quizzes USING btree (tool, station) WHERE ((tool IS NOT NULL) AND (station IS NOT NULL));
CREATE UNIQUE INDEX uq_mentorship_active ON public.mentorships USING btree (student_id, subject_id) WHERE active;

-- ⬆️⬆️⬆️  نهاية اللصق  ⬆️⬆️⬆️


-- ═══════════════════════════════════════════════════════════════════════
-- ④  الدوالّ — 90 دالّة
--     قبل العروض والسياسات: كلاهما ينادي منها
-- ═══════════════════════════════════════════════════════════════════════
-- ⬇️⬇️⬇️  الصق هنا مخرَج «الدوالّ» كاملاً  ⬇️⬇️⬇️

CREATE OR REPLACE FUNCTION public.admin_decide(p_request bigint, p_approve boolean, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_user uuid;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  select user_id into v_user from teacher_requests where id = p_request;
  if v_user is null then
    return jsonb_build_object('ok', false, 'error', 'الطلب غير موجود');
  end if;

  update teacher_requests
     set status = case when p_approve then 'approved' else 'rejected' end,
         reviewed_at = now(), reviewed_by = auth.uid(), decision_note = p_note
   where id = p_request;

  update profiles
     set role = case when p_approve then 'teacher' else 'student' end
   where id = v_user;

  return jsonb_build_object('ok', true,
    'result', case when p_approve then 'تمت الموافقة' else 'تم الرفض' end);
end $function$
;

CREATE OR REPLACE FUNCTION public.admin_pending_count()
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select case when is_admin()
    then (select count(*)::int from teacher_requests where status = 'pending')
    else 0 end;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_requests(p_status text DEFAULT 'pending'::text)
 RETURNS TABLE(id bigint, user_id uuid, full_name text, email text, school text, subject_area text, years_exp integer, note text, status text, created_at timestamp with time zone, reviewed_at timestamp with time zone, decision_note text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  return query
  select r.id, r.user_id, r.full_name, u.email::text,
         r.school, r.subject_area, r.years_exp, r.note,
         r.status, r.created_at, r.reviewed_at, r.decision_note
  from teacher_requests r
  join auth.users u on u.id = r.user_id
  where p_status is null or r.status = p_status
  order by r.created_at desc;
end $function$
;

CREATE OR REPLACE FUNCTION public.attach_passage(p_passage bigint, p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; n int;
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا أسئلة محدَّدة');
  end if;

  -- كل الأسئلة من اختبار واحد
  select count(distinct quiz_id), min(quiz_id) into n, v_quiz
    from questions where id = any(p_ids);
  if n <> 1 then
    return jsonb_build_object('ok', false, 'error', 'الأسئلة ليست من اختبار واحد');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  if p_passage is not null
     and not exists (select 1 from passages where id = p_passage and quiz_id = v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'النصّ ليس من هذا الاختبار');
  end if;

  -- 🔒 لا يُمَسّ سؤالٌ أُجيب عنه: تغيير سياقه يغيّر معناه بأثر رجعي
  select count(*) into n from answers where question_id = any(p_ids);
  if n > 0 then
    return jsonb_build_object('ok', false,
      'error', 'بعض هذه الأسئلة أُجيب عنها — انسخ الاختبار بكود جديد');
  end if;

  update questions set passage_id = p_passage where id = any(p_ids);
  return jsonb_build_object('ok', true, 'count', array_length(p_ids, 1));
end $function$
;

CREATE OR REPLACE FUNCTION public.author_lessons(p_course bigint)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', l.id, 'title', l.title, 'published', l.published,
      'position', l.position, 'pass_mark', l.pass_mark,
      'unit_id', l.unit_id, 'unit', u.title,
      'requires_id', l.requires_id,
      'official_items', (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by is null),
      'extras',         (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by is not null),
      'my_extras',      (select count(*) from items i
                          where i.lesson_id = l.id and i.created_by = auth.uid()),
      'has_quiz',       exists (select 1 from items i
                                 where i.lesson_id = l.id and i.is_graded),
      'quiz_id',        (select i.quiz_id from items i
                          where i.lesson_id = l.id and i.is_graded limit 1)
    ) order by coalesce(u.position, 0), l.position), '[]'::jsonb)
  from lessons l
  left join units u on u.id = l.unit_id
  join courses c on c.id = l.course_id
  where l.course_id = p_course
    and l.archived_at is null
    and (can_author(c.subject_id) or can_curate(c.subject_id));
$function$
;

CREATE OR REPLACE FUNCTION public.author_tree()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select jsonb_build_object(
    -- 🔑 رُفع حجب kind='academic': سلالم المهارات لها مؤلّفون أيضاً
    'scales', coalesce((select jsonb_agg(jsonb_build_object(
        'id', sc.id, 'name', sc.name, 'kind', sc.kind,
        'country', sc.country, 'track', sc.track)
        order by sc.sort_order) from scales sc), '[]'::jsonb),
    'levels', coalesce((select jsonb_agg(jsonb_build_object(
        'id', l.id, 'scale_id', l.scale_id, 'name', l.name, 'rank', l.rank)
        order by l.scale_id, l.rank) from levels l), '[]'::jsonb),
    'paths', coalesce((select jsonb_agg(jsonb_build_object(
        'id', p.id, 'scale_id', p.scale_id, 'name', p.name, 'from_rank', p.from_rank)
        order by p.sort_order) from paths p where p.active), '[]'::jsonb),
    'subjects', coalesce((select jsonb_agg(jsonb_build_object(
        'id', s.id, 'name', s.name, 'scale_id', s.scale_id, 'icon', s.icon)
        order by s.sort_order) from subjects s where s.active), '[]'::jsonb),
    'kinds', coalesce((select jsonb_agg(jsonb_build_object(
        'code', k.code, 'label', k.label_ar, 'icon', k.icon, 'needs', k.needs)
        order by k.sort_order) from item_kinds k where k.active), '[]'::jsonb),
    'dx', coalesce((select jsonb_agg(jsonb_build_object(
        'code', d.code, 'name', d.name, 'family', d.family, 'remedy', d.remedy)
        order by d.family, d.code) from dx_codes d), '[]'::jsonb),
    'courses', coalesce((select jsonb_agg(jsonb_build_object(
        'id', c.id, 'title', c.title, 'subject_id', c.subject_id,
        'level_id', c.level_id, 'path_id', c.path_id,
        'elective_group', c.elective_group,
        'curate', can_curate(c.subject_id),
        'lessons', (select count(*) from lessons l
                     where l.course_id = c.id and l.archived_at is null),
        -- 🔑 من يصل إليه هذا المقرَّر؟ السؤال يختلف باختلاف السُّلّم
        'students', case
          when s2.scale_id is null then                    -- مادة للجميع
            (select count(*) from profiles pr where pr.role = 'student')
          when sc2.kind = 'proficiency' then               -- سُلّم إتقان
            (select count(*) from student_levels sl
              where sl.scale_id = s2.scale_id
                and (c.level_id is null or sl.level_id = c.level_id))
          else                                             -- سُلّم دراسي
            (select count(*) from profiles pr
              where pr.scale_id = s2.scale_id and pr.role = 'student'
                and (c.level_id is null or pr.level_id = c.level_id)
                and (c.path_id  is null or pr.path_id  = c.path_id))
        end,
        'units', coalesce((select jsonb_agg(jsonb_build_object(
                    'id', u.id, 'title', u.title, 'position', u.position)
                    order by u.position) from units u where u.course_id = c.id), '[]'::jsonb))
        order by c.level_id, c.position)
      from courses c
      join subjects s2 on s2.id = c.subject_id
      left join scales sc2 on sc2.id = s2.scale_id      -- left: مادة بلا سُلّم لا تسقط
      where c.active and (can_author(c.subject_id) or can_curate(c.subject_id))), '[]'::jsonb)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.best_pct(p_quiz bigint, p_user uuid DEFAULT auth.uid())
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(max(pct), -1) from attempts where user_id = p_user and quiz_id = p_quiz;
$function$
;

CREATE OR REPLACE FUNCTION public.can_access(p_quiz bigint, p_user uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_lesson bigint; v_pub bool; v_tool text;
begin
  if is_teacher() then return true; end if;

  select published, tool into v_pub, v_tool from quizzes where id = p_quiz;
  if v_pub is not true then return false; end if;

  -- 🔒 محطّةُ أداة: بوّابتُها الجلسة لا النشر. وبدونه يقرأ الطالب
  --    الأداة كلَّها قبل جلوسه — وضبطُ التعرّض ينهار.
  if v_tool is not null then
    return exists (select 1 from placement_sessions s
                    where s.user_id = p_user and s.tool = v_tool
                      and s.finished_at is null and s.current_quiz = p_quiz);
  end if;

  select lesson_id into v_lesson from items where quiz_id = p_quiz limit 1;
  if v_lesson is null then return true; end if;
  return can_access_lesson(v_lesson, p_user);
end $function$
;

CREATE OR REPLACE FUNCTION public.can_access_lesson(p_lesson bigint, p_user uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r record;
begin
  if is_teacher() then return true; end if;
  select level_id, requires_id, published, archived_at into r from lessons where id = p_lesson;
  if r is null or not r.published or r.archived_at is not null then return false; end if;
  if not can_view_level(r.level_id, p_user) then return false; end if;
  if r.requires_id is null then return true; end if;
  return lesson_done(r.requires_id, p_user);
end $function$
;

CREATE OR REPLACE FUNCTION public.can_author(p_subject bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select can_curate(p_subject);
  -- غداً:  select can_curate(p_subject) or is_teacher();
$function$
;

CREATE OR REPLACE FUNCTION public.can_curate(p_subject bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select is_admin()
      or exists (select 1 from curators c
                  where c.user_id = auth.uid()
                    and (c.subject_id is null or c.subject_id = p_subject));
$function$
;

CREATE OR REPLACE FUNCTION public.can_edit_quiz(p_quiz bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from quizzes q
     where q.id = p_quiz
       and (case when q.created_by is null
                 then can_curate(q.subject_id)
                 else q.created_by = auth.uid() or is_admin() end));
$function$
;

CREATE OR REPLACE FUNCTION public.can_see_item(p_created_by uuid, p_visibility text, p_reviewed_at timestamp with time zone, p_item bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select
       p_created_by is null                                   -- محتوى المنصة المعتمد
    or p_created_by = auth.uid()                              -- مؤلّفه يرى مسودّاته
    or is_admin()

    -- طلاب المؤلّف — بلا مراجعة
    or (p_visibility in ('class','public') and is_my_mentor(p_created_by))

    -- مكتبة المعلمين للنسخ — بلا مراجعة
    or (p_visibility = 'public' and is_teacher())

    -- طلاب المنصة كافة — البوّابة الوحيدة
    or (p_visibility = 'public' and p_reviewed_at is not null)

    -- ما فُتح فعلاً يبقى بعد الانضمام إلى معلم آخر
    --   الشرطان معاً: صلة إرشاد حقيقية + فتحٌ سابق.
    --   has_opened وحدها لا تكفي — لأن track_item تكتب بلا تحقّق.
    or (p_visibility in ('class','public')
        and was_my_mentor(p_created_by)
        and has_opened(p_item));
$function$
;

CREATE OR REPLACE FUNCTION public.can_upload_media()
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select is_admin();
  -- يوم يُفتح التأليف:  select is_admin() or is_teacher();
$function$
;

CREATE OR REPLACE FUNCTION public.can_view_level(p_level bigint, p_user uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_scale bigint; v_rank int; v_mine int;
begin
  if p_level is null then return true; end if;
  if is_teacher() then return true; end if;

  select scale_id, rank into v_scale, v_rank from levels where id = p_level;
  v_mine := my_rank(v_scale, p_user);

  if v_mine < 0 then return false; end if;    -- لم يحدد مستواه بعد
  return v_rank <= v_mine;
end $function$
;

CREATE OR REPLACE FUNCTION public.choose_mentor(p_subject bigint, p_teacher uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_cur uuid; v_has bool; v_used int; v_max int := max_mentor_switches();
  v_cap int; v_cnt int; v_name text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select teacher_id, true into v_cur, v_has from mentorships
   where student_id = auth.uid() and subject_id = p_subject and active;

  if v_has and v_cur is not distinct from p_teacher then
    return jsonb_build_object('ok', true, 'unchanged', true);
  end if;

  -- حدّ التبديل يُحسب على المعلمين فقط
  if p_teacher is not null then
    select greatest(count(*) - 1, 0) into v_used from mentorships
     where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null;

    if v_used >= v_max then
      return jsonb_build_object('ok', false,
        'error', 'استفدتَ من فرص الانتقال المتاحة في هذه المادة. ' ||
                 'نرجو أن تعرض ما يشكل عليك على معلمك الحالي — ' ||
                 'فالاستمرار معه أنفع لمتابعة تقدّمك.');
    end if;

    select ts.capacity into v_cap from teacher_subjects ts
     where ts.teacher_id = p_teacher and ts.subject_id = p_subject and ts.accepting;
    if v_cap is null then
      return jsonb_build_object('ok', false,
        'error', 'لا يستقبل هذا المعلم طلاباً جدداً في هذه المادة حالياً');
    end if;

    select count(*) into v_cnt from mentorships
     where teacher_id = p_teacher and subject_id = p_subject and active;
    if v_cnt >= v_cap then
      return jsonb_build_object('ok', false,
        'error', 'اكتمل نصاب هذا المعلم في هذه المادة — نرجو اختيار معلم آخر');
    end if;
  end if;

  update mentorships set active = false, ended_at = now()
   where student_id = auth.uid() and subject_id = p_subject and active;

  insert into mentorships (student_id, subject_id, teacher_id)
  values (auth.uid(), p_subject, p_teacher);

  select full_name into v_name from profiles where id = p_teacher;

  return jsonb_build_object('ok', true,
    'teacher', v_name,
    'self_study', p_teacher is null,
    'switches_left', greatest(v_max - (
      select greatest(count(*) - 1, 0) from mentorships
       where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null), 0));
end $function$
;

CREATE OR REPLACE FUNCTION public.clear_variant(p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; v_quizzes int;
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا أسئلة محدَّدة');
  end if;

  select count(distinct quiz_id), min(quiz_id)
    into v_quizzes, v_quiz
    from questions where id = any(p_ids) and retired_at is null;

  if v_quizzes <> 1 then
    return jsonb_build_object('ok', false, 'error', 'الأسئلة ليست من اختبار واحد');
  end if;

  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- المتقاعد لا يُفكّ من خانته بيد المعلّم: توريث المفتاح شأن دالّة الإصدار وحدها
  update questions set variant_key = null
   where id = any(p_ids) and retired_at is null;

  -- تنبيه: قد يترك هذا خانةً بعضو واحد. variant_report يكشفها،
  -- و quiz_readiness ستمنع نشرها في الملف 35.
  return jsonb_build_object('ok', true, 'count', array_length(p_ids, 1));
end $function$
;

CREATE OR REPLACE FUNCTION public.delete_item(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_owner uuid; n int;
begin
  select c.subject_id, i.created_by into v_subject, v_owner
    from items i join lessons l on l.id = i.lesson_id
    join courses c on c.id = l.course_id
   where i.id = p_id;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المصدر غير موجود');
  end if;

  -- الرسمي لفريق الإشراف · والإضافي لصاحبه
  if v_owner is null then
    if not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'حذف المصدر المعتمد لفريق الإشراف');
    end if;
  elsif v_owner <> auth.uid() and not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'هذا المصدر ليس من تأليفك');
  end if;

  select (select count(*) from item_progress where item_id = p_id)
       + (select count(*) from attempts     where item_id = p_id) into n;
  if n > 0 then
    return jsonb_build_object('ok', false,
      'error', 'تفاعل معه الطلاب ' || n || ' مرة — تعديله أسلم من حذفه');
  end if;

  delete from items where id = p_id;
  return jsonb_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.delete_passage(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; n int;
begin
  select quiz_id into v_quiz from passages where id = p_id;
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'النصّ غير موجود');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;
  select count(*) into n from questions where passage_id = p_id;
  if n > 0 then
    return jsonb_build_object('ok', false,
      'error', n || ' سؤالاً مرتبط بهذا النصّ — افصلها عنه أولاً');
  end if;
  delete from passages where id = p_id;
  return jsonb_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.delete_question(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; v_prev bigint; n int;
begin
  select quiz_id, supersedes_id into v_quiz, v_prev from questions where id = p_id;
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  select count(*) into n from answers where question_id = p_id;
  if n > 0 then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا السؤال ' || n || ' مرة — أنشئ إصداراً جديداً بدل حذفه');
  end if;

  -- المراجعات تعود إلى السلف قبل أن يمحوها الشلال
  if v_prev is not null then
    update review_queue set question_id = v_prev where question_id = p_id;
  end if;

  delete from question_keys where question_id = p_id;
  delete from options       where question_id = p_id;
  delete from questions     where id = p_id;

  if v_prev is not null then
    update questions set retired_at = null where id = v_prev;
  end if;

  update quizzes set question_count = (select count(*) from questions
                                        where quiz_id = v_quiz and retired_at is null)
   where id = v_quiz;

  return jsonb_build_object('ok', true, 'restored', v_prev);
end $function$
;

CREATE OR REPLACE FUNCTION public.delete_quiz(p_quiz bigint, p_confirm boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_n int; v_a int; v_lesson bigint; v_title text;
begin
  select subject_id, title into v_subject, v_title from quizzes where id = p_quiz;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'الحذف لفريق الإشراف');
  end if;

  select count(*) into v_a from attempts where quiz_id = p_quiz;
  if v_a > 0 then
    return jsonb_build_object('ok', false,
      'error', 'أجاب عنه ' || v_a || ' طالباً — ما مسّه طالبٌ لا يُمحى. ألغِ نشره بدل حذفه');
  end if;

  select i.lesson_id into v_lesson from items i where i.quiz_id = p_quiz limit 1;
  if v_lesson is not null then
    return jsonb_build_object('ok', false,
      'error', 'الاختبار مرتبطٌ بدرس — احذف عنصره من الدرس أولاً');
  end if;

  select count(*) into v_n from questions where quiz_id = p_quiz;

  if not p_confirm then
    return jsonb_build_object('ok', false, 'confirm', true,
                              'n', v_n, 'title', v_title);
  end if;

  delete from quizzes where id = p_quiz;   -- cascade: أسئلة · خيارات · نصوص
  return jsonb_build_object('ok', true, 'n', v_n);
end $function$
;

CREATE OR REPLACE FUNCTION public.delete_route(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_sub bigint;
begin
  select q.subject_id into v_sub from placement_routes x
    join quizzes q on q.id = x.from_quiz where x.id = p_id;
  if v_sub is null then
    return jsonb_build_object('ok', false, 'error', 'المسار غير موجود'); end if;
  if not can_curate(v_sub) then
    return jsonb_build_object('ok', false, 'error', 'التوجيه يحرّره فريق الإشراف'); end if;
  delete from placement_routes where id = p_id;
  return jsonb_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.duplicate_question(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; v_new bigint; v_correct bigint; v_dx jsonb := '{}'::jsonb;
        v_oldcorrect bigint; r record; v_oid bigint;
        v_kind text; v_oldids bigint[]; v_ids bigint[] := '{}'::bigint[];
begin
  select quiz_id, kind into v_quiz, v_kind from questions where id = p_id;
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- ⓐ section يُنسخ: النسخة تنتمي إلى قسم أصلها.
  -- ⓑ variant_key لا يُنسخ عمداً: التكرار حركةٌ لا ادّعاء تكافؤ.
  --    الاقتران يُعلَن وحده بـ set_variant، ولا يُستنتج من النسخ.
  insert into questions (quiz_id, position, kind, body, image_url, video_url, audio_url,
                         points, passage_id, objective_id, difficulty, lang, section)
  select quiz_id,
         (select coalesce(max(position),0) + 1 from questions where quiz_id = v_quiz),
         kind, body || ' (نسخة)', image_url, video_url, audio_url,
         points, passage_id, objective_id, difficulty, lang, section
    from questions where id = p_id
  returning id into v_new;

  select correct_id, correct_ids into v_oldcorrect, v_oldids
    from question_keys where question_id = p_id;

  for r in select o.*, (question_keys.dx_map ->> o.id::text) as dx
             from options o, question_keys
            where o.question_id = p_id and question_keys.question_id = p_id
            order by o.position
  loop
    insert into options (question_id, position, label, body, image_url)
    values (v_new, r.position, r.label, r.body, r.image_url)
    returning id into v_oid;
    -- ⚠️ في mcq يُستثنى الصحيح من dx_map لأنه بلا كود.
    --    وفي msq يحمل كود الإغفال ⇒ elsif كانت ستُسقطه، فيُنسَخ
    --    سؤالٌ بنصف تشخيصه ولا يشتكي أحد.
    if v_kind = 'msq' then
      if r.id = any (coalesce(v_oldids, '{}'::bigint[])) then v_ids := v_ids || v_oid; end if;
      if r.dx is not null then v_dx := v_dx || jsonb_build_object(v_oid::text, r.dx); end if;
    else
      if r.id = v_oldcorrect then v_correct := v_oid;
      elsif r.dx is not null then v_dx := v_dx || jsonb_build_object(v_oid::text, r.dx);
      end if;
    end if;
  end loop;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map)
  select v_new, v_correct, nullif(v_ids, '{}'::bigint[]), explanation, model_answer, v_dx
    from question_keys where question_id = p_id;

  update quizzes set question_count = (select count(*) from questions where quiz_id = v_quiz)
   where id = v_quiz;

  return jsonb_build_object('ok', true, 'id', v_new);
end $function$
;

CREATE OR REPLACE FUNCTION public.gap_count(p_body text)
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  -- الأرقام المميّزة لا المطابقات — فحذف {{1}} لا يُنتج ترقيماً مكرّراً
  select coalesce((
    select count(distinct m[1])::int
      from regexp_matches(coalesce(p_body,''), '\{\{(\d+)\}\}', 'g') m), 0);
$function$
;

CREATE OR REPLACE FUNCTION public.gap_seq_ok(p_body text)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  -- {{1}} ثم {{3}} فجوةٌ تُرفض — وإلا فراغٌ لا مفتاح له
  select coalesce((
    select array_agg(distinct (m[1])::int order by (m[1])::int)
      from regexp_matches(coalesce(p_body,''), '\{\{(\d+)\}\}', 'g') m
  ), '{}'::int[])
  = (select coalesce(array_agg(i order by i), '{}'::int[])
       from generate_series(1, gap_count(p_body)) i);
$function$
;

CREATE OR REPLACE FUNCTION public.get_quiz(p_quiz bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb; v_ids bigint[]; v_seed text; v_att int; v_lane bigint; v_sh bool;
begin
  if not can_access(p_quiz) and not is_teacher() then
    raise exception 'هذا الاختبار غير متاح لك بعد';
  end if;

  select shuffle into v_sh from quizzes where id = p_quiz;

  -- ◀ ═══ الانتقاء ═══
  -- صفّ attempts لا يُنشأ إلا عند التسليم، فعدد المحاولات السابقة
  -- هو رقم المحاولة الجارية. وبه تختلف البذرة بين محاولة وأخرى،
  -- وتثبت داخل المحاولة الواحدة مهما حُدّثت الصفحة.
  select count(*) into v_att
    from attempts where quiz_id = p_quiz and user_id = auth.uid();

  v_seed := coalesce(auth.uid()::text, 'anon') || ':' ||
            p_quiz::text || ':' || v_att::text;

  -- ① المسار: نصٌّ واحد من النصوص التي تحمل أسئلة موسومة.
  select passage_id into v_lane
    from questions
   where quiz_id = p_quiz and variant_key is not null and passage_id is not null
     and retired_at is null                                     -- ◀ حارس
   group by passage_id
   order by md5(v_seed || passage_id::text)
   limit 1;

  -- ② نسخة واحدة من كل خانة، بأولوية: المسار ← الحرّ ← البذرة
  select array_agg(id) into v_ids from (
    select distinct on (variant_key) id
      from questions
     where quiz_id = p_quiz and variant_key is not null
       and retired_at is null                                   -- ◀ حارس
     order by variant_key,
              (passage_id is not distinct from v_lane) desc,
              (passage_id is null) desc,
              md5(v_seed || id::text)
  ) s;

  -- ③ وكل سؤال بلا خانة يُعرض دائماً
  v_ids := coalesce(v_ids, '{}'::bigint[]) || coalesce((
    select array_agg(id) from questions
     where quiz_id = p_quiz and variant_key is null
       and retired_at is null), '{}'::bigint[]);              -- ◀ حارس
  -- ═══ نهاية الانتقاء ═══

  select jsonb_build_object(
    'id', q.id, 'title', q.title, 'minutes', q.minutes, 'version', q.version,
    'plays', q.plays,
    'passages', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', pg.id, 'title', pg.title, 'body', pg.body,
        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang)
        order by pg.position)
      from passages pg
     where pg.quiz_id = q.id
       and exists (select 1 from questions z
                    where z.id = any(v_ids) and z.passage_id = pg.id)), '[]'::jsonb),
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', x.id, 'kind', x.kind, 'body', x.body,
        'section', x.section,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        'passage_id', x.passage_id, 'lang', x.lang,
        -- عدد الفراغات يُشتقّ من {{n}} في النصّ — لا عمود يتفارق معه
        'gaps', case when x.kind = 'gap' then gap_count(x.body) end,
        -- قائمة الكلمات: تُعرض للطالب بطبعها، وفيها المشتّتات فلا تدلّ
        'bank', case when x.kind = 'gap'
                     then (select to_jsonb(k2.bank) from question_keys k2
                            where k2.question_id = x.id) end,
        'options', coalesce((
          select jsonb_agg(jsonb_build_object('id', o.id, 'label', o.label,
                           'body', o.body, 'image', o.image_url)
                 order by o.position)
          from options o where o.question_id = x.id), '[]'::jsonb)
      )
      -- ① ترتيب الكتل: بموضع أوّل بندٍ فيها — ثابتٌ دائماً
      order by (select min(coalesce((select min(y.position) from questions y
                                      where y.quiz_id = z.quiz_id
                                        and y.variant_key = z.variant_key
                                        and y.retired_at is null), z.position))
                  from questions z
                 where z.id = any(v_ids) and z.quiz_id = x.quiz_id
                   and z.passage_id is not distinct from x.passage_id
                   and z.section    is not distinct from x.section),
      -- ② داخل الكتلة: يُخلط إن طُلب، إلا كتلة النصّ المشترك
               case when v_sh and x.passage_id is null
                    then md5(v_seed || 'o' || x.id::text) end,
      -- ③ وإلا فالموضع الأصليّ (بمِرساة الخانة لا بموضع النسخة)
               coalesce((select min(y.position) from questions y
                          where y.quiz_id = x.quiz_id
                            and y.variant_key = x.variant_key
                            and y.retired_at is null), x.position),
               x.position)
      from questions x where x.id = any(v_ids)), '[]'::jsonb)
  ) into v
  from quizzes q where q.id = p_quiz;

  return v;
end $function$
;

CREATE OR REPLACE FUNCTION public.grade_gap(p_accept jsonb, p_given jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
declare
  v_slots jsonb := coalesce(p_accept -> 'slots', '[]'::jsonb);
  v_ord   bool  := coalesce((p_accept ->> 'ordered')::bool, true);
  v_n int := jsonb_array_length(v_slots);
  v_hits int := 0; v_case bool := false;
  v_used bool[]; i int; j int; g text; ok bool; hit_case bool;
begin
  v_used := array_fill(false, array[v_n]);

  for i in 0 .. v_n - 1 loop
    g := norm_en(p_given ->> i);
    if g = '' then continue; end if;
    ok := false; hit_case := false;

    for j in 0 .. v_n - 1 loop
      -- المرتَّب: كل فراغٍ يُقابل خانته. وغير المرتَّب: أيّ خانةٍ لم تُستهلك.
      continue when v_ord and i <> j;
      continue when v_used[j + 1];

      if exists (select 1 from jsonb_array_elements_text(v_slots -> j) a
                  where norm_en(a) = g) then
        ok := true;
        -- أصاب المعنى — أفأصاب الحالة أيضاً؟
        hit_case := exists (select 1 from jsonb_array_elements_text(v_slots -> j) a
                             where trim(a) = trim(coalesce(p_given ->> i, '')));
        v_used[j + 1] := true;
        exit;
      end if;
    end loop;

    if ok then
      v_hits := v_hits + 1;
      if not hit_case then v_case := true; end if;
    end if;
  end loop;

  return jsonb_build_object(
    'ok',        v_hits = v_n and v_n > 0,      -- كلٌّ أو لا شيء
    'hits',      v_hits,
    'slots',     v_n,
    'case_slip', v_case);
end $function$
;

CREATE OR REPLACE FUNCTION public.grant_curator(p_email text, p_subject bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_uid uuid; v_name text;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'المدير وحده يمنح صلاحية التنسيق');
  end if;
  select u.id into v_uid from auth.users u where lower(u.email) = lower(trim(p_email));
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'لا حساب بهذا البريد');
  end if;
  if p_subject is not null and not exists (select 1 from subjects where id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  insert into curators (user_id, subject_id, added_by)
  values (v_uid, p_subject, auth.uid())
  on conflict (user_id, coalesce(subject_id, 0)) do nothing;

  select full_name into v_name from profiles where id = v_uid;
  return jsonb_build_object('ok', true, 'name', v_name,
    'scope', coalesce((select name from subjects where id = p_subject), 'كل المواد'));
end $function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into profiles (id, full_name, klass)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'full_name', 'طالب'),
          new.raw_user_meta_data->>'klass');
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.has_opened(p_item bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from item_progress
     where item_id = p_item and user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.import_bank(p_subject text, p_data jsonb)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s_id bigint; q jsonb; m jsonb; e jsonb;
  q_id bigint; qu_id bigint; o_id bigint; corr bigint;
  i int; j int; dxm jsonb; letters text[] := array['أ','ب','ج','د']; n int := 0;
begin
  select id into s_id from subjects where code = p_subject;
  if s_id is null then
    insert into subjects (code, name, sort_order) values (p_subject, p_subject, 1) returning id into s_id;
  end if;

  -- المرور الأول: الاختبارات
  for q in select * from jsonb_array_elements(p_data) loop
    insert into quizzes (subject_id, code, title, unit, minutes, sort_order, pass_mark, published)
    values (s_id, q->>'code', q->>'title', q->>'unit', (q->>'minutes')::int,
            (q->>'order')::int, coalesce((q->>'pass_mark')::int,0), true)
    on conflict (code) do update set
      title = excluded.title, unit = excluded.unit,
      minutes = excluded.minutes, sort_order = excluded.sort_order,
      pass_mark = excluded.pass_mark
    returning id into qu_id;

    delete from questions where quiz_id = qu_id;

    i := 0;
    for m in select * from jsonb_array_elements(q->'mcq') loop
      i := i + 1;
      insert into questions (quiz_id, position, kind, body, points)
      values (qu_id, i, 'mcq', m->>'body', 1) returning id into q_id;

      j := 0; corr := null;
      dxm := '{}'::jsonb;
      for j in 0 .. jsonb_array_length(m->'options') - 1 loop
        insert into options (question_id, position, label, body)
        values (q_id, j + 1, letters[j + 1], (m->'options'->>j))
        returning id into o_id;
        if j = (m->>'correct')::int then corr := o_id; end if;
        if (m->'dx') ? j::text then
          dxm := dxm || jsonb_build_object(o_id::text, m->'dx'->>(j::text));
        end if;
      end loop;

      insert into question_keys (question_id, correct_id, explanation, dx_map)
      values (q_id, corr, m->>'explanation', dxm);
      n := n + 1;
    end loop;

    for e in select * from jsonb_array_elements(q->'essay') loop
      i := i + 1;
      insert into questions (quiz_id, position, kind, body, points)
      values (qu_id, i, 'essay', e->>'body', coalesce((e->>'points')::numeric,2))
      returning id into q_id;
      insert into question_keys (question_id, model_answer) values (q_id, e->>'model');
      n := n + 1;
    end loop;
  end loop;

  -- المرور الثاني: ربط التسلسل
  for q in select * from jsonb_array_elements(p_data) loop
    if q->>'requires' is not null then
      update quizzes set requires_id = (select id from quizzes where code = q->>'requires')
      where code = q->>'code';
    end if;
  end loop;

  return '✅ تم استيراد ' || n || ' سؤالاً';
end $function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$function$
;

CREATE OR REPLACE FUNCTION public.is_my_mentor(p_teacher uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select p_teacher is not null and exists (
    select 1 from mentorships
     where student_id = auth.uid()
       and teacher_id = p_teacher
       and active
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_teacher()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from profiles
                 where id = auth.uid() and role in ('teacher','admin'));
$function$
;

CREATE OR REPLACE FUNCTION public.item_quiz_ready(p_quiz bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select p_quiz is null                       -- عنصرٌ غير اختباريّ ⇒ جاهز
      or exists (select 1 from quizzes q
                  where q.id = p_quiz and q.published);
$function$
;

CREATE OR REPLACE FUNCTION public.lesson_done(p_lesson bigint, p_user uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_need int; v_ok int; v_mark int;
begin
  select pass_mark into v_mark from lessons where id = p_lesson;

  select count(*) into v_need
    from items where lesson_id = p_lesson and is_graded and quiz_id is not null;

  if v_need = 0 then return false; end if;

  select count(*) into v_ok from (
    select i.quiz_id
      from items i
      join attempts a on a.quiz_id = i.quiz_id and a.user_id = p_user
     where i.lesson_id = p_lesson and i.is_graded and i.quiz_id is not null
     group by i.quiz_id
    having max(a.pct) >= v_mark
  ) t;

  return v_ok >= v_need;
end $function$
;

CREATE OR REPLACE FUNCTION public.lesson_items(p_lesson bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v jsonb;
begin
  select c.subject_id into v_subject
    from lessons l join courses c on c.id = l.course_id where l.id = p_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;
  if not (can_author(v_subject) or can_curate(v_subject)) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك التأليف في هذه المادة');
  end if;

  select jsonb_build_object(
    'ok', true,
    'curate', can_curate(v_subject),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id, 'kind', i.kind,
        'label', k.label_ar, 'icon', k.icon, 'needs', k.needs,
        'title', i.title, 'description', i.description,
        'url', i.url, 'body', i.body, 'quiz_id', i.quiz_id,
        'position', i.position, 'is_graded', i.is_graded, 'required', i.required,
        'duration', i.duration_min, 'lang', i.lang,
        'official', i.created_by is null,
        'mine', i.created_by = auth.uid(),
        'author', (select p.full_name from profiles p where p.id = i.created_by),
        'visibility', i.visibility,
        'reviewed', i.reviewed_at is not null,
        -- عنصرٌ لمسه طالب لا يُحذف: تقدّمه ومحاولاته تشير إليه
        'touched', (select count(*) from item_progress ip where ip.item_id = i.id)
                   + (select count(*) from attempts a where a.item_id = i.id)
      ) order by i.created_by nulls first, i.position)
      from items i
      left join item_kinds k on k.code = i.kind
      where i.lesson_id = p_lesson), '[]'::jsonb)
  ) into v;
  return v;
end $function$
;

CREATE OR REPLACE FUNCTION public.level_from_score(p_scale bigint, p_pct integer)
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select id from levels
   where scale_id = p_scale
     and min_score is not null and max_score is not null
     and p_pct between min_score and max_score
   order by rank desc limit 1;
$function$
;

CREATE OR REPLACE FUNCTION public.list_lessons(p_subject bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  select jsonb_agg(x order by (x->>'level_rank')::int,
                              (x->>'unit_pos')::int, (x->>'position')::int) into v from (
    select jsonb_build_object(
      'id', l.id, 'code', l.code, 'title', l.title,
      'unit', coalesce(u.title, l.unit),
      'unit_pos', coalesce(u.position, 0),
      'summary', l.summary, 'position', l.position,
      'level', lv.name, 'level_id', lv.id,
      'level_rank', coalesce(lv.rank, 0),
      'own_level', mc.is_current,
      'course', c.title,
      'pass_mark', l.pass_mark,
      'locked', not can_access_lesson(l.id),
      'reason', case
        when can_access_lesson(l.id) then null
        when not can_view_level(l.level_id) then 'يفتح عند وصولك إلى: ' || coalesce(lv.name,'')
        else 'أكمل أولاً: ' || coalesce((select r.title from lessons r where r.id = l.requires_id),'')
      end,
      'done', lesson_done(l.id),
      'best', (select max(a.pct) from attempts a
               join items i on i.quiz_id = a.quiz_id
               where i.lesson_id = l.id and i.created_by is null
                 and a.user_id = auth.uid()),
      'items', coalesce((
        select jsonb_agg(jsonb_build_object(
          'id', i.id, 'kind', i.kind, 'title', i.title,
          'description', i.description, 'url', i.url,
          'quiz_id', i.quiz_id, 'is_graded', i.is_graded,
          'required', i.required, 'duration', i.duration_min, 'lang', i.lang,
          'status', (select ip.status from item_progress ip
                     where ip.item_id = i.id and ip.user_id = auth.uid())
        ) order by i.position)
        from items i
        where i.lesson_id = l.id and i.created_by is null
          and item_quiz_ready(i.quiz_id)                                    -- 🆕
        ), '[]'::jsonb),
      'extras', coalesce((
        select jsonb_agg(jsonb_build_object(
          'id', i.id, 'kind', i.kind, 'title', i.title,
          'description', i.description, 'url', i.url,
          'quiz_id', i.quiz_id, 'duration', i.duration_min, 'lang', i.lang,
          'author', coalesce(p.full_name, '—'),
          'from_my_mentor', is_my_mentor(i.created_by),
          'reviewed', i.reviewed_at is not null,
          'draft', i.visibility = 'private',
          'status', (select ip.status from item_progress ip
                     where ip.item_id = i.id and ip.user_id = auth.uid())
        ) order by (i.created_by = auth.uid()) desc,
                   is_my_mentor(i.created_by) desc,
                   p.full_name, i.position)
        from items i
        left join profiles p on p.id = i.created_by
        where i.lesson_id = l.id
          and i.created_by is not null
          and can_see_item(i.created_by, i.visibility, i.reviewed_at, i.id)
          and item_quiz_ready(i.quiz_id)                                    -- 🆕
        ), '[]'::jsonb)
    ) as x
    from lessons l
    join my_courses() mc on mc.course_id = l.course_id
    join courses c     on c.id = l.course_id
    left join levels lv on lv.id = l.level_id
    left join units  u  on u.id = l.unit_id
    where mc.subject_id = p_subject and l.published and l.archived_at is null
  ) t;
  return coalesce(v, '[]'::jsonb);
end $function$
;

CREATE OR REPLACE FUNCTION public.list_mentors(p_subject bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  select jsonb_agg(jsonb_build_object(
    'id', p.id, 'name', p.full_name,
    'school', p.school, 'bio', p.bio, 'years', p.years_exp,
    'students', cnt.n, 'capacity', ts.capacity,
    'full', cnt.n >= ts.capacity or not ts.accepting
  ) order by (cnt.n >= ts.capacity or not ts.accepting), p.full_name) into v
  from teacher_subjects ts
  join profiles p on p.id = ts.teacher_id and p.role in ('teacher','admin')
  cross join lateral (
    select count(*)::int as n from mentorships m
    where m.teacher_id = ts.teacher_id and m.subject_id = ts.subject_id and m.active
  ) cnt
  where ts.subject_id = p_subject;
  return coalesce(v, '[]'::jsonb);
end $function$
;

CREATE OR REPLACE FUNCTION public.list_quizzes()
 RETURNS TABLE(id bigint, code text, title text, unit text, minutes integer, subject text, mcq_count integer, essay_count integer, locked boolean, reason text, best integer)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  return query
  select q.id, l.code, l.title, l.unit, q.minutes, s.name,
         (select count(*)::int from questions x where x.quiz_id = q.id and x.kind='mcq'),
         (select count(*)::int from questions x where x.quiz_id = q.id and x.kind='essay'),
         not can_access_lesson(l.id),
         case when can_access_lesson(l.id) then null
              else 'أكمل أولاً: ' ||
                   coalesce((select r.title from lessons r where r.id = l.requires_id),'') end,
         (select max(a.pct) from attempts a
          where a.quiz_id = q.id and a.user_id = auth.uid())
  from lessons l
  join items   i on i.lesson_id = l.id and i.kind = 'quiz'
  join quizzes q on q.id = i.quiz_id
  left join subjects s on s.id = l.subject_id
  where l.published and l.archived_at is null
  order by l.position;
end $function$
;

CREATE OR REPLACE FUNCTION public.list_subjects()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  select jsonb_agg(x order by x->>'group_key', (x->>'sort')::int) into v from (
    select jsonb_build_object(
      'id', s.id, 'code', s.code, 'name', s.name,
      'description', s.description, 'icon', s.icon,
      'placement', s.placement, 'progression', s.progression,
      'tool', s.tool,                                          -- 🆕
      'scale_id', s.scale_id, 'sort', s.sort_order,
      'group_key', case
        when s.placement <> 'profile' then '3_skills'
        when exists (select 1 from my_courses() m
                      where m.subject_id = s.id and m.is_current) then '1_grade'
        else '2_past' end,
      'my_level', (select l.name from levels l where l.id = my_level_id(s.scale_id)),
      'course', (select c.title from courses c join my_courses() m on m.course_id = c.id
                  where m.subject_id = s.id and m.is_current limit 1),
      'elective', exists (select 1 from courses c join my_courses() m on m.course_id = c.id
                           where m.subject_id = s.id and m.is_current
                             and c.elective_group is not null),
      'needs_placement', s.placement = 'test'
        and not exists (select 1 from student_levels
                        where user_id = auth.uid() and scale_id = s.scale_id),
      'mentor_chosen', exists (select 1 from mentorships m
                               where m.student_id = auth.uid() and m.subject_id = s.id and m.active),
      'mentor_name', (select p.full_name from mentorships m
                      join profiles p on p.id = m.teacher_id
                      where m.student_id = auth.uid() and m.subject_id = s.id and m.active),
      'mentors_available', (select count(*) from teacher_subjects t
                            where t.subject_id = s.id and t.accepting),

      -- التقدّم = دروس مقرَّر صفّي وحده
      'lessons_total', (select count(*) from lessons ls
                        join my_courses() m on m.course_id = ls.course_id
                        where m.subject_id = s.id and m.is_current
                          and ls.published and ls.archived_at is null),
      'lessons_done',  (select count(*) from lessons ls
                        join my_courses() m on m.course_id = ls.course_id
                        where m.subject_id = s.id and m.is_current
                          and ls.published and ls.archived_at is null
                          and lesson_done(ls.id)),
      -- دروس صفوف سابقة — للمراجعة · خارج الحساب
      'lessons_review', (select count(*) from lessons ls
                         join my_courses() m on m.course_id = ls.course_id
                         where m.subject_id = s.id and not m.is_current
                           and ls.published and ls.archived_at is null),
      'lessons_all', (select count(*) from lessons ls
                      where ls.subject_id = s.id and ls.published)
    ) as x
    from subjects s
    where s.active
      and (is_teacher()
        or s.placement <> 'profile'
        or exists (select 1 from my_courses() m where m.subject_id = s.id))
  ) t;
  return coalesce(v, '[]'::jsonb);
end $function$
;

CREATE OR REPLACE FUNCTION public.list_teachable_subjects()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;
  select jsonb_agg(jsonb_build_object(
    'id', s.id, 'name', s.name, 'family', s.family,
    'level', (select l.name from levels l
              join lessons ls on ls.level_id = l.id and ls.subject_id = s.id limit 1),
    'chosen',  exists (select 1 from teacher_subjects t
                       where t.teacher_id = auth.uid() and t.subject_id = s.id),
    'capacity', coalesce((select capacity from teacher_subjects t
                          where t.teacher_id = auth.uid() and t.subject_id = s.id), 40),
    'accepting', coalesce((select accepting from teacher_subjects t
                           where t.teacher_id = auth.uid() and t.subject_id = s.id), true),
    'students', (select count(*) from mentorships m
                 where m.teacher_id = auth.uid() and m.subject_id = s.id and m.active)
  ) order by s.sort_order) into v
  from subjects s where s.active;
  return coalesce(v, '[]'::jsonb);
end $function$
;

CREATE OR REPLACE FUNCTION public.list_tools()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(jsonb_agg(t order by t->>'tool'), '[]'::jsonb) from (
    select jsonb_build_object(
      'tool', q.tool,
      'subject', max(s.name),
      'subject_id', max(s.id),
      'stations', jsonb_agg(jsonb_build_object(
          'id', q.id, 'code', q.code, 'title', q.title,
          'station', q.station, 'published', q.published,
          'n', q.question_count) order by coalesce(q.station, 999), q.id)
    ) as t
    from quizzes q join subjects s on s.id = q.subject_id
   where q.tool is not null and can_curate(q.subject_id)
   group by q.tool
  ) x;
$function$
;

CREATE OR REPLACE FUNCTION public.make_admin(p_email text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
declare v uuid;
begin
  select id into v from auth.users where lower(email) = lower(p_email);
  if v is null then return '⚠️ لا يوجد مستخدم بهذا البريد'; end if;
  update profiles set role = 'admin' where id = v;
  return '✅ صار مديراً: ' || p_email;
end $function$
;

CREATE OR REPLACE FUNCTION public.make_teacher(p_email text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
declare v uuid;
begin
  select id into v from auth.users where email = lower(p_email);
  if v is null then return '⚠️ لا يوجد مستخدم بهذا البريد'; end if;
  update profiles set role = 'teacher' where id = v;
  return '✅ تمت الترقية: ' || p_email;
end $function$
;

CREATE OR REPLACE FUNCTION public.max_mentor_switches()
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
AS $function$ select 2 $function$
;

CREATE OR REPLACE FUNCTION public.max_teacher_families()
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
AS $function$ select 3 $function$
;

CREATE OR REPLACE FUNCTION public.my_courses()
 RETURNS TABLE(course_id bigint, subject_id bigint, level_id bigint, is_current boolean)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select c.id, c.subject_id, c.level_id,
         (is_teacher() or c.level_id is null or c.level_id = my_level_id(s.scale_id))
  from courses c join subjects s on s.id = c.subject_id
  where c.active and s.active
    and (is_teacher() or (
      -- 🔑 مادة المهارات سُلّمها مقياس لا منهج — فلا تُقاس بمنهج الطالب
      (s.placement <> 'profile'
       or s.scale_id is null
       or s.scale_id = (select scale_id from profiles where id = auth.uid()))
    and (c.level_id is null or can_view_level(c.level_id))
    and (c.path_id is null
         or c.path_id = (select path_id from profiles where id = auth.uid()))
    and (c.elective_group is null
      or exists (select 1 from student_courses x
                  where x.user_id = auth.uid() and x.course_id = c.id)
      or not exists (select 1 from student_courses x
                     join courses c2 on c2.id = x.course_id
                     where x.user_id = auth.uid()
                       and c2.level_id = c.level_id
                       and c2.path_id is not distinct from c.path_id
                       and c2.elective_group = c.elective_group))));
$function$
;

CREATE OR REPLACE FUNCTION public.my_level_id(p_scale bigint, p_user uuid DEFAULT auth.uid())
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(
    (select level_id from student_levels where user_id = p_user and scale_id = p_scale),
    (select level_id from profiles       where id      = p_user and scale_id = p_scale));
$function$
;

CREATE OR REPLACE FUNCTION public.my_mentor(p_subject bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_used int; v_max int := max_mentor_switches(); v jsonb;
begin
  select greatest(count(*) - 1, 0) into v_used
    from mentorships
   where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null;

  select jsonb_build_object(
    'chosen',       exists (select 1 from mentorships
                            where student_id = auth.uid() and subject_id = p_subject and active),
    'teacher_id',   m.teacher_id,
    'teacher_name', p.full_name,
    'self_study',   m.id is not null and m.teacher_id is null,
    'switches_used', v_used,
    'switches_left', greatest(v_max - v_used, 0),
    'teachers_tried', (select count(*) from mentorships
                       where student_id = auth.uid() and subject_id = p_subject
                         and teacher_id is not null),
    'can_switch',   v_used < v_max
  ) into v
  from (select * from mentorships
        where student_id = auth.uid() and subject_id = p_subject and active) m
  full outer join profiles p on p.id = m.teacher_id
  limit 1;

  return coalesce(v, jsonb_build_object(
    'chosen', false, 'switches_used', v_used, 'teachers_tried', 0,
    'switches_left', greatest(v_max - v_used, 0), 'can_switch', true));
end $function$
;

CREATE OR REPLACE FUNCTION public.my_rank(p_scale bigint, p_user uuid DEFAULT auth.uid())
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce((
    select l.rank from student_levels sl
    join levels l on l.id = sl.level_id
    where sl.user_id = p_user and sl.scale_id = p_scale
  ), (
    select l.rank from profiles p
    join levels l on l.id = p.level_id
    where p.id = p_user and p.scale_id = p_scale
  ), -1);
$function$
;

CREATE OR REPLACE FUNCTION public.my_role()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb; r text;
begin
  select role into r from profiles where id = auth.uid();
  if r is null then return jsonb_build_object('role','student'); end if;

  select jsonb_build_object(
    'role', r,
    'request', (select jsonb_build_object(
                  'status', status, 'created_at', created_at,
                  'reviewed_at', reviewed_at, 'note', decision_note)
                from teacher_requests where user_id = auth.uid())
  ) into v;
  return v;
end $function$
;

CREATE OR REPLACE FUNCTION public.my_students(p_subject bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;
  select jsonb_agg(jsonb_build_object(
    'id', p.id, 'name', p.full_name, 'klass', p.klass,
    'subject', s.name, 'subject_id', s.id,
    'since', m.started_at,
    'attempts', (select count(*) from attempts a
                 join items i on i.quiz_id = a.quiz_id
                 join lessons ls on ls.id = i.lesson_id
                 where a.user_id = p.id and ls.subject_id = s.id),
    'avg', (select round(avg(a.pct)) from attempts a
            join items i on i.quiz_id = a.quiz_id
            join lessons ls on ls.id = i.lesson_id
            where a.user_id = p.id and ls.subject_id = s.id)
  ) order by p.full_name) into v
  from mentorships m
  join profiles p on p.id = m.student_id
  join subjects s on s.id = m.subject_id
  where m.teacher_id = auth.uid() and m.active
    and (p_subject is null or m.subject_id = p_subject);
  return coalesce(v, '[]'::jsonb);
end $function$
;

CREATE OR REPLACE FUNCTION public.norm_ar(t text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select regexp_replace(
           translate(trim(coalesce(t,'')), 'أإآىة' || 'ًٌٍَُِّْـ', 'ااايه'),
           '\s+', ' ', 'g');
$function$
;

CREATE OR REPLACE FUNCTION public.norm_en(t text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  select regexp_replace(trim(lower(coalesce(t,''))), '\s+', ' ', 'g');
$function$
;

CREATE OR REPLACE FUNCTION public.placement_start(p_tool text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_entry bigint; v_sid bigint; v_open bigint; v_sub bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يجب تسجيل الدخول');
  end if;

  -- محطّة المدخل — وهي واحدةٌ يفرضها tool_readiness
  select q.id, q.subject_id into v_entry, v_sub
    from quizzes q
   where q.tool = p_tool and q.station_kind = 'routing' and q.published
   limit 1;
  if v_entry is null then
    return jsonb_build_object('ok', false, 'error', 'الأداة غير متاحة بعد');
  end if;

  -- 🔑 جلسةٌ مفتوحة تُستأنف ولا تُستبدل: الطالب يعود من انقطاعٍ
  --    فيجد نفسه حيث وقف، ولا يُعاد إلى البداية.
  select id into v_open from placement_sessions
   where user_id = auth.uid() and tool = p_tool and finished_at is null;

  if v_open is not null then
    return jsonb_build_object('ok', true, 'session', v_open, 'resumed', true,
             'quiz', get_quiz((select current_quiz from placement_sessions where id = v_open)));
  end if;

  insert into placement_sessions (user_id, tool, current_quiz)
  values (auth.uid(), p_tool, v_entry)
  returning id into v_sid;

  return jsonb_build_object('ok', true, 'session', v_sid, 'resumed', false,
                            'quiz', get_quiz(v_entry));
end $function$
;

CREATE OR REPLACE FUNCTION public.placement_submit(p_session bigint, p_answers jsonb, p_duration integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s record; v_att bigint; v_raw int; v_n int; r record; v_next bigint;
begin
  select * into s from placement_sessions where id = p_session;
  if s is null or s.user_id <> auth.uid() then
    return jsonb_build_object('ok', false, 'error', 'جلسةٌ غير معروفة');
  end if;
  if s.finished_at is not null then
    return jsonb_build_object('ok', false, 'error', 'هذه الجلسة انتهت');
  end if;
  if s.current_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'لا محطّةَ جارية');
  end if;

  -- ① يُصحَّح ويُخزَّن بالمسار المعتاد — والأكواد تُكتب في answers
  --    كما هي وتُقرأ لاحقاً. ورادُّه يُهمَل: الطالب لا يرى تشخيصه.
  select (submit_attempt(s.current_quiz, p_answers, coalesce(p_duration,0), false)
          ->> 'attempt_id')::bigint into v_att;

  select score::int, total::int into v_raw, v_n from attempts where id = v_att;

  -- ② يُسأل جدول التوجيه
  select * into r from placement_routes
   where from_quiz = s.current_quiz and v_raw between min_raw and max_raw
   limit 1;

  if r is null then
    return jsonb_build_object('ok', false,
      'error', 'لا مسارَ لهذه الدرجة — أبلغ المعلّم');
  end if;

  -- ③ يُسجَّل المسار المسلوك — يُقرأ للمعايرة ولا يُعرض للطالب
  update placement_sessions
     set path = path || jsonb_build_object(
                  'quiz', s.current_quiz, 'attempt', v_att,
                  'raw', v_raw, 'of', v_n, 'verdict', r.verdict,
                  'at', now())
   where id = p_session;

  if r.verdict = 'next' then
    v_next := r.to_quiz;
    update placement_sessions set current_quiz = v_next where id = p_session;
    -- 🔒 لا درجة ولا مراجعة: محطّةٌ تعرض «١٤/١٨» تُخبر الطالب أين وُجِّه
    return jsonb_build_object('ok', true, 'done', false,
                              'quiz', get_quiz(v_next));
  end if;

  -- ④ ينتهي — ويُكتب المستوى
  update placement_sessions
     set current_quiz = null, finished_at = now(), level_id = r.level_id
   where id = p_session;

  perform set_my_level(
    (select scale_id from levels where id = r.level_id),
    r.level_id, 'test');                     -- 🔑 لا 'placement'

  return jsonb_build_object('ok', true, 'done', true,
    'level', (select name from levels where id = r.level_id),
    'level_id', r.level_id,
    'stations', jsonb_array_length((select path from placement_sessions where id = p_session)));
end $function$
;

CREATE OR REPLACE FUNCTION public.publish_lesson(p_lesson bigint, p_publish boolean DEFAULT true)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; n int; v_quiz int;
begin
  select c.subject_id into v_subject
    from lessons l join courses c on c.id = l.course_id where l.id = p_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'نشر الدروس لفريق الإشراف');
  end if;

  if p_publish then
    -- درسٌ بلا اختبار مُدرَج لا يكتمل عند الطالب أبداً، ويوقف ما بعده
    select count(*) into v_quiz from items i
     where i.lesson_id = p_lesson and i.is_graded and i.created_by is null;
    if v_quiz = 0 then
      return jsonb_build_object('ok', false,
        'error', 'الدرس بلا اختبار مُدرَج — لن يكتمل عند الطالب ولن تُفتح الدروس بعده');
    end if;

    select count(*) into n from items i
      join quizzes q on q.id = i.quiz_id
     where i.lesson_id = p_lesson and i.is_graded and not q.published;
    if n > 0 then
      return jsonb_build_object('ok', false,
        'error', 'اختبار الدرس غير منشور — انشره أولاً');
    end if;
  end if;

  update lessons set published = p_publish where id = p_lesson;
  return jsonb_build_object('ok', true, 'published', p_publish);
end $function$
;

CREATE OR REPLACE FUNCTION public.publish_quiz(p_quiz bigint, p_publish boolean DEFAULT true)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_owner uuid; v_r jsonb;
begin
  select subject_id, created_by into v_subject, v_owner from quizzes where id = p_quiz;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if v_owner is null then
    if not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'نشر الاختبار الرسمي لفريق الإشراف');
    end if;
  elsif v_owner <> auth.uid() and not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'هذا الاختبار ليس من تأليفك');
  end if;

  if p_publish then
    v_r := quiz_readiness(p_quiz);
    if not (v_r->>'ok')::boolean then
      return jsonb_build_object('ok', false, 'error', 'الاختبار غير جاهز للنشر', 'readiness', v_r);
    end if;
  end if;

  update quizzes set published = p_publish where id = p_quiz;
  return jsonb_build_object('ok', true, 'published', p_publish);
end $function$
;

CREATE OR REPLACE FUNCTION public.quiz_for_edit(p_quiz bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  if not can_edit_quiz(p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  select jsonb_build_object(
    'ok', true,
    'id', q.id, 'code', q.code, 'title', q.title, 'unit', q.unit,
    'minutes', q.minutes, 'published', q.published,
    'official', q.created_by is null,
    'subject_id', q.subject_id,

    -- الإعدادات
    'plays', q.plays, 'reveal', q.reveal,
    'pass_mark', q.pass_mark, 'shuffle', q.shuffle,
    'tool', q.tool, 'station', q.station,
    -- به تُقرَّر إتاحةُ تحرير الكود: مِرساةُ المحاولات لا تُبدَّل
    'attempts', (select count(*) from attempts a2 where a2.quiz_id = q.id),

    'passages', coalesce((select jsonb_agg(jsonb_build_object(
        'id', pg.id, 'title', pg.title, 'body', pg.body,
        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang, 'position', pg.position,
        -- ⚠️ بلا فلتر عمداً: delete_passage تحرس بالعدّ نفسه غير مفلتر،
        --    فلو فلترنا هنا لأعطينا المعلّم رقماً يناقض ما يمنعه به النظام.
        'used', (select count(*) from questions x2 where x2.passage_id = pg.id))
        order by pg.position) from passages pg where pg.quiz_id = q.id), '[]'::jsonb),

    'sections', coalesce((select jsonb_agg(distinct x3.section)
        from questions x3 where x3.quiz_id = q.id and x3.retired_at is null
          and x3.section is not null), '[]'::jsonb),

    'questions', coalesce((select jsonb_agg(jsonb_build_object(
        'id', x.id, 'kind', x.kind, 'body', x.body, 'position', x.position,
        'lang', x.lang, 'points', x.points, 'difficulty', x.difficulty,
        'section', x.section,
        'variant_key', x.variant_key,
        'passage_id', x.passage_id, 'objective_id', x.objective_id,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        'answered', (select count(*) from answers a where a.question_id = x.id),
        'explanation', k.explanation,
        'model', k.model_answer,
        'accept', k.accept, 'wrong', k.wrong_map, 'bank', to_jsonb(k.bank),
        'options', coalesce((select jsonb_agg(jsonb_build_object(
            'id', o.id, 'label', o.label, 'body', o.body, 'image', o.image_url,
            -- msq: العضوية في المجموعة · mcq: المطابقة الآمنة أمام الفراغ
            'correct', case when x.kind = 'msq'
                            then coalesce(o.id = any (k.correct_ids), false)
                            else o.id is not distinct from k.correct_id end,
            'dx', k.dx_map ->> o.id::text)
            order by o.position) from options o where o.question_id = x.id), '[]'::jsonb))
        order by x.position)
      from questions x left join question_keys k on k.question_id = x.id
      where x.quiz_id = q.id and x.retired_at is null), '[]'::jsonb),

    'readiness', quiz_readiness(q.id)
  ) into v
  from quizzes q where q.id = p_quiz;

  return coalesce(v, jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود'));
end $function$
;

CREATE OR REPLACE FUNCTION public.quiz_publish_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare v_r jsonb;
begin
  v_r := quiz_readiness(new.id);
  if not (v_r->>'ok')::boolean then
    raise exception 'اختبار غير جاهز للنشر (%): %',
      new.code, (select string_agg(value #>> '{}', ' · ')
                 from jsonb_array_elements(v_r->'issues'));
  end if;
  return null;
end $function$
;

CREATE OR REPLACE FUNCTION public.quiz_readiness(p_quiz bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_mcq int; v_msq int; v_gap int; v_essay int;
        v_issues jsonb := '[]'::jsonb; n int; v_kinds text;
begin
  if not exists (select 1 from quizzes where id = p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;

  select count(*) filter (where kind='mcq'),
         count(*) filter (where kind='msq'),
         count(*) filter (where kind='gap'),
         count(*) filter (where kind='essay')
    into v_mcq, v_msq, v_gap, v_essay from questions
   where quiz_id = p_quiz and retired_at is null;

  -- أنماط يسمح بها المخطط ولا تعرضها الواجهة
  select string_agg(distinct kind, ' · ') into v_kinds
    from questions where quiz_id = p_quiz and retired_at is null
     and kind not in ('mcq','msq','gap','essay');
  if v_kinds is not null then
    v_issues := v_issues || to_jsonb(
      'أنماط غير مبنيّة في الواجهة (' || v_kinds ||
      ') — ستُعرض للطالب كأسئلة مقالية');
  end if;

  -- الأنماط الثلاثة تُصحَّح آلياً وتدخل النسبة معاً، فالعتبة بمجموعها
  if v_mcq + v_msq + v_gap < 6 then
    v_issues := v_issues || to_jsonb(
      'يلزم ٦ أسئلة موضوعية على الأقل — الموجود ' || (v_mcq + v_msq + v_gap) ||
      ' (بأقلّ من ذلك تفقد عتبة ٦٥٪ معناها)');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and (k.question_id is null or k.correct_id is null);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا إجابة صحيحة محدَّدة'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا شرح للخطأ'); end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' خياراً خاطئاً بلا كود تشخيص — التشخيص هو ما يميّز بيان');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  -- ─── الاختيار المتعدّد ───────────────────────────────────
  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) < 2;
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بأقلّ من إجابتين صحيحتين');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) >=
         (select count(*) from options o where o.question_id = x.id);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال اختيار متعدّد بلا خيار خاطئ — لا يميّز شيئاً');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and not (o.id = any (coalesce(k.correct_ids, '{}'::bigint[])))
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' خياراً خاطئاً في أسئلة الاختيار المتعدّد بلا كود تشخيص');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بلا شرح للخطأ');
  end if;

  -- ─── إكمال الناقص ────────────────────────────────────────
  select count(*) into n from questions x
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (gap_count(x.body) = 0 or not gap_seq_ok(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال بلا {{1}} في نصّه أو بأرقامٍ غير متتالية');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (k.accept is null or jsonb_typeof(k.accept -> 'slots') <> 'array'
          or jsonb_array_length(k.accept -> 'slots') = 0);
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا مقبولات — لا يُصيبه أحد');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and jsonb_typeof(k.accept -> 'slots') = 'array'
     and jsonb_array_length(k.accept -> 'slots') <> gap_count(x.body);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال لا يطابق عددُ مقبولاته عددَ فراغاته');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا شرح للخطأ');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  -- مقبولٌ خارج البنك: خانةٌ لا يمكن ملؤها
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and k.bank is not null
     and exists (select 1
                   from jsonb_array_elements(k.accept -> 'slots') s,
                        jsonb_array_elements_text(s) a
                  where not (a = any (k.bank)));
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤالاً فيه مقبولٌ ليس في قائمة الكلمات');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='essay'
     and coalesce(trim(k.model_answer),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً مقالياً بلا إجابة نموذجية'); end if;

  return jsonb_build_object(
    'ok', jsonb_array_length(v_issues) = 0,
    'mcq', v_mcq, 'msq', v_msq, 'gap', v_gap, 'essay', v_essay,
    'issues', v_issues);
end $function$
;

CREATE OR REPLACE FUNCTION public.reorder_items(p_lesson bigint, p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint;
begin
  select c.subject_id into v_subject
    from lessons l join courses c on c.id = l.course_id where l.id = p_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'ترتيب المصادر لفريق الإشراف');
  end if;

  update items i set position = z.ord
    from (select id, row_number() over () as ord
            from unnest(p_ids) as id) z
   where i.id = z.id and i.lesson_id = p_lesson;

  return jsonb_build_object('ok', true, 'count', array_length(p_ids, 1));
end $function$
;

CREATE OR REPLACE FUNCTION public.reorder_questions(p_quiz bigint, p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_n int; v_all int;
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا أسئلة محدَّدة');
  end if;

  if not can_edit_quiz(p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- كل معرّفٍ من هذا الاختبار، ولا تكرار
  select count(*) into v_n
    from questions where quiz_id = p_quiz and id = any(p_ids);
  if v_n <> array_length(p_ids, 1)
     or v_n <> (select count(distinct x) from unnest(p_ids) x) then
    return jsonb_build_object('ok', false,
      'error', 'قائمة الترتيب فيها معرّفٌ مكرَّر أو من اختبارٍ آخر');
  end if;

  -- والقائمة كاملة: ترتيبٌ جزئيّ يترك المسكوتَ عنه في موضعٍ
  -- قد يصطدم بالمرقَّم الجديد
  select count(*) into v_all from questions where quiz_id = p_quiz;
  if v_all <> v_n then
    return jsonb_build_object('ok', false,
      'error', 'الترتيب يلزمه كل أسئلة الاختبار — أُرسل ' ||
               v_n || ' من ' || v_all);
  end if;

  update questions set position = -position where quiz_id = p_quiz;

  update questions x set position = z.ord
    from unnest(p_ids) with ordinality as z(id, ord)
   where x.id = z.id and x.quiz_id = p_quiz;

  return jsonb_build_object('ok', true, 'count', v_n);
end $function$
;

CREATE OR REPLACE FUNCTION public.request_teacher_access(p_school text, p_subject text, p_years integer, p_note text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_role text; v_name text; v_exists text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select role, full_name into v_role, v_name from profiles where id = auth.uid();

  if v_role in ('teacher','admin') then
    return jsonb_build_object('ok', false, 'error', 'حسابك مفعّل كمعلم بالفعل');
  end if;

  select status into v_exists from teacher_requests where user_id = auth.uid();

  if v_exists = 'pending' then
    return jsonb_build_object('ok', false, 'error', 'لديك طلب قيد المراجعة بالفعل');
  end if;

  if v_exists is null then
    insert into teacher_requests (user_id, full_name, school, subject_area, years_exp, note)
    values (auth.uid(), v_name, p_school, p_subject, p_years, p_note);
  else
    -- إعادة تقديم بعد رفض
    update teacher_requests
       set school = p_school, subject_area = p_subject, years_exp = p_years,
           note = p_note, status = 'pending', created_at = now(),
           reviewed_at = null, reviewed_by = null, decision_note = null
     where user_id = auth.uid();
  end if;

  update profiles set role = 'pending_teacher' where id = auth.uid();

  return jsonb_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.retire_question(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_quiz bigint; v_kind text; v_new bigint; v_n int;
  v_correct bigint; v_ids bigint[] := '{}'::bigint[]; v_dx jsonb := '{}'::jsonb;
  v_oldcorrect bigint; v_oldids bigint[];
  v_oid bigint; v_moved int := 0; v_seen int := 0; r record;
begin
  select quiz_id, kind into v_quiz, v_kind
    from questions where id = p_id and retired_at is null;
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود أو متقاعدٌ من قبل');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- الإصدار بلا إجابةٍ عبثٌ: لا سجلّ يُحمى، فيُعدَّل السؤال في مكانه
  select count(*) into v_n from answers where question_id = p_id;
  if v_n = 0 then
    return jsonb_build_object('ok', false,
      'error', 'لم يُجَب عن هذا السؤال — عدّله في مكانه بلا إصدار');
  end if;

  -- ① التقاعد أولاً. الترتيب حاسم: questions_live_position فهرسٌ فريد
  --    على الأحياء وحدهم، فلو وُلد الوريث قبل تقاعد سلفه لتزاحما.
  update questions set retired_at = now() where id = p_id;

  -- ② الوريث يرث الموضع والخانة والنصّ والقسم — فلا يتغيّر وجه الاختبار
  insert into questions (quiz_id, position, kind, body,
                         image_url, video_url, audio_url, points,
                         passage_id, objective_id, difficulty, lang,
                         section, variant_key, supersedes_id)
  select quiz_id, position, kind, body,
         image_url, video_url, audio_url, points,
         passage_id, objective_id, difficulty, lang,
         section, variant_key, p_id
    from questions where id = p_id
  returning id into v_new;

  -- ③ الخيارات بمعرّفات جديدة، ثم يُبنى المفتاح والتشخيص عليها
  select correct_id, correct_ids into v_oldcorrect, v_oldids
    from question_keys where question_id = p_id;

  for r in select o.id, o.position, o.label, o.body, o.image_url,
                  (k.dx_map ->> o.id::text) as dx
             from options o
             left join question_keys k on k.question_id = o.question_id
            where o.question_id = p_id
            order by o.position
  loop
    insert into options (question_id, position, label, body, image_url)
    values (v_new, r.position, r.label, r.body, r.image_url)
    returning id into v_oid;

    -- ⚠️ في mcq يُستثنى الصحيح من dx_map لأنه بلا كود. وفي msq يحمل
    --    كود الإغفال ⇒ elsif كانت ستُسقطه، فيُورَّث نصفُ التشخيص صامتاً.
    if v_kind = 'msq' then
      if r.id = any (coalesce(v_oldids, '{}'::bigint[])) then v_ids := v_ids || v_oid; end if;
      if r.dx is not null then v_dx := v_dx || jsonb_build_object(v_oid::text, r.dx); end if;
    else
      if r.id = v_oldcorrect then v_correct := v_oid;
      elsif r.dx is not null then v_dx := v_dx || jsonb_build_object(v_oid::text, r.dx);
      end if;
    end if;
  end loop;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map)
  select v_new, v_correct, nullif(v_ids, '{}'::bigint[]),
         explanation, model_answer, v_dx
    from question_keys where question_id = p_id;

  -- ④ 🔴 المراجعة المتباعدة تنتقل. ولولاها لبقي الطالب مجدوَلاً لسؤالٍ
  --    لن يُعرض عليه أبداً، فتسقط مراجعته صامتة. والانتقال يمنحه
  --    النسخة المصحَّحة حين يحين موعده — وهو الصواب تعليمياً.
  update review_queue set question_id = v_new where question_id = p_id;
  get diagnostics v_moved = row_count;

  -- ⑤ البلاغات: reviewed لا fixed — الوريث لم يُحرَّر بعد
  update question_reports set status = 'reviewed'
   where question_id = p_id and status = 'open';
  get diagnostics v_seen = row_count;

  return jsonb_build_object('ok', true, 'id', v_new, 'retired', p_id,
    'answers_kept', v_n, 'reviews_moved', v_moved, 'reports_seen', v_seen);
end $function$
;

CREATE OR REPLACE FUNCTION public.revoke_curator(p_email text, p_subject bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_uid uuid;
begin
  if not is_admin() then
    return jsonb_build_object('ok', false, 'error', 'المدير وحده يسحب صلاحية التنسيق');
  end if;
  select u.id into v_uid from auth.users u where lower(u.email) = lower(trim(p_email));
  delete from curators
   where user_id = v_uid and coalesce(subject_id, 0) = coalesce(p_subject, 0);
  return jsonb_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.save_item(p_id bigint DEFAULT NULL::bigint, p_lesson bigint DEFAULT NULL::bigint, p_kind text DEFAULT NULL::text, p_title text DEFAULT NULL::text, p_description text DEFAULT NULL::text, p_url text DEFAULT NULL::text, p_body text DEFAULT NULL::text, p_quiz bigint DEFAULT NULL::bigint, p_position integer DEFAULT 0, p_duration integer DEFAULT NULL::integer, p_lang text DEFAULT 'ar'::text, p_official boolean DEFAULT false, p_is_graded boolean DEFAULT false, p_required boolean DEFAULT false, p_visibility text DEFAULT 'private'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_lesson bigint; v_subject bigint; v_id bigint;
        v_by uuid; v_vis text; v_needs text; v_label text;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_lesson := coalesce(p_lesson, (select lesson_id from items where id = p_id));
  select subject_id into v_subject from lessons where id = v_lesson;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
  end if;

  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  -- 🔑 منسوب إلى بيان أم إلى شخص؟
  if p_official and not is_admin() then
    return jsonb_build_object('ok', false,
      'error', 'المحتوى المعتمد ضمن المنهج يضيفه المدير · أضِفه مصدراً إضافياً باسمك');
  end if;
  v_by  := case when p_official then null else auth.uid() end;
  v_vis := case when p_official then 'class' else coalesce(p_visibility, 'private') end;

  if not p_official and (p_is_graded or p_required) then
    return jsonb_build_object('ok', false,
      'error', 'المصدر الإضافي لا يكون شرط انتقال ولا يدخل حساب البوّابة');
  end if;

  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان العنصر مطلوب');
  end if;

  -- ▼ النمط ومتطلّبه — من الجدول المرجعي
  select k.needs, k.label_ar into v_needs, v_label
    from item_kinds k where k.code = p_kind and k.active;
  if v_needs is null then
    return jsonb_build_object('ok', false,
      'error', 'نمط غير معروف: ' || coalesce(p_kind, '—'));
  end if;

  if v_needs = 'quiz' and p_quiz is null then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج اختباراً مرتبطاً');
  elsif v_needs = 'url' and coalesce(trim(p_url), '') = '' then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج رابطاً');
  elsif v_needs = 'body' and coalesce(trim(p_body), '') = '' then
    return jsonb_build_object('ok', false, 'error', v_label || ' يحتاج نصاً');
  end if;

  if p_id is null then
    insert into items (lesson_id, kind, title, description, url, body, quiz_id, position,
                       is_graded, required, duration_min, lang, created_by, visibility)
    values (v_lesson, p_kind, trim(p_title), p_description, p_url, p_body, p_quiz,
            coalesce(p_position,0), coalesce(p_is_graded,false), coalesce(p_required,false),
            p_duration, coalesce(p_lang,'ar'), v_by, v_vis)
    returning id into v_id;
  else
    update items set
      kind = p_kind, title = trim(p_title), description = p_description,
      url = p_url, body = p_body, quiz_id = p_quiz,
      position = coalesce(p_position, position),
      is_graded = coalesce(p_is_graded, is_graded), required = coalesce(p_required, required),
      duration_min = p_duration, lang = coalesce(p_lang, lang), visibility = v_vis
     where id = p_id
       and (created_by is null and is_admin() or created_by = auth.uid())
    returning id into v_id;
    if v_id is null then
      return jsonb_build_object('ok', false, 'error', 'العنصر غير موجود أو ليس من تأليفك');
    end if;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id);
end $function$
;

CREATE OR REPLACE FUNCTION public.save_lesson(p_id bigint DEFAULT NULL::bigint, p_course bigint DEFAULT NULL::bigint, p_title text DEFAULT NULL::text, p_unit_id bigint DEFAULT NULL::bigint, p_summary text DEFAULT NULL::text, p_position integer DEFAULT 0, p_requires bigint DEFAULT NULL::bigint, p_pass_mark integer DEFAULT 65, p_published boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_course bigint; v_subject bigint; v_level bigint; v_id bigint; v_dup text;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_course := coalesce(p_course, (select course_id from lessons where id = p_id));
  select c.subject_id, c.level_id into v_subject, v_level from courses c where c.id = v_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false,
      'error', 'إنشاء الدروس لفريق الإشراف · يمكنك إضافة مصدر إلى درس قائم');
  end if;
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان الدرس مطلوب');
  end if;

  if p_unit_id is not null
     and not exists (select 1 from units u where u.id = p_unit_id and u.course_id = v_course) then
    return jsonb_build_object('ok', false, 'error', 'الوحدة لا تنتمي إلى هذا المقرَّر');
  end if;

  -- 🔑 عنوان فريد داخل المقرَّر — يمنع «درساً واحداً بعناوين شتّى»
  select l.title into v_dup from lessons l
   where l.course_id = v_course and l.archived_at is null
     and norm_ar(l.title) = norm_ar(p_title)
     and (p_id is null or l.id <> p_id)
   limit 1;
  if v_dup is not null then
    return jsonb_build_object('ok', false, 'error', 'يوجد درس بهذا العنوان في المقرَّر: ' || v_dup);
  end if;

  if p_requires is not null and p_requires = p_id then
    return jsonb_build_object('ok', false, 'error', 'الدرس لا يشترط نفسه');
  end if;

  if p_id is null then
    -- code مؤقّت فريد ثم يُستبدل بـ l<id> — المعرّف لا يُعرف قبل الإدراج
    insert into lessons (course_id, unit_id, subject_id, level_id, code, title, summary,
                         position, requires_id, pass_mark, published, created_by, visibility)
    values (v_course, p_unit_id, v_subject, v_level,
            'tmp_' || gen_random_uuid()::text,
            trim(p_title), p_summary,
            coalesce(p_position,0), p_requires, coalesce(p_pass_mark,65),
            coalesce(p_published,false), auth.uid(), 'class')
    returning id into v_id;

    update lessons set code = 'l' || v_id where id = v_id;
  else
    update lessons set
      course_id = v_course, unit_id = p_unit_id,
      subject_id = v_subject, level_id = v_level,
      title = trim(p_title), summary = p_summary,
      position = coalesce(p_position, position), requires_id = p_requires,
      pass_mark = coalesce(p_pass_mark, pass_mark),
      published = coalesce(p_published, published)
     where id = p_id
    returning id into v_id;
    if v_id is null then
      return jsonb_build_object('ok', false, 'error', 'الدرس غير موجود');
    end if;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id, 'course', v_course,
                            'code', (select code from lessons where id = v_id));
end $function$
;

CREATE OR REPLACE FUNCTION public.save_passage(p_id bigint DEFAULT NULL::bigint, p_quiz bigint DEFAULT NULL::bigint, p_title text DEFAULT NULL::text, p_body text DEFAULT NULL::text, p_media text DEFAULT NULL::text, p_kind text DEFAULT 'text'::text, p_lang text DEFAULT 'ar'::text, p_position integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_quiz bigint; v_id bigint; v_kind text;
  v_title text; v_body text; v_media text;      -- ◀ القيم بعد التنظيف، تُحسب مرة
  o record; v_answered boolean := false; v_logged boolean := false;
begin
  v_quiz := coalesce(p_quiz, (select quiz_id from passages where id = p_id));
  if v_quiz is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير محدَّد');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;
  if coalesce(trim(p_body), '') = '' and coalesce(trim(p_media), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'النصّ المشترك يحتاج نصاً أو وسيطاً');
  end if;

  v_kind := coalesce(nullif(trim(coalesce(p_kind,'')), ''), 'text');
  if v_kind not in ('text','audio','video','image') then
    return jsonb_build_object('ok', false, 'error', 'نوع الوسيط: audio أو video أو image');
  end if;
  -- وسيطٌ بلا نوع = صوت (السلوك القديم) · ونوعٌ بلا وسيط = نصّ
  if coalesce(trim(p_media),'') <> '' and v_kind = 'text' then v_kind := 'audio'; end if;
  if coalesce(trim(p_media),'') =  '' then v_kind := 'text'; end if;

  v_title := nullif(trim(coalesce(p_title,'')), '');
  v_body  := nullif(trim(coalesce(p_body ,'')), '');
  v_media := nullif(trim(coalesce(p_media,'')), '');

  if p_id is null then
    insert into passages (quiz_id, position, title, body, media_url, kind, lang)
    values (v_quiz, coalesce(p_position, 0), v_title, v_body, v_media,
            v_kind, coalesce(p_lang,'ar'))
    returning id into v_id;
  else
    select id, title, body, media_url, kind into o from passages where id = p_id;
    if o.id is null then
      return jsonb_build_object('ok', false, 'error', 'النصّ غير موجود');
    end if;

    -- ▼ السجلّ: بشرطين معاً — سؤالٌ أُجيب عنه، ومضمونٌ تغيّر فعلاً
    select exists (select 1 from answers a
                     join questions q on q.id = a.question_id
                    where q.passage_id = p_id) into v_answered;

    if v_answered and (o.title, o.body, o.media_url, o.kind)
                      is distinct from (v_title, v_body, v_media, v_kind) then
      insert into passage_history (passage_id, title, body, media_url, kind, replaced_by)
      values (p_id, o.title, o.body, o.media_url, o.kind, auth.uid());
      v_logged := true;
    end if;

    update passages set
      title = v_title, body = v_body, media_url = v_media,
      kind  = v_kind,  lang = coalesce(p_lang, lang),
      position = coalesce(p_position, position)
     where id = p_id returning id into v_id;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id, 'kind', v_kind, 'logged', v_logged);
end $function$
;

CREATE OR REPLACE FUNCTION public.save_question(p_id bigint DEFAULT NULL::bigint, p_quiz bigint DEFAULT NULL::bigint, p_kind text DEFAULT 'mcq'::text, p_body text DEFAULT NULL::text, p_position integer DEFAULT 0, p_options jsonb DEFAULT '[]'::jsonb, p_explanation text DEFAULT NULL::text, p_model text DEFAULT NULL::text, p_passage bigint DEFAULT NULL::bigint, p_objective bigint DEFAULT NULL::bigint, p_points integer DEFAULT 1, p_lang text DEFAULT 'ar'::text, p_difficulty text DEFAULT NULL::text, p_image text DEFAULT NULL::text, p_video text DEFAULT NULL::text, p_audio text DEFAULT NULL::text, p_section text DEFAULT NULL::text, p_accept jsonb DEFAULT NULL::jsonb, p_wrong jsonb DEFAULT NULL::jsonb, p_bank text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_subject bigint; v_quizid bigint; v_qid bigint; v_oid bigint;
  v_correct bigint; v_dx jsonb := '{}'::jsonb;
  v_bad text; v_n int; v_k int; r record;
  v_ids bigint[] := '{}'::bigint[];        -- msq: مجموعة الصحيحة
  v_gaps int;                              -- gap: مشتقٌّ من النصّ
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_quizid := coalesce(p_quiz, (select q2.quiz_id from questions q2 where q2.id = p_id));
  select q.subject_id into v_subject from quizzes q where q.id = v_quizid;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  -- 🔒 التعديل بعد بدء الطلاب يكسر ربط المحاولات
  if p_id is not null and exists (select 1 from answers where question_id = p_id) then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا السؤال — أنشئ نسخة جديدة من الاختبار بكود مختلف');
  end if;

  if coalesce(trim(p_body), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'نصّ السؤال مطلوب');
  end if;

  if p_passage is not null
     and not exists (select 1 from passages pg
                      where pg.id = p_passage and pg.quiz_id = v_quizid) then
    return jsonb_build_object('ok', false, 'error', 'النصّ المشترك ليس من هذا الاختبار');
  end if;

  if p_difficulty is not null and p_difficulty not in ('easy','medium','hard') then
    return jsonb_build_object('ok', false,
      'error', 'مستوى الصعوبة: easy أو medium أو hard');
  end if;

  -- ─── التحقّق: المقالي ───
  if p_kind = 'essay' then
    if coalesce(trim(p_model), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'السؤال المقالي يحتاج إجابة نموذجية — بها يقارن الطالب بنفسه');
    end if;

  -- ─── التحقّق: الاختيار من متعدد ───
  elsif p_kind = 'mcq' then
    v_n := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_n < 2 then
      return jsonb_build_object('ok', false, 'error', 'السؤال يحتاج خيارين على الأقل');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n <> 1 then
      return jsonb_build_object('ok', false, 'error', 'يلزم خيار صحيح واحد بالضبط');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    -- 🔑 الشرط الذي لا تستطيع سياسةٌ فرضه
    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  -- ─── التحقّق: الاختيار المتعدّد ───
  --     المبدأ الحاكم: كل خيار حكمٌ مستقل، ولكل حكمٍ خاطئ كود.
  elsif p_kind = 'msq' then
    v_k := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_k < 3 then
      return jsonb_build_object('ok', false,
        'error', 'الاختيار المتعدّد يحتاج ثلاثة خيارات على الأقل — صحيحان وخاطئ');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n < 2 then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خياران صحيحان على الأقل — وسؤالٌ صحيحه واحد هو اختيارٌ واحد متنكّر');
    end if;
    if v_n >= v_k then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خيار خاطئ واحد على الأقل — سؤالٌ كل خياراته صحيحة لا يميّز شيئاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    -- 🔑 الكود للمشتّت وحده — في النمطين معاً.
    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  -- ─── التحقّق: إكمال الناقص ───
  --   الفراغ يُعلَّم {{1}} في النصّ، وعددُه يُشتقّ منه.
  --   الحارس يفرض مفتاحاً لكل فراغ — فالفراغ بلا مقبولٍ يمرّ صامتاً
  --   ثم لا يُصيبه أحدٌ أبداً. ولا يفرض wrong_map.
  elsif p_kind = 'gap' then
    v_gaps := gap_count(p_body);

    if v_gaps = 0 then
      return jsonb_build_object('ok', false,
        'error', 'ضع فراغاً في النصّ: {{1}} — وفراغين: {{1}} و {{2}}');
    end if;
    if not gap_seq_ok(p_body) then
      return jsonb_build_object('ok', false,
        'error', 'أرقام الفراغات متتالية من ١ بلا فجوة ولا تكرار');
    end if;

    if p_accept is null or jsonb_typeof(p_accept -> 'slots') <> 'array' then
      return jsonb_build_object('ok', false,
        'error', 'الإجابة القصيرة تحتاج مقبولات — { "ordered":…, "slots":[[…]] }');
    end if;

    v_k := jsonb_array_length(p_accept -> 'slots');
    if v_k <> v_gaps then
      return jsonb_build_object('ok', false,
        'error', 'في النصّ ' || v_gaps || ' فراغاً، والمقبولات ' || v_k);
    end if;

    if exists (select 1 from jsonb_array_elements(p_accept -> 'slots') s
                where jsonb_typeof(s) <> 'array'
                   or jsonb_array_length(s) = 0
                   or exists (select 1 from jsonb_array_elements_text(s) a
                               where coalesce(trim(a),'') = '')) then
      return jsonb_build_object('ok', false,
        'error', 'كل فراغ يحتاج مقبولاً واحداً على الأقل، ولا مقبولَ فارغاً');
    end if;

    -- مفتاح wrong_map: "الفراغ:النصّ" — وبدون الرقم يُطابَق خطأُ فراغٍ بآخر
    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الأخطاء المتوقّعة كائن: { "1:نصّ الخطأ": "كود" }');
      end if;
      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ ('^[1-' || v_gaps || ']:.') limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخطأ يبدأ برقم الفراغ ثم نقطتين: ' || v_bad);
      end if;
      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    -- البنك: كل مقبولٍ يجب أن يكون فيه، وإلا فراغٌ لا يُملأ
    if p_bank is not null and array_length(p_bank, 1) > 0 then
      select a into v_bad
        from jsonb_array_elements(p_accept -> 'slots') s,
             jsonb_array_elements_text(s) a
       where not (a = any (p_bank)) limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مقبولٌ ليس في القائمة: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  else
    return jsonb_build_object('ok', false, 'error', 'نمط السؤال غير معروف: ' || coalesce(p_kind,'—'));
  end if;

  -- ─── الحفظ ───
  if p_id is null then
    insert into questions (quiz_id, position, kind, body, image_url, video_url, audio_url,
                           points, passage_id, objective_id, difficulty, lang, section)
    values (v_quizid, coalesce(p_position,0), p_kind, trim(p_body), p_image, p_video, p_audio,
            coalesce(p_points,1), p_passage, p_objective,
            coalesce(p_difficulty, 'medium'), coalesce(p_lang,'ar'),
            nullif(trim(coalesce(p_section,'')), ''))
    returning id into v_qid;
  else
    update questions set
      position = coalesce(p_position, position), kind = p_kind, body = trim(p_body),
      image_url = p_image, video_url = p_video, audio_url = p_audio,
      points = coalesce(p_points, points), passage_id = p_passage,
      objective_id = p_objective, difficulty = coalesce(p_difficulty, difficulty),
      lang = coalesce(p_lang, lang),
      section = nullif(trim(coalesce(p_section,'')), '')
     where id = p_id
    returning id into v_qid;
    if v_qid is null then
      return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود');
    end if;
    -- 🔑 الترتيب حاسم: question_keys.correct_id مفتاح أجنبي إلى options.
    delete from question_keys where question_id = v_qid;
    delete from options       where question_id = v_qid;
  end if;

  -- إدراج الخيارات ثم بناء dx_map من المعرّفات العائدة
  if p_kind in ('mcq', 'msq') then
    for r in select o, ord from jsonb_array_elements(p_options) with ordinality as t(o, ord) loop
      insert into options (question_id, position, label, body, image_url)
      values (v_qid, r.ord,
              nullif(trim(coalesce(r.o->>'label', '')), ''),
              trim(r.o->>'body'), nullif(r.o->>'image', ''))
      returning id into v_oid;

      if coalesce((r.o->>'correct')::boolean, false) then
        if p_kind = 'msq' then
          v_ids := v_ids || v_oid;
        else
          v_correct := v_oid;
        end if;
      else
        v_dx := v_dx || jsonb_build_object(v_oid::text, r.o->>'dx');
      end if;
    end loop;
  end if;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map, accept, wrong_map, bank)
  values (v_qid, v_correct, nullif(v_ids, '{}'::bigint[]),
          nullif(trim(coalesce(p_explanation,'')), ''),
          nullif(trim(coalesce(p_model,'')), ''), v_dx,
          case when p_kind = 'gap' then p_accept end,
          case when p_kind = 'gap' then p_wrong  end,
          case when p_kind = 'gap' then nullif(p_bank, '{}'::text[]) end)
  on conflict (question_id) do update
    set correct_id   = excluded.correct_id,
        correct_ids  = excluded.correct_ids,
        explanation  = excluded.explanation,
        model_answer = excluded.model_answer,
        dx_map       = excluded.dx_map,
        accept       = excluded.accept,
        wrong_map    = excluded.wrong_map,
        bank         = excluded.bank;

  update quizzes set question_count = (select count(*) from questions where quiz_id = v_quizid)
   where id = v_quizid;

  return jsonb_build_object(
    'ok', true, 'id', v_qid, 'kind', p_kind, 'gaps', v_gaps,
    'correct_n', coalesce(array_length(v_ids, 1), case when v_correct is null then 0 else 1 end),
    'dx_count', (select count(*) from jsonb_object_keys(v_dx)));
end $function$
;

CREATE OR REPLACE FUNCTION public.save_quiz(p_id bigint DEFAULT NULL::bigint, p_course bigint DEFAULT NULL::bigint, p_title text DEFAULT NULL::text, p_minutes integer DEFAULT 25, p_unit text DEFAULT NULL::text, p_code text DEFAULT NULL::text, p_official boolean DEFAULT true, p_subject bigint DEFAULT NULL::bigint, p_tool text DEFAULT NULL::text, p_station integer DEFAULT NULL::integer, p_plays integer DEFAULT NULL::integer, p_reveal text DEFAULT NULL::text, p_pass_mark integer DEFAULT NULL::integer, p_shuffle boolean DEFAULT NULL::boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_id bigint; v_code text; v_owner uuid; v_tool text;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_tool := nullif(trim(coalesce(p_tool, '')), '');

  if p_id is not null then
    select q.subject_id, q.created_by into v_subject, v_owner from quizzes q where q.id = p_id;
    if v_subject is null then
      return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
    end if;
    if v_owner is null and not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'الاختبار الرسمي يعدّله فريق الإشراف');
    end if;
    if v_owner is not null and v_owner <> auth.uid() and not is_admin() then
      return jsonb_build_object('ok', false, 'error', 'هذا الاختبار ليس من تأليفك');
    end if;

  elsif p_subject is not null then
    -- أداةُ قياس: مادّةٌ مباشرةً بلا مقرَّر ولا درس
    v_subject := p_subject;
    if not exists (select 1 from subjects s where s.id = v_subject) then
      return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
    end if;
    if v_tool is null then
      return jsonb_build_object('ok', false,
        'error', 'اختبارٌ بلا مقرَّر يلزمه اسم أداة — وإلا لم يبلغه أحد');
    end if;
    if not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'أدوات القياس ينشئها فريق الإشراف');
    end if;

  else
    select c.subject_id into v_subject from courses c where c.id = p_course;
    if v_subject is null then
      return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
    end if;
    if p_official and not can_curate(v_subject) then
      return jsonb_build_object('ok', false,
        'error', 'الاختبار الرسمي ينشئه فريق الإشراف · أنشئه تدريباً إضافياً باسمك');
    end if;
    if not p_official and not can_author(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
    end if;
  end if;

  -- ─── تحقّق القيم ───
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان الاختبار مطلوب');
  end if;

  if p_plays is not null and (p_plays < 1 or p_plays > 5) then
    return jsonb_build_object('ok', false,
      'error', 'حدُّ تشغيل الصوت بين ١ و٥ — واتركه فارغاً لتكون الإعادة مباحة');
  end if;

  if p_reveal is not null and p_reveal not in ('immediate','never') then
    return jsonb_build_object('ok', false, 'error', 'عرض المراجعة: immediate أو never');
  end if;

  if p_pass_mark is not null and (p_pass_mark < 1 or p_pass_mark > 100) then
    return jsonb_build_object('ok', false, 'error', 'درجة النجاح بين ١ و١٠٠');
  end if;

  if p_minutes is not null and (p_minutes < 1 or p_minutes > 240) then
    return jsonb_build_object('ok', false, 'error', 'الزمن بين دقيقةٍ و٢٤٠ دقيقة');
  end if;

  -- محطّةٌ واحدة لكل رقمٍ — يقابله quizzes_tool_station_uk.
  -- الفحص يُخبر بالعربية، والقيد يضمن عند التزامن. وكلٌّ لغرضه.
  if v_tool is not null and p_station is not null
     and exists (select 1 from quizzes q
                  where q.tool = v_tool and q.station = p_station
                    and (p_id is null or q.id <> p_id)) then
    return jsonb_build_object('ok', false,
      'error', 'المحطّة ' || p_station || ' مأخوذةٌ في هذه الأداة');
  end if;

  v_code := nullif(trim(coalesce(p_code, '')), '');
  if v_code is not null and exists (select 1 from quizzes q where q.code = v_code
                                     and (p_id is null or q.id <> p_id)) then
    return jsonb_build_object('ok', false, 'error', 'كود الاختبار مستعمل: ' || v_code);
  end if;

  -- 🔒 الكود مِرساةُ المحاولات — لا يُبدَّل بعد أن أجاب طالب
  if p_id is not null and v_code is not null
     and v_code is distinct from (select code from quizzes where id = p_id)
     and exists (select 1 from attempts a where a.quiz_id = p_id) then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا الاختبار — الكود لا يُبدَّل بعد أن ارتبطت به محاولات');
  end if;

  -- ─── الحفظ ───
  if p_id is null then
    insert into quizzes (subject_id, code, title, unit, minutes, published, created_by,
                         tool, station, plays, reveal, pass_mark, shuffle)
    values (v_subject, coalesce(v_code, 'tmp_' || gen_random_uuid()::text),
            trim(p_title), p_unit, coalesce(p_minutes, 25), false,
            case when p_official then null else auth.uid() end,
            v_tool, p_station,
            p_plays, coalesce(p_reveal, 'immediate'),
            coalesce(p_pass_mark, 65), coalesce(p_shuffle, false))
    returning id into v_id;
    if v_code is null then
      update quizzes set code = 'q' || v_id where id = v_id;
    end if;
  else
    update quizzes set
      title     = trim(p_title),
      unit      = p_unit,
      minutes   = coalesce(p_minutes, minutes),
      code      = coalesce(v_code, code),
      tool      = coalesce(v_tool, tool),
      station   = coalesce(p_station, station),
      plays     = p_plays,                    -- null = بلا حدّ، لا «لم يُرسل»
      reveal    = coalesce(p_reveal, reveal),
      pass_mark = coalesce(p_pass_mark, pass_mark),
      shuffle   = coalesce(p_shuffle, shuffle)
     where id = p_id returning id into v_id;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id,
                            'code', (select code from quizzes where id = v_id),
                            'official', p_official);
end $function$
;

CREATE OR REPLACE FUNCTION public.save_quiz(p_id bigint DEFAULT NULL::bigint, p_course bigint DEFAULT NULL::bigint, p_title text DEFAULT NULL::text, p_minutes integer DEFAULT 25, p_unit text DEFAULT NULL::text, p_code text DEFAULT NULL::text, p_official boolean DEFAULT true, p_subject bigint DEFAULT NULL::bigint, p_tool text DEFAULT NULL::text, p_station integer DEFAULT NULL::integer, p_plays integer DEFAULT NULL::integer, p_reveal text DEFAULT NULL::text, p_pass_mark integer DEFAULT NULL::integer, p_shuffle boolean DEFAULT NULL::boolean, p_kind text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_subject bigint; v_id bigint; v_code text; v_owner uuid; v_tool text;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_tool := nullif(trim(coalesce(p_tool, '')), '');

  if p_id is not null then
    select q.subject_id, q.created_by into v_subject, v_owner from quizzes q where q.id = p_id;
    if v_subject is null then
      return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
    end if;
    if v_owner is null and not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'الاختبار الرسمي يعدّله فريق الإشراف');
    end if;
    if v_owner is not null and v_owner <> auth.uid() and not is_admin() then
      return jsonb_build_object('ok', false, 'error', 'هذا الاختبار ليس من تأليفك');
    end if;

  elsif p_subject is not null then
    v_subject := p_subject;
    if not exists (select 1 from subjects s where s.id = v_subject) then
      return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
    end if;
    if v_tool is null then
      return jsonb_build_object('ok', false,
        'error', 'اختبارٌ بلا مقرَّر يلزمه اسم أداة — وإلا لم يبلغه أحد');
    end if;
    if not can_curate(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'أدوات القياس ينشئها فريق الإشراف');
    end if;

  else
    select c.subject_id into v_subject from courses c where c.id = p_course;
    if v_subject is null then
      return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
    end if;
    if p_official and not can_curate(v_subject) then
      return jsonb_build_object('ok', false,
        'error', 'الاختبار الرسمي ينشئه فريق الإشراف · أنشئه تدريباً إضافياً باسمك');
    end if;
    if not p_official and not can_author(v_subject) then
      return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
    end if;
  end if;

  -- ─── تحقّق القيم ───
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان الاختبار مطلوب');
  end if;

  if p_plays is not null and (p_plays < 1 or p_plays > 5) then
    return jsonb_build_object('ok', false,
      'error', 'حدُّ تشغيل الصوت بين ١ و٥ — واتركه فارغاً لتكون الإعادة مباحة');
  end if;

  if p_reveal is not null and p_reveal not in ('immediate','never') then
    return jsonb_build_object('ok', false, 'error', 'عرض المراجعة: immediate أو never');
  end if;

  if p_kind is not null and p_kind not in ('routing','panel','boundary','productive') then
    return jsonb_build_object('ok', false,
      'error', 'دور المحطّة: routing أو panel أو boundary أو productive');
  end if;

  -- 🔑 محطّةٌ في أداة يلزمها دور — وإلا لم يُعرف موضعها من التوجيه
  if v_tool is not null and coalesce(p_kind,
       (select station_kind from quizzes where id = p_id)) is null then
    return jsonb_build_object('ok', false, 'error', 'اختر دور المحطّة في التوجيه');
  end if;

  if p_pass_mark is not null and (p_pass_mark < 1 or p_pass_mark > 100) then
    return jsonb_build_object('ok', false, 'error', 'درجة النجاح بين ١ و١٠٠');
  end if;

  if p_minutes is not null and (p_minutes < 1 or p_minutes > 240) then
    return jsonb_build_object('ok', false, 'error', 'الزمن بين دقيقةٍ و٢٤٠ دقيقة');
  end if;

  -- محطّةٌ واحدة لكل رقمٍ — يقابله quizzes_tool_station_uk
  if v_tool is not null and p_station is not null
     and exists (select 1 from quizzes q
                  where q.tool = v_tool and q.station = p_station
                    and (p_id is null or q.id <> p_id)) then
    return jsonb_build_object('ok', false,
      'error', 'المحطّة ' || p_station || ' مأخوذةٌ في هذه الأداة');
  end if;

  v_code := nullif(trim(coalesce(p_code, '')), '');
  if v_code is not null and exists (select 1 from quizzes q where q.code = v_code
                                     and (p_id is null or q.id <> p_id)) then
    return jsonb_build_object('ok', false, 'error', 'كود الاختبار مستعمل: ' || v_code);
  end if;

  -- 🔒 الكود مِرساةُ المحاولات — لا يُبدَّل بعد أن أجاب طالب
  if p_id is not null and v_code is not null
     and v_code is distinct from (select code from quizzes where id = p_id)
     and exists (select 1 from attempts a where a.quiz_id = p_id) then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا الاختبار — الكود لا يُبدَّل بعد أن ارتبطت به محاولات');
  end if;

  -- ─── الحفظ ───
  if p_id is null then
    insert into quizzes (subject_id, code, title, unit, minutes, published, created_by,
                         tool, station, station_kind, plays, reveal, pass_mark, shuffle)
    values (v_subject, coalesce(v_code, 'tmp_' || gen_random_uuid()::text),
            trim(p_title), p_unit, coalesce(p_minutes, 25), false,
            case when p_official then null else auth.uid() end,
            v_tool, p_station, p_kind,
            p_plays, coalesce(p_reveal, 'immediate'),
            coalesce(p_pass_mark, 65), coalesce(p_shuffle, false))
    returning id into v_id;
    if v_code is null then
      update quizzes set code = 'q' || v_id where id = v_id;
    end if;
  else
    update quizzes set
      title        = trim(p_title),
      unit         = p_unit,
      minutes      = coalesce(p_minutes, minutes),
      code         = coalesce(v_code, code),
      tool         = coalesce(v_tool, tool),
      station      = coalesce(p_station, station),
      station_kind = coalesce(p_kind, station_kind),
      plays        = p_plays,                    -- null = بلا حدّ، لا «لم يُرسل»
      reveal       = coalesce(p_reveal, reveal),
      pass_mark    = coalesce(p_pass_mark, pass_mark),
      shuffle      = coalesce(p_shuffle, shuffle)
     where id = p_id returning id into v_id;
  end if;

  return jsonb_build_object('ok', true, 'id', v_id,
                            'code', (select code from quizzes where id = v_id),
                            'official', p_official);
end $function$
;

CREATE OR REPLACE FUNCTION public.save_route(p_id bigint DEFAULT NULL::bigint, p_from bigint DEFAULT NULL::bigint, p_min integer DEFAULT NULL::integer, p_max integer DEFAULT NULL::integer, p_verdict text DEFAULT NULL::text, p_to bigint DEFAULT NULL::bigint, p_level bigint DEFAULT NULL::bigint, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_sub bigint; v_n int; v_from bigint; v_kind text;
begin
  v_from := coalesce(p_from, (select from_quiz from placement_routes where id = p_id));
  select subject_id, question_count, station_kind into v_sub, v_n, v_kind
    from quizzes where id = v_from;
  if v_sub is null then
    return jsonb_build_object('ok', false, 'error', 'المحطّة غير موجودة');
  end if;
  if not can_curate(v_sub) then
    return jsonb_build_object('ok', false, 'error', 'التوجيه يحرّره فريق الإشراف');
  end if;

  if p_verdict not in ('next','done') then
    return jsonb_build_object('ok', false, 'error', 'الحكم: next أو done');
  end if;
  if p_min is null or p_max is null or p_min < 0 or p_max < p_min then
    return jsonb_build_object('ok', false, 'error', 'المدى يبدأ من صفرٍ فأعلى، ونهايتُه لا تقلّ عن بدايته');
  end if;
  if p_max > v_n then
    return jsonb_build_object('ok', false,
      'error', 'المحطّة ' || v_n || ' بنداً — والمدى يتجاوزها');
  end if;

  -- 🔑 دور المحطّة يحكم: الحدُّ يحسم ولا يُحيل · والتوجيه يوجّه ولا يُسكّن
  if v_kind = 'boundary' and p_verdict = 'next' then
    return jsonb_build_object('ok', false, 'error', 'محطّة الحدّ تحسم ولا تُحيل');
  end if;
  if v_kind = 'routing' and p_verdict = 'done' then
    return jsonb_build_object('ok', false, 'error', 'محطّة التوجيه توجّه ولا تُسكّن');
  end if;

  if p_verdict = 'next' then
    if p_to is null then
      return jsonb_build_object('ok', false, 'error', 'حكم next يحتاج محطّةً تالية'); end if;
    if p_to = v_from then
      return jsonb_build_object('ok', false, 'error', 'محطّةٌ تُحيل إلى نفسها لا تنتهي'); end if;
  else
    if p_level is null then
      return jsonb_build_object('ok', false, 'error', 'حكم done يحتاج مستوًى'); end if;
  end if;

  -- تداخلٌ مع مدًى قائم — أيّهما يُطبَّق؟
  if exists (select 1 from placement_routes x
              where x.from_quiz = v_from and (p_id is null or x.id <> p_id)
                and x.max_raw >= p_min and p_max >= x.min_raw) then
    return jsonb_build_object('ok', false,
      'error', 'المدى ' || p_min || '–' || p_max || ' يتداخل مع مدًى قائم');
  end if;

  if p_id is null then
    insert into placement_routes (from_quiz, min_raw, max_raw, verdict, to_quiz, level_id, note)
    values (v_from, p_min, p_max, p_verdict,
            case when p_verdict='next' then p_to end,
            case when p_verdict='done' then p_level end,
            nullif(trim(coalesce(p_note,'')), ''))
    returning id into p_id;
  else
    update placement_routes set
      min_raw = p_min, max_raw = p_max, verdict = p_verdict,
      to_quiz  = case when p_verdict='next' then p_to end,
      level_id = case when p_verdict='done' then p_level end,
      note     = nullif(trim(coalesce(p_note,'')), '')
     where id = p_id;
  end if;

  return jsonb_build_object('ok', true, 'id', p_id);
end $function$
;

CREATE OR REPLACE FUNCTION public.save_unit(p_id bigint DEFAULT NULL::bigint, p_course bigint DEFAULT NULL::bigint, p_title text DEFAULT NULL::text, p_position integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_course bigint; v_subject bigint; v_id bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  v_course := coalesce(p_course, (select course_id from units where id = p_id));
  select c.subject_id into v_subject from courses c where c.id = v_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'إنشاء الوحدات لفريق الإشراف');
  end if;
  if coalesce(trim(p_title), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'عنوان الوحدة مطلوب');
  end if;
  if exists (select 1 from units u where u.course_id = v_course
              and norm_ar(u.title) = norm_ar(p_title)
              and (p_id is null or u.id <> p_id)) then
    return jsonb_build_object('ok', false, 'error', 'توجد وحدة بهذا العنوان في المقرَّر');
  end if;

  if p_id is null then
    insert into units (course_id, title, position)
    values (v_course, trim(p_title), coalesce(p_position,0)) returning id into v_id;
  else
    update units set title = trim(p_title), position = coalesce(p_position, position)
     where id = p_id returning id into v_id;
    if v_id is null then
      return jsonb_build_object('ok', false, 'error', 'الوحدة غير موجودة');
    end if;
  end if;
  return jsonb_build_object('ok', true, 'id', v_id);
end $function$
;

CREATE OR REPLACE FUNCTION public.set_my_grade(p_scale bigint, p_level bigint DEFAULT NULL::bigint, p_path bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_scale text; v_level text; v_path text; v_rank int; v_needs boolean;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select name into v_scale from scales where id = p_scale;
  if v_scale is null then
    return jsonb_build_object('ok', false, 'error', 'المنهج غير موجود');
  end if;

  if p_level is not null then
    select name, rank into v_level, v_rank from levels where id = p_level and scale_id = p_scale;
    if v_level is null then
      return jsonb_build_object('ok', false, 'error', 'هذا الصف لا ينتمي إلى ' || v_scale);
    end if;
  elsif exists (select 1 from levels where scale_id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'اختر صفّك في ' || v_scale);
  end if;

  select exists (select 1 from paths
                  where scale_id = p_scale and active
                    and from_rank <= coalesce(v_rank, -1)) into v_needs;

  if p_path is not null then
    select name into v_path from paths
     where id = p_path and scale_id = p_scale and active and from_rank <= v_rank;
    if v_path is null then
      return jsonb_build_object('ok', false, 'error', 'هذه الشعبة غير متاحة في ' || v_level);
    end if;
  end if;

  -- 🔑 الصفّ يُحفظ دائماً · والمسار يُطلب ولا يُشترط
  update profiles set scale_id = p_scale, level_id = p_level,
         path_id = case when v_needs then p_path else null end
   where id = auth.uid();

  return jsonb_build_object('ok', true, 'scale', v_scale, 'level', v_level,
    'path', v_path, 'needs_path', v_needs and p_path is null);
end $function$
;

CREATE OR REPLACE FUNCTION public.set_my_level(p_scale bigint, p_level bigint, p_source text DEFAULT 'self'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;
  insert into student_levels (user_id, scale_id, level_id, source)
  values (auth.uid(), p_scale, p_level, coalesce(p_source,'self'))
  on conflict (user_id, scale_id) do update
    set level_id = excluded.level_id, source = excluded.source, set_at = now();
  return jsonb_build_object('ok', true,
    'level', (select name from levels where id = p_level));
end $function$
;

CREATE OR REPLACE FUNCTION public.set_my_subjects(p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_fam int; v_max int := max_teacher_families();
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;

  -- العدّ على عائلة المادة لا على صفوفها
  select count(distinct coalesce(family, 's' || id::text)) into v_fam
    from subjects where id = any(p_ids);

  if v_fam > v_max then
    return jsonb_build_object('ok', false,
      'error', 'يمكنك متابعة ' || v_max || ' مواد كحد أقصى — اخترتَ ' || v_fam);
  end if;

  delete from teacher_subjects
   where teacher_id = auth.uid() and subject_id <> all(coalesce(p_ids, '{}'));

  insert into teacher_subjects (teacher_id, subject_id)
  select auth.uid(), unnest(p_ids)
  on conflict (teacher_id, subject_id) do nothing;

  return jsonb_build_object('ok', true, 'families', v_fam);
end $function$
;

CREATE OR REPLACE FUNCTION public.set_section(p_section text, p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_quiz bigint; n int;
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا أسئلة محدَّدة');
  end if;

  select count(distinct quiz_id), min(quiz_id) into n, v_quiz
    from questions where id = any(p_ids);
  if n <> 1 then
    return jsonb_build_object('ok', false, 'error', 'الأسئلة ليست من اختبار واحد');
  end if;
  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- القسم عنوان عرضٍ لا يغيّر معنى السؤال، فلا يُمنع على المُجاب عنه
  update questions set section = nullif(trim(coalesce(p_section, '')), '')
   where id = any(p_ids);
  return jsonb_build_object('ok', true, 'count', array_length(p_ids, 1));
end $function$
;

CREATE OR REPLACE FUNCTION public.set_subject_capacity(p_subject bigint, p_cap integer, p_accepting boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;
  update teacher_subjects
     set capacity = greatest(1, least(500, coalesce(p_cap, capacity))),
         accepting = coalesce(p_accepting, accepting)
   where teacher_id = auth.uid() and subject_id = p_subject;
  return true;
end $function$
;

CREATE OR REPLACE FUNCTION public.set_variant(p_ids bigint[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_quiz bigint; v_quizzes int; v_kinds int; v_found int;
  v_keys text[]; v_key text; v_size int;
begin
  if p_ids is null or array_length(p_ids, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'لا أسئلة محدَّدة');
  end if;

  if array_length(p_ids, 1) < 2 then
    return jsonb_build_object('ok', false, 'error',
      'الخانة تحتاج سؤالين على الأقل — سؤالٌ وحده ليس نسخةً لشيء');
  end if;

  select count(distinct quiz_id), min(quiz_id), count(distinct kind), count(*)
    into v_quizzes, v_quiz, v_kinds, v_found
    from questions where id = any(p_ids) and retired_at is null;

  -- يكشف المعرّفات المكرَّرة والمعدومة والمتقاعدة معاً
  if v_found <> array_length(p_ids, 1) then
    return jsonb_build_object('ok', false, 'error',
      'بعض المعرّفات مكرَّر أو لا سؤال حيّاً له');
  end if;

  if v_quizzes <> 1 then
    return jsonb_build_object('ok', false, 'error', 'الأسئلة ليست من اختبار واحد');
  end if;

  if not can_edit_quiz(v_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  -- اختيارٌ ومقاليّة لا يتبادلان مهما تشابها
  if v_kinds <> 1 then
    return jsonb_build_object('ok', false, 'error',
      'لا تُقرن أسئلة مختلفة النمط في خانة واحدة');
  end if;

  -- المفاتيح القائمة بين المحدَّدين
  select array_agg(distinct variant_key) into v_keys
    from questions
   where id = any(p_ids) and retired_at is null and variant_key is not null;

  if array_length(v_keys, 1) > 1 then
    return jsonb_build_object('ok', false, 'error',
      'الأسئلة موسومة بخانتين مختلفتين — فُكّ إحداهما أولاً', 'keys', to_jsonb(v_keys));
  end if;

  -- تبنَّ المفتاح الموجود (فتتّسع الخانة)، أو ولّد واحداً من أصغر معرّف
  v_key := coalesce(v_keys[1],
                    'v' || (select min(id) from questions
                             where id = any(p_ids) and retired_at is null)::text);

  update questions set variant_key = v_key
   where id = any(p_ids) and retired_at is null;

  -- 🔴 الحجم المُعاد إلى المعلّم: الأحياء وحدهم، وإلا وعدناه بنسخةٍ لا تُسحب
  select count(*) into v_size
    from questions
   where quiz_id = v_quiz and variant_key = v_key and retired_at is null;

  return jsonb_build_object('ok', true, 'key', v_key, 'size', v_size);
end $function$
;

CREATE OR REPLACE FUNCTION public.submit_attempt(p_quiz bigint, p_answers jsonb, p_duration integer, p_auto boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_attempt bigint; v_score numeric := 0; v_total numeric := 0;
  a jsonb; k record; v_ok bool; v_dx text; v_pct int; v_res jsonb;
  v_item bigint; v_lesson bigint; v_ver int; v_reveal text;
  v_q bigint; v_opt bigint; v_meta jsonb;                    -- ▼ msq
  v_picked bigint[]; v_keys bigint[]; v_wrong bigint[]; v_missed bigint[];
  v_txt text; v_given jsonb; v_g jsonb;                      -- ▼ gap
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;
  if not can_access(p_quiz) then raise exception 'هذا الاختبار غير متاح لك بعد'; end if;

  select i.id, i.lesson_id into v_item, v_lesson
    from items i where i.quiz_id = p_quiz limit 1;
  select version, reveal into v_ver, v_reveal from quizzes where id = p_quiz;

  insert into attempts (user_id, quiz_id, duration_sec, auto_submitted,
                        item_id, quiz_version)
  values (auth.uid(), p_quiz, coalesce(p_duration,0), coalesce(p_auto,false),
          v_item, v_ver)
  returning id into v_attempt;

  for a in select * from jsonb_array_elements(p_answers) loop
    select qk.correct_id, qk.correct_ids, qk.dx_map, qk.accept, qk.wrong_map,
           q.kind, q.points
      into k
      from questions q left join question_keys qk on qk.question_id = q.id
     where q.id = (a->>'q')::bigint and q.quiz_id = p_quiz;

    if not found then continue; end if;

    v_q := (a->>'q')::bigint;

    if k.kind in ('mcq', 'msq', 'gap') then
      v_total := v_total + coalesce(k.points,1);
      v_opt := null; v_dx := null; v_meta := '{}'::jsonb; v_txt := null;

      if k.kind = 'mcq' then
        v_opt := nullif(a->>'o','')::bigint;
        v_ok  := v_opt is not null and v_opt = k.correct_id;
        if not v_ok then v_dx := k.dx_map ->> (a->>'o'); end if;

      elsif k.kind = 'gap' then
        -- ما كتبه الطالب: مصفوفةٌ بترتيب الفراغات
        v_given := coalesce(a->'txt', '[]'::jsonb);
        v_txt   := (select string_agg(e #>> '{}', ' | ')
                      from jsonb_array_elements(v_given) e);
        v_g     := grade_gap(coalesce(k.accept, '{}'::jsonb), v_given);
        v_ok    := coalesce((v_g->>'ok')::bool, false);

        if v_ok then
          -- أصاب المعنى — والانزلاق في الحالة يُوسَم ولا يُخصم
          if coalesce((v_g->>'case_slip')::bool, false) then v_dx := 'PRC'; end if;
        else
          -- المفتاح "الفراغ:النصّ" — بلا الرقم يُطابَق خطأُ فراغٍ بآخر
          select k.wrong_map ->> ((t.ord)::text || ':' || (t.e #>> '{}')) into v_dx
            from jsonb_array_elements(v_given) with ordinality as t(e, ord)
           where k.wrong_map ? ((t.ord)::text || ':' || (t.e #>> '{}')) limit 1;
          -- نصفُ إصابةٍ ⇒ HLF
          if v_dx is null and (v_g->>'hits')::int > 0 then v_dx := 'HLF'; end if;
        end if;

        v_meta := jsonb_build_object('gap', v_g, 'given', v_given);

      else
        -- ▼ الاختيار المتعدّد: المجموعة تُقارن بالاحتواء المتبادل،
        --   فترتيب نقر الطالب لا يعني شيئاً.
        select coalesce(array_agg(distinct (e #>> '{}')::bigint), '{}'::bigint[])
          into v_picked
          from jsonb_array_elements(coalesce(a->'os', '[]'::jsonb)) e;

        v_keys := coalesce(k.correct_ids, '{}'::bigint[]);
        v_ok   := (v_picked <@ v_keys) and (v_keys <@ v_picked);

        -- صنفا الخطأ: ما ارتُكب وما أُغفل
        select coalesce(array_agg(x), '{}'::bigint[]) into v_wrong
          from unnest(v_picked) x where not (x = any (v_keys));
        select coalesce(array_agg(x), '{}'::bigint[]) into v_missed
          from unnest(v_keys) x where not (x = any (v_picked));

        -- الأكواد للمُرتَكب وحده. والمُغفَل يُشخَّص بالنمط لا بالوسم:
        -- wrong=[] مع missed ≠ [] تعني توقّفاً لا خطأ حكم.
        if array_length(v_wrong, 1) is not null then
          select k.dx_map ->> o.id::text into v_dx
            from options o
           where o.question_id = v_q and o.id = any (v_wrong)
           order by o.position
           limit 1;
        end if;

        v_meta := jsonb_build_object(
          'picked', to_jsonb(v_picked),
          'wrong',  to_jsonb(v_wrong),
          'missed', to_jsonb(v_missed),
          'dx', coalesce((select jsonb_agg(k.dx_map ->> o.id::text order by o.position)
                            from options o
                           where o.question_id = v_q
                             and o.id = any (v_wrong)),
                         '[]'::jsonb));
      end if;

      if v_ok then v_score := v_score + coalesce(k.points,1); end if;

      insert into answers (attempt_id, question_id, option_id, is_correct,
                           dx_code, seconds, changes, confidence, meta, essay_text)
      values (v_attempt, v_q, v_opt, v_ok, v_dx,
              coalesce((a->>'sec')::int,0), coalesce((a->>'chg')::int,0),
              nullif(a->>'conf','')::int, v_meta, v_txt);

      -- جدولة المراجعة المتباعدة
      insert into review_queue (user_id, question_id, due_at, interval_days, streak, last_result)
      values (auth.uid(), v_q,
              now() + (case when v_ok then 3 else 1 end || ' days')::interval,
              case when v_ok then 3 else 1 end,
              case when v_ok then 1 else 0 end, v_ok)
      on conflict (user_id, question_id) do update set
        streak        = case when v_ok then review_queue.streak + 1 else 0 end,
        interval_days = case when v_ok
                             then least(review_queue.interval_days * 2, 60) else 1 end,
        due_at        = now() + (case when v_ok
                             then least(review_queue.interval_days * 2, 60) else 1 end
                             || ' days')::interval,
        last_result   = v_ok;
    else
      insert into answers (attempt_id, question_id, essay_text, seconds)
      values (v_attempt, v_q, a->>'essay', coalesce((a->>'sec')::int,0));
    end if;
  end loop;

  v_pct := case when v_total > 0 then round(v_score / v_total * 100)::int else 0 end;
  update attempts set score = v_score, total = v_total, pct = v_pct where id = v_attempt;

  -- 🔒 محطّةُ تسكين: لا مراجعة ولا درجة. الأكواد خُزّنت أعلاه وتُقرأ لاحقاً.
  if v_reveal = 'never' then
    return jsonb_build_object('attempt_id', v_attempt, 'reveal', 'never');
  end if;

  select jsonb_build_object(
    'attempt_id', v_attempt, 'score', v_score, 'total', v_total, 'pct', v_pct,
    'review', coalesce((
      select jsonb_agg(jsonb_build_object(
        'q', q.id, 'kind', q.kind, 'body', q.body,
        'chosen', ans.option_id, 'correct', qk.correct_id,
        'given',  ans.meta -> 'given',
        'accept', case when q.kind = 'gap' then qk.accept -> 'slots' end,
        'is_correct', ans.is_correct,
        -- 🔒 62: لا dx ولا dx_name ولا remedy — لغةُ المعلّم لا تُرسَل
        'note', d.student_note,
        'explanation', qk.explanation, 'model', qk.model_answer,
        'essay', case when q.kind = 'gap' then null else ans.essay_text end,
        'correct_ids', qk.correct_ids,
        'judgments', case when q.kind = 'msq' then coalesce((
            select jsonb_agg(jsonb_build_object(
                     'o',       o.id,
                     'key',     o.id = any (qk.correct_ids),
                     'picked',  coalesce(ans.meta -> 'picked', '[]'::jsonb)
                                  @> to_jsonb(o.id),
                     -- النصّ لخيارٍ نقره الطالب وكان خطأً — فلا يُستدلّ
                     -- على المفتاح من وجوده أو غيابه
                     'note',    case when coalesce(ans.meta -> 'picked', '[]'::jsonb)
                                              @> to_jsonb(o.id)
                                      and not (o.id = any (qk.correct_ids))
                                     then d2.student_note end)
                   order by o.position)
              from options o
              left join dx_codes d2 on d2.code = qk.dx_map ->> o.id::text
             where o.question_id = q.id), '[]'::jsonb) end,
        'remedial', (select jsonb_build_object('title', it.title, 'kind', it.kind, 'url', it.url)
                     from objectives ob join items it on it.id = ob.remedial_item_id
                     where ob.id = q.objective_id)
      ) order by q.position)
      from answers ans
      join questions q on q.id = ans.question_id
      left join question_keys qk on qk.question_id = q.id
      left join dx_codes d on d.code = ans.dx_code
      where ans.attempt_id = v_attempt), '[]'::jsonb),
    'lesson_done', case when v_lesson is null then false else lesson_done(v_lesson) end,
    'unlocked', coalesce((
      select jsonb_agg(u.title) from lessons u
      where u.requires_id = v_lesson and lesson_done(v_lesson)), '[]'::jsonb)
  ) into v_res;

  return v_res;
end $function$
;

CREATE OR REPLACE FUNCTION public.teaches(p_student uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select is_admin() or exists (
    select 1 from mentorships m
    where m.student_id = p_student
      and m.teacher_id = auth.uid()
      and m.active
  ) or exists (
    select 1 from enrollments e
    join classes c on c.id = e.class_id
    where e.student_id = p_student and c.teacher_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.tool_readiness(p_tool text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb := '[]'::jsonb; r record; n int;
begin
  if not exists (select 1 from quizzes where tool = p_tool) then
    return jsonb_build_object('ok', false, 'error', 'أداةٌ غير موجودة');
  end if;

  -- ① محطّةٌ بلا مسارٍ يغادرها — إلا الإنتاجية فلا توجيه لها
  for r in select q.id, q.title from quizzes q
            where q.tool = p_tool and q.station_kind <> 'productive'
              and not exists (select 1 from placement_routes x where x.from_quiz = q.id)
  loop
    v := v || to_jsonb('محطّة «' || r.title || '» بلا مسارٍ يغادرها');
  end loop;

  -- ② فجوةٌ أو تداخلٌ في المدى — من أصاب هذه الدرجة؟
  for r in
    select q.id, q.title,
           (select count(*) from placement_routes a, placement_routes b
             where a.from_quiz = q.id and b.from_quiz = q.id and a.id < b.id
               and a.max_raw >= b.min_raw and b.max_raw >= a.min_raw) as overlap,
           (select count(*) from generate_series(0, q.question_count) g
             where not exists (select 1 from placement_routes x
                                where x.from_quiz = q.id
                                  and g between x.min_raw and x.max_raw)) as gap
      from quizzes q where q.tool = p_tool and q.station_kind <> 'productive'
  loop
    if r.overlap > 0 then
      v := v || to_jsonb('«' || r.title || '»: مدَيان متداخلان — أيّهما يُطبَّق؟');
    end if;
    if r.gap > 0 then
      v := v || to_jsonb('«' || r.title || '»: ' || r.gap || ' درجةً بلا مسار');
    end if;
  end loop;

  -- ③ محطّةُ حدٍّ تُحيل ولا تحسم — تناقضٌ في دورها
  select count(*) into n from placement_routes x
    join quizzes q on q.id = x.from_quiz
   where q.tool = p_tool and q.station_kind = 'boundary' and x.verdict = 'next';
  if n > 0 then
    v := v || to_jsonb(n || ' مسارٍ يغادر محطّة حدٍّ إلى محطّةٍ أخرى — الحدّ يحسم ولا يُحيل');
  end if;

  -- ④ محطّةُ توجيهٍ تُخرج مستوًى — والتوجيه يوجّه ولا يُسكّن
  select count(*) into n from placement_routes x
    join quizzes q on q.id = x.from_quiz
   where q.tool = p_tool and q.station_kind = 'routing' and x.verdict = 'done';
  if n > 0 then
    v := v || to_jsonb(n || ' مسارٍ يُخرج مستوًى من محطّة التوجيه — وهي توجّه ولا تُسكّن');
  end if;

  -- ⑤ مدخلٌ واحد لا أكثر
  select count(*) into n from quizzes
   where tool = p_tool and station_kind = 'routing';
  if n <> 1 then
    v := v || to_jsonb('يلزم محطّةُ توجيهٍ واحدة — الموجود ' || n);
  end if;

  -- ⑥ محطّةٌ لا يبلغها أحد
  for r in select q.id, q.title from quizzes q
            where q.tool = p_tool and q.station_kind not in ('routing','productive')
              and not exists (select 1 from placement_routes x where x.to_quiz = q.id)
  loop
    v := v || to_jsonb('«' || r.title || '» لا يبلغها مسار');
  end loop;

  return jsonb_build_object(
    'ok', jsonb_array_length(v) = 0,
    'tool', p_tool,
    'stations', (select count(*) from quizzes where tool = p_tool),
    'routes',   (select count(*) from placement_routes x
                  join quizzes q on q.id = x.from_quiz where q.tool = p_tool),
    'issues', v);
end $function$
;

CREATE OR REPLACE FUNCTION public.tool_routes(p_tool text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select jsonb_build_object(
    'tool', p_tool,
    'readiness', tool_readiness(p_tool),
    'levels', coalesce((
      select jsonb_agg(jsonb_build_object('id', l.id, 'name', l.name, 'rank', l.rank)
             order by l.rank)
        from levels l
       where l.scale_id = (select max(s.scale_id) from quizzes q
                            join subjects s on s.id = q.subject_id
                           where q.tool = p_tool)), '[]'::jsonb),
    'stations', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'station', q.station, 'kind', q.station_kind,
        'title', q.title, 'n', q.question_count, 'published', q.published,
        'routes', coalesce((
          select jsonb_agg(jsonb_build_object(
            'id', x.id, 'min', x.min_raw, 'max', x.max_raw,
            'verdict', x.verdict, 'to_quiz', x.to_quiz,
            'to_title', (select t.title from quizzes t where t.id = x.to_quiz),
            'level_id', x.level_id,
            'level', (select l.name from levels l where l.id = x.level_id),
            'note', x.note) order by x.min_raw)
          from placement_routes x where x.from_quiz = q.id), '[]'::jsonb))
        order by coalesce(q.station, 999))
      from quizzes q where q.tool = p_tool and can_curate(q.subject_id)), '[]'::jsonb));
$function$
;

CREATE OR REPLACE FUNCTION public.track_item(p_item bigint, p_status text, p_seconds integer DEFAULT 0)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_ok boolean;
begin
  if auth.uid() is null then return false; end if;

  -- 🛡️ الحراسة الجديدة: قفل الدرس + محور الرؤية
  select (is_teacher() or can_access_lesson(i.lesson_id))
         and can_see_item(i.created_by, i.visibility, i.reviewed_at, i.id)
    into v_ok
    from items i where i.id = p_item;

  if v_ok is not true then return false; end if;

  -- ▼ الجسم الأصلي — بلا تغيير
  insert into item_progress (user_id, item_id, status, seconds_spent, completed_at)
  values (auth.uid(), p_item, coalesce(p_status,'opened'), coalesce(p_seconds,0),
          case when p_status = 'completed' then now() end)
  on conflict (user_id, item_id) do update
    set status        = case when item_progress.status = 'completed'
                             then 'completed' else excluded.status end,
        seconds_spent = item_progress.seconds_spent + excluded.seconds_spent,
        completed_at  = coalesce(item_progress.completed_at, excluded.completed_at);
  return true;
end $function$
;

CREATE OR REPLACE FUNCTION public.variant_report(p_quiz bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v jsonb;
begin
  if not can_edit_quiz(p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار');
  end if;

  with fp as (
    select q.id, q.variant_key, q.position, q.kind, q.difficulty,
           q.section, q.passage_id, left(q.body, 70) as body,
           coalesce((select array_agg(distinct e.value order by e.value)
                       from question_keys k, jsonb_each_text(k.dx_map) e
                      where k.question_id = q.id), '{}'::text[]) as dx
      from questions q
     where q.quiz_id = p_quiz and q.retired_at is null   -- ◀ حارسٌ واحد يكفي
  ),
  g as (
    select variant_key,
           count(*)                                  as size,
           count(distinct dx::text) = 1              as equal_dx,
           count(distinct difficulty) = 1            as equal_difficulty,
           count(distinct coalesce(section, '')) = 1 as equal_section,
           count(passage_id)                         as with_pg,
           count(distinct passage_id)                as n_pg,
           jsonb_agg(jsonb_build_object(
             'id', id, 'pos', position, 'body', body, 'dx', dx, 'pg', passage_id)
             order by position)                      as qs
      from fp
     where variant_key is not null
     group by variant_key
  )
  select jsonb_build_object(
    'ok',       true,
    'total',    (select count(*) from fp),
    'unpaired', (select count(*) from fp where variant_key is null),

    'groups', coalesce((
      select jsonb_agg(jsonb_build_object(
        'key',              variant_key,
        'size',             size,
        'lone',             size < 2,
        'equal_dx',         equal_dx,
        'equal_difficulty', equal_difficulty,
        'equal_section',    equal_section,
        -- حكمٌ ثلاثيّ لا نعم/لا: للنصّ ثلاث حالات صحيحة المعنى
        'passage', case
          when with_pg = 0     then 'لا نصّ'
          when with_pg <> size then '❌ بعضها معلّق بنصّ وبعضها لا'
          when n_pg = size     then '✅ نصوص مختلفة'
          when n_pg = 1        then '⚠️ نفس النصّ — يُقرأ مرتين'
          else                      '⚠️ نصوص متكرّرة جزئياً' end,
        'questions', qs) order by variant_key)
      from g), '[]'::jsonb),

    -- أيّ خانات يخدمها كل نصّ. الملفّ 35 يسحب النصّ كتلةً:
    -- ينتقي نصّاً واحداً فيأخذ أسئلته الستة معاً، ولا يجمّع
    -- سؤالاً من نصّ وسؤالاً من آخر فيُقرأ ستة نصوص لستة أسئلة.
    'passage_map', coalesce((
      select jsonb_object_agg(pid::text, to_jsonb(keys))
        from (select passage_id as pid,
                     array_agg(distinct variant_key order by variant_key) as keys
                from fp
               where passage_id is not null and variant_key is not null
               group by passage_id) m), '{}'::jsonb)
  ) into v;

  return v;
end $function$
;

CREATE OR REPLACE FUNCTION public.was_my_mentor(p_teacher uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select p_teacher is not null and exists (
    select 1 from mentorships
     where student_id = auth.uid() and teacher_id = p_teacher   -- تشمل المنتهية
  );
$function$
;

-- ⬆️⬆️⬆️  نهاية اللصق  ⬆️⬆️⬆️


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤  العروض
-- ═══════════════════════════════════════════════════════════════════════
-- ⬇️⬇️⬇️  الصق هنا مخرَج «العروض» (v_student_profile · v_trap_analysis)  ⬇️⬇️⬇️

create or replace view public.v_student_profile as
 SELECT p.id,
    p.full_name,
    p.klass,
    count(*) AS answered,
    count(*) FILTER (WHERE a.is_correct) AS correct,
    round(count(*) FILTER (WHERE a.is_correct)::numeric / NULLIF(count(*), 0)::numeric * 100::numeric) AS pct,
    mode() WITHIN GROUP (ORDER BY a.dx_code) FILTER (WHERE a.dx_code IS NOT NULL) AS top_dx,
    round(avg(a.seconds)) AS avg_sec,
    sum(a.changes) AS total_changes
   FROM answers a
     JOIN attempts t ON t.id = a.attempt_id
     JOIN profiles p ON p.id = t.user_id
  WHERE a.option_id IS NOT NULL
  GROUP BY p.id, p.full_name, p.klass;

create or replace view public.v_trap_analysis as
 SELECT q.quiz_id,
    z.title AS quiz,
    q."position" AS qno,
    q.body AS question,
    count(*) AS attempts,
    count(*) FILTER (WHERE a.is_correct) AS correct,
    round(count(*) FILTER (WHERE a.is_correct)::numeric / count(*)::numeric * 100::numeric) AS pct,
    mode() WITHIN GROUP (ORDER BY a.dx_code) FILTER (WHERE a.dx_code IS NOT NULL) AS top_dx,
    round(avg(a.seconds)) AS avg_sec
   FROM answers a
     JOIN questions q ON q.id = a.question_id
     JOIN quizzes z ON z.id = q.quiz_id
  WHERE q.kind = 'mcq'::text
  GROUP BY q.quiz_id, z.title, q."position", q.body;

-- ⬆️⬆️⬆️  نهاية اللصق  ⬆️⬆️⬆️

-- 🔴 لا يُخرجها pg_get_viewdef — وبدونها يتجاوز العرضُ RLS
--    فيقرأ أيُّ طالبٍ مسجَّل أداءَ كلّ زملائه.
--    ⚠️ افحص reloptions في القاعدة الحيّة قبل الاعتماد عليها.
alter view public.v_student_profile set (security_invoker = on);
alter view public.v_trap_analysis   set (security_invoker = on);


-- ═══════════════════════════════════════════════════════════════════════
-- ⑥  الزنادات — ثلاثة لك · وستّة تُنشئها Supabase وحُذفت
-- ═══════════════════════════════════════════════════════════════════════

-- حارسٌ مؤجَّل: يُفحص عند إغلاق المعاملة لا عند update،
-- فتستطيع publish_quiz أن تكتب published ثم تُكمل، والحكم على الحالة النهائية.
CREATE CONSTRAINT TRIGGER quizzes_publish_guard
  AFTER INSERT OR UPDATE ON public.quizzes
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW WHEN (new.published)
  EXECUTE FUNCTION quiz_publish_guard();

-- يُقفل RLS على كلّ جدولٍ جديد في public تلقائياً
create event trigger ensure_rls on ddl_command_end
  execute function public.rls_auto_enable();

-- ⚠️ على سكيما auth — قد يحتاج تشغيلاً من لوحة Supabase
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ═══════════════════════════════════════════════════════════════════════
-- ⑦  تفعيل RLS والسياسات — 34 تفعيلاً ·49 سياسة
-- ═══════════════════════════════════════════════════════════════════════
-- ⬇️⬇️⬇️  الصق هنا مخرَج «تفعيل RLS والسياسات»  ⬇️⬇️⬇️
alter table public.answers enable row level security;
alter table public.attempts enable row level security;
alter table public.classes enable row level security;
alter table public.courses enable row level security;
alter table public.curators enable row level security;
alter table public.dx_codes enable row level security;
alter table public.enrollments enable row level security;
alter table public.item_kinds enable row level security;
alter table public.item_progress enable row level security;
alter table public.items enable row level security;
alter table public.lessons enable row level security;
alter table public.levels enable row level security;
alter table public.mentorships enable row level security;
alter table public.messages enable row level security;
alter table public.objectives enable row level security;
alter table public.options enable row level security;
alter table public.passage_history enable row level security;
alter table public.passages enable row level security;
alter table public.paths enable row level security;
alter table public.placement_routes enable row level security;
alter table public.placement_sessions enable row level security;
alter table public.profiles enable row level security;
alter table public.question_keys enable row level security;
alter table public.question_reports enable row level security;
alter table public.questions enable row level security;
alter table public.quizzes enable row level security;
alter table public.review_queue enable row level security;
alter table public.scales enable row level security;
alter table public.student_courses enable row level security;
alter table public.student_levels enable row level security;
alter table public.subjects enable row level security;
alter table public.teacher_requests enable row level security;
alter table public.teacher_subjects enable row level security;
alter table public.units enable row level security;
create policy p_answers_read on public.answers for SELECT to public using ((EXISTS ( SELECT 1
   FROM attempts a
  WHERE ((a.id = answers.attempt_id) AND ((a.user_id = auth.uid()) OR teaches(a.user_id))))));
create policy p_attempts_grade on public.attempts for UPDATE to public using (teaches(user_id));
create policy p_attempts_read on public.attempts for SELECT to public using (((user_id = auth.uid()) OR teaches(user_id)));
create policy p_classes_read on public.classes for SELECT to public using (((teacher_id = auth.uid()) OR is_admin() OR (EXISTS ( SELECT 1
   FROM enrollments e
  WHERE ((e.class_id = classes.id) AND (e.student_id = auth.uid()))))));
create policy p_classes_write on public.classes for ALL to public using (((teacher_id = auth.uid()) OR is_admin())) with check (((teacher_id = auth.uid()) OR is_admin()));
create policy p_courses_read on public.courses for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_curators_read on public.curators for SELECT to public using (((user_id = auth.uid()) OR is_admin()));
create policy p_dx_read on public.dx_codes for SELECT to public using (is_teacher());
create policy p_enroll_join on public.enrollments for INSERT to public with check ((student_id = auth.uid()));
create policy p_enroll_read on public.enrollments for SELECT to public using (((student_id = auth.uid()) OR is_admin() OR (EXISTS ( SELECT 1
   FROM classes c
  WHERE ((c.id = enrollments.class_id) AND (c.teacher_id = auth.uid()))))));
create policy p_iprog_read on public.item_progress for SELECT to public using (((user_id = auth.uid()) OR teaches(user_id)));
create policy p_iprog_write on public.item_progress for ALL to public using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
create policy p_items_read on public.items for SELECT to public using (((auth.uid() IS NOT NULL) AND (is_teacher() OR can_access_lesson(lesson_id)) AND can_see_item(created_by, visibility, reviewed_at, id)));
create policy p_keys_teacher on public.question_keys for SELECT to public using (is_teacher());
create policy p_kinds_read on public.item_kinds for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_lessons_read on public.lessons for SELECT to public using (((auth.uid() IS NOT NULL) AND (is_teacher() OR (published AND (archived_at IS NULL)))));
create policy p_levels_read on public.levels for SELECT to public using (true);
create policy p_ment_read on public.mentorships for SELECT to public using (((student_id = auth.uid()) OR (teacher_id = auth.uid()) OR is_admin()));
create policy p_msg_mark on public.messages for UPDATE to public using (((student_id = auth.uid()) OR is_teacher()));
create policy p_msg_read on public.messages for SELECT to public using (((student_id = auth.uid()) OR teaches(student_id)));
create policy p_msg_send on public.messages for INSERT to public with check (((sender_id = auth.uid()) AND (((sender_role = 'student'::text) AND (student_id = auth.uid())) OR ((sender_role = 'teacher'::text) AND is_teacher()))));
create policy p_objectives_read on public.objectives for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_options_read on public.options for SELECT to public using (((auth.uid() IS NOT NULL) AND (is_teacher() OR (EXISTS ( SELECT 1
   FROM questions q
  WHERE ((q.id = options.question_id) AND can_access(q.quiz_id)))))));
create policy p_passages_read on public.passages for SELECT to public using (((auth.uid() IS NOT NULL) AND (is_teacher() OR can_access(quiz_id))));
create policy p_paths_read on public.paths for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_profiles_edit on public.profiles for UPDATE to public using ((id = auth.uid()));
create policy p_profiles_self on public.profiles for SELECT to public using (((id = auth.uid()) OR is_admin() OR teaches(id) OR ((role = ANY (ARRAY['teacher'::text, 'admin'::text])) AND (auth.uid() IS NOT NULL))));
create policy p_questions_read on public.questions for SELECT to public using (((auth.uid() IS NOT NULL) AND (is_teacher() OR can_access(quiz_id))));
create policy p_quizzes_read on public.quizzes for SELECT to public using (((auth.uid() IS NOT NULL) AND (published OR is_teacher())));
create policy p_reports_read on public.question_reports for SELECT to public using (((user_id = auth.uid()) OR is_teacher()));
create policy p_reports_write on public.question_reports for INSERT to public with check ((user_id = auth.uid()));
create policy p_review_all on public.review_queue for ALL to public using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
create policy p_routes_read on public.placement_routes for SELECT to public using (is_teacher());
create policy p_scales_read on public.scales for SELECT to public using (true);
create policy p_scourses_all on public.student_courses for ALL to public using (((user_id = auth.uid()) OR teaches(user_id))) with check ((user_id = auth.uid()));
create policy p_sessions_read on public.placement_sessions for SELECT to public using (((user_id = auth.uid()) OR is_teacher()));
create policy p_slevels_read on public.student_levels for SELECT to public using (((user_id = auth.uid()) OR teaches(user_id)));
create policy p_subjects_read on public.subjects for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_treq_insert on public.teacher_requests for INSERT to public with check ((user_id = auth.uid()));
create policy p_treq_read on public.teacher_requests for SELECT to public using (((user_id = auth.uid()) OR is_admin()));
create policy p_treq_update on public.teacher_requests for UPDATE to public using (is_admin());
create policy p_tsubj_read on public.teacher_subjects for SELECT to public using ((auth.uid() IS NOT NULL));
create policy p_tsubj_write on public.teacher_subjects for ALL to public using (((teacher_id = auth.uid()) OR is_admin())) with check (((teacher_id = auth.uid()) OR is_admin()));
create policy p_units_read on public.units for SELECT to public using ((auth.uid() IS NOT NULL));
create policy passage_history_read on public.passage_history for SELECT to public using (can_edit_quiz(( SELECT p.quiz_id
   FROM passages p
  WHERE (p.id = passage_history.passage_id))));
-- ⬆️⬆️⬆️  نهاية اللصق  ⬆️⬆️⬆️


-- ═══════════════════════════════════════════════════════════════════════
-- ⑧  الصلاحيات — مُحكَمة عمداً
--
-- 🔑 هذا القسم لا يُنقل كما استُخرج. الافتراضيّ من Supabase يمنح
--    anon و authenticated صلاحيةً كاملة على public، ويجعل RLS
--    الحارسَ الوحيد. وسياسةٌ متساهلة واحدة تصير حينها ثغرةً كاملة —
--    كما وقع في p_profiles_edit: UPDATE على الصفّ كلّه، وفي الصفّ role.
--
-- المبدأ: الصلاحية بالعمود · والسياسة بالصفّ · والمعنى بالدالّة.
--         الكتابة كلُّها تمرّ بدوالّ security definer، وهي لا تتأثّر
--         بما يُسحب من authenticated.
--
-- ⚠️ هذا القسم يتقدّم على القاعدة الحيّة: الرقعتان ٥٠ و٥١ أحكمتا
--    profiles و student_levels و messages فقط. الباقي ما يزال
--    على الافتراضيّ. طبِّق sql/58 لتتطابقا.
-- ═══════════════════════════════════════════════════════════════════════

grant usage on schema public to anon, authenticated;

-- لا كتابة إلا بدالّة
revoke all on all tables in schema public from anon, authenticated;

-- القراءة
grant select on all tables in schema public to authenticated;

-- 🔑 البوّابة تقرأ المناهج قبل الدخول (auth.js) — ولهذا p_scales_read
--    و p_levels_read بشرط true لا auth.uid() is not null.
grant select on public.scales, public.levels to anon;

-- المواضع الخمسة الوحيدة التي تكتب فيها الواجهة مباشرة (api.js)
grant insert on public.messages to authenticated;
grant update (read_by_student, read_by_teacher)
  on public.messages to authenticated;
grant update (read_by_student, essay_score, teacher_comment, graded_at, graded_by)
  on public.attempts to authenticated;

-- ⚠️ دَينٌ موثَّق: منح الأعمدة لا يعرف من الفاعل. الطالب يملك
--    عمود read_by_student على attempts، والمعلّم يملك أعمدة التصحيح —
--    والفصل بينهما تفرضه RLS بالصفّ لا الصلاحية بالعمود.
--    الإصلاح التامّ: نقل الموضعين إلى دالّتَي security definer
--    (mark_feedback_read · save_grade) ثم سحب UPDATE على attempts كلّياً.


-- ═══════════════════════════════════════════════════════════════════════
-- ⑨  البيانات المرجعية
--
-- 🔑 ليست اختيارية. save_item تردّ «نمط غير معروف» بلا item_kinds،
--    و save_question ترفض كلّ بندٍ بلا dx_codes. هذه منطقٌ سكن في جدول.
--
-- ⚠️ الترتيب اعتمادٌ لا ذوق:
--    scales → levels · paths → subjects → courses
-- ═══════════════════════════════════════════════════════════════════════

insert into public.dx_codes (code, name, remedy, family) values
  ('PRC', 'إدارة الاختبار وصيغة الإجابة', 'اقرأ التعليمة والحدّ · انظر ما قبل الفراغ وما بعده · انقل بعد كل قسم · ولا تترك فراغاً أبداً', 'exam'),
  ('SCN', 'مسح سريع فاته التفصيل', 'حدّد الكلمة المفتاحية في السؤال ثم ابحث عنها في النص', 'exam'),
  ('AB', 'الانخداع بلفظ قاطع', 'الخيار الذي يحوي «بالضرورة/إطلاقاً/دائماً/فقط» خاطئ غالباً', 'general'),
  ('FE', 'معلومة خاطئة محفوظة', 'مراجعة معرفية مباشرة للمعلومة من الكتاب المدرسي', 'general'),
  ('HLF', 'نصفه صحيح فقط', 'الخيار صحيحٌ في جزءٍ وخاطئٌ في آخر. في البنود ذات الفراغين افحص الأصعب أولاً', 'general'),
  ('IR', 'قلب اتجاه العلاقة', 'ارسم السهم قبل الإجابة: كلما زاد س … قلّ/زاد ص', 'general'),
  ('KW', 'تجاهل كلمة مفتاحية', 'ضع خطاً تحت الكلمات الحاكمة: تصاعدياً · على الترتيب · لا/ليس', 'general'),
  ('LG', 'استنتاج غير منطقي', 'اسأل: هل يناقض نفسه أو يخالف بديهية علمية؟', 'general'),
  ('OG', 'تعميم زائد من معطيات ناقصة', 'فرّق بين «ممكن» و«لازم»', 'general'),
  ('SC', 'خلط بين مستويين', 'وضّح الحدود: داخل الجزيء ↔ بين الجزيئات · جزئي ↔ أيوني · كتلة ↔ عدد ذرات', 'general'),
  ('SU', 'اعتماد نمط سطحي', 'اختبر النمط بمثال مضاد قبل تعميمه', 'general'),
  ('TC', 'خلط بين مصطلحين متشابهين', 'اصنع جدول مقارنة ثنائي للمصطلحين محل الخلط', 'general'),
  ('FNC', 'وظيفة تواصلية خاطئة', 'اقرأ المطلوب: اعتراض؟ موافقة؟ اعتذار؟ — ثم تحقّق أن ردّك يؤدّيها', 'language'),
  ('GRA', 'الدقّة الصرفية والنحوية', 'الزمن والمطابقة والمبنيّ للمجهول. وجملةٌ مركّبة واحدة صحيحة خيرٌ من ثلاثٍ مكسورة', 'language'),
  ('LEX', 'الدقّة المعجمية', 'دفتر تلازمات لا قوائم مفردات. rests on لا rests in · وpay for itself تغطية التكلفة لا الربح', 'language'),
  ('REG', 'سجل غير مناسب', 'الاعتراض المهذّب: اعتراف + لكن + سبب — بلا حكم على شخص المحاور', 'language'),
  ('SLT', 'مكوّن صحيح في الموضع الخطأ', 'Hook في المقدمة · Topic Sentence أول فقرة الجسم · In conclusion في الخاتمة', 'language'),
  ('STC', 'الصنف والنمط التركيبيّ', 'اسأل ما الذي يطلبه الرابط: اسماً أم جملة؟ given / given that · despite / although · denied signing لا denied to sign', 'language'),
  ('RTR', 'المعلومة المُستبعَدة', 'القيمة الأخيرة لا الأولى. أنصت لألفاظ الإصلاح: sorry · actually · I mean · that''s difficult', 'listening'),
  ('DEV', 'التطوير والدعم', 'سلسلةٌ ثابتة: دعوى ← تفسير ← مثال ← ربط. وفي الجزء الثالث: انقل السؤال من «أنا» إلى «الناس عموماً»', 'production'),
  ('PRO', 'النطق والوضوح', 'نبر المفردات الأكاديمية المتكرّرة — بضع عشراتٍ فقط. سجّل صوتك وقارنه بنطق القاموس', 'production'),
  ('TA1', 'الانتقاء والنظرة العامة', 'لا تُسلَّم مهمّةٌ أولى بلا Overview. اختر ثلاث سماتٍ فقط ثم قارن بينها', 'production'),
  ('TPL', 'القوالب والمحفوظ', 'أعد صياغة السؤال بكلماتك إلزاماً. والربط بالإحالة والترتيب المنطقيّ لا بالوسوم الجاهزة', 'production'),
  ('TSK', 'المهمّة والموقف', 'فكّك السؤال إلى مطالب مرقّمة قبل الكتابة، واكتب جملة موقفٍ صريحة في المقدمة تُراجَع في الخاتمة', 'production'),
  ('ATT', 'الموقف والإسناد', 'سؤالان قبل كل إجابة: لمن هذا الكلام؟ وما اتجاهه — مع أم ضدّ أم محايد؟', 'reading'),
  ('CNC', 'التنازل', 'الرأي بعد but / yet / however لا قبله. والجزء المتنازَل عنه ليس رأي الكاتب', 'reading'),
  ('COH', 'الإحالة والتتبّع', 'ضع خطاً تحت كل ضمير واكتب مرجعه. والجواب قد يكون موزّعاً على موضعين', 'reading'),
  ('DTL', 'تفصيل صحيح لكنه لا يجيب السؤال', 'تحقّق أن الخيار يجيب ما سُئل عنه تحديداً', 'reading'),
  ('HDG', 'تحوير الدعوى', 'معجم التحوّط والتسوير: may · tend to · rarely · most · not currently — تُضعف الدعوى ولا تعكسها. وفي الكتابة: قيّد ولا تُطلق', 'reading'),
  ('INF', 'استنتاج غير مدعوم بالنص', 'ارجع للنص وحدّد السطر الذي يدعم إجابتك قبل اختيارها', 'reading'),
  ('NG', 'قاعدة الدليل', 'ضع إصبعك على السطر الذي يُثبت أو ينفي. لا سطر ⇐ NOT GIVEN · سطرٌ بصياغةٍ مختلفة ⇐ احكم', 'reading'),
  ('OPP', 'اختيار المتضاد أو عكس الوظيفة', 'ضع الخيار مكان الكلمة في الجملة الأصلية واقرأها كاملة قبل الحكم', 'reading'),
  ('PAR', 'خلط بين إعادة الصياغة والنص الأصلي', 'قارن المعنى لا الكلمات. اسأل قبل الحسم: هل هذا يجيب عن السؤال، أم يشبه النصّ فقط؟', 'reading')
on conflict (code) do nothing;

insert into public.item_kinds (code, label_ar, icon, needs, sort_order, active) values
  ('pdf', 'ملف للقراءة', '📄', 'url', 10, 't'),
  ('video', 'شرح مرئي', '🎬', 'url', 20, 't'),
  ('audio', 'مقطع صوتي', '🎧', 'url', 30, 't'),
  ('image', 'صورة', '🖼️', 'url', 40, 't'),
  ('link', 'مرجع خارجي', '🔗', 'url', 50, 't'),
  ('text', 'نصّ', '📃', 'body', 60, 't'),
  ('quiz', 'اختبار تشخيصي', '📝', 'quiz', 70, 't'),
  ('recording', 'تسجيل صوتي', '🎤', 'none', 80, 'f'),
  ('mindmap', 'خريطة ذهنية', '🧠', 'url', 90, 't'),
  ('infographic', 'إنفوجرافيك', '📊', 'url', 100, 't'),
  ('slides', 'شرائح عرض', '🖥️', 'url', 110, 't'),
  ('worksheet', 'ورقة عمل', '📋', 'url', 120, 't'),
  ('simulation', 'محاكاة تفاعلية', '⚗️', 'url', 130, 't')
on conflict (code) do nothing;

insert into public.scales (id, code, name, kind, sort_order, country, track) values
  (1, 'eg_sec', 'البكالوريا المصرية', 'academic', 1, 'مصر', 'البكالوريا'),
  (3, 'cefr', 'الإطار الأوروبي المرجعي — CEFR', 'proficiency', 50, NULL, NULL),
  (4, 'sa_sec', 'الثانوية العامة السعودية', 'academic', 2, 'السعودية', 'الثانوية العامة'),
  (5, 'univ', 'جامعي', 'academic', 3, NULL, NULL),
  (6, 'other', 'أخرى', 'academic', 4, NULL, NULL),
  (7, 'ielts', 'نطاقات IELTS', 'proficiency', 51, NULL, NULL)
on conflict (id) do nothing;

insert into public.levels (id, scale_id, code, name, rank, min_score, max_score) values
  (1, 1, 'sec1', 'الصف الأول الثانوي', 10, null, null),
  (2, 1, 'sec2', 'الصف الثاني الثانوي', 11, null, null),
  (3, 1, 'sec3', 'الصف الثالث الثانوي', 12, null, null),
  (7, 3, 'A1', 'مبتدئ — A1', 1, 0, 25),
  (8, 3, 'A2', 'أساسي — A2', 2, 26, 42),
  (9, 3, 'B1', 'متوسط — B1', 3, 43, 60),
  (10, 3, 'B2', 'فوق المتوسط — B2', 4, 61, 76),
  (11, 3, 'C1', 'متقدّم — C1', 5, 77, 90),
  (12, 3, 'C2', 'إتقان — C2', 6, 91, 100),
  (13, 4, 'sa1', 'الصف الأول الثانوي', 10, null, null),
  (14, 4, 'sa2', 'الصف الثاني الثانوي', 11, null, null),
  (15, 4, 'sa3', 'الصف الثالث الثانوي', 12, null, null),
  (16, 7, 'b40', 'نطاق 4.0 — أساسي', 1, 0, 30),
  (17, 7, 'b50', 'نطاق 5.0 — متوسط أدنى', 2, 31, 45),
  (18, 7, 'b55', 'نطاق 5.5 — متوسط', 3, 46, 58),
  (19, 7, 'b60', 'نطاق 6.0 — جيد', 4, 59, 70),
  (20, 7, 'b65', 'نطاق 6.5 — جيد جداً', 5, 71, 83),
  (21, 7, 'b70', 'نطاق 7.0 فأعلى — متقدّم', 6, 84, 100)
on conflict (id) do nothing;

-- -- ⚠️ مسارات التسكين (placement_routes · ٢٩ صفّاً) ليست هنا: تشير إلى
--    quizzes 11–18 وهي محتوًى لا يُبذَر. موضعها sql/66 القسم ⑤،
--    ويُشغَّل بعد استعادة محتوى الأداة.

insert into public.paths (id, scale_id, code, name, from_rank, sort_order, active) values
  (1, 1, 'med', 'الطب وعلوم الحياة', 11, 1, 't'),
  (2, 1, 'eng', 'الهندسة وعلوم الحاسب', 11, 2, 't'),
  (3, 1, 'biz', 'الأعمال', 11, 3, 't'),
  (4, 1, 'arts', 'الآداب والفنون', 11, 4, 't')
on conflict (id) do nothing;

insert into public.subjects (id, code, name, sort_order, active, scale_id, family, placement, progression, description, icon) values
  (1, 'sci1', 'العلوم المتكاملة', 1, 't', 1, 'science', 'profile', 'chain', NULL, '🔬'),
  (2, 'eg_ara', 'اللغة العربية', 2, 't', 1, 'arabic', 'profile', 'chain', NULL, '📖'),
  (3, 'eg_eng', 'English', 3, 't', 1, 'english', 'profile', 'chain', NULL, '🔤'),
  (4, 'eg_math', 'الرياضيات', 4, 't', 1, 'math', 'profile', 'chain', NULL, '📐'),
  (5, 'eg_hist', 'التاريخ', 5, 't', 1, 'history', 'profile', 'chain', NULL, '🏛️'),
  (6, 'eg_phil', 'الفلسفة والمنطق', 6, 't', 1, 'philosophy', 'profile', 'chain', NULL, '🧠'),
  (7, 'sk_read', 'Reading Comprehension', 10, 't', 3, 'reading', 'test', 'level', 'تدريبات فهم المقروء بالإنجليزية — متدرّجة حسب مستواك في الإطار الأوروبي المرجعي', '📚'),
  (8, 'sk_ielts', 'IELTS', 11, 't', 7, 'ielts', 'test', 'level', 'تحضير لاختبار IELTS — تدريبات مرتّبة حسب النطاق المستهدف', '🎓'),
  (9, 'sk_study', 'كيف أذاكر؟', 12, 't', null, 'study', 'open', 'free', 'مهارات الاستذكار وتنظيم الوقت والاستعداد للاختبارات — لكل طالب مهما كان صفّه', '🧭'),
  (32, 'eg_phys', 'الفيزياء', 20, 't', 1, 'science', 'profile', 'chain', NULL, '🧲'),
  (33, 'eg_chem', 'الكيمياء', 21, 't', 1, 'science', 'profile', 'chain', NULL, '⚗️'),
  (34, 'eg_bio', 'الأحياء', 22, 't', 1, 'science', 'profile', 'chain', NULL, '🧬'),
  (35, 'eg_prog', 'البرمجة', 23, 't', 1, 'tech', 'profile', 'chain', NULL, '💻'),
  (36, 'eg_acc', 'المحاسبة', 24, 't', 1, 'business', 'profile', 'chain', NULL, '🧾'),
  (37, 'eg_admin', 'إدارة الأعمال', 25, 't', 1, 'business', 'profile', 'chain', NULL, '📈'),
  (38, 'eg_econ', 'الاقتصاد', 26, 't', 1, 'business', 'profile', 'chain', NULL, '💹'),
  (39, 'eg_psy', 'علم النفس', 27, 't', 1, 'humanities', 'profile', 'chain', NULL, '🧠'),
  (40, 'eg_fr', 'French', 28, 't', 1, 'language', 'profile', 'chain', NULL, '🇫🇷'),
  (41, 'eg_stat', 'الإحصاء', 29, 't', 1, 'math', 'profile', 'chain', NULL, '📊'),
  (42, 'eg_geo', 'الجغرافيا', 30, 't', 1, 'humanities', 'profile', 'chain', NULL, '🗺️')
on conflict (id) do nothing;

insert into public.courses (id, subject_id, level_id, path_id, title, elective_group, position, active) values
  (1, 2, 2, null, 'اللغة العربية — الصف الثاني الثانوي', null, 1, 't'),
  (2, 2, 1, null, 'اللغة العربية — الصف الأول الثانوي', null, 1, 't'),
  (3, 3, 2, null, 'English — الصف الثاني الثانوي', null, 2, 't'),
  (4, 3, 1, null, 'English — الصف الأول الثانوي', null, 2, 't'),
  (5, 4, 3, 3, 'الرياضيات — الصف الثالث الثانوي · الأعمال', null, 2, 't'),
  (6, 4, 3, 2, 'الرياضيات — الصف الثالث الثانوي · الهندسة وعلوم الحاسب', null, 1, 't'),
  (7, 4, 2, 1, 'الرياضيات — الصف الثاني الثانوي · الطب وعلوم الحياة', 1, 10, 't'),
  (8, 4, 1, null, 'الرياضيات — الصف الأول الثانوي', null, 3, 't'),
  (9, 5, 2, null, 'التاريخ — الصف الثاني الثانوي', null, 3, 't'),
  (10, 5, 1, null, 'التاريخ — الصف الأول الثانوي', null, 5, 't'),
  (11, 6, 1, null, 'الفلسفة والمنطق — الصف الأول الثانوي', null, 6, 't'),
  (12, 1, 1, null, 'العلوم المتكاملة — الصف الأول الثانوي', null, 4, 't'),
  (13, 32, 3, 2, 'الفيزياء — الصف الثالث الثانوي · الهندسة وعلوم الحاسب', null, 2, 't'),
  (14, 32, 2, 1, 'الفيزياء — الصف الثاني الثانوي · الطب وعلوم الحياة', 1, 11, 't'),
  (15, 33, 3, 1, 'الكيمياء — الصف الثالث الثانوي · الطب وعلوم الحياة', null, 1, 't'),
  (16, 33, 2, 2, 'الكيمياء — الصف الثاني الثانوي · الهندسة وعلوم الحاسب', 1, 10, 't'),
  (17, 34, 3, 1, 'الأحياء — الصف الثالث الثانوي · الطب وعلوم الحياة', null, 2, 't'),
  (18, 35, 2, 2, 'البرمجة — الصف الثاني الثانوي · الهندسة وعلوم الحاسب', 1, 11, 't'),
  (19, 36, 2, 3, 'المحاسبة — الصف الثاني الثانوي · الأعمال', 1, 10, 't'),
  (20, 37, 2, 3, 'إدارة الأعمال — الصف الثاني الثانوي · الأعمال', 1, 11, 't'),
  (21, 38, 3, 3, 'الاقتصاد — الصف الثالث الثانوي · الأعمال', null, 1, 't'),
  (22, 39, 2, 4, 'علم النفس — الصف الثاني الثانوي · الآداب والفنون', 1, 10, 't'),
  (23, 40, 2, 4, 'French — الصف الثاني الثانوي · الآداب والفنون', 1, 11, 't'),
  (24, 41, 3, 4, 'الإحصاء — الصف الثالث الثانوي · الآداب والفنون', null, 1, 't'),
  (25, 42, 3, 4, 'الجغرافيا — الصف الثالث الثانوي · الآداب والفنون', null, 2, 't'),
  (26, 8, null, null, 'IELTS', null, 0, 'f'),
  (27, 9, null, null, 'كيف أذاكر؟', null, 0, 't'),
  (28, 7, null, null, 'Reading Comprehension', null, 0, 'f'),
  (29, 7, 7, null, 'Reading Comprehension — مبتدئ — A1', null, 1, 't'),
  (30, 7, 8, null, 'Reading Comprehension — أساسي — A2', null, 2, 't'),
  (31, 7, 9, null, 'Reading Comprehension — متوسط — B1', null, 3, 't'),
  (32, 7, 10, null, 'Reading Comprehension — فوق المتوسط — B2', null, 4, 't'),
  (33, 7, 11, null, 'Reading Comprehension — متقدّم — C1', null, 5, 't'),
  (34, 7, 12, null, 'Reading Comprehension — إتقان — C2', null, 6, 't'),
  (35, 8, 16, null, 'IELTS — نطاق 4.0 — أساسي', null, 1, 't'),
  (36, 8, 17, null, 'IELTS — نطاق 5.0 — متوسط أدنى', null, 2, 't'),
  (37, 8, 18, null, 'IELTS — نطاق 5.5 — متوسط', null, 3, 't'),
  (38, 8, 19, null, 'IELTS — نطاق 6.0 — جيد', null, 4, 't'),
  (39, 8, 20, null, 'IELTS — نطاق 6.5 — جيد جداً', null, 5, 't'),
  (40, 8, 21, null, 'IELTS — نطاق 7.0 فأعلى — متقدّم', null, 6, 't')
on conflict (id) do nothing;

-- ═══════════════════════════════════════════════════════════════════════
-- ⑩  ضبط العدّادات
--
-- 🔑 بعد البيانات لا قبلها. التسلسلات تُنشأ من ١، والبيانات تحمل
--    معرّفاتها الأصلية ⇒ أوّل إضافةٍ جديدة تطلب معرّفاً مأخوذاً.
-- ═══════════════════════════════════════════════════════════════════════
select setval('public.answers_id_seq', coalesce((select max(id) from answers), 1), true);
select setval('public.attempts_id_seq', coalesce((select max(id) from attempts), 1), true);
select setval('public.classes_id_seq', coalesce((select max(id) from classes), 1), true);
select setval('public.courses_id_seq', coalesce((select max(id) from courses), 1), true);
select setval('public.items_id_seq', coalesce((select max(id) from items), 1), true);
select setval('public.lessons_id_seq', coalesce((select max(id) from lessons), 1), true);
select setval('public.levels_id_seq', coalesce((select max(id) from levels), 1), true);
select setval('public.mentorships_id_seq', coalesce((select max(id) from mentorships), 1), true);
select setval('public.messages_id_seq', coalesce((select max(id) from messages), 1), true);
select setval('public.objectives_id_seq', coalesce((select max(id) from objectives), 1), true);
select setval('public.options_id_seq', coalesce((select max(id) from options), 1), true);
select setval('public.passage_history_id_seq', coalesce((select max(id) from passage_history), 1), true);
select setval('public.passages_id_seq', coalesce((select max(id) from passages), 1), true);
select setval('public.paths_id_seq', coalesce((select max(id) from paths), 1), true);
select setval('public.placement_routes_id_seq', coalesce((select max(id) from placement_routes), 1), true);
select setval('public.placement_sessions_id_seq', coalesce((select max(id) from placement_sessions), 1), true);
select setval('public.question_reports_id_seq', coalesce((select max(id) from question_reports), 1), true);
select setval('public.questions_id_seq', coalesce((select max(id) from questions), 1), true);
select setval('public.quizzes_id_seq', coalesce((select max(id) from quizzes), 1), true);
select setval('public.review_queue_id_seq', coalesce((select max(id) from review_queue), 1), true);
select setval('public.scales_id_seq', coalesce((select max(id) from scales), 1), true);
select setval('public.subjects_id_seq', coalesce((select max(id) from subjects), 1), true);
select setval('public.teacher_requests_id_seq', coalesce((select max(id) from teacher_requests), 1), true);
select setval('public.units_id_seq', coalesce((select max(id) from units), 1), true);


-- ═══════════════════════════════════════════════════════════════════════
-- ⑪  التخزين
--
-- ⚠️ جداول storage ملك Supabase وتُنشأ مع المشروع — لا تُنشئ منها شيئاً.
--    الذي يخصّك: سطر الجرّة والسياسات الأربع.
-- ⚠️ بعد ④: السياسات تنادي can_upload_media()
-- ═══════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audio', 'audio', true, 10485760, array['audio/*'])
on conflict (id) do nothing;

create policy audio_read on storage.objects for select to public
  using (bucket_id = 'audio');

create policy audio_write on storage.objects for insert to authenticated
  with check (bucket_id = 'audio' and can_upload_media());

create policy audio_update on storage.objects for update to authenticated
  using      (bucket_id = 'audio' and can_upload_media())
  with check (bucket_id = 'audio' and can_upload_media());

create policy audio_delete on storage.objects for delete to authenticated
  using (bucket_id = 'audio' and can_upload_media());

-- ⬜ دَينٌ موثَّق: الجرّة public = true ⇒ مسار /object/public/audio/…
--    يُقرأ بلا مصادقة. الحاجز الحاليّ أنّ الرابط في passages.media_url
--    وهي محميّة بـRLS. يُعاد النظر يوم يُنتَج أوّل درس استماع:
--    التعرّض المسبق للمقطع يقيس الحفظ لا الفهم.


-- ═══════════════════════════════════════════════════════════════════════
-- انتهى.
--
-- بعد هذا الملفّ تُشغَّل الملفّات المرقَّمة التي تلَت الاستخراج:
--   sql/55  إصلاح set_my_grade (لا يمنع حفظ الصفّ)
--   sql/56  حذف التوقيع القديم لـ set_my_grade
--   sql/57  level_from_score — لا تُخمّن الصفّ من درجة
--   sql/58  إحكام الصلاحيات على الجداول الباقية  ← لم يُطبَّق بعد
--
-- التحقّق الصحيح: شغّل هذا الملفّ على مشروعٍ تجريبيّ، ثم أعِد
-- الاستخراج منه وقارن. الفروق هي بالضبط ما فقده الاستخراج.
-- ═══════════════════════════════════════════════════════════════════════
