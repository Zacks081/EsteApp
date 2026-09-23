const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");
const loadingMessages = ["Conectando...", "Recopilando los mejores momentos...", "Desencriptando sentimientos...", "Preparando pregunta importante..."];
const SHOW_LOADER = true;

if (SHOW_LOADER) {
  let msgIndex = 0;
  const msgInterval = setInterval(() => {
    msgIndex++;
    if (msgIndex < loadingMessages.length) {
      loaderText.innerText = loadingMessages[msgIndex];
    }
  }, 1200);

  setTimeout(() => {
    clearInterval(msgInterval);
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 4500);
} else {
  loader.style.display = "none";
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".timeline-item").forEach((item) => observer.observe(item));

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-turning")) return;

    card.classList.add("is-turning");
    setTimeout(() => {
      card.classList.toggle("flipped");
      card.classList.remove("is-turning");
    }, 320);
  });
});

const btnNo = document.getElementById("btnNo");
const btnContainer = document.getElementById("btn-container");
const noFeedback = document.getElementById("noFeedback");
const yesButtons = document.querySelectorAll(".btn-yes");

const moveButton = () => {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  if (isMobile) {
    btnNo.style.position = "absolute";
    btnNo.style.transform = "none";
    return;
  }

  btnNo.style.position = "absolute";
  const containerWidth = btnContainer.clientWidth;
  const btnWidth = btnNo.offsetWidth;
  const randomX = Math.random() * (containerWidth - btnWidth - 20) - (containerWidth / 2 - btnWidth / 2 - 10);
  const randomY = Math.random() * 120 - 50;
  btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
};

btnNo.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveButton();
  noFeedback.classList.add("show");
});

btnNo.addEventListener("mouseover", () => {
  moveButton();
});

btnNo.addEventListener("click", (event) => {
  event.preventDefault();
  moveButton();
  noFeedback.classList.add("show");
});

const successMessage = document.getElementById("success-message");

yesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    successMessage.style.display = "flex";
    noFeedback.classList.remove("show");

    if (window.confetti) {
      const duration = 3000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#F7D8E7", "#EF6CA7", "#FFFFFF", "#F8D9A9"],
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#F7D8E7", "#EF6CA7", "#FFFFFF", "#F8D9A9"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  });
});
