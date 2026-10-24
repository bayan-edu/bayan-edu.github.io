/* ═══════════════════════════════════════════════════════════════════
   182 · القدرات العامة — مادّةٌ سعوديّة بمقرَّرٍ واحد لا صفَّ له

   🔴 رقمُه نُقل — والفجوةُ تُرى:
      كُتب وطُبّق أوّلاً برقم `181` (٢٤ أكتوبر ١٨:٢٦)، **و`181` كان محجوزاً**
      لـ`181_course_state_texts.sql` — كتبته جلسةٌ أخرى قبله بثلاث دقائق ولم
      يُطبَّق، فلم يظهر في `sql_log`. جلستان على القاعدة معاً — وهو ما يمنعه
      `AGENTS.md §١٠`. ⇒ **قرارُ المالك: هذا ينتقل إلى `182`**، وسطرُه في
      `sql_log` نُقل بـ`update` مشروطٍ بعنوانه وعليه `note` تقول ذلك.
      ⚠️ **ودرسُه:** `sql_log` يشهد بالمطبَّق لا بالمحجوز — **فالرقمُ يُقرأ
      أيضاً من `ls sql/` ومن `STATE.md §٠·د` قبل الكتابة**، لا من الاستعلام وحده.

   لماذا:
   قرارُ المالك (٢٤ أكتوبر): القدرات **مادّةٌ مستقلّة** لا كمّيٌّ في الرياضيات
   ولفظيٌّ في العربية — فهي اختبارٌ واحد بدرجةٍ واحدة، وفروعُها تحمل أسماءَ
   فروعٍ مدرسيّة بمعانٍ أخرى («الجبر» هنا ٤٪ من الاختبار لا مقرَّرُ جبر).
   ومحورُها **المستوى لا الصفّ**: محتوًى واحد لطالب الأول والثاني والثالث.

   🔑 ولا هجرةَ في الملفّ — صفوفٌ فقط. **فكلُّ قرارٍ تحته قرأ الحيَّ أوّلاً:**

   ① `placement = 'profile'` و`scale_id = sa_sec` — لا `open`:
      `courses_of` لا تفحص سلّمَ المادّة إلّا حين `placement = 'profile'`.
      ⇒ `open` (نمطُ «كيف أذاكر؟») يُظهرها للطالب المصريّ أيضاً.

   ② المقرَّر `level_id = null` — لا `sa2`:
      `courses_of` تحسب «الحاليّ» بالمساواة (`c.level_id = my_level_id`).
      ⇒ مقرَّرٌ على `sa2` يراه طالبُ الثالث **مراجعةَ صفٍّ مضى** (`2_past`).
      والفراغُ حاليٌّ للصفوف الثلاثة معاً. وسابقتُه حيّة: مقرَّر ٢٧.
      و`save_lesson` تنقل صفَّ المقرَّر إلى الدرس ⇒ الدروس بلا صفٍّ أيضاً،
      و`can_view_level(null)` تفتحها. و`course_state` تقرأ الصفَّ بربطٍ
      اختياريّ ⇒ `"level": null` في `courses.json` ولا ينكسر شيء.

   ③ لا `path_id` — والتخصّص (علميّ · نظريّ) داخل المقرَّر:
      السلّمُ السعوديّ بلا `paths`، و`paths` تعمل على المقرَّر كلِّه لا الوحدة.
      ⇒ مقرَّران يكرّران قرابة تسعة أعشار الدروس فيتفارقان.
      ⇒ وحدةُ الجبر ظاهرةٌ للجميع وعنوانُها يسمّي تخصّصها، والفرقُ في نموذجَي
         المحاكاة. **وربطُ مسارات الثانوية السعودية بتخصّص القدرات لم يُوثَّق**،
         فلا يُبنى عليه آليّاً.

   ④ لا سلّمَ إتقان (نمطُ CEFR) ولا صفَّ في `student_levels`:
      `progression = 'level'` يقسم المحتوى مقرَّراً لكلّ نطاق ويقفل الدرسَ
      «حتى تصل»، والعتباتُ تحتاج معايرةً لا نملكها (درسُ `min_score`).
      ⇒ **«المستوى» هنا خريطةُ فروع لا درجة:** اختبارُ البداية اختبارٌ عاديّ
         في الوحدة الأولى، أسئلتُه موسومةٌ بفروعها ومشتّتاتُه بأكوادها،
         والتحليلاتُ القائمة تُخرج «أين يقف ولماذا».
      ⚠️ **ولا يُسمّى «تحديد المستوى»:** ذاك في بيان اسمُ زرٍّ يضع الطالب على
         درجةٍ في سلّم (`student.js`)، وهذا لا يفعل. **ولا «محطّة»:** المحطّةُ
         في بيان لا درسَ لها، وهذا درس.

   ⑤ `progression = 'free'`:
      حقلٌ وصفيٌّ تقرؤه شاشةُ الإدارة وحدها (قِيس بـ`grep` على `js/`).
      والقيدُ الحقيقيّ بين الدروس `requires_id` إن احتيج — درساً درساً.

   ⑥ البذور `do nothing` لا `do update`:
      المادّةُ والمقرَّرُ والوحدات والفروع تُحرَّر بعد اليوم من «إدارة المحتوى»
      (`155`). ⇒ إعادةُ التشغيل لا تمحو تحريرَ المالك. (القاعدة: `do nothing`
      للبذور · و`do update` للمعاجم.)

   ⚠️ وعائقُ محتوًى لا تقنية — يُكتب هنا لأنّه يقع على أوّل درس:
      العلاج (`objectives.remedial_item_id`) **لا يصحّ أن يشير إلى درسٍ في
      الرياضيات أو العربية المصريّتين**: `can_access_lesson` تقفله أمام الطالب
      السعوديّ (`my_rank` على سلّمٍ ليس سلّمه = −١). والسلّمُ السعوديّ بلا
      رياضياتٍ ولا عربية. ⇒ **دروسُ التأسيس تُكتب داخل هذه المادّة.**

   📌 الوجه: لا صورةَ مجسّمة للمادّة في `SUBJ_IMG` ⇒ تظهر بالشكل والرمز حتى
      تُصنع صورتُها. وهذا عملُ تصميمٍ يأتي بعد، لا شرطٌ لهذا الملفّ.

   📌 ترتيبُ الوحدات مرجعيٌّ: اللفظيّ ثمّ الكمّيّ، والحسابُ ثلاثُ وحداتٍ لأنّ
      وزنه ٢٣٪ من الاختبار العلميّ. **و`list_lessons` ترتّب بموضع الوحدة**،
      فهذا الترتيبُ هو ما يراه الطالب.

   ⚙️ قابلٌ لإعادة التشغيل. لا بنيةَ تتغيّر ⇒ لا `00_schema`. لا واجهةَ ⇒ لا `BUILD`.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── ① المادّة ──────────────────── */

