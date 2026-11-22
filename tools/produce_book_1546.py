import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Healthy Eating, Healthy Planet". The title "Healthy Eating, Healthy Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUSTAINABLE FOOD SYSTEMS & HARVEST DAYLIGHT STYLE: A sun-drenched, bountiful farmer\'s market harvest table in radiant morning daylight. In the center foreground, a colorful cornucopia of wholesome plant-based foods: fresh crisp rainbow Swiss chard, heirloom orange carrots, ripe red tomatoes, whole grain wheat sheaves, legumes in glass jars, and plump blueberries. Beside the harvest on a rustic wooden table rests a clean illustrated ecological footprint balance scale comparing food sustainability under a clear blue sky. Palette: vegetables vibrant rainbow (scarlet, orange, emerald, purple), table natural honey wood, and sky sunny cyan. Sustainable nutrition, food systems, environmental stewardship, agriculture, wholesome, colorful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1546, brief, 'Healthy Eating Healthy Planet')
    print("SUCCESS:", res)
