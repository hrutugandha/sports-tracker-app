
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/leaderboard';

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard');
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  if (loading) {
    return (
      <div>
        <h2>Leaderboard</h2>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Leaderboard</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {sortedTeams.map((team) => (
          <li key={team.id}>
            {team.name}: {team.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
