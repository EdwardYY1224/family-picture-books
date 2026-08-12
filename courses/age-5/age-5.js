(function () {
  "use strict";

  const data = window.AGE5_CURRICULUM;
  if (!data) throw new Error("AGE5_CURRICULUM is not loaded");

  const STORAGE_LANG = "age5-curriculum-language-v1";
  const STORAGE_PROGRESS = "age5-curriculum-progress-v1";
  const UI = {
    "zh-TW": {
      eyebrow: "5 歲 · 20 週", hubTitle: "5 歲小小探索家", hubLead: "40 堂短課，把英文、數學、科學、情緒、金錢、AI 與歷史變成可以動手玩的探索任務。",
      weeks: "週", lessons: "堂課", minutes: "分鐘", progressKicker: "探索旅程", progressTitle: "探索進度", completed: "堂完成",
      curriculumKicker: "課程地圖", curriculumTitle: "一步一步探索", filterLabel: "學習領域", allDomains: "全部領域", attribution: "資料來源與授權",
      readyKicker: "聽與玩", readyTitle: "聽一聽，動手玩", readyLead: "孩子不需要識字。點選大圖，題目會自動念出來。", parentPlan: "家長：查看完整 20 週課程規劃",
      memoryKicker: "加碼遊戲", memoryTitle: "記憶力遊樂園", memoryLead: "四款短遊戲，練習看、聽、記住與依序操作。", memoryDomain: "記憶遊戲",
      week: "第 {n} 週", lesson: "第 {n} 堂", ready: "可以開始", planned: "內容製作中", openLesson: "開始課程", englishLesson: "全英語課",
      domains: {english:"英語", mathematics:"數學", "social-emotional":"社會情緒", "learning-to-learn":"學習力", science:"科學", "life-skills":"生活技能", "computing-ai":"AI 與運算", money:"金錢", history:"歷史", "scientific-inquiry":"科學方法"},
      allLessons: "全部課程", listen: "聽課程", stop: "停止朗讀", storyHook: "故事開場", todayGoals: "今天會學會", wordBasket: "詞彙籃子", handsOn: "動手探索",
      showWhatYouKnow: "試試看", caregiverCheck: "家長觀察", tryMore: "延伸挑戰", materials: "材料", question: "問題 {n}", correct: "答對了！", tryAgain: "再想一想。",
      finishMessage: "完成探索後，記錄今天的進度。", markComplete: "標記為完成", completedButton: "已完成", notReadyTitle: "這堂課正在製作中", notReadyBody: "課程位置已經排好，完整內容會在下一批加入。", backToPlan: "回課程表"
    },
    "en-US": {
      eyebrow: "AGE FIVE · 20 WEEKS", hubTitle: "Little Explorers · Age 5", hubLead: "Forty short lessons turn English, maths, science, feelings, money, AI, and history into hands-on missions.",
      weeks: "weeks", lessons: "lessons", minutes: "minutes", progressKicker: "YOUR JOURNEY", progressTitle: "Learning progress", completed: "lessons complete",
      curriculumKicker: "THE CURRICULUM", curriculumTitle: "Explore step by step", filterLabel: "Learning area", allDomains: "All areas", attribution: "Sources and licences",
      readyKicker: "LISTEN & PLAY", readyTitle: "Listen and play", readyLead: "No reading needed. Tap a big picture and the task is spoken aloud.", parentPlan: "For caregivers: view the complete 20-week plan",
      memoryKicker: "BONUS GAMES", memoryTitle: "Memory Playground", memoryLead: "Four short games for looking, listening, remembering, and ordering.", memoryDomain: "Memory game",
      week: "Week {n}", lesson: "Lesson {n}", ready: "Ready", planned: "In production", openLesson: "Start lesson", englishLesson: "English-only lesson",
      domains: {english:"English", mathematics:"Mathematics", "social-emotional":"Social & emotional", "learning-to-learn":"Learning to learn", science:"Science", "life-skills":"Life skills", "computing-ai":"AI & computing", money:"Money", history:"History", "scientific-inquiry":"Scientific inquiry"},
      allLessons: "All lessons", listen: "Listen", stop: "Stop", storyHook: "Story hook", todayGoals: "Today I will", wordBasket: "Word basket", handsOn: "Hands-on mission",
      showWhatYouKnow: "Show what you know", caregiverCheck: "Caregiver check", tryMore: "Try more", materials: "Materials", question: "Question {n}", correct: "That's right!", tryAgain: "Think again.",
      finishMessage: "When the mission is finished, save today's progress.", markComplete: "Mark complete", completedButton: "Completed", notReadyTitle: "This lesson is in production", notReadyBody: "Its place is saved in the plan and the full lesson will arrive in the next batch.", backToPlan: "Back to the plan"
    }
  };

  function loadLanguage() {
    const query = new URLSearchParams(location.search).get("lang");
    if (query === "en") return "en-US";
    if (query === "zh") return "zh-TW";
    try { return localStorage.getItem(STORAGE_LANG) || "zh-TW"; } catch { return "zh-TW"; }
  }

  let locale = loadLanguage();
  let progress = loadProgress();
  const ui = () => UI[locale];
  const format = (text, values) => Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), text);

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_PROGRESS)) || {}; } catch { return {}; }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress)); } catch { /* private mode */ }
  }

  function applyUiText() {
    document.documentElement.lang = locale === "zh-TW" ? "zh-Hant" : "en";
    for (const element of document.querySelectorAll("[data-i18n]")) {
      const value = ui()[element.dataset.i18n];
      if (value) element.textContent = value;
    }
    const button = document.querySelector("#languageButton");
    if (button) button.textContent = locale === "zh-TW" ? "English" : "中文";
  }

  function bindLanguageButton(onChange) {
    const button = document.querySelector("#languageButton");
    if (!button) return;
    button.addEventListener("click", () => {
      locale = locale === "zh-TW" ? "en-US" : "zh-TW";
      try { localStorage.setItem(STORAGE_LANG, locale); } catch { /* private mode */ }
      applyUiText();
      onChange();
    });
  }

  function titleFor(lesson) {
    if (lesson.languageMode === "en-only") return data.catalogTitles[lesson.id]?.["en-US"] || lesson.id;
    return data.catalogTitles[lesson.id]?.[locale] || data.catalogTitles[lesson.id]?.["en-US"] || lesson.id;
  }

  function renderHub() {
    const grid = document.querySelector("#weekGrid");
    const readyGrid = document.querySelector("#readyGrid");
    const memoryGrid = document.querySelector("#memoryGrid");
    const filter = document.querySelector("#domainFilter");
    const domains = [...new Set(data.lessons.map((lesson) => lesson.domain))];

    function populateFilter() {
      const selected = filter.value || "all";
      filter.replaceChildren(new Option(ui().allDomains, "all"));
      for (const domain of domains) filter.add(new Option(ui().domains[domain], domain));
      filter.value = domains.includes(selected) ? selected : "all";
    }

    function renderProgress() {
      const count = data.lessons.filter((lesson) => progress[lesson.id]?.completed).length;
      document.querySelector("#progressText").textContent = `${count} / ${data.lessons.length}`;
      document.querySelector("#progressBar").style.width = `${count / data.lessons.length * 100}%`;
    }

    function renderReady() {
      const coverImages = {
        "age5-rhymes": "assets/warm-folk/rhyming-words.webp",
        "age5-count-20": "assets/warm-folk/count-to-20.webp",
        "age5-five-senses": "assets/warm-folk/five-senses.webp",
        "age5-ai-daily": "assets/warm-folk/ai-daily-life.webp",
      };
      const readyLessons = data.lessons.filter((lesson) => ["pilot", "ready"].includes(lesson.contentStatus));
      readyGrid.replaceChildren(...readyLessons.map((lesson, index) => {
        const link = document.createElement("a");
        link.className = `ready-tile ready-tile--${["coral", "yellow", "blue", "green"][index % 4]}${progress[lesson.id]?.completed ? " is-complete" : ""}`;
        link.href = `play.html?game=${encodeURIComponent(lesson.gameId)}&lang=${lesson.languageMode === "en-only" ? "en" : locale === "zh-TW" ? "zh" : "en"}`;
        const visual = document.createElement("span");
        visual.className = "ready-tile__visual";
        const image = document.createElement("img");
        image.src = coverImages[lesson.gameId] || `assets/warm-folk/expanded/${lesson.gameId}-cover.webp`;
        image.alt = "";
        image.loading = index < 2 ? "eager" : "lazy";
        image.decoding = "async";
        visual.append(image);
        const copy = document.createElement("span");
        copy.className = "ready-tile__copy";
        const domain = document.createElement("small");
        domain.textContent = ui().domains[lesson.domain];
        const title = document.createElement("b");
        title.textContent = titleFor(lesson);
        copy.append(domain, title);
        const arrow = document.createElement("strong");
        arrow.textContent = "▶";
        arrow.setAttribute("aria-hidden", "true");
        link.append(visual, copy, arrow);
        link.setAttribute("aria-label", `${ui().openLesson}: ${titleFor(lesson)}`);
        return link;
      }));
    }

    function renderMemoryGames() {
      const games = [
        {id:"age5-memory-match", zh:"小小記憶森林", en:"Little Memory Forest", cover:"memory-match-cover.webp"},
        {id:"age5-whats-missing", zh:"神祕消失箱", en:"The Mystery Missing Box", cover:"whats-missing-cover.webp"},
        {id:"age5-sound-friends", zh:"小耳朵偵探", en:"Little Ear Detective", cover:"sound-friends-cover.webp"},
        {id:"age5-remember-order", zh:"機器人的回家路", en:"Robot's Way Home", cover:"remember-order-cover.webp"},
      ];
      memoryGrid.replaceChildren(...games.map((game, index) => {
        const link = document.createElement("a");
        link.className = `ready-tile ready-tile--${["green","coral","blue","yellow"][index]}`;
        link.href = `play.html?game=${game.id}&lang=${locale === "zh-TW" ? "zh" : "en"}`;
        const visual = document.createElement("span");
        visual.className = "ready-tile__visual";
        const image = document.createElement("img");
        image.src = `assets/warm-folk/memory/${game.cover}`;
        image.alt = "";
        image.loading = "lazy";
        visual.append(image);
        const copy = document.createElement("span");
        copy.className = "ready-tile__copy";
        const domain = document.createElement("small");
        domain.textContent = ui().memoryDomain;
        const title = document.createElement("b");
        title.textContent = locale === "zh-TW" ? game.zh : game.en;
        copy.append(domain, title);
        const arrow = document.createElement("strong");
        arrow.textContent = "▶";
        link.append(visual, copy, arrow);
        link.setAttribute("aria-label", `${ui().openLesson}: ${title.textContent}`);
        return link;
      }));
    }

    function renderWeeks() {
      const domain = filter.value || "all";
      const cards = [];
      for (let week = 1; week <= data.meta.weekCount; week += 1) {
        const lessons = data.lessons.filter((lesson) => lesson.week === week && (domain === "all" || lesson.domain === domain));
        if (!lessons.length) continue;
        const section = document.createElement("section");
        section.className = "week-card";
        const heading = document.createElement("h3");
        heading.textContent = format(ui().week, {n: week});
        section.append(heading);
        const list = document.createElement("div");
        list.className = "lesson-list";
        for (const lesson of lessons) {
          const ready = ["pilot", "ready"].includes(lesson.contentStatus);
          const article = document.createElement("article");
          article.className = `lesson-tile${progress[lesson.id]?.completed ? " is-complete" : ""}${ready ? "" : " is-planned"}`;
          const top = document.createElement("div");
          top.className = "lesson-tile__top";
          top.innerHTML = `<span>${format(ui().lesson, {n: lesson.slot})}</span><span>${ui().domains[lesson.domain]}</span>`;
          const title = document.createElement("h4");
          title.textContent = titleFor(lesson);
          const status = document.createElement("p");
          status.textContent = ready ? ui().ready : ui().planned;
          article.append(top, title, status);
          if (lesson.languageMode === "en-only") {
            const badge = document.createElement("small");
            badge.className = "language-badge";
            badge.textContent = ui().englishLesson;
            article.append(badge);
          }
          if (ready) {
            const link = document.createElement("a");
            link.href = `play.html?game=${encodeURIComponent(lesson.gameId)}&lang=${lesson.languageMode === "en-only" ? "en" : locale === "zh-TW" ? "zh" : "en"}`;
            link.textContent = ui().openLesson;
            link.setAttribute("aria-label", `${ui().openLesson}: ${titleFor(lesson)}`);
            article.append(link);
          }
          list.append(article);
        }
        section.append(list);
        cards.push(section);
      }
      grid.replaceChildren(...cards);
    }

    populateFilter();
    renderReady();
    renderMemoryGames();
    renderWeeks();
    renderProgress();
    filter.addEventListener("change", renderWeeks);
    bindLanguageButton(() => { populateFilter(); renderReady(); renderMemoryGames(); renderWeeks(); renderProgress(); });
  }

  function renderLesson() {
    const lessonId = new URLSearchParams(location.search).get("id");
    const lesson = data.lessons.find((item) => item.id === lessonId);
    const root = document.querySelector("#lessonRoot");
    const unavailable = document.querySelector("#lessonUnavailable");
    if (!lesson || !["pilot", "ready"].includes(lesson.contentStatus)) {
      unavailable.hidden = false;
      bindLanguageButton(() => {});
      return;
    }

    if (lesson.languageMode === "en-only") {
      locale = "en-US";
      document.querySelector("#languageButton").hidden = true;
    }

    function activeContent() {
      return lesson.content[locale] || lesson.content["en-US"];
    }

    function render() {
      applyUiText();
      const content = activeContent();
      document.title = `${content.title} · Little Explorers`;
      document.querySelector("#lessonMeta").textContent = `${format(ui().week, {n: lesson.week})} · ${ui().domains[lesson.domain]} · ${lesson.estimatedMinutes} ${ui().minutes}`;
      document.querySelector("#lessonTitle").textContent = content.title;
      document.querySelector("#lessonMission").textContent = content.mission;
      document.querySelector("#lessonHook").textContent = content.hook;
      document.querySelector("#goalList").replaceChildren(...content.goals.map(listItem));
      const vocabulary = [];
      for (const item of content.vocabulary) {
        const term = document.createElement("dt"); term.textContent = item.term;
        const meaning = document.createElement("dd"); meaning.textContent = item.meaning;
        vocabulary.push(term, meaning);
      }
      document.querySelector("#vocabularyList").replaceChildren(...vocabulary);
      document.querySelector("#activityTitle").textContent = content.activity.title;
      document.querySelector("#activityTime").textContent = `${lesson.estimatedMinutes} ${ui().minutes}`;
      document.querySelector("#materials").textContent = `${ui().materials}: ${content.activity.materials.join(locale === "zh-TW" ? "、" : ", ")}`;
      document.querySelector("#activitySteps").replaceChildren(...content.activity.steps.map(listItem));
      renderQuiz(content.checks);
      document.querySelector("#caregiverPrompt").textContent = content.caregiverPrompt;
      document.querySelector("#extension").textContent = content.extension;
      updateCompleteButton();
    }

    function listItem(text) { const item = document.createElement("li"); item.textContent = text; return item; }

    function renderQuiz(checks) {
      const quiz = document.querySelector("#quizRoot");
      quiz.replaceChildren(...checks.map((check, index) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = `${format(ui().question, {n: index + 1})} · ${check.prompt}`;
        fieldset.append(legend);
        const feedback = document.createElement("p");
        feedback.className = "quiz-feedback";
        check.choices.forEach((choice, choiceIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = choice;
          button.addEventListener("click", () => {
            const correct = choiceIndex === check.answer;
            feedback.textContent = correct ? ui().correct : ui().tryAgain;
            feedback.dataset.correct = String(correct);
            if (correct) for (const sibling of fieldset.querySelectorAll("button")) sibling.disabled = true;
          });
          fieldset.append(button);
        });
        fieldset.append(feedback);
        return fieldset;
      }));
    }

    function updateCompleteButton() {
      const button = document.querySelector("#completeButton");
      const completed = Boolean(progress[lesson.id]?.completed);
      button.textContent = completed ? ui().completedButton : ui().markComplete;
      button.classList.toggle("is-complete", completed);
    }

    document.querySelector("#completeButton").addEventListener("click", () => {
      progress[lesson.id] = {completed: true, completedAt: new Date().toISOString()};
      saveProgress();
      updateCompleteButton();
    });

    document.querySelector("#speakButton").addEventListener("click", () => {
      if (!window.speechSynthesis) return;
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
      const content = activeContent();
      const utterance = new SpeechSynthesisUtterance([content.title, content.mission, content.hook, ...content.goals, ...content.activity.steps].join(". "));
      utterance.lang = locale;
      utterance.rate = locale === "zh-TW" ? 0.82 : 0.86;
      speechSynthesis.speak(utterance);
    });

    root.hidden = false;
    render();
    bindLanguageButton(render);
  }

  applyUiText();
  if (document.body.dataset.page === "hub") renderHub();
  if (document.body.dataset.page === "lesson") renderLesson();
})();
