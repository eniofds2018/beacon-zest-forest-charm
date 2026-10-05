import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as Highlighter, d as ChartColumn, i as Tags, l as FolderOpen, n as WholeWord, o as NotebookPen, s as LayoutDashboard, t as X, u as FileText } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as require_react_dom, i as DialogDescription, l as Slot, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Scatter, c as Bar, i as XAxis, l as ResponsiveContainer, n as BarChart, o as ZAxis, r as YAxis, s as CartesianGrid, t as ScatterChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B-iVcs7d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Button({ className, variant = "secondary", size = "md", asChild = false, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		type: asChild ? void 0 : type,
		className: cn("inline-flex items-center justify-center gap-2 rounded-sm font-medium disabled:opacity-50", "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", size === "md" && "h-11 px-4 text-sm", size === "sm" && "h-9 px-3 text-sm", variant === "primary" && "bg-accent text-accent-fg hover:bg-ink", variant === "secondary" && "border border-line bg-elevated text-ink hover:bg-surface", variant === "ghost" && "text-ink hover:bg-accent-soft", variant === "danger" && "bg-danger text-accent-fg", className),
		...props
	});
}
function Modal({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "modal-panel fixed top-1/2 left-1/2 z-50 max-h-[min(100%-2rem,40rem)] w-[min(100%-2rem,36rem)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl border border-line bg-elevated p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl leading-tight text-ink",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-accent-soft",
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-sm text-muted",
					children: description
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children
				})
			]
		})] })
	});
}
function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open,
		onOpenChange,
		title,
		description: body,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => onOpenChange(false),
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "danger",
				onClick: () => {
					onConfirm();
					onOpenChange(false);
				},
				children: confirmLabel
			})]
		})
	});
}
var fieldClass = "h-11 w-full rounded-sm border border-line bg-elevated px-3 text-sm text-ink placeholder:text-faint";
function Field({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(fieldClass, className),
		...props
	});
}
function Area({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-48 w-full rounded-sm border border-line bg-elevated px-3 py-3 text-sm leading-relaxed text-ink placeholder:text-faint", className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldClass, "pr-8", className),
		...props
	});
}
function Label({ children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-sm font-medium text-ink",
			children
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-sm text-muted",
			children: hint
		}) : null]
	});
}
function parseNumber(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	let value = trimmed.replace(/\s/g, "");
	if (value.includes(",") && value.includes(".")) value = value.replace(/\./g, "").replace(",", ".");
	else if (value.includes(",")) value = value.replace(",", ".");
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
}
function parseCsv(input) {
	const text = input.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
	if (!text) return [];
	const delimiter = chooseDelimiter(text.split("\n")[0] ?? "");
	const rows = [];
	let row = [];
	let cell = "";
	let quoted = false;
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (quoted) {
			if (char === "\"") {
				if (text[i + 1] === "\"") {
					cell += "\"";
					i += 1;
				} else quoted = false;
			} else cell += char;
		} else if (char === "\"") quoted = true;
		else if (char === delimiter) {
			row.push(cell.trim());
			cell = "";
		} else if (char === "\n") {
			row.push(cell.trim());
			rows.push(row);
			row = [];
			cell = "";
		} else cell += char;
	}
	if (cell.length > 0 || row.length > 0) {
		row.push(cell.trim());
		rows.push(row);
	}
	return rows.filter((line) => line.some((item) => item.length > 0));
}
function chooseDelimiter(line) {
	const semi = (line.match(/;/g) ?? []).length;
	const comma = (line.match(/,/g) ?? []).length;
	const tab = (line.match(/\t/g) ?? []).length;
	if (tab >= semi && tab >= comma && tab > 0) return "	";
	if (semi > comma) return ";";
	return ",";
}
function inferType(values) {
	const present = values.map((value) => value.trim()).filter(Boolean);
	if (present.length === 0) return "text";
	if (present.every((value) => parseNumber(value) != null)) return "number";
	const unique = new Set(present).size;
	if (unique <= 12 || unique / present.length <= .5 && unique <= 20) return "category";
	return "text";
}
function datasetFromCsv(name, csv, id) {
	const table = parseCsv(csv);
	if (table.length < 2) return { error: "A planilha precisa de um cabeçalho e ao menos uma linha." };
	const headers = uniqueHeaders(table[0] ?? []);
	const body = table.slice(1);
	const width = headers.length;
	const limited = body.slice(0, 2e3);
	return {
		dataset: {
			id,
			name,
			columns: headers.map((header, index) => ({
				name: header,
				type: inferType(limited.map((row) => row[index] ?? ""))
			})),
			rows: limited.map((line) => {
				const record = {};
				headers.forEach((header, index) => {
					record[header] = (line[index] ?? "").slice(0, 500);
				});
				return record;
			})
		},
		truncated: body.length > limited.length || body.some((line) => line.length > width + 8)
	};
}
function uniqueHeaders(headers) {
	const seen = /* @__PURE__ */ new Map();
	return headers.map((header) => {
		const base = header.trim() || "coluna";
		const count = seen.get(base) ?? 0;
		seen.set(base, count + 1);
		return count === 0 ? base : `${base}_${count + 1}`;
	});
}
function toCsv(headers, rows) {
	return `\uFEFF${[headers, ...rows].map((row) => row.map(csvEscape).join(";")).join("\n")}`;
}
function csvEscape(value) {
	if (/[;"\n]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
	return value;
}
function uid(prefix) {
	return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}
function formatNumber(value, digits = 2) {
	if (!Number.isFinite(value)) return "—";
	return value.toLocaleString("pt-BR", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function formatP(value) {
	if (!Number.isFinite(value)) return "—";
	if (value < .001) return "< 0,001";
	return value.toLocaleString("pt-BR", {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3
	});
}
function formatDate(iso) {
	const [year, month, day] = iso.split("-");
	if (!year || !month || !day) return iso;
	return `${day}/${month}/${year}`;
}
function formatPercent(value) {
	if (!Number.isFinite(value)) return "—";
	return `${Math.round(value * 100)}%`;
}
function fileSlug(name) {
	return name.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "projeto";
}
function downloadText(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
}
function collectDescendants(codes, id) {
	const drop = /* @__PURE__ */ new Set([id]);
	let grew = true;
	while (grew) {
		grew = false;
		for (const code of codes) if (code.parentId && drop.has(code.parentId) && !drop.has(code.id)) {
			drop.add(code.id);
			grew = true;
		}
	}
	return drop;
}
function wouldCycle(codes, id, parentId) {
	if (!parentId) return false;
	return collectDescendants(codes, id).has(parentId);
}
function flattenCodes(codes) {
	const ids = new Set(codes.map((code) => code.id));
	const children = /* @__PURE__ */ new Map();
	for (const code of codes) {
		const parent = code.parentId && ids.has(code.parentId) ? code.parentId : null;
		const list = children.get(parent) ?? [];
		list.push(code);
		children.set(parent, list);
	}
	for (const list of children.values()) list.sort((a, b) => a.name.localeCompare(b.name, "pt"));
	const out = [];
	const walk = (parent, depth) => {
		for (const code of children.get(parent) ?? []) {
			out.push({
				...code,
				depth
			});
			walk(code.id, depth + 1);
		}
	};
	walk(null, 0);
	return out;
}
function excerptCount(codings, codes, codeId, rollup) {
	const ids = rollup ? collectDescendants(codes, codeId) : /* @__PURE__ */ new Set([codeId]);
	return codings.filter((coding) => ids.has(coding.codeId)).length;
}
function coveredLength(codings, textLength) {
	const spans = codings.filter((coding) => coding.end > coding.start).map((coding) => ({
		start: Math.max(0, coding.start),
		end: Math.min(textLength, coding.end)
	})).sort((a, b) => a.start - b.start || a.end - b.end);
	let total = 0;
	let cursor = -1;
	for (const span of spans) {
		if (span.end <= span.start) continue;
		if (span.start >= cursor) {
			total += span.end - span.start;
			cursor = span.end;
		} else if (span.end > cursor) {
			total += span.end - cursor;
			cursor = span.end;
		}
	}
	return total;
}
function corpusCoverage(project) {
	let total = 0;
	let covered = 0;
	for (const source of project.sources) {
		total += source.text.length;
		const codings = project.codings.filter((coding) => coding.sourceId === source.id);
		covered += coveredLength(codings, source.text.length);
	}
	return {
		total,
		covered,
		pct: total ? covered / total : 0
	};
}
function buildSegments(text, codings) {
	const valid = codings.filter((coding) => coding.start >= 0 && coding.end <= text.length && coding.start < coding.end && text.slice(coding.start, coding.end) === coding.excerpt);
	const points = /* @__PURE__ */ new Set([0, text.length]);
	for (const coding of valid) {
		points.add(coding.start);
		points.add(coding.end);
	}
	const cuts = [...points].sort((a, b) => a - b);
	const segments = [];
	for (let i = 0; i < cuts.length - 1; i++) {
		const start = cuts[i];
		const end = cuts[i + 1];
		if (end <= start) continue;
		const active = valid.filter((coding) => coding.start <= start && coding.end >= end);
		segments.push({
			start,
			end,
			text: text.slice(start, end),
			codingIds: active.map((coding) => coding.id),
			codeIds: [...new Set(active.map((coding) => coding.codeId))]
		});
	}
	if (segments.length === 0 && text.length === 0) return [];
	return segments;
}
function relocateCoding(text, coding) {
	if (!coding.excerpt) return null;
	if (text.slice(coding.start, coding.end) === coding.excerpt) return coding;
	const start = text.indexOf(coding.excerpt);
	if (start < 0) return null;
	return {
		...coding,
		start,
		end: start + coding.excerpt.length
	};
}
function columnValues(dataset, name) {
	return dataset.rows.map((row) => row[name] ?? "");
}
function numericColumn(dataset, name) {
	const values = columnValues(dataset, name);
	const nums = [];
	let missing = 0;
	for (const raw of values) {
		const number = parseNumber(raw);
		if (number == null) missing += 1;
		else nums.push(number);
	}
	return {
		nums,
		missing,
		total: values.length
	};
}
function pairedNumbers(dataset, a, b) {
	const pairs = [];
	for (const row of dataset.rows) {
		const x = parseNumber(row[a] ?? "");
		const y = parseNumber(row[b] ?? "");
		if (x == null || y == null) continue;
		pairs.push({
			x,
			y
		});
	}
	return pairs;
}
function pairedCategories(dataset, a, b) {
	const xs = [];
	const ys = [];
	for (const row of dataset.rows) {
		const x = (row[a] ?? "").trim();
		const y = (row[b] ?? "").trim();
		if (!x || !y) continue;
		xs.push(x);
		ys.push(y);
	}
	return {
		xs,
		ys
	};
}
function interpretR(r) {
	if (!Number.isFinite(r)) return "Não foi possível calcular a correlação — a variação de uma das variáveis é nula ou há menos de três pares.";
	const abs = Math.abs(r);
	return `Associação ${abs < .1 ? "desprezível" : abs < .3 ? "fraca" : abs < .5 ? "moderada" : abs < .7 ? "forte" : "muito forte"} e ${r >= 0 ? "positiva" : "negativa"}.`;
}
function kindLabel(kind) {
	if (kind === "entrevista") return "Entrevista";
	if (kind === "grupo-focal") return "Grupo focal";
	if (kind === "documento") return "Documento";
	if (kind === "nota") return "Nota de campo";
	return kind;
}
function searchText(project, query) {
	const needle = query.trim().toLocaleLowerCase("pt-BR");
	if (needle.length < 2) return [];
	const hits = [];
	for (const source of project.sources) {
		const hay = source.text.toLocaleLowerCase("pt-BR");
		let from = 0;
		while (hits.length < 60) {
			const index = hay.indexOf(needle, from);
			if (index < 0) break;
			const start = Math.max(0, index - 42);
			const end = Math.min(source.text.length, index + needle.length + 42);
			hits.push({
				sourceId: source.id,
				title: source.title,
				index,
				snippet: source.text.slice(start, end).replace(/\s+/g, " "),
				matchStart: index - start,
				matchLength: needle.length
			});
			from = index + needle.length;
		}
	}
	return hits;
}
function attributeKeys(project) {
	const keys = /* @__PURE__ */ new Set();
	for (const source of project.sources) for (const attribute of source.attributes) if (attribute.key.trim()) keys.add(attribute.key.trim());
	return [...keys].sort((a, b) => a.localeCompare(b, "pt"));
}
var MARINA = `Eu entrei na pedagogia porque queria sala de aula, mas no sexto semestre a sensação é de que o curso virou uma corrida. Toda semana tem trabalho, leitura e um prazo que encosta no outro. O acúmulo de prazos me tira o sono. Eu deixo de ler com calma e passo a ler só para entregar.

O que segura é o grupo da turma. A gente divide resumo, lembra data de prova, às vezes só desabafa. Esse apoio dos pares é o que me faz continuar. Da coordenação eu quase não sinto presença: o e-mail volta três semanas depois. Quando eu procurei o serviço de psicologia do campus, a fila era de dois meses. Eu desisti e guardei isso para mim.

Tem dia em que acordo com o peito apertado antes mesmo de abrir as mensagens da disciplina. Eu chamo isso de ansiedade, não de preguiça. No fim do semestre passado eu tive um esgotamento e parei uma semana, sem conseguir entrar na sala. Minha mãe acha que eu estou exagerando. O apoio da família existe para a passagem e para o almoço, mas conversar sobre saúde ainda é difícil.

Mesmo assim eu não quero largar. Quando estou no estágio, com criança de verdade, volta a motivação. A dúvida sobre o curso aparece só quando eu estou sozinha em casa, de madrugada, olhando a grade do próximo semestre e sentindo o isolamento daquela hora.`;
var RAFAEL = `Na engenharia o volume é brutal, mas o que me derruba não é a dificuldade da matéria, é o calendário. Prova na segunda, lista na terça, laboratório na quinta. O acúmulo de prazos é tratado como rito de passagem. Quem reclama ouve que sempre foi assim.

Eu trabalho meio período numa empresa júnior. A conciliação entre trabalho e estudo é um quebra-cabeça: saio do expediente e ainda tenho três horas de cálculo. Durmo pouco. No último mês faltei duas aulas porque o corpo não levantou. Foi esgotamento, não falta de interesse. O apoio da família se resume a um telefonema no domingo, com a pergunta de se eu já estou formado.

Os amigos do laboratório são a minha rede. Sem esse apoio dos pares eu já teria trancado. A instituição oferece monitoria, e isso ajuda, mas o serviço de psicologia do campus eu nunca consegui vaga. Mandei mensagem e não houve retorno.

Não sinto um isolamento constante porque moro com dois colegas de turma. A ansiedade aparece antes das provas de cálculo: a mão sua e eu não consigo começar a lista. A motivação volta quando um projeto dá certo, quando a estrutura de palito aguenta o peso. A dúvida sobre o curso existe, principalmente quando penso em quantos formandos ainda procuram o primeiro emprego.`;
var LUCIA = `Eu tenho trinta e um anos, dois filhos e trabalho o dia inteiro numa secretaria. Estudo à noite. A conciliação entre trabalho e estudo não é frase de relatório, é a minha semana inteira. Chego na aula com fome e com a cabeça no plantão do dia seguinte.

O acúmulo de prazos me obriga a escolher o que entregar pela metade. Não é desleixo. É conta que não fecha. O apoio da família é o que viabiliza: minha irmã fica com as crianças em duas noites. Sem isso eu não permanecia.

O apoio dos pares existe, mas é frágil. Os colegas são mais jovens e a gente não divide a mesma rotina. Eu me sinto um pouco de fora. Esse isolamento não é só de conversa, é de tempo: não consigo ficar depois da aula para estudar junto. A instituição anuncia assistência estudantil, mas o edital saiu num mês em que eu estava sem margem. O serviço de psicologia do campus seria importante, e eu não tenho hora livre para enfrentar a fila.

A ansiedade eu já conheço de outros tempos. Aqui ela volta quando o boleto e o seminário caem na mesma semana. Tive um episódio de esgotamento no ano passado e precisei de atestado. A motivação está nos textos que conversam com o que eu vejo no trabalho. A dúvida sobre o curso quase não aparece. O que aparece é se o corpo aguenta até o diploma.`;
var FOCAL = `Três estudantes, sala pequena, fim de tarde. Concordam que o acúmulo de prazos é o tema que mais volta na roda. Uma voz diz que o apoio dos pares substitui a orientação que a coordenação não dá. Outra descreve a fila do serviço de psicologia do campus como simbólica: existe no papel e some na prática.

Há relato comum de ansiedade antes das apresentações e de esgotamento no fechamento do semestre. Duas pessoas nomeiam o isolamento dos fins de semana em que todo mundo entrega trabalho e ninguém se vê. A motivação aparece ligada ao estágio e à ideia de servir a alguma coisa fora da grade. A dúvida sobre o curso é dita em voz baixa, quase como traição ao esforço já feito.

A conciliação entre trabalho e estudo surge só para quem tem emprego formal. O apoio da família é descrito de dois modos que convivem: sustento material e cobrança para não fraquejar.`;
function mulberry32(seed) {
	let state = seed >>> 0;
	return () => {
		state = state + 1831565813 | 0;
		let t = Math.imul(state ^ state >>> 15, 1 | state);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function buildSampleDataset(id = "data_quest") {
	const random = mulberry32(20260312);
	const pick = (items) => items[Math.floor(random() * items.length)];
	const rows = [];
	for (let index = 1; index <= 36; index++) {
		const genero = random() < .58 ? "Feminino" : random() < .9 ? "Masculino" : "Outro";
		const area = pick([
			"Humanas",
			"Exatas",
			"Saúde",
			"Sociais aplicadas"
		]);
		const trabalha = random() < .44 ? "Sim" : "Não";
		const rendaRoll = random();
		const renda = rendaRoll < .46 ? "Até 2 SM" : rendaRoll < .84 ? "2 a 5 SM" : "Acima de 5 SM";
		let idade = 18 + Math.floor(random() * 12);
		if (random() < .18) idade = 30 + Math.floor(random() * 10);
		const semestre = 1 + Math.floor(random() * 10);
		let sono = trabalha === "Sim" ? 4.5 + random() * 2.8 : 6 + random() * 2.4;
		sono = Math.round(sono * 10) / 10;
		const estudo = Math.round(trabalha === "Sim" ? 4 + random() * 12 : 8 + random() * 16);
		let estresse = 3.2 + (trabalha === "Sim" ? 1.6 : 0) + (7.5 - sono) * .55 + random() * 1.6;
		if (area === "Exatas") estresse += .4;
		estresse = Math.round(Math.max(1, Math.min(10, estresse)) * 10) / 10;
		let satisfacao = Math.round(5.4 - estresse * .32 + random() * .8);
		satisfacao = Math.max(1, Math.min(5, satisfacao));
		const apoio = random() < (estresse >= 7 ? .48 : .2) ? "Sim" : "Não";
		rows.push({
			participante: `P${String(index).padStart(2, "0")}`,
			idade: String(idade),
			genero,
			area,
			semestre: String(semestre),
			trabalha,
			renda,
			horas_estudo: String(estudo),
			horas_sono: index === 12 ? "" : String(sono).replace(".", ","),
			estresse: String(estresse).replace(".", ","),
			satisfacao: String(satisfacao),
			apoio_psicologico: index === 7 ? "" : apoio
		});
	}
	return {
		id,
		name: "Questionário — bem-estar na graduação",
		columns: [
			{
				name: "participante",
				type: "text"
			},
			{
				name: "idade",
				type: "number"
			},
			{
				name: "genero",
				type: "category"
			},
			{
				name: "area",
				type: "category"
			},
			{
				name: "semestre",
				type: "number"
			},
			{
				name: "trabalha",
				type: "category"
			},
			{
				name: "renda",
				type: "category"
			},
			{
				name: "horas_estudo",
				type: "number"
			},
			{
				name: "horas_sono",
				type: "number"
			},
			{
				name: "estresse",
				type: "number"
			},
			{
				name: "satisfacao",
				type: "number"
			},
			{
				name: "apoio_psicologico",
				type: "category"
			}
		],
		rows
	};
}
var CODES = [
	{
		id: "code_carga",
		parentId: null,
		name: "Carga e tempo",
		description: "Pressão do calendário acadêmico e a disputa do tempo com o trabalho.",
		color: "mark-1"
	},
	{
		id: "code_prazos",
		parentId: "code_carga",
		name: "Acúmulo de prazos",
		description: "Entregas, provas e leituras que se sobrepõem.",
		color: "mark-1"
	},
	{
		id: "code_conciliacao",
		parentId: "code_carga",
		name: "Conciliação trabalho-estudo",
		description: "Quem trabalha e estuda ao mesmo tempo.",
		color: "mark-6"
	},
	{
		id: "code_apoio",
		parentId: null,
		name: "Apoio",
		description: "Redes que sustentam a permanência ou falham em sustentá-la.",
		color: "mark-7"
	},
	{
		id: "code_pares",
		parentId: "code_apoio",
		name: "Pares",
		description: "Colegas, grupos de turma e estudo conjunto.",
		color: "mark-7"
	},
	{
		id: "code_instituicao",
		parentId: "code_apoio",
		name: "Instituição",
		description: "Coordenação, assistência, monitoria e psicologia do campus.",
		color: "mark-3"
	},
	{
		id: "code_familia",
		parentId: "code_apoio",
		name: "Família",
		description: "Sustento, cuidado e os limites da conversa sobre saúde.",
		color: "mark-2"
	},
	{
		id: "code_sofrimento",
		parentId: null,
		name: "Sofrimento psíquico",
		description: "Nomes que os estudantes dão ao mal-estar.",
		color: "mark-5"
	},
	{
		id: "code_ansiedade",
		parentId: "code_sofrimento",
		name: "Ansiedade",
		description: "Aperto e antecipação, sobretudo antes da avaliação.",
		color: "mark-5"
	},
	{
		id: "code_esgotamento",
		parentId: "code_sofrimento",
		name: "Esgotamento",
		description: "Parada, falta, atestado, corpo que não levanta.",
		color: "mark-2"
	},
	{
		id: "code_isolamento",
		parentId: "code_sofrimento",
		name: "Isolamento",
		description: "Estar só na entrega, fora do grupo, de madrugada.",
		color: "mark-8"
	},
	{
		id: "code_sentido",
		parentId: null,
		name: "Sentido e permanência",
		description: "Por que ficar no curso e por que duvidar.",
		color: "mark-4"
	},
	{
		id: "code_motivacao",
		parentId: "code_sentido",
		name: "Motivação",
		description: "Estágio, projeto ou texto que encontra a prática.",
		color: "mark-4"
	},
	{
		id: "code_duvida",
		parentId: "code_sentido",
		name: "Dúvida sobre o curso",
		description: "Hesitação, mercado e medo de largar.",
		color: "mark-6"
	}
];
function createDemoProject() {
	const sources = [
		{
			id: "src_marina",
			title: "Entrevista — Marina",
			kind: "entrevista",
			participant: "Marina",
			date: "2026-03-04",
			text: MARINA,
			attributes: [
				{
					key: "Gênero",
					value: "Feminino"
				},
				{
					key: "Curso",
					value: "Pedagogia"
				},
				{
					key: "Idade",
					value: "22"
				},
				{
					key: "Trabalha",
					value: "Não"
				}
			]
		},
		{
			id: "src_rafael",
			title: "Entrevista — Rafael",
			kind: "entrevista",
			participant: "Rafael",
			date: "2026-03-06",
			text: RAFAEL,
			attributes: [
				{
					key: "Gênero",
					value: "Masculino"
				},
				{
					key: "Curso",
					value: "Engenharia"
				},
				{
					key: "Idade",
					value: "24"
				},
				{
					key: "Trabalha",
					value: "Sim"
				}
			]
		},
		{
			id: "src_lucia",
			title: "Entrevista — Lúcia",
			kind: "entrevista",
			participant: "Lúcia",
			date: "2026-03-11",
			text: LUCIA,
			attributes: [
				{
					key: "Gênero",
					value: "Feminino"
				},
				{
					key: "Curso",
					value: "Serviço Social"
				},
				{
					key: "Idade",
					value: "31"
				},
				{
					key: "Trabalha",
					value: "Sim"
				}
			]
		},
		{
			id: "src_focal",
			title: "Grupo focal — turma mista",
			kind: "grupo-focal",
			participant: "Três estudantes",
			date: "2026-03-18",
			text: FOCAL,
			attributes: [
				{
					key: "Gênero",
					value: "Misto"
				},
				{
					key: "Curso",
					value: "Vários"
				},
				{
					key: "Trabalha",
					value: "Misto"
				}
			]
		}
	];
	return {
		id: "proj_demo",
		name: "Bem-estar na graduação",
		description: "Estudo misto, ilustrativo, com entrevistas, um grupo focal e um questionário sobre carga acadêmica, apoio e permanência. Substitua pelo seu material quando quiser.",
		updatedAt: "2026-03-18",
		sources,
		codes: CODES,
		codings: [
			{
				sourceId: "src_marina",
				codeId: "code_prazos",
				excerpt: "O acúmulo de prazos me tira o sono."
			},
			{
				sourceId: "src_marina",
				codeId: "code_pares",
				excerpt: "Esse apoio dos pares é o que me faz continuar."
			},
			{
				sourceId: "src_marina",
				codeId: "code_instituicao",
				excerpt: "Quando eu procurei o serviço de psicologia do campus, a fila era de dois meses."
			},
			{
				sourceId: "src_marina",
				codeId: "code_ansiedade",
				excerpt: "Eu chamo isso de ansiedade, não de preguiça.",
				note: "Categoria in vivo: ela recusa o rótulo de preguiça."
			},
			{
				sourceId: "src_marina",
				codeId: "code_esgotamento",
				excerpt: "eu tive um esgotamento e parei uma semana"
			},
			{
				sourceId: "src_marina",
				codeId: "code_familia",
				excerpt: "O apoio da família existe para a passagem e para o almoço"
			},
			{
				sourceId: "src_marina",
				codeId: "code_motivacao",
				excerpt: "Quando estou no estágio, com criança de verdade, volta a motivação."
			},
			{
				sourceId: "src_marina",
				codeId: "code_duvida",
				excerpt: "A dúvida sobre o curso aparece só quando eu estou sozinha em casa"
			},
			{
				sourceId: "src_marina",
				codeId: "code_isolamento",
				excerpt: "sentindo o isolamento daquela hora"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_prazos",
				excerpt: "O acúmulo de prazos é tratado como rito de passagem."
			},
			{
				sourceId: "src_rafael",
				codeId: "code_conciliacao",
				excerpt: "A conciliação entre trabalho e estudo é um quebra-cabeça"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_esgotamento",
				excerpt: "Foi esgotamento, não falta de interesse."
			},
			{
				sourceId: "src_rafael",
				codeId: "code_familia",
				excerpt: "O apoio da família se resume a um telefonema no domingo"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_pares",
				excerpt: "Sem esse apoio dos pares eu já teria trancado."
			},
			{
				sourceId: "src_rafael",
				codeId: "code_instituicao",
				excerpt: "o serviço de psicologia do campus eu nunca consegui vaga"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_isolamento",
				excerpt: "Não sinto um isolamento constante porque moro com dois colegas de turma.",
				note: "Caso negativo: o isolamento é negado pela moradia compartilhada."
			},
			{
				sourceId: "src_rafael",
				codeId: "code_ansiedade",
				excerpt: "A ansiedade aparece antes das provas de cálculo"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_motivacao",
				excerpt: "A motivação volta quando um projeto dá certo"
			},
			{
				sourceId: "src_rafael",
				codeId: "code_duvida",
				excerpt: "A dúvida sobre o curso existe"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_conciliacao",
				excerpt: "A conciliação entre trabalho e estudo não é frase de relatório, é a minha semana inteira."
			},
			{
				sourceId: "src_lucia",
				codeId: "code_prazos",
				excerpt: "O acúmulo de prazos me obriga a escolher o que entregar pela metade."
			},
			{
				sourceId: "src_lucia",
				codeId: "code_familia",
				excerpt: "O apoio da família é o que viabiliza"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_pares",
				excerpt: "O apoio dos pares existe, mas é frágil"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_isolamento",
				excerpt: "Esse isolamento não é só de conversa, é de tempo"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_instituicao",
				excerpt: "O serviço de psicologia do campus seria importante"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_ansiedade",
				excerpt: "A ansiedade eu já conheço de outros tempos."
			},
			{
				sourceId: "src_lucia",
				codeId: "code_esgotamento",
				excerpt: "Tive um episódio de esgotamento no ano passado"
			},
			{
				sourceId: "src_lucia",
				codeId: "code_motivacao",
				excerpt: "A motivação está nos textos que conversam com o que eu vejo no trabalho."
			},
			{
				sourceId: "src_lucia",
				codeId: "code_duvida",
				excerpt: "A dúvida sobre o curso quase não aparece.",
				note: "Caso negativo: a dúvida não é sobre o curso, é sobre o corpo aguentar."
			},
			{
				sourceId: "src_focal",
				codeId: "code_prazos",
				excerpt: "o acúmulo de prazos é o tema que mais volta"
			},
			{
				sourceId: "src_focal",
				codeId: "code_pares",
				excerpt: "o apoio dos pares substitui a orientação"
			},
			{
				sourceId: "src_focal",
				codeId: "code_instituicao",
				excerpt: "descreve a fila do serviço de psicologia do campus como simbólica"
			},
			{
				sourceId: "src_focal",
				codeId: "code_ansiedade",
				excerpt: "ansiedade antes das apresentações"
			},
			{
				sourceId: "src_focal",
				codeId: "code_esgotamento",
				excerpt: "esgotamento no fechamento do semestre"
			},
			{
				sourceId: "src_focal",
				codeId: "code_isolamento",
				excerpt: "o isolamento dos fins de semana"
			},
			{
				sourceId: "src_focal",
				codeId: "code_motivacao",
				excerpt: "A motivação aparece ligada ao estágio"
			},
			{
				sourceId: "src_focal",
				codeId: "code_duvida",
				excerpt: "A dúvida sobre o curso é dita em voz baixa"
			},
			{
				sourceId: "src_focal",
				codeId: "code_conciliacao",
				excerpt: "A conciliação entre trabalho e estudo surge só para quem tem emprego formal."
			},
			{
				sourceId: "src_focal",
				codeId: "code_familia",
				excerpt: "O apoio da família é descrito de dois modos"
			}
		].map((passage, index) => {
			const source = sources.find((item) => item.id === passage.sourceId);
			if (!source) throw new Error(`Fonte ausente: ${passage.sourceId}`);
			const start = source.text.indexOf(passage.excerpt);
			if (start < 0) throw new Error(`Trecho ausente em ${passage.sourceId}: ${passage.excerpt}`);
			return {
				id: `cd_${index + 1}`,
				sourceId: passage.sourceId,
				codeId: passage.codeId,
				start,
				end: start + passage.excerpt.length,
				excerpt: passage.excerpt,
				note: passage.note ?? ""
			};
		}),
		memos: [
			{
				id: "memo_calendario",
				title: "Sofrimento como efeito do calendário",
				codeId: "code_sofrimento",
				updatedAt: "2026-03-18",
				body: "O mal-estar quase não aparece como traço de personalidade. Ele é narrado quando um prazo encosta no outro e a resposta da instituição chega tarde. No questionário, vale ver se o estresse mais alto acompanha quem trabalha e dorme pouco."
			},
			{
				id: "memo_pares",
				title: "Pares no lugar da coordenação",
				codeId: "code_pares",
				updatedAt: "2026-03-18",
				body: "O grupo de colegas funciona como infraestrutura informal: lembra data, divide resumo, autoriza o desabafo. Onde o horário não coincide, como no caso de quem trabalha o dia inteiro, essa rede enfraquece e o isolamento vira falta de tempo."
			},
			{
				id: "memo_proximo",
				title: "Próximo passo analítico",
				codeId: null,
				updatedAt: "2026-03-18",
				body: "Separar os casos negativos — quem nega isolamento ou dúvida — antes de fechar o tema da permanência. No quantitativo, cruzar trabalha com apoio psicológico e correlacionar horas de sono com estresse."
			}
		],
		datasets: [buildSampleDataset()]
	};
}
var SOURCE_KINDS = [
	{
		id: "entrevista",
		label: "Entrevista"
	},
	{
		id: "grupo-focal",
		label: "Grupo focal"
	},
	{
		id: "documento",
		label: "Documento"
	},
	{
		id: "nota",
		label: "Nota de campo"
	}
];
var MARKS = [
	{
		id: "mark-1",
		label: "Tinta"
	},
	{
		id: "mark-2",
		label: "Barro"
	},
	{
		id: "mark-3",
		label: "Ardósia"
	},
	{
		id: "mark-4",
		label: "Oliva"
	},
	{
		id: "mark-5",
		label: "Ameixa"
	},
	{
		id: "mark-6",
		label: "Bronze"
	},
	{
		id: "mark-7",
		label: "Pinho"
	},
	{
		id: "mark-8",
		label: "Grafite"
	}
];
function isMarkId(value) {
	return MARKS.some((mark) => mark.id === value);
}
var demo = createDemoProject();
function mapProject(projects, id, fn) {
	return projects.map((project) => project.id === id ? fn(project) : project);
}
function touch(project, patch) {
	return {
		...project,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	};
}
var useResearch = create()(persist((set, get) => ({
	projects: [demo],
	activeProjectId: demo.id,
	view: "painel",
	activeSourceId: demo.sources[0]?.id ?? null,
	activeCodeId: null,
	focus: null,
	setView: (view) => set({ view }),
	setActiveProject: (id) => {
		set({
			activeProjectId: id,
			activeSourceId: get().projects.find((item) => item.id === id)?.sources[0]?.id ?? null,
			activeCodeId: null,
			focus: null,
			view: "painel"
		});
	},
	setActiveSource: (id) => set({
		activeSourceId: id,
		focus: null
	}),
	setActiveCode: (id) => set({ activeCodeId: id }),
	jumpTo: (sourceId, index) => set({
		view: "leitura",
		activeSourceId: sourceId,
		focus: {
			sourceId,
			index
		}
	}),
	clearFocus: () => set({ focus: null }),
	createProject: (name, description) => {
		const project = {
			id: uid("proj"),
			name: name.trim() || "Projeto sem título",
			description: description.trim(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			sources: [],
			codes: [],
			codings: [],
			memos: [],
			datasets: []
		};
		set((state) => ({
			projects: [project, ...state.projects],
			activeProjectId: project.id,
			activeSourceId: null,
			activeCodeId: null,
			focus: null,
			view: "painel"
		}));
	},
	updateProjectMeta: (patch) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, {
			name: patch.name?.trim() || project.name,
			description: patch.description ?? project.description
		})) }));
	},
	deleteProject: (id) => set((state) => {
		const projects = state.projects.filter((project) => project.id !== id);
		const active = state.activeProjectId === id ? projects[0]?.id ?? null : state.activeProjectId;
		return {
			projects,
			activeProjectId: active,
			activeSourceId: projects.find((project) => project.id === active)?.sources[0]?.id ?? null,
			view: projects.length === 0 ? "projetos" : state.view
		};
	}),
	importProject: (project) => set((state) => {
		return {
			projects: state.projects.some((item) => item.id === project.id) ? state.projects.map((item) => item.id === project.id ? project : item) : [project, ...state.projects],
			activeProjectId: project.id,
			activeSourceId: project.sources[0]?.id ?? null,
			view: "painel",
			focus: null
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
			view: "painel"
		}));
	},
	addSource: (partial) => {
		const id = get().activeProjectId;
		const sourceId = uid("src");
		if (!id) return sourceId;
		const source = {
			id: sourceId,
			title: partial?.title?.trim() || "Fonte sem título",
			kind: partial?.kind ?? "documento",
			participant: partial?.participant ?? "",
			date: partial?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			text: partial?.text ?? "",
			attributes: partial?.attributes ?? []
		};
		set((state) => ({
			projects: mapProject(state.projects, id, (project) => touch(project, { sources: [...project.sources, source] })),
			activeSourceId: sourceId,
			view: "fontes"
		}));
		return sourceId;
	},
	updateSource: (sourceId, patch) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => {
			const sources = project.sources.map((source) => source.id === sourceId ? {
				...source,
				...patch,
				attributes: patch.attributes ?? source.attributes
			} : source);
			const next = sources.find((source) => source.id === sourceId);
			return touch(project, {
				sources,
				codings: next ? project.codings.flatMap((coding) => {
					if (coding.sourceId !== sourceId) return [coding];
					const moved = relocateCoding(next.text, coding);
					return moved ? [moved] : [];
				}) : project.codings
			});
		}) }));
	},
	deleteSource: (sourceId) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({
			projects: mapProject(state.projects, id, (project) => touch(project, {
				sources: project.sources.filter((source) => source.id !== sourceId),
				codings: project.codings.filter((coding) => coding.sourceId !== sourceId)
			})),
			activeSourceId: state.activeSourceId === sourceId ? null : state.activeSourceId
		}));
	},
	addCode: (input) => {
		const id = get().activeProjectId;
		const name = input.name.trim();
		if (!id || !name) return null;
		const codeId = uid("code");
		set((state) => ({
			projects: mapProject(state.projects, id, (project) => {
				const color = input.color ?? MARKS[project.codes.length % MARKS.length].id;
				const code = {
					id: codeId,
					name,
					parentId: input.parentId,
					description: input.description?.trim() ?? "",
					color
				};
				return touch(project, { codes: [...project.codes, code] });
			}),
			activeCodeId: codeId
		}));
		return codeId;
	},
	updateCode: (codeId, patch) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => {
			if (patch.parentId !== void 0 && wouldCycle(project.codes, codeId, patch.parentId)) return project;
			return touch(project, { codes: project.codes.map((code) => code.id === codeId ? {
				...code,
				...patch,
				name: patch.name?.trim() || code.name
			} : code) });
		}) }));
	},
	deleteCode: (codeId) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({
			projects: mapProject(state.projects, id, (project) => {
				const drop = /* @__PURE__ */ new Set();
				const walk = (current) => {
					drop.add(current);
					for (const code of project.codes) if (code.parentId === current) walk(code.id);
				};
				walk(codeId);
				return touch(project, {
					codes: project.codes.filter((code) => !drop.has(code.id)),
					codings: project.codings.filter((coding) => !drop.has(coding.codeId)),
					memos: project.memos.map((memo) => memo.codeId && drop.has(memo.codeId) ? {
						...memo,
						codeId: null
					} : memo)
				});
			}),
			activeCodeId: state.activeCodeId === codeId ? null : state.activeCodeId
		}));
	},
	addCoding: (input) => {
		const id = get().activeProjectId;
		if (!id || input.end - input.start < 2) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => {
			if (project.codings.some((coding) => coding.sourceId === input.sourceId && coding.codeId === input.codeId && coding.start === input.start && coding.end === input.end)) return project;
			const coding = {
				id: uid("cd"),
				note: "",
				...input
			};
			return touch(project, { codings: [...project.codings, coding] });
		}) }));
	},
	removeCoding: (codingId) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { codings: project.codings.filter((coding) => coding.id !== codingId) })) }));
	},
	updateCodingNote: (codingId, note) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { codings: project.codings.map((coding) => coding.id === codingId ? {
			...coding,
			note
		} : coding) })) }));
	},
	addMemo: () => {
		const id = get().activeProjectId;
		const memoId = uid("memo");
		if (!id) return memoId;
		const memo = {
			id: memoId,
			title: "Novo memo",
			body: "",
			codeId: get().activeCodeId,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		};
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { memos: [memo, ...project.memos] })) }));
		return memoId;
	},
	updateMemo: (memoId, patch) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { memos: project.memos.map((memo) => memo.id === memoId ? {
			...memo,
			...patch,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		} : memo) })) }));
	},
	deleteMemo: (memoId) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { memos: project.memos.filter((memo) => memo.id !== memoId) })) }));
	},
	addDataset: (dataset) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({
			projects: mapProject(state.projects, id, (project) => touch(project, { datasets: [...project.datasets, dataset] })),
			view: "quantitativo"
		}));
	},
	addSampleDataset: () => {
		const dataset = buildSampleDataset(uid("data"));
		get().addDataset(dataset);
	},
	setColumnType: (datasetId, column, type) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { datasets: project.datasets.map((dataset) => dataset.id === datasetId ? {
			...dataset,
			columns: dataset.columns.map((item) => item.name === column ? {
				...item,
				type
			} : item)
		} : dataset) })) }));
	},
	deleteDataset: (datasetId) => {
		const id = get().activeProjectId;
		if (!id) return;
		set((state) => ({ projects: mapProject(state.projects, id, (project) => touch(project, { datasets: project.datasets.filter((dataset) => dataset.id !== datasetId) })) }));
	}
}), {
	name: "trama-v1",
	skipHydration: true,
	partialize: (state) => ({
		projects: state.projects,
		activeProjectId: state.activeProjectId,
		view: state.view,
		activeSourceId: state.activeSourceId,
		activeCodeId: state.activeCodeId
	})
}));
function useActiveProject() {
	return useResearch((state) => state.projects.find((project) => project.id === state.activeProjectId) ?? null);
}
function CodesView() {
	const project = useActiveProject();
	const activeCodeId = useResearch((state) => state.activeCodeId);
	const setActiveCode = useResearch((state) => state.setActiveCode);
	const addCode = useResearch((state) => state.addCode);
	const updateCode = useResearch((state) => state.updateCode);
	const deleteCode = useResearch((state) => state.deleteCode);
	const [name, setName] = (0, import_react.useState)("");
	const [parentId, setParentId] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!project) return null;
	const tree = flattenCodes(project.codes);
	const selected = project.codes.find((code) => code.id === activeCodeId) ?? tree[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[18rem_minmax(0,1fr)] md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Códigos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex flex-col gap-2 rounded-xl border border-line bg-elevated p-3",
					onSubmit: (event) => {
						event.preventDefault();
						const id = addCode({
							name,
							parentId: parentId || null
						});
						if (id) {
							setName("");
							setActiveCode(id);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Nome do código",
							"aria-label": "Nome do código"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: parentId,
							onChange: (event) => setParentId(event.target.value),
							"aria-label": "Código pai",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Sem código pai"
							}), tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: code.id,
								children: ["· ".repeat(code.depth), code.name]
							}, code.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							type: "submit",
							children: "Adicionar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3",
					children: [tree.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "O livro de códigos está vazio."
					}) : null, tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveCode(code.id),
						className: `flex min-h-11 w-full items-center gap-2 rounded-sm px-2 text-left text-sm ${code.id === selected?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`,
						style: { paddingLeft: `${8 + code.depth * 14}px` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-3 shrink-0 rounded-xs",
								style: { backgroundColor: `var(--color-${code.color})` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate",
								children: code.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums opacity-80",
								children: excerptCount(project.codings, project.codes, code.id, true)
							})
						]
					}) }, code.id))]
				})
			] }),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-elevated p-4",
				onSubmit: (event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					updateCode(selected.id, {
						name: String(data.get("name") ?? ""),
						description: String(data.get("description") ?? ""),
						parentId: String(data.get("parent") ?? "") || null,
						color: String(data.get("color") ?? selected.color)
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: selected.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							excerptCount(project.codings, project.codes, selected.id, false),
							" trechos diretos ·",
							" ",
							excerptCount(project.codings, project.codes, selected.id, true),
							" com subcódigos"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "name",
							defaultValue: selected.name
						}, `${selected.id}-name`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "description",
							defaultValue: selected.description,
							className: "min-h-28"
						}, `${selected.id}-desc`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Código pai" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							name: "parent",
							defaultValue: selected.parentId ?? "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Sem código pai"
							}), tree.filter((code) => code.id !== selected.id && !wouldCycle(project.codes, selected.id, code.id)).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: code.id,
								children: ["· ".repeat(code.depth), code.name]
							}, code.id))]
						}, `${selected.id}-parent`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-2 text-sm font-medium",
							children: "Cor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: MARKS.map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "peer sr-only",
									type: "radio",
									name: "color",
									value: mark.id,
									defaultChecked: selected.color === mark.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-11 rounded-sm peer-checked:outline peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline-ink",
									style: { backgroundColor: `var(--color-${mark.id})` },
									title: mark.label
								})]
							}, mark.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							type: "submit",
							children: "Salvar código"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => setConfirm(true),
							children: "Excluir"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Crie o primeiro código para organizar os temas."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				title: "Excluir código?",
				body: "Subcódigos e os trechos ligados a eles também saem.",
				confirmLabel: "Excluir código",
				onConfirm: () => selected && deleteCode(selected.id)
			})
		]
	});
}
function useMounted() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return mounted;
}
function ChartFrame({ className, children }) {
	const mounted = useMounted();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-72 w-full min-w-0", className),
		children: mounted ? children : null
	});
}
var tooltipStyle = {
	background: "var(--color-elevated)",
	border: "1px solid var(--color-line)",
	borderRadius: 8,
	color: "var(--color-ink)",
	fontSize: 13
};
var STOPWORDS = new Set(`a o os as um uma uns umas de da do das dos e em no na nos nas num numa dum duma
por para pra pro com sem sob sobre entre até ate após apos desde
que quem qual quais cujo cuja cujos cujas se
não nao sim ja já tambem também mais muito pouco bem mal apenas só so
é ser estar foi eram era sou somos são sao estamos estão estao esta está
estou este esse essa esses essas isso aquilo aquele aquela aqueles aquelas
como quando onde porque porquê pois então entao assim ainda
lá la aqui ali aí ai
tem têm tinha ter sido há ha vai vão vao ir
pelo pela pelos pelas
ao à às aos
ele ela eles elas eu tu voce você voces vocês me mim lhe lhes
meu minha meus minhas teu tua seus seu sua suas nosso nossa nossos nossas
dele dela deles delas
gente coisa coisas tipo né ne tá ta tô to
mesmo mesma mesmos mesmas outro outra outros outras
todo toda todos todas cada
pode podem podia poder
vai vou vamos foram seria
hoje agora sempre nunca
the and for with from this that`.split(/\s+/).filter(Boolean));
function tokenize(text) {
	return (text.toLocaleLowerCase("pt-BR").match(/[\p{L}\p{N}]+/gu) ?? []).filter((word) => word.length >= 3 && !/^\d+$/u.test(word) && !STOPWORDS.has(word));
}
function wordFrequencies(text, limit = 40) {
	const counts = /* @__PURE__ */ new Map();
	for (const word of tokenize(text)) counts.set(word, (counts.get(word) ?? 0) + 1);
	return [...counts.entries()].map(([word, count]) => ({
		word,
		count
	})).sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, "pt")).slice(0, limit);
}
function wordCount(text) {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).length;
}
function FrequencyView() {
	const project = useActiveProject();
	const [scope, setScope] = (0, import_react.useState)("corpus");
	const [codeId, setCodeId] = (0, import_react.useState)("");
	const tree = project ? flattenCodes(project.codes) : [];
	const activeCode = codeId || tree[0]?.id || "";
	const text = (0, import_react.useMemo)(() => {
		if (!project) return "";
		if (scope === "corpus") return project.sources.map((source) => source.text).join("\n");
		if (scope.startsWith("src:")) return project.sources.find((source) => source.id === scope.slice(4))?.text ?? "";
		const ids = activeCode ? collectDescendants(project.codes, activeCode) : /* @__PURE__ */ new Set();
		return project.codings.filter((coding) => ids.has(coding.codeId)).map((coding) => coding.excerpt).join("\n");
	}, [
		project,
		scope,
		activeCode
	]);
	if (!project) return null;
	const rows = wordFrequencies(text, 40);
	const max = rows[0]?.count ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Frequência de palavras"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Palavras com pelo menos três letras, sem artigos e pronomes. Útil para ver o que insiste no corpus ou dentro de um código."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-11 rounded-sm border border-line bg-elevated px-3 text-sm",
					value: scope,
					onChange: (event) => setScope(event.target.value),
					"aria-label": "Recorte",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "corpus",
							children: "Todo o corpus"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "codigo",
							children: "Trechos de um código"
						}),
						project.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: `src:${source.id}`,
							children: source.title
						}, source.id))
					]
				}), scope === "codigo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 rounded-sm border border-line bg-elevated px-3 text-sm",
					value: activeCode,
					onChange: (event) => setCodeId(event.target.value),
					"aria-label": "Código",
					children: tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: code.id,
						children: ["· ".repeat(code.depth), code.name]
					}, code.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex items-center text-sm text-muted",
					children: rows.length === 0 ? "Sem palavras nesse recorte." : `${rows.length} palavras listadas`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-line bg-elevated p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Nuvem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap items-end gap-x-3 gap-y-2",
						"aria-hidden": "true",
						children: rows.slice(0, 36).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display leading-none text-ink",
							style: { fontSize: `${.9 + row.count / max * 1.6}rem` },
							children: row.word
						}, row.word))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-line bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Contagem"
						}),
						rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Nada para contar."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: rows.slice(0, 12),
									layout: "vertical",
									margin: {
										left: 8,
										right: 8,
										top: 8,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-line)",
											horizontal: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											allowDecimals: false,
											tick: {
												fill: "var(--color-muted)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											type: "category",
											dataKey: "word",
											width: 96,
											tick: {
												fill: "var(--color-ink)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "count",
											name: "Ocorrências",
											fill: "var(--color-accent)",
											radius: [
												0,
												4,
												4,
												0
											],
											isAnimationActive: false
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 max-h-64 overflow-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-1 font-medium",
										children: "Palavra"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-1 text-right font-medium",
										children: "Vezes"
									})]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1",
										children: row.word
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1 text-right tabular-nums",
										children: row.count
									})]
								}, row.word)) })]
							})
						})
					]
				})]
			})
		]
	});
}
function MemosView() {
	const project = useActiveProject();
	const addMemo = useResearch((state) => state.addMemo);
	const updateMemo = useResearch((state) => state.updateMemo);
	const deleteMemo = useResearch((state) => state.deleteMemo);
	const [openId, setOpenId] = (0, import_react.useState)(project?.memos[0]?.id ?? null);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const memo = project?.memos.find((item) => item.id === openId) ?? null;
	(0, import_react.useEffect)(() => {
		if (!project) return;
		if (!openId || !project.memos.some((item) => item.id === openId)) setOpenId(project.memos[0]?.id ?? null);
	}, [project, openId]);
	if (!project) return null;
	const tree = flattenCodes(project.codes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[16rem_minmax(0,1fr)] md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Memos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "sm",
					onClick: () => {
						const id = addMemo();
						setOpenId(id);
					},
					children: "Novo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 flex flex-col gap-1",
				children: [project.memos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Nenhum memo. Use-os para hipóteses e decisões analíticas."
				}) : null, project.memos.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpenId(item.id),
					className: `flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left ${item.id === memo?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-full truncate text-sm font-medium",
						children: item.title || "Sem título"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs opacity-80",
						children: item.updatedAt ? formatDate(item.updatedAt) : ""
					})]
				}) }, item.id))]
			})] }),
			memo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-elevated p-4",
				onSubmit: (event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					updateMemo(memo.id, {
						title: String(data.get("title") ?? ""),
						body: String(data.get("body") ?? ""),
						codeId: String(data.get("code") ?? "") || null
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "title",
						defaultValue: memo.title
					}, `${memo.id}-title`),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ligado a um código" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							name: "code",
							defaultValue: memo.codeId ?? "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Nenhum"
							}), tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: code.id,
								children: ["· ".repeat(code.depth), code.name]
							}, code.id))]
						}, `${memo.id}-code`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Texto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "body",
							defaultValue: memo.body,
							className: "min-h-64"
						}, `${memo.id}-body`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							type: "submit",
							children: "Salvar memo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => setConfirm(true),
							children: "Excluir"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Crie um memo para registrar uma hipótese, uma dúvida ou o que fazer a seguir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				title: "Excluir memo?",
				body: "O texto do memo sai do projeto. As codificações permanecem.",
				confirmLabel: "Excluir memo",
				onConfirm: () => memo && deleteMemo(memo.id)
			})
		]
	});
}
function OverviewView() {
	const project = useActiveProject();
	const setView = useResearch((state) => state.setView);
	if (!project) return null;
	const coverage = corpusCoverage(project);
	const words = project.sources.reduce((sum, source) => sum + wordCount(source.text), 0);
	const bars = project.codes.filter((code) => !project.codes.some((other) => other.parentId === code.id)).map((code) => ({
		label: code.name,
		count: project.codings.filter((coding) => coding.codeId === code.id).length
	})).filter((item) => item.count > 0).sort((a, b) => b.count - a.count).slice(0, 8);
	const sourceRows = project.sources.map((source) => {
		const codings = project.codings.filter((coding) => coding.sourceId === source.id);
		const union = coveredLength(codings, source.text.length);
		return {
			id: source.id,
			title: source.title,
			pct: source.text.length ? union / source.text.length : 0,
			excerpts: codings.length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl leading-tight text-ink",
							children: project.name
						}),
						project.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-base text-muted",
							children: project.description
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => setView("leitura"),
					children: "Abrir leitura"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Fontes",
						value: String(project.sources.length),
						hint: `${words.toLocaleString("pt-BR")} palavras`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Códigos",
						value: String(project.codes.length),
						hint: `${project.codings.length} trechos`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Corpus codificado",
						value: formatPercent(coverage.pct),
						hint: "união dos trechos, sem contar duas vezes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Questionário",
						value: String(project.datasets.reduce((sum, dataset) => sum + dataset.rows.length, 0)),
						hint: project.datasets.length === 1 ? "1 base" : `${project.datasets.length} bases`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-line bg-elevated p-4 lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Códigos com mais trechos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Contagem direta, sem somar os códigos-pai."
						}),
						bars.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: "Ainda não há trechos codificados. Abra a leitura e selecione um pedaço do texto."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
							className: "mt-3 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: bars,
									layout: "vertical",
									margin: {
										left: 8,
										right: 8,
										top: 8,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-line)",
											horizontal: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											allowDecimals: false,
											tick: {
												fill: "var(--color-muted)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											type: "category",
											dataKey: "label",
											width: 128,
											tick: {
												fill: "var(--color-ink)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: tooltipStyle,
											cursor: { fill: "var(--color-accent-soft)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "count",
											name: "Trechos",
											fill: "var(--color-accent)",
											radius: [
												0,
												4,
												4,
												0
											],
											isAnimationActive: false
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-line bg-elevated p-4 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Cobertura por fonte"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 flex flex-col gap-4",
						children: [sourceRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "Nenhuma fonte neste projeto."
						}) : null, sourceRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 truncate",
								children: row.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 tabular-nums text-muted",
								children: [
									formatPercent(row.pct),
									" · ",
									row.excerpts
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2 rounded-full bg-accent-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 rounded-full bg-accent",
								style: { width: `${Math.round(row.pct * 100)}%` }
							})
						})] }, row.id))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-elevated p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Como analisar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-sm bg-surface p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "1. Leia e marque."
							}), " Selecione um trecho e aplique um código. Trechos podem receber mais de um código."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-sm bg-surface p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "2. Consulte."
							}), " Recupere tudo o que foi marcado, cruze códigos e fontes, ou agrupe por um atributo do caso."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-sm bg-surface p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "3. Meça."
							}), " Importe um CSV ou use o questionário de exemplo: média, frequência, qui-quadrado e correlação."]
						})
					]
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 font-display text-3xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-faint",
				children: hint
			})
		]
	});
}
function ProjectsView() {
	const projects = useResearch((state) => state.projects);
	const activeId = useResearch((state) => state.activeProjectId);
	const setActiveProject = useResearch((state) => state.setActiveProject);
	const createProject = useResearch((state) => state.createProject);
	const deleteProject = useResearch((state) => state.deleteProject);
	const restoreDemo = useResearch((state) => state.restoreDemo);
	const updateProjectMeta = useResearch((state) => state.updateProjectMeta);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [confirmDemo, setConfirmDemo] = (0, import_react.useState)(false);
	const active = projects.find((project) => project.id === activeId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-4 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Projetos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-base text-muted",
				children: "Cada projeto junta fontes, códigos, memos e questionários. O exemplo “Bem-estar na graduação” já vem codificado para você ver a leitura, as consultas e a estatística."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-elevated p-4",
				onSubmit: (event) => {
					event.preventDefault();
					if (!name.trim()) return;
					createProject(name, description);
					setName("");
					setDescription("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Novo projeto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Ex.: Entrevistas da dissertação"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							className: "min-h-24",
							value: description,
							onChange: (event) => setDescription(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "primary",
						type: "submit",
						children: "Criar projeto em branco"
					})
				]
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-elevated p-4",
				onSubmit: (event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					updateProjectMeta({
						name: String(data.get("name") ?? ""),
						description: String(data.get("description") ?? "")
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Projeto aberto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "name",
							defaultValue: active.name
						}, `${active.id}-name`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "description",
							defaultValue: active.description,
							className: "min-h-24"
						}, `${active.id}-desc`)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "primary",
						type: "submit",
						children: "Salvar dados do projeto"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-2 rounded-xl border border-line bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: project.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									project.sources.length,
									" fontes · ",
									project.codes.length,
									" códigos · ",
									project.codings.length,
									" trechos"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setActiveProject(project.id),
							variant: project.id === activeId ? "primary" : "secondary",
							children: project.id === activeId ? "Aberto" : "Abrir"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => setPendingDelete(project.id),
							children: "Excluir"
						})
					]
				}, project.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Exemplo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Restaura o projeto de bem-estar na graduação, com entrevistas já codificadas e um questionário de 36 respostas. Se você editou esse exemplo, a versão atual é substituída."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						onClick: () => setConfirmDemo(true),
						children: "Restaurar exemplo"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: pendingDelete != null,
				onOpenChange: (open) => !open && setPendingDelete(null),
				title: "Excluir projeto?",
				body: "Fontes, códigos, memos e questionários desse projeto saem deste navegador.",
				confirmLabel: "Excluir projeto",
				onConfirm: () => pendingDelete && deleteProject(pendingDelete)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmDemo,
				onOpenChange: setConfirmDemo,
				title: "Restaurar o exemplo?",
				body: "O projeto “Bem-estar na graduação” volta ao estado original. Os outros projetos ficam como estão.",
				confirmLabel: "Restaurar",
				onConfirm: restoreDemo
			})
		]
	});
}
var LANCZOS = [
	676.5203681218851,
	-1259.1392167224028,
	771.3234287776531,
	-176.6150291621406,
	12.507343278686905,
	-.13857109526572012,
	9984369578019572e-21,
	1.5056327351493116e-7
];
function logGamma(z) {
	if (z < .5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
	z -= 1;
	let x = .9999999999998099;
	for (let i = 0; i < LANCZOS.length; i++) x += LANCZOS[i] / (z + i + 1);
	const t = z + LANCZOS.length - .5;
	return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x);
}
function gammaSeries(a, x) {
	let sum = 1 / a;
	let term = 1 / a;
	for (let n = 1; n < 200; n++) {
		term *= x / (a + n);
		sum += term;
		if (term < Math.abs(sum) * 1e-12) break;
	}
	return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
}
function gammaCF(a, x) {
	const FPMIN = 1e-30;
	let b = x + 1 - a;
	let c = 1 / FPMIN;
	let d = 1 / b;
	let h = d;
	for (let i = 1; i <= 200; i++) {
		const an = -i * (i - a);
		b += 2;
		d = an * d + b;
		if (Math.abs(d) < FPMIN) d = FPMIN;
		c = b + an / c;
		if (Math.abs(c) < FPMIN) c = FPMIN;
		d = 1 / d;
		const del = d * c;
		h *= del;
		if (Math.abs(del - 1) < 1e-10) break;
	}
	return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
}
function lowerGammaP(a, x) {
	if (x <= 0) return 0;
	if (x < a + 1) return gammaSeries(a, x);
	return 1 - gammaCF(a, x);
}
function chiSquareP(chi2, df) {
	if (df <= 0 || !Number.isFinite(chi2) || chi2 < 0) return NaN;
	if (chi2 === 0) return 1;
	const p = 1 - lowerGammaP(df / 2, chi2 / 2);
	if (p < 0) return 0;
	if (p > 1) return 1;
	return p;
}
function summarize(values) {
	const n = values.length;
	if (n === 0) return {
		n: 0,
		mean: NaN,
		median: NaN,
		sd: NaN,
		min: NaN,
		max: NaN
	};
	const sorted = [...values].sort((a, b) => a - b);
	const mean = values.reduce((total, value) => total + value, 0) / n;
	const mid = Math.floor(n / 2);
	const median = n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
	const variance = n > 1 ? values.reduce((total, value) => total + (value - mean) ** 2, 0) / (n - 1) : NaN;
	return {
		n,
		mean,
		median,
		sd: Math.sqrt(variance),
		min: sorted[0],
		max: sorted[n - 1]
	};
}
function histogram(values) {
	if (values.length === 0) return [];
	const min = Math.min(...values);
	const max = Math.max(...values);
	if (min === max) return [{
		label: String(min),
		x0: min,
		x1: max,
		count: values.length
	}];
	const bins = Math.min(8, Math.max(5, Math.ceil(Math.log2(values.length) + 1)));
	const width = (max - min) / bins;
	const buckets = Array.from({ length: bins }, (_, index) => ({
		x0: min + index * width,
		x1: min + (index + 1) * width,
		count: 0,
		label: ""
	}));
	for (const value of values) {
		let index = Math.floor((value - min) / width);
		if (index >= bins) index = bins - 1;
		buckets[index].count += 1;
	}
	return buckets;
}
function frequencies(values) {
	const map = /* @__PURE__ */ new Map();
	let missing = 0;
	for (const raw of values) {
		const value = raw.trim();
		if (!value) {
			missing += 1;
			continue;
		}
		map.set(value, (map.get(value) ?? 0) + 1);
	}
	return {
		rows: [...map.entries()].map(([label, count]) => ({
			label,
			count
		})).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt")),
		missing,
		n: values.length - missing
	};
}
function crosstab(xs, ys) {
	const rows = [...new Set(xs)].sort((a, b) => a.localeCompare(b, "pt"));
	const cols = [...new Set(ys)].sort((a, b) => a.localeCompare(b, "pt"));
	const rowIndex = new Map(rows.map((row, index) => [row, index]));
	const colIndex = new Map(cols.map((col, index) => [col, index]));
	const counts = rows.map(() => cols.map(() => 0));
	for (let i = 0; i < xs.length; i++) {
		const r = rowIndex.get(xs[i]);
		const c = colIndex.get(ys[i]);
		counts[r][c] += 1;
	}
	const n = xs.length;
	const rowTotals = counts.map((row) => row.reduce((sum, value) => sum + value, 0));
	const colTotals = cols.map((_, col) => counts.reduce((sum, row) => sum + row[col], 0));
	let chi2 = 0;
	let lowExpected = false;
	if (rows.length > 1 && cols.length > 1 && n > 0) for (let r = 0; r < rows.length; r++) for (let c = 0; c < cols.length; c++) {
		const expected = rowTotals[r] * colTotals[c] / n;
		if (expected < 5) lowExpected = true;
		if (expected > 0) chi2 += (counts[r][c] - expected) ** 2 / expected;
	}
	const df = Math.max(0, (rows.length - 1) * (cols.length - 1));
	const p = df > 0 && n > 0 ? chiSquareP(chi2, df) : NaN;
	return {
		rows,
		cols,
		counts,
		rowTotals,
		colTotals,
		n,
		chi2,
		df,
		p,
		lowExpected
	};
}
function pearson(pairs) {
	const n = pairs.length;
	if (n < 3) return {
		n,
		r: NaN
	};
	let sx = 0;
	let sy = 0;
	let sxx = 0;
	let syy = 0;
	let sxy = 0;
	for (const pair of pairs) {
		sx += pair.x;
		sy += pair.y;
		sxx += pair.x * pair.x;
		syy += pair.y * pair.y;
		sxy += pair.x * pair.y;
	}
	const num = n * sxy - sx * sy;
	const den = Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy));
	if (den === 0) return {
		n,
		r: NaN
	};
	return {
		n,
		r: num / den
	};
}
function QuantView() {
	const project = useActiveProject();
	const addDataset = useResearch((state) => state.addDataset);
	const addSampleDataset = useResearch((state) => state.addSampleDataset);
	const setColumnType = useResearch((state) => state.setColumnType);
	const deleteDataset = useResearch((state) => state.deleteDataset);
	const [datasetId, setDatasetId] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("uma");
	const [varA, setVarA] = (0, import_react.useState)("");
	const [varB, setVarB] = (0, import_react.useState)("");
	const [csvName, setCsvName] = (0, import_react.useState)("Questionário importado");
	const [csv, setCsv] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Quantitativo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Descrição, frequência, cruzamento com qui-quadrado e correlação de Pearson. As contas rodam neste navegador."
			})] }),
			dataset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm md:max-w-sm md:flex-none",
					value: dataset.id,
					onChange: (event) => setDatasetId(event.target.value),
					"aria-label": "Base de dados",
					children: project.datasets.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: item.id,
						children: [
							item.name,
							" (",
							item.rows.length,
							")"
						]
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => setConfirm(true),
					children: "Excluir base"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-elevated p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Trazer uma planilha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Cole CSV separado por vírgula, ponto e vírgula ou tabulação. A primeira linha é o cabeçalho."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome da base" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							value: csvName,
							onChange: (event) => setCsvName(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							className: "min-h-28 font-mono",
							value: csv,
							onChange: (event) => setCsv(event.target.value),
							placeholder: "idade;genero;estresse\n22;Feminino;6,5"
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							onClick: importCsv,
							children: "Importar CSV"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => addSampleDataset(),
							children: "Carregar questionário de exemplo"
						})]
					})
				]
			}),
			dataset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analysis, {
				dataset,
				mode,
				setMode,
				varA,
				varB,
				setVarA,
				setVarB,
				onType: (column, type) => setColumnType(dataset.id, column, type)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Importe um CSV ou carregue o questionário de exemplo para ver médias, tabelas e gráficos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				title: "Excluir esta base?",
				body: "As respostas saem do projeto. As fontes e os códigos não são alterados.",
				confirmLabel: "Excluir base",
				onConfirm: () => dataset && deleteDataset(dataset.id)
			})
		]
	});
}
function Analysis({ dataset, mode, setMode, varA, varB, setVarA, setVarB, onType }) {
	const numbers = dataset.columns.filter((column) => column.type === "number");
	const categories = dataset.columns.filter((column) => column.type === "category");
	const chosenA = dataset.columns.some((column) => column.name === varA) ? varA : dataset.columns[0]?.name ?? "";
	const numericA = numbers.some((column) => column.name === varA) ? varA : numbers[0]?.name ?? "";
	const numericB = numbers.some((column) => column.name === varB && column.name !== numericA) ? varB : numbers.find((column) => column.name !== numericA)?.name ?? "";
	const catA = categories.some((column) => column.name === varA) ? varA : categories[0]?.name ?? "";
	const catB = categories.some((column) => column.name === varB && column.name !== catA) ? varB : categories.find((column) => column.name !== catA)?.name ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-xl border border-line bg-elevated p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Variáveis"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [dataset.rows.length, " linhas. Ajuste o tipo se a detecção errar."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: dataset.columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm",
							children: column.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 rounded-sm border border-line bg-surface px-2 text-sm",
							value: column.type,
							"aria-label": `Tipo de ${column.name}`,
							onChange: (event) => onType(column.name, event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "number",
									children: "Número"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "category",
									children: "Categoria"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "text",
									children: "Texto"
								})
							]
						})]
					}, column.name))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-line bg-elevated p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto",
					children: [
						["uma", "Uma variável"],
						["cruzamento", "Cruzamento"],
						["correlacao", "Correlação"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(id),
						className: cn("h-11 shrink-0 rounded-sm px-3 text-sm font-medium", mode === id ? "bg-accent text-accent-fg" : "bg-surface text-ink"),
						children: label
					}, id))
				}),
				mode === "uma" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneVariable, {
					dataset,
					name: chosenA,
					onChange: setVarA
				}) : null,
				mode === "cruzamento" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cross, {
					dataset,
					a: catA,
					b: catB,
					categories: categories.map((column) => column.name),
					onA: setVarA,
					onB: setVarB
				}) : null,
				mode === "correlacao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Correlation, {
					dataset,
					a: numericA,
					b: numericB,
					numbers: numbers.map((column) => column.name),
					onA: setVarA,
					onB: setVarB
				}) : null
			]
		})]
	});
}
function VariableSelect({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: "h-11 w-full rounded-sm border border-line bg-elevated px-3",
			value,
			onChange: (event) => onChange(event.target.value),
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option }, option))
		})]
	});
}
function OneVariable({ dataset, name, onChange }) {
	const column = dataset.columns.find((item) => item.name === name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariableSelect, {
				label: "Variável",
				value: name,
				options: dataset.columns.map((item) => item.name),
				onChange
			}),
			column?.type === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericSummary, {
				dataset,
				name
			}) : null,
			column?.type === "category" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySummary, {
				dataset,
				name
			}) : null,
			column?.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextSummary, {
				dataset,
				name
			}) : null
		]
	});
}
function NumericSummary({ dataset, name }) {
	const { nums, missing } = numericColumn(dataset, name);
	const stats = summarize(nums);
	const bins = histogram(nums).map((bin) => ({
		...bin,
		label: `${formatNumber(bin.x0, 1)}–${formatNumber(bin.x1, 1)}`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "n",
						value: String(stats.n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Omissos",
						value: String(missing)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Média",
						value: formatNumber(stats.mean)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Mediana",
						value: formatNumber(stats.median)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Desvio-padrão",
						value: formatNumber(stats.sd)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Mínimo – máximo",
						value: `${formatNumber(stats.min, 1)} – ${formatNumber(stats.max, 1)}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Média ",
					formatNumber(stats.mean),
					" (DP ",
					formatNumber(stats.sd),
					"), mediana ",
					formatNumber(stats.median),
					". O desvio-padrão é amostral."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: bins,
						margin: {
							left: 0,
							right: 8,
							top: 8,
							bottom: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								interval: 1,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "count",
								name: "Casos",
								fill: "var(--color-accent)",
								isAnimationActive: false
							})
						]
					})
				})
			})
		]
	});
}
function CategorySummary({ dataset, name }) {
	const freq = frequencies(dataset.rows.map((row) => row[name] ?? ""));
	const top = freq.rows[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				freq.n,
				" respostas válidas, ",
				freq.missing,
				" omissas.",
				top ? ` Mais frequente: ${top.label} (${formatNumber(top.count / Math.max(freq.n, 1) * 100, 0)}%).` : ""
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: freq.rows.slice(0, 12),
					layout: "vertical",
					margin: {
						left: 8,
						right: 8,
						top: 8,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--color-line)",
							horizontal: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							allowDecimals: false,
							tick: {
								fill: "var(--color-muted)",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "category",
							dataKey: "label",
							width: 110,
							tick: {
								fill: "var(--color-ink)",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "count",
							name: "Casos",
							fill: "var(--color-accent)",
							radius: [
								0,
								4,
								4,
								0
							],
							isAnimationActive: false
						})
					]
				})
			})
		})]
	});
}
function TextSummary({ dataset, name }) {
	const values = dataset.rows.map((row) => (row[name] ?? "").trim()).filter(Boolean);
	const unique = new Set(values).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-4 text-sm text-muted",
		children: [
			values.length,
			" textos preenchidos, ",
			unique,
			" valores distintos. Para contar palavras de respostas abertas, copie o texto para uma fonte e use Frequência."
		]
	});
}
function Cross({ dataset, a, b, categories, onA, onB }) {
	if (categories.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm text-muted",
		children: "Marque ao menos duas variáveis como categoria."
	});
	const paired = pairedCategories(dataset, a, b);
	const table = crosstab(paired.xs, paired.ys);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariableSelect, {
					label: "Linhas",
					value: a,
					options: categories,
					onChange: onA
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariableSelect, {
					label: "Colunas",
					value: b,
					options: categories,
					onChange: onB
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[28rem] border-collapse text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 text-left font-medium",
							children: a
						}),
						table.cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 text-right font-medium",
							children: col
						}, col)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 text-right font-medium",
							children: "Total"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 text-left font-normal",
								children: row
							}),
							table.counts[rowIndex].map((count, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2 text-right tabular-nums",
								children: [count, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-faint",
									children: table.rowTotals[rowIndex] ? `${Math.round(count / table.rowTotals[rowIndex] * 100)}%` : ""
								})]
							}, table.cols[colIndex])),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 text-right tabular-nums",
								children: table.rowTotals[rowIndex]
							})
						]
					}, row)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Qui-quadrado de Pearson = ",
					formatNumber(table.chi2, 2),
					", gl = ",
					table.df,
					", p ",
					formatP(table.p),
					". n = ",
					table.n,
					".",
					table.lowExpected ? " Há células com frequência esperada menor que 5; leia o valor-p com cautela." : ""
				]
			})
		]
	});
}
function Correlation({ dataset, a, b, numbers, onA, onB }) {
	if (numbers.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm text-muted",
		children: "Marque ao menos duas variáveis como número."
	});
	const pairs = pairedNumbers(dataset, a, b);
	const result = pearson(pairs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariableSelect, {
					label: "Eixo horizontal",
					value: a,
					options: numbers,
					onChange: onA
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariableSelect, {
					label: "Eixo vertical",
					value: b,
					options: numbers,
					onChange: onB
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"r = ",
					formatNumber(result.r, 2),
					" · n = ",
					result.n,
					". ",
					interpretR(result.r)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
						margin: {
							left: 0,
							right: 8,
							top: 8,
							bottom: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "var(--color-line)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "x",
								name: a,
								type: "number",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								dataKey: "y",
								name: b,
								type: "number",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, { range: [64, 64] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
								data: pairs,
								fill: "var(--color-accent)",
								isAnimationActive: false
							})
						]
					})
				})
			})
		]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl tabular-nums leading-none",
			children: value
		})]
	});
}
function QueriesView() {
	const project = useActiveProject();
	const jumpTo = useResearch((state) => state.jumpTo);
	const [tab, setTab] = (0, import_react.useState)("codigo");
	const [query, setQuery] = (0, import_react.useState)("");
	const [codeId, setCodeId] = (0, import_react.useState)("");
	const [rollup, setRollup] = (0, import_react.useState)(true);
	const [attribute, setAttribute] = (0, import_react.useState)("");
	if (!project) return null;
	const tree = flattenCodes(project.codes);
	const selected = codeId || tree.find((code) => excerptCount(project.codings, project.codes, code.id, false) > 0)?.id || tree[0]?.id || "";
	const keys = attributeKeys(project);
	const currentKey = attribute || keys[0] || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Consultas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Recupere trechos, cruze códigos com fontes ou compare casos por um atributo."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto",
				children: [
					["codigo", "Por código"],
					["busca", "Busca no texto"],
					["matriz", "Matriz"],
					["atributo", "Por atributo"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-11 shrink-0 rounded-sm px-3 text-sm font-medium", tab === id ? "bg-accent text-accent-fg" : "bg-elevated text-ink"),
					children: label
				}, id))
			}),
			tab === "busca" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextQuery, {
				query,
				setQuery,
				onJump: jumpTo
			}) : null,
			tab === "codigo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeQuery, {
				codeId: selected,
				onCode: setCodeId,
				rollup,
				setRollup,
				onJump: jumpTo
			}) : null,
			tab === "matriz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Matrix, {
				rollup,
				setRollup
			}) : null,
			tab === "atributo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeQuery, {
				codeId: selected,
				onCode: setCodeId,
				attribute: currentKey,
				onAttribute: setAttribute,
				rollup,
				setRollup
			}) : null
		]
	});
}
function TextQuery({ query, setQuery, onJump }) {
	const project = useActiveProject();
	const hits = (0, import_react.useMemo)(() => project ? searchText(project, query) : [], [project, query]);
	if (!project) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-elevated p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			value: query,
			onChange: (event) => setQuery(event.target.value),
			placeholder: "Buscar palavra ou frase",
			"aria-label": "Busca no texto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-3 flex flex-col gap-2",
			children: [query.trim().length >= 2 && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-muted",
				children: "Nenhuma ocorrência."
			}) : null, hits.map((hit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onJump(hit.sourceId, hit.index),
				className: "w-full rounded-sm px-2 py-2 text-left hover:bg-accent-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: hit.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: hit.snippet
				})]
			}) }, `${hit.sourceId}-${hit.index}-${index}`))]
		})]
	});
}
function CodeQuery({ codeId, onCode, rollup, setRollup, onJump }) {
	const project = useActiveProject();
	if (!project) return null;
	const tree = flattenCodes(project.codes);
	const ids = codeId && rollup ? collectDescendants(project.codes, codeId) : new Set(codeId ? [codeId] : []);
	const rows = project.codings.filter((coding) => ids.has(coding.codeId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm",
					value: codeId,
					onChange: (event) => onCode(event.target.value),
					"aria-label": "Código",
					children: tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: code.id,
						children: ["· ".repeat(code.depth), code.name]
					}, code.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: rollup,
						onChange: (event) => setRollup(event.target.checked)
					}), "Incluir subcódigos"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [rows.length, " trechos"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-2",
				children: rows.map((coding) => {
					const source = project.sources.find((item) => item.id === coding.sourceId);
					const code = project.codes.find((item) => item.id === coding.codeId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onJump(coding.sourceId, coding.start),
						className: "w-full rounded-sm border border-line px-3 py-3 text-left hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium",
								children: [
									source?.title ?? "Fonte",
									" · ",
									code?.name
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-base leading-relaxed",
								children: [
									"“",
									coding.excerpt,
									"”"
								]
							}),
							coding.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: coding.note
							}) : null
						]
					}) }, coding.id);
				})
			})
		]
	});
}
function Matrix({ rollup, setRollup }) {
	const project = useActiveProject();
	if (!project) return null;
	const codes = flattenCodes(project.codes);
	const max = Math.max(1, ...codes.flatMap((code) => project.sources.map((source) => countCell(project.codings, project.codes, code.id, source.id, rollup))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-elevated p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex h-11 items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: rollup,
				onChange: (event) => setRollup(event.target.checked)
			}), "Agregar subcódigos"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[40rem] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "p-2 text-left font-medium",
					children: "Código"
				}), project.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "p-2 text-left font-medium",
					children: source.participant || source.title
				}, source.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: codes.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-2 text-left font-normal",
						style: { paddingLeft: `${8 + code.depth * 12}px` },
						children: code.name
					}), project.sources.map((source) => {
						const count = countCell(project.codings, project.codes, code.id, source.id, rollup);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 text-center tabular-nums",
							style: { backgroundColor: count ? `color-mix(in oklab, var(--color-accent) ${Math.round(14 + 70 * (count / max))}%, transparent)` : void 0 },
							children: count || ""
						}, source.id);
					})]
				}, code.id)) })]
			})
		})]
	});
}
function countCell(codings, codes, codeId, sourceId, rollup) {
	const ids = rollup ? collectDescendants(codes, codeId) : /* @__PURE__ */ new Set([codeId]);
	return codings.filter((coding) => coding.sourceId === sourceId && ids.has(coding.codeId)).length;
}
function AttributeQuery({ codeId, onCode, attribute, onAttribute, rollup, setRollup }) {
	const project = useActiveProject();
	if (!project) return null;
	const tree = flattenCodes(project.codes);
	const keys = attributeKeys(project);
	const ids = codeId && rollup ? collectDescendants(project.codes, codeId) : new Set(codeId ? [codeId] : []);
	const groups = /* @__PURE__ */ new Map();
	for (const source of project.sources) {
		const value = source.attributes.find((item) => item.key.trim() === attribute)?.value.trim() || "Sem valor";
		const current = groups.get(value) ?? {
			sources: 0,
			excerpts: 0
		};
		current.sources += 1;
		current.excerpts += project.codings.filter((coding) => coding.sourceId === source.id && ids.has(coding.codeId)).length;
		groups.set(value, current);
	}
	const data = [...groups.entries()].map(([label, value]) => ({
		label,
		media: value.sources ? value.excerpts / value.sources : 0,
		excerpts: value.excerpts,
		sources: value.sources
	})).sort((a, b) => b.media - a.media);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-elevated p-4",
		children: [
			keys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nenhum atributo nas fontes. Abra uma fonte e informe, por exemplo, Gênero ou Curso."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 rounded-sm border border-line bg-elevated px-3 text-sm",
					value: attribute,
					onChange: (event) => onAttribute(event.target.value),
					"aria-label": "Atributo",
					children: keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: key }, key))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 rounded-sm border border-line bg-elevated px-3 text-sm",
					value: codeId,
					onChange: (event) => onCode(event.target.value),
					"aria-label": "Código",
					children: tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: code.id,
						children: code.name
					}, code.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex h-11 items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: rollup,
					onChange: (event) => setRollup(event.target.checked)
				}), "Incluir subcódigos"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Média de trechos por fonte, dentro de cada valor do atributo."
			}),
			data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data,
						layout: "vertical",
						margin: {
							left: 8,
							right: 16,
							top: 8,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								horizontal: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "label",
								width: 110,
								tick: {
									fill: "var(--color-ink)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (value, name) => [typeof value === "number" ? formatNumber(value, name === "media" ? 2 : 0) : value, name === "media" ? "Média" : String(name)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "media",
								name: "media",
								fill: "var(--color-accent)",
								radius: [
									0,
									4,
									4,
									0
								],
								isAnimationActive: false
							})
						]
					})
				})
			}) : null
		]
	});
}
function ReaderView() {
	const project = useActiveProject();
	const activeSourceId = useResearch((state) => state.activeSourceId);
	const setActiveSource = useResearch((state) => state.setActiveSource);
	const addCoding = useResearch((state) => state.addCoding);
	const removeCoding = useResearch((state) => state.removeCoding);
	const updateCodingNote = useResearch((state) => state.updateCodingNote);
	const addCode = useResearch((state) => state.addCode);
	const focus = useResearch((state) => state.focus);
	const setView = useResearch((state) => state.setView);
	const [pane, setPane] = (0, import_react.useState)("texto");
	const [selection, setSelection] = (0, import_react.useState)(null);
	const [pop, setPop] = (0, import_react.useState)(null);
	const [inspect, setInspect] = (0, import_react.useState)(null);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const articleRef = (0, import_react.useRef)(null);
	const source = project?.sources.find((item) => item.id === activeSourceId) ?? project?.sources[0] ?? null;
	(0, import_react.useEffect)(() => {
		if (source && activeSourceId !== source.id) setActiveSource(source.id);
	}, [
		source,
		activeSourceId,
		setActiveSource
	]);
	(0, import_react.useEffect)(() => {
		if (!focus || !source || focus.sourceId !== source.id) return;
		const nodes = articleRef.current?.querySelectorAll("[data-start]");
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
	const codings = (0, import_react.useMemo)(() => project && source ? project.codings.filter((coding) => coding.sourceId === source.id) : [], [project, source]);
	const segments = (0, import_react.useMemo)(() => source ? buildSegments(source.text, codings) : [], [source, codings]);
	if (!project) return null;
	if (!source) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Nenhuma fonte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Cole uma entrevista, um diário ou uma nota para começar a codificar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "primary",
				onClick: () => setView("fontes"),
				children: "Ir para fontes"
			})
		]
	});
	const tree = flattenCodes(project.codes).filter((code) => code.name.toLocaleLowerCase("pt-BR").includes(filter.trim().toLocaleLowerCase("pt-BR")));
	const coverage = source.text.length ? coveredLength(codings, source.text.length) / source.text.length : 0;
	function apply(codeId) {
		if (!selection) return;
		addCoding({
			sourceId: source.id,
			codeId,
			start: selection.start,
			end: selection.end,
			excerpt: source.text.slice(selection.start, selection.end)
		});
		const code = project.codes.find((item) => item.id === codeId);
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
		setSelection({
			start: a,
			end: b
		});
		setInspect(null);
		setPop({
			top: Math.min(rect.bottom + 8, window.innerHeight - 16),
			left: Math.min(Math.max(8, rect.left), window.innerWidth - 300)
		});
	}
	function createAndApply() {
		const name = newName.trim();
		if (!name) return;
		const color = MARKS[project.codes.length % MARKS.length].id;
		const id = addCode({
			name,
			parentId: null,
			color
		});
		setNewName("");
		if (id && selection) apply(id);
		else if (id) setStatus(`Código ${name} criado.`);
	}
	const codeRail = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					value: filter,
					onChange: (event) => setFilter(event.target.value),
					placeholder: "Filtrar códigos",
					"aria-label": "Filtrar códigos"
				}), selection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [selection.end - selection.start, " caracteres selecionados. Toque num código para marcar."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Selecione um trecho no texto e escolha um código."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "min-h-0 flex-1 overflow-auto p-2",
				children: [tree.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-2 py-3 text-sm text-muted",
					children: "Nenhum código com esse filtro."
				}) : null, tree.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onMouseDown: (event) => event.preventDefault(),
					onClick: () => selection ? apply(code.id) : void 0,
					className: "flex min-h-11 w-full items-center gap-2 rounded-sm px-2 text-left text-sm hover:bg-accent-soft",
					style: { paddingLeft: `${8 + code.depth * 16}px` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { id: code.color }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: code.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-faint",
							children: excerptCount(project.codings, project.codes, code.id, true)
						})
					]
				}) }, code.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-line p-3",
				onSubmit: (event) => {
					event.preventDefault();
					createAndApply();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					value: newName,
					onChange: (event) => setNewName(event.target.value),
					placeholder: "Novo código",
					"aria-label": "Novo código"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					type: "submit",
					children: "Criar"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-line px-3 py-2 md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaneButton, {
						active: pane === "texto",
						onClick: () => setPane("texto"),
						children: "Texto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaneButton, {
						active: pane === "codigos",
						onClick: () => setPane("codigos"),
						children: "Códigos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "fonte-ativa",
						children: "Fonte"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "fonte-ativa",
						className: "h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-2 text-sm",
						value: source.id,
						onChange: (event) => setActiveSource(event.target.value),
						children: project.sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.title
						}, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 md:grid-cols-[14rem_minmax(0,1fr)_17rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden min-h-0 overflow-auto border-r border-line md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "p-2",
							children: project.sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveSource(item.id),
								className: cn("flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left", item.id === source.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-full truncate text-sm font-medium",
									children: item.participant || item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs", item.id === source.id ? "opacity-80" : "text-muted"),
									children: kindLabel(item.kind)
								})]
							}) }, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: cn("min-h-0 overflow-auto", pane === "texto" ? "block" : "hidden", "md:block"),
						onScroll: () => setPop(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "mx-auto max-w-[70ch] px-4 py-6 md:px-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [kindLabel(source.kind), source.date ? ` · ${source.date.split("-").reverse().join("/")}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-1 font-display text-3xl leading-tight",
									children: source.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										formatPercent(coverage),
										" codificado · ",
										codings.length,
										" trechos",
										source.participant ? ` · ${source.participant}` : ""
									]
								}),
								source.attributes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 flex flex-wrap gap-2",
									children: source.attributes.map((attribute) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-sm bg-accent-soft px-2 py-1 text-sm",
										children: [
											attribute.key,
											": ",
											attribute.value
										]
									}, `${attribute.key}-${attribute.value}`))
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: articleRef,
									onMouseUp,
									className: "mt-6 font-display text-lg leading-relaxed whitespace-pre-wrap",
									children: [source.text.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base text-muted",
										children: "Esta fonte ainda não tem texto."
									}) : null, segments.map((segment) => {
										const coded = segment.codeIds.length > 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-start": segment.start,
											"data-end": segment.end,
											style: markStyle(segment.codeIds, project.codes),
											className: cn(coded && "cursor-pointer rounded-xs"),
											onClick: (event) => {
												if (!coded || window.getSelection()?.isCollapsed === false) return;
												const rect = event.currentTarget.getBoundingClientRect();
												setInspect({
													ids: segment.codingIds,
													top: rect.bottom + 8,
													left: Math.min(rect.left, window.innerWidth - 300)
												});
												setPop(null);
											},
											children: segment.text
										}, `${segment.start}-${segment.end}`);
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "sr-only",
									"aria-live": "polite",
									children: status
								}),
								status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted",
									children: status
								}) : null
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: cn("min-h-0 border-l border-line", pane === "codigos" ? "block" : "hidden", "md:block"),
						children: codeRail
					})
				]
			}),
			pop && selection ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "code-pop fixed z-50 max-h-[50vh] w-72 overflow-auto rounded-xl border border-line bg-elevated p-3",
				style: {
					top: pop.top,
					left: pop.left
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Codificar trecho"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-3 text-sm text-muted",
						children: source.text.slice(selection.start, selection.end)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-40 overflow-auto",
						children: flattenCodes(project.codes).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-10 w-full items-center gap-2 rounded-sm px-2 text-left text-sm hover:bg-accent-soft",
							onMouseDown: (event) => event.preventDefault(),
							onClick: () => apply(code.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { id: code.color }), code.name]
						}) }, code.id))
					})
				]
			}), document.body) : null,
			inspect ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "code-pop fixed z-50 max-h-[50vh] w-80 overflow-auto rounded-xl border border-line bg-elevated p-3",
				style: {
					top: inspect.top,
					left: inspect.left
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Trecho marcado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-3",
						children: inspect.ids.map((id) => {
							const coding = project.codings.find((item) => item.id === id);
							const code = project.codes.find((item) => item.id === coding?.codeId);
							if (!coding || !code) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-sm border border-line p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { id: code.color }), code.name]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: "mt-2 min-h-16 w-full rounded-sm border border-line bg-surface px-2 py-1 text-sm",
										value: coding.note,
										placeholder: "Anotação deste trecho",
										onChange: (event) => updateCodingNote(coding.id, event.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "mt-2",
										size: "sm",
										variant: "danger",
										onClick: () => removeCoding(coding.id),
										children: "Remover código"
									})
								]
							}, id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						onClick: () => setInspect(null),
						children: "Fechar"
					})
				]
			}), document.body) : null
		]
	});
}
function PaneButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-sm px-3 text-sm font-medium", active ? "bg-accent text-accent-fg" : "bg-elevated text-ink"),
		children
	});
}
function Swatch({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "size-3 shrink-0 rounded-xs",
		style: { backgroundColor: `var(--color-${id})` },
		"aria-hidden": "true"
	});
}
function markStyle(codeIds, codes) {
	if (codeIds.length === 0) return void 0;
	const [first, ...rest] = codeIds.map((id) => codes.find((code) => code.id === id)?.color).filter((color) => Boolean(color));
	if (!first) return void 0;
	return {
		backgroundColor: `color-mix(in oklab, var(--color-${first}) 32%, transparent)`,
		boxShadow: rest.map((id, index) => `inset 0 -${(index + 1) * 3}px 0 var(--color-${id})`).join(", ")
	};
}
function offsetFrom(root, container, offset) {
	if (!root.contains(container)) return null;
	if (container.nodeType === Node.TEXT_NODE) {
		const host = container.parentElement?.closest("[data-start]");
		if (!host || !root.contains(host)) return null;
		return Number(host.dataset.start) + offset;
	}
	const element = container;
	if (element.dataset?.start && offset === 0) return Number(element.dataset.start);
	const child = element.childNodes[Math.min(offset, element.childNodes.length - 1)];
	if (!child) return null;
	const host = (child instanceof HTMLElement ? child : child.parentElement)?.closest("[data-start]");
	if (!host) return null;
	return offset <= 0 ? Number(host.dataset.start) : Number(host.dataset.end ?? host.dataset.start);
}
function SourcesView() {
	const project = useActiveProject();
	const activeSourceId = useResearch((state) => state.activeSourceId);
	const setActiveSource = useResearch((state) => state.setActiveSource);
	const addSource = useResearch((state) => state.addSource);
	const updateSource = useResearch((state) => state.updateSource);
	const deleteSource = useResearch((state) => state.deleteSource);
	const setView = useResearch((state) => state.setView);
	const source = project?.sources.find((item) => item.id === activeSourceId) ?? project?.sources[0] ?? null;
	const [draft, setDraft] = (0, import_react.useState)(source);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [lost, setLost] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setDraft(source ? structuredClone(source) : null);
		setLost(0);
	}, [source?.id]);
	if (!project) return null;
	const current = project;
	const dirty = source && draft ? JSON.stringify(source) !== JSON.stringify(draft) : false;
	function save(next = draft) {
		if (!source || !next) return;
		const cleaned = {
			...next,
			title: next.title.trim() || "Fonte sem título",
			attributes: next.attributes.filter((attribute) => attribute.key.trim() || attribute.value.trim()).map((attribute) => ({
				key: attribute.key.trim(),
				value: attribute.value.trim()
			}))
		};
		const before = current.codings.filter((coding) => coding.sourceId === source.id).length;
		updateSource(source.id, cleaned);
		setDraft(cleaned);
		const after = useResearch.getState().projects.find((item) => item.id === current.id)?.codings.filter((coding) => coding.sourceId === source.id).length ?? before;
		setLost(Math.max(0, before - after));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[16rem_minmax(0,1fr)] md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Fontes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "sm",
					onClick: () => {
						addSource({
							title: "Nova fonte",
							kind: "entrevista",
							text: ""
						});
					},
					children: "Nova"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 flex flex-col gap-1",
				children: [project.sources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Nenhuma fonte ainda."
				}) : null, project.sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (dirty) save();
						setActiveSource(item.id);
					},
					className: `flex min-h-11 w-full flex-col items-start justify-center rounded-sm px-3 text-left ${item.id === source?.id ? "bg-accent text-accent-fg" : "hover:bg-accent-soft"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-full truncate text-sm font-medium",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs opacity-80",
						children: [
							kindLabel(item.kind),
							" · ",
							wordCount(item.text),
							" palavras"
						]
					})]
				}) }, item.id))]
			})] }),
			draft && source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-elevated p-4",
				onSubmit: (event) => {
					event.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									value: draft.title,
									onChange: (event) => setDraft({
										...draft,
										title: event.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: draft.kind,
								onChange: (event) => setDraft({
									...draft,
									kind: event.target.value
								}),
								children: SOURCE_KINDS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: kind.id,
									children: kind.label
								}, kind.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "date",
								value: draft.date,
								onChange: (event) => setDraft({
									...draft,
									date: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Participante ou caso" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									value: draft.participant,
									onChange: (event) => setDraft({
										...draft,
										participant: event.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								hint: "Atributos viram grupos na consulta “por atributo” — gênero, curso, turno.",
								children: "Atributos do caso"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-2",
								children: draft.attributes.map((attribute, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid gap-2 sm:grid-cols-[1fr_1fr_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											"aria-label": "Nome do atributo",
											value: attribute.key,
											placeholder: "Atributo",
											onChange: (event) => {
												const attributes = draft.attributes.map((item, itemIndex) => itemIndex === index ? {
													...item,
													key: event.target.value
												} : item);
												setDraft({
													...draft,
													attributes
												});
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											"aria-label": "Valor do atributo",
											value: attribute.value,
											placeholder: "Valor",
											onChange: (event) => {
												const attributes = draft.attributes.map((item, itemIndex) => itemIndex === index ? {
													...item,
													value: event.target.value
												} : item);
												setDraft({
													...draft,
													attributes
												});
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => setDraft({
												...draft,
												attributes: draft.attributes.filter((_, itemIndex) => itemIndex !== index)
											}),
											children: "Tirar"
										})
									]
								}, index))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-2",
								size: "sm",
								onClick: () => setDraft({
									...draft,
									attributes: [...draft.attributes, {
										key: "",
										value: ""
									}]
								}),
								children: "Adicionar atributo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								hint: "Se o texto mudar, os trechos são recolocados pelo conteúdo. O que sumir deixa de estar codificado.",
								children: "Texto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								value: draft.text,
								onChange: (event) => setDraft({
									...draft,
									text: event.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-faint",
								children: [wordCount(draft.text), " palavras"]
							})
						]
					}),
					lost > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-danger",
						children: [lost, " trecho(s) não foram encontrados no texto novo e saíram da codificação."]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								type: "submit",
								disabled: !dirty,
								children: "Salvar fonte"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									save();
									setView("leitura");
								},
								children: "Codificar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => setConfirm(true),
								children: "Excluir"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-elevated p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Cole o material"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm text-muted",
						children: "Entrevistas, grupos focais, diários, respostas abertas. O texto fica no seu navegador."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "primary",
						onClick: () => addSource({
							title: "Nova fonte",
							kind: "entrevista"
						}),
						children: "Criar fonte"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				title: "Excluir esta fonte?",
				body: "Os trechos codificados nela também saem. O restante do projeto permanece.",
				confirmLabel: "Excluir fonte",
				onConfirm: () => source && deleteSource(source.id)
			})
		]
	});
}
function sanitizeProject(input) {
	if (!input || typeof input !== "object") return null;
	const raw = input;
	if (typeof raw.name !== "string" || !raw.name.trim()) return null;
	if (!Array.isArray(raw.sources) || !Array.isArray(raw.codes)) return null;
	return {
		id: typeof raw.id === "string" && raw.id ? raw.id : uid("proj"),
		name: raw.name.trim(),
		description: typeof raw.description === "string" ? raw.description : "",
		updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt.slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		sources: raw.sources.flatMap(asSource),
		codes: raw.codes.flatMap(asCode),
		codings: Array.isArray(raw.codings) ? raw.codings.flatMap(asCoding) : [],
		memos: Array.isArray(raw.memos) ? raw.memos.flatMap(asMemo) : [],
		datasets: Array.isArray(raw.datasets) ? raw.datasets.flatMap(asDataset) : []
	};
}
function asSource(item) {
	if (!item || typeof item !== "object") return [];
	const source = item;
	if (typeof source.title !== "string" || typeof source.text !== "string") return [];
	const kind = SOURCE_KINDS.some((entry) => entry.id === source.kind) ? source.kind : "documento";
	const attributes = Array.isArray(source.attributes) ? source.attributes.flatMap((attribute) => {
		if (!attribute || typeof attribute.key !== "string" || typeof attribute.value !== "string") return [];
		return [{
			key: attribute.key,
			value: attribute.value
		}];
	}) : [];
	return [{
		id: typeof source.id === "string" && source.id ? source.id : uid("src"),
		title: source.title,
		kind,
		participant: typeof source.participant === "string" ? source.participant : "",
		date: typeof source.date === "string" ? source.date : "",
		text: source.text,
		attributes
	}];
}
function asCode(item) {
	if (!item || typeof item !== "object") return [];
	const code = item;
	if (typeof code.name !== "string" || !code.name.trim()) return [];
	return [{
		id: typeof code.id === "string" && code.id ? code.id : uid("code"),
		parentId: typeof code.parentId === "string" ? code.parentId : null,
		name: code.name.trim(),
		description: typeof code.description === "string" ? code.description : "",
		color: typeof code.color === "string" && isMarkId(code.color) ? code.color : "mark-1"
	}];
}
function asCoding(item) {
	if (!item || typeof item !== "object") return [];
	const coding = item;
	if (typeof coding.sourceId !== "string" || typeof coding.codeId !== "string" || typeof coding.excerpt !== "string") return [];
	if (typeof coding.start !== "number" || typeof coding.end !== "number") return [];
	return [{
		id: typeof coding.id === "string" && coding.id ? coding.id : uid("cd"),
		sourceId: coding.sourceId,
		codeId: coding.codeId,
		start: coding.start,
		end: coding.end,
		excerpt: coding.excerpt,
		note: typeof coding.note === "string" ? coding.note : ""
	}];
}
function asMemo(item) {
	if (!item || typeof item !== "object") return [];
	const memo = item;
	if (typeof memo.title !== "string") return [];
	return [{
		id: typeof memo.id === "string" && memo.id ? memo.id : uid("memo"),
		title: memo.title,
		body: typeof memo.body === "string" ? memo.body : "",
		codeId: typeof memo.codeId === "string" ? memo.codeId : null,
		updatedAt: typeof memo.updatedAt === "string" ? memo.updatedAt.slice(0, 10) : ""
	}];
}
function asDataset(item) {
	if (!item || typeof item !== "object") return [];
	const dataset = item;
	if (typeof dataset.name !== "string" || !Array.isArray(dataset.columns) || !Array.isArray(dataset.rows)) return [];
	const columns = dataset.columns.flatMap((column) => {
		if (!column || typeof column.name !== "string") return [];
		const type = column.type === "number" || column.type === "category" || column.type === "text" ? column.type : "text";
		return [{
			name: column.name,
			type
		}];
	});
	const rows = dataset.rows.slice(0, 2e3).flatMap((row) => {
		if (!row || typeof row !== "object") return [];
		const record = {};
		for (const column of columns) record[column.name] = String(row[column.name] ?? "");
		return [record];
	});
	return [{
		id: typeof dataset.id === "string" && dataset.id ? dataset.id : uid("data"),
		name: dataset.name,
		columns,
		rows
	}];
}
var NAV = [
	{
		id: "painel",
		label: "Painel",
		icon: LayoutDashboard
	},
	{
		id: "leitura",
		label: "Leitura",
		icon: Highlighter
	},
	{
		id: "fontes",
		label: "Fontes",
		icon: FileText
	},
	{
		id: "codigos",
		label: "Códigos",
		icon: Tags
	},
	{
		id: "consultas",
		label: "Consultas",
		icon: Search
	},
	{
		id: "frequencia",
		label: "Frequência",
		icon: WholeWord
	},
	{
		id: "quantitativo",
		label: "Quantitativo",
		icon: ChartColumn
	},
	{
		id: "memos",
		label: "Memos",
		icon: NotebookPen
	},
	{
		id: "projetos",
		label: "Projetos",
		icon: FolderOpen
	}
];
function AppShell() {
	const project = useActiveProject();
	const projects = useResearch((state) => state.projects);
	const view = useResearch((state) => state.view);
	const setView = useResearch((state) => state.setView);
	const setActiveProject = useResearch((state) => state.setActiveProject);
	const importProject = useResearch((state) => state.importProject);
	const fileRef = (0, import_react.useRef)(null);
	const [notice, setNotice] = (0, import_react.useState)("");
	const shown = project ? view : "projetos";
	async function onImport(file) {
		try {
			const incoming = sanitizeProject(JSON.parse(await file.text()));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-frame flex flex-col bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-surface px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-none",
							children: "Trama"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Análise de pesquisa"
						})] })]
					}),
					projects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 min-w-0 flex-1 rounded-sm border border-line bg-elevated px-3 text-sm md:max-w-64 md:flex-none",
						"aria-label": "Projeto ativo",
						value: project?.id ?? "",
						onChange: (event) => setActiveProject(event.target.value),
						children: projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.name
						}, item.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-sm border border-line bg-elevated px-3 text-sm",
								onClick: () => fileRef.current?.click(),
								children: "Importar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "application/json,.json",
								className: "sr-only",
								onChange: (event) => {
									const file = event.target.files?.[0];
									if (file) onImport(file);
									event.target.value = "";
								}
							}),
							project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, { project }) : null
						]
					})
				]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-line bg-accent-soft px-4 py-2 text-sm text-ink",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 py-2 md:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
					item,
					active: shown === item.id,
					onClick: () => setView(item.id),
					compact: true
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-52 shrink-0 flex-col gap-1 border-r border-line bg-surface p-3 md:flex",
					children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
						item,
						active: shown === item.id,
						onClick: () => setView(item.id)
					}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-auto px-3 pt-4 text-sm text-faint",
						children: "Tudo fica salvo neste navegador."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: cn("min-w-0 flex-1", shown === "leitura" ? "overflow-hidden" : "overflow-auto"),
					children: [
						shown === "painel" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewView, {}) : null,
						shown === "leitura" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReaderView, {}) : null,
						shown === "fontes" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcesView, {}) : null,
						shown === "codigos" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodesView, {}) : null,
						shown === "consultas" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueriesView, {}) : null,
						shown === "frequencia" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrequencyView, {}) : null,
						shown === "quantitativo" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantView, {}) : null,
						shown === "memos" && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemosView, {}) : null,
						shown === "projetos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsView, {}) : null
					]
				})]
			})
		]
	});
}
function NavButton({ item, active, onClick, compact = false }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-current": active ? "page" : void 0,
		onClick,
		className: cn("flex h-11 shrink-0 items-center gap-2 rounded-sm px-3 text-sm font-medium", compact ? "whitespace-nowrap" : "w-full", active ? "bg-accent text-accent-fg" : "text-ink hover:bg-accent-soft"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), item.label]
	});
}
function ExportMenu({ project }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "flex h-11 items-center rounded-sm border border-line bg-elevated px-3 text-sm",
			children: "Exportar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 z-30 mt-1 w-64 rounded-xl border border-line bg-elevated p-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportItem, {
					label: "Projeto em JSON",
					onClick: () => downloadText(`${fileSlug(project.name)}.json`, JSON.stringify(project, null, 2), "application/json")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportItem, {
					label: "Livro de códigos (CSV)",
					onClick: () => {
						const rows = flattenCodes(project.codes).map((code) => {
							const parent = project.codes.find((item) => item.id === code.parentId)?.name ?? "";
							return [
								code.name,
								parent,
								code.description,
								String(excerptCount(project.codings, project.codes, code.id, false)),
								String(excerptCount(project.codings, project.codes, code.id, true))
							];
						});
						downloadText(`${fileSlug(project.name)}-codigos.csv`, toCsv([
							"codigo",
							"codigo_pai",
							"descricao",
							"trechos",
							"trechos_com_subcodigos"
						], rows), "text/csv");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportItem, {
					label: "Trechos codificados (CSV)",
					onClick: () => {
						const rows = project.codings.map((coding) => [
							project.sources.find((source) => source.id === coding.sourceId)?.title ?? "",
							project.codes.find((code) => code.id === coding.codeId)?.name ?? "",
							coding.excerpt,
							coding.note
						]);
						downloadText(`${fileSlug(project.name)}-trechos.csv`, toCsv([
							"fonte",
							"codigo",
							"trecho",
							"anotacao"
						], rows), "text/csv");
					}
				})
			]
		})]
	});
}
function ExportItem({ label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "h-11 w-full rounded-sm px-3 text-left text-sm hover:bg-accent-soft",
		onClick,
		children: label
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-9 text-accent",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "5",
				width: "3.2",
				height: "22",
				rx: "1.2",
				fill: "var(--color-accent-soft)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14.4",
				y: "5",
				width: "3.2",
				height: "22",
				rx: "1.2",
				fill: "var(--color-accent-soft)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "21.8",
				y: "5",
				width: "3.2",
				height: "22",
				rx: "1.2",
				fill: "var(--color-accent-soft)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "13",
				width: "24",
				height: "6",
				rx: "1.5",
				fill: "var(--color-accent-fg)"
			})
		]
	});
}
function Home() {
	(0, import_react.useEffect)(() => {
		useResearch.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
