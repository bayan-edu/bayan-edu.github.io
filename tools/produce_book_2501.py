import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Live Pharmacy". The title "Live Pharmacy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MEDICINAL BOTANY PHARMACOLOGY DAYLIGHT STYLE: A sun-soaked botanical garden and herbal apothecary workbench in daytime. Potted living medicinal plants: fresh Aloe Vera with soothing translucent gel, blooming purple Echinacea coneflowers, fragrant peppermint, and golden turmeric rhizomes, beside an antique marble mortar and pestle with crushed healing herbs, and glass tincture vials. Palette: medicinal foliage vibrant jade and emerald green, echinacea violet, turmeric golden ochre, and marble mortar ivory. Pharmacognosy, medicinal botany, plant chemistry, natural healing, fresh and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2501, brief, 'Live Pharmacy medicinal plants herbal pharmacology botany aloe vera')
    print("SUCCESS:", res)
