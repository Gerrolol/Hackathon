import React, { useState } from 'react';

interface QuizFormProps {
  onSubmit: (questions: { question: string; options: string[]; correctOption: number }[]) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    if (name.startsWith('option')) {
      const optionIndex = parseInt(name.split('-')[1], 10);
      newQuestions[index].options[optionIndex] = value;
    } else if (name === 'correctOption') {
      newQuestions[index].correctOption = parseInt(value, 10);
    } else {
      if (name === 'question') {
        newQuestions[index].question = value;
      }
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <div key={index}>
          <label>
            Question:
            <input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </label>
          {q.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              Option {optionIndex + 1}:
              <input
                type="text"
                name={`option-${optionIndex}`}
                value={option}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
          ))}
          <label>
            Correct Option:
            <select
              name="correctOption"
              value={q.correctOption}
              onChange={(e) => handleChange(index, e)}
              required
            >
              {q.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {optionIndex + 1}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;