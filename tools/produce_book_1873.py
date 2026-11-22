import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Do Bats Live in Caves?". The title "Why Do Bats Live in Caves?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CAVE MICROCLIMATE & BAT ROOSTING ECOLOGY DAYLIGHT STYLE: A sunlit, fascinating view at the entrance archway of a vast natural limestone cave in morning daylight. Hanging from the textured calcite ceiling, a cluster of gentle brown microbats roosting upside down with wings wrapped snugly around themselves. Morning sunlight illuminates the cave entrance, revealing lush green ferns clinging to damp limestone rock walls and dripping mineral stalactites. Clean educational infographics illustrating cave microclimate: constant stable humidity, temperature regulation, and predator protection. Palette: cave limestone warm amber and slate, bat fur soft velvet brown, moss emerald green, and morning entrance daylight. Chiropteran biology, cave ecology, microclimates, animal adaptations, bat roosting, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1873, brief, 'Why Do Bats Live Caves chiroptera cave microclimate roosting')
    print("SUCCESS:", res)
