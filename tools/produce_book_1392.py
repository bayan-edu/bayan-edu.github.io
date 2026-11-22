import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Black Cat". The title "The Black Cat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT EGYPTIAN ANTIQUITIES DAYLIGHT STYLE: A sun-drenched archaeological terrace in Cairo overlooking the golden Giza plateau in bright morning daylight. In the center foreground, a magnificent ancient Egyptian black basalt statuette of the cat goddess Bastet adorned with delicate golden earrings and collar, resting on an archaeologist\'s linen-covered worktable. Beside the statuette lie an antique magnifying loupe, rolled papyrus excavation maps, and a brass compass. In the background, the iconic Great Pyramids glow under a brilliant azure sky. Palette: cat statue polished black basalt and gold, desert sand warm ochre, and sky clear Egyptian cyan. Archaeological mystery, Egyptian antiquities, inspector Salahadin, ancient history, bright, dignified, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1392, brief, 'The Black Cat')
    print("SUCCESS:", res)
