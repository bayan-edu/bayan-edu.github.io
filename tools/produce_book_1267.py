import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Body Buddies: The Microbes that Live In and On Us". The title "Body Buddies: The Microbes that Live In and On Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MICROBIOLOGY SCIENCE DAYLIGHT STYLE: A cheerful, sunlit laboratory workbench with friendly microscopic biology visuals in bright daylight. In the center foreground, a sleek modern scientific compound microscope beside colorful agar petri dishes blooming with colorful benign bacterial colonies (friendly lactobacillus and beneficial microbes). Above the microscope, stylized, friendly, colorful 3D microbe illustrations (rod-shaped, spiral, and spherical bacteria) float peacefully with clean educational labels explaining beneficial bacteria. Palette: petri dish coral pink and mint green, microscope clean white and brushed steel, microbes friendly lilac and teal. Microbiology, human microbiome, beneficial bacteria, health science, bright, friendly, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1267, brief, 'Body Buddies: The Microbes that Live In and On Us')
    print("SUCCESS:", res)
