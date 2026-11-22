import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Dream Journey". The title "The Dream Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT HISTORIC SPACESHIP LAUNCH DAYLIGHT STYLE: A sunlit, magnificent aerospace launchpad on a clear morning under bright daylight. In the center foreground, a gleaming multi-stage spacecraft standing vertically on its launch tower with cryogenic vapor venting, surrounded by launch support gantries and a prominent electronic countdown digital clock displaying T-0. In the background, sweeping coastal landscape under a brilliant azure sky and golden morning sunshine. Palette: spacecraft titanium white and aerospace orange, launch gantry steel gray, coastal azure blue, and radiant sunbeam gold. Space exploration, rocket launch countdown, aerospace engineering, inspiring, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1253, brief, 'The Dream Journey')
    print("SUCCESS:", res)
