import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Dead Zone". The title "Dead Zone" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEANOGRAPHIC HYPOXIA & WATER QUALITY DAYLIGHT STYLE: A sunlit coastal marine research scene illustrating oxygen levels in seawater. A research vessel sampling station in the foreground with an oceanographic Niskin water-sampling bottle and a digital dissolved oxygen electronic sensor probe. A stark, split underwater cross-section: the upper sunlit layers teeming with schooling fish and swimming sea turtles, contrasted with benthic sea floor hypoxia sediment illustrating oxygen depletion (dead zone) and nutrient runoff cycles. Palette: surface ocean aquamarine, deep hypoxic slate grey, research instrument yellow, and bright sunny sky. Marine ecology, ocean hypoxia, nutrient pollution, environmental science, dissolved oxygen measurement, educational and impactful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1705, brief, 'Dead Zone marine hypoxia oceanography dissolved oxygen')
    print("SUCCESS:", res)
