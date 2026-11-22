import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Vortex". The title "The Vortex" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT POLAR VORTEX & JET STREAM METEOROLOGY STYLE: A sunlit, dynamic satellite perspective of Earth\'s northern hemisphere in bright educational daylight. In the center, a powerful circulating polar vortex of frigid arctic air contained by a meandering, wavy jet stream wind ribbon flowing around North America and Europe. Below, snow-covered continents and deep blue oceans are bathed in crisp daylight, with clear educational temperature gradient ribbons indicating freezing cold vs temperate air masses. Palette: vortex icy diamond white and glacial cyan, jet stream ribbon electric amber, oceans deep sapphire, and land snow-dusted emerald. Meteorology, polar vortex, atmospheric jet streams, winter weather dynamics, Earth observation, dynamic, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1541, brief, 'The Vortex')
    print("SUCCESS:", res)
