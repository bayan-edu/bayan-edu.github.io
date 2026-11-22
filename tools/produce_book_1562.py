import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Tides". The title "Tides" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR COASTAL TIDAL LANDSCAPE DAYLIGHT STYLE: A sunlit, breathtaking coastal bay showcasing the powerful rise and fall of the ocean tides. In the foreground, a rich tidal pool exposed at low tide, with colorful orange starfish, sea anemones, green kelp, and polished seashells glistening in the sun. In the midground, high-water wet marks on weathered sea cliffs and a historic coastal lighthouse on a rocky promontory. Overhead in the pale blue daytime sky, a clear crescent moon demonstrating lunar gravitational pull diagrams on Earth\'s tidal bulges. Palette: ocean aquamarine, deep sea navy, sandy beige, wet rock slate, and brilliant sunny cyan. Oceanography, lunar gravitation, tidal ecology, coastal geology, bright and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1562, brief, 'Tides ocean gravitational lunar tides')
    print("SUCCESS:", res)
