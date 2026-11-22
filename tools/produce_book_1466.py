import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pronghorns Find Their Path". The title "Pronghorns Find Their Path" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT WILDLIFE CORRIDOR & PRAIRIE MIGRATION DAYLIGHT STYLE: A sun-drenched Wyoming sagebrush prairie in glorious morning daylight. In the center foreground, a small group of elegant, swift pronghorn antelopes with reddish-brown coats and white neck patches running gracefully toward a dedicated vegetated wildlife overpass bridge spanning a highway. In the vast background, snow-dusted mountain ranges rise above golden prairie grasslands under a wide open blue sky. Palette: pronghorn coat russet and pure white, prairie grass golden ochre, sagebrush silvery green, and sky radiant azure. Wildlife conservation, migration corridors, pronghorn biology, highway ecology, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1466, brief, 'Pronghorns Find Their Path')
    print("SUCCESS:", res)
