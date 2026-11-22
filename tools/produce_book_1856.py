import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Producers, Consumers, and Decomposers". The title "Producers, Consumers & Decomposers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ECOLOGICAL TROPHIC PYRAMID & FOREST CYCLE SUNNY DAYLIGHT STYLE: A sun-drenched, harmonious forest ecosystem panorama in radiant morning light. At the base: flourishing Producers (sunlit green ferns, flowering clover, and tall oak trees converting sunlight into energy). In the middle: Consumers (a gentle cottontail rabbit eating clover, and a colorful songbird catching a caterpillar). At the bottom on a mossy fallen log: vital Decomposers (bracket mushrooms, colorful coral fungi, and earthworms recycling nutrients back into fertile soil). Glowing golden nutrient cycle arrows connecting the three ecological roles. Palette: plant leaf fresh emerald, mushroom warm ochre and cream, rabbit soft buff, and radiant sunbeam gold. Ecology, trophic roles, producers, consumers, decomposers, nutrient cycle, wholesome, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1856, brief, 'Producers Consumers Decomposers trophic pyramid ecology energy flow')
    print("SUCCESS:", res)
