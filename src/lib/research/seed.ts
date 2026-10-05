import type { Code, Coding, Memo, Project, Source } from "@/lib/research/types";
import type { Dataset } from "@/lib/research/types";

const MARINA = `Eu entrei na pedagogia porque queria sala de aula, mas no sexto semestre a sensação é de que o curso virou uma corrida. Toda semana tem trabalho, leitura e um prazo que encosta no outro. O acúmulo de prazos me tira o sono. Eu deixo de ler com calma e passo a ler só para entregar.

O que segura é o grupo da turma. A gente divide resumo, lembra data de prova, às vezes só desabafa. Esse apoio dos pares é o que me faz continuar. Da coordenação eu quase não sinto presença: o e-mail volta três semanas depois. Quando eu procurei o serviço de psicologia do campus, a fila era de dois meses. Eu desisti e guardei isso para mim.

Tem dia em que acordo com o peito apertado antes mesmo de abrir as mensagens da disciplina. Eu chamo isso de ansiedade, não de preguiça. No fim do semestre passado eu tive um esgotamento e parei uma semana, sem conseguir entrar na sala. Minha mãe acha que eu estou exagerando. O apoio da família existe para a passagem e para o almoço, mas conversar sobre saúde ainda é difícil.

Mesmo assim eu não quero largar. Quando estou no estágio, com criança de verdade, volta a motivação. A dúvida sobre o curso aparece só quando eu estou sozinha em casa, de madrugada, olhando a grade do próximo semestre e sentindo o isolamento daquela hora.`;

const RAFAEL = `Na engenharia o volume é brutal, mas o que me derruba não é a dificuldade da matéria, é o calendário. Prova na segunda, lista na terça, laboratório na quinta. O acúmulo de prazos é tratado como rito de passagem. Quem reclama ouve que sempre foi assim.

Eu trabalho meio período numa empresa júnior. A conciliação entre trabalho e estudo é um quebra-cabeça: saio do expediente e ainda tenho três horas de cálculo. Durmo pouco. No último mês faltei duas aulas porque o corpo não levantou. Foi esgotamento, não falta de interesse. O apoio da família se resume a um telefonema no domingo, com a pergunta de se eu já estou formado.

Os amigos do laboratório são a minha rede. Sem esse apoio dos pares eu já teria trancado. A instituição oferece monitoria, e isso ajuda, mas o serviço de psicologia do campus eu nunca consegui vaga. Mandei mensagem e não houve retorno.

Não sinto um isolamento constante porque moro com dois colegas de turma. A ansiedade aparece antes das provas de cálculo: a mão sua e eu não consigo começar a lista. A motivação volta quando um projeto dá certo, quando a estrutura de palito aguenta o peso. A dúvida sobre o curso existe, principalmente quando penso em quantos formandos ainda procuram o primeiro emprego.`;

const LUCIA = `Eu tenho trinta e um anos, dois filhos e trabalho o dia inteiro numa secretaria. Estudo à noite. A conciliação entre trabalho e estudo não é frase de relatório, é a minha semana inteira. Chego na aula com fome e com a cabeça no plantão do dia seguinte.

O acúmulo de prazos me obriga a escolher o que entregar pela metade. Não é desleixo. É conta que não fecha. O apoio da família é o que viabiliza: minha irmã fica com as crianças em duas noites. Sem isso eu não permanecia.

O apoio dos pares existe, mas é frágil. Os colegas são mais jovens e a gente não divide a mesma rotina. Eu me sinto um pouco de fora. Esse isolamento não é só de conversa, é de tempo: não consigo ficar depois da aula para estudar junto. A instituição anuncia assistência estudantil, mas o edital saiu num mês em que eu estava sem margem. O serviço de psicologia do campus seria importante, e eu não tenho hora livre para enfrentar a fila.

A ansiedade eu já conheço de outros tempos. Aqui ela volta quando o boleto e o seminário caem na mesma semana. Tive um episódio de esgotamento no ano passado e precisei de atestado. A motivação está nos textos que conversam com o que eu vejo no trabalho. A dúvida sobre o curso quase não aparece. O que aparece é se o corpo aguenta até o diploma.`;

