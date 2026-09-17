/* ==============================================================
   CONFIG — EDIT EVENT DETAILS HERE
   ============================================================== */
const CONFIG = {
  dinnerDate: "8 October 2026",
  dinnerTime: "7:00 PM",
  dinnerLocation: "To be revealed 2 days before",
  concertArtist: "BIGBANG",
  concertTour: "2026–2027 WORLD TOUR",
  concertTourName: "XX : COSMOS",
  concertCity: "Kuala Lumpur",
  concertDate: "9 January 2027",
  concertTime: "8:00 PM",
  concertVenue: "TM Stadium Nasional",
  concertTicketType: "PS1 Seated × 2"
};

// FINAL_BIRTHDAY_MESSAGE — edit the message between the backticks.
const FINAL_BIRTHDAY_MESSAGE = `Stay tuned to October 8th for more birthday surprise.

I hope you love everything I planned for you.

Love,
Sim Yee`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const scenes = $$(".scene");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentScene = 0;
let noPresses = 0;
let changingScene = false;

function showScene(nextIndex) {
  if (changingScene || nextIndex === currentScene || !scenes[nextIndex]) return;
  changingScene = true;
  const oldScene = scenes[currentScene];
  const newScene = scenes[nextIndex];
  oldScene.classList.add("exit-left");
  const finish = () => {
    oldScene.classList.remove("active", "exit-left");
    oldScene.setAttribute("aria-hidden", "true");
    currentScene = nextIndex;
    newScene.classList.add("active");
    newScene.removeAttribute("aria-hidden");
    newScene.scrollTop = 0;
    $("#progress-fill").style.width = `${10 + currentScene * 14}%`;
    changingScene = false;
    const heading = $("h1, h2", newScene);
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    if (currentScene === 5) sprinkle($("#concert-confetti"), 34, "confetti");
  };
  window.setTimeout(finish, reducedMotion ? 0 : 260);
}

function sprinkle(container, count, type = "heart") {
  if (!container) return;
  const colors = ["#ff6b9d", "#9b5cff", "#6ee7ff", "#ffe066", "#fffde1"];
  const total = reducedMotion ? Math.min(7, count) : count;
  for (let index = 0; index < total; index += 1) {
    const piece = document.createElement("span");
    piece.className = type === "confetti" ? "confetti-bit" : "heart-pop";
    if (type === "heart") piece.textContent = ["♥", "♡", "✦"][index % 3];
    piece.style.left = `${4 + Math.random() * 92}%`;
    piece.style.color = colors[index % colors.length];
    piece.style.backgroundColor = type === "confetti" ? colors[index % colors.length] : "transparent";
    piece.style.animationDelay = `${Math.random() * .55}s`;
    piece.style.animationDuration = `${1.7 + Math.random() * 1.2}s`;
    container.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3400);
  }
}

function fillConfiguredContent() {
  $("#dinner-date").textContent = CONFIG.dinnerDate;
  $("#dinner-time").textContent = CONFIG.dinnerTime;
  $("#dinner-location").textContent = CONFIG.dinnerLocation;
  $("#concert-tour").textContent = `${CONFIG.concertArtist} ${CONFIG.concertTour}`;
  $("#concert-name").textContent = CONFIG.concertTourName;
  $("#concert-city").textContent = CONFIG.concertCity;
  $("#concert-date").textContent = CONFIG.concertDate;
  $("#concert-venue").textContent = CONFIG.concertVenue;
  $("#concert-time").textContent = CONFIG.concertTime;
  $("#concert-ticket").textContent = CONFIG.concertTicketType;
  $("#final-message").textContent = FINAL_BIRTHDAY_MESSAGE;
}

$$('[data-next]').forEach(button => button.addEventListener("click", () => showScene(currentScene + 1)));

$("#no-button").addEventListener("click", event => {
  if (noPresses >= 3) { $("#yes-button").click(); return; }
  noPresses += 1;
  const button = event.currentTarget;
  const feedback = $("#dinner-feedback");
  if (noPresses === 1) feedback.textContent = "Wrong answer 😌";
  if (noPresses === 2) { feedback.textContent = "Nice try…"; button.classList.add("no-dodge"); }
  if (noPresses === 3) { feedback.textContent = "Okay, I fixed it for you ♡"; button.textContent = "Fine, yes ♡"; button.classList.remove("no-dodge"); }
});

$("#yes-button").addEventListener("click", () => {
  $("#dinner-feedback").textContent = "Reservation confirmed ♡";
  window.setTimeout(() => showScene(3), reducedMotion ? 150 : 800);
});

const wrongAnswers = ["Not this time 😌", "Again?! Be serious.", "Good guess… but nope."];
$$('[data-answer]').forEach(button => button.addEventListener("click", () => {
  const answer = Number(button.dataset.answer);
  if (answer === 3) { showScene(4); return; }
  $$(".answer-card").forEach(card => card.classList.remove("wrong"));
  button.classList.add("wrong");
  $("#guess-feedback").textContent = wrongAnswers[answer];
}));

$("#final-button").addEventListener("click", event => {
  sprinkle($("#final-confetti"), 28, "heart");
  $("#final-answer").textContent = "Correct answer 😌♡";
  event.currentTarget.disabled = true;
});

$("#restart-button").addEventListener("click", () => {
  $("#final-answer").textContent = "";
  $("#final-button").disabled = false;
  showScene(0);
});

fillConfiguredContent();
scenes.forEach((scene, index) => { if (index !== 0) scene.setAttribute("aria-hidden", "true"); });
$("#progress-fill").style.width = "10%";
