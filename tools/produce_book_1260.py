import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The River of Time". The title "The River of Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RIVERBANK HYDROLOGY DAYLIGHT STYLE: A tranquil, sunlit riverbank on a glorious sunny morning in bright natural daylight. In the center foreground, a crisp folded white paper boat sailing bravely through gentle ripples past smooth river boulders and floating lotus leaves. Along the riverbank, traditional woven bamboo fishing nets and wooden mooring posts stand beside lush green reeds, with wide sparkling river waters stretching toward sunlit hills under a soft blue sky. Palette: river sparkling aqua, river stone slate gray, paper boat crisp white, vegetation fresh emerald, and morning sun gold. River hydrology, playful nature, childhood adventure, peaceful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1260, brief, 'The River of Time')
    print("SUCCESS:", res)
