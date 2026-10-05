import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame, tooltipStyle } from "@/components/research/chart-frame";
import { Field } from "@/components/ui/field";
import { attributeKeys, collectDescendants, excerptCount, flattenCodes, formatNumber, searchText } from "@/lib/research/analysis";
import { useActiveProject, useResearch } from "@/lib/research/store";
import type { Code } from "@/lib/research/types";
import { cn } from "@/lib/utils";

type Tab = "busca" | "codigo" | "matriz" | "atributo";

export function QueriesView() {
  const project = useActiveProject();
  const jumpTo = useResearch((state) => state.jumpTo);
  const [tab, setTab] = useState<Tab>("codigo");
  const [query, setQuery] = useState("");
  const [codeId, setCodeId] = useState("");
  const [rollup, setRollup] = useState(true);
  const [attribute, setAttribute] = useState("");
  if (!project) return null;
  const tree = flattenCodes(project.codes);
  const selected = codeId || tree.find((code) => excerptCount(project.codings, project.codes, code.id, false) > 0)?.id || tree[0]?.id || "";
  const keys = attributeKeys(project);
  const currentKey = attribute || keys[0] || "";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="font-display text-3xl">Consultas</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">Recupere trechos, cruze códigos com fontes ou compare casos por um atributo.</p>
      </header>
      <div className="flex gap-1 overflow-x-auto">
        {(
          [
            ["codigo", "Por código"],
            ["busca", "Busca no texto"],
            ["matriz", "Matriz"],
            ["atributo", "Por atributo"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn("h-11 shrink-0 rounded-sm px-3 text-sm font-medium", tab === id ? "bg-accent text-accent-fg" : "bg-elevated text-ink")}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "busca" ? <TextQuery query={query} setQuery={setQuery} onJump={jumpTo} /> : null}
      {tab === "codigo" ? (
        <CodeQuery codeId={selected} onCode={setCodeId} rollup={rollup} setRollup={setRollup} onJump={jumpTo} />
      ) : null}
      {tab === "matriz" ? <Matrix rollup={rollup} setRollup={setRollup} /> : null}
      {tab === "atributo" ? (
        <AttributeQuery codeId={selected} onCode={setCodeId} attribute={currentKey} onAttribute={setAttribute} rollup={rollup} setRollup={setRollup} />
      ) : null}
    </div>
  );
}

function TextQuery({
  query,
  setQuery,
  onJump,
}: {
  query: string;
  setQuery: (value: string) => void;
  onJump: (sourceId: string, index: number) => void;
}) {
  const project = useActiveProject();
  const hits = useMemo(() => (project ? searchText(project, query) : []), [project, query]);
  if (!project) return null;
  return (
    <section className="rounded-xl border border-line bg-elevated p-4">
      <Field value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar palavra ou frase" aria-label="Busca no texto" />
      <ul className="mt-3 flex flex-col gap-2">
        {query.trim().length >= 2 && hits.length === 0 ? <li className="text-sm text-muted">Nenhuma ocorrência.</li> : null}
        {hits.map((hit, index) => (
          <li key={`${hit.sourceId}-${hit.index}-${index}`}>
            <button type="button" onClick={() => onJump(hit.sourceId, hit.index)} className="w-full rounded-sm px-2 py-2 text-left hover:bg-accent-soft">
              <span className="text-sm font-medium">{hit.title}</span>
              <p className="text-sm text-muted">{hit.snippet}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CodeQuery({
  codeId,
  onCode,
  rollup,
  setRollup,
  onJump,
}: {
  codeId: string;
  onCode: (id: string) => void;
  rollup: boolean;
  setRollup: (value: boolean) => void;
  onJump: (sourceId: string, index: number) => void;
}) {
  const project = useActiveProject();
  if (!project) return null;
  const tree = flattenCodes(project.codes);
  const ids = codeId && rollup ? collectDescendants(project.codes, codeId) : new Set(codeId ? [codeId] : []);
  const rows = project.codings.filter((coding) => ids.has(coding.codeId));
  return (
    <section className="rounded-xl border border-line bg-elevated p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <select className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm" value={codeId} onChange={(event) => onCode(event.target.value)} aria-label="Código">
          {tree.map((code) => (
            <option key={code.id} value={code.id}>
              {"· ".repeat(code.depth)}
              {code.name}
            </option>
          ))}
        </select>
        <label className="flex h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={rollup} onChange={(event) => setRollup(event.target.checked)} />
          Incluir subcódigos
        </label>
      </div>
      <p className="mt-3 text-sm text-muted">{rows.length} trechos</p>
      <ul className="mt-2 flex flex-col gap-2">
        {rows.map((coding) => {
          const source = project.sources.find((item) => item.id === coding.sourceId);
          const code = project.codes.find((item) => item.id === coding.codeId);
          return (
            <li key={coding.id}>
              <button type="button" onClick={() => onJump(coding.sourceId, coding.start)} className="w-full rounded-sm border border-line px-3 py-3 text-left hover:bg-surface">
                <span className="text-sm font-medium">{source?.title ?? "Fonte"} · {code?.name}</span>
                <p className="mt-1 font-display text-base leading-relaxed">“{coding.excerpt}”</p>
                {coding.note ? <p className="mt-1 text-sm text-muted">{coding.note}</p> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Matrix({ rollup, setRollup }: { rollup: boolean; setRollup: (value: boolean) => void }) {
  const project = useActiveProject();
  if (!project) return null;
  const codes = flattenCodes(project.codes);
  const max = Math.max(
    1,
    ...codes.flatMap((code) =>
      project.sources.map((source) => countCell(project.codings, project.codes, code.id, source.id, rollup)),
    ),
  );
  return (
    <section className="rounded-xl border border-line bg-elevated p-4">
      <label className="flex h-11 items-center gap-2 text-sm">
        <input type="checkbox" checked={rollup} onChange={(event) => setRollup(event.target.checked)} />
        Agregar subcódigos
      </label>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left font-medium">Código</th>
              {project.sources.map((source) => (
                <th key={source.id} className="p-2 text-left font-medium">
                  {source.participant || source.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id} className="border-t border-line">
                <th className="p-2 text-left font-normal" style={{ paddingLeft: `${8 + code.depth * 12}px` }}>
                  {code.name}
                </th>
                {project.sources.map((source) => {
                  const count = countCell(project.codings, project.codes, code.id, source.id, rollup);
                  return (
                    <td
                      key={source.id}
                      className="p-2 text-center tabular-nums"
                      style={{
                        backgroundColor: count
                          ? `color-mix(in oklab, var(--color-accent) ${Math.round(14 + 70 * (count / max))}%, transparent)`
                          : undefined,
                      }}
                    >
                      {count || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function countCell(codings: { sourceId: string; codeId: string }[], codes: Code[], codeId: string, sourceId: string, rollup: boolean) {
  const ids = rollup ? collectDescendants(codes, codeId) : new Set([codeId]);
  return codings.filter((coding) => coding.sourceId === sourceId && ids.has(coding.codeId)).length;
}

function AttributeQuery({
  codeId,
  onCode,
  attribute,
  onAttribute,
  rollup,
  setRollup,
}: {
  codeId: string;
  onCode: (id: string) => void;
  attribute: string;
  onAttribute: (value: string) => void;
  rollup: boolean;
  setRollup: (value: boolean) => void;
}) {
  const project = useActiveProject();
  if (!project) return null;
  const tree = flattenCodes(project.codes);
  const keys = attributeKeys(project);
  const ids = codeId && rollup ? collectDescendants(project.codes, codeId) : new Set(codeId ? [codeId] : []);
  const groups = new Map<string, { sources: number; excerpts: number }>();
  for (const source of project.sources) {
    const value = source.attributes.find((item) => item.key.trim() === attribute)?.value.trim() || "Sem valor";
    const current = groups.get(value) ?? { sources: 0, excerpts: 0 };
    current.sources += 1;
    current.excerpts += project.codings.filter((coding) => coding.sourceId === source.id && ids.has(coding.codeId)).length;
    groups.set(value, current);
  }
  const data = [...groups.entries()]
    .map(([label, value]) => ({
      label,
      media: value.sources ? value.excerpts / value.sources : 0,
      excerpts: value.excerpts,
      sources: value.sources,
    }))
    .sort((a, b) => b.media - a.media);
  return (
    <section className="rounded-xl border border-line bg-elevated p-4">
      {keys.length === 0 ? <p className="text-sm text-muted">Nenhum atributo nas fontes. Abra uma fonte e informe, por exemplo, Gênero ou Curso.</p> : null}
      <div className="grid gap-3 md:grid-cols-2">
        <select className="h-11 rounded-sm border border-line bg-elevated px-3 text-sm" value={attribute} onChange={(event) => onAttribute(event.target.value)} aria-label="Atributo">
          {keys.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        <select className="h-11 rounded-sm border border-line bg-elevated px-3 text-sm" value={codeId} onChange={(event) => onCode(event.target.value)} aria-label="Código">
          {tree.map((code) => (
            <option key={code.id} value={code.id}>
              {code.name}
            </option>
          ))}
        </select>
      </div>
      <label className="mt-3 flex h-11 items-center gap-2 text-sm">
        <input type="checkbox" checked={rollup} onChange={(event) => setRollup(event.target.checked)} />
        Incluir subcódigos
      </label>
      <p className="mt-2 text-sm text-muted">Média de trechos por fonte, dentro de cada valor do atributo.</p>
      {data.length > 0 ? (
        <ChartFrame className="mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-line)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label" width={110} tick={{ fill: "var(--color-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [typeof value === "number" ? formatNumber(value, name === "media" ? 2 : 0) : value, name === "media" ? "Média" : String(name)]}
              />
              <Bar dataKey="media" name="media" fill="var(--color-accent)" radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>
      ) : null}
    </section>
  );
}
