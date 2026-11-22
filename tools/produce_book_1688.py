import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Invasive Species". The title "Invasive Species" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ECOLOGICAL BIOSECURITY & NATIVE SPECIES RESTORATION STYLE: A sunlit, compelling ecological comparison scene under bright clear skies. On one side, an aggressive dense tangle of invasive kudzu vine smothering native trees. On the other side, an active ecological restoration zone where native wildflowers (milkweed, purple coneflowers) are flourishing, attracting native monarch butterflies and bumblebees. A biosecurity inspection magnifying glass, boot-cleaning brush station, and invasive species identification cards in clean educational graphics. Palette: kudzu bright vine green, native wildflower purple and orange, soil warm brown, and sunny sky cyan. Invasive species biology, biosecurity, ecological balance, native habitat restoration, informative and impactful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1688, brief, 'Invasive Species ecology biosecurity quarantine native balance')
    print("SUCCESS:", res)
