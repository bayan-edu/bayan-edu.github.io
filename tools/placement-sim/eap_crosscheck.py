"""Witness for sql/212: the estimate in SQL (placement_eap) must equal this one.

Same formula, same grid: theta from -4 to 13.6 in steps of 0.05 (353 points) · item difficulty b = 0.4 x band ·
P(point) = c + (1 - c) / (1 + exp(-(theta - b))) · every point of an item is one trial (s of m) · a normal prior ·
EAP and its SD · band = floor((EAP - ln 3) / 0.4), clipped to 0..24 (ln 3 = the 75% point).
Prints the scenarios as JSON for the dry run: python eap_crosscheck.py > eap_cases.json"""
import json, math, numpy as np

GRID = -4 + 0.05 * np.arange(353)
LN3 = math.log(3)

def eap(items, mean, sd):
    ll = np.zeros_like(GRID)
    for it in items:
        p = it['c'] + (1 - it['c']) / (1 + np.exp(-(GRID - it['b'])))
        ll += it['s'] * np.log(p) + (it['m'] - it['s']) * np.log(1 - p)
    ll -= 0.5 * ((GRID - mean) / sd) ** 2
    w = np.exp(ll - ll.max())
    e = float((GRID * w).sum() / w.sum())
    s = float(math.sqrt(((GRID - e) ** 2 * w).sum() / w.sum()))
    return {'eap': round(e, 6), 'sd': round(s, 6), 'band': int(min(24, max(0, math.floor((e - LN3) / 0.4))))}

def prior(entry): return 0.4 * entry + LN3 + 0.2, 3.0          # the tier, centred on its entry band

def mk(bands, c, m, s): return [{'b': round(0.4 * b, 6), 'c': c, 'm': m, 's': s} for b in bands]

rng = np.random.default_rng(212)
def reader(theta, bands):
    out = []
    for b in bands:
        for _ in range(3):
            mc = rng.random() < 0.5; c = (1/3 if b <= 8 else 1/4) if mc else 0.05
            p = c + (1 - c) / (1 + math.exp(-(theta - 0.4 * b)))
            out.append({'b': round(0.4 * b, 6), 'c': round(c, 6), 'm': 1, 's': int(rng.random() < p)})
    return out

cases = []
def add(name, items, entry):
    m, s = prior(entry); cases.append({'name': name, 'items': items, 'mean': round(m, 6), 'sd': s, 'expect': eap(items, m, s)})

add('no answers — the prior alone (M4)', [], 13)
add('all correct at R12-R14', mk([12]*3 + [13]*3 + [14]*3, 0.25, 1, 1), 13)
add('all wrong at R18-R20', mk([18]*3 + [19]*3 + [20]*3, 0.25, 1, 0), 13)
th10 = 0.4 * 10 + LN3 + 0.2
add('a reader at R10 entering R13 (27 items)', reader(th10, [12, 13, 14, 9, 10, 11, 9, 10, 11]), 13)
add('partial credit — judge 0-2 and ordering 0-4',
    mk([13], 0.25, 2, 2) + mk([14], 0.25, 2, 1) + mk([15], 0.25, 2, 0) + mk([13], 0.2, 4, 3) + mk([14], 0.2, 4, 1), 13)
add('all correct at the ceiling R22-R24', mk([22]*3 + [23]*3 + [24]*3, 0.25, 1, 1), 13)
add('M1 — a young reader around R2', reader(0.4 * 2 + LN3 + 0.2, [2, 3, 4, 1, 2, 3]), 3)
print(json.dumps(cases, ensure_ascii=False))
