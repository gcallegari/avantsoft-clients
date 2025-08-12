// features/clients/lib/add-client.schema.ts
import { z } from 'zod';
export const AddClientSchema = z.object({
  nome: z.string().min(1, 'Informe o nome completo'),
  email: z.string().email('E-mail inválido'),
  nascimento: z.string().min(1, 'Informe a data de nascimento'),
});
export type AddClientInput = z.infer<typeof AddClientSchema>;
