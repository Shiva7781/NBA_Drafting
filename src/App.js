import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarNBA from "./components/NavbarNBA";
import Players from "./components/Players";
import Games from "./components/Games";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarNBA />

        <Routes>
          <Route path="/" element={<Players />} />
          <Route path="/players" element={<Players />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
