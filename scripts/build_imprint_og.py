"""Build art/imprint-og.png — 1200x630 social share image for Imprint."""
from pathlib import Path
import resvg_py
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

ROOT = Path(__file__).resolve().parent.parent
SVG = ROOT / "art" / "imprint-mark.svg"
OUT = ROOT / "art" / "imprint-og.png"

W, H = 1200, 630
CREAM = (245, 241, 235, 255)         # #F5F1EB
INK = (26, 23, 20, 255)              # #1A1714
BROWN = (140, 115, 85, 255)          # #8C7355
RULE = (26, 23, 20, 38)              # rgba(26,23,20,0.15)

MARK_SIZE = 300
MARK_LEFT = 110
MARK_CENTER_Y = H // 2

# 1) Render the SVG to a transparent PNG buffer at MARK_SIZE.
svg_text = SVG.read_text(encoding="utf-8")
png_bytes = resvg_py.svg_to_bytes(
    svg_string=svg_text,
    width=MARK_SIZE,
    height=MARK_SIZE,
)
mark = Image.open(BytesIO(bytes(png_bytes))).convert("RGBA")

# 2) Canvas.
canvas = Image.new("RGBA", (W, H), CREAM)

# 3) Paste the mark (vertically centered, left).
mark_x = MARK_LEFT
mark_y = MARK_CENTER_Y - MARK_SIZE // 2
canvas.alpha_composite(mark, (mark_x, mark_y))

# 4) Vertical separator.
draw = ImageDraw.Draw(canvas)
sep_x = mark_x + MARK_SIZE + 90
sep_top = 150
sep_bot = H - 150
draw.line([(sep_x, sep_top), (sep_x, sep_bot)], fill=RULE, width=1)

# 5) Text block — right of separator.
def load_font(paths, size):
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()

WIN_FONTS = Path("C:/Windows/Fonts")
serif_reg = load_font([str(WIN_FONTS / "georgia.ttf")], 80)
serif_italic = load_font([str(WIN_FONTS / "georgiai.ttf")], 28)
sans_small = load_font([str(WIN_FONTS / "georgia.ttf")], 22)

text_x = sep_x + 60

# Measure heights to vertically center the whole text block.
def text_size(text, font):
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0], bbox[3] - bbox[1], bbox[1]

wm = "imprint"
by = "by Alan Geleff"
tag = "Your vision. Made visible."

w1, h1, off1 = text_size(wm, serif_reg)
w2, h2, off2 = text_size(by, sans_small)
w3, h3, off3 = text_size(tag, serif_italic)

gap_wm_by = 14
gap_by_tag = 36
total_h = h1 + gap_wm_by + h2 + gap_by_tag + h3

start_y = (H - total_h) // 2

y = start_y
draw.text((text_x, y - off1), wm, font=serif_reg, fill=INK)
y += h1 + gap_wm_by
draw.text((text_x, y - off2), by, font=sans_small, fill=BROWN)
y += h2 + gap_by_tag
draw.text((text_x, y - off3), tag, font=serif_italic, fill=INK)

# 6) Save as PNG (RGB — no need for alpha on the final).
canvas.convert("RGB").save(OUT, "PNG", optimize=True)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
