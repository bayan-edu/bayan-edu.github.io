import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Sun Heats Up". The title "The Sun Heats Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOLAR RADIATION & THERMAL ATMOSPHERE DAYLIGHT STYLE: A vibrant, sun-drenched landscape illustrating solar energy and thermal physics in radiant daylight. A brilliant midday Sun blazing in a cloudless blue sky, sending visible golden electromagnetic radiation waves (visible, ultraviolet, and infrared) toward Earth. An educational cross-section showing incoming solar radiation warming ocean waters, desert sands, and green forests, along with re-radiated thermal infrared heat and greenhouse gas equilibrium absorption diagrams. Palette: radiant solar gold, thermal infrared coral red, ocean aquamarine, and clear sky blue. Solar energy, electromagnetic radiation, heat absorption, thermal equilibrium, climate physics, bright and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1803, brief, 'The Sun Heats Up solar radiation infrared greenhouse effect')
    print("SUCCESS:", res)
