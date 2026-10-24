#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
بيان — tools/make_requests.py  ·  يكتب طلبَ كلّ مقرّر في مرحلته

    python3 tools/make_requests.py --state "../bayan-content/1st Sec/state/courses.json"
    python3 tools/make_requests.py --state … --course 2        # مقرّرٌ واحد
    python3 tools/make_requests.py --texts --catalog ../bayan-content/catalog.json --author <uuid>

يُخرِج ملفّاً لكلّ مقرّر في `bayan-content/requests/`، يُنسخ نصُّه كما هو
إلى مشروع المادة.

🔑 **والطلبُ لا يحمل حالةً — ولا سطراً منها.** لا رقمَ درسٍ قائم، ولا عنوانَ
وحدة، ولا كودَ فرع. كلُّ ذلك يقرؤه معلّمُ المادة من `state/courses.json`
بنفسه. وكانت تُنسخ بيدي في كلّ طلب، فأوّلُ درسٍ يُضاف يجعل الطلبَ يكذب.

وما يُكتب هنا ثلاثةٌ لا رابع: **رقمُ المقرّر** (مفتاحُ القراءة) · **اسمُ
الملفّ المطلوب** · **وملاحظةٌ تربويّةٌ تخصّ هذا المنهج بعينه** — وهي الشيءُ
الوحيد الذي لا يُشتقّ من بياناتٍ ولا من قانون، فموضعُها ملفٌّ بيد الإنسان:

    tools/notes/<course_id>.txt

فإن لم يوجد، خرج الطلبُ بلا ملاحظة — ولا يُخترع له شيء.

🆕 ٢٤ أكتوبر · `--texts`: طلبُ **نصوص القراءة** (العقد · ⑭ · `import_texts` · 180)
مستقلٌّ عن المرحلتين — فيُكتب بجوار طلب المرحلة لا مكانه (`<cid>-<code>.texts.md`)،
وملاحظتُه `notes/<cid>.texts.txt`. ولا يُكتب لمقرّرٍ لم تمضِ مرحلتُه ①: النصُّ
يُوصَل بمفتاح درسه، **ودرسٌ بلا مفتاحٍ لا نصَّ له.**

🆕 ٢٤ أكتوبر · **و«الطريقُ الحيّ»** (181): طلبُ النصوص يقرأ حالةَ مقرّره من
`course_state()` كما تقرؤها طلباتُ الاختبار — لا من ملفّ حالةٍ لكلّ صفّ (بلغ
١٫٥ ميجابايت ويَبلى بأوّل استيراد). ⇒ فلا `--state` له، بل:
  · `--catalog` — `bayan-content/catalog.json` من `tools/catalog.sql`: **لمن** يُكتب
    طلب. وبلاه يؤخّر طلباً ولا يُفسده — فما يقرؤه المؤلّفُ حيٌّ دائماً.
  · `--author` — هويّةُ المطالب التي يُنادى بها `course_state` (حارسُها `can_author`).
    🔒 **تُكتب في الطلب داخل `bayan-content` ولا تُكتب في هذا الملفّ:** المستودعُ منشور.
  · والمجلّدُ من عمود `projects.txt` — كلُّ طلبٍ في `<المجلّد>/requests/`.
"""

import argparse, json, os, re, sys

RAQM = """رقمُ الطلب: {rid}

افحص أوّلاً: إن وُجد ملفُّك المطلوب أدناه وفيه `"request_id": "{rid}"` فالمهمّةُ
**منجَزةٌ — فقف ولا تُعِدها.** وإلّا فهي جديدةٌ عليك.
واكتب الرقمَ حقلاً أعلى في ملفّك: `"request_id": "{rid}"`.

"""

QALIB = """استعمل مهارة bayan-authoring-contract والتزم بها حرفاً.

اقرأ كتلةَ المقرّر رقم {cid} في bayan-content/state/courses.json — ومنها كلُّ ما
تحتاجه عن حالة المقرّر: وحداتُه، ودروسُه القائمة بأرقامها ومفاتيحها، وما كُتب
من فروع المادة. ولا تنسخ شيئاً من ذلك من هذه الرسالة.

