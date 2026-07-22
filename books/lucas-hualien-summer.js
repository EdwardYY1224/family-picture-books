(function () {
  "use strict";
  const PAGES = [
    { zh: "Lucas 的花蓮夏天。", en: "Lucas's Hualien Summer." },
    { zh: "花蓮的夏天，太陽亮晶晶，天空藍又藍。Lucas 要去看大海了！", en: "Summer sparkled in Hualien. The sun shone bright, and the sky was blue. Lucas was going to see the sea!" },
    { zh: "走過灰灰的石頭灘，Lucas 看見一大片藍色。『海——！』大海一直延伸到天空下面。", en: "Across the gray pebble beach, Lucas saw a great stretch of blue. ‘Sea!’ The water reached all the way to the sky." },
    { zh: "遠遠的海浪鼓起來。嘩啦——嘩啦——一朵白白的浪花跑向岸邊。", en: "A wave rose in the distance. Whoosh—whoosh! A white, foamy wave hurried toward the shore." },
    { zh: "浪花來了，又退回去。Lucas 揮揮小手：『海浪，再見！等一下見！』", en: "The wave came in, then slipped away. Lucas waved his little hand. ‘Bye, wave! See you soon!’" },
    { zh: "七星潭沒有軟軟的沙，到處都是圓圓的石頭。Lucas 找到一顆大的，又找到一顆小的。", en: "Qixingtan had round pebbles instead of soft sand. Lucas found one big pebble—and one little pebble." },
    { zh: "太陽越爬越高。Lucas 的頭髮熱熱的，鼻尖也冒出小汗珠。『回去玩水吧！』", en: "The sun climbed higher. Lucas's hair felt warm, and a tiny bead of sweat appeared on his nose. ‘Let's go play with water!’" },
    { zh: "院子裡有紅紅的大水盆。Lucas 踏進涼涼的水裡。啊——真舒服！", en: "A big red water tub waited in the yard. Lucas stepped into the cool water. Ahh—so nice!" },
    { zh: "表哥舀起一瓢水。滴答、滴答、嘩啦啦！清涼的水落在 Lucas 頭上，他笑得眼睛彎彎的。", en: "Cousin lifted a cup of water. Drip, drip, splash! Cool water fell on Lucas's head, and his smiling eyes curved like little moons." },
    { zh: "Lucas 拍拍水。啪！啪！啪！表哥也拍拍水。兩個水盆裡，跳出好多小小的海浪。", en: "Lucas patted the water. Pat! Pat! Pat! Cousin patted too. Tiny waves jumped and danced in both tubs." },
    { zh: "晚上，Lucas 躺進柔軟的小床。嘩啦——嘩啦——大海有大浪，水盆有小浪，夢裡有一片藍藍的夏天。", en: "That night, Lucas snuggled into his soft bed. Whoosh—whoosh. The sea had big waves, the tubs had little waves, and his dream held a bright blue summer." },
    { zh: "晚安，花蓮的夏天。", en: "Good night, Hualien summer." },
  ];
  const els = {
    illustration: document.querySelector("#illustration"), coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"), textBand: document.querySelector("#textBand"),
    storyEn: document.querySelector("#storyEn"), storyZh: document.querySelector("#storyZh"),
    speakButton: document.querySelector("#speakButton"), prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"), pageCount: document.querySelector("#pageCount"),
    pageDots: document.querySelector("#pageDots"), soundButton: document.querySelector("#soundButton"),
    languageButton: document.querySelector("#languageButton"),
    tipsButton: document.querySelector("#tipsButton"), tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };
  const state = { index: 0, sound: true, audio: null, lang: new URLSearchParams(location.search).get("lang") || localStorage.getItem("picture-book-language") || "zh" };
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
    const utterance = new SpeechSynthesisUtterance(PAGES[index][state.lang]);
    utterance.lang = state.lang === "zh" ? "zh-TW" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.78 : 0.82;
    utterance.pitch = state.lang === "zh" ? 1.08 : 1.05;
    const voices = window.speechSynthesis.getVoices();
    const prefix = state.lang === "zh" ? "zh" : "en";
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith(prefix)) || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }
  function narrate(index) {
    stopNarration();
    if (!state.sound) return;
    const folder = state.lang === "zh" ? "audio-lucas-hualien" : "audio-lucas-hualien-en";
    const audio = new Audio(`${folder}/page-${String(index).padStart(2, "0")}.mp3`);
    state.audio = audio;
    els.speakButton.classList.add("is-speaking");
    audio.onended = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
    };
    audio.onerror = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speakFallback(index);
    };
    audio.play().catch(() => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speakFallback(index);
    });
  }
  function renderIllustration(index) {
    const image = new Image();
    image.src = illustrationSrc(index);
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("error", () => {
      els.illustration.innerHTML = '<div style="aspect-ratio:3/2;display:grid;place-items:center;padding:24px;background:#fffaf0;color:#244f49;font-weight:800">插圖正在休息，請再試一次。</div>';
    }, { once: true });
    els.illustration.replaceChildren(image);
    [index - 1, index + 1].filter((i) => i >= 0 && i < PAGES.length).forEach((i) => {
      const preload = new Image();
      preload.src = illustrationSrc(i);
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
    els.storyZh.textContent = PAGES[index].zh;
    els.storyEn.textContent = PAGES[index].en;
    els.storyZh.hidden = state.lang !== "zh";
    els.storyEn.hidden = state.lang !== "en";
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
  els.languageButton.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    localStorage.setItem("picture-book-language", state.lang);
    els.languageButton.textContent = state.lang === "zh" ? "EN" : "中文";
    els.languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切換成中文");
    render(state.index, true);
    if (state.index > 0 && state.sound) narrate(state.index);
  });
  els.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    els.soundButton.innerHTML = state.sound ? "🔊 <i>聲音開</i>" : "🔇 <i>聲音關</i>";
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
  els.languageButton.textContent = state.lang === "zh" ? "EN" : "中文";
  els.languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切換成中文");
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  render(0, true);
})();
