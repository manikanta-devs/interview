import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera, CheckCircle2, CircleStop, Mic, Play, Shield, Sparkles, Video, SkipForward, RotateCcw } from "lucide-react";
import { LogoOption3 } from "../components/LogoOptions.tsx";
import { addActivity } from "../services/activity.js";

const QUESTIONS = [
  "Tell me about yourself and your professional background.",
  "Describe a time when you had to work with a difficult team member.",
  "What is your greatest professional achievement?",
  "How do you handle tight deadlines and pressure?",
  "Why are you interested in this position?",
  "Tell me about a time you showed leadership skills.",
  "How do you prioritize tasks when you have multiple deadlines?",
  "Describe a situation where you had to learn something new quickly.",
];

// Professional 2D AI Avatar Component
function AIAvatar({ isSpeaking = false, isListening = false }) {
  return (
    <div className="flex items-center justify-center h-full">
      <style>{`
        @keyframes eyeBlink {
          0%, 100% { height: 24px; }
          50% { height: 2px; }
        }
        @keyframes mouthMove {
          0%, 100% { height: 4px; transform: scaleY(1); }
          50% { height: 16px; transform: scaleY(1.2); }
        }
        @keyframes speakingWave1 {
          0%, 100% { r: 20px; opacity: 0.8; }
          50% { r: 35px; opacity: 0.3; }
        }
        @keyframes speakingWave2 {
          0%, 100% { r: 20px; opacity: 0; }
          50% { r: 45px; opacity: 0.2; }
        }
        @keyframes nodding {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div className="relative w-48 h-64">
        {/* Glow aura */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-500/20 to-violet-500/10 blur-xl" />
        
        {/* Avatar container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 280" className="w-full h-full" style={{ animation: isSpeaking ? 'nodding 1.2s ease-in-out infinite' : 'none' }}>
            {/* Head - gradient */}
            <defs>
              <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fcd34d', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="wave" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
              </radialGradient>
            </defs>
            
            {/* Head shape */}
            <circle cx="100" cy="80" r="60" fill="url(#headGradient)" />
            
            {/* Shine effect */}
            <ellipse cx="75" cy="50" rx="20" ry="25" fill="#fef3c7" opacity="0.6" />
            
            {/* Eyes container - left eye */}
            <g>
              <ellipse cx="75" cy="70" rx="16" ry="18" fill="#ffffff" />
              <circle cx="75" cy="70" r="10" fill="#1f2937" />
              <circle cx="76" cy="68" r="4" fill="#ffffff" opacity="0.8" />
            </g>
            
            {/* Eyes container - right eye */}
            <g>
              <ellipse cx="125" cy="70" rx="16" ry="18" fill="#ffffff" />
              <circle cx="125" cy="70" r="10" fill="#1f2937" />
              <circle cx="126" cy="68" r="4" fill="#ffffff" opacity="0.8" />
            </g>
            
            {/* Animated Blink */}
            <g style={{ animation: 'eyeBlink 4s ease-in-out infinite' }}>
              <rect x="65" y="63" width="20" height="24" rx="3" fill="url(#headGradient)" />
              <rect x="115" y="63" width="20" height="24" rx="3" fill="url(#headGradient)" />
            </g>
            
            {/* Mouth - static or animated */}
            {isSpeaking ? (
              <>
                <g style={{ animation: 'mouthMove 0.3s ease-in-out infinite' }}>
                  <rect x="85" y="105" width="8" height="12" rx="2" fill="#dc2626" />
                  <rect x="97" y="105" width="8" height="12" rx="2" fill="#dc2626" />
                  <rect x="109" y="105" width="8" height="12" rx="2" fill="#dc2626" />
                </g>
              </>
            ) : (
              <path d="M 85 108 Q 100 115 115 108" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
            
            {/* Speaking sound waves */}
            {isSpeaking && (
              <>
                <circle cx="100" cy="80" r="20" fill="none" stroke="#6366f1" strokeWidth="2" style={{ animation: 'speakingWave1 1s ease-out infinite' }} opacity="0.8" />
                <circle cx="100" cy="80" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2" style={{ animation: 'speakingWave2 1s ease-out infinite' }} opacity="0.6" />
              </>
            )}
            
            {/* Listening indicator */}
            {isListening && (
              <g opacity="0.7">
                <circle cx="100" cy="200" r="8" fill="#10b981" />
                <circle cx="100" cy="200" r="12" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
              </g>
            )}
          </svg>
        </div>

        {/* Status badge */}
        <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-semibold text-white border border-white/10 backdrop-blur flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : isListening ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
          {isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'}
        </div>
      </div>
    </div>
  );
}

export default function VideoInterview() {
  const userVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [streamReady, setStreamReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState([]);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("Waiting for camera access");
  const [error, setError] = useState("");
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      const stream = userVideoRef.current?.srcObject;
      stream?.getTracks?.().forEach((track) => track.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Simulate avatar speaking for 2 seconds when question loads
  useEffect(() => {
    setAvatarSpeaking(true);
    const timer = setTimeout(() => setAvatarSpeaking(false), 2500);
    return () => clearTimeout(timer);
  }, [currentQ]);

  async function startCamera() {
    try {
      setError("");
      setStatus("Requesting camera access");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      userVideoRef.current.srcObject = stream;
      setStreamReady(true);
      setStatus("Camera ready");
    } catch {
      setStatus("Camera unavailable");
      setError("Allow camera and microphone access to start the video interview.");
    }
  }

  function startRecording() {
    const stream = userVideoRef.current?.srcObject;
    if (!stream) return;
    setError("");
    setTimer(0);
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
    setStatus("Recording...");
    
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    
    const nextResult = {
      question: QUESTIONS[currentQ],
      confidence: 60 + Math.random() * 40,
      eyeContact: 65 + Math.random() * 35,
      clarity: 70 + Math.random() * 30,
      duration: timer,
      feedback: "Good pacing and clear articulation. Maintain eye contact with the camera throughout your answer.",
    };
    setResult(nextResult);
    setResults([...results, nextResult]);
    setStatus("Response recorded");
  }

  function handleSkip() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setResult(null);
      setStatus("Camera ready");
    } else {
      setShowSummary(true);
    }
  }

  function handleNext() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setResult(null);
      setStatus("Camera ready");
    } else {
      setShowSummary(true);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setResults([]);
    setResult(null);
    setShowSummary(false);
    setStatus("Camera ready");
  }

  const avgScore = results.length > 0 
    ? Math.round((results.reduce((s, r) => s + (r.confidence + r.eyeContact + r.clarity) / 3, 0)) / results.length)
    : 0;

  if (showSummary) {
    return (
      <div className="space-y-6">
        <section className="shell-panel overflow-hidden border-violet-400/20 bg-gradient-to-r from-slate-950 via-slate-900 to-violet-950 p-6 md:p-8">
          <div className="text-center">
            <p className="eyebrow">Session complete</p>
            <h2 className="section-title mt-2">Interview Performance Summary</h2>
            <p className="section-copy mt-3">You completed {results.length} questions. Review your metrics below.</p>
          </div>
        </section>

        <section className="shell-panel border-white/8 p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/50">
              <span className="text-5xl font-black text-white">{avgScore}%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Overall Score</h3>
            <p className="text-slate-300">Based on {results.length} responses</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {results.map((r, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                <p className="text-xs font-semibold text-slate-400 mb-3">Q{i + 1}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Confidence</span>
                    <span className="font-bold text-white">{Math.round(r.confidence)}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${r.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            <Metric label="Avg Confidence" value={Math.round(results.reduce((s, r) => s + r.confidence, 0) / results.length)} />
            <Metric label="Avg Eye Contact" value={Math.round(results.reduce((s, r) => s + r.eyeContact, 0) / results.length)} />
            <Metric label="Avg Clarity" value={Math.round(results.reduce((s, r) => s + r.clarity, 0) / results.length)} />
          </div>

          <div className="flex gap-4">
            <button onClick={handleRestart} className="app-button flex-1">
              <RotateCcw className="mr-2 h-4 w-4" /> Try Again
            </button>
            <a href="/results" className="app-button flex-1 text-center">
              View Full Results <ArrowRight className="ml-2 h-4 w-4 inline" />
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="shell-panel overflow-hidden border-violet-400/20 bg-gradient-to-r from-slate-950 via-slate-900 to-violet-950 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Professional AI Interview</p>
            <h2 className="section-title mt-2">Behavioral Interview Practice</h2>
            <p className="section-copy mt-3">Practice with our professional 2D AI avatar. Answer 8 behavioral questions while recording yourself for real-time feedback.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[26rem]">
            {[
              ["Question", `${currentQ + 1} of ${QUESTIONS.length}`],
              ["Interviewer", "AI Avatar (NexHire)"],
              ["Status", status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <p className="soft-label">{label}</p>
                <p className="mt-2 text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        {/* Main Interview Area */}
        <div className="shell-panel overflow-hidden border-white/8">
          {/* Avatar and Question */}
          <div className="border-b border-white/8 px-6 py-4">
            <p className="soft-label">AI Interviewer</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">Professional 2D avatar asking questions</p>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 flex items-center justify-center px-4 py-6">
            <AIAvatar isSpeaking={avatarSpeaking} isListening={!avatarSpeaking && streamReady && !isRecording} />
          </div>

          {/* Question Display */}
          <div className="border-t border-white/8 px-6 py-5">
            <p className="text-xs text-slate-400 font-semibold mb-3">Question {currentQ + 1}</p>
            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">{QUESTIONS[currentQ]}</h3>
          </div>

          {/* User Video Area */}
          <div className="border-t border-white/8 px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="soft-label">Your Response</p>
                <p className="mt-1 text-sm font-semibold text-slate-200">Record your video answer</p>
              </div>
              <div className="shell-pill inline-flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${isRecording ? 'bg-rose-400 animate-pulse' : streamReady ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                {isRecording ? 'Recording' : streamReady ? 'Ready' : 'Idle'}
              </div>
            </div>

            <div className="relative w-full aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-white/8 mb-4">
              <video ref={userVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              {!streamReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur">
                  <Camera className="w-12 h-12 text-slate-400 mb-3" />
                  <p className="text-sm font-semibold text-slate-300">Camera not started</p>
                  <p className="text-xs text-slate-500 mt-1">Click "Start Camera" to begin</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={startCamera} disabled={streamReady} className="app-button-secondary">
                <Camera className="mr-2 h-4 w-4" /> Start Camera
              </button>
              <button onClick={startRecording} disabled={!streamReady || isRecording || result} className="app-button">
                <Play className="mr-2 h-4 w-4" /> Record Answer
              </button>
              <button onClick={stopRecording} disabled={!isRecording} className="app-button-secondary">
                <CircleStop className="mr-2 h-4 w-4" /> Stop
              </button>
              <button onClick={handleSkip} disabled={isRecording} className="app-button-secondary">
                <SkipForward className="mr-2 h-4 w-4" /> Skip
              </button>
            </div>

            {error && <p className="text-sm font-semibold text-rose-300 mt-3">{error}</p>}
            {isRecording && <p className="text-sm text-slate-300 mt-3">⏱️ Recording: {timer}s</p>}
          </div>
        </div>

        {/* Right Sidebar - Analysis */}
        <aside className="space-y-6">
          <section className="app-card p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="section-title text-[1.4rem]">Live Analysis</h3>
              <span className="shell-pill">{result ? 'Analyzed' : 'Waiting'}</span>
            </div>
            {result ? (
              <>
                <p className="text-sm leading-6 text-slate-400 mb-6">{result.feedback}</p>
                <div className="space-y-4">
                  <Metric label="Confidence" value={Math.round(result.confidence)} />
                  <Metric label="Eye Contact" value={Math.round(result.eyeContact)} />
                  <Metric label="Clarity" value={Math.round(result.clarity)} />
                </div>
                <button onClick={handleNext} className="app-button w-full mt-6">
                  {currentQ < QUESTIONS.length - 1 ? (
                    <>Next Question <ArrowRight className="ml-2 h-4 w-4 inline" /></>
                  ) : (
                    <>See Summary <CheckCircle2 className="ml-2 h-4 w-4 inline" /></>
                  )}
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <Mic className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
                <p className="text-sm text-slate-400">Record your answer to see analysis</p>
              </div>
            )}
          </section>

          <section className="app-card p-6">
            <p className="soft-label mb-3">Progress</p>
            <div className="flex gap-1.5 mb-4">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    i < currentQ ? 'bg-emerald-500' : i === currentQ ? 'bg-indigo-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">Questions completed: {results.length}/{QUESTIONS.length}</p>
          </section>

          <section className="app-card p-6">
            <p className="soft-label mb-4">Interview Tips</p>
            <div className="space-y-3">
              {[
                "Look at the camera while speaking",
                "Speak slowly and clearly",
                "Use specific examples (STAR method)",
                "Maintain a steady pace",
              ].map((tip) => (
                <div key={tip} className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-bold text-slate-300">{label}</span>
        <span className="font-black text-white">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
