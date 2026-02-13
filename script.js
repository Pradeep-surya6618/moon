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
if (secretBox) {
  secretBox.addEventListener("click", () => {
    if (!secretBox.classList.contains("active")) {
      secretBox.classList.add("active");
      createHeartBurst(secretBox);
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

// Sad Music Toggle for Sorry Section
const sadMusicBtn = document.getElementById("play-sad-music");
const sadMusic = document.getElementById("sad-music");

if (sadMusicBtn && sadMusic) {
  sadMusic.volume = 0.4;

  sadMusicBtn.addEventListener("click", () => {
    if (sadMusic.paused) {
      sadMusic.play();
      sadMusicBtn.classList.add("playing");
      sadMusicBtn.querySelector(".heart-icon").textContent = "🎶";
      sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
        " Listening...";
    } else {
      sadMusic.pause();
      sadMusicBtn.classList.remove("playing");
      sadMusicBtn.querySelector(".heart-icon").textContent = "🎵";
      sadMusicBtn.childNodes[sadMusicBtn.childNodes.length - 1].textContent =
        " Feel My Words";
    }
  });
}

// Smooth Scroll for Button
document.querySelector(".heart-btn").addEventListener("click", () => {
  document.getElementById("chapter-1").scrollIntoView({ behavior: "smooth" });
});
