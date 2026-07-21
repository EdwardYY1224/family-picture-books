/* Ellie and the Busy Little Fingers — a gentle 16-page habit story. */
(function () {
  "use strict";

  const PAGES = [
    { en: "Ellie and the Busy Little Fingers.", zh: "Ellie 與忙碌的小手指。" },
    { en: "Ellie loved reading to Rainbow. Sometimes, while she listened to the story, one finger quietly slipped into her mouth. Nibble, nibble—Ellie did not even notice.", zh: "Ellie 喜歡念故事給彩虹聽。有時候，她聽故事聽得入神，一根手指會悄悄跑進嘴巴。咬呀咬——Ellie 自己都沒發現。" },
    { en: "That night, Ellie's little fingers had something to say. “We worked hard today,” whispered Thumb. “But the nibbling made us feel sore.”", zh: "那天晚上，Ellie 的小手指有話想說。拇指小聲說：「我們今天很努力，可是被咬得有一點痛。」" },
    { en: "Pointer Finger said, “We help you follow every picture.” Turn-the-Page Finger said, “We help your stories move!”", zh: "食指說：「我幫你指著每一幅圖。」翻頁手指說：「我幫故事繼續往下走！」" },
    { en: "The other fingers wiggled. “We build towers, make pizza, and give Rainbow gentle hugs. We have important jobs!”", zh: "其他手指動一動：「我們會蓋高塔、做披薩，也會溫柔地抱彩虹。我們有重要的工作！」" },
    { en: "Ellie's teeth peeked out with friendly smiles. “Teeth are for crunchy apples, warm bread, and yummy food. Fingers need gentle care.”", zh: "Ellie 的牙齒露出友善的笑容：「牙齒用來咬脆蘋果、暖麵包和好吃的食物。小手指需要被溫柔照顧。」" },
    { en: "The next morning, Ellie felt the nibbling feeling again. Her finger moved toward her mouth. This time, Ellie noticed.", zh: "第二天早上，Ellie 又出現想咬手指的感覺。手指慢慢靠近嘴巴——這一次，Ellie 注意到了。" },
    { en: "Rainbow's shiny black nose pointed toward her hands. He seemed to say, “Stop. Breathe. Give your hands a job.”", zh: "彩虹亮亮的小黑鼻子朝著她的手，像是在說：「停一下。吹口氣。讓小手換個工作。」" },
    { en: "Ellie put both hands on her tummy. In... and out. She blew three slow balloon breaths. The nibbling feeling became smaller.", zh: "Ellie 把雙手放在肚子上。吸氣……吐氣。她慢慢吹了三口氣，想咬手指的感覺變小了。" },
    { en: "Her hands needed a job, so Ellie gave Rainbow a big, gentle hug. “This feels better,” she said.", zh: "小手需要工作，Ellie 就溫柔地抱抱彩虹。「這樣感覺好多了。」她說。" },
    { en: "Later, while she waited, Ellie squeezed a soft ball. Squeeze, let go. Squeeze, let go. Her fingers stayed busy and safe.", zh: "後來，等待的時候，Ellie 捏著柔軟的小球。捏一捏、放開；捏一捏、放開。小手指忙碌又安全。" },
    { en: "At story time, Pointer Finger followed each picture. Turn-the-Page Finger carefully flipped each page. Rainbow listened.", zh: "故事時間，食指跟著每一幅圖，翻頁手指小心地翻過每一頁，彩虹在旁邊聽。" },
    { en: "When there was nothing to hold, Ellie rested her hands on her knees. “My fingers are sleeping,” she whispered.", zh: "沒有東西需要拿的時候，Ellie 把雙手放在膝蓋上。「我的小手指在睡覺。」她小聲說。" },
    { en: "Sometimes Ellie forgot. Nibble! Then she remembered. No one scolded her, and Ellie did not scold herself.", zh: "有時候 Ellie 還是會忘記。咬一下！接著她想起來了。沒有人責罵她，Ellie 也不責怪自己。" },
    { en: "She lowered her hand, took one breath, and chose a new job. “I noticed! I can try again.” Rainbow sat proudly beside her.", zh: "她把手放下、吹一口氣，再選一個新工作。「我注意到了！我可以再試一次。」彩虹驕傲地坐在旁邊。" },
    { en: "That night, Ellie held the book with gentle hands. “Teeth are for food. My fingers help me play!” Tomorrow, her busy little fingers would do many wonderful jobs.", zh: "那天晚上，Ellie 用溫柔的雙手拿著書。「牙齒用來吃東西，我的小手幫我玩！」明天，忙碌的小手指還要做好多美好的工作。" },
  ];

  const els = {
    illustration: document.querySelector("#illustration"),
    coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"),
    textBand: document.querySelector("#textBand"),
    storyEn: document.querySelector("#storyEn"),
    storyZh: document.querySelector("#storyZh"),
    speakButton: document.querySelector("#speakButton"),
    prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"),
    pageCount: document.querySelector("#pageCount"),
    pageDots: document.querySelector("#pageDots"),
    soundButton: document.querySelector("#soundButton"),
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };

  const state = { index: 0, sound: true, audio: null };

  function speak(text) {
    if (!state.sound || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("en"));
    utterance.voice = voices.find((voice) => /natural|online/i.test(voice.name) && voice.lang.toLowerCase().includes("us"))
      || voices.find((voice) => /natural|online|google/i.test(voice.name))
      || voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === "en-us")
      || voices[0] || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = () => els.speakButton.classList.remove("is-speaking");
    utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

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

  const audioSrc = (index) => (window.BOOK_AUDIO && window.BOOK_AUDIO[index])
    || `audio-busy-fingers/page-${String(index).padStart(2, "0")}.mp3`;

  function narrate(index) {
    stopNarration();
    if (!state.sound) return;
    const audio = new Audio(audioSrc(index));
    state.audio = audio;
    els.speakButton.classList.add("is-speaking");
    audio.onended = () => {
      els.speakButton.classList.remove("is-speaking");
      state.audio = null;
    };
    audio.onerror = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speak(PAGES[index].en);
    };
    audio.play().catch(() => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speak(PAGES[index].en);
    });
  }

  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }

  const illustrationSrc = (index) =>
    `assets/ellie-busy-fingers-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

  function renderIllustration(index) {
    const image = new Image();
    image.src = illustrationSrc(index);
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("error", () => {
      els.illustration.innerHTML = '<div style="aspect-ratio:3/2;display:grid;place-items:center;padding:24px;background:#fffaf0;color:#244f49;font-weight:800;line-height:1.5;text-align:center">Illustration is resting.<br>Please turn the page and try again.</div>';
    }, { once: true });
    els.illustration.replaceChildren(image);

    [index - 1, index + 1]
      .filter((pageIndex) => pageIndex >= 0 && pageIndex < PAGES.length)
      .forEach((pageIndex) => {
        const preload = new Image();
        preload.src = illustrationSrc(pageIndex);
      });
  }

  function render(index, silent) {
    state.index = index;
    const page = PAGES[index];
    renderIllustration(index);
    const isCover = index === 0;
    els.coverOverlay.hidden = !isCover;
    els.textBand.hidden = isCover;
    els.storyEn.textContent = page.en;
    els.storyZh.textContent = page.zh;
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0;
    els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dotEl, i) => {
      dotEl.classList.toggle("current", i === index);
      dotEl.classList.toggle("done", i < index);
    });
    if (isCover || silent) stopNarration();
    else narrate(index);
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
    els.soundButton.innerHTML = state.sound ? "🔊 <i>朗讀開</i>" : "🔇 <i>朗讀關</i>";
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
