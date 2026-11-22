import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Farmers Care for the Land". The title "Farmers Care for the Land" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUSTAINABLE AGRICULTURE DAYLIGHT STYLE: A breathtaking, sun-drenched rural farmland landscape stretching across rolling hills in golden daylight. In the center foreground, contoured conservation farm terraces and lush green cover crops planted along natural hillsides, with efficient solar-powered drip irrigation lines delivering water to fertile dark soil. In the background, a row of windbreak trees, modern wind turbines, and distant red farm barns under a glorious sunlit blue sky with puffy white clouds. Palette: crop field vibrant emerald and golden wheat, soil rich dark brown, barn rustic red, and sky summer azure. Agricultural conservation, soil health, sustainable farming, Earth stewardship, bright, wholesome, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1274, brief, 'Farmers Care for the Land')
    print("SUCCESS:", res)
