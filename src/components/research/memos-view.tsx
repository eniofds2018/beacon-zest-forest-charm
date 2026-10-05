import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { Area, Field, Label, Select } from "@/components/ui/field";
import { flattenCodes, formatDate } from "@/lib/research/analysis";
import { useActiveProject, useResearch } from "@/lib/research/store";

export function MemosView() {
  const project = useActiveProject();
  const addMemo = useResearch((state) => state.addMemo);
  const updateMemo = useResearch((state) => state.updateMemo);
  const deleteMemo = useResearch((state) => state.deleteMemo);
  const [openId, setOpenId] = useState<string | null>(project?.memos[0]?.id ?? null);
  const [confirm, setConfirm] = useState(false);
  const memo = project?.memos.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    if (!project) return;
    if (!openId || !project.memos.some((item) => item.id === openId)) {
      setOpenId(project.memos[0]?.id ?? null);
    }
  }, [project, openId]);

  if (!project) return null;
  const tree = flattenCodes(project.codes);

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[16rem_minmax(0,1fr)] md:p-8">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-2xl">Memos</h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const id = addMemo();
              setOpenId(id);
            }}
          >
            Novo
          </Button>
        </div>
        <ul className="mt-3 flex flex-col gap-1">
          {project.memos.length === 0 ? <li className="text-sm text-muted">Nenhum memo. Use-os para hipóteses e decisões analíticas.</li> : null}
          {project.memos.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                className={`flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left ${item.id === memo?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`}
              >
                <span className="w-full truncate text-sm font-medium">{item.title || "Sem título"}</span>
                <span className="text-xs opacity-80">{item.updatedAt ? formatDate(item.updatedAt) : ""}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {memo ? (
        <form
          className="rounded-xl border border-line bg-elevated p-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            updateMemo(memo.id, {
              title: String(data.get("title") ?? ""),
              body: String(data.get("body") ?? ""),
              codeId: String(data.get("code") ?? "") || null,
            });
          }}
        >
          <Label>Título</Label>
          <Field name="title" defaultValue={memo.title} key={`${memo.id}-title`} />
          <div className="mt-3">
            <Label>Ligado a um código</Label>
            <Select name="code" defaultValue={memo.codeId ?? ""} key={`${memo.id}-code`}>
              <option value="">Nenhum</option>
              {tree.map((code) => (
                <option key={code.id} value={code.id}>
                  {"· ".repeat(code.depth)}
                  {code.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-3">
            <Label>Texto</Label>
            <Area name="body" defaultValue={memo.body} key={`${memo.id}-body`} className="min-h-64" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" type="submit">
              Salvar memo
            </Button>
            <Button variant="danger" onClick={() => setConfirm(true)}>
              Excluir
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted">Crie um memo para registrar uma hipótese, uma dúvida ou o que fazer a seguir.</p>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Excluir memo?"
        body="O texto do memo sai do projeto. As codificações permanecem."
        confirmLabel="Excluir memo"
        onConfirm={() => memo && deleteMemo(memo.id)}
      />
    </div>
  );
}
