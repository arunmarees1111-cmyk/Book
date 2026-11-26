/* MY DEAR — customize the code, memory text, and media paths below. */
const SECRET_CODE = "12345678"; // Change this to your chosen 8-digit code.
const CODE_HINT = "A date worth remembering.";

const memories = [
  {
    title: "The Beginning",
    eyebrow: "MEMORY 01",
    paragraph: "Replace this with the story of how everything began. Keep it honest, personal, and written in your own words.",
    caption: "The moment our story began",
    photo: "images/memory-01.jpg",
    video: "videos/memory-01.mp4",
    layout: "layout-editorial"
  },
  {
    title: "Little Moments",
    eyebrow: "MEMORY 02",
    paragraph: "Write about the small moments that became important—the conversations, the laughter, and the things that might seem ordinary to everyone else.",
    caption: "Little things, kept forever",
    photo: "images/memory-02.jpg",
    video: "videos/memory-02.mp4",
    layout: "layout-journal"
  },
  {
    title: "Along the Way",
    eyebrow: "MEMORY 03",
    paragraph: "Add a memory from somewhere along the journey. This page is yours to shape, with one photograph, one moving moment, and the words that belong beside them.",
    caption: "A moment along the way",
    photo: "images/memory-03.jpg",
    video: "videos/memory-03.mp4",
    layout: "layout-film"
  },
  {
    title: "Still Here in the Pages",
    eyebrow: "MEMORY 04",
    paragraph: "Write the final memory for this collection. The next page will be the letter-only ending.",
    caption: "Preserved through time",
    photo: "images/memory-04.jpg",
    video: "videos/memory-04.mp4",
    layout: "layout-editorial"
  }
];

const finalLetter = [
  "Two years of memories, little moments, and a story that became a part of my life.",
  "Some things don't need a photograph to be remembered. Some words don't need to be spoken to be felt.",
  "And some memories will always have a place between these pages."
];

const toastMessages = [
  "A little moment worth keeping.",
  "Some memories never fade.",
  "A new page in our story.",
  "This moment deserves to stay.",
  "Two years, preserved through time."
];

const scenes = [...document.querySelectorAll(".scene")];
const startButton = document.getElementById("startButton");
const openCollection = document.getElementById("openCollection");
const codeDots = document.getElementById("codeDots");
const keypad = document.getElementById("keypad");
const codeFeedback = document.getElementById("codeFeedback");
const codeHint = document.getElementById("codeHint");
const memoryMount = document.getElementById("memoryMount");
const pageCounter = document.getElementById("pageCounter");
const progressBar = document.getElementById("progressBar");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const photoLightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

let enteredCode = "";
let currentMemory = 0;
let toastTimer = null;

codeHint.textContent = CODE_HINT;
buildDots();
buildKeypad();

function showScene(id) {
  scenes.forEach(scene => {
    scene.classList.toggle("scene-active", scene.id === id);
  });
  const active = document.getElementById(id);
  if (active) {
    const content = active.querySelector(".reveal");
    if (content) {
      content.classList.remove("reveal");
      void content.offsetWidth;
      content.classList.add("reveal");
    }
  }
}

startButton.addEventListener("click", () => {
  enteredCode = "";
  updateDots();
  codeFeedback.textContent = "";
  showScene("codeScene");
});

openCollection.addEventListener("click", () => {
  currentMemory = 0;
  renderMemory();
  showScene("book");
  showToast("A new page in our story.");
});

function buildDots() {
  codeDots.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement("span");
    dot.className = "code-dot";
    codeDots.appendChild(dot);
  }
}

function updateDots() {
  [...codeDots.children].forEach((dot, index) => dot.classList.toggle("filled", index < enteredCode.length));
}

function buildKeypad() {
  const keys = ["1","2","3","4","5","6","7","8","9","clear","0","back"];
  keypad.innerHTML = "";
  keys.forEach(key => {
    const button = document.createElement("button");
    button.className = "key";
    button.type = "button";
    button.textContent = key === "clear" ? "⌫" : key === "back" ? "←" : key;
    button.setAttribute("aria-label", key === "clear" ? "Clear all digits" : key === "back" ? "Delete last digit" : `Digit ${key}`);
    button.addEventListener("click", () => {
      if (key === "clear") enteredCode = "";
      else if (key === "back") enteredCode = enteredCode.slice(0, -1);
      else if (enteredCode.length < 8) enteredCode += key;
      updateDots();
      codeFeedback.textContent = "";
      if (enteredCode.length === 8) checkCode();
    });
    keypad.appendChild(button);
  });
}

