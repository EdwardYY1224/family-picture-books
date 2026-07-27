/* 位置探險 — 三階段 9 題：暖身單一位置、挑戰情境位置、城市任務兩步驟連續指令。
   支援 zh / en（?lang=en），語音跟著切換。 */
(function () {
  "use strict";

  const TOPIC_ID = "mt_qeZYF6HZ4o";
  const GAME_STORAGE_KEY = "position-adventure-sessions-v1";
  const LEARNING_STORAGE_KEY = "family-learning-progress-v1";
  const START_POSITION = { x: 26, y: 29 };

  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } },
  };

  function detectLang() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
    try {
      const saved = window.localStorage.getItem("kid-games-lang");
      if (saved === "en" || saved === "zh") return saved;
    } catch { /* keep default */ }
    return "zh";
  }
  const lang = detectLang();
  const t = (text) => (typeof text === "string" ? text : (text[lang] != null ? text[lang] : text.zh));

  const UI = {
    zh: {
      docTitle: "位置探險｜小小探索家",
      htmlLang: "zh-Hant",
      backLabel: "遊戲館",
      brandName: "位置探險",
      brandTag: "幫小鳥找到對的位置",
      eyebrow: "聽一聽，拖一拖",
      missionReady: "準備好幫小鳥找位置了嗎？",
      replay: "再聽一次",
      hint: "給我提示",
      soundOn: "語音開啟",
      soundOff: "語音關閉",
      ready: "準備出發",
      dragGuide: "用手指拖動小鳥吧！",
      tryAgain: "快接近了，再看看位置！",
      roundOf: (i, n) => `第 ${i} 題，共 ${n} 題`,
      stepOf: (i, n) => `（步驟 ${i}／${n}）`,
      roundAria: (i) => `第 ${i} 題`,
      stageIntro: ["先暖身：一次找一個位置。", "挑戰任務：聽清楚故事再找位置。", "城市任務：一次要記住兩個位置，照順序完成！"],
      found: "找到位置了！",
      next: "下一題",
      finishRound: "完成探險",
      startKicker: "9 QUESTION ADVENTURE",
      startTitle: "位置探險",
      startText: "每一題只看一個城市地標，用手指把小鳥拖到對的位置。",
      startList: ["一回合 9 題，三個關卡", "最後有兩步驟的連續任務", "答錯會有溫柔提示"],
      startButton: "開始探險",
      parentNote: "大人小提醒：讓孩子自己拖曳；答錯時先等一下，再使用提示。",
      finishKicker: "ADVENTURE COMPLETE",
      finishTitle: "探險完成！",
      finishNoHints: "每個位置都自己找到了，真會觀察！",
      finishWithHints: "你有仔細看提示，幫小鳥完成了所有任務。",
      statRounds: "完成題數",
      statHints: "使用提示",
      finishNote: "這次練習已記為「探索中」。是否能在生活中自然使用位置詞，再由大人觀察。",
      playAgain: "再玩一次",
      backHome: "回遊戲館",
      finishSpeech: "探險完成！你幫小鳥找到了好多位置。",
      correctPrefix: "答對了。",
      speechLang: "zh-TW",
      langButton: "EN",
    },
    en: {
      docTitle: "Position Adventure | Little Explorers",
      htmlLang: "en",
      backLabel: "Games",
      brandName: "Position Adventure",
      brandTag: "Help the little bird",
      eyebrow: "Listen and drag",
      missionReady: "Ready to help the little bird?",
      replay: "Say it again",
      hint: "Help me",
      soundOn: "Voice on",
      soundOff: "Voice off",
      ready: "Ready?",
      dragGuide: "Drag the bird with your finger!",
      tryAgain: "So close! Look again.",
      roundOf: (i, n) => `Question ${i} of ${n}`,
      stepOf: (i, n) => ` (step ${i} of ${n})`,
      roundAria: (i) => `Question ${i}`,
      stageIntro: ["Warm-up: find one place at a time.", "Challenge: listen to the story, then find the place.", "City mission: remember TWO places and do them in order!"],
      found: "You found it!",
      next: "Next",
      finishRound: "Finish",
      startKicker: "9 QUESTION ADVENTURE",
      startTitle: "Position Adventure",
      startText: "One city landmark at a time. Drag the little bird to the right place.",
      startList: ["9 questions, three levels", "Two-step missions at the end", "Gentle hints if you need them"],
      startButton: "Start",
      parentNote: "For grown-ups: let your child drag by themselves; wait a moment before using hints.",
      finishKicker: "ADVENTURE COMPLETE",
      finishTitle: "Adventure complete!",
      finishNoHints: "You found every place by yourself. Great eyes!",
      finishWithHints: "You used the hints well and helped the bird finish everything.",
      statRounds: "Questions done",
      statHints: "Hints used",
      finishNote: "Marked as 'exploring'. Grown-ups can watch for these words in daily life.",
      playAgain: "Play again",
      backHome: "All games",
      finishSpeech: "Adventure complete! You helped the bird find so many places.",
      correctPrefix: "That's right! ",
      speechLang: "en-US",
      langButton: "中文",
    },
  };
  const ui = UI[lang];

  function step(target, instruction, confirmation, guide, start) {
    const entry = { target, instruction, confirmation, guide };
    if (start) entry.start = start;
    return entry;
  }

  const ROUNDS = [
    {
      stage: 0,
      steps: [step("inside",
        { zh: "請把小鳥放進公車裡面。", en: "Put the bird inside the bus." },
        { zh: "小鳥在公車裡面了！", en: "The bird is inside the bus!" },
        { zh: "找公車的車門，把小鳥放進去。", en: "Find the bus door and pop the bird in." })],
    },
    {
      stage: 0,
      steps: [step("above",
        { zh: "請把小鳥放在路燈上面。", en: "Put the bird on top of the street lamp." },
        { zh: "小鳥在路燈上面了！", en: "The bird is on top of the lamp!" },
        { zh: "飛到路燈的頂端上方。", en: "Fly up to the very top of the lamp." })],
    },
    {
      stage: 0,
      steps: [step("below",
        { zh: "請把小鳥放在長椅下面。", en: "Put the bird under the bench." },
        { zh: "小鳥在長椅下面了！", en: "The bird is under the bench!" },
        { zh: "鑽到椅面和地面中間。", en: "Sneak between the seat and the ground." })],
    },
    {
      stage: 1,
      steps: [step("beside",
        { zh: "小鳥在等朋友的信，請把牠放在郵筒旁邊。", en: "The bird is waiting for a letter. Put it next to the postbox." },
        { zh: "小鳥在郵筒旁邊了！", en: "The bird is next to the postbox!" },
        { zh: "靠近郵筒的右手邊。", en: "Snuggle up close beside the postbox." })],
    },
    {
      stage: 1,
      steps: [step("outside",
        { zh: "小鳥現在在公園裡，請把牠帶到圍欄外面。", en: "The bird is in the park. Take it outside the fence." },
        { zh: "小鳥離開圍欄，在公園外面了！", en: "The bird is outside the fence now!" },
        { zh: "跨過圍欄，放到圍欄右邊。", en: "Hop over the fence to the right side." },
        { x: 50, y: 51 })],
    },
    {
      stage: 1,
      steps: [step("above",
        { zh: "小鳥想看看遠方的朋友，請把牠放到路燈上面。", en: "The bird wants to see far away. Put it on top of the lamp." },
        { zh: "站得高，看得遠！", en: "Up high, the bird can see everything!" },
        { zh: "最高的地方就是路燈頂端。", en: "The highest spot is the top of the lamp." })],
    },
    {
      stage: 1,
      steps: [step("inside",
        { zh: "下雨了！請把小鳥帶進公車裡面躲雨。", en: "It's raining! Put the bird inside the bus to stay dry." },
        { zh: "小鳥在公車裡躲雨，不會淋濕了！", en: "The bird is dry inside the bus!" },
        { zh: "進到公車裡面才不會淋雨。", en: "Inside the bus is nice and dry." })],
    },
    {
      stage: 2,
      steps: [
        step("beside",
          { zh: "兩步驟任務！第一步：把小鳥放到郵筒旁邊。", en: "Two-step mission! First: put the bird next to the postbox." },
          { zh: "第一步完成！", en: "Step one done!" },
          { zh: "先做第一步：郵筒旁邊。", en: "Step one first: next to the postbox." }),
        step("inside",
          { zh: "第二步：再把小鳥帶進公車裡面。", en: "Step two: now put the bird inside the bus." },
          { zh: "兩步驟都完成了，你記住了整個順序！", en: "Both steps done — you remembered the whole order!" },
          { zh: "最後一步：公車裡面。", en: "Last step: inside the bus." }),
      ],
    },
    {
      stage: 2,
      steps: [
        step("below",
          { zh: "最後任務！第一步：把小鳥藏到長椅下面。", en: "Last mission! First: hide the bird under the bench." },
          { zh: "藏好了！還有一步。", en: "All hidden! One more step." },
          { zh: "先鑽到長椅下面。", en: "First, sneak under the bench." }),
        step("above",
          { zh: "第二步：現在飛到路燈上面看風景。", en: "Step two: now fly on top of the lamp to see the view." },
          { zh: "任務全部完成，小鳥看到整座城市了！", en: "Mission complete — the bird can see the whole city!" },
          { zh: "最後一步：路燈上面。", en: "Last step: on top of the lamp." }),
      ],
    },
  ];

  const elements = {
    playground: document.querySelector("#playground"),
    positionMap: document.querySelector("#positionMap"),
    birdArt: document.querySelector("#birdArt"),
    bird: document.querySelector("#bird"),
    missionText: document.querySelector("#missionText"),
    roundLabel: document.querySelector("#roundLabel"),
    roundDots: document.querySelector("#roundDots"),
    replayButton: document.querySelector("#replayButton"),
    hintButton: document.querySelector("#hintButton"),
    soundButton: document.querySelector("#soundButton"),
    soundLabel: document.querySelector(".sound-label"),
    langButton: document.querySelector("#langButton"),
    guideBubble: document.querySelector("#guideBubble"),
    feedbackCard: document.querySelector("#feedbackCard"),
    feedbackTitle: document.querySelector("#feedbackTitle"),
    feedbackText: document.querySelector("#feedbackText"),
    nextButton: document.querySelector("#nextButton"),
    startScreen: document.querySelector("#startScreen"),
    startGameButton: document.querySelector("#startGameButton"),
    finishScreen: document.querySelector("#finishScreen"),
    finishMessage: document.querySelector("#finishMessage"),
    correctCount: document.querySelector("#correctCount"),
    hintCount: document.querySelector("#hintCount"),
    playAgainButton: document.querySelector("#playAgainButton"),
  };

  const useSceneArt = () => elements.playground.classList.add("has-scene-art");
  if (elements.positionMap.complete && elements.positionMap.naturalWidth) useSceneArt();
  else elements.positionMap.addEventListener("load", useSceneArt, { once: true });
  elements.positionMap.addEventListener("error", () => elements.positionMap.remove(), { once: true });
  const useBirdArt = () => elements.bird.classList.add("has-bird-art");
  if (elements.birdArt.complete && elements.birdArt.naturalWidth) useBirdArt();
  else elements.birdArt.addEventListener("load", useBirdArt, { once: true });
  elements.birdArt.addEventListener("error", () => elements.birdArt.remove(), { once: true });

  const state = {
    roundIndex: 0,
    stepIndex: 0,
    playing: false,
    solved: false,
    dragging: false,
    pointerId: null,
    dragOffset: { x: 0, y: 0 },
    attemptsThisStep: 0,
    mistakes: 0,
    hints: 0,
    hintedThisStep: false,
    announcedStage: -1,
    sound: storage.get("position-adventure-sound") !== "off",
  };

  const currentRound = () => ROUNDS[state.roundIndex];
  const currentStep = () => currentRound().steps[state.stepIndex];

  function readSessions() {
    try {
      const value = JSON.parse(storage.get(GAME_STORAGE_KEY));
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }

  function setSoundButton() {
    elements.soundButton.setAttribute("aria-pressed", state.sound ? "true" : "false");
    elements.soundButton.querySelector("span").textContent = state.sound ? "🔊" : "🔇";
    elements.soundLabel.textContent = state.sound ? ui.soundOn : ui.soundOff;
  }

  function speak(text) {
    if (!state.sound || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ui.speechLang;
    utterance.rate = lang === "en" ? 0.88 : 0.82;
    utterance.pitch = 1.08;
    const voices = window.speechSynthesis.getVoices();
    const wanted = ui.speechLang.toLowerCase();
    const prefix = wanted.split("-")[0];
    const voice = voices.find((item) => item.lang.toLowerCase().replace("_", "-") === wanted)
      || voices.find((item) => item.lang.toLowerCase().startsWith(prefix));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  const STAGE_CLASS = ["stage-a", "stage-b", "stage-c"];
  function buildRoundDots() {
    elements.roundDots.replaceChildren();
    ROUNDS.forEach((round, index) => {
      const dot = document.createElement("span");
      dot.className = `round-dot ${STAGE_CLASS[round.stage]}`;
      dot.setAttribute("aria-label", ui.roundAria(index + 1));
      elements.roundDots.append(dot);
    });
  }
  function updateRoundDots() {
    [...elements.roundDots.children].forEach((dot, index) => {
      dot.classList.toggle("is-current", index === state.roundIndex);
      dot.classList.toggle("is-done", index < state.roundIndex || (index === state.roundIndex && state.solved));
    });
  }

  function positionBirdPercent(position, layer) {
    elements.bird.style.left = `${position.x}%`;
    elements.bird.style.top = `${position.y}%`;
    elements.bird.classList.remove("is-behind", "is-inside", "is-front");
    if (layer) elements.bird.classList.add(`is-${layer}`);
  }

  function resetBird() {
    positionBirdPercent(currentStep()?.start || START_POSITION);
    elements.bird.classList.remove("is-dragging", "is-locked", "is-wrong");
    elements.bird.disabled = false;
  }

  function clearHints() {
    document.querySelectorAll(".drop-zone.is-hint").forEach((zone) => zone.classList.remove("is-hint"));
  }

  function roundLabelText() {
    const round = currentRound();
    const base = ui.roundOf(state.roundIndex + 1, ROUNDS.length);
    return round.steps.length > 1 ? base + ui.stepOf(state.stepIndex + 1, round.steps.length) : base;
  }

  function beginStep() {
    const stepData = currentStep();
    state.solved = false;
    state.attemptsThisStep = 0;
    state.hintedThisStep = false;
    clearHints();
    elements.playground.dataset.scene = stepData.target;
    resetBird();
    elements.feedbackCard.hidden = true;
    elements.roundLabel.textContent = roundLabelText();
    elements.missionText.textContent = t(stepData.instruction);
    elements.guideBubble.textContent = ui.dragGuide;
    elements.replayButton.disabled = false;
    elements.hintButton.disabled = false;
    updateRoundDots();
    window.setTimeout(() => speak(t(stepData.instruction)), 180);
  }

  function startRound() {
    state.stepIndex = 0;
    const round = currentRound();
    if (round.stage !== state.announcedStage) {
      state.announcedStage = round.stage;
      elements.guideBubble.textContent = ui.stageIntro[round.stage];
      window.setTimeout(() => speak(ui.stageIntro[round.stage]), 60);
      window.setTimeout(beginStep, 1400);
      return;
    }
    beginStep();
  }

  function startGame() {
    state.roundIndex = 0;
    state.stepIndex = 0;
    state.playing = true;
    state.solved = false;
    state.mistakes = 0;
    state.hints = 0;
    state.announcedStage = -1;
    elements.startScreen.hidden = true;
    elements.finishScreen.hidden = true;
    buildRoundDots();
    startRound();
  }

  function targetPosition(target) {
    const zone = document.querySelector(`.drop-zone[data-zone="${target}"]`);
    const sceneRect = elements.playground.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();
    return {
      x: ((zoneRect.left + zoneRect.width / 2 - sceneRect.left) / sceneRect.width) * 100,
      y: ((zoneRect.top + zoneRect.height / 2 - sceneRect.top) / sceneRect.height) * 100,
    };
  }

  function layerForTarget(target) {
    if (target === "inside") return "inside";
    return null;
  }

  function nearestZone(clientX, clientY) {
    const zones = [...document.querySelectorAll(".drop-zone")];
    return zones.reduce((nearest, zone) => {
      const rect = zone.getBoundingClientRect();
      const distance = Math.hypot(clientX - (rect.left + rect.width / 2), clientY - (rect.top + rect.height / 2));
      return !nearest || distance < nearest.distance ? { zone, distance } : nearest;
    }, null);
  }

  function showHint(isAutomatic) {
    if (!state.playing || state.solved) return;
    const stepData = currentStep();
    clearHints();
    const zone = document.querySelector(`.drop-zone[data-zone="${stepData.target}"]`);
    zone.classList.add("is-hint");
    if (!state.hintedThisStep) {
      state.hintedThisStep = true;
      state.hints += 1;
    }
    elements.guideBubble.textContent = t(stepData.guide);
    const prompt = isAutomatic ? `${ui.tryAgain} ${t(stepData.guide)}` : t(stepData.guide);
    speak(prompt);
    window.setTimeout(() => zone.classList.remove("is-hint"), 3000);
  }

  function handleIncorrectDrop() {
    state.attemptsThisStep += 1;
    state.mistakes += 1;
    elements.bird.classList.add("is-wrong");
    elements.guideBubble.textContent = ui.tryAgain;
    speak(ui.tryAgain);
    window.setTimeout(() => {
      elements.bird.classList.remove("is-wrong");
      positionBirdPercent(currentStep()?.start || START_POSITION);
    }, 360);
    if (state.attemptsThisStep >= 2) window.setTimeout(() => showHint(true), 520);
  }

  function handleCorrectDrop() {
    const round = currentRound();
    const stepData = currentStep();
    const isLastStep = state.stepIndex === round.steps.length - 1;
    clearHints();
    positionBirdPercent(targetPosition(stepData.target), layerForTarget(stepData.target));
    elements.bird.classList.add("is-locked");
    elements.bird.disabled = true;

    if (!isLastStep) {
      elements.guideBubble.textContent = t(stepData.confirmation);
      speak(`${ui.correctPrefix}${t(stepData.confirmation)}`);
      window.setTimeout(() => {
        state.stepIndex += 1;
        beginStep();
      }, 1700);
      return;
    }

    state.solved = true;
    elements.replayButton.disabled = true;
    elements.hintButton.disabled = true;
    elements.feedbackTitle.textContent = ui.found;
    elements.feedbackText.textContent = t(stepData.confirmation);
    elements.guideBubble.textContent = t(stepData.confirmation);
    elements.nextButton.innerHTML = state.roundIndex === ROUNDS.length - 1
      ? `${ui.finishRound} <span aria-hidden="true">✦</span>`
      : `${ui.next} <span aria-hidden="true">→</span>`;
    elements.feedbackCard.hidden = false;
    updateRoundDots();
    speak(`${ui.correctPrefix}${t(stepData.confirmation)}`);
  }

  function saveSession() {
    const sessions = readSessions();
    sessions.push({
      completedAt: new Date().toISOString(),
      rounds: ROUNDS.length,
      mistakes: state.mistakes,
      hints: state.hints,
    });
    try {
      storage.set(GAME_STORAGE_KEY, JSON.stringify(sessions.slice(-10)));
      const progress = JSON.parse(storage.get(LEARNING_STORAGE_KEY) || "{}");
      const existing = progress[TOPIC_ID] || { status: "not_started", note: "" };
      progress[TOPIC_ID] = {
        ...existing,
        status: existing.status === "independent" ? "independent" : "exploring",
      };
      storage.set(LEARNING_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The game remains usable if private browsing blocks storage.
    }
  }

  function finishGame() {
    state.playing = false;
    elements.feedbackCard.hidden = true;
    elements.correctCount.textContent = ROUNDS.length;
    elements.hintCount.textContent = state.hints;
    elements.finishMessage.textContent = state.hints === 0 ? ui.finishNoHints : ui.finishWithHints;
    saveSession();
    elements.finishScreen.hidden = false;
    speak(ui.finishSpeech);
    window.setTimeout(() => elements.playAgainButton.focus(), 100);
  }

  function nextRound() {
    if (!state.solved) return;
    if (state.roundIndex >= ROUNDS.length - 1) {
      finishGame();
      return;
    }
    state.roundIndex += 1;
    startRound();
  }

  function onPointerDown(event) {
    if (!state.playing || state.solved || elements.bird.disabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    event.preventDefault();
    const birdRect = elements.bird.getBoundingClientRect();
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.dragOffset.x = event.clientX - (birdRect.left + birdRect.width / 2);
    state.dragOffset.y = event.clientY - (birdRect.top + birdRect.height / 2);
    elements.bird.setPointerCapture(event.pointerId);
    elements.bird.classList.add("is-dragging");
    clearHints();
  }

  function onPointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    event.preventDefault();
    const sceneRect = elements.playground.getBoundingClientRect();
    const birdRect = elements.bird.getBoundingClientRect();
    const halfWidth = birdRect.width / 2;
    const halfHeight = birdRect.height / 2;
    const x = Math.max(halfWidth, Math.min(sceneRect.width - halfWidth, event.clientX - sceneRect.left - state.dragOffset.x));
    const y = Math.max(halfHeight, Math.min(sceneRect.height - halfHeight, event.clientY - sceneRect.top - state.dragOffset.y));
    elements.bird.style.left = `${x}px`;
    elements.bird.style.top = `${y}px`;
  }

  function onPointerUp(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    event.preventDefault();
    state.dragging = false;
    state.pointerId = null;
    elements.bird.classList.remove("is-dragging");
    if (elements.bird.hasPointerCapture(event.pointerId)) elements.bird.releasePointerCapture(event.pointerId);
    const nearest = nearestZone(event.clientX - state.dragOffset.x, event.clientY - state.dragOffset.y);
    const sceneRect = elements.playground.getBoundingClientRect();
    const generousDistance = Math.min(sceneRect.width, sceneRect.height) * 0.28;
    if (nearest && nearest.zone.dataset.zone === currentStep().target && nearest.distance <= generousDistance) {
      handleCorrectDrop();
    } else {
      handleIncorrectDrop();
    }
  }

  function applyChrome() {
    document.title = ui.docTitle;
    document.documentElement.lang = ui.htmlLang;
    elements.playground.dataset.lang = lang;
    document.querySelector("#backLabel").textContent = ui.backLabel;
    document.querySelector("#backLink").href = `index.html?lang=${lang}`;
    document.querySelector("#brandName").textContent = ui.brandName;
    document.querySelector("#brandTag").textContent = ui.brandTag;
    document.querySelector("#missionEyebrow").textContent = ui.eyebrow;
    elements.missionText.textContent = ui.missionReady;
    elements.roundLabel.textContent = ui.ready;
    document.querySelector("#replayLabel").textContent = ui.replay;
    document.querySelector("#hintLabel").textContent = ui.hint;
    elements.guideBubble.textContent = ui.dragGuide;
    document.querySelector("#startKicker").textContent = ui.startKicker;
    document.querySelector("#startTitle").textContent = ui.startTitle;
    document.querySelector("#startText").textContent = ui.startText;
    const list = document.querySelector("#startList");
    list.replaceChildren();
    ui.startList.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      list.append(item);
    });
    elements.startGameButton.innerHTML = `${ui.startButton} <span aria-hidden="true">→</span>`;
    document.querySelector("#parentNote").innerHTML = `<span aria-hidden="true">♥</span> ${ui.parentNote}`;
    document.querySelector("#finishKicker").textContent = ui.finishKicker;
    document.querySelector("#finishTitle").textContent = ui.finishTitle;
    document.querySelector("#correctLabel").textContent = ui.statRounds;
    document.querySelector("#hintStatLabel").textContent = ui.statHints;
    document.querySelector("#finishNote").textContent = ui.finishNote;
    elements.playAgainButton.textContent = ui.playAgain;
    const backHome = document.querySelector("#backHomeLink");
    backHome.textContent = ui.backHome;
    backHome.href = `index.html?lang=${lang}`;
    elements.langButton.textContent = ui.langButton;
  }

  elements.startGameButton.addEventListener("click", startGame);
  elements.playAgainButton.addEventListener("click", startGame);
  elements.nextButton.addEventListener("click", nextRound);
  elements.replayButton.addEventListener("click", () => speak(t(currentStep().instruction)));
  elements.hintButton.addEventListener("click", () => showHint(false));
  elements.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    storage.set("position-adventure-sound", state.sound ? "on" : "off");
    if (!state.sound && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSoundButton();
    if (state.sound && state.playing) speak(t(currentStep().instruction));
  });
  elements.langButton.addEventListener("click", () => {
    const next = lang === "zh" ? "en" : "zh";
    try { window.localStorage.setItem("kid-games-lang", next); } catch { /* ignore */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.href = url.toString();
  });

  elements.bird.addEventListener("pointerdown", onPointerDown);
  elements.bird.addEventListener("pointermove", onPointerMove);
  elements.bird.addEventListener("pointerup", onPointerUp);
  elements.bird.addEventListener("pointercancel", onPointerUp);
  elements.bird.addEventListener("contextmenu", (event) => event.preventDefault());
  window.addEventListener("pagehide", () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  });

  applyChrome();
  setSoundButton();
  positionBirdPercent(START_POSITION);
})();
