import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Comeback". The title "The Comeback" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARINE SPECIES RECOVERY DAYLIGHT STYLE: A triumphant open-ocean scene in brilliant morning sunshine. A massive humpback whale (Megaptera novaeangliae) breaching majestically high out of the sparkling blue sea, its long white pectoral fins extended like wings and ventral grooves glistening with sea spray under sunny skies, with a calf swimming safely beside its flukes. Palette: ocean water deep ultramarine and crystal turquoise, whale charcoal and white, and sunlit sea spray diamond white. Marine conservation success, whale recovery, ocean ecology, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2471, brief, 'The Comeback species recovery humpback whale ocean breaching conservation')
    print("SUCCESS:", res)
