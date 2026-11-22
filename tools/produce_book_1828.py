import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rathna and the Ring of Fire". The title "The Ring of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PACIFIC RIM VOLCANOLOGY & ISLAND ARC DAYLIGHT STYLE: A sunlit, breathtaking landscape of an active volcanic island along the Pacific Ring of Fire in bright morning light. In the center, a majestic symmetrical stratovolcano summit with wisps of white geothermal steam drifting into a clear azure sky. In the foreground, lush tropical ferns, dark weathered basalt rock formations, and a geological map overlay showing the horseshoe-shaped Ring of Fire tectonic belt surrounding the Pacific Ocean. A sparkling turquoise ocean and coral reef in the background under radiant sunshine. Palette: volcanic basalt charcoal, steam pure white, tropical fern emerald green, ocean turquoise, and radiant sky cyan. Volcanology, Ring of Fire, plate tectonics, island arcs, natural geology, dramatic, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1828, brief, 'Ring of Fire volcanology Pacific plate tectonic volcanic arc')
    print("SUCCESS:", res)
