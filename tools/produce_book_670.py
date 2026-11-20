import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "New Cotton in Hot Water". '
    'The title "New Cotton in Hot Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TEXTILE CRAFT & SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant dressmaking atelier on a bright sunny morning with natural golden light streaming across a wide wooden tailoring table. '
    'In the center foreground, bolts of crisp, premium pure woven cotton fabrics in vibrant pastel floral and geometric patterns. '
    'Resting on the smooth cutting table are polished vintage brass tailor scissors, a coiled yellow tailor measuring tape, and neat swatches of pre-washed, steam-ironed crisp cotton fabric drying on a small wooden tabletop rack. '
    'Palette: warm oak wood, pure cotton white, pastel rose, soft cornflower blue, and gleaming brass gold. '
    'Craftsman-like, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(670, brief, "New Cotton in Hot Water")
    print("SUCCESS:", res)
