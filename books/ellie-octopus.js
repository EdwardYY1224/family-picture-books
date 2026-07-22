/* Ellie and the Octopus Mouth — a funny folk-flat dream story about not
   sleeping with the bottle. 16 hand-drawn SVG spreads + mp3 narration
   (books/audio-octopus/, built by tools/generate-octopus-audio.py). */
(function () {
  "use strict";

  const INK = "#2f423d";
  const C = {
    night: "#3d5c7d", day: "#eaf6fb", kitchen: "#fff3dd", sea: "#2e6b7c",
    seaDeep: "#265a6a", skin: "#ffdfc2", hair: "#f7d96b", dress: "#8fc7e8",
    ice: "#bfe3f2", iceDeep: "#5aa7d6", star: "#ffd95e", coral: "#f4775d",
    pink: "#f4a8c0", teal: "#16968d", purple: "#9b7ed9", wood: "#c98d5f",
    milk: "#fffdf5", snow: "#f4f9fc", green: "#22a985",
  };

  /* ---------- drawing helpers ---------- */
  const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 3.2}" fill="${INK}" stroke="none"/>`;
  const g = (x, y, s, body, rot) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ""}${s && s !== 1 ? ` scale(${s})` : ""}">${body}</g>`;
  const txt = (x, y, size, content, rot) => `<text x="${x}" y="${y}" font-family="Georgia, serif" font-weight="bold" font-size="${size}" fill="${INK}" stroke="none" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${content}</text>`;
  const bg = (color) => `<rect x="-4" y="-4" width="908" height="568" fill="${color}" stroke="none"/>`;
  const ground = () => `<path d="M-8 472 Q220 444 452 464 T908 458 L908 568 L-8 568 Z" fill="${C.snow}"/>`;
  const sparkle = (x, y, s, color) => g(x, y, s, `<path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="${color || "#fff"}" stroke="none"/>`);
  const moon = (x, y, s) => g(x, y, s, `<path d="M14 -44 C-14 -38 -30 -12 -24 14 S8 52 34 44 C12 56 -22 52 -38 28 S-44 -28 -20 -44 C-10 -50 4 -50 14 -44 Z" fill="${C.star}"/>`);
  const sun = (x, y, s) => g(x, y, s, `<circle cx="0" cy="0" r="34" fill="${C.star}"/><path d="M0 -50 v-14 M0 50 v14 M-50 0 h-14 M50 0 h14 M-36 -36 l-10 -10 M36 36 l10 10 M36 -36 l10 -10 M-36 36 l-10 -10" fill="none"/>`);
  const zzz = (x, y, size) => txt(x, y, size || 34, "z z z", -12);
  const heart = (x, y, s, color) => g(x, y, s, `<path d="M0 5 C-2 -3 -13 -2 -13 5 C-13 12 -4 16 0 21 C4 16 13 12 13 5 C13 -2 2 -3 0 5 Z" fill="${color || C.pink}" stroke-width="4"/>`);
  const bubbles = (list) => list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".35" stroke="#fff" stroke-width="2.5"/>`).join("");
  const seaweed = (x, y, h, color) => g(x, y, 1, `<path d="M0 0 q-14 ${-h * 0.3} 0 ${-h * 0.55} q12 ${-h * 0.2} 0 ${-h}" fill="none" stroke="${color || C.green}" stroke-width="9"/>`);
  const fish = (x, y, s, flip) => g(x, y, s, `<g${flip ? ` transform="scale(-1,1)"` : ""}><ellipse cx="0" cy="0" rx="22" ry="14" fill="${C.coral}"/><path d="M-20 0 L-34 -11 L-34 11 Z" fill="${C.coral}"/>${dot(9, -3, 2.4)}<path d="M10 5 q4 2 8 0" fill="none" stroke-width="3.5"/></g>`);

  const bottle = (x, y, s, rot) => g(x, y, s, `<rect x="-20" y="-32" width="40" height="62" rx="11" fill="#eef8ff"/><path d="M-20 -8 h40 v26 q0 12 -12 12 h-16 q-12 0 -12 -12 Z" fill="${C.milk}" stroke="none"/><rect x="-20" y="-32" width="40" height="62" rx="11" fill="none"/><rect x="-14" y="-46" width="28" height="15" rx="6" fill="${C.pink}"/><ellipse cx="0" cy="-52" rx="8" ry="7" fill="#ffe9d6"/><path d="M8 -2 h7 M8 10 h7" stroke-width="3.5" fill="none"/>`, rot);
  const nightcap = (x, y, s, rot) => g(x, y, s, `<path d="M-20 0 Q-4 -34 26 -22 L20 -12 Q2 -20 -8 2 Z" fill="${C.coral}"/><circle cx="27" cy="-24" r="7" fill="${C.star}"/>`, rot);
  const apple = (x, y, s) => g(x, y, s, `<path d="M0 -16 C-14 -28 -32 -18 -30 2 c2 18 14 30 30 30 s28 -12 30 -30 c2 -20 -16 -30 -30 -18 Z" fill="#ef624f"/><path d="M0 -18 c-1 -8 3 -13 9 -14" fill="none"/><path d="M4 -26 c8 -6 16 0 13 8 -8 3 -13 -1 -13 -8 Z" fill="${C.green}"/>`);
  const mirror = (x, y, s, rot) => g(x, y, s, `<ellipse cx="0" cy="-40" rx="46" ry="58" fill="${C.wood}"/><ellipse cx="0" cy="-40" rx="34" ry="46" fill="${C.ice}"/><path d="M-14 -64 q14 -10 24 2" fill="none" stroke="#fff" stroke-width="5"/><path d="M-16 20 L-26 60 M16 20 L26 60 M-26 60 h52" fill="none"/>`, rot);
  const bed = (x, y, w) => g(x, y, 1, `<rect x="0" y="-124" width="30" height="140" rx="13" fill="${C.wood}"/><rect x="24" y="-54" width="${(w || 600) - 40}" height="66" rx="16" fill="#fdfaf2"/><path d="M30 16 v20 M${(w || 600) - 30} 16 v20" fill="none"/>`);
  const blanket = (x, y, w, h) => g(x, y, 1, `<rect x="0" y="0" width="${w}" height="${h || 74}" rx="18" fill="${C.coral}"/><circle cx="${w * 0.22}" cy="${(h || 74) * 0.45}" r="6" fill="#ffd4c8" stroke="none"/><circle cx="${w * 0.5}" cy="${(h || 74) * 0.62}" r="6" fill="#ffd4c8" stroke="none"/><circle cx="${w * 0.78}" cy="${(h || 74) * 0.4}" r="6" fill="#ffd4c8" stroke="none"/>`);
  const windowFrame = (x, y, w, h, daylight) => g(x, y, 1, `<rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="${daylight ? C.day : "#34506e"}"/>${daylight ? g(w * 0.32, h * 0.45, 0.6, `<circle cx="0" cy="0" r="34" fill="${C.star}"/><path d="M0 -50 v-12 M0 50 v12 M-50 0 h-12 M50 0 h12 M-36 -36 l-9 -9 M36 36 l9 9 M36 -36 l9 -9 M-36 36 l-9 -9" fill="none"/>`) : `<circle cx="${w * 0.25}" cy="${h * 0.3}" r="3" fill="#ffe9b0" stroke="none"/><circle cx="${w * 0.7}" cy="${h * 0.22}" r="2.5" fill="#ffe9b0" stroke="none"/><circle cx="${w * 0.55}" cy="${h * 0.6}" r="3" fill="#ffe9b0" stroke="none"/>${moon(w * 0.32, h * 0.42, 0.42)}`}<rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="none" stroke-width="7"/>`);
  const bubbleTalk = (x, y, w, h, tailDx, content, fontSize) => g(x, y, 1, `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff"/><path d="M${tailDx} ${h / 2 - 3} l-8 22 l22 -12 Z" fill="#fff" stroke-width="5"/>${txt(0, (fontSize || 26) * 0.32, fontSize || 26, content)}`);

  /* Eight wiggly tentacle-lips dangling from the mouth, octopus-leg style. */
  function octoMouth(x, y, s) {
    const tent = (ox, len, sway) =>
      `<path d="M${ox} 2 q${sway} ${len * 0.55} 0 ${len}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`
      + `<path d="M${ox} 2 q${sway} ${len * 0.55} 0 ${len}" fill="none" stroke="${C.pink}" stroke-width="5" stroke-linecap="round"/>`;
    return g(x, y, s, `
      <ellipse cx="0" cy="0" rx="15" ry="9" fill="#c96b5b" stroke-width="4"/>
      ${tent(-32, 16, -8)}${tent(-23, 27, 10)}${tent(-12, 36, -9)}${tent(-4, 43, 8)}
      ${tent(4, 43, -8)}${tent(12, 36, 9)}${tent(23, 27, -10)}${tent(32, 16, 8)}`);
  }

  /* ---------- Ellie ---------- */
  function ellieFace(mood) {
    const cheeks = `<circle cx="-25" cy="-181" r="6" fill="${C.pink}" stroke="none" opacity=".5"/><circle cx="25" cy="-181" r="6" fill="${C.pink}" stroke="none" opacity=".5"/>`;
    if (mood === "sad") return `${cheeks}<path d="M-21 -209 l10 -4 M21 -209 l-10 -4" fill="none" stroke-width="4"/>${dot(-15, -196)}${dot(15, -196)}<path d="M-9 -172 Q0 -181 9 -172" fill="none" stroke-width="4.5"/>`;
    if (mood === "surprised") return `${cheeks}<circle cx="-15" cy="-196" r="7" fill="#fff" stroke-width="4"/><circle cx="15" cy="-196" r="7" fill="#fff" stroke-width="4"/>${dot(-15, -195, 2.6)}${dot(15, -195, 2.6)}<ellipse cx="0" cy="-174" rx="6" ry="8" fill="#c96b5b" stroke-width="4"/>`;
    if (mood === "round") return `${cheeks}${dot(-15, -196)}${dot(15, -196)}<circle cx="0" cy="-174" r="13" fill="none" stroke-width="5" stroke="${C.pink}"/><circle cx="0" cy="-174" r="7" fill="#c96b5b" stroke-width="4"/>`;
    if (mood === "octo-surprised") return `${cheeks}<circle cx="-15" cy="-198" r="7" fill="#fff" stroke-width="4"/><circle cx="15" cy="-198" r="7" fill="#fff" stroke-width="4"/>${dot(-15, -197, 2.6)}${dot(15, -197, 2.6)}${octoMouth(0, -172, 0.72)}`;
    if (mood === "octo-sad") return `${cheeks}<path d="M-21 -211 l10 -4 M21 -211 l-10 -4" fill="none" stroke-width="4"/>${dot(-15, -198)}${dot(15, -198)}${octoMouth(0, -172, 0.72)}`;
    if (mood === "octo-happy") return `${cheeks}${dot(-15, -196)}${dot(15, -196)}${octoMouth(0, -172, 0.72)}`;
    if (mood === "joy") return `${cheeks}<path d="M-21 -196 Q-15 -203 -9 -196 M9 -196 Q15 -203 21 -196" fill="none" stroke-width="4"/><path d="M-13 -180 Q0 -166 13 -180" fill="none" stroke-width="4.5"/>`;
    return `${cheeks}${dot(-15, -196)}${dot(15, -196)}<path d="M-11 -180 Q0 -169 11 -180" fill="none" stroke-width="4.5"/>`;
  }

  function ellieArms(arms) {
    const sleeve = `stroke="${C.dress}" stroke-width="15"`;
    const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.skin}" stroke-width="4.5"/>`;
    if (arms === "up") return `<path d="M-34 -128 Q-64 -152 -76 -182" fill="none" ${sleeve}/><path d="M34 -128 Q64 -152 76 -182" fill="none" ${sleeve}/>${hand(-79, -188)}${hand(79, -188)}`;
    if (arms === "chest") return `<path d="M-36 -124 Q-50 -104 -24 -98" fill="none" ${sleeve}/><path d="M36 -124 Q50 -104 24 -98" fill="none" ${sleeve}/>${hand(-19, -97)}${hand(19, -97)}`;
    if (arms === "wave") return `<path d="M-36 -126 Q-54 -92 -48 -60" fill="none" ${sleeve}/><path d="M34 -128 Q62 -150 72 -178" fill="none" ${sleeve}/>${hand(-48, -54)}${hand(75, -184)}`;
    if (arms === "touch") return `<path d="M-36 -124 Q-52 -146 -26 -160" fill="none" ${sleeve}/><path d="M36 -124 Q52 -146 26 -160" fill="none" ${sleeve}/>${hand(-21, -162)}${hand(21, -162)}`;
    return `<path d="M-36 -126 Q-54 -92 -48 -60" fill="none" ${sleeve}/><path d="M36 -126 Q54 -92 48 -60" fill="none" ${sleeve}/>${hand(-48, -54)}${hand(48, -54)}`;
  }

  function ellie(x, y, s, mood, arms) {
    return g(x, y, s, `
      <circle cx="-48" cy="-152" r="17" fill="${C.hair}"/>
      <circle cx="-56" cy="-120" r="15" fill="${C.hair}"/>
      <circle cx="-61" cy="-92" r="13" fill="${C.hair}"/>
      <rect x="-70" y="-84" width="17" height="9" rx="4.5" fill="${C.coral}" stroke-width="4"/>
      <ellipse cx="-22" cy="2" rx="15" ry="7" fill="${C.iceDeep}"/>
      <ellipse cx="22" cy="2" rx="15" ry="7" fill="${C.iceDeep}"/>
      <path d="M0 -158 C-34 -150 -50 -70 -62 -4 L62 -4 C50 -70 34 -150 0 -158 Z" fill="${C.dress}"/>
      <path d="M-42 -44 Q0 -58 42 -44" fill="none" stroke="${C.day}" stroke-width="4"/>
      <path d="M-16 -96 v14 M-23 -89 h14 M22 -72 v12 M16 -66 h12" stroke="${C.day}" stroke-width="3.5" fill="none"/>
      ${ellieArms(arms)}
      <circle cx="0" cy="-196" r="42" fill="${C.skin}"/>
      <path d="M-43 -199 A43 43 0 0 1 43 -199 L34 -184 Q16 -206 0 -202 Q-16 -206 -34 -184 Z" fill="${C.hair}" stroke-width="4.5"/>
      <path d="M-15 -240 L-8 -256 L0 -243 L8 -256 L15 -240 Z" fill="${C.ice}" stroke-width="4"/>
      ${ellieFace(mood)}`);
  }

  function ellieInBed(x, y, mood) {
    let face = "";
    if (mood === "bottle") face = `<path d="M-14 4 Q-8 10 -2 4 M10 4 Q16 10 22 4" fill="none" stroke-width="4"/>`;
    else if (mood === "awake") face = `${dot(-8, 4)}${dot(16, 4)}<path d="M-2 20 Q4 27 10 20" fill="none" stroke-width="4"/>`;
    else face = `<path d="M-14 6 Q-8 12 -2 6 M10 6 Q16 12 22 6" fill="none" stroke-width="4"/><path d="M-2 24 Q4 29 10 24" fill="none" stroke-width="4"/>`;
    return g(x, y, 1, `
      <ellipse cx="0" cy="26" rx="66" ry="26" fill="#fff"/>
      <circle cx="34" cy="-34" r="19" fill="${C.hair}"/>
      <circle cx="58" cy="-16" r="16" fill="${C.hair}"/>
      <circle cx="4" cy="0" r="40" fill="${C.skin}"/>
      <path d="M-36 -10 A40 40 0 0 1 42 -12 L34 -6 Q16 -22 2 -18 Q-14 -22 -28 -2 Z" fill="${C.hair}" stroke-width="4.5"/>
      <circle cx="-16" cy="16" r="5.5" fill="${C.pink}" stroke="none" opacity=".5"/>
      <circle cx="26" cy="16" r="5.5" fill="${C.pink}" stroke="none" opacity=".5"/>
      ${face}
      ${mood === "bottle" ? bottle(30, 44, 0.72, -128) : ""}`);
  }

  function mom(x, y, s) {
    return g(x, y, s, `
      <circle cx="0" cy="-262" r="16" fill="#6b4f37"/>
      <path d="M-30 8 h60" fill="none"/>
      <path d="M0 -238 C-36 -228 -50 -100 -58 0 L58 0 C50 -100 36 -228 0 -238 Z" fill="${C.teal}"/>
      <path d="M-36 -60 Q0 -74 36 -60" fill="none" stroke="#0f6f68" stroke-width="4"/>
      <path d="M-32 -196 Q-48 -160 -42 -128" fill="none" stroke="${C.teal}" stroke-width="14"/>
      <circle cx="-42" cy="-122" r="9" fill="${C.skin}" stroke-width="4.5"/>
      <path d="M32 -196 Q56 -216 46 -244" fill="none" stroke="${C.teal}" stroke-width="14"/>
      <circle cx="48" cy="-250" r="9" fill="${C.skin}" stroke-width="4.5"/>
      <circle cx="0" cy="-270" r="36" fill="${C.skin}"/>
      <path d="M-37 -273 A37 37 0 0 1 37 -273 L29 -260 Q14 -278 0 -275 Q-14 -278 -29 -260 Z" fill="#6b4f37" stroke-width="4.5"/>
      <circle cx="-21" cy="-252" r="5" fill="${C.pink}" stroke="none" opacity=".5"/>
      <circle cx="21" cy="-252" r="5" fill="${C.pink}" stroke="none" opacity=".5"/>
      ${dot(-12, -260, 2.8)}${dot(12, -260, 2.8)}
      <path d="M-9 -246 Q0 -238 9 -246" fill="none" stroke-width="4"/>`);
  }

  /* Friendly wise octopus with round glasses. */
  function wiseOcto(x, y, s, armPose) {
    let legs = "";
    const drops = [[-52, 4, -14], [-34, 10, -4], [-14, 12, 6], [6, 12, -6], [24, 10, 8], [44, 4, 16]];
    drops.forEach(([lx, ly, sway]) => {
      legs += `<path d="M${lx} ${ly} q${sway * 0.4} 26 ${sway} 44 q${sway * 0.5} 14 ${sway * 1.3} 16" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/>`;
      legs += `<path d="M${lx} ${ly} q${sway * 0.4} 26 ${sway} 44 q${sway * 0.5} 14 ${sway * 1.3} 16" fill="none" stroke="${C.purple}" stroke-width="9" stroke-linecap="round"/>`;
    });
    const arm = armPose === "hold"
      ? `<path d="M56 -8 q34 -12 40 -44" fill="none" stroke="${INK}" stroke-width="15"/><path d="M56 -8 q34 -12 40 -44" fill="none" stroke="${C.purple}" stroke-width="9"/>`
      : `<path d="M56 -8 q36 6 44 -18" fill="none" stroke="${INK}" stroke-width="15"/><path d="M56 -8 q36 6 44 -18" fill="none" stroke="${C.purple}" stroke-width="9"/>`;
    return g(x, y, s, `
      ${legs}${arm}
      <path d="M-58 8 C-58 -58 58 -58 58 8 Q58 22 44 20 L-44 20 Q-58 22 -58 8 Z" fill="${C.purple}"/>
      <circle cx="-20" cy="-16" r="12" fill="#fff"/>
      <circle cx="20" cy="-16" r="12" fill="#fff"/>
      <circle cx="-20" cy="-16" r="16" fill="none" stroke-width="4"/>
      <circle cx="20" cy="-16" r="16" fill="none" stroke-width="4"/>
      <path d="M-4 -16 h8" fill="none" stroke-width="4"/>
      ${dot(-18, -14, 3)}${dot(22, -14, 3)}
      <path d="M-10 6 Q0 14 10 6" fill="none" stroke-width="4.5"/>
      <circle cx="-38" cy="0" r="6" fill="${C.pink}" stroke="none" opacity=".55"/>
      <circle cx="38" cy="0" r="6" fill="${C.pink}" stroke="none" opacity=".55"/>`);
  }

  const seaScene = (extra) => `${bg(C.sea)}${bubbles([[100, 120, 10], [160, 300, 7], [820, 90, 9], [760, 340, 6], [480, 70, 7], [60, 460, 8], [860, 480, 7]])}${seaweed(80, 566, 150)}${seaweed(840, 566, 190, "#59b88a")}${extra || ""}`;

  /* ---------- the sixteen spreads ---------- */
  const scenes = [];

  /* 0 cover */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(620, 52, 210, 165)}
    ${bed(120, 452, 640)}
    ${ellieInBed(260, 380, "bottle")}
    ${blanket(320, 372, 430)}
    ${zzz(200, 280, 30)}
    ${g(560, 200, 1, `<circle cx="0" cy="0" r="86" fill="#fff" opacity=".92"/><circle cx="-76" cy="72" r="12" fill="#fff" opacity=".92"/><circle cx="-98" cy="104" r="7" fill="#fff" opacity=".92"/>${wiseOcto(0, -4, 0.55)}`)}
    ${sparkle(140, 120, 1, "#ffe9b0")}${sparkle(820, 300, 0.8, "#ffe9b0")}`);

  /* 1 Ellie loves her bottle */
  scenes.push(() => `
    ${bg(C.kitchen)}
    ${ground()}
    ${ellie(430, 468, 1.02, "joy", "chest")}
    ${bottle(430, 360, 1.05, 0)}
    ${heart(300, 220, 1.1)}${heart(560, 190, 0.85)}${heart(620, 300, 0.7)}${heart(260, 330, 0.7)}
    ${sparkle(650, 140, 0.8, C.star)}`);

  /* 2 asleep with the bottle */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(600, 56, 230, 180)}
    ${bed(140, 452, 620)}
    ${ellieInBed(280, 380, "bottle")}
    ${blanket(340, 372, 400)}
    ${zzz(210, 275, 30)}
    ${txt(600, 320, 22, "sip, sip...", -6)}`);

  /* 3 Mommy's gentle warning */
  scenes.push(() => `
    ${bg(C.night)}
    ${bed(300, 452, 560)}
    ${ellieInBed(430, 380, "awake")}
    ${blanket(480, 372, 350)}
    ${bottle(545, 358, 0.8, 18)}
    ${mom(160, 470, 0.92)}
    ${bubbleTalk(285, 150, 380, 62, -60, "Not for sleeping, sweetie!", 22)}
    ${heart(330, 250, 0.6)}`);

  /* 4 the dream begins */
  scenes.push(() => `
    ${bg(C.night)}
    ${bed(60, 500, 420)}
    ${ellieInBed(170, 432, "bottle")}
    ${blanket(220, 424, 240, 60)}
    <path d="M320 380 Q420 320 470 240 Q520 160 640 120" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 16" opacity=".8"/>
    <circle cx="650" cy="170" r="140" fill="${C.sea}" stroke-width="7"/>
    ${g(650, 170, 1, `${bubbles([[-60, -40, 8], [50, -60, 6], [30, 50, 9], [-40, 60, 5]])}${fish(-30, 0, 0.8)}${fish(60, 30, 0.6, true)}`)}
    ${bubbles([[380, 340, 7], [430, 290, 5], [500, 230, 8], [560, 180, 5]])}
    ${sparkle(180, 160, 1, "#ffe9b0")}`);

  /* 5 lips go round and round */
  scenes.push(() => seaScene(`
    ${ellie(430, 470, 1.05, "round", "down")}
    <path d="M330 250 q-24 24 0 48 M540 250 q24 24 0 48" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="3 12"/>
    ${bubbles([[350, 190, 6], [520, 170, 8], [460, 130, 5]])}
    ${txt(650, 190, 24, "round and round...", -6)}`));

  /* 6 POP! octopus mouth in the mirror */
  scenes.push(() => seaScene(`
    ${mirror(640, 470, 1.15, 4)}
    ${ellie(320, 480, 1.1, "octo-surprised", "touch")}
    ${txt(200, 150, 30, "POP!")}
    ${sparkle(250, 200, 1, "#fff")}${sparkle(760, 190, 0.9, "#ffe9b0")}
    ${bubbles([[420, 150, 7], [500, 110, 5]])}`));

  /* 7 blub blub bloop */
  scenes.push(() => seaScene(`
    ${ellie(340, 480, 1.05, "octo-happy", "wave")}
    ${bubbleTalk(620, 170, 280, 62, -40, "Blub blub bloop!")}
    ${bubbles([[480, 260, 9], [540, 220, 6], [430, 200, 7], [590, 300, 5], [500, 330, 6]])}
    ${fish(700, 350, 0.9, true)}${fish(760, 420, 0.7)}
    ${txt(742, 300, 20, "hee hee!")}`));

  /* 8 can't eat, can't smile */
  scenes.push(() => seaScene(`
    ${g(240, 400, 1, `<ellipse cx="0" cy="40" rx="90" ry="16" fill="#fdfaf2"/>${apple(0, -10, 1.35)}`)}
    ${ellie(560, 480, 1.05, "octo-sad", "down")}
    ${bubbles([[400, 200, 7], [470, 150, 5]])}
    ${txt(250, 230, 22, "yum...?")}`));

  /* 9 the wise octopus */
  scenes.push(() => seaScene(`
    ${wiseOcto(640, 300, 1.5)}
    ${ellie(250, 480, 1, "octo-surprised", "down")}
    ${bubbles([[450, 180, 7], [520, 130, 5], [420, 320, 6]])}
    ${sparkle(760, 150, 0.9, "#ffe9b0")}`));

  /* 10 suck suck suck all night */
  scenes.push(() => seaScene(`
    ${wiseOcto(620, 290, 1.4, "hold")}
    ${bottle(740, 210, 0.85, 14)}
    ${ellie(250, 480, 1, "octo-sad", "down")}
    ${txt(480, 130, 26, "suck, suck, suck...", -5)}
    ${bubbles([[430, 220, 6], [500, 180, 5]])}`));

  /* 11 you can do it! */
  scenes.push(() => seaScene(`
    ${ellie(320, 475, 1.05, "octo-happy", "up")}
    ${wiseOcto(660, 310, 1.3)}
    ${sparkle(480, 160, 1.1, "#ffe9b0")}${sparkle(560, 240, 0.8, "#fff")}${sparkle(220, 200, 0.9, "#ffe9b0")}
    ${txt(500, 110, 26, "You can do it!")}`));

  /* 12 waking up — the smile is back */
  scenes.push(() => `
    ${bg(C.day)}
    ${windowFrame(600, 56, 230, 180, true)}
    ${bed(120, 470, 660)}
    ${blanket(180, 420, 540, 66)}
    ${ellie(430, 470, 0.98, "joy", "touch")}
    ${bottle(620, 400, 0.8, 12)}
    ${sparkle(300, 220, 1, C.star)}${sparkle(540, 180, 0.8, C.star)}
    ${txt(250, 170, 26, "Hooray!")}`);

  /* 13 goodnight, bottle */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(70, 56, 210, 165)}
    <rect x="560" y="380" width="290" height="26" rx="11" fill="${C.wood}"/>
    <path d="M590 406 v110 M820 406 v110" fill="none"/>
    ${bottle(700, 348, 1, 0)}
    ${nightcap(688, 300, 1, -6)}
    ${zzz(780, 270, 26)}
    ${ellie(330, 500, 1, "happy", "wave")}
    ${txt(500, 170, 24, "See you at breakfast!")}
    ${heart(470, 280, 0.6)}`);

  /* 14 sweet dreams, big smile */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(600, 50, 230, 180)}
    ${bed(140, 452, 620)}
    ${ellieInBed(290, 380, "sleep")}
    ${blanket(340, 380, 400)}
    ${zzz(200, 270, 32)}
    ${g(560, 240, 1, `<circle cx="0" cy="0" r="40" fill="#fff" opacity=".92"/><circle cx="-38" cy="34" r="10" fill="#fff" opacity=".92"/><circle cx="-56" cy="58" r="6" fill="#fff" opacity=".92"/><path d="M-14 -4 Q0 10 14 -4" fill="none" stroke="${C.coral}" stroke-width="5"/>${dot(-12, -12, 2.5)}${dot(12, -12, 2.5)}`)}
    ${sparkle(760, 300, 0.8, "#ffe9b0")}`);

  /* 15 your turn */
  scenes.push(() => `
    ${bg(C.night)}
    ${moon(760, 110, 1)}
    <rect x="180" y="400" width="540" height="28" rx="12" fill="${C.wood}"/>
    <path d="M220 428 v100 M680 428 v100" fill="none"/>
    ${bottle(450, 364, 1.35, 0)}
    ${nightcap(432, 300, 1.3, -6)}
    ${zzz(560, 250, 34)}
    ${g(190, 210, 1, `<circle cx="0" cy="0" r="62" fill="#fff" opacity=".92"/><circle cx="52" cy="52" r="9" fill="#fff" opacity=".92"/>${wiseOcto(0, -6, 0.42)}`)}
    ${sparkle(650, 160, 0.9, "#ffe9b0")}${sparkle(300, 120, 0.8, "#fff")}
    ${txt(450, 530, 26, "THE END ✦")}`);

  /* ---------- page text ---------- */
  const PAGES = [
    { en: "Ellie and the Octopus Mouth.", zh: "艾莉與章魚嘴巴。" },
    { en: "This is Ellie. She is four years old. At bedtime, she hugs her bottle of milk. She loves it very, very much.", zh: "這是艾莉，她四歲了。睡覺時間，她總是抱著她的牛奶瓶，愛得不得了。" },
    { en: "Every night, Ellie falls asleep with the bottle in her mouth. Sip, sip... snore. Sip, sip... snore.", zh: "每天晚上，艾莉都含著奶瓶睡著。咕嚕咕嚕……呼——。咕嚕咕嚕……呼——。" },
    { en: "Mommy says, “Bottles are for drinking, not for sleeping, sweetie.” But Ellie holds her bottle tight. “Just one more night!”", zh: "媽媽說：「寶貝，奶瓶是用來喝的，不是用來睡覺的喔。」艾莉把奶瓶抱得緊緊的：「再一個晚上就好嘛！」" },
    { en: "That night, Ellie has a dream. A funny, bubbly, underwater dream...", zh: "那天晚上，艾莉做了一個夢。一個好好笑、咕嚕咕嚕冒泡泡的海底夢……" },
    { en: "In the dream, Ellie sips and sleeps, sips and sleeps. Her lips go round... and round... and round...", zh: "夢裡，艾莉一邊吸一邊睡、一邊吸一邊睡。她的嘴唇變得圓圓的……越來越圓……越來越圓……" },
    { en: "POP! Ellie looks in the mirror. “Oh no! My mouth is an OCTOPUS mouth!” Her lips are eight wiggly legs!", zh: "啵！艾莉照照鏡子：「天啊！我的嘴巴變成章魚嘴巴了！」嘴唇變成八隻扭來扭去的腳！" },
    { en: "Ellie tries to say hello. But it comes out... “Blub blub bloop!” Bubbles float everywhere. Even the little fish giggle.", zh: "艾莉想說「哈囉」，說出來卻是「噗嚕噗嚕噗——」泡泡飄得到處都是，連小魚都咯咯笑了。" },
    { en: "Ellie tries to eat her yummy apple. But an octopus mouth can only suck, suck, suck. She tries to smile... “Blub.” Ellie feels sad.", zh: "艾莉想咬一口好吃的蘋果，可是章魚嘴巴只會吸吸吸。她想笑一個……「噗嚕。」艾莉好難過。" },
    { en: "A wise old octopus swims by. “Little one, why do you have an octopus mouth? You are NOT an octopus!”", zh: "一隻有智慧的章魚爺爺游過來：「小朋友，你怎麼會有章魚嘴巴？你又不是章魚呀！」" },
    { en: "“I sleep with my bottle every night,” says Ellie. The octopus shakes his head. “Suck, suck, suck all night — that is how a mouth turns octopus! Even MY mouth takes a rest at night.”", zh: "「我每天晚上都含著奶瓶睡覺。」章魚爺爺搖搖頭：「整晚吸、吸、吸，嘴巴就會變成章魚嘴巴！連我的嘴巴晚上都要休息呢。」" },
    { en: "“I want my smile back!” says Ellie. “Then let your bottle sleep in the kitchen,” smiles the octopus. “You are a big kid. You can do it!”", zh: "「我要我的笑容回來！」章魚爺爺微笑說：「那就讓奶瓶去廚房睡覺吧。你是大孩子，你做得到！」" },
    { en: "Ellie wakes up. She touches her mouth — hooray! Her smile is back! She looks at her bottle. “Hmm,” says Ellie. “I know what to do.”", zh: "艾莉醒來，摸摸嘴巴——太好了！笑容回來了！她看看奶瓶：「嗯……我知道該怎麼做了。」" },
    { en: "That night, Ellie drinks her milk BEFORE bed — gulp, gulp, all done! Then the bottle goes night-night in the kitchen. “Goodnight, bottle. See you at breakfast!”", zh: "那天晚上，艾莉睡前先把牛奶喝完——咕嚕咕嚕，喝光光！然後奶瓶到廚房睡覺覺。「晚安，奶瓶，早餐見！」" },
    { en: "No bottle in bed — and no octopus mouth! Just sweet dreams and a big, beautiful smile. Goodnight, big kid Ellie!", zh: "床上沒有奶瓶——也沒有章魚嘴巴！只有甜甜的夢，和大大的、漂亮的笑容。晚安，大孩子艾莉！" },
    { en: "Your turn! Where does your bottle sleep tonight? Say it with me: “Goodnight, bottle! See you at breakfast!” The end.", zh: "換你囉！今天晚上你的奶瓶要睡哪裡呢？跟我一起說：「晚安，奶瓶！早餐見！」故事說完了。" },
  ];

  /* ---------- reader ---------- */
  const els = {
    illustration: document.querySelector("#illustration"),
    coverOverlay: document.querySelector("#coverOverlay"),
    startButton: document.querySelector("#startButton"),
    textBand: document.querySelector("#textBand"),
    storyEn: document.querySelector("#storyEn"),
    storyZh: document.querySelector("#storyZh"),
    speakButton: document.querySelector("#speakButton"),
    prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"),
    pageCount: document.querySelector("#pageCount"),
    pageDots: document.querySelector("#pageDots"),
    soundButton: document.querySelector("#soundButton"),
    languageButton: document.querySelector("#languageButton"),
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };

  const state = { index: 0, sound: true, audio: null, lang: new URLSearchParams(location.search).get("lang") || localStorage.getItem("picture-book-language") || "en" };

  function speak(text) {
    if (!state.sound || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.lang === "zh" ? "zh-TW" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.78 : 0.82;
    utterance.pitch = state.lang === "zh" ? 1.08 : 1.05;
    const prefix = state.lang === "zh" ? "zh" : "en";
    const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith(prefix));
    utterance.voice = voices.find((voice) => /natural|online/i.test(voice.name) && voice.lang.toLowerCase().includes("us"))
      || voices.find((voice) => /natural|online|google/i.test(voice.name))
      || voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === "en-us")
      || voices[0] || null;
    utterance.onstart = () => els.speakButton.classList.add("is-speaking");
    utterance.onend = () => els.speakButton.classList.remove("is-speaking");
    utterance.onerror = () => els.speakButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

  function stopNarration() {
    if (state.audio) {
      state.audio.onended = null;
      state.audio.onerror = null;
      state.audio.pause();
      state.audio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    els.speakButton.classList.remove("is-speaking");
  }

  const audioSrc = (index) => state.lang === "zh"
    ? `audio-octopus-zh/page-${String(index).padStart(2, "0")}.mp3`
    : ((window.BOOK_AUDIO && window.BOOK_AUDIO[index]) || `audio-octopus/page-${String(index).padStart(2, "0")}.mp3`);

  function narrate(index) {
    stopNarration();
    if (!state.sound) return;
    const audio = new Audio(audioSrc(index));
    state.audio = audio;
    els.speakButton.classList.add("is-speaking");
    audio.onended = () => {
      els.speakButton.classList.remove("is-speaking");
      state.audio = null;
    };
    audio.onerror = () => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speak(PAGES[index][state.lang]);
    };
    audio.play().catch(() => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speak(PAGES[index][state.lang]);
    });
  }

  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }

  const illustrationSrc = (index) =>
    `assets/ellie-octopus-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

  function svgFallback(index) {
    return `<svg viewBox="0 0 900 560" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${scenes[index]()}</svg>`;
  }

  function renderIllustration(index) {
    const image = new Image();
    image.src = illustrationSrc(index);
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("error", () => {
      els.illustration.innerHTML = svgFallback(index);
    }, { once: true });
    els.illustration.replaceChildren(image);

    [index - 1, index + 1]
      .filter((pageIndex) => pageIndex >= 0 && pageIndex < PAGES.length)
      .forEach((pageIndex) => {
        const preload = new Image();
        preload.src = illustrationSrc(pageIndex);
      });
  }

  function render(index, silent) {
    state.index = index;
    const page = PAGES[index];
    renderIllustration(index);
    const isCover = index === 0;
    els.coverOverlay.hidden = !isCover;
    els.textBand.hidden = isCover;
    els.storyEn.textContent = page.en;
    els.storyZh.textContent = page.zh;
    els.storyEn.hidden = state.lang !== "en";
    els.storyZh.hidden = state.lang !== "zh";
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0;
    els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dotEl, i) => {
      dotEl.classList.toggle("current", i === index);
      dotEl.classList.toggle("done", i < index);
    });
    if (isCover || silent) stopNarration();
    else narrate(index);
  }

  function go(delta) {
    const next = Math.min(PAGES.length - 1, Math.max(0, state.index + delta));
    if (next !== state.index) render(next);
  }

  els.startButton.addEventListener("click", () => render(1));
  els.prevButton.addEventListener("click", () => go(-1));
  els.nextButton.addEventListener("click", () => go(1));
  els.speakButton.addEventListener("click", () => narrate(state.index));
  els.languageButton.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "zh" : "en";
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    localStorage.setItem("picture-book-language", state.lang);
    els.languageButton.textContent = state.lang === "en" ? "中文" : "EN";
    els.languageButton.setAttribute("aria-label", state.lang === "en" ? "切換成中文" : "Switch to English");
    render(state.index, true);
    if (state.index > 0 && state.sound) narrate(state.index);
  });
  els.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    els.soundButton.innerHTML = state.sound ? "🔊 <i>朗讀開</i>" : "🔇 <i>朗讀關</i>";
    els.soundButton.setAttribute("aria-pressed", String(state.sound));
    if (!state.sound) stopNarration();
  });
  els.tipsButton.addEventListener("click", () => { els.tipsOverlay.hidden = false; });
  els.tipsClose.addEventListener("click", () => { els.tipsOverlay.hidden = true; });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  });
  window.addEventListener("pagehide", stopNarration);
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();

  buildDots();
  els.languageButton.textContent = state.lang === "en" ? "中文" : "EN";
  els.languageButton.setAttribute("aria-label", state.lang === "en" ? "切換成中文" : "Switch to English");
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  render(0, true);
})();
