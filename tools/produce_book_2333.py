import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Ever-Changing Sky". The title "The Ever-Changing Sky" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ATMOSPHERIC METEOROLOGY DAYLIGHT CLOUDS STYLE: A stunning vertical cloud atlas panorama spanning from ground to upper atmosphere. At the base, green rolling hills with fair-weather puffy white cumulus clouds; rising into mid-level altocumulus ripples, and soaring into high-altitude wispy ice-crystal cirrus clouds catching radiant golden sunlight, alongside a towering anvil-topped cumulonimbus with distant rainbow. Palette: sky atmospheric gradient deep cerulean to pale cyan, clouds pure brilliant white with golden-tinted sunlit edges, and meadow green. Cloud classification, atmospheric science, weather observation, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2333, brief, 'Ever Changing Sky atmospheric cloud types cirrus cumulus cumulonimbus weather')
    print("SUCCESS:", res)
