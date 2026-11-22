import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Zebra Mussels and the Hudson River". The title "Zebra Mussels and the Hudson River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVERINE FRESHWATER ECOLOGY DAYLIGHT STYLE: A sunlit, peaceful view along the historic Hudson River on a bright clear afternoon. In the foreground water\'s edge, river rocks encrusted with small, distinctively striped black-and-cream zebra mussels under clear, flowing river water. Freshwater aquatic plants, riverbed gravel, and a water clarity measurement Secchi disk in the current. In the background, the scenic Hudson River valley with lush green forested banks, a classic river lighthouse, and distant Catskill mountains under sunny blue skies. Palette: river aquamarine, striped shell cream and dark brown, river stone slate, forest green, and bright sunny sky. Freshwater ecology, invasive species, river ecosystems, environmental monitoring, bright and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1566, brief, 'Zebra Mussels and the Hudson River invasive species ecology')
    print("SUCCESS:", res)
