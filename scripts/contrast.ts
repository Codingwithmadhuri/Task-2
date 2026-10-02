// WCAG Color Contrast Checker
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(fg: string, bg: string): number {
  const lum1 = getLuminance(fg);
  const lum2 = getLuminance(bg);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

// Dark Mode Colors
const darkTheme = {
  backgrounds: {
    'canvas (slate-950)': '#030712',
    'surface (slate-900)': '#0f172a',
    'surface-elevated (slate-800)': '#1e293b',
    'button (blue-600)': '#2563eb',
    'success-alert (emerald-950)': '#022c22',
    'error-alert (red-950)': '#450a0a',
  },
  text: {
    'primary (slate-50)': '#f8fafc',
    'secondary (slate-300)': '#cbd5e1',
    'muted (slate-400)': '#94a3b8',
    'accent (blue-400)': '#60a5fa',
    'white': '#ffffff',
  },
};

// Light Mode Colors
const lightTheme = {
  backgrounds: {
    'canvas (slate-50)': '#f8fafc',
    'surface (white)': '#ffffff',
    'surface-elevated (slate-100)': '#f1f5f9',
    'button (blue-600)': '#2563eb',
    'success-alert (emerald-50)': '#ecfdf5',
    'error-alert (red-50)': '#fef2f2',
  },
  text: {
    'primary (slate-900)': '#0f172a',
    'secondary (slate-700)': '#334155',
    'muted (slate-600)': '#475569',
    'accent (blue-700)': '#1d4ed8',
    'white': '#ffffff',
  },
};

console.log('=== WCAG 2.1 & 2.2 AA COLOR CONTRAST AUDIT ===');
console.log('Target: Minimum 4.5:1 for normal text, 3.0:1 for large text/icons/UI\n');

console.log('--- DARK THEME ---');
for (const [bgName, bgHex] of Object.entries(darkTheme.backgrounds)) {
  console.log(`Background: ${bgName} (${bgHex})`);
  for (const [fgName, fgHex] of Object.entries(darkTheme.text)) {
    if (bgName.includes('button') && fgName !== 'white') continue;
    const ratio = getContrastRatio(fgHex, bgHex);
    const passAA = ratio >= 4.5;
    const passAALarge = ratio >= 3.0;
    console.log(
      `  [${passAA ? 'PASS' : passAALarge ? 'LARGE ONLY' : 'FAIL'}] ${fgName} (${fgHex}): ${ratio.toFixed(2)}:1`
    );
  }
}

console.log('\n--- LIGHT THEME ---');
for (const [bgName, bgHex] of Object.entries(lightTheme.backgrounds)) {
  console.log(`Background: ${bgName} (${bgHex})`);
  for (const [fgName, fgHex] of Object.entries(lightTheme.text)) {
    if (bgName.includes('button') && fgName !== 'white') continue;
    if (bgName.includes('canvas') && fgName === 'white') continue;
    if (bgName.includes('surface') && fgName === 'white') continue;
    const ratio = getContrastRatio(fgHex, bgHex);
    const passAA = ratio >= 4.5;
    const passAALarge = ratio >= 3.0;
    console.log(
      `  [${passAA ? 'PASS' : passAALarge ? 'LARGE ONLY' : 'FAIL'}] ${fgName} (${fgHex}): ${ratio.toFixed(2)}:1`
    );
  }
}

