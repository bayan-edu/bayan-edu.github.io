import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "It Would Be Hard to Smile at a Smilodon". The title "It Would Be Hard to Smile at a Smilodon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NATURAL HISTORY PALEONTOLOGY LAB & PLEISTOCENE LANDSCAPE STYLE: A bright, sunlit paleontology preparation lab with windows overlooking a grassy prehistoric plain. In the center foreground, a magnificent fossilized skull of a Smilodon (saber-toothed cat) showing the iconic, immense curved canine teeth resting on an examination stand. Paleontologist excavation tools: fine brushes, dental picks, measuring calipers, and fossil stratigraphic field notebooks in bright daylight. In the background, an artistic vista of rolling Pleistocene savanna under golden sunlit skies. Palette: fossil bone ivory, amber ochre, warm earth brown, lush savanna green, and sky cyan. Paleontology, prehistoric mammals, fossil discovery, bright educational fascination. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1555, brief, 'It Would Be Hard to Smile at a Smilodon saber-toothed cat paleontology')
    print("SUCCESS:", res)
