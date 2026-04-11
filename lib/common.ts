export function generatePremiumHexColor() {
  // 실무적으로 선호도가 높은 hue 대역
  // blue, teal, violet, rose, amber, emerald 위주
  const hueRanges = [
    [200, 220], // blue
    [165, 185], // teal
    [250, 280], // violet
    [330, 350], // rose
    [35, 50], // amber
    [140, 160], // emerald
  ];

  const randomRange = (min, max) => Math.random() * (max - min) + min;
  const randomInt = (min, max) => Math.floor(randomRange(min, max + 1));

  const [hMin, hMax] = hueRanges[randomInt(0, hueRanges.length - 1)];

  const h = randomRange(hMin, hMax);
  const s = randomRange(55, 78); // 너무 탁하거나 과한 채도 방지
  const l = randomRange(45, 62); // UI에서 쓰기 좋은 밝기 범위

  return hslToHex(h, s, l);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
