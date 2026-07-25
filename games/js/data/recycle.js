/* 回收車分類站 — 暖身：紙／塑膠／金屬；挑戰：加入一般垃圾的判斷；任務：連續處理兩件物品與重複使用。 */
(function () {
  "use strict";
  window.KidGameData = window.KidGameData || {};

  const BINS = {
    paper: { value: "paper", icon: "binPaper", label: { zh: "紙類", en: "Paper" } },
    plastic: { value: "plastic", icon: "binPlastic", label: { zh: "塑膠", en: "Plastic" } },
    metal: { value: "metal", icon: "binMetal", label: { zh: "金屬", en: "Metal" } },
    trash: { value: "trash", icon: "binTrash", label: { zh: "一般垃圾", en: "Trash" } },
    reuse: { value: "reuse", icon: "binReuse", label: { zh: "重複使用", en: "Use again" } },
  };
  const bins = (names) => names.map((name) => BINS[name]);

  function dragPart(item, answer, targets, prompt, hint, confirm) {
    return { type: "drag", prompt, hint, confirm, source: item, targets: bins(targets), answer };
  }

  function simpleRound(stage, item, answer, targets, prompt, hint, confirm) {
    return { stage, parts: [dragPart(item, answer, targets, prompt, hint, confirm)] };
  }

  const ITEMS = {
    newspaper: { value: "newspaper", icon: "newspaper", label: { zh: "報紙", en: "Newspaper" } },
    bottle: { value: "bottle", icon: "bottle", label: { zh: "塑膠瓶", en: "Plastic bottle" } },
    can: { value: "can", icon: "can", label: { zh: "鋁罐", en: "Metal can" } },
    box: { value: "box", icon: "box", label: { zh: "紙箱", en: "Cardboard box" } },
    napkin: { value: "napkin", icon: "napkin", label: { zh: "用過的紙巾", en: "Used tissue" } },
    brokenToy: { value: "brokenToy", icon: "brokenToy", label: { zh: "壞掉的玩具", en: "Broken toy" } },
    juice: { value: "juice", icon: "juice", label: { zh: "果汁塑膠瓶", en: "Juice bottle" } },
    jar: { value: "jar", icon: "jar", label: { zh: "還能用的玻璃罐", en: "Nice glass jar" } },
    tshirt: { value: "tshirt", icon: "tshirt", label: { zh: "太小件的衣服", en: "Too-small shirt" } },
  };

  window.KidGameData.recycle = {
    icon: "binReuse",
    title: { zh: "回收車分類站", en: "Recycling Station" },
    description: {
      zh: "先分紙、塑膠、金屬，再學會什麼是一般垃圾，最後連續整理兩件物品。",
      en: "Sort paper, plastic and metal, learn what is trash, then sort two things in a row.",
    },
    minutes: 9,
    rounds: [
      simpleRound(0, ITEMS.newspaper, "paper", ["paper", "plastic", "metal"],
        { zh: "報紙要放進哪一個分類箱？", en: "Where does the newspaper go?" },
        { zh: "報紙是紙做的，找紙類箱。", en: "Newspaper is paper. Find the paper bin." },
        { zh: "報紙放進紙類箱了！", en: "The newspaper is in the paper bin!" }),
      simpleRound(0, ITEMS.bottle, "plastic", ["paper", "plastic", "metal"],
        { zh: "塑膠瓶要放進哪一個分類箱？", en: "Where does the plastic bottle go?" },
        { zh: "瓶子是塑膠做的，找塑膠箱。", en: "The bottle is plastic. Find the plastic bin." },
        { zh: "塑膠瓶放進塑膠箱了！", en: "The bottle is in the plastic bin!" }),
      simpleRound(0, ITEMS.can, "metal", ["paper", "plastic", "metal"],
        { zh: "鋁罐要放進哪一個分類箱？", en: "Where does the metal can go?" },
        { zh: "罐子是金屬做的，涼涼硬硬的。", en: "The can is metal — hard and shiny." },
        { zh: "鋁罐放進金屬箱了！", en: "The can is in the metal bin!" }),
      simpleRound(1, ITEMS.napkin, "trash", ["paper", "plastic", "trash"],
        { zh: "用過的髒紙巾，要放進哪裡？", en: "A used, dirty tissue — where does it go?" },
        { zh: "髒掉的紙巾不能回收，要進一般垃圾。", en: "Dirty tissue can't be recycled. It goes in the trash." },
        { zh: "對！髒紙巾是一般垃圾。", en: "Right! Dirty tissue is trash." }),
      simpleRound(1, ITEMS.box, "paper", ["paper", "trash", "metal"],
        { zh: "乾淨的紙箱要放進哪裡？", en: "A clean cardboard box — where does it go?" },
        { zh: "乾淨的紙箱可以回收，找紙類箱。", en: "A clean box can be recycled. Find the paper bin." },
        { zh: "紙箱放進紙類箱了！", en: "The box is in the paper bin!" }),
      simpleRound(1, ITEMS.brokenToy, "trash", ["plastic", "trash", "reuse"],
        { zh: "玩具壞掉、修不好了，要放進哪裡？", en: "A toy is broken and can't be fixed — where does it go?" },
        { zh: "修不好的玩具，只能進一般垃圾。", en: "If we can't fix it, it goes in the trash." },
        { zh: "對，修不好的才丟一般垃圾。", en: "Right. Only broken-for-good things go to trash." }),
      simpleRound(1, ITEMS.juice, "plastic", ["plastic", "trash", "paper"],
        { zh: "喝完的果汁塑膠瓶，沖乾淨後放哪裡？", en: "An empty juice bottle, rinsed clean — where does it go?" },
        { zh: "沖乾淨的塑膠瓶可以回收。", en: "A clean plastic bottle can be recycled." },
        { zh: "果汁瓶放進塑膠箱了！", en: "The juice bottle is in the plastic bin!" }),
      {
        stage: 2,
        parts: [
          dragPart(ITEMS.newspaper, "paper", ["paper", "reuse", "trash"],
            { zh: "第一件：看完的報紙，放進正確的箱子。", en: "First: the finished newspaper. Put it in the right bin." },
            { zh: "報紙可以回收，找紙類箱。", en: "Newspaper is recycled. Paper bin." },
            { zh: "第一件完成！還有一件。", en: "First one done! One more." }),
          dragPart(ITEMS.jar, "reuse", ["paper", "reuse", "trash"],
            { zh: "第二件：還很漂亮的玻璃罐，可以怎麼辦？", en: "Second: a nice glass jar. What can we do with it?" },
            { zh: "還能用的東西不用丟，可以重複使用！", en: "If it still works, use it again!" },
            { zh: "太棒了！玻璃罐可以拿來裝小東西。", en: "Great! The jar can hold little treasures." }),
        ],
      },
      {
        stage: 2,
        parts: [
          dragPart(ITEMS.tshirt, "reuse", ["reuse", "trash", "plastic"],
            { zh: "第一件：衣服太小件了，可是還很乾淨。放哪裡？", en: "First: this shirt is too small but still nice. Where does it go?" },
            { zh: "乾淨的衣服可以送給更小的朋友穿。", en: "A nice shirt can go to a smaller friend." },
            { zh: "對！衣服可以再給別人穿。", en: "Yes! Someone smaller can wear it." }),
          dragPart(ITEMS.napkin, "trash", ["reuse", "trash", "plastic"],
            { zh: "第二件：擦過嘴巴的紙巾。放哪裡？", en: "Second: a tissue you wiped your mouth with. Where does it go?" },
            { zh: "髒掉的紙巾要進一般垃圾。", en: "A dirty tissue goes in the trash." },
            { zh: "分類站整理完畢，你是環保小幫手！", en: "All sorted! You are an Earth helper!" }),
        ],
      },
    ],
  };
})();
