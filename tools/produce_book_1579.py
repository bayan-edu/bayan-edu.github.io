import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Allure of Gold". The title "The Allure of Gold" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLEAMING MINERALOGICAL GEOLOGY DAYLIGHT STYLE: A sun-drenched geological field prospect and mineralogy table bathed in golden natural light. In the center foreground, crystalline raw native gold nuggets intergrown with sparkling white quartz rock. A classic steel prospector\'s gold pan with water and black sand revealing flakes of alluvial gold. A polished jeweler\'s brass balance scale holding a stamped 999.9 pure gold bullion ingot reflecting dazzling sunbeams. Palette: radiant metallic gold, quartz crystal white, river stone slate, earth ochre, and warm sunlit amber. Mineralogy, geology of precious metals, metallurgy, atomic element 79, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1579, brief, 'The Allure of Gold geology metallurgy mineralogy')
    print("SUCCESS:", res)
