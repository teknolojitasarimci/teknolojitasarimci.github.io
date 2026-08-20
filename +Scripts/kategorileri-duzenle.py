#!/usr/bin/env python3
"""Gönderi rozetlerini ve kategori menülerini kullanılan kategorilere göre eşitler."""

from __future__ import annotations

import html
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "sayfalar"
SIDEBAR_SOURCE = ROOT / "index.html"

MERGE = {
    "Belge Şablonları": "Belge ve Davetiye Şablonları",
    "Bilim İnsanları": "Mucitler ve Bilim İnsanları",
    "Bulmaca Etkinlikleri": "Zeka Oyunları",
    "Engelsiz Hayat": "Engelsiz Hayat Teknolojileri",
    "Engelsiz Teknolojiler": "Engelsiz Hayat Teknolojileri",
    "Engelsiz Yaşam": "Engelsiz Hayat Teknolojileri",
    "Evraklar": "Dosyalar",
    "İdari Evraklar": "Dosyalar",
    "Öğretmen Dosyaları": "Dosyalar",
    "Öğretmen Evrakları": "Dosyalar",
    "İnovasyon": "İnovasyon - İnovatif Düşünce",
    "MEB Yönetmeliği": "Mevzuat ve Yönetmelikler",
    "Müfredat": "Öğretim Programı",
    "Planlama": "Yıllık Planlar",
    "Sınıf Yönetimi": "Rehberlik ve Kişisel Gelişim",
    "Zümre Toplantısı": "Zümre Toplantı Tutanakları",
}


def post_files() -> list[Path]:
    files = []
    for directory in sorted(POSTS.iterdir()):
        match = re.match(r"Post(\d+)-", directory.name)
        if not match or not directory.is_dir():
            continue
        page = directory / f"post{match.group(1)}-preview.html"
        if not page.exists():
            page = directory / "post-preview.html"
        if page.exists():
            files.append(page)
    return files


def canonical(value: str) -> str:
    return MERGE.get(value, value)


def collect_and_update_badges() -> Counter[str]:
    counts: Counter[str] = Counter()
    for page in post_files():
        text = page.read_text(encoding="utf-8")

        def update(match: re.Match[str]) -> str:
            category = canonical(re.sub(r"<[^>]+>", "", match.group(1)).strip())
            counts[category] += 1
            return f'<span class="badge-pill badge-primary">{html.escape(category, quote=False)}</span>'

        text = re.sub(r'<span class="badge-pill badge-primary">(.*?)</span>', update, text, flags=re.S)
        page.write_text(text, encoding="utf-8")
    return counts


def current_sidebar_categories() -> list[str]:
    text = SIDEBAR_SOURCE.read_text(encoding="utf-8")
    categories = re.findall(r'<button[^>]*class="sidebar-cat-item[^>]*data-cat="([^"]+)"', text)
    return [html.unescape(category) for category in categories if category != "ALL"]


def category_order(used: Counter[str]) -> list[str]:
    old_order = current_sidebar_categories()
    result = [canonical(category) for category in old_order if used[canonical(category)] > 0]
    result += sorted(category for category in used if category not in result and used[category] > 0)
    return list(dict.fromkeys(result))


def button_menu(categories: list[str]) -> str:
    lines = ['<div class="sidebar-cat-list" id="sidebar-cat-list">', '                    <button onclick="filterCategory(\'ALL\')" class="sidebar-cat-item active-sidebar-cat" data-cat="ALL"><span class="play-icon">&#9656;</span> Tüm Gönderiler</button>']
    for category in categories:
        escaped = html.escape(category, quote=True)
        lines.append(f'                    <button onclick="filterCategory(\'{escaped}\')" class="sidebar-cat-item" data-cat="{escaped}"><span class="play-icon">&#9656;</span> {html.escape(category)}</button>')
    lines.append('                </div>')
    return "\n".join(lines)


def anchor_menu(categories: list[str], prefix: str) -> str:
    lines = ['<div class="sidebar-cat-list">']
    lines.append(f'                    <a href="{prefix}preview.html" class="sidebar-cat-item"><span class="play-icon">►</span> Tüm Gönderiler</a>')
    for category in categories:
        escaped = html.escape(category, quote=True)
        lines.append(f'                    <a href="{prefix}preview.html" class="sidebar-cat-item" data-cat="{escaped}"><span class="play-icon">►</span> {html.escape(category)}</a>')
    lines.append('                </div>')
    return "\n".join(lines)


def replace_sidebar(path: Path, menu: str) -> None:
    text = path.read_text(encoding="utf-8")
    pattern = r'<div class="sidebar-cat-list"[^>]*>.*?</div>'
    if re.search(pattern, text, flags=re.S):
        path.write_text(re.sub(pattern, menu, text, count=1, flags=re.S), encoding="utf-8")


def main() -> None:
    used = collect_and_update_badges()
    categories = category_order(used)
    replace_sidebar(ROOT / "index.html", button_menu(categories))
    replace_sidebar(POSTS / "preview.html", button_menu(categories))
    for page in post_files():
        replace_sidebar(page, anchor_menu(categories, "../"))
    print(f"Kullanılan kategori: {len(categories)}; boş kategori kaldırıldı.")
    print("Kategoriler:", ", ".join(categories))


if __name__ == "__main__":
    main()
