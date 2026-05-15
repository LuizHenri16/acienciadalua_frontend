import { Material, MaterialType } from "@/types/material";

export const ALL_MATERIALS: Material[] = [
  // Materiais de Estudo (Study)
  {
    id: "1",
    title: "Caderno de Química Orgânica",
    price: 29.9,
    category: MaterialType.STUDENT,
    description: "Caderno completo de química orgânica com exercícios e resoluções detalhadas para ajudar no seu aprendizado."
  },
  {
    id: "2",
    title: "Resumão de Termoquímica",
    price: 19.9,
    category: MaterialType.STUDENT,
    description: "Resumão completo de termoquímica com os principais conceitos, fórmulas e exercícios resolvidos."
  },
  {
    id: "3",
    title: "Lista de Exercícios — Equilíbrio",
    price: 14.9,
    category: MaterialType.STUDENT,
    description: "Lista completa de exercícios de equilíbrio químico com resoluções passo a passo."
  },
  {
    id: "4",
    title: "Mapa Mental: Tabela Periódica",
    price: 9.9,
    category: MaterialType.STUDENT,
    description: "Mapa mental completo e visual da tabela periódica para facilitar a memorização e compreensão."
  },

  // Materiais para Dar Aula (Teach)
  {
    id: "10",
    title: "Plano de Aula — Ligações Iônicas",
    price: 24.9,
    category: MaterialType.TEACHER,
    description: "Plano de aula completo de ligações iônicas, incluindo objetivos, metodologia e atividades práticas."
  },
  {
    id: "11",
    title: "Slides: Reações Orgânicas",
    price: 34.9,
    category: MaterialType.TEACHER,
    description: "Slides profissionais e didáticos sobre reações orgânicas, prontos para serem usados em sala de aula."
  },
  {
    id: "12",
    title: "Kit Atividades — Soluções",
    price: 39.9,
    category: MaterialType.TEACHER,
    description: "Kit completo de atividades sobre soluções, com exercícios de diferentes níveis e gabarito."
  },
  {
    id: "13",
    title: "Banco de Questões ENEM Química",
    price: 49.9,
    category: MaterialType.TEACHER,
    description: "Banco completo de questões de Química do ENEM, organizado por temas e com resoluções comentadas."
  },
];
