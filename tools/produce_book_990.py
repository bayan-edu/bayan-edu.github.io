import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ice Ages". '
    'The title "Ice Ages" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GLACIOLOGY & PREHISTORIC ARCTIC DAYLIGHT STYLE: A sun-drenched polar landscape and prehistoric glacial valley under crisp brilliant daylight and clear sapphire sky. '
    'In the center foreground, towering translucent blue glacial ice structures and crystalline snow formations sparkling in the warm sun. '
    'In the middle ground across the sunlit permafrost tundra, a magnificent woolly mammoth with impressive curved ivory tusks and thick auburn fur strides majestically. '
    'In the background, snow-capped alpine mountain peaks rise beneath radiant golden sunbeams. '
    'Palette: glacial cyan, crystalline snow white, mammoth warm auburn, and crisp sky sapphire. '
    'Earth history, glaciology, ice age animals, bright, educational, majestic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(990, brief, "Ice Ages")
    print("SUCCESS:", res)
