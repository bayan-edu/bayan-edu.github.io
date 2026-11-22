import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Far Away Is the Moon?". The title "How Far Away Is the Moon?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELESTIAL DISTANCE SCALE & LASER RANGING STYLE: A clear, scientifically accurate cosmic distance scale visualization in space illuminated by radiant sunlight. Earth on the far left and the Moon on the far right, spaced to true astronomical scale (illustrating that thirty Earths could fit side-by-side in the 384,400 km gap). A glowing green pulsed laser ranging beam firing from an Earth observatory to retroreflectors on the Moon\'s surface. Geometric distance markers, light-travel time callout (1.3 seconds), and orbital parameters in crisp educational graphics. Palette: Earth ocean blue, lunar silver, laser beam emerald green, measurement gold, and deep orbit navy. Astronomical distance, lunar laser ranging, scale of the solar system, space physics, clear and eye-opening. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1681, brief, 'How Far Away Is the Moon lunar distance astronomy scale')
    print("SUCCESS:", res)
