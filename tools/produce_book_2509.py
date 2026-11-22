import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Waste Woes". The title "Waste Woes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENVIRONMENTAL WASTE REDUCTION DAYLIGHT STYLE: An educational and inspiring daylight scene of environmental recovery. A coastal beach where discarded plastics are being gathered into sorting containers, revealing pristine golden sand dunes beneath, with clean educational circular flow arrows pointing toward eco-friendly alternatives: bamboo cutlery, glass bottles, and biodegradable packaging under bright sunny skies. Palette: beach sand golden ochre, ocean water turquoise, eco alternatives natural bamboo and sage green, and sky clear blue. Plastic pollution, waste management, circular economy, environmental action, constructive and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2509, brief, 'Waste Woes plastic pollution cleanup ocean waste zero waste')
    print("SUCCESS:", res)
