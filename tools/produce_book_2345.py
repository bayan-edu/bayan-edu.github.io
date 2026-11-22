import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sea Water". The title "Sea Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEAN CHEMISTRY AND SALINITY STYLE: A bright, sunlit marine chemistry laboratory overlooking a tropical ocean bay. On a clean white workbench, an optical refractometer measuring seawater salinity, clear glass beakers with evaporated sea salt crystals, hydrometer testing water density, and a clear molecular model of water and sodium chloride ions dissolving, with the sparkling turquoise sea visible outside. Palette: sea water crystal turquoise, salt crystals pure white, refractometer brass and black, and lab daylight bright white. Chemical oceanography, seawater salinity, marine science, water properties, crisp and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2345, brief, 'Sea Water ocean chemistry salinity sodium chloride marine science')
    print("SUCCESS:", res)
