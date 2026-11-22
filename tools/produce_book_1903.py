import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Butterfly Metamorphosis". The title "Butterfly Metamorphosis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPLETE LEPIDOPTERAN METAMORPHOSIS SUNNY GARDEN STYLE: A sun-drenched, blooming milkweed plant in radiant summer morning sunlight. A glorious circular lifecycle progression arranged around the plant: a tiny pearlescent egg on a leaf; a striped yellow, black, and white monarch caterpillar munching milkweed; a jade-green chrysalis pupa adorned with gleaming gold metallic dots; and a magnificent newly emerged monarch butterfly spreading its vivid orange-and-black wings in the sunshine. Dewdrops sparkling like diamonds on green leaves under a bright blue sky. Palette: monarch orange and black, chrysalis jade green with gold dots, leaf emerald, and sunny sky blue. Lepidopteran metamorphosis, life cycles, monarch butterfly, insect biology, nature wonder, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1903, brief, 'Butterfly Metamorphosis complete holometabolous life cycle monarch')
    print("SUCCESS:", res)
