/* Ellie's Try-Again Magic — a 16-page English picture book about practice. */
(function () {
  "use strict";

  const PAGES = [
    { en: "Ellie's Try-Again Magic.", zh: "Ellie 的再試一次魔法。" },
    { en: "Ellie loved trying new things. When something looked hard, she took a breath and said, “I can try.” Rainbow, her curly toy dog, was always nearby.", zh: "Ellie 喜歡嘗試新事物。事情看起來很難時，她會深呼吸說：「我可以試試看。」捲毛玩具狗彩虹總是在身邊。" },
    { en: "First, Ellie opened a storybook. “This one is for you, Rainbow,” she said. She pointed to each word and read aloud.", zh: "首先，Ellie 打開一本故事書。「這本念給你聽，彩虹。」她指著每個字，大聲讀出來。" },
    { en: "One word was tricky. Ellie stopped, sounded it out, and tried again. “I did it!” Rainbow listened with his shiny black nose in the air.", zh: "有一個字很難。Ellie 停下來，慢慢拼出聲音，再試一次。「我念出來了！」彩虹抬著亮亮的小黑鼻子聽。" },
    { en: "Then Rainbow needed a doctor. Dr. Ellie listened to his heart, checked his paws, and wrapped one paw in a soft bandage. “All better!”", zh: "接著，彩虹需要醫生。Ellie 醫生聽聽心跳、檢查腳掌，再替一隻腳包上柔軟繃帶。「好多了！」" },
    { en: "At lunchtime, Ellie became Chef Ellie. She put on her hat and planned a tiny restaurant: warm bread and a bright, round pizza.", zh: "午餐時間，Ellie 變成了小廚師。她戴上帽子，計畫開一間小餐廳：做暖暖的麵包和圓圓的披薩。" },
    { en: "With a grown-up nearby, Ellie poured flour and water into a bowl. She stirred and stirred until real bread dough began to form.", zh: "大人在旁邊陪伴，Ellie 把麵粉和水倒進碗裡。她不停攪拌，真正的麵包麵團慢慢出現了。" },
    { en: "The dough stuck to her fingers. Squish! Ellie laughed, added a little flour, and kneaded again. Push, fold, turn—push, fold, turn.", zh: "麵團黏住了手指。噗嘰！Ellie 笑著加一點麵粉，再揉一次。推、摺、轉——推、摺、轉。" },
    { en: "Next came a real pizza. Ellie pressed the dough flat, spread the red sauce, and sprinkled on colorful toppings.", zh: "接下來是真正的披薩。Ellie 把麵團壓平、抹上紅醬，再撒上彩色配料。" },
    { en: "A grown-up used the hot oven. Soon, real bread and real pizza came out golden and warm. The kitchen smelled wonderful.", zh: "熱烤箱由大人操作。不久，真正的麵包和披薩變得金黃溫暖，廚房裡香噴噴。" },
    { en: "After all that play, books, blocks, and doctor tools covered the floor. Ellie sorted each toy, found its home, and put Rainbow on his little chair.", zh: "玩了這麼久，書、積木和醫生玩具散在地上。Ellie 分類收好每件玩具，再把彩虹放回小椅子。" },
    { en: "Outside, Ellie put on her pink flower skates. Helmet? Click. Knee pads? Click. Wrist guards? Click. Rainbow watched from a safe spot.", zh: "到了戶外，Ellie 穿上粉紅花朵直排輪。安全帽？扣好。護膝？扣好。護腕？扣好。彩虹在安全的位置看著。" },
    { en: "Ellie stood up—and wobbled. Her wheels rolled. Plop! She landed on the soft practice mat. “That was hard,” she whispered.", zh: "Ellie 站起來——搖搖晃晃。輪子滑動，噗通！她坐在柔軟的練習墊上。「這好難。」她小聲說。" },
    { en: "Rainbow's little face seemed to say, “Try again.” Ellie took a breath. “First I try, then I learn, then I try again.”", zh: "彩虹的小臉像是在說：「再試一次。」Ellie 深呼吸：「先試一次，學一學，再試一次。」" },
    { en: "She practiced standing. Then marching. Then one tiny glide. Soon Ellie rolled all the way to the yellow cone. “I'm doing it!”", zh: "她先練站穩，再練踏步，然後小小滑一下。不久，Ellie 一路滑到了黃色三角錐。「我做到了！」" },
    { en: "That evening, Ellie read the story to Rainbow again. She had not done everything perfectly—but she had learned a lot. Tomorrow held something new to try.", zh: "那天晚上，Ellie 又念故事給彩虹聽。她不是每件事都做得完美，卻學會了好多。明天還有新的事情可以試。" },
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
    || `audio-try-again/page-${String(index).padStart(2, "0")}.mp3`;

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
    `assets/ellie-try-again-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

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
