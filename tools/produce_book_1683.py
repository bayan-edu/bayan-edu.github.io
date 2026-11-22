import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Moon\'s Phases". The title "The Moon\'s Phases" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ELEGANT LUNAR CYCLE & ASTRONOMICAL GEOMETRY STYLE: A comprehensive, circular educational diagram of the complete 29.5-day lunar synodic month. The eight distinct moon phases arranged in a graceful ring around Earth: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Third Quarter, and Waning Crescent. Parallel golden sunbeams arriving from the right, demonstrating how sunlight illuminates the lunar sphere as seen from Earth. Crisp high-detail photographic textures on each moon phase showing craters and maria clearly. Palette: lunar crater silver, deep space navy, sunbeam gold, Earth ocean blue, and celestial white. Moon phases, lunar geometry, astronomy education, synchronous rotation, clear, elegant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1683, brief, 'The Moons Phases lunar cycle waxing waning full crescent')
    print("SUCCESS:", res)
