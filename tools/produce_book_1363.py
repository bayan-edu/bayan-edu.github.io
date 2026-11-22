import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: The Dream and Other Stories". The title "The Dream and Other Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT WHIMSICAL ROADSIDE ADVENTURE DAYLIGHT STYLE: A sunlit, charming English country road on a glorious sunny morning in bright daylight. In the center foreground, a polished vintage 1930s British roadster motorcar parked safely beside a picturesque country hedge bursting with wild hawthorn blossoms. A playful, surreal symbolic floating glass hourglass with golden sand stands on a stone milestone beside an open road map, under a bright blue sky with cheerful fluffy clouds. Palette: roadster racing green, country lane warm gravel, hawthorn blossom white, and sky brilliant cyan. Short stories, classic literature, roadside mystery, nostalgic adventure, bright, whimsical, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1363, brief, 'Literature The Dream and Other Stories')
    print("SUCCESS:", res)
