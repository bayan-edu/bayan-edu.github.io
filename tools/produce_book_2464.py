import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ira Investigates the Invisible". The title "Ira Investigates the Invisible" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MICROBIOLOGY DISCOVERY DAYLIGHT STYLE: A sun-drenched biology laboratory desk in daytime. A sleek modern optical microscope with a glowing blue LED stage illumination, looking down through a glass slide into an enlarged, glowing circle revealing the marvelous invisible world: intricate glass-shelled diatoms with geometric snowflake patterns, a green Euglena swimming with a flagellum, and paramecia. Palette: microscopic organisms radiant cyan, emerald and gold, microscope chassis metallic silver, and lab daylight clean white. Microbiology, microscopic life, cell biology, scientific curiosity, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2464, brief, 'Investigates Invisible microscope microbiology microbes protozoa diatom')
    print("SUCCESS:", res)
