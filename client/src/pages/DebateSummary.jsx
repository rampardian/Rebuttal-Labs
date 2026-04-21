import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DebateSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { motion, stance, exchanges } = location.state || {};

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motion, stance, exchanges }),
        });
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12 max-w-5xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Debate Summary</h1>
      <p className="text-sm text-gray-400 mb-1">
        <span className="text-gray-500">Motion:</span> {motion}
      </p>
      <p className="text-sm text-gray-400 mb-10">
        <span className="text-gray-500">Your Stance:</span>{" "}
        <span className="capitalize">{stance}</span>
      </p>

      {loading && (
        <p className="text-gray-500 text-sm">Analyzing debate...</p>
      )}

      {error && (
        <p className="text-red-400 text-sm">Failed to generate summary.</p>
      )}

      {summary && (
        <>
          {/* SCORES */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* AI Score */}
            <div>
              <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-3">
                Opponent's Score
              </p>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${summary.aiScore}%` }}
                />
              </div>
              <p className="text-2xl font-bold">{summary.aiScore}%</p>
            </div>

            {/* User Score */}
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-3">
                Your Score
              </p>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div
                  className="bg-indigo-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${summary.userScore}%` }}
                />
              </div>
              <p className="text-2xl font-bold">{summary.userScore}%</p>
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            <ul className="space-y-3">
              {summary.feedback.map((point, index) => (
                <li key={index} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SPIDERWEB PLACEHOLDER */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Knowledge Map</h2>
            <div className="w-full h-64 bg-gray-900 border border-gray-700 rounded-md flex items-center justify-center">
              <p className="text-gray-600 text-sm">Spiderweb Knowledge Map — Coming Soon</p>
            </div>
          </div>
        </>
      )}

      {/* BACK TO HOME */}
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-500 px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
}