(function () {
  "use strict";
  const PAGES = [
    "Lucas's Hualien Summer.",
    "Summer sparkled in Hualien. The sun shone bright, and the sky was blue. Lucas was going to see the sea!",
    "Across the gray pebble beach, Lucas saw a great stretch of blue. ‘Sea!’ The water reached all the way to the sky.",
    "A wave rose in the distance. Whoosh—whoosh! A white, foamy wave hurried toward the shore.",
    "The wave came in, then slipped away. Lucas waved his little hand. ‘Bye, wave! See you soon!’",
    "Qixingtan had round pebbles instead of soft sand. Lucas found one big pebble—and one little pebble.",
    "The sun climbed higher. Lucas's hair felt warm, and a tiny bead of sweat appeared on his nose. ‘Let's go play with water!’",
    "A big red water tub waited in the yard. Lucas stepped into the cool water. Ahh—so nice!",
    "Cousin lifted a cup of water. Drip, drip, splash! Cool water fell on Lucas's head, and his smiling eyes curved like little moons.",
    "Lucas patted the water. Pat! Pat! Pat! Cousin patted too. Tiny waves jumped and danced in both tubs.",
    "That night, Lucas snuggled into his soft bed. Whoosh—whoosh. The sea had big waves, the tubs had little waves, and his dream held a bright blue summer.",
    "Good night, Hualien summer.",
  ];
  const els = {
    illustration: document.querySelector("#illustration"), coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"), textBand: document.querySelector("#textBand"),
    storyText: document.querySelector("#storyText"), speakButton: document.querySelector("#speakButton"),
    prevButton: document.querySelector("#prevButton"), nextButton: document.querySelector("#nextButton"),
    pageCount: document.querySelector("#pageCount"), pageDots: document.querySelector("#pageDots"),
    soundButton: document.querySelector("#soundButton"), tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"), tipsClose: document.querySelector("#tipsClose"),
  };
  const state = { index: 0, sound: true, audio: null };
  const illustrationSrc = (index) => `assets/lucas-hualien-summer-warm-folk/page-${String(index).padStart(2, "0")}.webp`;
  function stopNarration() {
    if (state.audio) {
      state.audio.onended = null;
      state.audio.onerror = null;
      state.audio.pause();
      state.audio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    els.speakButton.classList.remove("is-speaking");
  }
  function speakFallback(index) {
    stopNarration();
    if (!state.sound || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(PAGES[index]);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("en"));
    utterance.voice = voices.find((voice) => /natural|online/i.test(voice.name) && voice.lang.toLowerCase().includes("us"))
      || voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === "en-us") || voices[0] || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }
  function narrate(index) {
    stopNarration();
    if (!state.sound) return;
    const audio = new Audio(`audio-lucas-hualien-en/page-${String(index).padStart(2, "0")}.mp3`);
    state.audio = audio;
    els.speakButton.classList.add("is-speaking");
    audio.onended = () => { state.audio = null; els.speakButton.classList.remove("is-speaking"); };
    audio.onerror = () => { state.audio = null; els.speakButton.classList.remove("is-speaking"); speakFallback(index); };
    audio.play().catch(() => { state.audio = null; els.speakButton.classList.remove("is-speaking"); speakFallback(index); });
  }
  function renderIllustration(index) {
    const image = new Image();
    image.src = illustrationSrc(index);
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("error", () => {
      els.illustration.innerHTML = '<div style="aspect-ratio:3/2;display:grid;place-items:center;padding:24px;background:#fffaf0;color:#244f49;font-weight:800">The illustration is resting. Please try again.</div>';
    }, { once: true });
    els.illustration.replaceChildren(image);
    [index - 1, index + 1].filter((i) => i >= 0 && i < PAGES.length).forEach((i) => {
      const preload = new Image(); preload.src = illustrationSrc(i);
    });
  }
  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }
  function render(index, silent = false) {
    state.index = index;
    renderIllustration(index);
    const isCover = index === 0;
    els.coverOverlay.hidden = !isCover;
    els.textBand.hidden = isCover;
    els.storyText.textContent = PAGES[index];
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0;
    els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dot, i) => {
      dot.classList.toggle("current", i === index);
      dot.classList.toggle("done", i < index);
    });
    if (isCover || silent) stopNarration(); else narrate(index);
  }
  function go(delta) {
    const next = Math.min(PAGES.length - 1, Math.max(0, state.index + delta));
    if (next !== state.index) render(next);
  }
  els.startButton.addEventListener("click", () => render(1));
  els.prevButton.addEventListener("click", () => go(-1));
  els.nextButton.addEventListener("click", () => go(1));
  els.speakButton.addEventListener("click", () => narrate(state.index));
  els.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    els.soundButton.innerHTML = state.sound ? "🔊 <i>Sound on</i>" : "🔇 <i>Sound off</i>";
    els.soundButton.setAttribute("aria-pressed", String(state.sound));
    if (!state.sound) stopNarration();
  });
  els.tipsButton.addEventListener("click", () => { els.tipsOverlay.hidden = false; });
  els.tipsClose.addEventListener("click", () => { els.tipsOverlay.hidden = true; });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  });
  window.addEventListener("pagehide", stopNarration);
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  buildDots();
  render(0, true);
})();
