import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Amazon Rainforest". The title "The Amazon Rainforest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AMAZON RIVER BASIN & CANOPY PANORAMA DAYLIGHT STYLE: A breathtaking, sun-drenched aerial panorama of the Amazon River basin in radiant daylight. In the center foreground, the sweeping, wide winding curves of the Amazon River glistening like liquid turquoise through an endless sea of emerald-green jungle canopy. In the foreground canopy, towering kapok trees with giant buttress roots host blooming pink orchids and giant bromeliads, with colorful scarlet macaws gliding gracefully across the sunbeams. Palette: rainforest canopy rich jade and emerald, river glistening turquoise, macaws scarlet red and royal blue, and sky brilliant cyan. Tropical ecology, Amazon rainforest, global biodiversity, river hydrology, magnificent, vibrant, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1532, brief, 'The Amazon Rainforest')
    print("SUCCESS:", res)
