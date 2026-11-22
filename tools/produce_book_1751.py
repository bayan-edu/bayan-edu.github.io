import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space Vacation". The title "Space Vacation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FUTURISTIC ORBITAL HABITAT & EARTH PANORAMA STYLE: A sunlit, breathtaking interior view from the panoramic multi-window cupola observation module of an orbital space resort. Looking out into space, the radiant, sun-illuminated curve of planet Earth with vivid turquoise oceans, golden continents, and swirling white cloud spirals in brilliant daylight. Floating in the cupola: a zero-gravity camera, a floating spherical droplet of pure water reflecting Earth, and an orbital flight route itinerary map. Palette: Earth ocean brilliant blue, cloud pure white, habitat metallic pearl silver, and solar radiant gold. Future space exploration, orbital habitats, commercial astronautics, Earth observation, wondrous, bright, and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1751, brief, 'Space Vacation orbital space habitat future tourism cupola')
    print("SUCCESS:", res)
