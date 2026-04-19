import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Debate from "./pages/Debate";
import DebateSetup from "./pages/DebateSetup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debate/setup" element={<DebateSetup />} />
      <Route path="/debate/session" element={<Debate />} />
    </Routes>
  );
}

export default App;