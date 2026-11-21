import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mercury". '
    'The title "Mercury" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT INNER PLANETARY ASTRONOMY DAYLIGHT STYLE: An intense, sun-drenched close-up view of planet Mercury illuminated by the brilliant nearby sun. '
    'In the center, the smallest terrestrial planet displays its intricate, heavily cratered slate-grey surface, dramatic geological cliff ridges, and smooth ancient volcanic plains bathed in sharp direct sunlight. '
    'In the orbital foreground, an advanced scientific space exploration probe with protective ceramic heat shields and angled solar panels conducts planetary geological surveys. '
    'Palette: Mercury cratered slate grey, brilliant solar gold, ceramic probe white, and cosmic space blue. '
    'Planetary science, astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(958, brief, "Mercury")
    print("SUCCESS:", res)
