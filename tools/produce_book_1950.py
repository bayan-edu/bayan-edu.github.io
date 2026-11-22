import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Nature Is Our Super Shield!". The title "Nature Is Our Super Shield!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOMIMICRY PROTECTIVE ENGINEERING DAYLIGHT STYLE: A sun-drenched montage of nature\'s greatest protective adaptations in clear daylight. In the center, an intricately textured pangolin scale keratin shield and an iridescent mother-of-pearl (nacre) abalone seashell interior, alongside a lotus leaf repelling glistening spherical water droplets (superhydrophobic lotus effect) and resilient pinecone scales. Clean technical callouts showing microscopic layered architecture. Palette: iridescent nacre pearlescent rainbow, lotus leaf vibrant emerald green, and sunny sky blue. Biomimetic armor, natural materials science, defensive evolution, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1950, brief, 'Nature Is Our Super Shield biomimicry protective structures armor')
    print("SUCCESS:", res)
