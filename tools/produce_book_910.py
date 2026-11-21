import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "That Tickles!". '
    'The title "That Tickles!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SENSORY BIOLOGY & NEUROSCIENCE DAYLIGHT STYLE: A sunlit, radiant sensory science laboratory on a cheerful morning with bright natural sunlight streaming across a clean white workspace. '
    'In the center foreground, a delicate iridescent peacock feather and a soft white feather resting next to an educational glass model of sensory neural touch receptors. '
    'In the background, a colorful, glowing scientific diagram of brain neural pathways illuminating sensory touch reflexes with sparkling golden light fibers. '
    'Palette: iridescent peacock teal, neural magenta, pearl white, and bright golden sunlight. '
    'Sensory biology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(910, brief, "That Tickles!")
    print("SUCCESS:", res)
