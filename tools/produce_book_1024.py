import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Long-Term Monitoring of the Hudson River". '
    'The title "Long-Term Monitoring of the Hudson River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT FRESHWATER RIVER ECOLOGY DAYLIGHT STYLE: A sunlit, magnificent Hudson River scenic vista on a glorious sunny morning in bright daylight. '
    'In the center foreground, resting on a clean wooden research dock: labeled glass specimen vials containing microscopic zooplankton, a black-and-white Secchi water clarity disk with measuring line, striped freshwater zebra mussel shells resting on river shale, and a digital water quality probe. '
    'In the background, the sparkling blue Hudson River flows between lush green forested cliffs and palisades under a brilliant blue sky. '
    'Palette: river sapphire and aquamarine, forest lush emerald, river shale slate grey, and sunbeam gold. '
    'Freshwater ecology, environmental monitoring, Hudson River, invasive species, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1024, brief, "Long-Term Monitoring of the Hudson River")
    print("SUCCESS:", res)
