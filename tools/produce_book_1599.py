import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wetlands and Habitat Loss". The title "Wetlands & Habitat Loss" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR FRESHWATER WETLAND SUNNY DAYLIGHT STYLE: A radiant, sun-drenched freshwater marsh and wetland sanctuary on a clear sunny morning. In the foreground, tall green cattails, blooming purple pickerelweed, and floating lily pads on calm, sparkling water. A graceful great blue heron perched peacefully on a weathered cedar post watching fish swim in the clear wetland shallows. In the background, an elevated wooden conservation boardwalk and observation tower under a wide blue sky with sunbeams. Palette: marsh reed green, water lily violet, wetland water aquamarine, cedar wood brown, and sunny sky blue. Wetland ecology, habitat conservation, biodiversity protection, environmental science, bright and peaceful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1599, brief, 'Wetlands and Habitat Loss marsh mangrove ecology conservation')
    print("SUCCESS:", res)
