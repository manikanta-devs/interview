import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  Lightbulb,
  Brain,
  AlertCircle,
} from "lucide-react";

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "👋 Hey! I'm your AI Coach. I'm here to help you ace your interviews! Ask me anything about interview prep, resume tips, or practice strategies.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "How to reduce filler words?",
    "Tips for strong eye contact",
    "How to structure STAR answers?",
    "Mock interview best practices",
    "How to handle tough questions?",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        filler:
          "Great question! Here are 5 ways to reduce filler words:\n\n1. **Pause instead of speaking** - Silence is better than 'um' or 'uh'\n2. **Practice breathing** - Take deep breaths between sentences\n3. **Record yourself** - Listen and identify patterns\n4. **Slow down** - Speaking slower gives you time to think\n5. **Practice daily** - Use our voice analyzer for real-time feedback\n\nTry doing 5-minute daily practice sessions to build the habit!",
        "eye contact":
          "Eye contact is crucial! Here's how to master it:\n\n👀 **During video interviews:**\n- Look at the camera, not the screen\n- Place a small sticker on your camera as a reminder\n- Practice maintaining contact for 3-5 seconds\n\n📸 **During our video analyzer:**\n- We track your eye contact percentage\n- Aim for 70%+ to seem confident\n- Use our heatmap to see where you're looking\n\n💪 **Pro tip:** Confidence increases when interviewers feel you're engaged!",
        star: "The STAR method is powerful! Here's the structure:\n\n⭐ **SITUATION** - Set the context (15 seconds)\n✨ **TASK** - Explain your role (10 seconds)\n🎯 **ACTION** - Describe what you did (30 seconds)\n🏆 **RESULT** - Quantify the outcome (15 seconds)\n\n**Example:** 'In my previous role, I led a team project where we reduced API response time by 40%, improving user satisfaction scores by 25%.'\n\nPractice 3-5 STAR stories for common behavioral questions!",
        default:
          "That's an excellent question! 🎯\n\nHere are my top recommendations:\n\n1. **Practice with our mock interviews** - Real questions from actual companies\n2. **Use the voice analyzer** - Get instant feedback on pace and clarity\n3. **Record yourself** - Watch and critique your own performance\n4. **Daily streaks** - Consistency matters more than intensity\n5. **Study weak areas** - Focus on questions you struggle with\n\nWhat specific area would you like to improve? I can give you targeted advice!",
      };

      let response = responses.default;
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("filler")) response = responses.filler;
      if (lowerInput.includes("eye contact"))
        response = responses["eye contact"];
      if (lowerInput.includes("star")) response = responses.star;

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: response,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen flex-col bg-transparent text-slate-100">
      {/* Header */}
      <div className="shell-panel mx-4 mt-4 border-white/8 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8 text-[#A78BFA]" />
          <h1 className="text-2xl font-black text-white">🤖 AI Coach</h1>
        </div>
        <p className="text-slate-400">
          Your personal interview mentor - Available 24/7
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl lg:max-w-2xl rounded-2xl p-4 text-sm leading-6 ${
                message.type === "user"
                  ? "bg-violet-600 text-white shadow-[0_14px_34px_rgba(124,58,237,0.22)]"
                  : "border border-white/8 bg-slate-950/80 text-slate-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[#382FF6] animate-bounce" />
                <div
                  className="h-2 w-2 rounded-full bg-[#382FF6] animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="h-2 w-2 rounded-full bg-[#382FF6] animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4">
          <p className="mb-3 text-xs font-semibold text-slate-400">
            💡 Popular Questions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => {
                  setInput(question);
                }}
                className="rounded-2xl border border-white/8 bg-white/5 p-3 text-left text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-white/10 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="shell-panel mx-4 mb-4 border-white/8 p-6 backdrop-blur-xl">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything about interviews..."
            className="app-input flex-1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="app-button px-6 py-3 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-[#64748B] mt-3">
          💡 Tip: Ask about STAR method, filler words, body language, or any
          interview topic!
        </p>
      </div>
    </div>
  );
}
