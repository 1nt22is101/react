import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("RegistrationForm mounted");
  }, []);

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
    setError("");
  };

  const validateForm = () => {
    if (!teamName.trim()) {
      setError("Team name is required");
      return false;
    }

    const filledPlayers = players.filter(player => player.trim());
    if (filledPlayers.length < 2) {
      setError("At least 2 players are required");
      return false;
    }

    const uniquePlayers = new Set(filledPlayers);
    if (uniquePlayers.size !== filledPlayers.length) {
      setError("Player names must be unique");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate a random room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Filter out empty player slots
    const validPlayers = players.filter(player => player.trim());

    // Navigate to matchmaking page
    navigate(`/matchmaking/${roomCode}`, {
      state: { 
        teamName, 
        players: validPlayers,
        createdAt: new Date().toISOString()
      },
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-form-wrapper">
        <h1>Team Registration</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="teamName">Team Name:</label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setError("");
              }}
              placeholder="Enter team name"
              className="form-input"
            />
          </div>

          <div className="players-section">
            <h2>Players</h2>
            <p className="player-info">Min 2 players required, max 4 players allowed</p>
            {players.map((player, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`player${index}`}>Player {index + 1}:</label>
                <input
                  id={`player${index}`}
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  placeholder={`Enter player ${index + 1} name`}
                  className="form-input"
                />
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Create Team & Get Room Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;