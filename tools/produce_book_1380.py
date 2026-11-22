import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: The Eyes of Montezuma". The title "The Eyes of Montezuma" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARCHAEOLOGICAL ARTIFACTS DAYLIGHT STYLE: A sun-drenched archaeological study overlooking a sunny coastal cliff in bright morning daylight. In the center foreground, an exquisite pre-Columbian Aztec mosaic artifact: a double-headed serpent carved of turquoise and mother-of-pearl tiles with glowing obsidian eyes, resting on an archaeologist\'s drafting desk. Beside the artifact lie a geologist\'s brass calipers, a leather-bound field journal with hieroglyphic sketches, and a panoramic view of the sunny ocean. Palette: artifact turquoise blue and jade green, desk warm cedar, and ocean shimmering azure. Archaeological mystery, Mesoamerican history, Aztec artifacts, adventure fiction, bright, fascinating, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1380, brief, 'Literature The Eyes of Montezuma')
    print("SUCCESS:", res)
