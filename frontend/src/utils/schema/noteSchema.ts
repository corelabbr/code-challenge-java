import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1, { message: 'Título da nota é obrigatório' }),
  description: z.string().min(1, { message: 'Adicione uma descrição' }),
})
