#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Görsel Kalite İyileştirme - AGENTS.md Bölüm 4 Madde 7
Dışarıdan indirilen görsellerin gönderiye eklenmeden önce iyileştirilmesi:
  - 2x boyut büyütme (LANCZOS)
  - Renk canlılığı +18%
  - Kontrast +8%
  - Keskinlik +15%
  - JPEG kalite 92
Dosya adı temiz tutulur (_enh son eki kullanılmaz).
"""
import sys
import os
from PIL import Image, ImageEnhance

UPSCALE = 2
COLOR = 1.18
CONTRAST = 1.08
SHARPNESS = 1.15
JPEG_QUALITY = 92


def enhance(src: str, out_path: str = None) -> str:
    img = Image.open(src)
    img = img.convert("RGB")
    w, h = img.size
    img = img.resize((w * UPSCALE, h * UPSCALE), Image.LANCZOS)
    img = ImageEnhance.Color(img).enhance(COLOR)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Sharpness(img).enhance(SHARPNESS)
    if not out_path:
        base, _ = os.path.splitext(src)
        out_path = base + ".jpg"
    img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    return out_path


def main():
    if len(sys.argv) < 2:
        print("Kullanım: python3 gorsel-iyilestir.py <gorsel.jpg> [...]")
        sys.exit(1)
    for arg in sys.argv[1:]:
        if not os.path.isfile(arg):
            print(f"[!] Yok: {arg}")
            continue
        out = enhance(arg)
        print(f"[+] {arg} -> {out}")


if __name__ == "__main__":
    main()
