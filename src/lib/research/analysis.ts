import type { Code, Coding, Dataset, Project } from "@/lib/research/types";
import { parseNumber } from "@/lib/research/csv";

export function uid(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatP(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value < 0.001) return "< 0,001";
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

export function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${Math.round(value * 100)}%`;
}

export function fileSlug(name: string) {
  return (
    name
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "projeto"
  );
}

export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function collectDescendants(codes: Code[], id: string) {
  const drop = new Set<string>([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const code of codes) {
      if (code.parentId && drop.has(code.parentId) && !drop.has(code.id)) {
        drop.add(code.id);
        grew = true;
      }
    }
  }
  return drop;
}

export function wouldCycle(codes: Code[], id: string, parentId: string | null) {
  if (!parentId) return false;
  return collectDescendants(codes, id).has(parentId);
}

export function flattenCodes(codes: Code[]) {
  const ids = new Set(codes.map((code) => code.id));
  const children = new Map<string | null, Code[]>();
  for (const code of codes) {
    const parent = code.parentId && ids.has(code.parentId) ? code.parentId : null;
    const list = children.get(parent) ?? [];
    list.push(code);
    children.set(parent, list);
  }
  for (const list of children.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "pt"));
  }
  const out: Array<Code & { depth: number }> = [];
  const walk = (parent: string | null, depth: number) => {
    for (const code of children.get(parent) ?? []) {
      out.push({ ...code, depth });
      walk(code.id, depth + 1);
    }
  };
  walk(null, 0);
  return out;
}

export function excerptCount(codings: Coding[], codes: Code[], codeId: string, rollup: boolean) {
  const ids = rollup ? collectDescendants(codes, codeId) : new Set([codeId]);
  return codings.filter((coding) => ids.has(coding.codeId)).length;
}

export function coveredLength(codings: Pick<Coding, "start" | "end">[], textLength: number) {
  const spans = codings
    .filter((coding) => coding.end > coding.start)
    .map((coding) => ({
      start: Math.max(0, coding.start),
      end: Math.min(textLength, coding.end),
    }))
    .sort((a, b) => a.start - b.start || a.end - b.end);
  let total = 0;
  let cursor = -1;
  for (const span of spans) {
    if (span.end <= span.start) continue;
    if (span.start >= cursor) {
      total += span.end - span.start;
      cursor = span.end;
    } else if (span.end > cursor) {
      total += span.end - cursor;
      cursor = span.end;
    }
  }
  return total;
}

export function corpusCoverage(project: Project) {
  let total = 0;
  let covered = 0;
  for (const source of project.sources) {
    total += source.text.length;
    const codings = project.codings.filter((coding) => coding.sourceId === source.id);
    covered += coveredLength(codings, source.text.length);
  }
  return { total, covered, pct: total ? covered / total : 0 };
}

export interface Segment {
  start: number;
  end: number;
  text: string;
  codingIds: string[];
  codeIds: string[];
}

export function buildSegments(text: string, codings: Coding[]): Segment[] {
  const valid = codings.filter(
    (coding) =>
      coding.start >= 0 &&
      coding.end <= text.length &&
      coding.start < coding.end &&
      text.slice(coding.start, coding.end) === coding.excerpt,
  );
  const points = new Set<number>([0, text.length]);
  for (const coding of valid) {
    points.add(coding.start);
    points.add(coding.end);
  }
  const cuts = [...points].sort((a, b) => a - b);
  const segments: Segment[] = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const start = cuts[i]!;
    const end = cuts[i + 1]!;
    if (end <= start) continue;
    const active = valid.filter((coding) => coding.start <= start && coding.end >= end);
    segments.push({
      start,
      end,
      text: text.slice(start, end),
      codingIds: active.map((coding) => coding.id),
      codeIds: [...new Set(active.map((coding) => coding.codeId))],
    });
  }
  if (segments.length === 0 && text.length === 0) return [];
  return segments;
}

export function relocateCoding(text: string, coding: Coding): Coding | null {
  if (!coding.excerpt) return null;
  if (text.slice(coding.start, coding.end) === coding.excerpt) return coding;
  const start = text.indexOf(coding.excerpt);
  if (start < 0) return null;
  return { ...coding, start, end: start + coding.excerpt.length };
}

export function columnValues(dataset: Dataset, name: string) {
  return dataset.rows.map((row) => row[name] ?? "");
}

export function numericColumn(dataset: Dataset, name: string) {
  const values = columnValues(dataset, name);
  const nums: number[] = [];
  let missing = 0;
  for (const raw of values) {
    const number = parseNumber(raw);
    if (number == null) missing += 1;
    else nums.push(number);
  }
  return { nums, missing, total: values.length };
}

export function pairedNumbers(dataset: Dataset, a: string, b: string) {
  const pairs: { x: number; y: number }[] = [];
  for (const row of dataset.rows) {
    const x = parseNumber(row[a] ?? "");
    const y = parseNumber(row[b] ?? "");
    if (x == null || y == null) continue;
    pairs.push({ x, y });
  }
  return pairs;
}

export function pairedCategories(dataset: Dataset, a: string, b: string) {
  const xs: string[] = [];
  const ys: string[] = [];
  for (const row of dataset.rows) {
    const x = (row[a] ?? "").trim();
    const y = (row[b] ?? "").trim();
    if (!x || !y) continue;
    xs.push(x);
    ys.push(y);
  }
  return { xs, ys };
}

export function interpretR(r: number) {
  if (!Number.isFinite(r)) return "Não foi possível calcular a correlação — a variação de uma das variáveis é nula ou há menos de três pares.";
  const abs = Math.abs(r);
  const strength =
    abs < 0.1 ? "desprezível" : abs < 0.3 ? "fraca" : abs < 0.5 ? "moderada" : abs < 0.7 ? "forte" : "muito forte";
  const direction = r >= 0 ? "positiva" : "negativa";
  return `Associação ${strength} e ${direction}.`;
}

export function kindLabel(kind: string) {
  if (kind === "entrevista") return "Entrevista";
  if (kind === "grupo-focal") return "Grupo focal";
  if (kind === "documento") return "Documento";
  if (kind === "nota") return "Nota de campo";
  return kind;
}

export function searchText(project: Project, query: string) {
  const needle = query.trim().toLocaleLowerCase("pt-BR");
  if (needle.length < 2) return [];
  const hits: {
    sourceId: string;
    title: string;
    index: number;
    snippet: string;
    matchStart: number;
    matchLength: number;
  }[] = [];
  for (const source of project.sources) {
    const hay = source.text.toLocaleLowerCase("pt-BR");
    let from = 0;
    while (hits.length < 60) {
      const index = hay.indexOf(needle, from);
      if (index < 0) break;
      const start = Math.max(0, index - 42);
      const end = Math.min(source.text.length, index + needle.length + 42);
      hits.push({
        sourceId: source.id,
        title: source.title,
        index,
        snippet: source.text.slice(start, end).replace(/\s+/g, " "),
        matchStart: index - start,
        matchLength: needle.length,
      });
      from = index + needle.length;
    }
  }
  return hits;
}

export function attributeKeys(project: Project) {
  const keys = new Set<string>();
  for (const source of project.sources) {
    for (const attribute of source.attributes) {
      if (attribute.key.trim()) keys.add(attribute.key.trim());
    }
  }
  return [...keys].sort((a, b) => a.localeCompare(b, "pt"));
}
