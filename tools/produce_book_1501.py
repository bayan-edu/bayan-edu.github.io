import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Slow and Steady". The title "Slow and Steady" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PLATE TECTONICS & MOUNTAIN BUILDING DAYLIGHT STYLE: A sunlit, magnificent geological landscape and cross-section in bright daylight. In the center foreground, a detailed 3D cutaway showing the slow convergence of continental tectonic plates: the subduction of oceanic lithosphere into the mantle, volcanic magma chambers, and the slow uplift of towering jagged snow-capped alpine mountains. In the background, a crystal-clear blue alpine lake reflects the sunny mountain peaks under a cloudless azure sky. Palette: mountain snow diamond white and granite gray, subduction magma glowing orange, lake turquoise, and sky brilliant cyan. Plate tectonics, continental drift, mountain building, orogeny, Earth science, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1501, brief, 'Slow and Steady')
    print("SUCCESS:", res)
