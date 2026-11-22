import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Group Behavior". The title "Group Behavior" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COLLECTIVE ANIMAL BEHAVIOR DAYLIGHT STYLE: A breathtaking natural spectacle of animal swarm intelligence in bright daylight. In the center sky, a vast murmuration of tens of thousands of starlings swirling together in fluid, undulating geometric waves over golden sunlit rolling hills. In the foreground water, a coordinated school of silvery baitfish shimmering as one unified organism, illustrating collective decision-making and safety in numbers. Palette: starling flock iridescent dark plumage against golden sky, silvery fish scales sparkling cyan, and grassy hills warm olive green. Animal ethology, collective intelligence, flocking and schooling dynamics, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1968, brief, 'Group Behavior collective animal intelligence murmuration flock schooling')
    print("SUCCESS:", res)
