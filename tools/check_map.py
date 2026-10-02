#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
بيان — tools/check_map.py  ·  فحصُ ملفّ المرحلة ① قبل أن يلمس القاعدة

    python3 tools/check_map.py ../bayan-content/maps/2-eg_ara.json

وبمقابلةِ الحالة (مستحسَن — وهو ما يكشف أخطرَ الأخطاء):

    python3 tools/check_map.py ../bayan-content/maps/2-eg_ara.json \
            --state ../bayan-content/state/courses.json

ما يفعله: الفحوصُ **الآلية** في عقد التأليف (الصيغ · التكرار · التسلسل ·
الوسم · مقابلةُ الدروس القائمة). يُرجع 0 إن سلم، و1 إن وُجد خطأ.

وما لا يفعله — ويُقال كي لا يُحسب مفحوصاً:
  · لا يحكم على **سلامة التقسيم** تربوياً. ذاك عملُ قارئٍ لا سكربت.
  · ولا يُغني عن التجربة الجافّة: القاعدةُ وحدها تعرف حالَها لحظةَ الاستيراد.

🔑 والعلّة: كلُّ خطأ هنا يُكتشف **قبل** نداء القاعدة، فيُردّ الملفُّ إلى
مؤلّفه بسطرٍ واضح — لا بعد أن يهبط نصفُه.
"""

import argparse, json, re, sys, unicodedata
from collections import Counter

KEY_RE    = re.compile(r'^[A-Za-z0-9_.-]{2,40}$')   # مفتاح الدرس
STRAND_RE = re.compile(r'^[A-Z][A-Z0-9_]{0,11}$')   # كود الفرع — كما في save_strand
LESSON_NO = re.compile(r'^\s*الدرس\s+(الأول|الثاني|الثالث|الرابع|الخامس|رقم|\d)')

err, warn, note = [], [], []
E = err.append; W = warn.append; N = note.append


def norm_ar(s):
    """تطبيعٌ تقريبيّ للمقارنة — والقاعدة (norm_ar) هي الحاكمة عند الاستيراد."""
    s = unicodedata.normalize('NFKC', str(s))
    s = re.sub(r'[ً-ْٰـ]', '', s)          # تشكيل وتطويل
    s = (s.replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا')
          .replace('ى', 'ي').replace('ة', 'ه'))
    return re.sub(r'\s+', ' ', s).strip()


def check_file(d):
    """فحوصُ الملفّ في نفسه — لا تحتاج قاعدةً ولا حالة."""
    for f in ('subject', 'level', 'lessons'):
        if not d.get(f):
            E(f'الملفّ: الحقل «{f}» مفقود')
    if not d.get('source'):
        W('الملفّ: `source` فارغ — ومن أين بُني التقسيم؟')
    for bad in ('objectives', 'headings'):
        if bad in d:
            E(f'الملفّ فيه «{bad}» — الأهدافُ مرحلةٌ ثانية، لا تُخلط')

    st = d.get('strands') or []
    ls = d.get('lessons') or []
    if not isinstance(st, list): E('`strands` تُرسل قائمةً أو لا تُرسل'); st = []
    if not isinstance(ls, list): E('`lessons` ليست قائمة'); return [], []

    # ── الفروع ──
    codes = []
    for i, s in enumerate(st, 1):
        c, n = s.get('code'), s.get('name')
        if not c or not STRAND_RE.match(str(c)):
            E(f'فرع {i}: الكود «{c}» مخالفٌ للصيغة (حروف لاتينية كبيرة حتى ١٢، بلا نقطةٍ ولا شَرطة)')
        else:
            codes.append(c)
        if not n:
            E(f'فرع {i}: الاسم مفقود')
    for c, k in Counter(codes).items():
        if k > 1: E(f'كودُ فرعٍ مكرَّرٌ في الملفّ: {c}')
    for nm, k in Counter(norm_ar(s['name']) for s in st if s.get('name')).items():
        if k > 1: E(f'اسمُ فرعٍ مكرَّرٌ في الملفّ (بعد التطبيع): {nm}')

    parents = {s.get('parent') for s in st if s.get('parent')}
    for i, s in enumerate(st, 1):
        p = s.get('parent')
        if p and p not in codes:
            E(f'فرع {i}: الفرع الأعلى «{p}» ليس في الملفّ — فإن كان في القاعدة فستقبله، وإلا تُردّ الدفعة')
        if p and any(x.get('code') == p and x.get('parent') for x in st):
            E(f'فرع {i}: العمق طبقتان — «{p}» فرعٌ لغيره')

    # ── الدروس ──
    keys, orders = [], []
    for l in ls:
        i = l.get('order', '?')
        k, t = l.get('key'), l.get('title')
        if not k or not KEY_RE.match(str(k)):
            E(f'سطر {i}: المفتاح «{k}» مفقودٌ أو مخالفٌ للصيغة')
        else:
            keys.append(k)
        if not t:
            E(f'سطر {i}: العنوان مفقود')
        elif LESSON_NO.match(str(t)):
            W(f'سطر {i}: العنوان «{t}» يبدأ بـ«الدرس …» — العنوانُ يقول ما في الدرس')
        o = l.get('order')
        if not isinstance(o, int):
            E(f'الدرس «{k}»: الترتيب مفقودٌ أو ليس رقماً')
        else:
            orders.append(o)
        s = l.get('strand')
        if s and s not in codes:
            W(f'سطر {i}: الفرع «{s}» ليس في `strands` — يلزم أن يكون مكتوباً في القاعدة سابقاً')
        if s and s in parents:
            E(f'سطر {i}: الفرع «{s}» له فروعٌ تحته — يُوسَم أصغرُ ما لا ينقسم')

    for k, n in Counter(keys).items():
        if n > 1: E(f'مفتاحٌ مكرَّرٌ في الملفّ: {k}')
    if orders and sorted(orders) != list(range(1, len(ls) + 1)):
        miss = sorted(set(range(1, len(ls) + 1)) - set(orders))
        dup  = [o for o, n in Counter(orders).items() if n > 1]
        E(f'الترتيب غيرُ متسلسلٍ من ١ إلى {len(ls)} — ناقص: {miss or "لا شيء"} · مكرَّر: {dup or "لا شيء"}')

    if st and all(not l.get('strand') for l in ls):
        N('فروعٌ مكتوبةٌ ولا درسَ موسوم — صحيحٌ في الإنجليزية والفرنسية (الوسمُ على المكوّن)، وإلا فسهو')
    if not st and any(l.get('strand') for l in ls):
        E('دروسٌ موسومةٌ ولا `strands` في الملفّ — فإن لم تكن الفروعُ في القاعدة تُردّ الدفعة')
    return codes, ls


def check_against_state(d, ls, codes, state_path, course_id):
    """مقابلةُ الحالة — وهنا تُكتشف أخطرُ الأخطاء: ما يُيتِّم أسئلةً حيّة."""
    state = json.load(open(state_path, encoding='utf-8'))
    blocks = {c['course_id']: c for c in state['courses']}
    if course_id is None:
        cand = [c for c in state['courses']
                if c['subject'] == d.get('subject') and c.get('level') == d.get('level')]
        if len(cand) != 1:
            E(f'تعذّر تمييزُ المقرّر من «{d.get("subject")} · {d.get("level")}» — مرّر --course')
            return
        course_id = cand[0]['course_id']
    if course_id not in blocks:
        E(f'المقرّر {course_id} ليس في ملفّ الحالة'); return
    b = blocks[course_id]
    N(f'المقابلةُ على المقرّر {course_id} — {b["title"]}')
    if b['subject'] != d.get('subject'):
        E(f'المادة في الملفّ «{d.get("subject")}» وفي المقرّر «{b["subject"]}»')

    matched = []
    db_by_id  = {l['id']: l for l in b['lessons']}
    db_by_key = {l['key']: l for l in b['lessons'] if l.get('key')}

    for l in ls:
        ex, k = l.get('existing_id'), l.get('key')
        if ex is not None:
            if ex not in db_by_id:
                E(f'الدرس {ex}: ليس في هذا المقرّر'); continue
            cur = db_by_id[ex]
            if cur['title'] != l.get('title'):
                E(f'الدرس {ex}: العنوان يخالف القاعدة حرفاً — ولا يُعاد صياغتُه\n'
                  f'      القاعدة: {cur["title"]}\n      الملفّ  : {l.get("title")}')
            if cur.get('key') and cur['key'] != k:
                E(f'الدرس {ex}: يحمل المفتاح «{cur["key"]}» ولا يقبل «{k}» — المفتاحُ لا يتغيّر')
        elif k in db_by_key:
            cur = db_by_key[k]
            matched.append(f'{k}→{cur["id"]}')
            if cur['title'] != l.get('title'):
                W(f'الدرس {cur["id"]} («{k}»): العنوانُ مختلف — لن يُغيَّر إلا بـp_allow_retitle')

    if matched:
        N(f'{len(matched)} درساً يطابق مفتاحُه درساً في القاعدة ⇒ سيُحدَّث لا يُنشأ'
          + ('' if len(matched) > 6 else ': ' + ' · '.join(matched)))

    # دروسٌ قائمةٌ غائبةٌ عن الملفّ — تُبلَّغ ولا تُمَسّ
    seen_ids  = {l.get('existing_id') for l in ls if l.get('existing_id')}
    seen_keys = {l.get('key') for l in ls}
    for l in b['lessons']:
        if l['id'] not in seen_ids and l.get('key') not in seen_keys:
            (W if l.get('questions') else N)(
                f'الدرس {l["id"]} «{l["title"][:45]}» قائمٌ وليس في الملفّ '
                f'({l.get("questions", 0)} سؤالاً) — لن يُمَسّ')

    # الفروع
    db_codes = {s['code']: s for s in b['strands']}
    db_parents = {s['parent'] for s in b['strands'] if s.get('parent')}
    for l in ls:
        s = l.get('strand')
        if s and s not in codes and s not in db_codes:
            E(f'الدرس «{l.get("key")}»: الفرع «{s}» ليس في الملفّ ولا في القاعدة')
    for s in (d.get('strands') or []):
        c, p = s.get('code'), s.get('parent')
        if c in db_codes and norm_ar(db_codes[c]['name']) != norm_ar(s.get('name', '')):
            N(f'الفرع {c}: الاسمُ سيُحدَّث — «{db_codes[c]["name"]}» ⇒ «{s.get("name")}»')
        if p and p in db_codes:
            used = [l['id'] for l in b['lessons'] if l.get('strand') == p]
            if used:
                E(f'الفرع «{p}» موسومٌ به {len(used)} درساً ({used[:4]}…) فلا يصير أباً لـ«{c}» — '
                  f'انقل وسمَ دروسه أوّلاً')
        if c in db_parents and any(l.get('strand') == c for l in ls):
            E(f'الفرع «{c}» له فروعٌ في القاعدة — ولا يُوسَم به درس')
    for s in b['strands']:
        if codes and s['code'] not in codes:
            W(f'الفرع {s["code"]} («{s["name"]}») قائمٌ وليس في الملفّ — لن يُمَسّ')

    # الوحدات
    db_units = {u['title'] for u in b['units']}
    for t in sorted({l.get('unit') for l in ls if l.get('unit')}):
        if t not in db_units:
            close = [u for u in db_units if norm_ar(u) == norm_ar(t)]
            if close:
                E(f'الوحدة «{t}» تشبه القائمة «{close[0]}» ولا تطابقها حرفاً ⇒ ستُنشأ وحدةٌ ثانية')
            else:
                N(f'وحدةٌ جديدة ستُنشأ: {t}')


def main():
    ap = argparse.ArgumentParser(description='فحصُ ملفّ المرحلة ① — بيان')
    ap.add_argument('map_file')
    ap.add_argument('--state', help='مسار state/courses.json للمقابلة')
    ap.add_argument('--course', type=int, help='رقم المقرّر (يُستنتج من المادة والصفّ إن تُرك)')
    a = ap.parse_args()

    try:
        d = json.load(open(a.map_file, encoding='utf-8'))
    except json.JSONDecodeError as e:
        print(f'🔴 JSON مكسور — سطر {e.lineno} عمود {e.colno}: {e.msg}'); sys.exit(1)

    codes, ls = check_file(d)
    if a.state and ls:
        check_against_state(d, ls, codes, a.state, a.course)
    elif ls:
        N('بلا --state: لم تُقابَل الدروسُ القائمة ولا الفروعُ المكتوبة — وهو أخطرُ ما يُفحَص')

    print(f'\n{d.get("subject")} · {d.get("level")} · {len(ls)} درساً · '
          f'{len(d.get("strands") or [])} فرعاً\n' + '─' * 60)
    for t, items, mark in (('خطأ', err, '🔴'), ('تحذير', warn, '🟡'), ('ملاحظة', note, '⚪')):
        for m in items:
            print(f'{mark} {t}: {m}')
    print('─' * 60)
    if err:
        print(f'🔴 {len(err)} خطأ — يُردّ الملفُّ إلى مؤلّفه. ولا يُصلَح من عندنا.')
        sys.exit(1)
    print(f'✓ سليمٌ آلياً ({len(warn)} تحذير · {len(note)} ملاحظة).')
    print('  ويبقى اثنان لا يفحصهما سكربت: سلامةُ التقسيم تربوياً، والتجربةُ الجافّة على القاعدة.')


if __name__ == '__main__':
    main()
