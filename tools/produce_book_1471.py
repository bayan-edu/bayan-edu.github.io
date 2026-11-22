import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sea Monsters". The title "Sea Monsters" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PREHISTORIC PALEONTOLOGY OCEAN DAYLIGHT STYLE: A sun-illuminated, crystal-clear prehistoric ocean vista in bright daylight. In the center foreground, an impressive fossilized skull and skeletal paddle of the giant Cretaceous marine reptile Mosasaurus embedded in chalk limestone bedrock. Surrounding the fossil in the clear turquoise water are coiled spiral ammonite shells, prehistoric nautiluses, and shimmering rays of sunlight piercing down to the sea floor. Palette: fossilized bone slate gray, chalk bedrock warm cream, water sparkling turquoise, and ammonite iridescent pearl. Paleontology, marine reptiles, Mosasaurus, Cretaceous oceans, Earth history, adventurous, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1471, brief, 'Sea Monsters')
    print("SUCCESS:", res)
