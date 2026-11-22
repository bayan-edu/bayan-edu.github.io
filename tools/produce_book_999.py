import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "This Is How Orbits Work!". '
    'The title "This Is How Orbits Work!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CLASSICAL PHYSICS & CELESTIAL MECHANICS DAYLIGHT STYLE: A sunlit, imaginative mountain peak demonstrating Newton\'s cannonball thought experiment under a radiant sky in bright daylight. '
    'In the center, atop a soaring green alpine mountain peak that rises above the gentle curvature of Earth, an ornate polished brass cannon points horizontally toward the horizon. '
    'From the cannon, glowing golden trajectory lines curve out, illustrating projectiles falling and curving precisely with Earth\'s curve into a continuous glowing golden orbit. '
    'Beside the cannon rest an antique brass telescope and an armillary sphere globe. '
    'Palette: brass gold, mountain emerald, Earth oceanic blue and cloud white, and sunny daylight azure. '
    'Physics, gravity, orbital mechanics, Isaac Newton, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(999, brief, "This Is How Orbits Work!")
    print("SUCCESS:", res)
