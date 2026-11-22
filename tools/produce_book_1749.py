import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Shooting Stars". The title "Shooting Stars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOR PHYSICS & ATMOSPHERIC ABLATION STYLE: A dramatic astronomical scene capturing the entry of a meteor into Earth\'s atmosphere. In the upper atmosphere, a bright glowing streak of a meteor burning with incandescent ionization colors (emerald green and golden white). In the center foreground, on a velvet display cushion: an authentic iron-nickel meteorite specimen showing distinct fusion crust and Widmanstätten crystalline etched patterns. A magnifying loupe, celestial meteor shower radiant map, and a scale ruler beside the meteorite specimen. Palette: meteor incandescent emerald and gold, meteorite fusion crust iron black, velvet royal navy, and starlight silver. Meteor physics, atmospheric friction, meteorites, space debris, celestial science, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1749, brief, 'Shooting Stars meteors meteorites atmospheric ablation')
    print("SUCCESS:", res)
