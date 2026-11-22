import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ben Carson: American Neurosurgeon and Politician". The title "Ben Carson: American Neurosurgeon and Politician" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MEDICAL NEUROSURGERY STUDY DAYLIGHT STYLE: A sunlit, dignified medical research study on a glorious clear day under natural daylight. In the center foreground, on a polished mahogany desk: a detailed, high-precision anatomical model of the human brain with clearly color-coded cerebral lobes, beside a classic polished stainless steel stethoscope. Arranged alongside are open vintage medical encyclopedias with neurological diagrams and a pair of surgical magnifying loupes. In the background, sun-drenched library windows look out over manicured university green lawns under a blue sky. Palette: brain anatomical coral and cream, desk polished mahogany, stethoscope stainless steel, and window daylight ivory. Neurosurgery, medical science, human brain anatomy, educational, inspiring, bright, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1295, brief, 'Ben Carson: American Neurosurgeon and Politician')
    print("SUCCESS:", res)
