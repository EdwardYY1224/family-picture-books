(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};
  const bi = (zh, en) => ({ zh, en });
  const item = (value, zh, en) => ({ value, art: value, icon: "star", label: bi(zh, en) });
  const items = (definitions) => definitions.map((definition) => item(...definition));
  const positions = (definitions, cols) => Object.fromEntries(definitions.map(([key], index) => [key, [index % cols, Math.floor(index / cols)]]));
  const artSheet = (name, definitions, cols, rows) => ({
    src: `assets/warm-folk/memory/${name}-cards.webp`, cols, rows, items: positions(definitions, cols),
  });

  const matchItems = [
    ["whale","鯨魚","whale"],["octopus","章魚","octopus"],["turtle","海龜","sea turtle"],["trex","暴龍","Tyrannosaurus"],
    ["triceratops","三角龍","Triceratops"],["egg","恐龍蛋","dinosaur egg"],["butterfly","蝴蝶","butterfly"],["ant","螞蟻","ant"],
    ["bee","蜜蜂","bee"],["sun","太陽","Sun"],["rain","雨雲","rain cloud"],["wind","風","wind"],
    ["moon","月亮","Moon"],["earth","地球","Earth"],["rocket","火箭","rocket"],["astronaut","太空人","astronaut"],
  ];
  const matchLookup = Object.fromEntries(items(matchItems).map((entry) => [entry.value, entry]));
  const matchRound = (keys, promptZh, promptEn, stage) => ({ stage, parts: [{
    type: "memoryMatch", prompt: bi(promptZh, promptEn),
    hint: bi("翻開兩張圖，記住它們的位置。", "Turn over two cards and remember where they are."),
    confirm: bi("所有好朋友都配對成功了！", "Every matching pair is together!"),
    cards: keys.map((key) => matchLookup[key]), columns: 4,
  }] });
  window.KidGameData["age5-memory-match"] = {
    languageMode: "bilingual", icon: "star", minutes: 7,
    coverImage: "assets/warm-folk/memory/memory-match-cover.webp",
    artSheet: artSheet("memory-match", matchItems, 4, 4),
    title: bi("小小記憶森林", "Little Memory Forest"),
    description: bi("翻開兩張手繪圖卡，幫一樣的朋友找到彼此。", "Turn over two picture cards and bring matching friends together."),
    rounds: [
      matchRound(["whale","octopus","turtle"], "找出三對海洋動物。", "Find three pairs of ocean animals.", 0),
      matchRound(["trex","triceratops","egg"], "找出三對恐龍朋友。", "Find three pairs of dinosaur friends.", 0),
      matchRound(["butterfly","ant","bee","sun"], "找出四對小小朋友。", "Find four matching pairs.", 1),
      matchRound(["sun","rain","wind","moon"], "找出四對天空圖卡。", "Find four pairs from the sky.", 1),
      matchRound(["sun","moon","earth","rocket","astronaut"], "找出五對太空朋友。", "Find five pairs of space friends.", 2),
      matchRound(["whale","triceratops","butterfly","rain","earth","rocket"], "完成六對綜合記憶挑戰。", "Complete the six-pair memory challenge.", 2),
    ],
  };

  const missingItems = [
    ["apple","蘋果","apple"],["banana","香蕉","banana"],["strawberry","草莓","strawberry"],["trex","暴龍","Tyrannosaurus"],
    ["triceratops","三角龍","Triceratops"],["egg","恐龍蛋","dinosaur egg"],["butterfly","蝴蝶","butterfly"],["ant","螞蟻","ant"],
    ["spider","蜘蛛","spider"],["snail","蝸牛","snail"],["sun","太陽","Sun"],["moon","月亮","Moon"],
    ["earth","地球","Earth"],["rocket","火箭","rocket"],["eye","眼睛","eyes"],["ear","耳朵","ears"],
    ["nose","鼻子","nose"],["tongue","舌頭","tongue"],["hands","雙手","hands"],["flower","花朵","flower"],
  ];
  const missingLookup = Object.fromEntries(items(missingItems).map((entry) => [entry.value, entry]));
  function missingRound(showKeys, answer, distractors, promptZh, promptEn, stage) {
    const answerItem = missingLookup[answer];
    const remaining = showKeys.filter((key) => key !== answer).map((key) => missingLookup[key]);
    return { stage, parts: [
      { type:"watch", prompt:bi(promptZh,promptEn), hint:bi("慢慢看每一張圖。","Look slowly at every picture."), reveal:showKeys.map((key)=>missingLookup[key]), hideLabels:true },
      { type:"choice", prompt:bi("哪一個不見了？","Which one is missing?"), hint:bi("看看留下來的圖片，再想想剛才還看見了誰。","Look at the pictures that remain, then remember who else you saw."), confirm:bi(`對了，是${answerItem.label.zh}！`,`Yes, it was the ${answerItem.label.en}!`), remaining, choices:[answerItem,...distractors.map((key)=>missingLookup[key])], answer },
    ] };
  }
  window.KidGameData["age5-whats-missing"] = {
    languageMode:"bilingual", icon:"eye", minutes:7,
    coverImage:"assets/warm-folk/memory/whats-missing-cover.webp",
    artSheet:artSheet("whats-missing",missingItems,4,5),
    title:bi("神祕消失箱","The Mystery Missing Box"),
    description:bi("先記住大圖，布幕後面會有一個朋友悄悄消失。","Remember the big pictures, then discover which friend disappeared."),
    rounds:[
      missingRound(["apple","banana","strawberry"],"banana",["flower","moon"],"記住蘋果、香蕉和草莓。","Remember the apple, banana, and strawberry.",0),
      missingRound(["trex","triceratops","egg"],"egg",["rocket","apple"],"記住暴龍、三角龍和恐龍蛋。","Remember the Tyrannosaurus, Triceratops, and dinosaur egg.",0),
      missingRound(["butterfly","ant","spider","snail"],"spider",["egg","moon"],"記住四個小生物。","Remember the four minibeasts.",1),
      missingRound(["sun","moon","earth","rocket"],"earth",["butterfly","apple"],"記住太陽、月亮、地球和火箭。","Remember the Sun, Moon, Earth, and rocket.",1),
      missingRound(["eye","ear","nose","tongue","hands"],"nose",["flower","rocket"],"記住眼睛、耳朵、鼻子、舌頭和雙手。","Remember the eyes, ears, nose, tongue, and hands.",2),
      missingRound(["flower","egg","moon","apple","butterfly"],"flower",["trex","hands"],"記住這五張綜合圖卡。","Remember these five mixed picture cards.",2),
    ],
  };

  const soundItems = [
    ["ocean","海洋","ocean"],["forest","森林","forest"],["castle","城堡","castle"],["storm","雷雨雲","thunderstorm"],
    ["sun","太陽","Sun"],["moon","月亮","Moon"],["bee","蜜蜂","bee"],["snail","蝸牛","snail"],
    ["butterfly","蝴蝶","butterfly"],["heart","心臟","heart"],["lungs","肺","lungs"],["stomach","胃","stomach"],
    ["robot","機器人","robot"],["spoon","木湯匙","wooden spoon"],["book","紙本書","paper book"],["rocket","火箭","rocket"],
    ["ship","船","ship"],["bike","腳踏車","bicycle"],["speaker","音箱","speaker"],["dog","小狗","dog"],
  ];
  const soundLookup = Object.fromEntries(items(soundItems).map((entry) => [entry.value, entry]));
  function soundRound(audio, answer, distractors, confirmZh, confirmEn, stage) {
    return { stage, parts:[{ type:"choice", prompt:bi("小耳朵準備好了。仔細聽，哪張圖是聲音的朋友？","Little ears ready. Listen carefully. Which picture matches the sound?"), hint:bi("按一下再聽一次，找出聲音的來源。","Play it again and find where the sound comes from."), confirm:bi(confirmZh,confirmEn), choices:[soundLookup[answer],...distractors.map((key)=>soundLookup[key])], answer, audio:`audio/memory-sounds/${audio}.wav`, audioDelay:4700 }] };
  }
  window.KidGameData["age5-sound-friends"] = {
    languageMode:"bilingual", icon:"ear", minutes:6,
    coverImage:"assets/warm-folk/memory/sound-friends-cover.webp",
    artSheet:artSheet("sound-friends",soundItems,4,5),
    title:bi("小耳朵偵探","Little Ear Detective"),
    description:bi("聽一段溫和的聲音，再找出最適合的手繪圖。","Listen to a gentle sound, then find the picture that matches it."),
    rounds:[
      soundRound("waves","ocean",["forest","castle"],"對了，這是海浪聲！","Yes, those are ocean waves!",0),
      soundRound("thunder","storm",["sun","moon"],"對了，這是雷聲！","Yes, that is thunder!",0),
      soundRound("bee","bee",["snail","butterfly"],"對了，這是蜜蜂的嗡嗡聲！","Yes, that is a buzzing bee!",1),
      soundRound("heartbeat","heart",["lungs","stomach"],"對了，這是心跳聲！","Yes, that is a heartbeat!",1),
      soundRound("robot","robot",["spoon","book"],"對了，這是機器人的聲音！","Yes, that is a robot sound!",2),
      soundRound("rocket","rocket",["ship","bike"],"對了，這是火箭升空聲！","Yes, that is a rocket launching!",2),
    ],
  };

  const orderItems = [
    ["moon","月亮","Moon"],["rocket","火箭","rocket"],["butterfly","蝴蝶","butterfly"],["flower","花朵","flower"],
    ["egg","恐龍蛋","dinosaur egg"],["triceratops","三角龍","Triceratops"],["fossil","化石","fossil"],["microphone","麥克風","microphone"],
    ["computer","電腦","computer"],["speaker","智慧音箱","smart speaker"],["observe","觀察葉子","observe a leaf"],["question","提出問題","ask a question"],
    ["experiment","做實驗","do an experiment"],["drawing","畫圖記錄","draw the result"],["sun","太陽","Sun"],["earth","地球","Earth"],
    ["astronaut","太空人","astronaut"],["star","星星","star"],["robot","機器人","robot"],["home","家","home"],
  ];
  const orderLookup = Object.fromEntries(items(orderItems).map((entry) => [entry.value, entry]));
  function orderRound(keys, promptZh, promptEn, extras, stage) {
    const steps=keys.map((key)=>orderLookup[key]);
    return { stage, parts:[
      { type:"watch", mode:"visual-sequence", prompt:bi(promptZh,promptEn), hint:bi("看圖片一張一張亮起來。","Watch each picture light up."), reveal:steps },
      { type:"sequence", memory:true, quietSteps:true, prompt:bi("現在換你，照剛才的順序點圖片。","Your turn. Tap the pictures in the same order."), hint:bi("想想第一張亮起來的是什麼。","Think about which picture lit up first."), confirm:bi("順序完全正確！","The whole order is correct!"), steps, extras:(extras||[]).map((key)=>orderLookup[key]) },
    ] };
  }
  window.KidGameData["age5-remember-order"] = {
    languageMode:"bilingual", icon:"robot", minutes:7,
    coverImage:"assets/warm-folk/memory/remember-order-cover.webp",
    artSheet:artSheet("remember-order",orderItems,4,5),
    title:bi("機器人的回家路","Robot's Way Home"),
    description:bi("看圖片依序亮起，再幫機器人照相同順序走一次。","Watch the pictures light up, then help the robot follow the same order."),
    rounds:[
      orderRound(["moon","rocket"],"先是月亮，然後是火箭。仔細記住。","First the Moon, then the rocket. Remember them.",["star"],0),
      orderRound(["butterfly","flower"],"先是蝴蝶，然後是花朵。仔細記住。","First the butterfly, then the flower. Remember them.",["moon"],0),
      orderRound(["egg","triceratops","fossil"],"恐龍蛋、三角龍、化石。記住這個順序。","Dinosaur egg, Triceratops, fossil. Remember the order.",["rocket"],1),
      orderRound(["microphone","computer","speaker"],"麥克風、電腦、智慧音箱。記住語音助理的順序。","Microphone, computer, smart speaker. Remember the voice-assistant order.",["robot"],1),
      orderRound(["observe","question","experiment","drawing"],"觀察、提問、實驗、畫圖。記住科學任務。","Observe, ask, experiment, draw. Remember the science mission.",["star"],2),
      orderRound(["sun","earth","moon","astronaut"],"太陽、地球、月亮、太空人。完成最後的太空順序。","Sun, Earth, Moon, astronaut. Remember the final space order.",["rocket"],2),
    ],
  };
})();
