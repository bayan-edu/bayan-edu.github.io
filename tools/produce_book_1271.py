import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Discoveries in the Deep: The Titanic". The title "Discoveries in the Deep: The Titanic" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DEEP OCEAN EXPLORATION & SUBMERSIBLE STYLE: An awe-inspiring deep-sea exploration scene on the Atlantic ocean floor. In the center foreground, a high-tech robotic yellow research submersible with powerful halogen headlights piercing the deep ocean waters to illuminate a massive historic ship anchor and bronze capstan resting on the ocean floor, encrusted with deep-sea rusticles and marine corals. Robotic manipulator arms and underwater camera pods study the historic artifacts with scientific reverence. Palette: submersible vibrant safety yellow, ocean deep indigo and sapphire, headlight brilliant white, and anchor bronze patina. Marine archaeology, underwater robotics, ocean floor discovery, history and technology, bright, educational, majestic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1271, brief, 'Discoveries in the Deep: The Titanic')
    print("SUCCESS:", res)
