#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
بيان — tools/make_requests.py  ·  يكتب طلبَ كلّ مقرّر في مرحلته

    python3 tools/make_requests.py --state ../bayan-content/state/courses.json
    python3 tools/make_requests.py --state … --course 2        # مقرّرٌ واحد

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
"""

import argparse, json, os, sys

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


def nitaq(level):
    """«الفصل الدراسيّ الأول» للصفوف، و«كاملاً» للمسارات والمستويات."""
    if not level:
        return 'كاملةً'
    return 'للفصل الدراسيّ الأول كاملاً' if 'الصف' in level else f'لـ«{level}» كاملاً'


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


def main():
    ap = argparse.ArgumentParser(description='توليدُ طلبات التأليف — بيان')
    ap.add_argument('--state', required=True)
    ap.add_argument('--out', help='مجلدُ الخَرْج (الافتراض: requests/ بجوار state/)')
    ap.add_argument('--course', help='مقرّرٌ واحدٌ أو عدّةٌ بفواصل: 2,4,8')
    ap.add_argument('--all', action='store_true',
                    help='كلُّ المقرّرات — وتُهمَل projects.txt')
    ap.add_argument('--notes', default=os.path.join(os.path.dirname(__file__), 'notes'))
    ap.add_argument('--projects', default=os.path.join(os.path.dirname(__file__), 'projects.txt'))
    a = ap.parse_args()

    state = json.load(open(a.state, encoding='utf-8'))
    out = a.out or os.path.join(os.path.dirname(os.path.dirname(a.state)), 'requests')
    os.makedirs(out, exist_ok=True)

    rows = state['courses']

    want = None
    if a.course:
        want = {int(x) for x in a.course.replace('،', ',').split(',') if x.strip()}
    elif not a.all and os.path.exists(a.projects):
        # الطلبُ لا يُكتب إلا لمقرّرٍ له مشروعٌ يقرؤه — والقائمةُ بيد الإنسان
        want = set()
        for line in open(a.projects, encoding='utf-8'):
            head = line.split('#', 1)[0].strip()
            if head:
                want.add(int(head))
        if not want:
            print(f'🔴 {a.projects} بلا رقمِ مقرّرٍ واحد'); sys.exit(1)

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
        np = os.path.join(a.notes, f'{cid}.txt' if m == 1 else f'{cid}.2.txt')
        if m in (1, 2) and os.path.exists(np):
            note = open(np, encoding='utf-8').read().strip()
            if note:
                txt += '\nملاحظة: ' + note + '\n'

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
