(function () {
  'use strict';

  // Compute root prefix from this script's own src attribute (always ends with js/menu.js)
  function computeRootPrefix() {
    var SUFFIX = 'js/menu.js';
    var scripts = Array.from(document.querySelectorAll('script[src]'));
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (src && src.endsWith(SUFFIX)) {
        return src.slice(0, -SUFFIX.length);
      }
    }
    // Güvenilir Fallback: URL / dosya yoluna göre derinliği belirle
    var path = window.location.pathname.replace(/\\/g, '/');
    if (path.indexOf('/Oyunlar/') !== -1) {
      return '../../';
    }
    if (path.indexOf('/sayfalar/') !== -1 || path.indexOf('/uygulamalar/') !== -1 || path.indexOf('/etkinlikler/') !== -1) {
      return '../';
    }
    return '';
  }

  var prefix = computeRootPrefix();

  function loadFooterScript() {
    if (document.querySelector('script[data-footer-script="true"]')) return;
    var script = document.createElement('script');
    script.src = prefix + 'js/footer.js';
    script.defer = true;
    script.dataset.footerScript = 'true';
    document.head.appendChild(script);
  }

  function loadSearchScripts() {
    if (!document.querySelector('script[data-search-index="true"]')) {
      var sIdx = document.createElement('script');
      sIdx.src = prefix + 'js/search-index.js';
      sIdx.defer = true;
      sIdx.dataset.searchIndex = 'true';
      document.head.appendChild(sIdx);
    }
    if (!document.querySelector('script[data-search-engine="true"]')) {
      var sEng = document.createElement('script');
      sEng.src = prefix + 'js/search.js';
      sEng.defer = true;
      sEng.dataset.searchEngine = 'true';
      document.head.appendChild(sEng);
    }
  }

  var headerHTML = `
    <header class="header site-header" style="width:100%;flex-shrink:0;">
        <div class="container header-main">
            <a href="${prefix}sayfalar/preview.html" class="brand-area" style="text-decoration: none;">
                <img src="${prefix}images/logo.svg" alt="tt logo" class="tt-logo-img">
                <div class="brand-text">
                    <span class="logo">teknolojitasarimci</span>
                </div>
            </a>
            <div class="nav-bar">
            <div class="nav-container">
                <a href="${prefix}sayfalar/preview.html" class="nav-pill">Ana Sayfa</a>
                <div class="nav-pill dropdown"><button type="button" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Etkinlik &amp; Dosyalar
                        <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button><div class="dropdown-menu mega-menu">
                        <div class="mega-column">
                            <div class="mega-column-title">Etkinlikler</div>
                            <a href="${prefix}sayfalar/post-00098-7-Sinif-Etkinlikleri/post-00098-preview.html" class="mega-menu-item">7. Sınıf Etkinlikleri</a>
                            <a href="${prefix}sayfalar/post-00097-8-Sinif-Etkinlikleri/post-00097-preview.html" class="mega-menu-item">8. Sınıf Etkinlikleri</a>
                                                        <div class="mega-column-title mega-column-title-spaced">Öğretim Programları</div>
                            <a href="${prefix}dosyalar/Teknoloji-Tasarim-Ogretim-Programi-2018.pdf" class="mega-menu-item" target="_blank" rel="noopener" data-no-pdf-embed="true">Öğretim Programı (2018)</a>
                            <a href="${prefix}dosyalar/Teknoloji-Tasarim-Ogretim-Programi-2026.pdf" class="mega-menu-item" target="_blank" rel="noopener" data-no-pdf-embed="true">Öğretim Programı (2026)</a>
                            <a href="${prefix}dosyalar/TT-Ogretmen-Kilavuz-Kitabi-2019.pdf" class="mega-menu-item" target="_blank" rel="noopener" data-no-pdf-embed="true">Öğretmen Kılavuz Kitabı (2019)</a>
                            <div class="mega-column-title mega-column-title-spaced">Diğer Dosyalar</div>
                            <a href="${prefix}sayfalar/post-00023-Okul-Belgeleri/post-00023-preview.html" class="mega-menu-item">Başarı ve Teşekkür Belgeleri</a>
                            <a href="${prefix}sayfalar/post-00017-Ogrenci-Bilgi-Formlari/post-00017-preview.html" class="mega-menu-item">Öğrenci Bilgi Formları</a>
                            <a href="${prefix}sayfalar/post-00022-SOKToplanti-Dosyalari/post-00022-preview.html" class="mega-menu-item">ŞÖK Dosyaları</a>
                            <a href="${prefix}sayfalar/post-00021-Gezi-Dosyalari/post-00021-preview.html" class="mega-menu-item">Okul Gezisi Dosyaları</a>
                                                        <a href="${prefix}sayfalar/post-00016-Disiplin-Tutanagi/post-00016-preview.html" class="mega-menu-item">Disiplin Tutanağı Nasıl Tutulur?</a>
                            <a href="${prefix}dosyalar/ders_kesim_raporu_sablonu.docx" class="mega-menu-item" target="_blank" rel="noopener">Ders Kesim Raporu Şablonu</a>
                            <a href="${prefix}dosyalar/sinav_kagitlari_teslim_tutanagi.docx" class="mega-menu-item" target="_blank" rel="noopener">Sınav Kağıtları Teslim Tutanağı</a>
                        </div>
                        <div class="mega-column">
                            <div class="mega-column-title">Zeka Oyunları</div>
                            <a href="${prefix}sayfalar/zeka-oyunlari-preview.html" class="mega-menu-item">Zeka Oyunları (PDF)</a>
                            <a href="${prefix}Oyunlar/index.html" class="mega-menu-item">Zeka Oyunları (İnteraktif)</a>
                            <a href="${prefix}Oyunlar/kelime-avi/index.html" class="mega-menu-item">Kelime Bulmaca (İnteraktif)</a>
                            <a href="${prefix}dosyalar/MEB-Zeka-Oyunlari-Ogretmen-Kilavuz-Kitabi.pdf" class="mega-menu-item" target="_blank" rel="noopener" data-no-pdf-embed="true">Zeka Oyunları Öğretmen Kılavuz Kitabı (PDF)</a>
                            <div class="mega-column-title mega-column-title-spaced">Veli Toplantıları</div>
                            <a href="${prefix}sayfalar/post-00015-Veli-Toplantisi-Dosyalari/post-00015-preview.html" class="mega-menu-item">Veli Toplantısı Dosyaları</a>
                            <a href="${prefix}sayfalar/post-00013-Veli-Toplantisi-Rehberi/post-00013-preview.html" class="mega-menu-item">Veli Toplantısı Rehberi</a>
                            <a href="${prefix}sayfalar/post-00014-Veli-Toplantisi-Konusma-Metni/post-00014-preview.html" class="mega-menu-item">Veli Toplantısı Konuşma Metni</a>
                            <div class="mega-column-title mega-column-title-spaced">Teknoloji ve Tasarım Dosyaları</div>
                            <a href="${prefix}sayfalar/tasarim-yenilikci-dusunce-preview.html" class="mega-menu-item">Tasarım &amp; Yenilikçi Düşünce Etkinlikleri</a>
                            <a href="${prefix}sayfalar/post-00020-Atolye-Is-Guvenligi/post-00020-preview.html" class="mega-menu-item">Atölye Uyarı Levhaları</a>
                            <a href="${prefix}sayfalar/post-00018-BEPHazirlama-Programi/post-00018-preview.html" class="mega-menu-item">Teknoloji ve Tasarım - BEP</a>
                            <a href="${prefix}sayfalar/post-00006-e-Okul-Not-Cizelgeleri/post-00006-preview.html" class="mega-menu-item">Not Çizelgeleri (Excel)</a>
                            <a href="${prefix}uygulamalar/notomatik.html" class="mega-menu-item">Not Çizelgeleri (Notomatik)</a>
                            <a href="${prefix}sayfalar/post-00007-Yillik-Planlari/post-00007-preview.html" class="mega-menu-item">Yıllık Planlar</a>
                            <a href="${prefix}sayfalar/post-00008-Zumre-Toplanti-Tutanaklari/post-00008-preview.html" class="mega-menu-item">Zümre Toplantı Tutanakları</a>
                            <a href="${prefix}sayfalar/post-00010-Patent-Kulubu/post-00010-preview.html" class="mega-menu-item">Patent Kulübü Dosyaları</a>
                        </div>
                    </div>
                </div>
                <div class="nav-pill dropdown"><button type="button" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Oyunlar
                        <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button><div class="dropdown-menu">
              <a href="${prefix}Oyunlar/kelime-avi/index.html" class="dropdown-item">Kelime Bulmaca</a>
              <a href="${prefix}Oyunlar/klasik-sos/index.html" class="dropdown-item">SOS (Klasik)</a>
              <a href="${prefix}Oyunlar/acili-sos/index.html" class="dropdown-item">SOS (Acılı)</a>
              <a href="${prefix}Oyunlar/kare-kapmaca/index.html" class="dropdown-item">Kare Kapmaca</a>
              <a href="${prefix}Oyunlar/turk-damasi/index.html" class="dropdown-item">Dama</a>
              <a href="${prefix}Oyunlar/capraz-dama/index.html" class="dropdown-item">Çapraz Dama</a>
              <a href="${prefix}Oyunlar/cin-damasi/index.html" class="dropdown-item">Çin Daması</a>
              <a href="${prefix}Oyunlar/satranc/index.html" class="dropdown-item">Satranç</a>
              <a href="${prefix}Oyunlar/surakarta/index.html" class="dropdown-item">Surakarta</a>
              <a href="${prefix}Oyunlar/mangala/index.html" class="dropdown-item">Mangala</a>
              <a href="${prefix}Oyunlar/bantumi/index.html" class="dropdown-item">Bantumi</a>
              <a href="${prefix}Oyunlar/tas-oyunlari/index.html" class="dropdown-item">3-6-9-12 Taş Oyunları</a>
              <a href="${prefix}Oyunlar/hex-oyunu/index.html" class="dropdown-item">Hex</a>
              <a href="${prefix}Oyunlar/tactix/index.html" class="dropdown-item">Tactix</a>
              <a href="${prefix}Oyunlar/nim/index.html" class="dropdown-item">Nim</a>
              <a href="${prefix}Oyunlar/tilki-oyunu/index.html" class="dropdown-item">Tilki ve Yumurtalar</a>
              <a href="${prefix}Oyunlar/tirtil-oyunu/index.html" class="dropdown-item">Tırtıl</a>
              <a href="${prefix}Oyunlar/solo-test/index.html" class="dropdown-item">Solo Test</a>
              <a href="${prefix}Oyunlar/labirent-oyunu/index.html" class="dropdown-item">Labirent Bulmacaları</a>
              <a href="${prefix}Oyunlar/sudoku-atolyesi/index.html" class="dropdown-item">Sudoku</a>
              <a href="${prefix}Oyunlar/bolgesel-sudoku/index.html" class="dropdown-item">Bölgesel Sudoku</a>
              <a href="${prefix}Oyunlar/islem-karesi/index.html" class="dropdown-item">İşlem Karesi</a>
              <a href="${prefix}Oyunlar/patika-oyunu/index.html" class="dropdown-item">Patika</a>
              <a href="${prefix}Oyunlar/abc-baglamaca-oyunu/index.html" class="dropdown-item">ABC Bağlamaca</a>
              <a href="${prefix}Oyunlar/kutuban/index.html" class="dropdown-item">Kutuban</a>
              <a href="${prefix}Oyunlar/engelsiz-patika-oyunu/index.html" class="dropdown-item">Patika Oluşturma</a>
              <a href="${prefix}Oyunlar/carpmaca-oyunu/index.html" class="dropdown-item">Çarpmaca</a>
              <a href="${prefix}Oyunlar/elmas-madencisi/index.html" class="dropdown-item">Elmas Madencisi</a>
              <a href="${prefix}Oyunlar/devekusu-kosusu/index.html" class="dropdown-item">Devekuşu Koşusu</a>
              <a href="${prefix}Oyunlar/trafik-isaretleri/index.html" class="dropdown-item">Trafik İşaretleri</a>
              <a href="${prefix}Oyunlar/bayrak-bil/index.html" class="dropdown-item">Bayrak Bil</a>
              <a href="${prefix}Oyunlar/mini-minisler/index.html" class="dropdown-item">Mini Minişler</a>
              <a href="${prefix}Oyunlar/bardak-oyunu/index.html" class="dropdown-item">Bardak Oyunu</a>
            </div>
                </div>
                <div class="nav-pill dropdown" id="app-dropdown-parent">
                    <button type="button" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Uygulamalarım
                        <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button><div class="dropdown-menu" id="app-dropdown-menu">
                        <a href="${prefix}uygulamalar/notomatik.html" class="dropdown-item">Notomatik <span style="color: #ef4444; font-size: 0.85em; margin-left: 5px;">(yapım aşamasında)</span></a>
                        <a href="${prefix}uygulamalar/posteryap.html" class="dropdown-item">Poster Yap</a>
                        <a href="${prefix}uygulamalar/fotograf-boyutlandirici.html" class="dropdown-item">e-Okul Fotoğraf Boyutlandırıcısı</a>
                        <a href="${prefix}uygulamalar/medya-donusturucu.html" class="dropdown-item">Medya Dönüştürücü</a>
                 </div>
                 </div>
                 <a href="${prefix}sayfalar/about-preview.html" class="nav-pill">Hakkımda</a>
                 <button class="nav-pill search-toggle" id="search-toggle-btn" aria-label="Site İçi Arama" title="Site İçi Arama">
                     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                 </button>
                 <button class="nav-pill theme-toggle" id="theme-toggle-btn" aria-label="Tema Değiştir" title="Tema Değiştir">
                    <svg class="tt-icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    <svg class="tt-icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
                <button class="nav-pill sound-toggle" id="sound-toggle-btn" aria-label="Ses Aç/Kapat" title="Ses Aç/Kapat">
                    <svg class="tt-icon-sound-on" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <svg class="tt-icon-sound-off" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                </button>
            </div>
         </div>
         </div>
         <div class="header-search-bar" id="header-search-bar" style="display:none;">
             <div class="header-search-inner">
                 <form class="header-search-form" action="${prefix}sayfalar/preview.html" method="GET">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                     <input type="search" name="q" class="header-search-input" placeholder="Site içinde arayın..." autocomplete="off">
                     <button type="submit" class="header-search-submit">Ara</button>
                     <button type="button" class="header-search-close" id="header-search-close" aria-label="Aramayı Kapat">×</button>
                 </form>
             </div>
         </div>
     </header>
    `;

  function initHeader() {
    var existingHeader = document.querySelector('header.site-header, header.header');
    if (!existingHeader) {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Arama motorunu ve dizinini yükle
    loadSearchScripts();

    if (location.search.indexOf('embed=1') !== -1) {
      return;
    }
    if (!document.body) {
      return;
    }

    var searchToggle = document.getElementById('search-toggle-btn');
    var searchBar = document.getElementById('header-search-bar');
    var searchClose = document.getElementById('header-search-close');
    var searchInput = searchBar ? searchBar.querySelector('.header-search-input') : null;
    if (searchToggle && searchBar) {
      searchToggle.addEventListener('click', function() {
        var open = searchBar.style.display === 'block';
        searchBar.style.display = open ? 'none' : 'block';
        if (!open && searchInput) searchInput.focus();
      });
      if (searchClose) searchClose.addEventListener('click', function() { searchBar.style.display = 'none'; });
      document.addEventListener('keydown', function(event) { if (event.key === 'Escape') searchBar.style.display = 'none'; });
    }

    // Açılır menülerin (Dropdown) kesin tekil kontrolü: biri açıldığında diğeri ANINDA kapanır
    var dropdownElements = document.querySelectorAll('.nav-pill.dropdown');
    function closeAllDropdownMenus() {
      dropdownElements.forEach(function(d) {
        d.classList.remove('open');
        var b = d.querySelector('.dropdown-toggle');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }

    dropdownElements.forEach(function(dropdown) {
      var toggleBtn = dropdown.querySelector('.dropdown-toggle');

      // Üzerine gelindiğinde diğer tüm menüleri anında kapat
      dropdown.addEventListener('mouseenter', function() {
        dropdownElements.forEach(function(other) {
          if (other !== dropdown) {
            other.classList.remove('open');
            var otherBtn = other.querySelector('.dropdown-toggle');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        dropdown.classList.add('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      });

      dropdown.addEventListener('mouseleave', function() {
        window.setTimeout(function() {
          if (!dropdown.matches(':hover')) {
            dropdown.classList.remove('open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
          }
        }, 80);
      });

      // Tıklama ile açılıp kapanma
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = dropdown.classList.contains('open');
          closeAllDropdownMenus();
          if (!isOpen) {
            dropdown.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });

    // Menü dışına tıklandığında açık menüleri kapat
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-pill.dropdown')) {
        closeAllDropdownMenus();
      }
    });

    // Mark active menu items based on current URL
    var menuLinks = document.querySelectorAll('#app-dropdown-menu .dropdown-item');
    var foundActive = false;
    menuLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (window.location.pathname.endsWith(href)) {
        link.classList.add('active');
        foundActive = true;
      } else {
        link.classList.remove('active');
      }
    });
    if (foundActive) {
      var parent = document.getElementById('app-dropdown-parent');
      if (parent) parent.classList.add('active');
    }

    // Bind toggleTheme if function exists
    var themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn && typeof toggleTheme === 'function') {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Bind sound toggle — tüm sayfalarda çalışır; GameSounds varsa onu da yönetir
    var soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      var soundOn = document.querySelector('.tt-icon-sound-on');
      var soundOff = document.querySelector('.tt-icon-sound-off');
      var soundKey = 'tt-sound';

      function soundEnabled() {
        if (typeof GameSounds !== 'undefined') return GameSounds.enabled;
        try { return localStorage.getItem(soundKey) !== 'off'; } catch (e) { return true; }
      }

      function syncSoundIcons() {
        var on = soundEnabled();
        if (soundOn) soundOn.style.display = on ? '' : 'none';
        if (soundOff) soundOff.style.display = on ? 'none' : '';
        soundBtn.classList.toggle('muted', !on);
        soundBtn.setAttribute('aria-label', on ? 'Sesi Kapat' : 'Sesi Aç');
        soundBtn.setAttribute('title', on ? 'Sesi Kapat' : 'Sesi Aç');
      }

      soundBtn.addEventListener('click', function () {
        var next;
        if (typeof GameSounds !== 'undefined') {
          next = GameSounds.toggle();
        } else {
          next = soundEnabled() ? false : true;
        }
        try { localStorage.setItem(soundKey, next ? 'on' : 'off'); } catch (e) {}
        syncSoundIcons();
      });

      syncSoundIcons();
    }

    // Evrensel Arama Formu Yakalayıcı (Tüm sayfalarda ve file:// protokolünde tam uyumlu)
    document.querySelectorAll('form.search-form, form.header-search-form').forEach(function(form) {
      var input = form.querySelector('input[type="text"], input[name="q"], input[type="search"]');
      if (input) {
        input.addEventListener('input', function() {
          var val = this.value.trim().toLowerCase();
          if (typeof searchPosts === 'function') {
            searchPosts(val);
          }
        });
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var val = input ? input.value.trim() : '';
        if (!val) return;

        try {
          sessionStorage.setItem('site_search_query', val);
          localStorage.setItem('site_search_query', val);
        } catch (err) {}

        if (document.getElementById('main-blog-grid') && typeof searchPosts === 'function') {
          var mainInput = document.getElementById('site-search-input');
          if (mainInput) mainInput.value = val;
          searchPosts(val);
        } else {
          window.location.href = prefix + 'sayfalar/preview.html?q=' + encodeURIComponent(val);
        }
      });
    });

    loadFooterScript();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
