export type SourceKind = "entrevista" | "grupo-focal" | "documento" | "nota";

export type MarkId =
  | "mark-1"
  | "mark-2"
  | "mark-3"
  | "mark-4"
  | "mark-5"
  | "mark-6"
  | "mark-7"
  | "mark-8";

export interface Attribute {
  key: string;
  value: string;
}

export interface Source {
  id: string;
  title: string;
  kind: SourceKind;
  participant: string;
  date: string;
  text: string;
  attributes: Attribute[];
}

export interface Code {
  id: string;
  parentId: string | null;
  name: string;
  description: string;
  color: MarkId;
}

export interface Coding {
  id: string;
  sourceId: string;
  codeId: string;
  start: number;
  end: number;
  excerpt: string;
  note: string;
}

export interface Memo {
  id: string;
  title: string;
  body: string;
  codeId: string | null;
  updatedAt: string;
}

export type ColumnType = "number" | "category" | "text";

export interface DataColumn {
  name: string;
  type: ColumnType;
}

export interface Dataset {
  id: string;
  name: string;
  columns: DataColumn[];
  rows: Record<string, string>[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  sources: Source[];
  codes: Code[];
  codings: Coding[];
  memos: Memo[];
  datasets: Dataset[];
}

export type ViewId =
  | "projetos"
  | "painel"
  | "fontes"
  | "leitura"
  | "codigos"
  | "consultas"
  | "frequencia"
  | "quantitativo"
  | "memos";

export interface PassageFocus {
  sourceId: string;
  index: number;
}

export const SOURCE_KINDS: { id: SourceKind; label: string }[] = [
  { id: "entrevista", label: "Entrevista" },
  { id: "grupo-focal", label: "Grupo focal" },
  { id: "documento", label: "Documento" },
  { id: "nota", label: "Nota de campo" },
];

export const MARKS: { id: MarkId; label: string }[] = [
  { id: "mark-1", label: "Tinta" },
  { id: "mark-2", label: "Barro" },
  { id: "mark-3", label: "Ardósia" },
  { id: "mark-4", label: "Oliva" },
  { id: "mark-5", label: "Ameixa" },
  { id: "mark-6", label: "Bronze" },
  { id: "mark-7", label: "Pinho" },
  { id: "mark-8", label: "Grafite" },
];

export function isMarkId(value: string): value is MarkId {
  return MARKS.some((mark) => mark.id === value);
}
