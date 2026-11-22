import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Links in the Food Chain". The title "Links in the Food Chain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ECOSYSTEM TROPHIC LEVELS & FOOD WEB DAYLIGHT STYLE: A vibrant, sun-drenched coastal and forest ecosystem panorama in radiant daylight. A clear, beautifully illustrated circular food chain diagram showing energy flow between trophic levels: Radiant Sun -> Green Clover Producers -> Grasshopper Primary Consumer -> Songbird Secondary Consumer -> Red-Tailed Hawk Apex Predator -> Earthworm and Mushroom Decomposers. Glowing golden energy flow arrows connecting each link in harmonious sequence. Palette: producer leaf green, sunbeam gold, hawk feather amber, songbird blue, and clear sky cyan. Trophic ecology, food chains, energy flow, ecosystem dynamics, primary producers to apex predators, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1699, brief, 'Links in the Food Chain trophic levels ecology energy flow')
    print("SUCCESS:", res)
