import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Great Stone Face". The title "The Great Stone Face" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOUNTAIN GEOLOGY FOLKLORE STYLE: A majestic alpine mountain summit in New Hampshire bathed in glorious morning sun. Towering natural granite cliffs high on the mountainside form an unmistakable, noble, serene human-like facial profile sculpted by centuries of weather, overlooking a vast, peaceful valley of emerald pine forests, sparkling mountain streams, and rolling green hills under a bright blue sky. Palette: granite rock silvery grey and warm tan, pine forest deep evergreen, morning sunbeams radiant gold, and alpine sky azure. Classic American literature, geological wonders, natural stone monuments, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the natural geological rock mountain cliff profile). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2102, brief, 'The Great Stone Face Nathaniel Hawthorne mountain cliff granite profile')
    print("SUCCESS:", res)
