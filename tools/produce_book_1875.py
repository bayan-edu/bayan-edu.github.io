import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Do Things Look Darker When They Are Wet?". The title "Why Do Things Look Darker When Wet?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OPTICAL PHYSICS & REFRACTIVE INDEX DAYLIGHT STYLE: A sunlit, fascinating optical demonstration scene on a sandy beach on a bright sunny morning. Side-by-side comparative examination of two identical porous stones: one completely dry and pale chalky grey (diffuse light scattering), and the other glistening wet with water, revealing deep, rich, saturated dark tones and hidden mineral colors (total internal reflection in water layer). A prism splitting sunlight, optical ray tracing diagrams showing how water reduces surface scattering, and clear water droplets. Palette: dry stone chalky pale grey, wet stone deep saturated charcoal, water crystal cyan, and beach sunbeam gold. Optical physics, refractive index, light scattering, internal reflection, curiosity science, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1875, brief, 'Things Look Darker Wet optical refraction refractive index scattering')
    print("SUCCESS:", res)
