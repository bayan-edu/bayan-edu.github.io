import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Drip-Tips and Other Adaptations in the Rainforest". The title "Drip-Tips and Other Adaptations in the Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RAINFOREST BOTANY ADAPTATIONS DAYLIGHT STYLE: A sun-dappled, lush tropical rainforest canopy in bright daylight. In the center foreground, a stunning macro view of glossy tropical ficus leaves featuring pronounced, slender drip-tips efficiently funneling sparkling droplets of fresh rainwater to the tip, glistening in morning sunbeams. Beside the leaves, epiphytic bromeliads forming natural water reservoirs and climbing liana vines showcase diverse botanical adaptations. Palette: leaves rich emerald and jade, water droplets diamond sparkle, bromeliad scarlet, and background canopy soft chartreuse. Rainforest ecology, plant adaptations, botanical physiology, biodiversity, bright, crisp, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1445, brief, 'Drip Tips and Other Adaptations in the Rainforest')
    print("SUCCESS:", res)
