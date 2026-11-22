import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Copying Nature\'s Engineers". The title "Copying Nature\'s Engineers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT BEAVER DAM BIOMIMICRY DAYLIGHT STYLE: A sun-drenched forest river wetland in radiant morning daylight. In the center foreground, an intricate, expertly constructed beaver dam made of interlocking birch branches, mud, and river stones, backing up a tranquil pond where a sturdy beaver lodge rises proudly. Floating beside the dam, an engineer\'s waterproof tablet displays technical structural diagrams comparing the beaver dam\'s arch design to modern water-management weirs. Palette: wetland water clear aqua, birch wood pale cream, lodge bark warm umber, and forest foliage emerald. Biomimicry, natural engineering, beaver ecology, water conservation, wetlands, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1444, brief, 'Copying Natures Engineers')
    print("SUCCESS:", res)
