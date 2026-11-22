import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Grandfather Goes on Strike". The title "Grandfather Goes on Strike" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUNNY SUMMER GARDEN DAYLIGHT STYLE: A charming, sun-drenched cottage garden on a glorious clear summer morning under bright daylight. In the center foreground, a sturdy vintage wooden ladder leaning securely against a magnificent mature apple tree laden with glossy red fruit and lush green leaves. Beside the tree on the emerald lawn rests a shiny vintage bicycle, an open wooden gardening toolbox with polished brass shears and trowel, and colorful blooming garden beds of sunflowers and daisies. In the background, a cozy brick garden cottage with white trim under a bright azure sky with soft wispy clouds. Palette: apple red, leafy emerald, sunlit daisy yellow, sky azure, and warm cottage brick terra-cotta. Summer holidays, garden adventures, peaceful nature, whimsical, bright, cheerful, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1067, brief, 'Grandfather Goes on Strike')
    print("SUCCESS:", res)
