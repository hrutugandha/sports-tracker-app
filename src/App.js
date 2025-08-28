import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import MatchList from './components/MatchList';
import StatsTable from './components/StatsTable';
import Leaderboard from './components/Leaderboard';
import AdminPage from './components/AdminPage';
import useLiveUpdates from './hooks/useLiveUpdates';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [leaderboardScores, setLeaderboardScores] = useState([
    { id: 1, name: 'Team A', points: 0 },
    { id: 2, name: 'Team B', points: 0 },
    { id: 3, name: 'Team C', points: 0 },
  ]);

  const statsTableRef = useRef(null);
  const { scores, liveMatchRef, scrollToLiveMatch } = useLiveUpdates(leaderboardScores);

  const handleAdminLogin = () => {
    setAdminAuthenticated(true);
  };

  const themeClass = theme === 'light' ? 'light-theme' : 'dark-theme';

  return (
    <div className={themeClass} style={{ minHeight: '100vh', padding: '16px' }}>
      <button onClick={toggleTheme} style={{ marginBottom: '16px' }}>
        Toggle Theme (Current: {theme})
      </button>
      <Router>
        <Routes>
          <Route path="/" element={
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>
                Sports League Score Tracker
              </h1>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <button onClick={() => statsTableRef.current?.resetFilter()}>
                  Reset Stats Filter
                </button>
                <button onClick={scrollToLiveMatch}>
                  Scroll to Live Match
                </button>
              </div>
              <MatchList />
              <StatsTable ref={statsTableRef} />
              <Leaderboard />
            </div>
          } />
          <Route path="/admin" element={
            adminAuthenticated ? (
              <AdminPage />
            ) : (
              <AdminPage onLogin={handleAdminLogin} />
            )
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
