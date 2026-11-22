import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Shock Waves". The title "Shock Waves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SEISMIC WAVES & EARTHQUAKE DYNAMICS STYLE: A sunlit geology laboratory exhibit in bright natural daylight. In the center foreground, a detailed 3D cutaway model of Earth\'s tectonic crust showing a deep fault slip, with colorful concentric expanding shockwave rings (primary P-waves and shear S-waves) propagating outward through rock layers. Beside the model, an antique brass pendulum seismograph and a modern digital seismogram monitor displaying sharp wave spikes on graph grids. Palette: crust model terracotta and slate, seismic wave rings electric cyan and warm amber, brass instrument gold, and lab daylight white. Seismology, seismic wave propagation, New Madrid earthquakes, geophysics, dynamic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1473, brief, 'Shock Waves')
    print("SUCCESS:", res)
