import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Energy Screams". The title "Energy Screams" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT ACOUSTIC PHYSICS & SOUND ENERGY DAYLIGHT STYLE: A sunlit, high-tech acoustics research laboratory on a bright morning. In the center foreground, a delicate crystal glass vibrating in resonance beside an acoustic speaker horn emitting visible colorful soundwave frequency ripples. Brass acoustic tuning forks of various pitches vibrating with water droplet splashes, alongside a digital oscilloscope displaying crisp sinusoidal sound waves and decibel frequency spectrums. Palette: electric cyan, soundwave magenta, chrome silver, acoustic gold, and clean laboratory white. Sound energy, acoustic resonance, physics of vibration, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1572, brief, 'Energy Screams acoustic physics sound energy resonance')
    print("SUCCESS:", res)
