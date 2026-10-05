import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame, tooltipStyle } from "@/components/research/chart-frame";
import { Button } from "@/components/ui/button";
import { corpusCoverage, coveredLength, formatPercent } from "@/lib/research/analysis";
import { wordCount } from "@/lib/research/text";
import { useActiveProject, useResearch } from "@/lib/research/store";

export function OverviewView() {
  const project = useActiveProject();
  const setView = useResearch((state) => state.setView);
  if (!project) return null;
  const coverage = corpusCoverage(project);
  const words = project.sources.reduce((sum, source) => sum + wordCount(source.text), 0);
  const leaves = project.codes.filter((code) => !project.codes.some((other) => other.parentId === code.id));
  const bars = leaves
    .map((code) => ({
      label: code.name,
      count: project.codings.filter((coding) => coding.codeId === code.id).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const sourceRows = project.sources.map((source) => {
    const codings = project.codings.filter((coding) => coding.sourceId === source.id);
    const union = coveredLength(codings, source.text.length);
    return {
      id: source.id,
      title: source.title,
      pct: source.text.length ? union / source.text.length : 0,
      excerpts: codings.length,
    };
  });

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm text-muted">Projeto</p>
          <h1 className="font-display text-3xl leading-tight text-ink">{project.name}</h1>
          {project.description ? <p className="mt-2 text-base text-muted">{project.description}</p> : null}
        </div>
        <Button variant="primary" onClick={() => setView("leitura")}>
          Abrir leitura
        </Button>
      </header>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Fontes" value={String(project.sources.length)} hint={`${words.toLocaleString("pt-BR")} palavras`} />
        <Stat label="Códigos" value={String(project.codes.length)} hint={`${project.codings.length} trechos`} />
        <Stat label="Corpus codificado" value={formatPercent(coverage.pct)} hint="união dos trechos, sem contar duas vezes" />
        <Stat
          label="Questionário"
          value={String(project.datasets.reduce((sum, dataset) => sum + dataset.rows.length, 0))}
          hint={project.datasets.length === 1 ? "1 base" : `${project.datasets.length} bases`}
        />
      </dl>
      <div className="grid gap-4 lg:grid-cols-5">
        <section className="rounded-xl border border-line bg-elevated p-4 lg:col-span-3">
          <h2 className="font-display text-xl">Códigos com mais trechos</h2>
          <p className="mt-1 text-sm text-muted">Contagem direta, sem somar os códigos-pai.</p>
          {bars.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Ainda não há trechos codificados. Abra a leitura e selecione um pedaço do texto.</p>
          ) : (
            <ChartFrame className="mt-3 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bars} layout="vertical" margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-line)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="label" width={128} tick={{ fill: "var(--color-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent-soft)" }} />
                  <Bar dataKey="count" name="Trechos" fill="var(--color-accent)" radius={[0, 4, 4, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          )}
        </section>
        <section className="rounded-xl border border-line bg-elevated p-4 lg:col-span-2">
          <h2 className="font-display text-xl">Cobertura por fonte</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {sourceRows.length === 0 ? <li className="text-sm text-muted">Nenhuma fonte neste projeto.</li> : null}
            {sourceRows.map((row) => (
              <li key={row.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">{row.title}</span>
                  <span className="shrink-0 tabular-nums text-muted">
                    {formatPercent(row.pct)} · {row.excerpts}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-accent-soft">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.round(row.pct * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="rounded-xl border border-line bg-elevated p-4">
        <h2 className="font-display text-xl">Como analisar</h2>
        <ol className="mt-3 grid gap-3 md:grid-cols-3">
          <li className="rounded-sm bg-surface p-3 text-sm">
            <span className="font-medium">1. Leia e marque.</span> Selecione um trecho e aplique um código. Trechos podem receber mais de um código.
          </li>
          <li className="rounded-sm bg-surface p-3 text-sm">
            <span className="font-medium">2. Consulte.</span> Recupere tudo o que foi marcado, cruze códigos e fontes, ou agrupe por um atributo do caso.
          </li>
          <li className="rounded-sm bg-surface p-3 text-sm">
            <span className="font-medium">3. Meça.</span> Importe um CSV ou use o questionário de exemplo: média, frequência, qui-quadrado e correlação.
          </li>
        </ol>
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-elevated p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-3xl tabular-nums leading-none">{value}</dd>
      <p className="mt-2 text-sm text-faint">{hint}</p>
    </div>
  );
}
