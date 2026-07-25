/* 公園表情小故事 — 暖身：認出情緒；挑戰：認出情緒後選擇友善回應；任務：情緒會隨故事改變。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const FACES = {
    happy: { value: "happy", icon: "happy", label: { zh: "開心", en: "Happy" } },
    sad: { value: "sad", icon: "sad", label: { zh: "難過", en: "Sad" } },
    angry: { value: "angry", icon: "angry", label: { zh: "生氣", en: "Angry" } },
    afraid: { value: "afraid", icon: "afraid", label: { zh: "害怕", en: "Scared" } },
    surprised: { value: "surprised", icon: "surprised", label: { zh: "驚訝", en: "Surprised" } },
  };
  const faces = (names) => names.map((name) => FACES[name]);

  function feelPart(story, answer, options, hint, confirm) {
    return {
      type: "choice",
      prompt: story,
      hint,
      confirm,
      choices: faces(options),
      answer,
    };
  }

  function feelRound(story, answer, options, hint, confirm) {
    return { stage: 0, parts: [feelPart(story, answer, options, hint, confirm)] };
  }

  window.KidGameData.emotions = {
    icon: "happy",
    title: { zh: "公園表情小故事", en: "Park Feelings" },
    description: {
      zh: "先認出朋友的心情，再想想可以怎麼幫忙，最後看看心情怎麼變化。",
      en: "Spot how a friend feels, choose a kind way to help, and watch feelings change.",
    },
    minutes: 9,
    rounds: [
      feelRound(
        { zh: "小寶找到最喜歡的玩具，他現在是什麼感覺？", en: "Bao found his favorite toy! How does he feel?" },
        "happy", ["happy", "sad", "angry"],
        { zh: "找到喜歡的東西，嘴角會往上翹。", en: "Finding something you love makes you smile." },
        { zh: "對，他好開心！", en: "Yes, he is so happy!" }),
      feelRound(
        { zh: "小美的冰淇淋掉到地上了，她是什麼感覺？", en: "Mei's ice cream fell on the ground. How does she feel?" },
        "sad", ["happy", "sad", "surprised"],
        { zh: "失去喜歡的東西，可能會想哭。", en: "Losing a treat can make you want to cry." },
        { zh: "對，她覺得難過。", en: "Yes, she feels sad." }),
      feelRound(
        { zh: "禮物盒突然跳出一隻玩具小丑！小安是什麼感覺？", en: "A toy clown popped out of the box! How does An feel?" },
        "surprised", ["surprised", "sad", "angry"],
        { zh: "沒想到的事情，會讓眼睛睜得大大的。", en: "A big surprise makes your eyes go wide." },
        { zh: "對，他嚇了一跳，好驚訝！", en: "Yes, what a surprise!" }),
      {
        stage: 1,
        parts: [
          feelPart(
            { zh: "小美的冰淇淋掉了，正在掉眼淚。她是什麼感覺？", en: "Mei dropped her ice cream and has tears. How does she feel?" },
            "sad", ["happy", "sad", "afraid"],
            { zh: "掉眼淚通常表示難過。", en: "Tears usually mean sad." },
            { zh: "對，她很難過。那我們可以做什麼？", en: "Yes, she is sad. What can we do?" }),
          {
            type: "choice",
            prompt: { zh: "小美好難過，我們可以怎麼做？", en: "Mei is sad. What is a kind thing to do?" },
            hint: { zh: "想一想：哪一個會讓她覺得溫暖？", en: "Which one would feel warm and kind?" },
            confirm: { zh: "抱抱她、陪陪她，難過會變小。", en: "A hug makes the sad feeling smaller." },
            choices: [
              { value: "hug", icon: "hug", label: { zh: "抱抱她", en: "Give a hug" } },
              { value: "leave", icon: "door", label: { zh: "自己走開", en: "Walk away" } },
              { value: "play", icon: "ball", label: { zh: "自己去玩球", en: "Go play alone" } },
            ],
            answer: "hug",
          },
        ],
      },
      {
        stage: 1,
        parts: [
          feelPart(
            { zh: "小寶蓋的積木塔被撞倒了，他皺著眉頭。他是什麼感覺？", en: "Bao's block tower got knocked down. His eyebrows are scrunched. How does he feel?" },
            "angry", ["angry", "happy", "surprised"],
            { zh: "眉毛皺起來，常常是生氣了。", en: "Scrunched eyebrows often mean angry." },
            { zh: "對，他有點生氣。可以怎麼幫他？", en: "Yes, he is angry. How can we help?" }),
          {
            type: "choice",
            prompt: { zh: "積木倒了，怎麼做可以幫小寶？", en: "The tower fell. What would help Bao?" },
            hint: { zh: "一起做，比自己玩更能幫上忙。", en: "Helping together is kinder than playing alone." },
            confirm: { zh: "一起把積木蓋回來，他就不生氣了！", en: "Building it together makes it better!" },
            choices: [
              { value: "help", icon: "share", label: { zh: "幫他一起蓋", en: "Help rebuild" } },
              { value: "leave", icon: "door", label: { zh: "自己走開", en: "Walk away" } },
              { value: "play", icon: "ball", label: { zh: "自己去玩球", en: "Go play alone" } },
            ],
            answer: "help",
          },
        ],
      },
      {
        stage: 1,
        parts: [
          feelPart(
            { zh: "打雷了！轟隆隆！小安抱著膝蓋躲起來。他是什麼感覺？", en: "Thunder! Boom! An is hiding and hugging his knees. How does he feel?" },
            "afraid", ["afraid", "happy", "angry"],
            { zh: "突然的大聲音，會讓人想躲起來。", en: "Loud sounds can make us want to hide." },
            { zh: "對，他覺得害怕。可以怎麼陪他？", en: "Yes, he is scared. How can we help?" }),
          {
            type: "choice",
            prompt: { zh: "小安在打雷時好害怕，怎麼做可以陪他？", en: "An is scared of the thunder. What is a kind thing to do?" },
            hint: { zh: "害怕的時候，有人陪著最安心。", en: "When you are scared, company helps the most." },
            confirm: { zh: "牽牽手、陪著他，害怕就變小了。", en: "Staying close makes the scary feeling smaller." },
            choices: [
              { value: "stay", icon: "hug", label: { zh: "牽手陪著他", en: "Stay with him" } },
              { value: "leave", icon: "door", label: { zh: "自己走開", en: "Walk away" } },
              { value: "play", icon: "ball", label: { zh: "自己去玩球", en: "Go play alone" } },
            ],
            answer: "stay",
          },
        ],
      },
      {
        stage: 1,
        parts: [
          feelPart(
            { zh: "新朋友第一次來公園，站在旁邊不敢說話。她可能是什麼感覺？", en: "A new friend is at the park for the first time, standing quietly. How might she feel?" },
            "afraid", ["afraid", "angry", "happy"],
            { zh: "還不認識大家，會有點緊張害怕。", en: "New places can feel a little scary." },
            { zh: "對，她有點緊張。我們可以怎麼做？", en: "Yes, she is a bit nervous. What can we do?" }),
          {
            type: "choice",
            prompt: { zh: "看到緊張的新朋友，怎麼做最友善？", en: "A new friend looks nervous. What is the friendliest thing to do?" },
            hint: { zh: "先打個招呼，讓她知道我們歡迎她。", en: "Saying hi shows her she is welcome." },
            confirm: { zh: "揮揮手說「嗨」，新朋友就笑了！", en: "You waved hello and she smiled!" },
            choices: [
              { value: "wave", icon: "wave", label: { zh: "揮手說嗨", en: "Wave hello" } },
              { value: "leave", icon: "door", label: { zh: "自己走開", en: "Walk away" } },
              { value: "play", icon: "ball", label: { zh: "自己去玩球", en: "Go play alone" } },
            ],
            answer: "wave",
          },
        ],
      },
      {
        stage: 2,
        parts: [
          feelPart(
            { zh: "小美的氣球飛走了！她現在是什麼感覺？", en: "Mei's balloon flew away! How does she feel right now?" },
            "sad", ["sad", "happy", "surprised"],
            { zh: "喜歡的氣球不見了，會難過。", en: "Losing a balloon makes you sad." },
            { zh: "對，她好難過。故事還沒結束……", en: "Yes, she is sad. But the story goes on..." }),
          feelPart(
            { zh: "爸爸又買了一顆新氣球給小美！現在她是什麼感覺？", en: "Dad got Mei a brand-new balloon! How does she feel NOW?" },
            "happy", ["sad", "happy", "afraid"],
            { zh: "心情會變！現在有新氣球了。", en: "Feelings change! Now she has a new balloon." },
            { zh: "對！心情從難過變開心了。", en: "Yes! Sad turned into happy." }),
        ],
      },
      {
        stage: 2,
        parts: [
          feelPart(
            { zh: "小安排隊等溜滑梯，等了好久好久。他是什麼感覺？", en: "An waited in line for the slide a long, long time. How does he feel?" },
            "angry", ["angry", "happy", "surprised"],
            { zh: "等太久，會有點不耐煩、生氣。", en: "Waiting a long time can make you grumpy." },
            { zh: "對，等好久有點生氣。接下來呢？", en: "Yes, waiting is hard. What happens next?" }),
          feelPart(
            { zh: "輪到小安溜滑梯了！咻——現在他是什麼感覺？", en: "It is An's turn! Wheee — down the slide! How does he feel NOW?" },
            "happy", ["angry", "happy", "sad"],
            { zh: "輪到自己了，心情就變好了。", en: "His turn came, and the feeling changed!" },
            { zh: "對！耐心等待後，開心就來了。", en: "Yes! After waiting comes the fun." }),
        ],
      },
    ],
  };
})();
