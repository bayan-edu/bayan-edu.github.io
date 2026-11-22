import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Gray Wolves: Predator and Prey". The title "Gray Wolves: Predator & Prey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAJESTIC WILDLIFE ECOLOGY SUNNY MOUNTAIN STYLE: A sun-drenched, pristine wilderness valley in Yellowstone National Park on a crisp sunny morning. In the center foreground, a magnificent, healthy wild gray wolf standing proudly on a granite rocky bluff overlooking the valley. In the meadow below, a small herd of elk grazing peacefully among golden grasses along a clear winding mountain river fringed with green willows. Distant snow-capped alpine mountains rise majestically under a cloudless blue sky. Palette: wolf coat silver-grey and charcoal, river meadow golden buff and emerald, and sunny mountain sky blue. Wolf ecology, trophic cascades, predator-prey dynamics, wildlife conservation, inspiring, majestic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1786, brief, 'Gray Wolves Predator Prey ecology trophic cascade Yellowstone')
    print("SUCCESS:", res)
