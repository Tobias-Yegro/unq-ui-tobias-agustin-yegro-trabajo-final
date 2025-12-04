import "../styles/QuestionCard.css";

function QuestionCard({
    question,
    currentIndex,
    totalQuestions,
    feedback,
    onAnswer,
    onNext
}) {
    return (
        <div className="question-card">
            <h2>
                Pregunta {currentIndex + 1} de {totalQuestions}
            </h2>

            <p className="question-text">{question.text}</p>

            <div className="options-container">
                {question.options.map((op) => (
                    <button
                        key={op.key}
                        onClick={() => onAnswer(op.key)}
                        disabled={feedback !== null}
                        className="option-button"
                    >
                        {op.text}
                    </button>
                ))}
            </div>

            {feedback === "correct" && <p className="correct-text">¡Correcto!</p>}
            {feedback === "incorrect" && <p className="incorrect-text">Incorrecto</p>}

            {feedback && (
                <button onClick={onNext} className="next-button">
                    Siguiente
                </button>
            )}
        </div>
    );
}

export default QuestionCard;
