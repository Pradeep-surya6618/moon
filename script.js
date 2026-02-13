// ===== Intro Overlay — Gift Wrapper =====
(function () {
  const overlay = document.getElementById("intro-overlay");
  const heartsBg = document.getElementById("intro-hearts-bg");
  const nepBgm = document.getElementById("nep-bgm");

  if (!overlay) return;

  // Create floating hearts background
  const heartEmojis = ["💗", "💕", "💖", "💓", "💞", "🩷", "♥️"];
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("span");
    heart.className = "intro-floating-heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + "rem";
    heart.style.animationDuration = (Math.random() * 6 + 5) + "s";
    heart.style.animationDelay = (Math.random() * 8) + "s";
    heartsBg.appendChild(heart);
  }

  // Fire intro confetti hearts from center
  function fireIntroConfetti() {
    const emojis = ["❤️", "💖", "💗", "💕", "💘", "💝", "💓", "💞", "🩷", "✨", "🌸"];
    const count = 35;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "intro-confetti-heart";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.random() * Math.PI * 2);
      const velocity = 200 + Math.random() * 500;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 100;

      el.style.left = cx + "px";
      el.style.top = cy + "px";
      el.style.setProperty("--tx", tx + "px");
      el.style.setProperty("--ty", ty + "px");
      el.style.setProperty("--tr", (Math.random() * 720 - 360) + "deg");
      el.style.setProperty("--confetti-size", (0.6 + Math.random() * 1.2).toString());
      el.style.setProperty("--fall-duration", (1.5 + Math.random() * 1.5) + "s");
      el.style.setProperty("--fall-delay", (Math.random() * 0.4) + "s");
      el.style.fontSize = (1 + Math.random() * 1.5) + "rem";

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }
  }

  // Handle tap to open
  overlay.addEventListener("click", function () {
    if (overlay.classList.contains("opening")) return;
    overlay.classList.add("opening");

    // Play NEP-bgm at mild volume
    if (nepBgm) {
      nepBgm.volume = 0.15;
      nepBgm.play().catch(() => {});
    }

    // Fire confetti from center (staggered for smoothness)
    requestAnimationFrame(() => fireIntroConfetti());

    // Second wave
    setTimeout(() => fireIntroConfetti(), 500);

    // After gift explodes, fade out overlay and unlock scroll
    setTimeout(() => {
      overlay.classList.add("hidden");
      document.body.classList.remove("scroll-locked");
    }, 700);

    // Remove overlay from DOM after transition
    setTimeout(() => {
      overlay.remove();
    }, 1400);
  });
})();

// Particle System: Floating Petals
const canvas = document.getElementById("petal-canvas");
const ctx = canvas.getContext("2d");

let width,
  height,
  petals = [];
