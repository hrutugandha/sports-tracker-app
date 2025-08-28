import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

const StatsTable = forwardRef((props, ref) => {
  const [filter, setFilter] = useState('');
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => ({
    resetFilter() {
      setFilter('');
    },
  }));

  useEffect(() => {
    const fetchPlayerStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/player-stats');
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
        setError('Failed to load player stats');
      }
      setLoading(false);
    };

    fetchPlayerStats();
  }, []);

  const statsData = playerStats.length > 0 ? playerStats : [];

  const filteredStats = statsData.filter((stat) =>
    stat.player && stat.player.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h2>Player Stats</h2>
        <p>Loading player stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Player Stats</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Player Stats</h2>
      <input
        type="text"
        placeholder="Filter by player name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredStats.length === 0 ? (
        <p>No player stats found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Team</th>
                <th>Points</th>
                <th>Assists</th>
                <th>Rebounds</th>
              </tr>
            </thead>
            <tbody>
              {filteredStats.map((stat) => (
                <tr key={stat.player}>
                  <td>{stat.player}</td>
                  <td>{stat.team}</td>
                  <td>{stat.points}</td>
                  <td>{stat.assists}</td>
                  <td>{stat.rebounds}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setFilter('')}>Clear Filter</button>
        </>
      )}
    </div>
  );
});

export default StatsTable;
