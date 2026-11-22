import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Science Behind How Fruits Ripen". The title "The Science Behind How Fruits Ripen" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PLANT PHYSIOLOGY & FRUIT RIPENING DAYLIGHT STYLE: A sun-drenched harvest table in an orchard in bright morning daylight. In the center foreground, a clear visual ripening progression of fruits: unripe firm green bananas and pears transitioning smoothly into golden-yellow, sweet, perfectly ripe fruit. Surrounding the fruit, glowing translucent molecular ball-and-stick models of ethylene gas (C2H4) and starch converting into fructose sugars, with an open botany notebook. Palette: unripe fruit vibrant lime green, ripe fruit golden yellow and honey, desk natural pine, and daylight warm amber. Plant biology, fruit ripening, ethylene hormone, biochemistry, agricultural science, wholesome, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1538, brief, 'The Science Behind How Fruits Ripen')
    print("SUCCESS:", res)
