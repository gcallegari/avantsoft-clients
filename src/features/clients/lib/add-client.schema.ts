import { z } from 'zod';

const AddClientSchema = z.object({
  nomeCompleto: z.string().min(1, 'Informe o nome completo'),
  email: z.string().email('E-mail inválido'),
  nascimento: z.string().min(1, 'Informe a data de nascimento'),
});

export type AddClientInput = z.infer<typeof AddClientSchema>;

export { AddClientSchema };
