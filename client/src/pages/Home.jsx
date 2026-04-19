import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold tracking-wide">
          Rebuttal Labs
        </h1>
        <Link
          to="/debate/setup"
          className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Start Debate
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Practice Debating with
          <span className="block text-indigo-400 mt-2">
            AI-Powered Rebuttals
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-300">
          Enter a motion. Take your stance. Our AI will argue the opposing
          side using real academic research and structured reasoning.
        </p>

        <div className="mt-10">
          <Link
            to="/debate/setup"
            className="bg-indigo-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-600 transition"
          >
            Begin Your Debate
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">
            How Rebuttal Labs Works
          </h3>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-3">
                1. Enter a Motion
              </h4>
              <p className="text-gray-400">
                Provide a “This House believes...” statement and choose your
                stance.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">
                2. AI Takes the Opposition
              </h4>
              <p className="text-gray-400">
                The AI generates structured rebuttals backed by academic
                sources in real time.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">
                3. Visualize the Debate
              </h4>
              <p className="text-gray-400">
                See arguments mapped in a dynamic spiderweb structure showing
                supports and rebuttals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">
          Built for Structured Thinking
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-semibold mb-3">
              Academic Citations
            </h4>
            <p className="text-gray-400">
              Arguments include inline references retrieved from credible
              research databases.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">
              Real-Time Argument Mapping
            </h4>
            <p className="text-gray-400">
              Track the evolution of arguments and rebuttals through a live
              knowledge map.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-indigo-600 py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to test your reasoning?
        </h3>
        <Link
          to="/debate/setup"
          className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Start Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6 text-sm">
      </footer>
    </div>
  );
}