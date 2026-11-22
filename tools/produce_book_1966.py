import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "California Condors Achieve a Happy New Milestone". The title "California Condors Achieve a Happy New Milestone" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CALIFORNIA CONDOR CONSERVATION DAYLIGHT STYLE: A breathtaking coastal California landscape bathed in brilliant morning sunshine. Soaring effortlessly on warm thermal updrafts is a magnificent wild California condor (Gymnogyps californianus), its colossal nine-foot wingspan spread wide displaying white triangular underwing patches and primary flight feathers. Below, the rugged cliffs of Big Sur plunge into the sparkling blue Pacific Ocean, with coastal redwood trees basking in the sun. Palette: condor plumage jet black with pure white wing patches, condor head warm golden-orange, ocean Pacific sapphire blue, and sunny sky cerulean. Species recovery, avian conservation, California wilderness, triumphant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1966, brief, 'California Condor Gymnogyps californianus recovery Big Sur soaring')
    print("SUCCESS:", res)
