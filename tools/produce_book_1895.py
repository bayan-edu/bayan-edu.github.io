import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Removing Dams to Help Fish and People". The title "Removing Dams, Restoring Rivers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVER RESTORATION & ANADROMOUS FISH HABITAT STYLE: A sun-drenched, dramatic Pacific Northwest river valley in bright morning daylight. In the center, a newly breached, dismantled concrete dam being reclaimed by nature, allowing the wild river to flow free through natural boulder rapids. In the foreground, magnificent wild salmon leaping powerfully up the restored river current toward upstream gravel spawning grounds. Lush green cedar forests, clean gravel bars, and a soaring osprey under a brilliant sunny blue sky. Palette: river water churning white and turquoise, salmon silver-pink, cedar forest deep green, and sunny sky blue. River restoration, dam removal, salmon migration, freshwater ecology, environmental engineering, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1895, brief, 'Removing Dams river restoration salmon spawning anadromous ecology')
    print("SUCCESS:", res)
