import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Driven to Distraction". The title "Driven to Distraction" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AUTOMOTIVE SAFETY SCIENCE DAYLIGHT STYLE: A sunlit automotive cockpit and windshield view on a clear sunny morning in bright daylight. In the center foreground, a modern vehicle dashboard with a smartphone secured safely in a dashboard mount, its screen cleanly displaying a bright green "Driving Focus Active" icon. Through the crystal-clear panoramic windshield, a straight, open country highway stretches toward rolling green hills under a bright blue sky, with clear yellow road markings and safety reflectors. Palette: highway asphalt slate, lane markings safety yellow, dashboard charcoal and brushed aluminum, and sky radiant blue. Road safety, driver distraction, cognitive focus, traffic science, bright, responsible, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1455, brief, 'Driven to Distraction')
    print("SUCCESS:", res)
