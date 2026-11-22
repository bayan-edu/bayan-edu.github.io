import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Water Loss Affects Biodiversity". The title "Water Loss & Biodiversity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENVIRONMENTAL ECOLOGY DUAL LANDSCAPE DAYLIGHT STYLE: A sunlit, thought-provoking ecological contrast landscape under clear daylight. On one side, a thriving, lush freshwater wetland teeming with cattails, water lilies, dragonflies, and clear reflective ponds. Transitioning smoothly to a dry, parched riverbed with cracked earth clay and wilted grasses, highlighting the vulnerability of life to water scarcity. A giant crystal water drop suspended in the center, containing a miniature reflection of a healthy vibrant biosphere inside. Palette: wetland emerald green, pond aquamarine, earth clay terracotta, arid sand, and bright sky cyan. Conservation ecology, freshwater scarcity, biodiversity loss, environmental science, educational and poignant. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1593, brief, 'How Water Loss Affects Biodiversity drought ecology freshwater')
    print("SUCCESS:", res)
