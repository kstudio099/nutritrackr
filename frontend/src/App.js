// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Login/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route d'accueil ou tableau de bord */}
        <Route path="/" element={<h1>Welcome to NutriTrackr</h1>} />

        {/* Page d'inscription */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
