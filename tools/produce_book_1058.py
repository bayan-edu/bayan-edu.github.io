import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Parts of the Brain". '
    'The title "The Parts of the Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT NEUROANATOMY & BRAIN BIOLOGY DAYLIGHT STYLE: A sunlit, pristine medical neuroscience study and laboratory on a glorious sunny morning in natural daylight. '
    'In the center foreground, on a clean wooden desk: a beautiful modular 3D anatomical model of the human brain with distinct color-coded functional regions (frontal lobe sapphire, parietal lobe golden amber, temporal lobe coral, occipital lobe emerald, and cerebellum violet). '
    'Beside the brain model rest a classic brass microscope, a colorful illustrated neuroanatomy chart showing brain lobes and functions, and a medical tuning fork catching warm morning sunbeams. '
    'In the background, sunlit laboratory windows look out over green trees under a clear blue sky. '
    'Palette: lobe color-coding sapphire, amber, coral, and emerald, desk warm wood, and sunny laboratory daylight. '
    'Neuroscience, human anatomy, brain structure, psychology, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1058, brief, "The Parts of the Brain")
    print("SUCCESS:", res)
