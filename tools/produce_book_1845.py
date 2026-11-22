import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth\'s Fiery Volcanoes". The title "Earth\'s Fiery Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL VOLCANIC LANDSCAPES & IGNEOUS GEOLOGY DAYLIGHT STYLE: A sunlit, comprehensive volcanic panorama in bright clear daylight. In the center, a majestic composite volcanic cone venting billowing white geothermal steam and volcanic gas into a bright blue sky. A glowing orange-red river of basaltic lava cooling into glassy black obsidian and ropy pahoehoe stone along the lower slopes. Geological specimen display in the foreground: porous volcanic pumice, obsidian volcanic glass blade, and volcanic bombs on a field research slate. Palette: molten lava glowing orange-red, obsidian glassy black, pumice ash white, and clear sunny sky cyan. Volcanology, igneous rocks, volcanic eruption types, magma to lava, Earth science, dramatic, majestic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1845, brief, 'Earths Fiery Volcanoes volcanology magma lava basalt obsidian')
    print("SUCCESS:", res)
