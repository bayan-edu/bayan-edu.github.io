import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rock, Rumble. . .Roar!". The title "Rock, Rumble... Roar!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEISMOLOGY & EARTHQUAKE GEOLOGY DAYLIGHT STYLE: A sunlit, high-tech geological seismology observatory perched near a rugged mountain fault line. In the center foreground, a classic rotating seismograph drum with a delicate stylus pen actively tracing jagged seismic P-waves and S-waves on chart paper. A cutaway block diagram showing an earthquake focus (hypocenter) deep in the bedrock and radiating seismic energy shockwaves reaching the surface epicenter. A geological compass clinometer and split rock core samples on a field research table in bright morning sunlight. Palette: chart paper white, seismic wave crimson red, bedrock granite grey, instrument brass gold, and clear sky blue. Seismology, earthquakes, tectonic fault lines, seismic waves, geology, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1700, brief, 'Rock Rumble Roar seismology earthquakes geology Richter scale')
    print("SUCCESS:", res)
