import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Meteor Shower!". The title "Meteor Shower!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELESTIAL METEOR SHOWER STYLE: A breathtaking view of the night sky above a mountain astronomical observatory dome. Dozens of brilliant, luminous meteor streaks radiating across the firmament from a single radiant point, leaving glowing green and golden ionization trails. The majestic arch of the Milky Way galaxy stretching overhead with vibrant star dust clouds. Palette: meteor ionization trails electric lime and gold, observatory silver-white, and deep cosmos indigo. Meteor shower, cometary dust streams, astronomical observing, atmospheric entry, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1948, brief, 'Meteor Shower shooting stars cometary debris night sky observatory')
    print("SUCCESS:", res)
