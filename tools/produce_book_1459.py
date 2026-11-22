import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Human Microbiome: Your Body Is an Ecosystem". The title "Human Microbiome: Your Body Is an Ecosystem" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT HUMAN MICROBIOME ECOSYSTEM DAYLIGHT STYLE: A sunlit, friendly biology laboratory exhibit in bright natural daylight. In the center foreground, an elegant translucent biological model surrounded by stylized, glowing, friendly microflora colonies in pleasant pastel colors (beneficial lactobacillus, bifidobacterium, and gut microbes). Beside the model on a clean white desk rest a high-power optical microscope, colorful petri dishes with cultured probiotic colonies, and clean educational diagrams explaining bacterial symbiosis. Palette: microbes friendly mint green, lilac, and peach, microscope brushed steel, and laboratory daylight white. Microbiology, human microbiome, symbiotic bacteria, health ecology, bright, friendly, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1459, brief, 'Human Microbiome Your Body Is an Ecosystem')
    print("SUCCESS:", res)
