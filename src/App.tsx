import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import FlashcardGame from './components/FlashcardGame';
import { Flashcard } from './types/flashcard';
import flashcardsData from './data/redes.json';

type AppState = 'start' | 'playing';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Load flashcards data
    setFlashcards(flashcardsData);
  }, []);

  const handleStart = () => {
    setAppState('playing');
  };

  const handleRestart = () => {
    setAppState('start');
  };

  if (appState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <FlashcardGame 
      flashcards={flashcards}
      onRestart={handleRestart}
    />
  );
}

export default App;