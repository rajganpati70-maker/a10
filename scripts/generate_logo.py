"""
Generate the CreatorX Ultra Pro brand assets:
- icon.png            1024x1024  (iOS/Android app icon)
- adaptive-icon.png   1024x1024  (Android adaptive foreground on transparent bg)
- splash-icon.png     1242x2436  (splash screen image)
- favicon.png         196x196    (web favicon)

Design: neon glassmorphic "X" monogram with a rotating aurora gradient,
radial glow, inner bevel, and a play-triangle cutout — a premium creator mark.
"""
from __future__ import annotations

import math
import os
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ASSETS = Path(__file__).resolve().parent.parent / "assets"
ASSETS.mkdir(exist_ok=True)


# ---------- gradient helpers ----------------------------------------------------

def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (
        int(a[0] + (b[0] - a[0]) * t),
        int(a[1] + (b[1] - a[1]) * t),
        int(a[2] + (b[2] - a[2]) * t),
    )


def multi_stop(stops: list[tuple[float, tuple[int, int, int]]], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t0 <= t <= t1:
            k = 0 if t1 == t0 else (t - t0) / (t1 - t0)
            return lerp(c0, c1, k)
    return stops[-1][1]


def radial_gradient(size: int, stops: list[tuple[float, tuple[int, int, int]]]) -> Image.Image:
    img = Image.new("RGB", (size, size))
    px = img.load()
    cx = cy = size / 2
    maxd = math.hypot(cx, cy)
    for y in range(size):
        for x in range(size):
            d = math.hypot(x - cx, y - cy) / maxd
            px[x, y] = multi_stop(stops, d)
    return img


def angular_gradient(size: int, stops: list[tuple[float, tuple[int, int, int]]], phase: float = 0.0) -> Image.Image:
    img = Image.new("RGB", (size, size))
    px = img.load()
    cx = cy = size / 2
    for y in range(size):
        for x in range(size):
            ang = (math.atan2(y - cy, x - cx) + math.pi) / (2 * math.pi)
            ang = (ang + phase) % 1.0
            px[x, y] = multi_stop(stops, ang)
    return img


# ---------- primitives ---------------------------------------------------------

def rounded_square_mask(size: int, radius_ratio: float = 0.235) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    r = int(size * radius_ratio)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=r, fill=255)
    return m


def x_mark_mask(size: int, thickness_ratio: float = 0.18, inset: float = 0.22) -> Image.Image:
    """Bold, slightly tapered X monogram."""
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    t = int(size * thickness_ratio)
    a = int(size * inset)
    b = size - a
    # two thick strokes forming an X, with rounded caps
    d.line([(a, a), (b, b)], fill=255, width=t)
    d.line([(a, b), (b, a)], fill=255, width=t)
    # round the end caps
    r = t // 2
    for (x, y) in [(a, a), (b, b), (a, b), (b, a)]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    return m


def play_triangle_mask(size: int) -> Image.Image:
    """Small play-triangle negative space in the center for a 'creator' feel."""
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    cx = cy = size / 2
    s = size * 0.085
    # equilateral-ish triangle pointing right
    pts = [
        (cx - s * 0.7, cy - s),
        (cx - s * 0.7, cy + s),
        (cx + s * 0.95, cy),
    ]
    d.polygon(pts, fill=255)
    return m


# ---------- composite ----------------------------------------------------------

