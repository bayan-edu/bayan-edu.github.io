import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Black-footed Ferrets". The title "Saving Black-footed Ferrets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AMERICAN PRAIRIE ENDANGERED SPECIES CONSERVATION STYLE: A sun-drenched, golden shortgrass prairie landscape on a crisp morning under azure skies. In the center foreground, an adorable, alert black-footed ferret with distinct dark mask around its eyes and black feet peeking curiously out of an earthen prairie dog burrow. Wild prairie coneflowers, sagebrush, and a wooden wildlife conservation monitoring stake with a radio-telemetry antenna in the background. Rolling grassland plains stretching to the horizon under sweeping sunny skies. Palette: ferret mask black and cream, prairie grass golden buff, sagebrush silver-green, and prairie sky blue. Wildlife conservation, endangered species recovery, prairie ecology, mustelid biology, endearing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1775, brief, 'Saving Black-footed Ferrets prairie wildlife conservation endangered')
    print("SUCCESS:", res)
