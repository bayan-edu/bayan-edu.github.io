import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Field Trip". The title "Field Trip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NATURE DISCOVERY EXPEDITION DAYLIGHT STYLE: A sun-drenched outdoor nature study scene at the edge of a woodland stream in morning sunlight. Resting on a rustic wooden picnic table are an explorer\'s canvas field backpack, a brass pocket compass, a high-power magnifying glass, an open nature field guide with wildflower illustrations, a jar for pond-water observation with tadpoles, and a collecting net. Palette: canvas backpack warm khaki, brass compass gold, nature guide ivory and green, and woodland scenery sunlit emerald. Experiential learning, outdoor science, field trip exploration, hands-on, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2552, brief, 'Field Trip nature discovery backpack magnifying glass compass field guide')
    print("SUCCESS:", res)
