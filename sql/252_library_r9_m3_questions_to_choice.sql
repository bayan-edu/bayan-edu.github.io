-- 252_library_r9_m3_questions_to_choice.sql
-- أسئلةُ كتب R9 الستّة المستوردة (M3) في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد
--
-- لماذا: تتمّةُ 251 على المستوى التاسع — كتبُه الستّة المستوردة في M3. بالقرار نفسه (المالك · ٢٦–٢٧ نوفمبر ٢٠٢٦).
--   وهذه أوّلُ دفعةٍ يكتبها وكيلان فرعيّان (إذنُ المالك يومَ ٢٧ نوفمبر: «نعم، ابدأ بها»)، على دليلٍ واحد (AGENT_BRIEF.md) وبالبوّابات نفسها،
--   وقُرئ كلُّ سؤالٍ فيها على نصّه قبل التطبيق. الكتب 6 (لم تُنشر): 31 سؤالَ ضغطٍ وحكمٍ تصير اختياراً من متعدّد (124 خياراً).
--   وأوسمةُ الكتب المستوردة أُخذت من مستواها القديم، فوُسم كلُّ سؤالٍ بهدفٍ من مدى R9 يوافق ما يسأله، وصُحّح وسمُ 5 أسئلةٍ باقية
--   (أسئلةُ الترتيب: P3.ORDER ينتهي مداه عند R7 ⇒ P3.CONNECT_EVENTS كما في كتب R9 المؤلَّفة · وسؤالُ اختيارٍ عن فكرة الكتاب ⇒ P3.MAIN_SHORT).
--   وسؤالُ الحكم مفتاحُه واحد: الحكمُ الذي يسنده النصّ، ولا يُعرض الآخر إلا بسببٍ ينقضه النصّ.
--
-- كيف: يتحوّل السؤالُ في موضعه — المعرّفُ والترتيبُ والنصُّ المشترك كما هي — فتُحذف خياراتُه وتُكتب الجديدة ويُعاد مفتاحُه.
--   mcq: خياراتٌ ومفتاحٌ واحد وأكوادُ تشخيص. matching: البنودُ خياراتٌ بمفاتيح a… والمقابلاتُ في bank والأزواجُ في accept.pairs، ودرجتُه بعدد بنوده.
--   relabel: سؤالٌ باقٍ يُصحَّح هدفُه وحده. ولا طالبَ أجاب: الحارسُ يوقف الملفَّ إن وُجدت إجابةٌ واحدة على سؤالٍ يتحوّل.
--   وإعادةُ التشغيل آمنة: ما تحوّل بنصّه الجديد يُتخطّى، وسؤالٌ على غير نمطه المقيس يرفع استثناءً فلا يُكتب شيء.
--   والمصدر خارج المستودع (فيه نصوصُ الكتب): Reading project/library-drafts/q-rewrite/R09M3.py ← gen_sql2.py

