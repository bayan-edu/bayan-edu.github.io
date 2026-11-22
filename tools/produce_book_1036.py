import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "It Takes All Kinds to Make a World". '
    'The title "It Takes All Kinds to Make a World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MARINE BIODIVERSITY & CLASSIFICATION DAYLIGHT STYLE: A sunlit, inspiring marine biology exploration laboratory on a bright sunny day in natural daylight. '
    'In the center foreground, on a clean laboratory workbench: glowing glass culture dishes showing sparkling microscopic diatoms and bioluminescent marine protists, a specimen jar with emerald sea kelp fronds, a branching pink sea coral specimen, and an open parchment scroll with a colorful phylogenetic tree of life diagram. '
    'In the background, a large crystal-clear illuminated seawater aquarium and sunlit laboratory windows looking out over a turquoise tropical ocean. '
    'Palette: diatom golden amber, ocean turquoise, kelp emerald green, coral rose pink, and clean lab ivory. '
    'Biodiversity, biological classification, domains of life, marine biology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1036, brief, "It Takes All Kinds to Make a World")
    print("SUCCESS:", res)
