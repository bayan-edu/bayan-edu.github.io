import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Cycle of Energy in Plants". The title "The Cycle of Energy in Plants" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PHOTOSYNTHESIS & CELLULAR ENERGY DAYLIGHT STYLE: A sunlit, magnificent botanical diagram landscape in radiant morning daylight. In the center foreground, a translucent cross-section of a vibrant green plant leaf absorbing warm golden rays of natural sunlight. Inside the leaf, stylized chloroplasts and mitochondria are linked by a clean circular cycle of energy: carbon dioxide and water converting into glucose and oxygen, and vice versa. Droplets of sparkling morning dew glisten on the leaf surface under a clear sky. Palette: leaf chloroplast vibrant jade and lime green, sunlight radiant gold, oxygen bubble crystal white, and water droplet cyan. Plant biology, photosynthesis, cellular respiration, energy cycles, botany, bright, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1326, brief, 'The Cycle of Energy in Plants')
    print("SUCCESS:", res)
