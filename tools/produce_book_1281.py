import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "New Help for an Old Mammal". The title "New Help for an Old Mammal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT HAWAIIAN COASTAL CONSERVATION DAYLIGHT STYLE: A sun-drenched, pristine tropical beach in the Hawaiian islands in radiant bright daylight. In the center foreground, a gentle, sleek Hawaiian monk seal resting peacefully on warm golden sands, its glossy coat catching sunlight. Gently lapping turquoise ocean waves, vibrant green coastal naupaka shrubs, black lava rock outcrops, and a clean wooden marine sanctuary conservation sign. Palette: ocean sparkling turquoise, beach golden sand, seal sleek warm gray, vegetation emerald, and radiant sunbeam gold. Marine biology, endangered species conservation, Hawaiian monk seal, ocean stewardship, bright, peaceful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1281, brief, 'New Help for an Old Mammal')
    print("SUCCESS:", res)
