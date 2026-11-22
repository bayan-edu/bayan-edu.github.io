import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Is the Earth Getting Warmer?". The title "Is the Earth Getting Warmer?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLIMATE SCIENCE & ATMOSPHERIC MONITORING DAYLIGHT STYLE: A sunlit, high-altitude alpine atmospheric climate observatory in pristine daylight. In the center, a 3D translucent globe of the Earth overlaid with clean, scientific global surface temperature trend curves and heat anomaly color bands. In the background, majestic snow-covered peaks, melting glacier moraines, and meteorological weather instruments (barometers, pyranometers, and atmospheric CO2 sensors) gleaming in crisp sunshine. Palette: atmospheric sky blue, glacier white, temperature coral orange, cobalt blue, and sunlight gold. Climatology, global temperature analysis, Earth science, atmospheric data, clear, scientific, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1621, brief, 'Is the Earth Getting Warmer climate science global temperature')
    print("SUCCESS:", res)
