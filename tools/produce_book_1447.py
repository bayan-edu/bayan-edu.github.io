import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Do We Know the Climate Is Changing?". The title "How Do We Know the Climate Is Changing?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CLIMATE DATA SCIENCE DAYLIGHT STYLE: A sunlit polar and alpine climate research station in bright daylight. In the center foreground, a cylindrical core of ancient glacial ice resting on a stainless steel analysis tray, revealing distinct annual layers of trapped atmospheric bubbles. Beside the ice core, a modern scientific weather station anemometer, thermometer, and an electronic tablet displaying clear rising temperature trend graphs and satellite earth observation imagery. In the background, snow-capped mountains and green alpine valleys meet under a clear blue sky. Palette: glacial ice diamond white and cyan, instrument steel silver, and sky bright daylight azure. Climate science, glaciology, empirical evidence, Earth observation, objective, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1447, brief, 'How Do We Know the Climate Is Changing')
    print("SUCCESS:", res)
