/**
 * ========================================================
 * 🎂 HAPPY BIRTHDAY KOWSI - SPECIAL SURPRISE WEBSITE
 * Interactive Engine, Audio Synthesizer, Confetti & Finale
 * ========================================================
 */

// ========================================================
// 1. PROCEDURAL SOUND SYNTHESIZER (WEB AUDIO API)
// Provides instant zero-lag sound effects without external files
// ========================================================
class SoundEffects {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Gentle musical chime (C - E - G - B - C)
    playChime() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; // C5, E5, G5, B5, C6
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            
            gain.gain.setValueAtTime(0, now + idx * 0.1);
            gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.1 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.85);
        });
    }

    // Soft airy puff for blowing out candle
    playPuff() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }

    // Cheerful celebration pop
    playPop() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
    }

    // Typewriter gentle tap
    playTap() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }
}

const sfx = new SoundEffects();

// ========================================================
// 2. CONFETTI BURST ENGINE (CDN + EMBEDDED FALLBACK)
// ========================================================
function launchCelebrationConfetti() {
    if (typeof confetti === 'function') {
        // Multi-angle festive explosion
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b8b', '#ffd54f', '#b39ddb', '#80deea', '#ff4081']
        });
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff8da1', '#ffc107', '#ff6b8b']
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#b39ddb', '#ffd54f', '#80deea']
            });
        }, 250);
    } else {
        // Fallback floating emoji sparkles
        createFallbackFloatingSparkles();
    }
}

function createFallbackFloatingSparkles() {
    const emojis = ['🎉', '✨', '🌸', '💖', '⭐', '🎂'];
    for (let i = 0; i < 25; i++) {
        const span = document.createElement('span');
        span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'fixed';
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = '70vh';
        span.style.fontSize = (Math.random() * 20 + 20) + 'px';
        span.style.zIndex = '99999';
        span.style.pointerEvents = 'none';
        span.style.transition = 'all 1.8s cubic-bezier(0.25, 1, 0.5, 1)';
        document.body.appendChild(span);

        requestAnimationFrame(() => {
            span.style.transform = `translate(${Math.random() * 200 - 100}px, -${Math.random() * 400 + 200}px) rotate(${Math.random() * 360}deg)`;
            span.style.opacity = '0';
        });

        setTimeout(() => span.remove(), 2000);
    }
}

// ========================================================
// 3. BACKGROUND MUSIC CONTROLLER
// ========================================================
const bgAudio = document.getElementById('birthday-audio');
const musicToggleBtn = document.getElementById('music-toggle-btn');
const vinylDisc = document.getElementById('vinyl-disc');
const musicStatus = document.getElementById('music-status');
const soundWaves = document.getElementById('sound-waves');
let isMusicPlaying = false;

function toggleMusic() {
    if (!bgAudio) return;
    sfx.init();

    if (isMusicPlaying) {
        bgAudio.pause();
        isMusicPlaying = false;
        vinylDisc.classList.remove('spin');
        soundWaves.classList.remove('active');
        musicStatus.textContent = 'Paused ⏸️';
    } else {
        bgAudio.play().then(() => {
            isMusicPlaying = true;
            vinylDisc.classList.add('spin');
            soundWaves.classList.add('active');
            musicStatus.textContent = 'Playing 🌸';
        }).catch(err => {
            console.log('Audio autoplay prevented:', err);
            musicStatus.textContent = 'Tap to Play';
        });
    }
}

if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
}

// ========================================================
// 4. UNBOXING GATE & PRELOADER SCANNER SEQUENCE
// ========================================================
const surpriseGate = document.getElementById('surprise-gate');
const openSurpriseBtn = document.getElementById('open-surprise-btn');
const giftIcon = document.getElementById('gift-icon');
const loaderScreen = document.getElementById('loader-screen');
const progressFill = document.getElementById('progress-fill');
const scannerStatus = document.getElementById('scanner-status');
const scannerDetail = document.getElementById('scanner-detail');
const scanningStep = document.getElementById('scanning-step');
const matchStep = document.getElementById('match-step');
const mainContent = document.getElementById('main-content');

