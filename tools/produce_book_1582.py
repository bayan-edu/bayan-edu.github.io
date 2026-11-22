import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s Bugging Everyone?". The title "What\'s Bugging Everyone?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT GARDEN ENTOMOLOGY DAYLIGHT STYLE: A cheerful, sunlit garden exploration scene bathed in radiant morning sunshine. In the foreground, a charming array of beneficial garden insects resting on a lush green hosta leaf: a spotted red ladybug, a metallic emerald jewel beetle, a graceful praying mantis, and a honeybee. A brass explorer\'s magnifying glass revealing the intricate iridescent textures of insect wings and compound eyes. In the background, colorful blooming coneflowers and fluttering monarch butterflies in bright daylight. Palette: ladybug crimson red, beetle iridescent emerald, daisy yellow, leaf green, and sunny sky blue. Entomology, insect ecology, biodiversity, garden science, playful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1582, brief, 'Whats Bugging Everyone entomology insects biodiversity')
    print("SUCCESS:", res)
