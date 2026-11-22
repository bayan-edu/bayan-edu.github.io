import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Plants that Heal". The title "Plants that Heal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MEDICINAL HERB BOTANY DAYLIGHT STYLE: A sun-soaked herbalist\'s outdoor garden table in bright morning daylight. Freshly harvested healing plants: delicate white chamomile blossoms with golden centers, purple lavender sprigs, pungent ginger rhizomes, and fresh peppermint leaves resting on a rustic wooden tray beside an antique brass balance scale, ceramic tea mug, and a dried herb bundle. Palette: chamomile white and gold, lavender violet, foliage fresh mint green, and rustic wood warm amber. Medicinal botany, ethnobotany, herbal remedies, natural healing, fragrant, peaceful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2580, brief, 'Plants that Heal medicinal botany chamomile ginger lavender peppermint')
    print("SUCCESS:", res)
