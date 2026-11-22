import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Dark Purple Flowers at the Edge of Extinction". '
    'The title "The Dark Purple Flowers at the Edge of Extinction" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENDANGERED BOTANICAL SANCTUARY DAYLIGHT STYLE: A sun-drenched, pristine high alpine rocky meadow on a glorious sunny morning in bright daylight. '
    'In the center foreground, an exquisite, rare cluster of deep velvety dark-purple mountain wildflowers with delicate golden stamens and silky petals, with glistening morning dew droplets catching warm golden sunbeams. '
    'Beside the blossoms on a granite ledge rest a botanist\'s brass hand lens, a vintage wooden plant specimen press, and an open illustrated botanical conservation sketchbook. '
    'In the background, sun-drenched alpine peaks and green mountain valleys stretch beneath a clear sapphire sky. '
    'Palette: flower velvety deep purple and royal violet, stamen bright gold, granite silver grey, and alpine meadow emerald. '
    'Botany, plant conservation, endangered wildflowers, alpine ecology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1056, brief, "The Dark Purple Flowers at the Edge of Extinction")
    print("SUCCESS:", res)
