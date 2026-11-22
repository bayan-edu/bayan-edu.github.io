import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: Three Men in a Boat". The title "Three Men in a Boat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RIVER THAMES BOATING DAYLIGHT STYLE: A sun-drenched, cheerful English river scene along the picturesque River Thames in radiant summer daylight. In the center foreground, a classic wooden Thames skiff rowboat with striped canvas canopy and polished varnished oars resting beside a scenic riverbank shaded by weeping willows. Inside the boat, a woven picnic hamper overflowing with crusty bread and ginger beer bottles, an acoustic banjo, and a cheerful yellow fox terrier dog\'s red collar and rubber ball resting on cushions. Palette: skiff polished mahogany, river water sparkling aqua, willow trees fresh lime green, and summer sky radiant blue. Humorous literature, river boating, Victorian summer holiday, Jerome K. Jerome, cheerful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1374, brief, 'Literature Three Men in a Boat')
    print("SUCCESS:", res)
