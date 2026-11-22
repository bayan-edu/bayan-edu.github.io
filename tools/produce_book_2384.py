import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Energetic Emily". The title "Energetic Emily" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. KINETIC AND POTENTIAL ENERGY PHYSICS STYLE: A bright, sunlit amusement park engineering lab in daytime. In the center, a precision model roller coaster track with a sleek metallic coaster car perched at the crest of a steep loop-de-loop, illustrated with clean, glowing educational vector arrows showing potential energy converting into kinetic energy (PE = mgh, KE = Â½mvÂ²). Newton\'s cradle spheres clicking in the foreground with golden sparks. Palette: coaster track vibrant electric blue, vector arrows glowing neon yellow and orange, and lab sunlight bright white. Mechanical physics, forms of energy, conservation of energy, motion dynamics, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2384, brief, 'Energetic Emily kinetic potential energy roller coaster physics flywheel')
    print("SUCCESS:", res)
