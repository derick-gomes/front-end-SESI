//será feito pelos alunos

export interface Curriculo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;

  resumo?: string;

  experiencias?: {
    cargo: string;
    empresa: string;
    inicio: string;
    fim?: string;
  }[];

  formacoes?: {
    grau: string;
    curso: string;
    instituicao: string;
    inicio: string;
    fim?: string;
  }[];

  habilidades?: {
    nome: string;
    nivel: string;
  }[];

  usuarioId?: number;
}