function startUnboxingSequence() {
    sfx.init();
    sfx.playChime();
    launchCelebrationConfetti();

    // Start background music
    if (bgAudio) {
        bgAudio.play().then(() => {
            isMusicPlaying = true;
            if (vinylDisc) vinylDisc.classList.add('spin');
            if (soundWaves) soundWaves.classList.add('active');
            if (musicStatus) musicStatus.textContent = 'Playing 🌸';
        }).catch(() => {});
    }

    // Hide Surprise Gate
    surpriseGate.classList.add('hidden');

    // Show Preloader Scanner
    loaderScreen.style.display = 'flex';

    // Scanner Progress Steps
    const scanStages = [
        { progress: 25, title: "Connecting Best Friend Heartbeats... 💖", detail: "Scanning all shared memories since day one..." },
        { progress: 60, title: "Calculating Queen Energy... 👑", detail: "Smile index: 100% • Laugh factor: Maximum!" },
        { progress: 95, title: "Unwrapping Birthday Magic... ✨", detail: "Finalizing celebration surprise!" }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
        if (currentStage < scanStages.length) {
            const step = scanStages[currentStage];
            progressFill.style.width = step.progress + '%';
            scannerStatus.textContent = step.title;
            scannerDetail.textContent = step.detail;
            sfx.playTap();
            currentStage++;
        } else {
            clearInterval(interval);
            progressFill.style.width = '100%';

            setTimeout(() => {
                scanningStep.style.display = 'none';
                matchStep.style.display = 'block';
                sfx.playChime();
                launchCelebrationConfetti();

                setTimeout(() => {
                    loaderScreen.style.opacity = '0';
                    setTimeout(() => {
                        loaderScreen.style.display = 'none';
                        mainContent.classList.add('visible');
                        launchCelebrationConfetti();
                    }, 600);
                }, 2200);
            }, 600);
        }
    }, 700);
}

if (openSurpriseBtn) openSurpriseBtn.addEventListener('click', startUnboxingSequence);
if (giftIcon) giftIcon.addEventListener('click', startUnboxingSequence);

// Floating Confetti Popper Button
const confettiPopperBtn = document.getElementById('confetti-popper-btn');
if (confettiPopperBtn) {
    confettiPopperBtn.addEventListener('click', () => {
        sfx.init();
        sfx.playPop();
        launchCelebrationConfetti();
    });
}

// ========================================================
// 5. INTERACTIVE CAKE CUTTING & CANDLE BLOWING
// ========================================================
const candleFlame = document.getElementById('candle-flame');
const smokeWisp = document.getElementById('smoke-wisp');
const candleStick = document.getElementById('candle-stick');
const blowCandleBtn = document.getElementById('blow-candle-btn');
const cutCakeBtn = document.getElementById('cut-cake-btn');
const resetCakeBtn = document.getElementById('reset-cake-btn');
const cakeAssembly = document.getElementById('cake-assembly');
const cakeMessageBanner = document.getElementById('cake-message-banner');
const bannerTitle = document.getElementById('banner-title');
const bannerDesc = document.getElementById('banner-desc');

let isCandleBlown = false;

function blowCandle() {
    if (isCandleBlown) return;
    sfx.init();
    sfx.playPuff();

    isCandleBlown = true;
    candleFlame.classList.add('blown-out');
    smokeWisp.classList.add('active');

    // Enable Cut Cake Button
    blowCandleBtn.style.display = 'none';
    cutCakeBtn.disabled = false;
    cutCakeBtn.classList.add('pulse-glow');

    // Show Message Banner
    cakeMessageBanner.style.display = 'flex';
    bannerTitle.textContent = "Candles Blown! Make a Wish, Kowsi! 🌟";
    bannerDesc.textContent = "Close your eyes, make your secret wish, and then click 'Cut The Cake'!";

    setTimeout(() => {
        smokeWisp.classList.remove('active');
    }, 2000);
}

