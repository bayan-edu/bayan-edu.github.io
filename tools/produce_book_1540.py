import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Small but Mighty Oyster: A Keystone Species in Estuaries". The title "The Small but Mighty Oyster" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT COASTAL ESTUARY & OYSTER REEF DAYLIGHT STYLE: A sunlit coastal salt marsh estuary in the Chesapeake Bay at morning low tide in bright daylight. In the center foreground, a flourishing natural oyster reef made of clustered, textured gray-and-cream oyster shells filtering brackish water into crystal-clear pools. In the water around the reef, blue crabs and minnows find sanctuary among green eelgrass, while a white snowy egret wades in shallow waters under a brilliant blue sky. Palette: oyster shell silver-gray and pearl, marsh grass vibrant emerald, water clear aqua, and sky sunny cyan. Marine biology, oyster reef restoration, keystone species, estuary ecology, water filtration, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1540, brief, 'The Small but Mighty Oyster Keystone Species')
    print("SUCCESS:", res)
