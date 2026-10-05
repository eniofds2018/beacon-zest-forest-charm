import { create } from "zustand";
import { persist } from "zustand/middleware";
import { relocateCoding, uid, wouldCycle } from "@/lib/research/analysis";
import { buildSampleDataset, createDemoProject } from "@/lib/research/seed";
import type {
  Code,
  Coding,
  ColumnType,
  Dataset,
  MarkId,
  Memo,
  PassageFocus,
  Project,
  Source,
  ViewId,
} from "@/lib/research/types";
import { MARKS } from "@/lib/research/types";

const demo = createDemoProject();

interface NewCoding {
  sourceId: string;
  codeId: string;
  start: number;
  end: number;
  excerpt: string;
}

interface ResearchState {
  projects: Project[];
  activeProjectId: string | null;
  view: ViewId;
  activeSourceId: string | null;
  activeCodeId: string | null;
  focus: PassageFocus | null;
  setView: (view: ViewId) => void;
  setActiveProject: (id: string) => void;
  setActiveSource: (id: string | null) => void;
  setActiveCode: (id: string | null) => void;
  jumpTo: (sourceId: string, index: number) => void;
  clearFocus: () => void;
  createProject: (name: string, description: string) => void;
  updateProjectMeta: (patch: { name?: string; description?: string }) => void;
  deleteProject: (id: string) => void;
  importProject: (project: Project) => void;
  restoreDemo: () => void;
  addSource: (partial?: Partial<Source>) => string;
  updateSource: (sourceId: string, patch: Partial<Source>) => void;
  deleteSource: (sourceId: string) => void;
  addCode: (input: { name: string; parentId: string | null; description?: string; color?: MarkId }) => string | null;
  updateCode: (codeId: string, patch: Partial<Pick<Code, "name" | "description" | "color" | "parentId">>) => void;
  deleteCode: (codeId: string) => void;
  addCoding: (input: NewCoding) => void;
  removeCoding: (codingId: string) => void;
  updateCodingNote: (codingId: string, note: string) => void;
  addMemo: () => string;
  updateMemo: (memoId: string, patch: Partial<Pick<Memo, "title" | "body" | "codeId">>) => void;
  deleteMemo: (memoId: string) => void;
  addDataset: (dataset: Dataset) => void;
  addSampleDataset: () => void;
  setColumnType: (datasetId: string, column: string, type: ColumnType) => void;
  deleteDataset: (datasetId: string) => void;
}

function mapProject(projects: Project[], id: string, fn: (project: Project) => Project) {
  return projects.map((project) => (project.id === id ? fn(project) : project));
}

function touch(project: Project, patch: Partial<Project>): Project {
  return { ...project, ...patch, updatedAt: new Date().toISOString().slice(0, 10) };
}

