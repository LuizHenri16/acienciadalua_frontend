import { Material, MaterialType } from "@/types/material";

export const ALL_MATERIALS: Material[] = [
  // Materiais de Estudo (Study)
  { 
    id: "1", 
    name: "Caderno de Química Orgânica", 
    price: 29.9, 
    type: MaterialType.STUDY, 
    description: "Caderno completo de química orgânica com exercícios e resoluções detalhadas para ajudar no seu aprendizado." 
  },
  { 
    id: "2", 
    name: "Resumão de Termoquímica", 
    price: 19.9, 
    type: MaterialType.STUDY, 
    description: "Resumão completo de termoquímica com os principais conceitos, fórmulas e exercícios resolvidos." 
  },
  { 
    id: "3", 
    name: "Lista de Exercícios — Equilíbrio", 
    price: 14.9, 
    type: MaterialType.STUDY, 
    description: "Lista completa de exercícios de equilíbrio químico com resoluções passo a passo." 
  },
  { 
    id: "4", 
    name: "Mapa Mental: Tabela Periódica", 
    price: 9.9, 
    type: MaterialType.STUDY, 
    description: "Mapa mental completo e visual da tabela periódica para facilitar a memorização e compreensão." 
  },
  
  // Materiais para Dar Aula (Teach)
  { 
    id: "10", 
    name: "Plano de Aula — Ligações Iônicas", 
    price: 24.9, 
    type: MaterialType.TEACH, 
    description: "Plano de aula completo de ligações iônicas, incluindo objetivos, metodologia e atividades práticas." 
  },
  { 
    id: "11", 
    name: "Slides: Reações Orgânicas", 
    price: 34.9, 
    type: MaterialType.TEACH, 
    description: "Slides profissionais e didáticos sobre reações orgânicas, prontos para serem usados em sala de aula." 
  },
  { 
    id: "12", 
    name: "Kit Atividades — Soluções", 
    price: 39.9, 
    type: MaterialType.TEACH, 
    description: "Kit completo de atividades sobre soluções, com exercícios de diferentes níveis e gabarito." 
  },
  { 
    id: "13", 
    name: "Banco de Questões ENEM Química", 
    price: 49.9, 
    type: MaterialType.TEACH, 
    description: "Banco completo de questões de Química do ENEM, organizado por temas e com resoluções comentadas." 
  },
];
