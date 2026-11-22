import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Dum Dum-a-Dum Biryani!". The title "Dum Dum-a-Dum Biryani!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CULINARY TRADITION AND AROMATIC BOTANY STYLE: A sunlit traditional kitchen feast in daytime. An authentic clay handi pot sealed with dough for slow "dum" cooking, alongside a silver platter overflowing with fragrant basmati rice infused with golden saffron, star anise, cinnamon sticks, whole black cardamom pods, fresh mint leaves, and caramelized onions, with aromatic steam ribbons rising in sunbeams. Palette: saffron rice radiant gold and amber, spices rich cinnamon brown, clay pot warm terracotta, and mint fresh green. Culinary culture, spice chemistry, cooking science, food traditions, appetizing, joyful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2643, brief, 'Dum Biryani Indian culinary aromatic spices saffron rice handi pot')
    print("SUCCESS:", res)