const petalCount = 30;

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = -20;
    this.size = Math.random() * 10 + 5;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > height) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.beginPath();
    // Draw a simple heart/petal shape
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.size,
      -this.size,
      this.size * 2,
      this.size / 2,
      0,
      this.size,
    );
    ctx.bezierCurveTo(
      -this.size * 2,
      this.size / 2,
      -this.size,
      -this.size,
      0,
      0,
    );
    ctx.fillStyle = `rgba(240, 98, 146, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }
}

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  petals.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", init);
init();
animate();

// Hero Section Floating Hearts & Papers
(function () {
  const heroDeco = document.getElementById("hero-deco");
  if (!heroDeco) return;

  const hearts = ["💗", "💕", "💖", "💓", "🩷", "♥️", "💞"];
  const paperColors = ["#f06292", "#e91e63", "#f8bbd0", "#ff80ab", "#fce4ec", "#ec407a"];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");
    el.className = "hero-heart";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.fontSize = (1 + Math.random() * 2) + "rem";
    el.style.setProperty("--opacity", (0.08 + Math.random() * 0.1).toString());
    el.style.setProperty("--drift-y", (-30 - Math.random() * 40) + "px");
    el.style.setProperty("--drift-r", (Math.random() * 60 - 30) + "deg");
    el.style.animationDuration = (8 + Math.random() * 10) + "s";
    el.style.animationDelay = (Math.random() * 12) + "s";
    heroDeco.appendChild(el);
  }

  for (let i = 0; i < 15; i++) {
    const el = document.createElement("div");
    el.className = "hero-paper";
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.background = paperColors[Math.floor(Math.random() * paperColors.length)];
    el.style.width = (10 + Math.random() * 16) + "px";
    el.style.height = (8 + Math.random() * 12) + "px";
    el.style.setProperty("--r", (Math.random() * 360) + "deg");
    el.style.setProperty("--opacity", (0.06 + Math.random() * 0.08).toString());
    el.style.setProperty("--drift-y", (-20 - Math.random() * 50) + "px");
    el.style.setProperty("--drift-r", (Math.random() * 90 - 45) + "deg");
    el.style.animationDuration = (10 + Math.random() * 12) + "s";
    el.style.animationDelay = (Math.random() * 15) + "s";
    heroDeco.appendChild(el);
  }
})();

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".fade-in, .slide-left, .slide-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Secret Message Reveal
const secretBox = document.getElementById("secret-message");
const remoBgm = document.getElementById("remo-bgm");
if (secretBox) {
  secretBox.addEventListener("click", () => {
    if (!secretBox.classList.contains("active")) {
      secretBox.classList.add("active");
      createHeartBurst(secretBox);

      // Stop all other audio before playing remo-bgm
      stopAllAudio();
      pauseNepBgm();

      // Play remo-bgm and show pause button
      const remoPauseBtn = document.getElementById("remo-pause-btn");
      if (remoBgm) {
        remoBgm.volume = 0.5;
        remoBgm.play();
      }
      if (remoPauseBtn) {
        remoPauseBtn.style.display = "flex";
        remoPauseBtn.textContent = "🎶";
        remoPauseBtn.classList.remove("paused");
      }

      // Fire confetti cannons from both bottom corners
      fireConfettiCannon("left");
      fireConfettiCannon("right");
      // Fire a second wave after a short delay
      setTimeout(() => {
        fireConfettiCannon("left");
        fireConfettiCannon("right");
      }, 700);
      // Third wave
      setTimeout(() => {
        fireConfettiCannon("left");
        fireConfettiCannon("right");
      }, 1400);
    }
  });
}

// Remo BGM Pause/Play Toggle Button
const remoPauseBtn = document.getElementById("remo-pause-btn");
if (remoPauseBtn && remoBgm) {
  remoPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (remoBgm.paused) {
      stopAllAudio();
      pauseNepBgm();
      remoBgm.play();
      remoPauseBtn.textContent = "🎶";
      remoPauseBtn.classList.remove("paused");
    } else {
      remoBgm.pause();
      remoPauseBtn.textContent = "🎵";
      remoPauseBtn.classList.add("paused");
      if (!isAnySectionAudioPlaying()) resumeNepBgm();
    }
  });
}

function createHeartBurst(container) {
  const heartCount = 15;
  const rect = container.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-burst";
    heart.innerHTML = "❤";

    // Random trajectory
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const tr = Math.random() * 360;

    heart.style.setProperty("--tx", `${tx}px`);
    heart.style.setProperty("--ty", `${ty}px`);
    heart.style.setProperty("--tr", `${tr}deg`);

    // Center starting position
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;

    container.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

// Confetti Cannon System
function fireConfettiCannon(side) {
  const confettiCount = 35;
  const emojis = ["❤️", "💖", "💗", "💕", "💘", "💝", "💓", "💞", "🩷", "♥️"];
  const colors = [
    "#f06292",
    "#e91e63",
    "#ff80ab",
    "#f8bbd0",
    "#ff4081",
    "#d81b60",
    "#ec407a",
    "#fce4ec",
    "#f48fb1",
    "#ad1457",
  ];

  const startX = side === "left" ? 0 : window.innerWidth;
  const startY = window.innerHeight;

  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement("div");

    // Randomly choose between heart emoji or colored paper
    const isEmoji = Math.random() > 0.4;

    if (isEmoji) {
      piece.className = "confetti-piece confetti-emoji";
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    } else {
      piece.className = "confetti-piece confetti-paper";
      const color = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty("--confetti-color", color);
    }

    // Cannon angle: shoot upward and inward
    const angleMin = side === "left" ? -80 : -100;
    const angleMax = side === "left" ? -30 : -150;
    const angleDeg = angleMin + Math.random() * (angleMax - angleMin);
    const angleRad = (angleDeg * Math.PI) / 180;

    const velocity = 400 + Math.random() * 600;
    const tx = Math.cos(angleRad) * velocity;
    const ty = Math.sin(angleRad) * velocity;
    const rotation = Math.random() * 720 - 360;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 0.3;
    const size = 0.6 + Math.random() * 0.8;

    piece.style.left = `${startX}px`;
    piece.style.top = `${startY}px`;
    piece.style.setProperty("--confetti-tx", `${tx}px`);
    piece.style.setProperty("--confetti-ty", `${ty}px`);
    piece.style.setProperty("--confetti-r", `${rotation}deg`);
    piece.style.setProperty("--confetti-duration", `${duration}s`);
    piece.style.setProperty("--confetti-delay", `${delay}s`);
    piece.style.setProperty("--confetti-scale", size);

    document.body.appendChild(piece);

    setTimeout(
      () => {
        piece.remove();
      },
      (duration + delay) * 1000 + 200,
    );
  }
}

// "Nee Endhu di Poorni" Button — confetti on click
const foreverBtn = document.getElementById("forever-btn");
if (foreverBtn) {
  foreverBtn.addEventListener("click", () => {
    fireConfettiCannon("left");
    fireConfettiCannon("right");
    setTimeout(() => {
      fireConfettiCannon("left");
      fireConfettiCannon("right");
    }, 600);
    setTimeout(() => {
      fireConfettiCannon("left");
      fireConfettiCannon("right");
    }, 1200);
  });
}

// Audio Elements
const sadMusicBtn = document.getElementById("play-sad-music");
const sadMusic = document.getElementById("sad-music");
const himNoteBtn = document.getElementById("play-him-note");
const herNoteBtn = document.getElementById("play-her-note");
const himNoteAudio = document.getElementById("him-note-audio");
const herNoteAudio = document.getElementById("her-note-audio");
const nepBgm = document.getElementById("nep-bgm");

// Helper: pause NEP background music
function pauseNepBgm() {
  if (nepBgm && !nepBgm.paused) {
    nepBgm.pause();
  }
}

// Helper: resume NEP background music
function resumeNepBgm() {
  if (nepBgm && nepBgm.paused) {
    nepBgm.volume = 0.15;
    nepBgm.play().catch(() => {});
  }
}

// Check if any section audio is playing
function isAnySectionAudioPlaying() {
  return (sadMusic && !sadMusic.paused) ||
    (remoBgm && !remoBgm.paused) ||
    (himNoteAudio && !himNoteAudio.paused) ||
    (herNoteAudio && !herNoteAudio.paused);
}

// Helper: stop sorry bgm and reset its button
function stopSorryMusic() {
  if (sadMusic && !sadMusic.paused) {
    sadMusic.pause();
    sadMusic.currentTime = 0;
    sadMusicBtn.classList.remove("playing");
    sadMusicBtn.querySelector(".heart-icon").textContent = "🎵";
    sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
      " Feel My Words";
  }
}

// Helper: stop remo bgm
function stopRemoBgm() {
  if (remoBgm && !remoBgm.paused) {
    remoBgm.pause();
    remoBgm.currentTime = 0;
    const pauseBtn = document.getElementById("remo-pause-btn");
    if (pauseBtn) {
      pauseBtn.textContent = "🎵";
      pauseBtn.classList.add("paused");
    }
  }
}

// Helper: stop a note audio and reset its button
function stopNoteAudio(btn, audio, name) {
  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    btn.classList.remove("playing");
    btn.querySelector(".heart-icon").textContent = "🎵";
    btn.childNodes[btn.childNodes.length - 1].textContent = " " + name;
  }
}

// Helper: stop all audio (except NEP bgm)
function stopAllAudio() {
  stopSorryMusic();
  stopRemoBgm();
  stopNoteAudio(himNoteBtn, himNoteAudio, "Surya's Note");
  stopNoteAudio(herNoteBtn, herNoteAudio, "Poorni's Note");
}

// Sad Music Toggle for Sorry Section
if (sadMusicBtn && sadMusic) {
  sadMusic.volume = 0.4;

  sadMusicBtn.addEventListener("click", () => {
    // Stop all other audio
    stopNoteAudio(himNoteBtn, himNoteAudio, "Surya's Note");
    stopNoteAudio(herNoteBtn, herNoteAudio, "Poorni's Note");
    stopRemoBgm();

    if (sadMusic.paused) {
      pauseNepBgm();
      sadMusic.play();
      sadMusicBtn.classList.add("playing");
      sadMusicBtn.querySelector(".heart-icon").textContent = "🎶";
      sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
        " Listening...";
    } else {
      sadMusic.pause();
      sadMusic.currentTime = 0;
      sadMusicBtn.classList.remove("playing");
      sadMusicBtn.querySelector(".heart-icon").textContent = "🎵";
      sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
        " Feel My Words";
      resumeNepBgm();
    }
  });

  // Resume NEP bgm when sorry music ends
  sadMusic.addEventListener("ended", () => {
    sadMusicBtn.classList.remove("playing");
    sadMusicBtn.querySelector(".heart-icon").textContent = "🎵";
    sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
      " Feel My Words";
    if (!isAnySectionAudioPlaying()) resumeNepBgm();
  });
}

// Note Song Buttons
function toggleNoteAudio(btn, audio, otherBtn, otherAudio, name) {
  if (!btn || !audio) return;

  btn.addEventListener("click", () => {
    // Stop sorry bgm and remo bgm if playing
    stopSorryMusic();
    stopRemoBgm();

    // Pause the other note audio if playing
    const otherName = otherBtn === himNoteBtn ? "Surya's Note" : "Poorni's Note";
    stopNoteAudio(otherBtn, otherAudio, otherName);

    if (audio.paused) {
      pauseNepBgm();
      audio.play();
      btn.classList.add("playing");
      btn.querySelector(".heart-icon").textContent = "🎶";
      btn.childNodes[btn.childNodes.length - 1].textContent = " Playing...";
    } else {
      audio.pause();
      audio.currentTime = 0;
      btn.classList.remove("playing");
      btn.querySelector(".heart-icon").textContent = "🎵";
      btn.childNodes[btn.childNodes.length - 1].textContent = " " + name;
      if (!isAnySectionAudioPlaying()) resumeNepBgm();
    }
  });

  // Reset button when audio ends — resume NEP bgm
  audio.addEventListener("ended", () => {
    btn.classList.remove("playing");
    btn.querySelector(".heart-icon").textContent = "🎵";
    btn.childNodes[btn.childNodes.length - 1].textContent = " " + name;
    if (!isAnySectionAudioPlaying()) resumeNepBgm();
  });
}

toggleNoteAudio(himNoteBtn, himNoteAudio, herNoteBtn, herNoteAudio, "Surya's Note");
toggleNoteAudio(herNoteBtn, herNoteAudio, himNoteBtn, himNoteAudio, "Poorni's Note");

// Footer Floating Hearts
(function () {
  const container = document.getElementById("footer-hearts");
  if (!container) return;
  const emojis = ["💗", "💕", "💖", "💓", "💞", "🩷", "♥️", "💘", "💝"];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");
    el.className = "footer-float-heart";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = (0.8 + Math.random() * 1.4) + "rem";
    el.style.setProperty("--s", (0.6 + Math.random() * 0.8).toString());
    el.style.setProperty("--o", (0.15 + Math.random() * 0.25).toString());
    el.style.setProperty("--r", (Math.random() * 360 - 180) + "deg");
    el.style.animationDuration = (8 + Math.random() * 10) + "s";
    el.style.animationDelay = (Math.random() * 12) + "s";
    container.appendChild(el);
  }
})();

// Smooth Scroll for Button
document.querySelector(".heart-btn").addEventListener("click", () => {
  document.getElementById("chapter-1").scrollIntoView({ behavior: "smooth" });
});
