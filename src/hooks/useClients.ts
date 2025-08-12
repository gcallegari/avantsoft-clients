import { useCallback, useEffect, useMemo, useState } from 'react';
import { getClients } from '../api/clients.api';
import type { Client } from '../features/clients/types';
import { getErrorMessage } from './utils';

export function useClients() {
  const [list, setList] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setList(data);
      } catch (e: unknown) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addClient = useCallback((c: Omit<Client, 'id' | 'sales'>) => {
    setList(prev => [{ ...c, id: crypto.randomUUID(), sales: [] }, ...prev]);
  }, []);

  const salesByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of list) {
      for (const v of c.sales) {
        map.set(v.data, (map.get(v.data) ?? 0) + v.value);
      }
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, total]) => ({ date, total }));
  }, [list]);

  const leaders = useMemo(() => {
    let maxVol = { id: '', val: -1 };
    let maxAvg = { id: '', val: -1 };
    let maxFreq = { id: '', val: -1 };

    for (const c of list) {
      const freq = c.sales.length;
      const vol = c.sales.reduce((s, v) => s + v.value, 0);
      const avg = freq ? vol / freq : 0;
      if (vol > maxVol.val) maxVol = { id: c.id, val: vol };
      if (avg > maxAvg.val) maxAvg = { id: c.id, val: avg };
      if (freq > maxFreq.val) maxFreq = { id: c.id, val: freq };
    }

    return {
      topVolume: maxVol.id ? { id: maxVol.id, total: maxVol.val } : undefined,
      topAverage: maxAvg.id ? { id: maxAvg.id, avg: maxAvg.val } : undefined,
      topFrequency: maxFreq.id ? { id: maxFreq.id, freq: maxFreq.val } : undefined,
    };
  }, [list]);

  return { list, loading, error, addClient, salesByDay, leaders };
}
