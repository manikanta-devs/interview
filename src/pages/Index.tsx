import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Video, Brain, Target, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Camera Analysis",
    description: "Get real-time feedback on your body language, eye contact, and facial presence during practice sessions.",
  },
  {
    icon: Mic,
    title: "Voice & Speech Analysis",
    description: "Detect filler words, measure speaking pace, and track fluency to polish your verbal delivery.",
  },
  {
    icon: Brain,
    title: "Smart Mock Interviews",
    description: "Practice with curated behavioral questions and receive instant AI-powered feedback on your answers.",
  },
  {
    icon: Target,
    title: "Confidence Scoring",
    description: "Get a comprehensive confidence score based on multiple factors including voice, posture, and content.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    description: "Receive specific, actionable suggestions to improve your interview performance session by session.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Everything runs in your browser. No data is sent to any server. Your practice sessions stay private.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Interview Confidence AI</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/analyzer">
              <Button variant="ghost" size="sm">Analyzer</Button>
            </Link>
            <Link to="/mock-interview">
              <Button variant="ghost" size="sm">Mock Interview</Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="animate-slide-up max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Ace Your Next Interview with{" "}
              <span className="gradient-text">AI-Powered Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Practice interviews with real-time voice analysis, camera feedback, and smart coaching — all running privately in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyzer">
                <Button variant="hero" size="lg">
                  <Video className="w-5 h-5" />
                  Voice & Camera Analyzer
                </Button>
              </Link>
              <Link to="/mock-interview">
                <Button variant="hero-outline" size="lg">
                  <Mic className="w-5 h-5" />
                  Mock Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Prepare</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Built with browser-native APIs. No sign-ups, no API keys, no data leaving your device.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your <span className="gradient-text">Confidence</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Start practicing now — it only takes a few minutes to see improvement.
          </p>
          <Link to="/analyzer">
            <Button variant="hero" size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          Interview Confidence AI — Built for your browser. Your data stays with you.
        </div>
      </footer>
    </div>
  );
};

export default Index;
