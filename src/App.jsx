import { useState, useEffect } from 'react';
import { fetchDifficulties, fetchQuestions, postAnswer } from './services/api';
import DifficultySelector from './components/DifficultySelector';
import QuestionCard from './components/QuestionCard';
import ResultScreen from "./components/ResultScreen";
import './styles/App.css';
import background from "./assets/preguntadosbg.jpg";
import colorBar from "./assets/colorbar.png";


function App() {
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDifficulties()
      .then((data) => setDifficulties(data))
      .catch(() => setError('Error al cargar las dificultades'));
  }, []);

  const getTimerDuration = (difficulty) => {
    switch (difficulty) {
      case "easy": return 20000;
      case "normal": return 17000;
      case "hard": return 14000;
      case "extreme": return 10000;
      default: return 15000;
    }
  };

  const handleSelectDifficulty = async (difficulty) => {
    setSelectedDifficulty(difficulty);
    setError(null);
    setGameFinished(false);
    setFeedback(null);
    setCorrectCount(0);
    setCurrentQuestionIndex(0);

    try {
      const data = await fetchQuestions(difficulty);
      setQuestions(data);
    } catch (err) {
      setError('Error al cargar las preguntas');
    }
  };

  const handleAnswer = async (optionKey) => {
    setSelectedOption(optionKey);
    const question = questions[currentQuestionIndex];

    try {
      const result = await postAnswer({
        questionId: question.id,
        option: optionKey,
      });

      if (result.answer === true) {
        setCorrectCount(prev => prev + 1);
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
        window.dispatchEvent(new Event("shake-screen"));
      }

    } catch (err) {
      console.error(err);
      setError('Error al enviar la respuesta');
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setFeedback(null);
      setSelectedOption(null);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setSelectedOption(null);
    setCorrectCount(0);
    setGameFinished(false);
    setError(null);
  }

  return (
    <div className="bg-wrapper" style={{ "--bg-image": `url(${background})` }}>
      <div className="app-page">
        <div className="side-area"></div>

        <div className="center-area">
          <img src={colorBar} className="colorbar top-bar" alt="color bar top" />

          <div className="content">
            {(!selectedDifficulty || gameFinished) && (
              <h1 className="title">Trivia Crack</h1>
            )}
            <div className="title-divider"></div>

            {error && <p className="error-text">{error}</p>}

            {!selectedDifficulty && (
              <DifficultySelector
                difficulties={difficulties}
                onSelect={handleSelectDifficulty}
              />
            )}

            {selectedDifficulty && !gameFinished && questions.length > 0 && (
              <QuestionCard
                question={questions[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                feedback={feedback}
                selectedOption={selectedOption}
                onAnswer={handleAnswer}
                onNext={handleNext}
                timerDuration={getTimerDuration(selectedDifficulty)}
              />
            )}

            {gameFinished && (
              <ResultScreen
                correctCount={correctCount}
                totalQuestions={questions.length}
                onRestart={handleRestart}
              />
            )}
          </div>

          <img src={colorBar} className="colorbar bottom-bar" alt="color bar bottom" />
        </div>

        <div className="side-area"></div>
      </div>
    </div>
  );
}

export default App;
