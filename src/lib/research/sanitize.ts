import { uid } from "@/lib/research/analysis";
import { isMarkId, SOURCE_KINDS, type Code, type Coding, type Dataset, type Memo, type Project, type Source } from "@/lib/research/types";

export function sanitizeProject(input: unknown): Project | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Partial<Project>;
  if (typeof raw.name !== "string" || !raw.name.trim()) return null;
  if (!Array.isArray(raw.sources) || !Array.isArray(raw.codes)) return null;
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : uid("proj"),
    name: raw.name.trim(),
    description: typeof raw.description === "string" ? raw.description : "",
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
    sources: raw.sources.flatMap(asSource),
    codes: raw.codes.flatMap(asCode),
    codings: Array.isArray(raw.codings) ? raw.codings.flatMap(asCoding) : [],
    memos: Array.isArray(raw.memos) ? raw.memos.flatMap(asMemo) : [],
    datasets: Array.isArray(raw.datasets) ? raw.datasets.flatMap(asDataset) : [],
  };
}

function asSource(item: unknown): Source[] {
  if (!item || typeof item !== "object") return [];
  const source = item as Source;
  if (typeof source.title !== "string" || typeof source.text !== "string") return [];
  const kind = SOURCE_KINDS.some((entry) => entry.id === source.kind) ? source.kind : "documento";
  const attributes = Array.isArray(source.attributes)
    ? source.attributes.flatMap((attribute) => {
        if (!attribute || typeof attribute.key !== "string" || typeof attribute.value !== "string") return [];
        return [{ key: attribute.key, value: attribute.value }];
      })
    : [];
  return [
    {
      id: typeof source.id === "string" && source.id ? source.id : uid("src"),
      title: source.title,
      kind,
      participant: typeof source.participant === "string" ? source.participant : "",
      date: typeof source.date === "string" ? source.date : "",
      text: source.text,
      attributes,
    },
  ];
}

function asCode(item: unknown): Code[] {
  if (!item || typeof item !== "object") return [];
  const code = item as Code;
  if (typeof code.name !== "string" || !code.name.trim()) return [];
  return [
    {
      id: typeof code.id === "string" && code.id ? code.id : uid("code"),
      parentId: typeof code.parentId === "string" ? code.parentId : null,
      name: code.name.trim(),
      description: typeof code.description === "string" ? code.description : "",
      color: typeof code.color === "string" && isMarkId(code.color) ? code.color : "mark-1",
    },
  ];
}

function asCoding(item: unknown): Coding[] {
  if (!item || typeof item !== "object") return [];
  const coding = item as Coding;
  if (typeof coding.sourceId !== "string" || typeof coding.codeId !== "string" || typeof coding.excerpt !== "string") return [];
  if (typeof coding.start !== "number" || typeof coding.end !== "number") return [];
  return [
    {
      id: typeof coding.id === "string" && coding.id ? coding.id : uid("cd"),
      sourceId: coding.sourceId,
      codeId: coding.codeId,
      start: coding.start,
      end: coding.end,
      excerpt: coding.excerpt,
      note: typeof coding.note === "string" ? coding.note : "",
    },
  ];
}

function asMemo(item: unknown): Memo[] {
  if (!item || typeof item !== "object") return [];
  const memo = item as Memo;
  if (typeof memo.title !== "string") return [];
  return [
    {
      id: typeof memo.id === "string" && memo.id ? memo.id : uid("memo"),
      title: memo.title,
      body: typeof memo.body === "string" ? memo.body : "",
      codeId: typeof memo.codeId === "string" ? memo.codeId : null,
      updatedAt: typeof memo.updatedAt === "string" ? memo.updatedAt.slice(0, 10) : "",
    },
  ];
}

function asDataset(item: unknown): Dataset[] {
  if (!item || typeof item !== "object") return [];
  const dataset = item as Dataset;
  if (typeof dataset.name !== "string" || !Array.isArray(dataset.columns) || !Array.isArray(dataset.rows)) return [];
  const columns = dataset.columns.flatMap((column) => {
    if (!column || typeof column.name !== "string") return [];
    const type = column.type === "number" || column.type === "category" || column.type === "text" ? column.type : "text";
    return [{ name: column.name, type }];
  });
  const rows = dataset.rows.slice(0, 2000).flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const record: Record<string, string> = {};
    for (const column of columns) record[column.name] = String((row as Record<string, unknown>)[column.name] ?? "");
    return [record];
  });
  return [
    {
      id: typeof dataset.id === "string" && dataset.id ? dataset.id : uid("data"),
      name: dataset.name,
      columns,
      rows,
    },
  ];
}
