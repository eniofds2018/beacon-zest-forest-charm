import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChartFrame, tooltipStyle } from "@/components/research/chart-frame";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { Area, Field, Label } from "@/components/ui/field";
import { formatNumber, formatP, interpretR, numericColumn, pairedCategories, pairedNumbers, uid } from "@/lib/research/analysis";
import { datasetFromCsv } from "@/lib/research/csv";
import { crosstab, frequencies, histogram, pearson, summarize } from "@/lib/research/stats";
import { useActiveProject, useResearch } from "@/lib/research/store";
import type { ColumnType, Dataset } from "@/lib/research/types";
import { cn } from "@/lib/utils";

type Mode = "uma" | "cruzamento" | "correlacao";

export function QuantView() {
  const project = useActiveProject();
  const addDataset = useResearch((state) => state.addDataset);
  const addSampleDataset = useResearch((state) => state.addSampleDataset);
  const setColumnType = useResearch((state) => state.setColumnType);
  const deleteDataset = useResearch((state) => state.deleteDataset);
  const [datasetId, setDatasetId] = useState("");
  const [mode, setMode] = useState<Mode>("uma");
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState("");
  const [csvName, setCsvName] = useState("Questionário importado");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  if (!project) return null;
  const dataset = project.datasets.find((item) => item.id === datasetId) ?? project.datasets[0] ?? null;

  function importCsv() {
    const result = datasetFromCsv(csvName.trim() || "Questionário importado", csv, uid("data"));
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setError(result.truncated ? "A base foi limitada às primeiras 2.000 linhas." : "");
    setCsv("");
    addDataset(result.dataset);
    setDatasetId(result.dataset.id);
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="font-display text-3xl">Quantitativo</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Descrição, frequência, cruzamento com qui-quadrado e correlação de Pearson. As contas rodam neste navegador.
        </p>
      </header>
      {dataset ? (
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm md:max-w-sm md:flex-none"
            value={dataset.id}
            onChange={(event) => setDatasetId(event.target.value)}
            aria-label="Base de dados"
          >
            {project.datasets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.rows.length})
              </option>
            ))}
          </select>
          <Button variant="danger" onClick={() => setConfirm(true)}>
            Excluir base
          </Button>
        </div>
      ) : null}
      <section className="rounded-xl border border-line bg-elevated p-4">
        <h2 className="font-display text-xl">Trazer uma planilha</h2>
        <p className="mt-1 text-sm text-muted">Cole CSV separado por vírgula, ponto e vírgula ou tabulação. A primeira linha é o cabeçalho.</p>
        <div className="mt-3">
          <Label>Nome da base</Label>
          <Field value={csvName} onChange={(event) => setCsvName(event.target.value)} />
        </div>
        <div className="mt-3">
          <Area className="min-h-28 font-mono" value={csv} onChange={(event) => setCsv(event.target.value)} placeholder={"idade;genero;estresse\n22;Feminino;6,5"} />
        </div>
        {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="primary" onClick={importCsv}>
            Importar CSV
          </Button>
          <Button onClick={() => addSampleDataset()}>Carregar questionário de exemplo</Button>
        </div>
      </section>
      {dataset ? (
        <Analysis
          dataset={dataset}
          mode={mode}
          setMode={setMode}
          varA={varA}
          varB={varB}
          setVarA={setVarA}
          setVarB={setVarB}
          onType={(column, type) => setColumnType(dataset.id, column, type)}
        />
      ) : (
        <p className="text-sm text-muted">Importe um CSV ou carregue o questionário de exemplo para ver médias, tabelas e gráficos.</p>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Excluir esta base?"
        body="As respostas saem do projeto. As fontes e os códigos não são alterados."
        confirmLabel="Excluir base"
        onConfirm={() => dataset && deleteDataset(dataset.id)}
      />
    </div>
  );
}

function Analysis({
  dataset,
  mode,
  setMode,
  varA,
  varB,
  setVarA,
  setVarB,
  onType,
}: {
  dataset: Dataset;
  mode: Mode;
  setMode: (mode: Mode) => void;
  varA: string;
  varB: string;
  setVarA: (value: string) => void;
  setVarB: (value: string) => void;
  onType: (column: string, type: ColumnType) => void;
}) {
  const numbers = dataset.columns.filter((column) => column.type === "number");
  const categories = dataset.columns.filter((column) => column.type === "category");
  const chosenA = dataset.columns.some((column) => column.name === varA) ? varA : (dataset.columns[0]?.name ?? "");
  const numericA = numbers.some((column) => column.name === varA) ? varA : (numbers[0]?.name ?? "");
  const numericB = numbers.some((column) => column.name === varB && column.name !== numericA) ? varB : (numbers.find((column) => column.name !== numericA)?.name ?? "");
  const catA = categories.some((column) => column.name === varA) ? varA : (categories[0]?.name ?? "");
  const catB = categories.some((column) => column.name === varB && column.name !== catA) ? varB : (categories.find((column) => column.name !== catA)?.name ?? "");

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="rounded-xl border border-line bg-elevated p-4">
        <h2 className="font-display text-xl">Variáveis</h2>
        <p className="mt-1 text-sm text-muted">{dataset.rows.length} linhas. Ajuste o tipo se a detecção errar.</p>
        <ul className="mt-3 flex flex-col gap-2">
          {dataset.columns.map((column) => (
            <li key={column.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <span className="truncate text-sm">{column.name}</span>
              <select
                className="h-9 rounded-sm border border-line bg-surface px-2 text-sm"
                value={column.type}
                aria-label={`Tipo de ${column.name}`}
                onChange={(event) => onType(column.name, event.target.value as ColumnType)}
              >
                <option value="number">Número</option>
                <option value="category">Categoria</option>
                <option value="text">Texto</option>
              </select>
            </li>
          ))}
        </ul>
      </aside>
      <section className="rounded-xl border border-line bg-elevated p-4">
        <div className="flex gap-1 overflow-x-auto">
          {(
            [
              ["uma", "Uma variável"],
              ["cruzamento", "Cruzamento"],
              ["correlacao", "Correlação"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={cn("h-11 shrink-0 rounded-sm px-3 text-sm font-medium", mode === id ? "bg-accent text-accent-fg" : "bg-surface text-ink")}
            >
              {label}
            </button>
          ))}
        </div>
        {mode === "uma" ? <OneVariable dataset={dataset} name={chosenA} onChange={setVarA} /> : null}
        {mode === "cruzamento" ? (
          <Cross dataset={dataset} a={catA} b={catB} categories={categories.map((column) => column.name)} onA={setVarA} onB={setVarB} />
        ) : null}
        {mode === "correlacao" ? (
          <Correlation dataset={dataset} a={numericA} b={numericB} numbers={numbers.map((column) => column.name)} onA={setVarA} onB={setVarB} />
        ) : null}
      </section>
    </div>
  );
}

function VariableSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <select className="h-11 w-full rounded-sm border border-line bg-elevated px-3" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function OneVariable({ dataset, name, onChange }: { dataset: Dataset; name: string; onChange: (value: string) => void }) {
  const column = dataset.columns.find((item) => item.name === name);
  return (
    <div className="mt-4">
      <VariableSelect label="Variável" value={name} options={dataset.columns.map((item) => item.name)} onChange={onChange} />
      {column?.type === "number" ? <NumericSummary dataset={dataset} name={name} /> : null}
      {column?.type === "category" ? <CategorySummary dataset={dataset} name={name} /> : null}
      {column?.type === "text" ? <TextSummary dataset={dataset} name={name} /> : null}
    </div>
  );
}

function NumericSummary({ dataset, name }: { dataset: Dataset; name: string }) {
  const { nums, missing } = numericColumn(dataset, name);
  const stats = summarize(nums);
  const bins = histogram(nums).map((bin) => ({
    ...bin,
    label: `${formatNumber(bin.x0, 1)}–${formatNumber(bin.x1, 1)}`,
  }));
  return (
    <div className="mt-4">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Mini label="n" value={String(stats.n)} />
        <Mini label="Omissos" value={String(missing)} />
        <Mini label="Média" value={formatNumber(stats.mean)} />
        <Mini label="Mediana" value={formatNumber(stats.median)} />
        <Mini label="Desvio-padrão" value={formatNumber(stats.sd)} />
        <Mini label="Mínimo – máximo" value={`${formatNumber(stats.min, 1)} – ${formatNumber(stats.max, 1)}`} />
      </dl>
      <p className="mt-3 text-sm text-muted">
        Média {formatNumber(stats.mean)} (DP {formatNumber(stats.sd)}), mediana {formatNumber(stats.median)}. O desvio-padrão é amostral.
      </p>
      <ChartFrame className="mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" interval={1} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" name="Casos" fill="var(--color-accent)" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}

function CategorySummary({ dataset, name }: { dataset: Dataset; name: string }) {
  const values = dataset.rows.map((row) => row[name] ?? "");
  const freq = frequencies(values);
  const top = freq.rows[0];
  return (
    <div className="mt-4">
      <p className="text-sm text-muted">
        {freq.n} respostas válidas, {freq.missing} omissas.
        {top ? ` Mais frequente: ${top.label} (${formatNumber((top.count / Math.max(freq.n, 1)) * 100, 0)}%).` : ""}
      </p>
      <ChartFrame className="mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={freq.rows.slice(0, 12)} layout="vertical" margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="label" width={110} tick={{ fill: "var(--color-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" name="Casos" fill="var(--color-accent)" radius={[0, 4, 4, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}

function TextSummary({ dataset, name }: { dataset: Dataset; name: string }) {
  const values = dataset.rows.map((row) => (row[name] ?? "").trim()).filter(Boolean);
  const unique = new Set(values).size;
  return (
    <p className="mt-4 text-sm text-muted">
      {values.length} textos preenchidos, {unique} valores distintos. Para contar palavras de respostas abertas, copie o texto para uma fonte e use Frequência.
    </p>
  );
}

function Cross({
  dataset,
  a,
  b,
  categories,
  onA,
  onB,
}: {
  dataset: Dataset;
  a: string;
  b: string;
  categories: string[];
  onA: (value: string) => void;
  onB: (value: string) => void;
}) {
  if (categories.length < 2) return <p className="mt-4 text-sm text-muted">Marque ao menos duas variáveis como categoria.</p>;
  const paired = pairedCategories(dataset, a, b);
  const table = crosstab(paired.xs, paired.ys);
  return (
    <div className="mt-4">
      <div className="grid gap-3 md:grid-cols-2">
        <VariableSelect label="Linhas" value={a} options={categories} onChange={onA} />
        <VariableSelect label="Colunas" value={b} options={categories} onChange={onB} />
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left font-medium">{a}</th>
              {table.cols.map((col) => (
                <th key={col} className="p-2 text-right font-medium">{col}</th>
              ))}
              <th className="p-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={row} className="border-t border-line">
                <th className="p-2 text-left font-normal">{row}</th>
                {table.counts[rowIndex]!.map((count, colIndex) => (
                  <td key={table.cols[colIndex]} className="p-2 text-right tabular-nums">
                    {count}
                    <span className="block text-faint">{table.rowTotals[rowIndex] ? `${Math.round((count / table.rowTotals[rowIndex]!) * 100)}%` : ""}</span>
                  </td>
                ))}
                <td className="p-2 text-right tabular-nums">{table.rowTotals[rowIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        Qui-quadrado de Pearson = {formatNumber(table.chi2, 2)}, gl = {table.df}, p {formatP(table.p)}. n = {table.n}.
        {table.lowExpected ? " Há células com frequência esperada menor que 5; leia o valor-p com cautela." : ""}
      </p>
    </div>
  );
}

function Correlation({
  dataset,
  a,
  b,
  numbers,
  onA,
  onB,
}: {
  dataset: Dataset;
  a: string;
  b: string;
  numbers: string[];
  onA: (value: string) => void;
  onB: (value: string) => void;
}) {
  if (numbers.length < 2) return <p className="mt-4 text-sm text-muted">Marque ao menos duas variáveis como número.</p>;
  const pairs = pairedNumbers(dataset, a, b);
  const result = pearson(pairs);
  return (
    <div className="mt-4">
      <div className="grid gap-3 md:grid-cols-2">
        <VariableSelect label="Eixo horizontal" value={a} options={numbers} onChange={onA} />
        <VariableSelect label="Eixo vertical" value={b} options={numbers} onChange={onB} />
      </div>
      <p className="mt-3 text-sm text-muted">
        r = {formatNumber(result.r, 2)} · n = {result.n}. {interpretR(result.r)}
      </p>
      <ChartFrame className="mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid stroke="var(--color-line)" />
            <XAxis dataKey="x" name={a} type="number" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="y" name={b} type="number" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <ZAxis range={[64, 64]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Scatter data={pairs} fill="var(--color-accent)" isAnimationActive={false} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-surface p-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-2xl tabular-nums leading-none">{value}</dd>
    </div>
  );
}
