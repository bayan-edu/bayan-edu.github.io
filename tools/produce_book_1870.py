import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Save the Whales". The title "Save the Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEANIC CETACEAN CONSERVATION DAYLIGHT STYLE: A sun-drenched, crystal-clear coastal ocean panorama in sparkling midday sunlight. In the center foreground, a magnificent humpback whale mother and calf swimming gracefully near the surface of vibrant turquoise waters, glistening sunbeams dancing across their flippers. In the background, a marine research sailboat with solar panels and hydrophone recording equipment sailing peacefully under clear blue skies. Clean vector infographics showing marine protected sanctuaries and global migration corridors. Palette: humpback slate blue and white, ocean deep sapphire and turquoise, boat sail crisp white, and sunlight gold. Marine mammal conservation, whale biology, ocean stewardship, marine protected areas, breathtaking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1870, brief, 'Save the Whales cetacean conservation humpback marine sanctuary')
    print("SUCCESS:", res)
