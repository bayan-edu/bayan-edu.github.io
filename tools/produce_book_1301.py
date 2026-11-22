import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Climbing Space". The title "Climbing Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT APOLLO SATURN V LAUNCHPAD DAYLIGHT STYLE: An awe-inspiring, sun-drenched view of Launch Complex 39A on a glorious Florida morning in bright daylight. In the center foreground, the colossal Saturn V rocket standing vertically on the launchpad with its iconic red launch umbilical tower, ready to reach for the stars. Surrounding the launchpad are clean access ramps, an American flag waving proudly in the ocean breeze, and a clear azure sky illuminated by brilliant morning sunbeams. Palette: Saturn V rocket pristine white and black roll pattern, launch umbilical tower aerospace red, and sky radiant azure cyan. Space exploration, Apollo program, Saturn V rocket, JFK space speech, human ambition, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1301, brief, 'Climbing Space')
    print("SUCCESS:", res)
