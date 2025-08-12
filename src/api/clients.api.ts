import { parseClientsResponse } from '@/features/clients/lib/clients.normalizers';
import { http } from '@/shared/lib/http';


export async function getClients() {
  const raw = await http<unknown>('/mock/clients.json');
  return parseClientsResponse(raw);
}
