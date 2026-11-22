import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Plates Affect Our Planet: Earthquakes". The title "Plates on the Move: Earthquakes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLATE TECTONICS TRANSFORM FAULT DAYLIGHT STYLE: A sunlit, high-detail geological landscape of the San Andreas transform fault zone in bright morning daylight. In the center foreground, a clearly offset stream channel and displaced geological fence line showing horizontal strike-slip tectonic plate movement. A 3D subsurface block cutaway revealing the transform fault plane, earthquake hypocenter focus, and radiating circular seismic shockwave ripples. A digital seismograph station and GPS tectonic displacement monument monitoring plate motion under clear blue skies. Palette: desert arid ochre, fault bedrock granite grey, seismic wave crimson red, and bright sky cyan. Plate tectonics, transform faults, earthquake physics, geological displacement, dramatic, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1757, brief, 'Plates Earthquakes transform fault plate tectonics seismology')
    print("SUCCESS:", res)
