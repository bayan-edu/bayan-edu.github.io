import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Different Types of Galaxies". The title "Different Types of Galaxies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GALACTIC MORPHOLOGY & HUBBLE CLASSIFICATION STYLE: A breathtaking cosmic panorama showcasing the diverse structural types of galaxies in deep space. In the center, a spectacular grand-design Spiral galaxy with swirling arms of glowing blue stars and pink nebulae (like Andromeda); beside it, a barred spiral galaxy with a radiant central stellar bar, a smooth glowing golden Elliptical galaxy (E0-E7), and an exotic, chaotic Irregular galaxy with starburst clusters. Delicate celestial tuning fork classification axes connecting the galaxy types in clean educational graphic style. Palette: spiral star cluster electric blue, nebula magenta pink, elliptical core golden amber, and deep cosmic black. Extragalactic astronomy, galaxy classification, Hubble sequence, cosmology, galactic evolution, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1782, brief, 'Different Types of Galaxies Hubble tuning fork spiral elliptical')
    print("SUCCESS:", res)
