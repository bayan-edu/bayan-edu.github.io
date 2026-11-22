import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Eclipses Happen". The title "Why Eclipses Happen" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CELESTIAL MECHANICS & ECLIPSE ASTRONOMY STYLE: A sunlit, elegant astronomical diagram of a solar and lunar eclipse in educational clarity. In the center, the golden radiant Sun, the Moon, and planet Earth aligned in cosmic harmony, with clean luminous geometric shadow cones (umbra and penumbra) showing how the Moon\'s shadow touches Earth. An inset circular view displays a breathtaking total solar eclipse showing the pearly-white solar corona streaming around the dark lunar silhouette with bright Bailey\'s beads. Palette: Sun brilliant gold, solar corona shimmering pearlescent white, Earth sapphire blue, and space cosmic deep indigo. Astronomy, solar eclipses, celestial orbits, shadow geometry, Earth-Moon-Sun system, bright, majestic, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1340, brief, 'Why Eclipses Happen')
    print("SUCCESS:", res)
