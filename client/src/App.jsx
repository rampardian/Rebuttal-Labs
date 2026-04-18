import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Debate from "./pages/Debate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debate" element={<Debate />} />
    </Routes>
  );
}

export default App;