insert into public.subjects
       (code, name, description, icon, family, scale_id,
        placement, progression, sort_order, active)
select 'sa_qudurat',
       'القدرات العامة',
       'الاستعداد لاختبار القدرات العامة بقسميه: اللفظي والكمي',
       '🧩',
       'aptitude',
       sc.id,
       'profile', 'free', 40, true
  from public.scales sc
 where sc.code = 'sa_sec'
on conflict (code) do nothing;


/* ──────────────────── ② المقرَّر — واحدٌ بلا صفٍّ ولا تخصّص ──────────────────── */

insert into public.courses (subject_id, level_id, path_id, title, position, active)
select s.id, null, null, 'القدرات العامة', 1, true
  from public.subjects s
 where s.code = 'sa_qudurat'
on conflict (subject_id, (coalesce(level_id, 0::bigint)), (coalesce(path_id, 0::bigint)))
do nothing;


/* ──────────────────── ③ الفروع — قسمان وتحت كلٍّ أربعة ────────────────────
   العمقُ طبقتان (`strands_guard`). والأكوادُ على نسق بيان: حروفٌ لاتينيّة
   كبيرة، فريدةٌ داخل المادّة. والمجالاتُ من صفحة الاختبار الرسميّة؛ و«الارتباط
   والاختلاف» ضُمّ إلى التناظر كما قرّر الدستور المشترك (٢٤ أكتوبر). */