function cutCake() {
    sfx.init();
    sfx.playChime();
    sfx.playPop();
    launchCelebrationConfetti();

    // Slicing animation on cake
    document.querySelectorAll('.cake-tier').forEach(tier => {
        tier.classList.add('sliced');
    });

    cutCakeBtn.style.display = 'none';
    resetCakeBtn.style.display = 'inline-flex';

    bannerTitle.textContent = "Happy Birthday Kowsi! 🍰🎉";
    bannerDesc.textContent = "Here's a sweet slice of happiness for you! May all your heartfelt dreams come true this year!";
}

function resetCake() {
    isCandleBlown = false;
    candleFlame.classList.remove('blown-out');
    document.querySelectorAll('.cake-tier').forEach(tier => {
        tier.classList.remove('sliced');
    });

    blowCandleBtn.style.display = 'inline-flex';
    cutCakeBtn.style.display = 'inline-flex';
    cutCakeBtn.disabled = true;
    resetCakeBtn.style.display = 'none';

    bannerTitle.textContent = "Make a wish, Kowsi! 🌟";
    bannerDesc.textContent = "Blow out the candles whenever you're ready!";
}

if (blowCandleBtn) blowCandleBtn.addEventListener('click', blowCandle);
if (candleStick) candleStick.addEventListener('click', blowCandle);
if (cutCakeBtn) cutCakeBtn.addEventListener('click', cutCake);
if (resetCakeBtn) resetCakeBtn.addEventListener('click', resetCake);

// ========================================================
// 6. SCRAPBOOK POLAROID GALLERY & LIGHTBOX MODAL
// ========================================================
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCaption = document.getElementById('modal-caption');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalHeartBtn = document.getElementById('modal-heart-btn');

document.querySelectorAll('.polaroid-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // If clicked on like button, don't open modal
        if (e.target.closest('.love-counter-btn')) return;

        const src = item.dataset.src || item.querySelector('img').src;
        const title = item.dataset.title || 'Special Memory';
        const caption = item.dataset.caption || '';

        modalImg.src = src;
        modalTitle.textContent = title;
        modalCaption.textContent = caption;

        galleryModal.classList.add('active');
        sfx.init();
        sfx.playTap();
    });
});

function closeGalleryModal() {
    galleryModal.classList.remove('active');
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGalleryModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeGalleryModal);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
        closeGalleryModal();
    }
});

// Polaroid Hearts Like Counter
document.querySelectorAll('.love-counter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.init();
        sfx.playPop();

        const countSpan = btn.querySelector('.likes-count');
        let count = parseInt(countSpan.textContent, 10);
        countSpan.textContent = count + 1;

        // Floating heart animation over button
        createFloatingHeartAtElement(btn);
    });
});

if (modalHeartBtn) {
    modalHeartBtn.addEventListener('click', () => {
        sfx.init();
        sfx.playPop();
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createFloatingHeartAtElement(modalHeartBtn), i * 80);
        }
    });
}

function createFloatingHeartAtElement(el) {
    const rect = el.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.textContent = ['💖', '🌸', '✨', '💕', '👑'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = (rect.left + rect.width / 2 + (Math.random() * 30 - 15)) + 'px';
    heart.style.top = rect.top + 'px';
    heart.style.fontSize = (Math.random() * 10 + 18) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999999';
    heart.style.transition = 'all 1.2s cubic-bezier(0.2, 0.8, 0.4, 1)';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform = `translateY(-${Math.random() * 80 + 60}px) scale(1.3)`;
        heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1250);
}

// ========================================================
// 7. INTERACTIVE WISHES JAR & FORTUNE GENERATOR
// ========================================================
const birthdayBlessings = [
    "May your new year be blessed with overflowing happiness, genuine peace, dream achievements, and people who recognize the diamond that you are.",
    "No matter what challenges life brings, remember you have a strength inside you that can move mountains. Keep rocking, Birthday Queen! 👑",
    "May your smile continue to brighten up every room, and may this year give you a hundred reasons to laugh out loud every single day! 😄",
    "A rare friend like you is a blessing that words can never fully capture. Thank you for simply being you, Kowsi! 💛",
    "May every door of opportunity open effortlessly for you this year. You deserve every ounce of success and joy! 🚀",
    "May all your secret wishes, midnight prayers, and unspoken goals quietly turn into your proudest reality this year. ✨",
    "Thank you for all the laughter, the random memories, and for always being a genuine source of warmth. Happy Birthday Kowsi! 🌸",
    "May your heart always be at peace, your mind filled with confidence, and your days sprinkled with pure fun and good food! 🍰"
];

