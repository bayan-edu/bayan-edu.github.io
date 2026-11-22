import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Preserving Grasslands". '
    'The title "Preserving Grasslands" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PRAIRIE GRASSLANDS & CARBON ROOTS DAYLIGHT STYLE: A sun-drenched, sweeping North American prairie landscape on a glorious sunny morning in bright daylight. '
    'In the center foreground, tall golden big bluestem grass and purple coneflowers swaying in a gentle prairie breeze, catching golden sunbeams. '
    'Beside them, an artistic cross-section soil profile box illustrating the incredible depth of tangled, carbon-storing prairie roots penetrating deep into dark fertile soil. '
    'In the background, endless rolling green and golden prairie hills stretch toward the distant blue Rocky Mountain foothills under a vast azure sky with wispy white clouds. '
    'Palette: prairie wheat gold, coneflower magenta, rich prairie loam dark amber, and vast sky azure. '
    'Grassland ecology, prairies, carbon storage, climate preservation, bright, educational, expansive, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1038, brief, "Preserving Grasslands")
    print("SUCCESS:", res)
