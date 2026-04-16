import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, ChevronRight, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import FeedbackCard from "@/components/FeedbackCard";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const QUESTIONS = [
  "Tell me about yourself and your professional background.",
  "Describe a time when you had to work with a difficult team member.",
  "What is your greatest professional achievement?",
  "How do you handle tight deadlines and pressure?",
  "Why are you interested in this position?",
  "Tell me about a time you showed leadership skills.",
  "How do you prioritize tasks when you have multiple deadlines?",
  "Describe a situation where you had to learn something new quickly.",
  "What are your strengths and how do they apply to this role?",
  "Where do you see yourself in five years?",
];

const GOOD_KEYWORDS = ["experience", "team", "skills", "achieved", "result", "led", "improved", "managed", "developed", "collaborated", "goal", "project", "challenge", "solution", "learned"];

interface QuestionResult {
  question: string;
  transcript: string;
  wordCount: number;
  fillerWords: number;
  keywordsFound: string[];
  score: number;
  feedback: { title: string; message: string; type: "tip" | "warning" | "success" }[];
  duration: number;
}

function evaluateAnswer(question: string, transcript: string, fillerTotal: number, wordCount: number, duration: number): QuestionResult {
  const lower = transcript.toLowerCase();
  const keywordsFound = GOOD_KEYWORDS.filter((k) => lower.includes(k));

  let score = 50;
  // Length bonus
  if (wordCount >= 50) score += 15;
  else if (wordCount >= 30) score += 8;
  else score -= 10;

  // Keywords
  score += Math.min(20, keywordsFound.length * 5);

  // Filler penalty
  score -= fillerTotal * 3;

  score = Math.max(0, Math.min(100, Math.round(score)));

  const feedback: QuestionResult["feedback"] = [];
  if (wordCount < 20) {
    feedback.push({ title: "Elaborate More", message: "Your answer was quite short. Try to provide more detail and examples.", type: "warning" });
  } else if (wordCount >= 50) {
    feedback.push({ title: "Good Detail", message: "You provided a thorough answer with enough context.", type: "success" });
  }

  if (keywordsFound.length >= 3) {
    feedback.push({ title: "Strong Keywords", message: `Great use of professional language: ${keywordsFound.slice(0, 4).join(", ")}.`, type: "success" });
  } else {
    feedback.push({ title: "Use More Keywords", message: 'Try incorporating words like "experience", "team", "achieved", "result" into your answers.', type: "tip" });
  }

  if (fillerTotal > 2) {
    feedback.push({ title: "Watch Filler Words", message: `You used ${fillerTotal} filler words. Pause instead of filling silence.`, type: "warning" });
  }

  return { question, transcript, wordCount, fillerWords: fillerTotal, keywordsFound, score, feedback, duration };
}

const MockInterview = () => {
  const speech = useSpeechRecognition();
  const [currentQ, setCurrentQ] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStartAnswer = () => {
    speech.start();
    setIsAnswering(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
  };

  const handleStopAnswer = () => {
    const analysis = speech.stop();
    setIsAnswering(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const result = evaluateAnswer(
      QUESTIONS[currentQ],
      analysis.transcript,
      analysis.fillerWordTotal,
      analysis.wordCount,
      timer
    );
    setResults((prev) => [...prev, result]);
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setResults([]);
    setShowSummary(false);
    setTimer(0);
  };

  const currentResult = results[currentQ];
  const avgScore = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : 0;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Mock Interview" subtitle="Session Complete" />
        <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 animate-slide-up">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 glow-primary">
              <span className="text-3xl font-bold text-primary-foreground">{avgScore}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Overall Score</h2>
            <p className="text-muted-foreground">Based on {results.length} questions answered</p>
          </div>

          <div className="space-y-4">
            {results.map((r, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground flex-1">Q{i + 1}: {r.question}</p>
                  <span className={`text-lg font-bold ml-3 ${r.score >= 70 ? "text-success" : r.score >= 50 ? "text-warning" : "text-destructive"}`}>
                    {r.score}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{r.wordCount} words · {r.fillerWords} fillers · {formatTime(r.duration)}</p>
                <div className="space-y-2">
                  {r.feedback.map((fb, j) => (
                    <FeedbackCard key={j} title={fb.title} message={fb.message} type={fb.type} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={handleRestart} variant="hero">
              <RotateCcw className="w-5 h-5" /> Practice Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Mock Interview" subtitle={`Question ${currentQ + 1} of ${QUESTIONS.length}`} />

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {!speech.supported && (
          <div className="glass-card rounded-xl p-4 border border-warning/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Speech recognition unavailable. Try Chrome or Edge.</p>
          </div>
        )}

        {/* Progress */}
        <div className="flex items-center gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < results.length ? "gradient-primary" : i === currentQ ? "bg-primary/40" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-xl p-6 glow-card">
          <p className="text-xs text-primary font-semibold mb-2">Question {currentQ + 1}</p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">{QUESTIONS[currentQ]}</h2>
        </div>

        {/* Recording Controls */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Your Answer</h3>
            {isAnswering && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">{formatTime(timer)}</span>
              </div>
            )}
          </div>

          <div className="min-h-[120px] rounded-lg bg-muted/50 p-4 mb-4">
            {speech.transcript ? (
              <p className="text-sm text-foreground leading-relaxed">{speech.transcript}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {isAnswering ? "Listening… speak your answer." : "Click record to start answering."}
              </p>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            {!isAnswering && !currentResult && (
              <Button onClick={handleStartAnswer} variant="hero" disabled={!speech.supported}>
                <Mic className="w-5 h-5" /> Record Answer
              </Button>
            )}
            {isAnswering && (
              <Button onClick={handleStopAnswer} variant="destructive" size="lg">
                <MicOff className="w-5 h-5" /> Stop
              </Button>
            )}
            {currentResult && (
              <Button onClick={handleNext} variant="hero">
                {currentQ < QUESTIONS.length - 1 ? (
                  <>Next Question <ChevronRight className="w-5 h-5" /></>
                ) : (
                  <>View Summary <CheckCircle2 className="w-5 h-5" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Per-question feedback */}
        {currentResult && (
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">Feedback</h3>
              <span className={`text-lg font-bold ${currentResult.score >= 70 ? "text-success" : currentResult.score >= 50 ? "text-warning" : "text-destructive"}`}>
                Score: {currentResult.score}/100
              </span>
            </div>
            {currentResult.feedback.map((fb, i) => (
              <FeedbackCard key={i} title={fb.title} message={fb.message} type={fb.type} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MockInterview;
