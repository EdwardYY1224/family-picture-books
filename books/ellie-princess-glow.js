/* Ellie's Princess Glow — a gentle bilingual 16-page story created by Sarah. */
(function () {
  "use strict";

  const PAGES = [
    { en: "Ellie's Princess Glow — a story by Sarah, Ellie's mom.", zh: "Ellie 的公主光芒——Ellie 的媽媽 Sarah 創作。" },
    { en: "Ellie loved looking at beautiful princesses in storybooks. Their dresses shimmered, and their smiles seemed to light up every page.", zh: "Ellie 喜歡看故事書裡漂亮的公主。她們的洋裝閃閃發亮，笑容彷彿照亮了每一頁。" },
    { en: "When Ellie looked in the mirror, she noticed her two big front teeth and her softly round nose. Sometimes she wished they looked different.", zh: "Ellie 照鏡子時，看見自己兩顆大大的門牙和圓圓的鼻子。有時候，她希望它們能不一樣。" },
    { en: "Most of all, Ellie admired an ice queen with flowing golden-white hair and great big round eyes. “I wish I could glow like her,” Ellie thought.", zh: "Ellie 最羨慕一位冰雪女王。她有飄逸的金白色長髮，還有又大又圓的眼睛。Ellie 想：「真希望我也能像她一樣閃閃發亮。」" },
    { en: "That night, Ellie tucked her wish close to her heart and drifted into a moonlit dream.", zh: "那天晚上，Ellie 把願望放在心裡，慢慢走進灑滿月光的夢。" },
    { en: "A kind fairy grandmother appeared in a sprinkle of stars. “Hello, Ellie,” she said. “What does your heart wish for?”", zh: "一位溫柔的仙女奶奶伴著星光出現了。「Ellie，妳好呀，」她說，「妳的心許了什麼願望呢？」" },
    { en: "“I want to be as beautiful as the ice queen,” Ellie said. “I want her wonderful hair and her great big eyes!”", zh: "「我想變得像冰雪女王一樣漂亮，」Ellie 說，「我想要她美麗的長髮，還有又大又圓的眼睛！」" },
    { en: "The fairy grandmother smiled. “I will not change your face. Real princess magic begins when you care for the wonderful you who is already here.”", zh: "仙女奶奶微笑著說：「我不會改變妳的臉。真正的公主魔法，是好好照顧眼前這個本來就很棒的妳。」" },
    { en: "“Let your bottle rest,” she said. “Drinking from a cup gives your growing mouth more room to do its important work.”", zh: "「讓奶瓶休息吧，」奶奶說，「練習用杯子喝水，能讓正在長大的嘴巴有更多空間做好重要的工作。」" },
    { en: "“And when your nose feels itchy, keep your fingers outside. Use a soft tissue and ask a grown-up for help.”", zh: "「鼻子癢的時候，小手留在外面。用柔軟的面紙，也可以請大人幫忙。」" },
    { en: "In the morning, Mom Sarah helped Ellie place the bottle in a special keepsake box. “Goodbye for now, bottle,” Ellie said.", zh: "早上，媽媽 Sarah 陪 Ellie 把奶瓶放進特別的紀念盒。「奶瓶，先說再見囉。」Ellie 說。" },
    { en: "When Ellie missed her bottle, she drank from her cup, took one slow breath, and cuddled Rainbow. Each small try was enough.", zh: "Ellie 想念奶瓶時，就用杯子喝水、慢慢呼吸，再抱抱彩虹。每一次小小的嘗試，都已經很棒。" },
    { en: "When her nose felt itchy, Ellie reached for a tissue. “Mom, may I have some help?” Sarah stayed close and gentle.", zh: "鼻子癢的時候，Ellie 拿起面紙。「媽媽，可以幫幫我嗎？」Sarah 溫柔地陪在她身邊。" },
    { en: "Sometimes Ellie forgot. Her finger floated toward her nose—then she noticed. No one scolded her. “I can try again,” she said.", zh: "有時候 Ellie 還是會忘記。手指靠近鼻子——接著，她注意到了。沒有人責罵她。「我可以再試一次。」她說。" },
    { en: "Day by day, the new habits felt easier. Ellie's mouth had room to grow, her nose felt more comfortable, and her proud smile grew brighter.", zh: "一天又一天，新習慣變得越來越容易。Ellie 的嘴巴有空間好好長大，鼻子感覺更舒服，自信的笑容也越來越明亮。" },
    { en: "Ellie looked in the mirror. She had the same teeth, the same nose, and a brand-new way of seeing herself. “Oh! I am beautiful—just like a princess. I was me all along!”", zh: "Ellie 看著鏡子。她有一樣的牙齒、一樣的鼻子，卻學會用全新的眼光看自己。「原來我這麼美，像公主一樣！而且我一直都是我！」" },
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
    languageButton: document.querySelector("#languageButton"),
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };

  const requestedLanguage = new URLSearchParams(location.search).get("lang");
  const savedLanguage = localStorage.getItem("picture-book-language");
  const state = {
    index: 0,
    sound: true,
    audio: null,
    lang: requestedLanguage === "zh" || requestedLanguage === "en"
      ? requestedLanguage
      : (savedLanguage === "zh" ? "zh" : "en"),
  };

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
    const prefix = state.lang === "zh" ? "zh" : "en";
    const voices = window.speechSynthesis.getVoices().filter((voice) =>
      voice.lang.toLowerCase().replace("_", "-").startsWith(prefix));
    utterance.voice = voices.find((voice) => /natural|online|google/i.test(voice.name)) || voices[0] || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = () => els.speakButton.classList.remove("is-speaking");
    utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

  function narrate(index) {
    stopNarration();
    if (!state.sound || index === 0) return;
    const folder = state.lang === "zh" ? "audio-princess-glow-zh" : "audio-princess-glow";
    const source = `${folder}/page-${String(index).padStart(2, "0")}.mp3`;
    const audio = new Audio(source);
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

  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }

  const illustrationSrc = (index) =>
    `assets/ellie-princess-glow-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

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

  function render(index, silent = false) {
    state.index = index;
    const page = PAGES[index];
    renderIllustration(index);
    const isCover = index === 0;
    els.coverOverlay.hidden = !isCover;
    els.textBand.hidden = isCover;
    els.storyEn.textContent = page.en;
    els.storyZh.textContent = page.zh;
    els.storyEn.hidden = state.lang !== "en";
    els.storyZh.hidden = state.lang !== "zh";
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0;
    els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dot, i) => {
      dot.classList.toggle("current", i === index);
      dot.classList.toggle("done", i < index);
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
  els.languageButton.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "zh" : "en";
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    localStorage.setItem("picture-book-language", state.lang);
    els.languageButton.textContent = state.lang === "en" ? "中文" : "EN";
    els.languageButton.setAttribute("aria-label", state.lang === "en" ? "切換成中文" : "Switch to English");
    render(state.index, true);
    if (state.index > 0 && state.sound) narrate(state.index);
  });
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
    if (event.key === "Escape") els.tipsOverlay.hidden = true;
  });
  window.addEventListener("pagehide", stopNarration);
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();

  buildDots();
  els.languageButton.textContent = state.lang === "en" ? "中文" : "EN";
  els.languageButton.setAttribute("aria-label", state.lang === "en" ? "切換成中文" : "Switch to English");
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  render(0, true);
})();
