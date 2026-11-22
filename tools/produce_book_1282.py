import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Peregrine Falcon". The title "Peregrine Falcon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MOUNTAIN CLIFF ORNITHOLOGY DAYLIGHT STYLE: A breathtaking, sun-illuminated mountain cliff aerie high in the sky in bright morning daylight. In the center foreground, a majestic adult peregrine falcon perched proudly on a rugged granite rock ledge, showing its sharp curved beak, keen yellow-ringed dark eyes, barred chest plumage, and powerful aerodynamic wings. In the vast background, sweeping green valleys and winding blue rivers stretch to the horizon under a clear azure sky. Palette: falcon slate blue, barred cream, and eye-ring yellow, granite stone gray, valley lush green, and sky crisp cyan. Ornithology, birds of prey, peregrine falcon, aerial speed, wildlife ecology, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1282, brief, 'Peregrine Falcon')
    print("SUCCESS:", res)
