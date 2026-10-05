const LANCZOS = [
  676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
  12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];

function logGamma(z: number): number {
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < LANCZOS.length; i++) x += LANCZOS[i]! / (z + i + 1);
  const t = z + LANCZOS.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function gammaSeries(a: number, x: number): number {
  let sum = 1 / a;
  let term = 1 / a;
  for (let n = 1; n < 200; n++) {
    term *= x / (a + n);
    sum += term;
    if (term < Math.abs(sum) * 1e-12) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

function gammaCF(a: number, x: number): number {
  const FPMIN = 1e-30;
  let b = x + 1 - a;
  let c = 1 / FPMIN;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i <= 200; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = b + an / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-10) break;
  }
  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
}

function lowerGammaP(a: number, x: number): number {
  if (x <= 0) return 0;
  if (x < a + 1) return gammaSeries(a, x);
  return 1 - gammaCF(a, x);
}

export function chiSquareP(chi2: number, df: number): number {
  if (df <= 0 || !Number.isFinite(chi2) || chi2 < 0) return Number.NaN;
  if (chi2 === 0) return 1;
  const p = 1 - lowerGammaP(df / 2, chi2 / 2);
  if (p < 0) return 0;
  if (p > 1) return 1;
  return p;
}

export function summarize(values: number[]) {
  const n = values.length;
  if (n === 0) {
    return { n: 0, mean: Number.NaN, median: Number.NaN, sd: Number.NaN, min: Number.NaN, max: Number.NaN };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / n;
  const mid = Math.floor(n / 2);
  const median = n % 2 === 1 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
  const variance = n > 1 ? values.reduce((total, value) => total + (value - mean) ** 2, 0) / (n - 1) : Number.NaN;
  return { n, mean, median, sd: Math.sqrt(variance), min: sorted[0]!, max: sorted[n - 1]! };
}

export function histogram(values: number[]) {
  if (values.length === 0) return [] as { label: string; x0: number; x1: number; count: number }[];
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    return [{ label: String(min), x0: min, x1: max, count: values.length }];
  }
  const bins = Math.min(8, Math.max(5, Math.ceil(Math.log2(values.length) + 1)));
  const width = (max - min) / bins;
  const buckets = Array.from({ length: bins }, (_, index) => ({
    x0: min + index * width,
    x1: min + (index + 1) * width,
    count: 0,
    label: "",
  }));
  for (const value of values) {
    let index = Math.floor((value - min) / width);
    if (index >= bins) index = bins - 1;
    buckets[index]!.count += 1;
  }
  return buckets;
}

export function frequencies(values: string[]) {
  const map = new Map<string, number>();
  let missing = 0;
  for (const raw of values) {
    const value = raw.trim();
    if (!value) {
      missing += 1;
      continue;
    }
    map.set(value, (map.get(value) ?? 0) + 1);
  }
  const rows = [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt"));
  return { rows, missing, n: values.length - missing };
}

export function crosstab(xs: string[], ys: string[]) {
  const rows = [...new Set(xs)].sort((a, b) => a.localeCompare(b, "pt"));
  const cols = [...new Set(ys)].sort((a, b) => a.localeCompare(b, "pt"));
  const rowIndex = new Map(rows.map((row, index) => [row, index]));
  const colIndex = new Map(cols.map((col, index) => [col, index]));
  const counts = rows.map(() => cols.map(() => 0));
  for (let i = 0; i < xs.length; i++) {
    const r = rowIndex.get(xs[i]!)!;
    const c = colIndex.get(ys[i]!)!;
    counts[r]![c]! += 1;
  }
  const n = xs.length;
  const rowTotals = counts.map((row) => row.reduce((sum, value) => sum + value, 0));
  const colTotals = cols.map((_, col) => counts.reduce((sum, row) => sum + row[col]!, 0));
  let chi2 = 0;
  let lowExpected = false;
  if (rows.length > 1 && cols.length > 1 && n > 0) {
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < cols.length; c++) {
        const expected = (rowTotals[r]! * colTotals[c]!) / n;
        if (expected < 5) lowExpected = true;
        if (expected > 0) chi2 += (counts[r]![c]! - expected) ** 2 / expected;
      }
    }
  }
  const df = Math.max(0, (rows.length - 1) * (cols.length - 1));
  const p = df > 0 && n > 0 ? chiSquareP(chi2, df) : Number.NaN;
  return { rows, cols, counts, rowTotals, colTotals, n, chi2, df, p, lowExpected };
}

export function pearson(pairs: { x: number; y: number }[]) {
  const n = pairs.length;
  if (n < 3) return { n, r: Number.NaN };
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (const pair of pairs) {
    sx += pair.x;
    sy += pair.y;
    sxx += pair.x * pair.x;
    syy += pair.y * pair.y;
    sxy += pair.x * pair.y;
  }
  const num = n * sxy - sx * sy;
  const den = Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy));
  if (den === 0) return { n, r: Number.NaN };
  return { n, r: num / den };
}