const FOCAL = `Três estudantes, sala pequena, fim de tarde. Concordam que o acúmulo de prazos é o tema que mais volta na roda. Uma voz diz que o apoio dos pares substitui a orientação que a coordenação não dá. Outra descreve a fila do serviço de psicologia do campus como simbólica: existe no papel e some na prática.

Há relato comum de ansiedade antes das apresentações e de esgotamento no fechamento do semestre. Duas pessoas nomeiam o isolamento dos fins de semana em que todo mundo entrega trabalho e ninguém se vê. A motivação aparece ligada ao estágio e à ideia de servir a alguma coisa fora da grade. A dúvida sobre o curso é dita em voz baixa, quase como traição ao esforço já feito.

A conciliação entre trabalho e estudo surge só para quem tem emprego formal. O apoio da família é descrito de dois modos que convivem: sustento material e cobrança para não fraquejar.`;

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildSampleDataset(id = "data_quest"): Dataset {
  const random = mulberry32(20260312);
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)]!;
  const rows: Record<string, string>[] = [];
  for (let index = 1; index <= 36; index++) {
    const genero = random() < 0.58 ? "Feminino" : random() < 0.9 ? "Masculino" : "Outro";
    const area = pick(["Humanas", "Exatas", "Saúde", "Sociais aplicadas"]);
    const trabalha = random() < 0.44 ? "Sim" : "Não";
    const rendaRoll = random();
    const renda = rendaRoll < 0.46 ? "Até 2 SM" : rendaRoll < 0.84 ? "2 a 5 SM" : "Acima de 5 SM";
    let idade = 18 + Math.floor(random() * 12);
    if (random() < 0.18) idade = 30 + Math.floor(random() * 10);
    const semestre = 1 + Math.floor(random() * 10);
    let sono = trabalha === "Sim" ? 4.5 + random() * 2.8 : 6 + random() * 2.4;
    sono = Math.round(sono * 10) / 10;
    const estudo = Math.round(trabalha === "Sim" ? 4 + random() * 12 : 8 + random() * 16);
    let estresse = 3.2 + (trabalha === "Sim" ? 1.6 : 0) + (7.5 - sono) * 0.55 + random() * 1.6;
    if (area === "Exatas") estresse += 0.4;
    estresse = Math.round(Math.max(1, Math.min(10, estresse)) * 10) / 10;
    let satisfacao = Math.round(5.4 - estresse * 0.32 + random() * 0.8);
    satisfacao = Math.max(1, Math.min(5, satisfacao));
    const apoio = random() < (estresse >= 7 ? 0.48 : 0.2) ? "Sim" : "Não";
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
      apoio_psicologico: index === 7 ? "" : apoio,
    });
  }
  return {
    id,
    name: "Questionário — bem-estar na graduação",
    columns: [
      { name: "participante", type: "text" },
      { name: "idade", type: "number" },
      { name: "genero", type: "category" },
      { name: "area", type: "category" },
      { name: "semestre", type: "number" },
      { name: "trabalha", type: "category" },
      { name: "renda", type: "category" },
      { name: "horas_estudo", type: "number" },
      { name: "horas_sono", type: "number" },
      { name: "estresse", type: "number" },
      { name: "satisfacao", type: "number" },
      { name: "apoio_psicologico", type: "category" },
    ],
    rows,
  };
}

const CODES: Code[] = [
  { id: "code_carga", parentId: null, name: "Carga e tempo", description: "Pressão do calendário acadêmico e a disputa do tempo com o trabalho.", color: "mark-1" },
  { id: "code_prazos", parentId: "code_carga", name: "Acúmulo de prazos", description: "Entregas, provas e leituras que se sobrepõem.", color: "mark-1" },
  { id: "code_conciliacao", parentId: "code_carga", name: "Conciliação trabalho-estudo", description: "Quem trabalha e estuda ao mesmo tempo.", color: "mark-6" },
  { id: "code_apoio", parentId: null, name: "Apoio", description: "Redes que sustentam a permanência ou falham em sustentá-la.", color: "mark-7" },
  { id: "code_pares", parentId: "code_apoio", name: "Pares", description: "Colegas, grupos de turma e estudo conjunto.", color: "mark-7" },
  { id: "code_instituicao", parentId: "code_apoio", name: "Instituição", description: "Coordenação, assistência, monitoria e psicologia do campus.", color: "mark-3" },
  { id: "code_familia", parentId: "code_apoio", name: "Família", description: "Sustento, cuidado e os limites da conversa sobre saúde.", color: "mark-2" },
  { id: "code_sofrimento", parentId: null, name: "Sofrimento psíquico", description: "Nomes que os estudantes dão ao mal-estar.", color: "mark-5" },
  { id: "code_ansiedade", parentId: "code_sofrimento", name: "Ansiedade", description: "Aperto e antecipação, sobretudo antes da avaliação.", color: "mark-5" },
  { id: "code_esgotamento", parentId: "code_sofrimento", name: "Esgotamento", description: "Parada, falta, atestado, corpo que não levanta.", color: "mark-2" },
  { id: "code_isolamento", parentId: "code_sofrimento", name: "Isolamento", description: "Estar só na entrega, fora do grupo, de madrugada.", color: "mark-8" },
  { id: "code_sentido", parentId: null, name: "Sentido e permanência", description: "Por que ficar no curso e por que duvidar.", color: "mark-4" },
  { id: "code_motivacao", parentId: "code_sentido", name: "Motivação", description: "Estágio, projeto ou texto que encontra a prática.", color: "mark-4" },
  { id: "code_duvida", parentId: "code_sentido", name: "Dúvida sobre o curso", description: "Hesitação, mercado e medo de largar.", color: "mark-6" },
];