المطلوب: المرحلة ① {nitaq} — فروعُ المادة ودروسُ المقرّر في ملفٍّ واحد.
JSON بلا شرحٍ حوله، ولا هدفَ واحدٌ فيه.
واحفظه في bayan-content/maps/{fname}

المنهجُ عندك. ابنِ عليه ولا تطلبه منّي — فإن لم يكن عندك فقف واطلبه.
"""


def marhala(c):
    """المرحلةُ الحالية — تُشتقّ من الحالة لا تُكتب بيد.

    الدرسُ الآتي من استيراد المرحلة ① يحمل `key`، والمكتوبُ بيدٍ لا يحمله.
    فمقرّرٌ كلُّ دروسه بمفاتيح ⇒ مضت مرحلتُه ①.
    """
    ls = c['lessons']
    if not ls:
        return 1
    if any(not l.get('key') for l in ls):
        return 1
    if sum(l.get('objectives') or 0 for l in ls) == 0:
        return 2
    return 0          # ① و② مضتا — لا طلبَ الآن


def adad(n, one, two, few, many):
    """العددُ ومعدودُه — قاعدةُ `N()` في js/ui.js بعينها: الواحدُ والاثنان بلا رقم،
    ومن ٣ إلى ١٠ جمعٌ، وما سواها مفردٌ منصوب. («4 نصّاً في 4 درساً» قِيست فأُصلحت.)"""
    if n == 1:
        return f'{one} واحد'
    if n == 2:
        return two
    r = n % 100
    return f'{n} {few if 3 <= r <= 10 else one if r < 3 else many}'


def nitaq(level):
    """«الفصل الدراسيّ الأول» للصفوف، و«كاملاً» للمسارات والمستويات."""
    if not level:
        return 'كاملةً'
    return 'للفصل الدراسيّ الأول كاملاً' if 'الصف' in level else f'لـ«{level}» كاملاً'


def projects(path):
    """سطورُ `projects.txt`: رقمُ المقرّر ثمّ `| المجلّد` اختياراً، وما بعد # يُهمَل.
    و`utf-8-sig`: ملفٌّ يُحفظ بمفكّرة Windows يبدأ بـBOM، فيصير أوّلُ رقمٍ «\\ufeff2»."""
    rows = []
    for line in open(path, encoding='utf-8-sig'):
        head = line.split('#', 1)[0].strip()
        if head:
            cid, _, folder = head.partition('|')
            rows.append((int(cid), folder.strip() or None))
    return rows


THANIYA = """استعمل مهارة bayan-authoring-contract والتزم بها حرفاً.

اقرأ كتلةَ المقرّر رقم {cid} في bayan-content/state/courses.json — ومنها كلُّ ما
تحتاجه: دروسُ المقرّر بمفاتيحها، وفروعُ المادة، وأهدافُ المادة المكتوبةُ سلفاً في
`objectives_index`. ولا تنسخ شيئاً من ذلك من هذه الرسالة.

المطلوب: المرحلة ② — فهرسُ الأهداف وتوزيعُه على الدروس.
ثلاثةٌ في ملفٍّ واحد: العناوينُ العريضة، والبنود، وما يستهدفه كلُّ درس.
JSON بلا شرحٍ حوله.
واحفظه في bayan-content/index/{fname}

والدروسُ مكتوبةٌ في المنصّة، فلا تُعِدها ولا تقترح غيرَها: مفتاحُ الدرس (`key`)
هو وصلُك إليه. والهدفُ المكتوبُ سلفاً في `objectives_index` يُعاد استعمالُه
بكوده ولا يُكتب من جديد — فالهدفُ يسكن المادةَ ويعبر الصفوف.

المنهجُ عندك. ابنِ عليه ولا تطلبه منّي — فإن لم يكن عندك فقف واطلبه.
"""

TAMMA = """لا طلبَ على المقرّر رقم {cid} الآن: مرحلتاه ① و② مضتا.

