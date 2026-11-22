import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fish". The title "Fish" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DIVERSE ICHTHYOLOGY & AQUATIC LIFE DAYLIGHT STYLE: A sun-drenched, crystal-clear aquatic panorama in sparkling midday sunlight. In the center foreground, a magnificent, vibrant collection of diverse fish showcasing aquatic adaptations: a colorful rainbow trout leaping from a clear freshwater mountain stream, a brilliant orange-and-white clownfish in a sunlit reef anemone, a sleek blue-and-yellow royal tang, and a delicate golden seahorse anchored to seagrass. Clean anatomical callouts illustrating gills for oxygen extraction, swim bladders for buoyancy, and lateral line systems. Palette: trout rainbow pink and olive, clownfish vibrant orange, reef water aquamarine, and sunbeam gold. Ichthyology, fish biology, marine and freshwater biodiversity, aquatic adaptations, joyful, vibrant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1886, brief, 'Fish ichthyology aquatic biodiversity marine freshwater')
    print("SUCCESS:", res)
