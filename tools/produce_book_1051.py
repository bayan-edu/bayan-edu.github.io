import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Methane Emissions from Cattle and Global Warming". '
    'The title "Methane Emissions from Cattle and Global Warming" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AGRICULTURAL SUSTAINABILITY & PASTURE ECOLOGY DAYLIGHT STYLE: A sun-drenched, rolling green dairy pasture on a glorious sunny morning in bright daylight. '
    'In the center foreground, healthy spotted dairy cows grazing peacefully in clover meadows beneath warm golden sunbeams. '
    'Beside the wooden pasture fence post, an innovative solar-powered environmental gas monitoring sensor with clean digital display measuring atmospheric air quality. '
    'In the background, lush emerald rolling hills, a classic red agricultural barn equipped with rooftop solar panels, and a clear blue sky with fluffy white clouds. '
    'Palette: pasture clover emerald, dairy cow black-and-white, barn rust red, and sky azure. '
    'Agricultural science, environmental sustainability, greenhouse gases, farming, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1051, brief, "Methane Emissions from Cattle and Global Warming")
    print("SUCCESS:", res)
