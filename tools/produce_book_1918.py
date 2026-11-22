import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Who Was John Glenn?". The title "John Glenn: Orbiting the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PROJECT MERCURY & HISTORIC ORBITAL FLIGHT TRIBUTE STYLE: A sunlit 1960s space race engineering study in bright morning daylight. On an oak study desk: a detailed scale model of the Friendship 7 Mercury space capsule atop its Atlas launch rocket, vintage Mission Control communication headsets, circular orbital flight tracking globes with orbital inclination tracks, and mission logbooks. Through arched windows, a clear sunny blue sky with morning sunlight streaming across historical aerospace blueprints. Palette: Mercury capsule titanium black and heat shield orange, mission desk warm oak, flight chart cream, and sunny sky blue. Project Mercury, John Glenn, first American orbital spaceflight, aerospace history, dignified, inspiring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1918, brief, 'John Glenn Mercury Friendship 7 first American orbit astronautics')
    print("SUCCESS:", res)
