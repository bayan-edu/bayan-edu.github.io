import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Song and Dance". The title "Song and Dance" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT BIOACOUSTICS & SONGBIRD DIALECTS DAYLIGHT STYLE: A sun-dappled, picturesque forest canopy in radiant morning daylight. In the center foreground, several colorful North American songbirds (a vibrant red cardinal, an american goldfinch, and an eastern bluebird) perched on blossoming apple tree branches, their beaks parted in song. Flowing harmoniously through the air around them are luminous, stylized musical soundwave frequency spectrogram ribbons in amber and cyan, illustrating bird vocal learning. Palette: cardinal scarlet red, goldfinch lemon yellow, bluebird azure, apple blossom blush, and soundwaves radiant cyan. Ornithology, bioacoustics, bird song dialects, animal communication, melodic, cheerful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1475, brief, 'Song and Dance')
    print("SUCCESS:", res)