let currentBlessingIndex = 0;
const jarBox = document.getElementById('jar-box');
const jarContainer = document.querySelector('.jar-container');
const drawNextWishBtn = document.getElementById('draw-next-wish-btn');
const capsuleText = document.getElementById('capsule-text');
const capsuleNum = document.getElementById('capsule-num');

function drawNextBlessing() {
    sfx.init();
    sfx.playChime();

    // Jar shake animation
    jarContainer.classList.add('shake');
    setTimeout(() => jarContainer.classList.remove('shake'), 600);

    // Fade out text, change, fade in
    capsuleText.style.opacity = '0';
    setTimeout(() => {
        currentBlessingIndex = (currentBlessingIndex + 1) % birthdayBlessings.length;
        capsuleText.textContent = `"${birthdayBlessings[currentBlessingIndex]}"`;
        capsuleNum.textContent = currentBlessingIndex + 1;
        capsuleText.style.opacity = '1';
        launchCelebrationConfetti();
    }, 250);
}

if (drawNextWishBtn) drawNextWishBtn.addEventListener('click', drawNextBlessing);
if (jarBox) jarBox.addEventListener('click', drawNextBlessing);

// ========================================================
// 8. VIRTUAL GUESTBOOK & STICKY NOTES WALL (LOCALSTORAGE)
// ========================================================
const wishForm = document.getElementById('wish-form');
const wishAuthor = document.getElementById('wish-author');
const wishMessage = document.getElementById('wish-message');
const stickyNotesWall = document.getElementById('sticky-notes-wall');

const defaultWishes = [
    {
        author: "Spidy (Best Friend)",
        message: "Happy Birthday Kowsi! 🎂 Thank you for being such an unforgettable friend. May this year be your happiest and most successful yet!",
        color: "note-pink",
        date: "Today"
    },
    {
        author: "Your Cheerleader",
        message: "To the Queen of smiles! Never change who you are. Keep shining bright! ✨👑",
        color: "note-yellow",
        date: "Today"
    },
    {
        author: "Memory Keeper",
        message: "From crazy laughs to all our chats, here is to a million more memories together! 💖",
        color: "note-purple",
        date: "Today"
    }
];

function isTestNote(item) {
    if (!item || !item.author || !item.message) return true;
    const authorClean = item.author.trim().toLowerCase();
    const msgClean = item.message.trim().toLowerCase();
    return authorClean === 's' || msgClean === 's' || msgClean === 'ss' || authorClean === 'ss';
}

function loadGuestbookWishes() {
    const saved = localStorage.getItem('kowsi_birthday_wishes');
    let wishes = defaultWishes;
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                // Filter out any "s" test notes
                wishes = parsed.filter(item => !isTestNote(item));
                if (wishes.length === 0) {
                    wishes = [...defaultWishes];
                }
                localStorage.setItem('kowsi_birthday_wishes', JSON.stringify(wishes));
            }
        } catch (e) {
            wishes = defaultWishes;
        }
    }
    renderStickyNotes(wishes);
}

function renderStickyNotes(wishes) {
    if (!stickyNotesWall) return;
    stickyNotesWall.innerHTML = '';

    wishes.forEach((item, index) => {
        const note = document.createElement('div');
        note.className = `sticky-note ${item.color || 'note-pink'}`;
        note.innerHTML = `
            <span class="sticky-pin">📌</span>
            <button class="delete-note-btn" title="Delete note" data-index="${index}">&times;</button>
            <p class="sticky-msg">"${escapeHtml(item.message)}"</p>
            <div class="sticky-meta">
                <span>— ${escapeHtml(item.author)}</span>
                <span>${item.date || 'Today'}</span>
            </div>
        `;
        stickyNotesWall.appendChild(note);
    });

    // Add delete event listeners
    document.querySelectorAll('.delete-note-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index, 10);
            deleteWishNote(idx);
        });
    });
}

