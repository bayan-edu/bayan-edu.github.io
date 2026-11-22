import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Horseshoe Crabs Thrive in the Delaware Bay". The title "Horseshoe Crabs Thrive in the Delaware Bay" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DELAWARE BAY SHORELINE & HORSESHOE CRAB DAYLIGHT STYLE: A sun-drenched coastal beach along the Delaware Bay at morning low tide in bright daylight. In the center foreground, an ancient, armored Atlantic horseshoe crab (Limulus polyphemus) with its domed olive-brown chitinous shell and spiny telson tail resting on wet, glistening tidal sand. Surrounding the crab, migratory shorebirds (red knots and sandpipers) feed peacefully along the shallow sparkling water edge, under a radiant blue coastal sky. Palette: horseshoe crab shell polished bronze and olive, wet sand golden ochre, water crystal turquoise, and sky clear cyan. Marine biology, living fossils, horseshoe crabs, coastal ecology, Delaware Bay, fascinating, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1520, brief, 'Horseshoe Crabs Thrive in the Delaware Bay')
    print("SUCCESS:", res)
