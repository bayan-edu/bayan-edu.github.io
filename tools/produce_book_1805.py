import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Venus Crosses the Sun". The title "Venus Crosses the Sun" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASTRONOMICAL TRANSIT OF VENUS STYLE: A magnificent, scientifically accurate solar astronomy view of the historic Transit of Venus in bright daylight. The massive, glowing golden disk of the Sun showing granular photospheric convection cells and dark magnetic sunspots. In sharp, perfect contrast, the tiny, razor-sharp pitch-black circular silhouette of planet Venus transiting across the Sun\'s face. In the foreground, an optical solar telescope with a dark golden Mylar solar safety filter, and historical transit measurement diagrams. Palette: solar disk golden amber and brilliant yellow, Venus transit silhouette black, telescope brass and white, and deep sky blue. Astronomical transits, celestial mechanics, historical measuring of astronomical unit, solar physics, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1805, brief, 'Venus Crosses Sun astronomical transit solar telescope filters')
    print("SUCCESS:", res)
