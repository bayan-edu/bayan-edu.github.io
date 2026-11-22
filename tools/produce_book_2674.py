import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Something\'s Stuck Around the Duck". The title "Something\'s Stuck Around the Duck" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WILDLIFE RESCUE AND POND CLEANUP DAYLIGHT STYLE: A sunlit, hopeful freshwater park pond in morning daylight. In the foreground, a gentle veterinary wildlife rescue net and blunt safety scissors on a wooden dock beside a freed plastic ring cut safely in half, while a healthy white Pekin duck swims happily in sparkling clean pond water among reeds and yellow irises under sunny skies. Palette: duck pure white with bright orange bill, pond water sparkling aquamarine, dock wood warm honey, and sky cheerful blue. Wildlife rescue, plastic litter awareness, animal safety, environmental kindness, poignant, triumphant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2674, brief, 'duck wildlife rescue plastic six pack ring cleanup water conservation')
    print("SUCCESS:", res)