do $$
declare
  spec jsonb := $spec$[
{"q": 18885, "quiz": 1462, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "What can people make from used paper?", "why": "في النص مصيران يتنافسان للورق (القمامة وإعادة التدوير)، والمطلوب الثاني: «When used paper is recycled, it is turned into new paper.»", "opts": [{"t": "Old pieces.", "dx": "ECHO", "key": false}, {"t": "New trees.", "dx": "MIX", "key": false}, {"t": "More trash.", "dx": "MIX", "key": false}, {"t": "New paper.", "dx": null, "key": true}]},
{"q": 18886, "quiz": 1462, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "You can do \"something better\" with used paper. What is it?", "why": "السؤال يعيد صياغة مطلع النص: «You can do something better: Recycle!»", "opts": [{"t": "Cut it into pieces.", "dx": "ECHO", "key": false}, {"t": "Use it again and again.", "dx": "GAP", "key": false}, {"t": "Recycle it.", "dx": null, "key": true}, {"t": "Throw it away.", "dx": "REV", "key": false}]},
{"q": 18887, "quiz": 1462, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What is \"trash\" in this book?", "why": "المعنى من الجملة نفسها: «When you throw things away, they become trash.»", "opts": [{"t": "Big trees. People make paper from them.", "dx": "MIX", "key": false}, {"t": "Used things. People throw them away.", "dx": null, "key": true}, {"t": "New things. People make them every day.", "dx": "JUMP", "key": false}, {"t": "Good things. People help Earth with them.", "dx": "REV", "key": false}]},
{"q": 18888, "quiz": 1462, "obj": "P3.CONNECT_EVENTS", "kind": "relabel"},
{"q": 18889, "quiz": 1462, "obj": "P3.CONNECT_EVENTS", "kind": "mcq", "was": "sentence", "body": "People throw away used paper. How does that hurt trees?", "why": "الحدثان متصلان: رمي الورق يستدعي ورقاً جديداً من الشجر: «Also, we would have to cut down more trees to make new paper.»", "opts": [{"t": "People make the trees into pieces of trash.", "dx": "MIX", "key": false}, {"t": "People cut down more trees to make paper.", "dx": null, "key": true}, {"t": "People recycle the trees with the used paper.", "dx": "MIX", "key": false}, {"t": "People put too much trash under the trees.", "dx": "JUMP", "key": false}]},
{"q": 18890, "quiz": 1462, "obj": "P4.REASON_SUPPORTS", "kind": "mcq", "was": "judge", "body": "The end of the book is \"Recycling is helpful to Earth!\" Does the book give good reasons for this?", "why": "الدعوى تسندها جملتان قبلها: «Less paper is put in the trash. Fewer trees are cut down.»", "opts": [{"t": "Yes. There is less trash, and more trees stay.", "dx": null, "key": true}, {"t": "Yes. Trash is good for our planet.", "dx": "REV", "key": false}, {"t": "No. Recycling makes more trash.", "dx": "REV", "key": false}, {"t": "No. Recycling hurts more trees.", "dx": "REV", "key": false}]},
{"q": 18879, "quiz": 1461, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "What does the moon go around?", "why": "في النص جملة منافسة عن الكواكب «They all move around the sun, too.»، والمطلوب القمر: «But it goes around the earth!»", "opts": [{"t": "A big shape.", "dx": "ECHO", "key": false}, {"t": "All the planets.", "dx": "MIX", "key": false}, {"t": "The sun.", "dx": "MIX", "key": false}, {"t": "The earth.", "dx": null, "key": true}]},
{"q": 18880, "quiz": 1461, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "What is at the center of the big oval?", "why": "السؤال يعيد صياغة النص (big oval = oval shape): «At the center of the oval shape is the sun.»", "opts": [{"t": "A big planet.", "dx": "GAP", "key": false}, {"t": "The moon.", "dx": "MIX", "key": false}, {"t": "Earth.", "dx": "MIX", "key": false}, {"t": "The sun.", "dx": null, "key": true}]},
{"q": 18881, "quiz": 1461, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "Read this line: \"They all move around the sun, too.\" What does \"they\" mean here?", "why": "المقصود من الجملة التي قبلها مباشرة: «There are other planets besides Earth. They all move around the sun, too.»", "opts": [{"t": "The people on Earth.", "dx": "JUMP", "key": false}, {"t": "The moon and Earth.", "dx": "MIX", "key": false}, {"t": "The other planets.", "dx": null, "key": true}, {"t": "The days on Earth.", "dx": "ECHO", "key": false}]},
{"q": 18882, "quiz": 1461, "obj": "P3.CONNECT_EVENTS", "kind": "relabel"},
{"q": 18883, "quiz": 1461, "obj": "P3.MAIN_SHORT", "kind": "mcq", "was": "sentence", "body": "What is this book about?", "why": "الفكرة الرئيسة تجمع النص كله: «But really, it is always moving.» ثم «Other things move through space, too.»", "opts": [{"t": "How people live on planet Earth.", "dx": "PART", "key": false}, {"t": "How big the sun and the moon are.", "dx": "JUMP", "key": false}, {"t": "How Earth stays in one place in space.", "dx": "REV", "key": false}, {"t": "How Earth and other things move in space.", "dx": null, "key": true}]},
{"q": 18884, "quiz": 1461, "obj": "P4.REASON_SUPPORTS", "kind": "mcq", "was": "judge", "body": "To us, it feels like Earth stays in place. Does the book agree with this feeling?", "why": "النص يردّ الشعور بما بعده: «But really, it is always moving.» و«At the same time, it moves through space.»", "opts": [{"t": "No. Earth spins, and it moves through space.", "dx": null, "key": true}, {"t": "No. Earth goes around the moon every day.", "dx": "MIX", "key": false}, {"t": "Yes. Only the moon moves through space.", "dx": "REV", "key": false}, {"t": "Yes. Earth is at the center of the oval.", "dx": "MIX", "key": false}]},
{"q": 19197, "quiz": 1515, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "What are Phobos and Deimos?", "why": "السؤال يعيد صياغة النص: «Mars has two moons. These moons are named Phobos and Deimos.»", "opts": [{"t": "Two planets near Mars.", "dx": "MIX", "key": false}, {"t": "Two volcanoes on Mars.", "dx": "MIX", "key": false}, {"t": "The two moons of Mars.", "dx": null, "key": true}, {"t": "Two rovers on Mars.", "dx": "MIX", "key": false}]},
{"q": 19198, "quiz": 1515, "obj": "P4.FIT", "kind": "mcq", "was": "sentence", "body": "Many people call Mars \"the Red Planet.\" Is this a good name for Mars?", "why": "الاسم يوافق ما يقوله النص عن سطح الكوكب: «It has a lot of iron on its surface.»", "opts": [{"t": "Yes. Mars is red from its old floods.", "dx": "MIX", "key": false}, {"t": "No. Only its two small moons are red.", "dx": "MIX", "key": false}, {"t": "No. Mars is red only in rover pictures.", "dx": "JUMP", "key": false}, {"t": "Yes. Iron on its surface makes Mars red.", "dx": null, "key": true}]},
{"q": 19199, "quiz": 1515, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What are \"rovers\" in this book?", "why": "المعنى من الجملة نفسها: «Rovers are robots that take detailed pictures and collect rocks or dirt.»", "opts": [{"t": "Small moons that go around Mars.", "dx": "MIX", "key": false}, {"t": "Floods from a long, long time ago.", "dx": "MIX", "key": false}, {"t": "Scientists who live and work on Mars.", "dx": "JUMP", "key": false}, {"t": "Robots that take pictures and collect rocks.", "dx": null, "key": true}]},
{"q": 19200, "quiz": 1515, "obj": "P3.CONNECT_EVENTS", "kind": "relabel"},
{"q": 19201, "quiz": 1515, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "How is water on Mars different now from a long time ago?", "why": "التغيّر بين الماضي والحاضر: «there were floods on Mars a long, long time ago.» ثم «Now, water only exists there in icy dirt and clouds.»", "opts": [{"t": "Long ago there were floods. Now water is only in icy dirt and clouds.", "dx": null, "key": true}, {"t": "Long ago there were clouds. Now Mars has seasons and canyons.", "dx": "MIX", "key": false}, {"t": "Long ago there was icy dirt. Now there are floods on Mars.", "dx": "REV", "key": false}, {"t": "Long ago there was no water. Now rovers collect it from rocks.", "dx": "JUMP", "key": false}]},
{"q": 19202, "quiz": 1515, "obj": "P3.MAIN_SHORT", "kind": "relabel"},
{"q": 23795, "quiz": 2284, "obj": "P1.PARAPHRASE", "kind": "mcq", "was": "sentence", "body": "Why did Olive Ridley Turtle stop going to the beach?", "why": "السؤال يعيد صياغة ما كُتب على رسالتها المردودة: «No longer visits the beach as the waters are too warm.»", "opts": [{"t": "The snow there came too early.", "dx": "MIX", "key": false}, {"t": "The water there is too salty.", "dx": "MIX", "key": false}, {"t": "A forest fire came to the beach.", "dx": "MIX", "key": false}, {"t": "The water there is too warm.", "dx": null, "key": true}]},
{"q": 23796, "quiz": 2284, "obj": "P2.MOTIVE", "kind": "mcq", "was": "sentence", "body": "Bear's family ran to the den to sleep. Why did they run back out?", "why": "الدافع من سلوكهم في الفقرة نفسها: «But we hadn’t eaten enough. So, we ran back out to eat some more.»", "opts": [{"t": "They were too hot in the den.", "dx": "JUMP", "key": false}, {"t": "They wanted to play in the snow.", "dx": "JUMP", "key": false}, {"t": "They wanted to look for Toad and Rat.", "dx": "MIX", "key": false}, {"t": "They were still hungry.", "dx": null, "key": true}]},
{"q": 23797, "quiz": 2284, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "Hermit Crab is upset about the acidity in the sea. Where does this acidity come from?", "why": "السبب في الجملة التالية بلا أداة ربط: «There’s too much carbon in the sea.»", "opts": [{"t": "From too much mud in the water.", "dx": "MIX", "key": false}, {"t": "From too much sugar in the water.", "dx": "MIX", "key": false}, {"t": "From too many rain clouds in the sky.", "dx": "MIX", "key": false}, {"t": "From too much carbon in the sea.", "dx": null, "key": true}]},
{"q": 23798, "quiz": 2284, "obj": "P3.COMPARE_CHAR", "kind": "mcq", "was": "sentence", "body": "How is the weather different for Flying Squirrel and for Penguin?", "why": "المقارنة في أمر واحد — الطقس: يكتب البطريق «It’s very, very, very hot.» ويكتب السنجاب «Brrrr… it’s too cold to fly.»", "opts": [{"t": "It rains on Squirrel, but it snows early on Penguin.", "dx": "MIX", "key": false}, {"t": "It is too hot for Squirrel, but it is too cold for Penguin.", "dx": "REV", "key": false}, {"t": "It is too cold for Squirrel, but it is too hot for Penguin.", "dx": null, "key": true}, {"t": "Squirrel has a forest fire, but Penguin has a salty lake.", "dx": "MIX", "key": false}]},
{"q": 23799, "quiz": 2284, "obj": "P3.CONNECT_EVENTS", "kind": "mcq", "was": "sentence", "body": "Many animals ask about Toad and Rat. Later, the letters to Toad and Rat come back. How do these two things connect?", "why": "الحدثان يتصلان عبر النص كله: تسأل الحيوانات عنهما، ويقول السرطان «Even Golden Toad has disappeared.» ثم تعود رسائلهما وعليها «Return to sender».", "opts": [{"t": "Toad and Rat are fast asleep in a den in the snow.", "dx": "MIX", "key": false}, {"t": "Toad and Rat are angry with all their friends.", "dx": "JUMP", "key": false}, {"t": "Toad and Rat are on a holiday in a rainy place.", "dx": "LITR", "key": false}, {"t": "Toad and Rat are gone, and no animal can find them.", "dx": null, "key": true}]},
{"q": 23800, "quiz": 2284, "obj": "P4.FIT", "kind": "mcq", "was": "judge", "body": "In the first letter, the impacts are \"everywhere\". Do the animal letters show this too?", "why": "المطلع يعد بأن الأثر في كل مكان: «are felt by all (including you and us) everywhere.» والرسائل تفي به: حرّ وبرد ومطر وحريق وماء مالح، كلٌّ في مكان.", "opts": [{"t": "Yes. Every animal has a home in a very hot place.", "dx": "REV", "key": false}, {"t": "Yes. The animals live in many places, and each one has a problem.", "dx": null, "key": true}, {"t": "No. Only Polar Opposite Bear has a problem with the weather.", "dx": "REV", "key": false}, {"t": "No. The animals write only about a missing rat and toad.", "dx": "PART", "key": false}]},
{"q": 20835, "quiz": 1788, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "What crab uses one large claw to show how big it is?", "why": "في النص أربعة أنواع تتنافس، والمطلوب صاحب المخلب: «Male Fiddler Crabs have one large claw, and they use it to show how big and powerful they are.»", "opts": [{"t": "The Fiddler Crab.", "dx": null, "key": true}, {"t": "The Moon Crab.", "dx": "MIX", "key": false}, {"t": "The Ghost Crab.", "dx": "MIX", "key": false}, {"t": "The Soldier Crab.", "dx": "MIX", "key": false}]},
{"q": 20836, "quiz": 1788, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "Why can you barely see Ghost Crabs on the beach?", "why": "السبب في الجملة نفسها بلا أداة سببية: «They are the colour of the sand, and you can barely see them as they dart across the beach.»", "opts": [{"t": "They live at the edge of mangroves.", "dx": "MIX", "key": false}, {"t": "They hide under their hard shell.", "dx": "MIX", "key": false}, {"t": "They are the colour of the sand.", "dx": null, "key": true}, {"t": "They are small like tiny balls.", "dx": "MIX", "key": false}]},
{"q": 20837, "quiz": 1788, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "What does \"CAST\" mean in this book?", "why": "المعنى من الجملة نفسها: «Did you know that a group of crabs is called a CAST?»", "opts": [{"t": "A large claw of a crab.", "dx": "MIX", "key": false}, {"t": "A group of crabs.", "dx": null, "key": true}, {"t": "A home in the sand.", "dx": "MIX", "key": false}, {"t": "A walk on the beach.", "dx": "JUMP", "key": false}]},
{"q": 20838, "quiz": 1788, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "Near the end of the trip, the sea comes in. How does Keya change then?", "why": "التغيّر بين أول الرحلة وآخرها: خرجت فرِحة تقول «Hello world!»، ثم حين جاء البحر «Keya is sad. It's time to go back to the burrow.»", "opts": [{"t": "She is sad, because it is time to go back.", "dx": null, "key": true}, {"t": "She is happy, because she can play in the water.", "dx": "REV", "key": false}, {"t": "She is angry, because Ma waves at a crab.", "dx": "MIX", "key": false}, {"t": "She is afraid, because the sea can eat her.", "dx": "LITR", "key": false}]},
{"q": 20839, "quiz": 1788, "obj": "P3.COMPARE_CHAR", "kind": "mcq", "was": "sentence", "body": "At the start of the day, how are Keya and Ma different?", "why": "المقارنة في أمر واحد — ما تريده كلٌّ منهما: تسأل كيا «Ma, can we go play in the water?» فتجيب الأم «We have lots of things to do today,»", "opts": [{"t": "Ma wants to play in the water, but Keya has lots of things to do.", "dx": "REV", "key": false}, {"t": "Keya wants to eat treats, but Ma wants to see the sea.", "dx": "MIX", "key": false}, {"t": "Keya wants to play in the water, but Ma has lots of things to do.", "dx": null, "key": true}, {"t": "Keya wants to sleep in the burrow, but Ma wants to go out.", "dx": "JUMP", "key": false}]},
{"q": 20840, "quiz": 1788, "obj": "P4.REASON_SUPPORTS", "kind": "mcq", "was": "judge", "body": "Ma tells Keya, \"Stay away from the Moon Crabs.\" Does the end of the book agree with Ma?", "why": "سبب الأم «They might just eat you for lunch!» تسنده صفحة الحقائق: «They feed on other crabs and smaller fish.»", "opts": [{"t": "No. Moon Crabs are small and easy prey for shorebirds.", "dx": "MIX", "key": false}, {"t": "Yes. Moon Crabs feed on other crabs and smaller fish.", "dx": null, "key": true}, {"t": "Yes. Moon Crabs are the fastest runners on the planet.", "dx": "MIX", "key": false}, {"t": "No. Moon Crabs only sift for food in the sand.", "dx": "MIX", "key": false}]},
{"q": 25043, "quiz": 2492, "obj": "P1.COMPETITOR", "kind": "mcq", "was": "sentence", "body": "Before Shanti came to the city, what did Chachi ji say about school?", "why": "في النص أقوال عدّة عن المدرسة تتنافس، والمطلوب ما قيل قبل المجيء إلى المدينة: «Maybe she can go to school too.»", "opts": [{"t": "Shanti can go to school next year.", "dx": "MIX", "key": false}, {"t": "There is no time to go to school.", "dx": "MIX", "key": false}, {"t": "Maybe Shanti can go to school.", "dx": null, "key": true}, {"t": "Shanti can join school tomorrow.", "dx": "MIX", "key": false}]},
{"q": 25044, "quiz": 2492, "obj": "P2.WORD_CONTEXT", "kind": "mcq", "was": "sentence", "body": "In the story, Chachi ji's face is like a sharp knife. What does this tell us about her?", "why": "المعنى من السياق القريب: «When Chacha ji and Chachi ji got angry Shanti got very scared.» ثم «Chachi ji's face looked sharp as a knife.»", "opts": [{"t": "She was quick and clever.", "dx": "MIX", "key": false}, {"t": "She was very angry.", "dx": null, "key": true}, {"t": "She had a knife in her hand.", "dx": "LITR", "key": false}, {"t": "She was thin and sick.", "dx": "JUMP", "key": false}]},
{"q": 25045, "quiz": 2492, "obj": "P2.UNSIGNALLED", "kind": "mcq", "was": "sentence", "body": "At breakfast, Shanti ate only half a paratha, and she ate it quickly. Why?", "why": "السبب بلا أداة ربط: «Shanti crammed half a paratha into her mouth and chewed it up quickly!» ثم «There was sweeping to be done before she could play with Mamta.»", "opts": [{"t": "She wanted to run to the tree.", "dx": "MIX", "key": false}, {"t": "She was full after her tea.", "dx": "JUMP", "key": false}, {"t": "She had more work to do.", "dx": null, "key": true}, {"t": "Mamta ate the other half.", "dx": "JUMP", "key": false}]},
{"q": 25046, "quiz": 2492, "obj": "P3.CONNECT_EVENTS", "kind": "relabel"},
{"q": 25047, "quiz": 2492, "obj": "P3.CHANGE", "kind": "mcq", "was": "sentence", "body": "How is Shanti different at the end of the story?", "why": "التغيّر بين أول القصة وآخرها: كانت «Shanti got so scared that she ran off.» ثم في الخاتمة «Now she would never be scared again. She had found a safe place which would always be there for her.»", "opts": [{"t": "She has no work now, so she plays all day.", "dx": "JUMP", "key": false}, {"t": "She has a safe place now, so she is not scared.", "dx": null, "key": true}, {"t": "She has money for the bus now, so she goes home.", "dx": "REV", "key": false}, {"t": "She has a new plate now, so she is not sad.", "dx": "JUMP", "key": false}]},
{"q": 25048, "quiz": 2492, "obj": "P4.CONSEQUENCE", "kind": "mcq", "was": "judge", "body": "Shanti left the tree and went back to the house. Was this good for her?", "why": "قيمة الاختيار بما ترتّب عليه: قالت الخالة «I’ll make a cup of tea for you.» وقال العم «tomorrow I’ll find out about the school.»", "opts": [{"t": "No. Mamta cried louder when she came in.", "dx": "REV", "key": false}, {"t": "No. Chachi ji scolded her again for the plate.", "dx": "REV", "key": false}, {"t": "Yes. Chachi ji was kind to her, and Chacha ji talked about school.", "dx": null, "key": true}, {"t": "Yes. Her mother was at the house with money for her.", "dx": "JUMP", "key": false}]}
]$spec$::jsonb;
  e jsonb; o jsonb; r record;
  v_q bigint; v_obj bigint; v_id bigint; v_key bigint; v_dx jsonb; i int; n int;
  n_done int := 0; n_skip int := 0;
