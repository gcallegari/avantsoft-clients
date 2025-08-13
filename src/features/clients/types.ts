import { z } from 'zod';

export const SaleSchema = z.object({
  data: z.string(),
  value: z.number().nonnegative(),
});

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email().or(z.literal('')),
  birthdate: z.string().optional().default(''),
  sales: z.array(SaleSchema),
});

export type Client = z.infer<typeof ClientSchema>;
