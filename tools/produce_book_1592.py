import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Freeing the Ocean of Plastic, One Step at a Time". The title "Freeing the Ocean of Plastic" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HOPEFUL OCEAN CLEANUP & MARINE CONSERVATION DAYLIGHT STYLE: A brilliant, sun-drenched tropical ocean panorama under radiant blue skies. In the center foreground, an innovative solar-powered floating ocean barrier cleanup system skimming recyclable plastic waste from the surface of pristine turquoise waters. Beneath the surface in crystal-clear water, sea turtles, vibrant coral reefs, and schools of colorful reef fish swimming freely and safely. Recycling sorting bins and recovered plastic pellets displayed neatly in educational graphics. Palette: tropical ocean turquoise, sunny sky blue, solar yellow, coral orange, and clean white. Ocean conservation, environmental cleanup, recycling engineering, marine ecology, bright and hopeful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1592, brief, 'Freeing the Ocean of Plastic ocean cleanup conservation')
    print("SUCCESS:", res)
