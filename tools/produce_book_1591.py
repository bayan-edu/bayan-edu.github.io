import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Focus: Understanding How the Brain Works". The title "Understanding the Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT COGNITIVE NEUROSCIENCE DAYLIGHT STYLE: A brightly lit, modern cognitive science laboratory with sunlight streaming through large windows. In the center foreground, an illuminated 3D translucent model of the human brain with distinct functional regions (prefrontal cortex, temporal lobe, visual cortex) mapped in clear, harmonious colors. Gently glowing neural synapsing pathways and network connectivity nodes connecting the brain regions. On the desk: clean EEG brainwave graphs showing alpha and beta focus wavelengths, alongside a notebook and prism on polished wood. Palette: optic white, electric cyan, neural violet, coral pink, and natural desk blonde oak. Cognitive neuroscience, brain function, attention and focus, psychology, bright and enlightening. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1591, brief, 'Focus Understanding How the Brain Works cognitive neuroscience')
    print("SUCCESS:", res)
