import {
  ChartColumn,
  FileText,
  FolderOpen,
  Highlighter,
  LayoutDashboard,
  NotebookPen,
  Search,
  Tags,
  WholeWord,
} from "lucide-react";
import { useRef, useState } from "react";
import { CodesView } from "@/components/research/codes-view";
import { FrequencyView } from "@/components/research/frequency-view";
import { MemosView } from "@/components/research/memos-view";
import { OverviewView } from "@/components/research/overview-view";
import { ProjectsView } from "@/components/research/projects-view";
import { QuantView } from "@/components/research/quant-view";
import { QueriesView } from "@/components/research/queries-view";
import { ReaderView } from "@/components/research/reader-view";
import { SourcesView } from "@/components/research/sources-view";
import { excerptCount, fileSlug, flattenCodes } from "@/lib/research/analysis";
import { downloadText } from "@/lib/research/analysis";
import { toCsv } from "@/lib/research/csv";
import { sanitizeProject } from "@/lib/research/sanitize";
import { useActiveProject, useResearch } from "@/lib/research/store";
import type { Project, ViewId } from "@/lib/research/types";
import { cn } from "@/lib/utils";

const NAV: { id: ViewId; label: string; icon: typeof Search }[] = [
  { id: "painel", label: "Painel", icon: LayoutDashboard },
  { id: "leitura", label: "Leitura", icon: Highlighter },
  { id: "fontes", label: "Fontes", icon: FileText },
  { id: "codigos", label: "Códigos", icon: Tags },
  { id: "consultas", label: "Consultas", icon: Search },
  { id: "frequencia", label: "Frequência", icon: WholeWord },
  { id: "quantitativo", label: "Quantitativo", icon: ChartColumn },
  { id: "memos", label: "Memos", icon: NotebookPen },
  { id: "projetos", label: "Projetos", icon: FolderOpen },
];

export function AppShell() {
  const project = useActiveProject();
  const projects = useResearch((state) => state.projects);
  const view = useResearch((state) => state.view);
  const setView = useResearch((state) => state.setView);
  const setActiveProject = useResearch((state) => state.setActiveProject);
  const importProject = useResearch((state) => state.importProject);
  const fileRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState("");
  const shown: ViewId = project ? view : "projetos";

  async function onImport(file: File) {
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const incoming = sanitizeProject(parsed);
      if (!incoming) {
        setNotice("Esse arquivo não parece um projeto do Trama.");
        return;
      }
      importProject(incoming);
      setNotice(`Projeto “${incoming.name}” importado. Os dados ficam neste navegador.`);
    } catch {
      setNotice("Não foi possível ler o JSON.");
    }
  }

  return (
    <div className="app-frame flex flex-col bg-canvas text-ink">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <Mark />
          <div>
            <p className="font-display text-xl leading-none">Trama</p>
            <p className="text-sm text-muted">Análise de pesquisa</p>
          </div>
        </div>
        {projects.length > 0 ? (
          <select
            className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm md:max-w-64 md:flex-none"
            aria-label="Projeto ativo"
            value={project?.id ?? ""}
            onChange={(event) => setActiveProject(event.target.value)}
          >
            {projects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="h-11 rounded-sm border border-line bg-elevated px-3 text-sm"
            onClick={() => fileRef.current?.click()}
          >
            Importar
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onImport(file);
              event.target.value = "";
            }}
          />
          {project ? <ExportMenu project={project} /> : null}
        </div>
      </header>
      {notice ? (
        <p className="border-b border-line bg-accent-soft px-4 py-2 text-sm text-ink">{notice}</p>
      ) : null}
      <nav className="flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 py-2 md:hidden">
        {NAV.map((item) => (
          <NavButton key={item.id} item={item} active={shown === item.id} onClick={() => setView(item.id)} compact />
        ))}
      </nav>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-line bg-surface p-3 md:flex">
          {NAV.map((item) => (
            <NavButton key={item.id} item={item} active={shown === item.id} onClick={() => setView(item.id)} />
          ))}
          <p className="mt-auto px-3 pt-4 text-sm text-faint">Tudo fica salvo neste navegador.</p>
        </aside>
        <main className={cn("min-w-0 flex-1", shown === "leitura" ? "overflow-hidden" : "overflow-auto")}>
          {shown === "painel" && project ? <OverviewView /> : null}
          {shown === "leitura" && project ? <ReaderView /> : null}
          {shown === "fontes" && project ? <SourcesView /> : null}
          {shown === "codigos" && project ? <CodesView /> : null}
          {shown === "consultas" && project ? <QueriesView /> : null}
          {shown === "frequencia" && project ? <FrequencyView /> : null}
          {shown === "quantitativo" && project ? <QuantView /> : null}
          {shown === "memos" && project ? <MemosView /> : null}
          {shown === "projetos" ? <ProjectsView /> : null}
        </main>
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "flex h-11 shrink-0 items-center gap-2 rounded-sm px-3 text-sm font-medium",
        compact ? "whitespace-nowrap" : "w-full",
        active ? "bg-accent text-accent-fg" : "text-ink hover:bg-accent-soft",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </button>
  );
}

function ExportMenu({ project }: { project: Project }) {
  return (
    <details className="relative">
      <summary className="flex h-11 items-center rounded-sm border border-line bg-elevated px-3 text-sm">Exportar</summary>
      <div className="absolute right-0 z-30 mt-1 w-64 rounded-xl border border-line bg-elevated p-1">
        <ExportItem
          label="Projeto em JSON"
          onClick={() => downloadText(`${fileSlug(project.name)}.json`, JSON.stringify(project, null, 2), "application/json")}
        />
        <ExportItem
          label="Livro de códigos (CSV)"
          onClick={() => {
            const rows = flattenCodes(project.codes).map((code) => {
              const parent = project.codes.find((item) => item.id === code.parentId)?.name ?? "";
              return [
                code.name,
                parent,
                code.description,
                String(excerptCount(project.codings, project.codes, code.id, false)),
                String(excerptCount(project.codings, project.codes, code.id, true)),
              ];
            });
            downloadText(
              `${fileSlug(project.name)}-codigos.csv`,
              toCsv(["codigo", "codigo_pai", "descricao", "trechos", "trechos_com_subcodigos"], rows),
              "text/csv",
            );
          }}
        />
        <ExportItem
          label="Trechos codificados (CSV)"
          onClick={() => {
            const rows = project.codings.map((coding) => [
              project.sources.find((source) => source.id === coding.sourceId)?.title ?? "",
              project.codes.find((code) => code.id === coding.codeId)?.name ?? "",
              coding.excerpt,
              coding.note,
            ]);
            downloadText(
              `${fileSlug(project.name)}-trechos.csv`,
              toCsv(["fonte", "codigo", "trecho", "anotacao"], rows),
              "text/csv",
            );
          }}
        />
      </div>
    </details>
  );
}

function ExportItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="h-11 w-full rounded-sm px-3 text-left text-sm hover:bg-accent-soft" onClick={onClick}>
      {label}
    </button>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9 text-accent" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <rect x="7" y="5" width="3.2" height="22" rx="1.2" fill="var(--color-accent-soft)" />
      <rect x="14.4" y="5" width="3.2" height="22" rx="1.2" fill="var(--color-accent-soft)" />
      <rect x="21.8" y="5" width="3.2" height="22" rx="1.2" fill="var(--color-accent-soft)" />
      <rect x="4" y="13" width="24" height="6" rx="1.5" fill="var(--color-accent-fg)" />
    </svg>
  );
}
