import { useState } from "react";

export default function Debate() {
  const [motion, setMotion] = useState("");
  const [userArgument, setUserArgument] = useState("");
  const [rebuttal, setRebuttal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!motion || !userArgument) return;
    setLoading(true);
    setRebuttal("");

    try {
      const response = await fetch("http://localhost:3000/api/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motion, userArgument }),
      });

      const data = await response.json();
      setRebuttal(data.rebuttal);
    } catch (error) {
      setRebuttal("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Start a Debate</h1>

      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Motion</label>
        <input
          type="text"
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          placeholder="e.g. This House believes social media does more harm than good"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Your Argument</label>
        <textarea
          value={userArgument}
          onChange={(e) => setUserArgument(e.target.value)}
          placeholder="Enter your argument here..."
          rows={5}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-500 px-6 py-3 rounded-md font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
      >
        {loading ? "Generating Rebuttal..." : "Submit Argument"}
      </button>

      {rebuttal && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">AI Rebuttal</h2>
          <div className="bg-gray-800 px-6 py-5 rounded-md text-gray-200 whitespace-pre-wrap">
            {rebuttal}
          </div>
        </div>
      )}
    </div>
  );
}