insert into public.strands (subject_id, parent_id, code, name, sort_order)
select s.id, null, v.code, v.name, v.ord
  from public.subjects s
 cross join (values ('VERB', 'اللفظي', 1),
                    ('QUANT', 'الكمي', 2)) as v(code, name, ord)
 where s.code = 'sa_qudurat'
on conflict (subject_id, code) do nothing;

insert into public.strands (subject_id, parent_id, code, name, sort_order)
select s.id, p.id, v.code, v.name, v.ord
  from public.subjects s
 cross join (values ('VERB',  'RC',  'استيعاب المقروء',               1),
                    ('VERB',  'ANA', 'التناظر والارتباط والاختلاف',   2),
                    ('VERB',  'CTX', 'الخطأ السياقي',                 3),
                    ('VERB',  'SEN', 'إكمال الجمل',                   4),
                    ('QUANT', 'ARI', 'الحساب',                        1),
                    ('QUANT', 'GEO', 'الهندسة',                       2),
                    ('QUANT', 'DAT', 'تفسير البيانات',                3),
                    ('QUANT', 'ALG', 'الجبر',                         4)
            ) as v(parent, code, name, ord)
  join public.strands p on p.subject_id = s.id and p.code = v.parent
 where s.code = 'sa_qudurat'
on conflict (subject_id, code) do nothing;


/* ──────────────────── ④ الوحدات — بالمجال ────────────────────
   `units` بلا قيدٍ فريد ⇒ الهويّةُ موضعُ الوحدة في مقرَّرها: ما وُجد موضعُه
   لا يُعاد. والوحدةُ ٨ هي «مقاييس النزعة المركزية» في قائمة الهيئة، وعنوانُها
   للطالب بالكلمة التي يعرفها. */

insert into public.units (course_id, title, position)
select c.id, v.title, v.pos
  from public.courses c
  join public.subjects s on s.id = c.subject_id
 cross join (values ( 1, 'اختبار البداية'),
                    ( 2, 'استيعاب المقروء'),
                    ( 3, 'التناظر والارتباط والاختلاف'),
                    ( 4, 'الخطأ السياقي'),
                    ( 5, 'إكمال الجمل'),
                    ( 6, 'الأعداد والعمليات'),
                    ( 7, 'النسبة والتناسب والقياس'),
                    ( 8, 'المتوسطات والاحتمالات'),
                    ( 9, 'الهندسة'),
                    (10, 'تفسير البيانات'),
                    (11, 'الجبر · للتخصص العلمي'),
                    (12, 'اختبارات المحاكاة')
            ) as v(pos, title)
 where s.code = 'sa_qudurat'
   and c.level_id is null and c.path_id is null
   and not exists (select 1 from public.units u
                    where u.course_id = c.id and u.position = v.pos);


insert into public.sql_log (n, title, applied_at)
values ('182', 'القدرات العامة — مادّةٌ سعوديّة بمقرَّرٍ واحد لا صفَّ له', now())
on conflict (n) do update set applied_at = now();

commit;


/* ──────────────────── الفحص — بعد التطبيق، استعلامٌ واحد ────────────────────

select json_build_object(
  'subject', (select row_to_json(x) from (select id, code, name, placement, progression,
                     (select code from scales where id = scale_id) as scale
                from subjects where code = 'sa_qudurat') x),
  'course',  (select row_to_json(x) from (select c.id, c.title, c.level_id, c.path_id, c.active
                from courses c join subjects s on s.id = c.subject_id
               where s.code = 'sa_qudurat') x),
  'strands', (select count(*) from strands st join subjects s on s.id = st.subject_id
               where s.code = 'sa_qudurat'),                                   -- ١٠
  'units',   (select count(*) from units u join courses c on c.id = u.course_id
                join subjects s on s.id = c.subject_id
               where s.code = 'sa_qudurat'));                                  -- ١٢
*/
