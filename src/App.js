import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box, Button, Heading, } from '@chakra-ui/react';
import './App.css';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import MatchList from './components/MatchList';
import StatsTable from './components/StatsTable';
import Leaderboard from './components/Leaderboard';
import AdminPage from './components/AdminPage';
import useLiveUpdates from './hooks/useLiveUpdates';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [leaderboardScores, setLeaderboardScores] = useState([
    { id: 1, name: 'Team A', points: 0 },
    { id: 2, name: 'Team B', points: 0 },
    { id: 3, name: 'Team C', points: 0 },
  ]);

  const statsTableRef = useRef(null);
  const { scores, liveMatchRef, scrollToLiveMatch } = useLiveUpdates(leaderboardScores);

  const bgColor =('gray.50', 'gray.800');
  const textColor =('gray.800', 'white');

  const handleAdminLogin = () => {
    setAdminAuthenticated(true);
  };

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={4}>
      <Button onClick={toggleTheme} mb={4} colorScheme="teal">
        Toggle Theme (Current: {theme})
      </Button>
      <Router>
        <Routes>
          <Route path="/" element={
            <Box maxW="6xl" mx="auto">
              <Heading as="h1" size="2xl" mb={6} textAlign="center">
                Sports League Score Tracker
              </Heading>
              <Box display="flex" gap={4} mb={6} flexWrap="wrap">
                <Button onClick={() => statsTableRef.current?.resetFilter()} colorScheme="blue">
                  Reset Stats Filter
                </Button>
                <Button onClick={scrollToLiveMatch} colorScheme="green">
                  Scroll to Live Match
                </Button>
              </Box>
              <MatchList />
              <StatsTable ref={statsTableRef} />
              <Leaderboard />
            </Box>
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
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ChakraProvider>
  );
}

