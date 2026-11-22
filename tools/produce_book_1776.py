import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Killer Whales". The title "Saving Killer Whales" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PACIFIC NORTHWEST ORCA SANCTUARY DAYLIGHT STYLE: A sunlit, breathtaking coastal fjord in the Salish Sea in radiant morning light. In the center foreground, a magnificent Southern Resident killer whale (orca) breaching powerfully out of crystal-clear ocean water, glistening water droplets spraying in the sunlight. A second orca surfacing nearby, showing its distinctive tall dorsal fin and crisp white eye patch. In the background, evergreen cedar and Douglas fir forested islands, with distant snow-capped mountain peaks under bright blue skies. Palette: orca sleek black and crisp white, ocean deep cobalt and turquoise spray, forest deep green, and sunny sky blue. Cetacean biology, orca conservation, marine ecology, Pacific Northwest wildlife, majestic, powerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1776, brief, 'Saving Killer Whales orca cetacean marine conservation pod')
    print("SUCCESS:", res)
