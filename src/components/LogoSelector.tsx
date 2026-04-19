import {
  LogoOption1,
  LogoOption2,
  LogoOption3,
  LogoOption4,
} from "./LogoOptions";
import { Check } from "lucide-react";
import { useState } from "react";

export function LogoSelector({
  onSelect,
}: {
  onSelect: (logo: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const logos = [
    {
      id: 1,
      name: "Tech Minimal",
      description: "Interlocking circles - Modern AI vibes",
      component: LogoOption1,
    },
    {
      id: 2,
      name: "Bold Shield",
      description: "Security + Intelligence - Professional trust",
      component: LogoOption2,
    },
    {
      id: 3,
      name: "Dynamic Arrow",
      description: "Growth & Movement - Career progression",
      component: LogoOption3,
    },
    {
      id: 4,
      name: "Interview Pulse",
      description: "Conversation bubble - Human-centric AI",
      component: LogoOption4,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl">
        <h2 className="mb-2 text-center text-3xl font-black text-white">
          Choose Your NexHire Logo
        </h2>
        <p className="mb-8 text-center text-sm text-slate-400">
          Pick the one that resonates with your brand
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
          {logos.map(({ id, name, description, component: Logo }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                selected === id
                  ? "border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform">
                <Logo size="lg" animated={true} />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-white">{name}</p>
                <p className="text-[10px] text-slate-400 mt-1">{description}</p>
              </div>
              {selected === id && (
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onSelect(0)}
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Keep Current
          </button>
          <button
            onClick={() => {
              if (selected) onSelect(selected);
            }}
            disabled={!selected}
            className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 hover:shadow-lg transition-all"
          >
            Apply Selected
          </button>
        </div>
      </div>
    </div>
  );
}
