import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Great Barrier Reef". The title "The Great Barrier Reef" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AUSTRALIAN CORAL REEF DAYLIGHT STYLE: A breathtaking split-level underwater view of the Great Barrier Reef in brilliant midday sunshine. A thriving coral garden with purple staghorn corals, brain corals, and sea fans, where a green sea turtle glides gracefully through crystal-clear turquoise water accompanied by schools of blue damselfish, under a bright blue sky with a distant sunlit coral cay island. Palette: reef water crystalline turquoise, corals vivid violet, rose and gold, sea turtle olive shell, and sky azure. Marine protected areas, coral biology, reef biodiversity, world heritage conservation, dazzling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2567, brief, 'Great Barrier Reef coral bleaching marine sanctuary clownfish sea turtle')
    print("SUCCESS:", res)
