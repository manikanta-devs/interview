import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({
  title,
  description,
  to,
  icon: Icon,
  accent = "blue",
  children,
}) {
  const accents = {
    blue: "bg-sky-500/12 text-sky-200 border-sky-400/25",
    green: "bg-emerald-500/12 text-emerald-200 border-emerald-400/25",
    purple: "bg-violet-500/12 text-violet-200 border-violet-400/25",
  };

  return (
    <Link
      to={to}
      className="app-card group block min-h-64 border-white/8 p-5 transition hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_24px_70px_rgba(124,58,237,0.16)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-lg border p-3 ${accents[accent] || accents.blue}`}
        >
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
        <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-300" />
      </div>
      <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </Link>
  );
}
