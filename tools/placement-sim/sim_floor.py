"""The owner's scenario: an M4 reader enters at R18-R20 and fails every station on the way down. Where is he placed?
Same model as sim_stations.py (project assumptions). Readers at fixed true bands, entry centre R19 (and R13 for contrast)."""
import numpy as np, importlib.util, sys, os
spec = importlib.util.spec_from_file_location('s', os.path.join(os.path.dirname(__file__), 'sim_stations.py'))
s = importlib.util.module_from_spec(spec); sys.argv = ['x']; spec.loader.exec_module(s)
C = 24

def fixed3(r, m):
    """the owner's reading: every fail moves the three-band station down three bands; three stations."""
    k = m; low = k - 1; ok = False
    for st in range(3):
        k = int(np.clip(k, 2, C - 1)); sc = [r.passage(b) for b in (k - 1, k, k + 1)]; low = min(low, k - 1)
        if sum(sc) >= 7: ok = True; k += 3
        elif sum(sc) <= 4: k -= 3
        else: ok = True; break
    return k - 1, low, ok                       # placed at the lowest band of the last station

def est(r, m, prior_sd, n_st=3, floor_rule=False, max_st=5, broad=False):
    """routed and decided by the estimate. floor_rule: do not stop before one passage is passed (>= 2 of 3)
    or the bottom band is reached — up to max_st stations."""
    prior = s.CUTS[m - 1] + s.S / 2; k = m; low = 99; passed = False; st = 0
    while True:
        k = int(np.clip(k, 2, C - 1))
        bands = (max(1, k - 4), k, min(C, k + 4)) if (broad and st == 0) else (k - 1, k, k + 1)
        sc = [r.passage(b) for b in bands]; low = min(low, min(bands)); st += 1
        passed = passed or any(x >= 2 for x in sc)
        k = s.band_of(r.eap(prior, prior_sd))
        if st >= n_st and (not floor_rule or passed or low <= 1 or st >= max_st): break
    return min(s.band_of(r.eap(prior, prior_sd)), C), low, passed, st

def report(name, f, m, bands=(3, 6, 9, 12, 15), n=1500, seed=5):
    print(f"\n{name} — entry centre R{m}")
    print(f"{'true band':>10} {'placed (median)':>16} {'placed range 10-90%':>20} {'2+ too high':>12} {'lowest band seen (median)':>26} {'no passage passed':>18} {'stations':>9}")
    for tbv in bands:
        rng = np.random.default_rng(seed + tbv)
        th = s.CUTS[tbv - 1] + rng.random(n) * s.S
        out = [f(s.Reader(t, rng), m) for t in th]
        pl = np.array([o[0] for o in out]); low = np.array([o[1] for o in out]); ok = np.array([o[2] for o in out])
        st = np.array([o[3] if len(o) > 3 else 3 for o in out])
        print(f"{'R'+str(tbv):>10} {'R'+str(int(np.median(pl))):>16} {('R'+str(int(np.percentile(pl,10)))+'–R'+str(int(np.percentile(pl,90)))):>20} "
              f"{np.mean(pl - tbv >= 2):12.2f} {'R'+str(int(np.median(low))):>26} {np.mean(~ok):18.2f} {st.mean():9.1f}")

report('① fixed step: every fail moves down 3 bands, placed at the lowest band of the last station', fixed3, 19)
report('② routed by the estimate, prior centred on the entry (sd 1.6 logits) — the proposal as simulated', lambda r, m: est(r, m, 1.6), 19)
def est_tier(r, m, n_st=3, floor_rule=False, broad=False):
    """entry station at m, but the prior is the tier's population (centre R13, sd 3.0 logits ~ 7 bands)"""
    prior = s.CUTS[13 - 1] + s.S / 2; k = m; low = 99; passed = False; st = 0
    while True:
        k = int(np.clip(k, 2, C - 1))
        bands = (max(1, k - 4), k, min(C, k + 4)) if (broad and st == 0) else (k - 1, k, k + 1)
        sc = [r.passage(b) for b in bands]; low = min(low, min(bands)); st += 1
        passed = passed or any(x >= 2 for x in sc)
        k = s.band_of(r.eap(prior, 3.0))
        if st >= n_st and (not floor_rule or passed or low <= 1 or st >= 5): break
    return min(s.band_of(r.eap(prior, 3.0)), C), low, passed, st

report('③ routed by the estimate, prior = the tier (R13, sd 3.0) — no floor rule', lambda r, m: est_tier(r, m), 19)
report('④ as ③ + floor rule: no end before a passage is passed or R1 is reached (max 5 stations)', lambda r, m: est_tier(r, m, floor_rule=True), 19)
report('⑤ as ④ + a broad first station (k-4, k, k+4)', lambda r, m: est_tier(r, m, floor_rule=True, broad=True), 19)
report('⑥ as ⑤ but entering at the tier centre R13', lambda r, m: est_tier(r, m, floor_rule=True, broad=True), 13)
