import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "THE CANNY SCIENTIST". The title "THE CANNY SCIENTIST" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INGENIOUS LABORATORY CHEMISTRY DAYLIGHT STYLE: A sunlit, ingenious scientific laboratory workbench in daytime. A clever arrangement of improvised scientific apparatus: glass beakers bubbling with colorful non-toxic solutions, a brass magnifying lens, a homemade electroscope detecting charge, open scientific notebooks with clever experiment doodles, and a prism casting a rainbow across the table. Palette: chemical solutions bright cyan, amber and emerald, brass tools warm gold, and lab sunlight sparkling white. Scientific method, inventive problem solving, chemistry experiments, clever innovation, lively and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2644, brief, 'Canny Scientist laboratory glassware chemistry beakers microscope discovery')
    print("SUCCESS:", res)
