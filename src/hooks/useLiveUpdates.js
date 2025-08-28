import { useEffect, useState, useRef } from 'react';

const useLiveUpdates = (initialScores) => {
  const [scores, setScores] = useState(initialScores);
  const liveMatchRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScores((prevScores) =>
        prevScores.map((score) => ({
          ...score,
          points: score.points + Math.floor(Math.random() * 3), // simulate score update
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToLiveMatch = () => {
    if (liveMatchRef.current) {
      liveMatchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scores, liveMatchRef, scrollToLiveMatch };
};

export default useLiveUpdates;
