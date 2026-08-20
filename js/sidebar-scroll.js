// Sidebar Kategori Listesi Kaydırma Butonları ve Fade Göstergeleri
// Her .sidebar-cat-list için yukarı/aşağı ok butonu ekler;
// scroll konumuna göre butonları etkin/pasif gösterir ve
// listenin üst/alt kenarına "daha fazlası var" karartma efekti uygular.
(function () {
    var ARROW_UP =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    var ARROW_DOWN =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

    function init() {
        document.querySelectorAll('.sidebar-cat-list').forEach(function (list) {
            var wrap = list.parentElement;
            if (wrap.querySelector('.sidebar-scroll-btn')) return;

            var up = document.createElement('button');
            up.type = 'button';
            up.className = 'sidebar-scroll-btn sidebar-scroll-up';
            up.setAttribute('aria-label', 'Yukarı kaydır');
            up.innerHTML = ARROW_UP;

            var down = document.createElement('button');
            down.type = 'button';
            down.className = 'sidebar-scroll-btn sidebar-scroll-down';
            down.setAttribute('aria-label', 'Aşağı kaydır');
            down.innerHTML = ARROW_DOWN;

            // "Daha fazlası var" karartma şeritleri (üst / alt)
            var fadeTop = document.createElement('div');
            fadeTop.className = 'sidebar-cat-fade sidebar-cat-fade-top';
            var fadeBottom = document.createElement('div');
            fadeBottom.className = 'sidebar-cat-fade sidebar-cat-fade-bottom';

            wrap.insertBefore(up, list);
            wrap.insertBefore(fadeTop, list);
            wrap.insertBefore(list, list.nextSibling);
            wrap.insertBefore(fadeBottom, list.nextSibling);
            wrap.insertBefore(down, list.nextSibling);

            function update() {
                var max = list.scrollHeight - list.clientHeight;
                var top = list.scrollTop;
                if (max <= 0) {
                    up.style.display = 'none';
                    down.style.display = 'none';
                    fadeTop.style.display = 'none';
                    fadeBottom.style.display = 'none';
                    return;
                }
                up.style.display = '';
                down.style.display = '';
                fadeTop.style.display = '';
                fadeBottom.style.display = '';
                up.classList.toggle('disabled', top <= 1);
                down.classList.toggle('disabled', top >= max - 1);
                fadeTop.style.opacity = top > 10 ? '1' : '0';
                fadeBottom.style.opacity = top < max - 10 ? '1' : '0';
            }

            up.addEventListener('click', function () {
                list.scrollBy({ top: -90, behavior: 'smooth' });
            });
            down.addEventListener('click', function () {
                list.scrollBy({ top: 90, behavior: 'smooth' });
            });
            list.addEventListener('scroll', update);
            window.addEventListener('resize', update);
            update();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
