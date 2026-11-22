import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "CHEW CHOMP YUM!". The title "CHEW CHOMP YUM!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NUTRITION AND DIGESTIVE HEALTH DAYLIGHT STYLE: A sunlit, bountiful kitchen and nutritional laboratory table. Bursting with vibrant, colorful gut-friendly foods: crisp green apples, orange carrots, fermented yogurt in a glass jar, whole grains, and fresh berries, alongside a clean, cheerful digestive system anatomical diagram and beneficial probiotics (lactobacillus) bacteria models. Palette: fruits and vegetables bright red, orange, and emerald, yogurt porcelain white, and table light oak in sunlight. Digestive biology, human nutrition, gut microbiome, healthy eating habits, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2492, brief, 'CHEW CHOMP YUM digestion nutrition healthy food gut microbiome fruits')
    print("SUCCESS:", res)
