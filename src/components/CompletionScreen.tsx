import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface CompletionScreenProps {
  totalCards: number;
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ totalCards, onRestart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="bg-green-600 p-6 rounded-full shadow-lg animate-bounce">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Congratulations!
        </h1>
        
        <p className="text-lg text-gray-600 mb-2 leading-relaxed">
          You've successfully completed all {totalCards} flashcards!
        </p>
        
        <p className="text-md text-gray-500 mb-8">
          Great job on your perfect score!
        </p>
        
        <button
          onClick={onRestart}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <RotateCcw className="w-6 h-6" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;