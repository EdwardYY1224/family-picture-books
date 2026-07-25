/* 公車數一數 — 暖身：讓 N 位乘客上車；挑戰：上下車後推算剩下人數；任務：連續指令與 0 的概念。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  function numberChoice(value) {
    return { value: String(value), number: String(value), label: { zh: `${value} 位`, en: `${value}` } };
  }

  function boardPart(count, total, opening) {
    return {
      type: "count",
      prompt: {
        zh: `${opening ? opening.zh : ""}請讓 ${count} 位乘客上車。`,
        en: `${opening ? opening.en : ""}Let ${count} ${count === 1 ? "passenger" : "passengers"} get on the bus.`,
      },
      hint: {
        zh: `慢慢點選 ${count} 位乘客，一邊數 1、2……`,
        en: `Tap ${count} kids. Count out loud: one, two...`,
      },
      confirm: {
        zh: `${count} 位乘客上車了！`,
        en: `${count} ${count === 1 ? "passenger is" : "passengers are"} on the bus!`,
      },
      item: "kid",
      itemAlt: "kidAlt",
      total,
      count,
      focus: "bus",
    };
  }

  function alightPart(onBus, off) {
    return {
      type: "count",
      prompt: {
        zh: `車上有 ${onBus} 位乘客。到站了，請點 ${off} 位下車。`,
        en: `${onBus} passengers are on the bus. Tap ${off} to get off.`,
      },
      hint: {
        zh: `只要點 ${off} 位就好。`,
        en: `Just tap ${off}, no more.`,
      },
      confirm: {
        zh: `${off} 位乘客下車了。`,
        en: `${off} ${off === 1 ? "passenger" : "passengers"} got off.`,
      },
      item: "kid",
      itemAlt: "kidAlt",
      total: onBus,
      count: off,
      focus: "bus",
      mode: "off",
    };
  }

  function remainPart(question, answer, options, confirm) {
    return {
      type: "choice",
      prompt: question,
      hint: {
        zh: "用手指幫忙數一數，再選數字。",
        en: "Count on your fingers, then pick the number.",
      },
      confirm,
      choices: options.map(numberChoice),
      answer: String(answer),
    };
  }

  window.KidGameData.counting = {
    icon: "bus",
    title: { zh: "公車數一數", en: "Counting Bus" },
    description: {
      zh: "先照數量讓乘客上車，再挑戰有人下車後剩幾位，最後完成連續的上下車任務。",
      en: "Count passengers on, then figure out how many are left, then run the whole bus stop!",
    },
    minutes: 9,
    rounds: [
      { stage: 0, parts: [boardPart(2, 5)] },
      { stage: 0, parts: [boardPart(3, 5)] },
      { stage: 0, parts: [boardPart(4, 5)] },
      {
        stage: 1,
        parts: [
          alightPart(4, 1),
          remainPart(
            { zh: "剛剛有 1 位下車，現在車上還有幾位乘客？", en: "One got off. How many are still on the bus?" },
            3, [2, 3, 4],
            { zh: "對，4 位走了 1 位，還有 3 位！", en: "Yes! Four minus one is three!" }
          ),
        ],
      },
      {
        stage: 1,
        parts: [
          boardPart(3, 5),
          remainPart(
            { zh: "開車囉！有 1 位乘客先下車了，現在車上還有幾位？", en: "Off we go! One passenger got off early. How many are left?" },
            2, [1, 2, 3],
            { zh: "對，3 位走了 1 位，剩 2 位！", en: "Right! Three minus one is two!" }
          ),
        ],
      },
      {
        stage: 1,
        parts: [
          alightPart(5, 2),
          remainPart(
            { zh: "2 位下車了，現在車上還有幾位乘客？", en: "Two got off. How many are still on the bus?" },
            3, [2, 3, 4],
            { zh: "對，5 位走了 2 位，還有 3 位！", en: "Yes! Five minus two is three!" }
          ),
        ],
      },
      {
        stage: 1,
        parts: [
          boardPart(2, 5),
          remainPart(
            { zh: "下一站又上來 2 位！現在車上一共有幾位？", en: "Two more got on at the next stop! How many now?" },
            4, [3, 4, 5],
            { zh: "對，2 位加 2 位，一共 4 位！", en: "Yes! Two plus two is four!" }
          ),
        ],
      },
      {
        stage: 2,
        parts: [
          boardPart(3, 5, { zh: "你是今天的小司機！", en: "You are the bus driver today! " }),
          alightPart(3, 1),
          remainPart(
            { zh: "先上來 3 位、又下去 1 位，現在車上有幾位？", en: "Three got on, one got off. How many are on the bus now?" },
            2, [1, 2, 3],
            { zh: "答對了，車上剩 2 位乘客！", en: "That's right, two passengers left!" }
          ),
        ],
      },
      {
        stage: 2,
        parts: [
          boardPart(4, 5, { zh: "最後一班車！", en: "Last bus of the day! " }),
          remainPart(
            { zh: "終點站到了！4 位乘客全部下車，現在車上還有幾位？", en: "Last stop! All four passengers get off. How many are left on the bus?" },
            0, [0, 1, 2],
            { zh: "對，全部下車就是 0 位，公車休息囉！", en: "Yes! Zero passengers. The bus can rest now!" }
          ),
        ],
      },
    ],
  };
})();
