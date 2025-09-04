import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Flashcard as FlashcardType } from '../types/flashcard';
import AnswerButton from './AnswerButton';

interface FlashcardProps {
  flashcard: FlashcardType;
  selectedAnswer: number | null;
  showFeedback: boolean;
  feedbackType: 'correct' | 'incorrect' | null;
  onAnswerSelect: (answerIndex: number) => void;
  currentCardNumber: number;
  totalCards: number;
}

const Flashcard: React.FC<FlashcardProps> = ({
  flashcard,
  selectedAnswer,
  showFeedback,
  feedbackType,
  onAnswerSelect,
  currentCardNumber,
  totalCards
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentCardNumber} of {totalCards}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentCardNumber - 1) / totalCards) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentCardNumber - 1) / totalCards) * 100}%` }}
            />
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
          {/* Image */}
          <div className="mb-6">
            <img
              src={flashcard.image}
              alt="Quiz question"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
            {flashcard.question}
          </h2>

          {/* Answers */}
          <div className="space-y-3 mb-6">
            {flashcard.answers.map((answer, index) => (
              <AnswerButton
                key={index}
                answer={answer}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={showFeedback && selectedAnswer === index && feedbackType === 'correct'}
                isIncorrect={showFeedback && selectedAnswer === index && feedbackType === 'incorrect'}
                onClick={() => onAnswerSelect(index)}
                disabled={showFeedback && feedbackType === 'correct'}
              />
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`
              p-4 rounded-lg flex items-center gap-3 transition-all duration-300
              ${feedbackType === 'correct' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
              }
            `}>
              {feedbackType === 'correct' ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-medium">Correct! Moving to next question...</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium">Incorrect. Please try again!</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;