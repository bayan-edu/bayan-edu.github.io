import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space Centers Across the U.S.A.". The title "Space Centers Across the U.S.A." must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AEROSPACE LAUNCH FACILITIES DAYLIGHT STYLE: A sunlit, panoramic architectural view of NASA space launch complexes under a clear azure sky in full daylight. In the center foreground, the colossal Vehicle Assembly Building (VAB) with its iconic giant American flag and NASA insignia, flanked by massive crawler-transporters and towering steel rocket launch gantries. In the surrounding grounds, gleaming white parabolic satellite tracking dishes and rocket displays gleam under bright Florida sunshine. Palette: launch facility concrete white and industrial steel, flag vibrant red white and blue, crawler bronze, and sky brilliant cyan. Space exploration, NASA space centers, rocket launch complexes, aerospace history, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1286, brief, 'Space Centers Across the U.S.A.')
    print("SUCCESS:", res)
