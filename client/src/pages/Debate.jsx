import { useState } from "react";
import ReactMarkdown from "react-markdown";

const PLACEHOLDER_MOTION = "This House believes that social media does more harm than good.";

export default function Debate() {
  const [exchanges, setExchanges] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim() || loading) return;

    const newExchanges = [...exchanges, { role: "user", text: userInput }];
    setExchanges(newExchanges);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motion: PLACEHOLDER_MOTION,
          userArgument: userInput,
        }),
      });

      const data = await response.json();
      setExchanges([...newExchanges, { role: "ai", text: data.rebuttal }]);
    } catch (error) {
      setExchanges([...newExchanges, { role: "ai", text: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = () => {
    setSessionEnded(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* HEADER */}
      <div className="border-b border-gray-800 px-8 py-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Motion</p>
        <h1 className="text-lg font-semibold text-white max-w-4xl">
          {PLACEHOLDER_MOTION}
        </h1>
      </div>

      {/* EXCHANGE AREA */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {exchanges.length === 0 && (
          <p className="text-gray-600 text-sm text-center mt-20">
            The debate has not started yet. Make your opening argument below.
          </p>
        )}

        <div className="space-y-6 max-w-6xl mx-auto">
          {exchanges.map((exchange, index) => (
            <div
              key={index}
              className={`flex ${exchange.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-xl w-full flex flex-col ${exchange.role === "user" ? "items-end" : "items-start"}`}>
                {/* Speaker Label */}
                <p className={`text-xs uppercase tracking-widest mb-2 font-bold ${
                  exchange.role === "user" ? "text-indigo-400" : "text-red-400"
                }`}>
                  {exchange.role === "user" ? "YOU" : "OPPONENT"}
                </p>

                {/* Exchange Card */}
                <div className={`px-5 py-4 rounded-md text-sm leading-relaxed ${
                  exchange.role === "user"
                    ? "bg-indigo-950 border border-indigo-800 text-gray-200"
                    : "bg-gray-900 border border-gray-700 text-gray-300"
                }`}>
                  {exchange.role === "ai" ? (
                    <div className="space-y-3 text-sm leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({children}) => <p className="mb-3">{children}</p>,
                          strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                          em: ({children}) => <em className="italic text-gray-300">{children}</em>,
                          li: ({children}) => <li className="ml-4 list-disc mb-1">{children}</li>,
                          ul: ({children}) => <ul className="mb-3">{children}</ul>,
                          ol: ({children}) => <ol className="mb-3 list-decimal ml-4">{children}</ol>,
                        }}
                      >{exchange.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <p>{exchange.text}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* AI Loading State */}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xl flex flex-col items-start">
                <p className="text-xs uppercase tracking-widest mb-2 font-bold text-red-400">
                  OPPONENT
                </p>
                <div className="bg-gray-900 border border-gray-700 px-5 py-4 rounded-md text-sm text-gray-500 italic">
                  Formulating rebuttal...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM INPUT AREA */}
      {!sessionEnded ? (
        <div className="border-t border-gray-800 px-8 py-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-3">
              YOUR ARGUMENT
            </p>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="State your argument..."
              rows={3}
              disabled={loading}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none disabled:opacity-50"
            />
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={handleEndSession}
                className="text-sm text-gray-500 hover:text-red-400 transition"
              >
                End Session
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !userInput.trim()}
                className="bg-indigo-500 px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {loading ? "Waiting for Opponent..." : "Submit Argument"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-800 px-8 py-6 text-center">
          <p className="text-gray-400 text-sm mb-4">Session ended.</p>
          <button className="bg-indigo-500 px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-600 transition">
            View Summary
          </button>
        </div>
      )}
    </div>
  );
}