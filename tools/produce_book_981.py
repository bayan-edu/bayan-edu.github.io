import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Making Mistakes is Good for Your Brain". '
    'The title "Why Making Mistakes is Good for Your Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT NEUROSCIENCE & LEARNING SCIENCE DAYLIGHT STYLE: A sunlit, vibrant creative study workshop on a glorious sunny morning under bright daylight. '
    'In the center foreground, an artistic translucent glass model of the human brain with glowing, colorful neural pathways and sparkling gold-and-blue synaptic connections. '
    'Beside the brain model on a clean wooden desk rest an interlocking geometric puzzle with pieces connecting, colored pencils, and an open notebook with diagrams of dendritic growth. '
    'In the background, sunlit garden windows overlook green trees under a clear azure sky. '
    'Palette: neural electric cobalt, synapse golden amber, puzzle vibrant colors, and bright daylight ivory. '
    'Neuroscience, growth mindset, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(981, brief, "Why Making Mistakes is Good for Your Brain")
    print("SUCCESS:", res)
