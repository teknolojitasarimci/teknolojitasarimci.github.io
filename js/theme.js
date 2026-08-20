// theme.js — teknolojitasarimci.com koyu/açık tema sistemi
(function () {
  var KEY = 'tt-theme';
  function apply(t) {
    var dark = t === 'dark';
    document.documentElement.classList.toggle('dark-theme', dark);
    if (document.body) document.body.classList.toggle('dark', dark);
  }
  function applyReady() {
    if (document.body) return apply(getCurrent());
    document.addEventListener('DOMContentLoaded', function () {
      apply(getCurrent());
    });
  }
  function getCurrent() {
    var dark = document.documentElement.classList.contains('dark-theme') ||
               (document.body && document.body.classList.contains('dark'));
    return dark ? 'dark' : 'light';
  }
  function save(t) {
    try { localStorage.setItem(KEY, t); } catch (e) {}
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  window.toggleTheme = function () {
    var next = getCurrent() === 'dark' ? 'light' : 'dark';
    apply(next);
    save(next);
  };
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'dark' || saved === 'light') {
    apply(saved);
  } else {
    apply(systemDark() ? 'dark' : 'light');
    // Kullanıcı henüz manuel seçim yapmadıysa cihaz temasıyla senkronize kal
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onSys = function () {
        try { if (localStorage.getItem(KEY) === null) apply(mq.matches ? 'dark' : 'light'); } catch (e) {}
      };
      if (mq.addEventListener) mq.addEventListener('change', onSys);
      else if (mq.addListener) mq.addListener(onSys);
    }
  }
  applyReady();
})();

// Açılır menü yöneticisi: aynı anda yalnızca bir üst menü açık kalır
(function () {
  function syncOpenState() {
    var any = document.querySelector('.nav-pill.dropdown.open');
    if (document.body) {
      document.body.classList.toggle('has-open', !!any);
    }
  }
  function closeAll() {
    document.querySelectorAll('.nav-pill.dropdown.open').forEach(function (dd) {
      dd.classList.remove('open');
      var t = dd.querySelector('.dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', function (e) {
    var dd = e.target && e.target.closest ? e.target.closest('.nav-pill.dropdown') : null;
    var toggle = dd ? dd.querySelector('.dropdown-toggle') : null;
    if (dd && toggle && (e.target === toggle || toggle.contains(e.target))) {
      var willOpen = !dd.classList.contains('open');
      closeAll();
      if (willOpen) {
        dd.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
      syncOpenState();
    } else if (!dd) {
      closeAll();
      syncOpenState();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
      syncOpenState();
    }
  });
})();