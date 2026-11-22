import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Oh, My Aching Head!". The title "Oh, My Aching Head!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MEDICAL NEUROSCIENCE & ANATOMY STUDY DAYLIGHT STYLE: A calm, sunlit medical biology laboratory and study bathed in gentle morning light. In the center foreground, an anatomical translucent acrylic model of the human brain and cranial blood vessels, showing sensory nerve pathways highlighted in soft colors. A cooling gel compress, a glass pitcher of clear pure water with lemon slices, a medicinal lavender blossom, and clean medical anatomical diagrams illustrating stress, hydration, and vascular circulation. Palette: calming medical cyan, soft lavender purple, optic white, gentle coral, and natural morning sunlight. Human biology, neurology, health science, body awareness, peaceful and informative. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1575, brief, 'Oh My Aching Head headache neurology cranial nerves')
    print("SUCCESS:", res)
