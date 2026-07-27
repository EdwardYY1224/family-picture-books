(function () {
  "use strict";

  const GAME_STORAGE_KEY = "city-learning-game-progress-v1";
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } },
  };

  const shapeChoices = [
    { value: "circle", label: "圓形", kind: "shape" },
    { value: "triangle", label: "三角形", kind: "shape" },
    { value: "square", label: "正方形", kind: "shape" },
    { value: "rectangle", label: "長方形", kind: "shape" },
    { value: "star", label: "星形", kind: "shape" },
  ];
  const soundChoices = [
    { value: "bus", label: "公車", icon: "🚌" }, { value: "ambulance", label: "救護車", icon: "🚑" }, { value: "dog", label: "小狗", icon: "🐶" }, { value: "bike", label: "腳踏車", icon: "🚲" }, { value: "train", label: "列車", icon: "🚆" },
  ];
  const emotionChoices = [
    { value: "happy", label: "開心", icon: "😊" }, { value: "sad", label: "難過", icon: "😢" }, { value: "angry", label: "生氣", icon: "😠" }, { value: "afraid", label: "害怕", icon: "😨" }, { value: "surprised", label: "驚訝", icon: "😮" },
  ];
  function choicesWithAnswer(choices, answer) { return [choices.find((choice) => choice.value === answer), ...choices.filter((choice) => choice.value !== answer)].slice(0, 3); }

  const games = {
    shapes: {
      title: "形狀快遞車", icon: "🔷", description: "把形狀包裹送進相同形狀的車廂。", type: "drag",
      rounds: shapeChoices.map((shape, index) => ({
        prompt: `把${shape.label}包裹送進${shape.label}車廂。`, source: shape,
        targets: [shape, shapeChoices[(index + 1) % 5], shapeChoices[(index + 2) % 5]], answer: shape.value,
        hint: `找一個和包裹外形完全相同的${shape.label}。`, confirmation: `${shape.label}包裹送到了！`,
      })),
    },
    counting: {
      title: "公車數一數", icon: "🚌", description: "照著數量，讓正確人數的乘客上公車。", type: "count",
      rounds: [1, 2, 3, 4, 5].map((count) => ({ prompt: `請讓 ${count} 位乘客上公車。`, count, item: "🧒", focus: "🚌", hint: `慢慢點選 ${count} 位乘客。`, confirmation: `${count} 位乘客都上車了！` })),
    },
    traffic: {
      title: "紅綠燈小隊長", icon: "🚦", description: "看懂紅、黃、綠燈的城市安全規則。", type: "choice",
      rounds: [
        { prompt: "哪一個燈表示要停下來？", answer: "red", hint: "紅色提醒我們停下來。", confirmation: "對，紅燈停！" },
        { prompt: "哪一個燈表示可以前進？", answer: "green", hint: "綠色表示安全時可以前進。", confirmation: "對，綠燈行！" },
        { prompt: "哪一個燈提醒我們慢下來、準備停？", answer: "yellow", hint: "找像太陽一樣的黃色。", confirmation: "對，黃燈要慢下來。" },
        { prompt: "小車正在前進，應該亮哪一個燈？", answer: "green", hint: "可以前進時是綠燈。", confirmation: "綠燈讓小車安全前進！" },
        { prompt: "行人要先停在路邊，應該找哪一個燈？", answer: "red", hint: "需要停下來時找紅燈。", confirmation: "紅燈時先停在安全的位置。" },
      ].map((round) => ({ ...round, choices: [
        { value: "red", label: "紅燈", kind: "traffic", color: "#ef624f" },
        { value: "yellow", label: "黃燈", kind: "traffic", color: "#f5c94f" },
        { value: "green", label: "綠燈", kind: "traffic", color: "#22a985" },
      ] })),
    },
    sounds: {
      title: "城市聲音偵探", icon: "🔊", description: "先聽聲音，再找出城市裡的聲音主人。", type: "choice", soundGame: true,
      rounds: [
        { prompt: "聽一聽，是誰在按喇叭？", answer: "bus", sound: "horn", hint: "大大的公車會發出低低的喇叭聲。", confirmation: "找到公車了！" },
        { prompt: "聽一聽，是誰發出高低變化的警示聲？", answer: "ambulance", sound: "siren", hint: "救護車用警示聲請大家讓路。", confirmation: "找到救護車了！" },
        { prompt: "聽一聽，是誰在汪汪叫？", answer: "dog", sound: "bark", hint: "小狗會汪汪叫。", confirmation: "找到小狗了！" },
        { prompt: "聽一聽，是誰發出清脆的鈴聲？", answer: "bike", sound: "bell", hint: "腳踏車有小鈴鐺。", confirmation: "找到腳踏車了！" },
        { prompt: "聽一聽，是誰發出長長的低音？", answer: "train", sound: "train", hint: "城市列車會發出長長的鳴笛聲。", confirmation: "找到列車了！" },
      ].map((round) => ({ ...round, choices: choicesWithAnswer(soundChoices, round.answer) })),
    },
    compare: {
      title: "建築工地比一比", icon: "📏", description: "比較物件的大小、高矮與長短。", type: "choice",
      rounds: [
        { prompt: "哪一棟房子比較高？", answer: "high", hint: "從地面往上看，誰伸得比較高？", confirmation: "找到比較高的房子了！", choices: [{ value: "low", label: "矮房子", icon: "🏠", size: 58 }, { value: "high", label: "高房子", icon: "🏢", size: 92 }] },
        { prompt: "哪一顆球比較大？", answer: "big", hint: "找佔用空間比較多的球。", confirmation: "找到比較大的球了！", choices: [{ value: "big", label: "大球", icon: "🔵", size: 92 }, { value: "small", label: "小球", icon: "🔵", size: 48 }] },
        { prompt: "哪一輛車比較長？", answer: "long", hint: "從車頭看到車尾，誰延伸得比較遠？", confirmation: "找到比較長的車了！", choices: [{ value: "short", label: "短車", icon: "🚗", size: 65 }, { value: "long", label: "長車", icon: "🚌", size: 88, wide: 1.25 }] },
        { prompt: "哪一支鉛筆比較短？", answer: "short", hint: "找頭到尾距離比較短的鉛筆。", confirmation: "找到比較短的鉛筆了！", choices: [{ value: "long", label: "長鉛筆", icon: "✏️", size: 90, wide: 1.35 }, { value: "short", label: "短鉛筆", icon: "✏️", size: 55 }] },
        { prompt: "哪一把雨傘比較小？", answer: "small", hint: "找張開後佔用空間比較少的雨傘。", confirmation: "找到比較小的雨傘了！", choices: [{ value: "small", label: "小雨傘", icon: "☂️", size: 50 }, { value: "big", label: "大雨傘", icon: "☂️", size: 94 }] },
      ],
    },
    sequence: {
      title: "早餐順序任務", icon: "☀️", description: "依照生活中發生的先後順序點選圖卡。", type: "sequence",
      rounds: [
        { prompt: "早上出門前，照順序點一點。", steps: [["wake", "🛏️", "起床"], ["brush", "🪥", "刷牙"], ["eat", "🥣", "早餐"], ["leave", "🎒", "出門"]], confirmation: "早晨順序完成了！" },
        { prompt: "過馬路時，照安全順序點一點。", steps: [["stop", "✋", "停下"], ["left", "👈", "看左"], ["right", "👉", "看右"], ["cross", "🚶", "通過"]], confirmation: "安全過馬路順序完成！" },
        { prompt: "洗手時，照順序點一點。", steps: [["wet", "💧", "沖濕"], ["soap", "🧼", "肥皂"], ["rub", "👐", "搓手"], ["rinse", "🚿", "沖淨"]], confirmation: "洗手順序完成了！" },
        { prompt: "種下種子，照順序點一點。", steps: [["soil", "🪴", "放土"], ["seed", "🌰", "種子"], ["water", "💧", "澆水"], ["grow", "🌱", "發芽"]], confirmation: "小種子發芽了！" },
        { prompt: "睡覺前，照順序點一點。", steps: [["tidy", "🧸", "收玩具"], ["bath", "🛁", "洗澡"], ["story", "📖", "故事"], ["sleep", "🌙", "睡覺"]], confirmation: "睡前順序完成了！" },
      ].map((round) => ({ ...round, hint: "找出第一件會做的事，再一步一步往後。" })),
    },
    recycle: {
      title: "回收車分類站", icon: "♻️", description: "把物品拖進正確的分類箱。", type: "drag",
      rounds: [
        { item: { value: "paper", label: "報紙", icon: "📰" }, answer: "paper", prompt: "報紙要放進哪一個分類箱？", confirmation: "報紙放進紙類箱了！" },
        { item: { value: "plastic", label: "塑膠瓶", icon: "🧴" }, answer: "plastic", prompt: "塑膠瓶要放進哪一個分類箱？", confirmation: "塑膠瓶放進塑膠類箱了！" },
        { item: { value: "metal", label: "鋁罐", icon: "🥫" }, answer: "metal", prompt: "鋁罐要放進哪一個分類箱？", confirmation: "鋁罐放進金屬類箱了！" },
        { item: { value: "paper", label: "紙盒", icon: "📦" }, answer: "paper", prompt: "乾淨紙盒要放進哪一個分類箱？", confirmation: "紙盒放進紙類箱了！" },
        { item: { value: "plastic", label: "塑膠容器", icon: "🧃" }, answer: "plastic", prompt: "塑膠容器要放進哪一個分類箱？", confirmation: "塑膠容器放進塑膠類箱了！" },
      ].map((round) => ({ ...round, source: round.item, hint: `找標示「${round.answer === "paper" ? "紙類" : round.answer === "plastic" ? "塑膠" : "金屬"}」的箱子。`, targets: [
        { value: "paper", label: "紙類", icon: "📄" }, { value: "plastic", label: "塑膠", icon: "♳" }, { value: "metal", label: "金屬", icon: "🔩" },
      ] })),
    },
    emotions: {
      title: "公園表情小故事", icon: "😊", description: "聽小故事，找出角色現在的感受。", type: "choice",
      rounds: [
        { prompt: "小朋友找到最喜歡的玩具，他可能是什麼感覺？", answer: "happy", hint: "找到喜歡的東西，嘴角可能會往上。", confirmation: "他覺得很開心！" },
        { prompt: "冰淇淋掉到地上了，她可能是什麼感覺？", answer: "sad", hint: "失去喜歡的東西，可能會想哭。", confirmation: "她可能覺得難過。" },
        { prompt: "別人突然搶走玩具，他可能是什麼感覺？", answer: "angry", hint: "被搶玩具時，眉毛可能皺起來。", confirmation: "他可能覺得生氣。" },
        { prompt: "黑暗中突然傳來很大的聲音，她可能是什麼感覺？", answer: "afraid", hint: "突然的大聲音可能讓人想躲起來。", confirmation: "她可能覺得害怕。" },
        { prompt: "禮物盒突然跳出一隻玩具小丑，他可能是什麼感覺？", answer: "surprised", hint: "沒想到的事情會讓眼睛睜大。", confirmation: "他覺得很驚訝！" },
      ].map((round) => ({ ...round, choices: choicesWithAnswer(emotionChoices, round.answer) })),
    },
    market: {
      title: "小小市場輪流買", icon: "🧺", description: "照購物清單，把正確數量放進籃子。", type: "count",
      rounds: [
        [1, "🍎", "蘋果"], [2, "🍌", "香蕉"], [3, "🥕", "紅蘿蔔"], [4, "🥖", "麵包"], [5, "🍓", "草莓"],
      ].map(([count, item, name]) => ({ prompt: `請把 ${count} 個${name}放進籃子。`, count, item, focus: "🧺", market: true, hint: `一邊點${name}，一邊從 1 數到 ${count}。`, confirmation: `${count} 個${name}都放進籃子了！` })),
    },
  };

  const params = new URLSearchParams(window.location.search);
  const game = games[params.get("game")] || games.shapes;
  const gameId = Object.keys(games).find((key) => games[key] === game);
  const elements = {
    brandIcon: document.querySelector("#brandIcon"), brandTitle: document.querySelector("#brandTitle"), soundToggle: document.querySelector("#soundToggle"),
    roundText: document.querySelector("#roundText"), progressDots: document.querySelector("#progressDots"), taskIcon: document.querySelector("#taskIcon"), taskLabel: document.querySelector("#taskLabel"), taskPrompt: document.querySelector("#taskPrompt"),
    replayTask: document.querySelector("#replayTask"), showHint: document.querySelector("#showHint"), gameStage: document.querySelector("#gameStage"), stageGuide: document.querySelector("#stageGuide"), roundContent: document.querySelector("#roundContent"),
    feedbackPanel: document.querySelector("#feedbackPanel"), feedbackTitle: document.querySelector("#feedbackTitle"), feedbackText: document.querySelector("#feedbackText"), nextRound: document.querySelector("#nextRound"),
    startOverlay: document.querySelector("#startOverlay"), startIcon: document.querySelector("#startIcon"), startTitle: document.querySelector("#startTitle"), startDescription: document.querySelector("#startDescription"), startGame: document.querySelector("#startGame"),
    finishOverlay: document.querySelector("#finishOverlay"), finishMessage: document.querySelector("#finishMessage"), correctTotal: document.querySelector("#correctTotal"), hintTotal: document.querySelector("#hintTotal"), playAgain: document.querySelector("#playAgain"),
  };

  const state = { roundIndex: 0, playing: false, solved: false, attempts: 0, hints: 0, hinted: false, sound: storage.get("city-games-sound") !== "off", sequenceIndex: 0, selected: new Set(), audioContext: null };

  function currentRound() { return game.rounds[state.roundIndex]; }
  function speak(text) {
    if (!state.sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW"; utterance.rate = .84; utterance.pitch = 1.06;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === "zh-tw") || voices.find((voice) => voice.lang.toLowerCase().startsWith("zh")) || null;
    window.speechSynthesis.speak(utterance);
  }

  function audioContext() {
    if (!state.audioContext) state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audioContext.state === "suspended") state.audioContext.resume();
    return state.audioContext;
  }

  function playTone(frequency, duration, type, delay) {
    if (!state.sound || !(window.AudioContext || window.webkitAudioContext)) return;
    const context = audioContext(); const oscillator = context.createOscillator(); const gain = context.createGain(); const start = context.currentTime + (delay || 0);
    oscillator.type = type || "sine"; oscillator.frequency.setValueAtTime(frequency, start); gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.22, start + .02); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .03);
  }

  function playEffect(name) {
    if (!state.sound) return;
    if (name === "horn") { playTone(185, .38, "square", 0); playTone(150, .38, "square", .4); }
    if (name === "siren") for (let index = 0; index < 5; index += 1) playTone(index % 2 ? 520 : 760, .2, "sine", index * .21);
    if (name === "bark") { playTone(180, .13, "sawtooth", 0); playTone(145, .16, "sawtooth", .2); }
    if (name === "bell") { playTone(980, .5, "sine", 0); playTone(1480, .35, "sine", .05); }
    if (name === "train") { playTone(120, .8, "square", 0); playTone(100, .7, "square", .18); }
  }

  function updateSoundButton() { elements.soundToggle.textContent = state.sound ? "🔊" : "🔇"; elements.soundToggle.setAttribute("aria-pressed", String(state.sound)); }
  function buildDots() { elements.progressDots.replaceChildren(); game.rounds.forEach((_, index) => { const dot = document.createElement("span"); dot.className = "progress-dot"; dot.setAttribute("aria-label", `第 ${index + 1} 題`); elements.progressDots.append(dot); }); }
  function updateDots() { [...elements.progressDots.children].forEach((dot, index) => { dot.classList.toggle("current", index === state.roundIndex); dot.classList.toggle("done", index < state.roundIndex || (index === state.roundIndex && state.solved)); }); }

  function createVisual(choice, className) {
    const visual = document.createElement("span"); visual.className = className || "choice-visual";
    if (choice.kind === "shape") { const shape = document.createElement("i"); shape.className = `shape shape--${choice.value}`; if (choice.value === "star") shape.textContent = "★"; visual.append(shape); }
    else if (choice.kind === "traffic") { const light = document.createElement("i"); light.className = "traffic-light"; light.style.setProperty("--signal", choice.color); light.append(document.createElement("i")); visual.append(light); }
    else if (choice.size) { const object = document.createElement("i"); object.className = "compare-object"; object.textContent = choice.icon; object.style.setProperty("--size", `${choice.size}px`); object.style.setProperty("--wide", choice.wide || 1); visual.append(object); }
    else { visual.textContent = choice.icon || "✦"; visual.classList.add("item-icon"); }
    return visual;
  }

  function shuffled(items) { const output = [...items]; for (let index = output.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [output[index], output[swap]] = [output[swap], output[index]]; } return output; }

  function renderChoice(round) {
    const grid = document.createElement("div"); grid.className = "choice-grid";
    if (round.choices.length === 2) grid.classList.add("choice-grid--two");
    shuffled(round.choices).forEach((choice) => {
      const button = document.createElement("button"); button.type = "button"; button.className = "choice-card"; button.dataset.value = choice.value;
      button.append(createVisual(choice)); const label = document.createElement("b"); label.textContent = choice.label; button.append(label);
      button.addEventListener("click", () => choice.value === round.answer ? correct(round.confirmation) : incorrect(button)); grid.append(button);
    });
    elements.roundContent.append(grid);
  }

  function renderDrag(round) {
    const layout = document.createElement("div"); layout.className = "drag-layout";
    const sourcePad = document.createElement("div"); sourcePad.style.width = "120px"; sourcePad.style.height = "110px";
    const token = document.createElement("button"); token.type = "button"; token.className = "drag-token"; token.setAttribute("aria-label", `可以拖曳的${round.source.label}`); token.append(createVisual(round.source, round.source.kind === "shape" ? "" : "item-icon")); sourcePad.append(token);
    const targets = document.createElement("div"); targets.className = "drop-grid";
    shuffled(round.targets).forEach((target) => { const box = document.createElement("div"); box.className = "drop-target"; box.dataset.value = target.value; box.append(createVisual(target, target.kind === "shape" ? "" : "item-icon")); const label = document.createElement("b"); label.textContent = target.label; box.append(label); targets.append(box); });
    layout.append(sourcePad, targets); elements.roundContent.append(layout);

    let pointer = null; let start = null;
    token.addEventListener("pointerdown", (event) => { if (state.solved || event.pointerType === "mouse" && event.button !== 0) return; event.preventDefault(); pointer = event.pointerId; start = { x: event.clientX, y: event.clientY }; token.setPointerCapture(pointer); token.classList.add("is-dragging"); });
    token.addEventListener("pointermove", (event) => { if (pointer !== event.pointerId) return; event.preventDefault(); token.style.transform = `translate(${event.clientX - start.x}px, ${event.clientY - start.y}px) scale(1.08) rotate(-3deg)`; });
    function drop(event) {
      if (pointer !== event.pointerId) return; event.preventDefault(); pointer = null; token.classList.remove("is-dragging");
      const tokenRect = token.getBoundingClientRect(); const center = { x: tokenRect.left + tokenRect.width / 2, y: tokenRect.top + tokenRect.height / 2 };
      const nearest = [...targets.children].map((target) => { const rect = target.getBoundingClientRect(); return { target, distance: Math.hypot(center.x - (rect.left + rect.width / 2), center.y - (rect.top + rect.height / 2)) }; }).sort((a, b) => a.distance - b.distance)[0];
      const generous = Math.min(elements.gameStage.clientWidth, elements.gameStage.clientHeight) * .31;
      if (nearest && nearest.target.dataset.value === round.answer && nearest.distance < generous) { nearest.target.classList.add("is-correct"); correct(round.confirmation); }
      else { token.classList.add("is-wrong"); window.setTimeout(() => { token.classList.remove("is-wrong"); token.style.transform = ""; }, 330); incorrect(); }
    }
    token.addEventListener("pointerup", drop); token.addEventListener("pointercancel", drop);
  }

  function renderCount(round) {
    state.selected = new Set(); const scene = document.createElement("div"); scene.className = "count-scene";
    const focus = document.createElement("div"); focus.className = `count-focus${round.market ? " market-basket" : ""}`; focus.textContent = round.focus;
    const row = document.createElement("div"); row.className = "token-row";
    for (let index = 0; index < 5; index += 1) { const button = document.createElement("button"); button.type = "button"; button.className = "count-token"; button.textContent = round.item; button.dataset.index = index; button.addEventListener("click", () => { if (state.solved) return; if (state.selected.has(index)) state.selected.delete(index); else state.selected.add(index); button.classList.toggle("is-selected", state.selected.has(index)); }); row.append(button); }
    const check = document.createElement("button"); check.type = "button"; check.className = "check-count"; check.textContent = "數好了 ✓"; check.addEventListener("click", () => state.selected.size === round.count ? correct(round.confirmation) : incorrect(check));
    scene.append(focus, row, check); elements.roundContent.append(scene);
  }

  function renderSequence(round) {
    state.sequenceIndex = 0; const wrap = document.createElement("div"); wrap.className = "sequence-wrap"; const slots = document.createElement("div"); slots.className = "sequence-slots"; const cards = document.createElement("div"); cards.className = "sequence-cards";
    round.steps.forEach((_, index) => { const slot = document.createElement("div"); slot.className = "sequence-slot"; slot.textContent = index + 1; slots.append(slot); });
    shuffled(round.steps).forEach(([value, icon, label]) => { const button = document.createElement("button"); button.type = "button"; button.className = "sequence-card"; button.dataset.value = value; button.append(document.createTextNode(icon)); const text = document.createElement("b"); text.textContent = label; button.append(text); button.addEventListener("click", () => { const expected = round.steps[state.sequenceIndex]; if (value !== expected[0]) { incorrect(button); return; } const slot = slots.children[state.sequenceIndex]; slot.textContent = icon; slot.classList.add("filled"); button.disabled = true; state.sequenceIndex += 1; if (state.sequenceIndex === round.steps.length) correct(round.confirmation); else elements.stageGuide.textContent = `接著找第 ${state.sequenceIndex + 1} 件事。`; }); cards.append(button); });
    wrap.append(slots, cards); elements.roundContent.append(wrap);
  }

  function startRound() {
    const round = currentRound(); state.solved = false; state.attempts = 0; state.hinted = false; elements.feedbackPanel.hidden = true; elements.roundContent.replaceChildren(); elements.stageGuide.textContent = game.type === "drag" ? "用手指拖到正確位置。" : game.type === "sequence" ? "從第一件事開始點。" : game.type === "count" ? "點選物品，再按數好了。" : "點選正確圖卡。";
    elements.roundText.textContent = `第 ${state.roundIndex + 1} 題，共 ${game.rounds.length} 題`; elements.taskPrompt.textContent = round.prompt; elements.taskIcon.textContent = game.soundGame ? "👂" : game.icon; elements.replayTask.disabled = false; elements.showHint.disabled = false; updateDots();
    if (game.type === "choice") renderChoice(round); if (game.type === "drag") renderDrag(round); if (game.type === "count") renderCount(round); if (game.type === "sequence") renderSequence(round);
    window.setTimeout(() => { speak(round.prompt); if (round.sound) window.setTimeout(() => playEffect(round.sound), 700); }, 160);
  }

  function incorrect(element) {
    if (state.solved) return; state.attempts += 1; elements.stageGuide.textContent = "再看一次，慢慢試。"; if (element) { element.classList.add("is-wrong"); window.setTimeout(() => element.classList.remove("is-wrong"), 330); } speak("再看一次，慢慢試。"); if (state.attempts >= 2) window.setTimeout(showHint, 420);
  }

  function showHint() {
    if (state.solved) return; const round = currentRound(); if (!state.hinted) { state.hinted = true; state.hints += 1; } elements.stageGuide.textContent = round.hint;
    if (game.type === "choice") document.querySelector(`.choice-card[data-value="${round.answer}"]`)?.classList.add("is-hint");
    if (game.type === "drag") document.querySelector(`.drop-target[data-value="${round.answer}"]`)?.classList.add("is-hint");
    if (game.type === "count") [...document.querySelectorAll(".count-token")].slice(0, round.count).forEach((token) => token.classList.add("is-hint"));
    if (game.type === "sequence") { const value = round.steps[state.sequenceIndex]?.[0]; document.querySelector(`.sequence-card[data-value="${value}"]`)?.classList.add("is-hint"); }
    speak(round.hint);
  }

  function correct(message) {
    if (state.solved) return; state.solved = true; elements.replayTask.disabled = true; elements.showHint.disabled = true; elements.stageGuide.textContent = message; elements.feedbackTitle.textContent = "完成這一題！"; elements.feedbackText.textContent = message; elements.nextRound.textContent = state.roundIndex === game.rounds.length - 1 ? "完成遊戲 →" : "下一題 →"; elements.feedbackPanel.hidden = false; elements.roundContent.querySelectorAll("button").forEach((button) => { button.disabled = true; }); updateDots(); speak(`答對了。${message}`);
  }

  function saveGame() {
    const progress = JSON.parse(storage.get(GAME_STORAGE_KEY) || "{}"); progress[gameId] = { plays: (progress[gameId]?.plays || 0) + 1, lastPlayedAt: new Date().toISOString(), hints: state.hints }; storage.set(GAME_STORAGE_KEY, JSON.stringify(progress));
  }

  function finishGame() { state.playing = false; elements.feedbackPanel.hidden = true; elements.correctTotal.textContent = game.rounds.length; elements.hintTotal.textContent = state.hints; elements.finishMessage.textContent = state.hints ? "完成所有任務了；下次可以再慢慢挑戰。" : "每一題都自己找到了，真會觀察！"; saveGame(); elements.finishOverlay.hidden = false; speak("遊戲完成了！"); }
  function nextRound() { if (!state.solved) return; if (state.roundIndex === game.rounds.length - 1) { finishGame(); return; } state.roundIndex += 1; startRound(); }
  function startGame() { state.roundIndex = 0; state.hints = 0; state.playing = true; if (game.soundGame && state.sound) audioContext(); elements.startOverlay.hidden = true; elements.finishOverlay.hidden = true; buildDots(); startRound(); }
  function replay() { const round = currentRound(); speak(round.prompt); if (round.sound) window.setTimeout(() => playEffect(round.sound), 450); }

  document.title = `${game.title}｜小小探索家`; elements.brandIcon.textContent = game.icon; elements.brandTitle.textContent = game.title; elements.startIcon.textContent = game.icon; elements.startTitle.textContent = game.title; elements.startDescription.textContent = game.description; elements.taskIcon.textContent = game.icon;
  elements.startGame.addEventListener("click", startGame); elements.playAgain.addEventListener("click", startGame); elements.nextRound.addEventListener("click", nextRound); elements.replayTask.addEventListener("click", replay); elements.showHint.addEventListener("click", showHint);
  elements.soundToggle.addEventListener("click", () => { state.sound = !state.sound; storage.set("city-games-sound", state.sound ? "on" : "off"); updateSoundButton(); if (!state.sound && "speechSynthesis" in window) window.speechSynthesis.cancel(); });
  window.addEventListener("pagehide", () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); if (state.audioContext) state.audioContext.close(); });
  updateSoundButton();
})();
