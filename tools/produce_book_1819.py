import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Quake in Indonesia". The title "Quake in Indonesia" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUNDA MEGATHRUST & INDONESIAN GEOPHYSICS STYLE: A sunlit 3D geological cutaway of the Indonesian archipelago and Sunda Trench in bright daylight. The Australian tectonic plate subducting beneath the Sunda microplate along the ocean trench off Sumatra and Java. A 3D subsurface earthquake hypocenter focus with expanding seismic P-waves and S-waves, and deep sea ocean tsunami pressure buoy sensors floating on tropical blue waters. Lush green Indonesian volcanic islands under clear skies. Palette: ocean deep cobalt and turquoise, subduction magma orange, island emerald green, and seismic wave crimson. Seismology, subduction megathrust, Indonesian geology, earthquake science, tsunami early warning systems, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1819, brief, 'Quake in Indonesia Sunda megathrust seismology subduction')
    print("SUCCESS:", res)
