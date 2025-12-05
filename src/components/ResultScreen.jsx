import "../styles/ResultScreen.css";

function ResultScreen({ correctCount, totalQuestions, onRestart }) {
    return (
        <div className="result-container">
            <h2 className="result-title">Game finished</h2>

            <p className="result-text">
                Correct answers: {correctCount} / {totalQuestions}
            </p>

            <button onClick={onRestart} className="restart-button">
                Play again! 
            </button>
        </div>
    );
}

export default ResultScreen;
