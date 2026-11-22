import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Layers of the Ocean". The title "Layers of the Ocean" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT OCEAN DEPTH ZONES CROSS-SECTION STYLE: A fascinating, beautifully detailed vertical cross-section diagram of the ocean\'s five depth zones in bright educational daylight. At the top, the sunlit Epipelagic sunlight zone with coral reefs, sea turtles, and dolphins under shimmering turquoise waves. Graduating smoothly down through the Mesopelagic twilight zone, Bathypelagic midnight zone with bioluminescent jellyfish, Abyssopelagic zone, and the Hadal trench, clearly marked with depth numbers. Palette: surface sparkling cyan, mid-depth sapphire, deep ocean indigo, and bioluminescent neon green and gold. Oceanography, marine depth zones, pelagic ecosystems, deep sea science, engaging, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1313, brief, 'Layers of the Ocean')
    print("SUCCESS:", res)
