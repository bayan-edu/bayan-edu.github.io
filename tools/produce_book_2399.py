import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mystery of the Whistling Building". The title "The Mystery of the Whistling Building" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROACOUSTICS ARCHITECTURAL ENGINEERING STYLE: A sunlit, modern architectural cityscape on a breezy, bright sunny day. A striking glass-and-steel skyscraper with ornate decorative facade louvers and balconies, with clean educational airflow streamlines curling into vortex shedding patterns (KÃ¡rmÃ¡n vortex street) through the building\'s metal grilles, showing acoustic resonance soundwaves explaining why the wind causes the building to whistle like a giant flute. Palette: skyscraper glass reflective cyan and steel silver, airflow streamlines radiant golden yellow, acoustic waves neon green, and sky deep blue. Architectural acoustics, fluid dynamics, resonance physics, civil engineering mystery, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2399, brief, 'Mystery Whistling Building architectural acoustics wind vortex aeroacoustics')
    print("SUCCESS:", res)
