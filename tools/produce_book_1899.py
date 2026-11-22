import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "When Lightning Strikes". The title "When Lightning Strikes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ATMOSPHERIC ELECTRICAL DISCHARGE DAYLIGHT STYLE: A dramatic meteorological scene capturing a lightning discharge under daytime storm conditions. A massive, branching jagged lightning bolt of electric blue and incandescent white discharging safely from a cumulonimbus cloud into a copper lightning rod atop an observation tower. Cutaway educational graphics showing lightning safety principles: Faraday cage principle inside an automobile, stepped leader ionization, and grounding dissipation rods into Earth. Palette: lightning electric cyan and pure white, storm cloud deep slate, copper lightning rod gold, and hillside green. Atmospheric electricity, lightning physics, lightning rods, electrical grounding, storm safety, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1899, brief, 'When Lightning Strikes atmospheric electrical discharge physics safety')
    print("SUCCESS:", res)
