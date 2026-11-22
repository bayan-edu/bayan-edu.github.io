import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Greenhouse Gases". '
    'The title "Greenhouse Gases" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ATMOSPHERIC SCIENCE & GREENHOUSE BOTANICAL DAYLIGHT STYLE: A sunlit, magnificent glass botanical greenhouse dome on a bright sunny day under natural daylight. '
    'In the center foreground, lush emerald tropical ferns, monsteras, and blooming orchids flourishing inside the warm glass enclosure, with angled glass panes catching radiant golden sunbeams. '
    'Beside the plants on a sunlit stone ledge: a classic brass atmospheric thermometer and an artistic floating glass model of Earth showing atmospheric layers under gentle sunlight. '
    'In the background through the glass, a clear blue sky with puffy white cumulus clouds. '
    'Palette: lush greenhouse emerald, radiant sunbeam gold, glass crystalline reflections, and sky azure. '
    'Atmospheric science, ecology, climate, earth systems, bright, educational, vibrant, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1017, brief, "Greenhouse Gases")
    print("SUCCESS:", res)
