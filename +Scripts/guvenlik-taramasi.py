#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
guvenlik-taramasi.py — Yeni gönderi güvenlik ve yasal risk taraması.

Kullanım:
    python3 +Scripts/guvenlik-taramasi.py sayfalar/Post108-KisaBaslik/post108-preview.html
    python3 +Scripts/guvenlik-taramasi.py sayfalar/Post108-KisaBaslik/

Gönderi yayınlanmadan önce mutlaka çalıştırılır. Taranan riskler:

  1. Gerçek şifre / kimlik bilgisi paylaşımı (örn. Fatih Wi-Fi şifreleri)
  2. TC Kimlik Numarası ve telefon numarası (kişisel veri - KVKK)
  3. "şifre/parola/kullanıcı adı" gibi riskli anahtar kelimeler
  4. Resmî kurum dokümanı PDF'leri (telif / erişim izni riski)
  5. Kişisel veri içeren form dokümanları

Çıkış: 0 = temiz, 1 = uyarı var (içerik yayınlanmadan önce kullanıcıya bildirilir).
"""

import os
import re
import sys

RISKLI_DOSYA_ADLARI = re.compile(
    r"(MEB|Yonetmelik|Genelge|Karar|Mufredat|Ogretim Programi|Kazanim|"
    r"Yillik Plan|Zumre|E-Okul|e-Okul|MEB)", re.IGNORECASE
)
PDF_AD = re.compile(r"\.pdf$", re.IGNORECASE)

RISKLI_KELIMELER = [
    "şifre", "şifresi", "parola", "kullanıcı adı", "kullanıcı adınız",
    "tc kimlik", "kimlik numarası", "doğum tarihi", "öğrenci listesi",
    "telefon numarası", "iban", "kredi kartı",
]

TC_KIMLIK = re.compile(r"\b[1-9][0-9]{10}\b")
TELEFON = re.compile(r"(\+90|0090)?5[0-9]{9}\b")
SIFRE_MSI = re.compile(r"[A-Za-z0-9!@#$%^&*_.\-]{10,}")


def text_only(html):
    text = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text)


def scan(target):
    uyarilar = []
    html_path = None
    if os.path.isdir(target):
        for name in sorted(os.listdir(target)):
            if re.match(r"^post\d+.*\.html$", name):
                html_path = os.path.join(target, name)
                break
        if not html_path:
            return ["Gönderi HTML dosyası bulunamadı: " + target]
    else:
        html_path = target

    html = open(html_path, encoding="utf-8").read()
    text = text_only(html)

    if "pw-box" in html or "password-box" in html:
        uyarilar.append("RISK: 'pw-box' şifre kutusu kullanılıyor — gerçek şifre paylaşımı yasak (Post2 dersi).")

    for kw in RISKLI_KELIMELER:
        if kw in text.lower():
            uyarilar.append(f"UYARI: '{kw}' ifadesi geçiyor — gerçek bilgi değil, şablon/genel metin olduğundan emin ol.")

    for m in TC_KIMLIK.finditer(text):
        uyarilar.append(f"RISK: TC Kimlik Numarası görünüyor: {m.group()} — kesinlikle yayınlanamaz (KVKK).")

    for m in TELEFON.finditer(text):
        uyarilar.append(f"RISK: Telefon numarası görünüyor: {m.group()} — gerçek kişiye aitse yayınlanamaz (KVKK).")

    for m in SIFRE_MSI.finditer(text):
        tok = m.group()
        if tok.count("-") > 2:
            continue
        harf = any(c.isalpha() for c in tok)
        rakam = any(c.isdigit() for c in tok)
        buyuk = any(c.isupper() for c in tok)
        sembol = sum(1 for c in tok if c in "!@#$%^&*")
        if len(tok) >= 12 and harf and rakam and (buyuk or sembol >= 2):
            uyarilar.append(f"UYARI: Şifre görünümlü uzun dize: '{tok[:40]}' — gerçek şifre ise kaldır.")

    veri_dir = os.path.join(os.path.dirname(html_path), "Veri")
    if os.path.isdir(veri_dir):
        for f in sorted(os.listdir(veri_dir)):
            if PDF_AD.search(f):
                if RISKLI_DOSYA_ADLARI.search(f):
                    uyarilar.append(
                        f"UYARI: Resmî kurum dokümanı PDF: '{f}' — telif/erişim izni riski. "
                        "MEB vb. kurum dokümanını ancak kamuya açık ve kaldırılmamışsa paylaş."
                    )
                else:
                    uyarilar.append(f"BILGI: PDF bulundu: '{f}' — telif açısından kendi üretimin olduğundan emin ol.")

    if "youtube.com/embed" in html:
        uyarilar.append("BILGI: YouTube embed var — telifli içerik değilse sorun yok, kontrol et.")

    return uyarilar


def main():
    if len(sys.argv) < 2:
        print("Kullanım: python3 +Scripts/guvenlik-taramasi.py <post-klasoru-veya-html>")
        sys.exit(2)
    hedef = sys.argv[1]
    if not os.path.exists(hedef):
        print("HATA: Hedef bulunamadı:", hedef)
        sys.exit(2)
    sonuclar = scan(hedef)
    if not sonuclar:
        print("TEMIZ: Belirgin güvenlik/yasal risk bulunamadı.")
        sys.exit(0)
    for s in sonuclar:
        print(s)
    print("\nSONUC: Risk bulundu — kullanıcıya bildir ve riskli içeriği yayınlamadan önce düzelt.")
    sys.exit(1)


if __name__ == "__main__":
    main()