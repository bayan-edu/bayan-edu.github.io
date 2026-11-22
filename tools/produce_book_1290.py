import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Tiny Terror". The title "Tiny Terror" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TRIASSIC PALEONTOLOGY DAYLIGHT STYLE: A sunlit, dusty canyon excavation quarry in bright natural daylight. In the center foreground, a remarkably preserved fossil skeleton of the agile early Triassic predatory dinosaur Eodromaeus embedded in red sandstone rock, showing its sharp curved teeth and grasping claws. Beside the fossil are fine paleontology excavation tools: precision metal dental picks, soft horsehair dust brushes, and a scientific metric measuring scale. Palette: sandstone terracotta red and desert ochre, fossil mineral bone gray, tool steel, and clear desert sky azure. Paleontology, dinosaur evolution, fossil excavation, Triassic predators, adventurous, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1290, brief, 'Tiny Terror')
    print("SUCCESS:", res)
