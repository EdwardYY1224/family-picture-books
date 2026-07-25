/* 早餐順序任務 — 暖身：4 步生活順序；挑戰：5 步；任務：6 步與「找出放錯的卡片」。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const step = (value, icon, zh, en) => ({ value, icon, label: { zh, en } });

  function seqRound(stage, prompt, confirm, steps, hint) {
    return {
      stage,
      parts: [{
        type: "sequence",
        prompt,
        hint: hint || { zh: "先找出第一件會做的事，再一步一步往後。", en: "Find what happens first, then go step by step." },
        confirm,
        steps,
      }],
    };
  }

  window.KidGameData.sequence = {
    icon: "sun",
    title: { zh: "早餐順序任務", en: "Daily Order Quest" },
    description: {
      zh: "把生活裡的事照先後點好：從 4 步、5 步到 6 步，最後找出放錯的卡片。",
      en: "Put daily life in order: 4 steps, 5 steps, 6 steps — then spot the wrong card!",
    },
    minutes: 10,
    rounds: [
      seqRound(0,
        { zh: "早上出門前，照順序點一點。", en: "Getting ready in the morning — tap in order." },
        { zh: "早晨順序完成了！", en: "Morning routine done!" },
        [
          step("wake", "bed", "起床", "Wake up"),
          step("brush", "toothbrush", "刷牙", "Brush teeth"),
          step("eat", "bowl", "吃早餐", "Eat breakfast"),
          step("leave", "backpack", "出門", "Go out"),
        ]),
      seqRound(0,
        { zh: "過馬路時，照安全順序點一點。", en: "Crossing the street — tap the safe steps in order." },
        { zh: "安全過馬路順序完成！", en: "Safe crossing done!" },
        [
          step("stop", "stopHand", "停下", "Stop"),
          step("left", "lookLeft", "看左", "Look left"),
          step("right", "lookRight", "看右", "Look right"),
          step("cross", "walk", "通過", "Cross"),
        ]),
      seqRound(0,
        { zh: "洗手時，照順序點一點。", en: "Washing hands — tap in order." },
        { zh: "洗手順序完成了！", en: "Hand washing done!" },
        [
          step("wet", "waterDrop", "沖濕", "Get wet"),
          step("soap", "soap", "抹肥皂", "Soap"),
          step("rub", "handsRub", "搓一搓", "Rub"),
          step("rinse", "shower", "沖乾淨", "Rinse"),
        ]),
      seqRound(1,
        { zh: "種一顆小種子，5 個步驟照順序點一點。", en: "Plant a little seed — five steps in order." },
        { zh: "小種子發芽了！", en: "The seed sprouted!" },
        [
          step("soil", "pot", "準備盆土", "Get the pot"),
          step("seed", "seed", "放種子", "Plant the seed"),
          step("water", "waterDrop", "澆水", "Water it"),
          step("sun", "sun", "曬太陽", "Give it sun"),
          step("grow", "sprout", "發芽了", "It grows"),
        ]),
      seqRound(1,
        { zh: "睡覺前有 5 件事，照順序點一點。", en: "Five things before bed — tap in order." },
        { zh: "睡前順序完成了，晚安！", en: "Bedtime routine done. Good night!" },
        [
          step("tidy", "teddy", "收玩具", "Tidy toys"),
          step("bath", "bathtub", "洗澡", "Bath"),
          step("pajama", "tshirt", "穿睡衣", "Pajamas"),
          step("story", "book", "聽故事", "Story"),
          step("sleep", "moon", "睡覺", "Sleep"),
        ]),
      seqRound(1,
        { zh: "自己穿衣服出門，5 個步驟照順序點一點。", en: "Get dressed all by yourself — five steps in order." },
        { zh: "穿好衣服，可以出門了！", en: "All dressed and ready to go!" },
        [
          step("shirt", "tshirt", "穿上衣", "Shirt"),
          step("pants", "pants", "穿褲子", "Pants"),
          step("socks", "socks", "穿襪子", "Socks"),
          step("shoes", "shoes", "穿鞋子", "Shoes"),
          step("door", "door", "出門", "Out the door"),
        ]),
      seqRound(1,
        { zh: "把手洗得香香的，5 個步驟照順序點一點。", en: "Wash hands squeaky clean — five steps in order." },
        { zh: "手洗得乾乾淨淨！", en: "Hands are super clean!" },
        [
          step("wet", "waterDrop", "沖濕", "Get wet"),
          step("soap", "soap", "抹肥皂", "Soap"),
          step("rub", "handsRub", "搓一搓", "Rub"),
          step("rinse", "shower", "沖乾淨", "Rinse"),
          step("dry", "towel", "擦乾", "Dry"),
        ]),
      seqRound(2,
        { zh: "城市任務：去公園野餐！6 個步驟照順序點一點。", en: "City mission: picnic in the park! Six steps in order." },
        { zh: "到公園了，野餐開始！", en: "You made it to the park. Picnic time!" },
        [
          step("wake", "bed", "起床", "Wake up"),
          step("eat", "bowl", "吃早餐", "Breakfast"),
          step("dress", "tshirt", "換衣服", "Get dressed"),
          step("shoes", "shoes", "穿鞋子", "Shoes"),
          step("walk", "walk", "走路出發", "Walk"),
          step("park", "park", "到公園", "The park!"),
        ],
        { zh: "一天的開始是什麼？從起床慢慢想。", en: "How does a day start? Think from waking up." }),
      {
        stage: 2,
        parts: [{
          type: "choice",
          keepOrder: true,
          rowLayout: true,
          prompt: { zh: "睡覺前的順序裡，有一張卡片放錯了！點出來。", en: "One card is wrong in this bedtime order! Tap the silly one." },
          hint: { zh: "睡覺以前，需要背書包嗎？", en: "Do you need a backpack before bed?" },
          confirm: { zh: "答對了！睡覺前不用背書包。", en: "Yes! No backpack before bed. Silly card!" },
          choices: [
            { value: "tidy", icon: "teddy", label: { zh: "收玩具", en: "Tidy toys" } },
            { value: "bath", icon: "bathtub", label: { zh: "洗澡", en: "Bath" } },
            { value: "backpack", icon: "backpack", label: { zh: "背書包", en: "Backpack" } },
            { value: "story", icon: "book", label: { zh: "聽故事", en: "Story" } },
            { value: "sleep", icon: "moon", label: { zh: "睡覺", en: "Sleep" } },
          ],
          answer: "backpack",
        }],
      },
    ],
  };
})();