function deleteWishNote(index) {
    sfx.init();
    sfx.playPop();

    let wishes = [];
    const saved = localStorage.getItem('kowsi_birthday_wishes');
    if (saved) {
        try { wishes = JSON.parse(saved); } catch (e) { wishes = [...defaultWishes]; }
    } else {
        wishes = [...defaultWishes];
    }

    if (index >= 0 && index < wishes.length) {
        wishes.splice(index, 1);
        if (wishes.length === 0) {
            wishes = [...defaultWishes];
        }
        localStorage.setItem('kowsi_birthday_wishes', JSON.stringify(wishes));
        renderStickyNotes(wishes);
    }
}

function resetGuestbook() {
    sfx.init();
    sfx.playChime();
    localStorage.setItem('kowsi_birthday_wishes', JSON.stringify(defaultWishes));
    renderStickyNotes(defaultWishes);
}

const resetWishesBtn = document.getElementById('reset-wishes-btn');
if (resetWishesBtn) {
    resetWishesBtn.addEventListener('click', resetGuestbook);
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const author = wishAuthor.value.trim();
        const message = wishMessage.value.trim();

        if (!author || !message) return;

        sfx.init();
        sfx.playChime();
        launchCelebrationConfetti();

        const colors = ['note-pink', 'note-yellow', 'note-purple', 'note-mint'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newWish = {
            author: author,
            message: message,
            color: randomColor,
            date: "Just now"
        };

        let wishes = [];
        const saved = localStorage.getItem('kowsi_birthday_wishes');
        if (saved) {
            try { wishes = JSON.parse(saved); } catch (e) { wishes = defaultWishes; }
        } else {
            wishes = defaultWishes;
        }

        wishes.unshift(newWish);
        localStorage.setItem('kowsi_birthday_wishes', JSON.stringify(wishes));
        renderStickyNotes(wishes);

        wishAuthor.value = '';
        wishMessage.value = '';
    });
}

// Load initial guestbook notes (automatically cleans test notes)
loadGuestbookWishes();

// ========================================================
// 9. GRAND FINALE CINEMATIC FIREWORKS & TYPEWRITER
// ========================================================
const launchFinaleBtn = document.getElementById('launch-finale-btn');
const cinematicOverlay = document.getElementById('cinematic-overlay');
const closeCinematicBtn = document.getElementById('close-cinematic-btn');
const exitFinaleBtn = document.getElementById('exit-finale-btn');
const replayFireworksBtn = document.getElementById('replay-fireworks-btn');
const cinematicTypewriter = document.getElementById('cinematic-typewriter');
const cinematicBadge = document.getElementById('cinematic-badge');
const canvas = document.getElementById('fireworks-canvas');

let fireworksAnimationId = null;
let fireworksParticles = [];
let fireworksRockets = [];
let isFireworksRunning = false;

// Finale typewriter script lines
const finaleScript = [
    { text: "Dear Kowsi...", delay: 1000 },
    { text: "Another chapter of your wonderful life begins today.", delay: 1100 },
    { text: "Through every laugh, every story, and every memory...", delay: 1200 },
    { text: "You have been the most incredible best friend.", delay: 1200 },
    { text: "May all your dreams turn into reality this year.", delay: 1400 },
    { text: "Always here for you, no matter what.", delay: 1500 }
];

function openCinematicFinale() {
    sfx.init();
    sfx.playChime();
    cinematicOverlay.classList.add('active');

    // Start fireworks engine
    startFireworks();

    // Start Typewriter
    startCinematicTypewriter();
}

function closeCinematicFinale() {
    cinematicOverlay.classList.remove('active');
    stopFireworks();
    cinematicTypewriter.innerHTML = '';
    if (cinematicBadge) cinematicBadge.style.display = 'none';
}

