import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Brave Penguin Blink and the Warming World". The title "The Brave Penguin & the Warming World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANTARCTIC POLAR ICE & PENGUIN CONSERVATION STYLE: A breathtaking, sun-illuminated Antarctic ice shelf landscape under the polar 24-hour midnight sun in clear daylight. In the center foreground, a charming, healthy Adélie penguin standing alert on a glistening white snow ledge, looking out over crystal-clear turquoise waters. Gleaming blue-and-white icebergs reflecting brilliant sunlight in the bay, with krill swirling in the clear shallows below. An atmospheric weather station mast and clean polar climate data curves illustrated softly in the upper corner. Palette: penguin tuxedo black and white, Antarctic sea ice crystal cyan, ocean deep sapphire, and radiant polar sunlight. Antarctic ecology, penguin biology, sea ice conservation, polar climate science, inspiring, endearing, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1837, brief, 'Penguin Blink Warming World Antarctic ecology sea ice conservation')
    print("SUCCESS:", res)
