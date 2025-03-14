import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/MatchmakingPage.css";

const MatchmakingPage = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Redirect if no state is present (direct URL access)
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!location.state) {
    return null;
  }

  const { teamName, players, createdAt } = location.state;

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="matchmaking-container">
      <div className="matchmaking-content">
        <h1>Matchmaking Room</h1>
        
        <div className="room-code-section">
          <h2>Room Code</h2>
          <div className="room-code">
            <span>{roomCode}</span>
            <button onClick={copyRoomCode} className="copy-button">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="team-details">
          <h2>Team Details</h2>
          <div className="team-info">
            <p><strong>Team Name:</strong> {teamName}</p>
            <p><strong>Players ({players.length}):</strong></p>
            <ul className="players-list">
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="waiting-section">
          <div className="status-info">
            <p>Waiting for contestants...</p>
            <p className="timer">Time elapsed: {formatTime(timeElapsed)}</p>
          </div>
          <div className="loading-spinner"></div>
        </div>

        <button 
          onClick={() => navigate("/")} 
          className="leave-button"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default MatchmakingPage;