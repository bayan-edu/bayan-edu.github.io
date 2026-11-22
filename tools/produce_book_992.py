import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Osamu Shimomura". '
    'The title "Osamu Shimomura" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BIOLUMINESCENCE & MARINE SCIENCE DAYLIGHT STYLE: A sunlit, clean scientific marine biology discovery laboratory overlooking a sun-drenched coastal lagoon under bright daylight. '
    'In the center foreground, on a clean white laboratory workbench, a large scientific glass flask containing a radiant, glowing emerald-green fluorescent protein (GFP) liquid, emitting a magical vibrant luminescence. '
    'Beside it, in an ultra-clear illuminated aquarium tank, a delicate, ethereal crystal jellyfish (Aequorea victoria) floats gracefully with glowing bioluminescent tentacles and umbrella margin. '
    'In the background, a sunny bay with azure water, green coastal hills, and a brass microscope on the counter. '
    'Palette: GFP radiant emerald, jellyfish crystalline cyan, lab ivory white, and sunlit sea azure. '
    'Biochemistry, bioluminescence, Nobel Prize discovery, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(992, brief, "Osamu Shimomura")
    print("SUCCESS:", res)
