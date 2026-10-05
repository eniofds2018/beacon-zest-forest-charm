import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { Area, Field, Label, Select } from "@/components/ui/field";
import { excerptCount, flattenCodes, wouldCycle } from "@/lib/research/analysis";
import { useActiveProject, useResearch } from "@/lib/research/store";
import { MARKS, type MarkId } from "@/lib/research/types";

export function CodesView() {
  const project = useActiveProject();
  const activeCodeId = useResearch((state) => state.activeCodeId);
  const setActiveCode = useResearch((state) => state.setActiveCode);
  const addCode = useResearch((state) => state.addCode);
  const updateCode = useResearch((state) => state.updateCode);
  const deleteCode = useResearch((state) => state.deleteCode);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [confirm, setConfirm] = useState(false);
  if (!project) return null;
  const tree = flattenCodes(project.codes);
  const selected = project.codes.find((code) => code.id === activeCodeId) ?? tree[0] ?? null;

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[18rem_minmax(0,1fr)] md:p-8">
      <div>
        <h1 className="font-display text-2xl">Códigos</h1>
        <form
          className="mt-3 flex flex-col gap-2 rounded-xl border border-line bg-elevated p-3"
          onSubmit={(event) => {
            event.preventDefault();
            const id = addCode({ name, parentId: parentId || null });
            if (id) {
              setName("");
              setActiveCode(id);
            }
          }}
        >
          <Field value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome do código" aria-label="Nome do código" />
          <Select value={parentId} onChange={(event) => setParentId(event.target.value)} aria-label="Código pai">
            <option value="">Sem código pai</option>
            {tree.map((code) => (
              <option key={code.id} value={code.id}>
                {"· ".repeat(code.depth)}
                {code.name}
              </option>
            ))}
          </Select>
          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        </form>
        <ul className="mt-3">
          {tree.length === 0 ? <li className="text-sm text-muted">O livro de códigos está vazio.</li> : null}
          {tree.map((code) => (
            <li key={code.id}>
              <button
                type="button"
                onClick={() => setActiveCode(code.id)}
                className={`flex min-h-11 w-full items-center gap-2 rounded-sm px-2 text-left text-sm ${code.id === selected?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`}
                style={{ paddingLeft: `${8 + code.depth * 14}px` }}
              >
                <span className="size-3 shrink-0 rounded-xs" style={{ backgroundColor: `var(--color-${code.color})` }} />
                <span className="min-w-0 flex-1 truncate">{code.name}</span>
                <span className="tabular-nums opacity-80">{excerptCount(project.codings, project.codes, code.id, true)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selected ? (
        <form
          className="rounded-xl border border-line bg-elevated p-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            updateCode(selected.id, {
              name: String(data.get("name") ?? ""),
              description: String(data.get("description") ?? ""),
              parentId: String(data.get("parent") ?? "") || null,
              color: String(data.get("color") ?? selected.color) as MarkId,
            });
          }}
        >
          <h2 className="font-display text-2xl">{selected.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {excerptCount(project.codings, project.codes, selected.id, false)} trechos diretos ·{" "}
            {excerptCount(project.codings, project.codes, selected.id, true)} com subcódigos
          </p>
          <div className="mt-4">
            <Label>Nome</Label>
            <Field name="name" defaultValue={selected.name} key={`${selected.id}-name`} />
          </div>
          <div className="mt-3">
            <Label>Descrição</Label>
            <Area name="description" defaultValue={selected.description} key={`${selected.id}-desc`} className="min-h-28" />
          </div>
          <div className="mt-3">
            <Label>Código pai</Label>
            <Select name="parent" defaultValue={selected.parentId ?? ""} key={`${selected.id}-parent`}>
              <option value="">Sem código pai</option>
              {tree
                .filter((code) => code.id !== selected.id && !wouldCycle(project.codes, selected.id, code.id))
                .map((code) => (
                  <option key={code.id} value={code.id}>
                    {"· ".repeat(code.depth)}
                    {code.name}
                  </option>
                ))}
            </Select>
          </div>
          <fieldset className="mt-3">
            <legend className="mb-2 text-sm font-medium">Cor</legend>
            <div className="flex flex-wrap gap-2">
              {MARKS.map((mark) => (
                <label key={mark.id} className="inline-flex">
                  <input className="peer sr-only" type="radio" name="color" value={mark.id} defaultChecked={selected.color === mark.id} />
                  <span
                    className="size-11 rounded-sm peer-checked:outline peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline-ink"
                    style={{ backgroundColor: `var(--color-${mark.id})` }}
                    title={mark.label}
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" type="submit">
              Salvar código
            </Button>
            <Button variant="danger" onClick={() => setConfirm(true)}>
              Excluir
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted">Crie o primeiro código para organizar os temas.</p>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Excluir código?"
        body="Subcódigos e os trechos ligados a eles também saem."
        confirmLabel="Excluir código"
        onConfirm={() => selected && deleteCode(selected.id)}
      />
    </div>
  );
}
