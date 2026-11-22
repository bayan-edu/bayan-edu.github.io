import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Adventures of Sherlock Holmes". The title "The Adventures of Sherlock Holmes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DETECTIVE ARTIFACTS & JEWEL MYSTERY DAYLIGHT STYLE: A sunlit Victorian detective\'s examination desk in bright daylight. In the center foreground, a breathtaking, flawless blue carbuncle gemstone sparkling brilliantly on a square of white velvet fabric, refracting radiant sapphire light rays. Beside the gem, a brass jeweler\'s loupe magnifying glass, an antique silver pocket watch, a walking cane with a carved bone handle, and an open leather case file. Palette: gem brilliant royal sapphire blue, velvet crisp white, mahogany desk deep reddish-brown, and daylight sunbeams golden. Sherlock Holmes, classic detective mysteries, gem theft investigation, Victorian sleuth, bright, iconic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1388, brief, 'The Adventures of Sherlock Holmes Blue Carbuncle')
    print("SUCCESS:", res)
