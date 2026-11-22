import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Are Wind Tunnels?". The title "What Are Wind Tunnels?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE WIND TUNNEL ENGINEERING STYLE: A bright, sunlit high-tech aerodynamic testing facility in daytime. Looking down the expansive throat of a colossal subsonic wind tunnel with giant circular contra-rotating fan blades at the far end, testing a futuristic scale-model supersonic jet aircraft suspended on sting balances, with colored smoke streamlines flowing smoothly over the delta wings. Palette: wind tunnel walls clean industrial white and yellow safety railings, smoke streamlines glowing cyan and magenta, and jet model polished titanium. Aeronautics, wind tunnel physics, fluid mechanics, aerospace engineering, high-tech and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2404, brief, 'What Are Wind Tunnels aerodynamics aerospace testing fan airfoil')
    print("SUCCESS:", res)
