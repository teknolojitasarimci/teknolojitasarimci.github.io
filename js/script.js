// Arama kutusu için basit bir etkileşim eklenebilir.
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');

    searchButton.addEventListener('click', () => {
        if (searchInput.value.trim() !== '') {
            alert('Arama özelliği yakında eklenecek: ' + searchInput.value);
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
