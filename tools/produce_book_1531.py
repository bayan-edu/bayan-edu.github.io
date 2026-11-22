import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sun Burn?". The title "Sun Burn?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SOLAR IRRADIANCE & CLIMATE FORCING STYLE: A sun-illuminated astronomical and atmospheric science visualization in bright educational daylight. In the center, the blazing golden Sun casting brilliant solar radiation rays across space toward planet Earth. Surrounding Earth, a cutaway of the atmosphere reveals gentle glowing greenhouse gas molecules (carbon dioxide, methane, water vapor) trapping infrared thermal energy, with clean temperature monitoring data callouts over blue oceans and green landmasses. Palette: Sun brilliant gold and amber, Earth sapphire and emerald, greenhouse thermal glow coral, and space deep indigo. Climate science, solar radiation, greenhouse effect, global temperature, atmospheric physics, bright, objective, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1531, brief, 'Sun Burn')
    print("SUCCESS:", res)
