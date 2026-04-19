import React, { useState } from "react";
import { Loader, AlertCircle, Send, TrendingUp } from "lucide-react";
import unifiedAPIService from "../services/unifiedAPI";

interface Message {
  role: "hr" | "user";
  content: string;
  feedback?: string;
}

export default function SalarySimulator() {
  const [step, setStep] = useState("setup");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(3);
  const [city, setCity] = useState("USA");
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartSimulation = async () => {
    if (!role.trim()) {
      setError("Please enter a role");
      return;
    }

    setLoading(true);
    setError("");

    const result = await unifiedAPIService.generateSalaryNegotiationScenario(role, experience, city);
    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        setScenario(data);
        const initialMessage = {
          role: "hr",
          content: data.firstHRMessage || "Let's discuss your compensation package. What are your salary expectations?",
        };
        setMessages([initialMessage]);
        setStep("chat");
      } catch (e) {
        setScenario({ rawContent: result.data });
        setStep("chat");
      }
    } else {
      setError(result.error || "Failed to start simulation");
    }
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages([...messages, userMessage]);
    setUserInput("");
    setLoading(true);

    const fullContext = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const result = await unifiedAPIService.getMockHRResponse(
      userInput,
      `Negotiation context: ${fullContext}`
    );

    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        const hrMessage = {
          role: "hr",
          content: data.hrResponse || "Thank you for that response. How does this sound?",
          feedback: data.conversationTip,
        };
        setMessages((prev) => [...prev, hrMessage]);
      } catch (e) {
        const hrMessage = {
          role: "hr",
          content: result.data,
        };
        setMessages((prev) => [...prev, hrMessage]);
      }
    } else {
      setError(result.error || "Failed to get response");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">Salary Negotiation Simulator</h1>
        <p className="text-gray-400">Practice salary negotiation with an AI HR manager</p>
      </div>

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <p className="text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {step === "setup" && (
        <div className="glass rounded-xl p-6 space-y-4">
          <label className="block">
            <p className="text-white font-bold mb-2">Target Role</p>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Product Manager"
              className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500"
            />
          </label>

          <label className="block">
            <p className="text-white font-bold mb-2">Years of Experience: {experience}</p>
            <input
              type="range"
              min="0"
              max="20"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <label className="block">
            <p className="text-white font-bold mb-2">Location</p>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white"
            >
              <option>USA</option>
              <option>India</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Germany</option>
            </select>
          </label>

          <button
            onClick={handleStartSimulation}
            disabled={loading || !role.trim()}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Start Simulation
              </>
            )}
          </button>
        </div>
      )}

      {step === "chat" && (
        <div className="space-y-6">
          {/* Conversation */}
          <div className="glass rounded-xl p-6 max-h-96 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-gray-200 border border-indigo-500/30"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.feedback && <p className="text-xs mt-2 text-yellow-300">💡 {msg.feedback}</p>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-gray-200 px-4 py-2 rounded-lg border border-indigo-500/30">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="glass rounded-xl p-4 flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your response..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500 resize-none max-h-24"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !userInput.trim()}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => {
              setStep("setup");
              setRole("");
              setExperience(3);
              setCity("USA");
              setScenario(null);
              setMessages([]);
              setUserInput("");
            }}
            className="w-full px-6 py-3 rounded-lg border border-indigo-500 text-indigo-300 font-bold hover:bg-indigo-500/10 transition-all"
          >
            Start New Simulation
          </button>
        </div>
      )}
    </div>
  );
}