export function createDemoProject(): Project {
  const sources: Source[] = [
    {
      id: "src_marina",
      title: "Entrevista — Marina",
      kind: "entrevista",
      participant: "Marina",
      date: "2026-03-04",
      text: MARINA,
      attributes: [
        { key: "Gênero", value: "Feminino" },
        { key: "Curso", value: "Pedagogia" },
        { key: "Idade", value: "22" },
        { key: "Trabalha", value: "Não" },
      ],
    },
    {
      id: "src_rafael",
      title: "Entrevista — Rafael",
      kind: "entrevista",
      participant: "Rafael",
      date: "2026-03-06",
      text: RAFAEL,
      attributes: [
        { key: "Gênero", value: "Masculino" },
        { key: "Curso", value: "Engenharia" },
        { key: "Idade", value: "24" },
        { key: "Trabalha", value: "Sim" },
      ],
    },
    {
      id: "src_lucia",
      title: "Entrevista — Lúcia",
      kind: "entrevista",
      participant: "Lúcia",
      date: "2026-03-11",
      text: LUCIA,
      attributes: [
        { key: "Gênero", value: "Feminino" },
        { key: "Curso", value: "Serviço Social" },
        { key: "Idade", value: "31" },
        { key: "Trabalha", value: "Sim" },
      ],
    },
    {
      id: "src_focal",
      title: "Grupo focal — turma mista",
      kind: "grupo-focal",
      participant: "Três estudantes",
      date: "2026-03-18",
      text: FOCAL,
      attributes: [
        { key: "Gênero", value: "Misto" },
        { key: "Curso", value: "Vários" },
        { key: "Trabalha", value: "Misto" },
      ],
    },
  ];

  const passages: { sourceId: string; codeId: string; excerpt: string; note?: string }[] = [
    { sourceId: "src_marina", codeId: "code_prazos", excerpt: "O acúmulo de prazos me tira o sono." },
    { sourceId: "src_marina", codeId: "code_pares", excerpt: "Esse apoio dos pares é o que me faz continuar." },
    { sourceId: "src_marina", codeId: "code_instituicao", excerpt: "Quando eu procurei o serviço de psicologia do campus, a fila era de dois meses." },
    { sourceId: "src_marina", codeId: "code_ansiedade", excerpt: "Eu chamo isso de ansiedade, não de preguiça.", note: "Categoria in vivo: ela recusa o rótulo de preguiça." },
    { sourceId: "src_marina", codeId: "code_esgotamento", excerpt: "eu tive um esgotamento e parei uma semana" },
    { sourceId: "src_marina", codeId: "code_familia", excerpt: "O apoio da família existe para a passagem e para o almoço" },
    { sourceId: "src_marina", codeId: "code_motivacao", excerpt: "Quando estou no estágio, com criança de verdade, volta a motivação." },
    { sourceId: "src_marina", codeId: "code_duvida", excerpt: "A dúvida sobre o curso aparece só quando eu estou sozinha em casa" },
    { sourceId: "src_marina", codeId: "code_isolamento", excerpt: "sentindo o isolamento daquela hora" },
    { sourceId: "src_rafael", codeId: "code_prazos", excerpt: "O acúmulo de prazos é tratado como rito de passagem." },
    { sourceId: "src_rafael", codeId: "code_conciliacao", excerpt: "A conciliação entre trabalho e estudo é um quebra-cabeça" },
    { sourceId: "src_rafael", codeId: "code_esgotamento", excerpt: "Foi esgotamento, não falta de interesse." },
    { sourceId: "src_rafael", codeId: "code_familia", excerpt: "O apoio da família se resume a um telefonema no domingo" },
    { sourceId: "src_rafael", codeId: "code_pares", excerpt: "Sem esse apoio dos pares eu já teria trancado." },
    { sourceId: "src_rafael", codeId: "code_instituicao", excerpt: "o serviço de psicologia do campus eu nunca consegui vaga" },
    { sourceId: "src_rafael", codeId: "code_isolamento", excerpt: "Não sinto um isolamento constante porque moro com dois colegas de turma.", note: "Caso negativo: o isolamento é negado pela moradia compartilhada." },
    { sourceId: "src_rafael", codeId: "code_ansiedade", excerpt: "A ansiedade aparece antes das provas de cálculo" },
    { sourceId: "src_rafael", codeId: "code_motivacao", excerpt: "A motivação volta quando um projeto dá certo" },
    { sourceId: "src_rafael", codeId: "code_duvida", excerpt: "A dúvida sobre o curso existe" },
    { sourceId: "src_lucia", codeId: "code_conciliacao", excerpt: "A conciliação entre trabalho e estudo não é frase de relatório, é a minha semana inteira." },
    { sourceId: "src_lucia", codeId: "code_prazos", excerpt: "O acúmulo de prazos me obriga a escolher o que entregar pela metade." },
    { sourceId: "src_lucia", codeId: "code_familia", excerpt: "O apoio da família é o que viabiliza" },
    { sourceId: "src_lucia", codeId: "code_pares", excerpt: "O apoio dos pares existe, mas é frágil" },
    { sourceId: "src_lucia", codeId: "code_isolamento", excerpt: "Esse isolamento não é só de conversa, é de tempo" },
    { sourceId: "src_lucia", codeId: "code_instituicao", excerpt: "O serviço de psicologia do campus seria importante" },
    { sourceId: "src_lucia", codeId: "code_ansiedade", excerpt: "A ansiedade eu já conheço de outros tempos." },
    { sourceId: "src_lucia", codeId: "code_esgotamento", excerpt: "Tive um episódio de esgotamento no ano passado" },
    { sourceId: "src_lucia", codeId: "code_motivacao", excerpt: "A motivação está nos textos que conversam com o que eu vejo no trabalho." },
    { sourceId: "src_lucia", codeId: "code_duvida", excerpt: "A dúvida sobre o curso quase não aparece.", note: "Caso negativo: a dúvida não é sobre o curso, é sobre o corpo aguentar." },
    { sourceId: "src_focal", codeId: "code_prazos", excerpt: "o acúmulo de prazos é o tema que mais volta" },
    { sourceId: "src_focal", codeId: "code_pares", excerpt: "o apoio dos pares substitui a orientação" },
    { sourceId: "src_focal", codeId: "code_instituicao", excerpt: "descreve a fila do serviço de psicologia do campus como simbólica" },
    { sourceId: "src_focal", codeId: "code_ansiedade", excerpt: "ansiedade antes das apresentações" },
    { sourceId: "src_focal", codeId: "code_esgotamento", excerpt: "esgotamento no fechamento do semestre" },
    { sourceId: "src_focal", codeId: "code_isolamento", excerpt: "o isolamento dos fins de semana" },
    { sourceId: "src_focal", codeId: "code_motivacao", excerpt: "A motivação aparece ligada ao estágio" },
    { sourceId: "src_focal", codeId: "code_duvida", excerpt: "A dúvida sobre o curso é dita em voz baixa" },
    { sourceId: "src_focal", codeId: "code_conciliacao", excerpt: "A conciliação entre trabalho e estudo surge só para quem tem emprego formal." },
    { sourceId: "src_focal", codeId: "code_familia", excerpt: "O apoio da família é descrito de dois modos" },
  ];

  const codings: Coding[] = passages.map((passage, index) => {
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
      note: passage.note ?? "",
    };
  });

  const memos: Memo[] = [
    {
      id: "memo_calendario",
      title: "Sofrimento como efeito do calendário",
      codeId: "code_sofrimento",
      updatedAt: "2026-03-18",
      body: "O mal-estar quase não aparece como traço de personalidade. Ele é narrado quando um prazo encosta no outro e a resposta da instituição chega tarde. No questionário, vale ver se o estresse mais alto acompanha quem trabalha e dorme pouco.",
    },
    {
      id: "memo_pares",
      title: "Pares no lugar da coordenação",
      codeId: "code_pares",
      updatedAt: "2026-03-18",
      body: "O grupo de colegas funciona como infraestrutura informal: lembra data, divide resumo, autoriza o desabafo. Onde o horário não coincide, como no caso de quem trabalha o dia inteiro, essa rede enfraquece e o isolamento vira falta de tempo.",
    },
    {
      id: "memo_proximo",
      title: "Próximo passo analítico",
      codeId: null,
      updatedAt: "2026-03-18",
      body: "Separar os casos negativos — quem nega isolamento ou dúvida — antes de fechar o tema da permanência. No quantitativo, cruzar trabalha com apoio psicológico e correlacionar horas de sono com estresse.",
    },
  ];

  return {
    id: "proj_demo",
    name: "Bem-estar na graduação",
    description:
      "Estudo misto, ilustrativo, com entrevistas, um grupo focal e um questionário sobre carga acadêmica, apoio e permanência. Substitua pelo seu material quando quiser.",
    updatedAt: "2026-03-18",
    sources,
    codes: CODES,
    codings,
    memos,
    datasets: [buildSampleDataset()],
  };
}
