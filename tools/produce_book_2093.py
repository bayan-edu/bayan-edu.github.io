import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Jungle Book". The title "The Jungle Book" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC INDIAN JUNGLE ADVENTURE STYLE: A sun-drenched, mystical ancient rainforest in central India in morning light. Ancient moss-covered carved stone palace ruins entwined with colossal banyan tree roots and hanging flowering lianas, with shafts of brilliant golden sunlight illuminating a sleek black panther (Bagheera) resting gracefully on a broad high branch, and colorful peacocks displaying iridescent feathers in the clearing below. Palette: jungle canopy lush emerald and jade, temple stone warm mossy grey, sunbeams radiant gold, and peacock plumage sapphire blue. Classic literature, tropical wilderness, jungle wildlife, enchanting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2093, brief, 'The Jungle Book Rudyard Kipling Indian jungle banyan ruins wildlife')
    print("SUCCESS:", res)
