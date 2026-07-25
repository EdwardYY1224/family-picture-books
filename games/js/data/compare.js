/* 建築工地比一比 — 暖身：兩物件比較；挑戰：三物件找最高、最大、最短；任務：第二高與條件組合。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  function item(value, icon, size, label, wide) {
    const entry = { value, icon, size, label };
    if (wide) entry.wide = wide;
    return entry;
  }

  function round(stage, prompt, hint, confirm, choices, answer) {
    return { stage, parts: [{ type: "choice", prompt, hint, confirm, choices, answer, keepOrder: false }] };
  }

  window.KidGameData.compare = {
    icon: "crane",
    title: { zh: "建築工地比一比", en: "Building Compare" },
    description: {
      zh: "先比兩個，再從三個裡找最高、最短，最後挑戰「第二高」。",
      en: "Compare two things, then find the tallest of three, then the tricky second-tallest!",
    },
    minutes: 8,
    rounds: [
      round(0,
        { zh: "哪一棟房子比較高？", en: "Which building is taller?" },
        { zh: "從地面往上看，誰伸得比較高？", en: "Look from the ground up. Which one reaches higher?" },
        { zh: "找到比較高的大樓了！", en: "You found the taller one!" },
        [item("low", "house", 56, { zh: "小房子", en: "Little house" }), item("high", "building", 94, { zh: "大樓", en: "Tall building" })],
        "high"),
      round(0,
        { zh: "哪一顆球比較大？", en: "Which ball is bigger?" },
        { zh: "找佔的位置比較多的球。", en: "Which ball takes up more room?" },
        { zh: "找到比較大的球了！", en: "You found the big ball!" },
        [item("big", "ball", 92, { zh: "大球", en: "Big ball" }), item("small", "ball", 50, { zh: "小球", en: "Small ball" })],
        "big"),
      round(0,
        { zh: "哪一支鉛筆比較短？", en: "Which pencil is shorter?" },
        { zh: "找頭到尾距離比較短的鉛筆。", en: "Which pencil is a smaller stick?" },
        { zh: "找到比較短的鉛筆了！", en: "You found the short pencil!" },
        [item("long", "pencil", 92, { zh: "長鉛筆", en: "Long pencil" }), item("short", "pencil", 54, { zh: "短鉛筆", en: "Short pencil" })],
        "short"),
      round(1,
        { zh: "工地裡有三棟建築，哪一個最高？", en: "Three things at the building site. Which is the tallest?" },
        { zh: "三個都比一比，找最靠近天空的。", en: "Compare all three. Which one is closest to the sky?" },
        { zh: "對，吊車最高！", en: "Yes! The crane is the tallest!" },
        [item("house", "house", 52, { zh: "小房子", en: "House" }), item("building", "building", 74, { zh: "大樓", en: "Building" }), item("crane", "crane", 95, { zh: "吊車", en: "Crane" })],
        "crane"),
      round(1,
        { zh: "三顆球裡面，哪一顆最大？", en: "Three balls. Which is the biggest?" },
        { zh: "一顆一顆比，找佔位置最多的。", en: "Check one by one. Which takes the most room?" },
        { zh: "對，就是最大的那顆！", en: "Yes, that's the biggest!" },
        [item("small", "ball", 48, { zh: "小球", en: "Small" }), item("mid", "ball", 68, { zh: "中球", en: "Medium" }), item("big", "ball", 92, { zh: "大球", en: "Big" })],
        "big"),
      round(1,
        { zh: "三輛車裡面，哪一輛最短？", en: "Three vehicles. Which is the shortest?" },
        { zh: "從車頭看到車尾，找最短的。", en: "Look from front to back. Find the smallest one." },
        { zh: "對，找到最短的車了！", en: "Yes! That's the shortest!" },
        [item("bus", "bus", 88, { zh: "公車", en: "Bus" }, 1.2), item("car", "car", 66, { zh: "汽車", en: "Car" }), item("mini", "car", 46, { zh: "小小車", en: "Tiny car" })],
        "mini"),
      round(1,
        { zh: "三把雨傘裡面，哪一把最小？", en: "Three umbrellas. Which is the smallest?" },
        { zh: "找張開後佔位置最少的那把。", en: "Find the one that covers the least." },
        { zh: "對，最小的雨傘找到了！", en: "Yes! The smallest umbrella!" },
        [item("big", "umbrella", 92, { zh: "大雨傘", en: "Big" }), item("mid", "umbrella", 68, { zh: "中雨傘", en: "Medium" }), item("small", "umbrella", 48, { zh: "小雨傘", en: "Small" })],
        "small"),
      round(2,
        { zh: "城市任務：找出「第二高」的建築。", en: "City mission: find the SECOND tallest one." },
        { zh: "不是最高，也不是最矮，是中間的那一個。", en: "Not the tallest, not the smallest — the one in the middle." },
        { zh: "太棒了！第二高就是中間高度的大樓。", en: "Wonderful! The second tallest is the middle one." },
        [item("house", "house", 52, { zh: "小房子", en: "House" }), item("building", "building", 74, { zh: "大樓", en: "Building" }), item("crane", "crane", 95, { zh: "吊車", en: "Crane" })],
        "building"),
      {
        stage: 2,
        parts: [
          {
            type: "choice",
            prompt: { zh: "先找出：三座梯子裡「最長」的。", en: "First: find the LONGEST ladder." },
            hint: { zh: "找從頭到尾最長的那一座。", en: "Which one is the longest stick?" },
            confirm: { zh: "找到最長的了！還有一個任務。", en: "That's the longest! One more task." },
            choices: [item("short", "ladder", 50, { zh: "短梯子", en: "Short" }), item("mid", "ladder", 70, { zh: "中梯子", en: "Medium" }), item("long", "ladder", 94, { zh: "長梯子", en: "Long" })],
            answer: "long",
          },
          {
            type: "choice",
            prompt: { zh: "換規則囉！現在找出「最短」的梯子。", en: "New rule! Now find the SHORTEST ladder." },
            hint: { zh: "規則變了：這次要找最短的。", en: "The rule changed: now look for the shortest." },
            confirm: { zh: "任務完成！你會找最長，也會找最短。", en: "Mission complete! You found longest AND shortest." },
            choices: [item("short", "ladder", 50, { zh: "短梯子", en: "Short" }), item("mid", "ladder", 70, { zh: "中梯子", en: "Medium" }), item("long", "ladder", 94, { zh: "長梯子", en: "Long" })],
            answer: "short",
          },
        ],
      },
    ],
  };
})();
