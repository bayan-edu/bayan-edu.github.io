import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Species: Magnificent Madagascar". '
    'The title "Saving Species: Magnificent Madagascar" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MADAGASCAR WILDLIFE CONSERVATION DAYLIGHT STYLE: A sun-drenched, radiant Madagascan nature sanctuary on a glorious morning under bright sunlight. '
    'In the center foreground, an adorable ring-tailed lemur with its iconic long black-and-white banded tail curled alertly, perched naturally on a flowering tree branch beside a vibrant emerald-and-turquoise chameleon. '
    'In the background, iconic giant ancient Baobab trees with massive sculpted trunks tower majestically over sunlit red-earth pathways and lush green foliage under a clear azure sky. '
    'Palette: baobab terracotta, lemur silver-and-white, chameleon turquoise-emerald, and sunny sky blue. '
    'Wildlife ecology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(918, brief, "Saving Species: Magnificent Madagascar")
    print("SUCCESS:", res)
