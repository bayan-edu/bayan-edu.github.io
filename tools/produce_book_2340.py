import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "High and Dry". The title "High and Dry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HYDROLOGICAL ADAPTATION DAYLIGHT STYLE: A sun-drenched landscape demonstrating drought and moisture resilience in nature. A parched dry riverbed with geometric cracked mud tiles, where resilient desert flora (succulents, deep-rooted mesquite, and desert broom) thrive with specialized water-storing root networks shown in clean educational cutaway, under a bright sunlit blue sky with gathering rain clouds. Palette: parched earth warm clay ochre, resilient succulents jade green, and sky deep blue with distant silver clouds. Hydrology, drought adaptation, climate science, resilience in nature, thoughtful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2340, brief, 'High and Dry drought climate hydrology cracked soil riverbed water cycle')
    print("SUCCESS:", res)
