import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Ecosystem of the Forest". The title "The Ecosystem of the Forest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT FOREST ECOLOGY & NUTRIENT CYCLING DAYLIGHT STYLE: A sun-drenched temperate woodland ecosystem in radiant morning daylight. In the center foreground, a magnificent nurse log covered in velvety green moss, bracket fungi, and sprouting oak seedlings, showcasing natural recycling. Sunbeams filter through a lush canopy of broadleaf trees, illuminating flying honeybees, forest ferns, and clean educational graphic arrows showing the flow of carbon dioxide, oxygen, and soil nutrients. Palette: forest canopy vibrant jade and emerald, moss chartreuse, tree bark warm umber, and sunbeam radiant gold. Ecology, forest ecosystems, photosynthesis, food webs, biodiversity, bright, rich, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1449, brief, 'The Ecosystem of the Forest')
    print("SUCCESS:", res)
