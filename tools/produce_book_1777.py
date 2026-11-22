import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Traveling Turtles: A Trip Across the Atlantic". The title "Traveling Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TRANSATLANTIC SEA TURTLE MIGRATION DAYLIGHT STYLE: A sunlit, expansive Atlantic Ocean panorama in crystal-clear tropical waters. In the center foreground, a magnificent young loggerhead sea turtle swimming purposefully with strong flipper strokes through golden floating rafts of sargassum seaweed. Sunbeams dancing through the warm azure Gulf Stream current, illuminating small crabs and juvenile fish sheltering in the seaweed. A stylized navigational graphic showing the North Atlantic Gyre circular ocean current map and Earth\'s geomagnetic navigation lines. Palette: turtle carapace warm amber brown, sargassum gold, ocean deep azure and turquoise, and sunbeam radiant white. Sea turtle migration, oceanic currents, geomagnetic navigation, marine biology, wondrous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1777, brief, 'Traveling Turtles ocean navigation loggerhead sea turtle Gulf Stream')
    print("SUCCESS:", res)
