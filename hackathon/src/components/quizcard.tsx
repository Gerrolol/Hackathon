import React, { useState , useEffect} from 'react';

export interface QuizData {
  question : string;
  options : string[];
  correctOption : number;
  answered : number | null;
}
export interface QuizcardInterface{
  questionNumber : number;
  data : QuizData;
  handleAnswer : (questionsNumber: number, index: number)=> void;
}
const Quizcard: React.FC<QuizcardInterface> = ({ handleAnswer, questionNumber, data: { question, options, correctOption, answered } }: QuizcardInterface) => {
  const handleOptionClick = (index: number, questionNumber: number) => {
    handleAnswer(questionNumber, index);
  };

  const getOptionClass = (option: string) => {
    if (answered == null) return '';
    if (options.indexOf(option) === correctOption) return 'correct';
    if (options.indexOf(option) === answered) return 'incorrect';
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
            onClick={() => handleOptionClick(options.indexOf(option), questionNumber)}
            disabled={answered != null}
          >
            {option}
          </button>
        ))}
      </div>
      {answered != null && (
        <div className="feedback">
          {answered === correctOption ? (
            <p className="correct-answer">Correct!</p>
          ) : (
            <p className="incorrect-answer">
              Incorrect! The correct answer is: {options[correctOption]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};


export default Quizcard;
