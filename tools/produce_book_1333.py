import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Whales Are Singing". The title "The Whales Are Singing" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MARINE BIOACOUSTICS DAYLIGHT STYLE: A sunlit, crystal-clear tropical ocean scene in radiant daylight with sparkling sun rays penetrating deep water. In the center foreground, a majestic adult humpback whale gliding gracefully through turquoise waters with its long white pectoral flippers outstretched. Flowing harmoniously through the water around the whale are luminous, stylized sonic frequency soundwaves and spectrogram wave ribbons in gold and cyan, illustrating whale song communication. Palette: ocean deep sapphire and turquoise, whale dark slate and snowy white, soundwave ribbons radiant gold and cyan, and sunbeam bright ivory. Cetacean biology, whale songs, marine bioacoustics, ocean communication, peaceful, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1333, brief, 'The Whales Are Singing')
    print("SUCCESS:", res)
