import type { ColumnType, DataColumn, Dataset } from "@/lib/research/types";

export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  let value = trimmed.replace(/\s/g, "");
  if (value.includes(",") && value.includes(".")) {
    value = value.replace(/\./g, "").replace(",", ".");
  } else if (value.includes(",")) {
    value = value.replace(",", ".");
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function parseCsv(input: string): string[][] {
  const text = input.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!text) return [];
  const header = text.split("\n")[0] ?? "";
  const delimiter = chooseDelimiter(header);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i]!;
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === delimiter) {
      row.push(cell.trim());
      cell = "";
    } else if (char === "\n") {
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else cell += char;
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows.filter((line) => line.some((item) => item.length > 0));
}

function chooseDelimiter(line: string) {
  const semi = (line.match(/;/g) ?? []).length;
  const comma = (line.match(/,/g) ?? []).length;
  const tab = (line.match(/\t/g) ?? []).length;
  if (tab >= semi && tab >= comma && tab > 0) return "\t";
  if (semi > comma) return ";";
  return ",";
}

export function inferType(values: string[]): ColumnType {
  const present = values.map((value) => value.trim()).filter(Boolean);
  if (present.length === 0) return "text";
  if (present.every((value) => parseNumber(value) != null)) return "number";
  const unique = new Set(present).size;
  if (unique <= 12 || (unique / present.length <= 0.5 && unique <= 20)) return "category";
  return "text";
}

export function datasetFromCsv(name: string, csv: string, id: string): { dataset: Dataset; truncated: boolean } | { error: string } {
  const table = parseCsv(csv);
  if (table.length < 2) return { error: "A planilha precisa de um cabeçalho e ao menos uma linha." };
  const headers = uniqueHeaders(table[0] ?? []);
  const body = table.slice(1);
  const width = headers.length;
  const limited = body.slice(0, 2000);
  const columns: DataColumn[] = headers.map((header, index) => ({
    name: header,
    type: inferType(limited.map((row) => row[index] ?? "")),
  }));
  const rows = limited.map((line) => {
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = (line[index] ?? "").slice(0, 500);
    });
    return record;
  });
  return {
    dataset: { id, name, columns, rows },
    truncated: body.length > limited.length || body.some((line) => line.length > width + 8),
  };
}

function uniqueHeaders(headers: string[]) {
  const seen = new Map<string, number>();
  return headers.map((header) => {
    const base = header.trim() || "coluna";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}_${count + 1}`;
  });
}

export function toCsv(headers: string[], rows: string[][]) {
  const lines = [headers, ...rows].map((row) => row.map(csvEscape).join(";"));
  return `\uFEFF${lines.join("\n")}`;
}

function csvEscape(value: string) {
  if (/[;"\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
