import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Chasing the Rain". The title "Chasing the Rain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MONSOON ARRIVAL & EMERALD FIELDS DAYLIGHT STYLE: A breathtaking, sun-illuminated Indian countryside landscape during the dramatic arrival of the southwest monsoon. In the center, dramatic billowing monsoon rainclouds releasing curtains of refreshing rain, while radiant sunbeams break through the cloud edges to illuminate vibrant emerald terraced rice paddies. In the foreground, a peacock with glistening azure and emerald tail feathers perched on a weathered stone ledge catching fresh raindrops. Palette: rice paddy vivid emerald green, raincloud deep slate and silver, peacock sapphire and jade, and sunbeam radiant gold. Monsoon meteorology, seasonal climate, agriculture, water of life, India seasons, dynamic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1495, brief, 'Chasing the Rain')
    print("SUCCESS:", res)
