import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Do Pigeons Bob Their Heads When They Walk?". The title "Why Do Pigeons Bob Their Heads?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AVIAN OPTOKINETICS & SENSORY BIOLOGY SUNNY DAYLIGHT STYLE: A charming, sun-drenched European city plaza with cobblestones in bright morning sunshine. In the center foreground, a handsome rock pigeon with iridescent purple and emerald green neck feathers captured in motion along cobblestones. Clever stroboscopic vector ghost outlines illustrating the two distinct phases of pigeon locomotion: the "thrust" phase where the head pushes forward, and the "hold" phase where the head stays completely stationary in space to stabilize the retinal image and calculate motion parallax! Optokinetic eye tracking diagrams and vision focus arrows in clear educational vector graphics. Palette: pigeon slate grey, neck feather iridescent emerald and amethyst, cobblestone amber, and sunny plaza gold. Avian sensory biology, optokinetic reflex, visual stabilization, animal locomotion, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1761, brief, 'Pigeons Bob Heads avian optokinetics retinal stabilization vision')
    print("SUCCESS:", res)
