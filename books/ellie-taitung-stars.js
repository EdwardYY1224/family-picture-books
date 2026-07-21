(function () {
  "use strict";
  const PAGES = [
    { zh: "Ellie 的台東星星旅行。", en: "Ellie's Taitung Starry Adventure." },
    { zh: "大屋子裡，好多聲音在笑。爸爸拿好帽子，媽媽背起小包包。Ellie 開心地說：『我們要去台東玩了！』", en: "The big house was full of laughter. Dad picked up his hat, and Mom put on her little bag. Ellie cheered, ‘We are going to have fun in Taitung!’" },
    { zh: "都歷的海邊亮晶晶。天空好藍，海水也好藍。Ellie 脫下拖鞋，小腳踩進濕濕的沙。『涼涼的！』", en: "Duli Beach sparkled brightly. The sky was so blue, and the sea was blue too. Ellie took off her slippers and pressed her little feet into the wet sand. ‘It feels so cool!’" },
    { zh: "沙灘上有一個小洞。Ellie 蹲下來，安安靜靜地等。一隻小螃蟹探出眼睛：『是誰來看我呀？』", en: "There was a tiny hole in the sand. Ellie crouched down and waited very quietly. A little crab peeked out and wondered, ‘Who has come to visit me?’" },
    { zh: "旁邊的小石頭忽然動了一下。原來是一隻寄居蟹，背著圓圓的小房子慢慢走。Ellie 跟著牠，一步、一步、一步。", en: "Suddenly, a little stone nearby began to move. It was a hermit crab, slowly walking with its round little house on its back. Ellie followed it—one step, another step, and one more step." },
    { zh: "爸爸說：『我們可以輕輕看看牠。』媽媽說：『看完，就送牠回家。』Ellie 張開小手，小螃蟹快快地跑回沙灘。", en: "Dad said, ‘We can take a gentle look.’ Mom said, ‘When we are finished, we will send it home.’ Ellie opened her hands, and the little crab hurried back across the beach." },
    { zh: "濕濕的沙上，有一點粉紅色。Ellie 撿起來一看——是一個細細長長的漂亮空貝殼！『好像海送給我的小禮物。』", en: "There was a tiny spot of pink in the wet sand. Ellie picked it up and looked closely. It was a beautiful, slender, empty shell! ‘It is like a little present from the sea,’ she said." },
    { zh: "太陽回家以後，大家也回到大屋子。有人說故事，有人吃水果，有人笑得停不下來。Ellie 把小螃蟹的故事，講了一次，又講一次。", en: "After the sun went home, everyone returned to the big house. Some people told stories, some ate fruit, and some could not stop laughing. Ellie told her little crab story once, and then told it all over again." },
    { zh: "夜晚，大家走到屋外。Ellie 抬起頭。一顆、兩顆、三顆……『天空裡有好多亮晶晶的小燈！』", en: "At night, everyone walked outside. Ellie looked up. One star, two stars, three stars… ‘There are so many sparkling little lights in the sky!’" },
    { zh: "一隻紫色拖鞋滑了一下。咻——它掉到屋頂邊邊，安安靜靜地躺著。爸爸說：『別擔心，明天大人會把它拿回來。』", en: "One purple slipper slipped onto the roof edge. Dad said an adult would safely retrieve it tomorrow." },
    { zh: "Ellie 睡著以後，小拖鞋獨自在屋頂看星星。星光一點一點落下來，落在鞋尖，落在鞋面。小拖鞋吸飽了亮晶晶的快樂能量。", en: "After Ellie fell asleep, the little slipper watched the stars alone from the roof. Starlight drifted down, bit by bit—onto its toe and across its top. The little slipper filled itself with sparkling, happy energy." },
    { zh: "隔天，大人把拖鞋安全地拿回來。Ellie 穿上它，覺得腳底暖暖的。原來海邊的風、大屋子的笑聲和滿天星光，都跟著 Ellie 回家了。", en: "The next day, an adult safely brought the slipper back. Ellie put it on and felt a gentle warmth beneath her feet. The sea breeze, the laughter in the big house, and the sky full of stars had all come home with Ellie." },
  ];
  const els = {
    illustration: document.querySelector("#illustration"), coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"), textBand: document.querySelector("#textBand"),
    storyEn: document.querySelector("#storyEn"), storyZh: document.querySelector("#storyZh"),
    speakButton: document.querySelector("#speakButton"), prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"), pageCount: document.querySelector("#pageCount"),
    pageDots: document.querySelector("#pageDots"), soundButton: document.querySelector("#soundButton"),
    tipsButton: document.querySelector("#tipsButton"), tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };
  const state = { index: 0, sound: true, audio: null };
  const pageId = (index) => String(index).padStart(2, "0");
  const illustrationSrc = (index) => `assets/ellie-taitung-stars-warm-folk/page-${pageId(index)}.webp`;
  function stopNarration() {
    if (state.audio) { state.audio.onended = null; state.audio.onerror = null; state.audio.pause(); state.audio = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    els.speakButton.classList.remove("is-speaking");
  }
  function speakFallback(index) {
    stopNarration();
    if (!state.sound || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(PAGES[index].en);
    utterance.lang = "en-US"; utterance.rate = 0.82; utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("en-us"))
      || voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }
  function narrate(index) {
    stopNarration();
    if (!state.sound) return;
    const audio = new Audio(`audio-ellie-taitung/page-${pageId(index)}.mp3`);
    state.audio = audio; els.speakButton.classList.add("is-speaking");
    audio.onended = () => { state.audio = null; els.speakButton.classList.remove("is-speaking"); };
    audio.onerror = () => { state.audio = null; els.speakButton.classList.remove("is-speaking"); speakFallback(index); };
    audio.play().catch(() => { state.audio = null; els.speakButton.classList.remove("is-speaking"); speakFallback(index); });
  }
  function renderIllustration(index) {
    const image = new Image(); image.src = illustrationSrc(index); image.alt = ""; image.decoding = "async"; image.draggable = false;
    image.addEventListener("error", () => { els.illustration.innerHTML = '<div style="aspect-ratio:3/2;display:grid;place-items:center;padding:24px;background:#fffaf0;color:#244f49;font-weight:800">插圖準備中，請稍後再試。</div>'; }, { once: true });
    els.illustration.replaceChildren(image);
    [index - 1, index + 1].filter((i) => i >= 0 && i < PAGES.length).forEach((i) => { const preload = new Image(); preload.src = illustrationSrc(i); });
  }
  function buildDots() { els.pageDots.replaceChildren(); PAGES.forEach(() => els.pageDots.append(document.createElement("span"))); }
  function render(index, silent = false) {
    state.index = index; renderIllustration(index);
    const isCover = index === 0; els.coverOverlay.hidden = !isCover; els.textBand.hidden = isCover;
    els.storyZh.textContent = PAGES[index].zh; els.storyEn.textContent = PAGES[index].en;
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0; els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dot, i) => { dot.classList.toggle("current", i === index); dot.classList.toggle("done", i < index); });
    if (isCover || silent) stopNarration(); else narrate(index);
  }
  function go(delta) { const next = Math.min(PAGES.length - 1, Math.max(0, state.index + delta)); if (next !== state.index) render(next); }
  els.startButton.addEventListener("click", () => render(1)); els.prevButton.addEventListener("click", () => go(-1)); els.nextButton.addEventListener("click", () => go(1));
  els.speakButton.addEventListener("click", () => narrate(state.index));
  els.soundButton.addEventListener("click", () => { state.sound = !state.sound; els.soundButton.innerHTML = state.sound ? "🔊 <i>聲音開</i>" : "🔇 <i>聲音關</i>"; els.soundButton.setAttribute("aria-pressed", String(state.sound)); if (!state.sound) stopNarration(); });
  els.tipsButton.addEventListener("click", () => { els.tipsOverlay.hidden = false; }); els.tipsClose.addEventListener("click", () => { els.tipsOverlay.hidden = true; });
  document.addEventListener("keydown", (event) => { if (event.key === "ArrowRight") go(1); if (event.key === "ArrowLeft") go(-1); });
  window.addEventListener("pagehide", stopNarration); if ("speechSynthesis" in window) window.speechSynthesis.getVoices(); buildDots(); render(0, true);
})();
