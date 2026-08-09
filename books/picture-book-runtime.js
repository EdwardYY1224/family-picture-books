/* Shared tablet-safe narration and play-mode controls for every picture book. */
(function () {
  "use strict";

  if (window.PictureBookRuntime) return;

  const NativeAudio = window.Audio;
  const nativeSpeech = window.speechSynthesis || null;
  const nativeSpeak = nativeSpeech ? nativeSpeech.speak.bind(nativeSpeech) : null;
  const nativeCancel = nativeSpeech ? nativeSpeech.cancel.bind(nativeSpeech) : null;
  const activeNarrations = new Set();
  const MODE_KEY = "picture-book-play-mode-v1";
  const nativeAutoAdvance = document.body.dataset.nativeAutoAdvance === "true";
  let generation = 0;
  let autoAdvanceTimer = 0;
  let lastManualNavigationAt = Number.NEGATIVE_INFINITY;
  let mode = "continuous";

  try {
    mode = localStorage.getItem(MODE_KEY) === "manual" ? "manual" : "continuous";
  } catch (_) {}

  function isNarration(audio) {
    const source = String(audio.currentSrc || audio.src || "");
    return !audio.loop && !/music-/i.test(source) && !/\.wav(?:$|[?#])/i.test(source);
  }

  function versionNarrationSource(source) {
    if (typeof source !== "string" || /^(?:data|blob):/i.test(source) || !/\.mp3(?:$|[?#])/i.test(source)) {
      return source;
    }
    return `${source}${source.includes("?") ? "&" : "?"}voice=hero-model-20260809`;
  }

  function stopNarration() {
    generation += 1;
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = 0;
    activeNarrations.forEach((audio) => {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      try { audio.currentTime = 0; } catch (_) {}
    });
    activeNarrations.clear();
    if (nativeCancel) nativeCancel();
  }

  function scheduleAutoAdvance(run) {
    if (mode !== "continuous" || nativeAutoAdvance || run !== generation) return;
    const nextButton = document.querySelector("#nextButton");
    if (!nextButton || nextButton.disabled) return;
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = window.setTimeout(() => {
      autoAdvanceTimer = 0;
      if (mode === "continuous" && run === generation && !nextButton.disabled) {
        nextButton.click();
      }
    }, 450);
  }

  function GuardedAudio(source) {
    const audio = new NativeAudio(versionNarrationSource(source));
    const play = audio.play.bind(audio);

    audio.play = function () {
      if (!isNarration(audio)) return play();
      stopNarration();
      const run = generation;
      audio.__pictureBookRun = run;
      activeNarrations.add(audio);
      const result = play();
      if (!result || typeof result.catch !== "function") return result;
      return result.catch((error) => {
        if (audio.__pictureBookRun !== generation) return undefined;
        throw error;
      });
    };

    audio.addEventListener("ended", () => {
      if (!activeNarrations.has(audio)) return;
      activeNarrations.delete(audio);
      const run = audio.__pictureBookRun;
      if (run === generation) scheduleAutoAdvance(run);
    });
    audio.addEventListener("error", () => activeNarrations.delete(audio));
    return audio;
  }

  GuardedAudio.prototype = NativeAudio.prototype;
  Object.setPrototypeOf(GuardedAudio, NativeAudio);
  window.Audio = GuardedAudio;

  if (nativeSpeech && nativeSpeak) {
    nativeSpeech.speak = function (utterance) {
      stopNarration();
      const run = generation;
      const previousEnd = utterance.onend;
      utterance.onend = function (event) {
        if (typeof previousEnd === "function") previousEnd.call(utterance, event);
        if (run === generation) scheduleAutoAdvance(run);
      };
      return nativeSpeak(utterance);
    };
  }

  function showStatus(message) {
    let status = document.querySelector("#audioStatus");
    if (!status) {
      status = document.createElement("div");
      status.id = "audioStatus";
      status.className = "audio-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      document.body.append(status);
    }
    window.clearTimeout(status.__hideTimer);
    status.textContent = message;
    status.hidden = false;
    status.__hideTimer = window.setTimeout(() => { status.hidden = true; }, 1800);
  }

  function updateModeButton(button) {
    const continuous = mode === "continuous";
    button.innerHTML = continuous ? "▶ <i>連續播放</i>" : "☝ <i>自己翻頁</i>";
    button.setAttribute("aria-pressed", String(continuous));
    button.setAttribute("aria-label", continuous ? "切換成自己翻頁" : "切換成連續播放");
    button.title = continuous ? "目前：旁白唸完自動翻頁" : "目前：小朋友自己逐頁翻頁";
  }

  function installModeButton() {
    const tools = document.querySelector(".book-tools");
    if (!tools || document.querySelector("#playModeButton")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.id = "playModeButton";
    button.className = "pill-button play-mode-button";
    updateModeButton(button);
    button.addEventListener("click", () => {
      mode = mode === "continuous" ? "manual" : "continuous";
      window.clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = 0;
      try { localStorage.setItem(MODE_KEY, mode); } catch (_) {}
      updateModeButton(button);
      showStatus(mode === "continuous" ? "連續播放：旁白唸完自動翻頁" : "自己翻頁：由小朋友按上一頁或下一頁");
    });
    const soundButton = tools.querySelector("#soundButton");
    tools.insertBefore(button, soundButton || null);
  }

  function handleNavigation(event) {
    const button = event.target.closest?.("#prevButton, #nextButton");
    if (!button) return;
    const now = window.performance.now();
    if (event.isTrusted && now - lastManualNavigationAt < 700) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.isTrusted) lastManualNavigationAt = now;
    stopNarration();
  }

  document.addEventListener("click", handleNavigation, true);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.repeat) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    stopNarration();
  }, true);
  window.addEventListener("pagehide", stopNarration);
  installModeButton();

  window.PictureBookRuntime = Object.freeze({
    version: "20260809-4",
    isContinuous: () => mode === "continuous",
    activeNarrationCount: () => [...activeNarrations].filter((audio) => !audio.paused).length,
    stopNarration
  });
})();
