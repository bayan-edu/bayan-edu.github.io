import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Grizzly Bears". The title "Grizzly Bears" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ALASKAN WILDERNESS GRIZZLY DAYLIGHT STYLE: A sun-drenched Alaskan wilderness river valley in radiant summer daylight. In the center foreground, a colossal, magnificent grizzly bear with thick silver-tipped dark brown fur, powerful shoulder hump, and alert ears standing proudly on a granite riverbank boulder beside rushing white-water rapids. In the clear water, a wild silver salmon leaps upstream in direct sunlight. In the background, snow-capped Alaskan mountain peaks and dense spruce forests rise beneath a brilliant blue sky. Palette: grizzly bear fur rich chocolate brown and silver-tipped amber, river rapid foaming white and aqua, and mountain peaks granite and snow. Wildlife biology, North American apex predators, grizzly bears, Alaskan ecology, majestic, powerful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1516, brief, 'Grizzly Bears')
    print("SUCCESS:", res)
