import React from 'react';
import { BookOpen, Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-600 p-6 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          FlashCard Quiz
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Test your knowledge with our interactive flashcards. 
          Answer all questions correctly to complete the quiz!
        </p>
        
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6" />
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;