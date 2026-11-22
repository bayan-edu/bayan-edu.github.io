import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Your Skin Unmasked". The title "Your Skin Unmasked" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DERMATOLOGICAL ANATOMY STYLE: A luminous, clean 3D educational cutaway of human skin architecture. Showing the epidermis protective layer, dermis with collagen fibers, sebaceous glands, hair follicles, sweat glands, and microscopic sensory receptors, illuminated by gentle daylight with clear educational callouts explaining skin defense and temperature regulation. Palette: epidermal layers natural peach, coral, and cream, collagen network soft gold, sensory nerves electric cyan, and background clinical clean white. Dermatology, integumentary system, human anatomy, skin health, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the clean 3D cross-section anatomical model). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2571, brief, 'Your Skin Unmasked dermatology epidermis dermis pores melanin hair follicle')
    print("SUCCESS:", res)
