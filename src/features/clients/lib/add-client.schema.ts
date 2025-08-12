import { z } from 'zod';

const AddClientSchema = z.object({
  name: z.string().min(1, 'Informe o nome completo'),
  email: z.string().email('E-mail inválido'),
  birthdate: z.string().min(1, 'Informe a data de nascimento'),
});

export type AddClientInput = z.infer<typeof AddClientSchema>;

export { AddClientSchema };
