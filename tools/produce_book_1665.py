import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Seeing in all Directions". The title "Seeing in All Directions" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANIMAL VISION ADAPTATIONS & FIELD OF VIEW DAYLIGHT STYLE: A bright, sunlit garden exploration scene celebrating unique animal ocular anatomy in radiant morning light. In the center foreground, a colorful veiled chameleon perched on a green branch, with its extraordinary turret-shaped conical eyes independently pivoting 360 degrees. Educational circular insets showing: a dragonfly\'s panoramic 30,000-facet compound eyes, and a herbivorous goat\'s horizontal slit pupil providing a 320-degree panoramic field of view. Palette: chameleon emerald green and turquoise, garden petal yellow, optical lens cyan, and sunny daylight white. Comparative animal vision, ocular anatomy, panoramic field of view, biological adaptation, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1665, brief, 'Seeing in all Directions animal vision field of view chameleon')
    print("SUCCESS:", res)
