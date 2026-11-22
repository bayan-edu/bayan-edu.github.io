import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Drop\'s Journey". The title "A Drop\'s Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNIFICENT HYDROLOGICAL WATER CYCLE DAYLIGHT STYLE: A sweeping panoramic natural landscape illustrating the continuous journey of water through nature in radiant daylight. Snow-capped alpine mountain peaks feeding a crystal-clear cascading waterfall and rushing river, winding through lush forested valleys into a sunlit ocean bay. Puffy white cumulus clouds with gentle summer rain falling over the mountains, and glistening evaporation vapor rising softly over the sea in bright sunshine. Clean circular diagrammatic arrows tracing evaporation, condensation, precipitation, and groundwater runoff. Palette: alpine glacier white, cascading river cyan, forest emerald green, deep sea cobalt, and sunny golden yellow. Hydrological cycle, meteorology, Earth systems, freshwater geography, clear and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1616, brief, 'A Drops Journey hydrological water cycle precipitation')
    print("SUCCESS:", res)
