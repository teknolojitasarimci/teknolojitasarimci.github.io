document.addEventListener('DOMContentLoaded', () => {
    // DOM Elemanlarını Seçme
    const fox = document.getElementById('fox');
    const gameScreen = document.getElementById('game-screen');
    const scoreDisplay = document.getElementById('score-display');
    const levelDisplay = document.getElementById('level-display');
    const missDisplay = document.getElementById('miss-display');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartButton = document.getElementById('restart-button');
    const controlButtons = document.querySelectorAll('.control-btn');
    const rulesButton = document.getElementById('rules-button');
    const rulesModal = document.getElementById('rules-modal');
    const rulesCloseButton = document.getElementById('rules-close');
    const modeSoloBtn = document.getElementById('modeSolo');
    const modePvPBtn = document.getElementById('modePvP');
    const pvpStatus = document.getElementById('pvpStatus');
    const goTitle = document.getElementById('go-title');

    // Oyun Değişkenleri
    let score = 0;
    let misses = 0;
    const maxMisses = 3;
    let foxPosition = 'bottom-left';
    let gameInterval;
    let eggSpawnRate = 2000;
    let fallDuration = 2100;
    let level = 1;
    let isGameOver = false;

    // Mod Değişkenleri
    let isPvP = false;
    let pvpTurn = 1; // 1 or 2
    let p1Score = 0;
    let p2Score = 0;

    const positions = {
        'top-left': { class: 'fox-top-left' },
        'bottom-left': { class: 'fox-bottom-left' },
        'top-right': { class: 'fox-top-right' },
        'bottom-right': { class: 'fox-bottom-right' }
    };

    const eggPaths = {
        'top-left': [{ top: 50, left: 60 }, { top: 90, left: 160 }],
        'bottom-left': [{ top: 230, left: 60 }, { top: 270, left: 160 }],
        'top-right': [{ top: 50, left: 710 }, { top: 90, left: 610 }],
        'bottom-right': [{ top: 230, left: 710 }, { top: 270, left: 610 }]
    };

    function moveFox(newPosition) {
        if (isGameOver) return;
        fox.className = '';
        fox.classList.add(positions[newPosition].class);
        foxPosition = newPosition;
    }

    function spawnEgg() {
        if (isGameOver) return;

        const pathKeys = Object.keys(eggPaths);
        const randomPathKey = pathKeys[Math.floor(Math.random() * pathKeys.length)];
        const path = eggPaths[randomPathKey];

        const egg = document.createElement('div');
        egg.classList.add('egg');
        egg.style.top = path[0].top + 'px';
        egg.style.left = path[0].left + 'px';
        gameScreen.appendChild(egg);

        setTimeout(() => {
            egg.style.top = path[1].top + 'px';
            egg.style.left = path[1].left + 'px';
        }, 100);

        setTimeout(() => {
            checkCatch(egg, randomPathKey);
        }, fallDuration + 100);
    }

    function checkCatch(egg, eggPathKey) {
        if (foxPosition === eggPathKey) {
            score++;
            updateScore();
            try{ GameSounds.egg(); }catch(e){}
            egg.remove();

            if (score > 0 && score % 5 === 0) {
                increaseDifficulty();
            }
        } else {
            misses++;
            updateMisses();
            try{ GameSounds.wrong(); }catch(e){}
            egg.classList.add('broken');
            setTimeout(() => egg.remove(), 500);

            if (misses >= maxMisses) {
                endGame();
            }
        }
    }

    function updateScore() {
        if (isPvP) {
            scoreDisplay.textContent = `${pvpTurn}. OYUNCU SKOR: ${score}`;
        } else {
            scoreDisplay.textContent = `SKOR: ${score}`;
        }
        const nextLevel = Math.min(10, Math.floor(score / 5) + 1);
        if (nextLevel > level) {
            level = nextLevel;
            increaseDifficulty();
        }
        levelDisplay.textContent = `SEVİYE ${level}`;
    }

    function updateMisses() {
        const hearts = missDisplay.querySelectorAll('span');
        for (let i = 0; i < misses; i++) {
            if (hearts[i]) hearts[i].classList.add('lost');
        }
    }

    function increaseDifficulty() {
        clearInterval(gameInterval);
        eggSpawnRate = Math.max(500, eggSpawnRate * 0.9);
        fallDuration = Math.max(800, fallDuration * 0.92);
        gameInterval = setInterval(spawnEgg, eggSpawnRate);
    }
    
    function startGame() {
        isGameOver = false;
        score = 0;
        misses = 0;
        eggSpawnRate = 2000;
        fallDuration = 2100;
        level = 1;

        updateScore();
        missDisplay.querySelectorAll('span').forEach(s => s.classList.remove('lost'));
        gameOverScreen.classList.add('hidden');

        document.querySelectorAll('.egg').forEach(e => e.remove());
        
        moveFox('bottom-left');
        gameInterval = setInterval(spawnEgg, eggSpawnRate);
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameInterval);
        try{ GameSounds.win(); }catch(e){}
        gameOverScreen.classList.remove('hidden');

        if (isPvP) {
            if (pvpTurn === 1) {
                p1Score = score;
                goTitle.innerHTML = `1. Oyuncu Bitti! Skor: ${p1Score}<br><small style="font-size:14px;color:#0074ad;">Sıra 2. Oyuncuda!</small>`;
                restartButton.textContent = '2. OYUNCU BAŞLASIN';
                pvpTurn = 2;
                pvpStatus.textContent = '2. Oyuncu Oynuyor!';
            } else {
                p2Score = score;
                let res = '';
                if (p1Score > p2Score) res = `1. Oyuncu Kazandı! (${p1Score} - ${p2Score})`;
                else if (p2Score > p1Score) res = `2. Oyuncu Kazandı! (${p2Score} - ${p1Score})`;
                else res = `Berabere! (${p1Score} - ${p2Score})`;

                goTitle.innerHTML = `Yarış Bitti!<br><small style="font-size:15px;color:#0074ad;">${res}</small>`;
                restartButton.textContent = 'YENİ YARIŞ';
                pvpTurn = 1;
                pvpStatus.textContent = '1. Oyuncu Oynuyor!';
            }
        } else {
            goTitle.textContent = 'OYUN BİTTİ';
            restartButton.textContent = 'YENİDEN BAŞLA';
        }
    }

    // Mod Değişimi
    if (modeSoloBtn && modePvPBtn) {
        modeSoloBtn.addEventListener('click', () => {
            isPvP = false;
            modeSoloBtn.classList.add('active');
            modePvPBtn.classList.remove('active');
            if (pvpStatus) pvpStatus.style.display = 'none';
            startGame();
        });

        modePvPBtn.addEventListener('click', () => {
            isPvP = true;
            pvpTurn = 1;
            p1Score = 0;
            p2Score = 0;
            modePvPBtn.classList.add('active');
            modeSoloBtn.classList.remove('active');
            if (pvpStatus) {
                pvpStatus.style.display = 'block';
                pvpStatus.textContent = '1. Oyuncu Oynuyor!';
            }
            startGame();
        });
    }

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (foxPosition.includes('left')) moveFox('top-left');
                if (foxPosition.includes('right')) moveFox('top-right');
                break;
            case 'ArrowDown':
                if (foxPosition.includes('left')) moveFox('bottom-left');
                if (foxPosition.includes('right')) moveFox('bottom-right');
                break;
            case 'ArrowLeft':
                if (foxPosition.includes('top')) moveFox('top-left');
                if (foxPosition.includes('bottom')) moveFox('bottom-left');
                break;
            case 'ArrowRight':
                if (foxPosition.includes('top')) moveFox('top-right');
                if (foxPosition.includes('bottom')) moveFox('bottom-right');
                break;
        }
    });

    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveFox(button.dataset.position);
        });
    });

    restartButton.addEventListener('click', startGame);

    rulesButton.addEventListener('click', () => {
        rulesModal.classList.remove('hidden');
    });
    rulesCloseButton.addEventListener('click', () => {
        rulesModal.classList.add('hidden');
    });
    rulesModal.addEventListener('click', (e) => {
        if (e.target === rulesModal) {
            rulesModal.classList.add('hidden');
        }
    });

    startGame();
});
