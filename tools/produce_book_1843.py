import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Coral Reefs in Hawaii". The title "Coral Reefs in Hawaii" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HAWAIIAN MARINE SANCTUARY & CORAL REEF STYLE: A sun-drenched, crystal-clear Hawaiian coral reef bay in brilliant midday sunlight. In the center foreground, Hawaii\'s famous state fish, the colorful Humuhumunukunukuāpuaʻa (reef triggerfish), showing bold geometric yellow, blue, and black patterns. Thriving colonies of branching antler coral (Pocillopora) and golden lobe coral (Porites) growing on submerged volcanic basalt. A green sea turtle (honu) swimming peacefully in the background with dancing sunbeams piercing the turquoise water. Palette: triggerfish yellow, blue, and white, ocean turquoise aquamarine, coral amber gold, and tropical sunbeams. Hawaiian marine biology, coral reef ecosystems, endemic reef fish, ocean conservation, brilliant, joyful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1843, brief, 'Coral Reefs in Hawaii reef triggerfish antler coral marine sanctuary')
    print("SUCCESS:", res)
