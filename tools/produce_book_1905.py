import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Inheritance of Traits". The title "Inheritance of Traits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MENDELIAN GENETICS & CLASSICAL BOTANY SUNNY GARDEN STYLE: A sunlit, peaceful monastery garden study in radiant morning daylight. In the center foreground, Gregor Mendel\'s classic sweet pea plants (Pisum sativum) showing clear hereditary contrasts: vibrant purple flowers versus white flowers, and open pods showing round yellow peas versus wrinkled green peas. On an outdoor wooden garden table: a neat wooden chalkboard with a clean 2x2 Punnett square diagram showing dominant and recessive gene ratios, and a brass microscope. Palette: pea flower vibrant violet and pure white, pea pod fresh green and yellow, timber honey oak, and morning sunbeam gold. Genetics, Mendelian inheritance, dominant and recessive alleles, heredity, Punnett squares, botany history, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1905, brief, 'Inheritance of Traits Mendelian genetics heredity pea plants Punnett')
    print("SUCCESS:", res)
