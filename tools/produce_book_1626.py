import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Thunderstorm Types". The title "Thunderstorm Types" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGICAL SUPERCELL & CLOUD ANATOMY DAYLIGHT STYLE: A vast, breathtaking panoramic view of the Great Plains under daytime storm development. A towering supercell cumulonimbus cloud showing distinct anatomical features: flat anvil top spreading across the upper troposphere, rotating mesocyclone wall cloud, and precipitation shafts illuminated by sunlight. Educational cross-sectional vector overlays showing warm rising updraft arrows (red) and cool downdraft rain shafts (blue). Green prairie grassland in the foreground with a weather Doppler radar truck station monitoring the skies. Palette: stormy slate blue, cloud billow white, prairie green, updraft coral red, and sunbeam gold. Meteorology, cloud physics, thunderstorm dynamics, severe weather science, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1626, brief, 'Thunderstorm Types meteorology supercell cumulonimbus weather')
    print("SUCCESS:", res)
