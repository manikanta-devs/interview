import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { useInterview } from "../hooks/useInterview.js";
import { addActivity } from "../services/activity.js";

export default function VoiceInterview() {
  const { currentQuestion, answers, isLoading, finalFeedback, progress, start, submitAnswer } = useInterview();
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [savedFinalScore, setSavedFinalScore] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setTranscript(text);
    };
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (!finalFeedback || savedFinalScore === finalFeedback.score) return;
    addActivity({
      type: "voice",
      title: "Mock Interview (Voice)",
      score: Number(finalFeedback.score || 0),
      feedback: finalFeedback.feedback,
      rounds: answers.length,
    });
    setSavedFinalScore(finalFeedback.score);
  }, [answers.length, finalFeedback, savedFinalScore]);

  function toggleRecording() {
    if (!recognitionRef.current) {
      setTranscript("Speech recognition is not available in this browser. Type your answer here.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  }

  async function handleSubmit() {
    await submitAnswer(transcript);
    setTranscript("");
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow">AI interview coach</p>
        <h2 className="mt-2 text-3xl font-black text-white">Mock Interview (Voice)</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">Generate AI questions, record spoken answers, convert voice to text, and receive scoring after each round.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.32fr_1fr]">
        <aside className="app-card p-5">
          <p className="soft-label">Interview progress</p>
          <div className="mt-5 space-y-4">
            {["Setup", "Questions", "Answer", "Feedback", "Finalize"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 text-sm font-bold">
                <span className={["h-2.5 w-2.5 rounded-full", index <= answers.length ? "bg-[#22C55E]" : "bg-[#334155]"].join(" ")} />
                <span className={index <= answers.length ? "text-white" : "text-[#64748B]"}>{step}</span>
              </div>
            ))}
          </div>
          <div className="metric-bar mt-8"><div className="metric-fill" style={{ width: `${progress}%` }} /></div>
          <p className="mt-3 text-sm text-[#64748B]">{answers.length} rounds completed</p>
        </aside>

        <div className="app-card p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="soft-label">Technical Interview</p>
              <h3 className="mt-2 text-2xl font-black text-white">Step 1: Configure Interview Questions</h3>
            </div>
            <button onClick={start} disabled={isLoading} className="app-button">{isLoading && !currentQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Generate Question</button>
          </div>

          <div className="mt-6 rounded-lg border border-[#2563EB]/30 bg-[#0b1120] p-5">
            <p className="text-sm font-extrabold text-[#60A5FA]">Current question</p>
            <h4 className="mt-3 text-xl font-black leading-snug text-white">{currentQuestion || "Start a session to receive your first interview question."}</h4>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.45fr]">
            <textarea value={transcript} onChange={(event) => setTranscript(event.target.value)} rows={9} className="app-input resize-none" placeholder="Your transcript appears here. You can also type an answer." />
            <div className="space-y-3">
              <button onClick={toggleRecording} className="app-button-secondary w-full">{isRecording ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}{isRecording ? "Stop Recording" : "Record Voice"}</button>
              <button onClick={handleSubmit} disabled={!currentQuestion || !transcript.trim() || isLoading} className="app-button w-full">{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Evaluate Answer</button>
              <div className="rounded-lg border border-[#22C55E]/25 bg-[#22C55E]/10 p-4 text-sm leading-6 text-[#86EFAC]">Use STAR, then close with one metric.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {answers.map((item, index) => <ScoreCard key={item.question} title={`Round ${index + 1}`} score={item.evaluation.score} text={item.evaluation.feedback} />)}
        {finalFeedback ? <ScoreCard title="Final score" score={finalFeedback.score} text={finalFeedback.feedback} featured /> : null}
      </section>
    </div>
  );
}

function ScoreCard({ title, score, text, featured }) {
  return (
    <article className={`app-card p-5 ${featured ? "border-[#2563EB]" : ""}`}>
      <p className="text-sm font-extrabold text-[#60A5FA]">{title}</p>
      <p className="mt-3 text-3xl font-black text-white">{score}%</p>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{text}</p>
    </article>
  );
}
