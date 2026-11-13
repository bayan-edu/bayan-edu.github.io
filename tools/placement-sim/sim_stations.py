"""Bayan placement — station designs before calibration (owner's proposal, 13 Nov 2026).

Same generative model as the Reading project's test-blueprint §9 (simulation/sim_design2.py):
bands 0.4 logits apart · item difficulty spread 0.5 around its band · passage (testlet) effect 0.3 ·
75% criterion · half the items multiple choice (3 options to R8, 4 from R9) with guessing, the rest 5%.
What differs: no word-list router (the first station routes), three passages of three items per station,
and every decision is a rule a database can compute without calibrated item difficulties.

Designs
  A  one band per station: three passages at band k (9 items). Pass = 7/9. Step up/down (3, 2, 1, then halve)
     until a pass at k and a fail at k+1 bracket the reader. Conservative: highest pass below the lowest fail.
  B  three bands per station: one passage at k-1, k, k+1. Route on the total: >=7 up 3 bands, <=4 down 3, 5-6 stop.
     B-low places at k-1 on stopping (the owner's "lowest of the three"), B-mid at k.
  C  three bands per station routed and decided by "nominal Rasch": every item's difficulty is its band centre
     (no calibration), guessing corrected for multiple choice by format; final band from all items (EAP).
  D  hybrid: a broad first station (m-3, m, m+3) -> nominal-Rasch estimate -> one-band station at that band ->
     one-band station a band up or down -> bracket.
Each is also reported with the safeguard "-1 at the decision".
"""
import numpy as np, sys

B = 24; S = 0.4; RP = 0.75; OFF = np.log(RP / (1 - RP))
CENTRE = np.arange(1, B + 1) * S
CUTS = CENTRE + OFF                       # a reader at band k reaches 75% on band-k passages
ITEM_SD = 0.5; TESTLET_SD = 0.3; IPP = 3; C_OTHER = 0.05
GRID = np.linspace(CENTRE[0] - 4, CENTRE[-1] + 4, 400)

def c_mc(k): return 1/3 if k <= 8 else 1/4
def band_of(th): return int(np.searchsorted(CUTS, th, side='right'))       # 0 (pre-reading) .. 24
def words(k): return 80 if k <= 5 else 160 if k <= 9 else 250            # excerpts, not full texts

class Reader:
    def __init__(self, th, rng): self.th = th; self.rng = rng; self.b = []; self.c = []; self.x = []; self.min = 0.0
    def passage(self, k):
        rng = self.rng; k = int(np.clip(k, 1, B))
        b = CENTRE[k - 1] + rng.normal(0, ITEM_SD, IPP); u = rng.normal(0, TESTLET_SD)
        nmc = 1 + int(rng.random() < 0.5)                                  # half the items MC on average
        c = np.r_[np.full(nmc, c_mc(k)), np.full(IPP - nmc, C_OTHER)]
        p = c + (1 - c) / (1 + np.exp(-(self.th + u - b)))
        x = rng.random(IPP) < p
        self.b += [CENTRE[k - 1]] * IPP; self.c += list(c); self.x += list(x)   # scored with the NOMINAL difficulty
        self.min += words(k) / 110 + IPP * 0.75
        return int(x.sum())
    def eap(self, mean, sd=1.6):
        b = np.array(self.b); c = np.array(self.c); x = np.array(self.x)
        p = c[None, :] + (1 - c[None, :]) / (1 + np.exp(-(GRID[:, None] - b[None, :])))
        ll = np.where(x[None, :], np.log(p), np.log(1 - p)).sum(1) - 0.5 * ((GRID - mean) / sd) ** 2
        w = np.exp(ll - ll.max()); return float((GRID * w).sum() / w.sum())

def design_A(r, m, C, max_st):
    passed, failed = set(), set(); k = m; up = dn = 0; steps = (3, 2, 1)
    for st in range(max_st):
        (passed if sum(r.passage(k) for _ in range(3)) >= 7 else failed).add(k)
        fmin = min(failed) if failed else None
        pb = max([p for p in passed if fmin is None or p < fmin], default=None)
        if fmin is not None and pb is not None and fmin - pb == 1: break
        if fmin is None and pb == C: break
        if pb is None and fmin == 1: break
        if fmin is None:   k = min(C, pb + steps[min(up, 2)]); up += 1
        elif pb is None:   k = max(1, fmin - steps[min(dn, 2)]); dn += 1
        else:              k = (pb + fmin) // 2
    fmin = min(failed) if failed else None
    pb = max([p for p in passed if fmin is None or p < fmin], default=None)
    return min(C, pb if pb is not None else (fmin - 1 if fmin else 0))

