import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Studying Coral Reefs Helps the Land, Too". The title "Studying Coral Reefs Helps the Land, Too" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CORAL REEF AND COASTLINE DAYLIGHT STYLE: A split over-underwater composition bathed in crystal-clear midday sunshine. Below the water, a vibrant coral reef teeming with staghorn corals, sea fans, brain corals, and colorful yellow tang and damselfish. Above the water line, a lush green tropical island coastline with mangroves and sandy beaches protected from powerful ocean swells by the barrier reef. Palette: reef water luminous turquoise, corals coral-pink and golden-orange, tropical foliage emerald green, and sunny sky blue. Coastal protection, coral reef ecology, wave dissipation, marine science, dazzling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1958, brief, 'Studying Coral Reefs Helps the Land marine ecology coastal protection')
    print("SUCCESS:", res)
