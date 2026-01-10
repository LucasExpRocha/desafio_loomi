import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe o usuário' })
    .refine(
      (val) => {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.test(val);
      },
      { message: 'Insira um e-mail válido' }
    ),
  password: z.string().min(1, { message: 'Informe a senha' }),
});
