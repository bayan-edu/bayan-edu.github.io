import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Off to See Spiders!". The title "Off to See Spiders!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ARACHNOLOGY MACRO NATURE DAYLIGHT STYLE: A bright, sunlit macro garden scene in early morning daylight. In the center foreground, an adorable, colorful peacock jumping spider (Maratus) resting on a green leaf, displaying iridescent blue, red, and golden fan patterns and inquisitive large shiny black front eyes. In the background, an intricate orb web beaded with glistening spherical morning dew drops catching sunlight. Palette: jumping spider iridescent cobalt, ruby and gold, garden leaf fresh lime green, dew drops diamond crystal, and morning sky pale blue. Arachnid biodiversity, macro photography, spider silk physics, captivating, friendly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2295, brief, 'Off to See Spiders arachnology jumping spider dew drops web macro botany')
    print("SUCCESS:", res)
