/* 英雄爺爺打蟑螂 — a warm bilingual 16-page family picture book. */
(function () {
  "use strict";

  const PAGES = [
    {
      zh: "我的超人爺爺－打蟑螂篇——Ellie 的森林冒險。",
      en: "My Superhero Grandpa: The Cockroach Adventure—Ellie's forest adventure."
    },
    {
      zh: "Ellie 戴上小紅帽，提著小籃子走進森林。她一路採著花，要去爺爺奶奶的溫馨小屋。",
      en: "Ellie put on her little red hood and carried a basket into the forest. She picked flowers on the way to Grandpa and Grandma's cozy cottage."
    },
    {
      zh: "森林小路旁，長著一朵朵圓滾滾的香菇。Ellie 挑了幾朵漂亮的放進籃子，繼續往前走。",
      en: "Round mushrooms grew beside the path. Ellie chose a few lovely ones for her basket and kept walking."
    },
    {
      zh: "突然，樹葉沙沙作響，地面咚、咚地震動。Ellie 停下腳步：「是什麼東西來了？」",
      en: "Suddenly, leaves rustled and the ground went thump, thump. Ellie stopped. “What is coming?”"
    },
    {
      zh: "一隻跟汽車一樣大的蟑螂，從草叢裡衝了出來！牠揮動長長的觸角，露出調皮又兇兇的眼神。",
      en: "A cockroach as big as a car burst out of the bushes! It waved its long antennae and fixed Ellie with a fierce, mischievous stare."
    },
    {
      zh: "巨大蟑螂一下飛上天空，一下又在小路上飛快奔跑。Ellie 嚇了一跳，抱緊籃子趕快跑。",
      en: "The giant cockroach zoomed into the air, then raced across the path. Startled, Ellie hugged her basket and ran."
    },
    {
      zh: "「救命呀！請幫幫我！」Ellie 跑到一棵寬寬的大樹後面，和蟑螂保持遠遠的距離。",
      en: "“Help! Please help me!” Ellie hurried behind a wide tree and kept far away from the cockroach."
    },
    {
      zh: "這時，Ellie 想起手腕上的呼叫器。她對著手環大喊：「需要支援！請來幫忙打蟑螂！」",
      en: "Then Ellie remembered the caller on her wrist. She called, “I need support! Please come help with this cockroach!”"
    },
    {
      zh: "遠方的小屋裡，爺爺的手環亮了起來。他聽見 Ellie 的求救聲，立刻站起來：「爺爺收到！」",
      en: "At the cottage, Grandpa's wristband lit up. He heard Ellie's call and stood at once. “Grandpa received your message!”"
    },
    {
      zh: "咻——紅披風在爺爺身邊旋轉，深藍色英雄裝閃亮登場！戴著眼鏡的英雄爺爺變身完成。",
      en: "Whoosh! A coral-red cape swirled around Grandpa as his deep-blue hero suit appeared. Superhero Grandpa was ready!"
    },
    {
      zh: "英雄爺爺從小屋前一躍而起，飛過高高的樹梢，朝著 Ellie 的方向前進。",
      en: "Superhero Grandpa leaped from the cottage and soared over the treetops toward Ellie."
    },
    {
      zh: "爺爺勇敢地落在巨大蟑螂背上，像騎快馬一樣。蟑螂左彎右扭，爺爺還是穩穩抓住！",
      en: "Grandpa landed squarely on the giant cockroach and rode it like a speedy horse. It zigzagged wildly, but Grandpa held on bravely!"
    },
    {
      zh: "爺爺拿下一隻藍白拖鞋，高高舉起，念出祕密咒語：「Big 拖鞋、Big 拖鞋——Bang！Bang！Bang！」",
      en: "Grandpa pulled off one blue-and-white slipper, raised it high, and chanted, “Big slipper, big slipper—bang, bang, bang!”"
    },
    {
      zh: "轟隆隆！小拖鞋變成了超級大拖鞋。它啪地落下，連森林裡的葉子都跳了起來！",
      en: "Rumble! The little slipper grew into a super slipper. It landed with a mighty whap, and even the forest leaves jumped!"
    },
    {
      zh: "巨大蟑螂變成一片扁扁的紙煎餅，頭上繞著小星星。Ellie 跑向爺爺：「你好勇敢！你是我的英雄！」",
      en: "The giant cockroach became flat as a paper pancake, with little stars circling its head. Ellie ran to Grandpa. “You were so brave! You are my hero!”"
    },
    {
      zh: "回到家，Ellie 把森林冒險說給媽媽聽。媽媽抱著她說：「爺爺是我小時候的英雄，現在，他也變成了你的英雄。」",
      en: "At home, Ellie told Mom about the forest adventure. Mom hugged her. “Grandpa was my hero when I was little. Now he is your hero, too.”"
    }
  ];

  const MUSIC = {
    forest: "music-hero-grandpa/forest-walk.wav",
    chase: "music-hero-grandpa/playful-chase.wav",
    hero: "music-hero-grandpa/hero-arrival.wav",
    home: "music-hero-grandpa/home-warmth.wav"
  };

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
    musicButton: document.querySelector("#musicButton"),
    languageButton: document.querySelector("#languageButton"),
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
    audioStatus: document.querySelector("#audioStatus")
  };

  const requestedLanguage = new URLSearchParams(location.search).get("lang");
  const state = {
    index: 0,
    started: false,
    sound: true,
    musicOn: true,
    audio: null,
    music: null,
    musicKey: "",
    lang: requestedLanguage === "en" ? "en" : "zh"
  };
  let statusTimer = 0;

  function showAudioStatus(message) {
    window.clearTimeout(statusTimer);
    els.audioStatus.textContent = message;
    els.audioStatus.hidden = false;
    statusTimer = window.setTimeout(() => { els.audioStatus.hidden = true; }, 1800);
  }

  function musicKeyForPage(index) {
    if (index <= 3) return "forest";
    if (index <= 7) return "chase";
    if (index <= 14) return "hero";
    return "home";
  }

  function targetMusicVolume() {
    return state.audio ? 0.045 : 0.14;
  }

  function setMusicVolume() {
    if (state.music) state.music.volume = targetMusicVolume();
  }

  function stopMusic() {
    if (!state.music) return;
    state.music.pause();
    state.music = null;
    state.musicKey = "";
  }

  function syncMusic(index) {
    if (!state.started || !state.musicOn) {
      stopMusic();
      return;
    }
    const key = musicKeyForPage(index);
    if (state.music && state.musicKey === key) {
      setMusicVolume();
      if (state.music.paused) state.music.play().catch(() => {});
      return;
    }
    stopMusic();
    const music = new Audio(MUSIC[key]);
    music.loop = true;
    music.preload = "auto";
    music.volume = targetMusicVolume();
    state.music = music;
    state.musicKey = key;
    music.play().catch(() => {});
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
    setMusicVolume();
  }

  function speakFallback(index) {
    stopNarration();
    if (!state.sound || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(PAGES[index][state.lang]);
    utterance.lang = state.lang === "zh" ? "zh-TW" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.9 : 0.92;
    utterance.pitch = 1.02;
    const prefix = state.lang;
    const voices = window.speechSynthesis.getVoices().filter((voice) =>
      voice.lang.toLowerCase().replace("_", "-").startsWith(prefix));
    utterance.voice = voices.find((voice) => /natural|online|google/i.test(voice.name)) || voices[0] || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = () => {
      els.speakButton.classList.remove("is-speaking");
      advanceAfterNarration(index);
    };
    utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

  function advanceAfterNarration(index) {
    if (!state.sound || state.index !== index || index >= PAGES.length - 1) return;
    window.setTimeout(() => {
      if (state.sound && state.index === index) go(1);
    }, 450);
  }

  function narrate(index) {
    stopNarration();
    if (!state.sound || index === 0) return;
    const folder = state.lang === "zh" ? "audio-hero-grandpa-zh" : "audio-hero-grandpa";
    const source = `${folder}/page-${String(index).padStart(2, "0")}.mp3`;
    const audio = new Audio(source);
    state.audio = audio;
    setMusicVolume();
    els.speakButton.classList.add("is-speaking");
    audio.onended = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      setMusicVolume();
      advanceAfterNarration(index);
    };
    audio.onerror = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      setMusicVolume();
      speakFallback(index);
    };
    audio.play().catch(() => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      setMusicVolume();
      speakFallback(index);
    });
  }

  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }

  const illustrationSrc = (index) =>
    `assets/ellie-hero-grandpa-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

  function renderIllustration(index) {
    const image = new Image();
    image.src = illustrationSrc(index);
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("error", () => {
      els.illustration.innerHTML = '<div class="illustration-error">插圖正在休息，請翻頁後再試一次。</div>';
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
    syncMusic(index);
    if (isCover || silent) stopNarration();
    else narrate(index);
  }

  function go(delta) {
    const next = Math.min(PAGES.length - 1, Math.max(0, state.index + delta));
    if (next !== state.index) render(next);
  }

  function updateLanguageButton() {
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    els.languageButton.textContent = state.lang === "zh" ? "EN" : "中文";
    els.languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切換成中文");
  }

  function updateAudioButtons() {
    els.soundButton.innerHTML = state.sound ? "🔊 <i>旁白：開</i>" : "🔇 <i>旁白：關</i>";
    els.soundButton.setAttribute("aria-pressed", String(state.sound));
    els.soundButton.setAttribute("aria-label", state.sound ? "關閉旁白" : "開啟旁白");
    els.soundButton.title = state.sound ? "關閉旁白" : "開啟旁白";
    els.musicButton.innerHTML = state.musicOn ? "♫ <i>音樂：開</i>" : "⊘ <i>音樂：關</i>";
    els.musicButton.setAttribute("aria-pressed", String(state.musicOn));
    els.musicButton.setAttribute("aria-label", state.musicOn ? "關閉背景音樂" : "開啟背景音樂");
    els.musicButton.title = state.musicOn ? "關閉背景音樂" : "開啟背景音樂";
  }

  els.startButton.addEventListener("click", () => {
    state.started = true;
    render(1);
  });
  els.prevButton.addEventListener("click", () => go(-1));
  els.nextButton.addEventListener("click", () => go(1));
  els.speakButton.addEventListener("click", () => narrate(state.index));
  els.languageButton.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    updateLanguageButton();
    render(state.index, true);
    if (state.index > 0 && state.sound) narrate(state.index);
  });
  els.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    updateAudioButtons();
    if (!state.sound) {
      stopNarration();
      showAudioStatus("旁白已關閉，保留手動翻頁");
    } else if (state.index > 0) {
      showAudioStatus("旁白已開啟");
      narrate(state.index);
    } else {
      showAudioStatus("旁白已開啟，開始故事後播放");
    }
  });
  els.musicButton.addEventListener("click", () => {
    state.musicOn = !state.musicOn;
    updateAudioButtons();
    syncMusic(state.index);
    showAudioStatus(state.musicOn
      ? (state.started ? "背景音樂已開啟" : "背景音樂已開啟，開始故事後播放")
      : "背景音樂已關閉");
  });
  els.tipsButton.addEventListener("click", () => { els.tipsOverlay.hidden = false; });
  els.tipsClose.addEventListener("click", () => { els.tipsOverlay.hidden = true; });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "Escape") els.tipsOverlay.hidden = true;
  });
  window.addEventListener("pagehide", () => {
    stopNarration();
    stopMusic();
  });
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();

  buildDots();
  updateLanguageButton();
  updateAudioButtons();
  render(0, true);
})();
