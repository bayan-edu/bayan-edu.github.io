import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Secrets of the Rain Forest". The title "Secrets of the Rain Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ETHNOBOTANICAL MEDICINAL RAINFOREST DAYLIGHT STYLE: A sun-drenched, deeply layered tropical rainforest clearing in radiant morning light. In the foreground, fascinating medicinal plants: cinchona tree bark (quinine source), blooming purple passionflower (Passiflora), and broad calathea leaves beaded with sparkling water droplets. A naturalist\'s wooden plant-drying herbarium press, brass magnifying loupe, and glass specimen vials on a weathered mossy timber log. Sunlight filtering through towering giant mahogany and kapok trees into the lush emerald understory. Palette: medicinal passionflower violet, cinchona bark ochre amber, lush jungle emerald, and radiant sunbeam gold. Rainforest pharmacology, ethnobotany, biodiversity secrets, tropical plant medicine, rich and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1701, brief, 'Secrets of the Rain Forest medicinal botany ethnobotany biodiversity')
    print("SUCCESS:", res)
