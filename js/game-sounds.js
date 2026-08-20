// game-sounds.js — teknolojitasarimci.com oyunları için ortak ses sistemi
// Web Audio API ile üretilir; harici ses dosyası gerekmez.
const GameSounds = {
  ctx: null,
  enabled: true,
  _ensure() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },
  _tone(freq, dur, type, vol, delay) {
    const ctx = this._ensure();
    if (!ctx) return;
    try {
      const t = ctx.currentTime + (delay || 0);
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || 0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.05);
    } catch (e) {}
  },
  click() { this._tone(700, 0.05, 'square', 0.08); },
  select() { this._tone(500, 0.06, 'sine', 0.12); },
  place() {
    this._tone(300, 0.08, 'triangle', 0.15);
    this._tone(150, 0.06, 'sine', 0.1, 0.01);
  },
  move() { this._tone(400, 0.1, 'sine', 0.12); },
  capture() {
    this._tone(200, 0.12, 'sawtooth', 0.12);
    this._tone(100, 0.15, 'square', 0.1, 0.02);
  },
  point() {
    this._tone(600, 0.07, 'triangle', 0.12);
    this._tone(800, 0.1, 'triangle', 0.12, 0.07);
  },
  win() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => this._tone(f, 0.2, 'triangle', 0.15, i * 0.13));
  },
  lose() {
    const notes = [400, 330, 262, 196];
    notes.forEach((f, i) => this._tone(f, 0.25, 'sine', 0.12, i * 0.15));
  },
  draw() { this._tone(440, 0.2, 'sine', 0.12); },
  wrong() { this._tone(180, 0.15, 'sawtooth', 0.12); },
  egg() {
    this._tone(900, 0.08, 'sine', 0.12);
    this._tone(1200, 0.06, 'sine', 0.1, 0.05);
  },
  crawl(speed) {
    const ctx = this._ensure();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      let dur = 0.085;
      if (speed === 'slow') dur = 0.12;
      else if (speed === 'fast') dur = 0.06;

      // 1. Yumuşak Filtrelenmiş Beyaz Gürültü (Sürünme & Yaprak Hışırtısı)
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Yumuşak çan eğrisi (Adımın ortasında şişen, başında ve sonunda yumuşak sönen zarf)
        const env = Math.sin((i / bufferSize) * Math.PI);
        data[i] = (Math.random() * 2 - 1) * env;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300, t);
      filter.Q.setValueAtTime(1.4, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t);

      // 2. Tırtıl Kasılma / Sürünme Gövde Tonu
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + dur);

      oscGain.gain.setValueAtTime(0.09, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.01);
    } catch (e) {}
  },
  fox() {
    this._tone(250, 0.2, 'sawtooth', 0.15);
    this._tone(180, 0.25, 'sawtooth', 0.12, 0.12);
  },
  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.click();
    return this.enabled;
  }
};

// Kullanıcı ilk tıkladığında veya tuşa bastığında ses bağlamını otomatik uyandır (Unlock)
if (typeof window !== 'undefined') {
  window.GameSounds = GameSounds;

  // Kayıtlı ses tercihi varsa uygula (tt-sound: 'off' ise kapalı başla)
  try {
    if (localStorage.getItem('tt-sound') === 'off') {
      GameSounds.enabled = false;
    }
  } catch (e) {}

  const unlockAudio = () => {
    try {
      const ctx = GameSounds._ensure();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        // Tarayıcıyı zorla uyandırmak için sessiz bir osilatör çal
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        osc.stop(0.01);
      }
    } catch (e) {}
  };

  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchend', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('mousedown', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}
