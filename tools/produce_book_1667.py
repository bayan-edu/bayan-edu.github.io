import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Speaking with Scent". The title "Speaking with Scent" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHEMICAL COMMUNICATION & PHEROMONES DAYLIGHT STYLE: A sun-drenched, close-up macro nature scene on a bright sunny morning. A line of black garden ants marching along a weathered wooden garden twig, following an invisible glowing golden trail of chemical pheromones. A Luna moth perched nearby on a blooming honeysuckle flower, with its magnificent feathery antennae catching microscopic scent molecules floating in the breeze. Stylized molecular vapor trails and olfactory receptor diagrams rendered in clean, cheerful educational style. Palette: honeysuckle blossom cream, moth pale emerald, ant lacquer black, pheromone golden glow, and sunny garden green. Chemical communication, pheromones, insect sensory biology, nature chemistry, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1667, brief, 'Speaking with Scent chemical communication pheromones ants')
    print("SUCCESS:", res)
