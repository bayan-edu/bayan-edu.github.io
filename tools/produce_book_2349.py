import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Waves are Everywhere!". The title "Waves are Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WAVE PHYSICS SPECTACULAR DAYLIGHT STYLE: A dynamic, sun-soaked composition showing all forms of waves in nature. In the center, a rolling turquoise ocean wave breaking cleanly, seamlessly integrating with glowing sinusoidal wave graphs displaying wavelength, frequency, and amplitude, radiant rainbow electromagnetic spectrum waves, vibrating acoustic sound guitar strings, and seismic ripples traveling through earth. Palette: ocean wave aquamarine and white foam, wave curves radiant neon cyan and golden yellow, and sky bright azure. Wave mechanics, physics of sound and light, electromagnetic radiation, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2349, brief, 'Waves Everywhere wave physics electromagnetic sound water seismic light')
    print("SUCCESS:", res)
