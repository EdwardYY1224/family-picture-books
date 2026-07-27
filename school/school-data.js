(function () {
  "use strict";

  const option = (id, label, visual, kind = "picture", fallback) => ({ id, label, visual, kind, fallback });
  const body = {
    eye: option("eye", "eyes", "body-eyes", "scene", "eye"), nose: option("nose", "nose", "body-nose", "scene", "nose"), mouth: option("mouth", "mouth", "body-mouth", "scene", "mouth"),
    ear: option("ear", "ears", "body-ears", "scene", "ear"), teeth: option("teeth", "teeth", "body-teeth", "scene", "teeth"), hand: option("hand", "hands", "body-hands", "scene", "hand"),
    foot: option("foot", "feet", "body-feet", "scene", "foot"), shoulder: option("shoulder", "shoulders", "body-shoulders", "scene", "shoulder"), knee: option("knee", "knees", "body-knees", "scene", "knee"),
  };
  const action = {
    see: option("see", "see", "see", "scene", "eye"), hear: option("hear", "hear", "hear", "scene", "ear"), smell: option("smell", "smell", "smell", "scene", "nose"),
    eat: option("eat", "eat", "eat", "scene", "mouth"), bite: option("bite", "bite", "bite", "scene", "teeth"), draw: option("draw", "draw", "draw", "scene", "pencil"),
    dance: option("dance", "dance", "dance", "scene", "kid"),
  };
  const number = (n) => option(String(n), String(n), String(n), "number");
  const letter = (value) => option(value, value, value, "letter");
  const word = (id, label, visual, kind = "icon", fallback) => option(id, label, visual, kind, fallback);

  const games = [
    {
      id: "body", title: "聽一聽，摸一摸", skill: "身體部位 · 指令理解", icon: "kid", tone: "coral",
      blurb: "聽 Point to… 和 Touch…，找到自己的五官和身體。",
      finish: "把今天的三句話帶到洗澡或穿衣服時間，再玩一次就夠了。",
      rounds: [
        { en: "Point to your nose.", zh: "指出你的鼻子。", answer: "nose", choices: [body.nose, body.ear, body.mouth] },
        { en: "Touch your mouth.", zh: "摸摸你的嘴巴。", answer: "mouth", choices: [body.eye, body.mouth, body.nose] },
        { en: "Point to your ears.", zh: "指出你的耳朵。", answer: "ear", choices: [body.ear, body.teeth, body.eye] },
        { en: "Touch your shoulders.", zh: "摸摸你的肩膀。", answer: "shoulder", choices: [body.hand, body.shoulder, body.knee] },
        { en: "Touch your knees.", zh: "摸摸你的膝蓋。", answer: "knee", choices: [body.foot, body.knee, body.hand] },
        { en: "Open your eyes.", zh: "張開眼睛。", answer: "eye", choices: [body.mouth, body.ear, body.eye] },
      ],
    },
    {
      id: "actions", title: "身體會做什麼？", skill: "五官功能 · 動作配對", icon: "ear", tone: "blue",
      blurb: "把 eyes、ears、nose、mouth、hands 和會做的事連起來。",
      finish: "換成孩子自己的句子：I can hop. I can run. 讓她做動作給你看。",
      rounds: [
        { en: "What can you do with your eyes?", zh: "眼睛可以做什麼？", answer: "see", choices: [action.see, action.hear, action.smell], reply: "I can see with my eyes." },
        { en: "What can you do with your ears?", zh: "耳朵可以做什麼？", answer: "hear", choices: [action.eat, action.hear, action.see], reply: "I can hear with my ears." },
        { en: "What can you do with your nose?", zh: "鼻子可以做什麼？", answer: "smell", choices: [action.draw, action.smell, action.bite], reply: "I can smell with my nose." },
        { en: "What can you do with your mouth?", zh: "嘴巴可以做什麼？", answer: "eat", choices: [action.hear, action.eat, action.draw], reply: "I can eat with my mouth." },
        { en: "What can you do with your teeth?", zh: "牙齒可以做什麼？", answer: "bite", choices: [action.bite, action.see, action.dance], reply: "I can bite with my teeth." },
        { en: "What can you do with your hands?", zh: "手可以做什麼？", answer: "draw", choices: [action.smell, action.dance, action.draw], reply: "I can draw with my hands." },
        { en: "Can you dance with your feet?", zh: "你會用腳跳舞嗎？", answer: "dance", choices: [action.hear, action.draw, action.dance], reply: "Yes, I can!" },
      ],
    },
    {
      id: "count", title: "數數我的身體", skill: "1、2、10 · 數量詞", icon: "handsRub", tone: "yellow",
      blurb: "聽 How many…，用 1、2 和 10 回答身體小問題。",
      finish: "一起指著身體慢慢數，比只背答案更適合 4 歲孩子。",
      rounds: [
        { en: "How many noses do you have?", zh: "你有幾個鼻子？", scene: "school-count-one-nose", answer: "1", choices: [number(1), number(2), number(10)], reply: "I have one nose." },
        { en: "How many eyes do you have?", zh: "你有幾隻眼睛？", scene: "school-count-two-eyes", answer: "2", choices: [number(10), number(2), number(1)], reply: "I have two eyes." },
        { en: "How many ears do you have?", zh: "你有幾隻耳朵？", scene: "school-count-two-ears", answer: "2", choices: [number(1), number(10), number(2)], reply: "I have two ears." },
        { en: "How many shoulders do you have?", zh: "你有幾個肩膀？", scene: "school-count-two-shoulders", answer: "2", choices: [number(2), number(1), number(10)], reply: "I have two shoulders." },
        { en: "How many fingers do you have?", zh: "你有幾根手指？", scene: "school-count-ten-fingers", answer: "10", choices: [number(2), number(10), number(1)], reply: "I have ten fingers." },
        { en: "How many toes do you have?", zh: "你有幾根腳趾？", scene: "school-count-ten-toes", answer: "10", choices: [number(10), number(1), number(2)], reply: "I have ten toes." },
      ],
    },
    {
      id: "letters", title: "U–Z 字母火車", skill: "字母音 · 開頭音", icon: "train", tone: "green",
      blurb: "聽課堂練過的 U、V、W、X、Y、Z，幫單字找到車廂。",
      finish: "今天只要熟一兩個字母就很棒；下次可從另一個字母開始。",
      rounds: [
        { en: "U is for umbrella. Tap U.", zh: "umbrella 的開頭是 U。", scene: "letter-u-umbrella", answer: "U", choices: [letter("U"), letter("V"), letter("W")], reply: "U, umbrella." },
        { en: "V is for violin. Tap V.", zh: "violin 的開頭是 V。", scene: "letter-v-violin", answer: "V", choices: [letter("X"), letter("V"), letter("U")], reply: "V, violin." },
        { en: "W is for wagon. Tap W.", zh: "wagon 的開頭是 W。", scene: "letter-w-wagon", answer: "W", choices: [letter("Y"), letter("X"), letter("W")], reply: "W, wagon." },
        { en: "X is for X-ray. Tap X.", zh: "X-ray 的開頭是 X。", scene: "letter-x-xray", answer: "X", choices: [letter("V"), letter("X"), letter("Z")], reply: "X, X-ray." },
        { en: "Listen: Y. Tap Y.", zh: "聽 Y，找到 Y。", scene: "letter-y-yarn", answer: "Y", choices: [letter("W"), letter("Z"), letter("Y")], reply: "Y, yarn." },
        { en: "Z is for zipper. Tap Z.", zh: "zipper 的開頭是 Z。", scene: "letter-z-zipper", answer: "Z", choices: [letter("Z"), letter("U"), letter("Y")], reply: "Z, zipper." },
      ],
    },
    {
      id: "home", title: "放學小對話", skill: "日常對話 · 情境理解", icon: "backpack", tone: "coral",
      blurb: "練 Good afternoon、How are you 和收好書包外套。",
      finish: "明天放學時挑一句真的說出來，會比一次玩很多題更有用。",
      rounds: [
        { en: "Good afternoon, everyone!", zh: "大家午安！你可以怎麼回應？", answer: "afternoon", choices: [word("morning", "Good morning", "home-morning", "scene", "sun"), word("afternoon", "Good afternoon", "home-afternoon", "scene", "wave"), word("night", "Good night", "home-night", "scene", "moon")] },
        { en: "How are you?", zh: "別人問你好嗎，可以怎麼回答？", answer: "fine", choices: [word("fine", "I'm fine, thank you.", "home-fine", "scene", "happy"), word("bag", "My bag.", "home-backpack", "scene", "backpack"), word("ten", "Ten toes.", "school-count-ten-toes", "scene", "foot")] },
        { en: "Don't forget your bag.", zh: "不要忘記哪一樣？", answer: "bag", choices: [word("book", "book", "home-book", "scene", "book"), word("bag", "bag", "home-backpack", "scene", "backpack"), word("ball", "ball", "home-ball", "scene", "ball")] },
        { en: "Don't forget your jacket.", zh: "不要忘記哪一樣？", answer: "jacket", choices: [word("jacket", "jacket", "home-jacket", "scene", "tshirt"), word("shoes", "shoes", "home-shoes", "scene", "shoes"), word("umbrella", "umbrella", "home-umbrella", "scene", "umbrella")] },
        { en: "Did you have a good time today?", zh: "今天玩得開心嗎？", answer: "yes", choices: [word("yes", "Yes!", "home-yes", "scene", "happy"), word("tired", "I want to sleep.", "home-sleep", "scene", "bed"), word("bag", "My backpack.", "home-backpack", "scene", "backpack")], reply: "Yes! I had a good time." },
        { en: "Now let's sing a song!", zh: "接下來要做什麼？", answer: "music", choices: [word("sleep", "sleep", "home-sleep", "scene", "bed"), word("music", "sing", "home-sing", "scene", "speaker"), word("wash", "wash", "home-wash", "scene", "soap")] },
      ],
    },
  ];

  window.PonySchool = { games };
})();
