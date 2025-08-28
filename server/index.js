const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock data
let leaderboard = [
  { id: 1, name: 'Team A', points: 25 },
  { id: 2, name: 'Team B', points: 18 },
  { id: 3, name: 'Team C', points: 30 },
];

let matches = [
  { 
    id: 1, 
    league: '4328', 
    event: 'Manchester United vs Liverpool', 
    date: '2024-06-01', 
    time: '15:00',
    scoreA: 3, 
    scoreB: 2 
  },
  { 
    id: 2, 
    league: '4328', 
    event: 'Arsenal vs Chelsea', 
    date: '2024-06-02', 
    time: '17:30',
    scoreA: 1, 
    scoreB: 1 
  },
  { 
    id: 3, 
    league: '4335', 
    event: 'Barcelona vs Real Madrid', 
    date: '2024-06-03', 
    time: '20:00',
    scoreA: 2, 
    scoreB: 2 
  },
];

const leagues = [
  { id: '4328', name: 'English Premier League' },
  { id: '4335', name: 'Spanish La Liga' },
  { id: '4331', name: 'German Bundesliga' },
];

const playerStats = [
  { player: 'John Doe', team: 'Team A', points: 25, assists: 5, rebounds: 7 },
  { player: 'Jane Smith', team: 'Team B', points: 18, assists: 7, rebounds: 10 },
  { player: 'Mike Johnson', team: 'Team C', points: 30, assists: 4, rebounds: 8 },
  { player: 'Sarah Wilson', team: 'Team A', points: 15, assists: 8, rebounds: 6 },
  { player: 'David Brown', team: 'Team B', points: 22, assists: 3, rebounds: 9 },
];

// API endpoints
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.get('/api/matches', (req, res) => {
  const { league } = req.query;
  let filteredMatches = matches;
  
  if (league) {
    filteredMatches = matches.filter(match => match.league === league);
  }
  
  res.json(filteredMatches);
});

app.get('/api/leagues', (req, res) => {
  res.json(leagues);
});

app.get('/api/player-stats', (req, res) => {
  res.json(playerStats);
});

app.get('/api/stats', (req, res) => {
  const totalMatches = matches.length;
  const totalTeams = leaderboard.length;
  const totalPoints = leaderboard.reduce((sum, team) => sum + team.points, 0);
  
  res.json({
    totalMatches,
    totalTeams,
    totalPoints,
    averagePoints: totalTeams > 0 ? (totalPoints / totalTeams).toFixed(2) : 0
  });
});

app.post('/api/scores', (req, res) => {
  const { id, points } = req.body;
  
  if (!id || points === undefined) {
    return res.status(400).json({ error: 'Team ID and points are required' });
  }
  
  const teamIndex = leaderboard.findIndex(team => team.id === parseInt(id));
  
  if (teamIndex === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  
  leaderboard[teamIndex].points = parseInt(points);
  
  res.json({ 
    message: 'Score updated successfully', 
    team: leaderboard[teamIndex] 
  });
});

app.post('/api/matches', (req, res) => {
  const { league, event, date, time, scoreA, scoreB } = req.body;
  
  if (!league || !event || !date) {
    return res.status(400).json({ error: 'League, event, and date are required' });
  }
  
  const newMatch = {
    id: matches.length + 1,
    league,
    event,
    date,
    time: time || '00:00',
    scoreA: scoreA || 0,
    scoreB: scoreB || 0
  };
  
  matches.push(newMatch);
  res.status(201).json(newMatch);
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
