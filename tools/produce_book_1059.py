import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Short-Term Impact of the Zebra Mussel Invasion". '
    'The title "The Short-Term Impact of the Zebra Mussel Invasion" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT FRESHWATER ECOLOGY & ECOSYSTEM IMBALANCE DAYLIGHT STYLE: A sunlit river research station overlooking the sparkling Hudson River on a glorious sunny day in natural daylight. '
    'In the center foreground, on a weathered wooden dock: an ornate antique brass balance scale dramatically tipped to one side by an overwhelming clustered mound of dark-and-white striped zebra mussel shells on one weighing pan, vastly outweighing native river mollusks on the other. '
    'Beside the scale, glass river water sampling flasks, a hand lens, and water turbidity measuring tubes catching golden sunbeams. '
    'In the background, the wide sparkling blue Hudson River flows between lush green forested cliffs beneath a radiant blue sky. '
    'Palette: mussel shell ivory and black stripes, scale polished brass, river aquamarine, and cliff foliage emerald. '
    'Freshwater ecology, invasive species, zebra mussels, food web dynamics, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1059, brief, "The Short-Term Impact of the Zebra Mussel Invasion")
    print("SUCCESS:", res)
