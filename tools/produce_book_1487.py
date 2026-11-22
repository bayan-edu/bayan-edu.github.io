import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Pacific Salmon\'s Journey". The title "The Pacific Salmon\'s Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PACIFIC SALMON MIGRATION DAYLIGHT STYLE: A sunlit, pristine Pacific Northwest mountain river in radiant morning daylight. In the center foreground, a magnificent adult sockeye salmon with its vibrant scarlet-red body and hooked olive-green jaw leaping powerfully upstream through churning white-water rapids and over river boulders. Surrounding the river are ancient towering Douglas fir and cedar trees, river ferns, and sunbeams sparkling through crystal-clear mountain water. Palette: salmon body brilliant scarlet red and olive green, river rapids foaming white and aqua, and forest evergreen. Ichthyology, salmon migration, freshwater ecology, anadromous fish, wildlife journey, dynamic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1487, brief, 'The Pacific Salmons Journey')
    print("SUCCESS:", res)
