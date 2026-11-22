import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Amazon River". The title "The Amazon River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNIFICENT AMAZON RIVER HYDROLOGY DAYLIGHT STYLE: A breathtaking, sun-drenched aerial panoramic vista of the mighty Amazon River in bright tropical daylight. The immense, winding golden river snaking gracefully through an endless emerald carpet of pristine tropical rainforest to the distant horizon. In the foreground, giant floating Victoria amazonica water lily pads with pink blossoms on a tranquil oxbow lake. A pink Amazon river dolphin (boto) leaping playfully above the water surface under radiant sunny skies with fluffy cumulus clouds. Palette: Amazon river silt gold, rainforest deep emerald, water lily petal rose, and tropical sky blue. Amazon geography, tropical river hydrology, freshwater ecosystems, South American biodiversity, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1798, brief, 'The Amazon River tropical hydrology geography South America')
    print("SUCCESS:", res)
