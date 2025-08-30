import React from 'react';

interface AnswerButtonProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  answer,
  index,
  isSelected,
  isCorrect,
  isIncorrect,
  onClick,
  disabled
}) => {
  const getButtonStyles = () => {
    if (isCorrect) {
      return 'bg-green-500 text-white border-green-500 shadow-lg';
    }
    if (isIncorrect) {
      return 'bg-red-500 text-white border-red-500 shadow-lg';
    }
    if (isSelected) {
      return 'bg-blue-100 border-blue-500 text-blue-700';
    }
    return 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:border-blue-400';
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 rounded-lg border-2 transition-all duration-300 text-left
        flex items-center gap-4 font-medium transform hover:scale-[1.02]
        disabled:cursor-not-allowed disabled:transform-none
        ${getButtonStyles()}
      `}
    >
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
        ${isCorrect ? 'bg-green-600' : isIncorrect ? 'bg-red-600' : 'bg-blue-600 text-white'}
      `}>
        {letters[index]}
      </div>
      <span className="flex-1">{answer}</span>
    </button>
  );
};

export default AnswerButton;