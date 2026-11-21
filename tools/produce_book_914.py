import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth\'s Atmosphere: The Thermosphere". '
    'The title "Earth\'s Atmosphere: The Thermosphere" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT UPPER ATMOSPHERE & SPACE SCIENCE STYLE: A luminous, sunlit orbital view of Earth\'s thermosphere glowing with atmospheric energy. '
    'In the center, vibrant, shimmering ribbons of electric-green and magenta Aurora Borealis dance gracefully across the curved upper atmosphere. '
    'In the sunny orbital foreground, a modern modular space station with large glistening cobalt solar panel wings and gold thermal foil details catches bright sunlight. '
    'Below, Earth\'s glowing blue atmospheric edge radiates with clean light. '
    'Palette: aurora emerald green, electric magenta, solar cobalt blue, thermal foil gold, and atmospheric cyan. '
    'Atmospheric science, bright, educational, vivid. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(914, brief, "Earth's Atmosphere: The Thermosphere")
    print("SUCCESS:", res)
