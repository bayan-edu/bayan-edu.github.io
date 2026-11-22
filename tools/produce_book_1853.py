import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Now Hear This!". The title "Now Hear This!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AUDITORY BIOLOGY & SOUND ACOUSTICS DAYLIGHT STYLE: A bright, sunlit acoustics and medical biology laboratory in clean morning light. In the center foreground, an accurate 3D translucent anatomical cutaway model of the mammalian ear: the external pinna, vibrating tympanic membrane (eardrum), auditory ossicles (hammer, anvil, stirrup), and the spiral cochlea with sensory hair cells. Beside it, a vibrating brass tuning fork creating visible sinusoidal ripples across a clear dish of water, and decibel frequency wave meters. Palette: cochlea translucent coral and pearl, tuning fork polished brass gold, sound wave electric cyan, and clean studio white. Human biology, auditory system, sound physics, acoustics, sensory anatomy, clear, fascinating, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1853, brief, 'Now Hear This acoustic physics hearing anatomy cochlea eardrum')
    print("SUCCESS:", res)
