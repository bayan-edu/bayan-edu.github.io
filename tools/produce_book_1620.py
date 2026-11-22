import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Heat, Energy, and Bicycling in New York City". The title "Heat, Energy & Bicycling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. URBAN CYCLING PHYSICS & THERMODYNAMICS DAYLIGHT STYLE: A bright, sunlit morning scene in a scenic urban park along the Hudson River with the iconic New York City skyline in the background. In the center foreground, a modern high-performance commuter bicycle resting on a clean bike lane. Close-up focus on the mechanical drivetrain: precision chain derailleur, spinning wheel spokes, and rubber tire tread against asphalt. Subtle, elegant vector diagrams showing kinetic energy transformation, rolling resistance friction, and aerodynamic drag airflow lines in bright sunshine. Palette: racing bicycle cyan, NYC brick terracotta, park green, mechanical metallic silver, and brilliant morning sky blue. Urban physics, bicycle mechanics, kinetic energy, thermodynamics, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1620, brief, 'Heat Energy Bicycling NYC mechanics friction thermal')
    print("SUCCESS:", res)
