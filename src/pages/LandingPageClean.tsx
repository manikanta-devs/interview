import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

export default function LandingPageClean() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: any) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x: e.clientX, y: e.clientY });
      setRotation({
        x: (y - 0.5) * 15,
        y: (x - 0.5) * 15,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
            transition: "background 0.2s ease-out",
          }}
        />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      {/* 3D Floating Cubes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-lg opacity-15"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${20 + i * 12}%`,
              top: `${10 + i * 14}%`,
              border: "2px solid rgba(99, 102, 241, 0.4)",
              transform: `
                perspective(1200px)
                rotateX(${rotation.x + scrollY * 0.08}deg)
                rotateY(${rotation.y + scrollY * 0.08}deg)
                rotateZ(${scrollY * 0.15}deg)
                scale(${0.7 + Math.sin(scrollY * 0.01 + i) * 0.3})
              `,
              transition: "transform 0.1s ease-out",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          NexHire
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-transform text-sm"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Title with 3D Effect */}
          <div
            style={{
              transform: `
                perspective(1500px)
                rotateX(${Math.min(scrollY * 0.04, 8)}deg)
                translateZ(0)
              `,
              opacity: 1 - Math.max(0, scrollY - 400) / 500,
            }}
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent block">
                Master Your
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block">
                Interview Skills
              </span>
            </h1>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered interview preparation with real-time feedback and practice tools
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-base hover:scale-110 transition-transform hover:shadow-2xl hover:shadow-indigo-500/50"
          >
            <Play className="w-5 h-5" />
            Start Free
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { value: "6+", label: "AI Features" },
              { value: "12+", label: "Tools" },
              { value: "100%", label: "Free" },
              { value: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            What You Get
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "AI Interview Coach", desc: "Real-time feedback powered by Gemini AI" },
              { title: "Resume Analysis", desc: "ATS optimization and scoring" },
              { title: "Video Practice", desc: "Practice with AI avatar" },
              { title: "Salary Negotiation", desc: "Learn compensation tactics" },
              { title: "Question Bank", desc: "Thousands of interview questions" },
              { title: "Progress Tracking", desc: "See your improvement over time" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Why NexHire?
          </h2>

          <div className="space-y-3">
            {[
              "Free forever - no credit card required",
              "Powered by Google Gemini AI",
              "Unlimited practice sessions",
              "Real interview scenarios",
              "Detailed performance analytics",
              "Access all features instantly",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="p-12 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/10 to-cyan-600/10 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Ace Your Interviews?</h2>
            <p className="text-gray-300">Start your free preparation now with AI-powered tools</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              Launch Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-indigo-500/20 py-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2024 NexHire. All rights reserved.</p>
      </footer>
    </div>
  );
}
