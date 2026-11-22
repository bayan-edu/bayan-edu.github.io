import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: The Adventures of Sherlock Holmes". The title "The Adventures of Sherlock Holmes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VICTORIAN DETECTIVE STUDY DAYLIGHT STYLE: A sunlit, elegant study room at 221B Baker Street in bright morning natural daylight. In the center foreground, on a polished mahogany desk: an iconic curved wooden smoking pipe, a heavy brass handheld magnifying glass focusing on a cryptic handwritten parchment cipher, and an open case with an antique wooden violin and bow. Beside the desk, a classic houndstooth deerstalker cap rests on a burgundy leather wingback armchair near sun-drenched curtained windows. Palette: mahogany rich reddish-brown, brass magnifying glass gold, leather burgundy, and morning daylight ivory. Detective fiction, classic mysteries, Arthur Conan Doyle, deductive reasoning, bright, iconic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1372, brief, 'Literature The Adventures of Sherlock Holmes')
    print("SUCCESS:", res)
