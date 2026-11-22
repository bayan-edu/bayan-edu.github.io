import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cosmic Car Crash!". The title "Cosmic Car Crash!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASTROPHYSICS GALACTIC COLLISION STYLE: A breathtaking deep space vista showing two colossal spiral galaxies in the magnificent process of colliding. Vibrant swirling tidal tails of brilliant blue newborn star clusters, luminous magenta emission nebulae, and glowing golden galactic cores intertwining in a grand cosmic dance. Points of sparkling distant starlight and crisp educational gravitational interaction vector curves. Palette: electric cyan, radiant magenta, cosmic gold, and deep space sapphire. Galactic merger, gravitational dynamics, astronomy and astrophysics, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1944, brief, 'Cosmic Car Crash colliding galaxies astrophysics starburst nebulae')
    print("SUCCESS:", res)
