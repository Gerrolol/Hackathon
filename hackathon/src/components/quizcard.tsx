import React, { useState } from 'react';

export interface QuizData {
  question : string;
  options : string[];
  correctOption : number;
}
export interface QuizcardInterface{
  questionNumber : number;
  data : QuizData;
}

const Quizcard:React.FC<QuizcardInterface>  = ({ questionNumber, data: {question, options, correctOption} } : QuizcardInterface)=> {
  const [selectedOptionNo, setSelectedOptionNo] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option : string) => {
    setSelectedOptionNo(options.indexOf(option));
    setIsAnswered(true);
  };

  const getOptionClass = (option : string) => {
    if (!isAnswered) return '';
    if (options.indexOf(option) === correctOption) return 'correct';
    if (options.indexOf(option) === selectedOptionNo) return 'incorrect';
    return '';
  };

  return (
    <div className="quiz-card">
      <h3>Question {questionNumber}</h3>
      <p>{question}</p>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option ${getOptionClass(option)}`}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered} // Disable options after answering
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="feedback">
          {selectedOptionNo === correctOption ? (
            <p className="correct-answer">Correct!</p>
          ) : (
            <p className="incorrect-answer">
              Incorrect! The correct answer is: {correctOption}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quizcard;
