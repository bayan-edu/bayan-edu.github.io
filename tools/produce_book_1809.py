import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Hole in the Planet!". The title "A Hole in the Planet!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR KARST SINKHOLE & CENOTE DAYLIGHT STYLE: A sun-drenched, breathtaking view inside a majestic natural limestone sinkhole (cenote) in Yucatan, Mexico in radiant midday sunlight. Sheer vertical limestone cliff walls draped in hanging tropical tree roots, green ferns, and blooming wild orchids. At the bottom, a deep, circular pool of crystal-clear turquoise groundwater with a golden sunbeam piercing straight down through the open circular skylight to the water floor. Geological limestone dissolution chemistry (CaCO3) and subterranean cave karst diagrams in clean graphics. Palette: cenote pool aquamarine turquoise, limestone rock cream and buff, tropical foliage emerald green, and sunbeam radiant gold. Karst geomorphology, sinkholes, limestone dissolution, subterranean hydrology, stunning, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1809, brief, 'Hole in the Planet sinkholes cenotes karst geology hydrology')
    print("SUCCESS:", res)
