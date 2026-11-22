import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "All About Snouts and Tails". The title "Snouts and Tails" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPARATIVE MAMMALIAN ZOOLOGY SUNNY CLEARING STYLE: A cheerful, sun-drenched meadow clearing celebrating the unique functional adaptations of animal snouts and tails. In harmonious arrangement: a South American tapir showing its flexible, tactile trunk-like snout; a clever beaver slapping its flat, scaly paddle tail on a river pond; and a playful spider monkey demonstrating its strong, grasping prehensile tail coiled around a leafy branch. Clean circular educational callouts illustrating sensory nerve endings in snouts and balancing mechanics in tails. Palette: tapir slate grey, beaver chestnut brown, river water aquamarine, and meadow sunbeam green. Comparative zoology, anatomical adaptations, snouts, tails, animal diversity, playful, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1829, brief, 'All About Snouts and Tails comparative zoology animal appendages')
    print("SUCCESS:", res)
