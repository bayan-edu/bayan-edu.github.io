import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Paleontology: The Big Dig". '
    'The title "Paleontology: The Big Dig" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PALEONTOLOGY FOSSIL EXCAVATION DAYLIGHT STYLE: A sun-drenched, radiant sandstone fossil dig site on a glorious sunny morning under bright daylight. '
    'In the center foreground, a beautifully preserved prehistoric spiral ammonite fossil and dinosaur bone fragment emerging cleanly from exposed sedimentary rock strata. '
    'Beside the fossils rest authentic excavation field tools: natural bristle fossil dusting brushes, a steel geological rock hammer, brass calipers, and a field magnifying glass catching warm golden sunbeams. '
    'In the background, tiered golden canyon excavation trenches and layered geological sandstone cliffs glow under an azure sky. '
    'Palette: sandstone golden ochre, fossil amber brown, steel tool silver, and clear sky blue. '
    'Paleontological science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(941, brief, "Paleontology: The Big Dig")
    print("SUCCESS:", res)
