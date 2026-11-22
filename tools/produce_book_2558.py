import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Day in the Life of a Veterinary Technician". The title "A Day in the Life of a Veterinary Technician" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VETERINARY CLINIC HEALTHCARE DAYLIGHT STYLE: A bright, sunlit modern veterinary examination room in daytime. On a clean stainless steel exam table, a colorful pediatric stethoscope, digital thermometer, otoscope, animal vitamins, and an adorable healthy golden retriever puppy sitting curiously looking at a small squeaky toy beside an x-ray light box showing animal bone health. Palette: exam room clinical white and sky blue, puppy golden honey, medical tools chrome, and daylight bright. Veterinary medicine, animal healthcare, pet wellness, compassionate and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2558, brief, 'Veterinary Technician animal clinic stethoscope microscope puppy care')
    print("SUCCESS:", res)
