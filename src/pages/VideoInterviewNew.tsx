import { useState, useRef, useEffect } from "react";
import { Video, Play, Square, ChevronRight, Monitor, Loader } from "lucide-react";
import { interviewTracker, InterviewSession } from "../services/interviewTracker";
import { aiService } from "../services/aiService";

const videoQuestions = [
  "Tell me about your professional background and key achievements.",
  "What are your core strengths and how do you leverage them?",
  "Describe a complex problem and how you solved it.",
  "How do you stay motivated and continue learning?",
  "Why are you interested in this opportunity?",
];

export default function VideoInterview() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<
    { score: number; feedback: string; fluency: number; confidence: number; relevance: number }[]
  >([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start new session on mount
    const newSession = interviewTracker.startSession("video");
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      videoChunksRef.current = [];

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      mediaRecorder.ondataavailable = (event) => {
        videoChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Please allow camera and microphone access to continue");
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    return new Promise<void>((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = async () => {
          // Stop video stream
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
          }

          const videoBlob = new Blob(videoChunksRef.current, { type: "video/webm" });
          // In a real app, send to video analysis API
          const mockAnswer = `This is a video response to: "${videoQuestions[currentQuestionIndex]}"`;

          // Get AI feedback
          try {
            const feedback = await aiService.aiEvaluation.evaluateAnswer(
              videoQuestions[currentQuestionIndex],
              mockAnswer
            );

            setAnswers((prev) => [...prev, mockAnswer]);
            setFeedbacks((prev) => [
              ...prev,
              {
                score: feedback.score,
                feedback: feedback.feedback,
                fluency: 75 + Math.random() * 25,
                confidence: 65 + Math.random() * 35,
                relevance: feedback.score,
              },
            ]);

            if (session) {
              const updatedSession = interviewTracker.recordAnswer(
                session,
                `q${currentQuestionIndex}`,
                videoQuestions[currentQuestionIndex],
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
      }
    });
  };

  const moveToNextQuestion = async () => {
    if (currentQuestionIndex < videoQuestions.length - 1) {
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
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-black text-white">Video Interview</h1>
            <span className="text-sm font-bold text-slate-400">
              Question {currentQuestionIndex + 1} / {videoQuestions.length}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / videoQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Question</p>
          <p className="text-2xl font-bold text-white leading-relaxed">
            {videoQuestions[currentQuestionIndex]}
          </p>
        </div>

        {/* Video Preview */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <video
            ref={videoRef}
            className="w-full rounded-lg bg-black mb-4 aspect-video object-cover"
            playsInline
          />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-cyan-400" />
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
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold disabled:opacity-50 hover:shadow-lg transition-all"
            >
              <Video className="h-5 w-5 mr-2 inline" />
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
                <p className="text-3xl font-black text-cyan-400">{Math.round(currentFeedback.score)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Fluency</p>
                <p className="text-3xl font-black text-blue-400">{Math.round(currentFeedback.fluency)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Confidence</p>
                <p className="text-3xl font-black text-green-400">{Math.round(currentFeedback.confidence)}</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Relevance</p>
                <p className="text-3xl font-black text-purple-400">{Math.round(currentFeedback.relevance)}</p>
              </div>
            </div>

            <p className="text-slate-300">{currentFeedback.feedback}</p>
          </div>
        )}

        {/* Navigation */}
        <button
          onClick={moveToNextQuestion}
          disabled={!hasAnsweredCurrent}
          className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold disabled:opacity-50 hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {currentQuestionIndex === videoQuestions.length - 1 ? "Complete Interview" : "Next Question"}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
