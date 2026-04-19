export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "blue",
}) {
  const accents = {
    blue: "bg-sky-500/12 text-sky-200 border-sky-400/25",
    green: "bg-emerald-500/12 text-emerald-200 border-emerald-400/25",
    purple: "bg-violet-500/12 text-violet-200 border-violet-400/25",
    orange: "bg-amber-500/12 text-amber-200 border-amber-400/25",
  };

  return (
    <article className="app-card border-white/8 p-5 transition hover:-translate-y-0.5 hover:border-violet-400/50 hover:shadow-[0_24px_70px_rgba(124,58,237,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-lg border p-3 ${accents[accent] || accents.blue}`}
        >
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
        <div className="h-10 w-16 rounded bg-[linear-gradient(135deg,transparent,rgba(124,58,237,0.28))]" />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">
        {value}
      </p>
      <p className="mt-3 text-sm text-slate-400">{detail}</p>
    </article>
  );
}
