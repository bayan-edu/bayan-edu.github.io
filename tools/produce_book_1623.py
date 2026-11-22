import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mix the Old with the New". The title "Mix the Old with the New" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HARMONIOUS ARCHITECTURAL INTEGRATION DAYLIGHT STYLE: A magnificent, sun-drenched architectural scene showcasing historic heritage blending seamlessly with cutting-edge sustainable modern design. A historic 19th-century red-brick and carved stone archway gracefully meeting a sleek, modern glass-and-steel atrium with a lush vertical living plant wall. Architectural drafting tools, T-squares, scale models, and modern CAD tablet displays resting on a sunny outdoor terrace table under clear blue skies. Palette: historic brick terracotta, modern glass cerulean blue, living plant emerald green, limestone cream, and sunny sky cyan. Architecture, historic preservation, modern engineering, adaptive reuse, inspiring and bright. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1623, brief, 'Mix the Old with the New architectural design historic modern')
    print("SUCCESS:", res)
