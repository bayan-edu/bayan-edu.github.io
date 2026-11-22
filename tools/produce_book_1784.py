import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Eruption!". The title "Eruption!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXPLOSIVE PLINIAN VOLCANOLOGY DAYLIGHT STYLE: A sunlit, dramatic geological landscape capturing an explosive volcanic eruption in bright morning daylight. In the center, a towering Plinian eruption column of white steam, expanding volcanic gas, and grey pulverized ash rising miles into a bright azure sky. In the foreground, layered volcanic pumice deposits, weathered basalt boulders, and geological field monitoring seismometers on an observation ridge. Sunbeams illuminating the edges of the billowy eruption plume in radiant gold. Palette: ash column silver and slate, mountain granite grey, pumice pale buff, and brilliant sunny sky blue. Volcanology, explosive eruptions, volcanic hazards, Earth science, dramatic, powerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1784, brief, 'Eruption explosive volcanism plinian column ash cloud geology')
    print("SUCCESS:", res)
