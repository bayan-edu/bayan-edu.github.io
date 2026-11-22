import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Memories - Good and Bad". The title "Memories - Good and Bad" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COGNITIVE PSYCHOLOGY AND MEMORY DAYLIGHT STYLE: A sunlit wooden desk in warm morning sunshine. An open vintage leather-bound photo album displaying sunlit landscape photographs, beside an antique twin-lens reflex camera, a delicate hourglass with flowing golden sand, and subtle, glowing neural memory network pathways weaving softly between the objects. Palette: leather album warm saddle brown, photographs vibrant vintage colors, neural pathways soft glowing amber, and sunlight warm white. Psychology of memory, emotions, cognitive processing, reflective and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2648, brief, 'Memories neuroscience memory photo album vintage camera polaroid synapses')
    print("SUCCESS:", res)