وما بعدهما (الأسئلة والبطاقات) يُطلب منك طلباً مستقلّاً حين يأتي دورُه.
"""

# 🔑 والنصوصُ القائمةُ لا تُنسخ هنا كغيرها: العنوانُ هويّةُ النصّ في درسه، وعنوانٌ
#    منسوخٌ في طلبٍ يتعفّن بأوّل تصحيح. ⇒ تُقرأ حيّةً من `course_state` (181) —
#    بالجملتين نفسَيهما اللتين تقرأ بهما طلباتُ الاختبار (`R4.3`).
NUSUS = """استعمل مهارة bayan-authoring-contract والتزم بها حرفاً — وقسمَها ⑭
«نصوص القراءة» خاصّةً.

اقرأ حالةَ المقرّر رقم {cid} من القاعدة — لا من ملفّ — على Supabase
(المشروع `tjzrfevymfpktfuormhs`):

```sql
select set_config('request.jwt.claims',
  '{{"sub":"{author}","role":"authenticated"}}',
  true) is not null as ok;

select course_state({cid});
```

ومنها دروسُ المقرّر بمفاتيحها (`key`) وعناوينها، **والنصوصُ القائمةُ في كلّ درسٍ
بعناوينها** (`texts`). وهي الحَكَم — ولا تنسخ شيئاً منها من هذه الرسالة.
فإن ردّت `"ok": false` فقف، وانقل سطرَ الخطأ كما هو.

المطلوب: نصوصُ القراءة {nitaq} — كلُّ نصٍّ في درسه، **كما في الكتاب حرفاً**.
ملفٌّ واحدٌ للمقرّر، JSON بلا شرحٍ حوله.
واحفظه في bayan-content/texts/{fname}

والنصُّ القائمُ يُعاد بعنوانه في `texts` حرفاً — فالعنوانُ هويّتُه، وعنوانٌ مختلفٌ
يُنشئ نصّاً ثانياً بجواره. ودرسٌ لا نصَّ له في الكتاب يُترك خارج الملفّ.

