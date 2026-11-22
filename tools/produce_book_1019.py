import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Being Done About Acid Rain?". '
    'The title "What Is Being Done About Acid Rain?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ECOLOGICAL RESTORATION & CLEAN TECHNOLOGY DAYLIGHT STYLE: A sun-drenched, revitalized pristine mountain forest and river valley on a glorious sunny morning in bright daylight. '
    'In the center foreground, a crystal-clear mountain stream tumbling over smooth granite pebbles, with native brook trout swimming visibly through pure water and healthy mossy boulders. '
    'Along the bank, thriving green birch and fir trees with vibrant leafy canopies soak up golden sunlight. '
    'In the distant sunlit horizon, modern clean-energy white wind turbines spin gracefully atop rolling green hills under a pure sapphire sky. '
    'Palette: river crystalline aquamarine, forest lush emerald, granite silver grey, and sky sapphire. '
    'Environmental science, clean technology, ecosystem restoration, bright, educational, hopeful, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1019, brief, "What Is Being Done About Acid Rain?")
    print("SUCCESS:", res)
