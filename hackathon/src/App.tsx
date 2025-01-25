import { useEffect, useState } from 'react';
import './App.css';
import Quizcard, { QuizData } from './components/quizcard';
import Pagination from './components/pagination';
import RestartModal from './components/restartModal';
import QuizForm from './components/quizform';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);
  const [pagedQuestions, setPagedQuestions] = useState<QuizData[]>([]);
  const [questions, setQuestions] = useState<QuizData[]>([
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      correctOption: 0,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctOption: 1,
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "George Orwell"],
      correctOption: 0,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctOption: 3,
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
      correctOption: 1,
    },
  ]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    refreshPagedQuestions();
  }, [currentPage, pageSize, questions]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) !== pageSize) {
      setPageSize(Number(e.target.value));
      setCurrentPage(1);
    }
  };

  const toggleRestartModal = () => {
    setShowRestartModal(!showRestartModal);
  };

  const refreshPagedQuestions = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPagedQuestions(questions.slice(startIndex, endIndex));
  };

  const handleRestart = () => {
    // Add your restart logic here
  };

  const handleQuizFormSubmit = (submittedQuestions: { question: string; options: string[]; correctOption: number }[]) => {
    const newQuestions = submittedQuestions.map((q) => ({
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
    }));
    setQuestions(newQuestions);
    setShowForm(false); // Hide the form after submission
  };

  const handleAddQuestionClick = () => {
    setShowForm(true); // Show the form when "Add Question" button is clicked
  };

  return (
    <>
      <h1>Enter your quiz questions!</h1>
      {showForm && <QuizForm onSubmit={handleQuizFormSubmit} />}
      {!showForm && <button onClick={handleAddQuestionClick}>Add Question</button>}
      {pagedQuestions.map((question, i) => {
        const adjustedIndex = (currentPage - 1) * pageSize + i;
        return <Quizcard key={adjustedIndex} questionNumber={adjustedIndex + 1} data={question} />;
      })}
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={Math.ceil(questions.length / pageSize)}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        handleRestart={toggleRestartModal}
      />
      {showRestartModal && <RestartModal handleRestart={() => { toggleRestartModal(); handleRestart(); }} closeModal={toggleRestartModal} />}
    </>
  );
}

export default App;
