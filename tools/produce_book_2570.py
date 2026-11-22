import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Water Is Everything!". The title "Water Is Everything!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WATER MOLECULE AND LIFE SCIENCES STYLE: A radiant, sunlit macro composition celebrating the chemistry of water. In the center, a gigantic, perfect spherical water droplet reflecting the green Earth inside, surrounded by clean molecular models of Hâ‚‚O with hydrogen bonds, sparkling dew on green grass, and seafoam splashing on sunny coastal rocks. Palette: water droplets crystalline aquamarine, molecular bonds radiant white, foliage fresh green, and sunlight bright. Chemistry of water, universal solvent, origin of life, hydrogen bonding, crisp, sparkling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2570, brief, 'Water Is Everything molecular structure H2O universal solvent life')
    print("SUCCESS:", res)
