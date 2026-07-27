(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const game = window.PonySchool.games.find((item) => item.id === params.get("game")) || window.PonySchool.games[0];
  const key = "pony-class-progress-v1";
  let roundIndex = 0;
  let mistakes = 0;
  let soundOn = true;
  let locked = false;

  const $ = (selector) => document.querySelector(selector);
  const els = {
    title: $("#gameTitle"), skill: $("#gameSkill"), round: $("#roundLabel"), dots: $("#progressDots"),
    promptEn: $("#promptEn"), promptZh: $("#promptZh"), promptScene: $("#promptScene"), grid: $("#answerGrid"), tip: $("#gentleTip"),
    listen: $("#listenButton"), sound: $("#soundButton"), feedback: $("#feedback"),
    feedbackTitle: $("#feedbackTitle"), feedbackText: $("#feedbackText"), next: $("#nextButton"),
    startOverlay: $("#startOverlay"), startIcon: $("#startIcon"), startTitle: $("#startTitle"), startBlurb: $("#startBlurb"),
    start: $("#startButton"), finishOverlay: $("#finishOverlay"), finishMessage: $("#finishMessage"), again: $("#againButton"),
  };

  document.title = `${game.title}｜Pony 英文課遊戲屋`;
  els.title.textContent = game.title;
  els.skill.textContent = game.skill;
  els.startTitle.textContent = game.title;
  els.startBlurb.textContent = game.blurb;
  els.startIcon.append(window.KidIcons.el(game.icon, "icon-svg"));

  function speak(text, after) {
    if (!soundOn || !("speechSynthesis" in window)) { if (after) after(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.76;
    utterance.pitch = 1.05;
    if (after) utterance.onend = after;
    window.speechSynthesis.speak(utterance);
  }

  function svg(kind) {
    const common = 'viewBox="0 0 120 100" aria-hidden="true" focusable="false"';
    const art = {
      eye: '<path d="M15 51Q60 12 105 51Q60 89 15 51Z" fill="#fffaf0" stroke="#244f49" stroke-width="6"/><circle cx="60" cy="51" r="21" fill="#8dc5df" stroke="#244f49" stroke-width="5"/><circle cx="60" cy="51" r="8" fill="#244f49"/>',
      nose: '<path d="M60 15C51 38 43 61 47 73c5 14 29 14 34 0" fill="#f0b49c" stroke="#244f49" stroke-width="6" stroke-linecap="round"/><circle cx="51" cy="72" r="3" fill="#244f49"/><circle cx="72" cy="72" r="3" fill="#244f49"/>',
      mouth: '<path d="M19 50Q60 19 101 50Q60 87 19 50Z" fill="#f4775d" stroke="#244f49" stroke-width="6"/><path d="M30 51Q60 65 90 51" fill="none" stroke="#fffaf0" stroke-width="5" stroke-linecap="round"/>',
      ear: '<path d="M71 14C34 9 23 37 32 69c8 29 40 23 47 3 5-15-4-29-18-24-10 3-12 18-4 25" fill="#f0b49c" stroke="#244f49" stroke-width="6" stroke-linecap="round"/>',
      teeth: '<path d="M17 38Q60 13 103 38L96 69Q86 90 75 69Q60 91 48 69Q34 90 24 68Z" fill="#fffaf0" stroke="#244f49" stroke-width="6" stroke-linejoin="round"/>',
      hand: '<path d="M38 83V48c0-8 11-8 11 0V27c0-9 12-9 12 0v18V20c0-9 12-9 12 0v27V29c0-9 12-9 12 0v30l8-9c8-8 17 1 11 10L86 88Z" fill="#f0b49c" stroke="#244f49" stroke-width="6" stroke-linejoin="round"/>',
      foot: '<path d="M24 72c18-10 21-38 30-51 7-10 22-4 20 9l-5 27c11-6 26-1 30 9 5 13-9 22-28 22H30c-13 0-17-10-6-16Z" fill="#f0b49c" stroke="#244f49" stroke-width="6"/>',
      shoulder: '<circle cx="60" cy="27" r="18" fill="#f0b49c" stroke="#244f49" stroke-width="6"/><path d="M20 89V72c0-22 18-31 40-31s40 9 40 31v17" fill="#f5c94f" stroke="#244f49" stroke-width="6"/><circle cx="27" cy="65" r="7" fill="#f4775d"/><circle cx="93" cy="65" r="7" fill="#f4775d"/>',
      knee: '<path d="M41 10v35c0 11 8 17 19 17s19-6 19-17V10M60 62v28" fill="none" stroke="#244f49" stroke-width="18" stroke-linecap="round"/><circle cx="60" cy="58" r="13" fill="#f4775d" stroke="#244f49" stroke-width="5"/>',
    };
    return `<svg ${common}>${art[kind] || art.eye}</svg>`;
  }

  function visual(choice) {
    const wrap = document.createElement("span");
    wrap.className = `answer-visual answer-visual--${choice.kind}`;
    if (choice.kind === "scene") {
      const image = document.createElement("img");
      image.src = `../assets/scene-cards/${choice.visual}.webp?v=20260726-scene3`;
      image.alt = "";
      image.draggable = false;
      image.addEventListener("error", () => {
        wrap.className = "answer-visual answer-visual--picture";
        wrap.innerHTML = svg(choice.fallback || "eye");
      }, { once: true });
      wrap.append(image);
    } else if (choice.kind === "icon") wrap.append(window.KidIcons.el(choice.visual, "icon-svg"));
    else if (choice.kind === "picture") wrap.innerHTML = svg(choice.visual);
    else wrap.textContent = choice.visual;
    return wrap;
  }

  function renderDots() {
    els.dots.replaceChildren();
    game.rounds.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = `progress-dot${index < roundIndex ? " done" : index === roundIndex ? " current" : ""}`;
      els.dots.append(dot);
    });
  }

  function renderRound() {
    locked = false;
    mistakes = 0;
    els.feedback.hidden = true;
    els.tip.textContent = "慢慢來，先聽聲音就好。";
    const round = game.rounds[roundIndex];
    els.round.textContent = `${roundIndex + 1} / ${game.rounds.length}`;
    els.promptEn.textContent = round.en;
    els.promptZh.textContent = round.zh;
    if (round.scene) {
      els.promptScene.src = `../assets/scene-cards/${round.scene}.webp?v=20260727-runtime1`;
      els.promptScene.hidden = false;
    } else {
      els.promptScene.removeAttribute("src");
      els.promptScene.hidden = true;
    }
    renderDots();
    els.grid.replaceChildren();
    round.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = `answer-card answer-card--${choice.kind}`;
      button.type = "button";
      button.dataset.answer = choice.id;
      button.setAttribute("aria-label", choice.label);
      button.append(visual(choice));
      const label = document.createElement("b");
      label.textContent = choice.label;
      button.append(label);
      button.addEventListener("click", () => choose(button, choice.id));
      els.grid.append(button);
    });
    window.setTimeout(() => speak(round.en), 180);
  }

  function choose(button, answer) {
    if (locked) return;
    const round = game.rounds[roundIndex];
    if (answer !== round.answer) {
      mistakes += 1;
      button.classList.remove("is-wrong");
      void button.offsetWidth;
      button.classList.add("is-wrong");
      els.tip.textContent = mistakes === 1 ? "再聽一次，你可以慢慢找。" : "提示：有珊瑚色框框的那一張。";
      if (mistakes > 1) els.grid.querySelector(`[data-answer="${round.answer}"]`)?.classList.add("is-hint");
      speak(round.en);
      return;
    }
    locked = true;
    button.classList.add("is-correct");
    els.tip.textContent = "你找到了！";
    els.grid.querySelectorAll("button").forEach((item) => { item.disabled = true; });
    const reply = round.reply || `Yes! ${button.querySelector("b").textContent}.`;
    els.feedbackTitle.textContent = mistakes ? "你再聽一次就找到了！" : "你聽到了！";
    els.feedbackText.textContent = reply;
    els.feedback.hidden = false;
    speak(reply);
  }

  function finish() {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    saved[game.id] = { complete: true, completedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(saved));
    els.finishMessage.textContent = game.finish;
    els.finishOverlay.hidden = false;
    speak("You did it! Great listening!");
  }

  els.listen.addEventListener("click", () => speak(game.rounds[roundIndex].en));
  els.sound.addEventListener("click", () => {
    soundOn = !soundOn;
    els.sound.textContent = soundOn ? "🔊" : "🔇";
    els.sound.setAttribute("aria-pressed", String(soundOn));
    if (!soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
    if (soundOn) speak(game.rounds[roundIndex].en);
  });
  els.next.addEventListener("click", () => {
    roundIndex += 1;
    if (roundIndex >= game.rounds.length) finish(); else renderRound();
  });
  els.start.addEventListener("click", () => { els.startOverlay.hidden = true; renderRound(); });
  els.again.addEventListener("click", () => { roundIndex = 0; els.finishOverlay.hidden = true; renderRound(); });
})();
