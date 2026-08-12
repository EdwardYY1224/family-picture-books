(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const same = (text) => ({ zh: text, en: text });
  const bi = (zh, en) => ({ zh, en });
  const choice = (value, icon, zh, en) => ({ value, icon, label: bi(zh, en) });
  const englishChoice = (value, icon, label) => ({ value, icon, label: same(label) });

  function rhymeRound(word, answer, options, confirm, stage) {
    return {
      stage,
      parts: [{
        type: "choice",
        prompt: same(`Listen: ${word}. Tap the picture that rhymes with ${word}.`),
        hint: same(`Say the ending slowly: ${word}. Which picture ends with the same sound?`),
        confirm: same(confirm),
        choices: options,
        answer,
      }],
    };
  }

  window.KidGameData["age5-rhymes"] = {
    curriculumLessonId: "age5-en-rhyming-words",
    languageMode: "en-only",
    coverImage: "assets/warm-folk/rhyming-words.webp",
    artSheet: {
      src: "assets/warm-folk/rhyming-choices.webp", cols: 4, rows: 4,
      items: { star:[0,0], dog:[1,0], book:[2,0], hat:[3,0], fish:[0,1], cup:[1,1], frog:[2,1], cat:[3,1], moon:[0,2], dish:[1,2], car:[2,2], spoon:[3,2], sun:[0,3], banana:[1,3], bowl:[2,3], door:[3,3] },
    },
    icon: "ear",
    title: same("Rhyme Basket"),
    description: same("Listen to one word, then tap the picture with the same ending sound."),
    minutes: 8,
    rounds: [
      rhymeRound("car", "star", [englishChoice("star", "star", "star"), englishChoice("dog", "dog", "dog"), englishChoice("book", "book", "book")], "Car and star rhyme!", 0),
      rhymeRound("cat", "hat", [englishChoice("hat", "hat", "hat"), englishChoice("fish", "fish", "fish"), englishChoice("cup", "bowl", "cup")], "Cat and hat rhyme!", 0),
      rhymeRound("dog", "frog", [englishChoice("frog", "frog", "frog"), englishChoice("cat", "cat", "cat"), englishChoice("moon", "moon", "moon")], "Dog and frog rhyme!", 0),
      rhymeRound("fish", "dish", [englishChoice("dish", "bowl", "dish"), englishChoice("hat", "hat", "hat"), englishChoice("car", "car", "car")], "Fish and dish rhyme!", 1),
      rhymeRound("moon", "spoon", [englishChoice("spoon", "spoon", "spoon"), englishChoice("sun", "sun", "sun"), englishChoice("book", "book", "book")], "Moon and spoon rhyme!", 1),
      rhymeRound("star", "car", [englishChoice("car", "car", "car"), englishChoice("frog", "frog", "frog"), englishChoice("fish", "fish", "fish")], "Star and car rhyme! Great listening!", 2),
    ],
  };

  function countRound(count, total, item, focus, stage) {
    return {
      stage,
      parts: [{
        type: "count",
        prompt: same(`Tap ${count}. Count out loud as you tap.`),
        hint: same(`Start at one. Touch one picture for every number until ${count}.`),
        confirm: same(`Yes! You counted exactly ${count}.`),
        item,
        itemAlt: item === "apple" ? "strawberry" : undefined,
        focus,
        count,
        total,
      }],
    };
  }

  window.KidGameData["age5-count-20"] = {
    curriculumLessonId: "age5-math-count-to-20",
    languageMode: "en-only",
    coverImage: "assets/warm-folk/count-to-20.webp",
    countArtSheet: {
      src: "assets/warm-folk/counting-tokens.webp", cols: 3, rows: 2,
      items: { apple:[0,0], strawberry:[1,0], star:[2,0], banana:[0,1], carrot:[1,1], waterDrop:[2,1] },
    },
    icon: "basket",
    title: same("Count to Twenty"),
    description: same("Listen for a number, touch that many pictures, then press Done."),
    minutes: 9,
    rounds: [
      countRound(6, 8, "apple", "basket", 0),
      countRound(9, 12, "star", "basket", 0),
      countRound(12, 15, "banana", "basket", 1),
      countRound(15, 18, "carrot", "basket", 1),
      countRound(18, 20, "waterDrop", "basket", 2),
      countRound(20, 20, "star", "basket", 2),
    ],
  };

  function senseRound(promptZh, promptEn, answer, options, hintZh, hintEn, confirmZh, confirmEn, stage) {
    return { stage, parts: [{ type: "choice", prompt: bi(promptZh, promptEn), hint: bi(hintZh, hintEn), confirm: bi(confirmZh, confirmEn), choices: options, answer }] };
  }

  window.KidGameData["age5-five-senses"] = {
    curriculumLessonId: "age5-science-five-senses",
    coverImage: "assets/warm-folk/five-senses.webp",
    artSheet: {
      src: "assets/warm-folk/five-senses-choices.webp", cols: 3, rows: 2,
      items: { ear:[0,0], eye:[1,0], nose:[2,0], tongue:[0,1], hands:[1,1], speaker:[2,1] },
    },
    icon: "eye",
    title: bi("五感小偵探", "Five Senses Detectives"),
    description: bi("先聽線索，再點選正確的身體部位。", "Listen to the clue, then tap the correct body part."),
    minutes: 8,
    rounds: [
      senseRound("哪個身體部位幫助我們聽聲音？", "Which body part helps us hear sounds?", "ear", [choice("ear","ear","耳朵","ears"),choice("eye","eye","眼睛","eyes"),choice("nose","nose","鼻子","nose")], "聲音進入耳朵。", "Sounds go into our ears.", "對了，耳朵幫助我們聽！", "Yes, ears help us hear!", 0),
      senseRound("聞到麵包香味時，我們用了哪個部位？", "Which body part smells fresh bread?", "nose", [choice("nose","nose","鼻子","nose"),choice("ear","ear","耳朵","ears"),choice("tongue","tongue","舌頭","tongue")], "香味的線索會進入鼻子。", "Smell clues enter the nose.", "沒錯，鼻子負責聞氣味！", "Right, the nose smells!", 0),
      senseRound("看月亮時，我們主要使用哪個部位？", "Which body part do we use to see the Moon?", "eye", [choice("eye","eye","眼睛","eyes"),choice("nose","nose","鼻子","nose"),choice("ear","ear","耳朵","ears")], "光進入眼睛，讓我們看見。", "Light enters our eyes so we can see.", "對了，眼睛幫助我們看！", "Yes, eyes help us see!", 1),
      senseRound("嚐草莓的味道時，我們使用哪個部位？", "Which body part tastes a strawberry?", "tongue", [choice("tongue","tongue","舌頭","tongue"),choice("ear","ear","耳朵","ears"),choice("eye","eye","眼睛","eyes")], "味道會被舌頭感覺到。", "The tongue detects flavours.", "答對了，舌頭幫助我們嚐味道！", "Correct, the tongue helps us taste!", 1),
      senseRound("摸到柔軟玩具時，我們主要使用什麼？", "What do we mainly use to feel a soft toy?", "hands", [choice("hands","handsRub","皮膚和手","skin and hands"),choice("ear","ear","耳朵","ears"),choice("nose","nose","鼻子","nose")], "皮膚可以感覺柔軟、粗糙、冷和熱。", "Skin can feel soft, rough, cold, and hot.", "很好，皮膚帶來觸覺！", "Great, skin gives us touch!", 2),
      senseRound("哪個感官能幫你找到正在播放音樂的喇叭？", "Which sense helps you find a speaker playing music?", "ear", [choice("ear","ear","聽覺","hearing"),choice("nose","nose","嗅覺","smell"),choice("tongue","tongue","味覺","taste")], "跟著聲音走，要使用聽覺。", "Follow the sound with your hearing.", "完成了！你是五感小偵探！", "You did it! You are a senses detective!", 2),
    ],
  };

  function aiRound(promptZh, promptEn, answer, options, confirmZh, confirmEn, stage) {
    return { stage, parts: [{ type: "choice", prompt: bi(promptZh, promptEn), hint: bi("想想哪個東西會接收資訊，再做出反應。", "Which one receives information and then responds?"), confirm: bi(confirmZh, confirmEn), choices: options, answer }] };
  }

  window.KidGameData["age5-ai-daily"] = {
    curriculumLessonId: "age5-ai-daily-life",
    coverImage: "assets/warm-folk/ai-daily-life.webp",
    artSheet: {
      src: "assets/warm-folk/ai-choices.webp", cols: 4, rows: 3,
      items: { phone:[0,0], spoon:[1,0], book:[2,0], robot:[3,0], dog:[0,1], adult:[1,1], speaker:[2,1], bowl:[3,1], towel:[0,2], door:[1,2], banana:[2,2], kid:[3,2] },
    },
    icon: "robot",
    title: bi("生活中的 AI", "AI in Daily Life"),
    description: bi("找出會接收資訊、尋找模式並做出反應的工具。", "Find tools that receive information, spot patterns, and respond."),
    minutes: 8,
    rounds: [
      aiRound("哪一個可能會辨認你的臉？", "Which one might recognise your face?", "phone", [choice("phone","phone","手機","phone"),choice("spoon","spoon","湯匙","spoon"),choice("book","book","紙本書","paper book")], "手機可以使用 AI 比對臉部模式。", "A phone can use AI to match face patterns.", 0),
      aiRound("哪一個是人製造、會照指令做事的機器？", "Which one is a human-made machine that follows instructions?", "robot", [choice("robot","robot","機器人","robot"),choice("dog","dog","小狗","dog"),choice("adult","adult","大人","adult")], "機器人依照人寫的指令工作。", "A robot follows instructions written by people.", 0),
      aiRound("哪一個可以聽到問題，再回答你？", "Which one can hear a question and answer?", "speaker", [choice("speaker","speaker","智慧喇叭","smart speaker"),choice("bowl","bowl","碗","bowl"),choice("towel","towel","毛巾","towel")], "智慧喇叭會接收聲音並嘗試回答。", "A smart speaker receives sound and tries to answer.", 1),
      aiRound("哪一個可能感覺有人靠近，然後自動打開？", "Which one may sense a person and open automatically?", "door", [choice("door","door","自動門","automatic door"),choice("banana","banana","香蕉","banana"),choice("book","book","書","book")], "自動門使用感應器接收資訊並做出反應。", "An automatic door senses information and responds.", 1),
      aiRound("AI 猜錯時，哪一個做法最好？", "What should we do when AI makes a wrong guess?", "adult", [choice("adult","adult","告訴大人並再確認","check with an adult"),choice("robot","robot","永遠相信機器","always trust the machine"),choice("door","door","假裝沒看見","ignore it")], "AI 是工具，也可能出錯，所以要和人一起確認。", "AI is a tool and can be wrong, so people should check.", 2),
      aiRound("哪一個不是有感情的人，而是人做出的工具？", "Which one is a tool made by people, not a person with feelings?", "robot", [choice("robot","robot","AI 機器人","AI robot"),choice("kid","kid","小朋友","child"),choice("dog","dog","小狗","dog")], "AI 工具不是真的人，也沒有真正的感情。", "AI tools are not people and do not have real feelings.", 2),
    ],
  };
})();
