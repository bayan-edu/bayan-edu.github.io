import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Venus: In Depth". The title "Venus: In Depth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RADIANT PLANETARY ASTRONOMY & RADAR MAPPING STYLE: A stunning, scientifically grounded view of planet Venus in space, bathed in radiant solar light from the Sun. The left hemisphere shows the thick, swirling golden-amber sulfuric acid cloud deck reflecting brilliant sunlight. The right hemisphere peels back into high-resolution radar topography showing immense volcanic shields (Maat Mons), rift valleys, and molten lava plains. An orbital scientific mapping satellite with solar panels extending in the foreground. Palette: golden amber, sulfuric yellow, volcanic copper orange, deep space black, and solar white. Solar system astronomy, planetary science, greenhouse atmospheres, space exploration. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1563, brief, 'Venus In Depth planetary astronomy venus')
    print("SUCCESS:", res)