export const useResearch = create<ResearchState>()(
  persist(
    (set, get) => ({
      projects: [demo],
      activeProjectId: demo.id,
      view: "painel",
      activeSourceId: demo.sources[0]?.id ?? null,
      activeCodeId: null,
      focus: null,
      setView: (view) => set({ view }),
      setActiveProject: (id) => {
        const project = get().projects.find((item) => item.id === id);
        set({
          activeProjectId: id,
          activeSourceId: project?.sources[0]?.id ?? null,
          activeCodeId: null,
          focus: null,
          view: "painel",
        });
      },
      setActiveSource: (id) => set({ activeSourceId: id, focus: null }),
      setActiveCode: (id) => set({ activeCodeId: id }),
      jumpTo: (sourceId, index) => set({ view: "leitura", activeSourceId: sourceId, focus: { sourceId, index } }),
      clearFocus: () => set({ focus: null }),
      createProject: (name, description) => {
        const project: Project = {
          id: uid("proj"),
          name: name.trim() || "Projeto sem título",
          description: description.trim(),
          updatedAt: new Date().toISOString().slice(0, 10),
          sources: [],
          codes: [],
          codings: [],
          memos: [],
          datasets: [],
        };
        set((state) => ({
          projects: [project, ...state.projects],
          activeProjectId: project.id,
          activeSourceId: null,
          activeCodeId: null,
          focus: null,
          view: "painel",
        }));
      },
      updateProjectMeta: (patch) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, {
              name: patch.name?.trim() || project.name,
              description: patch.description ?? project.description,
            }),
          ),
        }));
      },
      deleteProject: (id) =>
        set((state) => {
          const projects = state.projects.filter((project) => project.id !== id);
          const active = state.activeProjectId === id ? (projects[0]?.id ?? null) : state.activeProjectId;
          const next = projects.find((project) => project.id === active);
          return {
            projects,
            activeProjectId: active,
            activeSourceId: next?.sources[0]?.id ?? null,
            view: projects.length === 0 ? "projetos" : state.view,
          };
        }),
      importProject: (project) =>
        set((state) => {
          const exists = state.projects.some((item) => item.id === project.id);
          const projects = exists
            ? state.projects.map((item) => (item.id === project.id ? project : item))
            : [project, ...state.projects];
          return {
            projects,
            activeProjectId: project.id,
            activeSourceId: project.sources[0]?.id ?? null,
            view: "painel",
            focus: null,
          };
        }),
      restoreDemo: () => {
        const fresh = createDemoProject();
        set((state) => ({
          projects: [fresh, ...state.projects.filter((project) => project.id !== fresh.id)],
          activeProjectId: fresh.id,
          activeSourceId: fresh.sources[0]?.id ?? null,
          activeCodeId: null,
          focus: null,
          view: "painel",
        }));
      },
      addSource: (partial) => {
        const id = get().activeProjectId;
        const sourceId = uid("src");
        if (!id) return sourceId;
        const source: Source = {
          id: sourceId,
          title: partial?.title?.trim() || "Fonte sem título",
          kind: partial?.kind ?? "documento",
          participant: partial?.participant ?? "",
          date: partial?.date ?? new Date().toISOString().slice(0, 10),
          text: partial?.text ?? "",
          attributes: partial?.attributes ?? [],
        };
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, { sources: [...project.sources, source] }),
          ),
          activeSourceId: sourceId,
          view: "fontes",
        }));
        return sourceId;
      },
      updateSource: (sourceId, patch) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            const sources = project.sources.map((source) =>
              source.id === sourceId ? { ...source, ...patch, attributes: patch.attributes ?? source.attributes } : source,
            );
            const next = sources.find((source) => source.id === sourceId);
            const codings = next
              ? project.codings.flatMap((coding) => {
                  if (coding.sourceId !== sourceId) return [coding];
                  const moved = relocateCoding(next.text, coding);
                  return moved ? [moved] : [];
                })
              : project.codings;
            return touch(project, { sources, codings });
          }),
        }));
      },
      deleteSource: (sourceId) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, {
              sources: project.sources.filter((source) => source.id !== sourceId),
              codings: project.codings.filter((coding) => coding.sourceId !== sourceId),
            }),
          ),
          activeSourceId: state.activeSourceId === sourceId ? null : state.activeSourceId,
        }));
      },
      addCode: (input) => {
        const id = get().activeProjectId;
        const name = input.name.trim();
        if (!id || !name) return null;
        const codeId = uid("code");
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            const color = input.color ?? MARKS[project.codes.length % MARKS.length]!.id;
            const code: Code = {
              id: codeId,
              name,
              parentId: input.parentId,
              description: input.description?.trim() ?? "",
              color,
            };
            return touch(project, { codes: [...project.codes, code] });
          }),
          activeCodeId: codeId,
        }));
        return codeId;
      },
      updateCode: (codeId, patch) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            if (patch.parentId !== undefined && wouldCycle(project.codes, codeId, patch.parentId)) return project;
            return touch(project, {
              codes: project.codes.map((code) => (code.id === codeId ? { ...code, ...patch, name: patch.name?.trim() || code.name } : code)),
            });
          }),
        }));
      },
      deleteCode: (codeId) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            const drop = new Set<string>();
            const walk = (current: string) => {
              drop.add(current);
              for (const code of project.codes) if (code.parentId === current) walk(code.id);
            };
            walk(codeId);
            return touch(project, {
              codes: project.codes.filter((code) => !drop.has(code.id)),
              codings: project.codings.filter((coding) => !drop.has(coding.codeId)),
              memos: project.memos.map((memo) => (memo.codeId && drop.has(memo.codeId) ? { ...memo, codeId: null } : memo)),
            });
          }),
          activeCodeId: state.activeCodeId === codeId ? null : state.activeCodeId,
        }));
      },
      addCoding: (input) => {
        const id = get().activeProjectId;
        if (!id || input.end - input.start < 2) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            const duplicate = project.codings.some(
              (coding) =>
                coding.sourceId === input.sourceId &&
                coding.codeId === input.codeId &&
                coding.start === input.start &&
                coding.end === input.end,
            );
            if (duplicate) return project;
            const coding: Coding = { id: uid("cd"), note: "", ...input };
            return touch(project, { codings: [...project.codings, coding] });
          }),
        }));
      },
      removeCoding: (codingId) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, { codings: project.codings.filter((coding) => coding.id !== codingId) }),
          ),
        }));
      },
      updateCodingNote: (codingId, note) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, {
              codings: project.codings.map((coding) => (coding.id === codingId ? { ...coding, note } : coding)),
            }),
          ),
        }));
      },
      addMemo: () => {
        const id = get().activeProjectId;
        const memoId = uid("memo");
        if (!id) return memoId;
        const memo: Memo = {
          id: memoId,
          title: "Novo memo",
          body: "",
          codeId: get().activeCodeId,
          updatedAt: new Date().toISOString().slice(0, 10),
        };
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => touch(project, { memos: [memo, ...project.memos] })),
        }));
        return memoId;
      },
      updateMemo: (memoId, patch) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, {
              memos: project.memos.map((memo) =>
                memo.id === memoId ? { ...memo, ...patch, updatedAt: new Date().toISOString().slice(0, 10) } : memo,
              ),
            }),
          ),
        }));
      },
      deleteMemo: (memoId) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, { memos: project.memos.filter((memo) => memo.id !== memoId) }),
          ),
        }));
      },
      addDataset: (dataset) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, { datasets: [...project.datasets, dataset] }),
          ),
          view: "quantitativo",
        }));
      },
      addSampleDataset: () => {
        const dataset = buildSampleDataset(uid("data"));
        get().addDataset(dataset);
      },
      setColumnType: (datasetId, column, type) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, {
              datasets: project.datasets.map((dataset) =>
                dataset.id === datasetId
                  ? {
                      ...dataset,
                      columns: dataset.columns.map((item) => (item.name === column ? { ...item, type } : item)),
                    }
                  : dataset,
              ),
            }),
          ),
        }));
      },
      deleteDataset: (datasetId) => {
        const id = get().activeProjectId;
        if (!id) return;
        set((state) => ({
          projects: mapProject(state.projects, id, (project) =>
            touch(project, { datasets: project.datasets.filter((dataset) => dataset.id !== datasetId) }),
          ),
        }));
      },
    }),
    {
      name: "trama-v1",
      skipHydration: true,
      partialize: (state) => ({
        projects: state.projects,
        activeProjectId: state.activeProjectId,
        view: state.view,
        activeSourceId: state.activeSourceId,
        activeCodeId: state.activeCodeId,
      }),
    },
  ),
);

export function useActiveProject() {
  return useResearch((state) => state.projects.find((project) => project.id === state.activeProjectId) ?? null);
}
