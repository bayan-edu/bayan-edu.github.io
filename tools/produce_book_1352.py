import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: A History of Britain". The title "A History of Britain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT BRITISH HISTORICAL HERITAGE DAYLIGHT STYLE: A sun-drenched, iconic landscape celebrating British history across millennia in bright daylight. In the center foreground, an ancient stone monument megalith resting on rolling emerald hills, with historical artifacts arranged respectfully: an ancient Celtic bronze shield with spiral motifs, a polished medieval knight\'s steel helmet, and a parchment copy of Magna Carta with red wax seals. In the sweeping background, the iconic White Cliffs of Dover meet the sparkling blue English Channel under a radiant sunny sky. Palette: rolling hills rich emerald, bronze shield warm amber, stone weathered slate, and sea sapphire. British history, heritage, archaeology, historical epochs, dignified, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1352, brief, 'Reading A History of Britain')
    print("SUCCESS:", res)
