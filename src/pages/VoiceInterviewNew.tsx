import { useState, useRef, useEffect } from "react";
import { Mic, Play, Square, ChevronRight, Volume2, Loader } from "lucide-react";
import { interviewTracker, InterviewSession } from "../services/interviewTracker";
import { aiService } from "../services/aiService";

const voiceQuestions = [
  "Tell me about yourself and your professional background.",
  "What is your greatest professional strength and why?",
  "Describe a challenging problem you solved recently.",
  "Where do you see yourself in 5 years?",
  "What motivates you in your work?",
];

export default function VoiceInterview() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<
    { score: number; feedback: string; fluency: number; confidence: number; relevance: number }[]
  >([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start new session on mount
    const newSession = interviewTracker.startSession("voice");
    setSession(newSession);
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to continue");
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    return new Promise<void>((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          // In a real app, send to speech-to-text API
          // For now, we'll generate a mock answer
          const mockAnswer = `This is a sample response to: "${voiceQuestions[currentQuestionIndex]}"`;

          // Get AI feedback
          try {
            const feedback = await aiService.aiEvaluation.evaluateAnswer(
              voiceQuestions[currentQuestionIndex],
              mockAnswer
            );

            setAnswers((prev) => [...prev, mockAnswer]);
            setFeedbacks((prev) => [
              ...prev,
              {
                score: feedback.score,
                feedback: feedback.feedback,
                fluency: 70 + Math.random() * 30,
                confidence: 60 + Math.random() * 40,
                relevance: feedback.score,
              },
            ]);

            if (session) {
              const updatedSession = interviewTracker.recordAnswer(
                session,
                `q${currentQuestionIndex}`,
                voiceQuestions[currentQuestionIndex],
                mockAnswer,
                feedback.score,
                feedback.feedback
              );
              setSession(updatedSession);
            }
          } catch (error) {
            console.error("Error getting feedback:", error);
          }

          setIsProcessing(false);
          resolve();
        };

        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream?.getTracks().forEach((track) => track.stop());
      }
    });
  };

  const moveToNextQuestion = async () => {
    if (currentQuestionIndex < voiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeInterview();
    }
  };

  const completeInterview = async () => {
    if (session) {
      const completedSession = interviewTracker.completeSession(session);
      setSession(completedSession);
      // Redirect to results page
      window.location.href = "/results";
    }
  };

  if (!session) return <div>Loading...</div>;

  const currentFeedback = feedbacks[currentQuestionIndex];
  const hasAnsweredCurrent = answers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-black text-white">Voice Interview</h1>
            <span className="text-sm font-bold text-slate-400">
              Question {currentQuestionIndex + 1} / {voiceQuestions.length}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / voiceQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Question</p>
          <p className="text-2xl font-bold text-white leading-relaxed">
            {voiceQuestions[currentQuestionIndex]}
          </p>
        </div>

        {/* Recording Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-violet-400" />
              <span className="text-white font-bold">Recording</span>
            </div>
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-red-400 font-bold">{recordingTime}s</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startRecording}
              disabled={isRecording || isProcessing || hasAnsweredCurrent}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-50 hover:shadow-lg transition-all"
            >
              <Mic className="h-5 w-5 mr-2 inline" />
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              disabled={!isRecording || isProcessing}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold disabled:opacity-50 hover:shadow-lg transition-all"
            >
              <Square className="h-5 w-5 mr-2 inline" />
              {isProcessing ? "Processing..." : "Stop Recording"}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {currentFeedback && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-white font-bold mb-6 text-lg">Feedback & Analysis</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Overall Score</p>
                <p className="text-3xl font-black text-violet-400">{Math.round(currentFeedback.score)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Fluency</p>
                <p className="text-3xl font-black text-cyan-400">{Math.round(currentFeedback.fluency)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Confidence</p>
                <p className="text-3xl font-black text-green-400">{Math.round(currentFeedback.confidence)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Relevance</p>
                <p className="text-3xl font-black text-blue-400">{Math.round(currentFeedback.relevance)}</p>
              </div>
            </div>

            <p className="text-slate-300">{currentFeedback.feedback}</p>
          </div>
        )}

        {/* Navigation */}
        <button
          onClick={moveToNextQuestion}
          disabled={!hasAnsweredCurrent}
          className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-50 hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {currentQuestionIndex === voiceQuestions.length - 1 ? "Complete Interview" : "Next Question"}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
