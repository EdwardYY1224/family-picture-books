/* 城市聲音偵探 — 暖身：單一聲音配對；挑戰：記住兩個連續聲音；任務：記住三個連續聲音並依序點選。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const OWNERS = {
    bus: { value: "bus", icon: "bus", sound: "horn", label: { zh: "公車", en: "Bus" } },
    ambulance: { value: "ambulance", icon: "ambulance", sound: "siren", label: { zh: "救護車", en: "Ambulance" } },
    dog: { value: "dog", icon: "dog", sound: "bark", label: { zh: "小狗", en: "Dog" } },
    bike: { value: "bike", icon: "bike", sound: "bell", label: { zh: "腳踏車", en: "Bike" } },
    train: { value: "train", icon: "train", sound: "train", label: { zh: "列車", en: "Train" } },
  };
  const pick = (names) => names.map((name) => OWNERS[name]);

  function singleRound(answer, others, question, hint, confirm) {
    return {
      stage: 0,
      parts: [{
        type: "choice",
        prompt: question,
        hint,
        confirm,
        sound: OWNERS[answer].sound,
        choices: pick([answer, ...others]),
        answer,
      }],
    };
  }

  function memoryRound(stage, sequence, extra) {
    const count = sequence.length;
    return {
      stage,
      parts: [
        {
          type: "watch",
          mode: "sounds",
          prompt: {
            zh: `仔細聽！有 ${count} 個聲音會照順序出現，記住它們。`,
            en: `Listen! ${count} sounds will play in order. Remember them!`,
          },
          hint: {
            zh: "可以按「再聽一次」多聽幾次，不用急。",
            en: "You can press play again. No rush!",
          },
          sounds: sequence.map((name) => OWNERS[name].sound),
        },
        {
          type: "sequence",
          memory: true,
          prompt: {
            zh: "換你了！照剛才聽到的順序，點出聲音的主人。",
            en: "Your turn! Tap who made each sound, in the same order.",
          },
          hint: {
            zh: "想一想：第一個聲音是誰？再聽一次也可以。",
            en: "Think: who made the first sound? Listen again if you like.",
          },
          confirm: {
            zh: "太厲害了，聲音的順序全部記對了！",
            en: "Amazing! You remembered every sound in order!",
          },
          replaySounds: sequence.map((name) => OWNERS[name].sound),
          steps: pick(sequence),
          extras: pick([extra]),
        },
      ],
    };
  }

  window.KidGameData.sounds = {
    icon: "speaker",
    title: { zh: "城市聲音偵探", en: "Sound Detective" },
    description: {
      zh: "先聽一個聲音找主人，再挑戰記住兩個、三個連續聲音的順序。",
      en: "Match one sound, then remember two and three sounds in a row.",
    },
    minutes: 9,
    rounds: [
      singleRound("bus", ["dog", "bike"],
        { zh: "聽一聽，是誰在按喇叭？", en: "Listen! Who is honking?" },
        { zh: "大大的公車會發出低低的喇叭聲。", en: "The big bus makes a low honk." },
        { zh: "找到公車了！", en: "You found the bus!" }),
      singleRound("dog", ["train", "ambulance"],
        { zh: "聽一聽，是誰在汪汪叫？", en: "Listen! Who is barking?" },
        { zh: "小狗會汪汪叫。", en: "A dog says woof woof." },
        { zh: "找到小狗了！", en: "You found the dog!" }),
      singleRound("bike", ["bus", "train"],
        { zh: "聽一聽，是誰發出清脆的鈴聲？", en: "Listen! Who is ringing a little bell?" },
        { zh: "腳踏車有小鈴鐺。", en: "A bike has a tiny bell." },
        { zh: "找到腳踏車了！", en: "You found the bike!" }),
      memoryRound(1, ["bus", "dog"], "bike"),
      memoryRound(1, ["bike", "ambulance"], "train"),
      memoryRound(1, ["train", "bus"], "dog"),
      memoryRound(1, ["dog", "bike"], "ambulance"),
      memoryRound(2, ["bus", "bike", "dog"], "train"),
      memoryRound(2, ["ambulance", "train", "bike"], "dog"),
    ],
  };
})();
