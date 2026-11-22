import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Amazing Trees Help Us Breathe". '
    'The title "Amazing Trees Help Us Breathe" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT FOREST ECOLOGY & PHOTOSYNTHESIS DAYLIGHT STYLE: A sun-drenched, magnificent ancient forest canopy on a glorious clear sunny morning in bright daylight. '
    'In the center foreground, towering sunlit oak and redwood tree branches with lush, vibrant translucent emerald leaves catching radiant golden sunbeams, with shimmering microscopic dew and moisture droplets glistening like diamonds. '
    'Beside the tree trunk, soft green mosses, woodland ferns, and an open botanical sketchbook showing tree leaf anatomy and the oxygen cycle. '
    'In the background, sunbeams filter dramatically through the verdant forest canopy beneath a clear sapphire sky. '
    'Palette: foliage emerald and chartreuse green, sunbeam radiant gold, oak wood warm amber, and sky sapphire. '
    'Botany, tree ecology, photosynthesis, clean air, nature, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1030, brief, "Amazing Trees Help Us Breathe")
    print("SUCCESS:", res)
