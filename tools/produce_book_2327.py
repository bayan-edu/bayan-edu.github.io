import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Adventure on a Hot Air Balloon". The title "Adventure on a Hot Air Balloon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSTAT THERMAL FLIGHT DAYLIGHT STYLE: A breathtaking aerial vista from a vibrant, multi-colored hot air balloon in morning sunlight. The balloon envelope displays bold rainbow-striped geometric patterns, with a roaring propane burner flame warming the air inside. Looking out from the sturdy woven wicker basket over sweeping emerald valleys, winding rivers, and quaint patchwork farm fields far below under a clear sunny sky. Palette: balloon envelope vibrant rainbow spectrum, wicker basket warm honey, landscape emerald and golden patchwork, and morning sky azure. Aviation physics, thermal buoyancy, atmospheric flight, uplifting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2327, brief, 'Adventure Hot Air Balloon flight thermal buoyancy landscape aerostat')
    print("SUCCESS:", res)
