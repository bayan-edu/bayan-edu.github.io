import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: Sherlock Holmes Short Stories". The title "Sherlock Holmes Short Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VICTORIAN INVESTIGATION TABLE DAYLIGHT STYLE: A sun-drenched investigator\'s desk in bright daytime. In the center foreground, a high-magnification optical lens resting atop an open leather-bound notebook with handwritten case notes and fingerprint diagrams. Beside the notebook, a distinctive briar pipe, an antique pocket watch with a gold chain, a silver key, and a stack of telegrams on a green baize desk blotter. Palette: desk green baize and walnut, magnifying glass brass gold, notebook cream parchment, and daylight sunbeam gold. Detective stories, forensic observation, Sherlock Holmes mysteries, classic literature, bright, clever, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1378, brief, 'Literature Sherlock Holmes Short Stories')
    print("SUCCESS:", res)
