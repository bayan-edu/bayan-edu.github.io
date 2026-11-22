import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Life in the Ocean". The title "Life in the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEANIC BIODIVERSITY & MARINE ECOSYSTEMS DAYLIGHT STYLE: A breathtaking, crystal-clear panoramic view of ocean life in radiant midday tropical sunshine. In the sun-dappled surface waters, a pod of playful bottlenose dolphins swimming gracefully alongside a green sea turtle. Below, schools of shimmering silvery mackerel swirling around a towering golden kelp forest, while colorful parrotfish explore branching purple corals on a sunny reef. Dancing sunbeams piercing deep into the sparkling azure water column. Palette: ocean sapphire and turquoise, dolphin sleek grey, kelp amber gold, coral violet, and sunbeam radiant white. Marine biology, ocean ecosystems, pelagic biodiversity, sea life conservation, vibrant, joyful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1774, brief, 'Life in the Ocean marine biodiversity pelagic coral kelp')
    print("SUCCESS:", res)
