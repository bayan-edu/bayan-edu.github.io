import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "ROCKET LIFTING". The title "ROCKET LIFTING" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT HISTORIC ROCKET LAUNCH DAYLIGHT STYLE: A sunlit coastal rocket launchpad at Thumba seaside under a brilliant blue tropical sky in bright daylight. In the center foreground, a slender sounding rocket standing poised vertically on its steel launch tower, flanked by towering swaying coconut palms. In the background, the sparkling turquoise waves of the Arabian Sea break gently on sandy shores, with telemetry tracking dish antennas and seaside weather flags waving in the coastal breeze. Palette: sounding rocket white and aerospace orange, launch tower steel, palm frond emerald, sea turquoise, and sunny daylight gold. Space history, sounding rockets, aerospace engineering, coastal science, bright, educational, inspiring, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1246, brief, 'ROCKET LIFTING')
    print("SUCCESS:", res)
