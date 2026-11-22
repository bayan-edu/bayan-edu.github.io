import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Who Was Alan Shepard?". '
    'The title "Who Was Alan Shepard?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SPACE EXPLORATION & APOLLO MOON STYLE: A dramatic and inspiring scene of early American human spaceflight and the Apollo moon landing. '
    'In the center foreground, on the rugged, cratered lunar surface of Fra Mauro: the iconic golden-and-silver Apollo 14 Lunar Module spacecraft standing proudly under the bright sunlight of the Moon. '
    'Beside the lander rests scientific lunar surface equipment and an Apollo astronaut space helmet resting on an equipment case, with its mirrored gold reflective visor showing the breathtaking reflection of Earth rising and the starry sky (no human face visible inside). '
    'In the background, the Freedom 7 Mercury capsule silhouette and radiant blue-and-white Earth glowing in deep space. '
    'Palette: lunar dust pearl grey, lunar module foil gold, Earth sapphire and cloud white, and celestial black. '
    'Space exploration, NASA history, Apollo program, bright, educational, historic, inspiring. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1009, brief, "Who Was Alan Shepard?")
    print("SUCCESS:", res)
