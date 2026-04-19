import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { generateQuizQuestions } from "../services/gemini.js";
import { addActivity } from "../services/activity.js";

export default function Quiz() {
  const [topic, setTopic] = useState("Full-stack interview readiness");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedAttemptKey, setSavedAttemptKey] = useState("");

  useEffect(() => {
    if (submitted || questions.length === 0) return undefined;
    const timer = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [questions.length, submitted]);

  useEffect(() => {
    if (timeLeft === 0 && questions.length) setSubmitted(true);
  }, [questions.length, timeLeft]);

  const score = useMemo(() => {
    if (!questions.length) return 0;
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    return Math.round((correct / questions.length) * 100);
  }, [answers, questions]);

  async function generate() {
    setIsLoading(true);
    setSubmitted(false);
    setAnswers({});
    setTimeLeft(300);
    setQuestions(await generateQuizQuestions(topic));
    setSavedAttemptKey("");
    setIsLoading(false);
  }

  function submitQuiz() {
    setSubmitted(true);
    const attemptKey = `${topic}-${questions.length}-${score}`;
    if (questions.length && savedAttemptKey !== attemptKey) {
      addActivity({
        type: "quiz",
        title: `Online Quiz - ${topic}`,
        score,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
      });
      setSavedAttemptKey(attemptKey);
    }
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Online quiz</p>
          <h2 className="mt-2 text-3xl font-black text-white">Knowledge Drill</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">Generate MCQs with explanations and a timed scoring flow for focused interview practice.</p>
        </div>
        <div className="rounded-lg border border-[#382FF6]/40 bg-[#130f35] px-5 py-3 text-xl font-black text-white shadow-[0_0_34px_rgba(56,47,246,0.2)]">{minutes}:{seconds}</div>
      </section>

      <section className="app-card p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input value={topic} onChange={(event) => setTopic(event.target.value)} className="app-input" />
          <button onClick={generate} disabled={isLoading} className="app-button">{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Generate Quiz</button>
        </div>
      </section>

      <section className="space-y-4">
        {questions.map((question, index) => (
          <article key={question.id} className="app-card p-5">
            <p className="text-sm font-extrabold text-[#60A5FA]">Question {index + 1}</p>
            <h3 className="mt-2 text-lg font-black text-white">{question.question}</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={option}
                  onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                  disabled={submitted}
                  className={[
                    "rounded-lg border px-4 py-3 text-left text-sm font-bold transition",
                    answers[question.id] === optionIndex ? "border-[#2563EB] bg-[#2563EB]/15 text-white" : "border-[#1e293b] bg-[#0b1120] text-[#CBD5E1] hover:border-[#2563EB]",
                  ].join(" ")}
                >
                  {option}
                </button>
              ))}
            </div>
            {submitted ? <p className="mt-4 rounded-lg bg-[#111827] p-4 text-sm leading-6 text-[#94A3B8]">{question.explanation}</p> : null}
          </article>
        ))}
      </section>

      {questions.length ? (
        <section className="app-card flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
          <div><p className="soft-label">Quiz score</p><p className="mt-1 text-3xl font-black text-white">{submitted ? `${score}%` : "Ready to submit"}</p></div>
          <button onClick={submitQuiz} className="app-button">Submit</button>
        </section>
      ) : null}
    </div>
  );
}
