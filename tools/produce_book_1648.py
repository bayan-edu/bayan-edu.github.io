import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Big Is the Moon?". The title "How Big Is the Moon?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLANETARY SCALE & COMPARATIVE ASTRONOMY STYLE: A brilliant, scientifically grounded scale comparison in space illuminated by radiant sunlight. The vibrant blue-and-white marble of Earth shown side-by-side with Earth\'s Moon to true scale (Moon diameter roughly one-fourth of Earth). Clean geometric measurement calipers, diameter dimension callouts (3,474 km vs 12,742 km), and concentric circular orbit radius lines. A globe of Earth and a high-detail lunar globe resting on a modern educational wooden table in bright morning sunlight. Palette: Earth ocean blue, lunar silver grey, measurement gold, and clean bright sunlight white. Astronomy, planetary scale, lunar geometry, space science, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1648, brief, 'How Big Is the Moon lunar scale planetary comparison')
    print("SUCCESS:", res)
