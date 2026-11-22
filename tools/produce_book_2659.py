import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Partial Eclipse". The title "Partial Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PARTIAL SOLAR ECLIPSE ASTRONOMY STYLE: A brilliant daytime astronomical observation view through solar filters. The radiant golden Sun partially occulted by the dark silhouette of the Moon, creating an elegant, blazing solar crescent in a deep twilight sky, showing fine solar limb granulation and dark sunspot groups on the solar disk, with crescent-shaped sunbeam dappling projected on a clean white surface below. Palette: solar crescent blazing gold and incandescent white, lunar disk velvet black, and sky deep atmospheric indigo. Solar astronomy, celestial alignment, eclipse projection optics, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2659, brief, 'Partial Eclipse solar crescent astronomy sunspot projection daylight')
    print("SUCCESS:", res)
