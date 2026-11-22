import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Ex Factors". The title "The Ex Factors" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT EXERCISE PHYSIOLOGY & FITNESS DAYLIGHT STYLE: A sunlit athletic track and park on a glorious sunny morning in bright daylight. In the center foreground, on a clean wooden park bench: a pair of colorful modern running sneakers, a stainless steel water bottle with water droplets, a jump rope, resistance exercise bands, and a digital fitness watch displaying active heart rate metrics. In the background, a red athletic running track curves through green park lawns under a brilliant blue sky with soft white clouds. Palette: sneakers electric cyan and neon lime, track terracotta red, park grass emerald, and sky bright summer azure. Exercise physiology, cardiovascular fitness, sports science, healthy living, energetic, wholesome, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1482, brief, 'The Ex Factors')
    print("SUCCESS:", res)
