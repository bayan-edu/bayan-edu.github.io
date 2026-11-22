import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Climates - An Introduction to Climates". The title "An Introduction to Climates" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL CLIMATE ZONES & KÖPPEN CLASSIFICATION STYLE: A sunlit, comprehensive educational globe and climate panorama in bright daylight. In the center, a 3D Earth globe showing distinct color-coded global climate bands: Tropical rainforest (equatorial green), Arid desert (warm gold), Temperate (rich olive), Continental (cool teal), and Polar ice cap (pure white). Connected to miniature panoramic vignettes illustrating each zone: palm trees in tropics, sand dunes in desert, and snow in the polar zone. Atmospheric circulation cells (Hadley, Ferrel, Polar cells) softly illustrated in clean graphics. Palette: tropical emerald green, desert golden ochre, temperate blue-green, polar ice white, and sunny sky blue. Climatology, global climate zones, Köppen climate classification, solar angle of incidence, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1885, brief, 'Introduction to Climates global climate zones Köppen meteorology biomes')
    print("SUCCESS:", res)
