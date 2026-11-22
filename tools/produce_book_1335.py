import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Understanding Analog and Digital Signals". The title "Understanding Analog and Digital Signals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TELECOMMUNICATIONS & SIGNAL PROCESSING DAYLIGHT STYLE: A sunlit electrical engineering workbench in bright natural daylight. In the center foreground, a clean dual-channel digital oscilloscope displaying two comparative waveforms: a smooth, continuous analog sine wave in glowing amber, and a crisp, discrete square digital binary wave (0s and 1s) in glowing electric cyan. Beside the oscilloscope rest copper coaxial cables, an electric guitar pickup, and a modern microchip processor on a circuit breadboard. Palette: oscilloscope display dark cobalt with glowing amber and cyan wave traces, circuit board forest green, and workbench natural oak. Telecommunications, signal processing, analog vs digital, electrical engineering, bright, crisp, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1335, brief, 'Understanding Analog and Digital Signals')
    print("SUCCESS:", res)
