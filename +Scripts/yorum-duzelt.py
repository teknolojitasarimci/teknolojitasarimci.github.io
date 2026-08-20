#!/usr/bin/env python3
"""
Oyunlarda reactions-box ve comments-section bloklarını
oyunun ana konteyner div'inin SONUNA (footer'dan önce) taşır.
Ayrıca yanlış yerlere eklenen blokları temizler.

Standart: bantumi gibi, oyun card/wrapper içinde, footer dışında.
"""

import os, re

OYUNLAR_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Oyunlar')

STANDARD_BLOCK = '''
      <!-- Tepki & Beğeni İkonları -->
      <div class="reactions-box">
        <div class="reactions-title">Bu oyunu nasıl buldunuz? Tepkinizi belirtin:</div>
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

      <!-- Yorum Bölümü -->
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

def extract_and_remove_block(html, pattern):
    """Regex ile bloğu bul, içeriğini al ve HTML'den kaldır."""
    m = re.search(pattern, html, re.DOTALL)
    if m:
        return html[:m.start()] + html[m.end():], m.group(0)
    return html, None

def process(filepath):
    with open(filepath, encoding='utf-8') as f:
        html = f.read()

    original = html
    report = []

    # ── 1. Mevcut reactions-box bloğunu çıkar ──
    reactions_pattern = r'[ \t]*<!--\s*Tepki[^>]*-->\s*\n?[ \t]*<(?:div|section)[^>]*reactions-box[^>]*>.*?</(?:div|section)>\s*\n?'
    html, reactions_block = extract_and_remove_block(html, reactions_pattern)
    if reactions_block is None:
        # Yorumsuz versiyon
        reactions_pattern2 = r'[ \t]*<(?:div|section)[^>]*reactions-box[^>]*>.*?</(?:div|section)>\s*\n?'
        html, reactions_block = extract_and_remove_block(html, reactions_pattern2)

    # ── 2. Mevcut comments-section bloğunu çıkar ──
    comments_pattern = r'[ \t]*<!--\s*Yorum[^>]*-->\s*\n?[ \t]*<section[^>]*comments-section[^>]*>.*?</section>\s*\n?'
    html, comments_block = extract_and_remove_block(html, comments_pattern)
    if comments_block is None:
        comments_pattern2 = r'[ \t]*<section[^>]*comments-section[^>]*>.*?</section>\s*\n?'
        html, comments_block = extract_and_remove_block(html, comments_pattern2)

    has_reactions = reactions_block is not None
    has_comments  = comments_block  is not None

    if not has_reactions and not has_comments:
        # Hiçbir blok yok, dosyayı atla
        return False, []

    # ── 3. Mevcut script bölümünü temizle (eski eklememizden kalanları) ──
    # Geçici scriptleri (yorum-duzelt'ten eklenenler) sil
    toast_script_pattern = r'[ \t]*<div id="toast-notification"></div>\s*\n?[ \t]*<script src="../../js/config\.js"></script>\s*\n?[ \t]*<script src="../../js/reactions\.js"></script>\s*\n?[ \t]*<script src="../../js/comments\.js"></script>\s*\n?[ \t]*<script>\s*\n?\s*function copyPageUrl.*?function toggleReaction.*?</script>\s*\n?'
    html = re.sub(toast_script_pattern, '', html, flags=re.DOTALL)

    # ── 4. Standart bloğu doğru yere ekle ──
    # Strateji: <footer class="footer"> den HEMEN ÖNCE ekle
    # Böylece oyun kartının dışında ama bir wrapper div içinde olur
    # Aynı zamanda footer ile aynı hizada görünür (oyun wrapper'ı ile hizalı)

    footer_pattern = r'(\s*<footer\s[^>]*class="footer"[^>]*>)'
    if re.search(footer_pattern, html):
        html = re.sub(footer_pattern, STANDARD_BLOCK + r'\1', html, count=1)
        report.append('reactions+yorum bloğu footer öncesine taşındı')
    else:
        html = html.replace('</body>', STANDARD_BLOCK + '\n</body>', 1)
        report.append('reactions+yorum bloğu </body> öncesine taşındı')

    # ── 5. Eksik script'leri ekle ──
    needs_scripts = ('config.js' not in html or
                     'reactions.js' not in html or
                     'comments.js' not in html)

    if needs_scripts:
        # toast-notification varsa önce sil (temiz ekleyeceğiz)
        html = re.sub(r'\s*<div id="toast-notification"></div>', '', html)
        # </body>'den önce ekle
        html = html.replace('</body>', STANDARD_SCRIPTS + '</body>', 1)
        report.append('eksik scriptler eklendi')

    if html == original:
        return False, []

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    return True, report


print("Oyunlar klasörü işleniyor...\n")
updated = 0

for game_dir in sorted(os.listdir(OYUNLAR_DIR)):
    game_path = os.path.join(OYUNLAR_DIR, game_dir)
    if not os.path.isdir(game_path):
        continue
    idx = os.path.join(game_path, 'index.html')
    if not os.path.isfile(idx):
        continue

    changed, reports = process(idx)
    if changed:
        updated += 1
        print(f"[GUNCELLENDI] {game_dir}:")
        for r in reports:
            print(f"  - {r}")
    else:
        print(f"[ATILDI]     {game_dir} (reactions/comments bulunamadı veya değişiklik yok)")

print(f"\nSonuç: {updated} oyun yeniden düzenlendi.")
