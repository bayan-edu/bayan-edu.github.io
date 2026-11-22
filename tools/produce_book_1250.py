import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Diving". The title "Diving" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL REEF DAYLIGHT STYLE: A sun-drenched, crystal-clear underwater coral reef panorama illuminated by sparkling rays of tropical sunlight penetrating turquoise waters. In the center foreground, colorful scuba diving equipment: a bright yellow dive mask and snorkel resting beside sleek diving fins on a sunlit coral ledge. Surrounding the ledge, schools of vibrant yellow-backed fusilier fish and clownfish glide through magnificent pink brain corals, purple sea fans, and giant sea anemones. Palette: tropical ocean turquoise, coral rose and purple, reef fish bright sunny yellow, diving gear vibrant yellow and black, and sunbeam white. Marine biology, scuba diving adventure, coral reef ecosystems, ocean exploration, bright, vibrant, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1250, brief, 'Diving')
    print("SUCCESS:", res)