document.getElementById("clearCode").addEventListener("click", () => {
  enteredCode = "";
  updateDots();
  codeFeedback.textContent = "";
});
document.getElementById("backspaceCode").addEventListener("click", () => {
  enteredCode = enteredCode.slice(0, -1);
  updateDots();
  codeFeedback.textContent = "";
});
document.getElementById("submitCode").addEventListener("click", checkCode);

function checkCode() {
  if (enteredCode.length !== 8) {
    codeFeedback.textContent = "Enter all eight digits.";
    return;
  }
  if (enteredCode === SECRET_CODE) {
    codeFeedback.textContent = "";
    showScene("welcome");
  } else {
    codeFeedback.textContent = "That isn't the code. Try again.";
    const card = document.querySelector(".code-card");
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    enteredCode = "";
    updateDots();
  }
}

function renderMemory() {
  const item = memories[currentMemory];
  memoryMount.innerHTML = `
    <article class="memory-page ${item.layout}">
      <div class="memory-visual">
        <button class="photo-frame" type="button" aria-label="View photo larger">
          <img class="memory-photo" src="${item.photo}" alt="${item.caption}" loading="lazy">
        </button>
        <div class="memory-video-wrap">
          <video class="memory-video" src="${item.video}" autoplay muted loop playsinline preload="metadata"></video>
          <div class="video-label"><span>MEMORY FILM</span><span>LOOP</span></div>
        </div>
      </div>
      <div class="memory-copy">
        <p class="eyebrow">${item.eyebrow}</p>
        <h2>${item.title}</h2>
        <p>${item.paragraph}</p>
        <p class="memory-caption">${item.caption}</p>
      </div>
    </article>
  `;
  const photoButton = memoryMount.querySelector(".photo-frame");
  const image = memoryMount.querySelector(".memory-photo");
  photoButton.addEventListener("click", () => openPhoto(image.src, image.alt));
  const video = memoryMount.querySelector(".memory-video");
  video.addEventListener("error", () => {
    video.poster = "";
    video.style.background = "linear-gradient(135deg,#20170e,#110d08)";
  });
  pageCounter.textContent = `${String(currentMemory + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
  progressBar.style.width = `${((currentMemory + 1) / memories.length) * 100}%`;
  prevPage.disabled = currentMemory === 0;
  prevPage.style.opacity = currentMemory === 0 ? ".35" : "1";
  nextPage.innerHTML = currentMemory === memories.length - 1 ? '<span>FINAL LETTER</span> →' : '<span>NEXT</span> →';
}

function stopActiveVideos() {
  document.querySelectorAll(".memory-video").forEach(video => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
}

function goNext() {
  stopActiveVideos();
  if (currentMemory < memories.length - 1) {
    currentMemory++;
    renderMemory();
    showToast(toastMessages[Math.floor(Math.random() * toastMessages.length)]);
  } else {
    showFinalLetter();
  }
}
function goPrevious() {
  if (currentMemory <= 0) return;
  stopActiveVideos();
  currentMemory--;
  renderMemory();
}
nextPage.addEventListener("click", goNext);
prevPage.addEventListener("click", goPrevious);

function showFinalLetter() {
  stopActiveVideos();
  const letterEl = document.getElementById("finalLetterText");
  letterEl.innerHTML = "";
  finalLetter.forEach((line, index) => {
    const span = document.createElement("span");
    span.className = "letter-line";
    span.textContent = line;
    span.style.animationDelay = `${0.45 + index * 1.05}s`;
    letterEl.appendChild(span);
  });
  showScene("finalPage");
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
}

function openPhoto(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Memory photo";
  photoLightbox.classList.add("open");
  photoLightbox.setAttribute("aria-hidden", "false");
}
function closePhoto() {
  photoLightbox.classList.remove("open");
  photoLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
closeLightbox.addEventListener("click", closePhoto);
photoLightbox.addEventListener("click", event => {
  if (event.target === photoLightbox) closePhoto();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePhoto();
});

// Simple swipe navigation on memory pages
let touchStartX = null;
memoryMount.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
memoryMount.addEventListener("touchend", event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 70) delta < 0 ? goNext() : goPrevious();
  touchStartX = null;
}, { passive: true });
