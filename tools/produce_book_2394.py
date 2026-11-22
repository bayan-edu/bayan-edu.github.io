import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Predicting the Future". The title "Predicting the Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DATA SCIENCE AND PREDICTIVE MODELING STYLE: A bright, sunlit computational laboratory overlooking a modern skyline in daytime. On a sleek glass conference desk, interactive holographic predictive models showing complex global weather simulation spheres, clean statistical probability distribution curves (Gaussian bell curves), and algorithmic neural network branch nodes projecting insights into the future. Palette: holographic data lines luminous cyan, gold and emerald, glass desk crystal clear, and skyline sunlight bright white. Predictive analytics, forecasting science, probability math, artificial intelligence, forward-looking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2394, brief, 'Predicting the Future predictive modeling algorithms supercomputer climate')
    print("SUCCESS:", res)
