import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lights in the Water". The title "Lights in the Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUMINESCENT OCEAN & BIOLUMINESCENT PLANKTON STYLE: A magical, scientifically grounded marine biology view of bioluminescent ocean waters. Crashing ocean waves on a rocky cove glowing with vivid neon electric-blue illumination caused by billions of agitated dinoflagellate plankton (Noctiluca scintillans). In the water, comb jellies (ctenophores) with rainbow cilia and a glowing deep-sea squid trailing luminous light paths. A marine research water sampling vial showing concentrated glowing phytoplankton under microscopic study. Palette: bioluminescent electric neon blue, ocean deep sapphire navy, sea foam diamond white, and starlight silver. Bioluminescence, marine microbiology, dinoflagellates, luciferin-luciferase reaction, ocean magic, captivating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1932, brief, 'Lights in the Water marine bioluminescence dinoflagellates ocean nocturnal')
    print("SUCCESS:", res)
