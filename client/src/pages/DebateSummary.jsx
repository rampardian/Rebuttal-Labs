import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Network } from "vis-network";

export default function DebateSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { motion, stance, exchanges } = location.state || {};

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const networkRef = useRef(null);

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

  useEffect(() => {
    if (!summary?.nodes || !summary?.edges || !networkRef.current) return;

    const truncateLabel = (text, maxWords = 7) => {
      const words = text.trim().split(/\s+/);
      if (words.length <= maxWords) return text;
      return words.slice(0, maxWords).join(" ") + "...";
    };

    const nodes = summary.nodes.map((n) => ({
      id: n.id,
      label: truncateLabel(n.label),
      color: n.role === "user" ? "#4f46e5" : "#991b1b",
      font: { color: "#ffffff", size: 12 },
      shape: "box",
      margin: 10,
    }));

    const edges = summary.edges.map((e) => ({
      from: e.from,
      to: e.to,
      label: e.label,
      arrows: "to",
      color: e.label === "Rebuts" ? "#ef4444" : "#22c55e",
      font: { color: "#9ca3af", size: 10, align: "middle" },
    }));

    const options = {
      background: { color: "transparent" },
      physics: {
        enabled: true,
        stabilization: { iterations: 200 },
      },
      interaction: {
        hover: true,
        zoomView: true,
        dragView: true,
      },
    };

    new Network(networkRef.current, { nodes, edges }, options);
  }, [summary]);

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
            <div className="text-xs text-gray-500 flex gap-6 mb-3">
                <span><span className="inline-block w-3 h-3 rounded-sm bg-indigo-600 mr-1"></span>Your Arguments</span>
                <span><span className="inline-block w-3 h-3 rounded-sm bg-red-800 mr-1"></span>Opponent's Arguments</span>
                <span><span className="text-red-400 mr-1">—</span>Rebuts</span>
                <span><span className="text-green-500 mr-1">—</span>Supports</span>
              </div>
              <div
                ref={networkRef}
                className="w-full bg-gray-900 border border-gray-700 rounded-md"
                style={{ height: "500px" }}
              />
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