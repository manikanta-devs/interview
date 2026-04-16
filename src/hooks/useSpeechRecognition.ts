import { useState, useRef, useCallback } from "react";

interface SpeechResult {
  transcript: string;
  wordCount: number;
  fillerWords: { word: string; count: number }[];
  fillerWordTotal: number;
  speakingDurationSec: number;
  wordsPerMinute: number;
}

const FILLER_WORDS = ["um", "uh", "like", "you know", "basically", "actually", "literally", "so", "well", "right"];

function analyzeTranscript(transcript: string, durationSec: number): SpeechResult {
  const lower = transcript.toLowerCase();
  const words = transcript.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const fillerCounts: Record<string, number> = {};
  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, "gi");
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      fillerCounts[filler] = matches.length;
    }
  }

  const fillerWords = Object.entries(fillerCounts).map(([word, count]) => ({ word, count }));
  const fillerWordTotal = fillerWords.reduce((s, f) => s + f.count, 0);
  const wordsPerMinute = durationSec > 0 ? Math.round((wordCount / durationSec) * 60) : 0;

  return { transcript, wordCount, fillerWords, fillerWordTotal, speakingDurationSec: durationSec, wordsPerMinute };
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      setTranscript(full);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    startTimeRef.current = Date.now();
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }, []);

  const stop = useCallback((): SpeechResult => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    const duration = (Date.now() - startTimeRef.current) / 1000;
    return analyzeTranscript(transcript, duration);
  }, [transcript]);

  const getAnalysis = useCallback((): SpeechResult => {
    const duration = (Date.now() - startTimeRef.current) / 1000;
    return analyzeTranscript(transcript, duration);
  }, [transcript]);

  return { isListening, transcript, supported, start, stop, getAnalysis };
}
