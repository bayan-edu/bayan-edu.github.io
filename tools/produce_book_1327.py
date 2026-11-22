import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Future of Movies Is Unreal". The title "The Future of Movies Is Unreal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VIRTUAL PRODUCTION & LED CINEMA STAGE DAYLIGHT STYLE: A sunlit, high-tech movie production soundstage in bright daylight. In the center foreground, an enormous curved photorealistic LED volume screen wall displaying a stunning, seamless virtual daylight alien planet landscape. On camera dolly tracks in the foreground sits a high-end digital cinema camera with precision lens and matte box, beside a traditional wooden film clapperboard and studio lighting rigs. Palette: virtual landscape vibrant emerald and turquoise, camera matte black and titanium, studio lights warm tungsten, and floor studio gray. Virtual production, cinematography, LED volume stages, real-time CGI, filmmaking technology, bright, forward-looking, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1327, brief, 'The Future of Movies Is Unreal')
    print("SUCCESS:", res)
