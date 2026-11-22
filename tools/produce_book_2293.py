import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Case of the New Planet". The title "The Case of the New Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXOPLANET DISCOVERY ASTRONOMY STYLE: An inspiring astronomical observatory scene showing the discovery of a distant exoplanet. In the center, a magnificent golden star with a newly discovered ocean exoplanet transiting in front of it (transit photometry method), revealing a clean educational light curve dipping graph and orbital mechanics diagrams, alongside a high-tech space telescope in orbit. Palette: host star radiant golden yellow, exoplanet deep cyan and sapphire, transit data lines bright neon lime, and space deep velvet black. Exoplanetary science, astronomical detection, Kepler mission, scientific detective work, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2293, brief, 'The Case of the New Planet exoplanet discovery telescope astronomy Kepler')
    print("SUCCESS:", res)
