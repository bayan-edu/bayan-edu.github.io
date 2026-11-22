import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ajay of Agumbe and the Signal Snake". The title "Ajay of Agumbe and the Signal Snake" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RAINFOREST WILDLIFE TELEMETRY DAYLIGHT STYLE: A sun-dappled, lush rainforest clearing in the mist-crowned hills of Agumbe under morning daylight. In the center foreground, a professional Yagi directional wildlife radio telemetry antenna with metal directional elements resting on a moss-covered granite boulder beside a portable field telemetry receiver with analog signal meters. In the vibrant background through emerald tree ferns and tropical orchids, a majestic golden-banded king cobra glides gracefully across a sunlit jungle log. Palette: rainforest emerald green, telemetry antenna silver, king cobra olive and gold, orchid magenta, and morning mist cyan. Rainforest ecology, wildlife tracking, radio telemetry, conservation biology, bright, adventurous, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1243, brief, 'Ajay of Agumbe and the Signal Snake')
    print("SUCCESS:", res)
