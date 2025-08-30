import React, { useState, useEffect } from 'react';
import { Flashcard as FlashcardType, GameState } from '../types/flashcard';
import Flashcard from './Flashcard';
import CompletionScreen from './CompletionScreen';

interface FlashcardGameProps {
  flashcards: FlashcardType[];
  onRestart: () => void;
}

const FlashcardGame: React.FC<FlashcardGameProps> = ({ flashcards, onRestart }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentCardIndex: 0,
    correctAnswersCount: 0,
    showFeedback: false,
    feedbackType: null,
    isGameComplete: false
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>([]);

  // Shuffle cards on game start
  useEffect(() => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, [flashcards]);

  const currentCard = shuffledCards[gameState.currentCardIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showFeedback && gameState.feedbackType === 'correct') {
      return; // Don't allow selection when correct answer is already shown
    }

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentCard.correctAnswer;

    setGameState(prev => ({
      ...prev,
      showFeedback: true,
      feedbackType: isCorrect ? 'correct' : 'incorrect'
    }));

    if (isCorrect) {
      // Move to next card after a delay
      setTimeout(() => {
        const nextIndex = gameState.currentCardIndex + 1;
        
        if (nextIndex >= shuffledCards.length) {
          // Game complete
          setGameState(prev => ({
            ...prev,
            isGameComplete: true,
            correctAnswersCount: prev.correctAnswersCount + 1
          }));
        } else {
          // Move to next card
          setGameState({
            currentCardIndex: nextIndex,
            correctAnswersCount: gameState.correctAnswersCount + 1,
            showFeedback: false,
            feedbackType: null,
            isGameComplete: false
          });
          setSelectedAnswer(null);
        }
      }, 1500);
    }
  };

  const resetFeedback = () => {
    if (gameState.feedbackType === 'incorrect') {
      setGameState(prev => ({
        ...prev,
        showFeedback: false,
        feedbackType: null
      }));
      setSelectedAnswer(null);
    }
  };

  // Reset incorrect feedback after 2 seconds
  useEffect(() => {
    if (gameState.feedbackType === 'incorrect') {
      const timer = setTimeout(resetFeedback, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.feedbackType]);

  if (gameState.isGameComplete) {
    return (
      <CompletionScreen 
        totalCards={shuffledCards.length}
        onRestart={onRestart}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <Flashcard
      flashcard={currentCard}
      selectedAnswer={selectedAnswer}
      showFeedback={gameState.showFeedback}
      feedbackType={gameState.feedbackType}
      onAnswerSelect={handleAnswerSelect}
      currentCardNumber={gameState.currentCardIndex + 1}
      totalCards={shuffledCards.length}
    />
  );
};

export default FlashcardGame;