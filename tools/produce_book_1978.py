import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Antarctica?". The title "What Is Antarctica?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANTARCTIC POLAR LANDSCAPE DAYLIGHT STYLE: A breathtaking Antarctic vista bathed in brilliant 24-hour polar summer sunshine. Colossal tabular icebergs with translucent turquoise underwater shelves floating in crystal-still polar waters, backed by soaring snow-covered glaciers and nunatak mountain peaks. A small colony of emperor penguins with sleek black and white plumage and golden neck patches standing gracefully on pristine pack ice. Palette: glacier ice turquoise cyan and brilliant white, polar water deep navy, penguin accents golden yellow, and sky crisp pale blue. Polar geography, climate science, Antarctic wildlife, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1978, brief, 'What Is Antarctica polar geography icebergs glaciers emperor penguins')
    print("SUCCESS:", res)
