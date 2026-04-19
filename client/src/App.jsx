import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Debate from "./pages/Debate";
import DebateSetup from "./pages/DebateSetup";
import DebateSummary from "./pages/DebateSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debate/setup" element={<DebateSetup />} />
      <Route path="/debate/session" element={<Debate />} />
      <Route path="/debate/summary" element={<DebateSummary />} />
    </Routes>
  );
}

export default App;