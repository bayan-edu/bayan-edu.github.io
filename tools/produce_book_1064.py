import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Don\'t People on the Other Side Fall Off?". The title "Why Don\'t People on the Other Side Fall Off?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PLANETARY GRAVITY DAYLIGHT STYLE: A sunlit, magnificent orbital view of planet Earth in vibrant space, bathed in radiant daylight from a brilliant golden sun. In the center foreground, the brilliant blue-and-green globe of Earth with floating symbolic scientific elements: a bright red apple, a brass compass, and a miniature model satellite all gracefully held in harmonious gravitational orbit around the world. Luminous golden and azure gravitational field lines curve gently around the planet, demonstrating how mass attracts everything towards the center from every angle. Palette: oceanic sapphire blue, continent emerald green, atmosphere azure, apple crimson, and radiant sunbeam gold. Planetary physics, gravity, orbital mechanics, Earth science, bright, educational, inspiring, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1064, brief, "Why Don't People on the Other Side Fall Off?")
    print("SUCCESS:", res)
