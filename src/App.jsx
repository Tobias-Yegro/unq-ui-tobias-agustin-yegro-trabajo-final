import { useState, useEffect } from 'react';
import { fetchDifficulties, fetchQuestions, postAnswer } from './services/api';
import DifficultySelector from './components/DifficultySelector';
import QuestionCard from './components/QuestionCard';

function App() {
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDifficulties()
      .then((data) => setDifficulties(data))
      .catch(() => setError('Error al cargar las dificultades'));
  }, []);

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
    const question = questions[currentQuestionIndex];

    try {
      const result = await postAnswer({
        questionId: question.id,
        option: optionKey,
      });

      if (result.answer === true) {
        setCorrectCount((prev) => prev + 1);
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
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
    } else {
      setGameFinished(true);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Preguntados</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {gameFinished && (
        <div>
          <h2>Juego terminado</h2>
          <p>
            Respuestas correctas: {correctCount} / {questions.length}
          </p>

          <button onClick={() => setSelectedDifficulty(null)}>
            Volver a jugar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
