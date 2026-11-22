import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Protecting Endangered Birds… with Alligators!". The title "Protecting Endangered Birds… with Alligators!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUBTROPICAL WETLAND ECOLOGY DAYLIGHT STYLE: A sun-drenched Florida wetland lagoon on a glorious clear day in bright daylight. In the center foreground, a majestic American alligator resting calmly on a sunny mudbank among green marsh grasses and mangrove roots. Directly above in the safe canopy of the mangrove branches, elegant snowy egrets with brilliant white plumage and yellow plumes tend to their nests in safety above the water. Sunlight sparkles on the shallow waters with blooming water lilies and wetland reeds. Palette: snowy egret pure white and yellow plume, alligator textured olive and slate, marsh lush reed green, and water sunlit amber-blue. Wetland ecology, wildlife symbiosis, bird conservation, Florida Everglades, bright, fascinating, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1284, brief, 'Protecting Endangered Birds with Alligators')
    print("SUCCESS:", res)
