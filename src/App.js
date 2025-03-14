import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MatchmakingPage from "./components/MatchmakingPage";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/matchmaking/:roomCode" element={<MatchmakingPage />} />
      </Routes>
    </div>
  );
};

export default App;