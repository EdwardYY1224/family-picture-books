/* 小小市場輪流買 — 暖身：照清單放數量；挑戰：記住清單再購買；任務：兩樣商品的記憶清單與結帳。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const GOODS = {
    apple: { icon: "apple", zh: "蘋果", en: "apple", enPlural: "apples", unit: { zh: "個", en: "" } },
    banana: { icon: "banana", zh: "香蕉", en: "banana", enPlural: "bananas", unit: { zh: "根", en: "" } },
    carrot: { icon: "carrot", zh: "紅蘿蔔", en: "carrot", enPlural: "carrots", unit: { zh: "根", en: "" } },
    bread: { icon: "bread", zh: "麵包", en: "bread roll", enPlural: "bread rolls", unit: { zh: "個", en: "" } },
    strawberry: { icon: "strawberry", zh: "草莓", en: "strawberry", enPlural: "strawberries", unit: { zh: "顆", en: "" } },
  };
  const enName = (name, count) => (count === 1 ? GOODS[name].en : GOODS[name].enPlural);

  function numberChoice(value) {
    return { value: String(value), number: String(value), label: { zh: `${value} 個`, en: `${value}` } };
  }

  function buyPart(name, count, fromMemory) {
    const item = GOODS[name];
    return {
      type: "count",
      prompt: fromMemory
        ? { zh: `剛才的清單上，要買幾${item.unit.zh}${item.zh}？把它們放進籃子。`, en: `How many ${item.enPlural} were on the list? Put them in the basket.` }
        : { zh: `請把 ${count} ${item.unit.zh}${item.zh}放進籃子。`, en: `Put ${count} ${enName(name, count)} in the basket.` },
      hint: fromMemory
        ? { zh: `想一想剛才的清單……是 ${count} ${item.unit.zh}喔。`, en: `Think about the list... it was ${count}.` }
        : { zh: `一邊點${item.zh}，一邊從 1 數到 ${count}。`, en: `Tap and count: one, two...` },
      confirm: { zh: `${count} ${item.unit.zh}${item.zh}放進籃子了！`, en: `${count} ${enName(name, count)} in the basket!` },
      item: item.icon,
      total: 5,
      count,
      focus: "basket",
    };
  }

  function listPart(entries) {
    const zhList = entries.map(([name, count]) => `${count} ${GOODS[name].unit.zh}${GOODS[name].zh}`).join("和");
    const enList = entries.map(([name, count]) => `${count} ${enName(name, count)}`).join(" and ");
    return {
      type: "watch",
      mode: "list",
      prompt: { zh: `看購物清單：要買${zhList}。記好囉！`, en: `Look at the list: ${enList}. Remember it!` },
      hint: { zh: "多看幾秒沒關係，記好再按。", en: "Take your time, then press the button." },
      reveal: entries.map(([name, count]) => ({ icon: GOODS[name].icon, count, label: { zh: GOODS[name].zh, en: enName(name, count) } })),
    };
  }

  function memoryRound(name, count) {
    return { stage: 1, parts: [listPart([[name, count]]), buyPart(name, count, true)] };
  }

  function checkoutPart(entries, total, options) {
    const zhList = entries.map(([name, count]) => `${count} ${GOODS[name].unit.zh}${GOODS[name].zh}`).join("和");
    const enList = entries.map(([name, count]) => `${count} ${enName(name, count)}`).join(" and ");
    return {
      type: "choice",
      prompt: { zh: `要結帳囉！${zhList}，一共是幾個？`, en: `Time to pay! ${enList} — how many altogether?` },
      hint: { zh: "把兩樣加起來，用手指數數看。", en: "Count them all together on your fingers." },
      confirm: { zh: `對，一共 ${total} 個！買完囉，謝謝光臨！`, en: `Yes, ${total} altogether! Thank you, come again!` },
      choices: options.map(numberChoice),
      answer: String(total),
    };
  }

  function bigMissionRound(entries, total, options) {
    return {
      stage: 2,
      parts: [
        listPart(entries),
        ...entries.map(([name, count]) => buyPart(name, count, true)),
        checkoutPart(entries, total, options),
      ],
    };
  }

  window.KidGameData.market = {
    icon: "basket",
    title: { zh: "小小市場輪流買", en: "Little Market" },
    description: {
      zh: "先照清單放數量，再記住清單購買，最後完成兩樣商品的採買和結帳。",
      en: "Shop with a list, then from memory, then buy two things and pay!",
    },
    minutes: 10,
    rounds: [
      { stage: 0, parts: [buyPart("apple", 2, false)] },
      { stage: 0, parts: [buyPart("banana", 3, false)] },
      { stage: 0, parts: [buyPart("carrot", 4, false)] },
      memoryRound("apple", 3),
      memoryRound("bread", 2),
      memoryRound("strawberry", 4),
      memoryRound("banana", 5),
      bigMissionRound([["apple", 2], ["banana", 1]], 3, [2, 3, 4]),
      bigMissionRound([["bread", 1], ["strawberry", 2]], 3, [2, 3, 4]),
      bigMissionRound([["carrot", 2], ["apple", 2]], 4, [3, 4, 5]),
    ],
  };
})();