def design_B(r, m, C, max_st, stop):
    k = int(np.clip(m, 2, C - 1))
    for st in range(1, max_st + 1):
        tot = sum(r.passage(b) for b in (k - 1, k, k + 1))
        if tot >= 7:
            if k + 1 >= C or st == max_st: return min(k + 1, C)
            k = min(k + 3, C - 1); continue
        if tot <= 4:
            if k - 1 <= 1 or st == max_st: return max(k - 2, 0)
            k = max(k - 3, 2); continue
        return k - 1 if stop == 'low' else k
    return k

def design_C(r, m, C, n_st):
    k = int(np.clip(m, 2, C - 1)); prior = CUTS[m - 1] + S / 2
    for _ in range(n_st):
        k = int(np.clip(k, 2, C - 1)); [r.passage(b) for b in (k - 1, k, k + 1)]
        k = band_of(r.eap(prior))
    return min(band_of(r.eap(prior)), C)

def design_D(r, m, C):
    lo, hi = max(1, m - 3), min(C, m + 3)
    [r.passage(b) for b in (lo, m, hi)]
    k = int(np.clip(band_of(r.eap(CUTS[m - 1] + S / 2)), 1, C))
    if sum(r.passage(k) for _ in range(3)) >= 7:
        if k == C: return C
        return k + 1 if sum(r.passage(k + 1) for _ in range(3)) >= 7 else k
    if k == 1: return 0
    return k - 1 if sum(r.passage(k - 1) for _ in range(3)) >= 7 else k - 2

DESIGNS = {
    'A  one band, up to 3 stations':          lambda r, m, C: design_A(r, m, C, 3),
    'A  one band, up to 4 stations':          lambda r, m, C: design_A(r, m, C, 4),
    'B  three bands, stop -> lowest':         lambda r, m, C: design_B(r, m, C, 3, 'low'),
    'B  three bands, stop -> middle':         lambda r, m, C: design_B(r, m, C, 3, 'mid'),
    'C  three bands, nominal Rasch, 2 st.':   lambda r, m, C: design_C(r, m, C, 2),
    'C  three bands, nominal Rasch, 3 st.':   lambda r, m, C: design_C(r, m, C, 3),
    'D  broad, then one band, then +-1':      lambda r, m, C: design_D(r, m, C),
}

def readers(kind, n, rng):
    if kind == 'M4 realistic':  tb = np.clip(np.rint(rng.normal(13, 3.5, n)), 0, 24)
    elif kind == 'M4 spread':   tb = rng.integers(1, 25, n).astype(float)
    elif kind == 'M2 realistic':tb = np.clip(np.rint(rng.normal(8, 3, n)), 0, 20)
    lo = np.where(tb == 0, CUTS[0] - S, CUTS[np.maximum(tb.astype(int) - 1, 0)])
    return lo + rng.random(n) * S

def run(kind, m, C, n=4000, seed=7):
    print(f"\n### {kind} — entry R{m}, ceiling R{C} — {n} readers")
    print(f"{'design':40} {'exact':>6} {'±1':>6} {'over1+':>7} {'over2+':>7} {'under2+':>8} {'bias':>6} {'min':>5} | with -1: {'±1':>5} {'over1+':>7} {'over2+':>7} {'under2+':>8} {'safe':>5}")
    for name, f in DESIGNS.items():
        rng = np.random.default_rng(seed); th = readers(kind, n, rng)
        tb = np.minimum(np.array([band_of(t) for t in th]), C)
        pl = np.empty(n, int); mins = np.empty(n)
        for i in range(n):
            r = Reader(th[i], rng); pl[i] = f(r, m, C); mins[i] = r.min
        e = pl - tb; e1 = np.maximum(pl - 1, 0) - tb
        safe = np.mean((e1 <= 0) & (e1 >= -2))           # with -1: not above instructional, at most 2 below
        print(f"{name:40} {np.mean(e==0):6.2f} {np.mean(abs(e)<=1):6.2f} {np.mean(e>=1):7.2f} {np.mean(e>=2):7.2f} {np.mean(e<=-2):8.2f} "
              f"{e.mean():+6.2f} {mins.mean():5.0f} | {np.mean(abs(e1)<=1):9.2f} {np.mean(e1>=1):7.2f} {np.mean(e1>=2):7.2f} {np.mean(e1<=-2):8.2f} {safe:5.2f}")

def consistency(kind, m, C, n=3000, seed=11):
    print(f"\n### decision consistency — {kind}: two sittings, fresh passages each time")
    for name, f in DESIGNS.items():
        rng = np.random.default_rng(seed); th = readers(kind, n, rng)
        a = np.array([f(Reader(t, rng), m, C) for t in th]); b = np.array([f(Reader(t, rng), m, C) for t in th])
        d = np.abs(a - b); print(f"{name:40} same band {np.mean(d==0):.2f} · within one band {np.mean(d<=1):.2f}")

if __name__ == '__main__':
    run('M4 realistic', 13, 24)
    run('M4 spread', 13, 24)
    run('M2 realistic', 8, 16)
    consistency('M4 realistic', 13, 24)
