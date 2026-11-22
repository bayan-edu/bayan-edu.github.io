import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Miss Johnson\'s Plant Experiment". The title "Miss Johnson\'s Plant Experiment" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BOTANICAL SCIENCE LAB DAYLIGHT STYLE: A bright, cheerful classroom laboratory windowsill bathed in morning sunshine. Lined up neatly are clear glass beakers demonstrating stages of plant germination: a bean seed sprouting roots in clear agar, a sturdy green seedling emerging toward the light, and a thriving young leafy plant with measuring rulers and data recording clipboards. Sunlight illuminating photosynthesis water droplet transpiration inside glass jars. Palette: foliage vivid lime and emerald green, soil rich dark brown, lab glass crystal clear with sun reflections, and windowsill warm honey wood. Plant biology, seed germination, scientific method, photosynthesis, warm and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1998, brief, 'Plant Experiment botany germination seedlings photosynthesis lab')
    print("SUCCESS:", res)
