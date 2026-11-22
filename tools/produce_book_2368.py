import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Red Fairy". The title "The Red Fairy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. UPPER ATMOSPHERIC LIGHTNING SPRITE STYLE: A rare, breathtaking view of upper atmospheric electrical phenomena high above a thunderstorm. Soaring 50 miles above dark thunderclouds into the mesosphere is a magnificent, colossal "Red Sprite" electrical discharge resembling a luminous crimson jellyfish or fairy, with delicate glowing red filament tentacles reaching downward and blue jets sparking upward into the starry cosmos. Palette: sprite discharge electric ruby red and crimson, blue jets electric azure, storm clouds deep charcoal, and space deep velvet black with stars. Atmospheric physics, red sprites, transient luminous events, space weather, dazzling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2368, brief, 'The Red Fairy lightning upper atmospheric sprite mesosphere storm')
    print("SUCCESS:", res)
