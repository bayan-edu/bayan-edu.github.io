import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Elephant Bird". The title "The Elephant Bird" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PREHISTORIC MADAGASCAR FAUNA DAYLIGHT STYLE: A sunlit ancient coastal savannah in Madagascar on a bright morning. In the center foreground, a colossal prehistoric Elephant Bird (Aepyornis maximus), standing ten feet tall with powerful muscular legs, dense shaggy plumage, and a stout beak, beside a giant fossilized ivory egg resting in a nest among spiny desert succulents and baobab trees. Palette: bird plumage warm tawny brown and grey, eggshell smooth cream ivory, baobab bark rich clay, and morning sky bright azure. Paleontology, extinct megafauna, island evolution, Madagascar natural history, monumental and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2370, brief, 'The Elephant Bird Aepyornis Madagascar giant egg prehistoric fauna')
    print("SUCCESS:", res)
