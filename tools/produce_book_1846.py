import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Escaping Mount Pinatubo". The title "Mount Pinatubo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PHILIPPINES PLINIAN VOLCANOLOGY DAYLIGHT STYLE: A sunlit, dramatic geological view of Mount Pinatubo in bright morning daylight. In the center, a colossal Plinian eruption column of white steam, expanding volcanic gases, and grey pulverized ash billowing miles into the tropical sky. In the foreground, a volcanic river valley showing gray volcanic lahar sediment flows, weathered basalt rocks, and scientific seismic monitoring equipment on a ridge. Sunbeams illuminating the towering edges of the volcanic plume in radiant gold under a clear azure sky. Palette: volcanic plume silver-grey and white, mountain forest emerald, lahar sand grey, and tropical sky blue. Volcanology, Mount Pinatubo, explosive volcanic eruptions, geological hazards, dramatic, powerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1846, brief, 'Mount Pinatubo volcanology 1991 eruption ash column lahars')
    print("SUCCESS:", res)
