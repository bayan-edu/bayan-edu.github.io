import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Stone Wall". '
    'The title "The Stone Wall" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AGRICULTURAL MASONRY & TERRACE DAYLIGHT STYLE: A sun-drenched, radiant hillside farm terrace on a crisp sunny morning under a brilliant blue sky. '
    'In the center foreground, a masterfully built dry-stone retaining wall made of interlocking weathered golden limestone blocks, carefully fitted without mortar to allow natural drainage while supporting rich dark garden soil. '
    'Delicate green alpine herbs and tiny wild clover sprout naturally from the stone crevices, illuminated by golden sunbeams. '
    'In the background, terraced agricultural slopes and olive trees stretch upward into the bright open morning. '
    'Palette: warm limestone ochre, rich earth brown, olive tree green, wild clover emerald, and azure sky blue. '
    'Masonry, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(691, brief, "The Stone Wall")
    print("SUCCESS:", res)
