import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Target, Award, CheckCircle, Play, Github, Twitter, Linkedin } from "lucide-react";

export default function PremiumLandingPro() {
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
        x: (y - 0.5) * 20,
        y: (x - 0.5) * 20,
      });
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
      title: "🧠 AI-Powered Coaching",
      description: "Gemini AI provides personalized feedback on every answer with detailed insights",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Target,
      title: "🎯 Smart Resume Analysis",
      description: "ATS-optimized analysis with real job description matching",
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      icon: Award,
      title: "💰 Salary Negotiation",
      description: "Practice negotiating compensation with realistic HR scenarios",
      gradient: "from-orange-600 to-red-600",
    },
    {
      icon: Zap,
      title: "⚡ Real-Time Practice",
      description: "Interactive video interviews with AI avatar and voice recognition",
      gradient: "from-green-600 to-emerald-600",
    },
  ];

  const stats = [
    { number: "6+", label: "AI Features", icon: "🤖" },
    { number: "12+", label: "Interview Tools", icon: "🛠️" },
    { number: "100%", label: "Free Forever", icon: "🎉" },
    { number: "24/7", label: "AI Support", icon: "🌙" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        
        {/* Dynamic gradient following mouse */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`,
            transition: "background 0.2s ease-out",
          }}
        />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      {/* 3D Floating Elements - Trending 2024 Style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-2xl opacity-20"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${15 + i * 10}%`,
              top: `${5 + i * 12}%`,
              border: "2px solid rgba(99, 102, 241, 0.3)",
              transform: `
                perspective(1200px)
                rotateX(${rotation.x + scrollY * 0.1}deg)
                rotateY(${rotation.y + scrollY * 0.1}deg)
                rotateZ(${scrollY * 0.2}deg)
                scale(${0.8 + Math.sin(scrollY * 0.01 + i) * 0.2})
              `,
              transition: "transform 0.1s ease-out",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            NexHire
          </span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Play className="w-5 h-5" />
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* 3D Animated Title */}
          <div
            style={{
              transform: `
                perspective(1500px)
                rotateX(${Math.min(scrollY * 0.05, 5)}deg)
                translateZ(0)
              `,
              opacity: 1 - Math.max(0, scrollY - 300) / 400,
            }}
          >
            <div className="mb-4 inline-block px-4 py-2 rounded-full border border-indigo-500/50 bg-indigo-500/10">
              <span className="text-sm font-bold text-indigo-300">✨ 2024's #1 Interview Prep Platform</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent block">
                Master Every
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block">
                Interview
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered interview preparation with real feedback. Practice with our avatar, optimize your resume, and master tough questions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative px-12 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 flex items-center gap-2"
            >
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Start Free Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-12 py-4 rounded-xl border-2 border-indigo-500 text-indigo-400 font-bold text-lg hover:bg-indigo-500/10 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 hover:border-indigo-500/50 transition-all"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01 + idx) * 5}px)`,
                }}
              >
                <p className="text-3xl mb-2">{stat.icon}</p>
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
      <section className="relative z-10 py-24 px-4">
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
                  className="group p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.01 + idx) * 8}px)`,
                  }}
                >
                  <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{feature.description}</p>
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

          <div className="space-y-3">
            {[
              "✅ Completely free - no credit card needed",
              "✅ Powered by Google Gemini AI",
              "✅ Real-time feedback on your answers",
              "✅ Video interviews with 2D AI avatar",
              "✅ Resume ATS analysis and scoring",
              "✅ Salary negotiation practice",
              "✅ Interview cheat sheets generation",
              "✅ Unlimited practice - no limits",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all group cursor-pointer"
              >
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-lg text-gray-200 group-hover:text-white transition-colors">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/10 to-cyan-600/10 overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 blur-3xl opacity-30" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-black">
                Ready to Land Your Dream Job? 🚀
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of professionals who've mastered their interviews with NexHire
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

      {/* Footer - Professional */}
      <footer className="relative z-10 py-12 px-4 border-t border-indigo-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-indigo-500/20 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 NexHire. All rights reserved. Powered by Google Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
