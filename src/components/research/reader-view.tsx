import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { buildSegments, coveredLength, excerptCount, flattenCodes, formatPercent, kindLabel } from "@/lib/research/analysis";
import { useActiveProject, useResearch } from "@/lib/research/store";
import type { Code, MarkId } from "@/lib/research/types";
import { MARKS } from "@/lib/research/types";
import { cn } from "@/lib/utils";

export function ReaderView() {
  const project = useActiveProject();
  const activeSourceId = useResearch((state) => state.activeSourceId);
  const setActiveSource = useResearch((state) => state.setActiveSource);
  const addCoding = useResearch((state) => state.addCoding);
  const removeCoding = useResearch((state) => state.removeCoding);
  const updateCodingNote = useResearch((state) => state.updateCodingNote);
  const addCode = useResearch((state) => state.addCode);
  const focus = useResearch((state) => state.focus);
  const setView = useResearch((state) => state.setView);
  const [pane, setPane] = useState<"texto" | "codigos">("texto");
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [pop, setPop] = useState<{ top: number; left: number } | null>(null);
  const [inspect, setInspect] = useState<{ ids: string[]; top: number; left: number } | null>(null);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  const source = project?.sources.find((item) => item.id === activeSourceId) ?? project?.sources[0] ?? null;

  useEffect(() => {
    if (source && activeSourceId !== source.id) setActiveSource(source.id);
  }, [source, activeSourceId, setActiveSource]);

  useEffect(() => {
    if (!focus || !source || focus.sourceId !== source.id) return;
    const nodes = articleRef.current?.querySelectorAll<HTMLElement>("[data-start]");
    if (!nodes) return;
    for (const node of nodes) {
      const start = Number(node.dataset.start);
      const end = Number(node.dataset.end);
      if (focus.index >= start && focus.index < end) {
        node.scrollIntoView({ block: "center" });
        break;
      }
    }
  }, [focus, source]);

  const codings = useMemo(
    () => (project && source ? project.codings.filter((coding) => coding.sourceId === source.id) : []),
    [project, source],
  );
  const segments = useMemo(() => (source ? buildSegments(source.text, codings) : []), [source, codings]);

  if (!project) return null;
  if (!source) {
    return (
      <div className="mx-auto max-w-xl p-6">
        <h1 className="font-display text-3xl">Nenhuma fonte</h1>
        <p className="mt-2 text-muted">Cole uma entrevista, um diário ou uma nota para começar a codificar.</p>
        <Button className="mt-4" variant="primary" onClick={() => setView("fontes")}>
          Ir para fontes
        </Button>
      </div>
    );
  }

  const tree = flattenCodes(project.codes).filter((code) => code.name.toLocaleLowerCase("pt-BR").includes(filter.trim().toLocaleLowerCase("pt-BR")));
  const coverage = source.text.length ? coveredLength(codings, source.text.length) / source.text.length : 0;

  function apply(codeId: string) {
    if (!selection) return;
    addCoding({
      sourceId: source!.id,
      codeId,
      start: selection.start,
      end: selection.end,
      excerpt: source!.text.slice(selection.start, selection.end),
    });
    const code = project!.codes.find((item) => item.id === codeId);
    setStatus(`Trecho marcado com ${code?.name ?? "código"}.`);
    window.getSelection()?.removeAllRanges();
    setSelection(null);
    setPop(null);
  }

  function onMouseUp() {
    const root = articleRef.current;
    const sel = window.getSelection();
    if (!root || !sel || !sel.rangeCount || sel.isCollapsed) {
      setSelection(null);
      setPop(null);
      return;
    }
    const range = sel.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return;
    const start = offsetFrom(root, range.startContainer, range.startOffset);
    const end = offsetFrom(root, range.endContainer, range.endOffset);
    if (start == null || end == null) return;
    const a = Math.min(start, end);
    const b = Math.max(start, end);
    if (b - a < 2) return;
    const rect = range.getBoundingClientRect();
    setSelection({ start: a, end: b });
    setInspect(null);
    setPop({
      top: Math.min(rect.bottom + 8, window.innerHeight - 16),
      left: Math.min(Math.max(8, rect.left), window.innerWidth - 300),
    });
  }

  function createAndApply() {
    const name = newName.trim();
    if (!name) return;
    const color = MARKS[project!.codes.length % MARKS.length]!.id;
    const id = addCode({ name, parentId: null, color });
    setNewName("");
    if (id && selection) apply(id);
    else if (id) setStatus(`Código ${name} criado.`);
  }

  const codeRail = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-line p-3">
        <Field value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filtrar códigos" aria-label="Filtrar códigos" />
        {selection ? (
          <p className="mt-2 text-sm text-muted">{selection.end - selection.start} caracteres selecionados. Toque num código para marcar.</p>
        ) : (
          <p className="mt-2 text-sm text-muted">Selecione um trecho no texto e escolha um código.</p>
        )}
      </div>
      <ul className="min-h-0 flex-1 overflow-auto p-2">
        {tree.length === 0 ? <li className="px-2 py-3 text-sm text-muted">Nenhum código com esse filtro.</li> : null}
        {tree.map((code) => (
          <li key={code.id}>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => (selection ? apply(code.id) : undefined)}
              className="flex min-h-11 w-full items-center gap-2 rounded-sm px-2 text-left text-sm hover:bg-accent-soft"
              style={{ paddingLeft: `${8 + code.depth * 16}px` }}
            >
              <Swatch id={code.color} />
              <span className="min-w-0 flex-1 truncate">{code.name}</span>
              <span className="tabular-nums text-faint">{excerptCount(project.codings, project.codes, code.id, true)}</span>
            </button>
          </li>
        ))}
      </ul>
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(event) => {
          event.preventDefault();
          createAndApply();
        }}
      >
        <Field value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Novo código" aria-label="Novo código" />
        <Button variant="primary" type="submit">
          Criar
        </Button>
      </form>
    </div>
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2 md:hidden">
        <PaneButton active={pane === "texto"} onClick={() => setPane("texto")}>
          Texto
        </PaneButton>
        <PaneButton active={pane === "codigos"} onClick={() => setPane("codigos")}>
          Códigos
        </PaneButton>
        <label className="sr-only" htmlFor="fonte-ativa">
          Fonte
        </label>
        <select
          id="fonte-ativa"
          className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-2 text-sm"
          value={source.id}
          onChange={(event) => setActiveSource(event.target.value)}
        >
          {project.sources.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid min-h-0 flex-1 md:grid-cols-[14rem_minmax(0,1fr)_17rem]">
        <aside className="hidden min-h-0 overflow-auto border-r border-line md:block">
          <ul className="p-2">
            {project.sources.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveSource(item.id)}
                  className={cn(
                    "flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left",
                    item.id === source.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft",
                  )}
                >
                  <span className="w-full truncate text-sm font-medium">{item.participant || item.title}</span>
                  <span className={cn("text-xs", item.id === source.id ? "opacity-80" : "text-muted")}>{kindLabel(item.kind)}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className={cn("min-h-0 overflow-auto", pane === "texto" ? "block" : "hidden", "md:block")} onScroll={() => setPop(null)}>
          <article className="mx-auto max-w-[70ch] px-4 py-6 md:px-8">
            <p className="text-sm text-muted">{kindLabel(source.kind)}{source.date ? ` · ${source.date.split("-").reverse().join("/")}` : ""}</p>
            <h1 className="mt-1 font-display text-3xl leading-tight">{source.title}</h1>
            <p className="mt-2 text-sm text-muted">
              {formatPercent(coverage)} codificado · {codings.length} trechos
              {source.participant ? ` · ${source.participant}` : ""}
            </p>
            {source.attributes.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {source.attributes.map((attribute) => (
                  <li key={`${attribute.key}-${attribute.value}`} className="rounded-sm bg-accent-soft px-2 py-1 text-sm">
                    {attribute.key}: {attribute.value}
                  </li>
                ))}
              </ul>
            ) : null}
            <div
              ref={articleRef}
              onMouseUp={onMouseUp}
              className="mt-6 font-display text-lg leading-relaxed whitespace-pre-wrap"
            >
              {source.text.length === 0 ? <p className="text-base text-muted">Esta fonte ainda não tem texto.</p> : null}
              {segments.map((segment) => {
                const coded = segment.codeIds.length > 0;
                return (
                  <span
                    key={`${segment.start}-${segment.end}`}
                    data-start={segment.start}
                    data-end={segment.end}
                    style={markStyle(segment.codeIds, project.codes)}
                    className={cn(coded && "cursor-pointer rounded-xs")}
                    onClick={(event) => {
                      if (!coded || window.getSelection()?.isCollapsed === false) return;
                      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                      setInspect({
                        ids: segment.codingIds,
                        top: rect.bottom + 8,
                        left: Math.min(rect.left, window.innerWidth - 300),
                      });
                      setPop(null);
                    }}
                  >
                    {segment.text}
                  </span>
                );
              })}
            </div>
            <p className="sr-only" aria-live="polite">
              {status}
            </p>
            {status ? <p className="mt-4 text-sm text-muted">{status}</p> : null}
          </article>
        </section>
        <aside className={cn("min-h-0 border-l border-line", pane === "codigos" ? "block" : "hidden", "md:block")}>{codeRail}</aside>
      </div>
      {pop && selection
        ? createPortal(
            <div className="code-pop fixed z-50 max-h-[50vh] w-72 overflow-auto rounded-xl border border-line bg-elevated p-3" style={{ top: pop.top, left: pop.left }}>
              <p className="text-sm font-medium">Codificar trecho</p>
              <p className="mt-1 line-clamp-3 text-sm text-muted">{source.text.slice(selection.start, selection.end)}</p>
              <ul className="mt-2 max-h-40 overflow-auto">
                {flattenCodes(project.codes).map((code) => (
                  <li key={code.id}>
                    <button
                      type="button"
                      className="flex h-10 w-full items-center gap-2 rounded-sm px-2 text-left text-sm hover:bg-accent-soft"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => apply(code.id)}
                    >
                      <Swatch id={code.color} />
                      {code.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>,
            document.body,
          )
        : null}
      {inspect
        ? createPortal(
            <div className="code-pop fixed z-50 max-h-[50vh] w-80 overflow-auto rounded-xl border border-line bg-elevated p-3" style={{ top: inspect.top, left: inspect.left }}>
              <p className="text-sm font-medium">Trecho marcado</p>
              <ul className="mt-2 flex flex-col gap-3">
                {inspect.ids.map((id) => {
                  const coding = project.codings.find((item) => item.id === id);
                  const code = project.codes.find((item) => item.id === coding?.codeId);
                  if (!coding || !code) return null;
                  return (
                    <li key={id} className="rounded-sm border border-line p-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Swatch id={code.color} />
                        {code.name}
                      </div>
                      <textarea
                        className="mt-2 min-h-16 w-full rounded-sm border border-line bg-surface px-2 py-1 text-sm"
                        value={coding.note}
                        placeholder="Anotação deste trecho"
                        onChange={(event) => updateCodingNote(coding.id, event.target.value)}
                      />
                      <Button className="mt-2" size="sm" variant="danger" onClick={() => removeCoding(coding.id)}>
                        Remover código
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <Button className="mt-3" size="sm" onClick={() => setInspect(null)}>
                Fechar
              </Button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function PaneButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("h-11 rounded-sm px-3 text-sm font-medium", active ? "bg-accent text-accent-fg" : "bg-elevated text-ink")}
    >
      {children}
    </button>
  );
}

function Swatch({ id }: { id: MarkId }) {
  return <span className="size-3 shrink-0 rounded-xs" style={{ backgroundColor: `var(--color-${id})` }} aria-hidden="true" />;
}

function markStyle(codeIds: string[], codes: Code[]): CSSProperties | undefined {
  if (codeIds.length === 0) return undefined;
  const marks = codeIds
    .map((id) => codes.find((code) => code.id === id)?.color)
    .filter((color): color is MarkId => Boolean(color));
  const [first, ...rest] = marks;
  if (!first) return undefined;
  return {
    backgroundColor: `color-mix(in oklab, var(--color-${first}) 32%, transparent)`,
    boxShadow: rest.map((id, index) => `inset 0 -${(index + 1) * 3}px 0 var(--color-${id})`).join(", "),
  };
}

function offsetFrom(root: HTMLElement, container: Node, offset: number): number | null {
  if (!root.contains(container)) return null;
  if (container.nodeType === Node.TEXT_NODE) {
    const host = container.parentElement?.closest("[data-start]") as HTMLElement | null;
    if (!host || !root.contains(host)) return null;
    return Number(host.dataset.start) + offset;
  }
  const element = container as HTMLElement;
  if (element.dataset?.start && offset === 0) return Number(element.dataset.start);
  const child = element.childNodes[Math.min(offset, element.childNodes.length - 1)];
  if (!child) return null;
  const host = (child instanceof HTMLElement ? child : child.parentElement)?.closest("[data-start]") as HTMLElement | null;
  if (!host) return null;
  return offset <= 0 ? Number(host.dataset.start) : Number(host.dataset.end ?? host.dataset.start);
}
