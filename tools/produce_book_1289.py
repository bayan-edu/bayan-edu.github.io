import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Heat Is On". The title "The Heat Is On" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARCTIC CLIMATOLOGY DAYLIGHT STYLE: A breathtaking, pristine Arctic landscape under crisp blue skies and brilliant arctic daylight. In the center foreground, a magnificent, healthy polar bear with thick creamy-white fur walking across a sturdy expanse of sea ice pack. Surrounding the ice are pools of crystal-clear turquoise meltwater, floating ice floes, and distant jagged snow-capped mountain peaks reflecting warm golden sunshine. Palette: sea ice diamond white and glacial turquoise, polar bear creamy white, ocean deep sapphire, and radiant arctic sunlight. Arctic ecology, polar bear habitat, climate change, glaciology, bright, magnificent, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1289, brief, 'The Heat Is On')
    print("SUCCESS:", res)
