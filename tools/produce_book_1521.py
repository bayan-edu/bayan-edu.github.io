import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Jellyfish Take Over!". The title "Jellyfish Take Over!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GIANT JELLYFISH OCEANOGRAPHY DAYLIGHT STYLE: A sun-illuminated, crystal-clear coastal ocean scene in radiant daylight. In the center foreground, a colossal Nomura\'s giant jellyfish pulsating gracefully through the water, showing its immense translucent pink-and-amber umbrella bell and a cascading array of delicate flowing tentacles catching sparkling sunbeams. Nearby in the water, an oceanographic research sensor pod and marine sonar tracking graphics monitor jellyfish bloom patterns in turquoise coastal waters. Palette: jellyfish bell translucent coral and amber, ocean water sparkling turquoise, and sunbeam bright ivory. Marine biology, giant jellyfish blooms, ocean ecosystems, marine science, fascinating, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1521, brief, 'Jellyfish Take Over')
    print("SUCCESS:", res)
