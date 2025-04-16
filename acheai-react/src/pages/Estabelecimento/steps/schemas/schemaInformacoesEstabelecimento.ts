import { z } from "zod";

export const tiposEstabelecimento = ['RESTAURANTE', 'CAFÉ', 'BAR E DRINKS', 'CASA NOTURNA'] as const;

export const schemaInformacoesEstabelecimento = z.object({
  nomeEstabelecimento: z.string().min(1, { message: 'Nome do estabelecimento é obrigatório' }),
  cnpj: z.string().refine(
    (val) => val.replace(/\D/g, '').length === 14,
    { message: 'CNPJ deve ter 14 dígitos' }
  ),
  tipoEstabelecimento: z.enum(tiposEstabelecimento, {
    errorMap: () => ({ message: 'Selecione um tipo de estabelecimento' }),
  }),
  cep: z.string(),
  endereco: z.string(),
  numero: z.string().min(1, { message: 'Número é obrigatório' }),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
});

export type StepEstabelecimentoFieldValues = z.infer<typeof schemaInformacoesEstabelecimento>;
