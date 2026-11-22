import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wind, Swell, and Rogue Waves". The title "Wind, Swell, and Rogue Waves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PHYSICAL OCEANOGRAPHY WAVE DYNAMICS STYLE: A colossal, breathtaking open ocean swell in full midday sunshine. A monumental, glassy deep-blue rogue wave cresting with translucent turquoise water and roaring white seafoam, illustrating constructive wave interference, backed by clean educational sinusoidal wave height graphs and wave period equations under a sunny sky with brisk sea breezes. Palette: ocean water deep ultramarine and crystal turquoise, wave crest pure white foam, wave equations glowing neon gold, and sky sunny blue. Physical oceanography, wave physics, rogue wave science, marine dynamics, powerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2406, brief, 'Wind Swell Rogue Waves physical oceanography massive ocean wave physics')
    print("SUCCESS:", res)
