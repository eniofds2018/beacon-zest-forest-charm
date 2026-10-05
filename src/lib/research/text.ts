const STOPWORDS = new Set(
  `a o os as um uma uns umas de da do das dos e em no na nos nas num numa dum duma
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
the and for with from this that`.split(/\s+/).filter(Boolean),
);

export function tokenize(text: string): string[] {
  const words = text.toLocaleLowerCase("pt-BR").match(/[\p{L}\p{N}]+/gu) ?? [];
  return words.filter((word) => word.length >= 3 && !/^\d+$/u.test(word) && !STOPWORDS.has(word));
}

export function wordFrequencies(text: string, limit = 40): { word: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const word of tokenize(text)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, "pt"))
    .slice(0, limit);
}

export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
