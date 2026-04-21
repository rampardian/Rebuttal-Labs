import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DebateSetup() {
  const navigate = useNavigate();
  const [motion, setMotion] = useState("");
  const [stance, setStance] = useState("");
  const [order, setOrder] = useState("");
  const [openingStatement, setOpeningStatement] = useState("");
  const [rebuttalMode, setRebuttalMode] = useState("strict");

  const handleConfirm = () => {
    if (!motion || !stance || !order || !rebuttalMode) return;
    navigate("/debate/session", {
      state: { motion, stance, order, openingStatement, rebuttalMode },
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 max-w-3xl mx-auto">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Debate Setup</h1>
      <p className="text-gray-400 text-sm mb-10">
        Configure your debate before entering the session.
      </p>

      {/* MOTION */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
          Motion
        </label>
        <input
          type="text"
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          placeholder="This House believes..."
          className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>

      {/* STANCE */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3">
          Your Stance
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setStance("defense")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              stance === "defense"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-indigo-500"
            }`}
          >
            Defense
          </button>
          <button
            onClick={() => setStance("opposition")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              stance === "opposition"
                ? "bg-red-800 border-red-600 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-red-500"
            }`}
          >
            Opposition
          </button>
        </div>
      </div>

      {/* ORDER */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3">
          Who Goes First?
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setOrder("user")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              order === "user"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-indigo-500"
            }`}
          >
            I Go First
          </button>
          <button
            onClick={() => setOrder("ai")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              order === "ai"
                ? "bg-red-800 border-red-600 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-red-500"
            }`}
          >
            AI Goes First
          </button>
        </div>
      </div>

      {/* REBUTTAL MODE */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3">
          Rebuttal Mode
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setRebuttalMode("blitz")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              rebuttalMode === "blitz"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-indigo-500"
            }`}
          >
            <span className="block text-base mb-1">  Blitz</span>
            <span className="block text-xs font-normal text-gray-400">Fast and sharp. 2–3 sentences.</span>
          </button>
          <button
            onClick={() => setRebuttalMode("clash")}
            className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              rebuttalMode === "clash"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-indigo-500"
          }`}
          >
            <span className="block text-base mb-1">  Clash</span>
            <span className="block text-xs font-normal text-gray-400">Focused and grounded. 5–6 sentences.</span>
          </button>
          <button
            onClick={() => setRebuttalMode("grandslam")}
              className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
              rebuttalMode === "grandslam"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-indigo-500"
            }`}
          >
            <span className="block text-base mb-1">  Grand Slam</span>
            <span className="block text-xs font-normal text-gray-400">Full-length, detailed. 8–10 sentences.</span>
          </button>
        </div>
      </div>

      {/* OPENING STATEMENT - only if user goes first */}
      {order === "user" && (
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
            Opening Statement{" "}
            <span className="text-gray-600 normal-case">(optional, max 250 words)</span>
          </label>
          <textarea
            value={openingStatement}
            onChange={(e) => setOpeningStatement(e.target.value)}
            placeholder="State your opening argument..."
            rows={5}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
          />
          <p className="text-xs text-gray-600 mt-1 text-right">
            {openingStatement.trim().split(/\s+/).filter(Boolean).length} / 250 words
          </p>
        </div>
      )}

      {/* CONFIRM BUTTON */}
      <button
        onClick={handleConfirm}
        disabled={!motion || !stance || !order || !rebuttalMode}
        className="w-full bg-indigo-500 py-3 rounded-md font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-50"
      >
        Confirm & Enter Debate
      </button>
    </div>
  );
}