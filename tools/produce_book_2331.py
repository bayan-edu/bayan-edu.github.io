import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Swimming Up a Fish Ladder". The title "Swimming Up a Fish Ladder" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FISHWAY ECOLOGICAL ENGINEERING DAYLIGHT STYLE: A sunlit, tiered concrete fish ladder alongside a river dam in broad daylight. Vibrant wild salmon with glistening silver-pink scales leaping powerfully against cascading foamy water steps, migrating upstream to their native spawning grounds, demonstrating how wildlife passages integrate with human infrastructure. Palette: rushing water foamy white and crystalline turquoise, salmon scales silver and ruby-rose, and dam concrete cool grey. Ecological engineering, wildlife migration, river conservation, fish biology, triumphant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2331, brief, 'Swimming Up Fish Ladder salmon migration fishway civil ecology')
    print("SUCCESS:", res)
