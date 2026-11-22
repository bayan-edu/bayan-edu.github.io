import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Do Plants Need?". The title "What Do Plants Need?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHEERFUL BOTANICAL DISCOVERY SUNNY DAYLIGHT STYLE: A sun-drenched, friendly garden potting bench on a glorious sunny spring morning. In the center foreground, a healthy, thriving young bean plant seedling growing in a classic terracotta clay pot. Four clear educational iconography elements illustrated in bright harmony: brilliant golden sunbeams (Light), a glass watering can with glistening water droplets (Water), rich dark compost soil with visible earthworm (Nutrients), and gentle breeze wave lines (Air/CO2). A miniature greenhouse and seedling trays in the bright background under a radiant blue sky. Palette: seedling fresh lime green, terracotta warm orange, water droplet cyan, sunbeam yellow, and sky blue. Plant biology, primary botany, gardening science, plant needs, cheerful, engaging, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1677, brief, 'What Do Plants Need primary botany sunlight water soil')
    print("SUCCESS:", res)
