import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Anna\'s Extraordinary Experiments with Weather". The title "Anna\'s Extraordinary Experiments with Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT METEOROLOGICAL SCIENCE DAYLIGHT STYLE: A sunlit, inspiring meteorological research station on a scenic hilltop observatory under bright daylight. In the center foreground, a polished wooden scientific workbench featuring gleaming brass weather instruments: a spinning three-cup anemometer, a precision mercury barometer, a glass sunshine recorder sphere, and weather measurement charts. On an outdoor balcony railing behind the bench, a colorful high-altitude weather balloon is being prepared against a majestic sky filled with billowing white cumulus clouds and brilliant sunshine. Palette: observatory brass gold, sky azure, cumulus white, instrument steel silver, and hilltop meadow green. Atmospheric science, meteorology, weather instruments, scientific pioneering, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1237, brief, "Anna's Extraordinary Experiments with Weather")
    print("SUCCESS:", res)
