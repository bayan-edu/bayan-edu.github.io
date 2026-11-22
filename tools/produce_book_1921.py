import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ira\'s Monsoon Feast". The title "Monsoon Feast" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEASONAL AGRICULTURAL HARVEST & MONSOON BOUNTY STYLE: A sunlit traditional open-air courtyard in rural India after a refreshing monsoon rain shower. On a rustic carved wooden feast table: polished terracotta platters filled with harvest delicacies: fragrant steaming basmati rice, golden roasted corn cobs (bhutta) rubbed with lime, fresh ripe Alphonso mangoes, and traditional earthenware water vessels. In the courtyard background, glistening rain-washed banana leaves and blooming jasmine bushes reflecting golden sunbeams breaking through receding clouds. Palette: terracotta warm clay orange, mango golden yellow, banana leaf rain-washed emerald, and sunbeam amber. Agricultural harvest, monsoon season, traditional crops, culinary botany, cultural celebration of rain, warm and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1921, brief, 'Monsoon Feast seasonal agricultural harvest traditional culinary crops')
    print("SUCCESS:", res)
