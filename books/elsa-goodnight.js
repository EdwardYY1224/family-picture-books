/* Ellie's Big-Kid Magic — a warm folk-gouache picture book with English narration.
   16 generated picture-book spreads, with the original SVG scenes kept as an
   offline fallback, plus SpeechSynthesis (en-US) page reading. */
(function () {
  "use strict";

  const INK = "#2f423d";
  const C = {
    night: "#3d5c7d", nightDeep: "#34506e", day: "#eaf6fb", kitchen: "#fff3dd",
    cream: "#fdf6e9", snow: "#f4f9fc", skin: "#ffdfc2", hair: "#f7d96b",
    dress: "#8fc7e8", ice: "#bfe3f2", iceDeep: "#5aa7d6", star: "#ffd95e",
    coral: "#f4775d", pink: "#f4a8c0", teal: "#16968d", purple: "#9b7ed9",
    wood: "#c98d5f", white: "#fdfdf6", gum: "#f7b8c4", milk: "#fffdf5",
  };

  /* ---------- tiny drawing helpers (all return SVG strings) ---------- */
  const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 3.2}" fill="${INK}" stroke="none"/>`;
  const g = (x, y, s, body, rot) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ""}${s && s !== 1 ? ` scale(${s})` : ""}">${body}</g>`;
  const txt = (x, y, size, content, rot) => `<text x="${x}" y="${y}" font-family="Georgia, serif" font-weight="bold" font-size="${size}" fill="${INK}" stroke="none" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${content}</text>`;

  const bg = (color) => `<rect x="-4" y="-4" width="908" height="568" fill="${color}" stroke="none"/>`;
  const snowGround = () => `<path d="M-8 472 Q220 444 452 464 T908 458 L908 568 L-8 568 Z" fill="${C.snow}"/>`;
  const sparkle = (x, y, s, color) => g(x, y, s, `<path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="${color || "#fff"}" stroke="none"/>`);
  const snowflake = (x, y, s) => g(x, y, s, `<path d="M0 -14 V14 M-12 -7 L12 7 M-12 7 L12 -7" stroke="#fff" stroke-width="4" fill="none"/>`);
  const starDots = (list) => list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffe9b0" stroke="none" opacity=".9"/>`).join("");
  const moon = (x, y, s) => g(x, y, s, `<path d="M14 -44 C-14 -38 -30 -12 -24 14 S8 52 34 44 C12 56 -22 52 -38 28 S-44 -28 -20 -44 C-10 -50 4 -50 14 -44 Z" fill="${C.star}"/>`);
  const sun = (x, y, s) => g(x, y, s, `<circle cx="0" cy="0" r="34" fill="${C.star}"/><path d="M0 -50 v-14 M0 50 v14 M-50 0 h-14 M50 0 h14 M-36 -36 l-10 -10 M36 36 l10 10 M36 -36 l10 -10 M-36 36 l-10 -10" fill="none"/>`);
  const note = (x, y, s, rot) => g(x, y, s, `<path d="M4 2 V-30 Q14 -36 22 -28" fill="none"/><ellipse cx="-3" cy="4" rx="9" ry="7" fill="${INK}" stroke="none"/>`, rot);
  const zzz = (x, y, size) => txt(x, y, size || 34, "z z z", -12);

  const paci = (x, y, s, rot) => g(x, y, s, `<ellipse cx="0" cy="-18" rx="10" ry="11" fill="#ffe9d6"/><path d="M-26 -8 Q-30 8 -18 10 L18 10 Q30 8 26 -8 Q14 -16 0 -16 Q-14 -16 -26 -8 Z" fill="${C.pink}"/><circle cx="0" cy="-4" r="4" fill="#fff" stroke="none" opacity=".8"/><circle cx="0" cy="20" r="9" fill="none" stroke-width="5.5"/>`, rot);
  const bottle = (x, y, s, rot) => g(x, y, s, `<rect x="-20" y="-32" width="40" height="62" rx="11" fill="#eef8ff"/><path d="M-20 -8 h40 v26 q0 12 -12 12 h-16 q-12 0 -12 -12 Z" fill="${C.milk}" stroke="none"/><rect x="-20" y="-32" width="40" height="62" rx="11" fill="none"/><rect x="-14" y="-46" width="28" height="15" rx="6" fill="${C.pink}"/><ellipse cx="0" cy="-52" rx="8" ry="7" fill="#ffe9d6"/><path d="M8 -2 h7 M8 10 h7" stroke-width="3.5" fill="none"/>`, rot);
  const cup = (x, y, s) => g(x, y, s, `<path d="M-18 -24 h36 l-5 40 q-1 8 -9 8 h-8 q-8 0 -9 -8 Z" fill="#fff"/><path d="M-14 -12 h28" stroke="${C.ice}" stroke-width="4"/>`);
  const toothbrush = (x, y, s, rot) => g(x, y, s, `<rect x="-5" y="-14" width="10" height="58" rx="5" fill="${C.iceDeep}"/><rect x="-9" y="-32" width="18" height="20" rx="5" fill="#fff"/><path d="M-5 -28 v12 M0 -28 v12 M5 -28 v12" stroke-width="2.5" fill="none"/>`, rot);
  const waterGlass = (x, y, s) => g(x, y, s, `<path d="M-14 -22 h28 l-4 40 h-20 Z" fill="#eef8ff"/><path d="M-11 -8 h22" stroke="${C.iceDeep}" stroke-width="4"/>`);

  function babyStar(x, y, s, mood) {
    let face = "";
    if (mood === "cry") face = `<path d="M-17 -8 Q-11 -2 -5 -8 M5 -8 Q11 -2 17 -8" fill="none" stroke-width="4"/><path d="M-6 12 Q0 4 6 12" fill="none" stroke-width="4"/><path d="M-24 -2 q-6 10 0 15 q6 -5 0 -15" fill="${C.dress}" stroke="none"/><path d="M24 -2 q6 10 0 15 q-6 -5 0 -15" fill="${C.dress}" stroke="none"/>`;
    else if (mood === "paci") face = `${dot(-11, -8, 2.8)}${dot(11, -8, 2.8)}<ellipse cx="0" cy="8" rx="9" ry="6.5" fill="${C.pink}" stroke-width="3.5"/><circle cx="0" cy="8" r="3" fill="#fff" stroke="none"/>`;
    else if (mood === "sleep") face = `<path d="M-16 -6 Q-11 -1 -6 -6 M6 -6 Q11 -1 16 -6" fill="none" stroke-width="4"/><path d="M-6 8 Q0 13 6 8" fill="none" stroke-width="4"/>`;
    else face = `${dot(-11, -8, 2.8)}${dot(11, -8, 2.8)}<path d="M-8 6 Q0 14 8 6" fill="none" stroke-width="4"/>`;
    return g(x, y, s, `<path d="M0 -52 L15 -16 L52 -12 L24 13 L32 50 L0 30 L-32 50 L-24 13 L-52 -12 L-15 -16 Z" fill="${C.star}"/>${face}`);
  }
  const starGlow = (x, y, s) => g(x, y, s, `<path d="M0 -66 v-16 M47 -47 l11 -11 M66 0 h16 M47 47 l11 11 M-47 -47 l-11 -11 M-66 0 h-16 M-47 47 l-11 11 M0 66 v16" stroke="${C.star}" fill="none"/>`);

  function fairy(x, y, s) {
    return g(x, y, s, `
      <ellipse cx="-28" cy="-44" rx="18" ry="30" fill="#fff" opacity=".8" transform="rotate(-24 -28 -44)"/>
      <ellipse cx="28" cy="-44" rx="18" ry="30" fill="#fff" opacity=".8" transform="rotate(24 28 -44)"/>
      <path d="M0 -46 L-26 14 H26 Z" fill="${C.teal}"/>
      <path d="M-10 14 v12 M10 14 v12" fill="none"/>
      <path d="M22 -52 L54 -86" fill="none"/>
      ${g(58, -90, 0.36, `<path d="M0 -52 L15 -16 L52 -12 L24 13 L32 50 L0 30 L-32 50 L-24 13 L-52 -12 L-15 -16 Z" fill="${C.star}"/>`)}
      <circle cx="0" cy="-62" r="19" fill="${C.skin}"/>
      <circle cx="0" cy="-86" r="10" fill="#8a5a3b"/>
      <path d="M-19 -64 A19 19 0 0 1 19 -64 L12 -58 Q0 -70 -12 -58 Z" fill="#8a5a3b" stroke-width="4"/>
      ${dot(-6, -62, 2.2)}${dot(6, -62, 2.2)}<path d="M-5 -54 Q0 -50 5 -54" fill="none" stroke-width="3.5"/>`);
  }

  function tooth(x, y, s, mood, arms) {
    let face = "";
    if (mood === "sad") face = `<path d="M-14 -26 l9 4 M14 -26 l-9 4" fill="none" stroke-width="4"/>${dot(-10, -17, 2.6)}${dot(10, -17, 2.6)}<path d="M-7 -4 Q0 -11 7 -4" fill="none" stroke-width="4"/>`;
    else if (mood === "squish") face = `<path d="M-14 -20 Q-9 -15 -4 -20 M4 -20 Q9 -15 14 -20" fill="none" stroke-width="4"/><path d="M-7 -6 h14" fill="none" stroke-width="4"/>`;
    else face = `${dot(-10, -18, 2.6)}${dot(10, -18, 2.6)}<path d="M-8 -8 Q0 0 8 -8" fill="none" stroke-width="4"/>`;
    const cheer = arms ? `<path d="M-26 -16 L-40 -30 M26 -16 L40 -30" fill="none" stroke-width="4.5"/>` : "";
    return g(x, y, s, `<path d="M-26 -14 Q-26 -38 0 -38 Q26 -38 26 -14 Q26 6 15 8 Q11 30 3 10 Q0 4 -3 10 Q-11 30 -15 8 Q-26 6 -26 -14 Z" fill="${C.white}"/>${face}${cheer}`);
  }

  const sugarBug = (x, y, s, rot) => g(x, y, s, `<circle cx="0" cy="0" r="15" fill="${C.purple}"/><path d="M-6 -13 Q-10 -24 -18 -24 M6 -13 Q10 -24 18 -24" fill="none" stroke-width="3.5"/>${dot(-18, -25, 2.4)}${dot(18, -25, 2.4)}<circle cx="-5" cy="-3" r="3.4" fill="#fff" stroke="none"/><circle cx="5" cy="-3" r="3.4" fill="#fff" stroke="none"/>${dot(-5, -3, 1.6)}${dot(5, -3, 1.6)}<path d="M-4 6 Q0 10 4 6" fill="none" stroke-width="3"/><path d="M-13 10 l-6 8 M0 15 v9 M13 10 l6 8" fill="none" stroke-width="3.5"/>`, rot);

  const bear = (x, y, s) => g(x, y, s, `<circle cx="-20" cy="-46" r="11" fill="#f6f3ee"/><circle cx="20" cy="-46" r="11" fill="#f6f3ee"/><ellipse cx="0" cy="10" rx="26" ry="22" fill="#f6f3ee"/><circle cx="0" cy="-28" r="27" fill="#f6f3ee"/><ellipse cx="0" cy="-19" rx="11" ry="8.5" fill="#fff"/>${dot(-10, -32, 2.8)}${dot(10, -32, 2.8)}${dot(0, -22, 3)}<path d="M-24 4 q-10 6 -8 16 M24 4 q10 6 8 16" fill="none" stroke-width="5"/>`);

  /* ---------- Ellie (legacy SVG fallback character) ---------- */
  function elsaFace(mood) {
    const cheeks = `<circle cx="-25" cy="-181" r="6" fill="${C.pink}" stroke="none" opacity=".5"/><circle cx="25" cy="-181" r="6" fill="${C.pink}" stroke="none" opacity=".5"/>`;
    if (mood === "sad") return `${cheeks}<path d="M-21 -209 l10 -4 M21 -209 l-10 -4" fill="none" stroke-width="4"/>${dot(-15, -196)}${dot(15, -196)}<path d="M-9 -172 Q0 -181 9 -172" fill="none" stroke-width="4.5"/>`;
    if (mood === "surprised") return `${cheeks}<circle cx="-15" cy="-196" r="7" fill="#fff" stroke-width="4"/><circle cx="15" cy="-196" r="7" fill="#fff" stroke-width="4"/>${dot(-15, -195, 2.6)}${dot(15, -195, 2.6)}<ellipse cx="0" cy="-174" rx="6" ry="8" fill="#c96b5b" stroke-width="4"/>`;
    if (mood === "sleep") return `${cheeks}<path d="M-21 -194 Q-15 -188 -9 -194 M9 -194 Q15 -188 21 -194" fill="none" stroke-width="4"/><path d="M-6 -176 Q0 -171 6 -176" fill="none" stroke-width="4"/>`;
    if (mood === "paci") return `${cheeks}${dot(-15, -196)}${dot(15, -196)}<ellipse cx="0" cy="-176" rx="14" ry="10.5" fill="${C.pink}"/><circle cx="0" cy="-176" r="5" fill="#fff" stroke-width="4"/>`;
    return `${cheeks}${dot(-15, -196)}${dot(15, -196)}<path d="M-11 -180 Q0 -169 11 -180" fill="none" stroke-width="4.5"/>`;
  }

  function elsaArms(arms) {
    const sleeve = `stroke="${C.dress}" stroke-width="15"`;
    const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.skin}" stroke-width="4.5"/>`;
    if (arms === "out") return `<path d="M-34 -124 Q-70 -138 -98 -122" fill="none" ${sleeve}/><path d="M34 -124 Q70 -138 98 -122" fill="none" ${sleeve}/>${hand(-103, -119)}${hand(103, -119)}`;
    if (arms === "up") return `<path d="M-34 -128 Q-64 -152 -76 -182" fill="none" ${sleeve}/><path d="M34 -128 Q64 -152 76 -182" fill="none" ${sleeve}/>${hand(-79, -188)}${hand(79, -188)}`;
    if (arms === "offer") return `<path d="M-36 -126 Q-54 -92 -48 -60" fill="none" ${sleeve}/><path d="M34 -124 Q64 -132 86 -122" fill="none" ${sleeve}/>${hand(-48, -54)}${hand(91, -119)}`;
    if (arms === "chest") return `<path d="M-36 -124 Q-50 -104 -24 -98" fill="none" ${sleeve}/><path d="M36 -124 Q50 -104 24 -98" fill="none" ${sleeve}/>${hand(-19, -97)}${hand(19, -97)}`;
    if (arms === "brush") return `<path d="M-36 -126 Q-54 -92 -48 -60" fill="none" ${sleeve}/><path d="M36 -124 Q58 -142 36 -156" fill="none" ${sleeve}/>${hand(-48, -54)}${hand(31, -159)}`;
    return `<path d="M-36 -126 Q-54 -92 -48 -60" fill="none" ${sleeve}/><path d="M36 -126 Q54 -92 48 -60" fill="none" ${sleeve}/>${hand(-48, -54)}${hand(48, -54)}`;
  }

  function elsa(x, y, s, mood, arms) {
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
      ${elsaArms(arms)}
      <circle cx="0" cy="-196" r="42" fill="${C.skin}"/>
      <path d="M-43 -199 A43 43 0 0 1 43 -199 L34 -184 Q16 -206 0 -202 Q-16 -206 -34 -184 Z" fill="${C.hair}" stroke-width="4.5"/>
      <path d="M-15 -240 L-8 -256 L0 -243 L8 -256 L15 -240 Z" fill="${C.ice}" stroke-width="4"/>
      ${elsaFace(mood)}`);
  }

  /* Close-up head & shoulders, for the "tiny voices" spread. */
  function elsaCloseup(x, y, s, mood) {
    return g(x, y, s, `
      <path d="M-90 96 Q0 60 90 96 L90 130 L-90 130 Z" fill="${C.dress}"/>
      <circle cx="-58" cy="30" r="20" fill="${C.hair}"/>
      <circle cx="-68" cy="66" r="17" fill="${C.hair}"/>
      <circle cx="-58" cy="30" r="0" fill="none"/>
      <circle cx="0" cy="0" r="62" fill="${C.skin}"/>
      <path d="M-63 -4 A63 63 0 0 1 63 -4 L50 18 Q24 -12 0 -8 Q-24 -12 -50 18 Z" fill="${C.hair}" stroke-width="5"/>
      <path d="M-24 -60 L-13 -86 L0 -64 L13 -86 L24 -60 Z" fill="${C.ice}" stroke-width="4.5"/>
      <circle cx="-36" cy="22" r="8" fill="${C.pink}" stroke="none" opacity=".5"/>
      <circle cx="36" cy="22" r="8" fill="${C.pink}" stroke="none" opacity=".5"/>
      ${mood === "surprised"
        ? `<circle cx="-21" cy="2" r="10" fill="#fff" stroke-width="4"/><circle cx="21" cy="2" r="10" fill="#fff" stroke-width="4"/>${dot(-21, 4, 3.6)}${dot(21, 4, 3.6)}<path d="M-32 -18 q11 -8 22 -3 M10 -21 q11 -5 22 3" fill="none" stroke-width="4"/>`
        : `${dot(-21, 2, 4)}${dot(21, 2, 4)}`}
      <ellipse cx="0" cy="34" rx="20" ry="15" fill="${C.pink}"/>
      <circle cx="0" cy="34" r="7" fill="#fff"/>`);
  }

  /* Ellie lying in bed: head on pillow + blanket; mood: paci | sad | sleep */
  function elsaInBed(x, y, mood) {
    const face = mood === "paci"
      ? `<path d="M-14 4 Q-8 10 -2 4 M10 4 Q16 10 22 4" fill="none" stroke-width="4"/><ellipse cx="4" cy="24" rx="12" ry="9" fill="${C.pink}" stroke-width="4"/><circle cx="4" cy="24" r="4" fill="#fff" stroke-width="3"/>`
      : mood === "sad"
        ? `${dot(-8, 6)}${dot(16, 6)}<path d="M-2 26 Q4 20 10 26" fill="none" stroke-width="4"/><path d="M-26 14 q-5 9 0 13 q5 -4 0 -13" fill="${C.dress}" stroke="none"/>`
        : `<path d="M-14 6 Q-8 12 -2 6 M10 6 Q16 12 22 6" fill="none" stroke-width="4"/><path d="M-2 24 Q4 29 10 24" fill="none" stroke-width="4"/>`;
    return g(x, y, 1, `
      <ellipse cx="0" cy="26" rx="66" ry="26" fill="#fff"/>
      <circle cx="34" cy="-34" r="19" fill="${C.hair}"/>
      <circle cx="58" cy="-16" r="16" fill="${C.hair}"/>
      <circle cx="4" cy="0" r="40" fill="${C.skin}"/>
      <path d="M-36 -10 A40 40 0 0 1 42 -12 L34 -6 Q16 -22 2 -18 Q-14 -22 -28 -2 Z" fill="${C.hair}" stroke-width="4.5"/>
      <circle cx="-16" cy="16" r="5.5" fill="${C.pink}" stroke="none" opacity=".5"/>
      <circle cx="26" cy="16" r="5.5" fill="${C.pink}" stroke="none" opacity=".5"/>
      ${face}`);
  }

  function bed(x, y, w) {
    const bw = w || 600;
    return g(x, y, 1, `
      <rect x="0" y="-124" width="30" height="140" rx="13" fill="${C.wood}"/>
      <rect x="24" y="-54" width="${bw - 40}" height="66" rx="16" fill="#fdfaf2"/>
      <path d="M30 16 v20 M${bw - 30} 16 v20" fill="none"/>`);
  }
  const blanket = (x, y, w, h) => g(x, y, 1, `<rect x="0" y="0" width="${w}" height="${h || 74}" rx="18" fill="${C.coral}"/><circle cx="${w * 0.22}" cy="${(h || 74) * 0.45}" r="6" fill="#ffd4c8" stroke="none"/><circle cx="${w * 0.5}" cy="${(h || 74) * 0.62}" r="6" fill="#ffd4c8" stroke="none"/><circle cx="${w * 0.78}" cy="${(h || 74) * 0.4}" r="6" fill="#ffd4c8" stroke="none"/>`);

  const windowFrame = (x, y, w, h) => g(x, y, 1, `
    <rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="${C.nightDeep}"/>
    ${starDots([[w * 0.25, h * 0.3, 3], [w * 0.7, h * 0.22, 2.5], [w * 0.55, h * 0.6, 3], [w * 0.82, h * 0.68, 2.5]])}
    ${moon(w * 0.32, h * 0.42, 0.42)}
    <rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="none" stroke-width="7"/>`);

  const bubble = (x, y, w, h, tailDx, content) => g(x, y, 1, `
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff"/>
    <path d="M${tailDx} ${h / 2 - 3} l-8 22 l22 -12 Z" fill="#fff" stroke-width="5"/>
    ${txt(0, 8, 26, content)}`);

  /* ---------- the sixteen spreads ---------- */
  const scenes = [];

  /* 0 cover */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[120, 90, 4], [220, 160, 3], [520, 70, 3], [820, 210, 3.5], [80, 300, 3], [860, 100, 4]])}
    ${moon(760, 110, 1.1)}
    ${snowGround()}
    ${babyStar(190, 210, 0.6, "happy")}${babyStar(300, 120, 0.42, "happy")}${babyStar(650, 260, 0.5, "happy")}
    ${elsa(450, 468, 1.02, "happy", "out")}
    ${snowflake(180, 380, 1)}${snowflake(700, 350, 0.8)}${snowflake(590, 140, 0.7)}
    ${sparkle(360, 210, 1, "#fff")}${sparkle(540, 320, 0.8, "#ffe9b0")}`);

  /* 1 intro */
  scenes.push(() => `
    ${bg(C.day)}
    ${sun(110, 100, 1)}
    ${snowGround()}
    ${g(680, 465, 1, `<circle cx="0" cy="-56" r="60" fill="#fff"/><circle cx="0" cy="-140" r="42" fill="#fff"/>${dot(-13, -146)}${dot(13, -146)}<path d="M0 -136 l16 6 -16 6 Z" fill="#f09146" stroke-width="4"/><path d="M-10 -122 Q0 -114 10 -122" fill="none" stroke-width="4"/><path d="M-56 -70 l-30 -20 M56 -70 l30 -20" fill="none"/><path d="M-38 -110 q38 22 76 0" fill="none" stroke="${C.coral}" stroke-width="10"/>${dot(0, -66, 3.6)}${dot(0, -40, 3.6)}`)}
    ${elsa(320, 468, 1, "happy", "out")}
    <path d="M200 250 Q170 310 200 370" fill="none" stroke="${C.iceDeep}" stroke-width="4" stroke-dasharray="2 12"/>
    <path d="M448 250 Q478 310 448 370" fill="none" stroke="${C.iceDeep}" stroke-width="4" stroke-dasharray="2 12"/>
    ${snowflake(210, 220, 0.9)}${snowflake(450, 200, 0.8)}${snowflake(160, 420, 0.7)}${snowflake(500, 400, 0.7)}`);

  /* 2 paci + bottle at night */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(600, 56, 230, 180)}
    ${starDots([[120, 100, 3], [300, 60, 3.5], [480, 130, 2.5]])}
    ${bed(140, 452, 620)}
    ${elsaInBed(280, 380, "paci")}
    ${blanket(320, 372, 420)}
    <circle cx="420" cy="392" r="11" fill="${C.skin}" stroke-width="4.5"/>
    ${bottle(462, 380, 0.95, 24)}
    ${zzz(210, 280, 30)}
    ${txt(600, 320, 22, "suck, suck...", -6)}`);

  /* 3 tiny voices */
  scenes.push(() => `
    ${bg(C.nightDeep)}
    ${starDots([[100, 90, 3], [790, 80, 3.5], [850, 300, 2.5], [90, 420, 3]])}
    ${elsaCloseup(320, 300, 1.35, "surprised")}
    ${bubble(660, 150, 170, 62, -20, "Ouch!")}
    ${bubble(700, 300, 190, 62, -30, "Squish!")}
    ${sparkle(520, 100, 1, "#ffe9b0")}${sparkle(180, 140, 0.8, "#fff")}${sparkle(560, 460, 0.9, "#ffe9b0")}`);

  /* 4 squished teeth */
  scenes.push(() => `
    ${bg(C.cream)}
    <rect x="120" y="392" width="660" height="96" rx="38" fill="${C.gum}"/>
    ${tooth(370, 392, 1.5, "squish")}
    ${g(520, 392, 1.5, `<path d="M-26 -14 Q-26 -38 0 -38 Q26 -38 26 -14 Q26 6 15 8 Q11 30 3 10 Q0 4 -3 10 Q-11 30 -15 8 Q-26 6 -26 -14 Z" fill="${C.white}"/><path d="M-14 -20 Q-9 -15 -4 -20 M4 -20 Q9 -15 14 -20" fill="none" stroke-width="4"/><path d="M-7 -6 h14" fill="none" stroke-width="4"/>`, -12)}
    ${paci(448, 220, 2.1, 180)}
    <path d="M400 300 l-14 26 M448 306 v28 M496 300 l14 26" fill="none" stroke-width="5"/>
    ${txt(200, 180, 24, "squiiish...", -8)}`);

  /* 5 sugar bugs */
  scenes.push(() => `
    ${bg(C.cream)}
    ${tooth(450, 420, 2.3, "sad")}
    ${bottle(160, 170, 1.1, 118)}
    <path d="M215 210 q6 14 -2 22 M250 240 q6 14 -2 22" stroke="${C.milk}" stroke-width="7" fill="none"/>
    ${sugarBug(300, 310, 1.1, -14)}${sugarBug(610, 300, 1.2, 12)}${sugarBug(520, 180, 0.95, 4)}
    ${note(680, 200, 1, 10)}${note(240, 420, 0.9, -8)}${note(660, 420, 0.9, 6)}
    ${sparkle(380, 160, 0.8, C.purple)}${sparkle(720, 330, 0.8, C.purple)}
    ${txt(452, 120, 26, "party! party!", -4)}`);

  /* 6 worried Ellie */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[150, 110, 3], [720, 90, 3.5], [820, 260, 2.5]])}
    ${moon(790, 120, 0.85)}
    ${snowGround()}
    ${elsa(420, 470, 1.05, "sad", "chest")}
    ${paci(420, 574 - 208, 0.85, -12)}
    ${bottle(560, 442, 0.95, 0)}
    ${snowflake(220, 260, 0.7)}${snowflake(640, 330, 0.6)}`);

  /* 7 the star fairy */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[110, 80, 3], [850, 120, 3], [800, 60, 2.5]])}
    ${snowGround()}
    ${fairy(700, 210, 1.25)}
    ${sparkle(600, 120, 1, "#ffe9b0")}${sparkle(770, 320, 0.9, "#fff")}${sparkle(640, 300, 0.7, "#ffe9b0")}
    ${babyStar(420, 300, 0.78, "cry")}${babyStar(320, 372, 0.55, "cry")}${babyStar(530, 378, 0.6, "cry")}
    ${elsa(150, 470, 0.92, "surprised", "down")}`);

  /* 8 big vs little */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[700, 80, 3], [180, 70, 3]])}
    ${snowGround()}
    ${elsa(280, 468, 1.05, "happy", "down")}
    <path d="M380 212 V468" stroke-dasharray="4 14" stroke-width="5" fill="none"/>
    <path d="M366 212 h28 M366 468 h28" fill="none" stroke-width="5"/>
    ${babyStar(640, 430, 0.45, "happy")}${babyStar(730, 446, 0.34, "cry")}${babyStar(800, 428, 0.4, "happy")}
    <path d="M718 398 V468" stroke-dasharray="3 11" stroke-width="4" fill="none"/>
    ${txt(320, 150, 26, "I am big!")}
    ${txt(722, 350, 22, "so tiny...")}`);

  /* 9 the gift */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[140, 90, 3], [480, 60, 3]])}
    ${snowGround()}
    ${elsa(280, 470, 1, "happy", "offer")}
    ${starGlow(600, 320, 0.9)}
    ${babyStar(600, 320, 0.85, "paci")}
    ${babyStar(720, 420, 0.5, "happy")}${babyStar(500, 440, 0.45, "happy")}
    ${sparkle(420, 220, 1, "#ffe9b0")}${sparkle(680, 200, 0.9, "#fff")}${sparkle(780, 300, 0.7, "#ffe9b0")}`);

  /* 10 milk in the kitchen, then brush */
  scenes.push(() => `
    ${bg(C.kitchen)}
    <rect x="70" y="352" width="330" height="26" rx="11" fill="${C.wood}"/>
    <path d="M100 378 v120 M370 378 v120" fill="none"/>
    ${bottle(160, 322, 1, 0)}
    ${zzz(146, 240, 26)}
    ${cup(302, 328, 1)}
    ${txt(320, 282, 20, "all done!")}
    ${elsa(640, 500, 1, "happy", "brush")}
    ${toothbrush(671, 341, 1, -50)}
    ${sparkle(710, 290, 0.9, C.star)}${sparkle(566, 262, 0.7, C.star)}
    <rect x="796" y="490" width="88" height="18" rx="8" fill="${C.wood}"/>
    <path d="M812 508 v40 M868 508 v40" fill="none"/>
    ${waterGlass(840, 472, 1)}`);

  /* 11 the first night */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(590, 56, 240, 185)}
    ${starDots([[130, 90, 3], [420, 70, 3]])}
    ${bed(140, 452, 620)}
    ${elsaInBed(280, 380, "sad")}
    ${blanket(320, 372, 420)}
    <ellipse cx="470" cy="330" rx="26" ry="18" fill="none" stroke-dasharray="4 12" stroke-width="4"/>
    ${txt(470, 285, 20, "no paci...")}`);

  /* 12 big-kid magic */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[120, 80, 3], [800, 100, 3], [740, 50, 2.5]])}
    ${bed(120, 470, 660)}
    ${blanket(180, 420, 540, 66)}
    ${elsa(430, 470, 0.98, "happy", "chest")}
    ${bear(430, 420, 0.92)}
    ${snowflake(230, 220, 0.9)}${snowflake(300, 300, 0.7)}${snowflake(180, 330, 0.6)}
    ${note(650, 230, 1.05, 8)}${note(710, 300, 0.9, -6)}${note(600, 320, 0.85, 4)}
    ${txt(250, 160, 24, "1  breathe")}
    ${txt(450, 120, 24, "2  hug")}
    ${txt(660, 160, 24, "3  sing")}`);

  /* 13 morning cheer */
  scenes.push(() => `
    ${bg(C.day)}
    ${sun(120, 100, 1)}
    ${snowGround()}
    ${elsa(430, 468, 1.02, "happy", "up")}
    ${tooth(240, 300, 1, "happy", true)}
    ${tooth(630, 280, 0.9, "happy", true)}
    ${sparkle(300, 200, 1, C.star)}${sparkle(560, 180, 0.9, C.star)}${sparkle(690, 380, 0.8, C.star)}
    ${babyStar(800, 110, 0.4, "happy")}${babyStar(730, 60, 0.3, "happy")}
    ${txt(240, 240, 22, "Hooray!")}`);

  /* 14 every night */
  scenes.push(() => `
    ${bg(C.night)}
    ${windowFrame(600, 50, 230, 180)}
    ${starDots([[130, 80, 3], [400, 60, 3], [180, 300, 2.5]])}
    ${bed(140, 452, 620)}
    ${elsaInBed(290, 380, "sleep")}
    ${bear(430, 372, 0.66)}
    ${blanket(330, 380, 410)}
    ${zzz(200, 270, 32)}
    ${g(560, 250, 1, `<circle cx="0" cy="0" r="34" fill="#fff" opacity=".92"/><circle cx="-32" cy="30" r="9" fill="#fff" opacity=".92"/><circle cx="-48" cy="52" r="5" fill="#fff" opacity=".92"/>${snowflake(0, 0, 0.8).replace(/#fff/g, C.iceDeep)}`)}`);

  /* 15 your turn */
  scenes.push(() => `
    ${bg(C.night)}
    ${starDots([[120, 120, 3.5], [780, 90, 3], [840, 240, 3], [90, 280, 2.5], [500, 60, 3]])}
    ${g(450, 170, 1.35, `<path d="M14 -44 C-14 -38 -30 -12 -24 14 S8 52 34 44 C12 56 -22 52 -38 28 S-44 -28 -20 -44 C-10 -50 4 -50 14 -44 Z" fill="${C.star}"/><path d="M-20 -8 Q-15 -3 -10 -8" fill="none" stroke-width="3.5"/><path d="M-8 6 Q-3 10 2 6" fill="none" stroke-width="3.5"/>`)}
    ${babyStar(240, 130, 0.5, "sleep")}${babyStar(680, 170, 0.45, "paci")}${babyStar(320, 250, 0.35, "happy")}
    ${snowGround()}
    ${bear(450, 452, 1.15)}
    ${note(580, 380, 1, 8)}${note(320, 390, 0.9, -8)}
    ${snowflake(200, 420, 0.8)}${snowflake(700, 430, 0.8)}
    ${txt(450, 540, 26, "THE END ✦")}`);

  /* ---------- page text ---------- */
  const PAGES = [
    { en: "Ellie's Big-Kid Magic.", zh: "艾莉的大孩子魔法。" },
    { en: "This is Ellie. She is four years old. She loves building, dancing, and making up little songs!", zh: "這是四歲的艾莉。她喜歡堆積木、跳舞，還會自己編小小的歌！" },
    { en: "But every night, Ellie needs her paci and her bottle of milk to fall asleep. Suck, suck. Sip, sip.", zh: "可是每天晚上，艾莉都要含著奶嘴、抱著奶瓶才睡得著。嘬嘬、咕嚕咕嚕。" },
    { en: "One night, she hears tiny voices. “Ouch! Squish! Ouch!” Who is talking? It's her little teeth!", zh: "有一天晚上，她聽到小小的聲音：「唉唷！好擠！」是誰在說話？原來是她的小牙齒！" },
    { en: "“Dear Ellie,” say the teeth, “the paci squishes us all night. We can't grow big and straight!”", zh: "牙齒們說：「親愛的艾莉，奶嘴整晚壓著我們，我們沒辦法長得又高又直！」" },
    { en: "“And when milk sleeps in your mouth, sugar bugs come to party all night. Ewww!”", zh: "「而且牛奶留在嘴巴裡睡覺，糖糖蟲就會來開整晚的派對。噁——！」" },
    { en: "Ellie feels worried. “But I can't sleep without my paci...”", zh: "艾莉好擔心：「可是沒有奶嘴，我睡不著啊……」" },
    { en: "Whoosh! A star fairy flies in with three baby stars. “Listen, Ellie. The baby stars are crying. They are so little, and they have no paci at all.”", zh: "咻——！星星仙子帶著三顆星星寶寶飛進來：「艾莉你聽，星星寶寶在哭。他們好小好小，連一個奶嘴都沒有。」" },
    { en: "Ellie thinks. She is four. She is big. The baby stars are tiny. “Babies need pacis,” she says. “Big kids have magic!”", zh: "艾莉想了想。她四歲了，是大孩子；星星寶寶好小。她說：「奶嘴是寶寶用的，大孩子有魔法！」" },
    { en: "“Here you go, little stars. My paci is your paci now.” The baby stars stop crying and glow like little suns!", zh: "「送給你們，小星星。我的奶嘴現在是你們的了。」星星寶寶不哭了，亮得像小太陽！" },
    { en: "Now Ellie drinks her milk in the kitchen — gulp, gulp, all done! Then she brushes her teeth till they sparkle. At night, only water stays by her bed.", zh: "現在艾莉在廚房把牛奶喝完——咕嚕咕嚕，喝光光！然後把牙齒刷得亮晶晶。晚上，床邊只放白開水。" },
    { en: "The first night feels strange. Ellie misses her paci. It's okay to feel a little sad.", zh: "第一個晚上怪怪的，艾莉好想念奶嘴。有一點難過，也沒關係。" },
    { en: "So Ellie does her big-kid magic. One: a slow, gentle breath. Two: a big hug for Bear. Three: a tiny song. “La la la, goodnight, stars.”", zh: "於是艾莉使出大孩子魔法。一：慢慢地深呼吸。二：緊緊抱住小熊。三：唱一首小小的歌：「啦啦啦，晚安，星星。」" },
    { en: "In the morning, her teeth cheer: “Hooray! Thank you, Ellie!” And high in the sky, the baby stars shine just for her.", zh: "早上，牙齒們歡呼：「萬歲！謝謝你，艾莉！」高高的天上，星星寶寶正為她閃閃發光。" },
    { en: "Now every night it's breath... hug... song... and sweet, cozy dreams. No paci. No bottle. Goodnight, big kid Ellie!", zh: "現在每天晚上：呼吸……抱抱……唱歌……然後做個甜甜又溫暖的夢。不用奶嘴，不用奶瓶。晚安，大孩子艾莉！" },
    { en: "Your turn! Can you do the big-kid magic too? Take a deep breath... hug your teddy... and sing la la la. Goodnight, big kid.", zh: "換你囉！你也會大孩子魔法嗎？深呼吸……抱抱你的小熊……唱啦啦啦。晚安，大孩子。" },
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
    tipsButton: document.querySelector("#tipsButton"),
    tipsOverlay: document.querySelector("#tipsOverlay"),
    tipsClose: document.querySelector("#tipsClose"),
  };

  const state = { index: 0, sound: true, audio: null };

  /* Fallback only: browser SpeechSynthesis, preferring neural voices
     (Edge exposes "... Online (Natural)" voices that sound far better). */
  function speak(text) {
    if (!state.sound || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("en"));
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

  /* Preferred: pre-generated neural TTS mp3 (books/audio/page-NN.mp3,
     built by tools/generate-book-audio.py). Falls back to speak().
     window.BOOK_AUDIO lets the single-file artifact build inject data URIs. */
  const audioSrc = (index) => (window.BOOK_AUDIO && window.BOOK_AUDIO[index])
    || `audio/page-${String(index).padStart(2, "0")}.mp3`;

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
      speak(PAGES[index].en);
    };
    audio.play().catch(() => {
      state.audio = null;
      els.speakButton.classList.remove("is-speaking");
      speak(PAGES[index].en);
    });
  }

  function buildDots() {
    els.pageDots.replaceChildren();
    PAGES.forEach(() => els.pageDots.append(document.createElement("span")));
  }

  const illustrationSrc = (index) =>
    `assets/elsa-warm-folk/page-${String(index).padStart(2, "0")}.webp`;

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
    els.pageCount.textContent = `${index} / ${PAGES.length - 1}`;
    els.prevButton.disabled = index <= 0;
    els.nextButton.disabled = index >= PAGES.length - 1;
    [...els.pageDots.children].forEach((dotEl, i) => {
      dotEl.classList.toggle("current", i === index);
      dotEl.classList.toggle("done", i < index);
    });
    /* Narrate synchronously: page turns are tap gestures, and iOS Safari
       only allows the first audio playback inside a gesture call stack. */
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
  render(0, true);
})();
