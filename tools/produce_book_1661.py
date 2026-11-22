import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Overharvesting". The title "Overharvesting" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARINE CONSERVATION & SUSTAINABLE FISHERIES DAYLIGHT STYLE: A sunlit, compelling coastal marine scene illustrating sustainable ocean balance in radiant daylight. On one side, a thriving, protected kelp forest sanctuary teeming with diverse marine life: sea otters, giant kelp, colorful rockfish, and abalone under sunbeams. A yellow marine protected boundary buoy floating on clear turquoise water. In educational graphics: balanced fishery quota scales, sustainable mesh-size net diagrams, and marine population recovery trend graphs. Palette: kelp forest emerald, ocean aquamarine, buoy caution yellow, coral orange, and sunny sky blue. Marine conservation, sustainable harvesting, fishery management, ecological balance, informative and impactful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1661, brief, 'Overharvesting fisheries conservation marine protected areas')
    print("SUCCESS:", res)
