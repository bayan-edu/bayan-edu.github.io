import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Clues About the Continents". '
    'The title "Clues About the Continents" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PLATE TECTONICS & CONTINENTAL DRIFT DAYLIGHT STYLE: A sunlit, inspiring geographer\'s study and map room on a bright sunny day under natural daylight. '
    'In the center foreground, on a beautiful polished oak table: an antique illustrated map showing the continents of South America and Africa fitting perfectly together like giant jigsaw puzzle pieces, with matching fossil tracks of Mesosaurus highlighted across the Atlantic coastlines. '
    'Beside the map rest an ornate spinning desktop globe, fossil rock samples, and a brass drafting divider compass. '
    'In the background, sun-drenched library windows look out over green coastal hills under a clear blue sky. '
    'Palette: parchment antique cream, ocean cyan and sapphire, land emerald and ochre, and brass gold. '
    'Plate tectonics, continental drift, Pangaea, earth science, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1015, brief, "Clues About the Continents")
    print("SUCCESS:", res)
