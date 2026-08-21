// Bardak ve Top Oyunu - JavaScript
// Tüm değişkenler ve oyun mantığı burada

// Oyun durumu
let gameState = {
    level: 1,
    score: 0,
    cups: [],
    ballCupIndex: -1,
    isAnimating: false,
    isGameOver: false,
    timerId: null
};

// Seviye yapılandırması: her seviyede bardak sayısı ve geçiş süresi
const levelConfig = {
    1: { cups: 3, time: 2000 },
    2: { cups: 4, time: 1800 },
    3: { cups: 5, time: 1600 },
    4: { cups: 6, time: 1400 },
    5: { cups: 7, time: 1200 },
    6: { cups: 8, time: 1100 },
    7: { cups: 9, time: 1000 },
    8: { cups: 10, time: 900 },
    9: { cups: 11, time: 800 },
    10: { cups: 12, time: 700 }
};

// Ses efektleri (metin browseler için, gerçek ses dosyaları eklenemez - SVG ikonlar)
const sfx = {
    correct: function() { /* ses efekti placeholder */ },
    wrong: function() { /* ses efekti placeholder */ }
};

// DOM referansları
const DOM = {
    gameArea: document.getElementById('gameArea'),
    scoreDisplay: document.getElementById('score'),
    levelDisplay: document.getElementById('level'),
    startBtn: document.getElementById('startBtn'),
    restartBtn: document.getElementById('restartBtn')
};

// Başlangıçta başlat
function initGame() {
    DOM.startBtn.addEventListener('click', startNewGame);
    DOM.restartBtn.addEventListener('click', restartGame);
    // Klavye kontrolü - Enter ile başlat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && DOM.startBtn.style.display !== 'none') {
            startNewGame();
        }
    });
}

// Yeni oyunu başlat
function startNewGame() {
    DOM.startBtn.style.display = 'none';
    gameState.level = 1;
    gameState.score = 0;
    updateUI();
    createCups(1);
}

// Oyunu yeniden başlat
function restartGame() {
    // Sayfayı yenile
    location.reload();
}

// Bardaklar oluştur
function createCups(level) {
    const config = levelConfig[level];
    if (!config) {
        endGame(true); // Tüm seviyeler tamamlandı
        return;
    }

    // Eski bardakları temizle
    gameState.cups.forEach(cup => {
        if (cup.parentNode) cup.parentNode.removeChild(cup);
    });
    gameState.cups = [];
    gameState.ballCupIndex = -1;

    // Bardakları oluştur
    const fragment = document.createDocumentFragment();
    const cupWidth = 80;
    const gap = 10;
    const totalWidth = config.cups * cupWidth + (config.cups - 1) * gap;
    const startX = -((totalWidth - cupWidth) / 2);

    for (let i = 0; i < config.cups; i++) {
        const cup = document.createElement('div');
        cup.className = 'cup';
        cup.dataset.index = i;

        // Ball varsa sadece biri altında gizle
        if (i === 0) {
            // Seviye 1'de her seviyede farklı cup'ta olacak
            gameState.ballCupIndex = Math.floor(Math.random() * config.cups);
        }

        // Tok işareti (bulundukları cup'ta)
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.style.left = (20 + i * cupWidth) + 'px';

        cup.appendChild(indicator);
        cup.style.left = (startX + i * (cupWidth + gap)) + 'px';
        
        // Tıklandığında cup seçildi
        cup.addEventListener('click', () => handleCupClick(i));
        
        fragment.appendChild(cup);
        gameState.cups.push(cup);
    }

    // Toku belirlenen cup'ta göster
    setTimeout(() => {
        gameState.cups.forEach((cup, idx) => {
            const indicator = cup.querySelector('.indicator');
            if (idx === gameState.ballCupIndex) {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1)';
            }
        });
    }, 500);

    gameArea.appendChild(fragment);
    
    // Zamanlayıcı başlat - tokı gizlemek için
    hideBallAfterTime(config.time, config.cups);
}

// Toku belirlenen zaman sonra gizle
function hideBallAfterTime(time, totalCups) {
    clearTimeout(gameState.timerId);
    gameState.timerId = setTimeout(() => {
        gameState.cups.forEach(cup => {
            const indicator = cup.querySelector('.indicator');
            if (indicator) {
                indicator.style.opacity = '0';
                indicator.style.transform = 'scale(0)';
            }
        });
    }, time);
}

// Cup tıklandığında
function handleCupClick(clickedIndex) {
    if (gameState.isGameOver) return;

    // Doğrusu kontrol et
    const isCorrect = (clickedIndex === gameState.ballCupIndex);

    // Tüm kapakları etkisiz kıl
    gameState.cups.forEach(cup => {
        cup.style.pointerEvents = 'none';
    });

    // Görsel geri bildirimi
    setTimeout(() => {
        if (isCorrect) {
            // Doğru!
            gameState.score += 100 * gameState.level;
            DOM.scoreDisplay.textContent = gameState.score;
            
            // Seviye tamamlanti - kısa gecikme ile sonraki seviye
            setTimeout(() => {
                if (gameState.level < 10) {
                    gameState.level++;
                    updateUI();
                    // Kısa mola sonraki seviye için
                    setTimeout(() => {
                        createCups(gameState.level);
                    }, 800);
                } else {
                    // Tüm 10 seviyi tamamlandı
                    endGame(true);
                }
            }, 1500);
        } else {
            // İsabetli değil
            gameState.isGameOver = true;
            DOM.restartBtn.style.display = 'inline-block';
            DOM.gameArea.innerHTML = '<div style="text-align:center; padding:40px; color:#ef4444; font-size:18px;">Oyun Bitti!<br>Skor: ' + gameState.score + '</div>';
        }
    }, 300);
}

// UI güncelle
function updateUI() {
    DOM.levelDisplay.textContent = gameState.level;
}

// Oyunu bitir
function endGame(won) {
    gameState.isGameOver = true;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="content">
            ${won ? 'Tebrikler!' : 'Oyun Bitti'}<br>
            Final Skor: <span style="color:#10b981;">' + gameState.score + '</span><br>
            <button class="btn" onclick="location.reload()">Yeniden Oyna</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.style.display = 'flex', 10);
}

// Oyunu başlat
initGame();