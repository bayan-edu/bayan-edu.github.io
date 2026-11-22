import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Helping a Patient Hunter, the Canada Lynx". The title "Helping a Patient Hunter, the Canada Lynx" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BOREAL WILDLIFE CONSERVATION DAYLIGHT STYLE: A sunlit, pristine winter landscape in the northern boreal forest on a bright crisp morning. In the center foreground, a magnificent wild Canada lynx (Lynx canadensis) resting attentively on a snow-dusted fallen pine log, showing its iconic long black ear tufts, flared facial ruff, thick silver-tawny winter coat, and enormous snowshoe paws resting on pure white snow. Sunbeams filtering through evergreen spruce and fir branches against a clear winter cyan sky. Palette: lynx silver-tawny fur, pure white snow, spruce deep pine green, and bright morning sky azure. Wild predator conservation, boreal forest ecology, patient hunter adaptation, striking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1945, brief, 'Canada Lynx Lynx canadensis boreal forest wildlife conservation')
    print("SUCCESS:", res)
