/* Bilingual UI strings for the shared game shell.
   zh = Traditional Chinese (default), en = simple English for a 4-year-old. */
(function () {
  "use strict";

  const STRINGS = {
    zh: {
      appName: "小小探索家",
      tagline: "每題只看一個重點",
      backToHub: "回到遊戲館",
      listenAgain: "↻ 再聽一次",
      hint: "☀ 給我提示",
      next: "下一題 →",
      finish: "完成遊戲 →",
      start: "開始遊戲 →",
      resume: (n) => `繼續第 ${n} 題 →`,
      restart: "從第一題開始",
      playAgain: "再玩一次",
      backHub: "回遊戲館",
      ready: "準備出發",
      getReady: "準備好了嗎？",
      listenPlay: "聽一聽，玩一玩",
      roundOf: (i, n) => `第 ${i} 題，共 ${n} 題`,
      stepOf: (i, n) => `步驟 ${i}／${n}`,
      roundLabel: (i) => `第 ${i} 題`,
      stageNames: ["暖身出發", "挑戰任務", "城市任務"],
      stageIntro: [
        "先來暖身，慢慢玩。",
        "厲害！接下來每題有兩件事要注意。",
        "最後的城市任務：要記住順序、一步一步完成！",
      ],
      stageGo: "出發 →",
      guides: {
        choice: "點選正確圖卡。",
        drag: "用手指拖到正確位置。",
        count: "點選物品，再按數好了。",
        sequence: "從第一件事開始點。",
        watch: "看仔細、聽仔細，記起來。",
      },
      confirmCount: "數好了 ✓",
      readyMemory: "我記好了！",
      playSounds: "▶ 播放聲音",
      playAgainSounds: "↻ 再聽一次",
      sequenceNext: (n) => `接著找第 ${n} 件事。`,
      tryAgain: "再看一次，慢慢試。",
      partDone: "很好，繼續下一步！",
      roundDone: "完成這一題！",
      correctPraise: ["答對了。", "好棒。", "你做到了。"],
      gameComplete: "GAME COMPLETE",
      finished: "完成了！",
      finishNoHints: "每一題都自己找到了，真會觀察！",
      finishWithHints: "完成所有任務了；下次可以再慢慢挑戰。",
      finishSpeech: "遊戲完成了！",
      statRounds: "完成題數",
      statHints: "使用提示",
      careNote: "♥ 不用急著答對；先讓孩子自己試，再使用提示。",
      startBullets: (n, m) => [`一回合 ${n} 題，約 ${m} 分鐘`, "三個關卡，慢慢變有趣", "有語音提示，答錯可以再試"],
      minuteBadge: (m) => `${m} MINUTE GAME`,
      langButton: "English",
      speechLang: "zh-TW",
    },
    en: {
      appName: "Little Explorers",
      tagline: "One thing at a time",
      backToHub: "Back to games",
      listenAgain: "↻ Say it again",
      hint: "☀ Help me",
      next: "Next →",
      finish: "Finish →",
      start: "Let's play →",
      resume: (n) => `Keep going: question ${n} →`,
      restart: "Start over",
      playAgain: "Play again",
      backHub: "All games",
      ready: "Ready?",
      getReady: "Are you ready?",
      listenPlay: "Listen and play",
      roundOf: (i, n) => `Question ${i} of ${n}`,
      stepOf: (i, n) => `Step ${i} of ${n}`,
      roundLabel: (i) => `Question ${i}`,
      stageNames: ["Warm-up", "Challenge", "City Mission"],
      stageIntro: [
        "Let's warm up. Nice and easy.",
        "Great job! Now watch for two things at once.",
        "The big City Mission: remember the steps, one by one!",
      ],
      stageGo: "Go →",
      guides: {
        choice: "Tap the right card.",
        drag: "Drag it to the right place.",
        count: "Tap the items, then press Done.",
        sequence: "Tap what happens first.",
        watch: "Look and listen. Remember it!",
      },
      confirmCount: "Done ✓",
      readyMemory: "I remember!",
      playSounds: "▶ Play the sounds",
      playAgainSounds: "↻ Listen again",
      sequenceNext: (n) => `Now find step ${n}.`,
      tryAgain: "Look again. Take your time.",
      partDone: "Nice! Next step!",
      roundDone: "You did it!",
      correctPraise: ["That's right!", "Great job!", "You did it!"],
      gameComplete: "GAME COMPLETE",
      finished: "All done!",
      finishNoHints: "You found every answer by yourself. Great eyes!",
      finishWithHints: "You finished every mission. Come play again soon!",
      finishSpeech: "You finished the game!",
      statRounds: "Questions done",
      statHints: "Hints used",
      careNote: "♥ No rush. Let your child try first, then use a hint.",
      startBullets: (n, m) => [`${n} questions, about ${m} minutes`, "Three parts: it gets more fun", "A friendly voice helps you"],
      minuteBadge: (m) => `${m} MINUTE GAME`,
      langButton: "中文",
      speechLang: "en-US",
    },
  };

  function detectLang() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
    try {
      const saved = window.localStorage.getItem("kid-games-lang");
      if (saved === "en" || saved === "zh") return saved;
    } catch { /* private browsing keeps default */ }
    return "zh";
  }

  const lang = detectLang();
  window.KidI18n = {
    lang,
    ui: STRINGS[lang],
    /* Pick the active language from a {zh, en} text object. */
    t(text) {
      if (text == null) return "";
      if (typeof text === "string") return text;
      return text[lang] != null ? text[lang] : text.zh;
    },
    otherLang: lang === "zh" ? "en" : "zh",
    remember(value) {
      try { window.localStorage.setItem("kid-games-lang", value); } catch { /* ignore */ }
    },
  };
})();
