import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { Area, Field, Label } from "@/components/ui/field";
import { useResearch } from "@/lib/research/store";

export function ProjectsView() {
  const projects = useResearch((state) => state.projects);
  const activeId = useResearch((state) => state.activeProjectId);
  const setActiveProject = useResearch((state) => state.setActiveProject);
  const createProject = useResearch((state) => state.createProject);
  const deleteProject = useResearch((state) => state.deleteProject);
  const restoreDemo = useResearch((state) => state.restoreDemo);
  const updateProjectMeta = useResearch((state) => state.updateProjectMeta);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [confirmDemo, setConfirmDemo] = useState(false);
  const active = projects.find((project) => project.id === activeId) ?? null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="font-display text-3xl">Projetos</h1>
        <p className="mt-2 max-w-2xl text-base text-muted">
          Cada projeto junta fontes, códigos, memos e questionários. O exemplo “Bem-estar na graduação” já vem codificado para você ver a leitura, as consultas e a estatística.
        </p>
      </header>
      <form
        className="rounded-xl border border-line bg-elevated p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) return;
          createProject(name, description);
          setName("");
          setDescription("");
        }}
      >
        <h2 className="font-display text-xl">Novo projeto</h2>
        <div className="mt-3">
          <Label>Nome</Label>
          <Field value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Entrevistas da dissertação" />
        </div>
        <div className="mt-3">
          <Label>Descrição</Label>
          <Area className="min-h-24" value={description} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          Criar projeto em branco
        </Button>
      </form>
      {active ? (
        <form
          className="rounded-xl border border-line bg-elevated p-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            updateProjectMeta({
              name: String(data.get("name") ?? ""),
              description: String(data.get("description") ?? ""),
            });
          }}
        >
          <h2 className="font-display text-xl">Projeto aberto</h2>
          <div className="mt-3">
            <Label>Nome</Label>
            <Field name="name" defaultValue={active.name} key={`${active.id}-name`} />
          </div>
          <div className="mt-3">
            <Label>Descrição</Label>
            <Area name="description" defaultValue={active.description} key={`${active.id}-desc`} className="min-h-24" />
          </div>
          <Button className="mt-3" variant="primary" type="submit">
            Salvar dados do projeto
          </Button>
        </form>
      ) : null}
      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li key={project.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-elevated p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{project.name}</p>
              <p className="text-sm text-muted">
                {project.sources.length} fontes · {project.codes.length} códigos · {project.codings.length} trechos
              </p>
            </div>
            <Button onClick={() => setActiveProject(project.id)} variant={project.id === activeId ? "primary" : "secondary"}>
              {project.id === activeId ? "Aberto" : "Abrir"}
            </Button>
            <Button variant="danger" onClick={() => setPendingDelete(project.id)}>
              Excluir
            </Button>
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-xl">Exemplo</h2>
        <p className="mt-1 text-sm text-muted">
          Restaura o projeto de bem-estar na graduação, com entrevistas já codificadas e um questionário de 36 respostas. Se você editou esse exemplo, a versão atual é substituída.
        </p>
        <Button className="mt-3" onClick={() => setConfirmDemo(true)}>
          Restaurar exemplo
        </Button>
      </div>
      <ConfirmDialog
        open={pendingDelete != null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Excluir projeto?"
        body="Fontes, códigos, memos e questionários desse projeto saem deste navegador."
        confirmLabel="Excluir projeto"
        onConfirm={() => pendingDelete && deleteProject(pendingDelete)}
      />
      <ConfirmDialog
        open={confirmDemo}
        onOpenChange={setConfirmDemo}
        title="Restaurar o exemplo?"
        body="O projeto “Bem-estar na graduação” volta ao estado original. Os outros projetos ficam como estão."
        confirmLabel="Restaurar"
        onConfirm={restoreDemo}
      />
    </div>
  );
}
