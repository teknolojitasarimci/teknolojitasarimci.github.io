document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            // Google üzerinden site içi arama yapar
            const siteUrl = 'teknolojitasarimci.github.io';
            const searchUrl = `https://www.google.com/search?q=site:${siteUrl}+${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank'); // Yeni sekmede açar
        } else {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});
