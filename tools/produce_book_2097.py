import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Aesop\'s Fables". The title "Aesop\'s Fables" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC MEDITERRANEAN FABLE STYLE: A sunlit ancient Mediterranean olive grove on a peaceful grassy hillside. In the foreground, a terracotta Greek amphora vase with a black-figure painting depicting the Crow and the Pitcher, an ancient marble sundial, and on the sunlit path, a steady, determined little land tortoise walking ahead of a sleeping rabbit under wild poppies. Distant Aegean sea and classical stone columns under a bright sunny sky. Palette: olive leaves silvery green, terracotta vase warm burnt orange, marble warm cream, and sky Mediterranean cyan. Ancient fables, timeless moral stories, classical folklore, delightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2097, brief, 'Aesops Fables Greek olive grove amphora tortoise hare storytelling')
    print("SUCCESS:", res)
