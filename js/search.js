/**
 * search.js — TeknolojiTasarimci.com Akıllı Canlı Arama Motoru
 * - Word Stili Canlı Kelime Eşleştirme ve Cümle Vurgulama
 * - Tam Otomatik (Manuel komut veya indeks çalıştırma GEREKTİRMEZ)
 * - Klavye Ok Tuşları (↑/↓) ve Enter ile Sayfa Açma
 * - Tüm Gönderiler, Zekâ Oyunları, Etkinlikler ve Uygulamalar
 */
(function () {
  'use strict';

  function trNormalize(str) {
    if (!str) return '';
    return str
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/Ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/Ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'c')
      .toLowerCase()
      .trim();
  }

  function getRootPrefix() {
    var path = window.location.pathname.replace(/\\/g, '/');
    if (path.indexOf('/sayfalar/post-') !== -1) return '../../';
    if (path.indexOf('/Oyunlar/') !== -1 && path.split('/Oyunlar/')[1].indexOf('/') !== -1) return '../../';
    if (path.indexOf('/etkinlikler/') !== -1 && path.split('/etkinlikler/')[1].indexOf('/') !== -1) return '../../';
    if (path.indexOf('/sayfalar/') !== -1 || path.indexOf('/Oyunlar/') !== -1 || path.indexOf('/etkinlikler/') !== -1 || path.indexOf('/uygulamalar/') !== -1) return '../';
    return './';
  }

  var prefix = getRootPrefix();
  var activeCategory = 'all';
  var selectedResultIndex = -1;
  var liveSearchItems = [];

  // ─── 1. Otomatik Canlı İndeks Yükleme (Sıfır Manuel Komut) ───
  function initSearchData() {
    if (window.SITE_SEARCH_INDEX && window.SITE_SEARCH_INDEX.length > 0) {
      liveSearchItems = window.SITE_SEARCH_INDEX;
      return;
    }
    // search-index.js henüz yüklenmemişse arka planda yükle
    var script = document.createElement('script');
    script.src = prefix + 'js/search-index.js';
    script.onload = function () {
      if (window.SITE_SEARCH_INDEX) {
        liveSearchItems = window.SITE_SEARCH_INDEX;
      }
    };
    document.head.appendChild(script);
  }

  // ─── 2. Spotlight Modal UI Enjeksiyonu ───
  function injectSearchModal() {
    if (document.getElementById('site-search-modal')) return;

    var style = document.createElement('style');
    style.id = 'site-search-modal-styles';
    style.textContent = `
      #site-search-modal {
        position: fixed; inset: 0;
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(8px);
        z-index: 99999;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding: 50px 16px 20px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      #site-search-modal.open {
        display: flex;
        opacity: 1;
      }
      .search-modal-dialog {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        width: 100%;
        max-width: 680px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: 82vh;
        animation: searchPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      body.dark .search-modal-dialog {
        background: #1e293b;
        border-color: #334155;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      }
      @keyframes searchPop {
        from { transform: translateY(-16px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      .search-input-header {
        position: relative;
        display: flex;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1.5px solid #f1f5f9;
        gap: 12px;
      }
      body.dark .search-input-header { border-bottom-color: #334155; }
      .search-header-icon { color: #0284c7; flex-shrink: 0; }
      body.dark .search-header-icon { color: #38bdf8; }
      #modal-search-input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
        background: transparent;
      }
      body.dark #modal-search-input { color: #f8fafc; }
      #modal-search-input::placeholder { color: #94a3b8; font-weight: 500; }
      .search-close-btn {
        background: #f1f5f9;
        border: none;
        border-radius: 8px;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #64748b;
        cursor: pointer;
        transition: all 0.15s;
        flex-shrink: 0;
      }
      .search-close-btn:hover { background: #e2e8f0; color: #0f172a; }
      body.dark .search-close-btn { background: #334155; color: #cbd5e1; }
      body.dark .search-close-btn:hover { background: #475569; color: #ffffff; }

      .search-filter-pills {
        display: flex;
        gap: 8px;
        padding: 10px 20px;
        background: #f8fafc;
        border-bottom: 1px solid #f1f5f9;
        overflow-x: auto;
        flex-shrink: 0;
      }
      body.dark .search-filter-pills { background: #0f172a; border-bottom-color: #334155; }
      .search-pill {
        padding: 5px 12px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
        background: #ffffff;
        font-size: 12px;
        font-weight: 700;
        color: #64748b;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s;
      }
      .search-pill:hover { border-color: #0284c7; color: #0284c7; }
      .search-pill.active {
        background: #0284c7;
        border-color: #0284c7;
        color: #ffffff;
      }
      body.dark .search-pill { background: #1e293b; border-color: #334155; color: #94a3b8; }
      body.dark .search-pill:hover { border-color: #38bdf8; color: #38bdf8; }
      body.dark .search-pill.active { background: #0284c7; border-color: #0284c7; color: #ffffff; }

      .search-results-list {
        padding: 10px 14px;
        overflow-y: auto;
        max-height: 52vh;
      }
      .search-result-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 10px 12px;
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: all 0.15s ease;
        margin-bottom: 4px;
        border: 1.5px solid transparent;
      }
      .search-result-item:hover, .search-result-item.selected {
        background: #f0f9ff;
        border-color: #bae6fd;
        transform: translateX(2px);
      }
      body.dark .search-result-item:hover, body.dark .search-result-item.selected {
        background: #1e3a5f;
        border-color: #0284c7;
      }
      .search-item-thumb {
        width: 54px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
        flex-shrink: 0;
        background: #e2e8f0;
      }
      .search-item-body { flex: 1; min-width: 0; }
      .search-item-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }
      .search-item-badge {
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 6px;
        background: #e0f2fe;
        color: #0284c7;
      }
      .search-item-badge.oyun { background: #fef3c7; color: #d97706; }
      .search-item-badge.etkinlik { background: #dcfce7; color: #15803d; }
      .search-item-badge.uygulama { background: #f3e8ff; color: #7e22ce; }
      .search-item-badge.pdf { background: #fee2e2; color: #b91c1c; }
      body.dark .search-item-badge { background: #1e3a5f; color: #38bdf8; }
      body.dark .search-item-badge.oyun { background: #78350f; color: #fde68a; }
      body.dark .search-item-badge.etkinlik { background: #064e3b; color: #86efac; }
      body.dark .search-item-badge.uygulama { background: #581c87; color: #d8b4fe; }
      body.dark .search-item-badge.pdf { background: #7f1d1d; color: #fca5a5; }

      .search-item-title {
        font-size: 14.5px;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      body.dark .search-item-title { color: #f1f5f9; }
      .search-item-desc {
        font-size: 12.5px;
        color: #64748b;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      body.dark .search-item-desc { color: #94a3b8; }
      
      /* Word Stili Sarı Fosforlu İşaretleme */
      .search-result-item mark {
        background: #fef08a;
        color: #854d0e;
        padding: 0 3px;
        border-radius: 3px;
        font-weight: 800;
      }
      body.dark .search-result-item mark {
        background: #854d0e;
        color: #fef08a;
      }

      .search-empty {
        padding: 40px 20px;
        text-align: center;
        color: #64748b;
        font-size: 14px;
        font-weight: 600;
      }
      .search-modal-footer {
        padding: 10px 20px;
        background: #f8fafc;
        border-top: 1px solid #f1f5f9;
        font-size: 12px;
        color: #94a3b8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      body.dark .search-modal-footer { background: #0f172a; border-top-color: #334155; color: #64748b; }
      .search-shortcuts { display: flex; gap: 12px; align-items: center; }
      .search-kbd {
        background: #e2e8f0;
        color: #475569;
        padding: 2px 6px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 11px;
        font-weight: 700;
      }
      body.dark .search-kbd { background: #334155; color: #cbd5e1; }
    `;
    document.head.appendChild(style);

    var modal = document.createElement('div');
    modal.id = 'site-search-modal';
    modal.innerHTML = `
      <div class="search-modal-dialog">
        <div class="search-input-header">
          <svg class="search-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="modal-search-input" placeholder="Tüm sitede kelime arayın... (Örn: Solo, Bayrak, Slogan, 7. Sınıf)" autocomplete="off">
          <button class="search-close-btn" id="modal-search-close" title="Kapat">✕</button>
        </div>
        <div class="search-filter-pills">
          <button class="search-pill active" data-type="all">Tümü</button>
          <button class="search-pill" data-type="oyun">Zekâ Oyunları</button>
          <button class="search-pill" data-type="gonderi">Gönderiler</button>
          <button class="search-pill" data-type="pdf">PDF Dokümanları</button>
          <button class="search-pill" data-type="etkinlik">Etkinlikler</button>
          <button class="search-pill" data-type="uygulama">Uygulamalar</button>
        </div>
        <div class="search-results-list" id="modal-search-results"></div>
        <div class="search-modal-footer">
          <span id="search-result-count">Tüm site taranmaya hazır</span>
          <div class="search-shortcuts">
            <span><span class="search-kbd">↑</span> <span class="search-kbd">↓</span> Gezin</span>
            <span><span class="search-kbd">Enter</span> Aç</span>
            <span><span class="search-kbd">ESC</span> Kapat</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    bindSearchModalEvents();
  }

  // ─── 3. Word Stili Kelime Vurgulama ───
  function highlightMatch(text, queryWords) {
    if (!text || !queryWords || queryWords.length === 0) return text;
    var result = text;
    queryWords.forEach(function(w) {
      if (!w) return;
      var regex = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });
    return result;
  }

  // ─── 4. Arama Sonuçlarını Hesapla ve Listele ───
  function renderSearchResults(query) {
    var container = document.getElementById('modal-search-results');
    var countEl = document.getElementById('search-result-count');
    if (!container) return;

    selectedResultIndex = -1;
    var rawQ = (query || '').trim();
    var normQ = trNormalize(rawQ);
    var queryWords = normQ.split(' ').filter(Boolean);

    var items = liveSearchItems.length > 0 ? liveSearchItems : (window.SITE_SEARCH_INDEX || []);
    var filtered = items.filter(function(item) {
      if (activeCategory !== 'all' && item.type !== activeCategory) return false;
      if (queryWords.length === 0) return true;

      var fullSearchText = trNormalize(
        item.title + ' ' +
        item.description + ' ' +
        item.category + ' ' +
        (item.tags ? item.tags.join(' ') : '') + ' ' +
        (item.content ? item.content : '')
      );

      // Kelime bazlı eşleşme (Word mantığı)
      return queryWords.every(function(w) {
        return fullSearchText.indexOf(w) !== -1;
      });
    });

    // Başlıkta geçenleri en üste sırala (Smart Ranking)
    if (queryWords.length > 0) {
      filtered.sort(function(a, b) {
        var aTitle = trNormalize(a.title);
        var bTitle = trNormalize(b.title);
        var aInTitle = queryWords.some(function(w) { return aTitle.indexOf(w) !== -1; });
        var bInTitle = queryWords.some(function(w) { return bTitle.indexOf(w) !== -1; });
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return 0;
      });
    }

    if (countEl) {
      countEl.textContent = queryWords.length > 0
        ? `${filtered.length} sonuç bulundu`
        : `${filtered.length} içerik mevcut`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="search-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="margin-bottom:10px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="8.01"/></svg>
          <div>"<strong>${rawQ}</strong>" ile eşleşen içerik bulunamadı.</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px;">Kelimeyi kontrol edebilir veya üstteki kategorilerden filtreleyebilirsiniz.</div>
        </div>
      `;
      return;
    }

    var html = '';
    filtered.slice(0, 40).forEach(function(item, idx) {
      var itemUrl = prefix + item.url;
      var itemCover = item.cover.startsWith('http') ? item.cover : (prefix + item.cover);
      var badgeClass = item.type;

      var displayTitle = queryWords.length ? highlightMatch(item.title, queryWords) : item.title;
      var displayDesc = queryWords.length ? highlightMatch(item.description, queryWords) : item.description;

      html += `
        <a href="${itemUrl}" class="search-result-item" data-index="${idx}">
          <img src="${itemCover}" class="search-item-thumb" alt="${item.title}" onerror="this.src='${prefix}images/logo.svg'">
          <div class="search-item-body">
            <div class="search-item-meta">
              <span class="search-item-badge ${badgeClass}">${item.type_label}</span>
            </div>
            <h3 class="search-item-title">${displayTitle}</h3>
            <p class="search-item-desc">${displayDesc}</p>
          </div>
        </a>
      `;
    });

    container.innerHTML = html;
  }

  function updateSelectedResult(items, newIndex) {
    if (!items || items.length === 0) return;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= items.length) newIndex = items.length - 1;

    items.forEach(function(el) { el.classList.remove('selected'); });
    selectedResultIndex = newIndex;
    var target = items[selectedResultIndex];
    if (target) {
      target.classList.add('selected');
      target.scrollIntoView({ block: 'nearest' });
    }
  }

  function openSearchModal(initialQuery) {
    injectSearchModal();
    initSearchData();
    var modal = document.getElementById('site-search-modal');
    var input = document.getElementById('modal-search-input');
    if (!modal || !input) return;

    modal.classList.add('open');
    if (initialQuery) input.value = initialQuery;
    renderSearchResults(input.value);

    setTimeout(function() {
      input.focus();
      input.select();
    }, 50);
  }

  function closeSearchModal() {
    var modal = document.getElementById('site-search-modal');
    if (modal) modal.classList.remove('open');
  }

  function bindSearchModalEvents() {
    var modal = document.getElementById('site-search-modal');
    var input = document.getElementById('modal-search-input');
    var closeBtn = document.getElementById('modal-search-close');

    if (input) {
      input.addEventListener('input', function() {
        renderSearchResults(this.value);
      });

      // Klavye Ok Tuşları & Enter Yönetimi
      input.addEventListener('keydown', function(e) {
        var items = document.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          updateSelectedResult(items, selectedResultIndex + 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          updateSelectedResult(items, selectedResultIndex - 1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedResultIndex >= 0 && items[selectedResultIndex]) {
            items[selectedResultIndex].click();
          } else if (items.length > 0) {
            items[0].click();
          }
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSearchModal);

    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeSearchModal();
      });
    }

    // Kategori butonları
    var pills = document.querySelectorAll('.search-pill');
    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        pills.forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-type') || 'all';
        if (input) renderSearchResults(input.value);
      });
    });
  }

  // Klavye Kısayolları (Ctrl+K / Cmd+K / /)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  window.openSiteSearch = openSearchModal;
  window.closeSiteSearch = closeSearchModal;

  function bindHeaderSearch() {
    initSearchData();
    var searchBtn = document.getElementById('search-toggle-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openSearchModal();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHeaderSearch);
  } else {
    bindHeaderSearch();
  }
})();
