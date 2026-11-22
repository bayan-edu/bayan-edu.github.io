import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Gentle Giants". The title "Gentle Giants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL WHALE SHARK DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical ocean panorama with dazzling sunbeams penetrating deep turquoise water. In the center foreground, a colossal, magnificent whale shark (Rhincodon typus) swimming gracefully through the water, showing its enormous wide filter-feeding mouth, distinct white polka-dot and checkered skin pattern, and gentle sweeping tail. Accompanying the gentle giant are schools of bright yellow pilot fish swimming alongside over a distant coral reef. Palette: whale shark slate blue and white polka dots, ocean water sparkling turquoise, pilot fish sunny yellow, and sunbeam bright ivory. Marine biology, whale sharks, ocean giants, filter-feeding fish, gentle giants, magnificent, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1514, brief, 'Gentle Giants')
    print("SUCCESS:", res)
