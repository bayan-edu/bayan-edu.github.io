import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "NASA\'s Stardust Review". The title "NASA\'s Stardust Mission" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE SAMPLE RETURN & COMET WILD 2 STYLE: A high-tech space exploration scene capturing NASA\'s Stardust spacecraft encounter in sunlight. In space, the robotic Stardust spacecraft deploying its tennis-racket shaped collector grid filled with translucent blue aerogel (frozen smoke). Microscopic hypervelocity cometary dust grains from comet Wild 2 creating carrot-shaped impact tracks in the blue aerogel. In the foreground, the sample return capsule descending by parachute into sunny desert landing flats. Palette: aerogel ethereal translucent cyan, spacecraft thermal foil gold, comet nucleus charcoal, and deep space navy. Cometary science, NASA missions, sample return, aerogel nanotechnology, space exploration, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1815, brief, 'NASAs Stardust Review cometary dust aerogel sample return')
    print("SUCCESS:", res)
