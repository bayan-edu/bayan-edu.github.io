import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to Spy on Sharks". The title "How to Spy on Sharks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARINE BIOTELEMETRY & SHARK TRACKING DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical ocean expanse in sparkling midday sunlight. In the center foreground, a magnificent, peaceful tiger shark swimming smoothly near the surface, showing a small scientific satellite archival tag attached to its dorsal fin. Above on the surface, a solar-powered oceanographic wave glider drone recording acoustic pings, transmitting migration tracking coordinates to an orbiting satellite in clean graphics. Dancing sunbeams piercing deep into the turquoise water column. Palette: shark skin sleek grey, ocean sapphire and aquamarine, satellite tag caution yellow, and sunbeam gold. Marine biology, shark conservation, biotelemetry, satellite oceanography, migration tracking, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1890, brief, 'Spy on Sharks marine telemetry acoustic satellite tracking tags')
    print("SUCCESS:", res)
