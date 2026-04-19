import { useState } from "react";
import { Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogoOption1, LogoOption2, LogoOption3, LogoOption4 } from "../components/LogoOptions";

export default function LogoShowcase() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const logos = [
    {
      id: 1,
      name: "Tech Minimal",
      tagline: "Interlocking Circles",
      description: "Modern AI vibes - Sleek & minimalist design. Perfect for a tech-forward brand.",
      component: LogoOption1,
      colors: "Blue → Cyan → Purple",
    },
    {
      id: 2,
      name: "Bold Shield",
      tagline: "Security + Intelligence",
      description: "Professional trust - Corporate feel. Great for enterprise-level applications.",
      component: LogoOption2,
      colors: "Pink → Orange",
    },
    {
      id: 3,
      name: "Dynamic Arrow",
      tagline: "Growth & Movement",
      description: "Career progression - Motivational & uplifting. Shows forward momentum.",
      component: LogoOption3,
      colors: "Blue → Cyan → Purple",
    },
    {
      id: 4,
      name: "Interview Pulse",
      tagline: "Conversation Bubble",
      description: "Human-centric AI - Approachable & friendly. Emphasizes communication.",
      component: LogoOption4,
      colors: "Cyan → Blue → Purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Choose Your Logo</h1>
            <p className="mt-2 text-slate-400">Pick the perfect identity for NexHire</p>
          </div>
        </div>
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {logos.map(({ id, name, tagline, description, component: Logo, colors }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 transition-all ${
              selected === id
                ? "border-violet-500 bg-gradient-to-br from-violet-500/20 to-violet-500/5 shadow-[0_0_60px_rgba(124,58,237,0.3)]"
                : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Logo Display */}
              <div className="flex flex-col items-center">
                <div className="mb-4 h-24 w-24 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Logo size="lg" animated={true} />
                </div>
                <h2 className="text-2xl font-black text-white">{name}</h2>
                <p className="mt-1 text-sm font-semibold text-violet-300">{tagline}</p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Colors</span>
                  <span className="text-sm text-slate-400">{colors}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              {selected === id && (
                <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-violet-600/20 border border-violet-500/30">
                  <Check className="h-5 w-5 text-violet-300" />
                  <span className="text-sm font-bold text-violet-300">Selected</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 rounded-lg border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!selected}
          onClick={() => {
            if (selected) {
              localStorage.setItem("nexhire-logo", selected.toString());
              navigate(-1);
            }
          }}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-600/50 transition-all"
        >
          {selected ? "✓ Finalize This Logo" : "Select a Logo"}
        </button>
      </div>

      {/* Preview Section */}
      {selected && (
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Live Preview</h3>
            <div className="flex items-center justify-between gap-4 p-6 bg-slate-950/50 rounded-lg">
              {/* Header Logo */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  {(() => {
                    const Logo = logos[selected - 1]?.component;
                    return Logo ? <Logo size="md" animated={false} /> : null;
                  })()}
                </div>
                <div>
                  <p className="font-black text-white">{logos[selected - 1]?.name}</p>
                  <p className="text-xs text-slate-400">NexHire Studio</p>
                </div>
              </div>

              {/* Profile Logo */}
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                {(() => {
                  const Logo = logos[selected - 1]?.component;
                  return Logo ? <Logo size="sm" animated={false} /> : null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
