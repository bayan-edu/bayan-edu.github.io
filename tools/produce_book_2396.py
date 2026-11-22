import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Special Delivery". The title "Special Delivery" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AUTONOMOUS LOGISTICS INNOVATION DAYLIGHT STYLE: A sunlit, modern residential neighborhood on a bright spring morning. An advanced multi-rotor electric delivery drone with spinning carbon-fiber propellers gently lowering a neatly packaged parcel with a safety cable onto a sunlit doorstep landing pad, with clean GPS navigation coordinates and flight vector telemetry graphics projected in the air. Flowering cherry blossom trees and green lawns under sunny skies. Palette: drone chassis matte white and safety orange, parcel kraft cardboard warm brown, lawns vibrant green, and sky sunny blue. Logistics engineering, drone robotics, automated supply chain, futuristic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2396, brief, 'Special Delivery postal logistics delivery drone autonomous cargo shipping')
    print("SUCCESS:", res)
