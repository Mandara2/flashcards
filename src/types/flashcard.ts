export interface Flashcard {
  id: number;
  image: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface GameState {
  currentCardIndex: number;
  correctAnswersCount: number;
  showFeedback: boolean;
  feedbackType: 'correct' | 'incorrect' | null;
  isGameComplete: boolean;
}