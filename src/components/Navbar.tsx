import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { PremiumNexHireLogo } from "./PremiumLogo";

const mobileLinks = [
  ["Dashboard", "/dashboard"],
  ["Resume", "/resume"],
  ["Voice", "/interview/voice"],
  ["Video", "/interview/video"],
  ["Quiz", "/quiz"],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-indigo-500/20 glass px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="logo-mark shrink-0">
            <PremiumNexHireLogo />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-black gradient-text sm:text-2xl">NexHire</h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                AI Interview Intelligence
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-gray-400">
              Master your interviews with real-time AI feedback
            </p>
          </div>
        </div>



        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full border border-indigo-500/40 glass p-2 flex items-center justify-center hover:border-indigo-400/60 transition-colors">
            <PremiumNexHireLogo />
          </div>
        </div>
      </div>
    </header>
  );
}
