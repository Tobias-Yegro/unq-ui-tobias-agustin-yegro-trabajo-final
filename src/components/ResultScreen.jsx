import "../styles/ResultScreen.css";

function ResultScreen({ correctCount, totalQuestions, onRestart }) {
    return (
        <div className="result-container">
            <h2>Juego terminado</h2>

            <p className="result-text">
                Respuestas correctas: {correctCount} / {totalQuestions}
            </p>

            <button onClick={onRestart} className="restart-button">
                Volver a jugar
            </button>
        </div>
    );
}

export default ResultScreen;
