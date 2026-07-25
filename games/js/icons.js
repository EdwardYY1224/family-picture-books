/* Folk Flat SVG icon library — bold ink outlines, flat playful fills,
   slightly imperfect hand-drawn feel on paper. Replaces platform emoji. */
(function () {
  "use strict";

  const INK = "#2f423d";
  const PALETTE = {
    red: "#ef624f", coral: "#f4775d", yellow: "#f5c94f", blue: "#3984c6",
    green: "#22a985", teal: "#16968d", mint: "#dceee7", cream: "#fffaf0",
    skin: "#ffd9b8", brown: "#c98d5f", tan: "#e6b877", gray: "#c9cdd0",
    pink: "#f2a9c4", purple: "#9b7ed9", paper: "#f7f2e7", dark: "#31433f",
  };

  function wrap(body, viewBox) {
    return `<svg viewBox="${viewBox || "0 0 96 96"}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }
  const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 2.6}" fill="${INK}" stroke="none"/>`;
  const smile = (x, y, w) => `<path d="M${x - w / 2} ${y}q${w / 2} ${w * 0.55} ${w} 0" fill="none"/>`;

  /* ---- people ---- */
  const kidBody = (shirt) => `<path d="M29 85c1-16 9-26 19-26s18 10 19 26Z" fill="${shirt}"/>`;
  const kidFace = `${dot(42, 34)}${dot(54, 34)}${smile(48, 40, 11)}`;
  const icons = {
    kid: wrap(`<circle cx="48" cy="31" r="17" fill="${PALETTE.skin}"/><path d="M32 26c3-10 29-10 32 0v3c-8-5-24-5-32 0Z" fill="#6b4f37"/>${kidFace}${kidBody(PALETTE.coral)}`),
    kidAlt: wrap(`<circle cx="27" cy="24" r="6" fill="#6b4f37"/><circle cx="69" cy="24" r="6" fill="#6b4f37"/><circle cx="48" cy="31" r="17" fill="${PALETTE.skin}"/><path d="M33 25c4-9 26-9 30 0v2c-8-4-22-4-30 0Z" fill="#6b4f37"/>${kidFace}${kidBody(PALETTE.blue)}`),
    adult: wrap(`<circle cx="48" cy="24" r="14" fill="${PALETTE.skin}"/><path d="M35 20c3-8 23-8 26 0v2c-7-4-19-4-26 0Z" fill="#4a3627"/>${dot(43, 26, 2.3)}${dot(53, 26, 2.3)}${smile(48, 31, 9)}<path d="M30 86c1-24 8-36 18-36s17 12 18 36Z" fill="${PALETTE.teal}"/>`),
    hug: wrap(`<path d="M42 46c-3 20 12 20 12 0" fill="none"/><circle cx="34" cy="34" r="13" fill="${PALETTE.skin}"/><circle cx="62" cy="34" r="13" fill="${PALETTE.skin}"/>${dot(31, 33, 2.2)}${dot(38, 33, 2.2)}${dot(59, 33, 2.2)}${dot(66, 33, 2.2)}${smile(34, 39, 8)}${smile(62, 39, 8)}<path d="M20 84c0-18 8-28 22-28h12c14 0 22 10 22 28Z" fill="${PALETTE.pink}"/><path d="M48 12c4-7 14-4 14 3 0 6-9 11-14 14-5-3-14-8-14-14 0-7 10-10 14-3Z" fill="${PALETTE.red}"/>`),
    share: wrap(`<path d="M14 66c10-6 20-8 30-4l20 8" fill="${PALETTE.skin}"/><path d="M14 78h56l12-14" fill="none"/><circle cx="52" cy="34" r="16" fill="${PALETTE.red}"/><path d="M52 18c-2-6 4-9 7-6" fill="none"/><path d="M55 20c7-4 13 2 9 7" fill="${PALETTE.green}"/>`),
    wave: wrap(`<circle cx="42" cy="36" r="16" fill="${PALETTE.skin}"/><path d="M27 31c3-9 27-9 30 0v3c-8-5-22-5-30 0Z" fill="#6b4f37"/>${dot(37, 38, 2.4)}${dot(48, 38, 2.4)}${smile(42, 44, 10)}<path d="M24 86c1-14 8-24 18-24s17 10 18 24Z" fill="${PALETTE.yellow}"/><path d="M62 60l14-18M70 62l12-14M64 50l10-14" fill="none"/>`),

    /* ---- faces / emotions ---- */
    happy: wrap(`<circle cx="48" cy="48" r="31" fill="${PALETTE.yellow}"/><path d="M35 43q4-5 8 0M53 43q4-5 8 0" fill="none"/><path d="M35 55q13 12 26 0" fill="none"/>`),
    sad: wrap(`<circle cx="48" cy="48" r="31" fill="#cde5f3"/>${dot(38, 43, 3)}${dot(58, 43, 3)}<path d="M37 62q11-9 22 0" fill="none"/><path d="M62 52c4 6 6 9 6 12a6 6 0 1 1-12 0c0-3 2-6 6-12Z" fill="${PALETTE.blue}"/>`),
    angry: wrap(`<circle cx="48" cy="48" r="31" fill="#ffb3a0"/><path d="M32 36l12 5M64 36l-12 5" fill="none"/>${dot(39, 47, 3)}${dot(57, 47, 3)}<path d="M38 64q10-7 20 0" fill="none"/>`),
    afraid: wrap(`<circle cx="48" cy="48" r="31" fill="${PALETTE.mint}"/><circle cx="38" cy="44" r="5.5" fill="#fff"/><circle cx="58" cy="44" r="5.5" fill="#fff"/>${dot(38, 44, 2.4)}${dot(58, 44, 2.4)}<path d="M40 62q8-4 16 0q-8 4-16 0Z" fill="#fff"/><path d="M25 30l-6-6M71 30l6-6" fill="none"/>`),
    surprised: wrap(`<circle cx="48" cy="48" r="31" fill="${PALETTE.yellow}"/><path d="M33 33q5-4 10-1M53 32q5-3 10 1" fill="none"/><circle cx="38" cy="44" r="4" fill="#fff"/><circle cx="58" cy="44" r="4" fill="#fff"/>${dot(38, 44, 2)}${dot(58, 44, 2)}<ellipse cx="48" cy="62" rx="7" ry="9" fill="#fff"/>`),

    /* ---- vehicles & city ---- */
    bus: wrap(`<rect x="7" y="24" width="82" height="44" rx="11" fill="${PALETTE.yellow}"/><rect x="15" y="33" width="15" height="13" rx="3.5" fill="${PALETTE.mint}"/><rect x="37" y="33" width="15" height="13" rx="3.5" fill="${PALETTE.mint}"/><rect x="61" y="33" width="17" height="27" rx="3.5" fill="${PALETTE.mint}"/><circle cx="26" cy="70" r="9" fill="${INK}"/><circle cx="26" cy="70" r="3.5" fill="#fff" stroke="none"/><circle cx="66" cy="70" r="9" fill="${INK}"/><circle cx="66" cy="70" r="3.5" fill="#fff" stroke="none"/>`),
    car: wrap(`<path d="M12 62v-9c0-5 4-9 9-9h6l8-11c2-3 5-4 8-4h10c5 0 9 4 9 9v6h9c5 0 9 4 9 9v9Z" fill="${PALETTE.coral}"/><path d="M38 33h12v10H31Z" fill="${PALETTE.mint}"/><circle cx="29" cy="66" r="8.5" fill="${INK}"/><circle cx="29" cy="66" r="3" fill="#fff" stroke="none"/><circle cx="67" cy="66" r="8.5" fill="${INK}"/><circle cx="67" cy="66" r="3" fill="#fff" stroke="none"/>`),
    ambulance: wrap(`<path d="M9 63V38c0-5 4-9 9-9h34l14 10h12c5 0 9 4 9 9v15Z" fill="#fdfaf2"/><rect x="42" y="16" width="10" height="8" rx="3" fill="${PALETTE.red}"/><path d="M24 39v14M17 46h14" stroke="${PALETTE.red}" stroke-width="7"/><rect x="56" y="38" width="14" height="11" rx="3" fill="${PALETTE.mint}"/><circle cx="27" cy="66" r="8.5" fill="${INK}"/><circle cx="27" cy="66" r="3" fill="#fff" stroke="none"/><circle cx="69" cy="66" r="8.5" fill="${INK}"/><circle cx="69" cy="66" r="3" fill="#fff" stroke="none"/>`),
    bike: wrap(`<circle cx="26" cy="62" r="14" fill="${PALETTE.mint}"/><circle cx="70" cy="62" r="14" fill="${PALETTE.mint}"/><path d="M26 62l14-26h22l8 26M40 36h-12M40 36l12 26H26" fill="none"/><path d="M64 33l-6-8h10" fill="none"/>`),
    train: wrap(`<rect x="12" y="20" width="58" height="46" rx="12" fill="${PALETTE.teal}"/><rect x="21" y="30" width="17" height="15" rx="4" fill="${PALETTE.mint}"/><rect x="45" y="30" width="17" height="15" rx="4" fill="${PALETTE.mint}"/><path d="M70 34h8c4 0 7 3 7 7v18c0 4-3 7-7 7h-8" fill="${PALETTE.teal}"/><circle cx="27" cy="70" r="7.5" fill="${INK}"/><circle cx="52" cy="70" r="7.5" fill="${INK}"/><circle cx="74" cy="70" r="7.5" fill="${INK}"/><path d="M41 12q4 5 0 8" fill="none"/>`),
    truck: wrap(`<rect x="8" y="26" width="50" height="36" rx="7" fill="${PALETTE.blue}"/><path d="M58 38h16l12 12v12H58Z" fill="${PALETTE.coral}"/><rect x="64" y="42" width="11" height="9" rx="2.5" fill="${PALETTE.mint}"/><circle cx="26" cy="66" r="8.5" fill="${INK}"/><circle cx="26" cy="66" r="3" fill="#fff" stroke="none"/><circle cx="72" cy="66" r="8.5" fill="${INK}"/><circle cx="72" cy="66" r="3" fill="#fff" stroke="none"/><path d="M20 38h26M20 48h26" stroke="#fff" stroke-width="4"/>`),
    turtle: wrap(`<path d="M22 60c0-16 12-28 26-28s26 12 26 28Z" fill="${PALETTE.green}"/><path d="M34 44l8 14M48 32v26M62 44l-8 14M36 58h24" fill="none" stroke="#0f6f4e"/><circle cx="80" cy="56" r="9" fill="#8fd0a5"/>${dot(82, 54, 2)}<path d="M22 60h56" fill="none"/><path d="M28 62l-4 10M68 62l4 10" fill="none" stroke="#8fd0a5" stroke-width="7"/>`),
    dog: wrap(`<ellipse cx="42" cy="60" rx="26" ry="18" fill="${PALETTE.brown}"/><circle cx="68" cy="42" r="15" fill="${PALETTE.brown}"/><path d="M58 30c-4-8 2-14 8-10" fill="${PALETTE.brown}"/><path d="M76 30c6-4 12 2 8 10" fill="${PALETTE.brown}"/>${dot(63, 41, 2.4)}${dot(73, 41, 2.4)}<circle cx="68" cy="49" r="3" fill="${INK}" stroke="none"/><path d="M16 52c-7-2-9-9-4-13" fill="none"/><path d="M30 76v6M52 76v6" fill="none"/>`),
    bird: wrap(`<path d="M26 46 10 34l16 1-9-13 20 12Z" fill="${PALETTE.teal}"/><ellipse cx="52" cy="54" rx="26" ry="20" fill="${PALETTE.coral}"/><path d="M50 52c-2 14-13 16-20 5 7-11 16-14 20-5Z" fill="${PALETTE.yellow}"/><circle cx="67" cy="38" r="15" fill="${PALETTE.coral}"/><path d="m79 37 10 5-10 4Z" fill="${PALETTE.yellow}"/>${dot(71, 34, 2.6)}<path d="M46 74v8m-5 0h10M62 75v7m-5 0h10" fill="none"/>`),
    house: wrap(`<path d="M18 48 48 22l30 26" fill="${PALETTE.coral}"/><path d="M24 48h48v30H24Z" fill="${PALETTE.cream}"/><rect x="42" y="58" width="12" height="20" rx="3" fill="${PALETTE.teal}"/><rect x="30" y="54" width="8" height="8" rx="2" fill="${PALETTE.mint}"/><rect x="58" y="54" width="8" height="8" rx="2" fill="${PALETTE.mint}"/>`),
    building: wrap(`<rect x="28" y="12" width="40" height="72" rx="4" fill="${PALETTE.blue}"/><rect x="36" y="20" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="52" y="20" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="36" y="36" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="52" y="36" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="36" y="52" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="52" y="52" width="9" height="9" rx="2" fill="${PALETTE.yellow}"/><rect x="42" y="68" width="12" height="16" rx="3" fill="${PALETTE.mint}"/>`),
    tree: wrap(`<path d="M43 84V58" fill="none"/><path d="M43 66c-6-2-10-8-8-13" fill="none"/><path d="M48 16c16 0 26 10 25 22 10 3 8 17-3 18H29c-12 0-16-13-7-18-3-13 10-22 26-22Z" fill="${PALETTE.green}"/>`),

    /* ---- food & market ---- */
    apple: wrap(`<path d="M48 32C34 20 16 30 18 50c2 18 14 30 30 30s28-12 30-30c2-20-16-30-30-18Z" fill="${PALETTE.red}"/><path d="M48 30c-1-8 3-13 9-14" fill="none"/><path d="M52 22c8-6 16 0 13 8-8 3-13-1-13-8Z" fill="${PALETTE.green}"/>`),
    banana: wrap(`<path d="M20 28c2 26 20 42 46 42 8 0 12-3 12-7-2-3-6-3-12-4-18-3-32-15-36-33-1-5-11-4-10 2Z" fill="${PALETTE.yellow}"/><path d="M22 24l-3-6" fill="none"/>`),
    carrot: wrap(`<path d="M40 32 22 76c-2 5 2 8 7 6l42-22c8-5 3-22-9-22-8 0-17 4-22-6Z" fill="#f09146"/><path d="M46 30c-2-8 4-14 10-15M52 32c4-7 12-9 17-6M50 26c0-7 5-12 10-13" fill="none" stroke="${PALETTE.green}"/><path d="M40 52l10 4M32 66l9 4" fill="none"/>`),
    bread: wrap(`<path d="M14 46c0-12 12-20 34-20s34 8 34 20c0 6-4 9-8 10v18c0 4-3 6-7 6H29c-4 0-7-2-7-6V56c-4-1-8-4-8-10Z" fill="${PALETTE.tan}"/><path d="M36 52q4 6 0 12M50 52q4 6 0 12M64 52q4 6 0 12" fill="none" stroke="#a9713d"/>`),
    strawberry: wrap(`<path d="M48 30c14-8 30 2 28 18-2 16-16 30-28 34-12-4-26-18-28-34-2-16 14-26 28-18Z" fill="${PALETTE.red}"/><path d="M34 26h28l-14 12Z" fill="${PALETTE.green}"/>${dot(38, 48, 2)}${dot(56, 48, 2)}${dot(47, 60, 2)}${dot(38, 66, 2)}${dot(57, 66, 2)}`),
    basket: wrap(`<path d="M30 40c0-16 36-16 36 0" fill="none"/><path d="M14 42h68l-8 36c-1 4-4 6-8 6H30c-4 0-7-2-8-6Z" fill="${PALETTE.tan}"/><path d="M32 50l4 26M48 50v26M64 50l-4 26M20 58h56M23 70h50" fill="none" stroke="#a9713d"/>`),
    checklist: wrap(`<rect x="22" y="12" width="52" height="72" rx="8" fill="${PALETTE.cream}"/><rect x="38" y="6" width="20" height="12" rx="5" fill="${PALETTE.coral}"/><path d="M32 34l5 5 9-10M32 56l5 5 9-10" fill="none" stroke="${PALETTE.green}"/><path d="M52 36h14M52 58h14" fill="none"/>`),
    coin: wrap(`<circle cx="48" cy="48" r="27" fill="${PALETTE.yellow}"/><circle cx="48" cy="48" r="17" fill="none"/><path d="M48 40v16M42 44h12" fill="none"/>`),

    /* ---- recycle & objects ---- */
    newspaper: wrap(`<path d="M18 26h44v50H24c-4 0-6-3-6-6Z" fill="${PALETTE.cream}"/><path d="M62 36h12c4 0 6 2 6 6v26c0 5-3 8-8 8H62Z" fill="${PALETTE.mint}"/><rect x="26" y="34" width="16" height="14" rx="2" fill="${PALETTE.blue}"/><path d="M48 36h8M48 44h8M26 56h30M26 64h30" fill="none"/>`),
    bottle: wrap(`<rect x="40" y="8" width="16" height="9" rx="3" fill="${PALETTE.teal}"/><path d="M40 17h16v8c8 4 11 10 11 18v32c0 6-4 10-10 10H39c-6 0-10-4-10-10V43c0-8 3-14 11-18Z" fill="#cde5f3"/><path d="M35 48h26M35 62h26" fill="none"/>`),
    can: wrap(`<ellipse cx="48" cy="22" rx="22" ry="9" fill="${PALETTE.gray}"/><path d="M26 22v50c0 5 10 9 22 9s22-4 22-9V22" fill="${PALETTE.gray}"/><path d="M26 40c6 4 38 4 44 0" fill="none"/><path d="M42 20c0-3 12-3 12 0s-12 3-12 0Z" fill="none"/>`),
    box: wrap(`<path d="M16 34h64v42c0 4-3 7-7 7H23c-4 0-7-3-7-7Z" fill="${PALETTE.tan}"/><path d="M16 34 26 18h44l10 16" fill="#d9a866"/><path d="M48 18v16" fill="none"/><path d="M40 46h16" fill="none" stroke="#a9713d"/>`),
    juice: wrap(`<path d="M30 30h36v46c0 4-3 8-8 8H38c-5 0-8-4-8-8Z" fill="${PALETTE.coral}"/><path d="M30 30l6-14h24l6 14" fill="${PALETTE.yellow}"/><path d="M58 22V8l8-2" fill="none"/><circle cx="48" cy="52" r="10" fill="${PALETTE.yellow}"/><path d="M48 46v12M42 52h12" fill="none" stroke="${PALETTE.coral}" stroke-width="4"/>`),
    napkin: wrap(`<path d="M20 40c-4-10 6-20 14-15 2-8 16-9 20-2 8-5 20 2 18 12 8 3 7 16-2 18l4 18c1 5-2 8-7 8H29c-5 0-8-3-7-8l4-18c-8-2-9-10-6-13Z" fill="#eef0ea"/><path d="M34 46q6 5 12 0q6 5 12 0" fill="none" stroke="#b8beb4"/>`),
    jar: wrap(`<rect x="34" y="10" width="28" height="12" rx="4" fill="${PALETTE.teal}"/><path d="M30 22h36v50c0 6-4 10-10 10H40c-6 0-10-4-10-10Z" fill="${PALETTE.mint}"/><path d="M36 34h24v30H36Z" fill="#fdfaf2" stroke="none" opacity=".6"/><path d="M38 30v40M58 30v40" fill="none" opacity=".35"/>`),
    tshirt: wrap(`<path d="M36 16 18 28l8 16 8-4v40c0 3 2 5 5 5h18c3 0 5-2 5-5V40l8 4 8-16-18-12c-4 6-16 6-20 0Z" fill="${PALETTE.teal}"/><path d="M40 58h16" fill="none" stroke="#0f6f68"/>`),
    brokenToy: wrap(`<circle cx="36" cy="40" r="20" fill="${PALETTE.pink}"/><path d="M60 34l16-14M60 46l20-4M56 54l14 10" fill="none"/>${dot(30, 37, 2.4)}${dot(42, 37, 2.4)}<path d="M30 47q6 4 12 0" fill="none"/><path d="M20 70l12 12M32 70 20 82" fill="none"/>`),

    /* ---- sequence / daily life ---- */
    bed: wrap(`<path d="M12 68V38" fill="none"/><path d="M12 56h72v12" fill="none"/><path d="M12 44c10-8 22-6 26 2v10H12Z" fill="${PALETTE.cream}"/><path d="M38 42c14-8 38-4 46 6v8H38Z" fill="${PALETTE.coral}"/><path d="M84 68V52M18 68v10M78 68v10" fill="none"/>`),
    toothbrush: wrap(`<path d="M22 74 66 30" fill="none" stroke-width="9"/><path d="M62 20l14 14" fill="none" stroke-width="9" stroke="${PALETTE.blue}"/><path d="M66 16l4 4M74 24l4 4M58 24l4 4M66 32l4 4" fill="none" stroke="#fff" stroke-width="3"/><path d="M18 82c-3-3-3-7 4-8" fill="none"/>`),
    bowl: wrap(`<path d="M16 48h64c0 18-12 30-32 30S16 66 16 48Z" fill="${PALETTE.blue}"/><path d="M16 48h64" fill="none"/><path d="M34 38q3-6 0-12M48 38q3-6 0-12M62 38q3-6 0-12" fill="none" opacity=".7"/><path d="M72 44l14-16" fill="none"/>`),
    backpack: wrap(`<path d="M30 34c0-16 36-16 36 0" fill="none"/><rect x="20" y="32" width="56" height="48" rx="14" fill="${PALETTE.coral}"/><rect x="32" y="56" width="32" height="24" rx="8" fill="${PALETTE.yellow}"/><path d="M32 44h32" fill="none"/><circle cx="48" cy="64" r="3" fill="${INK}" stroke="none"/>`),
    stopHand: wrap(`<path d="M34 46V22c0-6 9-6 9 0v18-24c0-6 9-6 9 0v22-18c0-6 9-6 9 0v22-12c0-6 9-6 9 0v26c0 16-10 28-24 28-10 0-16-4-22-14l-8-14c-3-5 3-10 8-6l10 8Z" fill="${PALETTE.skin}"/>`),
    lookLeft: wrap(`<circle cx="58" cy="38" r="20" fill="${PALETTE.skin}"/><path d="M42 32c3-9 29-9 32 0v3c-9-5-23-5-32 0Z" fill="#6b4f37"/><circle cx="50" cy="41" r="4.5" fill="#fff"/>${dot(48, 41, 2.2)}<circle cx="64" cy="41" r="4.5" fill="#fff"/>${dot(62, 41, 2.2)}<path d="M38 72H14m0 0 9-8m-9 8 9 8" fill="none" stroke="${PALETTE.coral}" stroke-width="6"/>`),
    lookRight: wrap(`<circle cx="38" cy="38" r="20" fill="${PALETTE.skin}"/><path d="M22 32c3-9 29-9 32 0v3c-9-5-23-5-32 0Z" fill="#6b4f37"/><circle cx="32" cy="41" r="4.5" fill="#fff"/>${dot(34, 41, 2.2)}<circle cx="46" cy="41" r="4.5" fill="#fff"/>${dot(48, 41, 2.2)}<path d="M58 72h24m0 0-9-8m9 8-9 8" fill="none" stroke="${PALETTE.coral}" stroke-width="6"/>`),
    walk: wrap(`<circle cx="52" cy="18" r="10" fill="${PALETTE.skin}"/><path d="M50 28c-8 2-12 8-14 16l-6 10" fill="none"/><path d="M50 28c8 2 10 10 8 18l-4 14 8 22" fill="none"/><path d="M54 60l-14 8-6 16" fill="none"/><path d="M36 44l14 4" fill="none"/>`),
    waterDrop: wrap(`<path d="M48 12c12 18 24 30 24 44a24 24 0 1 1-48 0c0-14 12-26 24-44Z" fill="${PALETTE.blue}"/><path d="M36 58a12 12 0 0 0 10 12" fill="none" stroke="#fff"/>`),
    soap: wrap(`<rect x="16" y="40" width="52" height="34" rx="14" fill="${PALETTE.pink}"/><path d="M28 56q8 6 14 0q8 6 14 0" fill="none" stroke="#fff"/><circle cx="66" cy="26" r="7" fill="${PALETTE.mint}"/><circle cx="80" cy="38" r="5" fill="${PALETTE.mint}"/><circle cx="78" cy="18" r="4" fill="${PALETTE.mint}"/>`),
    handsRub: wrap(`<path d="M14 46c8-12 22-16 32-8l10 8c4 4 0 10-6 8l-10-4" fill="${PALETTE.skin}"/><path d="M82 50c-8 12-22 16-32 8l-10-8c-4-4 0-10 6-8l10 4" fill="${PALETTE.skin}"/><circle cx="48" cy="22" r="5" fill="${PALETTE.mint}"/><circle cx="32" cy="16" r="4" fill="${PALETTE.mint}"/><circle cx="62" cy="14" r="3.5" fill="${PALETTE.mint}"/>`),
    shower: wrap(`<path d="M28 26c0-14 26-14 26 4" fill="none"/><path d="M40 28h28c2 8-4 14-14 14s-16-6-14-14Z" fill="${PALETTE.gray}"/><path d="M40 52v6M50 52v10M60 52v6M45 68v6M55 68v6" fill="none" stroke="${PALETTE.blue}" stroke-width="6"/>`),
    towel: wrap(`<path d="M20 18h56" fill="none"/><path d="M28 18v52c0 5 4 8 9 8h22c5 0 9-3 9-8V18" fill="${PALETTE.mint}"/><path d="M28 34h40M28 62h40" fill="none" stroke="${PALETTE.teal}"/>`),
    pot: wrap(`<path d="M22 40h52l-6 34c-1 5-4 8-9 8H37c-5 0-8-3-9-8Z" fill="#d97f52"/><path d="M18 32h60v8H18Z" fill="#c96b3f"/><path d="M32 32c4-6 28-6 32 0" fill="#7a5138"/>`),
    seed: wrap(`<ellipse cx="48" cy="52" rx="18" ry="24" fill="#8a5a3b" transform="rotate(-14 48 52)"/><path d="M42 42q6 8 4 20" fill="none" stroke="#5d3a24"/><path d="M70 22l4-6M78 32l6-2M66 14l1-7" fill="none" stroke="${PALETTE.yellow}"/>`),
    sprout: wrap(`<path d="M48 78V46" fill="none" stroke="${PALETTE.green}" stroke-width="6"/><path d="M48 50c-16 2-24-10-22-22 14-2 24 6 22 22Z" fill="${PALETTE.green}"/><path d="M48 42c2-14 12-20 24-18 2 12-8 22-24 18Z" fill="#59b88a"/><path d="M28 84h40" fill="none"/>`),
    sun: wrap(`<circle cx="48" cy="48" r="19" fill="${PALETTE.yellow}"/><path d="M48 14v9M48 73v9M14 48h9M73 48h9M24 24l7 7M65 65l7 7M72 24l-7 7M31 65l-7 7" fill="none"/>`),
    moon: wrap(`<path d="M60 14c-16 4-26 18-24 34s16 28 32 26c-8 8-20 12-32 8C18 76 10 56 18 38c6-15 26-26 42-24Z" fill="${PALETTE.yellow}"/><path d="M66 30l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="${PALETTE.yellow}"/>`),
    book: wrap(`<path d="M48 26c-8-8-22-9-34-4v52c12-5 26-4 34 4 8-8 22-9 34-4V22c-12-5-26-4-34 4Z" fill="${PALETTE.mint}"/><path d="M48 26v52" fill="none"/><path d="M24 36h14M24 48h14M58 36h14M58 48h14" fill="none" opacity=".65"/>`),
    bathtub: wrap(`<path d="M12 48h72v8c0 14-10 24-24 24H36c-14 0-24-10-24-24Z" fill="#fdfaf2"/><path d="M20 48V22c0-10 14-12 18-4" fill="none"/><path d="M34 22l8-2" fill="none"/><circle cx="52" cy="34" r="5" fill="${PALETTE.mint}"/><circle cx="64" cy="26" r="4" fill="${PALETTE.mint}"/><path d="M22 80l-4 8M74 80l4 8" fill="none"/>`),
    teddy: wrap(`<circle cx="28" cy="26" r="10" fill="${PALETTE.brown}"/><circle cx="68" cy="26" r="10" fill="${PALETTE.brown}"/><circle cx="48" cy="44" r="24" fill="${PALETTE.brown}"/><circle cx="48" cy="52" r="10" fill="${PALETTE.tan}"/>${dot(40, 38, 2.6)}${dot(56, 38, 2.6)}<circle cx="48" cy="49" r="3" fill="${INK}" stroke="none"/><path d="M44 56q4 3 8 0" fill="none"/><ellipse cx="30" cy="78" rx="10" ry="8" fill="${PALETTE.brown}"/><ellipse cx="66" cy="78" rx="10" ry="8" fill="${PALETTE.brown}"/>`),
    pants: wrap(`<path d="M28 14h40l6 62c0 4-3 6-7 6h-8c-4 0-6-2-7-6l-4-28-4 28c-1 4-3 6-7 6h-8c-4 0-7-2-7-6Z" fill="${PALETTE.blue}"/><path d="M28 26h40" fill="none"/>`),
    socks: wrap(`<path d="M26 12h20v34l10 12c6 8-2 20-12 16l-14-6c-3-1-4-4-4-7Z" fill="${PALETTE.mint}"/><path d="M26 22h20" fill="none"/><path d="M60 14h20v30l8 10c6 8-2 20-12 16l-12-6c-3-1-4-4-4-7Z" fill="${PALETTE.pink}" transform="translate(-6 4)"/>`),
    shoes: wrap(`<path d="M14 62c0-8 4-24 4-24h14c2 8 8 14 18 16 14 3 32 4 32 12v6H20c-4 0-6-4-6-10Z" fill="${PALETTE.coral}"/><path d="M14 72h68" fill="none"/><path d="M34 46l8 6M40 40l8 6" fill="none" stroke="#fff" stroke-width="4"/>`),
    door: wrap(`<rect x="26" y="12" width="44" height="72" rx="6" fill="${PALETTE.teal}"/><rect x="34" y="22" width="28" height="24" rx="4" fill="${PALETTE.mint}"/><circle cx="60" cy="58" r="4" fill="${PALETTE.yellow}"/><path d="M18 84h60" fill="none"/>`),
    park: wrap(`<path d="M30 80V62" fill="none"/><circle cx="30" cy="44" r="18" fill="${PALETTE.green}"/><path d="M62 80V68" fill="none"/><circle cx="62" cy="56" r="13" fill="#59b88a"/><path d="M12 84h72" fill="none"/><path d="M74 24l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="${PALETTE.yellow}"/>`),

    /* ---- compare & misc objects ---- */
    ball: wrap(`<circle cx="48" cy="48" r="30" fill="${PALETTE.blue}"/><path d="M48 18v60" fill="none"/><path d="M26 28c12 12 32 12 44 0M26 68c12-12 32-12 44 0" fill="none"/>`),
    pencil: wrap(`<path d="M20 76 64 32l12 12-44 44-16 4Z" fill="${PALETTE.yellow}"/><path d="M64 32l8-8c3-3 9-3 12 0s3 9 0 12l-8 8" fill="${PALETTE.pink}"/><path d="M20 76l4 12" fill="none"/><path d="M30 66l12 12" fill="none"/>`),
    umbrella: wrap(`<path d="M48 14c22 0 36 16 36 32-6-6-14-6-18 0-4-6-14-6-18 0-4-6-14-6-18 0-4-6-12-6-18 0 0-16 14-32 36-32Z" fill="${PALETTE.coral}"/><path d="M48 46v28c0 8 12 8 12 0" fill="none"/><path d="M48 14v-4" fill="none"/>`),
    ladder: wrap(`<path d="M30 10v76M66 10v76" fill="none"/><path d="M30 24h36M30 40h36M30 56h36M30 72h36" fill="none"/>`),
    crane: wrap(`<path d="M26 84V22l50 14" fill="none"/><path d="M26 36l24 6" fill="none"/><path d="M64 40v18" fill="none"/><path d="M56 58h16v12H56Z" fill="${PALETTE.yellow}"/><path d="M16 84h32" fill="none"/><path d="M20 22h12v-8H20Z" fill="${PALETTE.coral}"/>`),

    /* ---- audio & ui ---- */
    speaker: wrap(`<path d="M18 40h12l18-16v48L30 56H18c-3 0-5-2-5-5v-6c0-3 2-5 5-5Z" fill="${PALETTE.coral}"/><path d="M60 36q8 12 0 24M70 28q14 20 0 40" fill="none" stroke="${PALETTE.teal}"/>`),
    ear: wrap(`<path d="M34 36c0-16 12-24 24-22 14 2 20 16 16 28-3 9-10 12-12 20-2 9-8 14-16 12-6-2-9-8-7-13" fill="${PALETTE.skin}"/><path d="M46 40c0-8 6-12 12-10 7 2 9 10 5 16" fill="none"/>`),
    question: wrap(`<circle cx="48" cy="48" r="33" fill="${PALETTE.mint}"/><path d="M36 38c0-8 6-13 13-13 8 0 13 5 13 12 0 9-11 10-13 18" fill="none" stroke-width="6.5"/>${dot(49, 68, 4)}`),
    star: wrap(`<path d="M48 12l10 22 24 3-17 17 4 24-21-11-21 11 4-24L14 37l24-3Z" fill="${PALETTE.yellow}"/>`),
    trafficLight: wrap(`<rect x="30" y="8" width="36" height="80" rx="12" fill="${PALETTE.dark}"/><circle cx="48" cy="24" r="9" fill="${PALETTE.red}"/><circle cx="48" cy="48" r="9" fill="${PALETTE.yellow}"/><circle cx="48" cy="72" r="9" fill="${PALETTE.green}"/>`),
  };

  /* Traffic light with a single active bulb. */
  function light(active) {
    const colors = { red: PALETTE.red, yellow: PALETTE.yellow, green: PALETTE.green };
    const rows = [["red", 24], ["yellow", 48], ["green", 72]];
    const bulbs = rows.map(([name, y]) => name === active
      ? `<circle cx="48" cy="${y}" r="10" fill="${colors[name]}"/><circle cx="48" cy="${y}" r="14" fill="none" stroke="#fff" opacity=".5"/>`
      : `<circle cx="48" cy="${y}" r="9" fill="#54655f"/>`).join("");
    return wrap(`<rect x="28" y="6" width="40" height="84" rx="13" fill="${PALETTE.dark}"/>${bulbs}`);
  }
  icons.lightRed = light("red");
  icons.lightYellow = light("yellow");
  icons.lightGreen = light("green");

  /* Recycle bins with a small symbol on the front. */
  function bin(color, symbol) {
    return wrap(`<path d="M18 30h60l-6 48c-1 5-4 8-9 8H33c-5 0-8-3-9-8Z" fill="${color}"/><path d="M14 22h68v8H14Z" fill="${color}"/><path d="M38 22c1-6 19-6 20 0" fill="none"/>${symbol}`);
  }
  icons.binPaper = bin(PALETTE.blue, `<rect x="38" y="44" width="20" height="26" rx="3" fill="#fdfaf2"/><path d="M43 52h10M43 60h10" fill="none" stroke-width="3.5"/>`);
  icons.binPlastic = bin(PALETTE.teal, `<path d="M43 42h10v5c4 2 6 5 6 9v10c0 4-3 6-7 6h-8c-4 0-7-2-7-6V56c0-4 2-7 6-9Z" fill="#cde5f3"/>`);
  icons.binMetal = bin("#8d979b", `<ellipse cx="48" cy="46" rx="11" ry="4.5" fill="#e3e6e8"/><path d="M37 46v20c0 3 5 5 11 5s11-2 11-5V46" fill="#e3e6e8"/>`);
  icons.binTrash = bin("#77716a", `<path d="M40 48c0-5 16-5 16 0l3 18c1 4-2 6-6 6h-10c-4 0-7-2-6-6Z" fill="#efeae2"/><path d="M44 46c0-4 8-4 8 0" fill="none" stroke-width="3.5"/>`);
  icons.binReuse = bin(PALETTE.yellow, `<path d="M40 62a10 10 0 0 1 3-13l-3-2h11l-2 9-3-2a6 6 0 0 0-1 8Z" fill="${INK}" stroke="none"/><path d="M56 46a10 10 0 0 1 3 13l3 2H51l2-9 3 2a6 6 0 0 0 1-8Z" fill="${INK}" stroke="none" transform="rotate(180 53.5 53.5) translate(-2 -14)"/><path d="M52 68l8-1-4-8" fill="none" stroke-width="4"/>`);

  /* Wobbly flat shapes for the delivery game, tintable per round. */
  const SHAPE_COLORS = { red: PALETTE.red, yellow: PALETTE.yellow, blue: PALETTE.blue, green: PALETTE.green, purple: PALETTE.purple };
  function shapeMarkup(type, colorName) {
    const fill = SHAPE_COLORS[colorName] || PALETTE.blue;
    if (type === "circle") return wrap(`<ellipse cx="48" cy="48" rx="31" ry="29.5" fill="${fill}" transform="rotate(-4 48 48)"/>`);
    if (type === "triangle") return wrap(`<path d="M48 15 81 76H16Z" fill="${fill}" transform="rotate(2 48 48)"/>`);
    if (type === "square") return wrap(`<rect x="19" y="19" width="58" height="58" rx="9" fill="${fill}" transform="rotate(-2.5 48 48)"/>`);
    if (type === "rectangle") return wrap(`<rect x="8" y="28" width="80" height="41" rx="9" fill="${fill}" transform="rotate(1.5 48 48)"/>`);
    if (type === "star") return wrap(`<path d="M48 10l11 23 25 4-18 18 4 25-22-12-22 12 4-25-18-18 25-4Z" fill="${fill}"/>`);
    return icons.star;
  }

  window.KidIcons = {
    palette: PALETTE,
    markup(name) { return icons[name] || icons.star; },
    shape: shapeMarkup,
    el(name, className) {
      const span = document.createElement("span");
      span.className = className || "icon-svg";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = icons[name] || icons.star;
      return span;
    },
    shapeEl(type, colorName, className) {
      const span = document.createElement("span");
      span.className = className || "icon-svg";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = shapeMarkup(type, colorName);
      return span;
    },
  };
})();
