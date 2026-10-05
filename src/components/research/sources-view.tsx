import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { Area, Field, Label, Select } from "@/components/ui/field";
import { kindLabel } from "@/lib/research/analysis";
import { wordCount } from "@/lib/research/text";
import { useActiveProject, useResearch } from "@/lib/research/store";
import { SOURCE_KINDS, type Source } from "@/lib/research/types";

export function SourcesView() {
  const project = useActiveProject();
  const activeSourceId = useResearch((state) => state.activeSourceId);
  const setActiveSource = useResearch((state) => state.setActiveSource);
  const addSource = useResearch((state) => state.addSource);
  const updateSource = useResearch((state) => state.updateSource);
  const deleteSource = useResearch((state) => state.deleteSource);
  const setView = useResearch((state) => state.setView);
  const source = project?.sources.find((item) => item.id === activeSourceId) ?? project?.sources[0] ?? null;
  const [draft, setDraft] = useState<Source | null>(source);
  const [confirm, setConfirm] = useState(false);
  const [lost, setLost] = useState(0);

  useEffect(() => {
    setDraft(source ? structuredClone(source) : null);
    setLost(0);
  }, [source?.id]);

  if (!project) return null;
  const current = project;

  const dirty = source && draft ? JSON.stringify(source) !== JSON.stringify(draft) : false;

  function save(next = draft) {
    if (!source || !next) return;
    const cleaned: Source = {
      ...next,
      title: next.title.trim() || "Fonte sem título",
      attributes: next.attributes
        .filter((attribute) => attribute.key.trim() || attribute.value.trim())
        .map((attribute) => ({ key: attribute.key.trim(), value: attribute.value.trim() })),
    };
    const before = current.codings.filter((coding) => coding.sourceId === source.id).length;
    updateSource(source.id, cleaned);
    setDraft(cleaned);
    const after =
      useResearch
        .getState()
        .projects.find((item) => item.id === current.id)
        ?.codings.filter((coding) => coding.sourceId === source.id).length ?? before;
    setLost(Math.max(0, before - after));
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[16rem_minmax(0,1fr)] md:p-8">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-2xl">Fontes</h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              addSource({ title: "Nova fonte", kind: "entrevista", text: "" });
            }}
          >
            Nova
          </Button>
        </div>
        <ul className="mt-3 flex flex-col gap-1">
          {project.sources.length === 0 ? <li className="text-sm text-muted">Nenhuma fonte ainda.</li> : null}
          {project.sources.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (dirty) save();
                  setActiveSource(item.id);
                }}
                className={`flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left ${item.id === source?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`}
              >
                <span className="w-full truncate text-sm font-medium">{item.title}</span>
                <span className="text-xs opacity-80">{kindLabel(item.kind)} · {wordCount(item.text)} palavras</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {draft && source ? (
        <form
          className="rounded-xl border border-line bg-elevated p-4"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Título</Label>
              <Field value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as Source["kind"] })}>
                {SOURCE_KINDS.map((kind) => (
                  <option key={kind.id} value={kind.id}>
                    {kind.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Data</Label>
              <Field type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Participante ou caso</Label>
              <Field value={draft.participant} onChange={(event) => setDraft({ ...draft, participant: event.target.value })} />
            </div>
          </div>
          <div className="mt-4">
            <Label hint="Atributos viram grupos na consulta “por atributo” — gênero, curso, turno.">Atributos do caso</Label>
            <ul className="flex flex-col gap-2">
              {draft.attributes.map((attribute, index) => (
                <li key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <Field
                    aria-label="Nome do atributo"
                    value={attribute.key}
                    placeholder="Atributo"
                    onChange={(event) => {
                      const attributes = draft.attributes.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, key: event.target.value } : item,
                      );
                      setDraft({ ...draft, attributes });
                    }}
                  />
                  <Field
                    aria-label="Valor do atributo"
                    value={attribute.value}
                    placeholder="Valor"
                    onChange={(event) => {
                      const attributes = draft.attributes.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, value: event.target.value } : item,
                      );
                      setDraft({ ...draft, attributes });
                    }}
                  />
                  <Button
                    onClick={() =>
                      setDraft({ ...draft, attributes: draft.attributes.filter((_, itemIndex) => itemIndex !== index) })
                    }
                  >
                    Tirar
                  </Button>
                </li>
              ))}
            </ul>
            <Button className="mt-2" size="sm" onClick={() => setDraft({ ...draft, attributes: [...draft.attributes, { key: "", value: "" }] })}>
              Adicionar atributo
            </Button>
          </div>
          <div className="mt-4">
            <Label hint="Se o texto mudar, os trechos são recolocados pelo conteúdo. O que sumir deixa de estar codificado.">Texto</Label>
            <Area value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} />
            <p className="mt-1 text-sm text-faint">{wordCount(draft.text)} palavras</p>
          </div>
          {lost > 0 ? <p className="mt-3 text-sm text-danger">{lost} trecho(s) não foram encontrados no texto novo e saíram da codificação.</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" type="submit" disabled={!dirty}>
              Salvar fonte
            </Button>
            <Button
              onClick={() => {
                save();
                setView("leitura");
              }}
            >
              Codificar
            </Button>
            <Button variant="danger" onClick={() => setConfirm(true)}>
              Excluir
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-line bg-elevated p-6">
          <h2 className="font-display text-2xl">Cole o material</h2>
          <p className="mt-2 max-w-lg text-sm text-muted">Entrevistas, grupos focais, diários, respostas abertas. O texto fica no seu navegador.</p>
          <Button className="mt-4" variant="primary" onClick={() => addSource({ title: "Nova fonte", kind: "entrevista" })}>
            Criar fonte
          </Button>
        </div>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Excluir esta fonte?"
        body="Os trechos codificados nela também saem. O restante do projeto permanece."
        confirmLabel="Excluir fonte"
        onConfirm={() => source && deleteSource(source.id)}
      />
    </div>
  );
}
