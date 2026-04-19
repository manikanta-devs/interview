import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Target, Award, CheckCircle, Play } from "lucide-react";

export default function PremiumLanding() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Coaching",
      description: "Get personalized feedback on every answer using advanced Gemini AI",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Target,
      title: "Resume Mastery",
      description: "ATS-optimized analysis and real job description matching",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Award,
      title: "Salary Negotiation",
      description: "Practice negotiating like a pro with real HR scenarios",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: Zap,
      title: "Real-Time Practice",
      description: "Video interviews with 2D AI avatar and voice recognition",
      color: "from-green-600 to-emerald-600",
    },
  ];

  const stats = [
    { number: "6+", label: "Advanced AI Features" },
    { number: "12+", label: "Interview Tools" },
    { number: "100%", label: "Free Forever" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.3) 0%, transparent 50%)`,
            transition: "background 0.3s ease-out",
          }}
        />
        {/* Animated grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      {/* Floating 3D Cubes */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border-2 border-indigo-500/20 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
              transform: `rotateX(${scrollY * 0.5}deg) rotateY(${scrollY * 0.5}deg) rotateZ(${scrollY * 0.3}deg)`,
              opacity: 0.1 + Math.sin(scrollY * 0.01 + i) * 0.1,
              perspective: "1000px",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            NexHire
          </span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* 3D Animated Title */}
          <div
            style={{
              transform: `perspective(1000px) rotateX(${Math.min(scrollY * 0.1, 10)}deg) translateZ(0)`,
              opacity: 1 - Math.max(0, scrollY - 200) / 300,
            }}
          >
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Master Every
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Interview
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered interview preparation platform. Practice with real feedback, master tough questions, and land your dream job.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Start Free Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-10 py-4 rounded-xl border-2 border-indigo-500 text-indigo-400 font-bold text-lg hover:bg-indigo-500/10 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 hover:border-indigo-500/50 transition-all"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.01 + idx) * 5}px)`,
                  }}
                >
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose NexHire?
            </span>
          </h2>

          <div className="space-y-4">
            {[
              "Free forever - no credit card needed",
              "Powered by Google Gemini AI",
              "Real-time feedback on your answers",
              "Video interviews with 2D avatar",
              "Resume ATS analysis and scoring",
              "Salary negotiation practice",
              "Interview cheat sheets",
              "Unlimited practice questions",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5"
              >
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <span className="text-lg text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/10 to-cyan-600/10 overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 blur-3xl opacity-30" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-black">
                Ready to Master Your Interviews?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of job seekers who've landed their dream roles with NexHire
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 px-12 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-indigo-500/50"
              >
                <Sparkles className="w-5 h-5" />
                Start Your Journey Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-indigo-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 NexHire. Powered by Google Gemini AI. Made with ❤️ for your success.</p>
        </div>
      </footer>
    </div>
  );
}
