import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth Science - Volcanoes". The title "Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VOLCANOLOGY & IGNEOUS PETROLOGY DAYLIGHT STYLE: A sun-drenched geological field research table overlooking an ancient volcanic caldera in bright morning sunlight. In the center foreground, fascinating volcanic rock specimens: black vitreous obsidian glass, porous floating pumice stone, and vesicular dark basalt. A geologist\'s steel rock hammer, optical hand lens loupe, and field notebook with stratigraphic sketches of tephra layers. In the background, majestic volcanic peaks under clear blue skies with wisps of geothermal fumarole steam. Palette: obsidian glossy black, pumice pale ash, basalt slate, volcanic terracotta, and sunny mountain sky blue. Earth science, volcanology, igneous petrology, geological field research, fascinating, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1740, brief, 'Earth Science Volcanoes geology igneous rock petrology')
    print("SUCCESS:", res)
