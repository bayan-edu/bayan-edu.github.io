import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Gulliver\'s Travels". The title "Gulliver\'s Travels" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC SATIRICAL ADVENTURE STYLE: A sun-drenched coastal scene on the shores of Lilliput in bright daylight. On a golden sand beach, a colossal vintage leather explorer boot with brass eyelets rests peacefully, surrounded by tiny, intricately detailed Lilliputian miniature sailing frigates with toothpick masts and microscopic thread rigging anchored in the shallow water, with tiny ladders and miniature ropes. Palette: leather boot warm chestnut, miniature ships ivory sails and gold trim, beach sand warm ochre, and sunny sky cyan. Classic literature, miniature scale wonder, exploration adventure, whimsical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2055, brief, 'Gullivers Travels Jonathan Swift Lilliput miniature sailing ships')
    print("SUCCESS:", res)
