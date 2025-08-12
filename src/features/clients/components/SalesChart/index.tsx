import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function SalesAreaChart({ data }: { data: { date: string; total: number }[] }) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, bottom: 0, left: 0, right: 0 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#026CB6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#026CB6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1f2937" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis stroke="#9ca3af" tickLine={false} axisLine={{ stroke: '#334155' }} />
          <Tooltip
            contentStyle={{
              background: '#0b1222',
              border: '1px solid #334155',
              color: '#e5e7eb',
            }}
          />
          <Area type="monotone" dataKey="total" stroke="#026CB6" fill="url(#g)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
