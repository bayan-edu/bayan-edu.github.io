import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Puss in Boots". The title "Puss in Boots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HEROIC FAIRYTALE CAVALIER STYLE: A sun-drenched European fairytale castle courtyard on a glorious morning. Resting prominently on an ornate velvet-cushioned stone bench are a pair of handsome, polished leather cavalier musketeer boots with gold buckles and brass spurs, beside a grand wide-brimmed cavalier hat adorned with a sweeping peacock feather, and a slender fencing foil with golden hilt. Stone castle arches and blooming red climbing roses in the sunny background. Palette: leather boots rich cognac amber, velvet cushion royal crimson, feather peacock emerald and sapphire, and castle stone warm cream. Classic fairytale adventure, swashbuckling wit, storybook charm, noble and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2186, brief, 'Puss in Boots fairytale leather boots feathered hat sword castle')
    print("SUCCESS:", res)
