import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const defaultData = [
  { week: "W1", score: 64 },
  { week: "W2", score: 70 },
  { week: "W3", score: 73 },
  { week: "W4", score: 81 },
  { week: "W5", score: 84 },
  { week: "W6", score: 88 },
];

export default function ChartCard({
  title = "Overall Progress",
  data = defaultData,
}) {
  return (
    <section className="app-card border-white/8 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">
            Interview readiness score over time
          </p>
        </div>
        <span className="neon-badge">This Week</span>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="week"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0A0F1D",
                border: "1px solid rgba(124,58,237,0.28)",
                borderRadius: "12px",
                color: "#E2E8F0",
                boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#7c3aed"
              fill="#7c3aed"
              fillOpacity={0.18}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
