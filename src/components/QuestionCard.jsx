import "../styles/QuestionCard.css";

function QuestionCard({
    question,
    currentIndex,
    totalQuestions,
    feedback,
    selectedOption,
    onAnswer,
    onNext
}) {
    return (
        <div className="question-card">

            <h2>Pregunta {currentIndex + 1} de {totalQuestions}</h2>

            <p className="question-text">{question.text}</p>

            {feedback === "correct" && (
                <div className="feedback-banner correct-banner">
                    ¡CORRECTO!
                </div>
            )}

            {feedback === "incorrect" && (
                <div className="feedback-banner incorrect-banner">
                    Incorrecto
                </div>
            )}

            <div className="options-container">
                {question.options.map((op) => {
                    const isSelected = selectedOption === op.key;
                    const isCorrect = feedback === "correct" && isSelected;
                    const isIncorrect = feedback === "incorrect" && isSelected;

                    return (
                        <button
                            key={op.key}
                            onClick={() => onAnswer(op.key)}
                            disabled={feedback !== null}
                            className={`option-button
                                ${isCorrect ? "correct-button" : ""}
                                ${isIncorrect ? "incorrect-button" : ""}
                            `}
                        >
                            {op.text}
                        </button>
                    );
                })}
            </div>

            {feedback && (
                <button onClick={onNext} className="next-button">
                    Siguiente
                </button>
            )}

        </div>
    );
}

export default QuestionCard;
