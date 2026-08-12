document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on preference or system
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icons
        if (newTheme === 'dark') {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
