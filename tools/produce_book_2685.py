import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Understanding Learning Disabilities". The title "Understanding Learning Disabilities" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NEURODIVERSITY AND COGNITIVE EMPATHY DAYLIGHT STYLE: A warm, sunlit educational study table in daytime. A beautifully assembled wooden neurodiversity infinity symbol puzzle of interlocking colorful pieces (cyan, magenta, yellow, emerald), beside open illustrated storybooks, a dyslexia reading guide overlay strip, colorful sensory fidget tools, and a potted blooming sunflower under warm sunbeams. Palette: neurodiversity symbol bright cheerful spectrum, sunflower golden yellow, desk warm birch wood, and daylight soft white. Neurodiversity, learning support, educational empathy, cognitive inclusion, compassionate and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2685, brief, 'Understanding Learning Disabilities neurodiversity dyslexia colorful puzzle')
    print("SUCCESS:", res)
