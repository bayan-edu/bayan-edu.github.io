import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Helping Mussels Means Cleaner Water". The title "Helping Mussels, Cleaner Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FRESHWATER BIOFILTRATION & RIVER ECOLOGY DAYLIGHT STYLE: A sunlit, crystal-clear gravel riverbed on a bright sunny morning in natural daylight. In the center foreground, a healthy cluster of native freshwater unionid mussels nestled among smooth river stones, actively siphoning and filtering river water. In the background, a Secchi disk testing water clarity, aquatic river weeds swaying in the gentle current, and a kingfisher bird perched on an overhanging branch under blue skies. Palette: river stone slate and amber, mussel shell iridescent dark bronze, river water crystal turquoise, and sunbeam radiant gold. Freshwater ecology, biological filtration, mussel conservation, clean water indicators, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1889, brief, 'Freshwater Mussels cleaner water biofiltration ecosystem services')
    print("SUCCESS:", res)
