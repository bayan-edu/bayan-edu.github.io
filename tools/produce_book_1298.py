import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Butterfly Anatomy". The title "Butterfly Anatomy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT LEPIDOPTERA ANATOMY DAYLIGHT STYLE: A stunning, sunlit macro educational view of butterfly morphology in bright morning daylight. In the center foreground, a magnificent monarch butterfly perched on an orange milkweed blossom with its wings spread wide, revealing its intricate black-veined orange wings. A clean, beautiful graphic callout reveals microscopic magnified views of the iridescent tiled scales, compound eyes, antennae, and coiled proboscis, with clean educational pointers. Palette: monarch wing vibrant orange and velvet black, milkweed coral, scale iridescence gold, and background soft meadow green. Entomology, butterfly anatomy, lepidoptera scales, insect biology, bright, crisp, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1298, brief, 'Butterfly Anatomy')
    print("SUCCESS:", res)
