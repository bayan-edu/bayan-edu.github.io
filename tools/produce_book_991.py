import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mary Anning: The Fossil Hunter". '
    'The title "Mary Anning: The Fossil Hunter" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT JURASSIC COAST PALEONTOLOGY DAYLIGHT STYLE: A sunlit, dramatic English Jurassic Coast beach on a glorious sunny afternoon under bright daylight. '
    'In the center foreground, resting on a flat seaside slab of limestone rock: an exquisite coiled ammonite fossil with mother-of-pearl iridescent sheen, and fossilized prehistoric ichthyosaur vertebrae and ribs cleanly exposed in rock. '
    'Beside the fossils rest a vintage brass geological hammer, a jeweler\'s loupe magnifying glass, and a classic canvas specimen satchel. '
    'In the background, golden layered cliff strata, turquoise ocean waves breaking onto the pebble beach, and a radiant blue sky with gentle white sea spray. '
    'Palette: ammonite iridescence and slate grey, fossil limestone ochre, sea turquoise, and sunny sandstone gold. '
    'Paleontology, fossils, earth science, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(991, brief, "Mary Anning: The Fossil Hunter")
    print("SUCCESS:", res)
