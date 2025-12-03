function ResultScreen({ correctCount, totalQuestions, onRestart }) {
  return (
    <div>
      <h2>Juego terminado</h2>

      <p>
        Respuestas correctas: {correctCount} / {totalQuestions}
      </p>

      <button onClick={onRestart}>
        Volver a jugar
      </button>
    </div>
  );
}

export default ResultScreen;
