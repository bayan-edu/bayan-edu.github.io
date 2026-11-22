import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Who Was Neil Armstrong?". The title "Who Was Neil Armstrong?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. APOLLO 11 HISTORIC LUNAR LANDING STYLE: A dramatic and historic lunar surface scene in pristine detail. In the foreground, the famous crisp astronaut boot footprint pressed into fine grey lunar regolith dust beside a scientific lunar experiment package. In the middle ground, the gold-foil-wrapped Apollo 11 Lunar Module "Eagle" standing on its landing pads, with our vibrant blue-and-white marbled Earth hanging gracefully in the black cosmos above. Palette: lunar dust fine silver-grey, lunar module gold foil, Earth ocean sapphire and cloud white, space deep velvet black. Space exploration history, lunar science, engineering triumph, iconic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1979, brief, 'Neil Armstrong Apollo 11 Moon landing lunar module footprint')
    print("SUCCESS:", res)
