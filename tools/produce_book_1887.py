import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Food Chains". The title "Food Chains" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TROPHIC ENERGY TRANSFER & NATURE CYCLE SUNNY DAYLIGHT STYLE: A sunlit, cheerful meadow and pond ecosystem in radiant morning light. A clear, interconnected sequence illustrating the flow of solar energy through nature: Radiant Sun -> Sunlit Green Grass (Producer) -> Cheerful Grasshopper (Primary Consumer) -> Leaping Green Frog (Secondary Consumer) -> Garter Snake -> Soaring Red-Tailed Hawk (Apex Predator). Glowing golden energy flow arrows and caloric efficiency percentages in crisp, modern vector graphics under a sunny blue sky. Palette: grass fresh lime green, solar gold, frog emerald, hawk feather amber, and bright sky cyan. Food chains, trophic levels, energy flow in ecosystems, ecology education, clear, lively, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1887, brief, 'Food Chains trophic ecology producers herbivores predators decomposers')
    print("SUCCESS:", res)
