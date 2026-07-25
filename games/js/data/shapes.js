/* 形狀快遞車 — 暖身：形狀配對；挑戰：形狀＋顏色雙條件；任務：依順序送兩件包裹。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const SHAPE_LABEL = {
    circle: { zh: "圓形", en: "circle" },
    triangle: { zh: "三角形", en: "triangle" },
    square: { zh: "正方形", en: "square" },
    rectangle: { zh: "長方形", en: "rectangle" },
    star: { zh: "星形", en: "star" },
  };
  const COLOR_LABEL = {
    red: { zh: "紅色", en: "red" },
    yellow: { zh: "黃色", en: "yellow" },
    blue: { zh: "藍色", en: "blue" },
    green: { zh: "綠色", en: "green" },
  };

  function piece(shape, color) {
    return {
      value: `${shape}-${color}`,
      shape,
      color,
      label: {
        zh: `${COLOR_LABEL[color].zh}${SHAPE_LABEL[shape].zh}`,
        en: `${COLOR_LABEL[color].en} ${SHAPE_LABEL[shape].en}`,
      },
    };
  }

  /* Warm-up: only the shape matters; every option keeps its own colour. */
  function warmupRound(shape, color, others) {
    const source = piece(shape, color);
    return {
      stage: 0,
      parts: [{
        type: "drag",
        prompt: {
          zh: `把${SHAPE_LABEL[shape].zh}包裹，送進${SHAPE_LABEL[shape].zh}車廂。`,
          en: `Put the ${SHAPE_LABEL[shape].en} box in the ${SHAPE_LABEL[shape].en} truck.`,
        },
        hint: {
          zh: `找一個和包裹外形一模一樣的${SHAPE_LABEL[shape].zh}。`,
          en: `Look for the same shape as your box.`,
        },
        confirm: {
          zh: `${SHAPE_LABEL[shape].zh}包裹送到了！`,
          en: `The ${SHAPE_LABEL[shape].en} box is delivered!`,
        },
        source,
        targets: [source, ...others],
        answer: source.value,
      }],
    };
  }

  /* Challenge: shape AND colour must both match. */
  function comboRound(shape, color, distractors) {
    const source = piece(shape, color);
    return {
      stage: 1,
      parts: [{
        type: "drag",
        prompt: {
          zh: `把${source.label.zh}包裹，送進${source.label.zh}車廂。`,
          en: `Find the ${source.label.en} truck for the ${source.label.en} box.`,
        },
        hint: {
          zh: `形狀和顏色都要一樣：${source.label.zh}。`,
          en: `Same shape AND same color: ${source.label.en}.`,
        },
        confirm: {
          zh: `${source.label.zh}包裹送對車廂了！`,
          en: `The ${source.label.en} box found its truck!`,
        },
        source,
        targets: [source, ...distractors],
        answer: source.value,
      }],
    };
  }

  /* Mission: two deliveries in a fixed order. */
  function missionPart(order, shape, color, distractors) {
    const source = piece(shape, color);
    return {
      type: "drag",
      prompt: {
        zh: `${order === 0 ? "第一件" : "第二件"}：把${source.label.zh}包裹送進${source.label.zh}車廂。`,
        en: `${order === 0 ? "First box" : "Second box"}: the ${source.label.en} one goes in the ${source.label.en} truck.`,
      },
      hint: {
        zh: `現在只看${source.label.zh}的包裹和車廂。`,
        en: `Right now, only look for ${source.label.en}.`,
      },
      confirm: order === 0
        ? { zh: "第一件送到了！還有一件。", en: "First box delivered! One more." }
        : { zh: "兩件包裹都送到了！", en: "Both boxes are delivered!" },
      source,
      targets: [source, ...distractors],
      answer: source.value,
    };
  }

  window.KidGameData.shapes = {
    icon: "truck",
    title: { zh: "形狀快遞車", en: "Shape Delivery" },
    description: {
      zh: "先把形狀送對車廂，再挑戰形狀加顏色，最後依順序送兩件包裹。",
      en: "Match shapes, then shapes and colors, then deliver two boxes in order.",
    },
    minutes: 9,
    rounds: [
      warmupRound("circle", "blue", [piece("triangle", "red"), piece("square", "green")]),
      warmupRound("triangle", "red", [piece("star", "yellow"), piece("circle", "blue")]),
      warmupRound("star", "yellow", [piece("rectangle", "green"), piece("triangle", "red")]),
      comboRound("circle", "red", [piece("circle", "blue"), piece("triangle", "red")]),
      comboRound("square", "blue", [piece("square", "yellow"), piece("circle", "blue")]),
      comboRound("star", "yellow", [piece("star", "blue"), piece("circle", "yellow")]),
      comboRound("rectangle", "green", [piece("square", "green"), piece("rectangle", "red")]),
      {
        stage: 2,
        parts: [
          missionPart(0, "circle", "green", [piece("star", "green"), piece("circle", "yellow")]),
          missionPart(1, "star", "red", [piece("star", "blue"), piece("triangle", "red")]),
        ],
      },
      {
        stage: 2,
        parts: [
          missionPart(0, "triangle", "blue", [piece("triangle", "yellow"), piece("square", "blue")]),
          missionPart(1, "rectangle", "yellow", [piece("rectangle", "blue"), piece("star", "yellow")]),
        ],
      },
    ],
  };
})();
