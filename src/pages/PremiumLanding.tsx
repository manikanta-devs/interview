import { PremiumNexHireLogoLarge, PremiumNexHireLogo } from "../components/PremiumLogo";
import { ArrowRight, Zap, Brain, TrendingUp, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PremiumLanding() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Interviews",
      description: "Advanced evaluation with real-time feedback powered by Gemini 2.0",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track your progress with detailed metrics and improvement insights",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get immediate analysis on fluency, confidence, and relevance",
      gradient: "from-orange-600 to-red-500",
    },
  ];

  const benefits = [
    "Voice & video interview practice",
    "AI-powered scoring & feedback",
    "Persistent progress tracking",
    "Professional metrics dashboard",
    "Improvement recommendations",
    "Resume analysis tools",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PremiumNexHireLogo />
              <span className="text-xl font-black gradient-text">NexHire</span>
            </div>
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center animate-slideInUp">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <PremiumNexHireLogoLarge />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Master Your <span className="gradient-text">Interviews with AI</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Practice with real-time AI feedback, track your progress, and land your dream job with
              NexHire's intelligent interview platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                to="/interview/voice"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Practicing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-xl border-2 border-indigo-500 text-white font-bold text-lg hover:bg-indigo-500/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16">Powerful Features</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="group glass rounded-2xl p-8 hover:border-indigo-400 transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-950/30 to-purple-950/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black mb-8">Why Choose NexHire?</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                      <Check className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                      <span className="text-lg text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-12 flex items-center justify-center h-96">
                <div className="text-center">
                  <PremiumNexHireLogoLarge />
                  <p className="text-gray-400 mt-6">Professional interview preparation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center glass-dark rounded-3xl p-12">
            <h2 className="text-4xl font-black mb-6">Ready to Master Your Interviews?</h2>
            <p className="text-xl text-gray-300 mb-8">Join thousands of successful candidates using NexHire</p>
            <Link
              to="/interview/voice"
              className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-indigo-500/20 py-12 px-4">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>&copy; 2026 NexHire. All rights reserved. | AI-Powered Interview Intelligence</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
