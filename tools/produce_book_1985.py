import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "My Appa and his Sounds". The title "My Appa and his Sounds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ACOUSTICS AND TRADITIONAL SOUNDSCAPES DAYLIGHT STYLE: A sunlit, artistic musical workshop filled with rich acoustic instruments. In the center, a handcrafted wooden classical mridangam drum and tuned bronze singing bowls resting on a hand-woven reed mat, with colorful, harmonious acoustic frequency soundwaves and musical resonance vibrations rippling softly through the sunlit air. A gentle breeze carrying morning sunlight across brass bells and polished teak wood. Palette: wood tones warm mahogany and teak, brass warm gold, reed mat natural amber, and soundwaves radiant cyan. Acoustics physics, sound vibration, musical instruments, warm, lyrical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1985, brief, 'Appa sounds acoustic percussion instruments mridangam soundwaves')
    print("SUCCESS:", res)
