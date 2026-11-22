import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is the Fermi Gamma-ray Space Telescope?". '
    'The title "What Is the Fermi Gamma-ray Space Telescope?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HIGH-ENERGY ASTROPHYSICS & SPACE TELESCOPE STYLE: A stunning, sun-illuminated view of the NASA Fermi Gamma-ray Space Telescope in low Earth orbit. '
    'In the center foreground, the sleek box-shaped spacecraft with its Large Area Telescope (LAT) detectors, extended solar panel wings gleaming with sapphire photovoltaic cells catching direct sunlight, and gold thermal blanket insulation. '
    'In the background, the vast glowing curved horizon of Earth with blue oceans and white cloud swirls, while across the starry cosmic void in deep space, a distant spinning pulsar emits brilliant violet and magenta energetic gamma-ray beams. '
    'Palette: spacecraft titanium and gold foil, solar panels sapphire blue, gamma rays vibrant magenta and violet, and cosmic deep navy. '
    'Astrophysics, NASA space telescopes, gamma rays, universe radiation, bright, educational, majestic. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1062, brief, "What Is the Fermi Gamma-ray Space Telescope?")
    print("SUCCESS:", res)
