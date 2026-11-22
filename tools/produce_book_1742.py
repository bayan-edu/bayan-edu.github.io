import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Acid Rain Affects a Food Web". The title "Acid Rain & Food Webs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENVIRONMENTAL CHEMISTRY & AQUATIC FOOD WEB DAYLIGHT STYLE: A sunlit, compelling ecological study scene on a bright clear morning. A research beaker of lake water tested with colorful pH indicator paper showing acidic levels (pH 4.5 vs neutral pH 7.0). An educational aquatic food web diagram showing how reduced pH impacts sensitive organisms: calcium shells of snails dissolving, mayfly nymph populations declining, and the resulting ripple effect on trout and osprey predators. In the background, a pristine northern lake fringed with pine trees under sunny skies. Palette: pH test strip coral red and yellow, lake water aquamarine, pine forest green, and bright sunny sky. Acid rain chemistry, pH scale, food web ecology, aquatic conservation, environmental science, informative and clear. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1742, brief, 'Acid Rain Food Web environmental chemistry pH freshwater ecology')
    print("SUCCESS:", res)
