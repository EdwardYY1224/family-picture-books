/* Game hub — builds the ten game tiles with folk-flat icons, a language
   toggle (zh / en) and a "continue where you left off" badge. */
(function () {
  "use strict";

  const RESUME_KEY = "city-games-resume-v2";

  function detectLang() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
    try {
      const saved = window.localStorage.getItem("kid-games-lang");
      if (saved === "en" || saved === "zh") return saved;
    } catch { /* keep default */ }
    return "zh";
  }
  const lang = detectLang();
  const t = (text) => (typeof text === "string" ? text : (text[lang] != null ? text[lang] : text.zh));

  const UI = {
    zh: {
      kicker: "TEN TOUCH ADVENTURES",
      title: "城市學習遊戲館",
      subtitle: "用手指點一點、拖一拖。每款三個關卡，越玩越有趣。",
      care: "♥ 大人陪在身邊即可；孩子疲累或不想玩時就停下來。",
      resume: (n) => `▶ 繼續第 ${n} 題`,
      langButton: "EN",
      htmlLang: "zh-Hant",
      docTitle: "城市學習遊戲館｜小小探索家",
    },
    en: {
      kicker: "TEN TOUCH ADVENTURES",
      title: "City Game Arcade",
      subtitle: "Tap and drag with one finger. Three levels in every game!",
      care: "♥ Stay close by. Stop whenever your child is tired.",
      resume: (n) => `▶ Continue: question ${n}`,
      langButton: "中文",
      htmlLang: "en",
      docTitle: "City Game Arcade | Little Explorers",
    },
  };

  const TILES = [
    { href: "position-adventure.html", icon: "bird", scene: "hub-position", tone: "coral", resumeId: null,
      tag: { zh: "位置詞", en: "Positions" }, name: { zh: "城市位置探險", en: "Position Adventure" },
      blurb: { zh: "兩步驟指令：先去旁邊，再進裡面", en: "Two-step moves: beside first, then inside" } },
    { href: "play.html?game=shapes", icon: "truck", scene: "hub-shapes", tone: "yellow", resumeId: "shapes",
      tag: { zh: "形狀", en: "Shapes" }, name: { zh: "形狀快遞車", en: "Shape Delivery" },
      blurb: { zh: "形狀＋顏色配對，依順序送兩件包裹", en: "Match shape and color, deliver two boxes" } },
    { href: "play.html?game=counting", icon: "bus", scene: "hub-counting", tone: "blue", resumeId: "counting",
      tag: { zh: "數量", en: "Counting" }, name: { zh: "公車數一數", en: "Counting Bus" },
      blurb: { zh: "上車、下車，剩下幾位乘客？", en: "On and off the bus — how many are left?" } },
    { href: "play.html?game=traffic", icon: "trafficLight", scene: "hub-traffic", tone: "green", resumeId: "traffic",
      tag: { zh: "規則", en: "Rules" }, name: { zh: "紅綠燈小隊長", en: "Traffic Captain" },
      blurb: { zh: "號誌加情境，帶大家安全過馬路", en: "Lights plus events — cross safely" } },
    { href: "play.html?game=sounds", icon: "speaker", scene: "hub-sounds", tone: "coral", resumeId: "sounds",
      tag: { zh: "聽覺記憶", en: "Sound memory" }, name: { zh: "城市聲音偵探", en: "Sound Detective" },
      blurb: { zh: "記住兩、三個連續聲音再依序點選", en: "Remember two or three sounds in order" } },
    { href: "play.html?game=compare", icon: "crane", scene: "hub-compare", tone: "yellow", resumeId: "compare",
      tag: { zh: "比較", en: "Compare" }, name: { zh: "建築工地比一比", en: "Building Compare" },
      blurb: { zh: "三物件找最高、最短，挑戰第二高", en: "Tallest, shortest — and second tallest!" } },
    { href: "play.html?game=sequence", icon: "sun", scene: "hub-sequence", tone: "blue", resumeId: "sequence",
      tag: { zh: "順序", en: "Order" }, name: { zh: "早餐順序任務", en: "Daily Order Quest" },
      blurb: { zh: "4 到 6 步生活順序，找出放錯的卡", en: "4 to 6 steps — spot the silly card" } },
    { href: "play.html?game=recycle", icon: "binReuse", scene: "hub-recycle", tone: "green", resumeId: "recycle",
      tag: { zh: "分類", en: "Sorting" }, name: { zh: "回收車分類站", en: "Recycling Station" },
      blurb: { zh: "回收、一般垃圾、重複使用怎麼分？", en: "Recycle, trash, or use again?" } },
    { href: "play.html?game=emotions", icon: "happy", scene: "hub-emotions", tone: "coral", resumeId: "emotions",
      tag: { zh: "情緒", en: "Feelings" }, name: { zh: "公園表情小故事", en: "Park Feelings" },
      blurb: { zh: "認出感受，選擇友善的回應", en: "Spot the feeling, choose a kind reply" } },
    { href: "play.html?game=market", icon: "basket", scene: "hub-market", tone: "yellow", resumeId: "market",
      tag: { zh: "記憶購物", en: "Shop & remember" }, name: { zh: "小小市場輪流買", en: "Little Market" },
      blurb: { zh: "記住清單、買兩樣、一起結帳", en: "Remember the list, buy two things, pay" } },
  ];

  function readResume() {
    try {
      const value = JSON.parse(window.localStorage.getItem(RESUME_KEY));
      return value && typeof value === "object" ? value : {};
    } catch { return {}; }
  }

  const ui = UI[lang];
  const resume = readResume();

  document.title = ui.docTitle;
  document.documentElement.lang = ui.htmlLang;
  document.querySelector("#hubKicker").textContent = ui.kicker;
  document.querySelector("#hubTitle").textContent = ui.title;
  document.querySelector("#hubSubtitle").textContent = ui.subtitle;
  document.querySelector("#hubCareNote").textContent = ui.care;

  const grid = document.querySelector("#gameGrid");
  TILES.forEach((tile) => {
    const link = document.createElement("a");
    link.className = `game-tile tile--${tile.tone}`;
    link.href = `${tile.href}${tile.href.includes("?") ? "&" : "?"}lang=${lang}`;
    const mark = document.createElement("span");
    const image = document.createElement("img");
    image.src = `../assets/scene-cards/${tile.scene}.webp?v=20260727-runtime1`;
    image.alt = "";
    image.addEventListener("error", () => image.replaceWith(window.KidIcons.el(tile.icon, "icon-svg")), { once: true });
    mark.append(image);
    const copy = document.createElement("div");
    const tag = document.createElement("small");
    tag.textContent = t(tile.tag);
    const name = document.createElement("h2");
    name.textContent = t(tile.name);
    const blurb = document.createElement("p");
    blurb.textContent = t(tile.blurb);
    copy.append(tag, name, blurb);
    const entry = tile.resumeId ? resume[tile.resumeId] : null;
    if (entry && Number.isInteger(entry.next) && entry.next > 0) {
      const badge = document.createElement("em");
      badge.className = "resume-badge";
      badge.textContent = ui.resume(entry.next + 1);
      copy.append(badge);
    }
    const arrow = document.createElement("b");
    arrow.textContent = "→";
    link.append(mark, copy, arrow);
    grid.append(link);
  });

  const toggle = document.querySelector("#hubLangToggle");
  toggle.textContent = ui.langButton;
  toggle.addEventListener("click", () => {
    const next = lang === "zh" ? "en" : "zh";
    try { window.localStorage.setItem("kid-games-lang", next); } catch { /* ignore */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.href = url.toString();
  });
})();
