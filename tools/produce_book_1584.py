import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wi-Fi: Connecting the World Through Invisible Waves". The title "Wi-Fi: Connecting the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIGH-TECH WIRELESS NETWORKING DAYLIGHT STYLE: A sleek, modern sunlit home and office environment bathed in natural morning light. In the center foreground, a high-performance modern wireless router with directional antennas emitting concentric, glowing electromagnetic radio frequency waves. Stylized transparent architectural cutaway showing radio waves passing cleanly through rooms, connecting digital tablets, laptops, and smart devices via glowing data pulses. Palette: electric cyan, wireless signal royal blue, sleek matte white, and warm wooden desk honey. Wireless networking, radio physics, telecommunications, digital connectivity, modern and clear. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1584, brief, 'Wi Fi Connecting the World electromagnetic radio waves')
    print("SUCCESS:", res)
