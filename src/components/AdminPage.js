import React, { useState } from 'react';

const AdminPage = ({ onScoreUpdate, onLogin }) => {
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState('');
  const [points, setPoints] = useState('');

  const handleLogin = () => {
    // Simple password check for demo purposes
    if (password === 'admin123') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamId && points) {
      try {
        const response = await fetch('http://localhost:5000/api/scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: parseInt(teamId),
            points: parseInt(points)
          }),
        });
        
        if (response.ok) {
          const result = await response.json();
          setTeamId('');
          setPoints('');
          alert(result.message || 'Score updated successfully');
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'Failed to update score');
        }
      } catch (error) {
        console.error('Error updating score:', error);
        alert('Failed to update score');
      }
    }
  };

  if (!onLogin) {
    // If onLogin is not provided, assume already authenticated
    return (
      <div>
        <h2>Admin Score Input</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Team ID"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
          <button type="submit">Update Score</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminPage;
