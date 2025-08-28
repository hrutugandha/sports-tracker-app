import React, { useEffect, useState } from 'react';
import { Box, Select, Text, Spinner, ListItem } from '@chakra-ui/react';

const API_URL = 'http://localhost:5000/api/matches'; // Local API endpoint

const leagues = [
  { id: '4328', name: 'English Premier League' },
  { id: '4335', name: 'Spanish La Liga' },
  { id: '4331', name: 'German Bundesliga' },
  // Add more leagues as needed
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
    <Box>
      <Text fontSize="2xl" mb={4}>Match List</Text>
      <Select
        id="league-select"
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
        mb={4}
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
      </Select>

      {loading ? (
        <Spinner />
      ) : matches.length === 0 ? (
        <Text>No matches found.</Text>
      ) : (

          {matches.map((match) => (
            <ListItem key={match.id}>
              {match.event} - {match.date} {match.time}
            </ListItem>
          ))}
        >
      )}
    </Box>
  );
};

export default MatchList;
