import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pipsqueak Hears Echoes". The title "Pipsqueak Hears Echoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ACOUSTICS AND ECHOLOCATION PHYSICS STYLE: A charming, high-detail scientific visualization of sound reflection and echolocation. In a limestone cave opening at twilight, a tiny, adorable microbat (Pipsqueak) with delicate pointed ears and glossy eyes flying gracefully, emitting concentric glowing acoustic sound waves that bounce off cavern stalactites and fluttering moths, returning as luminous echo pulses. Palette: ultrasonic soundwaves radiant neon cyan and lime, microbat warm velvet brown, cave limestone warm amber, and twilight sky violet. Acoustics physics, echolocation, animal senses, bat biology, delightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2383, brief, 'Pipsqueak Hears Echoes acoustics echolocation bat cave sound waves physics')
    print("SUCCESS:", res)
