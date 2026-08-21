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

MAX_WIDTH = 1280
MAX_HEIGHT = 720
COLOR = 1.18
CONTRAST = 1.08
SHARPNESS = 1.15
JPEG_QUALITY = 85


def enhance(src: str, out_path: str = None) -> str:
    img = Image.open(src)
    img = img.convert("RGB")
    w, h = img.size
    
    # Akıllı Boyutlandırma (1280x720 Sınırlandırması)
    if w > MAX_WIDTH or h > MAX_HEIGHT:
        ratio = min(MAX_WIDTH / w, MAX_HEIGHT / h)
        new_w = int(w * ratio)
        new_h = int(h * ratio)
        img = img.resize((new_w, new_h), Image.LANCZOS)
    elif w < 600:
        # Çok küçük resimleri 2x büyüt
        img = img.resize((w * 2, h * 2), Image.LANCZOS)
        
    img = ImageEnhance.Color(img).enhance(COLOR)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Sharpness(img).enhance(SHARPNESS)
    
    if not out_path:
        base, _ = os.path.splitext(src)
        out_path = base + ".jpg"
    
    # Optimize ve Web-Safe JPEG kalitesi
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
