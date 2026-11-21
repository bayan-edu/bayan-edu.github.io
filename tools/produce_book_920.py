import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Introduction to the Oceans". '
    'The title "Introduction to the Oceans" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT OCEANOGRAPHY & MARINE SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant split-view (over-underwater) ocean panorama on a glorious morning under bright daylight. '
    'Above the sparkling water surface, a sleek modern oceanographic scientific research vessel sails gracefully on deep-blue open waters under a spotless azure sky. '
    'Below the crystal-clear surface, dancing golden caustic sunbeams illuminate the vibrant turquoise ocean depths, with a graceful sea turtle gliding peacefully beside shimmering schools of silvery pelagic fish. '
    'Palette: deep ocean cobalt, sunlit turquoise aqua, seafoam white, and bright golden sunlight. '
    'Oceanography, marine science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(920, brief, "Introduction to the Oceans")
    print("SUCCESS:", res)
