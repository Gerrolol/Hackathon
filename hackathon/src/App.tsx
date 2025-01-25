import { useEffect, useState } from 'react'
import './App.css'
import Quizcard, { QuizData } from './components/quizcard';
import Pagination from './components/pagination';
import RestartModal from './components/restartModal';

const dummyQuestions: QuizData[] = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctOption: 0,
    answered: null
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctOption: 1,
    answered: null
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "George Orwell"],
    correctOption: 0,
    answered: null
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctOption: 3,
    answered: null
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctOption: 1,
    answered: null
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);
  const [pagedQuestions, setPagedQuestions] = useState<QuizData[]>([]);
  const [questions, setQuestions] = useState<QuizData[]>(dummyQuestions)

  useEffect (() => {
    refreshPagedQuestions();
  },[currentPage, pageSize, questions])

  const handlePageChange = (newPage : number) => {
    if(newPage != currentPage) {
      setCurrentPage(newPage);
    }
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(Number(e.target.value) != pageSize){
      setPageSize(Number(e.target.value));
      setCurrentPage(1);
    }
  };

  const toggleRestartModal = () => {
    setShowRestartModal(!showRestartModal);
  }


  const refreshPagedQuestions = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPagedQuestions(questions.slice(startIndex, endIndex));
  }

  const handleRestart = () => {
    setQuestions((questions) =>
      questions.map((question) => ({
        ...question,
        answered: null,
      }))
    );
    setCurrentPage(1);
  };

  const handleAnswer = (questionNumber: number, index: number) => {
    setQuestions((questions) =>
      questions.map((question, i) =>
        i === (questionNumber -1) ? { ...question, answered: index } : question
      )
    );
  };

  return (
    <>
      <h1>Enter a topic to begin</h1>
      {pagedQuestions.map((question, i) => {
          const adjustedIndex = (currentPage - 1) * pageSize + i;
          return (
            <Quizcard 
              key={adjustedIndex} 
              questionNumber={adjustedIndex + 1} 
              data={question} 
              handleAnswer = {handleAnswer}
            />);
        })}
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={Math.ceil(questions.length / pageSize)}
        onPageChange={handlePageChange}
        onPageSizeChange = {handlePageSizeChange}
        handleRestart={toggleRestartModal}
      />
      {showRestartModal && <RestartModal handleRestart={() => {toggleRestartModal(); handleRestart()}} closeModal={toggleRestartModal} />}
    </>
  )
}

export default App
