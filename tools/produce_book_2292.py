import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Plant Whisperer". The title "The Plant Whisperer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BOTANICAL GREENHOUSE PARADISE DAYLIGHT STYLE: A sun-soaked Victorian glasshouse conservatory filled with exotic botanical marvels. Lush hanging pitcher plants (Nepenthes) with translucent nectar traps, delicate Venus flytraps with sparkling digestive droplets, rare sensitive plants (Mimosa pudica) folding leaves, and blooming tropical orchids basking in warm morning sunlight through glass panes. Antique brass watering cans and wooden plant labels. Palette: foliage vibrant emerald and chartreuse green, pitcher plants coral red, conservatory glass warm transparent, and sunlight golden. Botanical adaptations, plant communication, carnivorous plants, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2292, brief, 'The Plant Whisperer botany greenhouse rare flora carnivorous plants')
    print("SUCCESS:", res)
