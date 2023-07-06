import React, { createContext, useState } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scoreState, setScoreState] = useState({ hScore: 0, aScore: 0 });

  const increaseHomeScore = () => {
    setScoreState((prevState) => ({
      ...prevState,
      hScore: prevState.hScore + 1
    }));
  };

  const increaseAwayScore = () => {
    setScoreState((prevState) => ({
      ...prevState,
      aScore: prevState.aScore + 1
    }));
  };
  
  const resetScore = () => {
    setScoreState((prevState) => ({
        ...prevState,
        aScore: 0,
        hScore: 0
    }));
  }

  const contextValue = {
    scoreState,
    increaseHomeScore,
    increaseAwayScore,
    resetScore
  };

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};

