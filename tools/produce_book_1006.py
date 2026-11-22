import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Butterfly Behavior". '
    'The title "Butterfly Behavior" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENTOMOLOGY & BOTANICAL MEADOW DAYLIGHT STYLE: A sun-drenched, blooming summer flower meadow on a glorious sunny morning under bright daylight. '
    'In the center foreground, an exquisite, vivid yellow-and-black Eastern Tiger Swallowtail butterfly resting gracefully on blooming purple echinacea coneflowers, extending its delicate proboscis into sparkling sweet nectar droplets. '
    'Beside it, vibrant orange lantana and dewy clover catch sparkling morning sunbeams. '
    'In the background, a sunlit wildflower garden alive with colorful fluttering wings under a radiant blue sky. '
    'Palette: swallowtail vibrant yellow and jet black, echinacea magenta, meadow emerald green, and sunbeam gold. '
    'Entomology, butterfly biology, pollination, nature, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1006, brief, "Butterfly Behavior")
    print("SUCCESS:", res)
