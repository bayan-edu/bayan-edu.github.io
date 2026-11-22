import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Antibiotics: Too Much of a Good Thing?". The title "Antibiotics: Too Much of a Good Thing?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MICROBIOLOGY & ANTIBIOTIC STEWARDSHIP DAYLIGHT STYLE: A sunlit microbiology research workbench in bright natural daylight. In the center foreground, clear agar petri dishes showing lawn cultures of bacteria with distinct, clear circular zones of inhibition around paper antibiotic disks. Beside the petri dishes rest a modern optical microscope, an analytical micropipette, amber medicine bottles, and an educational infographic illustrating bacterial mutation and responsible antibiotic use. Palette: agar plates amber and mint, microscope brushed steel, and laboratory daylight clean white. Microbiology, pharmacology, antibiotic resistance, healthcare stewardship, bacteriology, crisp, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1549, brief, 'Antibiotics Too Much of a Good Thing')
    print("SUCCESS:", res)
