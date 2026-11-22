import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Magnetism - Magnets: Types and Uses". The title "Magnets: Types & Uses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. APPLIED MAGNETISM & TECHNOLOGICAL INNOVATION DAYLIGHT STYLE: A modern, sunlit engineering exploration workbench bathed in natural daylight. A diverse showcase of technological magnets: ultra-powerful shiny nickel-plated neodymium rare-earth disc magnets, a coiled copper wire electromagnet with iron core, a ceramic bar magnet, and a miniature maglev train track floating effortlessly on magnetic repulsion tracks. An electrical circuit switch, magnetic field sensor meter, and compass navigational rose on clean timber. Palette: neodymium shiny chrome silver, electromagnet copper gold, ceramic magnet slate, and bright lab daylight white. Applied physics, types of magnets, electromagnets, magnetic levitation, technological uses, modern and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1792, brief, 'Magnets Types and Uses neodymium electromagnet maglev compass')
    print("SUCCESS:", res)
