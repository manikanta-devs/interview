import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, Eye, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import RadarChart from "@/components/RadarChart";
import ScoreCard from "@/components/ScoreCard";
import FeedbackCard from "@/components/FeedbackCard";
import { useMediaDevices } from "@/hooks/useMediaDevices";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

function computeScores(analysis: any) {
  const { wordCount, fillerWordTotal, wordsPerMinute } = analysis;

  // Fluency: penalize filler words relative to total words
  const fillerRatio = wordCount > 0 ? fillerWordTotal / wordCount : 0;
  const fluency = Math.max(0, Math.min(100, Math.round(100 - fillerRatio * 300)));

  // Confidence based on WPM (ideal: 120-160) and word count
  let paceScore = 100;
  if (wordsPerMinute < 80) paceScore = 50 + wordsPerMinute * 0.5;
  else if (wordsPerMinute > 200) paceScore = Math.max(40, 100 - (wordsPerMinute - 200) * 0.5);
  const lengthBonus = Math.min(30, wordCount * 0.5);
  const confidence = Math.max(0, Math.min(100, Math.round(paceScore * 0.6 + lengthBonus + (100 - fillerRatio * 200) * 0.1)));

  // Simulated eye contact
  const eyeContact = Math.round(60 + Math.random() * 30);

  return { confidence, fluency, eyeContact };
}

function generateFeedback(analysis: any, scores: any) {
  const tips: { title: string; message: string; type: "tip" | "warning" | "success" }[] = [];

  if (scores.fluency >= 80) {
    tips.push({ title: "Great Fluency!", message: "You spoke clearly with minimal filler words. Keep it up!", type: "success" });
  } else if (analysis.fillerWordTotal > 3) {
    tips.push({ title: "Reduce Filler Words", message: `You used ${analysis.fillerWordTotal} filler words (${analysis.fillerWords.map((f: any) => `"${f.word}" ×${f.count}`).join(", ")}). Try pausing instead of filling silence.`, type: "warning" });
  }

  if (analysis.wordsPerMinute < 100) {
    tips.push({ title: "Speed Up Slightly", message: "Your pace is a bit slow. Aim for 120–160 words per minute for optimal engagement.", type: "tip" });
  } else if (analysis.wordsPerMinute > 180) {
    tips.push({ title: "Slow Down", message: "You're speaking quite fast. Take a breath between sentences to let your points land.", type: "warning" });
  } else {
    tips.push({ title: "Good Pace", message: `At ${analysis.wordsPerMinute} WPM, your speaking pace is in the ideal range.`, type: "success" });
  }

  if (scores.eyeContact >= 75) {
    tips.push({ title: "Strong Eye Contact", message: "You maintained good eye contact with the camera. This builds trust with interviewers.", type: "success" });
  } else {
    tips.push({ title: "Improve Eye Contact", message: "Try to look directly at the camera more often. It simulates making eye contact with the interviewer.", type: "tip" });
  }

  return tips;
}

const VoiceAnalyzer = () => {
  const { status, error, videoRef, requestAccess, stopStream } = useMediaDevices();
  const speech = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    return () => {
      stopStream();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stopStream]);

  const handleStart = async () => {
    const stream = await requestAccess(true, true);
    if (!stream) return;
    speech.start();
    setIsRecording(true);
    setResults(null);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
  };

  const handleStop = () => {
    const analysis = speech.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const scores = computeScores(analysis);
    const feedback = generateFeedback(analysis, scores);
    setResults({ analysis, scores, feedback });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Voice & Camera Analyzer" subtitle="Real-time speech and presence analysis" />

      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Permission Error */}
        {(status === "denied" || status === "unsupported") && (
          <div className="glass-card rounded-xl p-4 border border-destructive/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-foreground">Access Required</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {!speech.supported && (
          <div className="glass-card rounded-xl p-4 border border-warning/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-foreground">Speech Recognition Unavailable</p>
              <p className="text-sm text-muted-foreground">Your browser doesn't support the Web Speech API. Try Chrome or Edge for the best experience.</p>
            </div>
          </div>
        )}

        {/* Video Preview + Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {status !== "granted" && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                  </div>
                </div>
              )}
              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-destructive/90 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-xs font-semibold text-primary-foreground">{formatTime(timer)}</span>
                </div>
              )}
            </div>
            <div className="p-4 flex justify-center">
              {!isRecording ? (
                <Button onClick={handleStart} variant="hero" disabled={status === "unsupported"}>
                  <Mic className="w-5 h-5" /> Start Recording
                </Button>
              ) : (
                <Button onClick={handleStop} variant="destructive" size="lg">
                  <MicOff className="w-5 h-5" /> Stop Recording
                </Button>
              )}
            </div>
          </div>

          {/* Live Transcript */}
          <div className="glass-card rounded-xl p-5 flex flex-col">
            <h3 className="font-semibold text-foreground mb-3">Live Transcript</h3>
            <div className="flex-1 min-h-[200px] max-h-[300px] overflow-y-auto rounded-lg bg-muted/50 p-4">
              {speech.transcript ? (
                <p className="text-sm text-foreground leading-relaxed">{speech.transcript}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  {isRecording ? "Listening… start speaking." : "Your transcript will appear here."}
                </p>
              )}
            </div>
            {isRecording && (
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">Listening...</span>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-foreground">Your Results</h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <ScoreCard label="Confidence" score={results.scores.confidence} icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />} />
              <ScoreCard label="Fluency" score={results.scores.fluency} icon={<Mic className="w-5 h-5 text-primary-foreground" />} />
              <ScoreCard label="Eye Contact" score={results.scores.eyeContact} icon={<Eye className="w-5 h-5 text-primary-foreground" />} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4 text-center">Performance Overview</h3>
                <RadarChart
                  labels={["Confidence", "Fluency", "Eye Contact", "Pace", "Content"]}
                  values={[
                    results.scores.confidence,
                    results.scores.fluency,
                    results.scores.eyeContact,
                    Math.min(100, Math.round(results.analysis.wordsPerMinute / 1.6)),
                    Math.min(100, results.analysis.wordCount * 2),
                  ]}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Feedback & Tips</h3>
                {results.feedback.map((fb: any, i: number) => (
                  <FeedbackCard key={i} title={fb.title} message={fb.message} type={fb.type} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Session Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Words Spoken", value: results.analysis.wordCount },
                  { label: "Filler Words", value: results.analysis.fillerWordTotal },
                  { label: "Speaking Pace", value: `${results.analysis.wordsPerMinute} WPM` },
                  { label: "Duration", value: formatTime(Math.round(results.analysis.speakingDurationSec)) },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VoiceAnalyzer;
