import { useCallback, useMemo, useState } from "react";
import {
  evaluateInterviewAnswer,
  generateInterviewQuestion,
} from "../services/gemini.js";

export function useInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);

  const start = useCallback(async () => {
    setIsLoading(true);
    const question = await generateInterviewQuestion();
    setCurrentQuestion(question);
    setQuestions([question]);
    setAnswers([]);
    setFinalFeedback(null);
    setIsLoading(false);
  }, []);

  const submitAnswer = useCallback(
    async (answer) => {
      if (!currentQuestion || !answer.trim()) return null;
      setIsLoading(true);
      const evaluation = await evaluateInterviewAnswer(currentQuestion, answer);
      const nextAnswers = [
        ...answers,
        { question: currentQuestion, answer, evaluation },
      ];
      setAnswers(nextAnswers);
      if (nextAnswers.length >= 3) {
        const average = Math.round(
          nextAnswers.reduce((sum, item) => sum + item.evaluation.score, 0) /
            nextAnswers.length,
        );
        setFinalFeedback({
          score: average,
          feedback:
            "Strong progress. Keep answers crisp, quantified, and anchored in business outcomes.",
        });
        setCurrentQuestion("");
      } else {
        const nextQuestion = await generateInterviewQuestion();
        setCurrentQuestion(nextQuestion);
        setQuestions((items) => [...items, nextQuestion]);
      }
      setIsLoading(false);
      return evaluation;
    },
    [answers, currentQuestion],
  );

  const progress = useMemo(
    () => Math.min(100, Math.round((answers.length / 3) * 100)),
    [answers.length],
  );
  return {
    questions,
    currentQuestion,
    answers,
    isLoading,
    finalFeedback,
    progress,
    start,
    submitAnswer,
  };
}
