import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Challenges Facing Estuaries: Pathogens". The title "Challenges Facing Estuaries" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ESTUARINE ECOLOGY & WATER QUALITY MONITORING DAYLIGHT STYLE: A sunlit, peaceful coastal estuary and tidal salt marsh on a bright afternoon. On an environmental research boat workbench in the foreground: clear glass sample collection vials of brackish water, a digital optical water-turbidity sensor, and a digital field microscope. A magnified circular inset showing harmless estuarine microorganisms alongside pathogen indicator analysis plates. In the background, winding tidal channels through golden cordgrass, snowy egrets wading, and clean blue coastal skies. Palette: cordgrass gold, marsh water aquamarine, research vial clear glass, and sunny sky blue. Estuarine ecology, water quality science, environmental monitoring, microbiology, informative and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1679, brief, 'Estuaries Pathogens water quality microbiology conservation')
    print("SUCCESS:", res)
