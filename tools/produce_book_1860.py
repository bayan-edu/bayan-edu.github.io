import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Hawaiian Petrel". The title "The Hawaiian Petrel" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HAWAIIAN VOLCANIC SUMMIT & PELAGIC SEABIRD STYLE: A sunlit, majestic alpine volcanic summit on Haleakala volcano in Maui, Hawaii in bright morning sunlight. In the foreground, an endangered Hawaiian Petrel (\'Ua\'u) with sleek grey-and-white plumage and black hooked bill perched near its natural volcanic cinder burrow among silver sword plants (Argyroxiphium). Below the summit, a breathtaking sea of fluffy white clouds (cloud inversion layer) stretching to the ocean horizon under a brilliant azure sky. Wildlife conservation tracking antenna and sanctuary boundary markers in clean educational style. Palette: petrel plumage slate grey and pure white, silversword frosted silver, volcanic cinder bronze, and Hawaiian sky cyan. Endangered seabird conservation, pelagic bird ecology, Hawaiian endemic fauna, Haleakala ecosystem, rare and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1860, brief, 'Hawaiian Petrel uau pelagic seabird conservation Haleakala')
    print("SUCCESS:", res)
