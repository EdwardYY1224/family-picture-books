(function () {
  "use strict";

  const PAGES = [
    {
      zh: "Ellie、Lucas 與獨眼巨人的洞穴。",
      en: "Ellie, Lucas, and the Cyclops's Cave."
    },
    {
      zh: "那天晚上，Ellie 和弟弟 Lucas 搭著夢中的月亮小船，來到一座從未見過的小島。",
      en: "That night, Ellie and her little brother Lucas sailed a moonlit dream boat to an island they had never seen before."
    },
    {
      zh: "小船靠岸後，Ellie 戴好小小的戰士頭盔，Lucas 也戴上柔軟皮帽。「島上不知道住著誰，我們要小心一點。」",
      en: "When the boat reached shore, Ellie put on her little warrior helmet, and Lucas put on his soft leather cap. “We do not know who lives here, so we must be careful.”"
    },
    {
      zh: "島上有一串大得像臉盆的腳印，一路通往山邊黑黑的洞穴。",
      en: "A trail of footprints, each as wide as a washbasin, led toward a dark cave in the hillside."
    },
    {
      zh: "洞裡傳來輕輕的羊叫聲。Ellie 和 Lucas 先站在洞外呼喊：「有人在嗎？」等了一會兒，裡面仍然沒有回答。",
      en: "A soft bleat came from the cave. Ellie and Lucas stayed outside and called, “Is anyone there?” They waited, but no one answered."
    },
    {
      zh: "洞穴裡堆著圓圓的乳酪，旁邊還睡著三隻毛茸茸的羊。",
      en: "Inside were round wheels of cheese and three fluffy sheep fast asleep."
    },
    {
      zh: "突然——咚！咚！咚！獨眼巨人波呂斐摩斯回來了。Ellie 立刻擋在 Lucas 前面。",
      en: "Suddenly—THUD! THUD! THUD! The Cyclops Polyphemus returned. Ellie quickly stepped in front of Lucas."
    },
    {
      zh: "巨人把大石頭推到洞口前。「進了我的洞穴，就不准離開！」他吼道。",
      en: "The giant rolled a huge boulder across the entrance. “Once you enter my cave, you may never leave!” he roared."
    },
    {
      zh: "Ellie 和 Lucas 一起用力推石頭，可是它連一點也沒動。Ellie 喘口氣說：「只靠力氣不行，我們得想別的辦法。」",
      en: "Ellie and Lucas pushed together, but the boulder did not move at all. Ellie caught her breath. “Strength will not work. We need another plan.”"
    },
    {
      zh: "「你不能把我們關起來！」Ellie 說。巨人哈哈大笑：「兩個小不點怎麼可能打敗我？」",
      en: "“You cannot keep us here!” said Ellie. The giant laughed. “How could two tiny children ever defeat me?”"
    },
    {
      zh: "Lucas 害怕地抓住姐姐。Ellie 握著他的手，輕聲說：「先慢慢呼吸。我們一起看、一起想。」",
      en: "Lucas held tightly to his sister. Ellie took his hands. “Breathe slowly. We will watch and think together.”"
    },
    {
      zh: "巨人問：「妳叫什麼名字？」Ellie 想了想，回答：「我叫——沒有人。」",
      en: "“What is your name?” asked the giant. Ellie thought for a moment. “My name is—Nobody.”"
    },
    {
      zh: "波呂斐摩斯吃完晚餐，躺在厚厚的乾草上，很快便發出轟隆隆的鼻鼾聲。",
      en: "After dinner, Polyphemus lay on a thick bed of hay and soon began to snore like thunder."
    },
    {
      zh: "Lucas 指向牆邊：「姐姐，你看！」那裡掛著一大捆柔軟又結實的羊毛繩。",
      en: "Lucas pointed toward the wall. “Ellie, look!” A long coil of strong, soft wool rope hung there."
    },
    {
      zh: "Ellie 想出一個辦法。兩人輕輕把羊毛繩繞過巨人的腳踝和乾草堆。",
      en: "Ellie had an idea. Together, they quietly looped the wool rope around the giant's ankles and the haystack."
    },
    {
      zh: "天亮了。巨人一站起來，雙腳就被軟繩纏住，一屁股跌進厚厚的乾草堆！",
      en: "At sunrise, the giant tried to stand. The soft rope tangled his feet, and—PLOP!—he landed in the thick hay."
    },
    {
      zh: "「誰騙了我？」巨人大叫。Ellie 回答：「沒有人！」波呂斐摩斯也跟著喊：「沒有人騙了我！」",
      en: "“Who tricked me?” cried the giant. “Nobody!” Ellie answered. Polyphemus shouted, “Nobody tricked me!”"
    },
    {
      zh: "波呂斐摩斯爬到大石門前，用力喊：「快來幫我！沒有人綁住我的腳，沒有人害我跌倒了！」",
      en: "Polyphemus crawled to the stone door and called, “Come help me! Nobody tied my feet, and nobody made me fall!”"
    },
    {
      zh: "洞外的巨人們聽見了，搖搖頭說：「既然沒有人騙你，那就沒事啦！」說完便走了。",
      en: "The other giants heard him and shrugged. “If nobody tricked you, nothing is wrong!” Then they walked away."
    },
    {
      zh: "波呂斐摩斯只好推開石門，讓羊群出去求救。他仔細摸過每一隻羊的背。",
      en: "Polyphemus opened the stone door and sent his sheep for help. He carefully felt every sheep's back."
    },
    {
      zh: "Lucas 悄悄觀察：「姐姐，他只摸羊的背！」他指向大羊柔軟的肚子。Ellie 一看，立刻明白了。",
      en: "Lucas watched closely. “Ellie, he only checks their backs!” He pointed beneath a big sheep's soft belly. Ellie understood at once."
    },
    {
      zh: "可是 Ellie 和 Lucas 正躲在兩隻大羊柔軟的肚子下。他們抱著厚羊毛，悄悄通過洞口。",
      en: "But Ellie and Lucas were hidden beneath two big, woolly sheep. Holding the soft fleece, they slipped through the entrance."
    },
    {
      zh: "一離開洞穴，Ellie 立刻牽起 Lucas：「現在，跑！」羊群也陪著他們衝向海邊。",
      en: "The moment they were outside, Ellie took Lucas's hand. “Now, run!” The sheep raced with them toward the sea."
    },
    {
      zh: "小船越來越遠。波呂斐摩斯只能站在岸邊大喊：「我竟然輸給了兩個小不點！」",
      en: "The boat sailed farther away. From the shore, Polyphemus cried, “I was defeated by two tiny children!”"
    },
    {
      zh: "小島慢慢消失在月色裡。Ellie 把頭盔放在桅杆旁，Lucas 握著小羊鈴。兩人靠在一起，安心地睡著了。",
      en: "The island faded into the moonlight. Ellie placed her helmet beside the mast, and Lucas held the little sheep bell. Safe together, they fell asleep."
    },
    {
      zh: "Ellie 和 Lucas 回到了溫暖的床上。Ellie 說：「我們不是靠力氣打敗他的。」Lucas 舉起小羊鈴：「是一起想辦法！」",
      en: "Ellie and Lucas woke in their warm bed. “We did not win with strength,” said Ellie. Lucas raised the little sheep bell. “We won by thinking together!”"
    }
  ];

  const COPY = {
    zh: {
      brandTitle: "Ellie、Lucas 與獨眼巨人的洞穴",
      brandSubtitle: "一場關於勇氣、觀察與合作的神話冒險",
      coverKicker: "A GENTLE ODYSSEY ADVENTURE",
      coverTitle: "Ellie、Lucas 與<br>獨眼巨人的洞穴",
      coverSubtitle: "兩個小小探險家，如何打敗力大無窮的巨人？",
      start: "開始冒險 →",
      tipsTitle: "和 Ellie、Lucas 一起想一想",
      tipsClose: "回到故事",
      soundOn: "🔊 <i>有聲音</i>",
      soundOff: "🔇 <i>靜音</i>"
    },
    en: {
      brandTitle: "Ellie, Lucas, and the Cyclops's Cave",
      brandSubtitle: "A mythic adventure about courage, observation, and teamwork",
      coverKicker: "A GENTLE ODYSSEY ADVENTURE",
      coverTitle: "Ellie, Lucas, and<br>the Cyclops's Cave",
      coverSubtitle: "How can two tiny explorers defeat a mighty giant?",
      start: "Begin the adventure →",
      tipsTitle: "Talk about the story",
      tipsClose: "Back to the story",
      soundOn: "🔊 <i>Sound on</i>",
      soundOff: "🔇 <i>Muted</i>"
    }
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
    languageButton: document.querySelector("#languageButton"),
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
    tipsZh: document.querySelector("#tipsZh"),
    tipsEn: document.querySelector("#tipsEn"),
    tipsTitle: document.querySelector("#tipsTitle"),
    brandTitle: document.querySelector("#brandTitle"),
    brandSubtitle: document.querySelector("#brandSubtitle"),
    coverKicker: document.querySelector("#coverKicker"),
    coverTitle: document.querySelector("#coverTitle"),
    coverSubtitle: document.querySelector("#coverSubtitle")
  };

  const requestedLang = new URLSearchParams(location.search).get("lang");
  const embeddedAssets = window.__BOOK_ASSETS__ || null;
  const state = {
    index: 0,
    sound: true,
    audio: null,
    lang: requestedLang === "en" || requestedLang === "zh"
      ? requestedLang
      : (localStorage.getItem("picture-book-language") || "zh")
  };

  const pageId = (index) => String(index).padStart(2, "0");
  const illustrationSrc = (index) => embeddedAssets?.images?.[index]
    || `assets/ellie-lucas-cyclops-warm-folk/page-${pageId(index)}.webp`;

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
    if (!state.sound || !("speechSynthesis" in window) || index === 0) return;
    const utterance = new SpeechSynthesisUtterance(PAGES[index][state.lang]);
    utterance.lang = state.lang === "zh" ? "zh-TW" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.78 : 0.82;
    utterance.pitch = state.lang === "zh" ? 1.08 : 1.05;
    const prefix = state.lang === "zh" ? "zh" : "en";
    utterance.voice = window.speechSynthesis.getVoices().find((voice) =>
      voice.lang.toLowerCase().replace("_", "-").startsWith(prefix)
    ) || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

  function narrate(index) {
    stopNarration();
    if (!state.sound || index === 0) return;
    const folder = state.lang === "zh"
      ? "audio-ellie-lucas-cyclops-zh"
      : "audio-ellie-lucas-cyclops";
    const audioSrc = embeddedAssets?.audio?.[state.lang]?.[index]
      || `${folder}/page-${pageId(index)}.mp3`;
    const audio = new Audio(audioSrc);
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
      els.illustration.innerHTML = '<div style="aspect-ratio:3/2;display:grid;place-items:center;padding:24px;background:#fffaf0;color:#244f49;font-weight:800">插圖載入中，請稍後再試。</div>';
    }, { once: true });
    els.illustration.replaceChildren(image);
    [index - 1, index + 1]
      .filter((i) => i >= 0 && i < PAGES.length)
      .forEach((i) => { const preload = new Image(); preload.src = illustrationSrc(i); });
  }

  function updateLanguageUi() {
    const copy = COPY[state.lang];
    els.languageButton.textContent = state.lang === "zh" ? "EN" : "中文";
    els.languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切換成中文");
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    els.brandTitle.textContent = copy.brandTitle;
    els.brandSubtitle.textContent = copy.brandSubtitle;
    els.coverKicker.textContent = copy.coverKicker;
    els.coverTitle.innerHTML = copy.coverTitle;
    els.coverSubtitle.textContent = copy.coverSubtitle;
    els.startButton.textContent = copy.start;
    els.tipsTitle.textContent = copy.tipsTitle;
    els.tipsClose.textContent = copy.tipsClose;
    els.tipsZh.hidden = state.lang !== "zh";
    els.tipsEn.hidden = state.lang !== "en";
    els.soundButton.innerHTML = state.sound ? copy.soundOn : copy.soundOff;
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
    localStorage.setItem("picture-book-language", state.lang);
    updateLanguageUi();
    render(state.index, true);
    if (state.index > 0 && state.sound) narrate(state.index);
  });
  els.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    els.soundButton.setAttribute("aria-pressed", String(state.sound));
    updateLanguageUi();
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

  PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  updateLanguageUi();
  render(0, true);
})();
