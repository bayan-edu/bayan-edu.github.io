import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Meet the Ichthyologist". The title "Meet the Ichthyologist" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ICHTHYOLOGY RESEARCH LABORATORY STYLE: A bright, sunlit natural history museum ichthyology research desk in daytime. Jars of preserved freshwater fish specimens from the Congo River, detailed anatomical sketches of specialized fish jaws and fin rays, a brass dissecting microscope, calipers, and taxonomic identification charts under bright study lamps. Palette: specimen jars amber glass and clear fluid, anatomical sketches sepia, desk warm mahogany, and daylight bright white. Ichthyology, fish evolution, freshwater biodiversity, museum science, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2551, brief, 'Ichthyology fish biodiversity freshwater specimens microscope Congo river')
    print("SUCCESS:", res)
