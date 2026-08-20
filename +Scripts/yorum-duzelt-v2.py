#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Oyunlar klasöründeki tüm index.html dosyalarında
tepki + yorum bölümünü yazılarla (post-preview'lar) BİREBİR AYNI yapmak için:
1. Mevcut tüm reactions-box ve comments-section kısımlarını (varsa mükerrer/bozuk kısımları da) temizler.
2. Footer'ın hemen öncesine, <main class="container article-layout" style="margin-top: 30px;"><div class="post-detail-card"> ... </div></main> yapısı içinde ekler.
3. Tepki ve Yorum HTML'si ve placeholder'ları yazılarla (post-preview.html) karakteri karakterine aynı olacak şekilde yerleştirir.
4. Gerekli JS kütüphanelerini (config.js, reactions.js, comments.js) ekler.
"""

import os
import re

STANDARD_BOX = '''  <main class="container article-layout" style="margin-top: 30px;">
    <div class="post-detail-card">
      <!-- 6. Tepki & Beğeni İkonları -->
      <div class="reactions-box">
        <div class="reactions-title">Bu içeriği nasıl buldunuz? Tepkinizi belirtin:</div>
        <div class="reactions-list">
          <button class="reaction-btn" onclick="toggleReaction(this)">
            <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            Faydalı <span class="reaction-count">0</span>
          </button>
          <button class="reaction-btn" onclick="toggleReaction(this)">
            <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Harika <span class="reaction-count">0</span>
          </button>
          <button class="reaction-btn" onclick="toggleReaction(this)">
            <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Teşekkürler <span class="reaction-count">0</span>
          </button>
          <button class="reaction-btn" onclick="toggleReaction(this)">
            <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
            Geliştirilmeli <span class="reaction-count">0</span>
          </button>
        </div>
      </div>

      <!-- 7. Yorum Bölümü -->
      <section class="comments-section">
        <h3 class="comments-header-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Yorumlar ve Değerlendirmeler
        </h3>
        <form class="comment-form" onsubmit="addComment(event)">
          <div class="form-group">
            <label for="comment-name">Adınız Soyadınız *</label>
            <input type="text" id="comment-name" class="form-control" placeholder="Örn: Ahmet Yılmaz" required>
          </div>
          <div class="form-group">
            <label for="comment-body">Yorumunuz *</label>
            <textarea id="comment-body" class="form-control" placeholder="Görüş, öneri veya teşekkür mesajınızı yazabilirsiniz..." required></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Yorumu Gönder
          </button>
        </form>
        <div class="comments-list" id="comments-list"></div>
      </section>
    </div>
  </main>
'''

STANDARD_SCRIPTS = '''  <div id="toast-notification"></div>
  <script src="../../js/config.js"></script>
  <script src="../../js/reactions.js"></script>
  <script src="../../js/comments.js"></script>
  <script>
    function copyPageUrl() {
      navigator.clipboard.writeText(window.location.href);
      const toast = document.getElementById('toast-notification');
      if (toast) {
        toast.textContent = 'Bağlantı kopyalandı!';
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 2500);
      }
    }
    function toggleReaction(btn) {
      if (window.reactionsApi) {
        window.reactionsApi.toggleReaction(btn);
      }
    }
  </script>
'''

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Herhangi bir reactions-box veya comments-section içeren div'leri, section'ları, açıklama satırlarını temizle
    # (Önceki çalışmadan kalabilecek mükerrer kısımları da temizler)
    
    # reactions-box temizliği (farklı etiketler ve açıklamalar dahil)
    html = re.sub(r'<!--\s*Tepki & Beğeni İkonları\s*-->\s*<(div|section)[^>]*class="reactions-box"[^>]*>.*?</\1>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<(div|section)[^>]*class="reactions-box"[^>]*>.*?</\1>\s*', '', html, flags=re.DOTALL)
    
    # comments-section temizliği
    html = re.sub(r'<!--\s*7\.\s*Yorum Bölümü\s*-->\s*<section[^>]*class="comments-section"[^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<!--\s*Yorum Bölümü\s*-->\s*<section[^>]*class="comments-section"[^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<section[^>]*class="comments-section"[^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)

    # main container temizliği (varsa)
    html = re.sub(r'<main[^>]*class="container article-layout"[^>]*>.*?<!--\s*7\.\s*Yorum Bölümü\s*-->\s*</section>\s*</div>\s*</main>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<main[^>]*class="container article-layout"[^>]*>.*?</main>\s*', '', html, flags=re.DOTALL)

    # reactions-list kalıntılarını temizle (varsa)
    html = re.sub(r'<div class="reactions-list">.*?</div>\s*</div>', '', html, flags=re.DOTALL)
    html = re.sub(r'<div class="reactions-list">.*?</div>', '', html, flags=re.DOTALL)

    # 2. Önceki script ve toast-notification'ları temizle
    html = re.sub(r'<div id="toast-notification"></div>', '', html)
    html = re.sub(r'<script src="\.\./\.\./js/config\.js"></script>', '', html)
    html = re.sub(r'<script src="\.\./\.\./js/reactions\.js"></script>', '', html)
    html = re.sub(r'<script src="\.\./\.\./js/comments\.js"></script>', '', html)
    html = re.sub(r'<script>\s*function copyPageUrl\(\).*?function toggleReaction\(btn\).*?</script>', '', html, flags=re.DOTALL)

    # 3. Footer'ın hemen önüne standart blok ekle
    footer_pattern = r'(\s*<footer[^>]*class="footer"[^>]*>)'
    if re.search(footer_pattern, html):
        html = re.sub(footer_pattern, '\n' + STANDARD_BOX + r'\1', html, count=1)
    else:
        # Footer bulunamazsa body kapanışından önce ekle
        html = html.replace('</body>', '\n' + STANDARD_BOX + '</body>', 1)

    # 4. body kapanışından hemen önce JS ve toast ekle
    html = html.replace('</body>', STANDARD_SCRIPTS + '</body>', 1)

    # 5. Aynı dosyaya kaydet
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

OYUNLAR_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Oyunlar')

print("Oyunlar klasörü taranıyor ve güncelleniyor...")
changed_count = 0
for game_dir in sorted(os.listdir(OYUNLAR_DIR)):
    game_path = os.path.join(OYUNLAR_DIR, game_dir)
    if not os.path.isdir(game_path):
        continue
    index_file = os.path.join(game_path, 'index.html')
    if not os.path.isfile(index_file):
        continue
    if clean_file(index_file):
        print(f"[GUNCELLENDI] {game_dir}")
        changed_count += 1
    else:
        print(f"[DEGISIM YOK] {game_dir}")

print(f"\nİşlem tamamlandı. Toplam {changed_count} dosya güncellendi.")
