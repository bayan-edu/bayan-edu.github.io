import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Skin: The Great Protector". The title "Skin: The Great Protector" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INTEGUMENTARY SYSTEM & DERMAL HISTOLOGY DAYLIGHT STYLE: A bright, sunlit medical biology laboratory and study in clean morning light. In the center foreground, an accurate 3D translucent anatomical block model of human skin showing the three distinct protective layers: the waterproof keratinized epidermis, the vascular dermis with collagen fibers and sensory touch receptors, and the insulating subcutaneous hypodermis. Educational infographics illustrating skin defense: UV melanin protection, sweat pore thermoregulation, and waterproof lipid barriers. Palette: epidermis warm peach and sand, dermis coral pink, nerve fiber golden yellow, and clean optic white. Human anatomy, integumentary system, dermatology, barrier immunity, fascinating, respectful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1750, brief, 'Skin Great Protector integumentary system dermatology histology')
    print("SUCCESS:", res)
