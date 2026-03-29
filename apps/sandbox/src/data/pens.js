export const pens = [
  {
    id: 1,
    title: "Button Click Counter",
    author: "nova_dev",
    avatar: "ND",
    avatarColor: "#47cf73",
    hearts: 842,
    views: 12400,
    tags: ["javascript", "css", "buttons"],
    gradient: ["#1a1a2e", "#16213e"],
    shapeColor: "#47cf73",
    shapeColor2: "#00d4ff",
  },
  {
    id: 2,
    title: "CSS Neon Glow Card",
    author: "pixel_witch",
    avatar: "PW",
    avatarColor: "#bd93f9",
    hearts: 1203,
    views: 28900,
    tags: ["css", "animation", "neon"],
    gradient: ["#0d0221", "#1a0533"],
    shapeColor: "#bd93f9",
    shapeColor2: "#ff79c6",
  },
  {
    id: 3,
    title: "Dark Theme Toggle",
    author: "syntaxsorcerer",
    avatar: "SS",
    avatarColor: "#ff79c6",
    hearts: 567,
    views: 9870,
    tags: ["javascript", "theme", "toggle"],
    gradient: ["#1e1f26", "#282a36"],
    shapeColor: "#f1fa8c",
    shapeColor2: "#ff79c6",
  },
  {
    id: 4,
    title: "Animated Gradient BG",
    author: "css_wizard",
    avatar: "CW",
    avatarColor: "#ff5555",
    hearts: 2341,
    views: 45200,
    tags: ["css", "animation", "gradient"],
    gradient: ["#ff6b6b", "#feca57"],
    shapeColor: "#ffffff",
    shapeColor2: "#ff9ff3",
  },
  {
    id: 5,
    title: "Form Validation UI",
    author: "devcraft_io",
    avatar: "DC",
    avatarColor: "#8be9fd",
    hearts: 398,
    views: 7650,
    tags: ["javascript", "forms", "validation"],
    gradient: ["#0f3460", "#533483"],
    shapeColor: "#8be9fd",
    shapeColor2: "#50fa7b",
  },
  {
    id: 6,
    title: "CSS Morphing Shapes",
    author: "shapeshifter",
    avatar: "SH",
    avatarColor: "#50fa7b",
    hearts: 1789,
    views: 33100,
    tags: ["css", "animation", "shapes"],
    gradient: ["#093028", "#237a57"],
    shapeColor: "#50fa7b",
    shapeColor2: "#f1fa8c",
  },
  {
    id: 7,
    title: "Typewriter Effect",
    author: "textcraft",
    avatar: "TC",
    avatarColor: "#f1fa8c",
    hearts: 924,
    views: 18700,
    tags: ["javascript", "text", "animation"],
    gradient: ["#2d1b69", "#11998e"],
    shapeColor: "#f1fa8c",
    shapeColor2: "#ffffff",
  },
  {
    id: 8,
    title: "Parallax Scrolling",
    author: "scrollsmith",
    avatar: "SC",
    avatarColor: "#ffb347",
    hearts: 3102,
    views: 61800,
    tags: ["javascript", "scroll", "parallax"],
    gradient: ["#141e30", "#243b55"],
    shapeColor: "#ffb347",
    shapeColor2: "#ff79c6",
  },
  {
    id: 9,
    title: "CSS Grid Mosaic",
    author: "gridmaster",
    avatar: "GM",
    avatarColor: "#ff5555",
    hearts: 677,
    views: 11200,
    tags: ["css", "grid", "layout"],
    gradient: ["#434343", "#000000"],
    shapeColor: "#ff5555",
    shapeColor2: "#8be9fd",
  },
  {
    id: 10,
    title: "Particle System",
    author: "particledev",
    avatar: "PD",
    avatarColor: "#47cf73",
    hearts: 4521,
    views: 89300,
    tags: ["canvas", "animation", "particles"],
    gradient: ["#000000", "#0a0a2e"],
    shapeColor: "#47cf73",
    shapeColor2: "#00d4ff",
  },
  {
    id: 11,
    title: "Accordion FAQ",
    author: "uicompose",
    avatar: "UI",
    avatarColor: "#bd93f9",
    hearts: 312,
    views: 5400,
    tags: ["javascript", "ui", "accordion"],
    gradient: ["#1a1a2e", "#16213e"],
    shapeColor: "#bd93f9",
    shapeColor2: "#ff79c6",
  },
  {
    id: 12,
    title: "Loading Spinner Pack",
    author: "spinnerdev",
    avatar: "SP",
    avatarColor: "#8be9fd",
    hearts: 1456,
    views: 27600,
    tags: ["css", "loading", "spinner"],
    gradient: ["#0f2027", "#203a43"],
    shapeColor: "#8be9fd",
    shapeColor2: "#47cf73",
  },
];

export const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Counter</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1 class="title">Click Counter</h1>
    <div class="counter-display">
      <span id="count">0</span>
    </div>
    <div class="btn-group">
      <button id="decBtn" class="btn btn-outline">
        − Decrease
      </button>
      <button id="incBtn" class="btn btn-primary">
        + Increase
      </button>
    </div>
    <button id="resetBtn" class="btn btn-reset">
      Reset
    </button>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

export const cssCode = `/* Reset & base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {
  background: #1e293b;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  min-width: 320px;
}

.title {
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.counter-display {
  background: #0f172a;
  border-radius: 12px;
  padding: 20px 40px;
  margin-bottom: 24px;
  border: 1px solid #334155;
}

#count {
  font-size: 4rem;
  font-weight: 700;
  color: #47cf73;
  font-variant-numeric: tabular-nums;
}

.btn-group {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.btn-primary {
  background: #47cf73;
  color: #0a0f0d;
}

.btn-primary:hover {
  background: #3ab562;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
}

.btn-outline:hover {
  border-color: #94a3b8;
  color: #f8fafc;
}

.btn-reset {
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #64748b;
  border: 1px solid #1e293b;
  border-radius: 8px;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-reset:hover {
  color: #ff5555;
  border-color: #ff5555;
}`;

export const jsCode = `// Counter state
let count = 0;

// DOM references
const countEl = document.getElementById('count');
const incBtn = document.getElementById('incBtn');
const decBtn = document.getElementById('decBtn');
const resetBtn = document.getElementById('resetBtn');

// Update display
function updateDisplay() {
  countEl.textContent = count;
  countEl.style.color = count > 0
    ? '#47cf73'
    : count < 0
      ? '#ff5555'
      : '#f8fafc';
}

// Event listeners
incBtn.addEventListener('click', () => {
  count++;
  updateDisplay();
  animatePulse(countEl);
});

decBtn.addEventListener('click', () => {
  count--;
  updateDisplay();
  animatePulse(countEl);
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

// Pulse animation helper
function animatePulse(el) {
  el.style.transform = 'scale(1.2)';
  setTimeout(() => {
    el.style.transform = 'scale(1)';
    el.style.transition = 'transform 0.15s ease';
  }, 100);
}

console.log('Counter initialized!');`;
