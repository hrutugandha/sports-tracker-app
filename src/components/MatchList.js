import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/matches'; // Local API endpoint

const leagues = [
  { id: '4328', name: 'English Premier League' },
  { id: '4335', name: 'Spanish La Liga' },
  { id: '4331', name: 'German Bundesliga' },
];

const MatchList = () => {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].id);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?league=${selectedLeague}`);
        const data = await response.json();
        setMatches(data || []);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
      }
      setLoading(false);
    };

    fetchMatches();
  }, [selectedLeague]);

  return (
    <div>
      <h2 className="match-list-title">Match List</h2>
      <select
        id="league-select"
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
        className="league-select"
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : matches.length === 0 ? (
        <div>No matches found.</div>
      ) : (
        <ul style={{ paddingLeft: '16px' }}>
          {matches.map((match) => (
            <li key={match.id}>
              {match.event} - {match.date} {match.time}
            </li>
          ))}
        </ul>
      )}
    
    </div>
  );
};

export default MatchList;
