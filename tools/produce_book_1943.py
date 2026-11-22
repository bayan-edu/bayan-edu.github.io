import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cleaning Up Ocean Pollution: Collecting \\"Ghost\\" Fishing Gear". The title "Cleaning Up Ghost Fishing Gear" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OCEAN CLEANUP & GHOST NET RECOVERY DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical coral reef in bright midday sunlight. A specialized marine conservation recovery crane aboard a research boat gently lifting a heavy, abandoned derelict nylon "ghost" fishing net off a vibrant coral reef. Beneath the surface in sparkling turquoise waters, a rescued green sea turtle and colorful reef fish swimming freely away from the hazard. Dancing sunbeams illuminating the clean reef floor under a bright blue sky. Palette: ocean turquoise and aquamarine, coral pink and amber, ghost net dark green, and sunbeam radiant gold. Ocean cleanup, ghost fishing gear, marine conservation, coral reef protection, environmental restoration, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1943, brief, 'Cleaning Ocean Ghost Fishing Gear marine debris recovery reef rescue')
    print("SUCCESS:", res)
