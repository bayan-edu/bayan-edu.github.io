import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Slippery Mystery". The title "A Slippery Mystery" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVER EEL MIGRATION FRESHWATER DAYLIGHT STYLE: A crystal-clear freshwater river pool bathed in midday sunshine. A sleek, elusive freshwater eel (Anguilla) with glistening olive-bronze skin weaving smoothly around smooth riverbed pebbles and submerged mossy logs, with sunbeams creating caustic light ripples on the riverbed, accompanied by clean migration map diagrams showing their incredible oceanic journey to the Sargasso Sea. Palette: river water sparkling aquamarine and amber, eel sleek bronze-green, river stones smooth grey, and sunlight radiant gold. Freshwater biology, eel catadromous migration, river conservation, mysterious and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2504, brief, 'Slippery Mystery freshwater eel Anguilla migration river stones clear water')
    print("SUCCESS:", res)
