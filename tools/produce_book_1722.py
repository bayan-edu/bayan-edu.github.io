import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Uses of Trees". The title "Uses of Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUSH ARBORICULTURE & FORESTRY BENEFITS SUNNY DAYLIGHT STYLE: A majestic, sun-drenched ancient oak tree spreading its vast leafy canopy over a lush green meadow in radiant morning light. Surrounding the tree, a harmonious circular infographic illustrating the vital gifts of trees to planet Earth: Oxygen production (O2 bubbles), carbon capture (CO2 absorption), bird nests and squirrel hollows (Wildlife Shelter), crisp red apples and walnuts (Food), cool shadow canopy (Shade), and fallen leaf mulch (Soil Fertility). A wooden park bench and saplings growing beside it under a bright blue sky. Palette: oak leaf emerald green, sunbeam golden yellow, bark rich umber, apple crimson red, and clear sky cyan. Arboriculture, forestry science, ecosystem services of trees, environmental conservation, wholesome and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1722, brief, 'Uses of Trees forestry sustainable wood oxygen shade ecology')
    print("SUCCESS:", res)