الكتابُ عندك. انقل منه ولا تؤلّف — فإن لم يكن عندك فقف واطلبه.
"""

UUID = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')


def note_of(notes, name):
    p = os.path.join(notes, name)
    if os.path.exists(p):
        note = open(p, encoding='utf-8').read().strip()
        if note:
            return '\nملاحظة: ' + note + '\n'
    return ''


def texts_main(a):
    """«الطريقُ الحيّ»: الفهرسُ يقول لمن يُكتب، و`projects.txt` يقول أين."""
    if not a.catalog or not a.author:
        print('🔴 --texts يحتاج --catalog و--author'); sys.exit(1)
    if not UUID.match(a.author):
        print(f'🔴 --author ليس هويّةً صالحة: {a.author}'); sys.exit(1)
    if not os.path.exists(a.projects):
        print(f'🔴 لا {a.projects} — وفيه مجلّدُ كلّ مقرّر'); sys.exit(1)
    cat = {c['course_id']: c for c in json.load(open(a.catalog, encoding='utf-8'))['courses']}
    root = a.root or os.path.dirname(os.path.abspath(a.catalog))

    rows = projects(a.projects)
    if a.course:
        only = {int(x) for x in a.course.replace('،', ',').split(',') if x.strip()}
        rows = [r for r in rows if r[0] in only]
        absent = only - {r[0] for r in rows}
        if absent:
            print('🔴 مقرّراتٌ ليست في projects.txt — ولا مجلّدَ لها: '
                  + '، '.join(map(str, sorted(absent)))); sys.exit(1)
    missing = {r[0] for r in rows} - set(cat)
    if missing:
        print('🔴 مقرّراتٌ ليست في الفهرس: ' + '، '.join(map(str, sorted(missing)))
              + ' — أعِد توليده بـtools/catalog.sql'); sys.exit(1)

    made, skipped, noted = [], [], False
    for cid, folder in rows:
        c = cat[cid]
        if not folder:
            skipped.append(f'{cid} · {c["subject"]} — بلا مجلّدٍ في projects.txt')
            continue
        if not c.get('level'):
            skipped.append(f'{cid} · {c["subject"]} — بلا صفٍّ ولا مستوى')
            continue
        if not c['lessons'] or c['keyed'] < c['lessons']:
            skipped.append(f'{cid} · {c["subject"]} — مرحلتُه ① لم تمضِ، ودرسٌ بلا مفتاحٍ لا نصَّ له')
            continue
        fname = f'{cid}-{c["subject_code"]}.json'
        # رقمُه ثابتٌ للمقرّر: الملفُّ واحدٌ يُعاد بعد كلّ تصحيح، فالمهمّةُ هي هي
        rid = f'R{cid}.T'
        txt = RAQM.format(rid=rid) + NUSUS.format(
            cid=cid, author=a.author, nitaq=nitaq(c.get('level')), fname=fname)
        note = note_of(a.notes, f'{cid}.texts.txt')
        noted = noted or bool(note)
        txt += note

        nt, nl = c['texts'], c['lessons_with_texts']
        line = (f'> نصوص القراءة · حالةُ المقرّر لحظةَ الفهرس: '
                f'{adad(c["lessons"], "درس", "درسان", "دروس", "درساً")} · '
                + (f'{adad(nt, "نصّ قائم", "نصّان قائمان", "نصوص قائمة", "نصّاً قائماً")} في '
                   f'{adad(nl, "درس", "درسين", "دروس", "درساً")}' if nt
                   else 'لا نصَّ قائماً بعد') + '.\n\n---\n\n')
        out = os.path.join(root, folder, 'requests')
        os.makedirs(out, exist_ok=True)
        p = os.path.join(out, f'{cid}-{c["subject_code"]}.texts.md')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(f'# {c["title"]}  ·  المقرّر {cid}\n\n'
                    f'> يُنسخ ما تحت الخطّ كما هو إلى مشروع المادة.\n' + line)
            f.write(txt)
        made.append(f'{cid} · {c["subject"]} — {folder} · {c["lessons"]} درساً')

    print(f'✓ كُتب {len(made)} طلباً في {root}')
    for m in made:    print('   ', m)
    if skipped:
        print(f'\n⚪ تُركت {len(skipped)} — ولا يُرسَل طلبٌ لا يُعمل به:')
        for s in skipped: print('   ', s)
    if not noted:
        print(f'\n⚪ ولا ملاحظةَ تربويّةً واحدة في {a.notes} — '
              'وهي الشيءُ الوحيد الذي لا يُشتقّ. اكتبها حين تعرفها.')


def main():
    ap = argparse.ArgumentParser(description='توليدُ طلبات التأليف — بيان')
    ap.add_argument('--state', help='ملفُّ الحالة — لطلب المرحلة')
    ap.add_argument('--out', help='مجلدُ الخَرْج (الافتراض: requests/ بجوار state/)')
    ap.add_argument('--course', help='مقرّرٌ واحدٌ أو عدّةٌ بفواصل: 2,4,8')
    ap.add_argument('--all', action='store_true',
                    help='كلُّ المقرّرات — وتُهمَل projects.txt')
    ap.add_argument('--notes', default=os.path.join(os.path.dirname(__file__), 'notes'))
    ap.add_argument('--projects', default=os.path.join(os.path.dirname(__file__), 'projects.txt'))
    ap.add_argument('--texts', action='store_true',
                    help='طلبُ نصوص القراءة بدل طلب المرحلة (العقد · ⑭) — حيٌّ من course_state')
    ap.add_argument('--catalog', help='فهرسُ المقرّرات (tools/catalog.sql) — لطلب النصوص')
    ap.add_argument('--author', help='هويّةُ مطالب course_state — لطلب النصوص')
    ap.add_argument('--root', help='مجلّدُ bayan-content (الافتراض: مجلّدُ الفهرس)')
    a = ap.parse_args()

    if a.texts:
        return texts_main(a)
    if not a.state:
        print('🔴 --state لازمٌ لطلب المرحلة'); sys.exit(1)

    state = json.load(open(a.state, encoding='utf-8'))
    out = a.out or os.path.join(os.path.dirname(os.path.dirname(a.state)), 'requests')
    os.makedirs(out, exist_ok=True)

    rows = state['courses']

    want = None
    if a.course:
        want = {int(x) for x in a.course.replace('،', ',').split(',') if x.strip()}
    elif not a.all and os.path.exists(a.projects):
        # الطلبُ لا يُكتب إلا لمقرّرٍ له مشروعٌ يقرؤه — والقائمةُ بيد الإنسان.
        # ومن سطوره ما وافق مجلّدَ ملفّ الحالة وحده (أو ما لا مجلّدَ له)
        here = os.path.basename(os.path.dirname(os.path.dirname(os.path.abspath(a.state))))
        want = {cid for cid, folder in projects(a.projects) if folder in (None, here)}
        if not want:
            print(f'🔴 {a.projects} بلا رقمِ مقرّرٍ واحد لمجلّد «{here}»'); sys.exit(1)

    if want is not None:
        missing = want - {c['course_id'] for c in rows}
        if missing:
            print('🔴 مقرّراتٌ ليست في ملفّ الحالة: '
                  + '، '.join(map(str, sorted(missing)))); sys.exit(1)
        rows = [c for c in rows if c['course_id'] in want]

    made, skipped = [], []
    for c in rows:
        cid = c['course_id']
        if not c.get('level'):
            skipped.append(f'{cid} · {c["subject"]} — بلا صفٍّ ولا مستوى')
            continue
        fname = f'{cid}-{c["subject_code"]}.json'
        m = marhala(c)
        # رقمُ الطلب: المقرّرُ ومرحلتُه. ثابتٌ ما دامت المهمّةُ هي هي، ويتغيّر
        # حين تتغيّر المهمّة — فيُقاس «منجَزٌ أم جديد» بمقارنةٍ لا باجتهاد.
        rid = f'R{cid}.{m}'
        if m == 1:
            txt = RAQM.format(rid=rid) + QALIB.format(
                cid=cid, nitaq=nitaq(c.get('level')), fname=fname)
        elif m == 2:
            txt = RAQM.format(rid=rid) + THANIYA.format(cid=cid, fname=fname)
        else:
            txt = TAMMA.format(cid=cid)

        # لكلّ مرحلةٍ ملاحظتُها: `<cid>.txt` للدروس، و`<cid>.2.txt` للأهداف.
        # فملاحظةُ تقسيم الدروس لا تُلحَق بطلب فهرسٍ، ولا العكس.
        if m in (1, 2):
            txt += note_of(a.notes, f'{cid}.txt' if m == 1 else f'{cid}.2.txt')

        p = os.path.join(out, f'{cid}-{c["subject_code"]}.md')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(f'# {c["title"]}  ·  المقرّر {cid}\n\n'
                    f'> يُنسخ ما تحت الخطّ كما هو إلى مشروع المادة.\n'
                    f'> المرحلة {"①" if m == 1 else "②" if m == 2 else "—"} · '
                    f'حالةُ المقرّر الآن: {len(c["lessons"])} درساً · '
                    f'{len(c["strands"])} فرعاً · {len(c["units"])} وحدة · '
                    f'{len(c.get("objectives_index") or [])} هدفاً في المادة.\n\n---\n\n')
            f.write(txt)
        made.append(f'{cid} · {c["subject"]} — المرحلة {m} · {len(c["lessons"])} درساً')

    print(f'✓ كُتب {len(made)} طلباً في {out}')
    for m in made:    print('   ', m)
    if skipped:
        print(f'\n⚪ تُركت {len(skipped)} — ولا يُرسَل طلبُ مقرّرٍ بلا صفّ:')
        for s in skipped: print('   ', s)
    if not any(os.path.exists(os.path.join(a.notes, f'{c["course_id"]}.txt')) for c in rows):
        print(f'\n⚪ ولا ملاحظةَ تربويّةً واحدة في {a.notes} — '
              'وهي الشيءُ الوحيد الذي لا يُشتقّ. اكتبها حين تعرفها.')


if __name__ == '__main__':
    main()
