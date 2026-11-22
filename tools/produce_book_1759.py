import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ig Nobel Winners". The title "Ig Nobel Winners" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WHIMSICAL YET GENUINE SCIENTIFIC EXPERIMENTATION STYLE: A cheerful, brightly illuminated university physics and biology laboratory in sunny morning daylight. In the center foreground, the famous diamagnetic levitating live frog floating stably in a high magnetic field solenoid bore! Beside it, other delightful real-world scientific curiosity experiments: a pizza-box lid anti-soggy thermal physics model, and a clock that runs away and hides (Clocky). Chalkboard equations, laboratory beakers, award medals, and inquisitive smiling science atmosphere in clean aesthetic style. Palette: laboratory clean white, frog leaf green, solenoid copper orange, electric cyan, and medal gold. Curiosity-driven science, physics of levitation, Ig Nobel discoveries, creative thinking, joyful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1759, brief, 'Ig Nobel Winners humorous science discovery genuine research')
    print("SUCCESS:", res)
