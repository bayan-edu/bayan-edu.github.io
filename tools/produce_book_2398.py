import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Elements of Jewelry". The title "The Elements of Jewelry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LAPIDARY MINERALOGY AND METALLURGY DAYLIGHT STYLE: A bright, sunlit gemologist and jeweler\'s workbench in daytime. On a velvet inspection pad, exquisite raw mineral crystals alongside faceted gemstones: a cut sapphire, an emerald, and an uncut diamond crystal, beside nuggets of pure native gold, sterling silver wire, jeweler\'s tweezers, loupe magnifying glass, and periodic table element tags (Au, Ag, Pt, C, Be). Palette: gold nugget radiant yellow-gold, gemstones sapphire blue, emerald green and diamond sparkle, velvet pad royal navy. Mineralogy, chemistry of elements, metallurgy, earth science, luxurious and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2398, brief, 'Elements of Jewelry precious metals gemstones metallurgy lapidary gold')
    print("SUCCESS:", res)
