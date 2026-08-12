/* Shared game engine — three-stage rounds, multi-step parts, memory tasks,
   mid-game resume, bilingual speech. Gentle feedback only: no timers, no
   penalties, hints unlock after two tries. */
(function () {
  "use strict";

  const RESUME_KEY = "city-games-resume-v2";
  const PROGRESS_KEY = "city-learning-game-progress-v1";
  const SOUND_KEY = "city-games-sound";

  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } },
  };
  function readJson(key, fallback) {
    try {
      const value = JSON.parse(storage.get(key));
      return value && typeof value === "object" ? value : fallback;
    } catch { return fallback; }
  }

  const i18n = window.KidI18n;
  const ui = i18n.ui;
  const t = i18n.t.bind(i18n);
  const icons = window.KidIcons;
  const allGames = window.KidGameData || {};

  const params = new URLSearchParams(window.location.search);
  const gameId = allGames[params.get("game")] ? params.get("game") : "shapes";
  const game = allGames[gameId];

  const elements = {};
  [
    "brandIcon", "brandTitle", "brandTag", "soundToggle", "langToggle",
    "roundText", "progressDots", "taskIcon", "taskLabel", "taskPrompt",
    "replayTask", "showHint", "gameStage", "stageGuide", "roundContent",
    "feedbackPanel", "feedbackTitle", "feedbackText", "nextRound",
    "startOverlay", "startIcon", "startTitle", "startDescription", "startBullets",
    "startKicker", "startGame", "resumeGame", "backLink", "careNote",
    "stageOverlay", "stageIcon", "stageKicker", "stageTitle", "stageText", "stageGo",
    "finishOverlay", "finishKicker", "finishTitle", "finishMessage",
    "correctTotal", "hintTotal", "correctLabel", "hintLabel", "playAgain", "backHub",
  ].forEach((id) => { elements[id] = document.querySelector(`#${id}`); });

  const state = {
    roundIndex: 0,
    partIndex: 0,
    playing: false,
    solved: false,
    attempts: 0,
    hints: 0,
    hinted: false,
    lastStageShown: -1,
    sequenceIndex: 0,
    selected: new Set(),
    watchPlayed: false,
    renderToken: 0,
    praiseIndex: 0,
    sound: storage.get(SOUND_KEY) !== "off",
    audioContext: null,
  };

  const currentRound = () => game.rounds[state.roundIndex];
  const currentPart = () => currentRound().parts[state.partIndex];

  /* ---------- speech & sound ---------- */
  let activeNarration = null;
  let activeMemoryAudio = null;

  function stopSpeech() {
    if (activeNarration) {
      activeNarration.pause();
      activeNarration.currentTime = 0;
      activeNarration = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (activeMemoryAudio) {
      activeMemoryAudio.pause();
      activeMemoryAudio.currentTime = 0;
      activeMemoryAudio = null;
    }
  }

  function playMemoryAudio(source) {
    if (!state.sound || !source) return;
    if (activeMemoryAudio) {
      activeMemoryAudio.pause();
      activeMemoryAudio.currentTime = 0;
    }
    const audio = new Audio(source);
    activeMemoryAudio = audio;
    audio.volume = 0.78;
    audio.addEventListener("ended", () => {
      if (activeMemoryAudio === audio) activeMemoryAudio = null;
    }, { once: true });
    audio.play().catch(() => {
      if (activeMemoryAudio === audio) activeMemoryAudio = null;
    });
  }

  function browserSpeak(text, onEnd) {
    if (!("speechSynthesis" in window)) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ui.speechLang;
    utterance.rate = i18n.lang === "en" ? 0.88 : 0.84;
    utterance.pitch = 1.02;
    const voices = window.speechSynthesis.getVoices();
    const wanted = ui.speechLang.toLowerCase();
    const prefix = wanted.split("-")[0];
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === wanted)
      || voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix))
      || null;
    utterance.addEventListener("end", () => onEnd?.(), { once: true });
    utterance.addEventListener("error", () => onEnd?.(), { once: true });
    window.speechSynthesis.speak(utterance);
  }

  function speak(text, onEnd) {
    if (!state.sound || !text) { onEnd?.(); return; }
    stopSpeech();
    const source = window.Age5NaturalAudio?.[i18n.lang]?.[text];
    if (!source) {
      browserSpeak(text, onEnd);
      return;
    }
    const audioVersion = window.Age5NaturalAudioVersion;
    const versionedSource = audioVersion ? `${source}${source.includes("?") ? "&" : "?"}v=${audioVersion}` : source;
    const narration = new Audio(versionedSource);
    activeNarration = narration;
    narration.addEventListener("ended", () => {
      if (activeNarration === narration) activeNarration = null;
      onEnd?.();
    }, { once: true });
    narration.play().catch(() => {
      if (activeNarration === narration) activeNarration = null;
      browserSpeak(text, onEnd);
    });
  }

  function speakSequence(lines, onEnd) {
    const queue = lines.filter(Boolean);
    const next = () => {
      const line = queue.shift();
      if (!line) { onEnd?.(); return; }
      speak(line, next);
    };
    next();
  }

  function audioContext() {
    if (!state.audioContext) state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audioContext.state === "suspended") state.audioContext.resume();
    return state.audioContext;
  }

  function playTone(frequency, duration, type, delay) {
    if (!state.sound || !(window.AudioContext || window.webkitAudioContext)) return;
    const context = audioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + (delay || 0);
    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  const RECORDED_EFFECTS = {
    horn: { file: "audio/bus-horn-source.ogg", start: 0, duration: 1.55, volume: 0.62 },
    siren: { file: "audio/ambulance-siren-source.ogg", start: 0.25, duration: 1.9, volume: 0.52 },
    bark: { file: "audio/dog-bark-source.ogg", start: 0, duration: 0.32, volume: 0.9, repeat: 2, gap: 0.18 },
    bell: { file: "audio/bike-bell-source.wav", start: 0, duration: 1.35, volume: 1 },
    train: { file: "audio/train-horn-source.ogg", start: 0, duration: 1.85, volume: 0.64 },
  };
  const EFFECT_LENGTH = { horn: 1.55, siren: 1.9, bark: 0.82, bell: 1.35, train: 1.85, success: 0.5 };
  const effectBuffers = new Map();

  function synthesizedEffect(name, delay) {
    if (!state.sound) return;
    const at = delay || 0;
    if (name === "horn") { playTone(185, 0.38, "square", at); playTone(150, 0.38, "square", at + 0.4); }
    if (name === "siren") for (let i = 0; i < 5; i += 1) playTone(i % 2 ? 520 : 760, 0.2, "sine", at + i * 0.21);
    if (name === "bark") { playTone(180, 0.13, "sawtooth", at); playTone(145, 0.16, "sawtooth", at + 0.2); }
    if (name === "bell") { playTone(980, 0.5, "sine", at); playTone(1480, 0.35, "sine", at + 0.05); }
    if (name === "train") { playTone(120, 0.8, "square", at); playTone(100, 0.7, "square", at + 0.18); }
    if (name === "success") { playTone(620, 0.16, "sine", at); playTone(830, 0.16, "sine", at + 0.14); playTone(1040, 0.24, "sine", at + 0.28); }
  }

  function loadEffectBuffer(name) {
    if (effectBuffers.has(name)) return effectBuffers.get(name);
    const config = RECORDED_EFFECTS[name];
    const promise = fetch(config.file)
      .then((response) => {
        if (!response.ok) throw new Error(`Audio ${response.status}: ${config.file}`);
        return response.arrayBuffer();
      })
      .then((bytes) => audioContext().decodeAudioData(bytes));
    effectBuffers.set(name, promise);
    promise.catch(() => effectBuffers.delete(name));
    return promise;
  }

  function playRecordedEffect(name, delay) {
    const config = RECORDED_EFFECTS[name];
    const at = delay || 0;
    loadEffectBuffer(name).then((buffer) => {
      if (!state.sound) return;
      const context = audioContext();
      const repeats = config.repeat || 1;
      for (let index = 0; index < repeats; index += 1) {
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        gain.gain.value = config.volume;
        source.connect(gain).connect(context.destination);
        source.start(context.currentTime + at + index * (config.duration + (config.gap || 0)), config.start, config.duration);
      }
    }).catch(() => synthesizedEffect(name, at));
  }

  function playEffect(name, delay) {
    if (!state.sound) return;
    if (RECORDED_EFFECTS[name]) playRecordedEffect(name, delay);
    else synthesizedEffect(name, delay);
  }

  function playSoundSequence(names, onDone) {
    let offset = 0.15;
    names.forEach((name) => { playEffect(name, offset); offset += (EFFECT_LENGTH[name] || 0.8) + 0.55; });
    if (onDone) window.setTimeout(onDone, offset * 1000);
    return offset * 1000;
  }

  /* ---------- visuals ---------- */
  function createArtVisual(sheet, key, className) {
    const position = sheet?.items?.[key];
    if (!position) return null;
    const [column, row] = position;
    const span = document.createElement("span");
    span.className = `${className || "choice-visual"} sprite-art`;
    const image = document.createElement("img");
    image.className = "sprite-art__sheet";
    image.src = sheet.src;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.draggable = false;
    image.style.width = `${sheet.cols * 100}%`;
    image.style.height = `${sheet.rows * 100}%`;
    image.style.left = `${column * -100}%`;
    image.style.top = `${row * -100}%`;
    image.addEventListener("error", () => span.classList.add("is-image-missing"), { once: true });
    span.append(image);
    return span;
  }

  function createVisual(item, className) {
    const painted = createArtVisual(game.artSheet, item.art || item.value || item.icon, className);
    if (painted) return painted;
    if (item.shape) return icons.shapeEl(item.shape, item.color, className || "icon-svg");
    if (item.light) {
      const name = `light${item.light[0].toUpperCase()}${item.light.slice(1)}`;
      return icons.el(name, className || "icon-svg icon-svg--light");
    }
    if (item.number != null) {
      const span = document.createElement("span");
      span.className = "number-card";
      span.textContent = item.number;
      return span;
    }
    if (item.icon && item.size) {
      const span = icons.el(item.icon, "sized-icon");
      span.style.setProperty("--size", `${item.size}px`);
      span.style.setProperty("--wide", item.wide || 1);
      return span;
    }
    return icons.el(item.icon || "star", className || "icon-svg");
  }

  function shuffled(items) {
    const output = [...items];
    for (let index = output.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [output[index], output[swap]] = [output[swap], output[index]];
    }
    return output;
  }

  /* ---------- progress dots ---------- */
  const STAGE_CLASS = ["stage-a", "stage-b", "stage-c"];
  function buildDots() {
    elements.progressDots.replaceChildren();
    game.rounds.forEach((round, index) => {
      const dot = document.createElement("span");
      dot.className = `progress-dot ${STAGE_CLASS[round.stage || 0]}`;
      dot.setAttribute("aria-label", ui.roundLabel(index + 1));
      elements.progressDots.append(dot);
    });
  }
  function updateDots() {
    [...elements.progressDots.children].forEach((dot, index) => {
      dot.classList.toggle("current", index === state.roundIndex);
      dot.classList.toggle("done", index < state.roundIndex || (index === state.roundIndex && state.solved));
    });
  }

  /* ---------- part renderers ---------- */
  function renderChoice(part) {
    if (part.remaining?.length) {
      const remainingPanel = document.createElement("div");
      remainingPanel.className = "missing-remaining";
      remainingPanel.setAttribute("aria-label", i18n.lang === "en" ? "Pictures still here" : "還在這裡的圖片");
      part.remaining.forEach((item) => {
        const card = document.createElement("div");
        card.className = "missing-remaining__card";
        card.append(createVisual(item, "missing-remaining__art"));
        remainingPanel.append(card);
      });
      elements.roundContent.append(remainingPanel);
    }
    const grid = document.createElement("div");
    grid.className = "choice-grid";
    if (part.choices.length === 2) grid.classList.add("choice-grid--two");
    if (part.choices.length >= 5 || part.rowLayout) grid.classList.add("choice-grid--row");
    const list = part.keepOrder ? part.choices : shuffled(part.choices);
    list.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-card";
      button.dataset.value = choice.value;
      button.append(createVisual(choice, "choice-visual"));
      const label = document.createElement("b");
      label.textContent = t(choice.label);
      button.append(label);
      button.addEventListener("click", () => {
        if (state.solved) return;
        const spokenLabel = t(choice.label);
        if (choice.value === part.answer) partCorrect(false, spokenLabel); else incorrect(button, spokenLabel);
      });
      grid.append(button);
    });
    elements.roundContent.append(grid);
  }

  function renderDrag(part) {
    const layout = document.createElement("div");
    layout.className = "drag-layout";
    const sourcePad = document.createElement("div");
    sourcePad.className = "drag-pad";
    const token = document.createElement("button");
    token.type = "button";
    token.className = "drag-token";
    token.setAttribute("aria-label", t(part.source.label));
    token.append(createVisual(part.source, "icon-svg"));
    sourcePad.append(token);
    const targets = document.createElement("div");
    targets.className = "drop-grid";
    shuffled(part.targets).forEach((target) => {
      const box = document.createElement("div");
      box.className = "drop-target";
      box.dataset.value = target.value;
      box.append(createVisual(target, "icon-svg icon-svg--target"));
      const label = document.createElement("b");
      label.textContent = t(target.label);
      box.append(label);
      targets.append(box);
    });
    layout.append(sourcePad, targets);
    elements.roundContent.append(layout);

    let pointer = null;
    let start = null;
    token.addEventListener("pointerdown", (event) => {
      if (state.solved || (event.pointerType === "mouse" && event.button !== 0)) return;
      event.preventDefault();
      pointer = event.pointerId;
      start = { x: event.clientX, y: event.clientY };
      token.setPointerCapture(pointer);
      token.classList.add("is-dragging");
    });
    token.addEventListener("pointermove", (event) => {
      if (pointer !== event.pointerId) return;
      event.preventDefault();
      token.style.transform = `translate(${event.clientX - start.x}px, ${event.clientY - start.y}px) scale(1.08) rotate(-3deg)`;
    });
    function drop(event) {
      if (pointer !== event.pointerId) return;
      event.preventDefault();
      pointer = null;
      token.classList.remove("is-dragging");
      const rect = token.getBoundingClientRect();
      const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      const nearest = [...targets.children].map((target) => {
        const box = target.getBoundingClientRect();
        return { target, distance: Math.hypot(center.x - (box.left + box.width / 2), center.y - (box.top + box.height / 2)) };
      }).sort((a, b) => a.distance - b.distance)[0];
      const generous = Math.min(elements.gameStage.clientWidth, elements.gameStage.clientHeight) * 0.31;
      if (nearest && nearest.target.dataset.value === part.answer && nearest.distance < generous) {
        nearest.target.classList.add("is-correct");
        partCorrect(false, t(part.source.label));
      } else {
        token.classList.add("is-wrong");
        window.setTimeout(() => { token.classList.remove("is-wrong"); token.style.transform = ""; }, 330);
        incorrect();
      }
    }
    token.addEventListener("pointerup", drop);
    token.addEventListener("pointercancel", drop);
  }

  function renderCount(part) {
    state.selected = new Set();
    const scene = document.createElement("div");
    scene.className = "count-scene";
    const focus = document.createElement("div");
    focus.className = `count-focus${part.focus === "basket" ? " count-focus--basket" : ""}`;
    focus.append(icons.el(part.focus || "bus", "icon-svg icon-svg--focus"));
    const row = document.createElement("div");
    row.className = "token-row";
    for (let index = 0; index < part.total; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "count-token";
      const iconName = part.itemAlt && index % 2 ? part.itemAlt : part.item;
      button.append(createArtVisual(game.countArtSheet, iconName, "count-token__art") || icons.el(iconName, "icon-svg icon-svg--token"));
      button.addEventListener("click", () => {
        if (state.solved) return;
        if (state.selected.has(index)) state.selected.delete(index); else state.selected.add(index);
        button.classList.toggle("is-selected", state.selected.has(index));
      });
      row.append(button);
    }
    const check = document.createElement("button");
    check.type = "button";
    check.className = "check-count";
    check.textContent = ui.confirmCount;
    check.addEventListener("click", () => {
      if (state.solved) return;
      if (state.selected.size === part.count) partCorrect(); else incorrect(check);
    });
    scene.append(focus, row, check);
    elements.roundContent.append(scene);
  }

  function renderSequence(part) {
    state.sequenceIndex = 0;
    const wrap = document.createElement("div");
    wrap.className = "sequence-wrap";
    const slots = document.createElement("div");
    slots.className = "sequence-slots";
    slots.style.setProperty("--slots", part.steps.length);
    part.steps.forEach((_, index) => {
      const slot = document.createElement("div");
      slot.className = "sequence-slot";
      slot.textContent = part.memory ? "?" : String(index + 1);
      slots.append(slot);
    });
    const cards = document.createElement("div");
    cards.className = "sequence-cards";
    const deck = shuffled([...part.steps, ...(part.extras || [])]);
    cards.style.setProperty("--cards", deck.length);
    deck.forEach((step) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sequence-card";
      button.dataset.value = step.value;
      button.append(createVisual(step, "icon-svg icon-svg--card"));
      const text = document.createElement("b");
      text.textContent = t(step.label);
      button.append(text);
      button.addEventListener("click", () => {
        if (state.solved) return;
        const expected = part.steps[state.sequenceIndex];
        const spokenLabel = t(step.label);
        if (!expected || step.value !== expected.value) { incorrect(button, spokenLabel); return; }
        const slot = slots.children[state.sequenceIndex];
        slot.replaceChildren(createVisual(step, "icon-svg icon-svg--slot"));
        slot.classList.add("filled");
        button.disabled = true;
        state.sequenceIndex += 1;
        playTone(560 + state.sequenceIndex * 60, 0.12, "sine", 0);
        if (state.sequenceIndex === part.steps.length) partCorrect(false, spokenLabel);
        else {
          elements.stageGuide.textContent = ui.sequenceNext(state.sequenceIndex + 1);
          speak(spokenLabel);
        }
      });
      cards.append(button);
    });
    wrap.append(slots, cards);
    elements.roundContent.append(wrap);
  }

  function renderWatch(part) {
    state.watchPlayed = false;
    const wrap = document.createElement("div");
    wrap.className = "watch-wrap";

    const ready = document.createElement("button");
    ready.type = "button";
    ready.className = "check-count watch-ready";
    ready.textContent = ui.readyMemory;
    ready.addEventListener("click", () => { if (!ready.disabled) partCorrect(true); });

    if (part.mode === "sounds") {
      ready.disabled = true;
      const speaker = document.createElement("div");
      speaker.className = "watch-speaker";
      speaker.append(icons.el("speaker", "icon-svg icon-svg--focus"));
      const play = document.createElement("button");
      play.type = "button";
      play.className = "check-count watch-play";
      play.textContent = ui.playSounds;
      const runSounds = () => {
        speaker.classList.add("is-playing");
        play.disabled = true;
        const total = playSoundSequence(part.sounds, () => {
          speaker.classList.remove("is-playing");
          play.disabled = false;
          play.textContent = ui.playAgainSounds;
          ready.disabled = false;
          state.watchPlayed = true;
        });
        return total;
      };
      play.addEventListener("click", runSounds);
      wrap.append(speaker, play, ready);
      elements.roundContent.append(wrap);
      window.setTimeout(runSounds, 1400);
      return;
    }

    if (part.mode === "visual-sequence") {
      ready.disabled = true;
      const panel = document.createElement("div");
      panel.className = "visual-sequence";
      panel.style.setProperty("--sequence-count", (part.reveal || []).length);
      (part.reveal || []).forEach((entry) => {
        const card = document.createElement("div");
        card.className = "visual-sequence__card";
        card.append(createVisual(entry, "visual-sequence__art"));
        panel.append(card);
      });
      const runSequence = () => {
        ready.disabled = true;
        [...panel.children].forEach((card) => card.classList.remove("is-lit"));
        (part.reveal || []).forEach((_, index) => {
          window.setTimeout(() => {
            panel.children[index].classList.add("is-lit");
            playTone(520 + index * 90, .18, "sine", 0);
            window.setTimeout(() => panel.children[index].classList.remove("is-lit"), 650);
          }, index * 900);
        });
        window.setTimeout(() => { ready.disabled = false; state.watchPlayed = true; }, (part.reveal || []).length * 900 + 150);
      };
      const replayButton = document.createElement("button");
      replayButton.type = "button";
      replayButton.className = "check-count watch-play";
      replayButton.textContent = i18n.lang === "en" ? "Show again" : "再看一次";
      replayButton.addEventListener("click", runSequence);
      wrap.append(panel, replayButton, ready);
      elements.roundContent.append(wrap);
      window.setTimeout(runSequence, 500);
      return;
    }

    /* list mode: show the shopping list with repeated icons for the count */
    const panel = document.createElement("div");
    panel.className = "memory-list";
    panel.style.setProperty("--memory-items", (part.reveal || []).length);
    (part.reveal || []).forEach((entry) => {
      const row = document.createElement("div");
      row.className = "memory-row";
      const group = document.createElement("span");
      group.className = "memory-icons";
      for (let index = 0; index < (entry.count || 1); index += 1) group.append(createVisual(entry, "memory-item-art"));
      const label = document.createElement("b");
      label.textContent = entry.count ? `${entry.count} · ${t(entry.label)}` : t(entry.label);
      row.append(group);
      if (!part.hideLabels) row.append(label);
      panel.append(row);
    });
    wrap.append(panel, ready);
    elements.roundContent.append(wrap);
  }

  function renderMemoryMatch(part) {
    const board = document.createElement("div");
    board.className = "memory-match-board";
    board.style.setProperty("--memory-cols", part.columns || 4);
    const deck = shuffled(part.cards.flatMap((item) => [
      { ...item, copy: 0 },
      { ...item, copy: 1 },
    ]));
    let openCards = [];
    let matchedPairs = 0;
    let locked = false;

    deck.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "memory-match-card";
      button.dataset.value = item.value;
      button.dataset.index = String(index);
      const back = document.createElement("span");
      back.className = "memory-match-back";
      back.setAttribute("aria-hidden", "true");
      const face = document.createElement("span");
      face.className = "memory-match-face";
      face.append(createVisual(item, "memory-match-art"));
      const name = document.createElement("span");
      name.className = "memory-match-name";
      name.textContent = t(item.label);
      face.append(name);
      button.append(back, face);
      button.addEventListener("click", () => {
        if (locked || state.solved || button.classList.contains("is-open") || button.classList.contains("is-matched")) return;
        button.classList.add("is-open");
        playTone(480, .1, "sine", 0);
        openCards.push({ button, item });
        if (openCards.length < 2) { speak(t(item.label)); return; }
        locked = true;
        const [first, second] = openCards;
        if (first.item.value === second.item.value) {
          window.setTimeout(() => {
            first.button.classList.add("is-matched");
            second.button.classList.add("is-matched");
            openCards = [];
            locked = false;
            matchedPairs += 1;
            playTone(720, .18, "sine", 0);
            if (matchedPairs === part.cards.length) partCorrect(false, t(item.label));
            else speak(t(item.label));
          }, 420);
        } else {
          speak(t(item.label));
          window.setTimeout(() => {
            first.button.classList.remove("is-open");
            second.button.classList.remove("is-open");
            openCards = [];
            locked = false;
          }, 1050);
        }
      });
      board.append(button);
    });
    elements.roundContent.append(board);
  }

  /* ---------- flow ---------- */
  function guideFor(part) {
    return ui.guides[part.type] || ui.guides.choice;
  }

  function renderPart() {
    const renderToken = ++state.renderToken;
    const round = currentRound();
    const part = currentPart();
    state.solved = false;
    state.attempts = 0;
    state.hinted = false;
    elements.feedbackPanel.hidden = true;
    elements.roundContent.replaceChildren();
    elements.stageGuide.textContent = guideFor(part);
    elements.roundText.textContent = ui.roundOf(state.roundIndex + 1, game.rounds.length);
    const stageName = ui.stageNames[round.stage || 0];
    elements.taskLabel.textContent = round.parts.length > 1
      ? `${stageName}｜${ui.stepOf(state.partIndex + 1, round.parts.length)}`
      : stageName;
    elements.taskPrompt.textContent = t(part.prompt);
    elements.replayTask.disabled = false;
    elements.showHint.disabled = part.type === "watch";
    updateDots();

    if (part.type === "choice") renderChoice(part);
    if (part.type === "drag") renderDrag(part);
    if (part.type === "count") renderCount(part);
    if (part.type === "sequence") renderSequence(part);
    if (part.type === "watch") renderWatch(part);
    if (part.type === "memoryMatch") renderMemoryMatch(part);

    window.setTimeout(() => {
      if (state.renderToken !== renderToken) return;
      speak(t(part.prompt));
      if (part.sound) window.setTimeout(() => {
        if (state.renderToken === renderToken) playEffect(part.sound);
      }, 900);
      if (part.audio) window.setTimeout(() => {
        if (state.renderToken === renderToken) playMemoryAudio(part.audio);
      }, part.audioDelay || 3600);
    }, 160);
  }

  function startRound() {
    const round = currentRound();
    state.partIndex = 0;
    if ((round.stage || 0) !== state.lastStageShown) {
      state.lastStageShown = round.stage || 0;
      showStageIntro(round.stage || 0);
      return;
    }
    renderPart();
  }

  function showStageIntro(stage) {
    state.renderToken += 1;
    stopSpeech();
    elements.stageKicker.textContent = `${stage + 1} / 3`;
    elements.stageTitle.textContent = ui.stageNames[stage];
    elements.stageText.textContent = ui.stageIntro[stage];
    elements.stageIcon.className = `overlay-icon stage-icon ${STAGE_CLASS[stage]}`;
    elements.stageIcon.replaceChildren(icons.el(["sun", "star", "crane"][stage], "icon-svg"));
    elements.stageOverlay.hidden = false;
    speak(ui.stageIntro[stage]);
  }

  function incorrect(element, spokenLabel = "") {
    if (state.solved) return;
    state.attempts += 1;
    elements.stageGuide.textContent = ui.tryAgain;
    if (element) {
      element.classList.add("is-wrong");
      window.setTimeout(() => element.classList.remove("is-wrong"), 330);
    }
    speakSequence([spokenLabel, ui.tryAgain], () => {
      if (state.attempts >= 2) window.setTimeout(showHint, 280);
    });
  }

  function showHint() {
    if (state.solved) return;
    const part = currentPart();
    if (!part.hint) return;
    if (!state.hinted) { state.hinted = true; state.hints += 1; }
    elements.stageGuide.textContent = t(part.hint);
    if (part.type === "choice") document.querySelector(`.choice-card[data-value="${part.answer}"]`)?.classList.add("is-hint");
    if (part.type === "drag") document.querySelector(`.drop-target[data-value="${part.answer}"]`)?.classList.add("is-hint");
    if (part.type === "count") [...document.querySelectorAll(".count-token")].slice(0, part.count).forEach((token) => token.classList.add("is-hint"));
    if (part.type === "sequence") {
      const value = part.steps[state.sequenceIndex]?.value;
      document.querySelector(`.sequence-card[data-value="${value}"]`)?.classList.add("is-hint");
    }
    speak(t(part.hint));
  }

  function praise() {
    const line = ui.correctPraise[state.praiseIndex % ui.correctPraise.length];
    state.praiseIndex += 1;
    return line;
  }

  function partCorrect(quiet, spokenLabel = "") {
    if (state.solved) return;
    state.renderToken += 1;
    stopSpeech();
    state.solved = true;
    const round = currentRound();
    const part = currentPart();
    const isLastPart = state.partIndex === round.parts.length - 1;
    elements.roundContent.querySelectorAll("button").forEach((button) => { button.disabled = true; });

    if (!isLastPart) {
      if (!quiet) {
        playEffect("success");
        elements.stageGuide.textContent = part.confirm ? t(part.confirm) : ui.partDone;
        speakSequence([spokenLabel, ui.partDone], () => {
          state.partIndex += 1;
          renderPart();
        });
        return;
      }
      window.setTimeout(() => {
        state.partIndex += 1;
        renderPart();
      }, 250);
      return;
    }

    playEffect("success");
    elements.replayTask.disabled = true;
    elements.showHint.disabled = true;
    const message = part.confirm ? t(part.confirm) : ui.roundDone;
    elements.stageGuide.textContent = message;
    elements.feedbackTitle.textContent = ui.roundDone;
    elements.feedbackText.textContent = message;
    elements.nextRound.textContent = state.roundIndex === game.rounds.length - 1 ? ui.finish : ui.next;
    elements.feedbackPanel.hidden = false;
    updateDots();
    saveResume(state.roundIndex + 1);
    speakSequence([spokenLabel, praise()]);
  }

  /* ---------- resume & progress ---------- */
  function saveResume(nextRound) {
    const all = readJson(RESUME_KEY, {});
    if (nextRound >= game.rounds.length) delete all[gameId];
    else all[gameId] = { next: nextRound, hints: state.hints, at: new Date().toISOString() };
    storage.set(RESUME_KEY, JSON.stringify(all));
  }
  function readResume() {
    const entry = readJson(RESUME_KEY, {})[gameId];
    return entry && Number.isInteger(entry.next) && entry.next > 0 && entry.next < game.rounds.length ? entry : null;
  }

  function saveGameStats() {
    const progress = readJson(PROGRESS_KEY, {});
    progress[gameId] = {
      plays: (progress[gameId]?.plays || 0) + 1,
      lastPlayedAt: new Date().toISOString(),
      hints: state.hints,
      rounds: game.rounds.length,
    };
    storage.set(PROGRESS_KEY, JSON.stringify(progress));
    if (game.curriculumLessonId) {
      const curriculumKey = "age5-curriculum-progress-v1";
      const curriculumProgress = readJson(curriculumKey, {});
      curriculumProgress[game.curriculumLessonId] = {
        completed: true,
        completedAt: new Date().toISOString(),
        hints: state.hints,
      };
      storage.set(curriculumKey, JSON.stringify(curriculumProgress));
    }
  }

  function finishGame() {
    state.playing = false;
    elements.feedbackPanel.hidden = true;
    elements.correctTotal.textContent = game.rounds.length;
    elements.hintTotal.textContent = state.hints;
    elements.finishMessage.textContent = state.hints ? ui.finishWithHints : ui.finishNoHints;
    saveGameStats();
    saveResume(game.rounds.length);
    elements.finishOverlay.hidden = false;
    speak(ui.finishSpeech);
  }

  function nextRound() {
    if (!state.solved) return;
    if (state.roundIndex === game.rounds.length - 1) { finishGame(); return; }
    state.roundIndex += 1;
    startRound();
  }

  function startGame(fromRound) {
    state.roundIndex = fromRound || 0;
    state.hints = fromRound ? (readResume()?.hints || 0) : 0;
    state.playing = true;
    state.lastStageShown = -1;
    if (state.sound) audioContext();
    elements.startOverlay.hidden = true;
    elements.finishOverlay.hidden = true;
    buildDots();
    startRound();
  }

  function replay() {
    const part = currentPart();
    speak(t(part.prompt));
    if (part.sound) window.setTimeout(() => playEffect(part.sound), 700);
    if (part.audio) window.setTimeout(() => playMemoryAudio(part.audio), part.audioDelay || 3600);
    const sounds = part.sounds || part.replaySounds;
    if (sounds) window.setTimeout(() => playSoundSequence(sounds), 600);
  }

  /* ---------- static chrome ---------- */
  function updateSoundButton() {
    elements.soundToggle.textContent = state.sound ? "🔊" : "🔇";
    elements.soundToggle.setAttribute("aria-pressed", String(state.sound));
  }

  function applyChrome() {
    document.title = `${t(game.title)}｜${ui.appName}`;
    document.documentElement.lang = i18n.lang === "en" ? "en" : "zh-Hant";
    elements.brandIcon.replaceChildren(icons.el(game.icon, "icon-svg icon-svg--brand"));
    elements.brandTitle.textContent = t(game.title);
    elements.brandTag.textContent = ui.tagline;
    elements.backLink.setAttribute("aria-label", ui.backToHub);
    elements.backLink.href = `index.html?lang=${i18n.lang}`;
    elements.gameStage.setAttribute("aria-label", i18n.lang === "en" ? "Game play area" : "遊戲操作區");
    elements.progressDots.setAttribute("aria-label", i18n.lang === "en" ? "Game progress" : "遊戲進度");
    elements.soundToggle.setAttribute("aria-label", i18n.lang === "en" ? "Toggle sound" : "切換聲音");
    elements.replayTask.textContent = ui.listenAgain;
    elements.showHint.textContent = ui.hint;
    elements.roundText.textContent = ui.ready;
    elements.taskLabel.textContent = ui.listenPlay;
    elements.taskPrompt.textContent = ui.getReady;
    elements.stageGuide.textContent = ui.guides.choice;
    elements.taskIcon.replaceChildren(icons.el(game.icon, "icon-svg icon-svg--brand"));
    elements.careNote.textContent = ui.careNote;
    elements.startKicker.textContent = ui.minuteBadge(game.minutes || 9);
    if (game.coverImage) {
      const cover = document.createElement("img");
      cover.src = game.coverImage;
      cover.alt = "";
      cover.decoding = "async";
      elements.startIcon.classList.add("overlay-icon--cover");
      elements.startIcon.replaceChildren(cover);
    } else {
      elements.startIcon.classList.remove("overlay-icon--cover");
      elements.startIcon.replaceChildren(icons.el(game.icon, "icon-svg"));
    }
    elements.startTitle.textContent = t(game.title);
    elements.startDescription.textContent = t(game.description);
    elements.startBullets.replaceChildren();
    ui.startBullets(game.rounds.length, game.minutes || 9).forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      elements.startBullets.append(item);
    });
    elements.startGame.textContent = ui.start;
    elements.stageGo.textContent = ui.stageGo;
    elements.finishKicker.textContent = ui.gameComplete;
    elements.finishTitle.textContent = ui.finished;
    elements.correctLabel.textContent = ui.statRounds;
    elements.hintLabel.textContent = ui.statHints;
    elements.playAgain.textContent = ui.playAgain;
    elements.backHub.textContent = ui.backHub;
    elements.backHub.href = `index.html?lang=${i18n.lang}`;
    elements.langToggle.textContent = ui.langButton;
    elements.langToggle.hidden = game.languageMode === "en-only";

    const resume = readResume();
    if (resume) {
      elements.resumeGame.hidden = false;
      elements.resumeGame.textContent = ui.resume(resume.next + 1);
      elements.startGame.textContent = ui.restart;
      elements.startGame.classList.add("secondary-start");
    }
  }

  elements.startGame.addEventListener("click", () => startGame(0));
  elements.resumeGame.addEventListener("click", () => startGame(readResume()?.next || 0));
  elements.playAgain.addEventListener("click", () => startGame(0));
  elements.nextRound.addEventListener("click", nextRound);
  elements.replayTask.addEventListener("click", replay);
  elements.showHint.addEventListener("click", showHint);
  elements.stageGo.addEventListener("click", () => { elements.stageOverlay.hidden = true; renderPart(); });
  elements.soundToggle.addEventListener("click", () => {
    state.sound = !state.sound;
    storage.set(SOUND_KEY, state.sound ? "on" : "off");
    updateSoundButton();
    if (!state.sound) stopSpeech();
  });
  elements.langToggle.addEventListener("click", () => {
    const next = i18n.otherLang;
    i18n.remember(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.href = url.toString();
  });
  window.addEventListener("pagehide", () => {
    stopSpeech();
    if (state.audioContext) state.audioContext.close();
  });

  applyChrome();
  updateSoundButton();
})();
