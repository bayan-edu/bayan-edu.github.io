import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Snow Leopard". '
    'The title "The Snow Leopard" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HIMALAYAN ALPINE DAYLIGHT STYLE: A sun-drenched, breathtaking high Himalayan mountain ridge under a radiant blue sky in full bright daylight. '
    'In the center foreground, a magnificent snow leopard with dense, luxurious smoky-grey patterned fur and a long thick ringed tail, sitting poised and alert on a sunlit granite cliff crag. '
    'Sunlight catches the crystalline snow dusting the rocky outcrop around its large paws. '
    'In the background, sharp snow-capped Himalayan mountain summits and sunlit glacial passes stretch across the horizon. '
    'Palette: snow leopard smoky white and charcoal rosettes, alpine snow diamond white, granite grey, and azure sky blue. '
    'Wildlife biology, endangered big cats, high altitude ecology, bright, majestic, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(998, brief, "The Snow Leopard")
    print("SUCCESS:", res)
