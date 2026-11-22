import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Heart Sick". The title "Heart Sick" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VETERINARY CARDIOLOGY RESEARCH DAYLIGHT STYLE: A sunlit veterinary medical research facility in bright natural daylight. In the center foreground, a modern digital electrocardiogram (ECG) monitor displaying a steady, rhythmic green heartbeat pulse wave across an illuminated grid screen. Beside the monitor on a stainless steel examination table rest a professional veterinary stethoscope, a detailed anatomical model of a mammalian heart with vascular chambers, and fresh leafy greens and fruit. Palette: ECG trace vibrant neon green, anatomical heart warm terracotta and blue, stethoscope chrome, and clinic daylight white. Veterinary medicine, animal cardiology, great ape healthcare, zoological medicine, compassionate, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1517, brief, 'Heart Sick')
    print("SUCCESS:", res)
