(function () {
  "use strict";
  const PAGES = [
    { zh: "Ellie 和 Lucas 的日月潭飯店大冒險。", en: "Ellie and Lucas's Sun Moon Lake Hotel Adventure." },
    { zh: "我們來到日月潭伊達邵，住進一間好大、好棒的溫泉飯店。爸爸、媽媽、Ellie、Lucas，還有阿嬤，五個人一起出發！", en: "We arrived in Ita Thao at Sun Moon Lake and checked into a wonderful hot-spring hotel. Dad, Mom, Ellie, Lucas, and Grandma were all on an adventure together!" },
    { zh: "這是 Ellie 和 Lucas 第一次一起住飯店。房間裡有軟軟的大床、蓬蓬的枕頭，還有好多事情等著他們去玩。", en: "It was Ellie and Lucas's first hotel stay together. The room had a big soft bed, fluffy pillows, and so many things waiting to be explored." },
    { zh: "第一站是兒童泳池！Ellie 坐進泳圈，Lucas 踏進淺淺的水。媽媽就在伸手可及的地方，泳池冒險開始了！", en: "Their first stop was the children's pool! Ellie climbed into her swim ring, and Lucas stepped into the shallow water. Mom stayed within arm's reach as their pool adventure began." },
    { zh: "Lucas 啪啪啪地拍水，小水花跳了起來。他笑得眼睛彎彎，Ellie 也跟著笑。整座泳池都是他們快樂的聲音。", en: "Lucas patted the water—pat, pat, pat—and little splashes jumped up. His eyes curved with laughter, and Ellie laughed too. Their happy voices filled the pool." },
    { zh: "接著，Ellie 第一次開兒童電動車。方向盤一下向左、一下向右，車子歪歪地走。媽媽陪在旁邊說：『慢慢來，再試一次。』", en: "Next, Ellie drove a children's electric car for the first time. The wheel turned left, then right, and the little car wobbled along. Mom walked beside her and said, ‘Take it slowly. Try again.’" },
    { zh: "Ellie 開了一圈，又開一圈。她看前面、輕輕轉、慢慢走，越開越穩，也越開越棒。大家一起為她拍手！", en: "Ellie drove one lap, and then another. She looked ahead, turned gently, and moved slowly. She became steadier and better each time, while everyone cheered!" },
    { zh: "Lucas 也坐進小車車。爸爸走在旁邊保護他，車子慢慢向前。Lucas 笑得好大聲：『再一次！』", en: "Lucas climbed into a little car too. Dad walked beside him to keep him safe as the car rolled slowly forward. Lucas laughed out loud. ‘Again!’" },
    { zh: "晚上，一家人穿好泳裝，在房間的溫泉浴池裡泡在一起。暖暖的水冒著白白的蒸氣，五個人的笑聲也暖暖的。", en: "That evening, everyone put on their swimsuits and soaked together in the room's hot-spring bath. Soft steam rose from the warm water, and the laughter of all five felt warm too." },
    { zh: "Ellie 和 Lucas 覺得旁邊的冷池最有趣。他們舀水、拍拍小波浪，玩了好久，笑得好大聲。大人一直在旁邊陪著。", en: "Ellie and Lucas thought the cool pool was the most interesting. They poured water, patted tiny ripples, and played for a long time, laughing loudly while the grown-ups stayed close." },
    { zh: "玩了一整天，大家躺進飯店的床。窗外的月亮照著日月潭。這是他們第一次一起住飯店，也是甜甜的一晚。", en: "After a full day of fun, everyone settled into the hotel beds. Outside the window, the moon shone over Sun Moon Lake. Their first hotel night together was a very sweet one." },
    { zh: "早上，Ellie 睜開眼睛，第一句話就告訴媽媽：『我以後還要來這間飯店玩，太好玩了！』大家笑著約好：下次再來！", en: "In the morning, Ellie opened her eyes and immediately told Mom, ‘I want to come back to this hotel. It was so much fun!’ Everyone smiled and agreed: they would return another day." },
  ];
  const els = {
    illustration: document.querySelector("#illustration"), coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"), textBand: document.querySelector("#textBand"),
    storyEn: document.querySelector("#storyEn"), storyZh: document.querySelector("#storyZh"),
    speakButton: document.querySelector("#speakButton"), prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"), pageCount: document.querySelector("#pageCount"),
    pageDots: document.querySelector("#pageDots"), soundButton: document.querySelector("#soundButton"),
    languageButton: document.querySelector("#languageButton"), tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"), tipsClose: document.querySelector("#tipsClose"),
  };
  const requestedLang = new URLSearchParams(location.search).get("lang");
  const embeddedAssets = window.__BOOK_ASSETS__ || null;
  const state = { index: 0, sound: true, audio: null, lang: requestedLang === "en" || requestedLang === "zh" ? requestedLang : (localStorage.getItem("picture-book-language") || "zh") };
  const pageId = (index) => String(index).padStart(2, "0");
  const illustrationSrc = (index) => embeddedAssets?.images?.[index] || `assets/ellie-lucas-sun-moon-lake-warm-folk/page-${pageId(index)}.webp`;
  function stopNarration() {
    if (state.audio) { state.audio.onended = null; state.audio.onerror = null; state.audio.pause(); state.audio = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    els.speakButton.classList.remove("is-speaking");
  }
  function speakFallback(index) {
    stopNarration();
    if (!state.sound || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(PAGES[index][state.lang]);
    utterance.lang = state.lang === "zh" ? "zh-TW" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.78 : 0.82; utterance.pitch = state.lang === "zh" ? 1.08 : 1.05;
    const prefix = state.lang === "zh" ? "zh" : "en";
    utterance.voice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith(prefix)) || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }
  function narrate(index) {
    stopNarration(); if (!state.sound) return;
    const folder = state.lang === "zh" ? "audio-sun-moon-lake-zh" : "audio-sun-moon-lake";
    const audioSrc = embeddedAssets?.audio?.[state.lang]?.[index] || `${folder}/page-${pageId(index)}.mp3`;
    const audio = new Audio(audioSrc); state.audio = audio;
    els.speakButton.classList.add("is-speaking");
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
  function updateLanguageUi() {
    els.languageButton.textContent = state.lang === "zh" ? "EN" : "中文";
    els.languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切換成中文");
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  }
  function render(index, silent = false) {
    state.index = index; renderIllustration(index); const isCover = index === 0;
    els.coverOverlay.hidden = !isCover; els.textBand.hidden = isCover;
    els.storyZh.textContent = PAGES[index].zh; els.storyEn.textContent = PAGES[index].en;
    els.storyZh.hidden = state.lang !== "zh"; els.storyEn.hidden = state.lang !== "en";
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0; els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dot, i) => { dot.classList.toggle("current", i === index); dot.classList.toggle("done", i < index); });
    if (isCover || silent) stopNarration(); else narrate(index);
  }
  function go(delta) { const next = Math.min(PAGES.length - 1, Math.max(0, state.index + delta)); if (next !== state.index) render(next); }
  els.startButton.addEventListener("click", () => render(1)); els.prevButton.addEventListener("click", () => go(-1)); els.nextButton.addEventListener("click", () => go(1));
  els.speakButton.addEventListener("click", () => narrate(state.index));
  els.languageButton.addEventListener("click", () => { state.lang = state.lang === "zh" ? "en" : "zh"; localStorage.setItem("picture-book-language", state.lang); updateLanguageUi(); render(state.index, true); if (state.index > 0 && state.sound) narrate(state.index); });
  els.soundButton.addEventListener("click", () => { state.sound = !state.sound; els.soundButton.innerHTML = state.sound ? "🔊 <i>聲音開</i>" : "🔇 <i>聲音關</i>"; els.soundButton.setAttribute("aria-pressed", String(state.sound)); if (!state.sound) stopNarration(); });
  els.tipsButton.addEventListener("click", () => { els.tipsOverlay.hidden = false; }); els.tipsClose.addEventListener("click", () => { els.tipsOverlay.hidden = true; });
  document.addEventListener("keydown", (event) => { if (event.key === "ArrowRight") go(1); if (event.key === "ArrowLeft") go(-1); });
  window.addEventListener("pagehide", stopNarration); if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  PAGES.forEach(() => els.pageDots.append(document.createElement("span"))); updateLanguageUi(); render(0, true);
})();
