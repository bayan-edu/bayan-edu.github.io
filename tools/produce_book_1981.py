import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Bone Puzzle". The title "The Bone Puzzle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OSTEOLOGY COMPARATIVE ANATOMY DAYLIGHT STYLE: A bright, sunlit paleontologist and comparative anatomist\'s laboratory workbench. Clean skeletal specimens of various vertebrates arranged like interlocking jigsaw puzzle pieces: bird hollow wing bones, dolphin flipper bones, and mammalian leg bones, demonstrating homologous structures across species, with calipers, magnifying lenses, and educational anatomical labels on aged parchment. Palette: bone natural ivory and cream, parchment warm beige, brass tools gold, and workbench light oak. Skeletal biology, evolution, comparative anatomy, bone structure, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1981, brief, 'The Bone Puzzle skeletal biology osteology comparative anatomy')
    print("SUCCESS:", res)
