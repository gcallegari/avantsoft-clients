import { z } from 'zod';

export const SaleSchema = z.object({ data: z.string(), valor: z.number().nonnegative() });
export const ClientSchema = z.object({
  id: z.string(),
  nome: z.string().min(1),
  email: z.string().email().or(z.literal('')),
  nascimento: z.string().optional().default(''),
  vendas: z.array(SaleSchema),
});
export type Client = z.infer<typeof ClientSchema>;
