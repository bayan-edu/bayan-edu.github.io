import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "One Way to Find a Planet". The title "One Way to Find a Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXOPLANET TRANSIT PHOTOMETRY STYLE: A high-tech, scientifically accurate astronomical discovery scene in space illuminated by stellar light. In the center, a distant parent star shining like a radiant golden disk, with a small dark exoplanet silhouette transiting across its face. Directly below in clean educational graphic design: a digital transit light curve plot showing stellar brightness dropping slightly (by 1%) during the transit and returning to normal. The Kepler / TESS space telescope scanning the starfield in the foreground. Palette: parent star radiant gold and white, exoplanet black silhouette, light curve electric cyan, and space deep navy. Exoplanet discovery, transit photometry, Kepler space telescope, extrasolar worlds, astrophysics, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1894, brief, 'Find a Planet exoplanet transit method photometry Kepler')
    print("SUCCESS:", res)
