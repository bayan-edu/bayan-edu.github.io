import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Planet?". '
    'The title "What Is a Planet?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PROTOPLANETARY ACCRETION & ORRERY STYLE: A brilliant, sun-illuminated view of planetary genesis and astrophysics. '
    'In the center, a luminous newborn golden sun surrounded by a vast swirling protoplanetary accretion disk of cosmic dust and glowing asteroids clumping together into sleek spherical newborn planets. '
    'In the foreground, an exquisite antique brass mechanical orrery model with polished planetary spheres rotating on intricate geared clockwork arms, catching gleaming starlight. '
    'Palette: newborn sun radiant gold, accretion disk fiery amber and dust terracotta, orrery polished brass, and cosmic deep navy. '
    'Planetary science, solar system formation, astronomy, planets, bright, educational, breathtaking. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1041, brief, "What Is a Planet?")
    print("SUCCESS:", res)
