import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Gyalmo, the Queen of the Mountains". The title "Gyalmo, the Queen of the Mountains" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SNOW LEOPARD HIMALAYAN WILDLIFE STYLE: A breathtaking high-altitude Himalayan mountain peak in crisp morning sunshine. Perched regally on a craggy granite precipice is a magnificent wild snow leopard (Panthera uncia), its thick smoky-grey coat adorned with dark rosette patterns, long bushy tail wrapped around its paws for warmth, and pale green eyes looking across snow-dusted valleys under a bright azure sky. Palette: snow leopard fur smoky cream and dark charcoal, mountain cliffs granite grey and snow white, and high altitude sky brilliant cyan. Apex predator conservation, mountain ecology, feline adaptations, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2296, brief, 'Gyalmo Queen of Mountains snow leopard Panthera uncia Himalayas daylight')
    print("SUCCESS:", res)