if (launchFinaleBtn) launchFinaleBtn.addEventListener('click', openCinematicFinale);
if (closeCinematicBtn) closeCinematicBtn.addEventListener('click', closeCinematicFinale);
if (exitFinaleBtn) exitFinaleBtn.addEventListener('click', closeCinematicFinale);
if (replayFireworksBtn) {
    replayFireworksBtn.addEventListener('click', () => {
        sfx.init();
        sfx.playPop();
        for (let i = 0; i < 5; i++) {
            setTimeout(createFireworkRocket, i * 200);
        }
    });
}

function startCinematicTypewriter() {
    cinematicTypewriter.innerHTML = '';
    if (cinematicBadge) cinematicBadge.style.display = 'none';

    let lineIndex = 0;

    function typeNextLine() {
        if (lineIndex < finaleScript.length) {
            const lineData = finaleScript[lineIndex];
            const lineEl = document.createElement('div');
            lineEl.className = 'typewriter-line';
            cinematicTypewriter.appendChild(lineEl);

            let charIdx = 0;
            function typeChar() {
                if (charIdx < lineData.text.length) {
                    lineEl.innerHTML = lineData.text.substring(0, charIdx + 1) + "<span class='typewriter-cursor'>🖋️</span>";
                    charIdx++;
                    sfx.playTap();
                    setTimeout(typeChar, 45 + Math.random() * 35);
                } else {
                    lineEl.innerHTML = lineData.text;
                    lineIndex++;
                    setTimeout(typeNextLine, lineData.delay);
                }
            }
            typeChar();
        } else {
            // Typing complete, show badge and big fireworks shower!
            setTimeout(() => {
                if (cinematicBadge) cinematicBadge.style.display = 'block';
                sfx.playChime();
                launchCelebrationConfetti();
                // Launch barrage of fireworks
                for (let i = 0; i < 8; i++) {
                    setTimeout(createFireworkRocket, i * 350);
                }
            }, 500);
        }
    }

    typeNextLine();
}

// Fireworks Canvas Simulation
function initCanvasSize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', initCanvasSize);

function startFireworks() {
    if (!canvas) return;
    initCanvasSize();
    isFireworksRunning = true;
    fireworksParticles = [];
    fireworksRockets = [];

    // Periodic rocket launcher
    function autoLaunch() {
        if (!isFireworksRunning) return;
        createFireworkRocket();
        setTimeout(autoLaunch, 800 + Math.random() * 1200);
    }
    autoLaunch();

    animateFireworks();
}

function stopFireworks() {
    isFireworksRunning = false;
    if (fireworksAnimationId) {
        cancelAnimationFrame(fireworksAnimationId);
    }
}

function createFireworkRocket() {
    if (!canvas) return;
    const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
    const targetY = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
    const colors = ['#ff6b8b', '#ffd54f', '#b39ddb', '#80deea', '#ff4081', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    fireworksRockets.push({
        x: x,
        y: canvas.height,
        targetY: targetY,
        speedY: (canvas.height - targetY) / 35,
        color: color
    });
}

function explodeRocket(x, y, color) {
    sfx.playPop();
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 / particleCount) * i;
        const speed = Math.random() * 4 + 2;
        fireworksParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            decay: Math.random() * 0.015 + 0.015
        });
    }
}

function animateFireworks() {
    if (!isFireworksRunning) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(13, 6, 20, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update rockets
    for (let i = fireworksRockets.length - 1; i >= 0; i--) {
        const r = fireworksRockets[i];
        r.y -= r.speedY;

        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY) {
            explodeRocket(r.x, r.y, r.color);
            fireworksRockets.splice(i, 1);
        }
    }

    // Update particles
    for (let i = fireworksParticles.length - 1; i >= 0; i--) {
        const p = fireworksParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
            fireworksParticles.splice(i, 1);
        }
    }

    fireworksAnimationId = requestAnimationFrame(animateFireworks);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

