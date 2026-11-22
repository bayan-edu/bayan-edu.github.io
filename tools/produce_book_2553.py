import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pythons Invade the Florida Everglades". The title "Pythons Invade the Everglades" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EVERGLADES INVASIVE SPECIES ECOLOGY DAYLIGHT STYLE: A sunlit Florida Everglades cypress swamp and sawgrass marsh in midday light. In the center foreground, a massive Burmese python (Python bivittatus) with intricate dark brown blotched camouflage scales coiled silently around a submerged bald cypress root knee, while an American alligator rests on a distant mudbank, illustrating the ecological competition. Palette: python scales olive, tan and dark brown, swamp water tea-brown with sun reflections, sawgrass golden-green, and sunny sky blue. Invasive species ecology, Everglades conservation, reptile biology, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2553, brief, 'Burmese Python Everglades invasive species wetland cypress swamp sawgrass')
    print("SUCCESS:", res)
