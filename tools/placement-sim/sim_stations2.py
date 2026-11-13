"""Controls for sim_stations.py — what makes the difference: the station's make-up, or the decision rule?"""
import numpy as np, importlib.util, sys, os
spec = importlib.util.spec_from_file_location('s', os.path.join(os.path.dirname(__file__), 'sim_stations.py'))
s = importlib.util.module_from_spec(spec); sys.argv = ['x']; spec.loader.exec_module(s)

def design_E(r, m, C, n_st):
    """one band per station (three passages at the current estimate), routed and decided by nominal Rasch"""
    k = m; prior = s.CUTS[m - 1] + s.S / 2
    for _ in range(n_st):
        k = int(np.clip(k, 1, C)); [r.passage(k) for _ in range(3)]
        k = s.band_of(r.eap(prior))
    return min(s.band_of(r.eap(prior)), C)

def design_A8(r, m, C, max_st):
    """the one-band staircase with a pass mark that allows for guessing: 8 of 9"""
    passed, failed = set(), set(); k = m; up = dn = 0; steps = (3, 2, 1)
    for st in range(max_st):
        (passed if sum(r.passage(k) for _ in range(3)) >= 8 else failed).add(k)
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

s.DESIGNS = {
    'A  one band, rule 7/9, 3 st.':           lambda r, m, C: s.design_A(r, m, C, 3),
    'A8 one band, rule 8/9, 3 st.':           lambda r, m, C: design_A8(r, m, C, 3),
    'E  one band, nominal Rasch, 3 st.':      lambda r, m, C: design_E(r, m, C, 3),
    'C  three bands, nominal Rasch, 3 st.':   lambda r, m, C: s.design_C(r, m, C, 3),
    'C  three bands, nominal Rasch, 4 st.':   lambda r, m, C: s.design_C(r, m, C, 4),
}
print("== controls, M4 realistic (3 items a passage) ==")
s.run('M4 realistic', 13, 24, n=4000)

print("\n== two items a passage (18 per 3 stations) ==")
s.IPP = 2
s.DESIGNS = {k: v for k, v in s.DESIGNS.items() if k.startswith(('E', 'C'))}
s.run('M4 realistic', 13, 24, n=4000)
s.IPP = 3

print("\n== band spacing sensitivity, C three bands nominal Rasch 3 st. ==")
s.DESIGNS = {'C  three bands, nominal Rasch, 3 st.': lambda r, m, C: s.design_C(r, m, C, 3)}
for sp in (0.3, 0.5):
    s.S = sp; s.CENTRE = np.arange(1, s.B + 1) * sp; s.CUTS = s.CENTRE + s.OFF
    s.GRID = np.linspace(s.CENTRE[0] - 4, s.CENTRE[-1] + 4, 400)
    print(f"-- spacing {sp} logits"); s.run('M4 realistic', 13, 24, n=3000)
