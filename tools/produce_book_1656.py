import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Big Idea about Marine Biology? Mysteries of the Deep". The title "Mysteries of the Deep" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEANOGRAPHIC RESEARCH & DEEP-SEA BIODIVERSITY STYLE: A high-tech deep-sea ocean exploration scene. An advanced yellow scientific autonomous underwater vehicle (AUV) submersible with powerful LED searchlights illuminating a mysterious deep-sea benthic community. Bioluminescent siphonophores, glowing jellyfish, deep-water sea fans, and a majestic giant squid tentacle silhouetted in the luminous water. Oceanographic sonar bathymetry map screens and specimen collection canisters highlighted in clean technical style. Palette: submersible electric yellow, ocean abyss navy, bioluminescent neon cyan, coral pink, and optic searchlight beam white. Marine biology, oceanography, deep-sea creatures, underwater exploration, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1656, brief, 'Marine Biology Mysteries of the Deep oceanography deep sea')
    print("SUCCESS:", res)
