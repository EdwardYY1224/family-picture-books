/* 紅綠燈小隊長 — 暖身：認識三色燈；挑戰：號誌＋情境的條件判斷；任務：安全順序與事件先後。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const LIGHTS = [
    { value: "red", light: "red", label: { zh: "紅燈", en: "Red light" } },
    { value: "yellow", light: "yellow", label: { zh: "黃燈", en: "Yellow light" } },
    { value: "green", light: "green", label: { zh: "綠燈", en: "Green light" } },
  ];
  const ACTIONS = {
    stop: { value: "stop", icon: "stopHand", label: { zh: "停下來等", en: "Stop and wait" } },
    walk: { value: "walk", icon: "walk", label: { zh: "慢慢通過", en: "Walk across" } },
    slow: { value: "slow", icon: "turtle", label: { zh: "慢下來", en: "Slow down" } },
  };

  function lightRound(question, answer, hint, confirm) {
    return {
      stage: 0,
      parts: [{
        type: "choice",
        prompt: question,
        hint,
        confirm,
        choices: LIGHTS,
        answer,
      }],
    };
  }

  function scenarioRound(prompt, answer, hint, confirm, sound) {
    return {
      stage: 1,
      parts: [{
        type: "choice",
        prompt,
        hint,
        confirm,
        sound,
        choices: [ACTIONS.stop, ACTIONS.walk, ACTIONS.slow],
        answer,
      }],
    };
  }

  window.KidGameData.traffic = {
    icon: "trafficLight",
    title: { zh: "紅綠燈小隊長", en: "Traffic Captain" },
    description: {
      zh: "先認識紅黃綠燈，再判斷路口發生的事，最後帶大家安全過馬路。",
      en: "Learn the lights, judge what happens at the crossing, then lead everyone safely.",
    },
    minutes: 9,
    rounds: [
      lightRound(
        { zh: "哪一個燈表示要停下來？", en: "Which light means stop?" },
        "red",
        { zh: "紅色提醒我們停下來。", en: "Red tells us to stop." },
        { zh: "對，紅燈停！", en: "Yes! Red means stop!" }
      ),
      lightRound(
        { zh: "哪一個燈表示可以前進？", en: "Which light means go?" },
        "green",
        { zh: "綠色表示安全時可以前進。", en: "Green means it is safe to go." },
        { zh: "對，綠燈行！", en: "Yes! Green means go!" }
      ),
      lightRound(
        { zh: "哪一個燈提醒我們慢下來、準備停？", en: "Which light says slow down and get ready to stop?" },
        "yellow",
        { zh: "找像太陽一樣的黃色。", en: "Look for the sunny yellow one." },
        { zh: "對，黃燈要慢下來。", en: "Yes, yellow means slow down." }
      ),
      scenarioRound(
        { zh: "綠燈亮了，可是救護車鳴笛開過來了！應該怎麼做？", en: "The light is green, but an ambulance is coming with its siren on! What should you do?" },
        "stop",
        { zh: "救護車要先過，我們停下來等牠過去。", en: "The ambulance goes first. We stop and wait." },
        { zh: "對！先讓救護車過，再走。", en: "Right! Let the ambulance go first." },
        "siren"
      ),
      scenarioRound(
        { zh: "準備過馬路時，燈變成黃燈了。應該怎麼做？", en: "You are about to cross, and the light turns yellow. What should you do?" },
        "stop",
        { zh: "黃燈時先不要走，等下一個綠燈。", en: "Yellow means wait for the next green light." },
        { zh: "對，等下一個綠燈最安全。", en: "Yes, waiting for green is the safest." }
      ),
      scenarioRound(
        { zh: "綠燈亮了，左右看都沒有車。可以怎麼做？", en: "The light is green. You looked left and right — no cars. What can you do?" },
        "walk",
        { zh: "綠燈加上沒有車，就可以慢慢走。", en: "Green light and no cars means you can walk." },
        { zh: "對，牽好大人的手，慢慢通過。", en: "Yes! Hold a grown-up's hand and walk across." }
      ),
      scenarioRound(
        { zh: "紅燈亮著，可是路上一輛車都沒有。可以走嗎？", en: "The light is red, but there are no cars at all. Can you go?" },
        "stop",
        { zh: "紅燈就是要停，就算沒有車也一樣。", en: "Red always means stop, even with no cars." },
        { zh: "對！紅燈時一定要等。", en: "Right! We always wait at a red light." }
      ),
      {
        stage: 2,
        parts: [{
          type: "sequence",
          prompt: { zh: "當小隊長囉！照安全順序，帶大家過馬路。", en: "You are the captain! Tap the safe steps in order." },
          hint: { zh: "先想想：過馬路前，第一件事是看什麼燈？", en: "Think first: which light do we see before crossing?" },
          confirm: { zh: "安全順序全部完成，大家平安過馬路！", en: "All steps done! Everyone crossed safely!" },
          steps: [
            { value: "red", icon: "lightRed", label: { zh: "紅燈停", en: "Stop at red" } },
            { value: "green", icon: "lightGreen", label: { zh: "等綠燈亮", en: "Wait for green" } },
            { value: "left", icon: "lookLeft", label: { zh: "看左邊", en: "Look left" } },
            { value: "right", icon: "lookRight", label: { zh: "看右邊", en: "Look right" } },
            { value: "walk", icon: "walk", label: { zh: "慢慢通過", en: "Walk across" } },
          ],
        }],
      },
      {
        stage: 2,
        parts: [
          {
            type: "choice",
            prompt: { zh: "路口來了救護車、小朋友和小狗，誰應該先過？", en: "An ambulance, a kid, and a dog are at the crossing. Who goes first?" },
            hint: { zh: "有警示聲的車要先過去救人。", en: "The one with the siren is going to help someone." },
            confirm: { zh: "對，救護車先過！", en: "Yes, the ambulance goes first!" },
            sound: "siren",
            choices: [
              { value: "ambulance", icon: "ambulance", label: { zh: "救護車", en: "Ambulance" } },
              { value: "kid", icon: "kid", label: { zh: "小朋友", en: "Kid" } },
              { value: "dog", icon: "dog", label: { zh: "小狗", en: "Dog" } },
            ],
            answer: "ambulance",
          },
          {
            type: "choice",
            prompt: { zh: "救護車過去了，綠燈還亮著。現在小朋友可以怎麼做？", en: "The ambulance has passed and the light is still green. What can the kid do now?" },
            hint: { zh: "危險過去了，綠燈還在，就可以走了。", en: "The ambulance is gone and it is still green — safe to walk." },
            confirm: { zh: "任務完成！你是最棒的小隊長。", en: "Mission complete! You are a great captain." },
            choices: [ACTIONS.stop, ACTIONS.walk, ACTIONS.slow],
            answer: "walk",
          },
        ],
      },
    ],
  };
})();
