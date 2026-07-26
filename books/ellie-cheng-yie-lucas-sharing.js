(function () {
  "use strict";
  const PAGES = [
    { zh: "Ellie、Cheng Yie 和 Lucas 的日月潭分享大冒險。", en: "Ellie, Cheng Yie, and Lucas's Sharing Adventure at Sun Moon Lake." },
    { zh: "有一天，爸爸、媽媽和阿嬤帶著 Ellie、哥哥 Cheng Yie 和弟弟 Lucas，一起到日月潭玩。今天，他們要玩一個分享遊戲！", en: "One day, Dad, Mom, and Grandma took Ellie, her big brother Cheng Yie, and little Lucas to Sun Moon Lake. Today they were going to play a sharing game!" },
    { zh: "Ellie 說：『我們每個人都來負責一樣東西吧！』三個孩子排排站，開心地領取自己的小任務。", en: "‘Let's each be in charge of something!’ said Ellie. The three children lined up and happily chose their little jobs." },
    { zh: "Ellie 抱著一籃花和玩具，一個一個分給大家。『這朵花送給你，這個玩具也借你玩！』", en: "Ellie carried a basket of flowers and toys and shared them one by one. ‘This flower is for you, and you can play with this toy!’" },
    { zh: "Lucas 負責分皮克敏糖果和棒棒糖。他伸出小手說：『一人一個，大家都有！』", en: "Lucas was in charge of the Pikmin sweets and lollipops. He held out his little hand. ‘One for each person. There is enough for everyone!’" },
    { zh: "哥哥 Cheng Yie 拿出吹泡泡的玩具。『準備好了嗎？』他輕輕一吹，大大小小的泡泡飛上天空。", en: "Big brother Cheng Yie brought out the bubble toys. ‘Ready?’ he asked. He blew gently, and bubbles big and small floated into the air." },
    { zh: "花朵、玩具、糖果和泡泡在大家手中交換。每個人都願意分享，快樂也變得越來越多！", en: "Flowers, toys, treats, and bubbles passed from hand to hand. Everyone shared, and their happiness grew bigger and bigger!" },
    { zh: "Ellie 又拿出三支彩色的玩具手機。她認真地介紹：『這是小朋友用的手機，我們一人一支！』", en: "Then Ellie brought out three colorful toy phones. ‘These are phones for children,’ she explained. ‘One for each of us!’" },
    { zh: "大人們在旁邊玩遊戲，Ellie 則開了一間玩具商店。盒子放水果和花盆，小桌子還變成了收銀台！", en: "The grown-ups played a game nearby while Ellie opened a pretend shop. A box held fruit and a flowerpot, and the little table became a checkout counter!" },
    { zh: "大家在日月潭玩了好久、好久。Ellie 打了一個大呵欠，揉揉眼睛說：『我好像有一點想睡覺了。』", en: "They played at Sun Moon Lake for a long, long time. Ellie gave a big yawn and rubbed her eyes. ‘I think I am getting a little sleepy.’" },
    { zh: "可是一看見兒童玩具車，三個孩子又有精神了！Cheng Yie 和 Lucas 選了帥氣的車，Ellie 選了一輛漂亮的車。", en: "But when the children saw the ride-on cars, their energy came back! Cheng Yie and Lucas chose cool cars, and Ellie chose a pretty one." },
    { zh: "『出發！』三輛小車慢慢向前。哥哥看著前方，弟弟開心得大笑，Ellie 也小心地轉動方向盤。爸爸媽媽就在旁邊陪著。", en: "‘Let's go!’ Three little cars rolled slowly forward. Cheng Yie looked ahead, Lucas laughed, and Ellie turned her wheel carefully. Dad and Mom stayed close by." },
    { zh: "玩累了，大家回到房間。媽媽整理衣服，三個孩子把玩具收好，排隊刷牙、洗臉和洗澡。", en: "Tired from playing, everyone went back to the room. Mom folded the clothes while the three children put away their toys, brushed their teeth, washed, and got ready for bed." },
    { zh: "Cheng Yie、Ellie 和 Lucas 躺進軟綿綿的床。Ellie 小聲說：『今天我們分享了好多東西。』不久，三個孩子都甜甜地睡著了。", en: "Cheng Yie, Ellie, and Lucas snuggled into the soft beds. ‘We shared so many things today,’ Ellie whispered. Soon, all three children were fast asleep." },
    { zh: "第二天，大家一起搭纜車看風景。纜車越升越高，日月潭像一面藍綠色的大鏡子。Cheng Yie 有點擔心：『我們還回得去嗎？』", en: "The next day, everyone rode the cable car. As it climbed higher, Sun Moon Lake looked like a blue-green mirror. Cheng Yie felt a little worried. ‘Will we be able to get back?’" },
    { zh: "媽媽說：『會呀，纜車會帶我們回去。』爸爸也陪在旁邊。Cheng Yie 放下心來，和 Ellie、Lucas 一起看風景。最後，全家人開開心心地回家了。", en: "‘Yes. The cable car will take us back,’ Mom said, with Dad close beside them. Cheng Yie felt safe again and enjoyed the view with Ellie and Lucas. Then the whole family went happily home." },
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
  const illustrationSrc = (index) => embeddedAssets?.images?.[index] || `assets/ellie-cheng-yie-lucas-sharing-warm-folk/page-${pageId(index)}.webp`;
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
    const folder = state.lang === "zh" ? "audio-sharing-adventure-zh" : "audio-sharing-adventure";
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
