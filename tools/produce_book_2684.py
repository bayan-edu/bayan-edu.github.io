import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fearless Fatima". The title "Fearless Fatima" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CYBERSECURITY DEFENSE DAYLIGHT STYLE: A bright, sunlit modern coding workstation in daytime. A sleek open laptop with a bright screen displaying an ethical hacking security terminal and green firewall shield, with glowing geometric holographic security tokens and decrypted data blocks floating in the air, beside notebook with logic diagrams and a cup of tea under sunny window light. Palette: firewall shield emerald and cyan, laptop metallic silver, desk warm oak, and sunlight clear white. Ethical hacking, cybersecurity defense, digital problem solving, empowering and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2684, brief, 'Fearless Fatima ethical hacking cybersecurity code firewall laptop')
    print("SUCCESS:", res)
