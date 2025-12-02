import { useState, useEffect } from 'react';
import { fetchDifficulties, fetchQuestions, postAnswer } from './services/api';

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
      .then((data) => {
        setDifficulties(data);
      })
      .catch(() => {
        setError('Error al cargar las dificultades');
      });
  }, []);

  // Elegir dificultad
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

  // Contestar pregunta
  const handleAnswer = async (optionKey) => {
    const question = questions[currentQuestionIndex];

    try {
      const result = await postAnswer({
        questionId: question.id,
        option: optionKey,
      });

      const isCorrect = result.answer === true;

      if (isCorrect) {
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

  // Siguiente pregunta
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
        <div>
          <h2>Elegí una dificultad:</h2>

          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => handleSelectDifficulty(d)}
              style={{ marginRight: 10, marginBottom: 10 }}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {selectedDifficulty && !gameFinished && questions.length > 0 && (
        <div>
          <h2>
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </h2>

          <p>{questions[currentQuestionIndex].text}</p>

          <div style={{ marginBottom: 20 }}>
            {questions[currentQuestionIndex].options.map((op) => (
              <button
                key={op.key}
                onClick={() => handleAnswer(op.key)}
                style={{
                  display: "block",
                  margin: "8px 0",
                  padding: "8px 12px",
                }}
                disabled={feedback !== null}
              >
                {op.text}
              </button>
            ))}
          </div>

          {feedback === "correct" && (
            <p style={{ color: "green" }}>¡Correcto!</p>
          )}
          {feedback === "incorrect" && (
            <p style={{ color: "red" }}>Incorrecto</p>
          )}

          {feedback && (
            <button onClick={handleNext} style={{ marginTop: 10 }}>
              Siguiente
            </button>
          )}
        </div>
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
