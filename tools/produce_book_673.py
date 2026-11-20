import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Smoke Box". '
    'The title "The Smoke Box" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT APICULTURE BEEKEEPING DAYLIGHT STYLE: A sun-drenched, radiant rural apiary orchard on a beautiful warm morning with golden sunbeams streaming through flowering trees. '
    'In the center foreground, a classic stainless-steel beekeeping smoker (smoke box) with a leather bellow, releasing a gentle, soft plume of clean white aromatic smoke into the morning breeze. '
    'Beside the smoker on a rustic wooden bench sits a clean wooden beehive frame showcasing golden beeswax honeycomb cells, a jar of sparkling amber honey catching radiant sunbeams, and a neatly folded white canvas beekeeper hat. '
    'Palette: warm honey gold, bright stainless steel, clean white, natural honeycomb amber, and lush orchard green. '
    'Educational, bright, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(673, brief, "The Smoke Box")
    print("SUCCESS:", res)