begin
  /* ── الحرّاس: كلُّ سؤالٍ في اختباره، من مكتبة المادّة ٧، وما يتحوّل بلا إجابة ── */
  for r in select (x->>'q')::bigint q, (x->>'quiz')::bigint quiz from jsonb_array_elements(spec) x loop
    if not exists (select 1 from questions qq join items it on it.quiz_id = qq.quiz_id join lessons l on l.id = it.lesson_id
                    join courses c on c.id = l.course_id
                    where qq.id = r.q and qq.quiz_id = r.quiz and c.subject_id = 7 and qq.retired_at is null) then
      raise exception 'السؤال % ليس في الاختبار % من مكتبة المادّة ٧', r.q, r.quiz;
    end if;
  end loop;
  select count(*) into n from answers a
   where a.question_id in (select (x->>'q')::bigint from jsonb_array_elements(spec) x where x->>'kind' <> 'relabel');
  if n > 0 then raise exception 'على الأسئلة % إجابة — لا يُحوَّل سؤالٌ أجاب عنه أحد', n; end if;

  for e in select * from jsonb_array_elements(spec) loop
    v_q := (e->>'q')::bigint;
    select kind, body, objective_id into r from questions where id = v_q;
    select id into strict v_obj from objectives where subject_id = 7 and code = e->>'obj';

    if e->>'kind' = 'relabel' then
      if r.objective_id is distinct from v_obj then update questions set objective_id = v_obj where id = v_q; n_done := n_done + 1;
      else n_skip := n_skip + 1; end if;
      continue;
    end if;

    if r.kind = e->>'kind' and r.body = e->>'body' then n_skip := n_skip + 1; continue; end if;
    if r.kind <> e->>'was' then raise exception 'السؤال % نمطُه % لا %', v_q, r.kind, e->>'was'; end if;

    update question_keys set correct_id = null, correct_ids = null where question_id = v_q;
    delete from options where question_id = v_q;

    if e->>'kind' = 'mcq' then
      v_key := null; v_dx := '{}'::jsonb; i := 0;
      for o in select * from jsonb_array_elements(e->'opts') loop
        i := i + 1;
        insert into options (question_id, position, body) values (v_q, i, o->>'t') returning id into v_id;
        if (o->>'key')::boolean then v_key := v_id;
        elsif o->>'dx' is not null then v_dx := v_dx || jsonb_build_object(v_id::text, o->>'dx'); end if;
      end loop;
      if v_key is null then raise exception 'السؤال % بلا مفتاح', v_q; end if;
      update questions set kind = 'mcq', body = e->>'body', objective_id = v_obj where id = v_q;
      update question_keys set correct_id = v_key, correct_ids = null, accept = null, bank = null, wrong_map = null,
             dx_map = v_dx, explanation = e->>'why' where question_id = v_q;
    else   -- matching
      i := 0;
      for o in select * from jsonb_array_elements(e->'prompts') loop
        i := i + 1;
        insert into options (question_id, position, body, item_key) values (v_q, i, o->>'t', o->>'k');
      end loop;
      update questions set kind = 'matching', body = e->>'body', objective_id = v_obj, points = i where id = v_q;
      update question_keys set correct_id = null, correct_ids = null, wrong_map = null, dx_map = '{}'::jsonb,
             bank = e->'bank', accept = jsonb_build_object('pairs', e->'pairs'), explanation = e->>'why' where question_id = v_q;
    end if;
    get diagnostics n = row_count;
    if n <> 1 then raise exception 'السؤال % بلا سطر مفتاح', v_q; end if;
    n_done := n_done + 1;
  end loop;

  if n_done + n_skip <> 36 then raise exception 'عُدِّل % وتُخطّي % والمنتظر 36', n_done, n_skip; end if;
  raise notice '252: عُدِّل % سؤالاً · تُخطّي %', n_done, n_skip;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('252', 'أسئلةُ كتب R9 الستّة المستوردة (M3) في مكتبة بيان — «الضغط على الجملة» و«حكمٌ ودليلُه» يصيران اختياراً من متعدّد', now())
on conflict (n) do update set applied_at = now();
