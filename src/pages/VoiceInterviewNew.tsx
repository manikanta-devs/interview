import { useState, useRef, useEffect } from "react";
import { Mic, Square, ChevronRight, Volume2 } from "lucide-react";
import Meyda from "meyda";
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
  const [liveTranscript, setLiveTranscript] = useState("");
  const [frequencyBins, setFrequencyBins] = useState<number[]>(Array(24).fill(0));
  const [liveDb, setLiveDb] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<
    {
      score: number;
      feedback: string;
      fluency: number;
      confidence: number;
      relevance: number;
      avgDb: number;
      dominantHz: number;
      speakingRatio: number;
      wpm: number;
    }[]
  >([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef("");
  const analysisRef = useRef({
    frames: 0,
    rmsSum: 0,
    peakRms: 0,
    dominantHzSum: 0,
    speakingFrames: 0,
  });

  useEffect(() => {
    // Start new session on mount
    const newSession = interviewTracker.startSession("voice");
    setSession(newSession);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      }
      if (recordingStreamRef.current) {
        recordingStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
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
      recordingStreamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.85;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : undefined,
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      transcriptRef.current = "";
      setLiveTranscript("");
      analysisRef.current = {
        frames: 0,
        rmsSum: 0,
        peakRms: 0,
        dominantHzSum: 0,
        speakingFrames: 0,
      };
      setFrequencyBins(Array(24).fill(0));

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.onresult = (event: any) => {
          const text = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join(" ")
            .trim();
          transcriptRef.current = text;
          setLiveTranscript(text);
        };
        recognitionRef.current = recognition;
        recognition.start();
      }

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      const timeData = new Float32Array(analyser.fftSize);
      const frequencyDataFloat = new Float32Array(analyser.frequencyBinCount);

      const renderAudioFrame = () => {
        const activeAnalyser = analyserRef.current;
        if (!activeAnalyser) return;

        activeAnalyser.getByteFrequencyData(frequencyData);
        activeAnalyser.getFloatFrequencyData(frequencyDataFloat);
        activeAnalyser.getFloatTimeDomainData(timeData);

        const rmsFeature = Meyda.extract("rms", timeData) as number;
        const rms = Number.isFinite(rmsFeature) ? rmsFeature : 0;
        const db = Math.max(-90, Math.min(0, 20 * Math.log10(Math.max(rms, 0.00001))));
        setLiveDb(Math.round(db));

        const activeSampleRate = audioContextRef.current?.sampleRate || 44100;
        let maxIdx = 0;
        for (let i = 1; i < frequencyData.length; i += 1) {
          if (frequencyData[i] > frequencyData[maxIdx]) maxIdx = i;
        }
        const dominantHz = (maxIdx * activeSampleRate) / analyser.fftSize;

        const step = Math.max(1, Math.floor(frequencyData.length / 24));
        const bins = Array.from({ length: 24 }, (_, idx) => {
          const start = idx * step;
          const end = Math.min(start + step, frequencyData.length);
          let sum = 0;
          for (let j = start; j < end; j += 1) sum += frequencyData[j] || 0;
          return Math.round(sum / Math.max(1, end - start));
        });
        setFrequencyBins(bins);

        analysisRef.current.frames += 1;
        analysisRef.current.rmsSum += rms;
        analysisRef.current.peakRms = Math.max(analysisRef.current.peakRms, rms);
        analysisRef.current.dominantHzSum += dominantHz;
        if (rms > 0.012) analysisRef.current.speakingFrames += 1;

        animationFrameRef.current = requestAnimationFrame(renderAudioFrame);
      };

      animationFrameRef.current = requestAnimationFrame(renderAudioFrame);

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

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    return new Promise<void>((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const transcript = transcriptRef.current.trim();
          const fallbackAnswer = `Recorded audio response (${Math.max(recordingTime, 1)}s) for: "${voiceQuestions[currentQuestionIndex]}"`;
          const realAnswer = transcript.length > 0 ? transcript : fallbackAnswer;

          const frames = Math.max(analysisRef.current.frames, 1);
          const avgRms = analysisRef.current.rmsSum / frames;
          const avgDb = Math.max(-90, Math.min(0, 20 * Math.log10(Math.max(avgRms, 0.00001))));
          const dominantHz = analysisRef.current.dominantHzSum / frames;
          const speakingRatio = Math.max(
            0,
            Math.min(1, analysisRef.current.speakingFrames / frames)
          );
          const words = realAnswer.split(/\s+/).filter(Boolean).length;
          const durationMinutes = Math.max(recordingTime, 1) / 60;
          const wpm = words / durationMinutes;

          // Get AI feedback
          try {
            const feedback = await aiService.aiEvaluation.evaluateAnswer(
              voiceQuestions[currentQuestionIndex],
              realAnswer
            );

            const fluency = Math.max(
              20,
              Math.min(100, Math.round(speakingRatio * 55 + Math.min(wpm, 170) * 0.27))
            );
            const confidence = Math.max(
              20,
              Math.min(100, Math.round((avgDb + 90) * 0.9 + speakingRatio * 35))
            );

            setAnswers((prev) => [...prev, realAnswer]);
            setFeedbacks((prev) => [
              ...prev,
              {
                score: feedback.score,
                feedback: feedback.feedback,
                fluency,
                confidence,
                relevance: feedback.score,
                avgDb: Number(avgDb.toFixed(1)),
                dominantHz: Number(dominantHz.toFixed(0)),
                speakingRatio: Number((speakingRatio * 100).toFixed(0)),
                wpm: Number(Math.max(0, Math.min(220, wpm)).toFixed(0)),
              },
            ]);

            if (session) {
              const updatedSession = interviewTracker.recordAnswer(
                session,
                `q${currentQuestionIndex}`,
                voiceQuestions[currentQuestionIndex],
                realAnswer,
                feedback.score,
                feedback.feedback
              );
              setSession(updatedSession);
            }
          } catch (error) {
            console.error("Error getting feedback:", error);
          }

          if (recordingStreamRef.current) {
            recordingStreamRef.current.getTracks().forEach((track) => track.stop());
            recordingStreamRef.current = null;
          }
          if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }
          analyserRef.current = null;
          sourceRef.current = null;

          setIsProcessing(false);
          resolve();
        };

        mediaRecorderRef.current.stop();
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
            {isRecording ? (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-red-400 font-bold">{recordingTime}s • {liveDb} dB</span>
              </div>
            ) : (
              <span className="text-sm text-slate-400">Real-time spectral analysis enabled</span>
            )}
          </div>

          <div className="mb-5 rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Frequency Spectrum</p>
              <p className="text-xs text-slate-500">20Hz - 20kHz (scaled)</p>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {frequencyBins.map((value, index) => (
                <div
                  key={`bin-${index}`}
                  className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-cyan-400 transition-all duration-75"
                  style={{ height: `${Math.max(8, (value / 255) * 96)}%`, opacity: 0.3 + value / 255 }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-slate-700/70 bg-slate-950/60 p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Live Transcript</p>
            <p className="text-sm text-slate-200 min-h-6">
              {liveTranscript || "Start recording to capture speech transcription in real time."}
            </p>
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

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Avg Loudness</p>
                <p className="text-2xl font-black text-fuchsia-400">{currentFeedback.avgDb} dB</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Dominant Frequency</p>
                <p className="text-2xl font-black text-teal-400">{currentFeedback.dominantHz} Hz</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Speaking Ratio</p>
                <p className="text-2xl font-black text-amber-400">{currentFeedback.speakingRatio}%</p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Estimated Pace</p>
                <p className="text-2xl font-black text-emerald-400">{currentFeedback.wpm} WPM</p>
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
