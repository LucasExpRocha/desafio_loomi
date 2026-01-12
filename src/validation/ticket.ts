import z from 'zod';

export type TicketSchema = z.infer<typeof ticketSchema>;

export const ticketSchema = z.object({
  priority: z.enum(['Urgente', 'Média', 'Baixa']),
  client: z.string().min(1, { message: 'Informe o cliente' }),
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .refine(
      (val) => {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.test(val);
      },
      { message: 'Insira um e-mail válido' }
    ),
  subject: z.string().min(1, { message: 'Informe o assunto' }),
  status: z.enum(['Aberto', 'Em andamento', 'Fechado']),
  responsible: z.string().min(1, { message: 'Informe o responsável' }),
});