def make_logo(size: int, *, transparent_bg: bool = False, with_play: bool = True) -> Image.Image:
    # 1) background: deep radial nebula
    bg_stops = [
        (0.00, (0x2B, 0x10, 0x55)),  # violet core
        (0.35, (0x14, 0x08, 0x38)),
        (0.70, (0x07, 0x04, 0x1C)),
        (1.00, (0x00, 0x00, 0x00)),
    ]
    bg = radial_gradient(size, bg_stops)

    # subtle star dust: high-freq noise dimmed
    noise = Image.effect_noise((size, size), 18).convert("L")
    noise = noise.point(lambda v: max(0, v - 210) * 6)
    dust = Image.merge("RGB", (noise, noise, noise))
    bg = ImageChops.add(bg, dust, scale=2)

    rounded = rounded_square_mask(size)

    # 2) aurora gradient fill for the X
    aurora_stops = [
        (0.00, (0xFF, 0x2E, 0x9A)),  # hot pink
        (0.20, (0xFF, 0x6A, 0x3D)),  # coral
        (0.40, (0xFF, 0xD1, 0x3C)),  # gold
        (0.60, (0x2E, 0xF0, 0xB3)),  # mint
        (0.80, (0x3A, 0x9BFF & 0xFF, 0xFF)),  # azure
        (1.00, (0xA6, 0x4BFF & 0xFF, 0xFF)),  # violet
    ]
    aurora = angular_gradient(size, aurora_stops, phase=0.12)

    x_mask = x_mark_mask(size)

    # 3) outer glow (soft bloom behind the X)
    glow_src = Image.new("RGB", (size, size), (0, 0, 0))
    glow_src.paste(aurora, (0, 0), x_mask)
    glow = glow_src.filter(ImageFilter.GaussianBlur(size * 0.06))
    # boost glow
    glow = Image.eval(glow, lambda v: min(255, int(v * 1.35)))

    # 4) assemble on bg
    canvas = bg.copy()
    canvas = ImageChops.add(canvas, glow, scale=1)

    # the crisp X on top
    x_layer = Image.new("RGB", (size, size), (0, 0, 0))
    x_layer.paste(aurora, (0, 0), x_mask)
    canvas.paste(x_layer, (0, 0), x_mask)

    # 5) inner highlight (glassy top-left sheen)
    sheen = Image.new("L", (size, size), 0)
    sd = ImageDraw.Draw(sheen)
    sd.ellipse((-size * 0.2, -size * 0.3, size * 0.75, size * 0.55), fill=140)
    sheen = sheen.filter(ImageFilter.GaussianBlur(size * 0.04))
    sheen_rgb = Image.new("RGB", (size, size), (255, 255, 255))
    canvas = Image.composite(
        ImageChops.add(canvas, sheen_rgb, scale=4),
        canvas,
        ImageChops.multiply(x_mask, sheen),
    )

    # 6) optional play-triangle cutout at center of X
    if with_play:
        play = play_triangle_mask(size)
        # darken the triangle area and add a tiny white outline
        dark = Image.new("RGB", (size, size), (0, 0, 0))
        canvas = Image.composite(dark, canvas, play)

    # 7) thin luminous border
    border = Image.new("L", (size, size), 0)
    bd = ImageDraw.Draw(border)
    bd.rounded_rectangle(
        (2, 2, size - 3, size - 3),
        radius=int(size * 0.235),
        outline=255,
        width=max(2, size // 220),
    )
    border = border.filter(ImageFilter.GaussianBlur(size * 0.004))
    border_rgb = Image.new("RGB", (size, size), (255, 255, 255))
    canvas = Image.composite(
        ImageChops.add(canvas, border_rgb, scale=6),
        canvas,
        border,
    )

    # 8) apply rounded-square mask for app-icon shape
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(canvas, (0, 0), rounded)

    if transparent_bg:
        # Android adaptive foreground: keep only the X + glow (no bg tile)
        fg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        # glow first
        glow_rgba = glow.convert("RGBA")
        glow_alpha = glow.convert("L").point(lambda v: min(255, int(v * 1.1)))
        glow_rgba.putalpha(glow_alpha)
        fg.alpha_composite(glow_rgba)
        # crisp x
        x_rgba = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        x_rgba.paste(aurora.convert("RGBA"), (0, 0), x_mask)
        x_rgba.putalpha(x_mask)
        fg.alpha_composite(x_rgba)
        return fg

    return out


def make_splash(w: int, h: int) -> Image.Image:
    # bg: vertical aurora
    bg = Image.new("RGB", (w, h))
    px = bg.load()
    splash_stops = [
        (0.00, (0x05, 0x02, 0x18)),
        (0.45, (0x14, 0x08, 0x44)),
        (0.75, (0x2B, 0x10, 0x66)),
        (1.00, (0x05, 0x02, 0x18)),
    ]
    for y in range(h):
        c = multi_stop(splash_stops, y / (h - 1))
        for x in range(w):
            px[x, y] = c
    # soft radial glow behind logo
    glow = radial_gradient(min(w, h), [
        (0.0, (0xFF, 0x2E, 0x9A)),
        (0.25, (0x3A, 0x9B, 0xFF)),
        (0.6, (0x05, 0x02, 0x18)),
        (1.0, (0x00, 0x00, 0x00)),
    ])
    glow = glow.resize((w, h)).filter(ImageFilter.GaussianBlur(w * 0.12))
    bg = ImageChops.add(bg, glow, scale=3)

    logo_size = int(min(w, h) * 0.46)
    logo = make_logo(logo_size, transparent_bg=False, with_play=True)
    out = bg.convert("RGBA")
    out.alpha_composite(logo, ((w - logo_size) // 2, (h - logo_size) // 2 - int(h * 0.04)))
    return out


def main() -> None:
    sizes = {
        "icon.png": (1024, False),
        "adaptive-icon.png": (1024, True),
        "favicon.png": (196, False),
    }
    for name, (sz, transparent) in sizes.items():
        img = make_logo(sz, transparent_bg=transparent)
        img.save(ASSETS / name, "PNG")
        print(f"wrote {ASSETS / name}  {img.size}")

    splash = make_splash(1242, 2436)
    splash.save(ASSETS / "splash-icon.png", "PNG")
    print(f"wrote {ASSETS / 'splash-icon.png'}  {splash.size}")


if __name__ == "__main__":
    main()
