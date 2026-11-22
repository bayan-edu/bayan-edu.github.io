import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sewer Safari". The title "Sewer Safari" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT URBAN HYDROLOGY & STORMWATER DAYLIGHT STYLE: A clean, educational cutaway cross-section of modern urban stormwater infrastructure in bright daylight. In the center foreground, a large, well-lit arched stone stormwater drainage canal with crystal-clear water flowing over clean river gravel and green mossy ledges. Small curious urban creatures: garden snails, freshwater minnows in clean runoff, and a remote-controlled yellow wheeled inspection rover equipped with headlights and camera sensors exploring the tunnel. Palette: stormwater clear aqua, inspection robot safety yellow, canal stone warm slate gray, and moss fresh green. Urban ecology, stormwater infrastructure, civil engineering, robotics exploration, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1323, brief, 'Sewer Safari')
    print("SUCCESS:", res)
