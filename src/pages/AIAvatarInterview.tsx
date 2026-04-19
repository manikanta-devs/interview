import { useEffect, useState, useRef } from "react";
import {
  Mic,
  StopCircle,
  Play,
  SkipForward,
  Download,
  BarChart3,
  Eye,
  Volume2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// 2D Animated AI Avatar
function AIAvatar({
  isSpeaking,
  question,
}: {
  isSpeaking: boolean;
  question: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Avatar Container */}
      <div className="relative w-64 h-80 mb-8">
        {/* Background Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{
            background: "linear-gradient(135deg, #6366F1, #A855F7, #EC4899)",
          }}
        />

        {/* Avatar Head */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Head Shape */}
          <div className="relative w-40 h-48 rounded-full bg-gradient-to-b from-amber-200 to-yellow-100 shadow-2xl overflow-hidden">
            {/* Head Details */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-8 mb-4 mt-10">
                {/* Left Eye */}
                <div className="relative w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div
                    className={`w-4 h-4 bg-blue-600 rounded-full transition-all duration-200 ${
                      isSpeaking ? "animate-pulse" : ""
                    }`}
                    style={{
                      animation: isSpeaking
                        ? "eyeBlink 0.5s infinite"
                        : "none",
                    }}
                  />
                </div>

                {/* Right Eye */}
                <div className="relative w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div
                    className={`w-4 h-4 bg-blue-600 rounded-full transition-all duration-200 ${
                      isSpeaking ? "animate-pulse" : ""
                    }`}
                    style={{
                      animation: isSpeaking
                        ? "eyeBlink 0.5s infinite"
                        : "none",
                    }}
                  />
                </div>
              </div>

              {/* Nose */}
              <div className="w-1 h-3 bg-amber-300 rounded-full mb-4" />

              {/* Mouth */}
              <div className="flex items-center gap-2 h-8 justify-center">
                {isSpeaking ? (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-full"
                        style={{
                          height: `${12 + Math.sin((i / 4 + Date.now() / 100)) * 8}px`,
                          animation: `mouth 0.3s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <div className="w-8 h-2 bg-red-400 rounded-full" />
                )}
              </div>
            </div>

            {/* Hair */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-gray-800 to-transparent rounded-full" />

            {/* Shine Effect */}
            <div className="absolute top-12 left-8 w-12 h-12 bg-white rounded-full opacity-20 blur-lg" />
          </div>
        </div>

        {/* Animated Speaking Waves */}
        {isSpeaking && (
          <>
            <div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-indigo-400 rounded-full opacity-50"
              style={{
                animation: "pulse 0.8s ease-out infinite",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-purple-400 rounded-full opacity-30"
              style={{
                animation: "pulse 0.8s ease-out 0.2s infinite",
              }}
            />
          </>
        )}
      </div>

      {/* Question Display */}
      <div className="text-center max-w-xl">
        <div className="text-xl font-bold text-indigo-300 mb-4 min-h-20">
          {question}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-emerald-400" : ""}`} />
          {isSpeaking ? (
            <span className="animate-pulse">AI is speaking...</span>
          ) : (
            <span>Ready to listen...</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes mouth {
          0%, 100% { height: 12px; }
          50% { height: 20px; }
        }
        @keyframes eyeBlink {
          0%, 90%, 100% { height: 16px; }
          95% { height: 0px; }
        }
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Recording Controls
function RecordingControls({
  isRecording,
  onStartRecord,
  onStopRecord,
  onSkip,
  canSkip,
}: {
  isRecording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onSkip: () => void;
  canSkip: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {!isRecording ? (
        <button
          onClick={onStartRecord}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/40 transition-all transform hover:scale-105"
        >
          <Mic className="w-5 h-5" />
          Start Recording
        </button>
      ) : (
        <button
          onClick={onStopRecord}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-rose-500/40 transition-all animate-pulse"
        >
          <StopCircle className="w-5 h-5" />
          Stop Recording
        </button>
      )}

      <button
        onClick={onSkip}
        disabled={!canSkip}
        className="px-8 py-3 rounded-full border-2 border-indigo-500/50 text-indigo-300 font-bold flex items-center gap-2 hover:bg-indigo-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SkipForward className="w-5 h-5" />
        Skip Question
      </button>
    </div>
  );
}

// Performance Analytics
function PerformanceMetrics({
  metrics,
}: {
  metrics: {
    totalQuestions: number;
    answered: number;
    skipped: number;
    averageConfidence: number;
    totalTime: number;
  };
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      {[
        {
          label: "Questions",
          value: `${metrics.answered}/${metrics.totalQuestions}`,
          icon: CheckCircle2,
          color: "text-emerald-400",
        },
        {
          label: "Skipped",
          value: metrics.skipped,
          icon: AlertCircle,
          color: "text-amber-400",
        },
        {
          label: "Confidence",
          value: `${metrics.averageConfidence}%`,
          icon: BarChart3,
          color: "text-indigo-400",
        },
        {
          label: "Time",
          value: `${Math.floor(metrics.totalTime / 60)}m`,
          icon: Clock,
          color: "text-purple-400",
        },
        {
          label: "Score",
          value: `${Math.round((metrics.answered / metrics.totalQuestions) * 100)}%`,
          icon: Eye,
          color: "text-pink-400",
        },
      ].map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 to-purple-950/50 text-center hover:border-indigo-500/50 transition-all"
          >
            <Icon className={`w-5 h-5 mx-auto mb-2 ${metric.color}`} />
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// Main Video Interview Component
export default function AIAvatarInterview() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState<
    Array<{ question: string; duration: number; confidence: number }>
  >([]);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);

  const questions = [
    "Tell me about a time you faced a difficult challenge at work. What did you do to overcome it?",
    "How do you handle working with team members you don't get along with?",
    "Describe a project where you had to learn something new. How did you approach it?",
    "Tell me about a time you made a mistake at work. What did you learn from it?",
    "How do you prioritize your work when you have multiple deadlines?",
    "Describe your leadership style with an example.",
    "Tell me about your proudest professional achievement.",
    "How do you handle stressful situations in the workplace?",
  ];

  const currentQuestion = questions[currentQuestionIdx];

  // Simulate AI speaking
  useEffect(() => {
    setIsSpeaking(true);
    const timer = setTimeout(() => setIsSpeaking(false), 3000);
    return () => clearTimeout(timer);
  }, [currentQuestionIdx]);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720, facingMode: "user" },
      });
      streamRef.current = stream;
      recordedChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        recordedChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      startTimeRef.current = Date.now();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert(
        "Unable to access camera/microphone. Please check permissions."
      );
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const duration = (Date.now() - startTimeRef.current) / 1000;
      const confidence = Math.floor(Math.random() * 40 + 60); // 60-100

      setRecordedAnswers([
        ...recordedAnswers,
        { question: currentQuestion, duration, confidence },
      ]);
    }
  };

  // Skip Question
  const skipQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Next Question (After Recording)
  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Calculate Metrics
  const metrics = {
    totalQuestions: questions.length,
    answered: recordedAnswers.length,
    skipped: currentQuestionIdx + 1 - recordedAnswers.length,
    averageConfidence:
      recordedAnswers.length > 0
        ? Math.round(
            recordedAnswers.reduce((sum, a) => sum + a.confidence, 0) /
              recordedAnswers.length
          )
        : 0,
    totalTime: recordedAnswers.reduce((sum, a) => sum + a.duration, 0),
  };

  if (isCompleted) {
    return (
      <div className="space-y-8 py-8">
        {/* Completion Header */}
        <div className="text-center py-12 rounded-3xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30">
          <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
          <h1 className="text-4xl font-black mb-2 gradient-text">
            Interview Complete!
          </h1>
          <p className="text-gray-300">Great job! Here's your performance summary.</p>
        </div>

        {/* Performance Summary */}
        <PerformanceMetrics metrics={metrics} />

        {/* Detailed Answers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            Your Responses
          </h2>

          {recordedAnswers.map((answer, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-purple-950/30 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-lg mb-2">Question {idx + 1}</p>
                  <p className="text-gray-300 mb-4">{answer.question}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-indigo-400">
                    {answer.confidence}%
                  </div>
                  <p className="text-xs text-gray-400">Confidence</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Clock className="w-4 h-4 text-indigo-300" />
                  <span className="text-indigo-200">
                    {answer.duration.toFixed(1)}s
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Mic className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200">Recorded</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            onClick={() => {
              setCurrentQuestionIdx(0);
              setRecordedAnswers([]);
              setIsCompleted(false);
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/40 transition-all"
          >
            <Play className="w-5 h-5 inline mr-2" />
            Retake Interview
          </button>

          <button
            onClick={() => {
              const data = JSON.stringify({
                date: new Date().toISOString(),
                metrics,
                answers: recordedAnswers,
              });
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `interview-results-${Date.now()}.json`;
              a.click();
            }}
            className="px-8 py-3 rounded-full border-2 border-indigo-500 text-indigo-300 font-bold hover:bg-indigo-500/10 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      {/* Interview Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-black gradient-text">
            AI Avatar Interview
          </h1>
          <div className="text-right">
            <div className="text-3xl font-black text-indigo-400">
              {currentQuestionIdx + 1}/{questions.length}
            </div>
            <p className="text-sm text-gray-400">Questions</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{
              width: `${((currentQuestionIdx + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* AI Avatar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-50" />
        <div className="relative p-8 rounded-3xl bg-gradient-to-b from-gray-900/50 to-gray-800/50 border border-indigo-500/20">
          <AIAvatar isSpeaking={isSpeaking} question={currentQuestion} />
        </div>
      </div>

      {/* Recording Controls */}
      <RecordingControls
        isRecording={isRecording}
        onStartRecord={startRecording}
        onStopRecord={stopRecording}
        onSkip={skipQuestion}
        canSkip={true}
      />

      {/* Current Performance */}
      {recordedAnswers.length > 0 && (
        <PerformanceMetrics metrics={metrics} />
      )}

      {/* Next Button (After Recording) */}
      {recordedAnswers.length > currentQuestionIdx && (
        <div className="flex justify-center pt-4">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
          >
            {currentQuestionIdx === questions.length - 1
              ? "Complete Interview"
              : "Next Question"}
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-950/30">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-200 mb-2">Interview Tips</h3>
            <ul className="text-sm text-amber-100/70 space-y-1">
              <li>✓ Listen to the full question before answering</li>
              <li>✓ Speak clearly and maintain a steady pace</li>
              <li>✓ Use specific examples in your answers</li>
              <li>✓ Take your time - there's no time limit</li>
              <li>✓ You can skip difficult questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
