/* Connect accepted scene-card art to the existing game data without changing
   the learning logic. The icon fields remain in place as offline fallbacks. */
(function () {
  "use strict";

  const games = window.KidGameData || {};
  const apply = (items, map, key = (item) => item.value) => {
    (items || []).forEach((item) => {
      const scene = map[key(item)] || map[item.value];
      if (scene) item.scene = scene;
    });
  };
  const parts = (game) => (game?.rounds || []).flatMap((round) => round.parts || []);

  const compare = {
    "house:low": "compare-house-small", "house:house": "compare-house-small",
    "building:high": "compare-building-tall", "building:building": "compare-building-tall",
    "ball:small": "compare-ball-small", "ball:mid": "compare-ball-medium", "ball:big": "compare-ball-big",
    "pencil:short": "compare-pencil-short", "pencil:long": "compare-pencil-long",
    "crane:crane": "compare-crane-tall", "bus:bus": "compare-bus-long",
    "car:car": "compare-car-medium", "car:mini": "compare-car-tiny",
    "umbrella:small": "compare-umbrella-small", "umbrella:mid": "compare-umbrella-medium", "umbrella:big": "compare-umbrella-big",
    "ladder:short": "compare-ladder-short", "ladder:mid": "compare-ladder-medium", "ladder:long": "compare-ladder-long",
  };
  parts(games.compare).forEach((part) => apply(part.choices, compare, (item) => `${item.icon}:${item.value}`));

  const sequence = {
    wake: "sequence-wake", brush: "sequence-brush", eat: "sequence-eat", leave: "sequence-leave",
    stop: "sequence-stop", left: "sequence-look-left", right: "sequence-look-right", cross: "sequence-cross",
    wet: "sequence-wet-hands", soap: "sequence-soap", rub: "sequence-rub-hands", rinse: "sequence-rinse",
    soil: "sequence-soil", seed: "sequence-seed", water: "sequence-water", sun: "sequence-sun", grow: "sequence-grow",
    tidy: "sequence-tidy", bath: "sequence-bath", pajama: "sequence-pajamas", story: "sequence-story", sleep: "sequence-sleep",
    shirt: "sequence-shirt", dress: "sequence-shirt", pants: "sequence-pants", socks: "sequence-socks", shoes: "sequence-shoes",
    dry: "sequence-dry-hands", walk: "sequence-walk", park: "sequence-park", backpack: "sequence-backpack", door: "sequence-leave",
  };
  parts(games.sequence).forEach((part) => {
    apply(part.steps, sequence);
    apply(part.extras, sequence);
    apply(part.choices, sequence);
  });

  const sounds = {
    bus: "sound-bus", dog: "sound-dog", bike: "sound-bike", train: "sound-train", ambulance: "sound-ambulance",
  };
  parts(games.sounds).forEach((part) => {
    apply(part.choices, sounds);
    apply(part.steps, sounds);
    apply(part.extras, sounds);
  });

  const traffic = { ambulance: "traffic-ambulance", kid: "traffic-child", dog: "traffic-dog" };
  parts(games.traffic).forEach((part) => apply(part.choices, traffic));

  const recycling = {
    paper: "recycle-bin-paper", plastic: "recycle-bin-plastic", metal: "recycle-bin-metal", trash: "recycle-bin-trash", reuse: "recycle-bin-reuse",
    newspaper: "recycle-newspaper", bottle: "recycle-bottle", can: "recycle-can", napkin: "recycle-tissue", box: "recycle-box",
    brokenToy: "recycle-broken-toy", juice: "recycle-juice-bottle", jar: "recycle-jar", tshirt: "recycle-shirt",
  };
  parts(games.recycle).forEach((part) => {
    apply(part.targets, recycling);
    if (part.source && recycling[part.source.value]) part.source.scene = recycling[part.source.value];
  });

  const emotions = {
    happy: "emotion-happy", sad: "emotion-sad", angry: "emotion-angry", surprised: "emotion-surprised", afraid: "emotion-afraid",
    hug: "kind-hug", leave: "kind-walk-away", play: "kind-play-alone", help: "kind-rebuild", stay: "kind-stay-close", wave: "kind-wave",
  };
  parts(games.emotions).forEach((part) => apply(part.choices, emotions));

  const market = { apple: "market-apple", bread: "market-bread", strawberry: "market-strawberry", banana: "market-banana", carrot: "market-carrot" };
  parts(games.market).forEach((part) => { if (part.type === "count") part.itemScene = market[part.item]; });

  const passengers = ["passenger-bear", "passenger-rabbit", "passenger-fox", "passenger-otter", "passenger-mouse"];
  parts(games.counting).forEach((part) => {
    if (part.type !== "count") return;
    part.scene = "counting-bus-scene";
    part.passengers = passengers;
  });
})();
