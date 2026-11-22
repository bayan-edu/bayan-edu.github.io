import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Hunters and Trappers". The title "Hunters and Trappers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PREDATORY ADAPTATIONS & ANIMAL HUNTING TACTICS STYLE: A sunlit, fascinating natural history collage exploring diverse animal hunting adaptations in bright daylight. In the foreground, a praying mantis waiting in ambush on a blooming flower; an antlion conical sand pit trap in dry earth; an intricate dew-covered orb spider web catching morning sunbeams; and the razor-sharp talons of a barn owl landing gracefully on a fencepost. Clean educational callouts illustrating sensory detection: motion detection, vibration sensing, and visual acuity. Palette: mantis leaf green, antlion pit sand ochre, owl plumage buff and cream, and morning sunbeam gold. Predatory strategies, ambush predators, animal traps, evolutionary adaptations, zoology, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1849, brief, 'Hunters and Trappers animal predatory strategies adaptations')
    print("SUCCESS:", res)
