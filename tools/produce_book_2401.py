import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Twist and Shout". The title "Twist and Shout" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGY TORNADO VORTEX DYNAMICS STYLE: A dramatic educational daylight storm scene across the Great Plains. A powerful, rotating supercell thunderstorm with a distinct, sculpted funnel cloud (tornado) touching down on open prairie grassland, illuminated by bursts of sunlight breaking through the edge of the storm wall. Clean educational vector arrows showing warm moist updrafts and cold downdrafts feeding the mesocyclone. Palette: storm clouds deep slate blue and charcoal, sunbeams radiant gold, prairie grass emerald and amber, and vector arrows neon cyan. Meteorological science, severe weather, vortex physics, atmospheric dynamics, powerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2401, brief, 'Twist and Shout severe weather tornado meteorology supercell vortex')
    print("SUCCESS:", res)
