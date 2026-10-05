import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame, tooltipStyle } from "@/components/research/chart-frame";
import { collectDescendants, flattenCodes } from "@/lib/research/analysis";
import { wordFrequencies } from "@/lib/research/text";
import { useActiveProject } from "@/lib/research/store";

export function FrequencyView() {
  const project = useActiveProject();
  const [scope, setScope] = useState("corpus");
  const [codeId, setCodeId] = useState("");
  const tree = project ? flattenCodes(project.codes) : [];
  const activeCode = codeId || tree[0]?.id || "";
  const text = useMemo(() => {
    if (!project) return "";
    if (scope === "corpus") return project.sources.map((source) => source.text).join("\n");
    if (scope.startsWith("src:")) {
      return project.sources.find((source) => source.id === scope.slice(4))?.text ?? "";
    }
    const ids = activeCode ? collectDescendants(project.codes, activeCode) : new Set<string>();
    return project.codings
      .filter((coding) => ids.has(coding.codeId))
      .map((coding) => coding.excerpt)
      .join("\n");
  }, [project, scope, activeCode]);
  if (!project) return null;
  const rows = wordFrequencies(text, 40);
  const max = rows[0]?.count ?? 1;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="font-display text-3xl">Frequência de palavras</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Palavras com pelo menos três letras, sem artigos e pronomes. Útil para ver o que insiste no corpus ou dentro de um código.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <select className="h-11 rounded-sm border border-line bg-elevated px-3 text-sm" value={scope} onChange={(event) => setScope(event.target.value)} aria-label="Recorte">
          <option value="corpus">Todo o corpus</option>
          <option value="codigo">Trechos de um código</option>
          {project.sources.map((source) => (
            <option key={source.id} value={`src:${source.id}`}>
              {source.title}
            </option>
          ))}
        </select>
        {scope === "codigo" ? (
          <select className="h-11 rounded-sm border border-line bg-elevated px-3 text-sm" value={activeCode} onChange={(event) => setCodeId(event.target.value)} aria-label="Código">
            {tree.map((code) => (
              <option key={code.id} value={code.id}>
                {"· ".repeat(code.depth)}
                {code.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="flex items-center text-sm text-muted">{rows.length === 0 ? "Sem palavras nesse recorte." : `${rows.length} palavras listadas`}</p>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-line bg-elevated p-4">
          <h2 className="font-display text-xl">Nuvem</h2>
          <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-2" aria-hidden="true">
            {rows.slice(0, 36).map((row) => (
              <span
                key={row.word}
                className="font-display leading-none text-ink"
                style={{ fontSize: `${0.9 + (row.count / max) * 1.6}rem` }}
              >
                {row.word}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-line bg-elevated p-4">
          <h2 className="font-display text-xl">Contagem</h2>
          {rows.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nada para contar.</p>
          ) : (
            <ChartFrame className="mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows.slice(0, 12)} layout="vertical" margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-line)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="word" width={96} tick={{ fill: "var(--color-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" name="Ocorrências" fill="var(--color-accent)" radius={[0, 4, 4, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          )}
          <div className="mt-3 max-h-64 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="py-1 font-medium">Palavra</th>
                  <th className="py-1 text-right font-medium">Vezes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.word} className="border-t border-line">
                    <td className="py-1">{row.word}</td>
                    <td className="py-1 text-right tabular-nums">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
